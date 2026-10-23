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
  var ICON = "https://app.strikefinance.org/images/";
  var tradingCache = null;
  function tradingSymbols() {
    if (!tradingCache) {
      tradingCache = getJSON(STRIKE + "/v2/markets", 8000).then(function (j) {
        var set = {};
        Object.values((j && j.markets) || {}).forEach(function (m) { if (m && m.status === "trading" && m.symbol) set[m.symbol] = true; });
        return set;
      }).catch(function () { tradingCache = null; return null; });
    }
    return tradingCache;
  }
  function onlyTrading(tickers, set) {
    return (Array.isArray(tickers) ? tickers : []).filter(function (t) { return t && (!set || set[t.symbol]); });
  }
  function fmtPrice(v) { return v >= 1000 ? v.toLocaleString("en-US", { maximumFractionDigits: 0 }) : v >= 1 ? v.toFixed(2) : v.toFixed(4); }
  function fmtChg(c) { return (c >= 0 ? "+" : "") + c.toFixed(2) + "%"; }
  function iconFallback(root) {
    root.querySelectorAll("img[data-b]").forEach(function (img) {
      img.addEventListener("error", function () {
        if (!img.dataset.tried) { img.dataset.tried = "1"; img.src = img.src.replace(/\.webp$/, ".svg"); return; }
        var ph = document.createElement("span"); ph.className = "ph"; ph.textContent = (img.dataset.b || "?").slice(0, 1); img.replaceWith(ph);
      });
    });
  }
  function render(el, tickers) {
    var by = {}; (Array.isArray(tickers) ? tickers : []).forEach(function (t) { if (t && t.symbol) by[t.symbol] = t; });
    var items = [];
    ORDER.forEach(function (s) {
      var t = by[s]; if (!t) return;
      var px = Number(t.lastPrice), c = Number(t.priceChangePercent);
      if (!isFinite(px) || !isFinite(c)) return;
      var base = s.replace(/-USD$/, "");
      items.push('<span class="t" data-s="' + s + '"><img alt="" src="' + ICON + encodeURIComponent(base.toLowerCase()) + '.webp" data-b="' + base + '" /><b>' + base + '</b><span class="px">' + fmtPrice(px) + '</span><span class="ch ' + (c >= 0 ? "pos" : "neg") + '">' + fmtChg(c) + "</span></span>");
    });
    if (!items.length) return false;
    if (!el._seBelt) {
      el.innerHTML = '<span class="lab"><span class="dot"></span>Live from Strike</span><div class="vp"><div class="belt"></div></div>';
      el._seBelt = el.querySelector(".belt");
    }
    el._seBelt.innerHTML = items.join("") + items.join("");
    iconFallback(el._seBelt);
    return true;
  }
  function live(el) {
    var WS_URL = "wss://api.strikefinance.org/ws/price", ws = null, retry = 0, ping = null;
    function apply(it) {
      if (!it || it.e !== "24hrMiniTicker" || !it.s || !el._seBelt) return;
      var c = Number(it.c), o = Number(it.o);
      if (!(c > 0)) return;
      var chg = o > 0 ? ((c - o) / o) * 100 : null;
      el._seBelt.querySelectorAll('.t[data-s="' + it.s + '"]').forEach(function (t) {
        var px = t.querySelector(".px"), ch = t.querySelector(".ch"), txt = fmtPrice(c);
        if (px.textContent !== txt) {
          var prev = Number(px.dataset.v || 0);
          px.textContent = txt; px.dataset.v = c;
          if (prev) { px.classList.remove("up", "down"); void px.offsetWidth; px.classList.add(c >= prev ? "up" : "down"); setTimeout(function () { px.classList.remove("up", "down"); }, 700); }
        } else if (!px.dataset.v) px.dataset.v = c;
        if (chg !== null) { ch.textContent = fmtChg(chg); ch.className = "ch " + (chg >= 0 ? "pos" : "neg"); }
      });
    }
    function open() {
      if (typeof WebSocket !== "function") return;
      try { ws = new WebSocket(WS_URL); } catch (e) { return later(); }
      ws.onopen = function () {
        retry = 0;
        ws.send(JSON.stringify({ method: "subscribe", channel: "!miniticker@arr", id: 1 }));
        clearInterval(ping); ping = setInterval(function () { try { ws.send(JSON.stringify({ method: "ping", id: "hb" })); } catch (e) {} }, 30000);
      };
      ws.onmessage = function (ev) {
        String(ev.data || "").split("\n").forEach(function (line) {
          if (!line.trim()) return;
          var m; try { m = JSON.parse(line); } catch (e) { return; }
          var arr = Array.isArray(m) ? m : Array.isArray(m && m.data) ? m.data : m && m.data ? [m.data] : [m];
          arr.forEach(apply);
        });
      };
      ws.onclose = function () { clearInterval(ping); later(); };
      ws.onerror = function () { try { ws.close(); } catch (e) {} };
    }
    function later() { retry = Math.min(retry + 1, 6); setTimeout(function () { if (!document.hidden) open(); else document.addEventListener("visibilitychange", function once() { document.removeEventListener("visibilitychange", once); open(); }); }, 1000 * Math.pow(2, retry)); }
    open();
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
  var BUILDERS = { testnet: ["Playground101"], mainnet: ["StrikeOn"] };
  function builder(v, net) {
    var list = BUILDERS[net] || [];
    v = String(v || "").trim();
    return list.indexOf(v) >= 0 ? v : list[0] || "Playground101";
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
    navMenus(nav);
    toTop();
  }

  function navMenus(nav) {
    var dds = nav.querySelectorAll(".se-dd");
    var close = function (except) {
      dds.forEach(function (d) { if (d !== except) { d.classList.remove("open"); d.querySelector(".se-dd-btn").setAttribute("aria-expanded", "false"); } });
    };
    dds.forEach(function (d) {
      d.querySelector(".se-dd-btn").addEventListener("click", function () {
        var open = !d.classList.contains("open");
        close(d); d.classList.toggle("open", open); this.setAttribute("aria-expanded", String(open));
      });
    });
    document.addEventListener("click", function (e) { if (!e.target.closest(".se-dd")) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  function toTop() {
    var b = document.createElement("button");
    b.type = "button"; b.className = "icon-btn totop"; b.setAttribute("aria-label", "Back to top"); b.title = "Back to top";
    b.innerHTML = '<svg viewBox="0 0 16 16" fill="none"><path d="M8 13V3.5M3.5 8 8 3.5 12.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    b.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    });
    document.body.appendChild(b);
    var on = function () { b.classList.toggle("show", window.scrollY > window.innerHeight); };
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
    var copied = function () {
      btn.innerHTML = '<svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>Copied';
      clearTimeout(btn._seT); btn._seT = setTimeout(function () { btn.textContent = label; }, 1500);
    };
    var fallback = function () {
      var ok = false, ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0";
      document.body.appendChild(ta); ta.select();
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      if (ok) return copied();
      if (typeof src === "string") return say("Copy failed", 2000);
      try { var r = document.createRange(); r.selectNodeContents(src); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); } catch (e) {}
      say(/Mac|iPhone|iPad/.test(navigator.platform || "") ? "Press ⌘C" : "Press Ctrl+C", 3000);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(copied).catch(fallback);
    } else fallback();
  }

  window.SEChrome = {
    PARTNER_API: PARTNER_API,
    partnerApi: partnerApi,
    network: network,
    builder: builder,
    copy: copy,
    esc: esc,
    highlight: highlight,
    navGlass: navGlass,
    reveal: reveal,
    getJSON: getJSON,
    tradingSymbols: tradingSymbols,
    onlyTrading: onlyTrading,
    ticker: function (el) {
      if (!el) return;
      var shown = false, busy = false, lastAt = 0;
      var load = function () {
        if (busy) return;
        busy = true; lastAt = Date.now();
        Promise.all([getJSON(STRIKE + "/price/v2/ticker/24hr", 8000), tradingSymbols()])
          .then(function (r) { if (render(el, onlyTrading(r[0], r[1]))) shown = true; else if (!shown) unavailable(el); })
          .catch(function () { if (!shown) unavailable(el); })
          .then(function () { busy = false; });
      };
      load();
      live(el);
      setInterval(function () { if (!document.hidden) load(); }, 60000);
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
