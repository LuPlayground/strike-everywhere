import { render } from "preact";
import { StrikeEverywhere } from "@strike-everywhere/core";
import { App, type WidgetConfig } from "./App";
import { PerpsApp } from "./app/PerpsApp";
import { appCss } from "./app/styles";
import { APP_FONT_HREF, FONT_HREF, css } from "./styles";

export const VERSION = "0.2.0";

const ATTRS = ["builder-code", "fee-bps", "max-fee-bps", "market", "network", "partner-id", "partner-api", "max-leverage", "persist", "referral-code", "width", "side", "variant", "layout", "closable", "height", "screen", "amount", "chart"] as const;

function ensureFont(href = FONT_HREF, key = "font"): void {
  if (document.querySelector(`link[data-strike-everywhere-${key}]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.setAttribute(`data-strike-everywhere-${key}`, "");
  document.head.appendChild(link);
}

export class StrikeTradeElement extends HTMLElement {
  static observedAttributes = [...ATTRS];
  private root: ShadowRoot | null = null;

  private teardown: ReturnType<typeof setTimeout> | null = null;

  connectedCallback(): void {
    ensureFont();
    if (this.teardown) clearTimeout(this.teardown);
    this.teardown = null;
    if (!this.root) {
      this.root = this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent = css + appCss;
      this.root.appendChild(style);
      const mount = document.createElement("div");
      mount.className = "se-mount";
      this.root.appendChild(mount);
      for (const t of ["keydown", "keyup", "keypress"]) this.root.addEventListener(t, (e) => e.stopPropagation());
    }
    this.renderApp();
  }

  disconnectedCallback(): void {
    if (this.teardown) clearTimeout(this.teardown);
    this.teardown = setTimeout(() => {
      this.teardown = null;
      const mount = this.root?.lastElementChild;
      if (mount && !this.isConnected) render(null, mount);
    }, 0);
  }

  attributeChangedCallback(): void {
    if (this.root && this.isConnected) this.renderApp();
  }

  private config(): WidgetConfig | string {
    const builderCode = this.getAttribute("builder-code")?.trim();
    if (!builderCode) return 'Missing required attribute: builder-code="your-strike-builder-code"';
    const num = (name: string, fallback: number) => {
      const raw = this.getAttribute(name);
      if (raw === null || raw.trim() === "") return fallback;
      const v = Number(raw);
      return Number.isFinite(v) ? v : fallback;
    };
    const attr = (name: string) => (this.getAttribute(name) ?? "").trim().toLowerCase();
    const network = attr("network") === "testnet" ? "testnet" : "mainnet";
    const feeBps = num("fee-bps", 5);
    return {
      builderCode,
      network,
      feeBps,
      maxFeeBps: num("max-fee-bps", feeBps),
      market: (this.getAttribute("market") || "ADA-USD").trim().toUpperCase(),
      partnerId: this.getAttribute("partner-id") || undefined,
      partnerApi: this.getAttribute("partner-api") || undefined,
      referralCode: this.getAttribute("referral-code") || undefined,
      maxLeverage: Math.max(1, num("max-leverage", 10)),
      persist: attr("persist") === "session" ? "session" : "memory",
      side: attr("side") === "sell" ? "sell" : "buy",
      amount: num("amount", 0) > 0 ? num("amount", 0) : undefined,
      chart: attr("chart") !== "off",
    };
  }

  private renderApp(): void {
    const mount = this.root!.lastElementChild!;
    const size = (attr: string, prop: string) => {
      const v = this.getAttribute(attr)?.trim();
      if (v) this.style.setProperty(prop, /^\d+(\.\d+)?$/.test(v) ? `${v}px` : v);
      else this.style.removeProperty(prop);
    };
    size("width", "--se-width");
    size("height", "--se-height");
    const variant = (this.getAttribute("variant") ?? "").trim().toLowerCase();
    const cfg = this.config();
    if (typeof cfg === "string") {
      render(
        <div class="card">
          <div class="ticket">
            <div class="warn">{cfg}</div>
          </div>
        </div>,
        mount,
      );
      return;
    }
    const key = [variant, cfg.network, cfg.builderCode, cfg.feeBps, cfg.maxFeeBps, cfg.partnerApi, cfg.partnerId, cfg.referralCode, cfg.persist].join("|");
    if (variant === "app") {
      ensureFont(APP_FONT_HREF, "app-font");
      const layout = (this.getAttribute("layout") ?? "").trim().toLowerCase();
      const appCfg = { ...cfg, layout: layout === "mobile" || layout === "desktop" || layout === "panel" ? layout : "auto", closable: this.hasAttribute("closable") } as const;
      render(<PerpsApp key={key} config={appCfg} host={this} screen={this.getAttribute("screen") ?? undefined} />, mount);
      return;
    }
    render(<App key={key} config={cfg} />, mount);
  }
}

if (typeof customElements !== "undefined" && !customElements.get("strike-trade")) {
  customElements.define("strike-trade", StrikeTradeElement);
}

export { StrikeEverywhere };
if (typeof window !== "undefined") (window as any).StrikeEverywhere = Object.assign((window as any).StrikeEverywhere ?? {}, { VERSION, Client: StrikeEverywhere, Element: StrikeTradeElement });
