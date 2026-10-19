(function () {
  var STRIKE = "https://api.strikefinance.org";
  var ORDER = ["BTC-USD", "ETH-USD", "ADA-USD", "SOL-USD", "XRP-USD", "HYPE-USD", "NVDA-USD", "XAU-USD", "SP500-USD", "TSLA-USD", "ZEC-USD", "NIGHT-USD"];
  function fmtPrice(v) { return v >= 1000 ? v.toLocaleString("en-US", { maximumFractionDigits: 0 }) : v >= 1 ? v.toFixed(2) : v.toFixed(4); }
  function render(el, tickers) {
    var by = {}; tickers.forEach(function (t) { by[t.symbol] = t; });
    var items = ORDER.filter(function (s) { return by[s]; }).map(function (s) {
      var t = by[s], c = Number(t.priceChangePercent);
      return '<span class="t">' + s + ' <span class="c">' + fmtPrice(Number(t.lastPrice)) + '</span> <span class="c ' + (c >= 0 ? "pos" : "neg") + '">' + (c >= 0 ? "+" : "") + c.toFixed(2) + "%</span></span>";
    });
    el.innerHTML = '<span class="live"><span class="dot pulse"></span>Live from Strike</span>' + items.join("");
  }
  window.SEChrome = {
    ticker: function (el) {
      if (!el) return;
      var load = function () {
        fetch(STRIKE + "/price/v2/ticker/24hr").then(function (r) { return r.json(); }).then(function (t) { render(el, t || []); }).catch(function () {});
      };
      load();
      setInterval(load, 20000);
    },
    strikeStats: function () {
      return Promise.all([
        fetch(STRIKE + "/price/v2/ticker/24hr").then(function (r) { return r.json(); }),
        fetch(STRIKE + "/v2/markets").then(function (r) { return r.json(); }),
      ]).then(function (res) {
        var vol = (res[0] || []).reduce(function (n, t) { return n + Number(t.quoteVolume || 0); }, 0);
        var markets = Object.values(res[1].markets || {}).filter(function (m) { return m.status === "trading"; }).length;
        return { volume24h: vol, markets: markets };
      });
    },
  };
})();
