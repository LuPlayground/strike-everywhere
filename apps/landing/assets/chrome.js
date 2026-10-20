(function () {
  var STRIKE = "https://api.strikefinance.org";
  var PARTNER_API = "https://strike-everywhere-api.strike-everywhere.workers.dev";
  var ORDER = ["BTC-USD", "ETH-USD", "ADA-USD", "SOL-USD", "XRP-USD", "HYPE-USD", "NVDA-USD", "XAU-USD", "SP500-USD", "TSLA-USD", "ZEC-USD", "NIGHT-USD"];

  function getJSON(url, ms) {
    var ctl = typeof AbortController === "function" ? new AbortController() : null;
    var timer = ctl ? setTimeout(function () { ctl.abort(); }, ms || 8000) : null;
    return fetch(url, ctl ? { signal: ctl.signal } : undefined)
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (j) { clearTimeout(timer); return j; }, function (e) { clearTimeout(timer); throw e; });
  }
  function fmtPrice(v) { return v >= 1000 ? v.toLocaleString("en-US", { maximumFractionDigits: 0 }) : v >= 1 ? v.toFixed(2) : v.toFixed(4); }
  function render(el, tickers) {
    var by = {}; (Array.isArray(tickers) ? tickers : []).forEach(function (t) { if (t && t.symbol) by[t.symbol] = t; });
    var items = [];
    ORDER.forEach(function (s) {
      var t = by[s]; if (!t) return;
      var px = Number(t.lastPrice), c = Number(t.priceChangePercent);
      if (!isFinite(px) || !isFinite(c)) return;
      items.push('<span class="t">' + s + ' <span class="c">' + fmtPrice(px) + '</span> <span class="c ' + (c >= 0 ? "pos" : "neg") + '">' + (c >= 0 ? "+" : "") + c.toFixed(2) + "%</span></span>");
    });
    if (!items.length) return false;
    el.innerHTML = '<span class="live"><span class="dot pulse"></span>Live from Strike</span>' + items.join("");
    return true;
  }
  function unavailable(el) { el.innerHTML = '<span class="off">Live prices unavailable</span>'; }

  function partnerApi(v) {
    v = String(v || "").trim().replace(/\/+$/, "");
    return v === PARTNER_API || /^http:\/\/(localhost|127\.0\.0\.1):\d{1,5}$/.test(v) ? v : PARTNER_API;
  }
  function network(v, fallback) {
    v = String(v || "").trim().toLowerCase();
    return v === "mainnet" || v === "testnet" ? v : fallback;
  }

  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  var RX = /(\/\/[^\n]*|<!--[\s\S]*?-->)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|(<\/?[a-zA-Z][\w-]*|\/?>)|\b(import|from|const|await|export|function|return|new|async|if|declare|module|namespace|interface)\b|([a-zA-Z][\w-]*)(?==)/g;
  function highlight(src) {
    var out = "", last = 0, m;
    RX.lastIndex = 0;
    while ((m = RX.exec(src))) {
      out += esc(src.slice(last, m.index));
      out += '<span class="tk-' + (m[1] ? "c" : m[2] ? "s" : m[3] ? "k" : m[4] ? "w" : "a") + '">' + esc(m[0]) + "</span>";
      last = RX.lastIndex;
    }
    out += esc(src.slice(last));
    return out.split("\n").map(function (l) { return '<span class="l">' + (l || " ") + "</span>"; }).join("");
  }

  function navGlass(nav) {
    if (!nav) return;
    var on = function () { nav.classList.toggle("scrolled", window.scrollY > 24); };
    window.addEventListener("scroll", on, { passive: true }); on();
  }

  function reveal() {
    var rv = document.querySelectorAll(".rv");
    var all = function () { rv.forEach(function (n) { n.classList.add("vis"); }); };
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return all();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    rv.forEach(function (n) { io.observe(n); });
    setTimeout(all, 4000);
    window.addEventListener("beforeprint", all);
  }

  function copy(src, btn, label) {
    var text = typeof src === "string" ? src : src.textContent;
    var say = function (msg, ms) { btn.textContent = msg; clearTimeout(btn._seT); btn._seT = setTimeout(function () { btn.textContent = label; }, ms); };
    var fallback = function () {
      var ok = false, ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0";
      document.body.appendChild(ta); ta.select();
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      if (ok) return say("Copied ✓", 1500);
      if (typeof src === "string") return say("Copy failed", 2000);
      try { var r = document.createRange(); r.selectNodeContents(src); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); } catch (e) {}
      say(/Mac|iPhone|iPad/.test(navigator.platform || "") ? "Press ⌘C" : "Press Ctrl+C", 3000);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { say("Copied ✓", 1500); }).catch(fallback);
    } else fallback();
  }

  window.SEChrome = {
    PARTNER_API: PARTNER_API,
    partnerApi: partnerApi,
    network: network,
    copy: copy,
    esc: esc,
    highlight: highlight,
    navGlass: navGlass,
    reveal: reveal,
    getJSON: getJSON,
    ticker: function (el) {
      if (!el) return;
      var shown = false, busy = false, lastAt = 0;
      var load = function () {
        if (busy) return;
        busy = true; lastAt = Date.now();
        getJSON(STRIKE + "/price/v2/ticker/24hr", 8000)
          .then(function (t) { if (render(el, t)) shown = true; else if (!shown) unavailable(el); })
          .catch(function () { if (!shown) unavailable(el); })
          .then(function () { busy = false; });
      };
      load();
      setInterval(function () { if (!document.hidden) load(); }, 20000);
      document.addEventListener("visibilitychange", function () { if (!document.hidden && Date.now() - lastAt > 20000) load(); });
    },
    strikeStats: function () {
      return Promise.all([getJSON(STRIKE + "/price/v2/ticker/24hr"), getJSON(STRIKE + "/v2/markets")]).then(function (res) {
        var vol = (Array.isArray(res[0]) ? res[0] : []).reduce(function (n, t) { var v = Number(t && t.quoteVolume); return n + (isFinite(v) ? v : 0); }, 0);
        var markets = Object.values((res[1] && res[1].markets) || {}).filter(function (m) { return m && m.status === "trading"; }).length;
        return { volume24h: vol, markets: markets };
      });
    },
  };
})();
