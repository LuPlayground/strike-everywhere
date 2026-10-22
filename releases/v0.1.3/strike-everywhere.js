var ll = Object.defineProperty;
var cl = (t, n, i) => n in t ? ll(t, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[n] = i;
var ee = (t, n, i) => cl(t, typeof n != "symbol" ? n + "" : n, i);
var dr, Me, Ja, Sn, Js, Qa, Vr, ns, Kr, Yr, Si = {}, eo = [], dl = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, is = Array.isArray;
function bn(t, n) {
  for (var i in n) t[i] = n[i];
  return t;
}
function to(t) {
  t && t.parentNode && t.parentNode.removeChild(t);
}
function pl(t, n, i) {
  var r, s, a, o = {};
  for (a in n) a == "key" ? r = n[a] : a == "ref" ? s = n[a] : o[a] = n[a];
  if (arguments.length > 2 && (o.children = arguments.length > 3 ? dr.call(arguments, 2) : i), typeof t == "function" && t.defaultProps != null) for (a in t.defaultProps) o[a] === void 0 && (o[a] = t.defaultProps[a]);
  return Ki(t, o, r, s, null);
}
function Ki(t, n, i, r, s) {
  var a = { type: t, props: n, key: i, ref: r, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: s ?? ++Ja, __i: -1, __u: 0 };
  return s == null && Me.vnode != null && Me.vnode(a), a;
}
function R(t) {
  return t.children;
}
function Yi(t, n) {
  this.props = t, this.context = n;
}
function jn(t, n) {
  if (n == null) return t.__ ? jn(t.__, t.__i + 1) : null;
  for (var i; n < t.__k.length; n++) if ((i = t.__k[n]) != null && i.__e != null) return i.__e;
  return typeof t.type == "function" ? jn(t) : null;
}
function no(t) {
  var n, i;
  if ((t = t.__) != null && t.__c != null) {
    for (t.__e = t.__c.base = null, n = 0; n < t.__k.length; n++) if ((i = t.__k[n]) != null && i.__e != null) {
      t.__e = t.__c.base = i.__e;
      break;
    }
    return no(t);
  }
}
function Qs(t) {
  (!t.__d && (t.__d = !0) && Sn.push(t) && !er.__r++ || Js !== Me.debounceRendering) && ((Js = Me.debounceRendering) || Qa)(er);
}
function er() {
  var t, n, i, r, s, a, o, l;
  for (Sn.sort(Vr); t = Sn.shift(); ) t.__d && (n = Sn.length, r = void 0, a = (s = (i = t).__v).__e, o = [], l = [], i.__P && ((r = bn({}, s)).__v = s.__v + 1, Me.vnode && Me.vnode(r), rs(i.__P, r, s, i.__n, i.__P.namespaceURI, 32 & s.__u ? [a] : null, o, a ?? jn(s), !!(32 & s.__u), l), r.__v = s.__v, r.__.__k[r.__i] = r, so(o, r, l), r.__e != a && no(r)), Sn.length > n && Sn.sort(Vr));
  er.__r = 0;
}
function io(t, n, i, r, s, a, o, l, d, p, u) {
  var c, h, g, f, y, k = r && r.__k || eo, _ = n.length;
  for (i.__d = d, ul(i, n, k), d = i.__d, c = 0; c < _; c++) (g = i.__k[c]) != null && (h = g.__i === -1 ? Si : k[g.__i] || Si, g.__i = c, rs(t, g, h, s, a, o, l, d, p, u), f = g.__e, g.ref && h.ref != g.ref && (h.ref && ss(h.ref, null, g), u.push(g.ref, g.__c || f, g)), y == null && f != null && (y = f), 65536 & g.__u || h.__k === g.__k ? d = ro(g, d, t) : typeof g.type == "function" && g.__d !== void 0 ? d = g.__d : f && (d = f.nextSibling), g.__d = void 0, g.__u &= -196609);
  i.__d = d, i.__e = y;
}
function ul(t, n, i) {
  var r, s, a, o, l, d = n.length, p = i.length, u = p, c = 0;
  for (t.__k = [], r = 0; r < d; r++) (s = n[r]) != null && typeof s != "boolean" && typeof s != "function" ? (o = r + c, (s = t.__k[r] = typeof s == "string" || typeof s == "number" || typeof s == "bigint" || s.constructor == String ? Ki(null, s, null, null, null) : is(s) ? Ki(R, { children: s }, null, null, null) : s.constructor === void 0 && s.__b > 0 ? Ki(s.type, s.props, s.key, s.ref ? s.ref : null, s.__v) : s).__ = t, s.__b = t.__b + 1, a = null, (l = s.__i = hl(s, i, o, u)) !== -1 && (u--, (a = i[l]) && (a.__u |= 131072)), a == null || a.__v === null ? (l == -1 && c--, typeof s.type != "function" && (s.__u |= 65536)) : l !== o && (l == o - 1 ? c-- : l == o + 1 ? c++ : (l > o ? c-- : c++, s.__u |= 65536))) : s = t.__k[r] = null;
  if (u) for (r = 0; r < p; r++) (a = i[r]) != null && !(131072 & a.__u) && (a.__e == t.__d && (t.__d = jn(a)), ao(a, a));
}
function ro(t, n, i) {
  var r, s;
  if (typeof t.type == "function") {
    for (r = t.__k, s = 0; r && s < r.length; s++) r[s] && (r[s].__ = t, n = ro(r[s], n, i));
    return n;
  }
  t.__e != n && (n && t.type && !i.contains(n) && (n = jn(t)), i.insertBefore(t.__e, n || null), n = t.__e);
  do
    n = n && n.nextSibling;
  while (n != null && n.nodeType === 8);
  return n;
}
function hl(t, n, i, r) {
  var s = t.key, a = t.type, o = i - 1, l = i + 1, d = n[i];
  if (d === null || d && s == d.key && a === d.type && !(131072 & d.__u)) return i;
  if (r > (d != null && !(131072 & d.__u) ? 1 : 0)) for (; o >= 0 || l < n.length; ) {
    if (o >= 0) {
      if ((d = n[o]) && !(131072 & d.__u) && s == d.key && a === d.type) return o;
      o--;
    }
    if (l < n.length) {
      if ((d = n[l]) && !(131072 & d.__u) && s == d.key && a === d.type) return l;
      l++;
    }
  }
  return -1;
}
function ea(t, n, i) {
  n[0] === "-" ? t.setProperty(n, i ?? "") : t[n] = i == null ? "" : typeof i != "number" || dl.test(n) ? i : i + "px";
}
function Wi(t, n, i, r, s) {
  var a;
  e: if (n === "style") if (typeof i == "string") t.style.cssText = i;
  else {
    if (typeof r == "string" && (t.style.cssText = r = ""), r) for (n in r) i && n in i || ea(t.style, n, "");
    if (i) for (n in i) r && i[n] === r[n] || ea(t.style, n, i[n]);
  }
  else if (n[0] === "o" && n[1] === "n") a = n !== (n = n.replace(/(PointerCapture)$|Capture$/i, "$1")), n = n.toLowerCase() in t || n === "onFocusOut" || n === "onFocusIn" ? n.toLowerCase().slice(2) : n.slice(2), t.l || (t.l = {}), t.l[n + a] = i, i ? r ? i.u = r.u : (i.u = ns, t.addEventListener(n, a ? Yr : Kr, a)) : t.removeEventListener(n, a ? Yr : Kr, a);
  else {
    if (s == "http://www.w3.org/2000/svg") n = n.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (n != "width" && n != "height" && n != "href" && n != "list" && n != "form" && n != "tabIndex" && n != "download" && n != "rowSpan" && n != "colSpan" && n != "role" && n != "popover" && n in t) try {
      t[n] = i ?? "";
      break e;
    } catch {
    }
    typeof i == "function" || (i == null || i === !1 && n[4] !== "-" ? t.removeAttribute(n) : t.setAttribute(n, n == "popover" && i == 1 ? "" : i));
  }
}
function ta(t) {
  return function(n) {
    if (this.l) {
      var i = this.l[n.type + t];
      if (n.t == null) n.t = ns++;
      else if (n.t < i.u) return;
      return i(Me.event ? Me.event(n) : n);
    }
  };
}
function rs(t, n, i, r, s, a, o, l, d, p) {
  var u, c, h, g, f, y, k, _, w, z, C, v, $, S, B, x, M = n.type;
  if (n.constructor !== void 0) return null;
  128 & i.__u && (d = !!(32 & i.__u), a = [l = n.__e = i.__e]), (u = Me.__b) && u(n);
  e: if (typeof M == "function") try {
    if (_ = n.props, w = "prototype" in M && M.prototype.render, z = (u = M.contextType) && r[u.__c], C = u ? z ? z.props.value : u.__ : r, i.__c ? k = (c = n.__c = i.__c).__ = c.__E : (w ? n.__c = c = new M(_, C) : (n.__c = c = new Yi(_, C), c.constructor = M, c.render = gl), z && z.sub(c), c.props = _, c.state || (c.state = {}), c.context = C, c.__n = r, h = c.__d = !0, c.__h = [], c._sb = []), w && c.__s == null && (c.__s = c.state), w && M.getDerivedStateFromProps != null && (c.__s == c.state && (c.__s = bn({}, c.__s)), bn(c.__s, M.getDerivedStateFromProps(_, c.__s))), g = c.props, f = c.state, c.__v = n, h) w && M.getDerivedStateFromProps == null && c.componentWillMount != null && c.componentWillMount(), w && c.componentDidMount != null && c.__h.push(c.componentDidMount);
    else {
      if (w && M.getDerivedStateFromProps == null && _ !== g && c.componentWillReceiveProps != null && c.componentWillReceiveProps(_, C), !c.__e && (c.shouldComponentUpdate != null && c.shouldComponentUpdate(_, c.__s, C) === !1 || n.__v === i.__v)) {
        for (n.__v !== i.__v && (c.props = _, c.state = c.__s, c.__d = !1), n.__e = i.__e, n.__k = i.__k, n.__k.some(function(T) {
          T && (T.__ = n);
        }), v = 0; v < c._sb.length; v++) c.__h.push(c._sb[v]);
        c._sb = [], c.__h.length && o.push(c);
        break e;
      }
      c.componentWillUpdate != null && c.componentWillUpdate(_, c.__s, C), w && c.componentDidUpdate != null && c.__h.push(function() {
        c.componentDidUpdate(g, f, y);
      });
    }
    if (c.context = C, c.props = _, c.__P = t, c.__e = !1, $ = Me.__r, S = 0, w) {
      for (c.state = c.__s, c.__d = !1, $ && $(n), u = c.render(c.props, c.state, c.context), B = 0; B < c._sb.length; B++) c.__h.push(c._sb[B]);
      c._sb = [];
    } else do
      c.__d = !1, $ && $(n), u = c.render(c.props, c.state, c.context), c.state = c.__s;
    while (c.__d && ++S < 25);
    c.state = c.__s, c.getChildContext != null && (r = bn(bn({}, r), c.getChildContext())), w && !h && c.getSnapshotBeforeUpdate != null && (y = c.getSnapshotBeforeUpdate(g, f)), io(t, is(x = u != null && u.type === R && u.key == null ? u.props.children : u) ? x : [x], n, i, r, s, a, o, l, d, p), c.base = n.__e, n.__u &= -161, c.__h.length && o.push(c), k && (c.__E = c.__ = null);
  } catch (T) {
    if (n.__v = null, d || a != null) {
      for (n.__u |= d ? 160 : 128; l && l.nodeType === 8 && l.nextSibling; ) l = l.nextSibling;
      a[a.indexOf(l)] = null, n.__e = l;
    } else n.__e = i.__e, n.__k = i.__k;
    Me.__e(T, n, i);
  }
  else a == null && n.__v === i.__v ? (n.__k = i.__k, n.__e = i.__e) : n.__e = ml(i.__e, n, i, r, s, a, o, d, p);
  (u = Me.diffed) && u(n);
}
function so(t, n, i) {
  n.__d = void 0;
  for (var r = 0; r < i.length; r++) ss(i[r], i[++r], i[++r]);
  Me.__c && Me.__c(n, t), t.some(function(s) {
    try {
      t = s.__h, s.__h = [], t.some(function(a) {
        a.call(s);
      });
    } catch (a) {
      Me.__e(a, s.__v);
    }
  });
}
function ml(t, n, i, r, s, a, o, l, d) {
  var p, u, c, h, g, f, y, k = i.props, _ = n.props, w = n.type;
  if (w === "svg" ? s = "http://www.w3.org/2000/svg" : w === "math" ? s = "http://www.w3.org/1998/Math/MathML" : s || (s = "http://www.w3.org/1999/xhtml"), a != null) {
    for (p = 0; p < a.length; p++) if ((g = a[p]) && "setAttribute" in g == !!w && (w ? g.localName === w : g.nodeType === 3)) {
      t = g, a[p] = null;
      break;
    }
  }
  if (t == null) {
    if (w === null) return document.createTextNode(_);
    t = document.createElementNS(s, w, _.is && _), l && (Me.__m && Me.__m(n, a), l = !1), a = null;
  }
  if (w === null) k === _ || l && t.data === _ || (t.data = _);
  else {
    if (a = a && dr.call(t.childNodes), k = i.props || Si, !l && a != null) for (k = {}, p = 0; p < t.attributes.length; p++) k[(g = t.attributes[p]).name] = g.value;
    for (p in k) if (g = k[p], p != "children") {
      if (p == "dangerouslySetInnerHTML") c = g;
      else if (!(p in _)) {
        if (p == "value" && "defaultValue" in _ || p == "checked" && "defaultChecked" in _) continue;
        Wi(t, p, null, g, s);
      }
    }
    for (p in _) g = _[p], p == "children" ? h = g : p == "dangerouslySetInnerHTML" ? u = g : p == "value" ? f = g : p == "checked" ? y = g : l && typeof g != "function" || k[p] === g || Wi(t, p, g, k[p], s);
    if (u) l || c && (u.__html === c.__html || u.__html === t.innerHTML) || (t.innerHTML = u.__html), n.__k = [];
    else if (c && (t.innerHTML = ""), io(t, is(h) ? h : [h], n, i, r, w === "foreignObject" ? "http://www.w3.org/1999/xhtml" : s, a, o, a ? a[0] : i.__k && jn(i, 0), l, d), a != null) for (p = a.length; p--; ) to(a[p]);
    l || (p = "value", w === "progress" && f == null ? t.removeAttribute("value") : f !== void 0 && (f !== t[p] || w === "progress" && !f || w === "option" && f !== k[p]) && Wi(t, p, f, k[p], s), p = "checked", y !== void 0 && y !== t[p] && Wi(t, p, y, k[p], s));
  }
  return t;
}
function ss(t, n, i) {
  try {
    if (typeof t == "function") {
      var r = typeof t.__u == "function";
      r && t.__u(), r && n == null || (t.__u = t(n));
    } else t.current = n;
  } catch (s) {
    Me.__e(s, i);
  }
}
function ao(t, n, i) {
  var r, s;
  if (Me.unmount && Me.unmount(t), (r = t.ref) && (r.current && r.current !== t.__e || ss(r, null, n)), (r = t.__c) != null) {
    if (r.componentWillUnmount) try {
      r.componentWillUnmount();
    } catch (a) {
      Me.__e(a, n);
    }
    r.base = r.__P = null;
  }
  if (r = t.__k) for (s = 0; s < r.length; s++) r[s] && ao(r[s], n, i || typeof t.type != "function");
  i || to(t.__e), t.__c = t.__ = t.__e = t.__d = void 0;
}
function gl(t, n, i) {
  return this.constructor(t, i);
}
function ji(t, n, i) {
  var r, s, a, o;
  Me.__ && Me.__(t, n), s = (r = !1) ? null : n.__k, a = [], o = [], rs(n, t = n.__k = pl(R, null, [t]), s || Si, Si, n.namespaceURI, s ? null : n.firstChild ? dr.call(n.childNodes) : null, a, s ? s.__e : n.firstChild, r, o), so(a, t, o);
}
dr = eo.slice, Me = { __e: function(t, n, i, r) {
  for (var s, a, o; n = n.__; ) if ((s = n.__c) && !s.__) try {
    if ((a = s.constructor) && a.getDerivedStateFromError != null && (s.setState(a.getDerivedStateFromError(t)), o = s.__d), s.componentDidCatch != null && (s.componentDidCatch(t, r || {}), o = s.__d), o) return s.__E = s;
  } catch (l) {
    t = l;
  }
  throw t;
} }, Ja = 0, Yi.prototype.setState = function(t, n) {
  var i;
  i = this.__s != null && this.__s !== this.state ? this.__s : this.__s = bn({}, this.state), typeof t == "function" && (t = t(bn({}, i), this.props)), t && bn(i, t), t != null && this.__v && (n && this._sb.push(n), Qs(this));
}, Yi.prototype.forceUpdate = function(t) {
  this.__v && (this.__e = !0, t && this.__h.push(t), Qs(this));
}, Yi.prototype.render = R, Sn = [], Qa = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Vr = function(t, n) {
  return t.__v.__b - n.__v.__b;
}, er.__r = 0, ns = 0, Kr = ta(!1), Yr = ta(!0);
var fl = 0;
function e(t, n, i, r, s, a) {
  n || (n = {});
  var o, l, d = n;
  "ref" in n && (o = n.ref, delete n.ref);
  var p = { type: t, props: d, key: i, ref: o, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: --fl, __i: -1, __u: 0, __source: s, __self: a };
  if (typeof t == "function" && (o = t.defaultProps)) for (l in o) d[l] === void 0 && (d[l] = o[l]);
  return Me.vnode && Me.vnode(p), p;
}
const bl = {
  mainnet: {
    network: "mainnet",
    api: "https://api.strikefinance.org",
    price: "https://api.strikefinance.org/price",
    stat: "https://api.strikefinance.org/stat",
    wsPrice: "wss://api.strikefinance.org/ws/price",
    wsUser: "wss://api.strikefinance.org/ws/user-api",
    app: "https://app.strikefinance.org",
    cardanoNetworkId: 1,
    cardanoAddressPrefix: "addr"
  },
  testnet: {
    network: "testnet",
    api: "https://api-v2-testnet.strikefinance.org",
    price: "https://api-v2-testnet.strikefinance.org/price",
    stat: "https://api-v2-testnet.strikefinance.org/stat",
    wsPrice: "wss://api-v2-testnet.strikefinance.org/ws/price",
    wsUser: "wss://api-v2-testnet.strikefinance.org/ws/user-api",
    app: "https://testnet.strikefinance.org",
    cardanoNetworkId: 0,
    cardanoAddressPrefix: "addr_test"
  }
}, Wt = 100, xl = 100;
function vn(t) {
  const n = t.replace(/^0x/i, "");
  if (n.length % 2 !== 0 || /[^0-9a-f]/i.test(n)) throw new Error("invalid hex string");
  const i = new Uint8Array(n.length / 2);
  for (let r = 0; r < i.length; r++) i[r] = parseInt(n.substr(r * 2, 2), 16);
  return i;
}
function ct(t) {
  let n = "";
  for (const i of t) n += i.toString(16).padStart(2, "0");
  return n;
}
const zn = (t) => new TextEncoder().encode(t);
function tr(...t) {
  const n = new Uint8Array(t.reduce((r, s) => r + s.length, 0));
  let i = 0;
  for (const r of t)
    n.set(r, i), i += r.length;
  return n;
}
async function vl(t) {
  const n = typeof t == "string" ? zn(t) : t, i = await globalThis.crypto.subtle.digest("SHA-256", n);
  return ct(new Uint8Array(i));
}
function Ot() {
  return globalThis.crypto.randomUUID();
}
function pr(t) {
  if (!isFinite(t) || t <= 0) return 8;
  const n = t.toString();
  return n.includes("e-") ? Number(n.split("e-")[1]) : (n.split(".")[1] ?? "").length;
}
function ue(t, n, i = "round") {
  const r = pr(n), s = t / n;
  return ((i === "floor" ? Math.floor(s + 1e-9) : i === "ceil" ? Math.ceil(s - 1e-9) : Math.round(s)) * n).toFixed(r);
}
function ge(t, n = {}) {
  if (!isFinite(t)) return "—";
  const i = n.decimals ?? (Math.abs(t) >= 1e3 ? 0 : 2), r = Math.abs(t).toLocaleString("en-US", { minimumFractionDigits: i, maximumFractionDigits: i });
  return `${t < 0 ? "-" : n.sign && t > 0 ? "+" : ""}$${r}`;
}
function we(t, n) {
  if (!isFinite(t)) return "—";
  const i = n ? pr(n) : t >= 1e3 ? 2 : t >= 1 ? 4 : 5;
  return t.toLocaleString("en-US", { minimumFractionDigits: i, maximumFractionDigits: i });
}
function Xr(t, n = 2) {
  return isFinite(t) ? `${t > 0 ? "+" : ""}${t.toFixed(n)}%` : "—";
}
function ur(t) {
  const n = Number(t.iso_balance);
  return t.margin_mode === "isolated" && n > 0 ? n : Math.abs(Number(t.size)) * Number(t.entry_price) / Math.max(1, Number(t.leverage) || 1);
}
function oo(t, n) {
  const i = [...t].sort((r, s) => Number(r.max_notional) - Number(s.max_notional));
  return i.find((r) => n <= Number(r.max_notional)) ?? i[i.length - 1];
}
function Gn(t, n) {
  return oo(t, n)?.max_leverage ?? 1;
}
function lo(t) {
  const n = oo(t.tiers, t.notional), i = Number(n?.maintenance_margin_rate ?? 0.01), r = Number(n?.maintenance_amount ?? 0), s = t.notional / t.entry, a = t.notional / t.leverage;
  return t.side === "buy" ? Math.max(0, (s * t.entry - a - r) / (s * (1 - i))) : (a + s * t.entry + r) / (s * (1 + i));
}
function Zr(t) {
  const n = t.notional * t.takerRate, i = t.notional * t.builderFeeBps / 1e4, r = lo({ side: t.side, entry: t.price, leverage: t.leverage, notional: t.notional, tiers: t.tiers });
  return {
    notional: t.notional,
    margin: t.notional / t.leverage,
    strikeFee: n,
    builderFee: i,
    totalFee: n + i,
    liquidationPrice: r,
    liquidationDistance: t.price > 0 ? Math.abs(t.price - r) / t.price : 0
  };
}
function Tn(t) {
  return Number.isFinite(t) ? t.toLocaleString("en-US", { maximumFractionDigits: 8 }) : "—";
}
function Pi(t, n) {
  if (!(t > 0) || !Number.isFinite(n)) return "";
  const i = (n - t) / t * 100, r = Math.abs(i), s = r < 10 ? r.toFixed(1) : r.toFixed(0);
  return `${Number(s) === 0 ? "" : i < 0 ? "−" : "+"}${s}%`;
}
function Xi(t, n) {
  return t ? `${t > 0 ? "Long" : "Short"} ${Tn(Math.abs(t))} ${n}` : "";
}
function kl(t, n, i, r = !1) {
  const s = t + (n === "buy" ? i : -i);
  return r && Math.sign(s) !== Math.sign(t) || Math.abs(s) < 1e-12 ? 0 : s;
}
function as(t, n) {
  if (t !== "buy" && t !== "sell") return "";
  const i = !!n;
  return t === "buy" ? i ? "Close Short" : "Open Long" : i ? "Close Long" : "Open Short";
}
function yl(t) {
  if (!t.position || t.reduceOnly || !(t.size > 0)) return null;
  const n = t.position > 0;
  if (n === (t.side === "buy")) return null;
  const i = Math.abs(t.position), r = (t.step ?? 0) / 2 || i * 1e-9, s = n ? "Long" : "Short", a = (o) => `${Tn(o)} ${t.base}`;
  return t.size < i - r ? `This reduces your ${s} ${a(i)} to ${a(i - t.size)}.` : t.size <= i + r ? `This closes your ${s} ${a(i)}.` : `This closes your ${s} ${a(i)} and opens a ${n ? "Short" : "Long"} of ${a(t.size - i)}. To just exit, use Close in Positions.`;
}
function wl(t) {
  if (!(t.size > 0) || !(t.price > 0)) return null;
  const n = t.size * t.price;
  let i = `= ${Tn(t.size)} ${t.base} ≈ ${ge(n)} · uses ${ge(n / Math.max(1, t.leverage))} of your balance`;
  return t.step && t.step > 0 && Math.abs(n - t.usd) > 0.01 && (i += ` (rounded to Strike's ${Tn(t.step)} ${t.base} step)`), i;
}
function _l(t) {
  const n = t.side === "buy", i = t.resting ? n ? "you'll buy" : "you'll sell" : n ? "you're buying" : "you're selling", r = `~${Tn(t.size)} ${t.base} (~${ge(t.notional)})${t.when ?? ""}`;
  if (t.reduceOnly) return `Reduce-only: ${i} ${r}. It can only shrink your ${n ? "Short" : "Long"}, never open a new position.`;
  const s = ge(t.margin);
  let a = `${t.leverage}x ${n ? "Long" : "Short"}: ${i} ${r} using ${s} of your balance. You gain if ${t.base} ${n ? "rises" : "falls"}.`;
  const o = t.liqPrice ?? 0;
  if (o > 0 && t.entry > 0) {
    const l = t.fmtPrice ?? ((d) => d.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    a += ` You'd be liquidated (losing that ${s}) if ${t.base} ${n ? "falls" : "rises"} to ~$${l(o)} (${Pi(t.entry, o)}).`;
  }
  return a;
}
function Sl(t) {
  const n = `${t.side === "buy" ? "Long" : "Short"} ${t.base}`, i = [t.type === "twap" ? `TWAP ${n}` : n];
  return t.type === "limit" && t.price && i.push(`Limit @ ${t.price}`), t.type === "stop" && t.trigger && i.push(`Stop @ ${t.trigger}`), t.type === "stop_limit" && t.trigger && i.push(`Stop @ ${t.trigger}${t.price ? ` → Limit ${t.price}` : ""}`), t.notional && t.notional > 0 && i.push(ge(t.notional)), i.join(" · ");
}
function os(t) {
  if (!Number.isFinite(t) || t === 0) return "None now";
  const n = (Math.abs(t) * 100).toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
  return `${t > 0 ? "Longs" : "Shorts"} pay ${n}%/h`;
}
function Cl(t) {
  const n = t.mark > 0 ? ` (~${ge(Math.abs(t.size) * t.mark)})` : "", i = Number.isFinite(t.upnl) ? ` Est. profit/loss ${ge(t.upnl, { sign: !0 })} before fees.` : "";
  return `Close ${Xi(t.size, t.base)} at market${n}?${i}`;
}
/*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) */
const at = 2n ** 255n - 19n, bi = 2n ** 252n + 27742317777372353535851937790883648493n, na = 0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an, ia = 0x6666666666666666666666666666666666666666666666666666666666666658n, Gi = {
  a: -1n,
  // where a=-1, d = -(121665/121666) == -(121665 * inv(121666)) mod P
  d: 37095705934669439343138083508754565189542113879843219016388785533085940283555n,
  h: 8
}, ot = (t = "") => {
  throw new Error(t);
}, co = (t) => typeof t == "string", $l = (t) => t instanceof Uint8Array || t != null && typeof t == "object" && t.constructor.name === "Uint8Array", Ci = (t, n) => (
  // is Uint8Array (of specific length)
  !$l(t) || typeof n == "number" && n > 0 && t.length !== n ? ot("Uint8Array of valid length expected") : t
), Vn = (t) => new Uint8Array(t), Kn = (t, n) => Ci(co(t) ? cs(t) : Vn(Ci(t)), n), te = (t, n = at) => {
  let i = t % n;
  return i >= 0n ? i : n + i;
}, ra = (t) => t instanceof wt ? t : ot("Point expected");
class wt {
  constructor(n, i, r, s) {
    this.ex = n, this.ey = i, this.ez = r, this.et = s;
  }
  static fromAffine(n) {
    return new wt(n.x, n.y, 1n, te(n.x * n.y));
  }
  static fromHex(n, i = !1) {
    const { d: r } = Gi;
    n = Kn(n, 32);
    const s = n.slice(), a = n[31];
    s[31] = a & -129;
    const o = ds(s);
    i && !(0n <= o && o < 2n ** 256n) && ot("bad y coord 1"), !i && !(0n <= o && o < at) && ot("bad y coord 2");
    const l = te(o * o), d = te(l - 1n), p = te(r * l + 1n);
    let { isValid: u, value: c } = zl(d, p);
    u || ot("bad y coordinate 3");
    const h = (c & 1n) === 1n, g = (a & 128) !== 0;
    return !i && c === 0n && g && ot("bad y coord 3"), g !== h && (c = te(-c)), new wt(c, o, 1n, te(c * o));
  }
  get x() {
    return this.toAffine().x;
  }
  // .x, .y will call expensive toAffine.
  get y() {
    return this.toAffine().y;
  }
  // Should be used with care.
  equals(n) {
    const { ex: i, ey: r, ez: s } = this, { ex: a, ey: o, ez: l } = ra(n), d = te(i * l), p = te(a * s), u = te(r * l), c = te(o * s);
    return d === p && u === c;
  }
  is0() {
    return this.equals(hi);
  }
  negate() {
    return new wt(te(-this.ex), this.ey, this.ez, te(-this.et));
  }
  double() {
    const { ex: n, ey: i, ez: r } = this, { a: s } = Gi, a = te(n * n), o = te(i * i), l = te(2n * te(r * r)), d = te(s * a), p = n + i, u = te(te(p * p) - a - o), c = d + o, h = c - l, g = d - o, f = te(u * h), y = te(c * g), k = te(u * g), _ = te(h * c);
    return new wt(f, y, _, k);
  }
  add(n) {
    const { ex: i, ey: r, ez: s, et: a } = this, { ex: o, ey: l, ez: d, et: p } = ra(n), { a: u, d: c } = Gi, h = te(i * o), g = te(r * l), f = te(a * c * p), y = te(s * d), k = te((i + r) * (o + l) - h - g), _ = te(y - f), w = te(y + f), z = te(g - u * h), C = te(k * _), v = te(w * z), $ = te(k * z), S = te(_ * w);
    return new wt(C, v, S, $);
  }
  mul(n, i = !0) {
    if (n === 0n)
      return i === !0 ? ot("cannot multiply by 0") : hi;
    if (typeof n == "bigint" && 0n < n && n < bi || ot("invalid scalar, must be < L"), !i && this.is0() || n === 1n)
      return this;
    if (this.equals(kn))
      return Ol(n).p;
    let r = hi, s = kn;
    for (let a = this; n > 0n; a = a.double(), n >>= 1n)
      n & 1n ? r = r.add(a) : i && (s = s.add(a));
    return r;
  }
  multiply(n) {
    return this.mul(n);
  }
  // Aliases for compatibilty
  clearCofactor() {
    return this.mul(BigInt(Gi.h), !1);
  }
  // multiply by cofactor
  isSmallOrder() {
    return this.clearCofactor().is0();
  }
  // check if P is small order
  isTorsionFree() {
    let n = this.mul(bi / 2n, !1).double();
    return bi % 2n && (n = n.add(this)), n.is0();
  }
  toAffine() {
    const { ex: n, ey: i, ez: r } = this;
    if (this.equals(hi))
      return { x: 0n, y: 1n };
    const s = ho(r);
    return te(r * s) !== 1n && ot("invalid inverse"), { x: te(n * s), y: te(i * s) };
  }
  toRawBytes() {
    const { x: n, y: i } = this.toAffine(), r = uo(i);
    return r[31] |= n & 1n ? 128 : 0, r;
  }
  toHex() {
    return ls(this.toRawBytes());
  }
  // encode to hex string
}
wt.BASE = new wt(na, ia, 1n, te(na * ia));
wt.ZERO = new wt(0n, 1n, 1n, 0n);
const { BASE: kn, ZERO: hi } = wt, po = (t, n) => t.toString(16).padStart(n, "0"), ls = (t) => Array.from(t).map((n) => po(n, 2)).join(""), cs = (t) => {
  const n = t.length;
  (!co(t) || n % 2) && ot("hex invalid 1");
  const i = Vn(n / 2);
  for (let r = 0; r < i.length; r++) {
    const s = r * 2, a = t.slice(s, s + 2), o = Number.parseInt(a, 16);
    (Number.isNaN(o) || o < 0) && ot("hex invalid 2"), i[r] = o;
  }
  return i;
}, uo = (t) => cs(po(t, 32 * 2)).reverse(), ds = (t) => BigInt("0x" + ls(Vn(Ci(t)).reverse())), $i = (...t) => {
  const n = Vn(t.reduce((r, s) => r + Ci(s).length, 0));
  let i = 0;
  return t.forEach((r) => {
    n.set(r, i), i += r.length;
  }), n;
}, ho = (t, n = at) => {
  (t === 0n || n <= 0n) && ot("no inverse n=" + t + " mod=" + n);
  let i = te(t, n), r = n, s = 0n, a = 1n;
  for (; i !== 0n; ) {
    const o = r / i, l = r % i, d = s - a * o;
    r = i, i = l, s = a, a = d;
  }
  return r === 1n ? te(s, n) : ot("no inverse");
}, Yt = (t, n) => {
  let i = t;
  for (; n-- > 0n; )
    i *= i, i %= at;
  return i;
}, Ml = (t) => {
  const i = t * t % at * t % at, r = Yt(i, 2n) * i % at, s = Yt(r, 1n) * t % at, a = Yt(s, 5n) * s % at, o = Yt(a, 10n) * a % at, l = Yt(o, 20n) * o % at, d = Yt(l, 40n) * l % at, p = Yt(d, 80n) * d % at, u = Yt(p, 80n) * d % at, c = Yt(u, 10n) * a % at;
  return { pow_p_5_8: Yt(c, 2n) * t % at, b2: i };
}, sa = 19681161376707505956807079304988542015446066515923890162744021073123829784752n, zl = (t, n) => {
  const i = te(n * n * n), r = te(i * i * n), s = Ml(t * r).pow_p_5_8;
  let a = te(t * i * s);
  const o = te(n * a * a), l = a, d = te(a * sa), p = o === t, u = o === te(-t), c = o === te(-t * sa);
  return p && (a = l), (u || c) && (a = d), (te(a) & 1n) === 1n && (a = te(-a)), { isValid: p || u, value: a };
}, nr = (t) => te(ds(t), bi);
let xi;
const ps = (...t) => hs.sha512Async(...t), Tl = (...t) => (
  // Sync SHA512, not set by default
  typeof xi == "function" ? xi(...t) : ot("etc.sha512Sync not set")
), mo = (t) => {
  const n = t.slice(0, 32);
  n[0] &= 248, n[31] &= 127, n[31] |= 64;
  const i = t.slice(32, 64), r = nr(n), s = kn.mul(r), a = s.toRawBytes();
  return { head: n, prefix: i, scalar: r, point: s, pointBytes: a };
}, us = (t) => ps(Kn(t, 32)).then(mo), Nl = (t) => mo(Tl(Kn(t, 32))), Pl = (t) => us(t).then((n) => n.pointBytes);
function go(t, n) {
  return ps(n.hashable).then(n.finish);
}
const Al = (t, n, i) => {
  const { pointBytes: r, scalar: s } = t, a = nr(n), o = kn.mul(a).toRawBytes();
  return { hashable: $i(o, r, i), finish: (p) => {
    const u = te(a + nr(p) * s, bi);
    return Ci($i(o, uo(u)), 64);
  } };
}, Ll = async (t, n) => {
  const i = Kn(t), r = await us(n), s = await ps(r.prefix, i);
  return go(!0, Al(r, s, i));
}, fo = { zip215: !0 }, El = (t, n, i, r = fo) => {
  n = Kn(n), t = Kn(t, 64);
  const { zip215: s } = r;
  let a, o, l, d, p = new Uint8Array();
  try {
    a = wt.fromHex(i, s), o = wt.fromHex(t.slice(0, 32), s), l = ds(t.slice(32, 64)), d = kn.mul(l, !1), p = $i(o.toRawBytes(), a.toRawBytes(), n);
  } catch {
  }
  return { hashable: p, finish: (c) => {
    if (d == null || !s && a.isSmallOrder())
      return !1;
    const h = nr(c);
    return o.add(a.mul(h, !1)).add(d.negate()).clearCofactor().is0();
  } };
}, Il = async (t, n, i, r = fo) => go(!0, El(t, n, i, r)), aa = () => (
  // We support: 1) browsers 2) node.js 19+
  typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0
), hs = {
  bytesToHex: ls,
  hexToBytes: cs,
  concatBytes: $i,
  mod: te,
  invert: ho,
  randomBytes: (t = 32) => {
    const n = aa();
    return (!n || !n.getRandomValues) && ot("crypto.getRandomValues must be defined"), n.getRandomValues(Vn(t));
  },
  sha512Async: async (...t) => {
    const n = aa();
    (!n || !n.subtle) && ot("crypto.subtle or etc.sha512Async must be defined");
    const i = $i(...t);
    return Vn(await n.subtle.digest("SHA-512", i.buffer));
  },
  sha512Sync: void 0
  // Actual logic below
};
Object.defineProperties(hs, { sha512Sync: {
  configurable: !1,
  get() {
    return xi;
  },
  set(t) {
    xi || (xi = t);
  }
} });
const Fl = {
  getExtendedPublicKeyAsync: us,
  getExtendedPublicKey: Nl,
  randomPrivateKey: () => hs.randomBytes(32),
  precompute(t = 8, n = kn) {
    return n.multiply(3n), n;
  }
  // no-op
}, Cn = 8, Dl = () => {
  const t = [], n = 256 / Cn + 1;
  let i = kn, r = i;
  for (let s = 0; s < n; s++) {
    r = i, t.push(r);
    for (let a = 1; a < 2 ** (Cn - 1); a++)
      r = r.add(i), t.push(r);
    i = r.double();
  }
  return t;
};
let oa;
const Ol = (t) => {
  const n = oa || (oa = Dl()), i = (u, c) => {
    let h = c.negate();
    return u ? h : c;
  };
  let r = hi, s = kn;
  const a = 1 + 256 / Cn, o = 2 ** (Cn - 1), l = BigInt(2 ** Cn - 1), d = 2 ** Cn, p = BigInt(Cn);
  for (let u = 0; u < a; u++) {
    const c = u * o;
    let h = Number(t & l);
    t >>= p, h > o && (h -= d, t += 1n);
    const g = c, f = c + Math.abs(h) - 1, y = u % 2 !== 0, k = h < 0;
    h === 0 ? s = s.add(i(y, n[g])) : r = r.add(i(k, n[f]));
  }
  return { p: r, f: s };
}, Yn = globalThis.crypto?.subtle, la = Yn?.generateKey.bind(Yn), ca = Yn?.exportKey.bind(Yn), da = Yn?.sign.bind(Yn);
class Xt {
  constructor(n, i, r) {
    this.signBytes = n, this.publicKeyHex = i, this.cryptoKey = r;
  }
  /** True when the secret is held by the browser and can't be read by any script. */
  get nonExtractable() {
    return this.cryptoKey !== null;
  }
  static async generate() {
    return await Xt.generateNonExtractable() ?? Xt.generateInMemory();
  }
  /** A browser-held key, or null when this browser has no WebCrypto Ed25519 (or it misbehaves). */
  static async generateNonExtractable() {
    if (!la || !ca) return null;
    try {
      const n = await la({ name: "Ed25519" }, !1, ["sign", "verify"]);
      if (n.privateKey.extractable !== !1 || n.privateKey.algorithm?.name !== "Ed25519") return null;
      const i = ct(new Uint8Array(await ca("raw", n.publicKey)));
      return await Xt.fromCryptoKey(n.privateKey, i);
    } catch {
      return null;
    }
  }
  static async generateInMemory() {
    const n = Fl.randomPrivateKey();
    return Xt.fromBytes(n);
  }
  /**
   * Wraps a browser-held private key (e.g. one restored from IndexedDB). Signs a probe and checks it against
   * the public key first, so a key that doesn't match or doesn't sign proper Ed25519 is rejected up front.
   */
  static async fromCryptoKey(n, i) {
    if (!da) throw new Error("This browser can't sign with WebCrypto.");
    if (n.extractable !== !1) throw new Error("Refusing a trading key that can be exported.");
    const r = async (a) => new Uint8Array(await da({ name: "Ed25519" }, n, a)), s = zn(`strike-everywhere key check ${i}`);
    if (!await Il(await r(s), s, vn(i))) throw new Error("Trading key doesn't match its public key.");
    return new Xt(r, i, n);
  }
  /** For bots and tests that bring their own key. The widget never does this. */
  static async fromPrivateKeyHex(n) {
    return Xt.fromBytes(vn(n));
  }
  static async fromBytes(n) {
    return new Xt((i) => Ll(i, n), ct(await Pl(n)), null);
  }
  async sign(n) {
    return ct(await this.signBytes(zn(n)));
  }
}
async function Bl(t, n, i, r, s) {
  return `${t.toUpperCase()}:${n}:${i}:${r}:${await vl(s)}`;
}
async function Rl(t, n, i, r, s, a) {
  const o = await Bl(n, i, s, a, r);
  return {
    "X-API-Wallet-Public-Key": t.publicKeyHex,
    "X-API-Wallet-Signature": await t.sign(o),
    "X-API-Wallet-Timestamp": String(s),
    "X-API-Wallet-Nonce": a
  };
}
async function ql(t, n) {
  return t.sign(`session.logon:${n}:${t.publicKeyHex}`);
}
class Zi extends Error {
  constructor(n, i, r, s) {
    super(i), this.status = n, this.body = r, this.path = s, this.name = "StrikeApiError";
  }
}
const Ul = /signature expired|invalid timestamp/i;
class Hl {
  constructor(n, i = globalThis.fetch.bind(globalThis)) {
    /**
     * Server time minus local time, in milliseconds. Strike rejects signatures whose timestamp is even a few
     * ms in the future, so this must not be rounded to whole seconds (a +0.85 s offset rounded to +1 s made
     * ~1 in 4 signed requests fail in testing).
     */
    ee(this, "clockSkewMs", 0);
    ee(this, "key", null);
    /** Runs before every signed request; may drop `key` (e.g. the session ran out while timers were asleep). */
    ee(this, "beforeSign", null);
    this.net = n, this.fetchImpl = i;
  }
  /**
   * Measures the offset as a lower bound: the server read its clock somewhere before our response arrived
   * (t1), so `serverTime - t1` can never put us ahead of it. Two samples: the first one also pays for
   * DNS/TLS setup, the second runs on a warm connection and is tighter. Keeps the best (largest) bound.
   */
  async syncClock() {
    let n = null;
    for (let i = 0; i < 2; i++)
      try {
        const r = await this.send("GET", "/v2/time", { auth: !1 }), s = Date.now(), a = Number(r?.serverTime);
        if (!(a > 1e12) || Math.abs(a - s) > 864e5) continue;
        const o = a - s;
        (n === null || o > n) && (n = o);
      } catch {
      }
    n !== null && (this.clockSkewMs = n);
  }
  /** Current server time in ms, shifted 500 ms into the past so estimation error can never put it in the future. */
  serverNowMs() {
    return Math.floor(Date.now() + this.clockSkewMs - 500);
  }
  async request(n, i, r = {}) {
    try {
      return await this.send(n, i, r);
    } catch (s) {
      if (s instanceof Zi && (r.auth ?? (r.base ?? "api") === "api") && Ul.test(s.message))
        return await this.syncClock(), this.send(n, i, r);
      throw s;
    }
  }
  async send(n, i, r) {
    const s = r.base ?? "api", a = r.auth ?? s === "api", o = r.body === void 0 ? "" : JSON.stringify(r.body), l = {};
    if (o && (l["Content-Type"] = "application/json"), a) {
      if (this.beforeSign?.(), !this.key) throw new Zi(401, "Not connected: connect a wallet first.", null, i);
      const h = Math.floor(this.serverNowMs() / 1e3);
      Object.assign(l, await Rl(this.key, n, i, o, h, Ot()));
    }
    r.builderFeeBps !== void 0 && (l["X-Builder-Fee-Bps"] = String(r.builderFeeBps));
    const d = (s === "price" ? this.net.price : s === "stat" ? this.net.stat : this.net.api) + i, p = await this.fetchImpl(d, { method: n, headers: l, body: o || void 0, signal: r.signal }), u = await p.text();
    let c = u;
    try {
      c = u ? p.ok && r.parse ? r.parse(u) : JSON.parse(u) : null;
    } catch {
    }
    if (!p.ok) {
      const h = c && (c.error || c.msg || c.message || c.detail), g = (typeof h == "string" ? h : h ? JSON.stringify(h) : "") || `HTTP ${p.status}`;
      throw new Zi(p.status, String(g), c, i);
    }
    return c;
  }
}
const Ve = (t) => {
  const n = Object.entries(t).filter(([, i]) => i != null && i !== "").map(([i, r]) => `${encodeURIComponent(i)}=${encodeURIComponent(String(r))}`);
  return n.length ? `?${n.join("&")}` : "";
};
function Wl(t, n) {
  if (typeof t != "string" || !t.trim()) throw new Error("Strike sent an empty message to sign. Not signing.");
  if (t.length > 4096) throw new Error("Strike's message to sign is unexpectedly long. Not signing.");
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F‪-‮⁦-⁩]/.test(t))
    throw new Error("Strike's message to sign contains hidden control characters. Not signing.");
  t.toLowerCase().includes(n.toLowerCase()) || console.warn("[strike-everywhere] Strike's consent message doesn't name the API key being bound.");
}
async function jl(t) {
  const n = await Xt.generate(), i = (l) => t.http.request("POST", "/auth/builder/request-signature", {
    auth: !1,
    body: {
      address: t.address,
      chain: t.chain,
      code: t.builderCode,
      fee_share_bps: t.feeShareBps,
      public_key: n.publicKeyHex,
      ...l && t.referralCode ? { referral_code: t.referralCode } : {}
    }
  }), r = (l) => /own builder code/i.test(l?.message ?? "") ? new Error(`This wallet owns the builder code ${t.builderCode}, and Strike doesn't let a builder trade through its own code. Connect a different wallet.`) : l;
  let s;
  try {
    s = await i(!0);
  } catch (l) {
    if (!t.referralCode || l?.status !== 400 || /own builder code/i.test(l?.message ?? "")) throw r(l);
    s = await i(!1).catch((d) => Promise.reject(r(d)));
  }
  Wl(s.message_to_sign, n.publicKeyHex), t.onMessage?.(s.message_to_sign);
  const a = await t.signMessage(s.message_to_sign);
  let o;
  try {
    o = await t.http.request("POST", "/auth/builder/verify-signature", {
      auth: !1,
      body: { address: t.address, chain: t.chain, nonce: s.nonce, wallet_signature: a }
    });
  } catch (l) {
    throw /expir|nonce|challenge/i.test(l?.message ?? "") ? new Error("The signature request expired (Strike allows a few minutes). Click Sign & connect to get a new one.") : r(l);
  }
  if (o.api_wallet_public_key && o.api_wallet_public_key !== n.publicKeyHex)
    throw new Error("Strike returned a different API key than the one generated. Aborting.");
  return {
    key: n,
    session: {
      accountId: o.account_id,
      builderCode: o.builder_code ?? t.builderCode,
      feeShareBps: o.fee_share_bps ?? o.max_fee_bps ?? t.feeShareBps,
      apiWalletId: o.api_wallet_id,
      apiWalletPublicKey: n.publicKeyHex,
      apiWalletExpiresAt: o.api_wallet_expired_at,
      address: t.address,
      chain: t.chain,
      connectedAt: Date.now()
    }
  };
}
function bo(t) {
  return JSON.parse(t.replace(/"(lastUpdateId|U|u)":\s*(\d+)/g, '"$1":"$2"'));
}
function xo(t) {
  const n = typeof t == "number" ? Number.isSafeInteger(t) && t >= 0 ? String(t) : "" : typeof t == "string" ? t.trim() : typeof t == "bigint" ? String(t) : "";
  return /^\d{1,20}$/.test(n) ? BigInt(n) : null;
}
function ir(t) {
  if (!Array.isArray(t)) return [];
  const n = [];
  for (const i of t) {
    if (!Array.isArray(i)) continue;
    const r = Number(i[0]), s = Number(i[1]);
    Number.isFinite(r) && r > 0 && Number.isFinite(s) && s >= 0 && n.push([r, s]);
  }
  return n;
}
function Gl(t) {
  const n = xo(t?.lastUpdateId);
  return n === null ? null : { lastUpdateId: n, bids: ir(t.bids).filter((i) => i[1] > 0), asks: ir(t.asks).filter((i) => i[1] > 0) };
}
function Vl(t) {
  if (t?.e !== "depthUpdate" || typeof t.s != "string") return null;
  const n = xo(t.u);
  return n === null ? null : { symbol: t.s, u: n, bids: ir(t.b), asks: ir(t.a) };
}
class pa {
  constructor(n = 400) {
    ee(this, "bids", /* @__PURE__ */ new Map());
    ee(this, "asks", /* @__PURE__ */ new Map());
    ee(this, "lastUpdateId", null);
    this.maxLevels = n;
  }
  reset(n) {
    this.bids = new Map(n.bids), this.asks = new Map(n.asks), this.lastUpdateId = n.lastUpdateId;
  }
  get synced() {
    return this.lastUpdateId !== null;
  }
  /** Applies a diff; returns false when it's stale (u <= last applied id) or the book isn't seeded. */
  apply(n) {
    if (this.lastUpdateId === null || n.u <= this.lastUpdateId) return !1;
    for (const [i, r] of n.bids) r > 0 ? this.bids.set(i, r) : this.bids.delete(i);
    for (const [i, r] of n.asks) r > 0 ? this.asks.set(i, r) : this.asks.delete(i);
    return this.lastUpdateId = n.u, this.bids.size > this.maxLevels && this.prune(this.bids, !0), this.asks.size > this.maxLevels && this.prune(this.asks, !1), !0;
  }
  prune(n, i) {
    const r = [...n.keys()].sort((a, o) => i ? o - a : a - o).slice(0, this.maxLevels), s = /* @__PURE__ */ new Map();
    for (const a of r) s.set(a, n.get(a));
    n === this.bids ? this.bids = s : this.asks = s;
  }
  /** Top `depth` levels per side, or null when the book is completely empty, unsynced, or crossed. */
  view(n = 1e3) {
    if (!this.synced) return null;
    const i = [...this.bids].sort((s, a) => a[0] - s[0]).slice(0, n), r = [...this.asks].sort((s, a) => s[0] - a[0]).slice(0, n);
    return vo(i, r);
  }
}
function vo(t, n) {
  if (!t.length && !n.length) return null;
  const i = t.length ? t[0][0] : NaN, r = n.length ? n[0][0] : NaN, s = t.length > 0 && n.length > 0;
  return s && !(i < r) ? null : { bids: t, asks: n, bestBid: i, bestAsk: r, mid: s ? (i + r) / 2 : NaN, spread: s ? r - i : NaN };
}
function hr(t, n, i, r = {}) {
  if (!(i > 0)) return null;
  const s = n === "buy" ? t.asks : t.bids;
  if (!s.length) return null;
  const a = r.mark && r.mark > 0 ? r.mark : Number.isFinite(t.mid) ? t.mid : s[0][0], o = r.mark && r.mark > 0 ? r.bound ?? 0.05 : 1 / 0, l = n === "buy" ? a * (1 + o) : a * (1 - o);
  let d = i, p = 0, u = s[0][0], c = !1;
  for (const [y, k] of s) {
    if (d <= 0) break;
    if (n === "buy" ? y > l : y < l) {
      c = !0;
      break;
    }
    const _ = Math.min(d, k);
    p += _ * y, d -= _, u = y;
  }
  const h = i - Math.max(0, d), g = h > 0 ? p / h : s[0][0], f = a > 0 ? (n === "buy" ? g - a : a - g) / a : 0;
  return { avgPrice: g, filled: h, complete: d <= i * 1e-9, worstPrice: u, slippage: Math.max(0, f), beyondBand: c };
}
class Kl {
  constructor(n, i, r, s = {}) {
    ee(this, "book", new pa());
    ee(this, "recent", []);
    ee(this, "listeners", /* @__PURE__ */ new Set());
    ee(this, "offs", []);
    ee(this, "timeout");
    ee(this, "interval");
    ee(this, "syncing", !1);
    ee(this, "lastResync", 0);
    ee(this, "closed", !1);
    this.market = n, this.stream = i, this.symbol = r, this.opts = s;
  }
  start() {
    return this.offs.push(
      this.stream.onMessage((n) => this.onMessage(n)),
      // After a reconnect, diffs sent while we were offline are lost and the first snapshot may come from Strike's
      // 5 s cache: resync now and again once that cache has rolled over (as on start).
      this.stream.onState((n) => {
        n === "open" && (this.resync(!0), clearTimeout(this.timeout), this.timeout = setTimeout(() => this.resync(!0), 6e3));
      })
    ), this.stream.subscribe("depth", this.symbol), this.resync(!0), this.timeout = setTimeout(() => this.resync(!0), 6e3), this.interval = setInterval(() => this.resync(!1), this.opts.resyncMs ?? 3e4), this;
  }
  onUpdate(n) {
    return this.listeners.add(n), () => this.listeners.delete(n);
  }
  view(n) {
    return this.book.view(n);
  }
  close() {
    this.closed = !0, this.offs.forEach((n) => n()), this.offs = [], clearTimeout(this.timeout), clearInterval(this.interval), this.listeners.clear(), this.stream.unsubscribe("depth", this.symbol);
  }
  emit() {
    const n = this.book.view();
    this.listeners.forEach((i) => i(n));
  }
  onMessage(n) {
    if (this.closed) return;
    const i = Vl(n);
    if (!i || i.symbol !== this.symbol) return;
    const r = Date.now();
    for (this.recent.push({ at: r, d: i }); this.recent.length > 600 || this.recent.length && r - this.recent[0].at > 15e3; ) this.recent.shift();
    if (this.book.apply(i)) {
      if (!this.book.view(1)) {
        this.emit(), this.resync(!1);
        return;
      }
      this.emit();
    }
  }
  /** Fetches a snapshot and replays buffered diffs newer than it. `force` skips the 3 s rate limit. */
  async resync(n) {
    if (!(this.closed || this.syncing || !n && Date.now() - this.lastResync < 3e3)) {
      this.syncing = !0, this.lastResync = Date.now();
      try {
        const i = await this.market.depth(this.symbol, this.opts.snapshotDepth ?? 200);
        if (this.closed) return;
        const r = new pa();
        r.reset(i);
        for (const { d: s } of this.recent) r.apply(s);
        (!this.book.synced || !this.book.view(1) || (r.lastUpdateId ?? 0n) >= (this.book.lastUpdateId ?? 0n)) && (r.view(1) || !this.book.view(1)) && (this.book = r), this.emit();
      } catch {
      } finally {
        this.syncing = !1;
      }
    }
  }
}
function Nt(t, n) {
  if (Array.isArray(t)) return t;
  const i = t?.[n];
  return Array.isArray(i) ? i : [];
}
function lt(t) {
  if (t == null || t === "" || typeof t == "boolean" || typeof t == "object") return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}
function rr(t, ...n) {
  for (const i of n) if (t?.[i] !== void 0 && t?.[i] !== null) return t[i];
}
const xe = (t, ...n) => lt(rr(t, ...n)), je = (t, ...n) => {
  const i = rr(t, ...n);
  return typeof i == "string" || typeof i == "number" ? String(i) : "";
}, Yl = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, ua = (t) => typeof t == "string" && Yl.test(t);
function Xl(t) {
  if (!Array.isArray(t)) return [];
  const n = [];
  for (const i of t) {
    if (!Array.isArray(i)) continue;
    const r = { openTime: Number(i[0]), open: +i[1], high: +i[2], low: +i[3], close: +i[4], volume: +i[5] || 0 };
    [r.openTime, r.open, r.high, r.low, r.close].every((s) => Number.isFinite(s) && s > 0) && n.push(r);
  }
  return n.sort((i, r) => i.openTime - r.openTime);
}
function Zl(t) {
  if (!Array.isArray(t)) return [];
  const n = [];
  for (const i of t) {
    const r = { id: Number(i?.id), price: Number(i?.price), size: Number(i?.qty), time: Number(i?.time), side: i?.isBuyerMaker ? "sell" : "buy" };
    Number.isFinite(r.id) && r.price > 0 && r.size > 0 && r.time > 0 && n.push(r);
  }
  return n.sort((i, r) => r.time - i.time || r.id - i.id);
}
function Jl(t) {
  return !t || typeof t.vault_id != "string" || typeof t.name != "string" ? null : {
    id: t.vault_id,
    name: t.name,
    type: String(t.type ?? ""),
    status: String(t.status ?? ""),
    tvl: lt(t.equity),
    aprPct: lt(t.apr),
    periodReturnPct: lt(t.period_return),
    allTimePnl: lt(t.all_time_pnl),
    depositors: lt(t.depositors)
  };
}
function ha(t) {
  const n = Array.isArray(t.margin_tiers) ? t.margin_tiers : [], i = Number(t.order_limit_step_size), r = Number(t.order_market_step_size);
  return {
    symbol: t.symbol,
    name: t.name,
    baseAsset: t.base_asset,
    status: t.status,
    tickSize: Number(t.order_tick_price),
    stepSize: i,
    marketStepSize: r > 0 ? r : i,
    minQty: Number(t.order_limit_min_size),
    minNotional: Number(t.order_min_notional),
    defaultLeverage: t.default_leverage,
    maxLeverage: Math.max(1, ...n.map((s) => Number(s.max_leverage) || 1)),
    marginTiers: n
  };
}
class Ql {
  constructor(n) {
    this.http = n;
  }
  async markets() {
    const n = await this.http.request("GET", "/v2/markets", { auth: !1 });
    return Object.values(n.markets ?? {});
  }
  async tickers() {
    return this.http.request("GET", "/v2/ticker/24hr", { base: "price", auth: !1 });
  }
  async premiumIndex(n) {
    return this.http.request("GET", `/v2/premiumIndex${Ve({ symbol: n })}`, { base: "price", auth: !1 });
  }
  /** Candles (Binance layout: [openTime, open, high, low, close, volume, closeTime, ...]); malformed rows are dropped. */
  async klines(n, i = "1h", r = 48, s = "last") {
    const a = await this.http.request("GET", `/v2/klines${Ve({ symbol: n, interval: i, limit: r, priceType: s === "last" ? void 0 : s })}`, { base: "price", auth: !1 });
    return Xl(a);
  }
  /**
   * Order book snapshot (`GET /price/v2/depth`, best first per side). Strike caches it for 5 s.
   * Throws on a malformed or crossed book rather than returning one that would mislead.
   */
  async depth(n, i = 20) {
    const r = await this.http.request("GET", `/v2/depth${Ve({ symbol: n, limit: Math.max(1, Math.min(1e3, Math.round(i))) })}`, {
      base: "price",
      auth: !1,
      parse: bo
    }), s = Gl(r);
    if (!s) throw new Error("Malformed order book from Strike");
    if (s.bids.length && s.asks.length && s.bids[0][0] >= s.asks[0][0]) throw new Error("Crossed order book from Strike");
    return s;
  }
  /** Recent public trades, newest first (`GET /price/v2/trades`). `side` is the taker's side. */
  async trades(n, i = 30) {
    const r = await this.http.request("GET", `/v2/trades${Ve({ symbol: n, limit: Math.max(1, Math.min(500, Math.round(i))) })}`, { base: "price", auth: !1 });
    return Zl(r);
  }
  /** Open interest in base units (`GET /price/v2/openInterest`), or null if Strike doesn't say. */
  async openInterest(n) {
    const i = await this.http.request("GET", `/v2/openInterest${Ve({ symbol: n })}`, { base: "price", auth: !1 });
    return lt(i?.openInterest);
  }
  /** Hourly funding rate history (`GET /stat/v1/stats/coin/history/funding`): `{columns:["ts","funding_rate"], data:[[ts, rate]]}`. */
  async fundingHistory(n, i = 7) {
    const r = await this.http.request("GET", `/v1/stats/coin/history/funding${Ve({ symbol: n, days: Math.max(1, Math.min(90, Math.round(i))) })}`, { base: "stat", auth: !1 });
    return (Array.isArray(r?.data) ? r.data : []).map((a) => Array.isArray(a) && a[1] !== null && a[1] !== "" ? { time: Number(a[0]), rate: Number(a[1]) } : null).filter((a) => !!a && a.time > 0 && Number.isFinite(a.rate)).sort((a, o) => a.time - o.time);
  }
  /**
   * Strike's liquidation map (`GET /stat/v1/stats/coin/liquidation-map`, used by Strike's own trade page; verified live
   * 2026-10-21): price bins with the base size of open longs and shorts that would be liquidated there.
   */
  async liquidationMap(n, i = 0.85) {
    const r = await this.http.request("GET", `/v1/stats/coin/liquidation-map${Ve({ symbol: n, range_pct: i })}`, { base: "stat", auth: !1 }), s = Array.isArray(r?.columns) ? r.columns : [], a = (u, c) => s.indexOf(u) >= 0 ? s.indexOf(u) : c, [o, l, d] = [a("price", 0), a("long_base", 1), a("short_base", 2)];
    return (Array.isArray(r?.data) ? r.data : []).map((u) => Array.isArray(u) ? { price: Number(u[o]), long: Number(u[l]) || 0, short: Number(u[d]) || 0 } : null).filter((u) => !!u && u.price > 0 && u.long >= 0 && u.short >= 0).sort((u, c) => u.price - c.price);
  }
  /** Public vault list (`GET /v2/vaults`, active vaults by default). */
  async vaults(n = 20) {
    const i = await this.http.request("GET", `/v2/vaults${Ve({ limit: n })}`, { auth: !1 });
    return Nt(i, "vaults").map(Jl).filter((r) => r !== null);
  }
  async feeTiers() {
    return this.http.request("GET", "/v2/fee-tiers", { auth: !1 });
  }
  /** Base taker fee (tier 0) as a fraction, e.g. 0.0005. */
  async baseTakerRate() {
    try {
      return (await this.feeTiers()).feeTiers?.find((r) => r.Tier === 0)?.TakerRate ?? 5e-4;
    } catch {
      return 5e-4;
    }
  }
}
class ec {
  constructor(n) {
    this.http = n;
  }
  /** Signed: the connected account. */
  account() {
    return this.http.request("GET", "/v2/account");
  }
  /** Leverage Strike currently applies to `symbol` for this account (`symbol_settings`), or null if it doesn't say. */
  async symbolLeverage(n) {
    const i = await this.account(), r = Number(i?.symbol_settings?.[n]?.leverage);
    return Number.isFinite(r) && r >= 1 ? r : null;
  }
  /** Margin mode Strike reports for `symbol` (`symbol_settings[symbol].margin_mode`), or null if it doesn't say. */
  async symbolMarginMode(n) {
    return ms(await this.account(), n, !1);
  }
  /** Signed: portfolio summary (`GET /v2/portfolio`): all-time PnL / volume / fees and the fee tier. */
  async portfolio() {
    return ac(await this.http.request("GET", "/v2/portfolio"));
  }
  /** Signed: fills, newest first. Page with `fromId` (the previous page's `next`). */
  async fillsPage(n = {}) {
    const i = n.limit ?? 20, r = await this.http.request("GET", `/v2/history/fill${Ve({ symbol: n.symbol, limit: i, fromId: n.fromId ?? void 0, startTime: n.startTime, endTime: n.endTime })}`), s = Nt(r, "fills").map(nc).filter((a) => a !== null);
    return { items: s, next: Ir(s, i, (a) => a.id) };
  }
  /** Signed: funding payments, newest first (`GET /v2/history/funding`, cursor `fromId`). */
  async fundingPage(n = {}) {
    const i = n.limit ?? 20, r = await this.http.request("GET", `/v2/history/funding${Ve({ limit: i, fromId: n.fromId ?? void 0 })}`), s = Nt(r, "funding").map(ic).filter((a) => a !== null);
    return { items: s, next: Ir(s, i, (a) => a.id) };
  }
  /**
   * Balance transactions, newest first (`GET /v2/history/transaction`): deposits, withdrawals, fees, funding.
   * Public by account id (Strike doesn't paginate it; up to 1000 rows).
   */
  async transactions(n, i = 100) {
    const r = await this.http.request("GET", `/v2/history/transaction${Ve({ account_id: n, limit: Math.max(1, Math.min(1e3, i)) })}`, { auth: !1 });
    return Nt(r, "transactions").map(tc).filter((s) => s !== null).sort((s, a) => a.time - s.time);
  }
  /** Signed: order history, newest first (`GET /v2/history/order`, cursor `fromOrderID`). */
  async orderHistoryPage(n = {}) {
    const i = n.limit ?? 20, r = await this.http.request("GET", `/v2/history/order${Ve({ limit: i, fromOrderID: n.fromOrderId ?? void 0 })}`), s = Nt(r, "orders").filter(Fr).map(Er).filter((a) => Number.isFinite(Number(a.id)));
    return { items: s, next: Ir(s, i, (a) => Number(a.id)) };
  }
  /**
   * Signed: closed positions, newest close first (`GET /v2/closedPositions`; no cursor, so pages use
   * `endTime`). Strike's rows carry no PnL, so realized PnL is summed from fills in each position's window.
   */
  async closedPositionsPage(n = {}) {
    const i = n.limit ?? 10, r = await this.http.request("GET", `/v2/closedPositions${Ve({ limit: i, endTime: n.endTime ?? void 0 })}`), s = Nt(r, "positions").map(rc).filter((c) => c !== null);
    if (!s.length) return { items: [], next: null };
    const a = Math.min(...s.map((c) => c.openTime)) - ar, o = Math.max(...s.map((c) => c.closeTime)) + ar, l = [];
    let d = !1, p = null;
    try {
      for (let c = 0; c < 3; c++) {
        const h = await this.fillsPage({ limit: 1e3, fromId: p, startTime: Math.max(0, a), endTime: o });
        if (l.push(...h.items), h.next === null) {
          d = !0;
          break;
        }
        p = h.next;
      }
    } catch {
    }
    const u = s[s.length - 1];
    return { items: sc(s, l, d), next: s.length >= i && u.closeTime > 0 ? u.closeTime - 1 : null };
  }
  /**
   * Withdrawal bounds as Strike computes them: `maxWithdrawAmount` (GET /v2/balances, accounts for locked
   * rewards and margin) and `min_withdraw_usd` (GET /v2/portfolio). Each is null if Strike doesn't say.
   */
  async withdrawLimits() {
    const [n, i] = await Promise.all([
      this.http.request("GET", "/v2/balances").catch(() => null),
      this.http.request("GET", "/v2/portfolio").catch(() => null)
    ]), r = (a) => a == null || a === "" || !Number.isFinite(Number(a)) ? null : Number(a), s = Array.isArray(n) ? n.length === 1 ? n[0] : null : n;
    return { maxUsd: r(s?.maxWithdrawAmount), minUsd: r(i?.min_withdraw_usd), feeDiscountPct: r(i?.fee_discount_rate) };
  }
  /** Referral fee discount (%) active on this account; 0 = no referral code applied; null = unknown. */
  async referralDiscountPct() {
    const n = await this.http.request("GET", "/v2/portfolio").catch(() => null), i = Number(n?.fee_discount_rate);
    return n && Number.isFinite(i) ? i : null;
  }
  async positions() {
    const n = await this.http.request("GET", "/v2/positions");
    return Nt(n, "positions").filter((i) => i && Number.isFinite(Number(i.size)) && Number(i.size) !== 0);
  }
  async openOrders(n) {
    const i = await this.http.request("GET", `/v2/openOrders${Ve({ symbol: n })}`);
    return Nt(i, "orders").filter(Fr).map(Er);
  }
  async orderHistory(n = {}) {
    const i = await this.http.request("GET", `/v2/history/order${Ve({ symbol: n.symbol, limit: n.limit ?? 20 })}`);
    return Nt(i, "orders").filter(Fr).map(Er);
  }
  async fills(n = {}) {
    const i = await this.http.request("GET", `/v2/history/fill${Ve({ symbol: n.symbol, limit: n.limit ?? 50 })}`);
    return Nt(i, "fills");
  }
  /**
   * Public lookup (no auth): does this wallet already have a Strike account?
   * Strike returns 404 "user not found" for new wallets (they need a first deposit before trading).
   * Returns null when Strike can't answer (e.g. testnet 500 "failed to calculate balance"): unknown, not fatal.
   */
  async exists(n) {
    try {
      return await this.http.request("GET", `/v2/account${Ve({ blockchain_address: n })}`, { auth: !1 }), !0;
    } catch (i) {
      return i instanceof Zi && i.status === 404 ? !1 : (console.warn("[strike-everywhere] account lookup failed:", i?.message || i), null);
    }
  }
}
function tc(t) {
  if (!t || typeof t != "object") return null;
  const n = Number(t.id), i = Number(t.timestamp ?? t.create_timestamp), r = lt(t.amount ?? t.usd_value);
  return !Number.isFinite(n) || !(i > 0) || r === null ? null : {
    id: n,
    type: String(t.type ?? ""),
    status: String(t.status ?? ""),
    amount: r,
    time: i,
    txHash: typeof t.tx_hash == "string" && t.tx_hash ? t.tx_hash.split("#")[0] : null,
    asset: typeof t.asset_symbol == "string" ? t.asset_symbol : null,
    assetAmount: lt(t.asset_amount)
  };
}
function Er(t) {
  return t && "id" in t ? t : {
    id: t.ID,
    client_order_id: t.ClientOrderID,
    account_id: t.AccountID,
    symbol: t.Symbol,
    side: t.Side,
    status: t.Status,
    type: t.Type,
    size: String(t.Size ?? t.Quantity ?? "0"),
    filled: String(t.Filled ?? t.FilledSize ?? "0"),
    price: String(t.Price ?? "0"),
    stop_price: String(t.StopPrice ?? "0"),
    reduce_only: !!t.ReduceOnly,
    close_reason: t.CloseReason ?? null,
    create_timestamp: t.CreateTimestamp ?? 0
  };
}
function ms(t, n, i = !0) {
  const r = String(t?.symbol_settings?.[n]?.margin_mode ?? (i ? t?.default_margin_mode ?? "" : "")).toLowerCase();
  return r === "cross" || r === "isolated" ? r : null;
}
function Ir(t, n, i) {
  if (t.length < n) return null;
  const r = i(t[t.length - 1]);
  return Number.isFinite(r) ? r : null;
}
const sr = (t, ...n) => xe(t, ...n) ?? 0, Fr = (t) => !!t && typeof t == "object";
function nc(t) {
  const n = xe(t, "id", "ID");
  if (n === null) return null;
  const i = je(t, "side", "Side").toLowerCase();
  return {
    id: n,
    orderId: xe(t, "order_id", "OrderID") ?? 0,
    symbol: je(t, "symbol", "Symbol"),
    side: i === "buy" || i === "sell" ? i : "",
    role: je(t, "role", "Role"),
    price: xe(t, "price", "Price"),
    size: xe(t, "size", "Size", "qty"),
    fee: xe(t, "fee", "Fee", "commission"),
    realizedPnl: xe(t, "realized_pnl", "RealizedPnl"),
    autoClose: je(t, "auto_close_type"),
    time: sr(t, "timestamp", "Timestamp", "time")
  };
}
function ic(t) {
  const n = xe(t, "id", "ID");
  return n === null ? null : {
    id: n,
    symbol: je(t, "symbol", "Symbol"),
    positionSide: je(t, "position_side", "PositionSide"),
    positionSize: xe(t, "position_size", "PositionSize"),
    rate: xe(t, "funding_rate", "FundingRate"),
    amount: xe(t, "amount", "Amount", "income"),
    time: sr(t, "timestamp", "Timestamp", "time")
  };
}
function rc(t) {
  const n = xe(t, "ID", "id"), i = je(t, "Symbol", "symbol");
  return n === null || !i ? null : {
    id: n,
    symbol: i,
    marginMode: je(t, "MarginMode", "margin_mode"),
    openTime: sr(t, "OpenTimestamp", "open_timestamp", "create_timestamp"),
    closeTime: sr(t, "CloseTimestamp", "close_timestamp"),
    // Not documented, but use it if Strike ever includes it.
    realizedPnl: xe(t, "realized_pnl", "RealizedPnl", "RealizedPNL")
  };
}
const ar = 2e3;
function sc(t, n, i) {
  const r = n.length ? Math.min(...n.map((a) => a.time)) : 1 / 0, s = /* @__PURE__ */ new Map();
  for (const a of n) {
    const o = t.filter((d) => d.symbol === a.symbol && d.openTime && d.closeTime);
    let l = o.find((d) => a.time > d.openTime && a.time <= d.closeTime);
    if (!l) {
      let d = 1 / 0;
      for (const p of o) {
        const u = a.time <= p.openTime ? p.openTime - a.time : a.time - p.closeTime;
        u <= ar && u < d && (d = u, l = p);
      }
    }
    l && s.set(l.id, (s.get(l.id) ?? 0) + (a.realizedPnl ?? 0));
  }
  return t.map((a) => a.realizedPnl !== null ? a : !a.openTime || !a.closeTime || !i && a.openTime - ar < r ? { ...a, realizedPnl: null } : { ...a, realizedPnl: s.get(a.id) ?? 0 });
}
function ac(t) {
  const n = rr(t, "account", "perp_account"), i = lt(t?.fee_tier), r = Nt(t, "fee_tiers"), s = i === null ? void 0 : r.find((o) => Number(rr(o, "Tier", "tier")) === i), a = lt(t?.maker_fee_rate_override);
  return {
    realizedPnl: xe(n, "realized_pnl"),
    volume: lt(t?.volume) ?? xe(n, "all_time_volume"),
    fees: lt(t?.fees),
    feeTier: i,
    takerRate: xe(s, "TakerRate", "taker_rate"),
    makerRate: a ?? xe(s, "MakerRate", "maker_rate"),
    referralDiscountPct: lt(t?.fee_discount_rate),
    stakingDiscount: lt(t?.staking_fee_discount_rate)
  };
}
const vi = 300, ki = 86400, ma = 30;
function ko(t, n, i, r) {
  const s = gs(t, n, i, r);
  if (s.perOrder >= s.minPerOrder - 1e-12) return null;
  const a = r && r > 0 ? ` (about $${Math.ceil(s.minTotal * r).toLocaleString("en-US")})` : "";
  return `Too small for this duration: Strike splits a TWAP into about ${s.orders} orders (one every ${s.intervalSec} s) and each must meet the market minimum. Use at least ${Number(s.minTotal.toPrecision(6))} ${t.baseAsset}${a}, or a shorter duration.`;
}
function gs(t, n, i, r) {
  const s = Math.max(1, Math.floor(i / ma)), a = Math.max(t.minQty || 0, t.marketStepSize ?? t.stepSize ?? 0), o = r && r > 0 && t.minNotional > 0 ? t.minNotional / r : 0, l = Math.max(a, o), d = t.marketStepSize ?? t.stepSize, p = d > 0 ? Number(ue(l * s, d, "ceil")) : l * s;
  return { intervalSec: ma, orders: s, perOrder: n / s, minPerOrder: l, minTotal: p };
}
const oc = (t) => t === "stop" || t === "stop_limit", fs = (t) => t === "take_profit" || t === "take_profit_limit", $n = (t) => oc(t) || fs(t), tn = (t) => t === "limit" || t === "stop_limit" || t === "take_profit_limit", yo = (t) => t === "market" || t === "stop" || t === "take_profit" || t === "trailing_stop_market", Nn = 0.1, Pn = 5;
function wo(t, n, i) {
  return Number(ue(n, i, t === "buy" ? "ceil" : "floor"));
}
function _o(t, n, i) {
  return Number(ue(n, i, t === "buy" ? "floor" : "ceil"));
}
function yi(t) {
  if (t.type === "trailing_stop_market") {
    const d = Number(t.callbackRate);
    return d >= Nn && d <= Pn ? t.activationPrice !== void 0 && !(Number(t.activationPrice) > 0) ? "Enter a valid activation price" : null : `Trail distance must be ${Nn}–${Pn}%`;
  }
  if (!$n(t.type)) return null;
  const n = fs(t.type), i = Number(t.stopPrice), r = t.tickSize && i > 0 ? n ? _o(t.side, i, t.tickSize) : wo(t.side, i, t.tickSize) : i;
  if (!(r > 0)) return "Enter a trigger price";
  if (tn(t.type) && !(Number(t.price) > 0)) return "Enter a limit price";
  const s = t.workingType === "contract_price", a = s ? Number(t.last) : t.mark, o = s ? "last price" : "mark price";
  if (!(a > 0)) return `Waiting for the ${o}`;
  if (!n && t.side === "buy" && !(r > a)) return `Buy stop trigger must be above the ${o}`;
  if (!n && t.side === "sell" && !(r < a)) return `Sell stop trigger must be below the ${o}`;
  if (n && t.side === "sell" && !(r > a)) return `Sell take-profit trigger must be above the ${o}`;
  if (n && t.side === "buy" && !(r < a)) return `Buy take-profit trigger must be below the ${o}`;
  const l = t.priceBound ?? 0.05;
  return tn(t.type) && Math.abs(Number(t.price) - r) / r > l ? `Limit price must be within ${(l * 100).toFixed(0)}% of the trigger` : null;
}
class Hn extends Error {
  constructor(n) {
    super(lc(n.error_message || n.close_reason || "rejected")), this.order = n, this.name = "OrderRejectedError";
  }
}
function lc(t) {
  return {
    order_price_out_of_limit: "Price is too far from the market. Limit prices must stay within 5% of the current price.",
    order_price_out_of_price_cap: "Price is outside the allowed range for this market.",
    insufficient_balance: "Not enough available balance for this order.",
    insufficient_margin: "Not enough margin for this order. Lower the size or leverage.",
    reduce_only_rejected: "Reduce-only order would increase the position."
  }[t] ?? t.replace(/_/g, " ");
}
function ga(t, n, i) {
  const r = yo(n.type) ? t.marketStepSize ?? t.stepSize : t.stepSize, s = ue(n.size, r, "floor");
  if (!(Number(s) > 0)) throw new Error("Order size is below this market's minimum step.");
  const a = {
    client_order_id: i,
    symbol: n.symbol,
    side: n.side,
    // lowercase: the API rejects "BUY" despite the builder guide's example
    type: n.type,
    size: s
  };
  if (tn(n.type)) {
    if (!(Number(n.price) > 0)) throw new Error("Limit orders need a price.");
    a.price = ue(Number(n.price), t.tickSize), a.time_in_force = n.timeInForce ?? "GTC", n.postOnly && n.type === "limit" && (a.post_only = !0);
  }
  if ($n(n.type)) {
    if (!(Number(n.stopPrice) > 0)) throw new Error("Conditional orders need a trigger price.");
    const o = fs(n.type) ? _o(n.side, Number(n.stopPrice), t.tickSize) : wo(n.side, Number(n.stopPrice), t.tickSize);
    a.stop_price = o.toFixed(pr(t.tickSize)), a.working_type = n.workingType ?? "mark_price";
  }
  if (n.type === "trailing_stop_market") {
    const o = Number(n.callbackRate);
    if (!(o >= Nn && o <= Pn)) throw new Error(`Trail distance must be ${Nn}–${Pn}%.`);
    a.callback_rate = String(Math.round(o * 100) / 100), n.activationPrice !== void 0 && (a.activation_price = ue(Number(n.activationPrice), t.tickSize)), a.working_type = n.workingType ?? "mark_price";
  }
  if (n.type !== "market" && n.type !== "limit" && (n.takeProfit || n.stopLoss))
    throw new Error("TP/SL can only be attached to market and limit orders.");
  return n.type === "market" && n.slippage !== void 0 && n.slippage > 0 && (a.slippage = String(Math.round(n.slippage * 1e4) / 1e4)), n.reduceOnly && (a.reduce_only = !0), n.closePosition && n.type !== "market" && n.type !== "limit" && (a.close_position = !0), a;
}
function So(t, n) {
  return !(t.lower > 0) || !(t.upper > 0) ? "Enter the price range" : t.upper > t.lower ? Number.isInteger(t.grids) && t.grids >= 2 && t.grids <= 200 ? t.collateral > 0 ? t.mode === "NEUTRAL" && t.sl ? "Neutral grids take separate long and short stop-losses" : t.mode === "LONG" && t.sl && !(t.sl < t.lower) ? "Stop-loss must be below the lower price" : t.mode === "SHORT" && t.sl && !(t.sl > t.upper) ? "Stop-loss must be above the upper price" : t.longSl && !(t.longSl < t.lower) ? "Long stop-loss must be below the lower price" : t.shortSl && !(t.shortSl > t.upper) ? "Short stop-loss must be above the upper price" : n > 0 && t.mode === "NEUTRAL" && !(t.lower < n && n < t.upper) ? "A neutral grid's range must include the current price" : null : "Enter the collateral" : "Grids must be a whole number from 2 to 200" : "Upper price must be above the lower price";
}
function cc(t) {
  const n = je(t, "id", "bot_id");
  if (!n) return null;
  const i = Array.isArray(t?.orders) ? t.orders : [];
  return {
    id: n,
    symbol: je(t, "symbol"),
    status: je(t, "status").toUpperCase(),
    mode: je(t, "mode").toUpperCase(),
    lower: xe(t, "lower_price"),
    upper: xe(t, "upper_price"),
    grids: xe(t, "grid_count"),
    leverage: xe(t, "leverage"),
    collateral: xe(t, "collateral"),
    profit: xe(t, "grid_profit"),
    levels: i.length,
    filledLevels: i.filter((r) => r?.filled === !0).length,
    createdAt: xe(t, "created_at_ms") ?? 0
  };
}
class wi {
  constructor(n, i) {
    this.http = n, this.account = i;
  }
  /**
   * Edits an open order: Strike's `POST /v2/order/replace` cancels it and places `next` in one request
   * (with the builder fee, like any new order).
   */
  async replaceOrder(n, i, r, s, a = Ot()) {
    const o = { cancel: { order_id: Number(i.id), symbol: i.symbol }, new_order: ga(n, r, a) };
    return await this.http.request("POST", "/v2/order/replace", { body: o, builderFeeBps: s }), { clientOrderId: a };
  }
  /** Adds or removes margin on an isolated position (`POST /v2/isoMargin`). */
  async modifyIsolatedMargin(n, i, r) {
    if (!(i > 0)) throw new Error("Enter an amount.");
    await this.http.request("POST", "/v2/isoMargin", { body: { symbol: n, amount: String(Math.floor(i * 100) / 100), modify_type: r } });
  }
  /** Creates a grid bot (`POST /v2/grid/bot`). Returns the bot id. */
  async createGrid(n, i, r) {
    const s = (l) => ue(l, n.tickSize), a = { symbol: i.symbol, mode: i.mode, upper_price: s(i.upper), lower_price: s(i.lower), grid_count: Math.round(i.grids), collateral: String(Math.floor(i.collateral * 100) / 100) };
    i.sl && (a.sl_price = s(i.sl)), i.longSl && (a.long_sl_price = s(i.longSl)), i.shortSl && (a.short_sl_price = s(i.shortSl));
    const o = await this.http.request("POST", "/v2/grid/bot", { body: a, builderFeeBps: r });
    return { id: je(o, "bot_id", "id"), status: je(o, "status") };
  }
  async grids(n = 50) {
    const i = await this.http.request("GET", `/v2/grid/bot${Ve({ limit: n })}`);
    return Nt(i, "bots").map(cc).filter((r) => r !== null);
  }
  /** Stops a grid bot; `cancelOrders` also cancels its live child orders. */
  async stopGrid(n, i = !0) {
    if (!/^[\x21-\x7e]{1,128}$/.test(n) || /[\/\\?#]/.test(n) || /^\.+$/.test(n)) throw new Error("Invalid grid bot id");
    await this.http.request("DELETE", `/v2/grid/bot/${encodeURIComponent(n)}`, { body: { cancel_orders: i } });
  }
  async setLeverage(n, i) {
    await this.http.request("POST", "/v2/leverage", { body: { symbol: n, leverage: Math.round(i) } });
  }
  /**
   * Places an order with the builder fee header. Strike accepts asynchronously (201 "pending");
   * use `waitForOrder` to learn the final outcome.
   */
  /**
   * Client order ids for an order (and its TP/SL legs), generated before placing it so they can be
   * registered for attribution before they exist on Strike.
   */
  static newOrderIds(n) {
    const i = [];
    return n.takeProfit && i.push(Ot()), n.stopLoss && i.push(Ot()), i.length ? { clientOrderId: Ot(), strategyId: Ot(), legClientOrderIds: i } : { clientOrderId: Ot() };
  }
  async placeOrder(n, i, r, s = wi.newOrderIds(i)) {
    const a = s.clientOrderId, o = ga(n, i, a);
    if (i.takeProfit || i.stopLoss) {
      const l = s.strategyId ?? Ot(), d = o.size, p = { ...o, strategy_id: l }, u = [], c = [...s.legClientOrderIds ?? []];
      if (i.takeProfit) {
        const h = c.shift() ?? Ot();
        u.push(h), p.tp_order = { client_order_id: h, type: "take_profit", size: d, stop_price: ue(i.takeProfit, n.tickSize), working_type: "mark_price" };
      }
      if (i.stopLoss) {
        const h = c.shift() ?? Ot();
        u.push(h), p.sl_order = { client_order_id: h, type: "stop", size: d, stop_price: ue(i.stopLoss, n.tickSize), working_type: "mark_price" };
      }
      return await this.http.request("POST", "/v2/order/strategy", { body: p, builderFeeBps: r }), { clientOrderId: a, strategyId: l, legClientOrderIds: u };
    }
    return await this.http.request("POST", "/v2/order", { body: o, builderFeeBps: r }), { clientOrderId: a };
  }
  /**
   * Polls order history until the order leaves "pending". Throws OrderRejectedError on rejection. A stop
   * order Strike has accepted but not yet triggered reports "untriggered" (or "open"): that's a success.
   */
  async waitForOrder(n, i, r = 1e4) {
    const s = Date.now() + r;
    let a = 400;
    for (; Date.now() < s; ) {
      await new Promise((d) => setTimeout(d, a));
      const o = await this.account.orderHistory({ symbol: n, limit: 50 }).catch(() => null);
      if (!o) continue;
      const l = o.find((d) => d.client_order_id === i);
      if (l && l.status !== "pending") {
        if (l.status === "rejected") throw new Hn(l);
        return l;
      }
      a = Math.min(a * 1.5, 1500);
    }
    throw new Error("Order is still pending. Check your open orders shortly.");
  }
  async cancelOrder(n, i) {
    await this.http.request("DELETE", "/v2/order/cancel", { body: { order_id: i, symbol: n } });
  }
  /**
   * Cancels every open order, or only `symbol`'s (`DELETE /v2/order/cancel-all`). Resolves to Strike's
   * `canceled_count`, or null when it's unknown (Strike returns -1 while cancelling asynchronously).
   */
  async cancelAll(n) {
    const i = await this.http.request("DELETE", "/v2/order/cancel-all", { body: n ? { symbol: n } : {} }), r = lt(i?.canceled_count);
    return r !== null && r >= 0 ? r : null;
  }
  /** `POST /v2/marginMode` (camelCase `marginMode`, per Strike's docs). Strike refuses while a position is open on the symbol. */
  async setMarginMode(n, i) {
    if (i !== "cross" && i !== "isolated") throw new Error("Unknown margin mode");
    await this.http.request("POST", "/v2/marginMode", { body: { symbol: n, marginMode: i } });
  }
  /**
   * Creates a TWAP strategy (`POST /v2/algo/twap`). Sent with the builder fee header like any order;
   * whether Strike charges the builder fee on (and attributes) TWAP child fills is unverified.
   */
  async createTwap(n, i, r) {
    const s = Math.round(Number(i.durationSec));
    if (!(s >= vi && s <= ki)) throw new Error("TWAP duration must be between 5 minutes and 24 hours.");
    const a = ue(i.size, n.marketStepSize ?? n.stepSize, "floor");
    if (!(Number(a) > 0)) throw new Error("Order size is below this market's minimum step.");
    const o = ko(n, Number(a), s);
    if (o) throw new Error(o);
    const l = {
      symbol: i.symbol,
      side: i.side === "buy" ? "BUY" : "SELL",
      // the algo API uses uppercase sides, unlike /v2/order
      total_size: a,
      duration_sec: s
    };
    if (i.limitPrice !== void 0) {
      if (!(i.limitPrice > 0)) throw new Error("Enter a valid limit price.");
      l.limit_price = ue(i.limitPrice, n.tickSize);
    }
    i.reduceOnly && (l.reduce_only = !0), i.randomize && (l.randomize = !0);
    const d = await this.http.request("POST", "/v2/algo/twap", { body: l, builderFeeBps: r });
    return { strategyId: je(d, "strategy_id", "id"), status: je(d, "status") || "active" };
  }
  /** TWAP strategies; Strike's default ("active") returns active and cancelling ones. */
  async twaps(n = "active") {
    const i = await this.http.request("GET", `/v2/algo/twap${Ve({ status: n })}`);
    return Nt(i, "strategies").map(dc).filter((r) => r !== null);
  }
  async cancelTwap(n) {
    if (!/^[0-9a-zA-Z-]{1,64}$/.test(n)) throw new Error("Invalid TWAP id");
    await this.http.request("DELETE", `/v2/algo/twap/${encodeURIComponent(n)}`);
  }
  /**
   * Closes a position with a reduce-only market order (builder fee applies, as for any order).
   * `fraction` < 1 closes part of it, rounded down to the market-order size step (the whole position if that rounds to it all).
   */
  async closePosition(n, i, r, s, a = 1) {
    const o = bs(n, Math.abs(Number(i.size)), a, "market");
    if (!(o > 0)) throw new Error("That's smaller than the market's minimum size. Close a larger part.");
    const l = Number(i.size) > 0 ? "sell" : "buy";
    return this.placeOrder(n, { symbol: i.symbol, side: l, type: "market", size: o, reduceOnly: !0 }, r, s);
  }
}
function bs(t, n, i, r) {
  if (i >= 1) return n;
  const s = r === "market" ? t.marketStepSize ?? t.stepSize : t.stepSize;
  return Number(ue(n * Math.max(0, i), s || 1e-8, "floor"));
}
function dc(t) {
  const n = je(t, "strategy_id", "id");
  return n ? {
    id: n,
    symbol: je(t, "market", "symbol"),
    side: je(t, "side").toLowerCase() === "sell" ? "sell" : "buy",
    status: je(t, "status").toLowerCase(),
    totalSize: xe(t, "total_size"),
    filledSize: xe(t, "filled_size"),
    durationSec: xe(t, "duration_sec"),
    slicesFired: xe(t, "slices_fired"),
    nominalSlices: xe(t, "nominal_slices"),
    createdAt: xe(t, "created_at_ms", "created_at") ?? 0,
    lastError: je(t, "last_error")
  } : null;
}
var Mi = {};
Object.defineProperty(Mi, "__esModule", { value: !0 });
Mi.bech32m = zi = Mi.bech32 = void 0;
const or = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", Co = {};
for (let t = 0; t < or.length; t++) {
  const n = or.charAt(t);
  Co[n] = t;
}
function Wn(t) {
  const n = t >> 25;
  return (t & 33554431) << 5 ^ -(n >> 0 & 1) & 996825010 ^ -(n >> 1 & 1) & 642813549 ^ -(n >> 2 & 1) & 513874426 ^ -(n >> 3 & 1) & 1027748829 ^ -(n >> 4 & 1) & 705979059;
}
function fa(t) {
  let n = 1;
  for (let i = 0; i < t.length; ++i) {
    const r = t.charCodeAt(i);
    if (r < 33 || r > 126)
      return "Invalid prefix (" + t + ")";
    n = Wn(n) ^ r >> 5;
  }
  n = Wn(n);
  for (let i = 0; i < t.length; ++i) {
    const r = t.charCodeAt(i);
    n = Wn(n) ^ r & 31;
  }
  return n;
}
function xs(t, n, i, r) {
  let s = 0, a = 0;
  const o = (1 << i) - 1, l = [];
  for (let d = 0; d < t.length; ++d)
    for (s = s << n | t[d], a += n; a >= i; )
      a -= i, l.push(s >> a & o);
  if (r)
    a > 0 && l.push(s << i - a & o);
  else {
    if (a >= n)
      return "Excess padding";
    if (s << i - a & o)
      return "Non-zero padding";
  }
  return l;
}
function pc(t) {
  return xs(t, 8, 5, !0);
}
function uc(t) {
  const n = xs(t, 5, 8, !1);
  if (Array.isArray(n))
    return n;
}
function hc(t) {
  const n = xs(t, 5, 8, !1);
  if (Array.isArray(n))
    return n;
  throw new Error(n);
}
function $o(t) {
  let n;
  t === "bech32" ? n = 1 : n = 734539939;
  function i(o, l, d) {
    if (d = d || 90, o.length + 7 + l.length > d)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let p = fa(o);
    if (typeof p == "string")
      throw new Error(p);
    let u = o + "1";
    for (let c = 0; c < l.length; ++c) {
      const h = l[c];
      if (h >> 5)
        throw new Error("Non 5-bit word");
      p = Wn(p) ^ h, u += or.charAt(h);
    }
    for (let c = 0; c < 6; ++c)
      p = Wn(p);
    p ^= n;
    for (let c = 0; c < 6; ++c) {
      const h = p >> (5 - c) * 5 & 31;
      u += or.charAt(h);
    }
    return u;
  }
  function r(o, l) {
    if (l = l || 90, o.length < 8)
      return o + " too short";
    if (o.length > l)
      return "Exceeds length limit";
    const d = o.toLowerCase(), p = o.toUpperCase();
    if (o !== d && o !== p)
      return "Mixed-case string " + o;
    o = d;
    const u = o.lastIndexOf("1");
    if (u === -1)
      return "No separator character for " + o;
    if (u === 0)
      return "Missing prefix for " + o;
    const c = o.slice(0, u), h = o.slice(u + 1);
    if (h.length < 6)
      return "Data too short";
    let g = fa(c);
    if (typeof g == "string")
      return g;
    const f = [];
    for (let y = 0; y < h.length; ++y) {
      const k = h.charAt(y), _ = Co[k];
      if (_ === void 0)
        return "Unknown character " + k;
      g = Wn(g) ^ _, !(y + 6 >= h.length) && f.push(_);
    }
    return g !== n ? "Invalid checksum for " + o : { prefix: c, words: f };
  }
  function s(o, l) {
    const d = r(o, l);
    if (typeof d == "object")
      return d;
  }
  function a(o, l) {
    const d = r(o, l);
    if (typeof d == "object")
      return d;
    throw new Error(d);
  }
  return {
    decodeUnsafe: s,
    decode: a,
    encode: i,
    toWords: pc,
    fromWordsUnsafe: uc,
    fromWords: hc
  };
}
var zi = Mi.bech32 = $o("bech32");
Mi.bech32m = $o("bech32m");
const Mo = 1023;
function Jr(t) {
  const n = t[0], i = n >> 4, r = n & 15, a = i === 14 || i === 15 ? r === 1 ? "stake" : "stake_test" : r === 1 ? "addr" : "addr_test";
  return zi.encode(a, zi.toWords(t), Mo);
}
function mc(t) {
  return Jr(vn(t));
}
function gc(t) {
  const { words: n } = zi.decode(t, Mo);
  return ct(new Uint8Array(zi.fromWords(n)));
}
function Qt(t, n = 12, i = 6) {
  return t.length <= n + i + 1 ? t : `${t.slice(0, n)}…${t.slice(-i)}`;
}
function Ai(t, n) {
  if (!(n >= 0 && n < t.length)) throw new Error(`CBOR: unexpected end at ${n}`);
  const i = t[n], r = i >> 5, s = i & 31;
  if (s < 24) return { major: r, info: s, len: s, hdr: 1 };
  if (n + (s === 24 ? 2 : s === 25 ? 3 : s === 26 ? 5 : s === 27 ? 9 : 1) > t.length) throw new Error(`CBOR: truncated head at ${n}`);
  if (s === 24) return { major: r, info: s, len: t[n + 1], hdr: 2 };
  if (s === 25) return { major: r, info: s, len: t[n + 1] << 8 | t[n + 2], hdr: 3 };
  if (s === 26) return { major: r, info: s, len: (t[n + 1] << 24 >>> 0) + (t[n + 2] << 16) + (t[n + 3] << 8) + t[n + 4], hdr: 5 };
  if (s === 27) {
    let o = 0n;
    for (let l = 1; l <= 8; l++) o = o << 8n | BigInt(t[n + l]);
    return { major: r, info: s, len: o <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(o) : -2, hdr: 9, big: o };
  }
  if (s === 31) return { major: r, info: s, len: -1, hdr: 1 };
  throw new Error(`CBOR: reserved additional info ${s} at ${n}`);
}
function Zt(t, n) {
  const i = fc(t, n);
  if (i > t.length) throw new Error(`CBOR: item at ${n} runs past the end`);
  return i;
}
function fc(t, n) {
  const i = Ai(t, n);
  if (i.len === -2) throw new Error(`CBOR: length too large at ${n}`);
  let r = n + i.hdr;
  switch (i.major) {
    case 0:
    case 1:
      return r;
    case 2:
    case 3:
      if (i.len === -1) {
        for (; t[r] !== 255; ) r = Zt(t, r);
        return r + 1;
      }
      return r + i.len;
    case 4:
      if (i.len === -1) {
        for (; t[r] !== 255; ) r = Zt(t, r);
        return r + 1;
      }
      for (let s = 0; s < i.len; s++) r = Zt(t, r);
      return r;
    case 5:
      if (i.len === -1) {
        for (; t[r] !== 255; ) r = bc(t, r);
        return r + 1;
      }
      for (let s = 0; s < i.len * 2; s++) r = Zt(t, r);
      return r;
    case 6:
      return Zt(t, r);
    default:
      return r;
  }
}
function bc(t, n) {
  return Zt(t, Zt(t, n));
}
function ba(t, n) {
  return n < 24 ? new Uint8Array([t << 5 | n]) : n < 256 ? new Uint8Array([t << 5 | 24, n]) : n < 65536 ? new Uint8Array([t << 5 | 25, n >> 8, n & 255]) : new Uint8Array([t << 5 | 26, n >>> 24 & 255, n >> 16 & 255, n >> 8 & 255, n & 255]);
}
function zo(t, n) {
  const i = Ai(t, n);
  if (i.major !== 4 && i.major !== 5) throw new Error("CBOR: expected array or map");
  let r = n + i.hdr;
  const s = [], a = i.len === -1 ? 1 / 0 : i.major === 5 ? i.len * 2 : i.len;
  for (let o = 0; o < a && !(i.len === -1 && t[r] === 255); o++) {
    const l = Zt(t, r);
    s.push([r, l]), r = l;
  }
  return s;
}
class mr {
  constructor(n, i) {
    this.tag = n, this.value = i;
  }
}
function fn(t, n = 0) {
  const i = Ai(t, n);
  let r = n + i.hdr;
  if ((i.major === 2 || i.major === 3) && i.len >= 0 && r + i.len > t.length) throw new Error(`CBOR: truncated string at ${n}`);
  if ((i.major === 4 || i.major === 5) && (i.len === -2 || i.len > t.length - r)) throw new Error(`CBOR: bad container length at ${n}`);
  const s = () => i.len === -2 && i.big !== void 0 ? i.big : i.len;
  switch (i.major) {
    case 0:
      return [s(), r];
    case 1: {
      const a = s();
      return [typeof a == "bigint" ? -1n - a : -1 - a, r];
    }
    case 2:
    case 3: {
      let a;
      if (i.len === -1) {
        const o = [];
        for (; t[r] !== 255; ) {
          const [l, d] = fn(t, r);
          o.push(typeof l == "string" ? new TextEncoder().encode(l) : l), r = d;
        }
        a = tr(...o), r += 1;
      } else
        a = t.slice(r, r + i.len), r += i.len;
      return [i.major === 3 ? new TextDecoder().decode(a) : a, r];
    }
    case 4: {
      const a = [], o = i.len === -1 ? 1 / 0 : i.len;
      for (let l = 0; l < o; l++) {
        if (i.len === -1 && t[r] === 255) {
          r += 1;
          break;
        }
        const [d, p] = fn(t, r);
        a.push(d), r = p;
      }
      return [a, r];
    }
    case 5: {
      const a = /* @__PURE__ */ new Map(), o = i.len === -1 ? 1 / 0 : i.len;
      for (let l = 0; l < o; l++) {
        if (i.len === -1 && t[r] === 255) {
          r += 1;
          break;
        }
        const [d, p] = fn(t, r), [u, c] = fn(t, p);
        a.set(d, u), r = c;
      }
      return [a, r];
    }
    case 6: {
      const [a, o] = fn(t, r);
      return [new mr(i.len, a), o];
    }
    default:
      return i.info === 20 ? [!1, r] : i.info === 21 ? [!0, r] : i.info === 22 ? [null, r] : i.info === 23 ? [void 0, r] : [i.len, r];
  }
}
function xa(t, n) {
  const i = Ai(t, n);
  let r = new Uint8Array(0), s = n;
  return i.major === 6 && (r = t.slice(n, n + i.hdr), s = n + i.hdr), { tagBytes: r, items: zo(t, s).map(([a, o]) => t.slice(a, o)) };
}
function xc(t, n) {
  const i = (o) => {
    const l = zo(o, 0), d = /* @__PURE__ */ new Map();
    for (let p = 0; p < l.length; p += 2) {
      const [u, c] = l[p], [h, g] = l[p + 1];
      d.set(ct(o.slice(u, c)), { key: o.slice(u, c), b: o, vs: h, ve: g });
    }
    return d;
  }, r = i(t), s = /* @__PURE__ */ new Map();
  for (const [o, l] of r) s.set(o, { key: l.key, raw: l.b.slice(l.vs, l.ve) });
  for (const [o, l] of i(n)) {
    const d = r.get(o);
    if (!d) {
      s.set(o, { key: l.key, raw: l.b.slice(l.vs, l.ve) });
      continue;
    }
    const p = xa(d.b, d.vs), u = xa(l.b, l.vs), c = /* @__PURE__ */ new Set(), h = [];
    for (const f of [...p.items, ...u.items]) {
      const y = ct(f);
      c.has(y) || (c.add(y), h.push(f));
    }
    const g = p.tagBytes.length ? p.tagBytes : u.tagBytes;
    s.set(o, { key: d.key, raw: tr(g, ba(4, h.length), ...h) });
  }
  const a = [ba(5, s.size)];
  for (const o of s.values()) a.push(o.key, o.raw);
  return tr(...a);
}
function vc(t, n) {
  const i = Ai(t, 0);
  if (i.major !== 4) throw new Error("CBOR: transaction is not an array");
  const r = i.hdr, s = Zt(t, r), a = Zt(t, s), o = t.slice(s, a), d = o.length === 1 && o[0] === 160 ? n : xc(o, n);
  return tr(t.slice(0, s), d, t.slice(a));
}
const lr = (t) => typeof t == "bigint" ? t : BigInt(t);
function kc(t) {
  const n = /* @__PURE__ */ new Map();
  if (!(t instanceof Map)) return n;
  for (const [i, r] of t)
    if (r instanceof Map)
      for (const [s, a] of r) {
        const o = `${ct(i)}.${ct(s)}`;
        n.set(o, (n.get(o) ?? 0n) + lr(a));
      }
  return n;
}
function va(t) {
  if (Array.isArray(t)) {
    const n = t[1];
    return { lovelace: lr(t[0]), assetPolicies: n instanceof Map ? n.size : 0, assets: kc(n) };
  }
  return { lovelace: lr(t), assetPolicies: 0, assets: /* @__PURE__ */ new Map() };
}
function yc(t) {
  if (!Array.isArray(t) || t[0] !== 1) return;
  const n = t[1], i = n instanceof mr ? n.value : n;
  if (i instanceof Uint8Array)
    try {
      return fn(i)[0];
    } catch {
      return;
    }
}
function wc(t) {
  if (t instanceof Map) {
    const r = va(t.get(1));
    return { address: Jr(t.get(0)), ...r, hasDatum: t.has(2), inlineDatum: t.has(2) ? yc(t.get(2)) : void 0 };
  }
  const n = t, i = va(n[1]);
  return { address: Jr(n[0]), ...i, hasDatum: n.length > 2 };
}
const _c = (t) => t instanceof mr ? t.value : t, Sc = (t) => {
  const [n, i] = t;
  return { txHash: ct(n), index: Number(i) };
};
function To(t) {
  const [n] = fn(vn(t)), i = n;
  if (!Array.isArray(i) || !(i[0] instanceof Map)) throw new Error("Not a Cardano transaction.");
  const r = i[0], s = r.get(1).map(wc), a = _c(r.get(0)).map(Sc);
  return {
    outputs: s,
    fee: lr(r.get(2)),
    inputCount: a.length,
    inputs: a,
    ttl: r.has(3) ? Number(r.get(3)) : void 0,
    bodyKeys: [...r.keys()].map(Number),
    isValid: i.length < 3 || i[2] === !0
  };
}
function mi(t, n = []) {
  return t instanceof Uint8Array ? n.push(t) : Array.isArray(t) ? t.forEach((i) => mi(i, n)) : t instanceof Map ? t.forEach((i, r) => (mi(r, n), mi(i, n))) : t instanceof mr && mi(t.value, n), n;
}
const Ke = (t) => Number(t) / 1e6;
class gt extends Error {
}
class gr extends Error {
  constructor(n, i, r) {
    super(`Your deposit is on-chain (tx ${i.slice(0, 12)}…). Strike usually credits it from the chain on its own; registering it directly failed (${r}). Don't send it again. You can retry registering.`), this.requestId = n, this.txHash = i, this.name = "DepositRegistrationError";
  }
}
const Cc = /* @__PURE__ */ new Set([0, 1, 2, 3, 7, 8, 14, 15]), $c = 3000000n, ka = 2000000n;
function Mc(t) {
  const n = gc(t), i = parseInt(n[0], 16);
  return i > 7 || i % 2 !== 0 ? null : n.slice(2, 58);
}
function ya(t, n) {
  let i;
  try {
    i = To(t);
  } catch (u) {
    throw new gt(`Couldn't read the transaction (${u?.message || u}). Not signing.`);
  }
  const r = i.bodyKeys.filter((u) => !Cc.has(u));
  if (r.length) throw new gt(`Transaction contains unexpected fields (${r.join(", ")}). Not signing.`);
  if (!i.isValid) throw new gt("Transaction is marked invalid. Not signing.");
  if (i.fee > $c) throw new gt(`Network fee of ${Number(i.fee) / 1e6} ADA is too high. Not signing.`);
  const s = i.outputs.filter((u) => u.address !== n.walletAddress);
  if (s.length !== 1) throw new gt(`Expected one deposit output, found ${s.length}. Not signing.`);
  const a = s[0], o = a.lovelace - n.lovelace;
  if (o < 0n || o > ka)
    throw new gt(`Transaction sends ${a.lovelace} lovelace but ${n.lovelace} was requested (plus at most ${ka} for Strike's forwarding). Not signing.`);
  if (a.assetPolicies > 0) throw new gt("Transaction would move native tokens. Not signing.");
  if (a.inlineDatum === void 0) throw new gt("Deposit output has no readable datum. Not signing.");
  const l = new Set(mi(a.inlineDatum).map(ct)), d = Mc(n.walletAddress), p = [[ct(zn(n.requestId)), "this deposit request"]];
  d && p.push([d, "your wallet"]), n.accountId && p.push([ct(zn(n.accountId)), "your Strike account"]);
  for (const [u, c] of p)
    if (!l.has(u)) throw new gt(`Deposit datum doesn't reference ${c}. Not signing.`);
  return { preview: i, dest: a, forwardingCost: o };
}
class zc {
  constructor(n) {
    this.http = n;
  }
  /**
   * Step 1+2: quote and build. Decodes the unsigned transaction and checks that exactly the requested
   * amount leaves the wallet, to a single non-user address, crediting this user, before any signature.
   */
  async prepareAda(n, i, r) {
    const s = await this.http.request("POST", "/v2/deposit/quote", {
      body: { blockchain: "cardano", asset_symbol: "ADA", asset_amount: i.toString() }
    }), a = await n.utxos();
    if (!a.length) throw new Error("Your wallet has no spendable ADA.");
    const o = await this.http.request("POST", "/v2/deposit/build-tx", {
      body: { request_id: s.request_id, user_address: n.address, utxos: a }
    });
    if (o.format !== "cardano_cbor") throw new gt(`Unexpected transaction format: ${o.format}`);
    const { preview: l, dest: d, forwardingCost: p } = ya(o.unsigned_tx, { walletAddress: n.address, lovelace: i, requestId: s.request_id, accountId: r }), u = Number(s.quote?.expiration_at);
    return Object.freeze({
      requestId: s.request_id,
      lovelace: i,
      usdValue: Number(s.quote.usd_value),
      exchangeRate: Number(s.quote.exchange_rate),
      confirmationsRequired: s.confirmations_required,
      unsignedTx: o.unsigned_tx,
      preview: l,
      destination: { address: d.address, lovelace: d.lovelace },
      forwardingCost: p,
      networkFee: l.fee,
      quotedAddress: s.deposit_address,
      expiresAt: Number.isFinite(u) && u > 0 ? u < 1e12 ? u * 1e3 : u : void 0,
      accountId: r
    });
  }
  /** Step 3: re-check, wallet signs (CIP-30 signTx), we splice witnesses, submit on-chain, then register with Strike. */
  async signAndSubmit(n, i) {
    if (i.expiresAt && Date.now() > i.expiresAt - 15e3) throw new gt("This quote has expired. Review the deposit again.");
    ya(i.unsignedTx, { walletAddress: n.address, lovelace: i.lovelace, requestId: i.requestId, accountId: i.accountId });
    const r = await n.signTransaction(i.unsignedTx), s = await n.submit(r);
    return await this.register(i.requestId, s), { txHash: s };
  }
  /** Tells Strike about a submitted deposit. Retries; safe to call again with the same values. */
  async register(n, i, r = 4) {
    let s;
    for (let a = 0; a < r; a++)
      try {
        await this.http.request("POST", "/v2/deposit", { body: { request_id: n, tx_hash: i } });
        return;
      } catch (o) {
        s = o, a < r - 1 && await new Promise((l) => setTimeout(l, 1500 * 2 ** a));
      }
    throw new gr(n, i, s?.message || String(s));
  }
}
const jt = 5;
class Pt extends Error {
}
const Tc = /* @__PURE__ */ new Set([0, 1, 2, 3, 7, 8, 14, 15]), Nc = 5000000n, Pc = 3000000n;
function Ac(t) {
  const n = String(t ?? "");
  if (n.length >= 32 && n.length % 2 === 0 && /^[0-9a-fA-F]+$/.test(n)) {
    const i = vn(n);
    let r;
    try {
      r = new TextDecoder("utf-8", { fatal: !0 }).decode(i);
    } catch {
      r = n;
    }
    return { text: r, hex: n.toLowerCase() };
  }
  return { text: n, hex: ct(zn(n)) };
}
function wa(t, n) {
  let i;
  try {
    i = To(t);
  } catch (o) {
    throw new Pt(`Couldn't read Strike's funding transaction (${o?.message || o}). Not signing.`);
  }
  const r = i.bodyKeys.filter((o) => !Tc.has(o));
  if (r.length) throw new Pt(`Funding transaction contains unexpected fields (${r.join(", ")}). Not signing.`);
  if (!i.isValid) throw new Pt("Funding transaction is marked invalid. Not signing.");
  if (i.fee > Pc) throw new Pt(`Network fee of ${Number(i.fee) / 1e6} ADA is too high. Not signing.`);
  const s = i.outputs.filter((o) => o.address !== n.walletAddress);
  if (!s.length) throw new Pt("Funding transaction pays nothing to Strike's validator. Not signing.");
  for (const o of s) {
    if (o.address !== n.validatorAddress) throw new Pt(`Funding transaction pays an unexpected address (${o.address.slice(0, 20)}…). Not signing.`);
    if (o.assetPolicies > 0) throw new Pt("Funding transaction would move native tokens. Not signing.");
  }
  const a = s.reduce((o, l) => o + l.lovelace, 0n);
  if (a > Nc) throw new Pt(`Funding transaction sends ${Number(a) / 1e6} ADA to the validator (expected about 1–2). Not signing.`);
  return { preview: i, lovelace: a };
}
class Lc {
  constructor(n) {
    this.http = n;
  }
  /** Step 1: quote. The recipient is locked server-side to the user's connected wallet. */
  async prepareAda(n, i) {
    if (!Number.isFinite(n) || !(n >= jt)) throw new Error(`Minimum withdrawal is $${jt}.`);
    let r, s = "ADA";
    const a = (d) => this.http.request("POST", "/v2/withdraw/quote", { body: { usd_value: n.toFixed(2), blockchain: "cardano", asset: d } });
    try {
      try {
        r = await a(s);
      } catch (d) {
        if (!/unsupported asset/i.test(d?.message ?? "")) throw d;
        s = "USDM", r = await a(s);
      }
    } catch (d) {
      throw /single-withdrawal limit/i.test(d?.message ?? "") ? new Error("Strike caps how much can leave in a single withdrawal, and this is above it. Try a smaller amount, or withdraw in a few parts.") : /rate limit/i.test(d?.message ?? "") ? new Error("Strike's withdrawal limit for this hour or day is reached. Try again later or a smaller amount.") : d;
    }
    const o = Ac(r.message_to_sign), l = { withdrawId: r.withdraw_id, usdValue: n, fee: Number(r.fee), messageToSign: o.text, messageHex: o.hex, asset: s };
    if (r.tx_cbor) {
      if (!i) throw new Error("Reconnect your wallet to withdraw.");
      if (!r.validator_address) throw new Pt("Strike sent a funding transaction without its validator address. Not signing.");
      const { preview: d, lovelace: p } = wa(r.tx_cbor, { walletAddress: i, validatorAddress: r.validator_address });
      l.funding = { unsignedTx: r.tx_cbor, validatorAddress: r.validator_address, lovelace: p, networkFee: d.fee, preview: d };
    }
    return Object.freeze(l);
  }
  /** Step 2: the user's own wallet signs Strike's message (and the funding transaction, if any); the API key alone cannot withdraw. */
  async signAndSubmit(n, i) {
    const r = await n.signHex(i.messageHex), s = { withdraw_id: i.withdrawId, wallet_signature: r };
    i.funding && (wa(i.funding.unsignedTx, { walletAddress: n.address, validatorAddress: i.funding.validatorAddress }), s.signed_tx_cbor = await n.signTransaction(i.funding.unsignedTx));
    const a = await this.http.request("POST", "/v2/withdraw", { body: s });
    return { status: a.status, requestId: a.request_id };
  }
}
class No {
  constructor(n, i = globalThis.WebSocket) {
    ee(this, "ws", null);
    ee(this, "listeners", /* @__PURE__ */ new Set());
    ee(this, "stateListeners", /* @__PURE__ */ new Set());
    ee(this, "retry", 0);
    ee(this, "closedByUser", !1);
    ee(this, "pingTimer", null);
    ee(this, "reconnectTimer", null);
    ee(this, "nextId", 1);
    this.url = n, this.WS = i;
  }
  onMessage(n) {
    return this.listeners.add(n), () => this.listeners.delete(n);
  }
  onState(n) {
    return this.stateListeners.add(n), () => this.stateListeners.delete(n);
  }
  connect() {
    this.closedByUser = !1, this.clearTimers();
    let n;
    try {
      n = new this.WS(this.url);
    } catch {
      this.scheduleReconnect();
      return;
    }
    this.ws = n;
    let i = 0;
    const r = () => this.ws === n && !this.closedByUser;
    n.onopen = async () => {
      if (r()) {
        i = Date.now();
        try {
          await this.onOpen();
        } catch (s) {
          console.warn("[strike-everywhere] socket init failed", s);
        }
        r() && (this.stateListeners.forEach((s) => s("open")), this.pingTimer && clearInterval(this.pingTimer), this.pingTimer = setInterval(() => this.send({ method: "ping", id: "hb" }), 3e4));
      }
    }, n.onmessage = (s) => {
      if (this.ws !== n) return;
      const a = typeof s.data == "string" ? s.data : "";
      for (const o of a.split(`
`)) {
        const l = o.trim();
        if (!l) continue;
        let d;
        try {
          d = this.parse(l);
        } catch {
          continue;
        }
        d?.method === "pong" || d?.result === "pong" || this.listeners.forEach((p) => p(d));
      }
    }, n.onclose = () => {
      r() && (this.clearTimers(), this.stateListeners.forEach((s) => s("closed")), i && Date.now() - i > 2e4 && (this.retry = 0), this.scheduleReconnect());
    }, n.onerror = () => n.close();
  }
  scheduleReconnect() {
    if (this.closedByUser) return;
    const n = Math.min(3e4, 500 * 2 ** Math.min(this.retry++, 6));
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null, this.closedByUser || this.connect();
    }, n);
  }
  clearTimers() {
    this.pingTimer && clearInterval(this.pingTimer), this.pingTimer = null, this.reconnectTimer && clearTimeout(this.reconnectTimer), this.reconnectTimer = null;
  }
  close() {
    this.closedByUser = !0, this.clearTimers();
    const n = this.ws;
    this.ws = null, n?.close();
  }
  send(n) {
    this.ws?.readyState === 1 && this.ws.send(JSON.stringify({ id: this.nextId++, ...n }));
  }
  parse(n) {
    return JSON.parse(n);
  }
}
class Ec extends No {
  constructor() {
    super(...arguments);
    ee(this, "subs", /* @__PURE__ */ new Map());
  }
  /** `depthUpdate` sequence ids are uint64 and may exceed 2^53: keep them exact. */
  parse(i) {
    return i.includes('"depthUpdate"') ? bo(i) : JSON.parse(i);
  }
  subscribe(i, r) {
    const s = `${i}|${r ?? ""}`, a = { method: "subscribe", channel: i, ...r ? { symbol: r } : {} };
    this.subs.set(s, a), this.send(a);
  }
  unsubscribe(i, r) {
    this.subs.delete(`${i}|${r ?? ""}`), this.send({ method: "unsubscribe", channel: i, ...r ? { symbol: r } : {} });
  }
  async onOpen() {
    for (const i of this.subs.values()) this.send(i);
  }
}
const Dr = 900001;
class Ic extends No {
  /**
   * @param serverNowMs current Strike server time in ms, never ahead of it (StrikeHttp.serverNowMs). Read on
   * every (re)connect, so a later clock re-sync also fixes the socket's logon.
   */
  constructor(i, r, s = () => Date.now() - 500, a) {
    super(i, a);
    ee(this, "triedAltLogon", !1);
    this.key = r, this.serverNowMs = s, this.onMessage((o) => {
      if (o?.result?.authenticated) {
        this.send({ method: "subscribe", channel: "userstream" });
        return;
      }
      o?.id === Dr && !this.triedAltLogon && (this.triedAltLogon = !0, this.logon(!0));
    });
  }
  async logon(i) {
    const r = this.serverNowMs(), s = this.key.publicKeyHex, a = i ? await this.key.sign(`apiKey=${s}&timestamp=${r}`) : await ql(this.key, r);
    this.send({ id: i ? Dr + 1 : Dr, method: "session.logon", params: { apiKey: s, signature: a, timestamp: r } });
  }
  async onOpen() {
    this.triedAltLogon = !1, await this.logon(!1);
  }
}
const Fc = 6e4;
class Dc {
  constructor(n, i, r, s, a = Oc(), o = Bc()) {
    ee(this, "live", null);
    ee(this, "lastWrite", 0);
    this.mode = n, this.storageKey = i, this.ttlMs = r, this.idleMs = s, this.meta = a, this.vault = o;
  }
  stale(n, i, r = Date.now()) {
    return !(Number(n) > r) || this.idleMs > 0 && !(r - Number(i) <= this.idleMs);
  }
  /** Why the in-memory session has run out, or null while it's still good. */
  expiry(n = Date.now()) {
    const i = this.live;
    return i ? Number(i.expiresAt) > n ? this.idleMs > 0 && !(n - Number(i.lastActive) <= this.idleMs) ? "idle" : null : "expired" : null;
  }
  async save(n, i) {
    const r = this.readMeta(), s = Date.now(), a = { session: n, key: i, keyId: null, expiresAt: s + this.ttlMs, lastActive: s };
    if (this.live = a, this.lastWrite = s, r && this.vault?.delete(r.keyId).catch(() => {
    }), this.removeMeta(), !(this.mode !== "session" || !i.cryptoKey || !this.meta || !this.vault))
      try {
        const o = Ot();
        if (await this.vault.put({ id: o, key: i.cryptoKey, publicKeyHex: i.publicKeyHex, expiresAt: a.expiresAt, lastActive: s }), this.live !== a) return void this.vault.delete(o).catch(() => {
        });
        a.keyId = o;
        const l = { v: 2, session: n, keyId: o, publicKeyHex: i.publicKeyHex, expiresAt: a.expiresAt, lastActive: s };
        this.meta.setItem(this.storageKey, JSON.stringify(l));
      } catch {
      }
  }
  async load() {
    if (this.live)
      return this.expiry() ? (this.clear(), null) : { session: this.live.session, key: this.live.key };
    if (this.mode !== "session") return null;
    this.vault?.purge((i) => this.stale(i.expiresAt, i.lastActive)).catch(() => {
    });
    const n = this.readMeta();
    if (!n) return null;
    if (this.stale(n.expiresAt, n.lastActive) || !this.vault) return this.clear(), null;
    try {
      const i = await this.vault.get(n.keyId);
      if (!i || i.publicKeyHex !== n.publicKeyHex) return this.clear(), null;
      const r = await Xt.fromCryptoKey(i.key, n.publicKeyHex);
      return this.live = { session: n.session, key: r, keyId: n.keyId, expiresAt: n.expiresAt, lastActive: n.lastActive }, { session: n.session, key: r };
    } catch {
      return this.clear(), null;
    }
  }
  /** Records user activity; written to storage at most once a minute. */
  touch(n = Date.now()) {
    const i = this.live;
    if (!i || this.expiry(n) || (i.lastActive = n, n - this.lastWrite < Fc || !i.keyId)) return;
    this.lastWrite = n;
    const r = this.readMeta();
    if (r && r.keyId === i.keyId)
      try {
        this.meta?.setItem(this.storageKey, JSON.stringify({ ...r, lastActive: n }));
      } catch {
      }
    i.key.cryptoKey && this.vault?.put({ id: i.keyId, key: i.key.cryptoKey, publicKeyHex: i.key.publicKeyHex, expiresAt: i.expiresAt, lastActive: n }).catch(() => {
    });
  }
  /**
   * Forgets the session. With `onlyIfPublicKeyHex`, storage is cleared only if it still holds that key, so a
   * second widget on the page that has since saved a newer session isn't logged out by this one.
   */
  clear(n) {
    this.live = null;
    const i = this.readMeta();
    if (!i) return this.removeMeta();
    n && i.publicKeyHex !== n || (this.removeMeta(), this.vault?.delete(i.keyId).catch(() => {
    }));
  }
  /** Reads this tab's session pointer. Anything else under the key (including pre-v2 raw keys) is deleted. */
  readMeta() {
    let n = null;
    try {
      n = this.meta?.getItem(this.storageKey) ?? null;
    } catch {
      return null;
    }
    if (!n) return null;
    try {
      const i = JSON.parse(n);
      if (i && i.v === 2 && typeof i.keyId == "string" && typeof i.publicKeyHex == "string" && i.session && !("privateKeyHex" in i)) return i;
    } catch {
    }
    return this.removeMeta(), null;
  }
  removeMeta() {
    try {
      this.meta?.removeItem(this.storageKey);
    } catch {
    }
  }
}
function Oc() {
  try {
    return typeof sessionStorage < "u" ? sessionStorage : null;
  } catch {
    return null;
  }
}
function Bc() {
  try {
    return typeof indexedDB < "u" ? new qc() : null;
  } catch {
    return null;
  }
}
const Rc = "strike-everywhere-keys", Or = "keys";
class qc {
  constructor() {
    ee(this, "db", null);
  }
  open() {
    return this.db ?? (this.db = new Promise((n, i) => {
      const r = indexedDB.open(Rc, 1);
      r.onupgradeneeded = () => r.result.createObjectStore(Or, { keyPath: "id" }), r.onsuccess = () => n(r.result), r.onerror = () => i(r.error), r.onblocked = () => i(new Error("IndexedDB blocked"));
    }).catch((n) => {
      throw this.db = null, n;
    })), this.db;
  }
  async run(n, i) {
    const r = await this.open();
    return new Promise((s, a) => {
      const o = r.transaction(Or, n), l = i(o.objectStore(Or));
      o.oncomplete = () => s(l ? l.result : void 0), o.onerror = () => a(o.error), o.onabort = () => a(o.error);
    });
  }
  async put(n) {
    await this.run("readwrite", (i) => i.put(n));
  }
  async get(n) {
    return await this.run("readonly", (i) => i.get(n)) ?? null;
  }
  async delete(n) {
    await this.run("readwrite", (i) => i.delete(n));
  }
  async purge(n) {
    await this.run("readwrite", (i) => {
      const r = i.openCursor();
      r.onsuccess = () => {
        const s = r.result;
        s && (n(s.value) && s.delete(), s.continue());
      };
    });
  }
}
const Uc = /* @__PURE__ */ new Set(["_events", "_eventsCount", "_maxListeners", "enable", "isEnabled"]), Hc = { nufi: "NuFi", vespr: "VESPR", gerowallet: "GeroWallet", typhoncip30: "Typhon" };
function Wc(t) {
  return !t || /[A-Z]/.test(t) ? t : Hc[t] ?? t.charAt(0).toUpperCase() + t.slice(1);
}
function jc(t = globalThis) {
  const n = t?.cardano;
  if (!n || typeof n != "object") return [];
  const i = /* @__PURE__ */ new Set(), r = [];
  for (const s of Object.keys(n)) {
    if (Uc.has(s)) continue;
    const a = n[s];
    !a || typeof a.enable != "function" || i.has(a) || (i.add(a), r.push({ id: s, name: Wc(a.name || s), icon: a.icon }));
  }
  return r.sort((s, a) => s.name.localeCompare(a.name));
}
function Xn(t) {
  const n = t, i = String(n?.info || n?.message || t || "");
  if (/\blocked?\b/i.test(i)) return "Your wallet is locked. Unlock it and try again.";
  if (/declin|reject|cancel|denied|user (closed|abort)/i.test(i)) return "Declined in your wallet.";
  if (/hardware|ledger|trezor|device/i.test(i)) return "Your hardware wallet couldn't sign. Connect and unlock it, open the Cardano app, and try again.";
  switch (n?.code) {
    case -3:
      return "Your wallet refused the request. Unlock it and allow this site in its connected-dApps settings.";
    case -4:
      return "Your wallet account changed. Disconnect and connect again.";
    case 1:
      return "Your wallet couldn't produce the signature (e.g. a hardware wallet that's locked or busy). Try again.";
    case 2:
      return /address/i.test(i) ? "This address can't sign messages. Use a regular wallet account." : "Declined in your wallet.";
    case 3:
      return "Declined in your wallet.";
  }
  return i || "Your wallet returned an error.";
}
class Po extends Error {
  constructor(n, i) {
    super(
      n === 1 ? "Your wallet is on a test network. Switch it to Cardano Mainnet." : "Your wallet is on Mainnet. Switch it to the Preprod test network."
    ), this.expected = n, this.actual = i;
  }
}
class _i {
  constructor(n, i, r, s, a) {
    this.id = n, this.name = i, this.api = r, this.addressHex = s, this.address = a;
  }
  static async enable(n, i, r = globalThis) {
    const s = r?.cardano?.[n];
    if (!s?.enable) throw new Error(`Wallet "${n}" is not installed in this browser.`);
    const a = await s.enable(), o = await a.getNetworkId();
    if (o !== i.cardanoNetworkId) throw new Po(i.cardanoNetworkId, o);
    const l = await a.getChangeAddress();
    return new _i(n, s.name || n, a, l, mc(l));
  }
  /** CIP-30 `signData`, formatted the way Strike expects: `"{coseSign1Hex}:{coseKeyHex}"`. */
  async signMessage(n) {
    return this.signHex(ct(zn(n)));
  }
  /** CIP-30 `signData` over exact bytes given as hex, in Strike's `"{coseSign1Hex}:{coseKeyHex}"` format. */
  async signHex(n) {
    const { signature: i, key: r } = await this.api.signData(this.addressHex, n);
    return `${i}:${r}`;
  }
  /** Spendable ADA in lovelace (ignores native assets). */
  async balanceLovelace() {
    const [n] = fn(vn(await this.api.getBalance())), i = Array.isArray(n) ? n[0] : n;
    return typeof i == "bigint" ? i : BigInt(i);
  }
  async utxos() {
    return await this.api.getUtxos() ?? [];
  }
  /** Signs an unsigned transaction and returns the fully witnessed transaction hex. */
  async signTransaction(n) {
    const i = await this.api.signTx(n, !0);
    return ct(vc(vn(n), vn(i)));
  }
  async submit(n) {
    return this.api.submitTx(n);
  }
}
const Gc = 30 * 6e4, _a = ["pointerdown", "pointermove", "keydown", "wheel", "touchstart"];
class Li {
  constructor(n) {
    ee(this, "net");
    ee(this, "http");
    ee(this, "market");
    ee(this, "account");
    ee(this, "trading");
    ee(this, "deposits");
    ee(this, "withdrawals");
    ee(this, "feeBps");
    ee(this, "maxFeeBps");
    ee(this, "session", null);
    ee(this, "wallet", null);
    ee(this, "store");
    ee(this, "listeners", /* @__PURE__ */ new Set());
    ee(this, "specs", /* @__PURE__ */ new Map());
    ee(this, "rawMarkets", /* @__PURE__ */ new Map());
    ee(this, "priceStream", null);
    ee(this, "userStream", null);
    ee(this, "idleTimer", null);
    ee(this, "idleTimeoutMs");
    ee(this, "onActivity", (n) => {
      n.isTrusted && this.touch();
    });
    ee(this, "onVisible", () => {
      typeof document < "u" && document.visibilityState === "visible" && this.checkExpiry();
    });
    this.opts = n, this.net = bl[n.network ?? "mainnet"], this.http = new Hl(this.net), this.market = new Ql(this.http), this.account = new ec(this.http), this.trading = new wi(this.http, this.account), this.deposits = new zc(this.http), this.withdrawals = new Lc(this.http);
    const i = Sa(n.feeBps ?? 5);
    this.maxFeeBps = Sa(n.maxFeeBps ?? i, i), this.feeBps = Math.min(i, this.maxFeeBps), this.idleTimeoutMs = Math.max(0, Number(n.idleTimeoutMs ?? Gc) || 0), this.store = new Dc(n.persist ?? "memory", `strike-everywhere:${this.net.network}:${n.builderCode}`, n.sessionTtlMs ?? 12 * 36e5, this.idleTimeoutMs), this.http.beforeSign = () => this.checkExpiry();
  }
  // ---------------------------------------------------------------- lifecycle
  on(n) {
    return this.listeners.add(n), () => this.listeners.delete(n);
  }
  emit(n) {
    this.listeners.forEach((i) => i(n));
  }
  /** Syncs the clock and restores a persisted session, if any. */
  async init() {
    await this.http.syncClock();
    const n = await this.store.load();
    if (n) {
      if (!(Number(n.session.feeShareBps) >= this.feeBps) || n.session.builderCode !== this.opts.builderCode) {
        this.store.clear(n.key.publicKeyHex);
        return;
      }
      this.resetUserStream(), this.http.key = n.key, this.session = n.session, this.watchActivity(), this.emit({ type: "session", session: this.session });
    }
  }
  /** Counts as user activity for the idle timeout. The SDK already listens for real input on the page. */
  touch() {
    this.checkExpiry() || this.store.touch();
  }
  /** Ends the session if it ran past its lifetime or idle limit. Returns true when it did. */
  checkExpiry() {
    const n = this.session ? this.store.expiry() : null;
    return n ? (this.endSession(n), !0) : !1;
  }
  watchActivity() {
    if (this.unwatchActivity(), !(typeof window > "u")) {
      for (const n of _a) window.addEventListener(n, this.onActivity, { capture: !0, passive: !0 });
      document.addEventListener("visibilitychange", this.onVisible), this.idleTimer = setInterval(() => this.checkExpiry(), 3e4);
    }
  }
  unwatchActivity() {
    if (this.idleTimer && clearInterval(this.idleTimer), this.idleTimer = null, !(typeof window > "u")) {
      for (const n of _a) window.removeEventListener(n, this.onActivity, { capture: !0 });
      document.removeEventListener("visibilitychange", this.onVisible);
    }
  }
  /** Builder fee actually sent with orders: never above what the user approved for this session. */
  get orderFeeBps() {
    const n = Number(this.session?.feeShareBps);
    return Number.isFinite(n) ? Math.min(this.feeBps, n) : this.feeBps;
  }
  resetUserStream() {
    this.userStream?.close(), this.userStream = null;
  }
  static wallets() {
    return jc();
  }
  /** Enables the wallet and checks Strike's new-account rule before asking for any signature. */
  async checkOnboarding(n) {
    this.wallet = await _i.enable(n, this.net);
    const [i, r, s] = await Promise.all([
      this.account.exists(this.wallet.address),
      this.wallet.balanceLovelace().catch(() => 0n),
      this.markPrice("ADA-USD").catch(() => 0)
    ]), a = Number(r) / 1e6, o = a * s;
    return {
      address: this.wallet.address,
      hasStrikeAccount: i,
      walletAda: a,
      walletUsd: o,
      minFirstDepositUsd: Wt,
      canAffordFirstDeposit: i !== !1 || o >= Wt * 1.02
    };
  }
  /** Builder Connect: one wallet signature creates/links the Strike account and a trading key for this builder. */
  async connect(n, i = {}) {
    (!this.wallet || this.wallet.id !== n) && (this.wallet = await _i.enable(n, this.net));
    const r = this.wallet, { session: s, key: a } = await jl({
      http: this.http,
      address: r.address,
      chain: "cardano",
      builderCode: this.opts.builderCode,
      feeShareBps: this.maxFeeBps,
      referralCode: this.opts.referralCode,
      signMessage: (o) => r.signMessage(o),
      onMessage: i.onMessage
    });
    return this.resetUserStream(), this.http.key = a, this.session = s, await this.store.save(s, a), this.watchActivity(), this.beacon({ type: "connect", accountId: s.accountId }), this.emit({ type: "session", session: s }), s;
  }
  /** Closes all sockets (call when the host removes the widget). The session itself is kept. */
  dispose() {
    this.priceStream?.close(), this.priceStream = null, this.userStream?.close(), this.userStream = null, this.unwatchActivity(), this.listeners.clear();
  }
  disconnect() {
    this.endSession("disconnect");
  }
  /**
   * Forgets the trading key here. Strike keeps honouring it until the same wallet connects again (which
   * revokes it); with a browser-held key, nothing outside this page could have kept a copy.
   */
  endSession(n) {
    this.unwatchActivity(), this.resetUserStream();
    const i = this.http.key?.publicKeyHex;
    this.http.key = null, this.session = null, this.wallet = null, this.store.clear(i), this.emit({ type: "session", session: null, reason: n });
  }
  /**
   * Re-enables the wallet after a page reload (needed for deposits and withdrawals, not for trading).
   * Refuses a wallet whose active account isn't the one this session belongs to.
   */
  async ensureWallet(n) {
    if (this.wallet || (this.wallet = await _i.enable(n, this.net)), this.session?.address && this.wallet.address !== this.session.address)
      throw this.wallet = null, new Error(
        "Your wallet's active address isn't the one connected to Strike here. Switch back to that account, or turn on single-address mode in your wallet (multi-address mode can rotate addresses), or disconnect and connect again."
      );
    return this.wallet;
  }
  // ---------------------------------------------------------------- markets
  async loadMarkets() {
    const n = await this.market.markets();
    for (const i of n)
      this.rawMarkets.set(i.symbol, i), this.specs.set(i.symbol, ha(i));
    return n.filter((i) => i.status === "trading").map(ha);
  }
  spec(n) {
    const i = this.specs.get(n);
    if (!i) throw new Error(`Unknown market ${n}; call loadMarkets() first.`);
    return i;
  }
  raw(n) {
    return this.rawMarkets.get(n);
  }
  async markPrice(n) {
    return Number((await this.market.premiumIndex(n)).markPrice);
  }
  /** Price of the latest public trade (what a `contract_price` trigger watches); 0 if there are no recent trades. */
  async lastPrice(n) {
    return (await this.market.trades(n, 1))[0]?.price ?? 0;
  }
  prices() {
    return this.priceStream || (this.priceStream = new Ec(this.net.wsPrice), this.priceStream.connect()), this.priceStream;
  }
  userEvents() {
    return this.http.key ? (this.userStream || (this.userStream = new Ic(this.net.wsUser, this.http.key, () => this.http.serverNowMs()), this.userStream.onMessage((n) => this.emit({ type: "user", data: n })), this.userStream.connect()), this.userStream) : null;
  }
  // ---------------------------------------------------------------- trading
  /**
   * Places an order with this builder's fee and waits for Strike's final verdict.
   * Throws without sending if the requested leverage can't be applied (the user was shown margin and
   * liquidation at that leverage, so sending at a different one would misrepresent the risk).
   */
  async placeOrder(n) {
    const i = this.spec(n.symbol);
    if (n.leverage && await this.applyLeverage(n.symbol, n.leverage), $n(n.type)) {
      const s = n.workingType === "contract_price", [a, o] = await Promise.all([this.markPrice(n.symbol).catch(() => 0), s ? this.lastPrice(n.symbol).catch(() => 0) : Promise.resolve(0)]), l = yi({ ...n, mark: a, last: o, priceBound: Number(this.raw(n.symbol)?.order_limit_price_bound) || void 0, tickSize: i.tickSize }), d = s ? o : a;
      if (l) throw new Error(d > 0 ? `${l}. Order not sent.` : `Couldn't check the trigger against the current ${s ? "last" : "mark"} price. Order not sent.`);
    } else if (n.type === "trailing_stop_market") {
      const s = yi({ ...n, mark: 0 });
      if (s) throw new Error(`${s}. Order not sent.`);
    }
    const r = n.price ?? n.stopPrice ?? Number(this.raw(n.symbol)?.mark_price ?? 0);
    return this.submitTracked(n.symbol, wi.newOrderIds(n), n.side, n.size * r, (s) => this.trading.placeOrder(i, n, this.orderFeeBps, s));
  }
  /** Cancels all open orders on `symbol`, or on every market when omitted. Returns Strike's count (null = unknown). */
  cancelAll(n) {
    return this.trading.cancelAll(n);
  }
  /**
   * Starts a TWAP with this builder's fee header (leverage applied first, as for orders).
   * Attribution: Strike assigns the child orders' client ids, so they can't be registered before they
   * exist and the partner API never credits them. The strategy is only logged (status "twap").
   */
  async placeTwap(n) {
    const i = this.spec(n.symbol), r = await this.markPrice(n.symbol).catch(() => 0);
    if (!(r > 0)) throw new Error("Couldn't get the current mark price. TWAP not started.");
    const s = ko(i, Number(ue(n.size, i.marketStepSize ?? i.stepSize, "floor")), Math.round(Number(n.durationSec)), r);
    if (s) throw new Error(s);
    if (n.limitPrice !== void 0) {
      const l = Number(this.raw(n.symbol)?.order_limit_price_bound) || 0.05;
      if (!(n.limitPrice > 0) || Math.abs(n.limitPrice - r) / r > l)
        throw new Error(`TWAP limit price must be within ${(l * 100).toFixed(0)}% of the mark price. TWAP not started.`);
    }
    n.leverage && await this.applyLeverage(n.symbol, n.leverage);
    const a = await this.trading.createTwap(i, n, this.orderFeeBps), o = r;
    return ua(a.strategyId) && this.beacon({ type: "order", status: "twap", clientOrderId: a.strategyId, symbol: n.symbol, side: n.side, notional: n.size * o, reduceOnly: !!n.reduceOnly }), a;
  }
  /**
   * Switches `symbol` between cross and isolated margin and waits until `GET /v2/account` reports it
   * (Strike applies settings asynchronously, like leverage). Strike only allows it with no open position.
   */
  async setMarginMode(n, i) {
    let r;
    try {
      r = await this.account.positions();
    } catch {
      throw new Error("Couldn't check your open positions. Margin mode not changed; try again.");
    }
    if (r.some((a) => a.symbol === n && Number(a.size) !== 0)) throw new Error(`Close your ${n} position first: Strike only changes margin mode with no open position.`);
    if (await this.account.symbolMarginMode(n).catch(() => null) === i) return;
    await this.trading.setMarginMode(n, i);
    const s = Date.now() + 5e3;
    for (; ; ) {
      if (await this.account.symbolMarginMode(n).catch(() => null) === i) return;
      if (Date.now() > s) throw new Error("Strike hasn't confirmed the margin mode change yet. Check it again before trading.");
      await new Promise((a) => setTimeout(a, 400));
    }
  }
  /** Live order book for `symbol` over the shared price socket. Call `close()` on the result when done. */
  orderBook(n) {
    return new Kl(this.market, this.prices(), n).start();
  }
  /** Strike app page of a vault (falls back to the vault list for anything that isn't a vault UUID). */
  vaultUrl(n) {
    return this.appUrl(ua(n) ? `/vaults/${n}` : "/vaults");
  }
  /**
   * Edits an open order (new price, trigger or size) with Strike's replace endpoint. The replacement gets a new
   * client id, registered for attribution like any order. Trailing stops and bracket legs can't be edited this way.
   */
  async editOrder(n, i) {
    const r = String(n.type);
    if (r === "trailing_stop_market") throw new Error("Trailing stops can't be edited: cancel it and place a new one.");
    if (r === "market") throw new Error("Market orders can't be edited.");
    const s = this.spec(n.symbol), a = Math.max(0, Number(n.size) - (Number(n.filled) || 0)), o = {
      symbol: n.symbol,
      side: n.side,
      type: r,
      size: i.size ?? a,
      price: tn(r) ? i.price ?? Number(n.price) : void 0,
      stopPrice: $n(r) ? i.stopPrice ?? Number(n.stop_price) : void 0,
      reduceOnly: !!n.reduce_only,
      // Keep the price the trigger watches; without it the replacement would fall back to the mark.
      workingType: $n(r) && n.working_type === "contract_price" ? "contract_price" : void 0
    };
    if ($n(r)) {
      const d = o.workingType === "contract_price", [p, u] = await Promise.all([this.markPrice(n.symbol).catch(() => 0), d ? this.lastPrice(n.symbol).catch(() => 0) : Promise.resolve(0)]), c = yi({ ...o, mark: p, last: u, priceBound: Number(this.raw(n.symbol)?.order_limit_price_bound) || void 0, tickSize: s.tickSize });
      if (c) throw new Error(`${c}. Order not changed.`);
    }
    const l = o.price ?? o.stopPrice ?? Number(this.raw(n.symbol)?.mark_price ?? 0);
    return this.submitTracked(n.symbol, { clientOrderId: Ot() }, n.side, o.size * l, (d) => this.trading.replaceOrder(s, n, o, this.orderFeeBps, d.clientOrderId), !!o.reduceOnly);
  }
  /**
   * Adds take-profit and/or stop-loss orders to an open position: reduce-only conditional orders on the closing side,
   * for `fraction` of the position (Strike's order-type docs recommend reduce-only for exits).
   */
  async setPositionExits(n, i) {
    const r = Math.abs(Number(n.size)) * Math.min(1, Math.max(0, i.fraction ?? 1)), s = Number(n.size) > 0 ? "sell" : "buy", a = [];
    return i.takeProfit && a.push(await this.placeOrder({ symbol: n.symbol, side: s, type: "take_profit", size: r, stopPrice: i.takeProfit, reduceOnly: !0, closePosition: (i.fraction ?? 1) >= 1, workingType: i.workingType })), i.stopLoss && a.push(await this.placeOrder({ symbol: n.symbol, side: s, type: "stop", size: r, stopPrice: i.stopLoss, reduceOnly: !0, closePosition: (i.fraction ?? 1) >= 1, workingType: i.workingType })), a;
  }
  /** Trailing stop on an open position: reduce-only `trailing_stop_market` for the whole position. */
  async trailPosition(n, i, r, s) {
    const a = Number(n.size) > 0 ? "sell" : "buy";
    return this.placeOrder({ symbol: n.symbol, side: a, type: "trailing_stop_market", size: Math.abs(Number(n.size)), callbackRate: i, activationPrice: r, reduceOnly: !0, workingType: s });
  }
  /** Closes (part of) a position with a reduce-only limit order at `price`. */
  async limitClose(n, i, r = 1) {
    const s = Number(n.size) > 0 ? "sell" : "buy", a = bs(this.spec(n.symbol), Math.abs(Number(n.size)), Math.min(1, r), "limit");
    if (!(a > 0)) throw new Error("That's smaller than the market's minimum size. Close a larger part.");
    return this.placeOrder({ symbol: n.symbol, side: s, type: "limit", size: a, price: i, reduceOnly: !0 });
  }
  /**
   * Reverses a position (long ↔ short, same size) with one market order of twice its size on the other side, like
   * Strike's app "Reverse Position". It opens new exposure, so it needs margin for the new side.
   */
  async reversePosition(n) {
    const i = Number(n.size) > 0 ? "sell" : "buy";
    return this.placeOrder({ symbol: n.symbol, side: i, type: "market", size: Math.abs(Number(n.size)) * 2 });
  }
  /** Closes every open position at market, one after another. Resolves to each outcome (never throws for one failure). */
  async closeAllPositions() {
    const n = await this.account.positions(), i = [];
    for (const r of n)
      try {
        const s = await this.closePosition(r);
        i.push({ symbol: r.symbol, ok: s.status === "filled", status: s.status });
      } catch (s) {
        i.push({ symbol: r.symbol, ok: !1, error: s?.message || String(s) });
      }
    return i;
  }
  /** Adds or removes margin on an isolated position. */
  modifyMargin(n, i, r) {
    return this.trading.modifyIsolatedMargin(n, i, r);
  }
  /** Starts a grid bot (leverage applied first when given). Attribution of grid child orders is not tracked. */
  async startGrid(n) {
    const i = this.spec(n.symbol);
    n.leverage && await this.applyLeverage(n.symbol, n.leverage);
    const r = await this.markPrice(n.symbol).catch(() => 0), s = So(n, r);
    if (s) throw new Error(`${s}. Grid not started.`);
    return this.trading.createGrid(i, n, this.orderFeeBps);
  }
  /** Closes a position at market; `fraction` (0–1) closes part of it. */
  async closePosition(n, i = 1) {
    const r = this.spec(n.symbol), s = Number(this.raw(n.symbol)?.mark_price ?? n.entry_price), a = Number(n.size) > 0 ? "sell" : "buy", o = Math.abs(Number(n.size)) * Math.min(1, Math.max(0, i)) * s;
    return this.submitTracked(n.symbol, wi.newOrderIds({}), a, o, (l) => this.trading.closePosition(r, n, this.orderFeeBps, l, i), !0);
  }
  async applyLeverage(n, i) {
    const r = Math.round(i);
    if (await this.account.symbolLeverage(n).catch(() => null) !== r)
      try {
        await this.trading.setLeverage(n, r);
        const a = Date.now() + 5e3;
        for (; ; ) {
          const o = await this.account.symbolLeverage(n).catch(() => null);
          if (o === r || o === null) break;
          if (Date.now() > a) throw new Error("Strike hasn't confirmed the leverage change yet");
          await new Promise((l) => setTimeout(l, 400));
        }
      } catch (a) {
        const o = await this.account.positions().catch(() => []), l = Number(o.find((d) => d.symbol === n && Number(d.size) !== 0)?.leverage);
        if (Number.isFinite(l) && l > 0 && l <= i) return;
        throw new Error(`Couldn't set ${n} leverage to ${i}x (${a?.message || a}). Order not sent.`);
      }
  }
  /**
   * Registers the order's ids with the partner API *before* sending it (attribution is only credited
   * for ids registered before Strike created the order, so nobody can claim fills after the fact),
   * then places it and reports the outcome.
   */
  async submitTracked(n, i, r, s, a, o = !1) {
    const l = { clientOrderId: i.clientOrderId, legClientOrderIds: i.legClientOrderIds, symbol: n, side: r, notional: s, reduceOnly: o };
    await this.beacon({ type: "order", status: "intent", ...l }, 1500);
    const d = await a(i);
    try {
      const p = await this.trading.waitForOrder(n, d.clientOrderId);
      return this.beacon({ type: "order", ...l, orderId: p.id, status: p.status }), this.emit({ type: "order", order: p }), p;
    } catch (p) {
      throw this.beacon({ type: "order", ...l, status: p instanceof Hn ? "rejected" : "pending" }), p;
    }
  }
  // ---------------------------------------------------------------- deposits
  async prepareDeposit(n) {
    if (!this.wallet) throw new Error("Connect a wallet first.");
    if (!(n > 0) || !Number.isFinite(n)) throw new Error("Enter an amount of ADA.");
    return this.deposits.prepareAda(this.wallet, BigInt(Math.round(n * 1e6)), this.session?.accountId);
  }
  async confirmDeposit(n) {
    if (!this.wallet) throw new Error("Connect a wallet first.");
    try {
      const i = await this.deposits.signAndSubmit(this.wallet, n);
      return this.beacon({ type: "deposit", usd: n.usdValue, txHash: i.txHash }), i;
    } catch (i) {
      throw i instanceof gr && this.beacon({ type: "deposit", usd: n.usdValue, txHash: i.txHash }), i;
    }
  }
  /** Retries registering a deposit that's on-chain (see DepositRegistrationError). */
  async retryDepositRegistration(n, i) {
    await this.deposits.register(n, i);
  }
  // ---------------------------------------------------------------- withdrawals
  /** Strike's own withdrawal bounds and referral discount for the connected account (fields null when unknown). */
  withdrawLimits() {
    return this.account.withdrawLimits();
  }
  /** Strike app link that applies the host's referral code (Strike only lets users apply codes in its app). */
  referralLink() {
    const n = this.opts.referralCode;
    return n ? `${this.net.app}/trade/BTC?referralCode=${encodeURIComponent(n)}` : null;
  }
  async prepareWithdrawal(n) {
    return this.withdrawals.prepareAda(n, this.wallet?.address);
  }
  async confirmWithdrawal(n) {
    if (!this.wallet) throw new Error("Connect a wallet first.");
    return this.withdrawals.signAndSubmit(this.wallet, n);
  }
  appUrl(n = "") {
    return this.net.app + n;
  }
  // ---------------------------------------------------------------- attribution beacon
  /**
   * Sends an attribution event. Never throws. With `waitMs`, resolves once the partner API acknowledged
   * the event or after `waitMs`, whichever comes first (so a slow or down API never blocks trading).
   */
  beacon(n, i = 0) {
    const r = n.accountId ?? this.session?.accountId;
    if (!this.opts.partnerApi || !r) return Promise.resolve();
    const s = {
      ...n,
      network: this.net.network,
      builderCode: this.opts.builderCode,
      partnerId: this.opts.partnerId ?? "",
      hostOrigin: typeof location < "u" ? location.origin : "",
      accountId: r,
      feeBps: this.orderFeeBps,
      ts: Date.now()
    };
    try {
      const a = fetch(`${this.opts.partnerApi.replace(/\/$/, "")}/v1/events`, { method: "POST", body: JSON.stringify(s), headers: { "Content-Type": "text/plain" }, keepalive: !0 }).then(() => {
      }).catch(() => {
      });
      return i > 0 ? Promise.race([a, new Promise((o) => setTimeout(o, i))]) : Promise.resolve();
    } catch {
      return Promise.resolve();
    }
  }
}
function Sa(t, n = 5) {
  const i = Number(t);
  return Math.max(0, Math.min(xl, Math.round(Number.isFinite(i) ? i : n)));
}
var Zn, qe, Br, Ca, cr = 0, Ao = [], We = Me, $a = We.__b, Ma = We.__r, za = We.diffed, Ta = We.__c, Na = We.unmount, Pa = We.__;
function fr(t, n) {
  We.__h && We.__h(qe, t, cr || n), cr = 0;
  var i = qe.__H || (qe.__H = { __: [], __h: [] });
  return t >= i.__.length && i.__.push({}), i.__[t];
}
function m(t) {
  return cr = 1, Vc(Lo, t);
}
function Vc(t, n, i) {
  var r = fr(Zn++, 2);
  if (r.t = t, !r.__c && (r.__ = [Lo(void 0, n), function(l) {
    var d = r.__N ? r.__N[0] : r.__[0], p = r.t(d, l);
    d !== p && (r.__N = [p, r.__[1]], r.__c.setState({}));
  }], r.__c = qe, !qe.u)) {
    var s = function(l, d, p) {
      if (!r.__c.__H) return !0;
      var u = r.__c.__H.__.filter(function(h) {
        return !!h.__c;
      });
      if (u.every(function(h) {
        return !h.__N;
      })) return !a || a.call(this, l, d, p);
      var c = !1;
      return u.forEach(function(h) {
        if (h.__N) {
          var g = h.__[0];
          h.__ = h.__N, h.__N = void 0, g !== h.__[0] && (c = !0);
        }
      }), !(!c && r.__c.props === l) && (!a || a.call(this, l, d, p));
    };
    qe.u = !0;
    var a = qe.shouldComponentUpdate, o = qe.componentWillUpdate;
    qe.componentWillUpdate = function(l, d, p) {
      if (this.__e) {
        var u = a;
        a = void 0, s(l, d, p), a = u;
      }
      o && o.call(this, l, d, p);
    }, qe.shouldComponentUpdate = s;
  }
  return r.__N || r.__;
}
function Z(t, n) {
  var i = fr(Zn++, 3);
  !We.__s && vs(i.__H, n) && (i.__ = t, i.i = n, qe.__H.__h.push(i));
}
function ti(t, n) {
  var i = fr(Zn++, 4);
  !We.__s && vs(i.__H, n) && (i.__ = t, i.i = n, qe.__h.push(i));
}
function De(t) {
  return cr = 5, en(function() {
    return { current: t };
  }, []);
}
function en(t, n) {
  var i = fr(Zn++, 7);
  return vs(i.__H, n) && (i.__ = t(), i.__H = n, i.__h = t), i.__;
}
function Kc() {
  for (var t; t = Ao.shift(); ) if (t.__P && t.__H) try {
    t.__H.__h.forEach(Ji), t.__H.__h.forEach(Qr), t.__H.__h = [];
  } catch (n) {
    t.__H.__h = [], We.__e(n, t.__v);
  }
}
We.__b = function(t) {
  qe = null, $a && $a(t);
}, We.__ = function(t, n) {
  t && n.__k && n.__k.__m && (t.__m = n.__k.__m), Pa && Pa(t, n);
}, We.__r = function(t) {
  Ma && Ma(t), Zn = 0;
  var n = (qe = t.__c).__H;
  n && (Br === qe ? (n.__h = [], qe.__h = [], n.__.forEach(function(i) {
    i.__N && (i.__ = i.__N), i.i = i.__N = void 0;
  })) : (n.__h.forEach(Ji), n.__h.forEach(Qr), n.__h = [], Zn = 0)), Br = qe;
}, We.diffed = function(t) {
  za && za(t);
  var n = t.__c;
  n && n.__H && (n.__H.__h.length && (Ao.push(n) !== 1 && Ca === We.requestAnimationFrame || ((Ca = We.requestAnimationFrame) || Yc)(Kc)), n.__H.__.forEach(function(i) {
    i.i && (i.__H = i.i), i.i = void 0;
  })), Br = qe = null;
}, We.__c = function(t, n) {
  n.some(function(i) {
    try {
      i.__h.forEach(Ji), i.__h = i.__h.filter(function(r) {
        return !r.__ || Qr(r);
      });
    } catch (r) {
      n.some(function(s) {
        s.__h && (s.__h = []);
      }), n = [], We.__e(r, i.__v);
    }
  }), Ta && Ta(t, n);
}, We.unmount = function(t) {
  Na && Na(t);
  var n, i = t.__c;
  i && i.__H && (i.__H.__.forEach(function(r) {
    try {
      Ji(r);
    } catch (s) {
      n = s;
    }
  }), i.__H = void 0, n && We.__e(n, i.__v));
};
var Aa = typeof requestAnimationFrame == "function";
function Yc(t) {
  var n, i = function() {
    clearTimeout(r), Aa && cancelAnimationFrame(n), setTimeout(t);
  }, r = setTimeout(i, 100);
  Aa && (n = requestAnimationFrame(i));
}
function Ji(t) {
  var n = qe, i = t.__c;
  typeof i == "function" && (t.__c = void 0, i()), qe = n;
}
function Qr(t) {
  var n = qe;
  t.__c = t.__(), qe = n;
}
function vs(t, n) {
  return !t || t.length !== n.length || n.some(function(i, r) {
    return i !== t[r];
  });
}
function Lo(t, n) {
  return typeof n == "function" ? n(t) : n;
}
const Rr = ({ size: t = 12 }) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 12 12", "aria-hidden": "true", children: /* @__PURE__ */ e("path", { d: "M3 4.5 6 7.5 9 4.5", fill: "none", stroke: "currentColor", "stroke-width": "1.6", "stroke-linecap": "round", "stroke-linejoin": "round" }) }), La = ["#4efab0", "#7aa2ff", "#f8931a", "#c084fc", "#38bdf8", "#facc15", "#fb7185"], Ea = "https://app.strikefinance.org/images/";
function Ia({ base: t }) {
  const n = [`${Ea}${encodeURIComponent(t.toLowerCase())}.webp`, `${Ea}${encodeURIComponent(t.toLowerCase())}.svg`], [i, r] = m(0);
  if (Z(() => r(0), [t]), i < n.length)
    return /* @__PURE__ */ e("span", { class: "coin img", "aria-hidden": "true", children: /* @__PURE__ */ e("img", { src: n[i], alt: "", width: 26, height: 26, loading: "lazy", decoding: "async", referrerpolicy: "no-referrer", onError: () => r(i + 1) }) });
  const s = t === "ADA" ? "#4efab0" : La[[...t].reduce((a, o) => a + o.charCodeAt(0), 0) % La.length];
  return /* @__PURE__ */ e("span", { class: "coin", style: { background: s }, "aria-hidden": "true", children: t.slice(0, t.length > 3 ? 2 : 3) });
}
let Xc = 0;
function qn({ children: t, label: n = "What is this?" }) {
  const [i, r] = m(!1), [s, a] = m(0), o = De(null), l = De(null), d = De(`se-info-${++Xc}`).current;
  return Z(() => {
    if (!i) return;
    const p = (h) => o.current && !h.composedPath().includes(o.current) && r(!1), u = o.current?.getRootNode() ?? document, c = (h) => h.key === "Escape" && r(!1);
    return document.addEventListener("pointerdown", p, !0), u.addEventListener("keydown", c), () => {
      document.removeEventListener("pointerdown", p, !0), u.removeEventListener("keydown", c);
    };
  }, [i]), ti(() => {
    if (!i || !l.current) return a(0);
    const p = (l.current.closest(".card, .sheet") ?? document.documentElement).getBoundingClientRect(), u = l.current.getBoundingClientRect(), c = u.left - s, h = u.right - s;
    a(Math.round(h > p.right - 8 ? Math.max(p.left + 8 - c, p.right - 8 - h) : c < p.left + 8 ? p.left + 8 - c : 0));
  }), /* @__PURE__ */ e("span", { class: "info", ref: o, onKeyDown: (p) => p.key === "Escape" && i && (p.stopPropagation(), r(!1)), children: [
    /* @__PURE__ */ e("button", { type: "button", class: "info-b", "aria-label": n, "aria-expanded": i, "aria-controls": d, onClick: (p) => (p.stopPropagation(), r(!i)), children: /* @__PURE__ */ e("svg", { width: "13", height: "13", viewBox: "0 0 14 14", "aria-hidden": "true", children: [
      /* @__PURE__ */ e("circle", { cx: "7", cy: "7", r: "6.2", fill: "none", stroke: "currentColor", "stroke-width": "1.2" }),
      /* @__PURE__ */ e("path", { d: "M7 6.2v3.6", stroke: "currentColor", "stroke-width": "1.4", "stroke-linecap": "round" }),
      /* @__PURE__ */ e("circle", { cx: "7", cy: "4.2", r: ".85", fill: "currentColor" })
    ] }) }),
    i && /* @__PURE__ */ e("span", { class: "info-pop", id: d, role: "tooltip", ref: l, style: s ? { transform: `translateX(${s}px)` } : void 0, children: t })
  ] });
}
function Ee({ k: t, v: n, hint: i, info: r, cls: s }) {
  return /* @__PURE__ */ e("div", { class: "kv", children: [
    /* @__PURE__ */ e("span", { class: `k${i ? " dotted" : ""}`, title: i, children: [
      t,
      r && /* @__PURE__ */ e(qn, { label: typeof t == "string" ? `About ${t}` : void 0, children: r })
    ] }),
    /* @__PURE__ */ e("span", { class: `v ${s ?? ""}`, children: n })
  ] });
}
function qr({ on: t, label: n, onToggle: i }) {
  return /* @__PURE__ */ e("span", { class: `check${t ? " on" : ""}`, role: "checkbox", "aria-checked": t, tabIndex: 0, onClick: i, onKeyDown: (r) => (r.key === " " || r.key === "Enter") && (r.preventDefault(), i()), children: [
    /* @__PURE__ */ e("span", { class: "box", children: t && /* @__PURE__ */ e("svg", { width: "10", height: "10", viewBox: "0 0 10 10", "aria-hidden": "true", children: /* @__PURE__ */ e("path", { d: "M2 5.2 4.1 7.2 8 3", fill: "none", stroke: "#04120c", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }) }) }),
    n
  ] });
}
function Zc({ value: t, onChange: n }) {
  const i = Math.max(0, Math.min(100, t));
  return /* @__PURE__ */ e("div", { class: "slider", children: [
    /* @__PURE__ */ e("div", { class: "track" }),
    /* @__PURE__ */ e("div", { class: "fill", style: { width: `${i}%` } }),
    [0, 25, 50, 75, 100].map((r) => /* @__PURE__ */ e("span", { class: `tick${i >= r ? " on" : ""}`, style: { left: `${r}%` } }, r)),
    /* @__PURE__ */ e("span", { class: "knob", style: { left: `${i}%` } }),
    /* @__PURE__ */ e("input", { type: "range", min: 0, max: 100, step: 1, value: i, "aria-label": "Order size as % of buying power", onInput: (r) => n(Number(r.target.value)) })
  ] });
}
function Jc({ points: t, up: n }) {
  if (t.length < 2) return /* @__PURE__ */ e("svg", { class: "spark" });
  const i = 380, r = 56, s = Math.min(...t), o = Math.max(...t) - s || 1, d = t.map((c, h) => [h / (t.length - 1) * i, r - 6 - (c - s) / o * (r - 14)]).map(([c, h], g) => `${g ? "L" : "M"}${c.toFixed(1)},${h.toFixed(1)}`).join(" "), p = n ? "#4efab0" : "#f43f5e", u = n ? "se-up" : "se-dn";
  return /* @__PURE__ */ e("svg", { class: "spark", viewBox: `0 0 ${i} ${r}`, preserveAspectRatio: "none", "aria-label": "48-hour price chart", role: "img", children: [
    /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ e("linearGradient", { id: u, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ e("stop", { offset: "0", "stop-color": p, "stop-opacity": ".22" }),
      /* @__PURE__ */ e("stop", { offset: "1", "stop-color": p, "stop-opacity": "0" })
    ] }) }),
    /* @__PURE__ */ e("path", { d: `${d} L${i},${r} L0,${r} Z`, fill: `url(#${u})` }),
    /* @__PURE__ */ e("path", { d, fill: "none", stroke: p, "stroke-width": "1.6", "vector-effect": "non-scaling-stroke" })
  ] });
}
function Bt() {
  return /* @__PURE__ */ e("span", { class: "spin", "aria-label": "Loading" });
}
function ln({ state: t, n, children: i }) {
  return /* @__PURE__ */ e("div", { class: `step ${t === "todo" ? "" : t}`, children: [
    /* @__PURE__ */ e("span", { class: "s", children: t === "done" ? "✓" : t === "active" ? /* @__PURE__ */ e(Bt, {}) : n }),
    /* @__PURE__ */ e("span", { children: i })
  ] });
}
function nn(t) {
  if (t == null || !Number.isFinite(t)) return "—";
  const n = Math.abs(t);
  return t.toLocaleString("en-US", n >= 1e3 ? { maximumFractionDigits: 0 } : n >= 1 ? { maximumFractionDigits: 2 } : { maximumSignificantDigits: 4 });
}
function Jn(t, n = !1) {
  return t > 0 ? new Date(t).toLocaleString("en-US", n ? { month: "short", day: "numeric" } : { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }) : "—";
}
const At = () => typeof document < "u" && document.hidden;
function Qi({ children: t, actions: n }) {
  return /* @__PURE__ */ e("div", { class: "confirm", role: "alertdialog", children: [
    /* @__PURE__ */ e("div", { children: t }),
    /* @__PURE__ */ e("div", { class: "confirm-a", children: n })
  ] });
}
function Qc(t) {
  const n = t.replace(/,/g, ".").replace(/[^0-9.]/g, ""), i = n.indexOf(".");
  return i === -1 ? n : n.slice(0, i + 1) + n.slice(i + 1).replace(/\./g, "");
}
function _e(t) {
  const n = t.target, i = Qc(n.value);
  return n.value !== i && (n.value = i), i;
}
const ed = [
  { name: "Lace", href: "https://www.lace.io/" },
  { name: "Eternl", href: "https://eternl.io/" }
];
function Eo({ client: t, onClose: n, onConnected: i }) {
  const [r, s] = m([]), [a, o] = m(null), [l, d] = m(null), [p, u] = m("pick"), [c, h] = m(""), [g, f] = m(!1), [y, k] = m("");
  Z(() => {
    const v = () => s(Li.wallets());
    v();
    const $ = setTimeout(v, 400), S = setTimeout(v, 1500);
    return () => (clearTimeout($), clearTimeout(S));
  }, []);
  const _ = async (v) => {
    o(v), k(""), u("checking");
    try {
      d(await t.checkOnboarding(v.id)), u("review");
    } catch ($) {
      k($ instanceof Po ? $.message : Xn($) || "Could not open the wallet."), u("pick");
    }
  }, w = async () => {
    if (a) {
      k(""), u("signing");
      try {
        await t.connect(a.id, { onMessage: h }), u("done"), setTimeout(i, 600);
      } catch (v) {
        k(Xn(v)), u("review");
      }
    }
  }, z = (t.feeBps / 100).toFixed(2), C = (t.maxFeeBps / 100).toFixed(2);
  return /* @__PURE__ */ e("div", { class: "overlay", onClick: (v) => v.target === v.currentTarget && p !== "signing" && n(), children: /* @__PURE__ */ e("div", { class: "sheet", role: "dialog", "aria-modal": "true", "aria-label": "Connect wallet", children: [
    /* @__PURE__ */ e("h3", { children: [
      p === "pick" ? "Connect a Cardano wallet" : a?.name,
      /* @__PURE__ */ e("button", { class: "x", onClick: n, "aria-label": "Close", disabled: p === "signing", children: "×" })
    ] }),
    p === "pick" && /* @__PURE__ */ e(R, { children: [
      r.length ? /* @__PURE__ */ e("div", { class: "wallets", children: r.map((v) => /* @__PURE__ */ e("button", { class: "wallet", onClick: () => _(v), children: [
        v.icon ? /* @__PURE__ */ e("img", { src: v.icon, alt: "" }) : /* @__PURE__ */ e("span", { class: "coin", children: v.name.slice(0, 2) }),
        v.name
      ] }, v.id)) }) : /* @__PURE__ */ e("p", { children: [
        "No Cardano wallet found in this browser. Install",
        " ",
        ed.map((v, $) => /* @__PURE__ */ e("span", { children: [
          $ ? " or " : "",
          /* @__PURE__ */ e("a", { href: v.href, target: "_blank", rel: "noopener", class: "linkbtn", children: v.name })
        ] }, v.name)),
        " ",
        "and reload."
      ] }),
      /* @__PURE__ */ e("p", { children: "Strike perps run on Strike's exchange; this widget never holds your funds. Your wallet signs once to create a trading key that cannot withdraw." })
    ] }),
    p === "checking" && /* @__PURE__ */ e("p", { children: [
      /* @__PURE__ */ e(Bt, {}),
      " Checking your wallet and Strike account…"
    ] }),
    (p === "review" || p === "signing" || p === "done") && l && /* @__PURE__ */ e(R, { children: [
      /* @__PURE__ */ e("div", { class: "addr", children: Qt(l.address, 18, 10) }),
      l.hasStrikeAccount === null ? /* @__PURE__ */ e("div", { class: "note", children: [
        /* @__PURE__ */ e("b", { children: "Strike couldn't look up this wallet right now." }),
        " You can still connect. If it's new to Strike, its first deposit needs to be at least ",
        ge(l.minFirstDepositUsd, { decimals: 0 }),
        " (Strike's rule)."
      ] }) : l.hasStrikeAccount ? /* @__PURE__ */ e("div", { class: "note", children: [
        /* @__PURE__ */ e("b", { children: "Existing Strike account found." }),
        " Your balance and positions carry over."
      ] }) : /* @__PURE__ */ e("div", { class: l.canAffordFirstDeposit ? "note" : "warn", children: [
        /* @__PURE__ */ e("b", { children: "New to Strike." }),
        " Signing creates your Strike account. Strike asks for a first deposit of at least ",
        /* @__PURE__ */ e("b", { children: ge(l.minFirstDepositUsd, { decimals: 0 }) }),
        " (later deposits from $5). This wallet holds ≈ ",
        ge(l.walletUsd),
        " (",
        l.walletAda.toFixed(1),
        " ADA).",
        !l.canAffordFirstDeposit && " You can connect now and deposit later."
      ] }),
      /* @__PURE__ */ e("div", { class: "note", children: [
        "This site charges a ",
        /* @__PURE__ */ e("b", { children: [
          z,
          "%"
        ] }),
        " builder fee per trade on top of Strike's fees. You approve a cap of ",
        /* @__PURE__ */ e("b", { children: [
          C,
          "%"
        ] }),
        "; it can never charge more."
      ] }),
      c && /* @__PURE__ */ e("div", { class: "consent", children: c }),
      /* @__PURE__ */ e("label", { class: "check", style: { alignItems: "flex-start" }, children: [
        /* @__PURE__ */ e("input", { type: "checkbox", checked: g, onChange: (v) => f(v.target.checked), style: { marginTop: "2px" } }),
        /* @__PURE__ */ e("span", { class: "soft", style: { fontWeight: 400, fontSize: "12px" }, children: [
          "I accept Strike's",
          " ",
          /* @__PURE__ */ e("a", { class: "linkbtn", href: "https://www.strikefinance.org/terms", target: "_blank", rel: "noopener", children: "Terms" }),
          " and confirm I am not in a",
          " ",
          /* @__PURE__ */ e("a", { class: "linkbtn", href: "https://www.strikefinance.org/restricted", target: "_blank", rel: "noopener", children: "restricted region" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ e("div", { class: "steps", children: [
        /* @__PURE__ */ e(ln, { n: 1, state: "done", children: "Wallet connected" }),
        /* @__PURE__ */ e(ln, { n: 2, state: p === "signing" ? "active" : p === "done" ? "done" : "todo", children: "Sign Strike's connect message" }),
        /* @__PURE__ */ e(ln, { n: 3, state: p === "done" ? "done" : "todo", children: "Trading key created for this site" })
      ] }),
      /* @__PURE__ */ e("button", { class: "cta", disabled: !g || p !== "review", onClick: w, children: p === "signing" ? "Waiting for wallet…" : p === "done" ? "Connected" : "Sign & connect" })
    ] }),
    y && /* @__PURE__ */ e("div", { class: "warn", children: y })
  ] }) });
}
function td({
  client: t,
  adaPrice: n,
  isNewAccount: i,
  startBalance: r,
  onClose: s,
  onCredited: a
}) {
  const o = i ? Wt : 5, l = n > 0 ? Math.ceil((i ? Wt * 1.05 : 25) / n / 5) * 5 : 0, [d, p] = m(l ? String(l) : ""), [u, c] = m("amount"), [h, g] = m(null), [f, y] = m(""), [k, _] = m(""), w = Number(d || 0) * n, z = t.net.network === "mainnet" ? "https://cardanoscan.io/transaction/" : "https://preprod.cardanoscan.io/transaction/", C = async () => {
    _(""), c("preparing");
    try {
      if (!t.wallet) throw new Error("Reconnect your wallet to deposit.");
      g(await t.prepareDeposit(Number(d))), c("review");
    } catch (x) {
      _(x instanceof gt ? `Safety check failed: ${x.message}` : x?.message || String(x)), c("amount");
    }
  }, v = async () => {
    if (h) {
      _(""), c("signing");
      try {
        const { txHash: x } = await t.confirmDeposit(h);
        y(x), c("crediting");
      } catch (x) {
        if (x instanceof gr) {
          y(x.txHash), _(x.message), c("registering");
          return;
        }
        const M = String(x?.info || x?.message || x);
        _(x instanceof gt ? `Safety check failed: ${M}` : Xn(x)), c("review");
      }
    }
  }, $ = async () => {
    if (!(!h || !f)) {
      _("");
      try {
        await t.retryDepositRegistration(h.requestId, f), c("crediting");
      } catch (x) {
        _(x?.message || String(x));
      }
    }
  }, [S, B] = m(!1);
  return Z(() => {
    if (u !== "crediting") return;
    const x = setTimeout(() => B(!0), 15 * 6e4), M = setInterval(async () => {
      try {
        const T = await t.account.account();
        Number(T.wallet_balance) > r + Math.max(0.5, (h?.usdValue ?? 0) * 0.5) && (c("done"), a());
      } catch {
      }
    }, 8e3);
    return () => (clearInterval(M), clearTimeout(x));
  }, [u]), /* @__PURE__ */ e("div", { class: "overlay", onClick: (x) => x.target === x.currentTarget && u === "amount" && s(), children: /* @__PURE__ */ e("div", { class: "sheet", role: "dialog", "aria-modal": "true", "aria-label": "Deposit ADA", children: [
    /* @__PURE__ */ e("h3", { children: [
      "Deposit ADA",
      /* @__PURE__ */ e("button", { class: "x", onClick: s, "aria-label": "Close", disabled: u === "signing" || u === "registering", children: "×" })
    ] }),
    (u === "amount" || u === "preparing") && /* @__PURE__ */ e(R, { children: [
      /* @__PURE__ */ e("div", { class: "field", children: [
        /* @__PURE__ */ e("label", { for: "se-dep-amt", children: "Amount" }),
        /* @__PURE__ */ e("input", { id: "se-dep-amt", inputMode: "decimal", value: d, placeholder: "0", onInput: (x) => p(_e(x)) }),
        /* @__PURE__ */ e("span", { class: "unit", children: "ADA" })
      ] }),
      /* @__PURE__ */ e(Ee, { k: "Value", v: /* @__PURE__ */ e("span", { class: "num", children: [
        "≈ ",
        ge(w)
      ] }) }),
      /* @__PURE__ */ e("p", { children: [
        "Your ADA is converted to USD margin on Strike.",
        " ",
        i ? /* @__PURE__ */ e(R, { children: [
          "Strike asks for at least ",
          /* @__PURE__ */ e("b", { children: ge(Wt, { decimals: 0 }) }),
          " on a new account's first deposit; after that the minimum is $5."
        ] }) : /* @__PURE__ */ e(R, { children: "Minimum deposit $5." })
      ] }),
      /* @__PURE__ */ e("button", { class: "cta", disabled: !(w >= o) || u === "preparing", onClick: C, children: u === "preparing" ? /* @__PURE__ */ e(R, { children: [
        /* @__PURE__ */ e(Bt, {}),
        " Building transaction…"
      ] }) : w >= o ? "Review deposit" : `Minimum ${ge(o, { decimals: 0 })}` })
    ] }),
    h && u !== "amount" && u !== "preparing" && /* @__PURE__ */ e(R, { children: [
      /* @__PURE__ */ e("div", { class: "details", children: [
        /* @__PURE__ */ e(Ee, { k: "You send", v: /* @__PURE__ */ e("span", { class: "num", children: [
          Ke(h.destination.lovelace).toLocaleString("en-US"),
          " ADA"
        ] }) }),
        h.forwardingCost > 0n && /* @__PURE__ */ e(Ee, { k: "Strike forwarding", v: /* @__PURE__ */ e("span", { class: "num", children: [
          Ke(h.forwardingCost).toFixed(2),
          " ADA"
        ] }) }),
        /* @__PURE__ */ e(Ee, { k: "To (Strike)", v: /* @__PURE__ */ e("span", { class: "addr", children: Qt(h.destination.address, 14, 8) }), hint: h.destination.address }),
        /* @__PURE__ */ e(Ee, { k: "Credited as", v: /* @__PURE__ */ e("span", { class: "num", children: [
          "≈ ",
          ge(h.usdValue)
        ] }) }),
        /* @__PURE__ */ e(Ee, { k: "Network fee", v: /* @__PURE__ */ e("span", { class: "num", children: [
          Ke(h.networkFee).toFixed(3),
          " ADA"
        ] }) }),
        /* @__PURE__ */ e(Ee, { k: "Confirmations", v: h.confirmationsRequired })
      ] }),
      /* @__PURE__ */ e("div", { class: "note", children: [
        /* @__PURE__ */ e("b", { children: "Checked before signing:" }),
        " exactly ",
        Ke(h.destination.lovelace),
        " ADA leaves your wallet in one output",
        h.forwardingCost > 0n ? ` (${Ke(h.lovelace)} credited plus ${Ke(h.forwardingCost)} for Strike's forwarding)` : "",
        ", no tokens move, the change returns to you, and the deposit is tagged for your Strike account and this request."
      ] }),
      /* @__PURE__ */ e("div", { class: "steps", children: [
        /* @__PURE__ */ e(ln, { n: 1, state: u === "review" ? "todo" : u === "signing" ? "active" : "done", children: "Sign in your wallet" }),
        /* @__PURE__ */ e(ln, { n: 2, state: u === "crediting" ? "active" : u === "done" ? "done" : "todo", children: f ? /* @__PURE__ */ e(R, { children: [
          "Confirming on Cardano · ",
          /* @__PURE__ */ e("a", { class: "linkbtn", target: "_blank", rel: "noopener", href: z + f, children: "view tx" })
        ] }) : "Confirming on Cardano" }),
        /* @__PURE__ */ e(ln, { n: 3, state: u === "done" ? "done" : "todo", children: "Credited to your Strike balance" })
      ] }),
      u === "review" && /* @__PURE__ */ e("button", { class: "cta", onClick: v, children: "Sign deposit" }),
      u === "registering" && /* @__PURE__ */ e("button", { class: "cta", onClick: $, children: "Retry registering with Strike" }),
      u === "crediting" && !S && /* @__PURE__ */ e("p", { children: "This usually takes a few minutes while Strike waits for Cardano confirmations. You can close this; the balance updates on its own." }),
      u === "crediting" && S && /* @__PURE__ */ e("div", { class: "warn", children: [
        /* @__PURE__ */ e("b", { children: "Strike hasn't credited this deposit yet." }),
        " Your transaction is on-chain; crediting is handled by Strike. If it doesn't appear soon, contact Strike support with this transaction:",
        " ",
        /* @__PURE__ */ e("a", { class: "linkbtn", target: "_blank", rel: "noopener", href: z + f, children: [
          f.slice(0, 16),
          "…"
        ] })
      ] }),
      u === "done" && /* @__PURE__ */ e("button", { class: "cta", onClick: s, children: "Start trading" })
    ] }),
    k && /* @__PURE__ */ e("div", { class: "warn", children: k })
  ] }) });
}
function nd({
  client: t,
  available: n,
  adaPrice: i,
  startBalance: r,
  onClose: s,
  onDone: a
}) {
  const [o, l] = m(""), [d, p] = m("amount"), [u, c] = m(null), [h, g] = m(""), f = Number(o) || 0, [y, k] = m({ maxUsd: null, minUsd: null });
  Z(() => {
    t.withdrawLimits().then(k).catch(() => {
    });
  }, [t]);
  const _ = Math.floor((y.maxUsd !== null ? Math.min(y.maxUsd, n) : n) * 100) / 100, w = Math.max(jt, y.minUsd ?? 0), z = i > 0 ? Math.max(0, f - 1) / i : 0, C = async () => {
    g(""), p("quoting");
    try {
      if (!t.wallet) throw new Error("Reconnect your wallet to withdraw.");
      c(await t.prepareWithdrawal(f)), p("review");
    } catch ($) {
      g($ instanceof Pt ? `Safety check failed: ${$.message}` : $?.message || String($)), p("amount");
    }
  }, v = async () => {
    if (u) {
      g(""), p("signing");
      try {
        await t.confirmWithdrawal(u), p("pending");
      } catch ($) {
        const S = String($?.info || $?.message || $);
        g($ instanceof Pt ? `Safety check failed: ${S}` : Xn($)), p("review");
      }
    }
  };
  return Z(() => {
    if (d !== "pending") return;
    const $ = setInterval(async () => {
      try {
        const S = await t.account.account();
        Number(S.wallet_balance) < r - f * 0.5 && (p("done"), a());
      } catch {
      }
    }, 6e3);
    return () => clearInterval($);
  }, [d]), /* @__PURE__ */ e("div", { class: "overlay", onClick: ($) => $.target === $.currentTarget && d === "amount" && s(), children: /* @__PURE__ */ e("div", { class: "sheet", role: "dialog", "aria-modal": "true", "aria-label": "Withdraw", children: [
    /* @__PURE__ */ e("h3", { children: [
      "Withdraw to your wallet",
      /* @__PURE__ */ e("button", { class: "x", onClick: s, "aria-label": "Close", disabled: d === "signing", children: "×" })
    ] }),
    (d === "amount" || d === "quoting") && /* @__PURE__ */ e(R, { children: [
      /* @__PURE__ */ e("p", { children: [
        "Paid out in ADA (or USDM where Strike only supports it) to the wallet you connected. Minimum ",
        ge(w, { decimals: 0 }),
        "."
      ] }),
      /* @__PURE__ */ e("div", { class: "field", children: [
        /* @__PURE__ */ e("label", { for: "se-wd-amt", children: "Amount" }),
        /* @__PURE__ */ e("input", { id: "se-wd-amt", inputMode: "decimal", value: o, placeholder: "0.00", onInput: ($) => l(_e($)) }),
        /* @__PURE__ */ e("button", { class: "unit linkbtn", style: { textDecoration: "none" }, onClick: () => l(String(_)), children: "Max" })
      ] }),
      /* @__PURE__ */ e(Ee, { k: "Available", v: /* @__PURE__ */ e("span", { class: "num", children: ge(n) }) }),
      /* @__PURE__ */ e(Ee, { k: "Fee", v: /* @__PURE__ */ e("span", { class: "num", children: "$1.00" }), hint: "Strike's flat withdrawal fee" }),
      /* @__PURE__ */ e(Ee, { k: "You receive (est.)", v: /* @__PURE__ */ e("span", { class: "num", children: [
        "≈ ",
        z.toFixed(2),
        " ADA"
      ] }) }),
      t.session && /* @__PURE__ */ e(Ee, { k: "To", v: /* @__PURE__ */ e("span", { class: "addr", children: Qt(t.session.address, 12, 6) }), hint: "Strike locks the destination to the wallet you connected with" }),
      /* @__PURE__ */ e("button", { class: "cta", disabled: !(f >= w && f <= _) || d === "quoting", onClick: C, children: d === "quoting" ? /* @__PURE__ */ e(R, { children: [
        /* @__PURE__ */ e(Bt, {}),
        " Getting quote…"
      ] }) : f > _ ? "Exceeds what you can withdraw now" : f >= w ? "Review withdrawal" : `Minimum ${ge(w, { decimals: 0 })}` })
    ] }),
    u && d !== "amount" && d !== "quoting" && /* @__PURE__ */ e(R, { children: [
      /* @__PURE__ */ e("p", { children: [
        "Your wallet will sign Strike's withdrawal message",
        u.funding ? " and a small funding transaction" : "",
        ". The trading key alone cannot withdraw, so every withdrawal needs your signature."
      ] }),
      /* @__PURE__ */ e(
        Ee,
        {
          k: "You receive",
          v: /* @__PURE__ */ e("span", { class: "num", children: u.asset === "USDM" ? `≈ ${ge(Math.max(0, u.usdValue - u.fee))} in USDM` : `≈ ${z.toFixed(2)} ADA` }),
          hint: u.asset === "USDM" ? "Strike pays Cardano withdrawals out in USDM (a USD stablecoin) on this network" : "Paid out in ADA at Strike's rate"
        }
      ),
      /* @__PURE__ */ e("div", { class: "consent", children: u.messageToSign }),
      u.funding && /* @__PURE__ */ e(R, { children: [
        /* @__PURE__ */ e("div", { class: "details", children: [
          /* @__PURE__ */ e(Ee, { k: "Validator min-UTxO", v: /* @__PURE__ */ e("span", { class: "num", children: [
            Ke(u.funding.lovelace).toFixed(2),
            " ADA"
          ] }), hint: "Strike's Cardano withdrawals ask you to fund the validator's minimum UTxO before it pays out" }),
          /* @__PURE__ */ e(Ee, { k: "Network fee", v: /* @__PURE__ */ e("span", { class: "num", children: [
            Ke(u.funding.networkFee).toFixed(3),
            " ADA"
          ] }) }),
          /* @__PURE__ */ e(Ee, { k: "To (Strike validator)", v: /* @__PURE__ */ e("span", { class: "addr", children: Qt(u.funding.validatorAddress, 14, 8) }), hint: u.funding.validatorAddress })
        ] }),
        /* @__PURE__ */ e("div", { class: "note", children: [
          /* @__PURE__ */ e("b", { children: "Checked before signing:" }),
          " the funding transaction only pays ",
          Ke(u.funding.lovelace).toFixed(2),
          " ADA to Strike's quoted validator, moves no tokens and contains nothing else. Your wallet will ask twice: the message, then the transaction."
        ] })
      ] }),
      /* @__PURE__ */ e("div", { class: "steps", children: [
        /* @__PURE__ */ e(ln, { n: 1, state: d === "review" ? "todo" : d === "signing" ? "active" : "done", children: u.funding ? "Sign the message and funding transaction" : "Sign in your wallet" }),
        /* @__PURE__ */ e(ln, { n: 2, state: d === "pending" ? "active" : d === "done" ? "done" : "todo", children: "Strike processes the withdrawal" }),
        /* @__PURE__ */ e(ln, { n: 3, state: d === "done" ? "done" : "todo", children: "ADA arrives in your wallet" })
      ] }),
      d === "review" && /* @__PURE__ */ e("button", { class: "cta", onClick: v, children: "Sign withdrawal" }),
      d === "review" && /* @__PURE__ */ e("button", { class: "linkbtn", style: { justifySelf: "center", fontSize: "12px" }, onClick: () => (c(null), g(""), p("amount")), children: "Change amount (gets a fresh quote)" }),
      d === "pending" && /* @__PURE__ */ e("p", { children: "Submitted. Large withdrawals can be queued for review by Strike." }),
      d === "done" && /* @__PURE__ */ e("button", { class: "cta", onClick: s, children: "Done" })
    ] }),
    h && /* @__PURE__ */ e("div", { class: "warn", children: h })
  ] }) });
}
function id({
  positions: t,
  marks: n,
  ticks: i,
  busy: r,
  flash: s,
  note: a,
  confirming: o,
  onAsk: l,
  onClose: d,
  closeText: p
}) {
  return t.length ? /* @__PURE__ */ e(R, { children: t.map((u) => {
    const c = Number(u.size), h = c > 0, g = u.symbol.split("-")[0], f = i[u.symbol], y = n[u.symbol] ?? Number(u.entry_price), k = Number(u.upnl), _ = Math.abs(c) * Number(u.entry_price), w = _ > 0 && u.leverage ? _ / u.leverage : 0, z = w > 0 ? k / w * 100 : 0, C = Number(u.liquidation_price), v = `pos:${u.id}`;
    return /* @__PURE__ */ e("div", { class: `row${s === u.symbol ? " flash" : ""}`, children: [
      /* @__PURE__ */ e("div", { class: "row-h", children: [
        /* @__PURE__ */ e("span", { class: `badge ${h ? "long" : "short"}`, children: h ? "Long" : "Short" }),
        /* @__PURE__ */ e("span", { class: "pos-t", children: [
          /* @__PURE__ */ e("span", { class: "num", children: Tn(Math.abs(c)) }),
          " ",
          g,
          " ",
          /* @__PURE__ */ e("span", { class: "muted", children: [
            "(~",
            ge(Math.abs(c) * y),
            ")",
            Number(u.leverage) > 0 ? ` · ${u.leverage}x` : ""
          ] })
        ] }),
        /* @__PURE__ */ e("button", { class: "mini", disabled: r.has(v), "aria-expanded": o === u.id, onClick: () => l(o === u.id ? null : u), children: r.has(v) ? /* @__PURE__ */ e(Bt, {}) : "Close" })
      ] }),
      a && a.id === u.id && /* @__PURE__ */ e("div", { class: `ticket-msg ${a.kind}`, role: "status", children: a.text }),
      o === u.id && !r.has(v) && /* @__PURE__ */ e(
        Qi,
        {
          actions: /* @__PURE__ */ e(R, { children: [
            /* @__PURE__ */ e("button", { class: "mini", onClick: () => l(null), children: "Keep" }),
            /* @__PURE__ */ e("button", { class: "mini danger", onClick: () => d(u), children: "Close at market" })
          ] }),
          children: p(u)
        }
      ),
      /* @__PURE__ */ e("div", { class: "row-g pos-g", children: [
        /* @__PURE__ */ e("div", { class: "wide", children: [
          /* @__PURE__ */ e("div", { class: "k", children: "Profit/Loss" }),
          /* @__PURE__ */ e("div", { class: `num ${k >= 0 ? "pos" : "neg"}`, children: [
            ge(k, { sign: !0 }),
            " · ",
            z >= 0 ? "+" : "",
            z.toFixed(1),
            "% ",
            /* @__PURE__ */ e("span", { class: "of", children: "of margin" })
          ] })
        ] }),
        /* @__PURE__ */ e("div", { children: [
          /* @__PURE__ */ e("div", { class: "k", children: "Entry" }),
          /* @__PURE__ */ e("div", { class: "num", children: we(Number(u.entry_price), f) })
        ] }),
        /* @__PURE__ */ e("div", { children: [
          /* @__PURE__ */ e("div", { class: "k", children: "Mark" }),
          /* @__PURE__ */ e("div", { class: "num", children: we(y, f) })
        ] }),
        /* @__PURE__ */ e("div", { children: [
          /* @__PURE__ */ e("div", { class: "k", children: "Liq. price" }),
          /* @__PURE__ */ e("div", { class: "num", children: C > 0 ? /* @__PURE__ */ e(R, { children: [
            we(C, f),
            " ",
            /* @__PURE__ */ e("span", { class: "of", children: [
              "(",
              Pi(y, C),
              " away)"
            ] })
          ] }) : "—" })
        ] }),
        /* @__PURE__ */ e("div", { children: [
          /* @__PURE__ */ e("div", { class: "k", children: "Margin" }),
          /* @__PURE__ */ e("div", { class: "num", children: [
            w > 0 ? `${ge(w)} · ` : "",
            /* @__PURE__ */ e("span", { class: "of", children: u.margin_mode === "cross" ? "Cross" : "Isolated" })
          ] })
        ] })
      ] })
    ] }, u.id);
  }) }) : /* @__PURE__ */ e("div", { class: "empty", children: "No open positions yet. Open a Long or Short above; it will appear here with live profit/loss." });
}
function rd(t) {
  return t.reduce_only ? t.side === "buy" ? "Buy: closes (part of) a Short" : "Sell: closes (part of) a Long" : t.side === "buy" ? "Buy: opens or adds to a Long (or reduces a Short)" : "Sell: opens or adds to a Short (or reduces a Long)";
}
function sd({
  orders: t,
  ticks: n,
  busy: i,
  onCancel: r
}) {
  return t.length ? /* @__PURE__ */ e(R, { children: t.map((s) => /* @__PURE__ */ e("div", { class: "row", children: [
    /* @__PURE__ */ e("div", { class: "row-h", children: [
      s.symbol,
      /* @__PURE__ */ e("span", { class: `badge ${s.side === "buy" ? "long" : "short"}`, title: rd(s), children: [
        s.side === "buy" ? "Buy" : "Sell",
        " · ",
        String(s.type ?? "").replace(/_/g, " ")
      ] }),
      s.reduce_only && /* @__PURE__ */ e("span", { class: "t muted", children: [
        "closes ",
        s.side === "buy" ? "Short" : "Long"
      ] }),
      /* @__PURE__ */ e("button", { class: "mini", disabled: i.has(`ord:${s.id}`), onClick: () => r(s), children: i.has(`ord:${s.id}`) ? /* @__PURE__ */ e(Bt, {}) : "Cancel" })
    ] }),
    /* @__PURE__ */ e("div", { class: "row-g", children: [
      /* @__PURE__ */ e("div", { children: [
        /* @__PURE__ */ e("div", { class: "k", children: "Price" }),
        /* @__PURE__ */ e("div", { class: "num", children: Number(s.stop_price) > 0 ? `Trigger ${we(Number(s.stop_price), n[s.symbol])}${Number(s.price) > 0 ? ` · ${we(Number(s.price), n[s.symbol])}` : ""}` : Number(s.price) > 0 ? we(Number(s.price), n[s.symbol]) : "Market" })
      ] }),
      /* @__PURE__ */ e("div", { children: [
        /* @__PURE__ */ e("div", { class: "k", children: "Size" }),
        /* @__PURE__ */ e("div", { class: "num", children: nn(Number(s.size)) })
      ] }),
      /* @__PURE__ */ e("div", { children: [
        /* @__PURE__ */ e("div", { class: "k", children: "Filled" }),
        /* @__PURE__ */ e("div", { class: "num", children: nn(Number(s.filled)) })
      ] })
    ] })
  ] }, s.id)) }) : /* @__PURE__ */ e("div", { class: "empty", children: "Limit and stop orders that are waiting to fill show here." });
}
const Io = { "15m": 9e5, "1h": 36e5, "4h": 144e5, "1d": 864e5 }, ad = { "1m": 6e4, "5m": 3e5, ...Io, "1w": 6048e5 }, Ur = 58, od = (t) => t.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 1 });
function br({
  client: t,
  symbol: n,
  interval: i,
  tick: r,
  live: s,
  height: a
}) {
  const [o, l] = m("mark"), [d, p] = m(null), [u, c] = m(!1), [h, g] = m(null), [f, y] = m(352), [k, _] = m(0), w = De(null);
  ti(() => {
    const G = w.current;
    if (!G || typeof ResizeObserver > "u") return;
    const X = new ResizeObserver(() => G.clientWidth && y(G.clientWidth));
    return X.observe(G), y(G.clientWidth || 352), () => X.disconnect();
  }, []), Z(() => {
    let G = !0;
    p(null), c(!1), g(null);
    const X = () => t.market.klines(n, i, 120, o).then((Ce) => G && (p(Ce), c(!Ce.length))).catch(() => G && c(!0));
    X();
    const fe = setInterval(() => !At() && X(), 6e4);
    return () => {
      G = !1, clearInterval(fe);
    };
  }, [t, n, i, o, k]);
  const z = s[o];
  Z(() => {
    z > 0 && p((G) => {
      if (!G?.length) return G;
      const X = G[G.length - 1], fe = ad[i], Ce = Date.now();
      if (Ce >= X.openTime + fe) {
        const Je = X.openTime + Math.floor((Ce - X.openTime) / fe) * fe;
        return [...G.slice(-199), { openTime: Je, open: X.close, high: Math.max(X.close, z), low: Math.min(X.close, z), close: z, volume: 0 }];
      }
      return [...G.slice(0, -1), { ...X, close: z, high: Math.max(X.high, z), low: Math.min(X.low, z) }];
    });
  }, [z, i]);
  const C = /* @__PURE__ */ e("div", { class: "ptype", role: "radiogroup", "aria-label": "Price type", children: ["mark", "last", "index"].map((G) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": o === G, class: o === G ? "on" : "", onClick: () => l(G), children: G === "mark" ? "Mark" : G === "last" ? "Last" : "Index" }, G)) }), v = a ?? (f >= 480 ? 250 : 210);
  if (!d?.length)
    return /* @__PURE__ */ e("div", { class: "chart", ref: w, style: { height: `${v}px` }, children: [
      C,
      /* @__PURE__ */ e("div", { class: "chart-msg", children: u ? /* @__PURE__ */ e(R, { children: [
        "Chart data isn't available right now.",
        " ",
        /* @__PURE__ */ e("button", { class: "linkbtn", onClick: () => _(k + 1), children: "Retry" })
      ] }) : "Loading chart…" })
    ] });
  const $ = Math.max(60, f - Ur), S = Math.max(10, Math.min(d.length, Math.floor($ / 6.5))), B = d.slice(-S), x = $ / S, M = 30, T = v * 0.66, P = M + T + 6, ie = v - P - 18;
  let F = Math.min(...B.map((G) => G.low)), E = Math.max(...B.map((G) => G.high));
  z > 0 && (F = Math.min(F, z), E = Math.max(E, z));
  const D = (E - F) * 0.06 || E * 0.01 || 1;
  F -= D, E += D;
  const W = (G) => M + (E - G) / (E - F) * T, A = Math.max(...B.map((G) => G.volume), 0) || 1, N = Math.max(1, x * 0.64), O = [0.1, 0.37, 0.63, 0.9].map((G) => E - (E - F) * G), J = h ? B[h.i] : null, ne = h ? E - (h.y - M) / T * (E - F) : 0, Se = [Math.floor(S * 0.15), Math.floor(S * 0.5), Math.floor(S * 0.85)], Ae = i === "1d" || i === "4h" || i === "1w", pt = (G) => {
    const X = G.currentTarget.getBoundingClientRect(), fe = G.clientX - X.left, Ce = G.clientY - X.top;
    if (fe < 0 || fe > $ || Ce < M || Ce > M + T) return g(null);
    g({ i: Math.max(0, Math.min(S - 1, Math.floor(fe / x))), y: Ce });
  }, ve = B.length > 1 && E - F - 2 * D <= (r ?? 0) / 2;
  return /* @__PURE__ */ e("div", { class: "chart", ref: w, style: { height: `${v}px`, position: "relative" }, children: [
    C,
    ve && /* @__PURE__ */ e("div", { class: "chart-note", children: o === "last" ? "No trades in this period, so the last-traded price hasn't moved. Mark follows the market." : "The price hasn't moved in this period." }),
    J && /* @__PURE__ */ e("div", { class: "ohlc num", "aria-live": "polite", children: [
      /* @__PURE__ */ e("span", { class: "muted", children: Jn(J.openTime) }),
      " O ",
      /* @__PURE__ */ e("b", { children: we(J.open, r) }),
      " H ",
      /* @__PURE__ */ e("b", { children: we(J.high, r) }),
      " L ",
      /* @__PURE__ */ e("b", { children: we(J.low, r) }),
      " C",
      " ",
      /* @__PURE__ */ e("b", { class: J.close >= J.open ? "pos" : "neg", children: we(J.close, r) }),
      J.volume > 0 && /* @__PURE__ */ e(R, { children: [
        " V ",
        /* @__PURE__ */ e("b", { children: od(J.volume) })
      ] })
    ] }),
    /* @__PURE__ */ e("svg", { width: f, height: v, role: "img", "aria-label": `${n} ${i} candlestick chart`, onPointerMove: pt, onPointerDown: pt, onPointerLeave: () => g(null), children: [
      O.map((G) => /* @__PURE__ */ e("g", { children: [
        /* @__PURE__ */ e("line", { x1: 0, x2: $, y1: W(G), y2: W(G), class: "gl" }),
        !(z > 0 && Math.abs(W(G) - W(z)) < 14) && !(h && Math.abs(W(G) - h.y) < 14) && /* @__PURE__ */ e("text", { x: f - 4, y: W(G) + 3.5, class: "ax", "text-anchor": "end", children: we(G, r) })
      ] }, G)),
      B.map((G, X) => {
        const fe = X * x + x / 2, Je = G.close >= G.open ? "cu" : "cd", nt = G.volume / A * ie;
        return /* @__PURE__ */ e("g", { class: Je, children: [
          nt > 0 && /* @__PURE__ */ e("rect", { x: fe - N / 2, y: P + ie - nt, width: N, height: nt, class: "vol" }),
          /* @__PURE__ */ e("line", { x1: fe, x2: fe, y1: W(G.high), y2: W(G.low) }),
          /* @__PURE__ */ e("rect", { x: fe - N / 2, y: W(Math.max(G.open, G.close)), width: N, height: Math.max(1, Math.abs(W(G.open) - W(G.close))) })
        ] }, G.openTime);
      }),
      Se.map(
        (G) => B[G] ? (
          // Edge labels anchor inward so they never clip at narrow widths.
          /* @__PURE__ */ e("text", { x: G * x + x / 2 < 40 ? 2 : G * x + x / 2, y: v - 5, class: "ax", "text-anchor": G * x + x / 2 < 40 ? "start" : "middle", children: Jn(B[G].openTime, Ae) }, G)
        ) : null
      ),
      z > 0 && /* @__PURE__ */ e("g", { class: z >= B[B.length - 1].open ? "cu" : "cd", children: [
        /* @__PURE__ */ e("line", { x1: 0, x2: $, y1: W(z), y2: W(z), class: "now" }),
        /* @__PURE__ */ e("rect", { x: $ + 2, y: W(z) - 8, width: Ur - 3, height: 16, rx: 2 }),
        /* @__PURE__ */ e("text", { x: f - 4, y: W(z) + 3.5, class: "tag", "text-anchor": "end", children: we(z, r) })
      ] }),
      h && J && /* @__PURE__ */ e("g", { class: "xh", children: [
        /* @__PURE__ */ e("line", { x1: h.i * x + x / 2, x2: h.i * x + x / 2, y1: M, y2: P + ie }),
        /* @__PURE__ */ e("line", { x1: 0, x2: $, y1: h.y, y2: h.y }),
        /* @__PURE__ */ e("rect", { x: $ + 2, y: h.y - 8, width: Ur - 3, height: 16, rx: 2 }),
        /* @__PURE__ */ e("text", { x: f - 4, y: h.y + 3.5, "text-anchor": "end", children: we(ne, r) })
      ] })
    ] })
  ] });
}
function ld({ book: t, depth: n, tick: i, base: r, hint: s, onPick: a }) {
  if (!t) return /* @__PURE__ */ e("div", { class: "book", children: /* @__PURE__ */ e("div", { class: "chart-msg", children: t === null ? "Order book unavailable right now…" : "Loading order book…" }) });
  const o = (c) => {
    let h = 0;
    return c.slice(0, n).map(([g, f]) => [g, f, h += f]);
  }, l = o(t.asks), d = o(t.bids), p = Math.max(l[l.length - 1]?.[2] ?? 0, d[d.length - 1]?.[2] ?? 0) || 1, u = (c) => ([h, g, f]) => /* @__PURE__ */ e("button", { class: `lvl ${c}`, onClick: () => a(h), title: s, children: [
    /* @__PURE__ */ e("span", { class: "bar", style: { width: `${f / p * 100}%` } }),
    /* @__PURE__ */ e("span", { class: "num px", children: we(h, i) }),
    /* @__PURE__ */ e("span", { class: "num", children: nn(g) }),
    /* @__PURE__ */ e("span", { class: "num", children: nn(f) })
  ] }, h);
  return /* @__PURE__ */ e("div", { class: "book", role: "group", "aria-label": "Order book", children: [
    /* @__PURE__ */ e("div", { class: "book-cap", children: [
      /* @__PURE__ */ e("span", { children: s }),
      /* @__PURE__ */ e("span", { children: [
        /* @__PURE__ */ e("span", { class: "neg", children: "Red" }),
        " = sellers · ",
        /* @__PURE__ */ e("span", { class: "pos", children: "Green" }),
        " = buyers"
      ] })
    ] }),
    /* @__PURE__ */ e("div", { class: "lvl hd", children: [
      /* @__PURE__ */ e("span", { children: "Price" }),
      /* @__PURE__ */ e("span", { children: [
        "Size (",
        r,
        ")"
      ] }),
      /* @__PURE__ */ e("span", { children: "Total" })
    ] }),
    l.length ? [...l].reverse().map(u("ask")) : /* @__PURE__ */ e("div", { class: "book-empty", children: "No sellers right now" }),
    Number.isFinite(t.spread) ? /* @__PURE__ */ e("div", { class: "spread num", children: [
      /* @__PURE__ */ e("span", { children: [
        "Spread ",
        we(t.spread, i),
        " (",
        (t.spread / t.mid * 100).toFixed(3),
        "%)"
      ] }),
      /* @__PURE__ */ e("span", { children: [
        "Mid ",
        we(t.mid, i ? Number((i / 10).toPrecision(1)) : void 0)
      ] })
    ] }) : /* @__PURE__ */ e("div", { class: "spread", children: /* @__PURE__ */ e("span", { children: [
      "Only ",
      t.asks.length ? "sellers" : "buyers",
      " on this market right now (thin market)"
    ] }) }),
    d.length ? d.map(u("bid")) : /* @__PURE__ */ e("div", { class: "book-empty", children: "No buyers right now" })
  ] });
}
const Jt = (t) => t == null || t === "" || !Number.isFinite(Number(t)) ? null : Number(t), on = (t, n = !1) => t === null ? "—" : ge(t, { sign: n }), Ti = (t) => t === null || t === 0 ? "" : t > 0 ? "pos" : "neg", Hr = (t) => t === null ? "—" : `${(t * 100).toFixed(3)}%`;
function Ht({ k: t, v: n, cls: i, hint: r }) {
  return /* @__PURE__ */ e("div", { children: [
    /* @__PURE__ */ e("div", { class: `k${r ? " dotted" : ""}`, title: r, children: t }),
    /* @__PURE__ */ e("div", { class: `num ${i ?? ""}`, children: n })
  ] });
}
function cd(t) {
  const n = /* @__PURE__ */ new Set();
  return t.filter((i) => n.has(i.id) ? !1 : (n.add(i.id), !0));
}
function dd({ twaps: t, busy: n, onCancel: i }) {
  return t.length ? /* @__PURE__ */ e(R, { children: t.map((r) => {
    const s = r.totalSize ?? 0, a = s > 0 && r.filledSize !== null ? Math.min(1, r.filledSize / s) : 0, o = r.createdAt && r.durationSec ? r.createdAt + r.durationSec * 1e3 : 0, l = o ? Math.max(0, o - Date.now()) : 0, d = r.status === "cancelling";
    return /* @__PURE__ */ e("div", { class: "row", children: [
      /* @__PURE__ */ e("div", { class: "row-h", children: [
        r.symbol || "—",
        /* @__PURE__ */ e("span", { class: `badge ${r.side === "buy" ? "long" : "short"}`, children: [
          r.side === "buy" ? "Buy" : "Sell",
          " · TWAP"
        ] }),
        /* @__PURE__ */ e("button", { class: "mini", disabled: d || n.has(`twap:${r.id}`), onClick: () => i(r), children: n.has(`twap:${r.id}`) ? /* @__PURE__ */ e(Bt, {}) : d ? "Cancelling" : "Cancel" })
      ] }),
      /* @__PURE__ */ e("div", { class: "prog", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(a * 100), children: /* @__PURE__ */ e("span", { style: { width: `${a * 100}%` } }) }),
      /* @__PURE__ */ e("div", { class: "row-g", children: [
        /* @__PURE__ */ e(Ht, { k: "Filled", v: `${nn(r.filledSize)} / ${nn(r.totalSize)}` }),
        /* @__PURE__ */ e(Ht, { k: "Slices", v: r.slicesFired === null ? "—" : `${r.slicesFired}${r.nominalSlices ? ` / ${r.nominalSlices}` : ""}` }),
        /* @__PURE__ */ e(Ht, { k: "Time left", v: o ? l > 0 ? `${Math.ceil(l / 6e4)} min` : "ending" : "—" })
      ] }),
      r.lastError && /* @__PURE__ */ e("div", { class: "t muted", children: r.lastError })
    ] }, r.id);
  }) }) : /* @__PURE__ */ e("div", { class: "empty", children: "No active TWAP orders" });
}
const pd = [
  ["fills", "Fills"],
  ["funding", "Funding"],
  ["closed", "Closed"],
  ["orders", "Orders"]
];
function ud({ client: t, ticks: n }) {
  const [i, r] = m("fills"), [s, a] = m({}), o = s[i], l = async (d, p) => {
    const u = s[d], c = p ? u?.next ?? null : null;
    a((h) => ({ ...h, [d]: { ...h[d] ?? { items: [], next: null, loaded: !1 }, loading: !0, error: "" } }));
    try {
      const h = t.account, g = d === "fills" ? await h.fillsPage({ fromId: c }) : d === "funding" ? await h.fundingPage({ fromId: c }) : d === "closed" ? await h.closedPositionsPage({ endTime: c }) : await h.orderHistoryPage({ fromOrderId: c });
      a((f) => ({ ...f, [d]: { items: cd([...p ? f[d]?.items ?? [] : [], ...g.items]), next: g.next, loading: !1, error: "", loaded: !0 } }));
    } catch (h) {
      a((g) => ({ ...g, [d]: { items: g[d]?.items ?? [], next: g[d]?.next ?? null, loading: !1, loaded: !0, error: h?.message || "Couldn't load history" } }));
    }
  };
  return Z(() => {
    s[i] || l(i, !1);
  }, [i]), /* @__PURE__ */ e(R, { children: [
    /* @__PURE__ */ e("div", { class: "chips", role: "tablist", "aria-label": "History", children: pd.map(([d, p]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": i === d, class: i === d ? "on" : "", onClick: () => r(d), children: p }, d)) }),
    o?.error && /* @__PURE__ */ e("div", { class: "warn", children: [
      "Strike: ",
      o.error
    ] }),
    o?.loaded && !o.items.length && !o.error && /* @__PURE__ */ e("div", { class: "empty", children: i === "fills" || i === "orders" ? "Your trades will appear here after your first order." : "Nothing here yet" }),
    o?.items.map(
      (d) => i === "fills" ? /* @__PURE__ */ e(hd, { f: d, tick: n[d.symbol] }, d.id) : i === "funding" ? /* @__PURE__ */ e(md, { f: d }, d.id) : i === "closed" ? /* @__PURE__ */ e(gd, { p: d }, d.id) : /* @__PURE__ */ e(fd, { o: d, tick: n[d.symbol] }, d.id)
    ),
    (!o || o.loading) && /* @__PURE__ */ e("div", { class: "empty", children: /* @__PURE__ */ e(Bt, {}) }),
    o && !o.loading && o.next !== null && /* @__PURE__ */ e("button", { class: "mini more", onClick: () => l(i, !0), children: "Load more" })
  ] });
}
function xr({ sym: t, badge: n, long: i, right: r, rightCls: s, sub: a }) {
  return /* @__PURE__ */ e("div", { class: "hrow", children: [
    /* @__PURE__ */ e("div", { class: "row-h", children: [
      t || "—",
      n && /* @__PURE__ */ e("span", { class: `badge ${i === null ? "" : i ? "long" : "short"}`, children: n }),
      /* @__PURE__ */ e("span", { class: `num r ${s ?? ""}`, children: r })
    ] }),
    /* @__PURE__ */ e("div", { class: "t muted num", children: a })
  ] });
}
function hd({ f: t, tick: n }) {
  const i = t.realizedPnl;
  return /* @__PURE__ */ e(
    xr,
    {
      sym: t.symbol,
      badge: as(t.side, i),
      long: t.side ? t.side === "buy" : null,
      right: `${nn(t.size)} @ ${t.price === null ? "—" : we(t.price, n)}`,
      sub: [`Fee ${on(t.fee)}`, i ? `PnL ${on(i, !0)}` : "", t.autoClose ? t.autoClose.replace(/_/g, " ") : "", Jn(t.time)].filter(Boolean).join(" · ")
    }
  );
}
function md({ f: t }) {
  const n = t.positionSide.toLowerCase();
  return /* @__PURE__ */ e(
    xr,
    {
      sym: t.symbol,
      badge: t.positionSide,
      long: n === "long" ? !0 : n === "short" ? !1 : null,
      right: on(t.amount, !0),
      rightCls: Ti(t.amount),
      sub: `Rate ${t.rate === null ? "—" : `${(t.rate * 100).toFixed(4)}%`} · Size ${nn(t.positionSize)} · ${Jn(t.time)}`
    }
  );
}
function gd({ p: t }) {
  const n = t.openTime && t.closeTime ? Math.max(0, Math.round((t.closeTime - t.openTime) / 6e4)) : null, i = n === null ? "" : n >= 1440 ? `${Math.floor(n / 1440)}d ${Math.floor(n % 1440 / 60)}h` : n >= 60 ? `${Math.floor(n / 60)}h ${n % 60}m` : `${n}m`;
  return /* @__PURE__ */ e(
    xr,
    {
      sym: t.symbol,
      badge: t.marginMode ? t.marginMode[0].toUpperCase() + t.marginMode.slice(1) : "",
      long: null,
      right: t.realizedPnl === null ? "PnL —" : on(t.realizedPnl, !0),
      rightCls: Ti(t.realizedPnl),
      sub: `Closed ${Jn(t.closeTime)}${i ? ` · held ${i}` : ""}`
    }
  );
}
function fd({ o: t, tick: n }) {
  const i = Jt(t.price), r = Jt(t.stop_price);
  return /* @__PURE__ */ e(
    xr,
    {
      sym: t.symbol,
      badge: `${t.side === "buy" ? "Buy" : "Sell"} · ${String(t.type ?? "").replace(/_/g, " ")}`,
      long: t.side === "buy",
      right: String(t.status ?? "—"),
      rightCls: t.status === "rejected" ? "neg" : "",
      sub: [
        t.reduce_only ? `closes ${t.side === "buy" ? "Short" : "Long"}` : "",
        `${nn(Jt(t.filled))} / ${nn(Jt(t.size))}`,
        i ? `@ ${we(i, n)}` : r ? `trigger ${we(r, n)}` : "market",
        Jn(Number(t.create_timestamp))
      ].filter(Boolean).join(" · ")
    }
  );
}
function bd(t) {
  const n = Jt(t?.maintenance_margin) ?? 0, i = Jt(t?.margin_balance);
  if (i === null) return { ratio: null, level: "ok", label: "" };
  if (i <= 0) return n > 0 ? { ratio: null, level: "danger", label: "At risk" } : { ratio: 0, level: "ok", label: "Healthy" };
  const r = n / i;
  return { ratio: r, level: r >= 0.9 ? "danger" : r >= 0.7 ? "warn" : "ok", label: r >= 0.9 ? "Reduce-only" : r >= 0.7 ? "Margin call" : "Healthy" };
}
function xd({ client: t, account: n }) {
  const [i, r] = m(null);
  Z(() => {
    let o = !0;
    const l = () => t.account.portfolio().then((p) => o && r(p)).catch(() => {
    });
    l();
    const d = setInterval(() => !At() && l(), 6e4);
    return () => {
      o = !1, clearInterval(d);
    };
  }, [t]);
  const s = bd(n), a = Jt(n?.unrealized_pnl);
  return /* @__PURE__ */ e(R, { children: [
    /* @__PURE__ */ e("div", { class: "risk", children: [
      /* @__PURE__ */ e("span", { class: "k dotted", title: "Maintenance margin ÷ equity. Strike issues a margin call at 70%, restricts to reduce-only at 90% and liquidates at 100%.", children: "Margin ratio" }),
      /* @__PURE__ */ e("span", { class: "meter", children: /* @__PURE__ */ e("span", { class: `lv-${s.level}`, style: { width: `${Math.min(100, (s.ratio ?? (s.level === "danger" ? 1 : 0)) * 100)}%` } }) }),
      /* @__PURE__ */ e("span", { class: `num ${s.level === "ok" ? "" : "neg"}`, children: s.ratio === null ? "—" : `${(s.ratio * 100).toFixed(1)}%` }),
      /* @__PURE__ */ e("span", { class: `badge ${s.level === "ok" ? "long" : "short"}`, children: s.label || "—" })
    ] }),
    /* @__PURE__ */ e("div", { class: "row-g mgrid", children: [
      /* @__PURE__ */ e(Ht, { k: "Equity", v: on(Jt(n?.margin_balance)) }),
      /* @__PURE__ */ e(Ht, { k: "Available", v: on(Jt(n?.available_balance)) }),
      /* @__PURE__ */ e(Ht, { k: "Balance", v: on(Jt(n?.wallet_balance)) }),
      /* @__PURE__ */ e(Ht, { k: "Unrealized PnL", v: on(a, !0), cls: Ti(a) }),
      /* @__PURE__ */ e(Ht, { k: "All-time PnL", v: on(i?.realizedPnl ?? null, !0), cls: Ti(i?.realizedPnl ?? null), hint: "Realized PnL since the account opened (Strike portfolio)" }),
      /* @__PURE__ */ e(Ht, { k: "Volume", v: i?.volume == null ? "—" : ge(i.volume, { decimals: 0 }) }),
      /* @__PURE__ */ e(
        Ht,
        {
          k: "Fee tier",
          v: i?.feeTier == null ? "—" : `${i.feeTier} · ${Hr(i.takerRate)}`,
          hint: i?.feeTier == null ? void 0 : `Strike fee tier ${i.feeTier}: taker ${Hr(i.takerRate)}, maker ${Hr(i.makerRate)}`
        }
      ),
      /* @__PURE__ */ e(Ht, { k: "Fee discount", v: i?.referralDiscountPct == null ? "—" : `${i.referralDiscountPct}%`, hint: "Referral fee discount on Strike's trading fees" })
    ] })
  ] });
}
function vd({ client: t }) {
  const [n, i] = m(null);
  return Z(() => {
    let r = !0;
    return t.market.vaults(20).then((s) => r && i(s.filter((a) => a.status === "active" || !a.status).sort((a, o) => (o.tvl ?? 0) - (a.tvl ?? 0)).slice(0, 4))).catch(() => r && i("err")), () => {
      r = !1;
    };
  }, [t]), /* @__PURE__ */ e("div", { class: "vaults", children: [
    /* @__PURE__ */ e("div", { class: "row-h", children: [
      "Strike vaults",
      /* @__PURE__ */ e("a", { class: "linkbtn r", href: t.appUrl("/vaults"), target: "_blank", rel: "noopener noreferrer", children: "All vaults ↗" })
    ] }),
    n === null && /* @__PURE__ */ e("div", { class: "empty", children: /* @__PURE__ */ e(Bt, {}) }),
    n === "err" && /* @__PURE__ */ e("div", { class: "t muted", children: "Vaults aren't available right now." }),
    Array.isArray(n) && n.map((r) => /* @__PURE__ */ e("a", { class: "vault", href: t.vaultUrl(r.id), target: "_blank", rel: "noopener noreferrer", title: `Open ${r.name} on Strike`, children: [
      /* @__PURE__ */ e("span", { class: "vn", children: r.name }),
      /* @__PURE__ */ e("span", { class: "num", children: r.tvl === null ? "—" : `$${r.tvl.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 1 })}` }),
      /* @__PURE__ */ e("span", { class: `num ${Ti(r.aprPct)}`, children: r.aprPct === null ? "—" : `${Xr(r.aprPct, 1)} APR` })
    ] }, r.id)),
    Array.isArray(n) && /* @__PURE__ */ e("div", { class: "t muted", children: "Read-only. Deposits into vaults happen in Strike's app." })
  ] });
}
const kd = [1, 2, 3, 5, 10, 15, 20, 25, 40, 50, 75, 100], Fa = "strike-everywhere:wallet", Da = [
  ["stop", "Stop Market", "Market order once the mark price reaches a trigger"],
  ["stop_limit", "Stop Limit", "Limit order once the mark price reaches a trigger"],
  ["twap", "TWAP", "Split into timed market slices over 5 min – 24 h"]
], yd = [5, 15, 60, 240], wd = 8, Oa = 5e-3, _d = 0.02;
function Sd(t) {
  try {
    return sessionStorage.getItem(t);
  } catch {
    return null;
  }
}
function Cd(t, n) {
  try {
    sessionStorage.setItem(t, n);
  } catch {
  }
}
const ui = Tn, Wr = (t) => t < 60 ? `${t} min` : t % 60 ? `${Math.floor(t / 60)} h ${t % 60} min` : `${t / 60} h`, Xe = (t, n = 0) => Number.isFinite(Number(t)) && t !== null && t !== "" ? Number(t) : n;
function $d({ config: t }) {
  const n = en(() => new Li(t), []), [i, r] = m([]), [s, a] = m(t.market), [o, l] = m({}), [d, p] = m([]), [u, c] = m(5e-4), [h, g] = m(""), [f, y] = m("price"), [k, _] = m("1h"), [w, z] = m(void 0), [C, v] = m(n.session), [$, S] = m(null), [B, x] = m([]), [M, T] = m([]), [P, ie] = m([]), [F, E] = m(t.side ?? "buy"), [D, W] = m("market"), [A, N] = m(""), [O, J] = m(""), [ne, Se] = m(""), [Ae, pt] = m(Math.min(3, t.maxLeverage)), [ve, G] = m(!1), [X, fe] = m(!1), [Ce, Je] = m(""), [nt, ft] = m(""), [ut, $e] = m(60), [Lt, dn] = m(""), [Qe, St] = m(""), [I, q] = m(!1), [re, ce] = m(""), se = De(null), [oe, U] = m(null), [le, Le] = m(!1), [j, be] = m(!1), [he, Ue] = m(null), [Ye, it] = m(null), [rt, Ct] = m(null), [ke, yn] = m(""), [$t, wn] = m("positions"), [Et, ht] = m(null), [Ii, Fn] = m(""), Dn = De(), [Fi, Di] = m(!1), [It, Oi] = m(/* @__PURE__ */ new Set()), Mt = (b, V) => Oi((ae) => {
    const me = new Set(ae);
    return V ? me.add(b) : me.delete(b), me;
  }), [kr, Gt] = m(!1);
  Z(() => {
    Gt(!1), !(!C || !t.referralCode) && n.withdrawLimits().then((b) => Gt(b.feeDiscountPct === 0)).catch(() => {
    });
  }, [C]), Z(() => a(t.market), [t.market]), Z(() => E(t.side ?? "buy"), [t.side]), Z(() => pt((b) => Math.min(b, t.maxLeverage)), [t.maxLeverage]), Z(() => {
    J(""), Se(""), St(""), Je(""), ft(""), ht(null), Ue(null);
  }, [s]);
  const [Rt, _n] = m(null), ii = De(), [L, bt] = m(null), ri = De(), Ne = (b, V, ae = !1) => {
    _n({ kind: b, text: V }), clearTimeout(ii.current), ii.current = setTimeout(() => _n(null), b === "ok" ? 4500 : 8e3), ae && (bt({ kind: b, text: V }), clearTimeout(ri.current), ri.current = setTimeout(() => bt(null), b === "ok" ? 1e4 : 15e3));
  };
  Z(() => {
    let b = !0;
    const V = n.on((Pe) => {
      Pe.type === "session" && v(Pe.session), Pe.type === "session" && Pe.reason === "idle" && Ne("err", `Signed out after ${Math.round(n.idleTimeoutMs / 6e4)} minutes without activity. Connect again to trade.`), Pe.type === "session" && Pe.reason === "expired" && Ne("err", "Session expired. Connect again."), Pe.type === "user" && jo();
    });
    (async () => {
      for (let Pe = 0; b; Pe++)
        try {
          Pe === 0 && await n.init();
          const [Dt, qt, Ut] = await Promise.all([n.loadMarkets(), n.market.tickers().catch(() => []), n.market.baseTakerRate()]);
          if (!b) return;
          r(Dt), c(Ut), g("");
          const yt = {};
          for (const et of Dt) {
            const Tt = n.raw(et.symbol), Bn = Array.isArray(qt) ? qt.find((ol) => ol?.symbol === et.symbol) : void 0, Zs = Xe(Tt.mark_price);
            yt[et.symbol] = {
              mark: Zs,
              index: Xe(Tt.index_price),
              funding: Xe(Tt.funding_rate),
              last: Xe(Bn?.lastPrice, Xe(Tt.last_price)),
              open: Bn ? Xe(Bn.lastPrice) / (1 + Xe(Bn.priceChangePercent) / 100) : Zs,
              quoteVolume: Bn ? Xe(Bn.quoteVolume) : 0
            };
          }
          l(yt);
          return;
        } catch (Dt) {
          if (!b) return;
          g(Dt?.message || "Could not reach Strike."), await new Promise((qt) => setTimeout(qt, Math.min(3e4, 2e3 * 2 ** Pe)));
        }
    })();
    const ae = n.prices();
    ae.subscribe("!markprice@arr"), ae.subscribe("!miniticker@arr");
    const me = ae.onMessage((Pe) => {
      const Dt = Array.isArray(Pe) ? Pe : Array.isArray(Pe?.data) ? Pe.data : Pe?.data ? [Pe.data] : [Pe];
      l((qt) => {
        let Ut = !1;
        const yt = { ...qt };
        for (const et of Dt) {
          if (!et?.s || !yt[et.s]) continue;
          const Tt = yt[et.s];
          et.e === "markPriceUpdate" ? (yt[et.s] = { ...Tt, mark: Xe(et.p, Tt.mark), index: Xe(et.i, Tt.index), funding: Xe(et.r, Tt.funding) }, Ut = !0) : et.e === "24hrMiniTicker" && (yt[et.s] = { ...Tt, open: Xe(et.o, Tt.open), last: Xe(et.c, Tt.last), quoteVolume: Xe(et.q, Tt.quoteVolume) }, Ut = !0);
        }
        return Ut ? yt : qt;
      });
    }), He = setInterval(async () => {
      if (!At())
        try {
          const Pe = await n.market.markets();
          l((Dt) => {
            const qt = { ...Dt };
            for (const Ut of Pe) {
              const yt = qt[Ut.symbol];
              yt && (qt[Ut.symbol] = { ...yt, mark: Xe(Ut.mark_price, yt.mark), index: Xe(Ut.index_price, yt.index), funding: Xe(Ut.funding_rate, yt.funding) });
            }
            return qt;
          });
        } catch {
        }
    }, 15e3);
    return () => {
      b = !1, V(), me(), clearInterval(He), n.dispose();
    };
  }, [n]), Z(() => {
    i.length && !i.find((b) => b.symbol === s) && a(i[0].symbol);
  }, [i, s]), Z(() => {
    let b = !0;
    p([]);
    const V = () => n.market.klines(s, "1h", 48, "mark").then((me) => b && p(me.map((He) => He.close))).catch(() => {
    });
    V();
    const ae = setInterval(() => !At() && V(), 6e4);
    return () => {
      b = !1, clearInterval(ae);
    };
  }, [n, s]);
  const si = De(), pn = De(!0);
  Z(
    () => () => {
      pn.current = !1, clearTimeout(si.current), clearTimeout(Dn.current);
    },
    []
  );
  const As = De(!1);
  As.current = $t === "twap" || P.length > 0;
  const zt = async (b = !1) => {
    const V = n.session;
    if (!pn.current || !V) return;
    const ae = b || As.current ? n.trading.twaps().catch(() => null) : null;
    try {
      const [He, Pe, Dt] = await Promise.all([n.account.account(), n.account.positions(), n.account.openOrders()]);
      if (!pn.current || n.session !== V) return;
      S(He), x(Pe), T(Dt);
    } catch (He) {
      He?.status === 401 && n.session && (n.disconnect(), Ne("err", "Session expired. Connect again."));
    }
    const me = await ae;
    me && pn.current && n.session === V && ie(me);
  }, jo = () => {
    clearTimeout(si.current), si.current = setTimeout(zt, 400);
  };
  Z(() => {
    if (!C) {
      S(null), x([]), T([]), ie([]);
      return;
    }
    zt(!0), n.userEvents();
    const b = setInterval(() => !At() && zt(), 5e3);
    return () => clearInterval(b);
  }, [C]), Z(() => {
    C && $t === "twap" && zt(!0);
  }, [$t]);
  const Ie = i.find((b) => b.symbol === s), Ls = n.raw(s), xt = o[s], Be = xt?.mark ?? 0, yr = d.length >= 25 ? d[d.length - 25] : xt?.open ?? 0, wr = yr > 0 && Be > 0 ? (Be - yr) / yr * 100 : 0, st = Ie?.baseAsset ?? s.split("-")[0], vt = Ie?.tickSize, _r = en(() => Object.fromEntries(i.map((b) => [b.symbol, b.tickSize])), [i]), Es = en(() => Object.fromEntries(Object.entries(o).map(([b, V]) => [b, V.mark])), [o]), Go = d.length ? [...d.slice(0, -1), Be || d[d.length - 1]] : [], Bi = D === "stop" || D === "stop_limit", ai = D === "limit" || D === "stop_limit", oi = D === "market" || D === "limit", Ft = Number(A) || 0, Re = D === "market" ? Be : D === "stop" ? Number(ne) > 0 ? Number(ne) : Be : D === "twap" ? Be : Number(O) > 0 ? Number(O) : Be, Is = Ie ? Gn(Ie.marginTiers, Math.max(Ft, 1)) : 1, Sr = Math.max(1, Math.min(t.maxLeverage, Is)), mt = Math.min(Ae, Sr), Vt = Xe($?.available_balance), Cr = Vt * mt, li = Cr > 0 ? Math.min(100, Ft / Cr * 100) : 0, un = Ie ? ai ? Ie.stepSize : Ie.marketStepSize ?? Ie.stepSize : 0, $r = Re > 0 && Ie ? Number(ue(Ft / Re, un, "floor")) : 0, Fe = Ie && Re > 0 && un > 0 && $r * Re < Ie.minNotional && Ft >= Ie.minNotional ? Number(ue($r + un, un, "floor")) : $r, Ri = n.orderFeeBps, kt = Ie && Re > 0 && Ft > 0 ? Zr({ side: F, price: Re, notional: Fe * Re, leverage: mt, takerRate: u, builderFeeBps: Ri, tiers: Ie.marginTiers }) : null, qi = B.find((b) => b.symbol === s), hn = qi ? Number(qi.size) : 0, Kt = (ut || Number(Lt) || 0) * 60, Mr = Ft > 0 ? wl({ usd: Ft, size: Fe, price: Re, leverage: mt, base: st, step: un }) : null, zr = yl({ position: hn, side: F, size: Fe, base: st, reduceOnly: ve, step: un }), mn = (b) => we(b, vt), Vo = D === "limit" && Number(O) > 0 ? ` at ${mn(Number(O))} or better` : D === "stop" && Number(ne) > 0 ? ` once the mark reaches ${mn(Number(ne))}` : D === "stop_limit" && Number(ne) > 0 ? ` at ${Number(O) > 0 ? mn(Number(O)) : "your limit"} once the mark reaches ${mn(Number(ne))}` : D === "twap" && Kt >= vi && Kt <= ki ? ` over ${Wr(Kt / 60)}` : "", Fs = kt && Fe > 0 && !zr ? _l({
    side: F,
    leverage: mt,
    base: st,
    size: Fe,
    notional: kt.notional,
    margin: kt.margin,
    entry: Re,
    liqPrice: kt.liquidationPrice,
    fmtPrice: mn,
    resting: D !== "market",
    when: Vo,
    reduceOnly: ve
  }) : null, Ko = !$ || Number($.wallet_balance) <= 0 && B.length === 0, On = Number(Ls?.order_limit_price_bound ?? 0.05) || 0.05, ci = ms($, s) ?? "cross", Tr = Number(Ls?.order_market_price_bound) || On, ze = D === "market" && w && Fe > 0 ? hr(w, F, Fe, { mark: Be, bound: Tr }) : null, Ui = D === "market" && Ft > 0 && w === null, Ds = `${s}|${F}|${Fe}|${ze ? ze.complete ? Math.ceil(ze.slippage * 200) : "partial" : Ui ? "nobook" : ""}`, Os = !!ze && (ze.slippage > _d || !ze.complete) || Ui, Hi = (() => {
    if (!Ie) return "Loading market…";
    if (!C || Vt <= 0 && !ve) return null;
    if (!Ft) return "Enter a size";
    if (!ve && Fe * Re < Ie.minNotional) return `Minimum order ${ge(Ie.minNotional, { decimals: 0 })}`;
    if (!ve && Ft / mt > Vt * 1.0001) return "Not enough available balance";
    if (D === "limit") {
      if (!(Number(O) > 0)) return "Enter a limit price";
      if (Math.abs(Number(O) - Be) / Be > On) return `Limit price must be within ${(On * 100).toFixed(0)}% of mark`;
    }
    if (Bi) {
      const b = yi({ side: F, type: D, stopPrice: Number(ne), price: Number(O), mark: Be, priceBound: On, tickSize: vt });
      if (b) return b;
    }
    if (D === "twap" && !(Kt >= vi && Kt <= ki)) return "Duration must be 5–1440 minutes";
    if (D === "twap" && Number(Qe) > 0 && Math.abs(Number(Qe) - Be) / Be > On) return `Limit price must be within ${(On * 100).toFixed(0)}% of mark`;
    if (D === "market" && w === void 0) return "Checking order book…";
    if (X && oi) {
      const b = Number(Ce), V = Number(nt);
      if (b && (F === "buy" ? b <= Re : b >= Re)) return "Take-profit must be beyond entry";
      if (V && (F === "buy" ? V >= Re : V <= Re)) return "Stop-loss must be on the losing side of entry";
    }
    return null;
  })(), Bs = Os && re !== Ds;
  Z(() => {
    if (!re) return;
    const b = setTimeout(() => ce(""), 15e3);
    return () => clearTimeout(b);
  }, [re]);
  const Rs = !!Ie && (f === "book" || D === "market" && Ft > 0);
  Z(() => {
    if (z(void 0), !Rs) return;
    const b = n.orderBook(s);
    let V;
    const ae = b.onUpdate(() => {
      V || (V = setTimeout(() => (V = void 0, z(b.view(200))), 200));
    }), me = setTimeout(() => z((He) => He === void 0 ? null : He), 1e4);
    return () => {
      ae(), clearTimeout(V), clearTimeout(me), b.close();
    };
  }, [n, s, Rs]);
  const qs = async () => {
    if (!(!Ie || Hi)) {
      if (Bs) return ce(Ds);
      Le(!0), ce("");
      try {
        if (D === "twap") {
          await n.placeTwap({
            symbol: s,
            side: F,
            size: Fe,
            durationSec: Kt,
            limitPrice: Number(Qe) > 0 ? Number(Qe) : void 0,
            reduceOnly: ve,
            randomize: I,
            leverage: ve ? void 0 : mt
          }), Ne("ok", `TWAP started: ${F === "buy" ? "Long" : "Short"} ${ui(Fe)} ${st} over ${Wr(Kt / 60)}`, !0), N(""), wn("twap"), zt(!0);
          return;
        }
        const b = await n.placeOrder({
          symbol: s,
          side: F,
          type: D,
          size: Fe,
          price: ai ? Number(O) : void 0,
          stopPrice: Bi ? Number(ne) : void 0,
          reduceOnly: ve,
          takeProfit: X && oi && Number(Ce) > 0 ? Number(Ce) : void 0,
          stopLoss: X && oi && Number(nt) > 0 ? Number(nt) : void 0,
          leverage: ve ? void 0 : mt
        }), V = b.status === "open" || b.status === "untriggered", ae = `${F === "buy" ? "Long" : "Short"} ${ui(Fe)} ${st}`;
        if (b.status === "filled") {
          const me = ze?.avgPrice ?? Re, He = kl(hn, F, Fe, ve);
          Ne("ok", `Filled: ${ae} at ~${we(me, vt)} (~${ge(Fe * me)}). ${He ? `You now hold ${Xi(He, st)}` : `Your ${st} position is closed`}`, !0), Fn(s), clearTimeout(Dn.current), Dn.current = setTimeout(() => Fn(""), 1600);
        } else if (/cancel|expire/i.test(b.status) && (D === "market" || D === "stop"))
          Ne("err", `Not filled: there were no ${F === "buy" ? "sellers" : "buyers"} close enough to the market price (within Strike's ${(Tr * 100).toFixed(0)}% band), so Strike cancelled the order. Nothing was traded.`, !0);
        else {
          const me = b.status === "untriggered" ? "Stop order placed" : b.status === "open" ? "Order placed" : `Order ${b.status}`;
          Ne("ok", `${me}: ${ae}`, !0);
        }
        N(""), Ue(null), wn(V ? "orders" : "positions"), zt();
      } catch (b) {
        Ne("err", b instanceof Hn ? `Rejected: ${b.message}` : b?.message || String(b), !0);
      } finally {
        Le(!1);
      }
    }
  };
  Z(() => {
    if (!Ye) return;
    const b = setTimeout(() => se.current?.querySelector(".sheet")?.scrollIntoView({ block: "start", behavior: "smooth" }), 30);
    return () => clearTimeout(b);
  }, [Ye]);
  const [Yo, Us] = m(null), Hs = De(), Ws = (b, V) => {
    Us({ id: b, ...V }), clearTimeout(Hs.current), Hs.current = setTimeout(() => Us(null), 15e3), setTimeout(() => se.current?.querySelector(".list .ticket-msg")?.scrollIntoView({ block: "center", behavior: "smooth" }), 50);
  }, Xo = async (b) => {
    const V = `pos:${b.id}`;
    if (ht(null), !It.has(V)) {
      Mt(V, !0);
      try {
        const ae = await n.closePosition(b), me = Xi(Number(b.size), b.symbol.split("-")[0]), He = ae.status === "filled" ? { kind: "ok", text: `✓ Closed ${me} · PnL ≈ ${ge(Number(b.upnl), { sign: !0 })}` } : /cancel|expire/i.test(ae.status) ? { kind: "err", text: `Not closed: there were no ${Number(b.size) > 0 ? "buyers" : "sellers"} close enough to the market price (within Strike's price band), so Strike cancelled the close order. Your ${me} position is still open.` } : { kind: "ok", text: `Close order ${ae.status}` };
        Ne(He.kind, He.text), Ws(b.id, He), zt();
      } catch (ae) {
        Ne("err", ae?.message || String(ae)), Ws(b.id, { kind: "err", text: ae?.message || String(ae) });
      } finally {
        Mt(V, !1);
      }
    }
  }, Zo = async (b) => {
    const V = `ord:${b.id}`;
    if (!It.has(V)) {
      Mt(V, !0);
      try {
        await n.trading.cancelOrder(b.symbol, b.id), Ne("ok", "Order cancelled"), setTimeout(zt, 600);
      } catch (ae) {
        Ne("err", ae?.message || String(ae));
      } finally {
        Mt(V, !1);
      }
    }
  }, js = async (b) => {
    if (ht(null), !It.has("cancelall")) {
      Mt("cancelall", !0);
      try {
        const V = await n.cancelAll(b);
        Ne("ok", V === null ? "Cancelling orders…" : `Cancelled ${V} order${V === 1 ? "" : "s"}`), setTimeout(zt, 600);
      } catch (V) {
        Ne("err", V?.message || String(V));
      } finally {
        Mt("cancelall", !1);
      }
    }
  }, Jo = async (b) => {
    const V = `twap:${b.id}`;
    if (!It.has(V)) {
      Mt(V, !0);
      try {
        await n.trading.cancelTwap(b.id), Ne("ok", "TWAP cancelling"), zt(!0);
      } catch (ae) {
        Ne("err", ae?.message || String(ae));
      } finally {
        Mt(V, !1);
      }
    }
  }, Qo = async () => {
    const b = ci === "cross" ? "isolated" : "cross";
    ht(null), Di(!0);
    try {
      await n.setMarginMode(s, b), Ne("ok", `${s} now uses ${b} margin`), zt();
    } catch (V) {
      Ne("err", V?.message || String(V));
    } finally {
      Di(!1);
    }
  }, Gs = async (b) => {
    if (!n.wallet) {
      const V = Sd(Fa);
      if (V)
        try {
          await n.ensureWallet(V);
        } catch (ae) {
          Ne("err", ae?.message || String(ae));
          return;
        }
    }
    if (!n.wallet) return it("connect");
    it(b);
  }, Nr = () => Gs("deposit"), Vs = (b) => {
    if (Cr <= 0 || !Ie) return;
    if (b === 0) return N("");
    const V = u + Ri / 1e4;
    let ae = Vt * mt * (b / 100);
    for (let me = 0; me < 4; me++) {
      const He = Math.max(1, Math.min(mt, Gn(Ie.marginTiers, ae)));
      ae = Vt * (b / 100) / (1 / He + V);
    }
    N((Math.floor(ae * 0.998 * 100) / 100).toString());
  }, el = (b) => {
    const V = ue(b, vt ?? 1e-4);
    D === "stop" ? Se(V) : D === "twap" ? St(V) : (J(V), ai || (Ue({ from: D, price: O }), W("limit"))), setTimeout(() => {
      const ae = se.current?.querySelector(D === "stop" ? "#se-trigger" : D === "twap" ? "#se-twap-limit" : "#se-price"), me = ae?.closest(".field") ?? ae;
      me && (me.scrollIntoView({ block: "center", behavior: "smooth" }), me.classList.remove("flash"), me.offsetWidth, me.classList.add("flash"));
    }, 50);
  }, tl = () => {
    he && (W(he.from), J(he.price), Ue(null));
  }, Ks = (b) => (W(b), Ue(null)), nl = i.filter((b) => !ke || b.symbol.toLowerCase().includes(ke.toLowerCase()) || b.name.toLowerCase().includes(ke.toLowerCase())), Pr = (b, V, ae, me, He, Pe = !0) => /* @__PURE__ */ e("div", { class: "field", children: [
    /* @__PURE__ */ e("label", { for: b, children: V }),
    /* @__PURE__ */ e("input", { id: b, inputMode: "decimal", placeholder: He ?? (Be ? we(Be, vt).replace(/,/g, "") : "0"), value: ae, onInput: (Dt) => me(_e(Dt)) }),
    Pe && /* @__PURE__ */ e("button", { class: "unit linkbtn", style: { textDecoration: "none" }, onClick: () => me(ue(Be, vt ?? 1e-4)), children: "Mark" })
  ] }), di = (b) => /* @__PURE__ */ e("div", { class: "empty", children: [
    "Connect a wallet to see your ",
    b,
    ".",
    " ",
    /* @__PURE__ */ e("button", { class: "linkbtn", onClick: () => it("connect"), children: "Connect" })
  ] }), il = (() => {
    if (!C) return /* @__PURE__ */ e("button", { class: "cta", onClick: () => it("connect"), children: "Connect Wallet" });
    if (Vt <= 0 && !ve) return /* @__PURE__ */ e("button", { class: "cta", onClick: Nr, children: "Deposit to trade" });
    if (!Hi && Bs && !le)
      return /* @__PURE__ */ e("button", { class: "cta caution", onClick: qs, children: Ui ? "Confirm: slippage unknown" : ze && !ze.complete ? "Confirm: the book can't fill it all" : `Confirm: est. slippage ${((ze?.slippage ?? 0) * 100).toFixed(2)}%` });
    const b = Sl({
      side: F,
      base: st,
      type: D,
      price: ai && Number(O) > 0 ? mn(Number(O)) : void 0,
      trigger: Bi && Number(ne) > 0 ? mn(Number(ne)) : void 0,
      notional: Ft ? Fe * Re : 0
    });
    return /* @__PURE__ */ e("button", { class: `cta${F === "sell" ? " short" : ""}`, disabled: !!Hi || le, onClick: qs, children: le ? /* @__PURE__ */ e(R, { children: [
      /* @__PURE__ */ e(Bt, {}),
      " Placing…"
    ] }) : Hi ?? b });
  })();
  if (h && !i.length)
    return /* @__PURE__ */ e("div", { class: "card", children: /* @__PURE__ */ e("div", { class: "ticket", children: /* @__PURE__ */ e("div", { class: "warn", children: "Can't reach Strike right now. Retrying…" }) }) });
  const Ar = Da.find((b) => b[0] === D)?.[1];
  n.net.network;
  const Lr = Re || Be, rl = Fe > 0 && Re > 0 ? Fe * Re : 100, Ys = (b) => Ie && Lr > 0 ? Pi(Lr, Zr({ side: F, price: Lr, notional: rl, leverage: b, takerRate: u, builderFeeBps: Ri, tiers: Ie.marginTiers }).liquidationPrice) : "", Xs = j || ve, sl = {
    market: ze ? "Average fill estimated from the live order book" : "Market orders fill near the mark price",
    limit: "Your limit price",
    stop: "Your trigger price; once the mark reaches it, a market order fills near it",
    stop_limit: "Your limit price, once the mark reaches the trigger",
    twap: "Slices fill at market over the duration (never past your limit, if set)"
  }, al = [
    ["positions", C ? `Positions (${B.length})` : "Positions"],
    ["orders", C ? `Orders (${M.length})` : "Orders"],
    ["twap", C && P.length ? `TWAP (${P.length})` : "TWAP"],
    ["history", "History"],
    ["account", "Account"]
  ], pi = M.filter((b) => b.symbol === s).length;
  return /* @__PURE__ */ e(
    "div",
    {
      ref: se,
      class: "card",
      onClick: (b) => rt && !b.target.closest(".menu, [data-menu]") && Ct(null),
      onKeyDown: (b) => b.key === "Escape" && (rt ? Ct(null) : Et ? ht(null) : re ? ce("") : Ye && it(null)),
      children: [
        /* @__PURE__ */ e("div", { class: "mkt", children: [
          /* @__PURE__ */ e(Ia, { base: st }),
          /* @__PURE__ */ e("div", { class: "mkt-id", children: /* @__PURE__ */ e("button", { class: "mkt-pick", "data-menu": !0, onClick: () => Ct(rt === "market" ? null : "market"), "aria-haspopup": "listbox", "aria-expanded": rt === "market", children: [
            s,
            " ",
            /* @__PURE__ */ e(Rr, {})
          ] }) }),
          /* @__PURE__ */ e("div", { class: "mkt-price", children: [
            /* @__PURE__ */ e("div", { class: "big num", children: Be ? we(Be, vt) : "—" }),
            /* @__PURE__ */ e("div", { class: `chg num ${wr >= 0 ? "pos" : "neg"}`, children: xt ? Xr(wr) : "" })
          ] })
        ] }),
        rt === "market" && /* @__PURE__ */ e("div", { class: "menu", role: "listbox", children: [
          /* @__PURE__ */ e("input", { placeholder: "Search markets", "aria-label": "Search markets", value: ke, onInput: (b) => yn(b.target.value), autoFocus: !0 }),
          nl.map((b) => {
            const V = o[b.symbol], ae = V && V.open ? (V.mark - V.open) / V.open * 100 : 0;
            return /* @__PURE__ */ e("button", { class: `menu-row${b.symbol === s ? " on" : ""}`, role: "option", "aria-selected": b.symbol === s, onClick: () => (a(b.symbol), Ct(null), yn("")), children: [
              /* @__PURE__ */ e("span", { class: "menu-id", children: [
                /* @__PURE__ */ e(Ia, { base: b.baseAsset ?? b.symbol.split("-")[0] }),
                /* @__PURE__ */ e("span", { children: [
                  /* @__PURE__ */ e("div", { class: "n", children: b.symbol }),
                  /* @__PURE__ */ e("div", { class: "t", children: [
                    b.name,
                    " · ",
                    b.maxLeverage,
                    "x"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ e("span", { class: "num", children: V ? we(V.mark, b.tickSize) : "" }),
              /* @__PURE__ */ e("span", { class: `num ${ae >= 0 ? "pos" : "neg"}`, children: V ? Xr(ae) : "" })
            ] }, b.symbol);
          })
        ] }),
        !C && // Always visible, so hosts that show the widget in a short scrolling area (e.g. a wallet popup) don't hide connecting below the fold.
        /* @__PURE__ */ e("div", { class: "connect-strip", children: [
          /* @__PURE__ */ e("span", { children: "Connect a Cardano wallet to trade" }),
          /* @__PURE__ */ e("button", { class: "mini go", onClick: () => it("connect"), children: "Connect" })
        ] }),
        /* @__PURE__ */ e("div", { class: "stats", children: [
          /* @__PURE__ */ e("div", { class: "stat", children: [
            /* @__PURE__ */ e("div", { class: "k", children: [
              "Index",
              /* @__PURE__ */ e(qn, { label: "About the index price", children: [
                "The average ",
                st,
                " spot price on major external exchanges. Strike's price is kept close to it."
              ] })
            ] }),
            /* @__PURE__ */ e("div", { class: "v num", children: xt ? we(xt.index, vt) : "—" })
          ] }),
          /* @__PURE__ */ e("div", { class: "stat", children: [
            /* @__PURE__ */ e("div", { class: "k", children: [
              "Funding",
              /* @__PURE__ */ e(qn, { label: "About funding", children: "Every hour, one side pays the other to keep the price close to the index. Positive: longs pay shorts; negative: shorts pay longs." })
            ] }),
            /* @__PURE__ */ e("div", { class: `v fund ${!xt || !xt.funding ? "" : xt.funding < 0 ? "neg" : "pos"}`, children: xt ? os(xt.funding) : "—" })
          ] }),
          /* @__PURE__ */ e("div", { class: "stat", children: [
            /* @__PURE__ */ e("div", { class: "k", children: "24h Volume" }),
            /* @__PURE__ */ e("div", { class: "v num", children: xt ? ge(xt.quoteVolume, { decimals: 0 }) : "—" })
          ] })
        ] }),
        /* @__PURE__ */ e("div", { class: "views", children: [
          /* @__PURE__ */ e("div", { class: "vtabs", role: "tablist", "aria-label": "Market view", children: ["price", "chart", "book"].map((b) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": f === b, class: f === b ? "on" : "", onClick: () => y(b), children: b === "price" ? "Price" : b === "chart" ? "Chart" : "Book" }, b)) }),
          f === "chart" && /* @__PURE__ */ e("div", { class: "ivs", role: "radiogroup", "aria-label": "Candle interval", children: Object.keys(Io).map((b) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": k === b, class: k === b ? "on" : "", onClick: () => _(b), children: b === "1d" ? "1D" : b }, b)) })
        ] }),
        f === "price" && /* @__PURE__ */ e(Jc, { points: Go, up: wr >= 0 }),
        f === "chart" && /* @__PURE__ */ e(br, { client: n, symbol: s, interval: k, tick: vt, live: { mark: Be, last: xt?.last ?? 0, index: xt?.index ?? 0 } }),
        f === "book" && /* @__PURE__ */ e(
          ld,
          {
            book: w,
            depth: wd,
            tick: vt,
            base: st,
            onPick: el,
            hint: D === "stop" || D === "stop_limit" ? "Tap a price to use it in your stop order" : D === "twap" ? "Tap a price to set the TWAP limit" : "Tap a price to place a Limit order there"
          }
        ),
        /* @__PURE__ */ e("div", { class: "ticket", children: [
          /* @__PURE__ */ e("div", { class: "pills", children: [
            /* @__PURE__ */ e("span", { class: "pillx", children: [
              /* @__PURE__ */ e(
                "button",
                {
                  class: "pill",
                  disabled: !C || !$ || Fi || !!qi || M.some((b) => b.symbol === s),
                  "aria-label": `Margin mode: ${ci}`,
                  title: C ? qi || M.some((b) => b.symbol === s) ? "Close this market's position and open orders to change margin mode" : "Switch between cross and isolated margin for this market" : "Cross margin (Strike's default). Connect to change it.",
                  onClick: () => ht(Et === "margin" ? null : "margin"),
                  children: Fi ? /* @__PURE__ */ e(Bt, {}) : ci === "cross" ? "Cross margin" : "Isolated margin"
                }
              ),
              /* @__PURE__ */ e(qn, { label: "Cross vs isolated margin", children: [
                /* @__PURE__ */ e("b", { children: "Cross:" }),
                " your whole balance backs your positions, so liquidation is further away, but a big loss can use all of it. ",
                /* @__PURE__ */ e("b", { children: "Isolated:" }),
                " each position can only lose the margin you put in it."
              ] })
            ] }),
            /* @__PURE__ */ e("span", { class: "pillx", children: [
              /* @__PURE__ */ e("button", { class: "pill", "data-menu": !0, onClick: () => Ct(rt === "leverage" ? null : "leverage"), "aria-label": `Leverage ${mt}x, change`, title: "Leverage: tap to change", children: [
                /* @__PURE__ */ e("span", { class: "pill-k", children: "Leverage" }),
                " ",
                mt,
                "x"
              ] }),
              /* @__PURE__ */ e(qn, { label: "About leverage", children: [
                "Leverage multiplies your position: at ",
                mt,
                "x, $10 of your balance controls $",
                10 * mt,
                " of ",
                st,
                ". Gains and losses grow ",
                mt,
                "x too, and liquidation comes closer."
              ] })
            ] })
          ] }),
          Et === "margin" && (hn ? /* @__PURE__ */ e(Qi, { actions: /* @__PURE__ */ e("button", { class: "mini", onClick: () => ht(null), children: "OK" }), children: [
            "Close your ",
            s,
            " position first: Strike only changes margin mode with no open position."
          ] }) : /* @__PURE__ */ e(
            Qi,
            {
              actions: /* @__PURE__ */ e(R, { children: [
                /* @__PURE__ */ e("button", { class: "mini", onClick: () => ht(null), children: "Cancel" }),
                /* @__PURE__ */ e("button", { class: "mini go", onClick: Qo, children: "Switch" })
              ] }),
              children: ci === "cross" ? `Switch ${s} to isolated margin? Each new position only risks the margin you give it, so its liquidation price is closer.` : `Switch ${s} to cross margin? Your whole balance backs positions: liquidation is further away, but losses can draw on all of it.`
            }
          )),
          rt === "leverage" && /* @__PURE__ */ e("div", { class: "menu inl", children: [
            /* @__PURE__ */ e("div", { class: "t muted", style: { padding: "4px 8px 6px", fontSize: "11.5px" }, children: [
              "Max ",
              Sr,
              "x for this size",
              t.maxLeverage < Is ? ` (site limit ${t.maxLeverage}x)` : "",
              " · % = price move to liquidation",
              Fe > 0 && Re > 0 ? "" : " (for a $100 position)"
            ] }),
            /* @__PURE__ */ e("div", { class: "levs", children: kd.filter((b) => b <= Sr).map((b) => /* @__PURE__ */ e("button", { class: `pill${b === mt ? " on" : ""}`, onClick: () => (pt(b), Ct(null)), "aria-label": `${b}x leverage, liquidation about ${Ys(b) || "unknown"} away`, children: [
              b,
              "x",
              /* @__PURE__ */ e("span", { class: "lq num", children: Ys(b) || "—" })
            ] }, b)) }),
            /* @__PURE__ */ e("div", { class: "t muted", style: { padding: "6px 8px 2px", fontSize: "11.5px" }, children: "Higher leverage = bigger gains and losses, and liquidation comes closer." })
          ] }),
          /* @__PURE__ */ e("div", { class: "tabs", role: "tablist", "aria-label": "Order type", children: [
            ["market", "limit"].map((b) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": D === b, class: `tab${D === b ? " on" : ""}`, onClick: () => Ks(b), children: b === "market" ? "Market" : "Limit" }, b)),
            /* @__PURE__ */ e(
              "button",
              {
                role: "tab",
                "aria-selected": !!Ar,
                "aria-haspopup": "menu",
                "aria-expanded": rt === "ordertype",
                "data-menu": !0,
                class: `tab${Ar ? " on" : ""}`,
                onClick: () => Ct(rt === "ordertype" ? null : "ordertype"),
                children: [
                  Ar ?? "Advanced",
                  " ",
                  /* @__PURE__ */ e(Rr, { size: 10 })
                ]
              }
            )
          ] }),
          he && D === "limit" && /* @__PURE__ */ e("div", { class: "helper", role: "status", children: [
            "Switched to a Limit order",
            Number(O) > 0 ? ` at ${mn(Number(O))}` : "",
            " ·",
            " ",
            /* @__PURE__ */ e("button", { class: "linkbtn", onClick: tl, children: "Undo" })
          ] }),
          rt === "ordertype" && /* @__PURE__ */ e("div", { class: "menu inl", role: "menu", "aria-label": "Advanced order types", children: Da.map(([b, V, ae]) => /* @__PURE__ */ e("button", { role: "menuitem", class: `menu-row${D === b ? " on" : ""}`, onClick: () => (Ks(b), Ct(null)), children: /* @__PURE__ */ e("span", { children: [
            /* @__PURE__ */ e("div", { class: "n", children: V }),
            /* @__PURE__ */ e("div", { class: "t", children: ae })
          ] }) }, b)) }),
          /* @__PURE__ */ e("div", { class: "seg", children: [
            /* @__PURE__ */ e("button", { class: `long${F === "buy" ? " on" : ""}`, onClick: () => E("buy"), children: "Long/Buy" }),
            /* @__PURE__ */ e("button", { class: `short${F === "sell" ? " on" : ""}`, onClick: () => E("sell"), children: "Short/Sell" })
          ] }),
          /* @__PURE__ */ e("div", { class: "helper seg-hint", children: [
            "Long = profit if ",
            st,
            " goes up · Short = ",
            /* @__PURE__ */ e("span", { class: "w", children: "profit " }),
            "if it goes down"
          ] }),
          /* @__PURE__ */ e(
            Ee,
            {
              k: /* @__PURE__ */ e(R, { children: [
                "Available to Trade",
                C && /* @__PURE__ */ e("button", { class: "linkbtn dep", onClick: Nr, children: "+ Deposit" })
              ] }),
              v: C ? /* @__PURE__ */ e("span", { class: "num", children: ge(Vt) }) : "—"
            }
          ),
          /* @__PURE__ */ e(
            Ee,
            {
              k: "Current Position",
              v: hn ? /* @__PURE__ */ e("span", { class: `num ${hn > 0 ? "pos" : "neg"}`, children: [
                Xi(hn, st),
                Be ? ` (~${ge(Math.abs(hn) * Be)})` : ""
              ] }) : "—"
            }
          ),
          Bi && Pr("se-trigger", "Trigger", ne, Se),
          ai && Pr("se-price", "Price", O, J),
          /* @__PURE__ */ e("div", { class: "field", children: [
            /* @__PURE__ */ e("label", { for: "se-size", children: "Size" }),
            /* @__PURE__ */ e("input", { id: "se-size", inputMode: "decimal", placeholder: "0.00", value: A, onInput: (b) => N(_e(b)), "aria-label": "Order size in USD", "aria-describedby": Mr ? "se-size-line" : void 0 }),
            /* @__PURE__ */ e("span", { class: "unit", children: "USD" })
          ] }),
          Mr && /* @__PURE__ */ e("div", { class: "helper", id: "se-size-line", children: Mr }),
          /* @__PURE__ */ e("div", { class: "slider-row", children: [
            /* @__PURE__ */ e(Zc, { value: li, onChange: Vs }),
            /* @__PURE__ */ e("label", { class: "pct num", children: [
              /* @__PURE__ */ e(
                "input",
                {
                  inputMode: "decimal",
                  "aria-label": "Order size as percent of buying power",
                  value: oe ?? (li ? li.toFixed(1) : ""),
                  placeholder: "0",
                  onFocus: () => U(li ? li.toFixed(1) : ""),
                  onInput: (b) => U(_e(b)),
                  onBlur: () => {
                    const b = Number(oe);
                    oe !== null && Number.isFinite(b) && Vs(Math.max(0, Math.min(100, b))), U(null);
                  },
                  onKeyDown: (b) => b.key === "Enter" && b.target.blur()
                }
              ),
              "%"
            ] }),
            /* @__PURE__ */ e(qn, { label: "About the size slider", children: "The slider sets your order size as a % of your buying power (available balance × leverage). Change leverage with the Leverage button above." })
          ] }),
          D === "twap" && /* @__PURE__ */ e(R, { children: [
            /* @__PURE__ */ e("div", { class: "durs", role: "radiogroup", "aria-label": "TWAP duration", children: [
              /* @__PURE__ */ e("span", { class: "lbl", children: "Duration" }),
              yd.map((b) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": ut === b, class: ut === b ? "on" : "", onClick: () => $e(b), children: b < 60 ? `${b}m` : `${b / 60}h` }, b)),
              /* @__PURE__ */ e("button", { role: "radio", "aria-checked": ut === 0, class: ut === 0 ? "on" : "", onClick: () => $e(0), children: "Custom" })
            ] }),
            ut === 0 && /* @__PURE__ */ e("div", { class: "field", children: [
              /* @__PURE__ */ e("label", { for: "se-dur", children: "Duration" }),
              /* @__PURE__ */ e("input", { id: "se-dur", inputMode: "numeric", placeholder: "5 – 1440", value: Lt, onInput: (b) => dn(b.target.value.replace(/[^0-9]/g, "").slice(0, 4)) }),
              /* @__PURE__ */ e("span", { class: "unit", children: "min" })
            ] }),
            Pr("se-twap-limit", "Limit", Qe, St, "Optional", !1)
          ] }),
          /* @__PURE__ */ e("div", { class: "checks", children: [
            oi && /* @__PURE__ */ e(qr, { on: X, label: "TP/SL", onToggle: () => fe(!X) }),
            D === "twap" && /* @__PURE__ */ e(qr, { on: I, label: "Randomize", onToggle: () => q(!I) }),
            /* @__PURE__ */ e("button", { class: "linkbtn adv", "aria-expanded": Xs, "aria-controls": "se-adv", disabled: ve, onClick: () => be(!j), children: [
              "Advanced options ",
              /* @__PURE__ */ e(Rr, { size: 10 })
            ] })
          ] }),
          Xs && /* @__PURE__ */ e("div", { class: "checks", id: "se-adv", children: [
            /* @__PURE__ */ e(qr, { on: ve, label: "Reduce Only", onToggle: () => G(!ve) }),
            /* @__PURE__ */ e("span", { class: "helper", children: "Only shrinks an open position, never opens or flips one" })
          ] }),
          X && oi && /* @__PURE__ */ e("div", { class: "tpsl", children: [
            /* @__PURE__ */ e("div", { class: "field", children: [
              /* @__PURE__ */ e("label", { for: "se-tp", children: "TP" }),
              /* @__PURE__ */ e("input", { id: "se-tp", inputMode: "decimal", placeholder: "Take-profit price", value: Ce, onInput: (b) => Je(_e(b)) })
            ] }),
            /* @__PURE__ */ e("div", { class: "field", children: [
              /* @__PURE__ */ e("label", { for: "se-sl", children: "SL" }),
              /* @__PURE__ */ e("input", { id: "se-sl", inputMode: "decimal", placeholder: "Stop-loss price", value: nt, onInput: (b) => ft(_e(b)) })
            ] })
          ] }),
          zr && /* @__PURE__ */ e("div", { class: Fe > Math.abs(hn) + un / 2 ? "warn" : "note", children: zr }),
          Fs && /* @__PURE__ */ e("div", { class: "helper summary", children: Fs }),
          il,
          L && // The order result right where the user just clicked (a toast can be scrolled out of view in short hosts).
          /* @__PURE__ */ e("div", { class: `ticket-msg ${L.kind}`, role: "status", children: [
            L.kind === "ok" ? "✓ " : "",
            L.text
          ] }),
          ze && !ze.complete && /* @__PURE__ */ e("div", { class: "warn", children: [
            /* @__PURE__ */ e("b", { children: "Thin book:" }),
            " only ",
            ui(Number(ue(ze.filled, un || 1e-8, "floor"))),
            " of ",
            ui(Fe),
            " ",
            st,
            " can fill",
            ze.beyondBand ? ` within Strike's ${(Tr * 100).toFixed(0)}% price band around the mark` : " from the visible book",
            "; the rest may not fill."
          ] }),
          Ui && /* @__PURE__ */ e("div", { class: "warn", children: [
            /* @__PURE__ */ e("b", { children: "Order book unavailable:" }),
            " slippage can't be estimated right now. Click again to send anyway, or wait a moment."
          ] }),
          ze && ze.complete && ze.slippage > Oa && /* @__PURE__ */ e("div", { class: "warn", children: [
            /* @__PURE__ */ e("b", { children: "Slippage:" }),
            " this size moves through the book, est. ",
            (ze.slippage * 100).toFixed(2),
            "% from the mark price (avg ≈ ",
            we(ze.avgPrice, vt),
            ").",
            Os ? " Click again to confirm." : ""
          ] }),
          kt && kt.liquidationDistance < 0.1 && !ve && /* @__PURE__ */ e("div", { class: "warn", children: [
            /* @__PURE__ */ e("b", { children: "High risk:" }),
            " the estimated liquidation price is only ",
            (kt.liquidationDistance * 100).toFixed(1),
            "% away. Consider lower leverage."
          ] }),
          /* @__PURE__ */ e("div", { class: "details", children: [
            /* @__PURE__ */ e(
              Ee,
              {
                k: D === "market" && ze ? "Est. Fill Price" : D === "stop" ? "Trigger" : "Est. Entry",
                hint: sl[D],
                v: /* @__PURE__ */ e("span", { class: "num", children: ze ? we(ze.avgPrice, vt) : Re ? we(Re, vt) : "—" })
              }
            ),
            ze && /* @__PURE__ */ e(Ee, { k: "Est. Slippage", hint: "Average fill vs the mark price, from the live book", v: /* @__PURE__ */ e("span", { class: `num ${ze.slippage > Oa ? "neg" : ""}`, children: [
              (ze.slippage * 100).toFixed(2),
              "%"
            ] }) }),
            D === "twap" && /* @__PURE__ */ e(Ee, { k: "Duration", v: /* @__PURE__ */ e("span", { class: "num", children: Kt >= vi && Kt <= ki ? Wr(Kt / 60) : "—" }) }),
            /* @__PURE__ */ e(
              Ee,
              {
                k: "Liq. price (worst case)",
                info: ci === "isolated" ? "If the price reaches this, the position is closed and you lose its margin. Estimated for this position alone, backed by size ÷ leverage of margin; fees and funding move it slightly. The position card shows Strike's actual price once it's open." : "If the price reaches this, the position is closed and you lose its margin. Worst case: it assumes this position alone, backed only by size ÷ leverage. In cross margin your whole balance backs it, so Strike's actual price (shown on the position card) is usually further away.",
                v: /* @__PURE__ */ e("span", { class: "num", children: kt && !ve ? we(kt.liquidationPrice, vt) : "—" })
              }
            ),
            /* @__PURE__ */ e(Ee, { k: "Margin", info: "The part of your balance set aside for this position: size ÷ leverage.", v: /* @__PURE__ */ e("span", { class: "num", children: kt ? ge(kt.margin) : "—" }) }),
            /* @__PURE__ */ e(Ee, { k: "Order Size", v: /* @__PURE__ */ e("span", { class: "num", children: Fe ? `${ui(Fe)} ${st}` : "—" }) }),
            /* @__PURE__ */ e(
              Ee,
              {
                k: "Fees",
                info: `Paid when the order fills: Strike's taker fee ${(u * 100).toFixed(3)}% + builder fee ${(Ri / 100).toFixed(2)}% (${t.builderCode}), on the order's size.`,
                v: /* @__PURE__ */ e("span", { class: "num", children: kt ? ge(kt.totalFee, { decimals: kt.totalFee < 0.1 ? 4 : 2 }) : "—" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ e("div", { class: "lower", children: [
          /* @__PURE__ */ e("div", { class: "tabs", role: "tablist", "aria-label": "Account panels", children: al.map(([b, V]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": $t === b, class: `tab${$t === b ? " on" : ""}`, onClick: () => wn(b), children: V }, b)) }),
          /* @__PURE__ */ e("div", { class: "list", role: "tabpanel", children: [
            $t === "positions" && (C ? /* @__PURE__ */ e(
              id,
              {
                positions: B,
                marks: Es,
                ticks: _r,
                busy: It,
                flash: Ii,
                note: Yo,
                confirming: Et?.startsWith("close:") ? Number(Et.slice(6)) : null,
                onAsk: (b) => ht(b ? `close:${b.id}` : null),
                onClose: Xo,
                closeText: (b) => Cl({ size: Number(b.size), base: b.symbol.split("-")[0], mark: Es[b.symbol] ?? Number(b.entry_price), upnl: Number(b.upnl) })
              }
            ) : di("positions")),
            $t === "orders" && (C ? /* @__PURE__ */ e(R, { children: [
              M.length > 0 && /* @__PURE__ */ e("div", { class: "list-h", children: [
                /* @__PURE__ */ e("span", { class: "muted", children: [
                  M.length,
                  " open"
                ] }),
                /* @__PURE__ */ e("button", { class: "mini", disabled: It.has("cancelall"), onClick: () => ht(Et === "cancelall" ? null : "cancelall"), "aria-expanded": Et === "cancelall", children: It.has("cancelall") ? /* @__PURE__ */ e(Bt, {}) : "Cancel all" })
              ] }),
              Et === "cancelall" && M.length > 0 && /* @__PURE__ */ e(
                Qi,
                {
                  actions: /* @__PURE__ */ e(R, { children: [
                    /* @__PURE__ */ e("button", { class: "mini", onClick: () => ht(null), children: "Keep" }),
                    pi > 0 && pi < M.length && /* @__PURE__ */ e("button", { class: "mini go", onClick: () => js(s), children: [
                      s,
                      " (",
                      pi,
                      ")"
                    ] }),
                    /* @__PURE__ */ e("button", { class: "mini danger", onClick: () => js(pi === M.length ? s : void 0), children: pi === M.length ? `Cancel ${M.length}` : `All markets (${M.length})` })
                  ] }),
                  children: "Cancel open orders? Positions stay open; TWAPs are cancelled separately."
                }
              ),
              /* @__PURE__ */ e(sd, { orders: M, ticks: _r, busy: It, onCancel: Zo })
            ] }) : di("open orders")),
            $t === "twap" && (C ? /* @__PURE__ */ e(dd, { twaps: P, busy: It, onCancel: Jo }) : di("TWAP orders")),
            $t === "history" && (C ? /* @__PURE__ */ e(ud, { client: n, ticks: _r }, C.accountId) : di("trade history")),
            $t === "account" && /* @__PURE__ */ e(R, { children: [
              C ? /* @__PURE__ */ e(R, { children: [
                /* @__PURE__ */ e(xd, { client: n, account: $ }, C.accountId),
                /* @__PURE__ */ e("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "4px" }, children: [
                  /* @__PURE__ */ e("button", { class: "cta", style: { minHeight: "34px", fontSize: "13px" }, onClick: Nr, children: "Deposit ADA" }),
                  /* @__PURE__ */ e("button", { class: "cta ghost", style: { minHeight: "34px", fontSize: "13px" }, disabled: Vt < jt, onClick: () => Gs("withdraw"), children: "Withdraw" })
                ] }),
                $ && Vt < jt && /* @__PURE__ */ e("div", { class: "helper", style: { textAlign: "right" }, children: [
                  "Minimum ",
                  ge(jt, { decimals: 0 }),
                  " to withdraw"
                ] }),
                kr && n.referralLink() && /* @__PURE__ */ e("div", { class: "note", children: [
                  "Save on Strike's trading fees: apply referral code ",
                  /* @__PURE__ */ e("b", { children: t.referralCode }),
                  ".",
                  " ",
                  /* @__PURE__ */ e("a", { class: "linkbtn", href: n.referralLink(), target: "_blank", rel: "noopener", children: "Apply on Strike ↗" })
                ] }),
                /* @__PURE__ */ e("a", { class: "linkbtn", style: { fontSize: "12px", justifySelf: "end" }, href: n.appUrl("/portfolio"), target: "_blank", rel: "noopener", children: "Full account on Strike ↗" })
              ] }) : di("balance and account metrics"),
              /* @__PURE__ */ e(vd, { client: n })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ e("div", { class: "foot", children: [
          /* @__PURE__ */ e("span", { class: "acct", children: [
            /* @__PURE__ */ e("span", { class: `dot${n.net.network === "testnet" ? " test" : ""}` }),
            n.net.network === "testnet" ? "Testnet" : "Mainnet"
          ] }),
          C && /* @__PURE__ */ e("span", { class: "acct", children: [
            "· ",
            /* @__PURE__ */ e("span", { class: "num", title: C.address, children: Qt(C.address, 9, 4) }),
            /* @__PURE__ */ e("button", { class: "linkbtn", onClick: () => (n.disconnect(), Ne("ok", "Disconnected")), children: "Disconnect" })
          ] }),
          /* @__PURE__ */ e("span", { class: "brand", children: [
            "Powered by ",
            /* @__PURE__ */ e("a", { href: n.appUrl(), target: "_blank", rel: "noopener", children: /* @__PURE__ */ e("b", { children: "Strike" }) }),
            " · via ",
            t.builderCode
          ] })
        ] }),
        Rt && /* @__PURE__ */ e("div", { class: `toast ${Rt.kind}`, role: "status", children: [
          /* @__PURE__ */ e("span", { children: Rt.text }),
          /* @__PURE__ */ e("button", { class: "x", onClick: () => _n(null), "aria-label": "Dismiss", children: "×" })
        ] }),
        Ye === "connect" && /* @__PURE__ */ e(
          Eo,
          {
            client: n,
            onClose: () => it(null),
            onConnected: () => {
              n.wallet && Cd(Fa, n.wallet.id), it(null), Ne("ok", "Wallet connected. Your trades run on Strike.");
            }
          }
        ),
        Ye === "deposit" && /* @__PURE__ */ e(
          td,
          {
            client: n,
            adaPrice: o["ADA-USD"]?.mark ?? 0,
            isNewAccount: Ko,
            startBalance: Number($?.wallet_balance ?? 0),
            onClose: () => it(null),
            onCredited: () => (zt(), Ne("ok", "Deposit credited"))
          }
        ),
        Ye === "withdraw" && /* @__PURE__ */ e(
          nd,
          {
            client: n,
            available: Vt,
            adaPrice: o["ADA-USD"]?.mark ?? 0,
            startBalance: Number($?.wallet_balance ?? 0),
            onClose: () => it(null),
            onDone: () => (zt(), Ne("ok", "Withdrawal processed"))
          }
        )
      ]
    }
  );
}
const Md = /* @__PURE__ */ new Set(["ADA", "BNB", "BTC", "ETH", "HYPE", "NEAR", "NIGHT", "PUMP", "SOL", "XRP", "ZEC", "DOGE", "SUI", "AVAX", "LINK", "LTC", "TRX", "SNEK"]), zd = /* @__PURE__ */ new Set(["BTC", "ETH", "SOL", "BNB", "XRP"]), Td = /* @__PURE__ */ new Set(["ADA", "NIGHT", "SNEK"]), Nd = /* @__PURE__ */ new Set(["XAU", "XAG", "WTI", "BRENT", "NATGAS", "COPPER"]), Pd = /* @__PURE__ */ new Set(["NAS100", "SP500", "US30", "DJI", "SPX", "NDX"]);
function Un(t) {
  const n = t.toUpperCase();
  return Md.has(n) ? "crypto" : Nd.has(n) ? "commodity" : Pd.has(n) ? "index" : "stock";
}
const Ad = 864e5, Mn = [
  { id: "blue", label: "Blue Chips", icon: "bulb", test: (t) => zd.has(t) },
  { id: "cardano", label: "Cardano", icon: "ada", test: (t) => Td.has(t) },
  // Strike's equity perps include listed stocks, an ETF and private companies (e.g. SpaceX), hence not "Stocks".
  { id: "stocks", label: "Equities", icon: "building", test: (t) => Un(t) === "stock" },
  { id: "indices", label: "Indices", icon: "chart", test: (t) => Un(t) === "index" },
  { id: "commodities", label: "Commodities", icon: "cube", test: (t) => Un(t) === "commodity" },
  { id: "crypto", label: "Crypto", icon: "coins", test: (t) => Un(t) === "crypto" },
  { id: "gainers", label: "Gainers", icon: "up", test: (t, n) => n.change > 0, sort: "change" },
  { id: "losers", label: "Losers", icon: "down", test: (t, n) => n.change < 0, sort: "-change" },
  { id: "new", label: "New", icon: "sparkle", test: (t, n) => n.createdAt > 0 && Date.now() - n.createdAt < 60 * Ad, sort: "new" }
];
function Ld(t, n) {
  return (t || "").replace(/\s*\/\s*USD.*$/i, "").trim() || n;
}
const Ba = "https://app.strikefinance.org/images/";
function Ed(t) {
  const n = encodeURIComponent(t.toLowerCase());
  return [`${Ba}${n}.webp`, `${Ba}${n}.svg`];
}
const Ra = ["#4efab0", "#7aa2ff", "#f8931a", "#c084fc", "#38bdf8", "#facc15", "#fb7185"];
function Id(t) {
  return Ra[[...t].reduce((n, i) => n + i.charCodeAt(0), 0) % Ra.length];
}
function An(t) {
  return !Number.isFinite(t) || t <= 0 ? "$0" : "$" + t.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: t >= 1e3 ? 1 : 0 });
}
function Y(t, n) {
  if (!Number.isFinite(t) || t <= 0) return "—";
  const i = n ? Math.max(0, Math.min(8, Fd(n))) : t >= 1e3 ? 2 : t >= 1 ? 4 : 5;
  return "$" + t.toLocaleString("en-US", { minimumFractionDigits: i, maximumFractionDigits: i });
}
function Fd(t) {
  const n = t.toString();
  return n.includes("e-") ? Number(n.split("e-")[1]) : (n.split(".")[1] ?? "").length;
}
function pe(t) {
  if (!Number.isFinite(t)) return "—";
  const n = Math.abs(t);
  return t.toLocaleString("en-US", n >= 1e3 ? { maximumFractionDigits: 0 } : n >= 1 ? { maximumFractionDigits: 4 } : { maximumSignificantDigits: 4 });
}
function H(t, n = {}) {
  if (!Number.isFinite(t)) return "—";
  const i = n.decimals ?? 2, r = Math.abs(t).toLocaleString("en-US", { minimumFractionDigits: i, maximumFractionDigits: i });
  return `${t < 0 ? "-" : n.sign && t > 0 ? "+" : ""}$${r}`;
}
function dt(t, n = 2) {
  return Number.isFinite(t) ? `${t > 0 ? "+" : ""}${t.toFixed(n)}%` : "—";
}
function rn(t) {
  return new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function sn(t) {
  return new Date(t).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}
function ks(t) {
  const n = Math.max(0, Math.floor((t - Date.now()) / 1e3)), i = Math.floor(n / 60), r = Math.floor(i / 60);
  return r > 0 ? `${r}h ${String(i % 60).padStart(2, "0")}m` : `${i}m ${String(n % 60).padStart(2, "0")}s`;
}
const de = { fill: "none", stroke: "currentColor", "stroke-width": 1.8, "stroke-linecap": "round", "stroke-linejoin": "round" }, Dd = {
  x: /* @__PURE__ */ e("path", { ...de, d: "M6 6l12 12M18 6 6 18" }),
  back: /* @__PURE__ */ e("path", { ...de, d: "M15 5l-7 7 7 7" }),
  right: /* @__PURE__ */ e("path", { ...de, d: "M9 5l7 7-7 7" }),
  down: /* @__PURE__ */ e("path", { ...de, d: "M6 9l6 6 6-6" }),
  up: /* @__PURE__ */ e("path", { ...de, d: "M6 15l6-6 6 6" }),
  search: /* @__PURE__ */ e(R, { children: [
    /* @__PURE__ */ e("circle", { ...de, cx: "11", cy: "11", r: "6.5" }),
    /* @__PURE__ */ e("path", { ...de, d: "M16 16l4 4" })
  ] }),
  clock: /* @__PURE__ */ e(R, { children: [
    /* @__PURE__ */ e("circle", { ...de, cx: "12", cy: "12", r: "8" }),
    /* @__PURE__ */ e("path", { ...de, d: "M12 8v4.5l3 2" })
  ] }),
  sliders: /* @__PURE__ */ e("path", { ...de, d: "M6 4v6m0 4v6M12 4v2m0 4v10M18 4v9m0 4v3M4 12h4M10 8h4M16 15h4" }),
  plus: /* @__PURE__ */ e("path", { ...de, d: "M12 5v14M5 12h14" }),
  minus: /* @__PURE__ */ e("path", { ...de, d: "M5 12h14" }),
  check: /* @__PURE__ */ e("path", { ...de, d: "M5 12.5l4.5 4.5L19 7.5" }),
  info: /* @__PURE__ */ e(R, { children: [
    /* @__PURE__ */ e("circle", { ...de, cx: "12", cy: "12", r: "8" }),
    /* @__PURE__ */ e("path", { ...de, d: "M12 11v5" }),
    /* @__PURE__ */ e("circle", { cx: "12", cy: "8", r: "1.1", fill: "currentColor" })
  ] }),
  warn: /* @__PURE__ */ e(R, { children: [
    /* @__PURE__ */ e("path", { ...de, d: "M12 4 3 20h18L12 4z" }),
    /* @__PURE__ */ e("path", { ...de, d: "M12 10v4.5" }),
    /* @__PURE__ */ e("circle", { cx: "12", cy: "17.2", r: "1.1", fill: "currentColor" })
  ] }),
  candles: /* @__PURE__ */ e("path", { ...de, d: "M7 4v3m0 8v5M17 4v5m0 8v3M5 7h4v8H5zM15 9h4v8h-4z" }),
  line: /* @__PURE__ */ e("path", { ...de, d: "M3 17l5-6 4 4 8-9" }),
  bulb: /* @__PURE__ */ e("path", { ...de, d: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" }),
  ada: /* @__PURE__ */ e(R, { children: [
    /* @__PURE__ */ e("circle", { ...de, cx: "12", cy: "12", r: "2.6" }),
    /* @__PURE__ */ e("circle", { cx: "12", cy: "4.5", r: "1.3", fill: "currentColor" }),
    /* @__PURE__ */ e("circle", { cx: "12", cy: "19.5", r: "1.3", fill: "currentColor" }),
    /* @__PURE__ */ e("circle", { cx: "5.5", cy: "8.2", r: "1.3", fill: "currentColor" }),
    /* @__PURE__ */ e("circle", { cx: "18.5", cy: "8.2", r: "1.3", fill: "currentColor" }),
    /* @__PURE__ */ e("circle", { cx: "5.5", cy: "15.8", r: "1.3", fill: "currentColor" }),
    /* @__PURE__ */ e("circle", { cx: "18.5", cy: "15.8", r: "1.3", fill: "currentColor" })
  ] }),
  building: /* @__PURE__ */ e("path", { ...de, d: "M4 20h16M6 20V9l6-4 6 4v11M10 20v-5h4v5M9 11h.01M15 11h.01" }),
  chart: /* @__PURE__ */ e("path", { ...de, d: "M4 19h16M5 15l4-4 3 3 6-7" }),
  cube: /* @__PURE__ */ e("path", { ...de, d: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM4 7.5l8 4.5 8-4.5M12 12v9" }),
  coins: /* @__PURE__ */ e(R, { children: [
    /* @__PURE__ */ e("ellipse", { ...de, cx: "9", cy: "8", rx: "5", ry: "2.6" }),
    /* @__PURE__ */ e("path", { ...de, d: "M4 8v4c0 1.4 2.2 2.6 5 2.6M14 8v1.5" }),
    /* @__PURE__ */ e("ellipse", { ...de, cx: "15", cy: "14", rx: "5", ry: "2.6" }),
    /* @__PURE__ */ e("path", { ...de, d: "M10 14v3.4c0 1.4 2.2 2.6 5 2.6s5-1.2 5-2.6V14" })
  ] }),
  sparkle: /* @__PURE__ */ e("path", { ...de, d: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM18.5 16l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" }),
  arrowUp: /* @__PURE__ */ e("path", { ...de, d: "M12 19V5m0 0-6 6m6-6 6 6" }),
  arrowDown: /* @__PURE__ */ e("path", { ...de, d: "M12 5v14m0 0-6-6m6 6 6-6" }),
  chat: /* @__PURE__ */ e("path", { ...de, d: "M5 5h14v10H9l-4 4V5z" }),
  book: /* @__PURE__ */ e("path", { ...de, d: "M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4V4zM5 16a4 4 0 0 1 4-4h10" }),
  shield: /* @__PURE__ */ e("path", { ...de, d: "M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" }),
  wallet: /* @__PURE__ */ e("path", { ...de, d: "M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1V7zm0 0 11-3v3M16 13.5h.01" }),
  swap: /* @__PURE__ */ e("path", { ...de, d: "M5 8h13l-3-3M19 16H6l3 3" }),
  close: /* @__PURE__ */ e("path", { ...de, d: "M6 6l12 12M18 6 6 18" }),
  more: /* @__PURE__ */ e(R, { children: [
    /* @__PURE__ */ e("circle", { cx: "6", cy: "12", r: "1.5", fill: "currentColor" }),
    /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "1.5", fill: "currentColor" }),
    /* @__PURE__ */ e("circle", { cx: "18", cy: "12", r: "1.5", fill: "currentColor" })
  ] }),
  bolt: /* @__PURE__ */ e("path", { ...de, d: "M13 3 5 14h6l-1 7 8-11h-6l1-7z" }),
  star: /* @__PURE__ */ e("path", { ...de, d: "m12 3.5 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8L12 3.5z" }),
  ext: /* @__PURE__ */ e("path", { ...de, d: "M14 5h5v5M19 5l-8 8M17 14v5H5V7h5" })
};
function K({ n: t, size: n = 20, cls: i }) {
  return /* @__PURE__ */ e("svg", { class: i, width: n, height: n, viewBox: "0 0 24 24", "aria-hidden": "true", children: Dd[t] ?? null });
}
function _t({ base: t, size: n = 40, rank: i }) {
  const r = Ed(t), [s, a] = m(0);
  return Z(() => a(0), [t]), /* @__PURE__ */ e("span", { class: "pa-coin", style: { width: `${n}px`, height: `${n}px` }, children: [
    s < r.length ? /* @__PURE__ */ e("img", { src: r[s], alt: "", width: n, height: n, loading: "lazy", decoding: "async", referrerpolicy: "no-referrer", onError: () => a(s + 1) }) : /* @__PURE__ */ e("span", { class: "pa-mono", style: { background: Id(t), fontSize: `${Math.round(n * 0.34)}px` }, children: t.slice(0, t.length > 4 ? 2 : 3) }),
    i ? /* @__PURE__ */ e("span", { class: `pa-rank r${i}`, children: i }) : null
  ] });
}
function tt({ n: t, label: n, onClick: i, cls: r }) {
  return /* @__PURE__ */ e("button", { class: `pa-round ${r ?? ""}`, "aria-label": n, title: n, onClick: i, children: /* @__PURE__ */ e(K, { n: t, size: 20 }) });
}
function Ze({ size: t = 16 }) {
  return /* @__PURE__ */ e("span", { class: "pa-spin", style: { width: `${t}px`, height: `${t}px` }, "aria-label": "Loading" });
}
function Oe({
  title: t,
  onClose: n,
  onBack: i,
  onDone: r,
  doneDisabled: s,
  children: a,
  tall: o
}) {
  const l = De(null);
  return Z(() => {
    l.current?.focus();
  }, []), /* @__PURE__ */ e("div", { class: "pa-scrim", onClick: (d) => d.target === d.currentTarget && n(), children: /* @__PURE__ */ e("div", { class: `pa-sheet${o ? " tall" : ""}`, role: "dialog", "aria-modal": "true", "aria-label": t, tabIndex: -1, ref: l, onKeyDown: (d) => d.key === "Escape" && (d.stopPropagation(), n()), children: [
    /* @__PURE__ */ e("div", { class: "pa-sheet-h", children: [
      i ? /* @__PURE__ */ e(tt, { n: "back", label: "Back", onClick: i }) : /* @__PURE__ */ e(tt, { n: "x", label: "Close", onClick: n }),
      /* @__PURE__ */ e("div", { class: "t", children: t }),
      r ? /* @__PURE__ */ e("button", { class: "pa-round done", "aria-label": "Apply", disabled: s, onClick: r, children: /* @__PURE__ */ e(K, { n: "check", size: 20 }) }) : /* @__PURE__ */ e("span", { class: "pa-round ghost" })
    ] }),
    /* @__PURE__ */ e("div", { class: "pa-sheet-b", children: a })
  ] }) });
}
function Te({ children: t, cls: n }) {
  return /* @__PURE__ */ e("div", { class: `pa-group ${n ?? ""}`, children: t });
}
function Q({
  k: t,
  sub: n,
  v: i,
  vsub: r,
  vcls: s,
  onClick: a,
  chevron: o,
  info: l
}) {
  const d = /* @__PURE__ */ e(R, { children: [
    /* @__PURE__ */ e("span", { class: "l", children: [
      /* @__PURE__ */ e("span", { class: "k", children: [
        t,
        l && /* @__PURE__ */ e(
          "span",
          {
            class: "pa-i",
            role: "button",
            tabIndex: 0,
            "aria-label": "More info",
            onClick: (p) => (p.stopPropagation(), l()),
            onKeyDown: (p) => (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.stopPropagation(), l()),
            children: /* @__PURE__ */ e(K, { n: "info", size: 15 })
          }
        )
      ] }),
      n !== void 0 && /* @__PURE__ */ e("span", { class: "s", children: n })
    ] }),
    /* @__PURE__ */ e("span", { class: `r ${s ?? ""}`, children: [
      i !== void 0 && /* @__PURE__ */ e("span", { class: "v", children: i }),
      r !== void 0 && /* @__PURE__ */ e("span", { class: "vs", children: r })
    ] }),
    o && /* @__PURE__ */ e(K, { n: o, size: 18, cls: "chev" })
  ] });
  return a ? /* @__PURE__ */ e("button", { class: "pa-row", onClick: a, children: d }) : /* @__PURE__ */ e("div", { class: "pa-row", children: d });
}
function Od({ onKey: t }) {
  return Z(() => {
    const i = (r) => {
      (r.composedPath?.()[0] ?? r.target)?.closest?.("input, textarea, select, [contenteditable]") || r.ctrlKey || r.metaKey || r.altKey || (/^[0-9]$/.test(r.key) || r.key === "." || r.key === "," ? t(r.key === "," ? "." : r.key) : r.key === "Backspace" && t("del"));
    };
    return window.addEventListener("keydown", i, !0), () => window.removeEventListener("keydown", i, !0);
  }, [t]), /* @__PURE__ */ e("div", { class: "pa-keypad", children: ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "del"].map((i) => /* @__PURE__ */ e("button", { "aria-label": i === "del" ? "Delete" : i, onClick: () => t(i), children: i === "del" ? /* @__PURE__ */ e(K, { n: "back", size: 22 }) : i }, i)) });
}
function Bd(t, n, i = 2) {
  if (n === "del") return t.slice(0, -1);
  if (n === ".") return t.includes(".") || i === 0 ? t : (t || "0") + ".";
  const r = t.indexOf(".");
  return r >= 0 && t.length - r - 1 >= i || t.replace(".", "").length >= 12 ? t : t === "0" ? n : t + n;
}
function Rd({ toast: t, onDismiss: n }) {
  return t ? /* @__PURE__ */ e("div", { class: `pa-banner ${t.kind}`, role: t.kind === "err" ? "alert" : "status", children: [
    /* @__PURE__ */ e("span", { class: "ic", children: t.kind === "progress" ? /* @__PURE__ */ e(Ze, { size: 18 }) : t.kind === "ok" ? /* @__PURE__ */ e(K, { n: "check", size: 16 }) : /* @__PURE__ */ e(K, { n: "warn", size: 15 }) }),
    /* @__PURE__ */ e("span", { class: "tx", children: [
      /* @__PURE__ */ e("b", { children: t.title }),
      t.text && /* @__PURE__ */ e("span", { children: t.text }),
      t.kind === "err" && /* @__PURE__ */ e("button", { class: "ok", onClick: n, children: "OK" })
    ] }),
    t.kind === "ok" && /* @__PURE__ */ e("button", { class: "x", "aria-label": "Dismiss", onClick: n, children: /* @__PURE__ */ e(K, { n: "x", size: 14 }) })
  ] }) : null;
}
function Ni({ min: t, max: n, value: i, onChange: r, label: s, marks: a, disabled: o }) {
  const l = Math.max(1e-9, n - t), d = Math.max(0, Math.min(100, (i - t) / l * 100));
  return /* @__PURE__ */ e("div", { class: `pa-slider${o ? " off" : ""}`, children: [
    /* @__PURE__ */ e("div", { class: "track" }),
    /* @__PURE__ */ e("div", { class: "fill", style: { width: `${d}%` } }),
    a?.map((p) => /* @__PURE__ */ e("span", { class: `mk${i >= p ? " on" : ""}`, style: { left: `${(p - t) / l * 100}%` } }, p)),
    /* @__PURE__ */ e("span", { class: "knob", style: { left: `${d}%` } }),
    /* @__PURE__ */ e("input", { type: "range", min: t, max: n, step: 1, value: i, "aria-label": s, disabled: o, onInput: (p) => r(Number(p.target.value)) })
  ] });
}
function cn(t, n) {
  try {
    if (n === void 0) return localStorage.getItem(`strike-everywhere:ui:${t}`);
    localStorage.setItem(`strike-everywhere:ui:${t}`, n);
  } catch {
  }
  return n ?? null;
}
function Fo({ steps: t }) {
  return /* @__PURE__ */ e("div", { class: "pa-steps", children: t.map((n, i) => /* @__PURE__ */ e("div", { class: `pa-step ${n.state}`, children: [
    /* @__PURE__ */ e("span", { class: "pa-sdot", children: n.state === "done" ? /* @__PURE__ */ e(K, { n: "check", size: 14 }) : n.state === "active" ? /* @__PURE__ */ e(Ze, { size: 14 }) : n.state === "error" ? /* @__PURE__ */ e(K, { n: "x", size: 12 }) : i + 1 }),
    /* @__PURE__ */ e("span", { class: "tx", children: [
      /* @__PURE__ */ e("b", { children: n.label }),
      n.sub && /* @__PURE__ */ e("span", { children: n.sub })
    ] })
  ] }, i)) });
}
function Do({ client: t, lines: n }) {
  const i = en(() => Li.wallets().find((s) => s.id === t.wallet?.id), [t.wallet?.id]), r = i?.name ?? t.wallet?.name ?? "your wallet";
  return /* @__PURE__ */ e("div", { class: "pa-wait", role: "status", children: [
    /* @__PURE__ */ e("span", { class: "ring", children: i?.icon ? /* @__PURE__ */ e("img", { src: i.icon, alt: "" }) : /* @__PURE__ */ e(K, { n: "wallet", size: 26 }) }),
    /* @__PURE__ */ e("b", { children: [
      "Check ",
      r
    ] }),
    /* @__PURE__ */ e("span", { children: [
      "Approve the request in the ",
      r,
      " window to continue. If you don't see it, click the ",
      r,
      " icon in your browser's toolbar."
    ] }),
    n.length > 0 && /* @__PURE__ */ e("ol", { children: n.map((s) => /* @__PURE__ */ e("li", { children: s }, s)) })
  ] });
}
function qd({ children: t }) {
  return /* @__PURE__ */ e("div", { class: "pa-safe", children: [
    /* @__PURE__ */ e(K, { n: "shield", size: 18 }),
    /* @__PURE__ */ e("span", { children: t })
  ] });
}
function Oo({ value: t, onInput: n, unit: i, label: r, sub: s }) {
  return /* @__PURE__ */ e("label", { class: "pa-bigin", children: [
    /* @__PURE__ */ e("span", { class: "pa-bigrow", children: [
      i === "$" && /* @__PURE__ */ e("span", { class: "u", children: "$" }),
      /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: "0", value: t, "aria-label": r, onInput: (a) => n(_e(a)), autoFocus: !0, style: { width: `${Math.max(1, t.length) * 0.62 + 0.3}em` } }),
      i !== "$" && /* @__PURE__ */ e("span", { class: "u", children: i })
    ] }),
    s && /* @__PURE__ */ e("span", { class: "sub", children: s })
  ] });
}
const Ud = (t) => t.net.network === "mainnet" ? "https://cardanoscan.io/transaction/" : "https://preprod.cardanoscan.io/transaction/";
function Hd({ client: t, adaPrice: n, isNewAccount: i, startBalance: r, onClose: s, onCredited: a }) {
  const o = i ? Wt : 5, l = (P) => n > 0 ? String(Math.ceil(P / n / 5) * 5) : "", [d, p] = m(() => l(i ? Wt * 1.05 : 25)), [u, c] = m("amount"), [h, g] = m(null), [f, y] = m(""), [k, _] = m(""), [w, z] = m(null), [C, v] = m(!1), $ = (Number(d) || 0) * n;
  Z(() => {
    t.wallet?.balanceLovelace().then((P) => z(Number(P) / 1e6)).catch(() => {
    });
  }, [t.wallet?.id]);
  const S = async () => {
    _(""), c("preparing");
    try {
      if (!t.wallet) throw new Error("Reconnect your wallet to add funds.");
      g(await t.prepareDeposit(Number(d))), c("review");
    } catch (P) {
      _(P instanceof gt ? `Safety check failed: ${P.message}` : P?.message || String(P)), c("amount");
    }
  }, B = async () => {
    if (h) {
      _(""), c("signing");
      try {
        const { txHash: P } = await t.confirmDeposit(h);
        y(P), c("crediting");
      } catch (P) {
        if (P instanceof gr) {
          y(P.txHash), _(P.message), c("registering");
          return;
        }
        _(P instanceof gt ? `Safety check failed: ${String(P?.message)}` : Xn(P)), c("review");
      }
    }
  }, x = async () => {
    if (!(!h || !f)) {
      _("");
      try {
        await t.retryDepositRegistration(h.requestId, f), c("crediting");
      } catch (P) {
        _(P?.message || String(P));
      }
    }
  };
  Z(() => {
    if (u !== "crediting") return;
    const P = setTimeout(() => v(!0), 15 * 6e4), ie = setInterval(async () => {
      try {
        const F = await t.account.account();
        Number(F.wallet_balance) > r + Math.max(0.5, (h?.usdValue ?? 0) * 0.5) && (c("done"), a());
      } catch {
      }
    }, 8e3);
    return () => (clearInterval(ie), clearTimeout(P));
  }, [u]);
  const M = u === "signing" || u === "registering", T = [25, 50, 100, 250].filter((P) => P >= o || P === 100);
  return /* @__PURE__ */ e(Oe, { title: "Add funds", onClose: () => !M && s(), tall: !0, children: [
    (u === "amount" || u === "preparing") && /* @__PURE__ */ e(R, { children: [
      /* @__PURE__ */ e(Oo, { value: d, onInput: p, unit: "ADA", label: "Amount of ADA to add", sub: /* @__PURE__ */ e("span", { class: "num", children: [
        "≈ ",
        H($),
        w !== null ? ` · ${w.toLocaleString("en-US", { maximumFractionDigits: 2 })} ADA in your wallet` : ""
      ] }) }),
      /* @__PURE__ */ e("div", { class: "pa-pcts four", children: T.map((P) => /* @__PURE__ */ e("button", { class: "pa-btn dark", onClick: () => p(l(P)), children: [
        "$",
        P
      ] }, P)) }),
      /* @__PURE__ */ e("p", { class: "pa-p sm", children: [
        "Your ADA goes to Strike and is credited as USD margin.",
        " ",
        i ? `Strike asks new accounts for a first deposit of at least $${Wt}; after that, from $5.` : "Minimum $5."
      ] }),
      k && /* @__PURE__ */ e("div", { class: "pa-warn", children: [
        /* @__PURE__ */ e(K, { n: "warn", size: 16 }),
        k
      ] }),
      /* @__PURE__ */ e("button", { class: "pa-btn primary big", disabled: !($ >= o) || u === "preparing" || w !== null && Number(d) > w, onClick: S, children: u === "preparing" ? /* @__PURE__ */ e(R, { children: [
        /* @__PURE__ */ e(Ze, { size: 16 }),
        " Building transaction…"
      ] }) : w !== null && Number(d) > w ? "More than your wallet holds" : $ >= o ? "Review" : `Minimum ${H(o, { decimals: 0 })}` })
    ] }),
    h && u !== "amount" && u !== "preparing" && /* @__PURE__ */ e(R, { children: [
      u === "review" && /* @__PURE__ */ e(R, { children: [
        /* @__PURE__ */ e("div", { class: "pa-amount-sum", children: [
          /* @__PURE__ */ e("b", { class: "num", children: [
            Ke(h.lovelace).toLocaleString("en-US"),
            " ADA"
          ] }),
          /* @__PURE__ */ e("span", { class: "num", children: [
            "≈ ",
            H(h.usdValue),
            " credited"
          ] })
        ] }),
        /* @__PURE__ */ e(Te, { children: [
          /* @__PURE__ */ e(Q, { k: "To", v: /* @__PURE__ */ e("span", { class: "num", children: [
            "Strike · ",
            Qt(h.destination.address, 8, 6)
          ] }) }),
          h.forwardingCost > 0n && /* @__PURE__ */ e(Q, { k: "Strike forwarding", sub: "Strike's deposit hop to its vault", v: /* @__PURE__ */ e("span", { class: "num", children: [
            Ke(h.forwardingCost).toFixed(2),
            " ADA"
          ] }) }),
          /* @__PURE__ */ e(Q, { k: "Network fee", v: /* @__PURE__ */ e("span", { class: "num", children: [
            Ke(h.networkFee).toFixed(3),
            " ADA"
          ] }) }),
          /* @__PURE__ */ e(Q, { k: "Cardano confirmations", v: String(h.confirmationsRequired) })
        ] }),
        /* @__PURE__ */ e(qd, { children: [
          /* @__PURE__ */ e("b", { children: "Checked before you sign:" }),
          " exactly ",
          Ke(h.destination.lovelace),
          " ADA leaves your wallet in one output",
          h.forwardingCost > 0n ? ` (${Ke(h.lovelace)} credited plus ${Ke(h.forwardingCost)} for Strike's forwarding)` : "",
          ", no tokens move, your change comes back to you, and the deposit is tagged for your Strike account."
        ] }),
        k && /* @__PURE__ */ e("div", { class: "pa-warn", children: [
          /* @__PURE__ */ e(K, { n: "warn", size: 16 }),
          k
        ] }),
        /* @__PURE__ */ e("button", { class: "pa-btn primary big", onClick: B, children: "Confirm in wallet" }),
        /* @__PURE__ */ e("button", { class: "pa-foot-link c", onClick: () => (g(null), c("amount")), children: "Change amount" })
      ] }),
      u === "signing" && /* @__PURE__ */ e(Do, { client: t, lines: ["Sign the deposit transaction"] }),
      (u === "registering" || u === "crediting" || u === "done") && /* @__PURE__ */ e(R, { children: [
        /* @__PURE__ */ e("div", { class: "pa-amount-sum", children: [
          /* @__PURE__ */ e("b", { class: "num", children: [
            Ke(h.lovelace).toLocaleString("en-US"),
            " ADA"
          ] }),
          /* @__PURE__ */ e("span", { class: "num", children: [
            "≈ ",
            H(h.usdValue)
          ] })
        ] }),
        /* @__PURE__ */ e(
          Fo,
          {
            steps: [
              { label: "Signed in your wallet", state: "done" },
              {
                label: "Registered with Strike",
                sub: u === "registering" ? "Your ADA is on-chain; Strike hasn't confirmed the request yet." : void 0,
                state: u === "registering" ? "error" : "done"
              },
              {
                label: "Confirming on Cardano",
                sub: f ? /* @__PURE__ */ e("a", { href: Ud(t) + f, target: "_blank", rel: "noopener", children: "View transaction ↗" }) : void 0,
                state: u === "crediting" ? "active" : u === "done" ? "done" : "todo"
              },
              { label: "Credited to your Perps balance", state: u === "done" ? "done" : "todo" }
            ]
          }
        ),
        u === "registering" && /* @__PURE__ */ e(R, { children: [
          k && /* @__PURE__ */ e("div", { class: "pa-warn", children: [
            /* @__PURE__ */ e(K, { n: "warn", size: 16 }),
            k
          ] }),
          /* @__PURE__ */ e("button", { class: "pa-btn primary big", onClick: x, children: "Retry registering with Strike" })
        ] }),
        u === "crediting" && !C && /* @__PURE__ */ e("p", { class: "pa-p sm c", children: "This usually takes a few minutes. You can close this; your balance updates on its own." }),
        u === "crediting" && C && /* @__PURE__ */ e("div", { class: "pa-warn", children: [
          /* @__PURE__ */ e(K, { n: "warn", size: 16 }),
          "Strike hasn't credited this deposit yet. Your ADA is on-chain; crediting is handled by Strike. If it doesn't show up soon, contact Strike support with the transaction above."
        ] }),
        u === "done" ? /* @__PURE__ */ e("button", { class: "pa-btn primary big", onClick: s, children: "Start trading" }) : u === "crediting" && /* @__PURE__ */ e("button", { class: "pa-btn dark big", onClick: s, children: "Close" })
      ] })
    ] })
  ] });
}
function Wd({ client: t, available: n, adaPrice: i, startBalance: r, onClose: s, onDone: a }) {
  const [o, l] = m(""), [d, p] = m("amount"), [u, c] = m(null), [h, g] = m(""), [f, y] = m(!1), [k, _] = m({ maxUsd: null, minUsd: null });
  Z(() => {
    t.withdrawLimits().then(_).catch(() => {
    });
  }, [t]);
  const w = Number(o) || 0, z = Math.floor((k.maxUsd !== null ? Math.min(k.maxUsd, n) : n) * 100) / 100, C = Math.max(jt, k.minUsd ?? 0), v = i > 0 ? Math.max(0, w - 1) / i : 0, $ = async () => {
    g(""), p("quoting");
    try {
      if (!t.wallet) throw new Error("Reconnect your wallet to withdraw.");
      c(await t.prepareWithdrawal(w)), p("review");
    } catch (x) {
      g(x instanceof Pt ? `Safety check failed: ${x.message}` : x?.message || String(x)), p("amount");
    }
  }, S = async () => {
    if (u) {
      g(""), p("signing");
      try {
        await t.confirmWithdrawal(u), p("pending");
      } catch (x) {
        g(x instanceof Pt ? `Safety check failed: ${x.message}` : Xn(x)), p("review");
      }
    }
  };
  Z(() => {
    if (d !== "pending") return;
    const x = setInterval(async () => {
      try {
        const M = await t.account.account();
        Number(M.wallet_balance) < r - w * 0.5 && (p("done"), a());
      } catch {
      }
    }, 6e3);
    return () => clearInterval(x);
  }, [d]);
  const B = u ? u.asset === "USDM" ? `≈ ${H(Math.max(0, u.usdValue - u.fee))} in USDM` : `≈ ${v.toFixed(2)} ADA` : `≈ ${v.toFixed(2)} ADA`;
  return /* @__PURE__ */ e(Oe, { title: "Withdraw", onClose: () => d !== "signing" && s(), tall: !0, children: [
    (d === "amount" || d === "quoting") && /* @__PURE__ */ e(R, { children: [
      /* @__PURE__ */ e(Oo, { value: o, onInput: l, unit: "$", label: "Amount to withdraw in USD", sub: /* @__PURE__ */ e("span", { class: "num", children: w > 0 ? `You receive ${B}` : `Available ${H(n)}` }) }),
      /* @__PURE__ */ e("div", { class: "pa-pcts four", children: [0.25, 0.5, 0.75, 1].map((x) => /* @__PURE__ */ e("button", { class: "pa-btn dark", disabled: z < C, onClick: () => l(String(Math.floor(z * x * 100) / 100)), children: x === 1 ? "Max" : `${x * 100}%` }, x)) }),
      /* @__PURE__ */ e(Te, { children: [
        /* @__PURE__ */ e(Q, { k: "Available", v: /* @__PURE__ */ e("span", { class: "num", children: H(n) }) }),
        /* @__PURE__ */ e(Q, { k: "Strike fee", v: /* @__PURE__ */ e("span", { class: "num", children: "$1.00" }) }),
        t.session && /* @__PURE__ */ e(Q, { k: "To your wallet", v: /* @__PURE__ */ e("span", { class: "num", children: Qt(t.session.address, 8, 6) }) })
      ] }),
      /* @__PURE__ */ e("p", { class: "pa-p sm", children: [
        "Paid out in ADA (or USDM where Strike only supports it) to the wallet you connected. Minimum ",
        H(C, { decimals: 0 }),
        "."
      ] }),
      h && /* @__PURE__ */ e("div", { class: "pa-warn", children: [
        /* @__PURE__ */ e(K, { n: "warn", size: 16 }),
        h
      ] }),
      /* @__PURE__ */ e("button", { class: "pa-btn primary big", disabled: !(w >= C && w <= z) || d === "quoting", onClick: $, children: d === "quoting" ? /* @__PURE__ */ e(R, { children: [
        /* @__PURE__ */ e(Ze, { size: 16 }),
        " Getting quote…"
      ] }) : w > z ? "More than you can withdraw now" : w >= C ? "Review" : `Minimum ${H(C, { decimals: 0 })}` })
    ] }),
    u && d === "review" && /* @__PURE__ */ e(R, { children: [
      /* @__PURE__ */ e("div", { class: "pa-amount-sum", children: [
        /* @__PURE__ */ e("b", { class: "num", children: B.replace("≈ ", "") }),
        /* @__PURE__ */ e("span", { class: "num", children: [
          "from ",
          H(u.usdValue),
          " on Strike"
        ] })
      ] }),
      /* @__PURE__ */ e(Te, { children: [
        /* @__PURE__ */ e(Q, { k: "To your wallet", v: /* @__PURE__ */ e("span", { class: "num", children: Qt(t.session?.address ?? "", 8, 6) }) }),
        /* @__PURE__ */ e(Q, { k: "Strike fee", v: /* @__PURE__ */ e("span", { class: "num", children: H(u.fee) }) }),
        u.funding && /* @__PURE__ */ e(Q, { k: "Funding transaction", sub: "Strike's Cardano payout needs a small deposit to its validator", v: /* @__PURE__ */ e("span", { class: "num", children: [
          Ke(u.funding.lovelace).toFixed(2),
          " ADA"
        ] }), vsub: /* @__PURE__ */ e("span", { class: "num", children: [
          "+",
          Ke(u.funding.networkFee).toFixed(3),
          " ADA fee"
        ] }) })
      ] }),
      /* @__PURE__ */ e("button", { class: "pa-foot-link c", onClick: () => y(!f), children: [
        f ? "Hide" : "View",
        " the message you'll sign"
      ] }),
      f && /* @__PURE__ */ e("pre", { class: "pa-msg", children: u.messageToSign }),
      h && /* @__PURE__ */ e("div", { class: "pa-warn", children: [
        /* @__PURE__ */ e(K, { n: "warn", size: 16 }),
        h
      ] }),
      /* @__PURE__ */ e("button", { class: "pa-btn primary big", onClick: S, children: "Confirm in wallet" }),
      /* @__PURE__ */ e("button", { class: "pa-foot-link c", onClick: () => (c(null), g(""), p("amount")), children: "Change amount" })
    ] }),
    u && d === "signing" && /* @__PURE__ */ e(Do, { client: t, lines: u.funding ? ["Sign Strike's withdrawal message", `Approve the ${Ke(u.funding.lovelace).toFixed(2)} ADA funding transaction`] : ["Sign Strike's withdrawal message"] }),
    u && (d === "pending" || d === "done") && /* @__PURE__ */ e(R, { children: [
      /* @__PURE__ */ e("div", { class: "pa-amount-sum", children: [
        /* @__PURE__ */ e("b", { class: "num", children: B.replace("≈ ", "") }),
        /* @__PURE__ */ e("span", { class: "num", children: [
          "to ",
          Qt(t.session?.address ?? "", 8, 6)
        ] })
      ] }),
      /* @__PURE__ */ e(
        Fo,
        {
          steps: [
            { label: "Signed in your wallet", state: "done" },
            { label: "Strike processes the withdrawal", sub: d === "pending" ? "Usually a minute or two. Large withdrawals can be queued for review." : void 0, state: d === "pending" ? "active" : "done" },
            { label: d === "done" ? "Payout on its way to your wallet" : "Payout to your wallet", sub: d === "done" ? "Strike has taken it from your Perps balance; it lands in your wallet within minutes." : void 0, state: d === "done" ? "done" : "todo" }
          ]
        }
      ),
      /* @__PURE__ */ e("button", { class: `pa-btn ${d === "done" ? "primary" : "dark"} big`, onClick: s, children: d === "done" ? "Done" : "Close" })
    ] })
  ] });
}
function jd(t, n) {
  const i = (n.client.orderFeeBps / 100).toFixed(2), r = (n.takerRate * 100).toFixed(3);
  switch (t) {
    case "basics":
      return {
        title: "How Perps work",
        body: /* @__PURE__ */ e(R, { children: [
          /* @__PURE__ */ e("p", { children: [
            'A perpetual future ("perp") lets you trade where a price goes next without buying the asset. Go ',
            /* @__PURE__ */ e("b", { class: "pos", children: "Long" }),
            " if you think it rises, ",
            /* @__PURE__ */ e("b", { class: "neg", children: "Short" }),
            " if you think it falls."
          ] }),
          /* @__PURE__ */ e("p", { children: [
            "You put in ",
            /* @__PURE__ */ e("b", { children: "margin" }),
            " (the amount you enter). ",
            /* @__PURE__ */ e("b", { children: "Leverage" }),
            " multiplies it into a bigger position: $10 at 3x controls a $30 position, so gains and losses are 3x too."
          ] }),
          /* @__PURE__ */ e("p", { children: [
            "If the price moves too far against you, Strike ",
            /* @__PURE__ */ e("b", { children: "liquidates" }),
            " the position: it closes some or all of it at market, and you can lose the margin behind it plus a liquidation fee. Only the funds you add to your Perps balance are at risk; what stays in your wallet isn't."
          ] }),
          /* @__PURE__ */ e("p", { children: "Perps don't expire: you close whenever you want, or set an Auto Close (take profit / stop loss) when you open." })
        ] })
      };
    case "leverage":
      return {
        title: "Leverage and liquidation",
        body: /* @__PURE__ */ e(R, { children: [
          /* @__PURE__ */ e("p", { children: "Higher leverage means a smaller move wipes out your margin. For a position backed only by its own margin, roughly: at 2x a 50% move against you liquidates it, at 10x about 10%, at 20x about 5%." }),
          /* @__PURE__ */ e("p", { children: "The leverage screen shows that estimate before you open. Strike's actual liquidation price (shown on the position once it's open) is usually further away: Strike uses cross margin by default, where your whole Perps balance backs your positions. That also means a big loss can use all of that balance." }),
          /* @__PURE__ */ e("p", { children: "Each market has its own maximum leverage on Strike, and larger positions get lower limits. Starting out? 2–3x keeps liquidation far away." })
        ] })
      };
    case "funding":
      return {
        title: "Funding",
        body: /* @__PURE__ */ e(R, { children: [
          /* @__PURE__ */ e("p", { children: "Every hour, one side pays the other to keep the perp price close to the real market (the index). When funding is positive, longs pay shorts; when negative, shorts pay longs." }),
          /* @__PURE__ */ e("p", { children: "It's a small % of your position size and only applies while a position is open." })
        ] })
      };
    case "mark":
      return { title: "Mark price", body: /* @__PURE__ */ e("p", { children: "Strike's reference price for the market. Strike uses it for unrealized P&L and liquidations, and the Auto Close orders this app places trigger on it, so a single odd trade can't set them off." }) };
    case "index":
      return { title: "Index price", body: /* @__PURE__ */ e("p", { children: "The average spot price on major external exchanges. Strike keeps the perp close to it through funding." }) };
    case "funds":
      return {
        title: "Available funds",
        body: /* @__PURE__ */ e(R, { children: [
          /* @__PURE__ */ e("p", { children: "Your Perps balance on Strike that isn't being used as margin. Add funds by depositing ADA from your wallet; Strike converts it to USD margin." }),
          /* @__PURE__ */ e("p", { children: [
            "Strike asks new accounts for a first deposit of at least $",
            Wt,
            "; after that, deposits from $5. Withdrawals (from $5) go back to the same wallet."
          ] })
        ] })
      };
    default:
      return {
        title: "Perps FAQ",
        body: /* @__PURE__ */ e(R, { children: [
          /* @__PURE__ */ e("p", { children: [
            /* @__PURE__ */ e("b", { children: "Where do my funds go?" }),
            " Deposits go to Strike Finance, the exchange that runs these markets. This app never holds your funds; your wallet signs every deposit and withdrawal."
          ] }),
          /* @__PURE__ */ e("p", { children: [
            /* @__PURE__ */ e("b", { children: "What are the fees?" }),
            " Strike's trading fee (",
            r,
            "% for orders that fill at once; limit orders that wait on the book pay Strike's lower maker fee) plus this app's builder fee (",
            i,
            "%), on the position size when it opens and when it closes. Funding applies hourly while a position is open."
          ] }),
          /* @__PURE__ */ e("p", { children: [
            /* @__PURE__ */ e("b", { children: "How long do deposits take?" }),
            " Usually a few minutes: Strike waits for Cardano confirmations before crediting."
          ] }),
          /* @__PURE__ */ e("p", { children: [
            /* @__PURE__ */ e("b", { children: "How much can I lose?" }),
            " Only what's in your Perps balance; funds in your wallet aren't touched. With Strike's default cross margin, your whole Perps balance backs your positions, so big losses can use all of it."
          ] })
        ] })
      };
  }
}
function ys({ s: t }) {
  const n = t.client.appUrl();
  return /* @__PURE__ */ e("div", { class: "pa-prose", children: [
    /* @__PURE__ */ e("p", { children: "Perpetual futures are leveraged and risky. Prices can move quickly, and a position can be liquidated, losing all of the margin in it. Only trade with funds you can afford to lose." }),
    /* @__PURE__ */ e("p", { children: [
      "Trades, deposits and withdrawals execute on",
      " ",
      /* @__PURE__ */ e("a", { href: n, target: "_blank", rel: "noopener", children: "Strike Finance" }),
      " ",
      "through its public builder API. This app is an independent integration (builder code ",
      /* @__PURE__ */ e("b", { children: t.config.builderCode }),
      ") and charges a ",
      (t.client.orderFeeBps / 100).toFixed(2),
      "% builder fee per trade on top of Strike's fees. It isn't Strike, and never holds your funds."
    ] }),
    /* @__PURE__ */ e("p", { children: [
      "Strike's",
      " ",
      /* @__PURE__ */ e("a", { href: "https://www.strikefinance.org/terms", target: "_blank", rel: "noopener", children: "Terms" }),
      " ",
      "apply, and Strike isn't available in",
      " ",
      /* @__PURE__ */ e("a", { href: "https://www.strikefinance.org/restricted", target: "_blank", rel: "noopener", children: "restricted regions" }),
      "."
    ] }),
    t.testnet && /* @__PURE__ */ e("p", { children: "You're on Strike's testnet: balances are test funds with no value." })
  ] });
}
const qa = [
  ["volume", "Volume"],
  ["change", "24h change"],
  ["price", "Price"],
  ["leverage", "Max leverage"],
  ["name", "Name"]
];
function es(t, n, i) {
  const r = (s) => n === "volume" ? s.vol24 : n === "price" ? s.mark : n === "change" ? s.change : n === "leverage" ? s.strikeMaxLev : s.base;
  return [...t].sort((s, a) => {
    const o = r(s), l = r(a), d = typeof o == "string" ? o.localeCompare(l) : o - l;
    return i ? -d : d;
  });
}
function Bo(t, n, i) {
  const r = Mn.find((a) => a.id === i), s = n.trim().toLowerCase();
  return t.filter(
    (a) => (!r || r.test(a.base, { change: a.change, createdAt: a.createdAt })) && (!s || a.base.toLowerCase().includes(s) || a.name.toLowerCase().includes(s) || a.symbol.toLowerCase().includes(s))
  );
}
function Gd({ s: t, nav: n, list: i, pick: r, focus: s }) {
  const [a, o] = m(""), [l, d] = m(i), p = Mn.find((v) => v.id === l), [u, c] = m(p?.sort === "change" || p?.sort === "-change" ? "change" : "volume"), [h, g] = m(p?.sort !== "-change"), [f, y] = m(!1), k = De(null);
  Z(() => {
    s && setTimeout(() => k.current?.focus(), 50);
  }, []);
  const _ = es(Bo(t.markets, a, l), u, h), w = es(t.markets, "volume", !0).map((v) => v.symbol), z = (v) => r ? n.replace({ k: "trade", sym: v.symbol, side: r }) : n.push({ k: "market", sym: v.symbol }), C = r ? r === "buy" ? "Long which market?" : "Short which market?" : p?.label ?? "Perps";
  return /* @__PURE__ */ e("div", { class: "pa-screen", children: [
    /* @__PURE__ */ e("div", { class: "pa-top", children: [
      /* @__PURE__ */ e(tt, { n: "back", label: "Back", onClick: n.back }),
      /* @__PURE__ */ e("div", { class: "pa-title", children: C })
    ] }),
    /* @__PURE__ */ e("div", { class: "pa-scroll", children: [
      /* @__PURE__ */ e("label", { class: "pa-search", children: [
        /* @__PURE__ */ e(K, { n: "search", size: 18 }),
        /* @__PURE__ */ e("input", { ref: k, placeholder: "Search", "aria-label": "Search markets", value: a, onInput: (v) => o(v.target.value) }),
        a && /* @__PURE__ */ e("button", { "aria-label": "Clear", onClick: () => o(""), children: /* @__PURE__ */ e(K, { n: "x", size: 14 }) })
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-filter", children: [
        /* @__PURE__ */ e("button", { class: "pa-chip sm", onClick: () => y(!0), children: [
          qa.find((v) => v[0] === u)?.[1],
          " ",
          /* @__PURE__ */ e(K, { n: "down", size: 14 })
        ] }),
        l && /* @__PURE__ */ e("button", { class: "pa-chip sm on", onClick: () => d(void 0), children: [
          p?.label,
          " ",
          /* @__PURE__ */ e(K, { n: "x", size: 12 })
        ] }),
        !l && Mn.slice(0, 6).map((v) => /* @__PURE__ */ e("button", { class: "pa-chip sm", onClick: () => d(v.id), children: v.label }, v.id))
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-thead", children: [
        /* @__PURE__ */ e("span", { class: "n", children: "#" }),
        /* @__PURE__ */ e("span", { class: "m", children: "Perps" }),
        /* @__PURE__ */ e("button", { class: "p", onClick: () => g(!h), "aria-label": "Reverse order", children: [
          u === "change" ? "24h" : u === "volume" ? "Volume" : u === "leverage" ? "Leverage" : u === "name" ? "Name" : "Price",
          /* @__PURE__ */ e(K, { n: h ? "arrowDown" : "arrowUp", size: 13 })
        ] })
      ] }),
      _.map((v) => {
        const $ = w.indexOf(v.symbol) + 1;
        return /* @__PURE__ */ e("button", { class: "pa-mrow list", onClick: () => z(v), children: [
          /* @__PURE__ */ e("span", { class: `pa-num${$ <= 3 ? ` medal r${$}` : ""}`, children: $ }),
          /* @__PURE__ */ e(_t, { base: v.base, size: 40 }),
          /* @__PURE__ */ e("span", { class: "l", children: [
            /* @__PURE__ */ e("b", { children: [
              v.base,
              " ",
              /* @__PURE__ */ e("span", { class: "pa-lev", children: [
                v.strikeMaxLev,
                "x"
              ] })
            ] }),
            /* @__PURE__ */ e("span", { class: "s num", children: [
              An(v.vol24),
              " Vol"
            ] })
          ] }),
          /* @__PURE__ */ e("span", { class: "r num", children: [
            /* @__PURE__ */ e("b", { children: Y(v.mark, v.spec.tickSize) }),
            /* @__PURE__ */ e("span", { class: v.change >= 0 ? "pos" : "neg", children: dt(v.change) })
          ] })
        ] }, v.symbol);
      }),
      !_.length && /* @__PURE__ */ e("div", { class: "pa-empty", children: t.markets.length ? "No markets match" : "Loading markets…" }),
      /* @__PURE__ */ e("div", { class: "pa-bottom-pad sm" })
    ] }),
    f && /* @__PURE__ */ e(Oe, { title: "Sort by", onClose: () => y(!1), children: /* @__PURE__ */ e("div", { class: "pa-group", children: qa.map(([v, $]) => /* @__PURE__ */ e("button", { class: "pa-row", onClick: () => (c(v), g(v !== "name"), y(!1)), children: [
      /* @__PURE__ */ e("span", { class: "l", children: /* @__PURE__ */ e("span", { class: "k", children: $ }) }),
      u === v && /* @__PURE__ */ e(K, { n: "check", size: 18, cls: "pa-accent" })
    ] }, v)) }) })
  ] });
}
const Ua = 11, gi = (t, n) => {
  const i = n?.toString() ?? "", r = n ? Math.min(8, i.includes("e-") ? Number(i.split("e-")[1]) : (i.split(".")[1] ?? "").length) : t >= 1e3 ? 1 : 4;
  return t.toLocaleString("en-US", { minimumFractionDigits: r, maximumFractionDigits: r });
};
function Vd({ s: t, sym: n, base: i, tick: r, book: s, onPrice: a }) {
  const [o, l] = m("book");
  return /* @__PURE__ */ e("div", { class: "pd-panel pd-book", children: [
    /* @__PURE__ */ e("div", { class: "pd-tabs", children: [
      /* @__PURE__ */ e("button", { class: o === "book" ? "on" : "", onClick: () => l("book"), children: "Order Book" }),
      /* @__PURE__ */ e("button", { class: o === "trades" ? "on" : "", onClick: () => l("trades"), children: "Trades" })
    ] }),
    o === "book" ? /* @__PURE__ */ e(Kd, { book: s, base: i, tick: r, onPrice: a }) : /* @__PURE__ */ e(Yd, { s: t, sym: n, base: i, tick: r })
  ] });
}
function Ha(t, n, i) {
  if (!(n > 0)) return t;
  const r = [];
  for (const [s, a] of t) {
    const o = i === "ask" ? Math.ceil(s / n - 1e-9) * n : Math.floor(s / n + 1e-9) * n, l = r[r.length - 1];
    l && Math.abs(l[0] - o) < n / 2 ? l[1] += a : r.push([o, a]);
  }
  return r;
}
function Kd({ book: t, base: n, tick: i, onPrice: r }) {
  const [s, a] = m(1), [o, l] = m("both"), [d, p] = m(!1);
  if (Z(() => a(1), [n]), t === void 0)
    return /* @__PURE__ */ e("div", { class: "pd-center", children: /* @__PURE__ */ e(Ze, {}) });
  if (t === null) return /* @__PURE__ */ e("div", { class: "pd-center muted", children: "Order book unavailable right now." });
  const u = (T) => Number(((i ?? 0) * T).toPrecision(12)), c = i && i > 0 ? u(s) : 0, h = o === "both" ? Ua : Ua * 2 + 1, g = Ha(t.asks.map(([T, P]) => [T, P]), c, "ask").slice(0, h), f = Ha(t.bids.map(([T, P]) => [T, P]), c, "bid").slice(0, h), y = ([T, P]) => d ? T * P : P, k = (T) => T.reduce((P, ie) => (P.push((P[P.length - 1] ?? 0) + y(ie)), P), []), _ = k(g), w = k(f), z = Math.max(_[_.length - 1] ?? 0, w[w.length - 1] ?? 0) || 1, C = Number.isFinite(t.spread) && Number.isFinite(t.mid) && t.mid > 0 ? t.spread / t.mid * 100 : NaN, v = (T) => d ? T >= 1e3 ? `$${Math.round(T).toLocaleString("en-US")}` : `$${T.toFixed(2)}` : pe(T), $ = c > 0 ? c : void 0, S = t.bids.reduce((T, [P, ie]) => T + P * ie, 0), B = t.asks.reduce((T, [P, ie]) => T + P * ie, 0), x = S + B > 0 ? S / (S + B) * 100 : 50, M = d ? "USD" : n;
  return /* @__PURE__ */ e("div", { class: "pd-ob", children: [
    /* @__PURE__ */ e("div", { class: "pd-ob-tools", children: [
      /* @__PURE__ */ e("span", { class: "views", role: "radiogroup", "aria-label": "Book sides", children: ["both", "bids", "asks"].map((T) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": o === T, "aria-label": T === "both" ? "Buyers and sellers" : T === "bids" ? "Buyers only" : "Sellers only", title: T === "both" ? "Buyers and sellers" : T === "bids" ? "Buyers only" : "Sellers only", class: `v-${T}${o === T ? " on" : ""}`, onClick: () => l(T), children: [
        /* @__PURE__ */ e("i", {}),
        /* @__PURE__ */ e("i", {})
      ] }, T)) }),
      /* @__PURE__ */ e("span", { class: "sp" }),
      /* @__PURE__ */ e("select", { class: "pd-sel", "aria-label": "Size unit", value: d ? "usd" : "base", onChange: (T) => p(T.target.value === "usd"), children: [
        /* @__PURE__ */ e("option", { value: "base", children: n }),
        /* @__PURE__ */ e("option", { value: "usd", children: "USD" })
      ] }),
      i && i > 0 && /* @__PURE__ */ e("select", { class: "pd-sel", "aria-label": "Price grouping", value: String(s), onChange: (T) => a(Number(T.target.value)), children: [1, 10, 100, 1e3].map((T) => /* @__PURE__ */ e("option", { value: String(T), children: gi(u(T), u(T)) }, T)) })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-ob-h", children: [
      /* @__PURE__ */ e("span", { children: "Price" }),
      /* @__PURE__ */ e("span", { children: [
        "Size (",
        M,
        ")"
      ] }),
      /* @__PURE__ */ e("span", { children: [
        "Total (",
        M,
        ")"
      ] })
    ] }),
    o !== "bids" && /* @__PURE__ */ e("div", { class: "pd-ob-side asks", children: g.length ? g.map((T, P) => ({ lv: T, total: _[P] })).reverse().map(({ lv: T, total: P }) => /* @__PURE__ */ e("button", { class: "lv", onClick: () => r(T[0]), title: "Use this price for a limit order", children: [
      /* @__PURE__ */ e("span", { class: "bar", style: { width: `${P / z * 100}%` } }),
      /* @__PURE__ */ e("span", { class: "p neg", children: gi(T[0], $ ?? i) }),
      /* @__PURE__ */ e("span", { children: v(y(T)) }),
      /* @__PURE__ */ e("span", { children: v(P) })
    ] }, T[0])) : /* @__PURE__ */ e("div", { class: "pd-ob-empty", children: "No sellers right now" }) }),
    /* @__PURE__ */ e("div", { class: "pd-spread", children: [
      /* @__PURE__ */ e("span", { children: "Spread" }),
      /* @__PURE__ */ e("span", { class: "num", children: Number.isFinite(t.spread) ? gi(t.spread, i) : "—" }),
      /* @__PURE__ */ e("span", { class: "num", children: Number.isFinite(C) ? `${C.toFixed(3)}%` : "" })
    ] }),
    o !== "asks" && /* @__PURE__ */ e("div", { class: "pd-ob-side bids", children: f.length ? f.map((T, P) => /* @__PURE__ */ e("button", { class: "lv", onClick: () => r(T[0]), title: "Use this price for a limit order", children: [
      /* @__PURE__ */ e("span", { class: "bar", style: { width: `${w[P] / z * 100}%` } }),
      /* @__PURE__ */ e("span", { class: "p pos", children: gi(T[0], $ ?? i) }),
      /* @__PURE__ */ e("span", { children: v(y(T)) }),
      /* @__PURE__ */ e("span", { children: v(w[P]) })
    ] }, T[0])) : /* @__PURE__ */ e("div", { class: "pd-ob-empty", children: "No buyers right now" }) }),
    /* @__PURE__ */ e("div", { class: "pd-bs", title: "Share of the order book's value on each side", children: [
      /* @__PURE__ */ e("span", { class: "b num", children: [
        "B ",
        x.toFixed(1),
        "%"
      ] }),
      /* @__PURE__ */ e("span", { class: "bar", children: /* @__PURE__ */ e("i", { style: { width: `${x}%` } }) }),
      /* @__PURE__ */ e("span", { class: "s num", children: [
        (100 - x).toFixed(1),
        "% S"
      ] })
    ] })
  ] });
}
function Yd({ s: t, sym: n, base: i, tick: r }) {
  const [s, a] = m(null);
  return Z(() => {
    let o = !0;
    a(null);
    const l = () => t.client.market.trades(n, 40).then((p) => o && a(p)).catch(() => o && a((p) => p ?? []));
    l();
    const d = setInterval(() => !At() && l(), 4e3);
    return () => {
      o = !1, clearInterval(d);
    };
  }, [n]), s === null ? /* @__PURE__ */ e("div", { class: "pd-center", children: /* @__PURE__ */ e(Ze, {}) }) : s.length ? /* @__PURE__ */ e("div", { class: "pd-ob", children: [
    /* @__PURE__ */ e("div", { class: "pd-ob-h", children: [
      /* @__PURE__ */ e("span", { children: "Price" }),
      /* @__PURE__ */ e("span", { children: [
        "Size (",
        i,
        ")"
      ] }),
      /* @__PURE__ */ e("span", { children: "Time" })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-trades", children: s.map((o) => /* @__PURE__ */ e("div", { class: "lv", children: [
      /* @__PURE__ */ e("span", { class: `p ${o.side === "buy" ? "pos" : "neg"}`, children: gi(o.price, r) }),
      /* @__PURE__ */ e("span", { children: pe(o.size) }),
      /* @__PURE__ */ e("span", { class: "muted", children: sn(o.time) })
    ] }, o.id)) })
  ] }) : /* @__PURE__ */ e("div", { class: "pd-center muted", children: "No recent trades." });
}
function ws() {
  const t = De(null), [n, i] = m([0, 0]);
  return ti(() => {
    const r = t.current;
    if (!r || typeof ResizeObserver > "u") return;
    const s = new ResizeObserver(() => i([r.clientWidth, r.clientHeight]));
    return s.observe(r), i([r.clientWidth, r.clientHeight]), () => s.disconnect();
  }, []), [t, n[0], n[1]];
}
const fi = (t, n = 4) => {
  const i = Math.abs(t).toFixed(n);
  return `${t < 0 && Number(i) !== 0 ? "-" : ""}${i}%`;
}, Wa = (t, n) => [t, 0, n].filter((i, r, s) => s.indexOf(i) === r && i >= t && i <= n), Xd = { "24h": 24, "1w": 168, "1m": 720 };
function Zd({ s: t, sym: n }) {
  const [i, r] = m(void 0), [s, a] = m("1w"), [o, l] = m(null), [d, p, u] = ws();
  Z(() => {
    let N = !0;
    r(void 0);
    const O = () => t.client.market.fundingHistory(n, 30).then((ne) => N && r(ne)).catch(() => N && r((ne) => ne ?? null));
    O();
    const J = setInterval(() => !At() && O(), 10 * 6e4);
    return () => (N = !1, clearInterval(J));
  }, [n]);
  const c = (i ?? []).slice(-Xd[s]).map((N) => ({ time: N.time, v: N.rate * 100 }));
  let h = 0;
  const g = c.map((N) => h += N.v), f = 70, y = 66, k = 14, _ = 26, w = Math.max(10, p - f - y), z = Math.max(10, u - k - _), C = Math.min(0, ...c.map((N) => N.v)), v = Math.max(0, ...c.map((N) => N.v)) || 1e-4, $ = Math.min(0, ...g), S = Math.max(0, ...g) || 1e-4, B = (N) => k + (1 - (N - C) / (v - C || 1)) * z, x = (N) => k + (1 - (N - $) / (S - $ || 1)) * z, M = c.length ? w / c.length : w, T = Math.max(1, M * 0.7), P = B(0), ie = g.map((N, O) => `${O ? "L" : "M"}${(f + O * M + M / 2).toFixed(1)},${x(N).toFixed(1)}`).join(""), F = Wa(C, v), E = Wa($, S), D = c.length ? [0, Math.floor(c.length / 2), c.length - 1] : [], W = o !== null && c[o] ? o : null, A = (N) => s === "24h" ? new Date(N).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }) : new Date(N).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return /* @__PURE__ */ e("div", { class: "pd-tabbody", children: [
    /* @__PURE__ */ e("div", { class: "pd-fh", children: [
      /* @__PURE__ */ e("b", { children: "Funding Rate History" }),
      /* @__PURE__ */ e("span", { class: "muted", children: W !== null ? `${new Date(c[W].time).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })} · ${fi(c[W].v)} · total ${fi(g[W], 3)}` : "Paid every hour. Positive: longs pay shorts." }),
      /* @__PURE__ */ e("span", { class: "sp" }),
      /* @__PURE__ */ e("span", { class: "pd-ivs flat", role: "radiogroup", "aria-label": "Range", children: ["24h", "1w", "1m"].map((N) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": s === N, class: s === N ? "on" : "", onClick: () => a(N), children: N === "24h" ? "24H" : N === "1w" ? "1W" : "1M" }, N)) })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-svgbox", ref: d, onMouseLeave: () => l(null), children: i === void 0 ? /* @__PURE__ */ e("div", { class: "pd-center", children: /* @__PURE__ */ e(Ze, {}) }) : i === null ? /* @__PURE__ */ e("div", { class: "pd-center muted", children: "Funding history is unavailable right now." }) : c.length ? p > 0 && /* @__PURE__ */ e(
      "svg",
      {
        width: p,
        height: u,
        viewBox: `0 0 ${p} ${u}`,
        role: "img",
        "aria-label": `Hourly funding rates for ${n}, ${s}`,
        onMouseMove: (N) => {
          const O = N.currentTarget.getBoundingClientRect(), J = Math.floor((N.clientX - O.left - f) / M);
          l(J >= 0 && J < c.length ? J : null);
        },
        children: [
          F.map((N) => /* @__PURE__ */ e("g", { children: [
            /* @__PURE__ */ e("line", { x1: f, x2: f + w, y1: B(N), y2: B(N), class: "grid" }),
            /* @__PURE__ */ e("text", { x: f - 8, y: B(N) + 4, "text-anchor": "end", class: "ax", children: fi(N, 4) })
          ] }, `l${N}`)),
          E.map((N) => /* @__PURE__ */ e("text", { x: f + w + 8, y: x(N) + 4, class: "ax", children: fi(N, 2) }, `r${N}`)),
          /* @__PURE__ */ e("line", { x1: f, x2: f + w, y1: P, y2: P, class: "zero" }),
          c.map((N, O) => {
            const J = f + O * M + (M - T) / 2, ne = Math.min(B(N.v), P);
            return /* @__PURE__ */ e("rect", { x: J, y: ne, width: T, height: Math.max(1, Math.abs(B(N.v) - P)), class: N.v >= 0 ? "pos" : "neg", opacity: W === null || W === O ? 1 : 0.45 }, N.time);
          }),
          /* @__PURE__ */ e("path", { d: ie, class: "cum" }),
          W !== null && /* @__PURE__ */ e("line", { x1: f + W * M + M / 2, x2: f + W * M + M / 2, y1: k, y2: k + z, class: "cross" }),
          D.map((N, O) => /* @__PURE__ */ e("text", { x: f + N * M + M / 2, y: u - 6, "text-anchor": O === 0 ? "start" : O === 2 ? "end" : "middle", class: "ax", children: A(c[N].time) }, N))
        ]
      }
    ) : /* @__PURE__ */ e("div", { class: "pd-center muted", children: t.testnet ? "Strike testnet has no funding history yet." : "No funding history yet for this market." }) }),
    /* @__PURE__ */ e("div", { class: "pd-legend", children: [
      /* @__PURE__ */ e("span", { children: [
        /* @__PURE__ */ e("i", { class: "sw pos" }),
        " Funding rate (+)"
      ] }),
      /* @__PURE__ */ e("span", { children: [
        /* @__PURE__ */ e("i", { class: "sw neg" }),
        " Funding rate (−)"
      ] }),
      /* @__PURE__ */ e("span", { children: [
        /* @__PURE__ */ e("i", { class: "sw line" }),
        " Running total"
      ] })
    ] })
  ] });
}
function Jd({ book: t, base: n, tick: i }) {
  const [r, s, a] = ws(), [o, l] = m(null);
  if (t === void 0)
    return /* @__PURE__ */ e("div", { class: "pd-tabbody", children: /* @__PURE__ */ e("div", { class: "pd-center", children: /* @__PURE__ */ e(Ze, {}) }) });
  if (t === null || !t.bids.length && !t.asks.length)
    return /* @__PURE__ */ e("div", { class: "pd-tabbody", children: /* @__PURE__ */ e("div", { class: "pd-center muted", children: "The order book is unavailable right now." }) });
  const d = Number.isFinite(t.mid) && t.mid > 0 ? t.mid : t.bids[0]?.[0] ?? t.asks[0]?.[0] ?? 0, p = 0.15, u = t.bids.filter(([O]) => O >= d * (1 - p)), c = t.asks.filter(([O]) => O <= d * (1 + p));
  let h = 0;
  const g = u.map(([O, J]) => [O, h += J]);
  let f = 0;
  const y = c.map(([O, J]) => [O, f += J]), k = Math.min(g.length ? g[g.length - 1][0] : d, d * 0.995), _ = Math.max(y.length ? y[y.length - 1][0] : d, d * 1.005), w = Math.max(d - k, _ - d), z = d - w, C = d + w, v = Math.max(h, f) || 1, $ = 62, S = 12, B = 12, x = 26, M = Math.max(10, s - $ - S), T = Math.max(10, a - B - x), P = (O) => $ + (O - z) / (C - z || 1) * M, ie = (O) => B + (1 - O / v) * T, F = (O) => {
    let J = `M${P(d).toFixed(1)},${ie(0).toFixed(1)}`, ne = 0;
    for (const [Se, Ae] of O) J += `L${P(Se).toFixed(1)},${ie(ne).toFixed(1)}L${P(Se).toFixed(1)},${ie(Ae).toFixed(1)}`, ne = Ae;
    return J;
  }, E = F(g), D = F(y), W = (O, J) => O.length ? `${J}L${P(O[O.length - 1][0]).toFixed(1)},${ie(0).toFixed(1)}Z` : "";
  let A = null;
  if (o !== null) {
    const O = z + (o - $) / M * (C - z);
    if (O >= d) {
      const J = y.filter(([ne]) => ne <= O);
      A = { p: O, q: J.length ? J[J.length - 1][1] : 0, impact: (O - d) / d };
    } else {
      const J = g.filter(([ne]) => ne >= O);
      A = { p: O, q: J.length ? J[J.length - 1][1] : 0, impact: (d - O) / d };
    }
  }
  const N = [z, (z + d) / 2, d, (d + C) / 2, C];
  return /* @__PURE__ */ e("div", { class: "pd-tabbody", children: [
    /* @__PURE__ */ e("div", { class: "pd-fh", children: [
      /* @__PURE__ */ e("b", { children: "Depth" }),
      /* @__PURE__ */ e("span", { class: "muted", children: A ? `Price ${Y(A.p, i)} · Impact ${(A.impact * 100).toFixed(2)}% · ${pe(A.q)} ${n} · ${H(A.q * A.p, { decimals: 0 })}` : `Mid ${Y(d, i)} · buyers left, sellers right` })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-svgbox", ref: r, onMouseLeave: () => l(null), children: s > 0 && /* @__PURE__ */ e(
      "svg",
      {
        width: s,
        height: a,
        viewBox: `0 0 ${s} ${a}`,
        role: "img",
        "aria-label": `Order book depth around ${Y(d, i)}`,
        onMouseMove: (O) => {
          const J = O.currentTarget.getBoundingClientRect(), ne = O.clientX - J.left;
          l(ne >= $ && ne <= $ + M ? ne : null);
        },
        children: [
          [0, 0.5, 1].map((O) => /* @__PURE__ */ e("g", { children: [
            /* @__PURE__ */ e("line", { x1: $, x2: $ + M, y1: ie(v * O), y2: ie(v * O), class: "grid" }),
            /* @__PURE__ */ e("text", { x: $ - 8, y: ie(v * O) + 4, "text-anchor": "end", class: "ax", children: pe(v * O) })
          ] }, O)),
          /* @__PURE__ */ e("path", { d: W(g, E), class: "bidfill" }),
          /* @__PURE__ */ e("path", { d: W(y, D), class: "askfill" }),
          /* @__PURE__ */ e("path", { d: E, class: "bidline" }),
          /* @__PURE__ */ e("path", { d: D, class: "askline" }),
          /* @__PURE__ */ e("line", { x1: P(d), x2: P(d), y1: B, y2: B + T, class: "cross" }),
          o !== null && /* @__PURE__ */ e("line", { x1: o, x2: o, y1: B, y2: B + T, class: "cross" }),
          N.map((O, J) => /* @__PURE__ */ e("text", { x: P(O), y: a - 6, "text-anchor": J === 0 ? "start" : J === N.length - 1 ? "end" : "middle", class: "ax", children: Y(O, i).replace("$", "") }, J))
        ]
      }
    ) })
  ] });
}
function Qd({ s: t, m: n }) {
  const [i, r] = m(void 0), [s, a] = m(null), [o, l, d] = ws();
  Z(() => {
    let A = !0;
    r(void 0);
    const N = () => t.client.market.liquidationMap(n.symbol).then((J) => A && r(J)).catch(() => A && r((J) => J ?? null));
    N();
    const O = setInterval(() => !At() && N(), 6e4);
    return () => (A = !1, clearInterval(O));
  }, [n.symbol]);
  const p = n.mark, u = n.spec.tickSize, c = (i ?? []).map((A) => ({ price: A.price, long: A.long * A.price, short: A.short * A.price })), h = c.some((A) => A.long > 0 || A.short > 0), g = new Array(c.length).fill(0), f = new Array(c.length).fill(0);
  for (let A = c.length - 1, N = 0; A >= 0; A--) c[A].price < p && (g[A] = N += c[A].long);
  for (let A = 0, N = 0; A < c.length; A++) c[A].price > p && (f[A] = N += c[A].short);
  const y = 62, k = 66, _ = 14, w = 26, z = Math.max(10, l - y - k), C = Math.max(10, d - _ - w), v = c.length ? c[0].price : p * 0.9, $ = c.length ? c[c.length - 1].price : p * 1.1, S = (A) => y + (A - v) / ($ - v || 1) * z, B = Math.max(1, ...c.map((A) => Math.max(A.long, A.short))), x = Math.max(1, ...g, ...f), M = (A) => _ + (1 - A / B) * C, T = (A) => _ + (1 - A / x) * C, P = Math.max(1, z / Math.max(1, c.length) * 0.6), ie = (A, N) => A.map((O, J) => `${J ? "L" : "M"}${S(c[O].price).toFixed(1)},${T(N[O]).toFixed(1)}`).join(""), F = c.map((A, N) => N).filter((A) => c[A].price < p), E = c.map((A, N) => N).filter((A) => c[A].price > p), D = s !== null && c[s] ? c[s] : null, W = (A) => H(A, { decimals: 0 });
  return /* @__PURE__ */ e("div", { class: "pd-tabbody", children: [
    /* @__PURE__ */ e("div", { class: "pd-fh", children: [
      /* @__PURE__ */ e("b", { children: "Liquidation Map" }),
      /* @__PURE__ */ e("span", { class: "muted", children: D && s !== null ? `${Y(D.price, u)} · ${D.price < p ? `longs ${W(D.long)} · ${W(g[s])} down to here` : `shorts ${W(D.short)} · ${W(f[s])} up to here`}` : "Where open positions on Strike would be liquidated, in USD" })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-svgbox", ref: o, onMouseLeave: () => a(null), children: i === void 0 ? /* @__PURE__ */ e("div", { class: "pd-center", children: /* @__PURE__ */ e(Ze, {}) }) : i === null ? /* @__PURE__ */ e("div", { class: "pd-center muted", children: "The liquidation map is unavailable right now." }) : h ? l > 0 && /* @__PURE__ */ e(
      "svg",
      {
        width: l,
        height: d,
        viewBox: `0 0 ${l} ${d}`,
        role: "img",
        "aria-label": `Liquidation levels for ${n.symbol}`,
        onMouseMove: (A) => {
          const N = A.currentTarget.getBoundingClientRect(), O = v + (A.clientX - N.left - y) / z * ($ - v);
          let J = -1, ne = 1 / 0;
          c.forEach((Se, Ae) => Math.abs(Se.price - O) < ne && (ne = Math.abs(Se.price - O), J = Ae)), a(J >= 0 ? J : null);
        },
        children: [
          [0, 0.5, 1].map((A) => /* @__PURE__ */ e("g", { children: [
            /* @__PURE__ */ e("line", { x1: y, x2: y + z, y1: M(B * A), y2: M(B * A), class: "grid" }),
            /* @__PURE__ */ e("text", { x: y - 8, y: M(B * A) + 4, "text-anchor": "end", class: "ax", children: W(B * A) }),
            /* @__PURE__ */ e("text", { x: y + z + 8, y: T(x * A) + 4, class: "ax", children: W(x * A) })
          ] }, A)),
          c.map(
            (A, N) => A.price < p && A.long > 0 ? /* @__PURE__ */ e("rect", { x: S(A.price) - P / 2, y: M(A.long), width: P, height: Math.max(1, M(0) - M(A.long)), class: "neg" }, N) : A.price > p && A.short > 0 ? /* @__PURE__ */ e("rect", { x: S(A.price) - P / 2, y: M(A.short), width: P, height: Math.max(1, M(0) - M(A.short)), class: "pos" }, N) : null
          ),
          F.length > 1 && /* @__PURE__ */ e("path", { d: ie(F, g), class: "askline" }),
          E.length > 1 && /* @__PURE__ */ e("path", { d: ie(E, f), class: "bidline" }),
          /* @__PURE__ */ e("line", { x1: S(p), x2: S(p), y1: _, y2: _ + C, class: "cross" }),
          /* @__PURE__ */ e("text", { x: Math.min(S(p) + 6, y + z - 120), y: _ + 12, class: "ax", children: `Price ${Y(p, u)}` }),
          s !== null && /* @__PURE__ */ e("line", { x1: S(c[s].price), x2: S(c[s].price), y1: _, y2: _ + C, class: "cross" }),
          [v, p, $].map((A, N) => /* @__PURE__ */ e("text", { x: S(A), y: d - 6, "text-anchor": N === 0 ? "start" : N === 2 ? "end" : "middle", class: "ax", children: Y(A, u).replace("$", "") }, N))
        ]
      }
    ) : /* @__PURE__ */ e("div", { class: "pd-center muted", children: [
      "No open positions to map",
      t.testnet ? " on Strike testnet" : "",
      " right now."
    ] }) }),
    /* @__PURE__ */ e("div", { class: "pd-legend", children: [
      /* @__PURE__ */ e("span", { children: [
        /* @__PURE__ */ e("i", { class: "sw neg" }),
        " Longs"
      ] }),
      /* @__PURE__ */ e("span", { children: [
        /* @__PURE__ */ e("i", { class: "sw pos" }),
        " Shorts"
      ] }),
      /* @__PURE__ */ e("span", { children: [
        /* @__PURE__ */ e("i", { class: "sw line" }),
        " Running totals from the price"
      ] })
    ] })
  ] });
}
const an = (t) => t == null || t === "" ? NaN : Number(t), ja = (t) => {
  if (!Number.isFinite(t) || t <= 0) return 0;
  const n = t.toString();
  return n.includes("e-") ? Number(n.split("e-")[1]) : (n.split(".")[1] ?? "").length;
}, jr = (t) => Number.isFinite(t) && t > 0 ? `±${(t * 100).toFixed(t * 100 < 1 ? 2 : 0)}% from the mark` : "—";
function Ge({ k: t, d: n, v: i }) {
  return /* @__PURE__ */ e("div", { class: "pd-drow", children: [
    /* @__PURE__ */ e("span", { class: "l", children: [
      /* @__PURE__ */ e("span", { children: t }),
      /* @__PURE__ */ e("small", { children: n })
    ] }),
    /* @__PURE__ */ e("b", { class: "num", children: i })
  ] });
}
function ep({ s: t, m: n }) {
  const [, i] = m(0);
  Z(() => {
    const c = setInterval(() => i((h) => h + 1), 1e3);
    return () => clearInterval(c);
  }, []);
  const r = t.client.raw(n.symbol);
  if (!r)
    return /* @__PURE__ */ e("div", { class: "pd-tabbody", children: /* @__PURE__ */ e("div", { class: "pd-center muted", children: "Market details are unavailable right now." }) });
  const s = n.base, a = (c) => Number.isFinite(an(c)) ? `${pe(an(c))} ${s}` : "—", o = [...n.spec.marginTiers].sort((c, h) => Number(c.max_notional) - Number(h.max_notional)), l = o.map((c) => Number(c.maintenance_margin_rate)).filter((c) => Number.isFinite(c)), d = l.length ? `${(Math.min(...l) * 100).toFixed(2)}% – ${(Math.max(...l) * 100).toFixed(2)}%` : "—", p = n.spec.tickSize, u = n.spec.stepSize;
  return /* @__PURE__ */ e("div", { class: "pd-tabbody pd-details", children: /* @__PURE__ */ e("div", { class: "pd-dgrid", children: [
    /* @__PURE__ */ e("section", { children: [
      /* @__PURE__ */ e("h4", { children: "Market Overview" }),
      /* @__PURE__ */ e(Ge, { k: "Trading Pair", d: n.name, v: n.symbol }),
      /* @__PURE__ */ e(Ge, { k: "Maximum Leverage", d: "The most you can use when opening a small position", v: `${n.strikeMaxLev}x` }),
      n.maxLev < n.strikeMaxLev && /* @__PURE__ */ e(Ge, { k: "Leverage in this app", d: "This app caps leverage below Strike's maximum", v: `${n.maxLev}x` })
    ] }),
    /* @__PURE__ */ e("section", { children: [
      /* @__PURE__ */ e("h4", { children: "Order Size Rules" }),
      /* @__PURE__ */ e(Ge, { k: "Smallest Limit Order", d: "Minimum size for a limit order", v: a(r.order_limit_min_size) }),
      /* @__PURE__ */ e(Ge, { k: "Largest Limit Order", d: "Maximum size of one limit order", v: a(r.order_limit_max_size) }),
      /* @__PURE__ */ e(Ge, { k: "Smallest Market Order", d: "Minimum size for a market order", v: a(r.order_market_min_size) }),
      /* @__PURE__ */ e(Ge, { k: "Largest Market Order", d: "Maximum size of one market order", v: a(r.order_market_max_size) }),
      /* @__PURE__ */ e(Ge, { k: "Minimum Order Value", d: "An order must be worth at least this", v: Number.isFinite(an(r.order_min_notional)) ? H(an(r.order_min_notional), { decimals: 0 }) : "—" })
    ] }),
    /* @__PURE__ */ e("section", { children: [
      /* @__PURE__ */ e("h4", { children: "Funding & Fees" }),
      /* @__PURE__ */ e(Ge, { k: "Current Funding Rate", d: "Paid every hour. Positive: longs pay shorts", v: fi(n.funding * 100) }),
      /* @__PURE__ */ e(Ge, { k: "Next Funding Payment", d: "Time until the next hourly payment", v: n.nextFunding > Date.now() ? ks(n.nextFunding) : "—" }),
      /* @__PURE__ */ e(Ge, { k: "Maintenance Margin", d: "Below this a position is liquidated (rises with size)", v: d }),
      /* @__PURE__ */ e(Ge, { k: "Liquidation Fee", d: "Charged if a position is liquidated", v: Number.isFinite(an(r.liquidation_fee_rate)) ? `${(an(r.liquidation_fee_rate) * 100).toFixed(2)}%` : "—" }),
      /* @__PURE__ */ e(Ge, { k: "Trading Fee", d: "Strike's base taker fee, plus this app's builder fee", v: `${(t.takerRate * 100).toFixed(3)}% + ${(t.client.orderFeeBps / 100).toFixed(2)}%` })
    ] }),
    /* @__PURE__ */ e("section", { children: [
      /* @__PURE__ */ e("h4", { children: "Order Precision" }),
      /* @__PURE__ */ e(Ge, { k: "Price Decimal Places", d: "Decimals allowed in a price", v: `${ja(p)}` }),
      /* @__PURE__ */ e(Ge, { k: "Size Decimal Places", d: "Decimals allowed in a size", v: `${ja(u)}` }),
      /* @__PURE__ */ e(Ge, { k: "Minimum Price Movement", d: "Smallest price step", v: Number.isFinite(p) ? String(r.order_tick_price) : "—" }),
      /* @__PURE__ */ e(Ge, { k: "Order Size Increment", d: "Sizes are multiples of this", v: a(r.order_limit_step_size) })
    ] }),
    /* @__PURE__ */ e("section", { children: [
      /* @__PURE__ */ e("h4", { children: "Price Protection" }),
      /* @__PURE__ */ e(Ge, { k: "Limit Order Price Range", d: "How far a limit price can be from the market", v: jr(an(r.order_limit_price_bound)) }),
      /* @__PURE__ */ e(Ge, { k: "Market Order Price Range", d: "Most a market order can move from the market", v: jr(an(r.order_market_price_bound)) }),
      /* @__PURE__ */ e(Ge, { k: "Stop Order Protection", d: "Buffer against stops triggering on brief spikes", v: jr(an(r.trigger_protect)).replace(" from the mark", "") })
    ] }),
    /* @__PURE__ */ e("section", { children: [
      /* @__PURE__ */ e("h4", { children: "Margin Tiers" }),
      /* @__PURE__ */ e("table", { class: "pd-tiers", children: [
        /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ e("tr", { children: [
          /* @__PURE__ */ e("th", { children: "Max Notional" }),
          /* @__PURE__ */ e("th", { children: "Max Leverage" }),
          /* @__PURE__ */ e("th", { children: "MMR" })
        ] }) }),
        /* @__PURE__ */ e("tbody", { children: o.map((c) => /* @__PURE__ */ e("tr", { children: [
          /* @__PURE__ */ e("td", { class: "num", children: H(Number(c.max_notional), { decimals: 0 }) }),
          /* @__PURE__ */ e("td", { class: "num", children: [
            c.max_leverage,
            "x"
          ] }),
          /* @__PURE__ */ e("td", { class: "num", children: [
            (Number(c.maintenance_margin_rate) * 100).toFixed(2),
            "%"
          ] })
        ] }, c.max_notional)) })
      ] })
    ] })
  ] }) });
}
const tp = [0.25, 0.5, 0.75, 1];
function Ei(t, n) {
  const i = t.bySymbol[n.symbol], r = Number(n.size);
  return {
    m: i,
    base: n.symbol.split("-")[0],
    size: r,
    abs: Math.abs(r),
    long: r > 0,
    entry: Number(n.entry_price),
    mark: i?.mark || Number(n.entry_price),
    tick: i?.spec.tickSize ?? 1e-4,
    lev: Math.max(1, Number(n.leverage) || 1),
    liq: Number(n.liquidation_price)
  };
}
function Ro({ value: t, onChange: n }) {
  return /* @__PURE__ */ e("div", { class: "pa-pcts four", children: tp.map((i) => /* @__PURE__ */ e("button", { class: `pa-btn dark${t === i ? " on" : ""}`, onClick: () => n(i), children: [
    i * 100,
    "%"
  ] }, i)) });
}
function Qn({ label: t, value: n, onInput: i, aria: r, hint: s, mark: a, tick: o }) {
  return /* @__PURE__ */ e("label", { class: "pa-field", children: [
    /* @__PURE__ */ e("span", { class: "lbl", children: t }),
    /* @__PURE__ */ e("span", { class: "in", children: [
      /* @__PURE__ */ e("span", { class: "muted", children: "$" }),
      /* @__PURE__ */ e("input", { inputMode: "decimal", value: n, placeholder: "Enter price", "aria-label": r, onInput: (l) => i(_e(l)) }),
      a ? /* @__PURE__ */ e("button", { class: "pa-chipmini", onClick: (l) => (l.preventDefault(), i(ue(a, o ?? 1e-4))), children: "Mark" }) : null
    ] }),
    s && /* @__PURE__ */ e("span", { class: "hint num", children: s })
  ] });
}
function Ln({ busy: t, label: n, onClick: i, disabled: r, cls: s }) {
  return /* @__PURE__ */ e("button", { class: `pa-btn ${s ?? "primary"} big`, disabled: t || r, onClick: i, children: t ? /* @__PURE__ */ e(Ze, { size: 18 }) : n });
}
function vr(t, n) {
  return t.orders.filter((i) => i.symbol === n && i.reduce_only);
}
const np = (t) => {
  const n = String(t.type);
  return n.startsWith("take_profit") ? "Take profit" : n.startsWith("trailing") ? "Trailing stop" : n.startsWith("stop") ? "Stop loss" : n === "limit" ? "Limit close" : "Closing order";
};
function _s({ s: t, p: n, onClose: i }) {
  const r = Ei(t, n), [s, a] = m(""), [o, l] = m(""), [d, p] = m(1), [u, c] = m("mark_price"), [h, g] = m(!1), f = Number(s) || 0, y = Number(o) || 0, k = (C) => (r.long ? 1 : -1) * (C - r.entry) * r.abs * d, _ = f && (r.long ? f <= r.mark : f >= r.mark) ? `Take profit must be ${r.long ? "above" : "below"} the current price` : y && (r.long ? y >= r.mark : y <= r.mark) ? `Stop loss must be ${r.long ? "below" : "above"} the current price` : y && r.liq > 0 && (r.long ? y <= r.liq : y >= r.liq) ? "Stop loss is past the liquidation price, so it would never trigger" : null, w = vr(t, n.symbol), z = async () => {
    g(!0);
    const C = await t.setExits(n, { takeProfit: f || void 0, stopLoss: y || void 0, fraction: d, workingType: u });
    g(!1), C && i();
  };
  return /* @__PURE__ */ e(Oe, { title: "Take profit / Stop loss", onClose: () => !h && i(), tall: !0, children: [
    /* @__PURE__ */ e(Te, { children: [
      /* @__PURE__ */ e(Q, { k: "Entry price", v: /* @__PURE__ */ e("span", { class: "num", children: Y(r.entry, r.tick) }) }),
      /* @__PURE__ */ e(Q, { k: "Mark price", v: /* @__PURE__ */ e("span", { class: "num", children: Y(r.mark, r.tick) }) }),
      r.liq > 0 && /* @__PURE__ */ e(Q, { k: "Liquidation price", v: /* @__PURE__ */ e("span", { class: "num", children: Y(r.liq, r.tick) }) })
    ] }),
    /* @__PURE__ */ e(Qn, { label: "Take profit", value: s, onInput: a, aria: "Take profit price", mark: r.mark, tick: r.tick, hint: f ? `Est. P&L ≈ ${H(k(f), { sign: !0 })} (${dt((k(f) / (r.abs * d * r.entry / r.lev) || 0) * 100, 0)})` : void 0 }),
    /* @__PURE__ */ e(Qn, { label: "Stop loss", value: o, onInput: l, aria: "Stop loss price", mark: r.mark, tick: r.tick, hint: y ? `Est. P&L ≈ ${H(k(y), { sign: !0 })}` : void 0 }),
    /* @__PURE__ */ e("div", { class: "pa-lbl-row", children: "Size" }),
    /* @__PURE__ */ e(Ro, { value: d, onChange: p }),
    /* @__PURE__ */ e("div", { class: "pa-seg", role: "radiogroup", "aria-label": "Trigger price", children: ["mark_price", "contract_price"].map((C) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": u === C, class: u === C ? "on" : "", onClick: () => c(C), children: C === "mark_price" ? "Trigger on mark" : "Trigger on last" }, C)) }),
    w.length > 0 && /* @__PURE__ */ e(R, { children: [
      /* @__PURE__ */ e("div", { class: "pa-lbl-row", children: "Existing exit orders" }),
      /* @__PURE__ */ e(Te, { children: w.map((C) => /* @__PURE__ */ e("div", { class: "pa-row", children: [
        /* @__PURE__ */ e("span", { class: "l", children: [
          /* @__PURE__ */ e("span", { class: "k", children: np(C) }),
          /* @__PURE__ */ e("span", { class: "s num", children: [
            pe(Number(C.size)),
            " ",
            r.base,
            " @ ",
            Y(Number(C.stop_price) || Number(C.price), r.tick)
          ] })
        ] }),
        /* @__PURE__ */ e("button", { class: "pa-btn dark xs", onClick: () => t.cancelOrder(C), children: "Cancel" })
      ] }, C.id)) })
    ] }),
    _ && /* @__PURE__ */ e("div", { class: "pa-warn", children: [
      /* @__PURE__ */ e(K, { n: "warn", size: 16 }),
      _
    ] }),
    /* @__PURE__ */ e("p", { class: "pa-p sm", children: "Exits are reduce-only market orders that trigger at your price, so they can only shrink this position." }),
    /* @__PURE__ */ e(Ln, { busy: h, label: "Confirm", onClick: z, disabled: !!_ || !f && !y })
  ] });
}
function Ss({ s: t, p: n, onClose: i }) {
  const r = Ei(t, n), [s, a] = m("1"), [o, l] = m(""), [d, p] = m("mark_price"), [u, c] = m(!1), h = Number(s) || 0, g = h >= Nn && h <= Pn, f = r.long ? r.mark * (1 - h / 100) : r.mark * (1 + h / 100), y = async () => {
    c(!0);
    const k = await t.trail(n, h, Number(o) > 0 ? Number(o) : void 0, d);
    c(!1), k && i();
  };
  return /* @__PURE__ */ e(Oe, { title: "Trailing stop", onClose: () => !u && i(), tall: !0, children: [
    /* @__PURE__ */ e("p", { class: "pa-p", children: "The stop follows the price as it moves your way and closes the position at market if it turns back by your trail distance." }),
    /* @__PURE__ */ e("label", { class: "pa-field", children: [
      /* @__PURE__ */ e("span", { class: "lbl", children: "Trail distance" }),
      /* @__PURE__ */ e("span", { class: "in", children: [
        /* @__PURE__ */ e("input", { inputMode: "decimal", value: s, "aria-label": "Trail distance percent", onInput: (k) => a(_e(k)) }),
        /* @__PURE__ */ e("span", { children: "%" })
      ] }),
      /* @__PURE__ */ e("span", { class: "hint num", children: g ? `If it started now: closes at ≈ ${Y(f, r.tick)}` : `Strike allows ${Nn}–${Pn}%` })
    ] }),
    /* @__PURE__ */ e("div", { class: "pa-pcts four", children: [0.5, 1, 2, 5].map((k) => /* @__PURE__ */ e("button", { class: `pa-btn dark${h === k ? " on" : ""}`, onClick: () => a(String(k)), children: [
      k,
      "%"
    ] }, k)) }),
    /* @__PURE__ */ e(Qn, { label: "Activation price (optional)", value: o, onInput: l, aria: "Activation price", mark: r.mark, tick: r.tick, hint: "Leave empty to start trailing right away" }),
    /* @__PURE__ */ e("div", { class: "pa-seg", role: "radiogroup", "aria-label": "Trigger price", children: ["mark_price", "contract_price"].map((k) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": d === k, class: d === k ? "on" : "", onClick: () => p(k), children: k === "mark_price" ? "Follow mark" : "Follow last" }, k)) }),
    /* @__PURE__ */ e(Ln, { busy: u, label: "Set trailing stop", onClick: y, disabled: !g })
  ] });
}
function Cs({ s: t, p: n, onClose: i }) {
  const r = Ei(t, n), [s, a] = m("add"), [o, l] = m(""), [d, p] = m(!1), u = ur(n), c = Number(o) || 0, h = async () => {
    p(!0);
    const g = await t.modifyMargin(n.symbol, c, s);
    p(!1), g && i();
  };
  return /* @__PURE__ */ e(Oe, { title: "Modify margin", onClose: () => !d && i(), children: [
    /* @__PURE__ */ e("div", { class: "pa-seg", role: "radiogroup", children: ["add", "remove"].map((g) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": s === g, class: s === g ? "on" : "", onClick: () => a(g), children: g === "add" ? "Add margin" : "Remove margin" }, g)) }),
    /* @__PURE__ */ e("label", { class: "pa-field", children: [
      /* @__PURE__ */ e("span", { class: "lbl", children: "Amount" }),
      /* @__PURE__ */ e("span", { class: "in", children: [
        /* @__PURE__ */ e("span", { class: "muted", children: "$" }),
        /* @__PURE__ */ e("input", { inputMode: "decimal", value: o, placeholder: "0.00", "aria-label": "Margin amount", onInput: (g) => l(_e(g)) }),
        s === "add" && /* @__PURE__ */ e("button", { class: "pa-chipmini", onClick: (g) => (g.preventDefault(), l(String(Math.floor(t.available * 100) / 100))), children: "Max" })
      ] })
    ] }),
    /* @__PURE__ */ e(Te, { children: [
      /* @__PURE__ */ e(Q, { k: "Current margin", v: /* @__PURE__ */ e("span", { class: "num", children: H(u) }) }),
      /* @__PURE__ */ e(Q, { k: s === "add" ? "Available to add" : "After removing", v: /* @__PURE__ */ e("span", { class: "num", children: H(s === "add" ? t.available : Math.max(0, u - c)) }) }),
      r.liq > 0 && /* @__PURE__ */ e(Q, { k: "Liquidation price now", v: /* @__PURE__ */ e("span", { class: "num", children: Y(r.liq, r.tick) }) })
    ] }),
    /* @__PURE__ */ e("p", { class: "pa-p sm", children: "Adding margin moves the liquidation price further away; removing it brings it closer. Strike checks how much can be removed." }),
    /* @__PURE__ */ e(Ln, { busy: d, label: s === "add" ? "Add margin" : "Remove margin", onClick: h, disabled: !(c > 0) || s === "add" && c > t.available })
  ] });
}
function $s({ s: t, p: n, onClose: i }) {
  const r = Ei(t, n), [s, a] = m(!1), o = async () => {
    a(!0);
    const l = await t.reverse(n);
    a(!1), l && i();
  };
  return /* @__PURE__ */ e(Oe, { title: "Reverse position", onClose: () => !s && i(), children: [
    /* @__PURE__ */ e("div", { class: "pa-rev", children: [
      /* @__PURE__ */ e("span", { class: r.long ? "pos" : "neg", children: [
        r.long ? "Long" : "Short",
        " ",
        pe(r.abs),
        " ",
        r.base
      ] }),
      /* @__PURE__ */ e(K, { n: "right", size: 18 }),
      /* @__PURE__ */ e("span", { class: r.long ? "neg" : "pos", children: [
        r.long ? "Short" : "Long",
        " ",
        pe(r.abs),
        " ",
        r.base
      ] })
    ] }),
    /* @__PURE__ */ e("p", { class: "pa-p", children: [
      "One market order of ",
      pe(r.abs * 2),
      " ",
      r.base,
      " on the other side closes this position and opens the opposite one at the same size and ",
      r.lev,
      "x. It needs margin for the new side and pays fees on the full order."
    ] }),
    /* @__PURE__ */ e(Ln, { busy: s, label: `Go ${r.long ? "Short" : "Long"}`, onClick: o, cls: r.long ? "short" : "long" })
  ] });
}
function Ms({ s: t, p: n, onClose: i, onClosed: r }) {
  const s = Ei(t, n), [a, o] = m("market"), [l, d] = m(1), [p, u] = m(""), [c, h] = m(!1), g = s.m ? bs(s.m.spec, s.abs, l, a) : s.abs * l, [f, y] = m(void 0);
  Z(() => {
    let v = !0;
    return t.client.market.depth(n.symbol, 100).then(
      ($) => v && y(vo($.bids, $.asks)),
      () => v && y(null)
    ), () => {
      v = !1;
    };
  }, [n.symbol]);
  const k = Number(t.client.raw(n.symbol)?.order_market_price_bound) || 0.05, _ = f && g > 0 ? hr(f, s.long ? "sell" : "buy", g, { mark: s.mark, bound: k }) : null, w = f !== void 0 && (!_ || _.beyondBand || !_.complete), z = _ && !w ? (s.long ? 1 : -1) * (_.avgPrice - s.entry) * g : null, C = async () => {
    h(!0);
    const v = a === "limit" ? await t.limitClose(n, Number(p), l) : await t.closePosition(n, l);
    h(!1), v ? (i(), l >= 1 && a === "market" && r?.()) : a === "market" && (o("limit"), !p && s.mark > 0 && u(ue(s.mark, s.tick)));
  };
  return /* @__PURE__ */ e(Oe, { title: "Close position", onClose: () => !c && i(), children: [
    /* @__PURE__ */ e("div", { class: "pa-seg", role: "radiogroup", "aria-label": "Close type", children: ["market", "limit"].map((v) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": a === v, class: a === v ? "on" : "", onClick: () => o(v), children: v === "market" ? "Market close" : "Limit close" }, v)) }),
    a === "limit" && /* @__PURE__ */ e(Qn, { label: "Close at price", value: p, onInput: u, aria: "Limit close price", mark: s.mark, tick: s.tick, hint: Number(p) > 0 ? `Est. P&L at this price ≈ ${H((s.long ? 1 : -1) * (Number(p) - s.entry) * g, { sign: !0 })}` : void 0 }),
    /* @__PURE__ */ e(Ro, { value: l, onChange: d }),
    /* @__PURE__ */ e(Te, { children: [
      /* @__PURE__ */ e(Q, { k: "You close", v: /* @__PURE__ */ e("span", { class: "num", children: `${pe(g)} ${s.base}` }), vsub: /* @__PURE__ */ e("span", { class: "num", children: `≈ ${H(g * s.mark)}` }) }),
      a === "market" && /* @__PURE__ */ e(
        Q,
        {
          k: "Estimated P&L",
          sub: _ && !w ? `at about ${Y(_.avgPrice, s.tick)}` : void 0,
          v: z !== null ? /* @__PURE__ */ e("span", { class: `num ${z >= 0 ? "pos" : "neg"}`, children: H(z, { sign: !0 }) }) : /* @__PURE__ */ e("span", { class: "num", children: "—" })
        }
      ),
      g < s.abs && /* @__PURE__ */ e(Q, { k: "Stays open", v: /* @__PURE__ */ e("span", { class: "num", children: `${pe(s.abs - g)} ${s.base}` }) })
    ] }),
    /* @__PURE__ */ e("p", { class: "pa-p sm", children: a === "market" ? w ? `There aren't enough ${s.long ? "buyers" : "sellers"} within ${(k * 100).toFixed(0)}% of the market price right now, so Strike would cancel a market close. Try a limit close instead.` : `Closes at the market price. Strike cancels the close if there are no ${s.long ? "buyers" : "sellers"} close enough to the market price; your position then stays open (try a limit close instead).` : "A reduce-only limit order: it waits on the book and closes when the price reaches yours. It can only shrink this position." }),
    /* @__PURE__ */ e(Ln, { busy: c, label: a === "limit" ? l >= 1 ? "Place limit close" : `Limit close ${l * 100}%` : l >= 1 ? "Close position" : `Close ${l * 100}%`, onClick: C, disabled: a === "limit" && !(Number(p) > 0) })
  ] });
}
function ip({ s: t, onClose: n }) {
  const [i, r] = m(!1), s = async () => {
    r(!0), await t.closeAll(), r(!1), n();
  }, a = t.positions.reduce((o, l) => o + Number(l.upnl), 0);
  return /* @__PURE__ */ e(Oe, { title: "Close all positions", onClose: () => !i && n(), children: [
    /* @__PURE__ */ e(Te, { children: t.positions.map((o) => /* @__PURE__ */ e(Q, { k: `${o.symbol.split("-")[0]} ${Number(o.size) > 0 ? "Long" : "Short"}`, sub: /* @__PURE__ */ e("span", { class: "num", children: pe(Math.abs(Number(o.size))) }), v: /* @__PURE__ */ e("span", { class: `num ${Number(o.upnl) >= 0 ? "pos" : "neg"}`, children: H(Number(o.upnl), { sign: !0 }) }) }, o.id)) }),
    /* @__PURE__ */ e("p", { class: "pa-p sm", children: [
      "All positions close at the market price (",
      H(a, { sign: !0 }),
      " estimated P&L). Strike cancels any close it can't fill near the market price; those positions stay open."
    ] }),
    /* @__PURE__ */ e(Ln, { busy: i, label: "Close all at market", onClick: s })
  ] });
}
function qo({ s: t, o: n, onClose: i }) {
  const r = t.bySymbol[n.symbol], s = r?.spec.tickSize ?? 1e-4, a = String(n.type), o = tn(a), l = $n(a), d = Math.max(0, Number(n.size) - (Number(n.filled) || 0)), [p, u] = m(o ? String(Number(n.price) || "") : ""), [c, h] = m(l ? String(Number(n.stop_price) || "") : ""), [g, f] = m(String(d)), [y, k] = m(!1), _ = async () => {
    k(!0);
    const z = await t.editOrder(n, { price: o ? Number(p) : void 0, stopPrice: l ? Number(c) : void 0, size: Number(g) || d });
    k(!1), z && i();
  }, w = n.symbol.split("-")[0];
  return /* @__PURE__ */ e(Oe, { title: "Edit order", onClose: () => !y && i(), children: [
    /* @__PURE__ */ e(Te, { children: /* @__PURE__ */ e(Q, { k: `${n.side === "buy" ? "Buy" : "Sell"} ${String(n.type).replace(/_/g, " ")}`, sub: n.reduce_only ? "Reduce only" : void 0, v: /* @__PURE__ */ e("span", { class: "num", children: Y(r?.mark ?? 0, s) }), vsub: "current price" }) }),
    l && /* @__PURE__ */ e(Qn, { label: "Trigger price", value: c, onInput: h, aria: "Trigger price", mark: r?.mark, tick: s }),
    o && /* @__PURE__ */ e(Qn, { label: "Limit price", value: p, onInput: u, aria: "Limit price", mark: r?.mark, tick: s }),
    /* @__PURE__ */ e("label", { class: "pa-field", children: [
      /* @__PURE__ */ e("span", { class: "lbl", children: [
        "Size (",
        w,
        ")"
      ] }),
      /* @__PURE__ */ e("span", { class: "in", children: /* @__PURE__ */ e("input", { inputMode: "decimal", value: g, "aria-label": "Order size", onInput: (z) => f(_e(z)) }) })
    ] }),
    /* @__PURE__ */ e("p", { class: "pa-p sm", children: "Strike replaces the order in one step (cancel + new order). Orders linked to a TP/SL bracket or a grid bot can't be edited this way." }),
    /* @__PURE__ */ e(Ln, { busy: y, label: "Save changes", onClick: _, disabled: !(Number(g) > 0) || o && !(Number(p) > 0) || l && !(Number(c) > 0) })
  ] });
}
function rp(t, n) {
  const i = [];
  for (const r of t) {
    const s = r.type.toLowerCase();
    if (s !== "deposit" && s !== "withdraw" && s !== "withdrawal") continue;
    const a = s === "deposit", l = !(a && /pending_settlement/i.test(r.status)) && /pending|processing|submitted/i.test(r.status) && !/settled|completed/i.test(r.status);
    i.push({
      id: `t${r.id}`,
      time: r.time,
      icon: { glyph: a ? "arrowDown" : "arrowUp" },
      title: `${a ? "Deposited" : "Withdrew"}${r.asset ? ` ${r.asset}` : a ? " ADA" : ""}`,
      sub: `Perps · ${rn(r.time)}${l ? " · Pending" : /fail|reject/i.test(r.status) ? " · Failed" : ""}`,
      amount: H(a ? Math.abs(r.amount) : -Math.abs(r.amount), { sign: !0 }),
      cls: a ? "pos" : ""
    });
  }
  for (const r of n) {
    const s = r.symbol.split("-")[0], a = as(r.side, r.realizedPnl), o = r.realizedPnl ?? 0;
    i.push({
      id: `f${r.id}`,
      time: r.time,
      icon: { coin: s },
      title: `${a || "Trade"} ${r.size !== null ? pe(r.size) : ""} ${s}`.replace(/\s+/g, " ").trim(),
      sub: `${r.price !== null ? `at $${r.price.toLocaleString("en-US", { maximumFractionDigits: 6 })}` : "Perps"} · ${rn(r.time)}${r.autoClose ? ` · ${r.autoClose.replace(/_/g, " ")}` : ""}`,
      amount: o ? H(o, { sign: !0 }) : r.size !== null && r.price !== null ? H(r.size * r.price) : "",
      cls: o > 0 ? "pos" : o < 0 ? "neg" : "muted"
    });
  }
  return i.sort((r, s) => s.time - r.time);
}
function zs(t) {
  const [n, i] = m(null), [r, s] = m("");
  return Z(() => {
    if (!t.session) return;
    let a = !0;
    return Promise.all([t.client.account.transactions(t.session.accountId, 200).catch(() => null), t.client.account.fillsPage({ limit: 100 }).catch(() => null)]).then(([o, l]) => {
      a && (!o && !l && s("Couldn't load your activity from Strike."), i(rp(o ?? [], l?.items ?? [])));
    }), () => {
      a = !1;
    };
  }, [t.session?.accountId]), { items: n, error: r };
}
function sp({ s: t, nav: n }) {
  const { items: i, error: r } = zs(t), s = [];
  for (const a of i ?? []) {
    const o = new Date(a.time).toLocaleDateString("en-US", { month: "long", year: "numeric" }), l = s[s.length - 1];
    l && l[0] === o ? l[1].push(a) : s.push([o, [a]]);
  }
  return /* @__PURE__ */ e("div", { class: "pa-screen", children: [
    /* @__PURE__ */ e("div", { class: "pa-top", children: [
      /* @__PURE__ */ e(tt, { n: "back", label: "Back", onClick: n.back }),
      /* @__PURE__ */ e("div", { class: "pa-title", children: "History" })
    ] }),
    /* @__PURE__ */ e("div", { class: "pa-scroll", children: [
      !t.session && /* @__PURE__ */ e("div", { class: "pa-empty", children: "Connect a wallet to see your activity." }),
      t.session && i === null && /* @__PURE__ */ e("div", { class: "pa-empty", children: /* @__PURE__ */ e(Ze, {}) }),
      r && /* @__PURE__ */ e("div", { class: "pa-warn", children: [
        /* @__PURE__ */ e(K, { n: "warn", size: 16 }),
        r
      ] }),
      i && !i.length && !r && /* @__PURE__ */ e("div", { class: "pa-nothing", children: [
        /* @__PURE__ */ e("span", { class: "ic", children: /* @__PURE__ */ e(K, { n: "x", size: 18 }) }),
        "No Activity Found"
      ] }),
      s.map(([a, o]) => /* @__PURE__ */ e("div", { children: [
        /* @__PURE__ */ e("div", { class: "pa-month", children: a }),
        o.map((l) => /* @__PURE__ */ e("div", { class: "pa-act", children: [
          l.icon.coin ? /* @__PURE__ */ e(_t, { base: l.icon.coin, size: 38 }) : /* @__PURE__ */ e("span", { class: "glyph", children: /* @__PURE__ */ e(K, { n: l.icon.glyph, size: 18 }) }),
          /* @__PURE__ */ e("span", { class: "l", children: [
            /* @__PURE__ */ e("b", { children: l.title }),
            /* @__PURE__ */ e("span", { class: "s", children: l.sub })
          ] }),
          /* @__PURE__ */ e("span", { class: `r num ${l.cls}`, children: l.amount })
        ] }, l.id))
      ] }, a)),
      /* @__PURE__ */ e("div", { class: "pa-bottom-pad sm" })
    ] })
  ] });
}
const ap = [
  ["closed", "Positions"],
  ["ohist", "Orders"],
  ["fills", "Trades"],
  ["funding", "Funding"]
];
function op({ s: t, onPick: n }) {
  const [i, r] = m("positions"), [s, a] = m("closed"), o = i === "history" ? s : i, l = [
    ["positions", `Positions (${t.positions.length})`],
    ["orders", `Open Orders (${t.orders.length})`],
    ["twap", "TWAP"],
    ["grid", "Grid"],
    ["history", "History"],
    ["transfers", "Transfers"]
  ];
  return /* @__PURE__ */ e("div", { class: "pd-panel pd-bottom", children: [
    /* @__PURE__ */ e("div", { class: "pd-tabs left scroll", children: l.map(([d, p]) => /* @__PURE__ */ e("button", { class: i === d ? "on" : "", onClick: () => r(d), children: p }, d)) }),
    i === "history" && /* @__PURE__ */ e("div", { class: "pd-subtabs", role: "tablist", "aria-label": "History", children: ap.map(([d, p]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": s === d, class: s === d ? "on" : "", onClick: () => a(d), children: p }, d)) }),
    /* @__PURE__ */ e("div", { class: "pd-table-wrap", children: t.session ? o === "positions" ? /* @__PURE__ */ e(lp, { s: t, onPick: n }) : o === "orders" ? /* @__PURE__ */ e(cp, { s: t, onPick: n }) : o === "twap" ? /* @__PURE__ */ e(dp, { s: t }) : o === "grid" ? /* @__PURE__ */ e(pp, { s: t }) : o === "closed" ? /* @__PURE__ */ e(up, { s: t }) : o === "ohist" ? /* @__PURE__ */ e(hp, { s: t }) : o === "fills" ? /* @__PURE__ */ e(mp, { s: t }) : o === "funding" ? /* @__PURE__ */ e(gp, { s: t }) : /* @__PURE__ */ e(fp, { s: t }) : /* @__PURE__ */ e("div", { class: "pd-center", children: [
      /* @__PURE__ */ e("span", { class: "muted", children: "No wallet connected" }),
      /* @__PURE__ */ e("button", { class: "pd-btn sm", onClick: () => t.setSheet("connect"), children: "Connect wallet" })
    ] }) })
  ] });
}
function En({ sym: t, onPick: n }) {
  const i = t.split("-")[0], r = /* @__PURE__ */ e(R, { children: [
    /* @__PURE__ */ e(_t, { base: i, size: 20 }),
    /* @__PURE__ */ e("b", { children: i })
  ] });
  return n ? /* @__PURE__ */ e("button", { class: "pd-mk", onClick: () => n(t), children: r }) : /* @__PURE__ */ e("span", { class: "pd-mk", children: r });
}
function lp({ s: t, onPick: n }) {
  const [i, r] = m(null);
  return t.positions.length ? /* @__PURE__ */ e(R, { children: [
    /* @__PURE__ */ e("table", { class: "pd-table", children: [
      /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ e("tr", { children: [
        /* @__PURE__ */ e("th", { children: "Market" }),
        /* @__PURE__ */ e("th", { children: "Size" }),
        /* @__PURE__ */ e("th", { children: "Value" }),
        /* @__PURE__ */ e("th", { children: "Entry" }),
        /* @__PURE__ */ e("th", { children: "Mark" }),
        /* @__PURE__ */ e("th", { children: "PnL (ROE)" }),
        /* @__PURE__ */ e("th", { children: "Liq. Price" }),
        /* @__PURE__ */ e("th", { children: "Margin" }),
        /* @__PURE__ */ e("th", { children: "Funding" }),
        /* @__PURE__ */ e("th", { children: "TP / SL" }),
        /* @__PURE__ */ e("th", { class: "act", children: /* @__PURE__ */ e("button", { class: "pd-btn sm", onClick: () => r({ kind: "closeall" }), children: "Close all" }) })
      ] }) }),
      /* @__PURE__ */ e("tbody", { children: t.positions.map((s) => {
        const a = t.bySymbol[s.symbol], o = s.symbol.split("-")[0], l = Number(s.size), d = a?.mark || Number(s.entry_price), p = a?.spec.tickSize, u = ur(s), c = Number(s.upnl), h = vr(t, s.symbol), g = h.find((k) => String(k.type).startsWith("take_profit")), f = h.find((k) => String(k.type).startsWith("stop")), y = h.find((k) => String(k.type).startsWith("trailing"));
        return /* @__PURE__ */ e("tr", { children: [
          /* @__PURE__ */ e("td", { children: /* @__PURE__ */ e("span", { class: "pd-mk", children: [
            /* @__PURE__ */ e("button", { class: "pd-mk", onClick: () => n(s.symbol), children: [
              /* @__PURE__ */ e(_t, { base: o, size: 20 }),
              /* @__PURE__ */ e("b", { children: o })
            ] }),
            /* @__PURE__ */ e("span", { class: `pd-badge ${l > 0 ? "long" : "short"}`, children: [
              l > 0 ? "Long" : "Short",
              " ",
              s.leverage,
              "x ",
              s.margin_mode === "isolated" ? "Iso" : ""
            ] })
          ] }) }),
          /* @__PURE__ */ e("td", { class: "num", children: [
            pe(Math.abs(l)),
            " ",
            o
          ] }),
          /* @__PURE__ */ e("td", { class: "num", children: H(Math.abs(l) * d) }),
          /* @__PURE__ */ e("td", { class: "num", children: Y(Number(s.entry_price), p) }),
          /* @__PURE__ */ e("td", { class: "num", children: Y(d, p) }),
          /* @__PURE__ */ e("td", { class: `num ${c >= 0 ? "pos" : "neg"}`, children: [
            H(c, { sign: !0 }),
            " (",
            dt(u > 0 ? c / u * 100 : 0, 1),
            ")"
          ] }),
          /* @__PURE__ */ e("td", { class: "num", children: Number(s.liquidation_price) > 0 ? Y(Number(s.liquidation_price), p) : "—" }),
          /* @__PURE__ */ e("td", { class: "num", children: H(u) }),
          /* @__PURE__ */ e("td", { class: "num", children: Number(s.accumulated_funding_fees) ? H(Number(s.accumulated_funding_fees), { decimals: 4 }) : "—" }),
          /* @__PURE__ */ e("td", { class: "num", children: /* @__PURE__ */ e("button", { class: "pd-link", onClick: () => r({ kind: "tpsl", p: s }), title: "Edit take profit / stop loss", children: [
            g ? Y(Number(g.stop_price), p) : "—",
            " / ",
            f ? Y(Number(f.stop_price), p) : "—",
            y ? " · trail" : "",
            " ✎"
          ] }) }),
          /* @__PURE__ */ e("td", { class: "act", children: [
            /* @__PURE__ */ e("button", { class: "pd-btn sm", onClick: () => r({ kind: "close", p: s }), children: "Close" }),
            /* @__PURE__ */ e("button", { class: "pd-btn sm", title: "Trailing stop", onClick: () => r({ kind: "trail", p: s }), children: "Trail" }),
            s.margin_mode === "isolated" && /* @__PURE__ */ e("button", { class: "pd-btn sm", title: "Add or remove margin", onClick: () => r({ kind: "margin", p: s }), children: "Margin" }),
            /* @__PURE__ */ e("button", { class: "pd-btn sm", title: "Reverse position (long ↔ short)", onClick: () => r({ kind: "reverse", p: s }), children: "Reverse" })
          ] })
        ] }, s.id);
      }) })
    ] }),
    i?.kind === "close" && /* @__PURE__ */ e(Ms, { s: t, p: i.p, onClose: () => r(null) }),
    i?.kind === "tpsl" && /* @__PURE__ */ e(_s, { s: t, p: i.p, onClose: () => r(null) }),
    i?.kind === "trail" && /* @__PURE__ */ e(Ss, { s: t, p: i.p, onClose: () => r(null) }),
    i?.kind === "margin" && /* @__PURE__ */ e(Cs, { s: t, p: i.p, onClose: () => r(null) }),
    i?.kind === "reverse" && /* @__PURE__ */ e($s, { s: t, p: i.p, onClose: () => r(null) }),
    i?.kind === "closeall" && /* @__PURE__ */ e(ip, { s: t, onClose: () => r(null) })
  ] }) : /* @__PURE__ */ e("div", { class: "pd-center muted", children: "No open positions" });
}
function cp({ s: t, onPick: n }) {
  const [i, r] = m(null);
  return t.orders.length ? /* @__PURE__ */ e(R, { children: [
    /* @__PURE__ */ e("table", { class: "pd-table", children: [
      /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ e("tr", { children: [
        /* @__PURE__ */ e("th", { children: "Time" }),
        /* @__PURE__ */ e("th", { children: "Market" }),
        /* @__PURE__ */ e("th", { children: "Type" }),
        /* @__PURE__ */ e("th", { children: "Side" }),
        /* @__PURE__ */ e("th", { children: "Size" }),
        /* @__PURE__ */ e("th", { children: "Price" }),
        /* @__PURE__ */ e("th", { children: "Trigger" }),
        /* @__PURE__ */ e("th", { children: "Filled" }),
        /* @__PURE__ */ e("th", { class: "act", children: /* @__PURE__ */ e("button", { class: "pd-btn sm", onClick: () => t.cancelAll(), children: "Cancel all" }) })
      ] }) }),
      /* @__PURE__ */ e("tbody", { children: t.orders.map((s) => {
        const a = t.bySymbol[s.symbol]?.spec.tickSize, o = !/market$|^market|trailing/.test(String(s.type));
        return /* @__PURE__ */ e("tr", { children: [
          /* @__PURE__ */ e("td", { class: "muted num", children: [
            rn(Number(s.create_timestamp)),
            " ",
            sn(Number(s.create_timestamp))
          ] }),
          /* @__PURE__ */ e("td", { children: /* @__PURE__ */ e(En, { sym: s.symbol, onPick: n }) }),
          /* @__PURE__ */ e("td", { children: [
            String(s.type).replace(/_/g, " "),
            s.reduce_only ? " · reduce only" : ""
          ] }),
          /* @__PURE__ */ e("td", { class: s.side === "buy" ? "pos" : "neg", children: s.side === "buy" ? "Buy" : "Sell" }),
          /* @__PURE__ */ e("td", { class: "num", children: pe(Number(s.size)) }),
          /* @__PURE__ */ e("td", { class: "num", children: Number(s.price) ? Y(Number(s.price), a) : "Market" }),
          /* @__PURE__ */ e("td", { class: "num", children: Number(s.stop_price) ? Y(Number(s.stop_price), a) : "—" }),
          /* @__PURE__ */ e("td", { class: "num", children: pe(Number(s.filled) || 0) }),
          /* @__PURE__ */ e("td", { class: "act", children: [
            o && /* @__PURE__ */ e("button", { class: "pd-btn sm", onClick: () => r(s), children: "Edit" }),
            /* @__PURE__ */ e("button", { class: "pd-btn sm", onClick: () => t.cancelOrder(s), children: "Cancel" })
          ] })
        ] }, s.id);
      }) })
    ] }),
    i && /* @__PURE__ */ e(qo, { s: t, o: i, onClose: () => r(null) })
  ] }) : /* @__PURE__ */ e("div", { class: "pd-center muted", children: "No open orders" });
}
function ni(t, n, i = 0) {
  const [r, s] = m(null), [a, o] = m(0);
  return Z(() => {
    let l = !0;
    const d = () => t().then((u) => l && s(u)).catch(() => l && s((u) => u ?? []));
    d();
    const p = i ? setInterval(() => !At() && d(), i) : void 0;
    return () => {
      l = !1, p && clearInterval(p);
    };
  }, [...n, a]), [r, () => o(a + 1)];
}
const In = () => /* @__PURE__ */ e("div", { class: "pd-center", children: /* @__PURE__ */ e(Ze, {}) });
function dp({ s: t }) {
  const [n, i] = ni(() => t.client.trading.twaps("all"), [t.session?.accountId], 5e3);
  return n === null ? /* @__PURE__ */ e(In, {}) : n.length ? /* @__PURE__ */ e("table", { class: "pd-table", children: [
    /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ e("tr", { children: [
      /* @__PURE__ */ e("th", { children: "Started" }),
      /* @__PURE__ */ e("th", { children: "Market" }),
      /* @__PURE__ */ e("th", { children: "Side" }),
      /* @__PURE__ */ e("th", { children: "Filled" }),
      /* @__PURE__ */ e("th", { children: "Slices" }),
      /* @__PURE__ */ e("th", { children: "Status" }),
      /* @__PURE__ */ e("th", {})
    ] }) }),
    /* @__PURE__ */ e("tbody", { children: n.map((r) => /* @__PURE__ */ e("tr", { children: [
      /* @__PURE__ */ e("td", { class: "muted num", children: r.createdAt ? `${rn(r.createdAt)} ${sn(r.createdAt)}` : "—" }),
      /* @__PURE__ */ e("td", { children: /* @__PURE__ */ e(En, { sym: r.symbol }) }),
      /* @__PURE__ */ e("td", { class: r.side === "buy" ? "pos" : "neg", children: r.side === "buy" ? "Buy" : "Sell" }),
      /* @__PURE__ */ e("td", { class: "num", children: [
        pe(r.filledSize ?? 0),
        " / ",
        pe(r.totalSize ?? 0)
      ] }),
      /* @__PURE__ */ e("td", { class: "num", children: [
        r.slicesFired ?? "—",
        r.nominalSlices ? ` / ${r.nominalSlices}` : ""
      ] }),
      /* @__PURE__ */ e("td", { children: r.status }),
      /* @__PURE__ */ e("td", { class: "act", children: (r.status === "active" || r.status === "running") && /* @__PURE__ */ e("button", { class: "pd-btn sm", onClick: async () => (await t.client.trading.cancelTwap(r.id).then(() => t.notify("ok", "TWAP cancelling")).catch((s) => t.notify("err", "Couldn't cancel", s?.message)), i()), children: "Cancel" }) })
    ] }, r.id)) })
  ] }) : /* @__PURE__ */ e("div", { class: "pd-center muted", children: "No TWAP orders. Start one from the order panel (Order Type → TWAP)." });
}
function pp({ s: t }) {
  const [n, i] = ni(() => t.client.trading.grids(), [t.session?.accountId], 8e3);
  return n === null ? /* @__PURE__ */ e(In, {}) : n.length ? /* @__PURE__ */ e("table", { class: "pd-table", children: [
    /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ e("tr", { children: [
      /* @__PURE__ */ e("th", { children: "Started" }),
      /* @__PURE__ */ e("th", { children: "Market" }),
      /* @__PURE__ */ e("th", { children: "Mode" }),
      /* @__PURE__ */ e("th", { children: "Range" }),
      /* @__PURE__ */ e("th", { children: "Grids" }),
      /* @__PURE__ */ e("th", { children: "Collateral" }),
      /* @__PURE__ */ e("th", { children: "Grid profit" }),
      /* @__PURE__ */ e("th", { children: "Status" }),
      /* @__PURE__ */ e("th", {})
    ] }) }),
    /* @__PURE__ */ e("tbody", { children: n.map((r) => {
      const s = t.bySymbol[r.symbol]?.spec.tickSize;
      return /* @__PURE__ */ e("tr", { children: [
        /* @__PURE__ */ e("td", { class: "muted num", children: r.createdAt ? `${rn(r.createdAt)} ${sn(r.createdAt)}` : "—" }),
        /* @__PURE__ */ e("td", { children: /* @__PURE__ */ e(En, { sym: r.symbol }) }),
        /* @__PURE__ */ e("td", { children: r.mode.toLowerCase() }),
        /* @__PURE__ */ e("td", { class: "num", children: [
          r.lower ? Y(r.lower, s) : "—",
          " – ",
          r.upper ? Y(r.upper, s) : "—"
        ] }),
        /* @__PURE__ */ e("td", { class: "num", children: [
          r.grids ?? "—",
          " ",
          r.levels ? `(${r.filledLevels} filled)` : ""
        ] }),
        /* @__PURE__ */ e("td", { class: "num", children: r.collateral === null ? "—" : H(r.collateral) }),
        /* @__PURE__ */ e("td", { class: `num ${(r.profit ?? 0) > 0 ? "pos" : (r.profit ?? 0) < 0 ? "neg" : ""}`, children: r.profit === null ? "—" : H(r.profit, { sign: !0 }) }),
        /* @__PURE__ */ e("td", { children: r.status.toLowerCase() }),
        /* @__PURE__ */ e("td", { class: "act", children: (r.status === "RUNNING" || r.status === "CREATED") && /* @__PURE__ */ e("button", { class: "pd-btn sm", onClick: async () => (await t.client.trading.stopGrid(r.id, !0).then(() => t.notify("ok", "Grid bot stopping", "Its open orders are cancelled.")).catch((a) => t.notify("err", "Couldn't stop", a?.message)), i()), children: "Stop" }) })
      ] }, r.id);
    }) })
  ] }) : /* @__PURE__ */ e("div", { class: "pd-center muted", children: "No grid bots. Start one from the order panel (Order Type → Grid bot)." });
}
function up({ s: t }) {
  const [n] = ni(() => t.client.account.closedPositionsPage({ limit: 25 }).then((i) => i.items), [t.session?.accountId, t.positions.length]);
  return n === null ? /* @__PURE__ */ e(In, {}) : n.length ? /* @__PURE__ */ e("table", { class: "pd-table", children: [
    /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ e("tr", { children: [
      /* @__PURE__ */ e("th", { children: "Closed" }),
      /* @__PURE__ */ e("th", { children: "Market" }),
      /* @__PURE__ */ e("th", { children: "Margin" }),
      /* @__PURE__ */ e("th", { children: "Held" }),
      /* @__PURE__ */ e("th", { children: "Realized PnL" })
    ] }) }),
    /* @__PURE__ */ e("tbody", { children: n.map((i) => {
      const r = i.openTime && i.closeTime ? Math.max(0, Math.round((i.closeTime - i.openTime) / 6e4)) : null;
      return /* @__PURE__ */ e("tr", { children: [
        /* @__PURE__ */ e("td", { class: "muted num", children: [
          rn(i.closeTime),
          " ",
          sn(i.closeTime)
        ] }),
        /* @__PURE__ */ e("td", { children: /* @__PURE__ */ e(En, { sym: i.symbol }) }),
        /* @__PURE__ */ e("td", { children: i.marginMode || "—" }),
        /* @__PURE__ */ e("td", { class: "num", children: r === null ? "—" : r >= 1440 ? `${Math.floor(r / 1440)}d` : r >= 60 ? `${Math.floor(r / 60)}h ${r % 60}m` : `${r}m` }),
        /* @__PURE__ */ e("td", { class: `num ${(i.realizedPnl ?? 0) > 0 ? "pos" : (i.realizedPnl ?? 0) < 0 ? "neg" : ""}`, children: i.realizedPnl === null ? "—" : H(i.realizedPnl, { sign: !0 }) })
      ] }, i.id);
    }) })
  ] }) : /* @__PURE__ */ e("div", { class: "pd-center muted", children: "No closed positions yet." });
}
function hp({ s: t }) {
  const [n] = ni(() => t.client.account.orderHistoryPage({ limit: 50 }).then((i) => i.items), [t.session?.accountId, t.orders.length, t.positions.length]);
  return n === null ? /* @__PURE__ */ e(In, {}) : n.length ? /* @__PURE__ */ e("table", { class: "pd-table", children: [
    /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ e("tr", { children: [
      /* @__PURE__ */ e("th", { children: "Time" }),
      /* @__PURE__ */ e("th", { children: "Market" }),
      /* @__PURE__ */ e("th", { children: "Type" }),
      /* @__PURE__ */ e("th", { children: "Side" }),
      /* @__PURE__ */ e("th", { children: "Size" }),
      /* @__PURE__ */ e("th", { children: "Filled" }),
      /* @__PURE__ */ e("th", { children: "Price" }),
      /* @__PURE__ */ e("th", { children: "Status" })
    ] }) }),
    /* @__PURE__ */ e("tbody", { children: n.map((i) => /* @__PURE__ */ e("tr", { children: [
      /* @__PURE__ */ e("td", { class: "muted num", children: [
        rn(Number(i.create_timestamp)),
        " ",
        sn(Number(i.create_timestamp))
      ] }),
      /* @__PURE__ */ e("td", { children: /* @__PURE__ */ e(En, { sym: i.symbol }) }),
      /* @__PURE__ */ e("td", { children: [
        String(i.type).replace(/_/g, " "),
        i.reduce_only ? " · reduce only" : ""
      ] }),
      /* @__PURE__ */ e("td", { class: i.side === "buy" ? "pos" : "neg", children: i.side === "buy" ? "Buy" : "Sell" }),
      /* @__PURE__ */ e("td", { class: "num", children: pe(Number(i.size)) }),
      /* @__PURE__ */ e("td", { class: "num", children: pe(Number(i.filled) || 0) }),
      /* @__PURE__ */ e("td", { class: "num", children: Number(i.price) ? Y(Number(i.price), t.bySymbol[i.symbol]?.spec.tickSize) : Number(i.stop_price) ? `@${Y(Number(i.stop_price), t.bySymbol[i.symbol]?.spec.tickSize)}` : "Market" }),
      /* @__PURE__ */ e("td", { class: i.status === "rejected" ? "neg" : "muted", children: i.status })
    ] }, i.id)) })
  ] }) : /* @__PURE__ */ e("div", { class: "pd-center muted", children: "No orders yet." });
}
function mp({ s: t }) {
  const [n] = ni(() => t.client.account.fillsPage({ limit: 50 }).then((i) => i.items), [t.session?.accountId, t.positions.length]);
  return n === null ? /* @__PURE__ */ e(In, {}) : n.length ? /* @__PURE__ */ e("table", { class: "pd-table", children: [
    /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ e("tr", { children: [
      /* @__PURE__ */ e("th", { children: "Time" }),
      /* @__PURE__ */ e("th", { children: "Market" }),
      /* @__PURE__ */ e("th", { children: "Direction" }),
      /* @__PURE__ */ e("th", { children: "Price" }),
      /* @__PURE__ */ e("th", { children: "Size" }),
      /* @__PURE__ */ e("th", { children: "Fee" }),
      /* @__PURE__ */ e("th", { children: "Closed PnL" })
    ] }) }),
    /* @__PURE__ */ e("tbody", { children: n.map((i) => /* @__PURE__ */ e("tr", { children: [
      /* @__PURE__ */ e("td", { class: "muted num", children: [
        rn(i.time),
        " ",
        sn(i.time)
      ] }),
      /* @__PURE__ */ e("td", { children: /* @__PURE__ */ e(En, { sym: i.symbol }) }),
      /* @__PURE__ */ e("td", { class: i.side === "buy" ? "pos" : "neg", children: as(i.side, i.realizedPnl) || "—" }),
      /* @__PURE__ */ e("td", { class: "num", children: i.price === null ? "—" : Y(i.price, t.bySymbol[i.symbol]?.spec.tickSize) }),
      /* @__PURE__ */ e("td", { class: "num", children: i.size === null ? "—" : pe(i.size) }),
      /* @__PURE__ */ e("td", { class: "num", children: i.fee === null ? "—" : H(i.fee, { decimals: 4 }) }),
      /* @__PURE__ */ e("td", { class: `num ${(i.realizedPnl ?? 0) > 0 ? "pos" : (i.realizedPnl ?? 0) < 0 ? "neg" : "muted"}`, children: i.realizedPnl ? H(i.realizedPnl, { sign: !0 }) : "—" })
    ] }, i.id)) })
  ] }) : /* @__PURE__ */ e("div", { class: "pd-center muted", children: "Your trades will appear here after your first order." });
}
function gp({ s: t }) {
  const [n] = ni(() => t.client.account.fundingPage({ limit: 50 }).then((i) => i.items), [t.session?.accountId]);
  return n === null ? /* @__PURE__ */ e(In, {}) : n.length ? /* @__PURE__ */ e("table", { class: "pd-table", children: [
    /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ e("tr", { children: [
      /* @__PURE__ */ e("th", { children: "Time" }),
      /* @__PURE__ */ e("th", { children: "Market" }),
      /* @__PURE__ */ e("th", { children: "Side" }),
      /* @__PURE__ */ e("th", { children: "Size" }),
      /* @__PURE__ */ e("th", { children: "Rate" }),
      /* @__PURE__ */ e("th", { children: "Payment" })
    ] }) }),
    /* @__PURE__ */ e("tbody", { children: n.map((i) => /* @__PURE__ */ e("tr", { children: [
      /* @__PURE__ */ e("td", { class: "muted num", children: [
        rn(i.time),
        " ",
        sn(i.time)
      ] }),
      /* @__PURE__ */ e("td", { children: /* @__PURE__ */ e(En, { sym: i.symbol }) }),
      /* @__PURE__ */ e("td", { children: i.positionSide }),
      /* @__PURE__ */ e("td", { class: "num", children: i.positionSize === null ? "—" : pe(i.positionSize) }),
      /* @__PURE__ */ e("td", { class: "num", children: i.rate === null ? "—" : `${(i.rate * 100).toFixed(4)}%` }),
      /* @__PURE__ */ e("td", { class: `num ${(i.amount ?? 0) > 0 ? "pos" : (i.amount ?? 0) < 0 ? "neg" : ""}`, children: i.amount === null ? "—" : H(i.amount, { sign: !0, decimals: 4 }) })
    ] }, i.id)) })
  ] }) : /* @__PURE__ */ e("div", { class: "pd-center muted", children: "No funding payments yet. They happen every hour while a position is open." });
}
function fp({ s: t }) {
  const { items: n, error: i } = zs(t), r = (n ?? []).filter((s) => s.id.startsWith("t"));
  return n === null ? /* @__PURE__ */ e(In, {}) : i ? /* @__PURE__ */ e("div", { class: "pd-center muted", children: i }) : r.length ? /* @__PURE__ */ e("table", { class: "pd-table", children: [
    /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ e("tr", { children: [
      /* @__PURE__ */ e("th", { children: "Time" }),
      /* @__PURE__ */ e("th", { children: "Activity" }),
      /* @__PURE__ */ e("th", { children: "Status" }),
      /* @__PURE__ */ e("th", { children: "Amount" })
    ] }) }),
    /* @__PURE__ */ e("tbody", { children: r.map((s) => /* @__PURE__ */ e("tr", { children: [
      /* @__PURE__ */ e("td", { class: "muted num", children: [
        rn(s.time),
        " ",
        sn(s.time)
      ] }),
      /* @__PURE__ */ e("td", { children: s.title }),
      /* @__PURE__ */ e("td", { class: "muted", children: /Pending/.test(s.sub) ? "Pending" : /Failed/.test(s.sub) ? "Failed" : "Completed" }),
      /* @__PURE__ */ e("td", { class: `num ${s.cls}`, children: s.amount })
    ] }, s.id)) })
  ] }) : /* @__PURE__ */ e("div", { class: "pd-center muted", children: "No deposits or withdrawals yet." });
}
const ei = [
  { type: "market", label: "Market", desc: "Fills right away, near the market price" },
  { type: "limit", label: "Limit", desc: "Fills only at your price or better" },
  { type: "stop", label: "Stop Market", desc: "Market order once the price reaches your trigger", advanced: !0 },
  { type: "stop_limit", label: "Stop Limit", desc: "Limit order once the price reaches your trigger", advanced: !0 },
  { type: "take_profit", label: "Take Profit Market", desc: "Market order once the price reaches your target", advanced: !0 },
  { type: "take_profit_limit", label: "Take Profit Limit", desc: "Limit order once the price reaches your target", advanced: !0 },
  { type: "trailing_stop_market", label: "Trailing Stop", desc: "Follows the price and triggers when it turns by your trail %", advanced: !0 },
  { type: "twap", label: "TWAP", desc: "Splits the order into slices over 5 min – 24 h", advanced: !0 }
];
function bp(t, n) {
  return tn(t.type) && t.limitPrice > 0 ? t.limitPrice : (t.type === "stop" || t.type === "take_profit") && Number(t.triggerPrice) > 0 ? Number(t.triggerPrice) : t.type === "trailing_stop_market" && Number(t.activationPrice) > 0 ? Number(t.activationPrice) : n;
}
function xp(t, n) {
  const i = t.type;
  return {
    symbol: t.symbol,
    side: t.side,
    type: i,
    size: n.size,
    price: tn(i) ? t.limitPrice : void 0,
    stopPrice: i === "stop" || i === "stop_limit" || i === "take_profit" || i === "take_profit_limit" ? t.triggerPrice : void 0,
    workingType: t.workingType,
    timeInForce: tn(i) ? t.tif : void 0,
    postOnly: i === "limit" ? t.postOnly : void 0,
    // Strike: a trailing stop only reduces or closes a position, never opens one.
    reduceOnly: t.reduceOnly || i === "trailing_stop_market" || void 0,
    callbackRate: i === "trailing_stop_market" ? t.callbackRate : void 0,
    activationPrice: i === "trailing_stop_market" && Number(t.activationPrice) > 0 ? t.activationPrice : void 0,
    slippage: i === "market" && Number(t.slippage) > 0 ? t.slippage : void 0,
    takeProfit: (i === "market" || i === "limit") && n.tpPrice > 0 ? n.tpPrice : void 0,
    stopLoss: (i === "market" || i === "limit") && n.slPrice > 0 ? n.slPrice : void 0,
    leverage: t.reduceOnly || i === "trailing_stop_market" ? void 0 : n.lev
  };
}
const vp = (t) => Math.ceil(t * 100 - 1e-9) / 100, kp = (t) => Math.floor(t * 100 + 1e-9) / 100;
function Ga(t, n, i, r) {
  const s = r / 100 / Math.max(1, i);
  return t === "buy" ? n * (1 + s) : n * (1 - s);
}
function xn(t, n, i, r) {
  if (!(n > 0) || !(r > 0)) return 0;
  const s = (r - n) / n;
  return (t === "buy" ? s : -s) * Math.max(1, i) * 100;
}
function Ts(t, n, i) {
  const r = t.spec;
  if (!r || !(t.available > 0)) return 0;
  const s = t.takerRate + t.feeBps / 1e4;
  let a = Math.max(1, n), o = 0;
  for (let l = 0; l < 4; l++)
    o = t.available * i / (1 + a * s), a = Math.max(1, Math.min(n, Gn(r.marginTiers, o * a)));
  return kp(o * 0.998);
}
function Ns(t, n) {
  const i = n.spec, r = n.takerRate + n.feeBps / 1e4, s = {
    ok: !1,
    problem: null,
    kind: null,
    px: 0,
    lev: Math.max(1, Math.round(t.leverage)),
    levCap: Math.max(1, n.maxLeverage),
    size: 0,
    notional: 0,
    margin: 0,
    fee: 0,
    feeRate: r,
    liq: 0,
    liqDistance: 0,
    minMargin: 0,
    maxMargin: 0,
    tpPrice: 0,
    slPrice: 0,
    step: 0
  };
  if (!i || !(n.mark > 0)) return { ...s, problem: "Loading market…", kind: "load" };
  const a = bp(t, n.mark), o = t.type === "twap" || yo(t.type) ? i.marketStepSize ?? i.stepSize : i.stepSize, l = Math.max(1, Math.round(t.leverage)), d = t.unit === "usd" ? t.amount * l : t.amount * a, p = Gn(i.marginTiers, Math.max(d, 1)), u = Math.max(1, Math.min(n.maxLeverage, i.maxLeverage, p)), c = Math.min(l, u), h = t.unit === "usd" ? t.amount * c : t.amount * a, g = Number(ue(h / a, o, "floor")), f = o > 0 && g * a < i.minNotional && h >= i.minNotional ? Number(ue(g + o, o, "floor")) : g, y = f * a, k = Zr({ side: t.side, price: a, notional: y || 1, leverage: c, takerRate: n.takerRate, builderFeeBps: n.feeBps, tiers: i.marginTiers }), _ = y / c, w = y * r, z = vp(i.minNotional / c), C = Ts(n, c, 1), v = t.type === "market" || t.type === "limit", $ = v && t.tp > 0 ? t.autoMode === "pnl" ? Ga(t.side, a, c, t.tp) : t.tp : 0, S = v && t.sl > 0 ? t.autoMode === "pnl" ? Ga(t.side, a, c, -t.sl) : t.sl : 0, B = { ...s, px: a, lev: c, levCap: u, size: f, notional: y, margin: _, fee: w, liq: k.liquidationPrice, liqDistance: k.liquidationDistance, minMargin: z, maxMargin: C, tpPrice: $, slPrice: S, step: o }, x = (T, P) => ({ ...B, problem: T, kind: P });
  if (!(t.amount > 0)) return x("Enter an amount", "empty");
  const M = t.reduceOnly || t.type === "trailing_stop_market";
  if (t.type === "trailing_stop_market" && n.position !== void 0) {
    const T = n.position;
    if (!T) return x("A trailing stop closes or reduces an open position. Open one first.", "price");
    if (T > 0 == (t.side === "buy")) return x(`A trailing stop protects your ${T > 0 ? "long" : "short"}: switch to ${T > 0 ? "Short/Sell" : "Long/Buy"}.`, "price");
    if (f > Math.abs(T) + 1e-12) return x("A trailing stop can't be larger than your position", "price");
  }
  if (t.type === "limit") {
    if (!(t.limitPrice > 0)) return x("Enter a limit price", "price");
    if (Math.abs(t.limitPrice - n.mark) / n.mark > n.limitBound) return x(`Limit price must be within ${(n.limitBound * 100).toFixed(0)}% of the current price`, "price");
  }
  if (t.type !== "market" && t.type !== "limit" && t.type !== "twap") {
    const T = yi({ side: t.side, type: t.type, stopPrice: t.triggerPrice, price: t.limitPrice, mark: n.mark, last: n.last, workingType: t.workingType, priceBound: n.limitBound, tickSize: i.tickSize, callbackRate: t.callbackRate, activationPrice: Number(t.activationPrice) > 0 ? t.activationPrice : void 0 });
    if (T) return x(T, "price");
  }
  if (t.type === "twap") {
    const T = (t.twapMinutes ?? 0) * 60;
    if (!(T >= vi && T <= ki)) return x("Duration must be 5 – 1440 minutes", "price");
    const P = gs(i, f, T, a);
    if (t.amount > 0 && P.perOrder < P.minPerOrder - 1e-12)
      return x(`Too small for ${t.twapMinutes} min: at least ${Number(P.minTotal.toPrecision(6))} ${i.baseAsset} (≈ $${Math.ceil(P.minTotal * a).toLocaleString("en-US")})`, "min");
    if (Number(t.twapLimit) > 0 && Math.abs(Number(t.twapLimit) - n.mark) / n.mark > n.limitBound) return x(`Limit price must be within ${(n.limitBound * 100).toFixed(0)}% of the current price`, "price");
  }
  return !M && y < i.minNotional ? x(t.unit === "usd" ? `Minimum margin: $${z.toFixed(2)}` : `Minimum order: $${i.minNotional.toFixed(0)}`, "min") : !M && _ + w > n.available * 1.0001 ? x("Insufficient funds", "funds") : $ && (t.side === "buy" ? $ <= a : $ >= a) ? x("Take profit must be above entry for a long, below for a short", "tpsl") : S && (t.side === "buy" ? S >= a : S <= a) ? x("Stop loss must be below entry for a long, above for a short", "tpsl") : S && k.liquidationPrice > 0 && (t.side === "buy" ? S <= k.liquidationPrice : S >= k.liquidationPrice) ? x("Stop loss is past the liquidation price, so it would never trigger", "tpsl") : { ...B, ok: !0 };
}
const Gr = (t) => t.replace(/,/g, ".").replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1"), yp = (t, n) => Number.isFinite(t) && t > 0 ? Y(t, n).replace(/[$,]/g, "") : "";
function wp({ m: t }) {
  const n = t.spec.tickSize, [i, r] = m("pnl"), [s, a] = m("buy"), [o, l] = m(Math.max(1, Math.min(t.maxLev, t.spec.defaultLeverage || 10))), [d, p] = m(yp(t.mark, n)), [u, c] = m(""), [h, g] = m(""), [f, y] = m(!0), [k, _] = m(""), w = Number(d), z = Number(h), C = w > 0 && z > 0 ? f ? z : z * w : 0, v = C > 0 ? C / w : 0, $ = C > 0 ? C / o : 0, S = s === "buy" ? 1 : -1, B = Number(u), x = v > 0 && B > 0 ? v * (B - w) * S : NaN, M = $ > 0 && Number.isFinite(x) ? x / $ * 100 : NaN, T = C > 0 ? lo({ side: s, entry: w, leverage: o, notional: C, tiers: t.spec.marginTiers }) : NaN, P = Number(k), ie = w > 0 && k !== "" && Number.isFinite(P) ? w * (1 + S * P / 100 / o) : NaN, F = C > 0 ? Number(Gn(t.spec.marginTiers, C)) : t.maxLev, E = (W) => l((A) => Math.max(1, Math.min(t.maxLev, A + W))), D = (W, A, N = "") => /* @__PURE__ */ e("div", { class: "calc-r", children: [
    /* @__PURE__ */ e("span", { children: W }),
    /* @__PURE__ */ e("b", { class: `num ${N}`, children: A })
  ] });
  return /* @__PURE__ */ e("div", { class: "calc", children: [
    /* @__PURE__ */ e("div", { class: "pd-tabs left calc-tabs", role: "tablist", children: [
      ["pnl", "PnL"],
      ["liq", "Liquidation Price"],
      ["target", "Target Price"]
    ].map(([W, A]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": i === W, class: i === W ? "on" : "", onClick: () => r(W), children: A }, W)) }),
    /* @__PURE__ */ e("div", { class: "calc-body", children: [
      /* @__PURE__ */ e("div", { class: "calc-in", children: [
        /* @__PURE__ */ e("div", { class: "pd-seg2", role: "radiogroup", "aria-label": "Side", children: [
          /* @__PURE__ */ e("button", { role: "radio", "aria-checked": s === "buy", class: s === "buy" ? "on long" : "", onClick: () => a("buy"), children: "Long/Buy" }),
          /* @__PURE__ */ e("button", { role: "radio", "aria-checked": s === "sell", class: s === "sell" ? "on short" : "", onClick: () => a("sell"), children: "Short/Sell" })
        ] }),
        /* @__PURE__ */ e("span", { class: "calc-l", children: "Leverage" }),
        /* @__PURE__ */ e("div", { class: "calc-lev", children: [
          /* @__PURE__ */ e("button", { "aria-label": "Less leverage", onClick: () => E(-1), children: /* @__PURE__ */ e(K, { n: "minus", size: 16 }) }),
          /* @__PURE__ */ e("b", { class: "num", children: [
            o,
            "x"
          ] }),
          /* @__PURE__ */ e("button", { "aria-label": "More leverage", onClick: () => E(1), children: /* @__PURE__ */ e(K, { n: "plus", size: 16 }) })
        ] }),
        /* @__PURE__ */ e(Ni, { min: 1, max: t.maxLev, value: o, onChange: l, label: "Leverage", marks: [1, Math.round(t.maxLev / 4), Math.round(t.maxLev / 2), Math.round(t.maxLev * 3 / 4), t.maxLev].filter((W, A, N) => W >= 1 && N.indexOf(W) === A) }),
        /* @__PURE__ */ e("div", { class: "calc-ends", children: [
          /* @__PURE__ */ e("span", { children: "1x" }),
          /* @__PURE__ */ e("span", { children: [
            t.maxLev,
            "x"
          ] })
        ] }),
        /* @__PURE__ */ e("span", { class: "calc-l", children: "Entry Price" }),
        /* @__PURE__ */ e("label", { class: "pd-input", children: [
          /* @__PURE__ */ e("input", { inputMode: "decimal", value: d, onInput: (W) => p(Gr(W.target.value)), "aria-label": "Entry price" }),
          /* @__PURE__ */ e("span", { class: "suf", children: "USD" })
        ] }),
        i === "pnl" && /* @__PURE__ */ e(R, { children: [
          /* @__PURE__ */ e("span", { class: "calc-l", children: "Exit Price" }),
          /* @__PURE__ */ e("label", { class: "pd-input", children: [
            /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: "0", value: u, onInput: (W) => c(Gr(W.target.value)), "aria-label": "Exit price" }),
            /* @__PURE__ */ e("span", { class: "suf", children: "USD" })
          ] })
        ] }),
        i !== "target" ? /* @__PURE__ */ e(R, { children: [
          /* @__PURE__ */ e("span", { class: "calc-l", children: "Amount" }),
          /* @__PURE__ */ e("label", { class: "pd-input", children: [
            /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: "0", value: h, onInput: (W) => g(Gr(W.target.value)), "aria-label": `Amount in ${f ? "USD" : t.base}` }),
            /* @__PURE__ */ e("button", { class: "suf unit", onClick: (W) => (W.preventDefault(), y(!f), g("")), "aria-label": "Switch unit", children: [
              f ? "USD" : t.base,
              " ",
              /* @__PURE__ */ e(K, { n: "swap", size: 12 })
            ] })
          ] })
        ] }) : /* @__PURE__ */ e(R, { children: [
          /* @__PURE__ */ e("span", { class: "calc-l", children: "ROI" }),
          /* @__PURE__ */ e("label", { class: "pd-input", children: [
            /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: "0", value: k, onInput: (W) => _(W.target.value.replace(/[^0-9.\-]/g, "")), "aria-label": "Return on margin, percent" }),
            /* @__PURE__ */ e("span", { class: "suf", children: "%" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { class: "calc-out", children: [
        /* @__PURE__ */ e("b", { class: "calc-h", children: "Results" }),
        i === "pnl" && /* @__PURE__ */ e(R, { children: [
          D("Margin", $ > 0 ? H($) : "—"),
          D("Est. PnL", Number.isFinite(x) ? H(x, { sign: !0 }) : "—", Number.isFinite(x) ? x >= 0 ? "pos" : "neg" : ""),
          D("PnL%", Number.isFinite(M) ? `${M > 0 ? "+" : ""}${M.toFixed(2)}%` : "—", Number.isFinite(M) ? M >= 0 ? "pos" : "neg" : ""),
          D("Size", v > 0 ? `${pe(v)} ${t.base}` : "—")
        ] }),
        i === "liq" && /* @__PURE__ */ e(R, { children: [
          D("Est. Liquidation Price", Number.isFinite(T) && T > 0 ? Y(T, n) : "—"),
          D("Margin", $ > 0 ? H($) : "—"),
          D("Size", v > 0 ? `${pe(v)} ${t.base}` : "—")
        ] }),
        i === "target" && D("Target Price", Number.isFinite(ie) && ie > 0 ? Y(ie, n) : "—"),
        C > 0 && o > F && i !== "target" && /* @__PURE__ */ e("p", { class: "calc-warn", children: [
          "Strike allows up to ",
          F,
          "x for a position this size."
        ] }),
        /* @__PURE__ */ e("p", { class: "calc-note", children: i === "liq" ? "Estimate for an isolated position. With cross margin your whole balance backs it, so liquidation is usually further away." : "Estimate before fees and funding." })
      ] })
    ] })
  ] });
}
function _p({ s: t, m: n, onBack: i }) {
  const [r, s] = m("NEUTRAL"), [a, o] = m(""), [l, d] = m(""), [p, u] = m("10"), [c, h] = m(""), [g, f] = m(2), [y, k] = m(""), [_, w] = m(""), [z, C] = m(""), [v, $] = m(!1), S = n?.spec.tickSize ?? 1e-4;
  if (Z(() => {
    n?.mark && (o(ue(n.mark * 0.95, S)), d(ue(n.mark * 1.05, S)));
  }, [n?.symbol, !!n?.mark]), !n) return /* @__PURE__ */ e("div", { class: "pd-center muted", children: "Loading market…" });
  const B = Math.max(1, Math.min(t.config.maxLeverage, n.spec.maxLeverage)), x = {
    symbol: n.symbol,
    mode: r,
    lower: Number(a) || 0,
    upper: Number(l) || 0,
    grids: Math.round(Number(p) || 0),
    collateral: Number(c) || 0,
    sl: r !== "NEUTRAL" && Number(y) > 0 ? Number(y) : void 0,
    longSl: r === "NEUTRAL" && Number(_) > 0 ? Number(_) : void 0,
    shortSl: r === "NEUTRAL" && Number(z) > 0 ? Number(z) : void 0
  }, M = x.grids > 0 ? x.collateral * g / x.grids : 0, T = x.grids > 1 && x.lower > 0 ? (x.upper - x.lower) / (x.grids - 1) / x.lower * 100 : 0, P = t.session ? So(x, n.mark) ?? (x.collateral > t.available ? "More than your available balance" : M > 0 && M < n.spec.minNotional ? `Each level needs at least ${H(n.spec.minNotional, { decimals: 0 })}: add collateral, leverage or fewer grids` : null) : null, ie = async () => {
    if (!P) {
      $(!0), t.notify("progress", `Starting a ${r.toLowerCase()} grid on ${n.base}`);
      try {
        const E = await t.client.startGrid({ ...x, leverage: g });
        t.notify("ok", "Grid bot started", `Bot ${E.id.slice(0, 8)}… · ${x.grids} levels from ${Y(x.lower, S)} to ${Y(x.upper, S)}. Find it under Grid below.`), h(""), t.refresh();
      } catch (E) {
        t.notify("err", "Grid not started", E?.message || String(E));
      } finally {
        $(!1);
      }
    }
  }, F = (E, D, W, A, N) => /* @__PURE__ */ e("label", { class: "pd-input", children: [
    /* @__PURE__ */ e("span", { class: "pre", children: E }),
    /* @__PURE__ */ e("input", { inputMode: "decimal", value: D, onInput: (O) => W(_e(O)), "aria-label": A }),
    N && /* @__PURE__ */ e("span", { class: "suf muted", children: N })
  ] });
  return /* @__PURE__ */ e(R, { children: [
    /* @__PURE__ */ e("div", { class: "pd-form", children: [
      /* @__PURE__ */ e("div", { class: "pd-kv", children: [
        /* @__PURE__ */ e("button", { class: "pd-link", onClick: i, children: [
          /* @__PURE__ */ e(K, { n: "back", size: 12 }),
          " Order types"
        ] }),
        /* @__PURE__ */ e("b", { children: "Grid bot" })
      ] }),
      /* @__PURE__ */ e("div", { class: "pd-tif wide", role: "radiogroup", "aria-label": "Grid mode", children: ["LONG", "NEUTRAL", "SHORT"].map((E) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": r === E, class: r === E ? "on" : "", onClick: () => s(E), children: E === "LONG" ? "Long" : E === "SHORT" ? "Short" : "Neutral" }, E)) }),
      /* @__PURE__ */ e("div", { class: "pd-hint", children: r === "LONG" ? "Places buy entries in the range and sells each one level higher." : r === "SHORT" ? "Places sell entries in the range and buys each back one level lower." : "Places both sides around the current price and trades the range." }),
      F("Lower", a, o, "Lower price"),
      F("Upper", l, d, "Upper price"),
      F("Grids", p, u, "Number of grid levels", "2–200"),
      F("Collateral", c, h, "Collateral in USD", "USD"),
      /* @__PURE__ */ e("div", { class: "pd-lbl", children: "Leverage" }),
      /* @__PURE__ */ e("div", { class: "pd-sl", children: [
        /* @__PURE__ */ e(Ni, { min: 1, max: B, value: Math.min(g, B), onChange: f, label: "Grid leverage", marks: [1, B] }),
        /* @__PURE__ */ e("span", { class: "pd-box static", children: [
          g,
          "x"
        ] })
      ] }),
      r === "NEUTRAL" ? /* @__PURE__ */ e(R, { children: [
        F("Long SL", _, w, "Long stop-loss (optional)"),
        F("Short SL", z, C, "Short stop-loss (optional)")
      ] }) : F("Stop loss", y, k, "Stop-loss (optional)"),
      /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
        /* @__PURE__ */ e("span", { children: "Per level" }),
        /* @__PURE__ */ e("span", { class: "num", children: M > 0 ? H(M) : "—" })
      ] }),
      /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
        /* @__PURE__ */ e("span", { children: "Grid step" }),
        /* @__PURE__ */ e("span", { class: "num", children: T > 0 ? `${T.toFixed(2)}%` : "—" })
      ] }),
      /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
        /* @__PURE__ */ e("span", { children: "Current price" }),
        /* @__PURE__ */ e("span", { class: "num", children: Y(n.mark, S) })
      ] })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-order-foot", children: [
      P && /* @__PURE__ */ e("div", { class: "pd-warn", children: P }),
      t.session ? /* @__PURE__ */ e("button", { class: "pd-cta", disabled: !!P || v || !(x.collateral > 0), onClick: ie, children: v ? /* @__PURE__ */ e(Ze, { size: 16 }) : `Start ${r.toLowerCase()} grid` }) : /* @__PURE__ */ e("button", { class: "pd-cta", onClick: () => t.setSheet("connect"), children: "Connect wallet" })
    ] })
  ] });
}
const Sp = 0.02, Cp = [5, 15, 60, 240], $p = [0.5, 1, 2, 5];
function Uo({ s: t, m: n, book: i, side: r, setSide: s, limitPick: a }) {
  const o = n?.symbol ?? "", l = n ? t.client.raw(o) : void 0, [d, p] = m("market"), u = d === "grid" ? "market" : d, [c, h] = m(!1), [g, f] = m("usd"), [y, k] = m(""), [_, w] = m(() => Math.max(1, Number(cn("default-leverage")) || 3)), [z, C] = m(""), [v, $] = m(""), [S, B] = m("mark_price"), [x, M] = m("GTC"), [T, P] = m(!1), [ie, F] = m(!1), [E, D] = m("1"), [W, A] = m(""), [N, O] = m(""), [J, ne] = m(!1), [Se, Ae] = m(60), [pt, ve] = m(""), [G, X] = m(!1), [fe, Ce] = m(!1), [Je, nt] = m("price"), [ft, ut] = m(""), [$e, Lt] = m(!1), [dn, Qe] = m(""), [St, I] = m(""), [q, re] = m(!1), [ce, se] = m(!1);
  Z(() => {
    t.config.amount && t.config.amount > 0 && (f("usd"), k(String(Math.round(t.config.amount * 100) / 100)));
  }, [t.config.amount]), Z(() => {
    t.config.leverage && t.config.leverage >= 1 && w(t.config.leverage);
  }, [t.config.leverage]);
  const oe = Number(t.account?.symbol_settings?.[o]?.leverage) || 0;
  Z(() => {
    oe >= 1 && !t.config.leverage && w(oe);
  }, [o, oe]), Z(() => (C(""), $(""), A(""), ve(""), ut(""), Qe(""), I("")), [o]), Z(() => {
    !a || !n || ((d === "market" || d === "grid" || d === "trailing_stop_market" || d === "stop" || d === "take_profit") && p("limit"), d === "twap" ? ve(ue(a.p, n.spec.tickSize)) : C(ue(a.p, n.spec.tickSize)));
  }, [a?.n]), Z(() => {
    if (!St) return;
    const L = setTimeout(() => I(""), 15e3);
    return () => clearTimeout(L);
  }, [St]);
  const U = {
    spec: n?.spec,
    mark: n?.mark ?? 0,
    last: n?.last ?? 0,
    available: t.available,
    takerRate: t.takerRate,
    feeBps: t.client.orderFeeBps,
    maxLeverage: t.config.maxLeverage,
    limitBound: Number(l?.order_limit_price_bound) || 0.05,
    position: t.session ? Number(t.positions.find((L) => L.symbol === o)?.size) || 0 : void 0
  }, le = u === "market" || u === "limit", Le = {
    symbol: o,
    side: r,
    type: u,
    amount: Number(y) || 0,
    unit: g,
    leverage: _,
    limitPrice: Number(z) || 0,
    tp: fe && le && Number(ft) || 0,
    sl: fe && le && Number(dn) || 0,
    autoMode: Je,
    triggerPrice: Number(v) || 0,
    workingType: S,
    tif: x,
    postOnly: T,
    reduceOnly: ie,
    callbackRate: Number(E) || 0,
    activationPrice: Number(W) || 0,
    slippage: Number(N) > 0 ? Number(N) / 100 : 0,
    twapMinutes: Se,
    twapLimit: Number(pt) || 0,
    randomize: G
  }, j = Ns(Le, U), be = ie || u === "trailing_stop_market", he = n?.base ?? "", Ue = n?.spec.tickSize, Ye = n ? Math.max(1, Math.min(t.config.maxLeverage, n.spec.maxLeverage)) : 1, it = j.maxMargin > 0 ? Math.min(100, j.margin / j.maxMargin * 100) : 0, rt = Number(l?.order_market_price_bound) || U.limitBound, Ct = u === "market", ke = Ct && i && j.size > 0 ? hr(i, r, j.size, { mark: U.mark, bound: Number(N) > 0 ? Math.min(Number(N) / 100, rt) : rt }) : null, yn = Ct && j.size > 0 && i === null, $t = Ct && j.size > 0 && !!i && !(r === "buy" ? i.asks.length : i.bids.length), wn = !!ke && (ke.slippage > Sp || !ke.complete || ke.beyondBand) || yn || $t, Et = `k|${o}|${r}|${j.size}|${ke ? ke.complete ? Math.ceil(ke.slippage * 200) : "p" : yn ? "n" : "e"}`, ht = ms(t.account, o) ?? "cross", Ii = t.positions.some((L) => L.symbol === o) || t.orders.some((L) => L.symbol === o), Fn = !!t.session && t.available > 0 && !!n, Dn = (L) => {
    if (L <= 0) return k("");
    const bt = Ts(U, j.lev, L / 100);
    bt > 0 && k(g === "usd" ? bt.toFixed(2) : ue(bt * j.lev / (j.px || U.mark), n.spec.stepSize, "floor"));
  }, Fi = () => {
    y && j.size > 0 && k(g === "usd" ? String(j.size) : j.margin.toFixed(2)), f(g === "usd" ? "base" : "usd");
  }, Di = async () => {
    if (n) {
      se(!0);
      try {
        await t.client.setMarginMode(o, ht === "cross" ? "isolated" : "cross"), t.notify("ok", `${o} now uses ${ht === "cross" ? "isolated" : "cross"} margin`), t.refresh();
      } catch (L) {
        t.notify("err", "Margin mode", L?.message || String(L));
      } finally {
        se(!1);
      }
    }
  }, It = async () => {
    if (!n || !j.ok) return;
    if (wn && St !== Et) return I(Et);
    re(!0), I("");
    const L = await t.placeDraft(Le, j, he, ke && ke.complete && !ke.beyondBand ? ke.avgPrice : void 0);
    re(!1), L !== "failed" && (k(""), ut(""), Qe(""));
  }, Oi = d === "grid" ? "Grid bot" : ei.find((L) => L.type === d)?.label ?? "Market", Mt = r === "buy" ? "Long" : "Short", kr = (() => {
    if (!t.session) return /* @__PURE__ */ e("button", { class: "pd-cta", onClick: () => t.setSheet("connect"), children: "Connect wallet" });
    if (t.accountLoaded && t.available <= 0 && !be) return /* @__PURE__ */ e("button", { class: "pd-cta", onClick: () => t.openFunds("deposit"), children: "Deposit to trade" });
    if (j.ok && wn && St === Et && !q)
      return /* @__PURE__ */ e("button", { class: "pd-cta caution", onClick: It, children: yn ? "Confirm: slippage unknown" : ke && !ke.complete ? "Confirm: the book can't fill it all" : `Confirm: est. slippage ${((ke?.slippage ?? 0) * 100).toFixed(2)}%` });
    const L = u === "market" ? `${Mt} ${he}` : u === "limit" ? `${Mt} ${he} @ ${Y(j.px, Ue)}` : u === "twap" ? `Start TWAP · ${Mt} ${he}` : `Place ${Oi} · ${Mt}`;
    return /* @__PURE__ */ e("button", { class: `pd-cta ${r === "buy" ? "long" : "short"}`, disabled: !j.ok || q, onClick: It, children: q ? /* @__PURE__ */ e(Ze, { size: 16 }) : j.kind === "empty" || j.kind === "load" ? L : j.problem ?? L });
  })(), Gt = fe ? j.tpPrice : 0, Rt = fe ? j.slPrice : 0, _n = (L, bt, ri, Ne, si = !0) => /* @__PURE__ */ e("label", { class: "pd-input", children: [
    /* @__PURE__ */ e("span", { class: "pre", children: L }),
    /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: n ? Y(n.mark, Ue).slice(1).replace(/,/g, "") : "0", value: bt, onInput: (pn) => ri(_e(pn)), "aria-label": Ne }),
    si && /* @__PURE__ */ e("button", { class: "suf", onClick: (pn) => (pn.preventDefault(), n && ri(ue(n.mark, Ue ?? 1e-4))), children: "Mark" })
  ] }), ii = u === "stop" || u === "stop_limit" || u === "take_profit" || u === "take_profit_limit";
  return /* @__PURE__ */ e("div", { class: "pd-panel pd-order", children: [
    /* @__PURE__ */ e("div", { class: "pd-pills", children: [
      /* @__PURE__ */ e(
        "button",
        {
          class: "pd-pill",
          disabled: !t.session || ce || Ii,
          title: Ii ? "Close this market's position and open orders to change margin mode" : "Cross: your whole balance backs positions. Isolated: each position only risks its own margin.",
          onClick: Di,
          children: ce ? /* @__PURE__ */ e(Ze, { size: 12 }) : ht === "cross" ? "Cross" : "Isolated"
        }
      ),
      /* @__PURE__ */ e("span", { class: "pd-pill static", title: "Leverage for this order (set below)", children: [
        j.lev,
        "x"
      ] })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-tabs ls", children: [
      /* @__PURE__ */ e("button", { class: r === "buy" ? "on long" : "", onClick: () => s("buy"), children: "Long" }),
      /* @__PURE__ */ e("button", { class: r === "sell" ? "on short" : "", onClick: () => s("sell"), children: "Short" })
    ] }),
    d === "grid" ? /* @__PURE__ */ e(_p, { s: t, m: n, onBack: () => p("market") }) : /* @__PURE__ */ e(R, { children: [
      /* @__PURE__ */ e("div", { class: "pd-form", children: [
        /* @__PURE__ */ e("div", { class: "pd-kv", children: [
          /* @__PURE__ */ e("span", { children: "Available to Trade" }),
          /* @__PURE__ */ e("span", { class: "num", children: H(t.session ? t.available : 0) })
        ] }),
        /* @__PURE__ */ e("div", { class: "pd-kv", children: [
          /* @__PURE__ */ e("span", { children: "Order Type" }),
          /* @__PURE__ */ e("span", { class: "pd-dd", children: [
            /* @__PURE__ */ e("button", { onClick: () => h(!c), "aria-haspopup": "listbox", "aria-expanded": c, children: [
              Oi,
              " ",
              /* @__PURE__ */ e(K, { n: "down", size: 14 })
            ] }),
            c && /* @__PURE__ */ e("span", { class: "pd-menu wide", role: "listbox", children: [...ei.map((L) => ({ id: L.type, label: L.label, desc: L.desc })), { id: "grid", label: "Grid bot", desc: "Buys low and sells high inside a price range, automatically" }].map((L) => /* @__PURE__ */ e("button", { role: "option", "aria-selected": d === L.id, class: d === L.id ? "on" : "", onClick: () => (p(L.id), h(!1)), children: [
              /* @__PURE__ */ e("b", { children: L.label }),
              /* @__PURE__ */ e("span", { children: L.desc })
            ] }, L.id)) })
          ] })
        ] }),
        ii && _n(u.startsWith("take") ? "Target" : "Trigger", v, $, "Trigger price"),
        tn(u) && _n("Price", z, C, "Limit price"),
        u === "trailing_stop_market" && /* @__PURE__ */ e(R, { children: [
          /* @__PURE__ */ e("label", { class: "pd-input", children: [
            /* @__PURE__ */ e("span", { class: "pre", children: "Trail" }),
            /* @__PURE__ */ e("input", { inputMode: "decimal", value: E, onInput: (L) => D(_e(L)), "aria-label": "Trail distance percent" }),
            /* @__PURE__ */ e("span", { class: "suf muted", children: "%" })
          ] }),
          /* @__PURE__ */ e("div", { class: "pd-chips", children: $p.map((L) => /* @__PURE__ */ e("button", { class: Number(E) === L ? "on" : "", onClick: () => D(String(L)), children: [
            L,
            "%"
          ] }, L)) }),
          /* @__PURE__ */ e("label", { class: "pd-input", children: [
            /* @__PURE__ */ e("span", { class: "pre", children: "Activation" }),
            /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: "Optional · starts now", value: W, onInput: (L) => A(_e(L)), "aria-label": "Activation price (optional)" })
          ] }),
          /* @__PURE__ */ e("div", { class: "pd-hint", children: [
            "Trails ",
            Nn,
            "–",
            Pn,
            "% behind the best price and triggers a market order when the price turns by that much. Leave activation empty to start trailing now. Like on Strike, it only closes or reduces your open position."
          ] })
        ] }),
        u === "twap" && /* @__PURE__ */ e(R, { children: [
          /* @__PURE__ */ e("div", { class: "pd-chips", role: "radiogroup", "aria-label": "TWAP duration", children: [
            Cp.map((L) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": Se === L, class: Se === L ? "on" : "", onClick: () => Ae(L), children: L < 60 ? `${L}m` : `${L / 60}h` }, L)),
            /* @__PURE__ */ e("label", { class: "pd-mini", children: [
              /* @__PURE__ */ e("input", { inputMode: "numeric", value: String(Se), "aria-label": "TWAP duration in minutes", onInput: (L) => Ae(Math.min(1440, Number(_e(L)) || 0)) }),
              "min"
            ] })
          ] }),
          _n("Limit", pt, ve, "TWAP price limit (optional)", !1),
          /* @__PURE__ */ e("label", { class: "pd-check", children: [
            /* @__PURE__ */ e("input", { type: "checkbox", checked: G, onChange: (L) => X(L.target.checked) }),
            " Randomize slice timing and size"
          ] })
        ] }),
        /* @__PURE__ */ e("label", { class: "pd-input big", children: [
          g === "usd" && /* @__PURE__ */ e("span", { class: "pre", children: "$" }),
          /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: "0", value: y, onInput: (L) => k(_e(L)), "aria-label": g === "usd" ? "Margin in USD" : `Size in ${he}` }),
          /* @__PURE__ */ e("button", { class: "suf unit", onClick: Fi, title: "Switch between margin in USD and size in the coin", children: [
            g === "usd" ? "USD" : he,
            " ",
            /* @__PURE__ */ e(K, { n: "swap", size: 14 })
          ] })
        ] }),
        /* @__PURE__ */ e("div", { class: "pd-sl", children: [
          /* @__PURE__ */ e(Ni, { min: 0, max: 100, value: Math.round(it), onChange: Dn, label: "Share of available balance", marks: [0, 25, 50, 75, 100], disabled: !Fn }),
          /* @__PURE__ */ e("label", { class: "pd-box", children: [
            /* @__PURE__ */ e("input", { inputMode: "decimal", disabled: !Fn, value: it ? Math.round(it) : "", placeholder: "0", "aria-label": "Percent of available balance", onInput: (L) => Dn(Math.min(100, Number(_e(L)) || 0)) }),
            /* @__PURE__ */ e("span", { children: "%" })
          ] })
        ] }),
        !Fn && /* @__PURE__ */ e("div", { class: "pd-hint", children: t.session ? "Add funds to size by % of your balance." : "Connect a wallet to size by % of your balance." }),
        /* @__PURE__ */ e("div", { class: "pd-lbl", children: "Leverage" }),
        /* @__PURE__ */ e("div", { class: "pd-sl", children: [
          /* @__PURE__ */ e(Ni, { min: 1, max: Ye, value: Math.min(_, Ye), onChange: w, label: "Leverage", marks: [1, ...[2, 5, 10, 20, 40, 75].filter((L) => L < Ye), Ye] }),
          /* @__PURE__ */ e("label", { class: "pd-box", children: [
            /* @__PURE__ */ e(
              "input",
              {
                inputMode: "numeric",
                value: String(Math.min(_, Ye)),
                "aria-label": "Leverage",
                onInput: (L) => {
                  const bt = Number(_e(L));
                  bt >= 1 && w(Math.min(Ye, Math.round(bt)));
                }
              }
            ),
            /* @__PURE__ */ e("span", { children: "x" })
          ] })
        ] }),
        j.lev < Math.min(_, Ye) && /* @__PURE__ */ e("div", { class: "pd-hint", children: [
          "Strike allows up to ",
          j.lev,
          "x for this size."
        ] }),
        /* @__PURE__ */ e("div", { class: "pd-opts", children: [
          /* @__PURE__ */ e("label", { class: "pd-check", title: "Only shrinks an open position; never opens or flips one", children: [
            /* @__PURE__ */ e("input", { type: "checkbox", checked: be, disabled: u === "trailing_stop_market", onChange: (L) => F(L.target.checked) }),
            " Reduce Only"
          ] }),
          u === "limit" && /* @__PURE__ */ e("label", { class: "pd-check", title: "Rests on the book as a maker order; cancelled if it would fill at once", children: [
            /* @__PURE__ */ e("input", { type: "checkbox", checked: T, onChange: (L) => P(L.target.checked) }),
            " Post Only"
          ] }),
          tn(u) && /* @__PURE__ */ e("span", { class: "pd-tif", role: "radiogroup", "aria-label": "Time in force", children: ["GTC", "IOC", "FOK"].map((L) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": x === L, class: x === L ? "on" : "", title: L === "GTC" ? "Good till cancelled" : L === "IOC" ? "Immediate or cancel: fill what you can now, cancel the rest" : "Fill or kill: fill all now or cancel", onClick: () => M(L), children: L }, L)) }),
          (ii || u === "trailing_stop_market") && /* @__PURE__ */ e("span", { class: "pd-tif", role: "radiogroup", "aria-label": "Trigger price type", children: ["mark_price", "contract_price"].map((L) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": S === L, class: S === L ? "on" : "", onClick: () => B(L), children: L === "mark_price" ? "Mark" : "Last" }, L)) })
        ] }),
        /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
          /* @__PURE__ */ e("span", { children: "Liquidation Price Est." }),
          /* @__PURE__ */ e("span", { class: "num", children: j.size > 0 && !be ? `${Y(j.liq, Ue)} (${Pi(j.px, j.liq)})` : "N/A" })
        ] }),
        /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
          /* @__PURE__ */ e("span", { children: "Order Value" }),
          /* @__PURE__ */ e("span", { class: "num", children: j.size > 0 ? `${H(j.notional)} · ${pe(j.size)} ${he}` : "N/A" })
        ] }),
        u === "twap" && n && Number(Se) > 0 && (() => {
          const L = gs(n.spec, j.size, Number(Se) * 60, j.px);
          return /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
            /* @__PURE__ */ e("span", { title: "Strike sends one suborder about every 30 seconds; sizes adjust to catch up if some are skipped.", children: "Suborders" }),
            /* @__PURE__ */ e("span", { class: "num", children: `~${L.orders} · every ${L.intervalSec}s${j.size > 0 ? ` · ${pe(L.perOrder)} ${he} each` : ""}` })
          ] });
        })(),
        /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
          /* @__PURE__ */ e("span", { children: "Margin Required" }),
          /* @__PURE__ */ e("span", { class: "num", children: j.size > 0 && !be ? H(j.margin) : "N/A" })
        ] }),
        /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
          /* @__PURE__ */ e("span", { title: `Strike taker ${(t.takerRate * 100).toFixed(3)}% + builder ${(t.client.orderFeeBps / 100).toFixed(2)}%. A limit order that waits on the book pays Strike's lower maker fee.`, children: u === "market" ? "Fees" : "Fees (up to)" }),
          /* @__PURE__ */ e("span", { class: "num", children: j.size > 0 ? H(j.fee, { decimals: j.fee < 0.1 ? 4 : 2 }) : `${(j.feeRate * 100).toFixed(3)}%` })
        ] }),
        /* @__PURE__ */ e("button", { class: "pd-calc", onClick: () => Lt(!0), children: [
          /* @__PURE__ */ e(K, { n: "sliders", size: 14 }),
          " Calculator"
        ] }),
        Ct && /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
          /* @__PURE__ */ e("span", { children: "Max slippage" }),
          /* @__PURE__ */ e("span", { class: "pd-dd", children: [
            /* @__PURE__ */ e("button", { onClick: () => ne(!J), children: [
              Number(N) > 0 ? `${N}%` : `Auto (${(rt * 100).toFixed(0)}%)`,
              " ",
              /* @__PURE__ */ e(K, { n: "down", size: 12 })
            ] }),
            J && /* @__PURE__ */ e("span", { class: "pd-menu", role: "listbox", children: ["", "0.5", "1", "2", "3"].filter((L) => !L || Number(L) / 100 <= rt).map((L) => /* @__PURE__ */ e("button", { class: N === L ? "on" : "", onClick: () => (O(L), ne(!1)), children: [
              /* @__PURE__ */ e("b", { children: L ? `${L}%` : "Auto" }),
              /* @__PURE__ */ e("span", { children: L ? "Fill only within this distance from the mark; the rest is cancelled" : `Strike's band for this market (${(rt * 100).toFixed(0)}%)` })
            ] }, L || "auto")) })
          ] })
        ] }),
        ke && ke.complete && !ke.beyondBand && /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
          /* @__PURE__ */ e("span", { children: "Est. Fill · Slippage" }),
          /* @__PURE__ */ e("span", { class: `num ${ke.slippage > 5e-3 ? "neg" : ""}`, children: [
            Y(ke.avgPrice, Ue),
            " · ",
            (ke.slippage * 100).toFixed(2),
            "%"
          ] })
        ] }),
        le && /* @__PURE__ */ e("div", { class: "pd-kv", children: [
          /* @__PURE__ */ e("span", { children: "Auto Close" }),
          /* @__PURE__ */ e("button", { class: `pd-switch${fe ? " on" : ""}`, role: "switch", "aria-checked": fe, "aria-label": "Auto close (take profit / stop loss)", onClick: () => Ce(!fe), children: /* @__PURE__ */ e("span", {}) })
        ] }),
        fe && le && /* @__PURE__ */ e("div", { class: "pd-auto", children: [
          /* @__PURE__ */ e("div", { class: "pd-auto-h", children: [
            /* @__PURE__ */ e("span", { children: "Take profit / Stop loss" }),
            /* @__PURE__ */ e(
              "button",
              {
                class: "pd-chipbtn",
                onClick: () => {
                  const L = Je === "price" ? "pnl" : "price", bt = j.px || U.mark;
                  L === "pnl" ? (ut(Gt ? xn(r, bt, j.lev, Gt).toFixed(0) : ""), Qe(Rt ? Math.abs(xn(r, bt, j.lev, Rt)).toFixed(0) : "")) : (ut(Gt ? ue(Gt, Ue ?? 1e-4) : ""), Qe(Rt ? ue(Rt, Ue ?? 1e-4) : "")), nt(L);
                },
                children: [
                  Je === "price" ? "Price" : "% P&L",
                  " ",
                  /* @__PURE__ */ e(K, { n: "swap", size: 12 })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ e("label", { class: "pd-input", children: [
            /* @__PURE__ */ e("span", { class: "pre pos", children: "TP" }),
            /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: Je === "price" ? "Price" : "% gain", value: ft, onInput: (L) => ut(_e(L)), "aria-label": "Take profit" }),
            /* @__PURE__ */ e("span", { class: "suf muted num", children: Gt ? Je === "price" ? dt(xn(r, j.px || U.mark, j.lev, Gt), 0) : Y(Gt, Ue) : "" })
          ] }),
          /* @__PURE__ */ e("label", { class: "pd-input", children: [
            /* @__PURE__ */ e("span", { class: "pre neg", children: "SL" }),
            /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: Je === "price" ? "Price" : "% loss", value: dn, onInput: (L) => Qe(_e(L)), "aria-label": "Stop loss" }),
            /* @__PURE__ */ e("span", { class: "suf muted num", children: Rt ? Je === "price" ? dt(xn(r, j.px || U.mark, j.lev, Rt), 0) : Y(Rt, Ue) : "" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { class: "pd-order-foot", children: [
        wn && j.ok && /* @__PURE__ */ e("div", { class: "pd-warn", children: yn ? "The order book isn't available, so slippage can't be estimated." : $t ? `There are no ${r === "buy" ? "sellers" : "buyers"} on the order book right now, so a market order would be cancelled.` : ke && (!ke.complete || ke.beyondBand) ? `There aren't enough ${r === "buy" ? "sellers" : "buyers"} near the market price to fill this, so Strike may cancel some or all of it.` : `Est. slippage ${((ke?.slippage ?? 0) * 100).toFixed(2)}% from the market price.` }),
        j.ok && !be && j.liqDistance > 0 && j.liqDistance < 0.1 && /* @__PURE__ */ e("div", { class: "pd-warn", children: [
          "High risk: liquidation is only ",
          (j.liqDistance * 100).toFixed(1),
          "% away."
        ] }),
        kr
      ] })
    ] }),
    $e && n && /* @__PURE__ */ e(Oe, { title: "Calculator", onClose: () => Lt(!1), children: /* @__PURE__ */ e(wp, { m: n }) })
  ] });
}
function Ho({ s: t }) {
  const n = Number(t.account?.maintenance_margin) || 0, i = t.equity > 0 ? n / t.equity : 0, r = t.positions.reduce((s, a) => s + Math.abs(Number(a.size) || 0) * (t.bySymbol[a.symbol]?.mark || Number(a.entry_price) || 0), 0);
  return /* @__PURE__ */ e("div", { class: "pd-panel pd-acct", children: [
    /* @__PURE__ */ e("div", { class: "pd-kv", children: [
      /* @__PURE__ */ e("span", { class: "muted", children: "Total Balance" }),
      /* @__PURE__ */ e("b", { class: "num", children: H(t.session ? t.equity : 0) })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-kv", children: [
      /* @__PURE__ */ e("span", { class: "muted", children: "Available Balance" }),
      /* @__PURE__ */ e("b", { class: "num", children: H(t.session ? t.available : 0) })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-kv", children: [
      /* @__PURE__ */ e("span", { class: "muted", children: "Unrealized P&L" }),
      /* @__PURE__ */ e("b", { class: `num ${t.upnl > 0 ? "pos" : t.upnl < 0 ? "neg" : ""}`, children: H(t.upnl, { sign: !0 }) })
    ] }),
    t.session && n > 0 && /* @__PURE__ */ e("div", { class: "pd-kv", children: [
      /* @__PURE__ */ e("span", { class: "muted", title: "Maintenance margin ÷ equity. Strike issues a margin call at 70%, allows only reducing orders at 90% and liquidates at 100%.", children: "Margin Ratio" }),
      /* @__PURE__ */ e("b", { class: `num ${i >= 0.7 ? "neg" : ""}`, children: [
        (i * 100).toFixed(1),
        "%"
      ] })
    ] }),
    t.session && n > 0 && /* @__PURE__ */ e("div", { class: "pd-kv", children: [
      /* @__PURE__ */ e("span", { class: "muted", title: "Margin your open positions must keep; below it they are liquidated", children: "Maintenance Margin" }),
      /* @__PURE__ */ e("b", { class: "num", children: H(n) })
    ] }),
    t.session && r > 0 && /* @__PURE__ */ e("div", { class: "pd-kv", children: [
      /* @__PURE__ */ e("span", { class: "muted", children: "Total Position Value" }),
      /* @__PURE__ */ e("b", { class: "num", children: H(r) })
    ] }),
    t.session ? /* @__PURE__ */ e(R, { children: [
      /* @__PURE__ */ e("button", { class: "pd-btn primary", onClick: () => t.openFunds("deposit"), children: "Deposit" }),
      /* @__PURE__ */ e("button", { class: "pd-btn", disabled: t.available < jt, onClick: () => t.openFunds("withdraw"), children: "Withdraw" }),
      /* @__PURE__ */ e("div", { class: "pd-addr", children: [
        /* @__PURE__ */ e("span", { class: "num", title: t.session.address, children: Qt(t.session.address, 10, 6) }),
        /* @__PURE__ */ e("button", { class: "pd-link", onClick: t.disconnect, children: "Disconnect" })
      ] })
    ] }) : /* @__PURE__ */ e("button", { class: "pd-btn primary", onClick: () => t.setSheet("connect"), children: "Connect wallet" })
  ] });
}
const Mp = ["1m", "5m", "15m", "1h", "4h", "1d", "1w"], zp = [
  ["chart", "Chart"],
  ["funding", "Funding"],
  ["depth", "Depth"],
  ["liq", "Liquidations"],
  ["details", "Details"]
];
function Tp({ s: t, width: n }) {
  const [i, r] = m(t.config.market), [s, a] = m(t.config.side ?? "buy"), [o, l] = m("15m"), [d, p] = m("chart"), [u, c] = m(void 0), [h, g] = m(null), [f, y] = m(!1), [k, _] = m(!1), [, w] = m(0), [z, C] = m(null), v = n >= 1380, $ = n >= 1080;
  Z(() => r(t.config.market), [t.config.market]), Z(() => {
    t.markets.length && !t.bySymbol[i] && r(t.markets[0].symbol);
  }, [t.markets.length, i]);
  const S = t.bySymbol[i];
  Z(() => {
    if (c(void 0), !S) return;
    const M = t.client.orderBook(i);
    let T;
    const P = M.onUpdate(() => {
      T || (T = setTimeout(() => (T = void 0, c(M.view(200))), 250));
    }), ie = setTimeout(() => c((F) => F === void 0 ? null : F), 1e4);
    return () => (P(), clearTimeout(T), clearTimeout(ie), M.close());
  }, [i, !!S]), Z(() => {
    let M = !0;
    C(null);
    const T = () => t.client.market.openInterest(i).then((F) => M && C(F)).catch(() => {
    });
    T();
    const P = setInterval(T, 6e4), ie = setInterval(() => w((F) => F + 1), 1e3);
    return () => (M = !1, clearInterval(P), clearInterval(ie));
  }, [i]);
  const B = (M) => (r(M), y(!1)), x = S?.spec.tickSize;
  return /* @__PURE__ */ e("div", { class: `pd${v ? " with-list" : ""}${$ ? " with-book" : ""}`, children: [
    v && /* @__PURE__ */ e(ts, { s: t, sym: i, onPick: B }),
    /* @__PURE__ */ e("div", { class: "pd-panel pd-head", children: [
      S ? /* @__PURE__ */ e(R, { children: [
        /* @__PURE__ */ e("button", { class: "pd-sym", onClick: () => !v && y(!f), "aria-haspopup": v ? void 0 : "listbox", children: [
          /* @__PURE__ */ e(_t, { base: S.base, size: 30 }),
          /* @__PURE__ */ e("span", { children: [
            /* @__PURE__ */ e("b", { children: [
              S.base,
              "-USD"
            ] }),
            /* @__PURE__ */ e("span", { class: "muted", children: S.name })
          ] }),
          !v && /* @__PURE__ */ e(K, { n: "down", size: 16 })
        ] }),
        t.testnet && t.config.networkBadge !== !1 && /* @__PURE__ */ e("span", { class: "pa-net", children: "Testnet" }),
        /* @__PURE__ */ e("div", { class: "pd-stats", children: [
          /* @__PURE__ */ e(gn, { k: "Mark", v: Y(S.mark, x) }),
          /* @__PURE__ */ e(gn, { k: "Index", v: Y(S.index, x), title: "Index price: average spot price on major external exchanges" }),
          /* @__PURE__ */ e(gn, { k: "24h Change", v: `${H(S.changeAbs, { sign: !0, decimals: Math.abs(S.changeAbs) < 1 ? 4 : 2 })} / ${dt(S.change)}`, cls: S.change >= 0 ? "pos" : "neg" }),
          /* @__PURE__ */ e(gn, { k: "24h High", v: S.high24 > 0 ? Y(S.high24, x) : "—" }),
          /* @__PURE__ */ e(gn, { k: "24h Low", v: S.low24 > 0 ? Y(S.low24, x) : "—" }),
          /* @__PURE__ */ e(gn, { k: "24h Volume", v: An(S.vol24) }),
          /* @__PURE__ */ e(gn, { k: "Open Interest", v: z === null ? "—" : An(z * S.mark) }),
          /* @__PURE__ */ e(gn, { k: "Funding / Countdown", v: `${os(S.funding)}${S.nextFunding > Date.now() ? ` · ${ks(S.nextFunding)}` : ""}`, cls: S.funding > 0 ? "neg" : S.funding < 0 ? "pos" : "" })
        ] })
      ] }) : /* @__PURE__ */ e("span", { class: "muted", children: t.loadError ? "Can't reach Strike right now. Retrying…" : "Loading markets…" }),
      f && !v && /* @__PURE__ */ e("div", { class: "pd-pop", children: /* @__PURE__ */ e(ts, { s: t, sym: i, onPick: B, compact: !0 }) })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-panel pd-chart", children: [
      /* @__PURE__ */ e("div", { class: "pd-ctabs", children: [
        /* @__PURE__ */ e("span", { class: "tabs", role: "tablist", "aria-label": "Chart view", children: zp.map(([M, T]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": d === M, class: d === M ? "on" : "", onClick: () => p(M), children: T }, M)) }),
        d === "chart" && /* @__PURE__ */ e("span", { class: "pd-ivs flat", role: "radiogroup", "aria-label": "Candle interval", children: Mp.map((M) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": o === M, class: o === M ? "on" : "", onClick: () => l(M), children: M === "1d" ? "1D" : M === "1w" ? "1W" : M }, M)) })
      ] }),
      S && d === "chart" && /* @__PURE__ */ e(Np, { s: t, m: S, iv: o }),
      S && d === "funding" && /* @__PURE__ */ e(Zd, { s: t, sym: i }),
      S && d === "depth" && /* @__PURE__ */ e(Jd, { book: u, base: S.base, tick: x }),
      S && d === "liq" && /* @__PURE__ */ e(Qd, { s: t, m: S }),
      S && d === "details" && /* @__PURE__ */ e(ep, { s: t, m: S })
    ] }),
    $ && S && /* @__PURE__ */ e(Vd, { s: t, sym: i, base: S.base, tick: x, book: u, onPrice: (M) => g({ p: M, n: Date.now() }) }),
    /* @__PURE__ */ e("div", { class: "pd-right", children: [
      /* @__PURE__ */ e(Uo, { s: t, m: S, book: u, side: s, setSide: a, limitPick: h }),
      /* @__PURE__ */ e(Ho, { s: t })
    ] }),
    /* @__PURE__ */ e(op, { s: t, onPick: B }),
    /* @__PURE__ */ e("div", { class: "pd-foot", children: [
      /* @__PURE__ */ e("span", { class: `dot${t.testnet ? " test" : ""}` }),
      /* @__PURE__ */ e("span", { children: t.testnet ? "Strike testnet" : "Strike mainnet" }),
      /* @__PURE__ */ e("span", { class: "sp" }),
      /* @__PURE__ */ e("button", { class: "pd-link", onClick: () => _(!0), children: "Disclosures" }),
      /* @__PURE__ */ e("a", { class: "pd-link", href: "https://www.strikefinance.org/terms", target: "_blank", rel: "noopener", children: "Terms" }),
      /* @__PURE__ */ e("a", { class: "pd-link", href: t.client.appUrl(), target: "_blank", rel: "noopener", children: "Powered by Strike" }),
      /* @__PURE__ */ e("span", { class: "muted", children: [
        "via ",
        t.config.builderCode
      ] })
    ] }),
    k && /* @__PURE__ */ e(Oe, { title: "Disclosures", onClose: () => _(!1), tall: !0, children: /* @__PURE__ */ e(ys, { s: t }) })
  ] });
}
function gn({ k: t, v: n, cls: i, title: r }) {
  return /* @__PURE__ */ e("div", { class: "pd-stat", title: r, children: [
    /* @__PURE__ */ e("span", { class: "k", children: t }),
    /* @__PURE__ */ e("span", { class: `v num ${i ?? ""}`, children: n })
  ] });
}
function Np({ s: t, m: n, iv: i }) {
  const r = De(null), [s, a] = m(360);
  return ti(() => {
    const o = r.current;
    if (!o || typeof ResizeObserver > "u") return;
    const l = new ResizeObserver(() => o.clientHeight && a(Math.max(220, o.clientHeight)));
    return l.observe(o), () => l.disconnect();
  }, []), /* @__PURE__ */ e("div", { class: "pd-chart-box", ref: r, children: /* @__PURE__ */ e(br, { client: t.client, symbol: n.symbol, interval: i, tick: n.spec.tickSize, height: s, live: { mark: n.mark, last: n.last, index: n.index } }) });
}
function Pp() {
  const [t, n] = m(() => {
    try {
      const r = JSON.parse(cn("favorites") ?? "[]");
      return new Set(Array.isArray(r) ? r.filter((s) => typeof s == "string") : []);
    } catch {
      return /* @__PURE__ */ new Set();
    }
  });
  return [t, (r) => n((s) => {
    const a = new Set(s);
    return a.has(r) ? a.delete(r) : a.add(r), cn("favorites", JSON.stringify([...a])), a;
  })];
}
function ts({ s: t, sym: n, onPick: i, compact: r }) {
  const [s, a] = m(""), [o, l] = m("all"), [d, p] = Pp(), u = es(Bo(t.markets, s), "volume", !0).filter(
    (c) => o === "all" ? !0 : o === "fav" ? d.has(c.symbol) : o === "crypto" ? Un(c.base) === "crypto" : Un(c.base) !== "crypto"
  );
  return /* @__PURE__ */ e("div", { class: `pd-panel pd-list${r ? " compact" : ""}`, children: [
    /* @__PURE__ */ e("div", { class: "pd-tabs", children: ["fav", "all", "crypto", "tradfi"].map((c) => /* @__PURE__ */ e("button", { class: o === c ? "on" : "", onClick: () => l(c), "aria-label": c === "fav" ? "Favorites" : void 0, title: c === "fav" ? "Favorites" : void 0, children: c === "fav" ? /* @__PURE__ */ e(K, { n: "star", size: 16 }) : c === "all" ? "All" : c === "crypto" ? "Crypto" : "TradFi" }, c)) }),
    /* @__PURE__ */ e("label", { class: "pd-search", children: [
      /* @__PURE__ */ e(K, { n: "search", size: 16 }),
      /* @__PURE__ */ e("input", { placeholder: "Search markets", value: s, onInput: (c) => a(c.target.value), "aria-label": "Search markets" })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-list-h", children: [
      /* @__PURE__ */ e("span", { children: "Market" }),
      /* @__PURE__ */ e("span", { children: "Price / 24h" })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-list-b", children: [
      u.map((c) => /* @__PURE__ */ e("button", { class: `pd-mrow${c.symbol === n ? " on" : ""}`, onClick: () => i(c.symbol), children: [
        /* @__PURE__ */ e(
          "span",
          {
            class: `pd-star${d.has(c.symbol) ? " on" : ""}`,
            role: "button",
            tabIndex: 0,
            "aria-pressed": d.has(c.symbol),
            "aria-label": d.has(c.symbol) ? `Remove ${c.base} from favorites` : `Add ${c.base} to favorites`,
            onClick: (h) => (h.stopPropagation(), p(c.symbol)),
            onKeyDown: (h) => (h.key === "Enter" || h.key === " ") && (h.preventDefault(), h.stopPropagation(), p(c.symbol)),
            children: /* @__PURE__ */ e(K, { n: "star", size: 14 })
          }
        ),
        /* @__PURE__ */ e(_t, { base: c.base, size: 28 }),
        /* @__PURE__ */ e("span", { class: "l", children: [
          /* @__PURE__ */ e("b", { children: [
            c.base,
            " ",
            /* @__PURE__ */ e("span", { class: "pa-lev", title: "Strike's maximum leverage for this market", children: [
              c.strikeMaxLev,
              "x"
            ] })
          ] }),
          /* @__PURE__ */ e("span", { class: "muted num", children: [
            An(c.vol24),
            " Vol"
          ] })
        ] }),
        /* @__PURE__ */ e("span", { class: "r num", children: [
          /* @__PURE__ */ e("b", { children: Y(c.mark, c.spec.tickSize) }),
          /* @__PURE__ */ e("span", { class: c.change >= 0 ? "pos" : "neg", children: dt(c.change) })
        ] })
      ] }, c.symbol)),
      !u.length && /* @__PURE__ */ e("div", { class: "pd-center muted", children: t.markets.length ? o === "fav" && !s ? "Star a market to keep it here." : "No markets match" : "Loading…" })
    ] })
  ] });
}
const Ap = ["15m", "1h", "4h", "1d"];
function Lp({ s: t }) {
  const [n, i] = m(t.config.market), [r, s] = m(t.config.side ?? "buy"), [a, o] = m("1h"), [l, d] = m(void 0), [p, u] = m(!1), [c, h] = m(!1);
  Z(() => i(t.config.market), [t.config.market]), Z(() => s(t.config.side ?? "buy"), [t.config.side, t.config.amount]), Z(() => {
    t.markets.length && !t.bySymbol[n] && i(t.markets[0].symbol);
  }, [t.markets.length, n]);
  const g = t.bySymbol[n];
  Z(() => {
    if (d(void 0), !g) return;
    const y = t.client.orderBook(n);
    let k;
    const _ = y.onUpdate(() => {
      k || (k = setTimeout(() => (k = void 0, d(y.view(200))), 250));
    }), w = setTimeout(() => d((z) => z === void 0 ? null : z), 1e4);
    return () => (_(), clearTimeout(k), clearTimeout(w), y.close());
  }, [n, !!g]);
  const f = (y) => (i(y), u(!1));
  return /* @__PURE__ */ e("div", { class: "pd pp", children: [
    /* @__PURE__ */ e("div", { class: "pd-panel pd-head pp-head", children: [
      g ? /* @__PURE__ */ e(R, { children: [
        /* @__PURE__ */ e("button", { class: "pd-sym", onClick: () => u(!p), "aria-haspopup": "listbox", "aria-expanded": p, children: [
          /* @__PURE__ */ e(_t, { base: g.base, size: 32 }),
          /* @__PURE__ */ e("span", { children: [
            /* @__PURE__ */ e("b", { children: [
              g.base,
              "-USD"
            ] }),
            /* @__PURE__ */ e("span", { class: "muted", children: g.name })
          ] }),
          /* @__PURE__ */ e(K, { n: "down", size: 16 })
        ] }),
        /* @__PURE__ */ e("span", { class: "sp" }),
        /* @__PURE__ */ e("span", { class: "pp-px", children: [
          /* @__PURE__ */ e("b", { class: "num", children: Y(g.mark, g.spec.tickSize) }),
          /* @__PURE__ */ e("span", { class: `num ${g.change >= 0 ? "pos" : "neg"}`, children: [
            H(g.changeAbs, { sign: !0, decimals: Math.abs(g.changeAbs) < 1 ? 4 : 2 }),
            " (",
            dt(g.change),
            ")"
          ] })
        ] })
      ] }) : /* @__PURE__ */ e("span", { class: "muted", children: t.loadError ? "Can't reach Strike right now. Retrying…" : "Loading markets…" }),
      p && /* @__PURE__ */ e("div", { class: "pd-pop", children: /* @__PURE__ */ e(ts, { s: t, sym: n, onPick: f, compact: !0 }) })
    ] }),
    t.config.chart !== !1 && /* @__PURE__ */ e("div", { class: "pd-panel pp-chart", children: [
      /* @__PURE__ */ e("div", { class: "pd-ivs", role: "radiogroup", "aria-label": "Candle interval", children: Ap.map((y) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": a === y, class: a === y ? "on" : "", onClick: () => o(y), children: y === "1d" ? "1D" : y }, y)) }),
      g && /* @__PURE__ */ e(br, { client: t.client, symbol: g.symbol, interval: a, tick: g.spec.tickSize, height: 170, live: { mark: g.mark, last: g.last, index: g.index } })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-right pp-right", children: [
      /* @__PURE__ */ e(Uo, { s: t, m: g, book: l, side: r, setSide: s, limitPick: null }),
      t.session && /* @__PURE__ */ e(Ep, { s: t, onPick: i }),
      /* @__PURE__ */ e(Ho, { s: t })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-foot", children: [
      /* @__PURE__ */ e("span", { class: "pa-net", children: t.testnet ? "Strike testnet" : "Strike mainnet" }),
      /* @__PURE__ */ e("span", { class: "sp" }),
      /* @__PURE__ */ e("button", { class: "pd-link", onClick: () => h(!0), children: "Disclosures" }),
      /* @__PURE__ */ e("a", { class: "pd-link", href: t.client.appUrl(), target: "_blank", rel: "noopener", children: "Powered by Strike" })
    ] }),
    c && /* @__PURE__ */ e(Oe, { title: "Disclosures", onClose: () => h(!1), tall: !0, children: /* @__PURE__ */ e(ys, { s: t }) })
  ] });
}
function Ep({ s: t, onPick: n }) {
  const [i, r] = m("positions"), [s, a] = m(null);
  return /* @__PURE__ */ e("div", { class: "pd-panel pp-trades", children: [
    /* @__PURE__ */ e("div", { class: "pd-tabs left", children: [
      /* @__PURE__ */ e("button", { class: i === "positions" ? "on" : "", onClick: () => r("positions"), children: [
        "Positions (",
        t.positions.length,
        ")"
      ] }),
      /* @__PURE__ */ e("button", { class: i === "orders" ? "on" : "", onClick: () => r("orders"), children: [
        "Open Orders (",
        t.orders.length,
        ")"
      ] })
    ] }),
    i === "positions" ? t.positions.length ? t.positions.map((o) => {
      const l = t.bySymbol[o.symbol], d = o.symbol.split("-")[0], p = Number(o.size), u = l?.mark || Number(o.entry_price), c = l?.spec.tickSize, h = ur(o), g = Number(o.upnl), f = vr(t, o.symbol), y = f.find((w) => String(w.type).startsWith("take_profit")), k = f.find((w) => String(w.type).startsWith("stop")), _ = f.find((w) => String(w.type).startsWith("trailing"));
      return /* @__PURE__ */ e("div", { class: "pp-item", children: [
        /* @__PURE__ */ e("div", { class: "pp-line", children: [
          /* @__PURE__ */ e("button", { class: "pd-mk", onClick: () => n(o.symbol), children: [
            /* @__PURE__ */ e(_t, { base: d, size: 20 }),
            /* @__PURE__ */ e("b", { children: d })
          ] }),
          /* @__PURE__ */ e("span", { class: `pd-badge ${p > 0 ? "long" : "short"}`, children: [
            p > 0 ? "Long" : "Short",
            " ",
            o.leverage,
            "x",
            o.margin_mode === "isolated" ? " Iso" : ""
          ] }),
          /* @__PURE__ */ e("span", { class: "sp" }),
          /* @__PURE__ */ e("b", { class: `num ${g >= 0 ? "pos" : "neg"}`, children: [
            H(g, { sign: !0 }),
            " (",
            dt(h > 0 ? g / h * 100 : 0, 1),
            ")"
          ] })
        ] }),
        /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
          /* @__PURE__ */ e("span", { children: "Size" }),
          /* @__PURE__ */ e("span", { class: "num", children: [
            pe(Math.abs(p)),
            " ",
            d,
            " · ",
            H(Math.abs(p) * u)
          ] })
        ] }),
        /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
          /* @__PURE__ */ e("span", { children: "Entry · Liq." }),
          /* @__PURE__ */ e("span", { class: "num", children: [
            Y(Number(o.entry_price), c),
            " · ",
            Number(o.liquidation_price) > 0 ? Y(Number(o.liquidation_price), c) : "—"
          ] })
        ] }),
        /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
          /* @__PURE__ */ e("span", { children: "TP / SL" }),
          /* @__PURE__ */ e("button", { class: "pd-link num", onClick: () => a({ kind: "tpsl", p: o }), title: "Edit take profit / stop loss", children: [
            y ? Y(Number(y.stop_price), c) : "—",
            " / ",
            k ? Y(Number(k.stop_price), c) : "—",
            _ ? " · trail" : "",
            " ✎"
          ] })
        ] }),
        /* @__PURE__ */ e("div", { class: "pp-acts", children: [
          /* @__PURE__ */ e("button", { class: "pd-btn sm", onClick: () => a({ kind: "close", p: o }), children: "Close" }),
          /* @__PURE__ */ e("button", { class: "pd-btn sm", title: "Trailing stop", onClick: () => a({ kind: "trail", p: o }), children: "Trail" }),
          o.margin_mode === "isolated" && /* @__PURE__ */ e("button", { class: "pd-btn sm", title: "Add or remove margin", onClick: () => a({ kind: "margin", p: o }), children: "Margin" }),
          /* @__PURE__ */ e("button", { class: "pd-btn sm", title: "Reverse position (long ↔ short)", onClick: () => a({ kind: "reverse", p: o }), children: "Reverse" })
        ] })
      ] }, o.id);
    }) : /* @__PURE__ */ e("div", { class: "pp-empty muted", children: "No open positions" }) : t.orders.length ? t.orders.map((o) => {
      const l = t.bySymbol[o.symbol]?.spec.tickSize, d = !/market$|^market|trailing/.test(String(o.type)), p = Number(o.price) ? Y(Number(o.price), l) : Number(o.stop_price) ? Y(Number(o.stop_price), l) : "Market";
      return /* @__PURE__ */ e("div", { class: "pp-item", children: [
        /* @__PURE__ */ e("div", { class: "pp-line", children: [
          /* @__PURE__ */ e("button", { class: "pd-mk", onClick: () => n(o.symbol), children: [
            /* @__PURE__ */ e(_t, { base: o.symbol.split("-")[0], size: 20 }),
            /* @__PURE__ */ e("b", { children: o.symbol.split("-")[0] })
          ] }),
          /* @__PURE__ */ e("span", { class: o.side === "buy" ? "pos" : "neg", children: o.side === "buy" ? "Buy" : "Sell" }),
          /* @__PURE__ */ e("span", { class: "sp" }),
          /* @__PURE__ */ e("span", { class: "num", children: [
            pe(Number(o.size)),
            " @ ",
            p
          ] })
        ] }),
        /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
          /* @__PURE__ */ e("span", { children: [
            String(o.type).replace(/_/g, " "),
            o.reduce_only ? " · reduce only" : ""
          ] }),
          /* @__PURE__ */ e("span", { class: "pp-acts", children: [
            d && /* @__PURE__ */ e("button", { class: "pd-btn sm", onClick: () => a({ kind: "edit", o }), children: "Edit" }),
            /* @__PURE__ */ e("button", { class: "pd-btn sm", onClick: () => t.cancelOrder(o), children: "Cancel" })
          ] })
        ] })
      ] }, o.id);
    }) : /* @__PURE__ */ e("div", { class: "pp-empty muted", children: "No open orders" }),
    s?.kind === "close" && /* @__PURE__ */ e(Ms, { s: t, p: s.p, onClose: () => a(null) }),
    s?.kind === "tpsl" && /* @__PURE__ */ e(_s, { s: t, p: s.p, onClose: () => a(null) }),
    s?.kind === "trail" && /* @__PURE__ */ e(Ss, { s: t, p: s.p, onClose: () => a(null) }),
    s?.kind === "margin" && /* @__PURE__ */ e(Cs, { s: t, p: s.p, onClose: () => a(null) }),
    s?.kind === "reverse" && /* @__PURE__ */ e($s, { s: t, p: s.p, onClose: () => a(null) }),
    s?.kind === "edit" && /* @__PURE__ */ e(qo, { s: t, o: s.o, onClose: () => a(null) })
  ] });
}
function Ip({ s: t, nav: n }) {
  const { items: i } = zs(t), r = (i ?? []).filter((a) => a.id.startsWith("t")).slice(0, 8), s = t.testnet ? "https://preprod.cardanoscan.io/address/" : "https://cardanoscan.io/address/";
  return /* @__PURE__ */ e("div", { class: "pa-screen", children: [
    /* @__PURE__ */ e("div", { class: "pa-top", children: [
      /* @__PURE__ */ e(tt, { n: "back", label: "Back", onClick: n.back }),
      /* @__PURE__ */ e("div", { class: "pa-title", children: "Deposit and withdrawal issues" })
    ] }),
    /* @__PURE__ */ e("div", { class: "pa-scroll", children: [
      /* @__PURE__ */ e("div", { class: "pa-prose", children: [
        /* @__PURE__ */ e("p", { children: "Deposits usually take a few minutes: Strike waits for Cardano confirmations before crediting. Withdrawals usually arrive within a few minutes." }),
        /* @__PURE__ */ e("p", { children: "Your ADA is always visible on-chain. If a transfer seems stuck, check it in a Cardano explorer, then contact Strike support with the transaction." })
      ] }),
      t.session ? /* @__PURE__ */ e(R, { children: [
        /* @__PURE__ */ e("h2", { class: "pa-h2 sm", children: "Funds" }),
        /* @__PURE__ */ e(Te, { children: [
          /* @__PURE__ */ e(Q, { k: "Account value", v: /* @__PURE__ */ e("span", { class: "num", children: H(t.equity) }) }),
          /* @__PURE__ */ e(Q, { k: "Available to trade", v: /* @__PURE__ */ e("span", { class: "num", children: H(t.available) }) }),
          /* @__PURE__ */ e(Q, { k: "Unrealized P&L", v: /* @__PURE__ */ e("span", { class: `num ${t.upnl >= 0 ? "pos" : "neg"}`, children: H(t.upnl, { sign: !0 }) }) })
        ] }),
        /* @__PURE__ */ e("h2", { class: "pa-h2 sm", children: "Recent transfers" }),
        i === null ? /* @__PURE__ */ e("div", { class: "pa-empty", children: /* @__PURE__ */ e(Ze, {}) }) : r.length ? /* @__PURE__ */ e(Te, { children: r.map((a) => /* @__PURE__ */ e(Q, { k: a.title, sub: a.sub, v: /* @__PURE__ */ e("span", { class: `num ${a.cls}`, children: a.amount }) }, a.id)) }) : /* @__PURE__ */ e("div", { class: "pa-empty", children: "No deposits or withdrawals yet." }),
        /* @__PURE__ */ e("a", { class: "pa-btn dark wide", href: s + encodeURIComponent(t.session.address), target: "_blank", rel: "noopener", children: "View your wallet on Cardanoscan" })
      ] }) : /* @__PURE__ */ e("div", { class: "pa-empty", children: "Connect a wallet to see your transfers." }),
      /* @__PURE__ */ e("a", { class: "pa-btn dark wide", href: t.client.appUrl(), target: "_blank", rel: "noopener", children: "Open Strike" }),
      /* @__PURE__ */ e("div", { class: "pa-bottom-pad sm" })
    ] })
  ] });
}
function Fp({ s: t, nav: n, onClose: i, onLearn: r, onDisclosures: s }) {
  const [a, o] = m(cn("getstarted-hidden") === "1"), l = [...t.markets].sort((p, u) => u.vol24 - p.vol24).slice(0, 5), d = (p) => n.push({ k: "markets", pick: p });
  return /* @__PURE__ */ e("div", { class: "pa-screen", children: [
    /* @__PURE__ */ e("div", { class: "pa-top", children: [
      i ? /* @__PURE__ */ e(tt, { n: "x", label: "Close Perps", onClick: i }) : null,
      /* @__PURE__ */ e("div", { class: "pa-title", children: [
        "Perps",
        t.testnet && t.config.networkBadge !== !1 && /* @__PURE__ */ e("span", { class: "pa-net", children: "Testnet" })
      ] }),
      /* @__PURE__ */ e("span", { class: "sp" }),
      t.session && /* @__PURE__ */ e(tt, { n: "clock", label: "History", onClick: () => n.push({ k: "history" }) }),
      /* @__PURE__ */ e(tt, { n: "search", label: "Search markets", onClick: () => n.push({ k: "markets", focus: !0 }) })
    ] }),
    /* @__PURE__ */ e("div", { class: "pa-scroll", children: [
      /* @__PURE__ */ e("div", { class: "pa-equity num", children: H(t.session ? t.equity : 0) }),
      t.session && t.upnl !== 0 && /* @__PURE__ */ e("div", { class: `pa-equity-sub num ${t.upnl > 0 ? "pos" : "neg"}`, children: [
        H(t.upnl, { sign: !0 }),
        " unrealized"
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-card funds", children: [
        /* @__PURE__ */ e(Q, { k: "Available funds", info: () => r("funds"), v: /* @__PURE__ */ e("span", { class: "num", children: H(t.session ? t.available : 0) }) }),
        t.session ? /* @__PURE__ */ e("div", { class: "pa-two", children: [
          /* @__PURE__ */ e("button", { class: "pa-btn dark", onClick: () => t.openFunds("deposit"), children: "Add" }),
          /* @__PURE__ */ e("button", { class: "pa-btn dark", disabled: t.available < jt, title: t.available < jt ? `Minimum withdrawal ${H(jt, { decimals: 0 })}` : void 0, onClick: () => t.openFunds("withdraw"), children: "Withdraw" })
        ] }) : /* @__PURE__ */ e("button", { class: "pa-btn dark wide", onClick: () => t.setSheet("connect"), children: "Connect wallet" }),
        t.session && t.accountLoaded && t.isNewAccount && /* @__PURE__ */ e("div", { class: "pa-hint", children: [
          "New to Strike: your first deposit needs to be at least ",
          H(Wt, { decimals: 0 }),
          " of ADA (Strike's rule). After that, from $5."
        ] })
      ] }),
      t.positions.length > 0 && /* @__PURE__ */ e(R, { children: [
        /* @__PURE__ */ e("h2", { class: "pa-h2", children: "Your Positions" }),
        /* @__PURE__ */ e(Te, { children: t.positions.map((p) => {
          const u = t.bySymbol[p.symbol], c = Number(p.size), h = p.symbol.split("-")[0], g = Number(p.upnl), f = Math.abs(c) * (u?.mark || Number(p.entry_price));
          return /* @__PURE__ */ e("button", { class: "pa-pos", onClick: () => n.push({ k: "position", id: p.id }), children: [
            /* @__PURE__ */ e(_t, { base: h, size: 36 }),
            /* @__PURE__ */ e("span", { class: "l", children: [
              /* @__PURE__ */ e("b", { children: [
                h,
                " ",
                /* @__PURE__ */ e("span", { class: c > 0 ? "pos" : "neg", children: c > 0 ? "Long" : "Short" }),
                " ",
                /* @__PURE__ */ e("span", { class: "pa-lev", children: [
                  p.leverage,
                  "x"
                ] })
              ] }),
              /* @__PURE__ */ e("span", { class: "s num", children: [
                pe(Math.abs(c)),
                " ",
                h
              ] })
            ] }),
            /* @__PURE__ */ e("span", { class: "r num", children: [
              /* @__PURE__ */ e("b", { children: H(f) }),
              /* @__PURE__ */ e("span", { class: g >= 0 ? "pos" : "neg", children: H(g, { sign: !0 }) })
            ] }),
            /* @__PURE__ */ e(K, { n: "right", size: 18, cls: "chev" })
          ] }, p.id);
        }) })
      ] }),
      !a && !t.positions.length && /* @__PURE__ */ e("div", { class: "pa-card gs", children: [
        /* @__PURE__ */ e("button", { class: "x", "aria-label": "Dismiss", onClick: () => (cn("getstarted-hidden", "1"), o(!0)), children: /* @__PURE__ */ e(K, { n: "x", size: 14 }) }),
        /* @__PURE__ */ e("div", { class: "eyebrow", children: "GET STARTED" }),
        /* @__PURE__ */ e("div", { class: "t", children: "New to Perps? Learn the basics in a minute" }),
        /* @__PURE__ */ e("button", { class: "link", onClick: () => n.push({ k: "onboard" }), children: [
          "Learn More ",
          /* @__PURE__ */ e(K, { n: "right", size: 14 })
        ] }),
        /* @__PURE__ */ e(Dp, {})
      ] }),
      /* @__PURE__ */ e("button", { class: "pa-h2 link", onClick: () => n.push({ k: "markets" }), children: [
        "Lists ",
        /* @__PURE__ */ e(K, { n: "right", size: 18 })
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-chips", children: [Mn.slice(0, Math.ceil(Mn.length / 2)), Mn.slice(Math.ceil(Mn.length / 2))].map((p, u) => /* @__PURE__ */ e("div", { class: "pa-chiprow", children: p.map((c) => /* @__PURE__ */ e("button", { class: "pa-chip", onClick: () => n.push({ k: "markets", list: c.id }), children: [
        /* @__PURE__ */ e(K, { n: c.icon, size: 17 }),
        c.label
      ] }, c.id)) }, u)) }),
      /* @__PURE__ */ e("button", { class: "pa-h2 link", onClick: () => n.push({ k: "markets" }), children: [
        "Explore Perps ",
        /* @__PURE__ */ e(K, { n: "right", size: 18 })
      ] }),
      /* @__PURE__ */ e(Te, { cls: "mk", children: l.length ? l.map((p, u) => /* @__PURE__ */ e("button", { class: "pa-mrow", onClick: () => n.push({ k: "market", sym: p.symbol }), children: [
        /* @__PURE__ */ e(_t, { base: p.base, size: 40, rank: u < 3 ? u + 1 : void 0 }),
        /* @__PURE__ */ e("span", { class: "l", children: [
          /* @__PURE__ */ e("b", { children: [
            p.base,
            " ",
            /* @__PURE__ */ e("span", { class: "pa-lev", children: [
              p.strikeMaxLev,
              "x"
            ] })
          ] }),
          /* @__PURE__ */ e("span", { class: "s num", children: [
            An(p.vol24),
            " Vol"
          ] })
        ] }),
        /* @__PURE__ */ e("span", { class: "r num", children: [
          /* @__PURE__ */ e("b", { children: Y(p.mark, p.spec.tickSize) }),
          /* @__PURE__ */ e("span", { class: p.change >= 0 ? "pos" : "neg", children: dt(p.change) })
        ] })
      ] }, p.symbol)) : /* @__PURE__ */ e("div", { class: "pa-empty-row", children: t.loadError ? "Can't reach Strike right now. Retrying…" : "Loading markets…" }) }),
      /* @__PURE__ */ e("h2", { class: "pa-h2", children: "Learn" }),
      /* @__PURE__ */ e(Te, { children: [
        /* @__PURE__ */ e(Q, { k: "How Perps work", sub: "Long, short and leverage in 1 minute", onClick: () => r("basics"), chevron: "right" }),
        /* @__PURE__ */ e(Q, { k: "Leverage and liquidation", sub: "How far the price can move against you", onClick: () => r("leverage"), chevron: "right" }),
        /* @__PURE__ */ e(Q, { k: "Perps FAQ", sub: "Fees, funding, deposits", onClick: () => r("faq"), chevron: "right" })
      ] }),
      /* @__PURE__ */ e("button", { class: "pa-foot-link", onClick: () => n.push({ k: "help" }), children: [
        /* @__PURE__ */ e(K, { n: "info", size: 15 }),
        " Having issues with a deposit or withdrawal?"
      ] }),
      /* @__PURE__ */ e("button", { class: "pa-foot-link", onClick: s, children: [
        /* @__PURE__ */ e(K, { n: "info", size: 15 }),
        " View Disclosures"
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-powered", children: [
        "Trades execute on ",
        /* @__PURE__ */ e("b", { children: "Strike" }),
        " · via ",
        t.config.builderCode
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-bottom-pad" })
    ] }),
    /* @__PURE__ */ e("div", { class: "pa-dock", children: [
      /* @__PURE__ */ e("button", { class: "pa-btn long", onClick: () => d("buy"), children: "Long" }),
      /* @__PURE__ */ e("button", { class: "pa-btn short", onClick: () => d("sell"), children: "Short" })
    ] })
  ] });
}
function Dp() {
  return /* @__PURE__ */ e("svg", { class: "art", width: "76", height: "64", viewBox: "0 0 76 64", "aria-hidden": "true", children: [
    /* @__PURE__ */ e("path", { d: "M6 50 C 18 50, 20 26, 32 26 S 46 44, 56 30 S 66 12, 70 10", fill: "none", stroke: "var(--pa-accent)", "stroke-width": "5", "stroke-linecap": "round" }),
    /* @__PURE__ */ e("circle", { cx: "70", cy: "10", r: "5", fill: "var(--pa-accent)" }),
    /* @__PURE__ */ e("path", { d: "M58 46l2.4 6 6 2.4-6 2.4-2.4 6-2.4-6-6-2.4 6-2.4z", fill: "#ffd36e" })
  ] });
}
const Wo = {
  LIVE: { interval: "1m", limit: 120, refresh: 2e4 },
  "1D": { interval: "15m", limit: 96, refresh: 6e4 },
  "1W": { interval: "1h", limit: 168, refresh: 12e4 },
  "1M": { interval: "4h", limit: 180, refresh: 3e5 },
  "1Y": { interval: "1d", limit: 365, refresh: 9e5 },
  ALL: { interval: "1w", limit: 520, refresh: 9e5 }
};
function Op({
  client: t,
  symbol: n,
  range: i,
  live: r,
  height: s = 240,
  onHover: a,
  onFirst: o
}) {
  const [l, d] = m(null), [p, u] = m(!1), [c, h] = m(360), [g, f] = m(null), y = De(null);
  ti(() => {
    const E = y.current;
    if (!E || typeof ResizeObserver > "u") return;
    const D = new ResizeObserver(() => E.clientWidth && h(E.clientWidth));
    return D.observe(E), h(E.clientWidth || 360), () => D.disconnect();
  }, []), Z(() => {
    let E = !0;
    d(null), u(!1);
    const D = Wo[i], W = () => t.market.klines(n, D.interval, D.limit, "mark").then((N) => E && (d(N), u(!N.length))).catch(() => E && u(!0));
    W();
    const A = setInterval(() => !At() && W(), D.refresh);
    return () => {
      E = !1, clearInterval(A);
    };
  }, [t, n, i]);
  const k = l?.length ? [...l.map((E) => ({ t: E.openTime, p: E.close })), ...r > 0 ? [{ t: Date.now(), p: r }] : []] : [], _ = k.length ? l[0].open : 0;
  if (Z(() => {
    _ > 0 && o?.(_);
  }, [_, n, i]), !k.length)
    return /* @__PURE__ */ e("div", { class: "pa-line", ref: y, style: { height: `${s}px` }, children: /* @__PURE__ */ e("div", { class: "pa-line-msg", children: p ? "Chart isn't available right now." : "" }) });
  const w = k.map((E) => E.p);
  let z = Math.min(...w), C = Math.max(...w);
  const v = (C - z) * 0.08 || C * 2e-3 || 1;
  z -= v, C += v;
  const $ = k.length, S = (E) => E / Math.max(1, $ - 1) * (c - 12) + 2, B = (E) => 8 + (C - E) / (C - z) * (s - 16), x = k.map((E, D) => `${D ? "L" : "M"}${S(D).toFixed(1)},${B(E.p).toFixed(1)}`).join(" "), M = w[$ - 1] >= _, T = `pa-g-${M ? "u" : "d"}`, P = g === null ? null : Math.max(0, Math.min($ - 1, Math.round((g - 2) / (c - 12) * ($ - 1)))), ie = (E) => {
    const D = E.currentTarget.getBoundingClientRect(), W = E.clientX - D.left;
    f(W);
    const A = Math.max(0, Math.min($ - 1, Math.round((W - 2) / (c - 12) * ($ - 1))));
    a?.({ price: k[A].p, time: k[A].t, change: _ > 0 ? (k[A].p - _) / _ * 100 : 0 });
  }, F = () => (f(null), a?.(null));
  return /* @__PURE__ */ e("div", { class: `pa-line ${M ? "up" : "dn"}`, ref: y, style: { height: `${s}px` }, children: /* @__PURE__ */ e("svg", { width: c, height: s, role: "img", "aria-label": `${n} price, ${i}`, onPointerMove: ie, onPointerDown: ie, onPointerLeave: F, onPointerUp: (E) => E.pointerType !== "mouse" && F(), children: [
    /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ e("linearGradient", { id: T, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ e("stop", { offset: "0", "stop-color": "currentColor", "stop-opacity": ".22" }),
      /* @__PURE__ */ e("stop", { offset: "1", "stop-color": "currentColor", "stop-opacity": "0" })
    ] }) }),
    /* @__PURE__ */ e("path", { d: `${x} L${S($ - 1)},${s} L${S(0)},${s} Z`, fill: `url(#${T})`, stroke: "none" }),
    /* @__PURE__ */ e("path", { d: x, fill: "none", stroke: "currentColor", "stroke-width": "2.2", "stroke-linejoin": "round", "stroke-linecap": "round" }),
    P === null ? /* @__PURE__ */ e(R, { children: /* @__PURE__ */ e("circle", { cx: S($ - 1), cy: B(w[$ - 1]), r: "3.4", fill: "currentColor" }) }) : /* @__PURE__ */ e(R, { children: [
      /* @__PURE__ */ e("line", { x1: S(P), x2: S(P), y1: 0, y2: s, class: "xh" }),
      /* @__PURE__ */ e("circle", { cx: S(P), cy: B(w[P]), r: "4.5", fill: "currentColor", stroke: "#000", "stroke-width": "2" })
    ] })
  ] }) });
}
const Bp = { LIVE: "1m", "1D": "15m", "1W": "1h", "1M": "4h", "1Y": "1d", ALL: "1w" };
function Rp({ s: t, nav: n, sym: i, onLearn: r }) {
  const s = t.bySymbol[i], [a, o] = m("1D"), [l, d] = m(null), [p, u] = m(0), [c, h] = m(!1), [g, f] = m(null), [, y] = m(0);
  if (Z(() => {
    let S = !0;
    const B = () => t.client.market.openInterest(i).then((T) => S && f(T)).catch(() => {
    });
    B();
    const x = setInterval(B, 6e4), M = setInterval(() => y((T) => T + 1), 1e3);
    return () => {
      S = !1, clearInterval(x), clearInterval(M);
    };
  }, [i]), !s)
    return /* @__PURE__ */ e("div", { class: "pa-screen", children: [
      /* @__PURE__ */ e("div", { class: "pa-top", children: /* @__PURE__ */ e(tt, { n: "back", label: "Back", onClick: n.back }) }),
      /* @__PURE__ */ e("div", { class: "pa-empty", children: t.markets.length ? `${i} isn't listed on this network.` : "Loading…" })
    ] });
  const k = s.spec.tickSize, _ = a === "1D" && s.ref24 > 0 ? s.ref24 : p, w = l?.price ?? s.mark, z = l ? l.change : _ > 0 ? (s.mark - _) / _ * 100 : 0, C = l ? p > 0 ? l.price - p : 0 : _ > 0 ? s.mark - _ : 0, v = t.positions.find((S) => S.symbol === i), $ = t.orders.filter((S) => S.symbol === i);
  return /* @__PURE__ */ e("div", { class: "pa-screen", children: [
    /* @__PURE__ */ e("div", { class: "pa-top", children: [
      /* @__PURE__ */ e(tt, { n: "back", label: "Back", onClick: n.back }),
      /* @__PURE__ */ e("span", { class: "sp" }),
      t.testnet && t.config.networkBadge !== !1 && /* @__PURE__ */ e("span", { class: "pa-net", children: "Testnet" })
    ] }),
    /* @__PURE__ */ e("div", { class: "pa-scroll", children: [
      /* @__PURE__ */ e("div", { class: "pa-coinhead", children: [
        /* @__PURE__ */ e(_t, { base: s.base, size: 30 }),
        /* @__PURE__ */ e("span", { class: "nm", children: s.name }),
        /* @__PURE__ */ e("span", { class: "pa-lev", children: [
          s.strikeMaxLev,
          "x"
        ] })
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-price num", children: Y(w, k) }),
      /* @__PURE__ */ e("div", { class: `pa-chg num ${z >= 0 ? "pos" : "neg"}`, children: [
        H(C, { sign: !0, decimals: Math.abs(C) < 1 ? 4 : 2 }),
        " (",
        dt(z),
        ")",
        " ",
        /* @__PURE__ */ e("span", { class: "muted", children: l ? sn(l.time) : a === "LIVE" ? "Past 2h" : a === "1D" ? "Past day" : a === "1W" ? "Past week" : a === "1M" ? "Past month" : a === "1Y" ? "Past year" : "All time" })
      ] }),
      c ? /* @__PURE__ */ e("div", { class: "pa-candles", children: /* @__PURE__ */ e(br, { client: t.client, symbol: i, interval: Bp[a], tick: k, live: { mark: s.mark, last: s.last, index: s.index } }) }) : /* @__PURE__ */ e(Op, { client: t.client, symbol: i, range: a, live: s.mark, onHover: d, onFirst: u }),
      /* @__PURE__ */ e("div", { class: "pa-ranges", role: "radiogroup", "aria-label": "Chart range", children: [
        Object.keys(Wo).map((S) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": a === S, class: a === S ? "on" : "", onClick: () => o(S), children: S === "LIVE" ? /* @__PURE__ */ e(R, { children: [
          /* @__PURE__ */ e("span", { class: "pa-livedot" }),
          "LIVE"
        ] }) : S }, S)),
        /* @__PURE__ */ e("button", { class: "ic", "aria-label": c ? "Line chart" : "Candle chart", onClick: () => h(!c), children: /* @__PURE__ */ e(K, { n: c ? "line" : "candles", size: 18 }) })
      ] }),
      v && /* @__PURE__ */ e(R, { children: [
        /* @__PURE__ */ e("h2", { class: "pa-h2", children: "Your Position" }),
        /* @__PURE__ */ e(Te, { children: /* @__PURE__ */ e("button", { class: "pa-pos", onClick: () => n.push({ k: "position", id: v.id }), children: [
          /* @__PURE__ */ e(_t, { base: s.base, size: 36 }),
          /* @__PURE__ */ e("span", { class: "l", children: [
            /* @__PURE__ */ e("b", { children: [
              s.base,
              " ",
              /* @__PURE__ */ e("span", { class: Number(v.size) > 0 ? "pos" : "neg", children: Number(v.size) > 0 ? "Long" : "Short" }),
              " ",
              /* @__PURE__ */ e("span", { class: "pa-lev", children: [
                v.leverage,
                "x"
              ] })
            ] }),
            /* @__PURE__ */ e("span", { class: "s num", children: [
              pe(Math.abs(Number(v.size))),
              " ",
              s.base
            ] })
          ] }),
          /* @__PURE__ */ e("span", { class: "r num", children: [
            /* @__PURE__ */ e("b", { children: H(Math.abs(Number(v.size)) * s.mark) }),
            /* @__PURE__ */ e("span", { class: Number(v.upnl) >= 0 ? "pos" : "neg", children: H(Number(v.upnl), { sign: !0 }) })
          ] }),
          /* @__PURE__ */ e(K, { n: "right", size: 18, cls: "chev" })
        ] }) })
      ] }),
      $.length > 0 && /* @__PURE__ */ e(R, { children: [
        /* @__PURE__ */ e("h2", { class: "pa-h2", children: "Open Orders" }),
        /* @__PURE__ */ e(Te, { children: $.map((S) => /* @__PURE__ */ e("div", { class: "pa-row", children: [
          /* @__PURE__ */ e("span", { class: "l", children: [
            /* @__PURE__ */ e("span", { class: "k", children: [
              /* @__PURE__ */ e("span", { class: S.side === "buy" ? "pos" : "neg", children: S.side === "buy" ? "Buy" : "Sell" }),
              " ",
              String(S.type).replace(/_/g, " "),
              S.reduce_only ? " · closes" : ""
            ] }),
            /* @__PURE__ */ e("span", { class: "s num", children: [
              pe(Number(S.size)),
              " ",
              s.base,
              " @ ",
              Y(Number(S.price) || Number(S.stop_price), k)
            ] })
          ] }),
          /* @__PURE__ */ e("button", { class: "pa-btn dark xs", onClick: () => t.cancelOrder(S), children: "Cancel" })
        ] }, S.id)) })
      ] }),
      /* @__PURE__ */ e("h2", { class: "pa-h2", children: "Stats" }),
      /* @__PURE__ */ e(Te, { children: [
        /* @__PURE__ */ e(Q, { k: "Mark price", info: () => r("mark"), v: /* @__PURE__ */ e("span", { class: "num", children: Y(s.mark, k) }) }),
        /* @__PURE__ */ e(Q, { k: "Index price", info: () => r("index"), v: /* @__PURE__ */ e("span", { class: "num", children: Y(s.index, k) }) }),
        /* @__PURE__ */ e(Q, { k: "24h volume", v: /* @__PURE__ */ e("span", { class: "num", children: An(s.vol24) }) }),
        /* @__PURE__ */ e(Q, { k: "Open interest", v: /* @__PURE__ */ e("span", { class: "num", children: g === null ? "—" : An(g * s.mark) }) }),
        /* @__PURE__ */ e(
          Q,
          {
            k: "Funding",
            info: () => r("funding"),
            v: /* @__PURE__ */ e("span", { class: `num ${s.funding > 0 ? "neg" : s.funding < 0 ? "pos" : ""}`, children: os(s.funding) }),
            vsub: s.nextFunding > Date.now() ? /* @__PURE__ */ e("span", { class: "num", children: `next in ${ks(s.nextFunding)}` }) : void 0
          }
        ),
        /* @__PURE__ */ e(Q, { k: "Max leverage", v: `${s.strikeMaxLev}x`, vsub: s.maxLev < s.strikeMaxLev ? `up to ${s.maxLev}x in this wallet` : void 0 }),
        /* @__PURE__ */ e(Q, { k: "Minimum order", v: /* @__PURE__ */ e("span", { class: "num", children: H(s.spec.minNotional, { decimals: 0 }) }) })
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-bottom-pad" })
    ] }),
    /* @__PURE__ */ e("div", { class: "pa-dock", children: [
      /* @__PURE__ */ e("button", { class: "pa-btn long", onClick: () => n.push({ k: "trade", sym: i, side: "buy" }), children: "Long" }),
      /* @__PURE__ */ e("button", { class: "pa-btn short", onClick: () => n.push({ k: "trade", sym: i, side: "sell" }), children: "Short" })
    ] })
  ] });
}
const Va = [
  { id: "high", icon: "bolt", title: "High risk tolerance", text: "Big swings are fine with me, and I accept I could lose all of the funds I add.", lev: 10 },
  { id: "medium", icon: "chart", title: "Medium risk tolerance", text: "Some swings are fine, and I accept I could lose a large part of the funds I add.", lev: 5 },
  { id: "low", icon: "shield", title: "Low risk tolerance", text: "I prefer small swings and want liquidation to stay far away.", lev: 2 }
];
function qp({ s: t, nav: n, onLearn: i }) {
  const [r, s] = m(0), [a, o] = m(""), l = Math.max(1, ...t.markets.map((u) => u.maxLev), 1), d = Math.min(...t.markets.map((u) => u.spec.minNotional).filter((u) => u > 0), 10), p = () => {
    const u = Va.find((c) => c.id === a);
    u && cn("default-leverage", String(Math.min(u.lev, l))), cn("onboarded", "1"), n.back(), t.session || t.setSheet("connect");
  };
  return /* @__PURE__ */ e("div", { class: "pa-screen onboard", children: [
    /* @__PURE__ */ e("div", { class: "pa-top", children: [
      /* @__PURE__ */ e(tt, { n: r ? "back" : "x", label: r ? "Back" : "Close", onClick: () => r ? s(r - 1) : n.back() }),
      /* @__PURE__ */ e("div", { class: "pa-dots", "aria-hidden": "true", children: [0, 1, 2].map((u) => /* @__PURE__ */ e("span", { class: u === r ? "on" : "" }, u)) }),
      /* @__PURE__ */ e("span", { class: "pa-round ghost" })
    ] }),
    r === 0 && /* @__PURE__ */ e("div", { class: "pa-ob", children: [
      /* @__PURE__ */ e(Up, {}),
      /* @__PURE__ */ e("h1", { children: "Trade future prices with Perps" }),
      /* @__PURE__ */ e("p", { class: "lede", children: `Perps let you trade on whether a price goes up ("long") or down ("short"), on Strike's markets.` }),
      /* @__PURE__ */ e("div", { class: "pt", children: [
        /* @__PURE__ */ e(K, { n: "wallet", size: 22 }),
        /* @__PURE__ */ e("span", { children: [
          /* @__PURE__ */ e("b", { children: "Start small" }),
          /* @__PURE__ */ e("span", { children: [
            "Orders from $",
            d.toFixed(0),
            ". Only the funds you add to Perps are at risk."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { class: "pt", children: [
        /* @__PURE__ */ e(K, { n: "chart", size: 22 }),
        /* @__PURE__ */ e("span", { children: [
          /* @__PURE__ */ e("b", { children: [
            "Add up to ",
            l,
            "x leverage"
          ] }),
          /* @__PURE__ */ e("span", { children: "Choose a risk level that's right for you" })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { class: "sp" }),
      /* @__PURE__ */ e("button", { class: "pa-btn primary big", onClick: () => s(1), children: "Continue" }),
      /* @__PURE__ */ e("button", { class: "pa-btn dark big", onClick: () => i("basics"), children: "Learn more" })
    ] }),
    r === 1 && /* @__PURE__ */ e("div", { class: "pa-ob", children: [
      /* @__PURE__ */ e("h1", { class: "c", children: "How Perps work" }),
      /* @__PURE__ */ e("p", { class: "lede c", children: "Four words cover most of it." }),
      /* @__PURE__ */ e("div", { class: "pa-ob-facts", children: [
        /* @__PURE__ */ e("div", { children: [
          /* @__PURE__ */ e("b", { class: "pos", children: "Long" }),
          /* @__PURE__ */ e("span", { children: "Profit when the price goes up" })
        ] }),
        /* @__PURE__ */ e("div", { children: [
          /* @__PURE__ */ e("b", { class: "neg", children: "Short" }),
          /* @__PURE__ */ e("span", { children: "Profit when the price goes down" })
        ] }),
        /* @__PURE__ */ e("div", { children: [
          /* @__PURE__ */ e("b", { children: "Leverage" }),
          /* @__PURE__ */ e("span", { children: "Multiplies gains and losses" })
        ] }),
        /* @__PURE__ */ e("div", { children: [
          /* @__PURE__ */ e("b", { children: "Liquidation" }),
          /* @__PURE__ */ e("span", { children: "If the price moves too far against you, Strike closes some or all of the position and you can lose its margin" })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { class: "sp" }),
      /* @__PURE__ */ e("button", { class: "pa-btn primary big", onClick: () => s(2), children: "Next" })
    ] }),
    r === 2 && /* @__PURE__ */ e("div", { class: "pa-ob", children: [
      /* @__PURE__ */ e("h1", { class: "c", children: "Pick your starting risk" }),
      /* @__PURE__ */ e("p", { class: "lede c", children: "This sets your starting leverage. You can change it on every trade." }),
      /* @__PURE__ */ e("div", { class: "pa-risks", role: "radiogroup", children: Va.map((u) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": a === u.id, class: `pa-risk${a === u.id ? " on" : ""}`, onClick: () => o(u.id), children: [
        /* @__PURE__ */ e(K, { n: u.icon, size: 20 }),
        /* @__PURE__ */ e("span", { class: "l", children: [
          /* @__PURE__ */ e("b", { children: u.title }),
          /* @__PURE__ */ e("span", { children: u.text }),
          /* @__PURE__ */ e("span", { class: "lev", children: [
            "Starts at ",
            Math.min(u.lev, l),
            "x"
          ] })
        ] }),
        /* @__PURE__ */ e("span", { class: `pa-radio${a === u.id ? " on" : ""}` })
      ] }, u.id)) }),
      !t.session && /* @__PURE__ */ e("p", { class: "pa-p sm c", children: [
        "Next you'll connect a Cardano wallet. New Strike accounts start with a $",
        Wt,
        " first deposit."
      ] }),
      /* @__PURE__ */ e("button", { class: "pa-btn primary big", disabled: !a, onClick: p, children: "Start Trading" })
    ] })
  ] });
}
function Up() {
  return /* @__PURE__ */ e("svg", { class: "pa-ob-art", viewBox: "0 0 320 170", "aria-hidden": "true", children: [
    /* @__PURE__ */ e("g", { transform: "rotate(-9 160 110)", children: [
      /* @__PURE__ */ e("rect", { x: "30", y: "100", width: "260", height: "14", rx: "7", fill: "var(--pa-accent)" }),
      /* @__PURE__ */ e("rect", { x: "30", y: "100", width: "130", height: "14", rx: "7", fill: "var(--pa-neg)" })
    ] }),
    /* @__PURE__ */ e("path", { d: "M160 108 L132 160 H188 Z", fill: "#9aa0ff" }),
    /* @__PURE__ */ e("circle", { cx: "160", cy: "138", r: "7", fill: "#0b0b0f" }),
    /* @__PURE__ */ e("rect", { x: "214", y: "30", width: "86", height: "36", rx: "10", fill: "var(--pa-accent)" }),
    /* @__PURE__ */ e("text", { x: "257", y: "54", "text-anchor": "middle", "font-size": "18", "font-weight": "700", fill: "#04120c", children: "Long" }),
    /* @__PURE__ */ e("rect", { x: "22", y: "76", width: "86", height: "36", rx: "10", fill: "var(--pa-neg)" }),
    /* @__PURE__ */ e("text", { x: "65", y: "100", "text-anchor": "middle", "font-size": "18", "font-weight": "700", fill: "#fff", children: "Short" }),
    /* @__PURE__ */ e("path", { d: "M150 40l4 10 10 4-10 4-4 10-4-10-10-4 10-4z", fill: "#ffd36e" }),
    /* @__PURE__ */ e("path", { d: "M100 140l3 7 7 3-7 3-3 7-3-7-7-3 7-3z", fill: "#9aa0ff" }),
    /* @__PURE__ */ e("path", { d: "M232 118l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z", fill: "#9aa0ff" })
  ] });
}
function Hp({ s: t, nav: n, id: i, onLearn: r }) {
  const s = t.positions.find(($) => $.id === i), [a, o] = m(null);
  if (!s)
    return /* @__PURE__ */ e("div", { class: "pa-screen", children: [
      /* @__PURE__ */ e("div", { class: "pa-top", children: [
        /* @__PURE__ */ e(tt, { n: "back", label: "Back", onClick: n.back }),
        /* @__PURE__ */ e("div", { class: "pa-title", children: "Position" })
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-empty", children: "This position is closed." })
    ] });
  const l = t.bySymbol[s.symbol], d = s.symbol.split("-")[0], p = Number(s.size), u = p > 0, c = l?.mark || Number(s.entry_price), h = l?.spec.tickSize, g = Math.abs(p) * c, f = Number(s.entry_price), y = Number(s.upnl), k = ur(s), _ = k > 0 ? y / k * 100 : 0, w = Number(s.liquidation_price), z = vr(t, s.symbol), C = Number(s.accumulated_funding_fees), v = s.margin_mode === "isolated";
  return /* @__PURE__ */ e("div", { class: "pa-screen", children: [
    /* @__PURE__ */ e("div", { class: "pa-top", children: [
      /* @__PURE__ */ e(tt, { n: "back", label: "Back", onClick: n.back }),
      /* @__PURE__ */ e("div", { class: "pa-title two", children: [
        /* @__PURE__ */ e("b", { children: [
          d,
          " ",
          u ? "Long" : "Short"
        ] }),
        /* @__PURE__ */ e("span", { children: [
          s.leverage,
          "x · ",
          v ? "Isolated" : "Cross",
          " margin"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e("div", { class: "pa-scroll", children: [
      /* @__PURE__ */ e("div", { class: "pa-coinhead", children: [
        /* @__PURE__ */ e(_t, { base: d, size: 30 }),
        /* @__PURE__ */ e("span", { class: "nm", children: l?.name ?? d })
      ] }),
      /* @__PURE__ */ e("div", { class: `pa-price num ${y >= 0 ? "pos" : "neg"}`, children: H(y, { sign: !0 }) }),
      /* @__PURE__ */ e("div", { class: `pa-chg num ${_ >= 0 ? "pos" : "neg"}`, children: [
        dt(_),
        " ",
        /* @__PURE__ */ e("span", { class: "muted", children: "return on margin" })
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-tools", children: [
        /* @__PURE__ */ e("button", { onClick: () => o("tpsl"), children: [
          /* @__PURE__ */ e(K, { n: "shield", size: 18 }),
          "TP / SL"
        ] }),
        /* @__PURE__ */ e("button", { onClick: () => o("trail"), children: [
          /* @__PURE__ */ e(K, { n: "line", size: 18 }),
          "Trailing"
        ] }),
        v && /* @__PURE__ */ e("button", { onClick: () => o("margin"), children: [
          /* @__PURE__ */ e(K, { n: "plus", size: 18 }),
          "Margin"
        ] }),
        /* @__PURE__ */ e("button", { onClick: () => o("reverse"), children: [
          /* @__PURE__ */ e(K, { n: "swap", size: 18 }),
          "Reverse"
        ] })
      ] }),
      /* @__PURE__ */ e(Te, { children: [
        /* @__PURE__ */ e(Q, { k: "Size", v: /* @__PURE__ */ e("span", { class: "num", children: `${pe(Math.abs(p))} ${d}` }), vsub: /* @__PURE__ */ e("span", { class: "num", children: H(g) }) }),
        /* @__PURE__ */ e(Q, { k: "Entry price", v: /* @__PURE__ */ e("span", { class: "num", children: Y(f, h) }) }),
        /* @__PURE__ */ e(Q, { k: "Mark price", info: () => r("mark"), v: /* @__PURE__ */ e("span", { class: "num", children: Y(c, h) }) }),
        /* @__PURE__ */ e(Q, { k: "Liquidation price", info: () => r("leverage"), v: /* @__PURE__ */ e("span", { class: "num", children: w > 0 ? Y(w, h) : "—" }), vsub: w > 0 && c > 0 ? /* @__PURE__ */ e("span", { class: "num", children: `${(Math.abs(w - c) / c * 100).toFixed(1)}% away` }) : void 0 }),
        /* @__PURE__ */ e(Q, { k: "Margin", v: /* @__PURE__ */ e("span", { class: "num", children: H(k) }) }),
        Number.isFinite(C) && C !== 0 && /* @__PURE__ */ e(Q, { k: "Funding fees", info: () => r("funding"), v: /* @__PURE__ */ e("span", { class: "num", children: H(C, { decimals: 4 }) }), vsub: "as Strike reports" })
      ] }),
      z.length > 0 && /* @__PURE__ */ e(R, { children: [
        /* @__PURE__ */ e("h2", { class: "pa-h2", children: "Exit orders" }),
        /* @__PURE__ */ e(Te, { children: z.map(($) => /* @__PURE__ */ e("div", { class: "pa-row", children: [
          /* @__PURE__ */ e("span", { class: "l", children: [
            /* @__PURE__ */ e("span", { class: "k", children: /take_profit/.test(String($.type)) ? "Take profit" : /trailing/.test(String($.type)) ? "Trailing stop" : /stop/.test(String($.type)) ? "Stop loss" : "Limit close" }),
            /* @__PURE__ */ e("span", { class: "s num", children: [
              pe(Number($.size)),
              " ",
              d,
              " at ",
              Y(Number($.stop_price) || Number($.price), h)
            ] })
          ] }),
          /* @__PURE__ */ e("button", { class: "pa-btn dark xs", onClick: () => t.cancelOrder($), children: "Remove" })
        ] }, $.id)) })
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-bottom-pad" })
    ] }),
    /* @__PURE__ */ e("div", { class: "pa-dock", children: [
      /* @__PURE__ */ e("button", { class: "pa-btn dark", onClick: () => n.push({ k: "trade", sym: s.symbol, side: u ? "buy" : "sell" }), children: "Add more" }),
      /* @__PURE__ */ e("button", { class: "pa-btn primary", onClick: () => o("close"), children: "Close" })
    ] }),
    a === "close" && /* @__PURE__ */ e(Ms, { s: t, p: s, onClose: () => o(null), onClosed: n.back }),
    a === "tpsl" && /* @__PURE__ */ e(_s, { s: t, p: s, onClose: () => o(null) }),
    a === "trail" && /* @__PURE__ */ e(Ss, { s: t, p: s, onClose: () => o(null) }),
    a === "margin" && /* @__PURE__ */ e(Cs, { s: t, p: s, onClose: () => o(null) }),
    a === "reverse" && /* @__PURE__ */ e($s, { s: t, p: s, onClose: () => o(null) })
  ] });
}
const Wp = 0.02;
function jp(t, n, i) {
  for (let r = Math.max(1, Math.floor(i)); r > 1; r--) if (Gn(t, Math.max(1, n) * r) >= r) return r;
  return 1;
}
function Gp({ s: t, nav: n, sym: i, side: r, onLearn: s, onDisclosures: a }) {
  const o = t.bySymbol[i], l = t.client.raw(i), [d, p] = m(r), [u, c] = m("amount"), [h, g] = m("market"), [f, y] = m("usd"), [k, _] = m(""), [w, z] = m(() => {
    const U = t.config.leverage ?? Number(cn("default-leverage"));
    return Math.max(1, Math.min(o?.maxLev ?? 2, U >= 1 ? U : 2));
  }), [C, v] = m(""), [$, S] = m({ workingType: "mark_price", tif: "GTC", callbackRate: 1, twapMinutes: 60 }), [B, x] = m(0), [M, T] = m(0), [P, ie] = m("pnl"), [F, E] = m(null), [D, W] = m(""), [A, N] = m(!1), [O, J] = m(void 0), ne = o?.base ?? i.split("-")[0], Se = o?.mark ?? 0, Ae = o?.spec.tickSize, pt = {
    spec: o?.spec,
    mark: Se,
    last: o?.last ?? 0,
    available: t.available,
    takerRate: t.takerRate,
    feeBps: t.client.orderFeeBps,
    maxLeverage: t.config.maxLeverage,
    limitBound: Number(l?.order_limit_price_bound) || 0.05,
    position: t.session ? Number(t.positions.find((U) => U.symbol === i)?.size) || 0 : void 0
  }, ve = h === "market" || h === "limit", G = { ...$, symbol: i, side: d, type: h, amount: Number(k) || 0, unit: f, leverage: w, limitPrice: Number(C) || 0, tp: ve ? B : 0, sl: ve ? M : 0, autoMode: P }, X = Ns(G, pt), fe = f === "usd" ? 2 : pr(o?.spec.stepSize ?? 0.01), Ce = De(fe);
  Ce.current = fe;
  const Je = en(() => (U) => _((le) => Bd(le, U, Ce.current)), []), nt = Number(t.account?.symbol_settings?.[i]?.leverage) || 0;
  Z(() => {
    nt >= 1 && !t.config.leverage && z(Math.min(o?.maxLev ?? nt, nt));
  }, [i, nt]);
  const ft = u === "review" && h === "market" && X.size > 0;
  Z(() => {
    if (J(void 0), !ft) return;
    const U = t.client.orderBook(i);
    let le;
    const Le = U.onUpdate(() => {
      le || (le = setTimeout(() => (le = void 0, J(U.view(200))), 250));
    }), j = setTimeout(() => J((be) => be === void 0 ? null : be), 1e4);
    return () => (Le(), clearTimeout(le), clearTimeout(j), U.close());
  }, [ft, i]);
  const ut = Number(l?.order_market_price_bound) || pt.limitBound, $e = ft && O ? hr(O, d, X.size, { mark: Se, bound: ut }) : null, Lt = `k|${d}|${X.size}|${$e ? $e.complete ? Math.ceil($e.slippage * 200) : "partial" : O === null ? "nobook" : "empty"}`, dn = ft && !!O && !(d === "buy" ? O.asks.length : O.bids.length), Qe = ft && (!!$e && ($e.slippage > Wp || !$e.complete || $e.beyondBand) || O === null || dn);
  if (Z(() => {
    if (!D) return;
    const U = setTimeout(() => W(""), 15e3);
    return () => clearTimeout(U);
  }, [D]), !o)
    return /* @__PURE__ */ e("div", { class: "pa-screen", children: [
      /* @__PURE__ */ e("div", { class: "pa-top", children: /* @__PURE__ */ e(tt, { n: "x", label: "Close", onClick: n.back }) }),
      /* @__PURE__ */ e("div", { class: "pa-empty", children: t.markets.length ? `${i} isn't listed here.` : "Loading…" })
    ] });
  const St = d === "buy" ? "Long" : "Short", I = (U) => {
    const le = Ts(pt, w, U);
    le > 0 && _(f === "usd" ? le.toFixed(2) : ue(le * X.lev / (X.px || Se), o.spec.stepSize, "floor"));
  }, q = f === "usd" ? `$${k || "0"}` : `${k || "0"} ${ne}`, re = q.length > 9 ? "xl" : q.length > 6 ? "xxl" : "xxxl", ce = X.kind === "min" || X.kind === "funds" || X.kind === "price" || X.kind === "tpsl" ? X.problem : null, se = async () => {
    if (!X.ok) return E("alert");
    if (Qe && D !== Lt) return W(Lt);
    N(!0), W("");
    const U = await t.placeDraft(G, X, ne, $e && $e.complete && !$e.beyondBand ? $e.avgPrice : void 0);
    N(!1), U !== "failed" && n.replace({ k: "market", sym: i });
  }, oe = /* @__PURE__ */ e("div", { class: "pa-top", children: [
    u === "review" ? /* @__PURE__ */ e(tt, { n: "back", label: "Back", onClick: () => c("amount") }) : /* @__PURE__ */ e(tt, { n: "x", label: "Close", onClick: n.back }),
    /* @__PURE__ */ e("div", { class: "pa-title two", children: u === "review" ? /* @__PURE__ */ e(R, { children: [
      /* @__PURE__ */ e("b", { children: "Review" }),
      /* @__PURE__ */ e("span", { children: [
        St,
        " ",
        ne
      ] })
    ] }) : /* @__PURE__ */ e(R, { children: [
      /* @__PURE__ */ e("button", { class: "pa-side", onClick: () => E("side"), "aria-label": "Change side", children: [
        St,
        " ",
        ne,
        " ",
        /* @__PURE__ */ e(K, { n: "down", size: 14 })
      ] }),
      /* @__PURE__ */ e("span", { class: "num", children: [
        "Price ",
        Y(Se, Ae)
      ] })
    ] }) }),
    /* @__PURE__ */ e("span", { class: "sp" }),
    /* @__PURE__ */ e(tt, { n: "sliders", label: "Settings", onClick: () => E("settings") })
  ] });
  return /* @__PURE__ */ e("div", { class: "pa-screen trade", children: [
    oe,
    u === "amount" ? /* @__PURE__ */ e("div", { class: "pa-amount", children: [
      /* @__PURE__ */ e("div", { class: "pa-amount-top", children: [
        /* @__PURE__ */ e("div", { class: `pa-big num ${re}${k ? "" : " zero"}`, "aria-live": "polite", children: q }),
        /* @__PURE__ */ e("button", { class: "pa-levline", onClick: () => E("lev"), children: [
          X.lev,
          "x leverage ",
          /* @__PURE__ */ e(K, { n: "down", size: 16 })
        ] }),
        h !== "market" && /* @__PURE__ */ e("button", { class: "pa-levline sub", onClick: () => E("ordertype"), children: [
          Ka(h, C, $, Ae),
          " ",
          /* @__PURE__ */ e(K, { n: "down", size: 16 })
        ] }),
        ce && /* @__PURE__ */ e("div", { class: "pa-err", children: ce }),
        !ce && k && X.size > 0 && /* @__PURE__ */ e("div", { class: "pa-note num", children: [
          "≈ ",
          pe(X.size),
          " ",
          ne,
          " position · ",
          H(X.notional)
        ] })
      ] }),
      /* @__PURE__ */ e("button", { class: "pa-balance", onClick: () => t.session ? t.openFunds("deposit") : t.setSheet("connect"), children: [
        /* @__PURE__ */ e("span", { children: [
          /* @__PURE__ */ e("b", { children: "Perps Balance" }),
          " · ",
          /* @__PURE__ */ e("span", { class: "num", children: H(t.session ? t.available : 0) })
        ] }),
        /* @__PURE__ */ e(K, { n: "down", size: 18 })
      ] }),
      t.session ? t.accountLoaded && t.available <= 0 ? /* @__PURE__ */ e("button", { class: "pa-btn primary big", onClick: () => t.openFunds("deposit"), children: "Add funds" }) : k ? /* @__PURE__ */ e("button", { class: "pa-btn primary big", disabled: !X.ok, onClick: () => c("review"), children: "Review" }) : /* @__PURE__ */ e("div", { class: "pa-pcts", children: [0.25, 0.5, 1].map((U) => /* @__PURE__ */ e("button", { class: "pa-btn dark", onClick: () => I(U), children: [
        U * 100,
        "%"
      ] }, U)) }) : /* @__PURE__ */ e("button", { class: "pa-btn primary big", onClick: () => t.setSheet("connect"), children: "Connect wallet" }),
      /* @__PURE__ */ e(Od, { onKey: Je })
    ] }) : /* @__PURE__ */ e("div", { class: "pa-review", children: [
      /* @__PURE__ */ e("div", { class: "pa-scroll", children: [
        /* @__PURE__ */ e("div", { class: "pa-big num xxl", children: H(X.margin) }),
        /* @__PURE__ */ e("div", { class: "pa-lines", children: [
          /* @__PURE__ */ e(
            Q,
            {
              k: St,
              sub: /* @__PURE__ */ e("span", { class: "num", children: [
                pe(X.size),
                " ",
                ne,
                " · ",
                h === "market" ? `Current Price ${Y(Se, Ae)}` : Ka(h, C, $, Ae)
              ] }),
              info: () => E("side")
            }
          ),
          /* @__PURE__ */ e(Q, { k: "Leverage", sub: /* @__PURE__ */ e("span", { class: "num", children: `${X.lev}x · Liq. ≈ ${Y(X.liq, Ae)}` }), onClick: () => E("lev"), chevron: "down" }),
          ve && /* @__PURE__ */ e(
            Q,
            {
              k: B || M ? "Auto Close" : "Add Auto Close",
              sub: B || M ? /* @__PURE__ */ e("span", { class: "num", children: [X.tpPrice ? `TP ${Y(X.tpPrice, Ae)}` : "", X.slPrice ? `SL ${Y(X.slPrice, Ae)}` : ""].filter(Boolean).join(" · ") }) : void 0,
              onClick: () => E("auto"),
              chevron: B || M ? "down" : "plus"
            }
          ),
          /* @__PURE__ */ e(Q, { k: "Payment", sub: /* @__PURE__ */ e("span", { class: "num", children: `Perps Balance · ${h !== "market" ? "up to " : ""}${(X.feeRate * 100).toFixed(3)}% fee` }), info: () => E("fees") }),
          $e && $e.complete && !$e.beyondBand && /* @__PURE__ */ e(
            Q,
            {
              k: "Est. fill price",
              sub: /* @__PURE__ */ e("span", { class: `num ${$e.slippage > 5e-3 ? "neg" : ""}`, children: `${Y($e.avgPrice, Ae)} · slippage ${($e.slippage * 100).toFixed(2)}%` })
            }
          )
        ] }),
        ft && O === void 0 && /* @__PURE__ */ e("div", { class: "pa-note", children: [
          /* @__PURE__ */ e(Ze, { size: 12 }),
          " Checking the order book…"
        ] }),
        Qe && /* @__PURE__ */ e("div", { class: "pa-warn", children: [
          /* @__PURE__ */ e(K, { n: "warn", size: 16 }),
          O === null ? "The order book isn't available, so slippage can't be estimated." : dn ? `There are no ${d === "buy" ? "sellers" : "buyers"} on the order book right now, so a market order would be cancelled.` : $e && (!$e.complete || $e.beyondBand) ? `There aren't enough ${d === "buy" ? "sellers" : "buyers"} near the market price to fill this, so Strike may cancel some or all of it.` : `This size moves through the book: est. ${(($e?.slippage ?? 0) * 100).toFixed(2)}% from the market price.`,
          D === Lt ? " Tap Confirm again to send it anyway." : ""
        ] }),
        X.liqDistance > 0 && X.liqDistance < 0.1 && /* @__PURE__ */ e("div", { class: "pa-warn", children: [
          /* @__PURE__ */ e(K, { n: "warn", size: 16 }),
          " High risk: liquidation is only ",
          (X.liqDistance * 100).toFixed(1),
          "% away. Lower leverage gives you more room."
        ] }),
        /* @__PURE__ */ e("button", { class: "pa-foot-link", onClick: a, children: [
          /* @__PURE__ */ e(K, { n: "info", size: 15 }),
          " View Disclosures"
        ] })
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-dock single", children: /* @__PURE__ */ e("button", { class: `pa-btn primary big${D === Lt && Qe ? " caution" : ""}`, disabled: A || ft && O === void 0, onClick: se, children: A ? /* @__PURE__ */ e(Ze, { size: 18 }) : D === Lt && Qe ? "Confirm anyway" : "Confirm" }) })
    ] }),
    F === "lev" && /* @__PURE__ */ e(Vp, { s: t, z: X, draft: G, ctx: pt, onClose: () => E(null), onApply: (U) => (z(U), E(null)) }),
    F === "settings" && /* @__PURE__ */ e(Oe, { title: "Settings", onClose: () => E(null), children: /* @__PURE__ */ e(Te, { children: [
      /* @__PURE__ */ e(Q, { k: "Display currency", v: f === "usd" ? "USD" : ne, onClick: () => E("currency"), chevron: "right" }),
      /* @__PURE__ */ e(Q, { k: "Order Type", v: ei.find((U) => U.type === h)?.label ?? "Market", onClick: () => E("ordertype"), chevron: "right" })
    ] }) }),
    F === "currency" && /* @__PURE__ */ e(Oe, { title: "Display currency", onClose: () => E(null), onBack: () => E("settings"), onDone: () => E(null), children: /* @__PURE__ */ e(Te, { children: ["usd", "base"].map((U) => /* @__PURE__ */ e("button", { class: "pa-row", onClick: () => (U !== f && _(""), y(U)), children: [
      /* @__PURE__ */ e("span", { class: "l", children: [
        /* @__PURE__ */ e("span", { class: "k", children: U === "usd" ? "USD" : ne }),
        /* @__PURE__ */ e("span", { class: "s", children: U === "usd" ? "Enter the margin you put in, in US dollars" : `Enter the position size in ${ne}` })
      ] }),
      /* @__PURE__ */ e("span", { class: `pa-radio${f === U ? " on" : ""}` })
    ] }, U)) }) }),
    F === "ordertype" && /* @__PURE__ */ e(
      Kp,
      {
        type: h,
        limit: C,
        ext: $,
        side: d,
        mark: Se,
        tick: Ae,
        onBack: () => E("settings"),
        onClose: () => E(null),
        onApply: (U, le, Le) => (g(U), v(le), S(Le), E(null))
      }
    ),
    F === "auto" && /* @__PURE__ */ e(
      Yp,
      {
        side: d,
        entry: X.px || Se,
        lev: X.lev,
        tick: Ae,
        mode: P,
        tp: B,
        sl: M,
        onClose: () => E(null),
        onApply: (U, le, Le) => (ie(U), x(le), T(Le), E(null))
      }
    ),
    F === "alert" && /* @__PURE__ */ e(Oe, { title: "", onClose: () => E(null), children: /* @__PURE__ */ e("div", { class: "pa-alert", children: [
      /* @__PURE__ */ e("span", { class: "ic", children: /* @__PURE__ */ e(K, { n: "warn", size: 26 }) }),
      /* @__PURE__ */ e("b", { children: X.problem }),
      /* @__PURE__ */ e("span", { children: X.kind === "min" ? "Increase your margin or leverage to continue." : X.kind === "funds" ? "Add funds or lower the amount to continue." : "Edit your order to continue." }),
      /* @__PURE__ */ e("button", { class: "pa-btn dark wide", onClick: () => (E(null), c("amount")), children: "Edit" })
    ] }) }),
    F === "fees" && /* @__PURE__ */ e(Oe, { title: "Fees", onClose: () => E(null), children: [
      /* @__PURE__ */ e(Te, { children: [
        /* @__PURE__ */ e(Q, { k: "Strike trading fee (taker)", v: /* @__PURE__ */ e("span", { class: "num", children: [
          (t.takerRate * 100).toFixed(3),
          "%"
        ] }) }),
        /* @__PURE__ */ e(Q, { k: `Builder fee (${t.config.builderCode})`, v: /* @__PURE__ */ e("span", { class: "num", children: [
          (t.client.orderFeeBps / 100).toFixed(2),
          "%"
        ] }) }),
        /* @__PURE__ */ e(Q, { k: h === "limit" ? "Estimated total (if it fills at once)" : "Estimated total", v: /* @__PURE__ */ e("span", { class: "num", children: H(X.fee, { decimals: X.fee < 0.1 ? 4 : 2 }) }) })
      ] }),
      /* @__PURE__ */ e("p", { class: "pa-p", children: "Fees are charged on the position size when the order fills, and again when you close. A limit order that waits on the book pays Strike's lower maker fee instead of the taker fee; the builder fee is the same. Funding is paid or received every hour while the position is open." })
    ] }),
    F === "side" && /* @__PURE__ */ e(Oe, { title: "Long or Short", onClose: () => E(null), children: [
      /* @__PURE__ */ e(Te, { children: ["buy", "sell"].map((U) => /* @__PURE__ */ e("button", { class: "pa-row", onClick: () => (p(U), E(null)), children: [
        /* @__PURE__ */ e("span", { class: "l", children: [
          /* @__PURE__ */ e("span", { class: `k ${U === "buy" ? "pos" : "neg"}`, children: U === "buy" ? "Long" : "Short" }),
          /* @__PURE__ */ e("span", { class: "s", children: U === "buy" ? `Profit if ${ne} goes up` : `Profit if ${ne} goes down` })
        ] }),
        /* @__PURE__ */ e("span", { class: `pa-radio${d === U ? " on" : ""}` })
      ] }, U)) }),
      /* @__PURE__ */ e("button", { class: "pa-foot-link", onClick: () => (E(null), s("basics")), children: [
        /* @__PURE__ */ e(K, { n: "info", size: 15 }),
        " How Perps work"
      ] })
    ] })
  ] });
}
function Vp({ s: t, z: n, draft: i, ctx: r, onClose: s, onApply: a }) {
  const o = r.spec, l = i.unit === "usd" ? i.amount : n.margin, d = Math.max(1, Math.min(t.config.maxLeverage, o.maxLeverage, l > 0 ? jp(o.marginTiers, l, o.maxLeverage) : o.maxLeverage)), [p, u] = m(Math.min(n.lev, d)), c = Ns({ ...i, leverage: p }, r), h = l > 0 ? Math.ceil(o.minNotional / l - 1e-9) : 1, g = o.tickSize, f = [1, 2, 5, 10, 20, 25, 40, 50, 75, 100].filter((y) => y <= d);
  return /* @__PURE__ */ e(Oe, { title: "Leverage", onClose: s, onDone: () => a(p), children: [
    /* @__PURE__ */ e("p", { class: "pa-p c", children: "Leverage multiplies your position, and your gains and losses with it." }),
    /* @__PURE__ */ e("div", { class: "pa-levbig num", children: [
      p,
      "x"
    ] }),
    /* @__PURE__ */ e(Ni, { min: 1, max: d, value: p, onChange: u, label: "Leverage", marks: f }),
    /* @__PURE__ */ e("div", { class: "pa-levmarks", children: f.map((y) => /* @__PURE__ */ e("button", { class: y === p ? "on" : "", onClick: () => u(y), children: [
      y,
      "x"
    ] }, y)) }),
    /* @__PURE__ */ e(Te, { children: [
      /* @__PURE__ */ e(Q, { k: "Current Price", v: /* @__PURE__ */ e("span", { class: "num", children: Y(r.mark, g) }) }),
      /* @__PURE__ */ e(Q, { k: "Liquidation (est.)", v: /* @__PURE__ */ e("span", { class: "num", children: c.liq > 0 ? Y(c.liq, g) : "—" }) }),
      /* @__PURE__ */ e(Q, { k: "Distance", v: /* @__PURE__ */ e("span", { class: "num", children: c.liq > 0 ? Pi(c.px || r.mark, c.liq) : "—" }) })
    ] }),
    l > 0 && p < h && h <= d && /* @__PURE__ */ e("div", { class: "pa-err sm", children: [
      "This leverage makes your position smaller than the market minimum (",
      H(o.minNotional, { decimals: 0 }),
      "). Use at least ",
      h,
      "x or increase your margin."
    ] }),
    c.liqDistance > 0 && c.liqDistance < 0.1 && /* @__PURE__ */ e("div", { class: "pa-err sm", children: [
      "High risk: a ",
      (c.liqDistance * 100).toFixed(1),
      "% move against you liquidates this position."
    ] }),
    d < o.maxLeverage && /* @__PURE__ */ e("p", { class: "pa-p sm", children: [
      "Up to ",
      d,
      "x here",
      t.config.maxLeverage < o.maxLeverage ? " (this app's limit)" : " for this size (Strike's margin tiers)",
      "."
    ] })
  ] });
}
function Ka(t, n, i, r) {
  const s = ei.find((l) => l.type === t)?.label ?? "Market", a = (l) => Number(l) > 0 ? Y(Number(l), r) : "set a price", o = [];
  return t === "limit" ? o.push(`Limit ${a(n)}`) : t === "stop" || t === "take_profit" ? o.push(`${s} · trigger ${a(i.triggerPrice)}`) : t === "stop_limit" || t === "take_profit_limit" ? o.push(`${s} · ${a(i.triggerPrice)} → ${a(n)}`) : t === "trailing_stop_market" ? o.push(`Trailing ${i.callbackRate ?? 1}%${Number(i.activationPrice) > 0 ? ` from ${a(i.activationPrice)}` : ""}`) : t === "twap" ? o.push(`TWAP · ${i.twapMinutes ?? 60} min`) : o.push(s), (t === "limit" || t === "stop_limit" || t === "take_profit_limit") && i.tif && i.tif !== "GTC" && o.push(i.tif), t === "limit" && i.postOnly && o.push("Post only"), (i.reduceOnly || t === "trailing_stop_market") && o.push("Reduce only"), o.join(" · ");
}
function Kp({
  type: t,
  limit: n,
  ext: i,
  side: r,
  mark: s,
  tick: a,
  onBack: o,
  onClose: l,
  onApply: d
}) {
  const [p, u] = m(t), c = s ? ue(s, a ?? 1e-4) : "", [h, g] = m(n || c), [f, y] = m(i), [k, _] = m(Number(i.triggerPrice) > 0 ? String(i.triggerPrice) : c), w = (x) => y({ ...f, ...x }), z = p === "limit" || p === "stop_limit" || p === "take_profit_limit", C = p === "stop" || p === "stop_limit" || p === "take_profit" || p === "take_profit_limit", v = (x) => {
    const M = Number(x) > 0 && s > 0 ? (Number(x) - s) / s * 100 : 0;
    return Math.abs(M) < 5e-3 ? 0 : M;
  }, $ = (!z || Number(h) > 0) && (!C || Number(k) > 0) && (p !== "trailing_stop_market" || Number(f.callbackRate) >= 0.1 && Number(f.callbackRate) <= 5) && (p !== "twap" || Number(f.twapMinutes) >= 5 && Number(f.twapMinutes) <= 1440), S = () => d(p, z ? h : "", { ...f, triggerPrice: C ? Number(k) : void 0 }), B = p === "stop" || p === "stop_limit" ? r === "buy" ? "Buy stop: set the trigger above the current price." : "Sell stop: set the trigger below the current price." : p === "take_profit" || p === "take_profit_limit" ? r === "sell" ? "Sell take-profit: set the target above the current price." : "Buy take-profit: set the target below the current price." : "";
  return /* @__PURE__ */ e(Oe, { title: "Order Type", onClose: l, onBack: o, onDone: S, doneDisabled: !$, tall: !0, children: [
    /* @__PURE__ */ e(Te, { children: ei.map((x) => /* @__PURE__ */ e("button", { class: "pa-row opt", onClick: () => u(x.type), children: [
      /* @__PURE__ */ e("span", { class: "ck", children: p === x.type && /* @__PURE__ */ e(K, { n: "check", size: 18 }) }),
      /* @__PURE__ */ e("span", { class: "l", children: [
        /* @__PURE__ */ e("span", { class: "k", children: x.label }),
        /* @__PURE__ */ e("span", { class: "s", children: x.desc })
      ] })
    ] }, x.type)) }),
    C && /* @__PURE__ */ e("label", { class: "pa-field", children: [
      /* @__PURE__ */ e("span", { class: "lbl", children: p.startsWith("take") ? "Target price" : "Trigger price" }),
      /* @__PURE__ */ e("span", { class: "in", children: [
        /* @__PURE__ */ e("input", { inputMode: "decimal", value: k, "aria-label": "Trigger price", onInput: (x) => _(_e(x)) }),
        /* @__PURE__ */ e("span", { class: `num ${v(k) >= 0 ? "pos" : "neg"}`, children: [
          "(",
          dt(v(k)),
          ")"
        ] })
      ] }),
      B && /* @__PURE__ */ e("span", { class: "hint", children: B })
    ] }),
    z && /* @__PURE__ */ e("label", { class: "pa-field", children: [
      /* @__PURE__ */ e("span", { class: "lbl", children: "Limit Price" }),
      /* @__PURE__ */ e("span", { class: "in", children: [
        /* @__PURE__ */ e("input", { inputMode: "decimal", value: h, "aria-label": "Limit price", onInput: (x) => g(_e(x)) }),
        /* @__PURE__ */ e("span", { class: `num ${v(h) >= 0 ? "pos" : "neg"}`, children: [
          "(",
          dt(v(h)),
          ")"
        ] })
      ] })
    ] }),
    p === "trailing_stop_market" && /* @__PURE__ */ e(R, { children: [
      /* @__PURE__ */ e("label", { class: "pa-field", children: [
        /* @__PURE__ */ e("span", { class: "lbl", children: "Trail distance" }),
        /* @__PURE__ */ e("span", { class: "in", children: [
          /* @__PURE__ */ e("input", { inputMode: "decimal", value: String(f.callbackRate ?? ""), "aria-label": "Trail distance percent", onInput: (x) => w({ callbackRate: Number(_e(x)) || 0 }) }),
          /* @__PURE__ */ e("span", { children: "%" })
        ] }),
        /* @__PURE__ */ e("span", { class: "hint", children: "Strike allows 0.1–5%. The stop follows the price and triggers when it turns back by this much." })
      ] }),
      /* @__PURE__ */ e("label", { class: "pa-field", children: [
        /* @__PURE__ */ e("span", { class: "lbl", children: "Activation price (optional)" }),
        /* @__PURE__ */ e("span", { class: "in", children: /* @__PURE__ */ e("input", { inputMode: "decimal", value: Number(f.activationPrice) > 0 ? String(f.activationPrice) : "", placeholder: "Start now", "aria-label": "Activation price", onInput: (x) => w({ activationPrice: Number(_e(x)) || 0 }) }) })
      ] })
    ] }),
    p === "twap" && /* @__PURE__ */ e(R, { children: [
      /* @__PURE__ */ e("div", { class: "pa-lbl-row", children: "Duration" }),
      /* @__PURE__ */ e("div", { class: "pa-pcts four", children: [5, 15, 60, 240].map((x) => /* @__PURE__ */ e("button", { class: `pa-btn dark${f.twapMinutes === x ? " on" : ""}`, onClick: () => w({ twapMinutes: x }), children: x < 60 ? `${x}m` : `${x / 60}h` }, x)) }),
      /* @__PURE__ */ e("label", { class: "pa-field", children: [
        /* @__PURE__ */ e("span", { class: "lbl", children: "Price limit (optional)" }),
        /* @__PURE__ */ e("span", { class: "in", children: /* @__PURE__ */ e("input", { inputMode: "decimal", value: Number(f.twapLimit) > 0 ? String(f.twapLimit) : "", placeholder: "No limit", "aria-label": "TWAP price limit", onInput: (x) => w({ twapLimit: Number(_e(x)) || 0 }) }) }),
        /* @__PURE__ */ e("span", { class: "hint", children: "Slices that would fill past this price are skipped." })
      ] })
    ] }),
    z && /* @__PURE__ */ e("div", { class: "pa-seg three", role: "radiogroup", "aria-label": "Time in force", children: ["GTC", "IOC", "FOK"].map((x) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": (f.tif ?? "GTC") === x, class: (f.tif ?? "GTC") === x ? "on" : "", onClick: () => w({ tif: x }), children: x === "GTC" ? "Good till cancel" : x === "IOC" ? "Fill now (IOC)" : "All or none" }, x)) }),
    (C || p === "trailing_stop_market") && /* @__PURE__ */ e("div", { class: "pa-seg", role: "radiogroup", "aria-label": "Trigger price type", children: ["mark_price", "contract_price"].map((x) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": (f.workingType ?? "mark_price") === x, class: (f.workingType ?? "mark_price") === x ? "on" : "", onClick: () => w({ workingType: x }), children: x === "mark_price" ? "Trigger on mark" : "Trigger on last" }, x)) }),
    /* @__PURE__ */ e(Te, { children: [
      p === "limit" && /* @__PURE__ */ e(Vi, { label: "Post only", sub: "Only adds liquidity (maker); cancelled if it would fill at once", on: !!f.postOnly, onChange: (x) => w({ postOnly: x }) }),
      p === "trailing_stop_market" ? /* @__PURE__ */ e(Vi, { label: "Reduce only", sub: "Always on: like on Strike, a trailing stop only closes or reduces your open position", on: !0, locked: !0, onChange: () => {
      } }) : /* @__PURE__ */ e(Vi, { label: "Reduce only", sub: "Only shrinks an open position, never opens or flips one", on: !!f.reduceOnly, onChange: (x) => w({ reduceOnly: x }) }),
      p === "twap" && /* @__PURE__ */ e(Vi, { label: "Randomize", sub: "Varies slice timing and size", on: !!f.randomize, onChange: (x) => w({ randomize: x }) }),
      /* @__PURE__ */ e(Q, { k: "Current Price", v: /* @__PURE__ */ e("span", { class: "num", children: Y(s, a) }) })
    ] })
  ] });
}
function Vi({ label: t, sub: n, on: i, onChange: r, locked: s }) {
  return /* @__PURE__ */ e("button", { class: "pa-row", role: "switch", "aria-checked": i, "aria-disabled": s || void 0, disabled: s, onClick: () => !s && r(!i), children: [
    /* @__PURE__ */ e("span", { class: "l", children: [
      /* @__PURE__ */ e("span", { class: "k", children: t }),
      /* @__PURE__ */ e("span", { class: "s", children: n })
    ] }),
    /* @__PURE__ */ e("span", { class: `pa-switch${i ? " on" : ""}`, children: /* @__PURE__ */ e("span", {}) })
  ] });
}
function Yp({
  side: t,
  entry: n,
  lev: i,
  tick: r,
  mode: s,
  tp: a,
  sl: o,
  onClose: l,
  onApply: d
}) {
  const [p, u] = m(s), [c, h] = m(a ? String(a) : ""), [g, f] = m(o ? String(o) : ""), [y, k] = m("tp"), _ = Number(c) > 0 ? p === "pnl" ? t === "buy" ? n * (1 + Number(c) / 100 / i) : n * (1 - Number(c) / 100 / i) : Number(c) : 0, w = Number(g) > 0 ? p === "pnl" ? t === "buy" ? n * (1 - Number(g) / 100 / i) : n * (1 + Number(g) / 100 / i) : Number(g) : 0, z = () => {
    const v = p === "pnl" ? "price" : "pnl";
    v === "price" ? (h(_ ? ue(_, r ?? 1e-4) : ""), f(w ? ue(w, r ?? 1e-4) : "")) : (h(_ ? xn(t, n, i, _).toFixed(0) : ""), f(w ? Math.abs(xn(t, n, i, w)).toFixed(0) : "")), u(v);
  }, C = y === "tp" ? [10, 25, 50, 100] : [10, 25, 50, 75];
  return /* @__PURE__ */ e(Oe, { title: "Auto Close", onClose: l, onDone: () => d(p, Number(c) || 0, Number(g) || 0), children: [
    /* @__PURE__ */ e("button", { class: "pa-field toggle", onClick: z, children: [
      /* @__PURE__ */ e("span", { class: "lbl big", children: "Use" }),
      /* @__PURE__ */ e("span", { class: "v", children: [
        p === "pnl" ? "% P&L" : "Price",
        " ",
        /* @__PURE__ */ e(K, { n: "down", size: 14 })
      ] })
    ] }),
    /* @__PURE__ */ e("label", { class: `pa-field${y === "tp" ? " focus" : ""}`, children: [
      /* @__PURE__ */ e("span", { class: "lbl", children: "Take Profit" }),
      /* @__PURE__ */ e("span", { class: "in", children: [
        p === "pnl" && /* @__PURE__ */ e("span", { class: "pos", children: "+" }),
        /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: "Enter Amount", value: c, onFocus: () => k("tp"), onInput: (v) => h(_e(v)), "aria-label": "Take profit" }),
        p === "pnl" && c && /* @__PURE__ */ e("span", { children: "%" }),
        c && /* @__PURE__ */ e("button", { class: "clr", "aria-label": "Clear take profit", onClick: (v) => (v.preventDefault(), h("")), children: /* @__PURE__ */ e(K, { n: "x", size: 12 }) })
      ] }),
      _ > 0 && /* @__PURE__ */ e("span", { class: "hint num", children: p === "pnl" ? `Closes at ≈ ${Y(_, r)}` : `≈ ${dt(xn(t, n, i, _), 1)} P&L` })
    ] }),
    /* @__PURE__ */ e("label", { class: `pa-field${y === "sl" ? " focus" : ""}`, children: [
      /* @__PURE__ */ e("span", { class: "lbl", children: "Stop Loss" }),
      /* @__PURE__ */ e("span", { class: "in", children: [
        p === "pnl" && /* @__PURE__ */ e("span", { class: "neg", children: "-" }),
        /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: "Enter Amount", value: g, onFocus: () => k("sl"), onInput: (v) => f(_e(v)), "aria-label": "Stop loss" }),
        p === "pnl" && g && /* @__PURE__ */ e("span", { children: "%" }),
        g && /* @__PURE__ */ e("button", { class: "clr", "aria-label": "Clear stop loss", onClick: (v) => (v.preventDefault(), f("")), children: /* @__PURE__ */ e(K, { n: "x", size: 12 }) })
      ] }),
      w > 0 && /* @__PURE__ */ e("span", { class: "hint num", children: p === "pnl" ? `Closes at ≈ ${Y(w, r)}` : `≈ ${dt(xn(t, n, i, w), 1)} P&L` })
    ] }),
    p === "pnl" && /* @__PURE__ */ e("div", { class: "pa-pcts four", children: C.map((v) => /* @__PURE__ */ e("button", { class: "pa-btn dark", onClick: () => y === "tp" ? h(String(v)) : f(String(v)), children: [
      y === "tp" ? "+" : "-",
      v,
      "%"
    ] }, v)) }),
    /* @__PURE__ */ e("p", { class: "pa-p sm", children: [
      "% P&L is the return on your margin: at ",
      i,
      "x, 10% P&L is a ",
      (10 / i).toFixed(1),
      "% price move. Auto close orders trigger on the mark price."
    ] })
  ] });
}
function Xp({ s: t, onClose: n, start: i }) {
  const r = [{ k: "home" }];
  i && i.k !== "home" && r.push(i), !t.session && cn("onboarded") !== "1" && r.push({ k: "onboard" });
  const [s, a] = m(r), [o, l] = m(null), [d, p] = m(!1), u = en(
    () => ({
      push: (f) => a((y) => [...y, f]),
      replace: (f) => a((y) => [...y.slice(0, -1), f]),
      back: () => a((f) => f.length > 1 ? f.slice(0, -1) : f)
    }),
    []
  );
  Z(() => {
    i && i.k !== "home" && a([{ k: "home" }, i]);
  }, [i && JSON.stringify(i)]);
  const c = s[s.length - 1], h = o ? jd(o, t) : null, g = `${s.length}:${c.k}`;
  return /* @__PURE__ */ e("div", { class: "pa-mobile", children: [
    /* @__PURE__ */ e("div", { class: "pa-stage", children: [
      c.k === "home" && /* @__PURE__ */ e(Fp, { s: t, nav: u, onClose: n, onLearn: l, onDisclosures: () => p(!0) }),
      c.k === "markets" && /* @__PURE__ */ e(Gd, { s: t, nav: u, list: c.list, pick: c.pick, focus: c.focus }),
      c.k === "market" && /* @__PURE__ */ e(Rp, { s: t, nav: u, sym: c.sym, onLearn: l }),
      c.k === "trade" && /* @__PURE__ */ e(Gp, { s: t, nav: u, sym: c.sym, side: c.side, onLearn: l, onDisclosures: () => p(!0) }),
      c.k === "position" && /* @__PURE__ */ e(Hp, { s: t, nav: u, id: c.id, onLearn: l }),
      c.k === "history" && /* @__PURE__ */ e(sp, { s: t, nav: u }),
      c.k === "onboard" && /* @__PURE__ */ e(qp, { s: t, nav: u, onLearn: l }),
      c.k === "help" && /* @__PURE__ */ e(Ip, { s: t, nav: u })
    ] }, g),
    h && /* @__PURE__ */ e(Oe, { title: h.title, onClose: () => l(null), tall: !0, children: /* @__PURE__ */ e("div", { class: "pa-prose", children: h.body }) }),
    d && /* @__PURE__ */ e(Oe, { title: "Disclosures", onClose: () => p(!1), tall: !0, children: /* @__PURE__ */ e(ys, { s: t }) })
  ] });
}
const Ya = "strike-everywhere:wallet", ye = (t, n = 0) => t !== null && t !== "" && t !== void 0 && Number.isFinite(Number(t)) ? Number(t) : n;
function Zp(t) {
  try {
    return sessionStorage.getItem(t);
  } catch {
    return null;
  }
}
function Jp(t, n) {
  try {
    sessionStorage.setItem(t, n);
  } catch {
  }
}
function Qp(t) {
  const n = en(() => new Li(t), []), [i, r] = m([]), [s, a] = m({}), [o, l] = m({}), [d, p] = m(5e-4), [u, c] = m(""), [h, g] = m(n.session), [f, y] = m(null), [k, _] = m([]), [w, z] = m([]), [C, v] = m(!1), [$, S] = m(null), [B, x] = m(null), M = De(), T = De(0), P = De(!0), ie = n.net.network === "testnet", F = (I, q, re, ce) => {
    const se = ++T.current;
    x({ id: se, kind: I, title: q, text: re }), clearTimeout(M.current), I !== "progress" && (M.current = setTimeout(() => x((oe) => oe?.id === se ? null : oe), ce ?? (I === "ok" ? 4500 : 9e3)));
  }, E = () => (clearTimeout(M.current), x(null));
  Z(() => {
    let I = !0;
    const q = n.on((oe) => {
      oe.type === "session" && g(oe.session), oe.type === "session" && oe.reason === "idle" && F("err", `Signed out after ${Math.round(n.idleTimeoutMs / 6e4)} minutes without activity`, "Your trading key was forgotten for safety. Connect again to keep trading."), oe.type === "session" && oe.reason === "expired" && F("err", "Session expired", "Connect again to keep trading."), oe.type === "user" && O();
    });
    (async () => {
      for (let oe = 0; I; oe++)
        try {
          oe === 0 && await n.init();
          const [U, le, Le] = await Promise.all([n.loadMarkets(), n.market.tickers().catch(() => []), n.market.baseTakerRate()]);
          if (!I) return;
          const j = {};
          for (const be of U) {
            const he = n.raw(be.symbol) ?? {}, Ue = Array.isArray(le) ? le.find((it) => it?.symbol === be.symbol) : void 0, Ye = ye(he.mark_price);
            j[be.symbol] = {
              mark: Ye,
              index: ye(he.index_price, Ye),
              last: ye(Ue?.lastPrice, ye(he.last_price, Ye)),
              funding: ye(he.funding_rate),
              nextFunding: ye(he.next_funding_time),
              open: ye(Ue?.openPrice, 0),
              vol: ye(Ue?.quoteVolume),
              high: ye(Ue?.highPrice),
              low: ye(Ue?.lowPrice)
            };
          }
          r(U), a(j), p(Le), c("");
          return;
        } catch (U) {
          if (!I) return;
          c(U?.message || "Could not reach Strike."), await new Promise((le) => setTimeout(le, Math.min(3e4, 2e3 * 2 ** oe)));
        }
    })();
    const re = n.prices();
    re.subscribe("!markprice@arr"), re.subscribe("!miniticker@arr");
    const ce = re.onMessage((oe) => {
      const U = Array.isArray(oe) ? oe : Array.isArray(oe?.data) ? oe.data : oe?.data ? [oe.data] : [oe];
      a((le) => {
        let Le = !1;
        const j = { ...le };
        for (const be of U) {
          const he = be?.s && j[be.s];
          he && (be.e === "markPriceUpdate" ? (j[be.s] = { ...he, mark: ye(be.p, he.mark), index: ye(be.i, he.index), funding: ye(be.r, he.funding), nextFunding: ye(be.T, he.nextFunding) }, Le = !0) : be.e === "24hrMiniTicker" && (j[be.s] = { ...he, open: ye(be.o, he.open), last: ye(be.c, he.last), vol: ye(be.q, he.vol), high: ye(be.h, he.high), low: ye(be.l, he.low) }, Le = !0));
        }
        return Le ? j : le;
      });
    }), se = setInterval(async () => {
      if (!At())
        try {
          const oe = await n.market.markets();
          a((U) => {
            const le = { ...U };
            for (const Le of oe) {
              const j = le[Le.symbol];
              j && (le[Le.symbol] = { ...j, mark: ye(Le.mark_price, j.mark), index: ye(Le.index_price, j.index), funding: ye(Le.funding_rate, j.funding), nextFunding: ye(Le.next_funding_time, j.nextFunding) });
            }
            return le;
          });
        } catch {
        }
    }, 15e3);
    return () => {
      I = !1, P.current = !1, q(), ce(), clearInterval(se), clearTimeout(A.current), clearTimeout(M.current), n.dispose();
    };
  }, [n]), Z(() => {
    if (!ie || !i.length) return;
    let I = !0;
    const q = () => Promise.all(
      i.map(
        (ce) => n.market.klines(ce.symbol, "1h", 25, "mark").then((se) => [ce.symbol, se.length ? se[0].open : 0]).catch(() => [ce.symbol, 0])
      )
    ).then((ce) => I && l(Object.fromEntries(ce.filter(([, se]) => se > 0))));
    q();
    const re = setInterval(() => !At() && q(), 10 * 6e4);
    return () => {
      I = !1, clearInterval(re);
    };
  }, [i]);
  const D = en(
    () => i.map((I) => {
      const q = s[I.symbol], re = n.raw(I.symbol) ?? {}, ce = q?.mark ?? 0, se = ie ? o[I.symbol] ?? 0 : q?.open ?? 0;
      return {
        spec: I,
        symbol: I.symbol,
        base: I.baseAsset,
        name: Ld(I.name, I.baseAsset),
        mark: ce,
        index: q?.index ?? 0,
        last: q?.last ?? 0,
        funding: q?.funding ?? 0,
        nextFunding: q?.nextFunding ?? 0,
        ref24: se,
        change: se > 0 && ce > 0 ? (ce - se) / se * 100 : 0,
        changeAbs: se > 0 && ce > 0 ? ce - se : 0,
        vol24: q?.vol ?? 0,
        high24: q?.high ?? 0,
        low24: q?.low ?? 0,
        createdAt: ye(re.created_at),
        maxLev: Math.max(1, Math.min(t.maxLeverage, I.maxLeverage)),
        strikeMaxLev: I.maxLeverage
      };
    }),
    [i, s, o, t.maxLeverage]
  ), W = en(() => Object.fromEntries(D.map((I) => [I.symbol, I])), [D]), A = De(), N = async () => {
    const I = n.session;
    if (!(!P.current || !I))
      try {
        const [q, re, ce] = await Promise.all([n.account.account(), n.account.positions(), n.account.openOrders()]);
        if (!P.current || n.session !== I) return;
        y(q), _(re), z(ce), v(!0);
      } catch (q) {
        q?.status === 401 && n.session ? (n.disconnect(), F("err", "Session expired", "Connect again to keep trading.")) : q?.status === 404 && (y(null), v(!0));
      }
  }, O = () => {
    clearTimeout(A.current), A.current = setTimeout(N, 400);
  };
  Z(() => {
    if (!h) {
      y(null), _([]), z([]), v(!1);
      return;
    }
    N(), n.userEvents();
    const I = setInterval(() => !At() && N(), 5e3);
    return () => clearInterval(I);
  }, [h]);
  const J = ye(f?.available_balance), ne = ye(f?.margin_balance, ye(f?.wallet_balance)), Se = ye(f?.unrealized_pnl), Ae = !f || ye(f.wallet_balance) <= 0 && k.length === 0, pt = async (I) => {
    if (!n.session) return S("connect");
    if (!n.wallet) {
      const q = Zp(Ya);
      if (q)
        try {
          await n.ensureWallet(q);
        } catch (re) {
          F("err", "Wallet", re?.message || String(re));
          return;
        }
    }
    if (!n.wallet) return S("connect");
    S(I);
  }, ve = () => {
    n.wallet && Jp(Ya, n.wallet.id), S(null), F("ok", "Wallet connected", "Your trades run on Strike.");
  }, G = async (I, q, re, ce) => {
    const se = I.side === "buy" ? "long" : "short", oe = ei.find((U) => U.type === I.type)?.label ?? "Order";
    F("progress", I.type === "market" ? `Opening ${Rn(q.size)} ${re} ${se} ${q.lev}x` : `Placing ${oe.toLowerCase()} · ${Rn(q.size)} ${re} ${se}`);
    try {
      if (I.type === "twap") {
        const le = I.twapMinutes ?? 60;
        return await n.placeTwap({ symbol: I.symbol, side: I.side, size: q.size, durationSec: le * 60, limitPrice: Number(I.twapLimit) > 0 ? I.twapLimit : void 0, reduceOnly: I.reduceOnly, randomize: I.randomize, leverage: I.reduceOnly ? void 0 : q.lev }), N(), F("ok", "TWAP started", `${I.side === "buy" ? "Long" : "Short"} ${Rn(q.size)} ${re} over ${le < 60 ? `${le} min` : `${Math.round(le / 60 * 10) / 10} h`}`), "resting";
      }
      const U = await n.placeOrder(xp(I, q));
      if (N(), I.type !== "market" && I.type !== "limit" && (U.status === "untriggered" || U.status === "open" || U.status === "pending"))
        return F("ok", `${oe} placed`, I.type === "trailing_stop_market" ? `Trails ${I.callbackRate}% behind the price` : `Triggers at $${Number(I.triggerPrice).toLocaleString("en-US", { maximumFractionDigits: 8 })}`), "resting";
      if (U.status === "filled") {
        const le = I.type === "market" && ce && ce > 0 ? ce : q.px;
        return F("ok", `Opened ${Rn(q.size)} ${re} ${se}`, `${q.lev}x · about ${Xa(q.size * le)} at ~$${le.toLocaleString("en-US", { maximumFractionDigits: le >= 1 ? 2 : 5 })}`), "filled";
      }
      return U.status === "open" || U.status === "untriggered" || U.status === "pending" ? (F("ok", "Limit order placed", `${I.side === "buy" ? "Long" : "Short"} ${Rn(q.size)} ${re} at $${I.limitPrice.toLocaleString("en-US", { maximumFractionDigits: 8 })}`), "resting") : /cancel|expire/i.test(U.status) ? (F("err", "Position opening failed", `There were no ${I.side === "buy" ? "sellers" : "buyers"} close enough to the market price, so Strike cancelled the order. Nothing was traded.`), "failed") : (F("err", "Position opening failed", `Strike: order ${U.status}`), "failed");
    } catch (U) {
      return F("err", "Position opening failed", U instanceof Hn ? U.message : U?.message || String(U)), "failed";
    }
  }, X = async (I, q = 1) => {
    const re = I.symbol.split("-")[0], ce = Math.abs(Number(I.size)), se = Number(I.size) > 0 ? "long" : "short";
    F("progress", q >= 1 ? `Closing ${Rn(ce)} ${re} ${se}` : `Closing ${Math.round(q * 100)}% of your ${re} ${se}`);
    try {
      const oe = await n.closePosition(I, q);
      return N(), oe.status === "filled" ? (F("ok", q >= 1 ? `Closed your ${re} ${se}` : `Closed ${Math.round(q * 100)}% of your ${re} ${se}`, q >= 1 ? `PnL ≈ ${Xa(Number(I.upnl), !0)}` : void 0), !0) : /cancel|expire/i.test(oe.status) ? (F("err", "Close failed", `There were no ${Number(I.size) > 0 ? "buyers" : "sellers"} close enough to the market price, so Strike cancelled the close. Your position is still open.`), !1) : (F("ok", `Close order ${oe.status}`), !0);
    } catch (oe) {
      return F("err", "Close failed", oe?.message || String(oe)), !1;
    }
  }, fe = async (I, q, re = 1) => {
    const ce = I.symbol.split("-")[0];
    F("progress", `Placing a limit close for your ${ce} position`);
    try {
      const se = await n.limitClose(I, q, re);
      return N(), se.status === "filled" ? F("ok", `Closed ${re >= 1 ? "your" : `${Math.round(re * 100)}% of your`} ${ce} position`) : F("ok", "Limit close placed", `It closes when the price reaches $${q.toLocaleString("en-US", { maximumFractionDigits: 8 })}. You'll find it under Open Orders.`), !0;
    } catch (se) {
      return F("err", "Limit close failed", se instanceof Hn ? se.message : se?.message || String(se)), !1;
    }
  }, Ce = async (I, q, re, ce) => {
    F("progress", I);
    try {
      const se = await q();
      return N(), F("ok", typeof re == "function" ? re(se) : re), !0;
    } catch (se) {
      return F("err", ce, se instanceof Hn ? se.message : se?.message || String(se)), !1;
    }
  };
  return {
    config: t,
    client: n,
    testnet: ie,
    markets: D,
    bySymbol: W,
    loadError: u,
    takerRate: d,
    session: h,
    account: f,
    accountLoaded: C,
    positions: k,
    orders: w,
    available: J,
    equity: ne,
    upnl: Se,
    isNewAccount: Ae,
    sheet: $,
    setSheet: S,
    toast: B,
    notify: F,
    dismissToast: E,
    refresh: N,
    openFunds: pt,
    onConnected: ve,
    placeDraft: G,
    closePosition: X,
    limitClose: fe,
    setExits: (I, q) => Ce("Placing take profit / stop loss", () => n.setPositionExits(I, q), "Take profit / stop loss set", "Couldn't set TP/SL"),
    trail: (I, q, re, ce) => Ce("Placing trailing stop", () => n.trailPosition(I, q, re, ce), `Trailing stop set (${q}%)`, "Couldn't set the trailing stop"),
    reverse: (I) => Ce(
      `Reversing your ${I.symbol.split("-")[0]} position`,
      () => n.reversePosition(I),
      (q) => q.status === "filled" ? `Reversed to ${Number(I.size) > 0 ? "Short" : "Long"}` : `Reverse order ${q.status}`,
      "Couldn't reverse"
    ),
    closeAll: () => Ce(
      "Closing all positions",
      () => n.closeAllPositions(),
      (I) => I.every((q) => q.ok) ? `Closed ${I.length} position${I.length === 1 ? "" : "s"}` : `Closed ${I.filter((q) => q.ok).length} of ${I.length}; the rest were cancelled by Strike (no liquidity near the price)`,
      "Close all failed"
    ),
    modifyMargin: (I, q, re) => Ce(re === "add" ? "Adding margin" : "Removing margin", () => n.modifyMargin(I, q, re), re === "add" ? "Margin added" : "Margin removed", "Couldn't change the margin"),
    editOrder: (I, q) => Ce("Updating the order", () => n.editOrder(I, q), "Order updated", "Couldn't update the order"),
    cancelAll: (I) => Ce("Cancelling orders", () => n.cancelAll(I), (q) => q === null ? "Cancelling orders…" : `Cancelled ${q} order${q === 1 ? "" : "s"}`, "Couldn't cancel"),
    cancelOrder: async (I) => {
      try {
        await n.trading.cancelOrder(I.symbol, I.id), F("ok", "Order cancelled"), setTimeout(N, 600);
      } catch (q) {
        F("err", "Couldn't cancel", q?.message || String(q));
      }
    },
    disconnect: () => {
      n.disconnect(), F("ok", "Disconnected");
    }
  };
}
function Rn(t) {
  const n = Math.abs(t);
  return t.toLocaleString("en-US", n >= 1e3 ? { maximumFractionDigits: 0 } : n >= 1 ? { maximumFractionDigits: 4 } : { maximumSignificantDigits: 4 });
}
function Xa(t, n = !1) {
  if (!Number.isFinite(t)) return "—";
  const i = Math.abs(t).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${t < 0 ? "-" : n && t > 0 ? "+" : ""}$${i}`;
}
function eu({ config: t, host: n, screen: i }) {
  const r = Qp(t), s = De(null), [a, o] = m(() => n.clientWidth || 400);
  ti(() => {
    const u = s.current;
    if (!u || typeof ResizeObserver > "u") return;
    const c = new ResizeObserver(() => u.clientWidth && o(u.clientWidth));
    return c.observe(u), o(u.clientWidth || a), () => c.disconnect();
  }, []);
  const l = t.layout === "auto" ? a >= 900 ? "desktop" : "mobile" : t.layout;
  Z(() => {
    n.dispatchEvent(new CustomEvent("strike-session", { bubbles: !0, composed: !0, detail: r.session ? { connected: !0, address: r.session.address, accountId: r.session.accountId } : { connected: !1 } }));
  }, [r.session?.accountId]);
  const d = t.closable ? () => n.dispatchEvent(new CustomEvent("strike-close", { bubbles: !0, composed: !0 })) : void 0, p = i === "market" ? { k: "market", sym: t.market } : i === "trade" ? { k: "trade", sym: t.market, side: t.side ?? "buy" } : void 0;
  return /* @__PURE__ */ e("div", { class: `pa${l === "desktop" || l === "panel" ? " desk" : ""}`, ref: s, children: [
    /* @__PURE__ */ e(Rd, { toast: r.toast, onDismiss: r.dismissToast }),
    l === "mobile" ? /* @__PURE__ */ e(Xp, { s: r, onClose: d, start: p }) : l === "panel" ? /* @__PURE__ */ e(Lp, { s: r }) : /* @__PURE__ */ e(Tp, { s: r, width: a }),
    r.sheet === "connect" && /* @__PURE__ */ e(Eo, { client: r.client, onClose: () => r.setSheet(null), onConnected: r.onConnected }),
    r.sheet === "deposit" && /* @__PURE__ */ e(
      Hd,
      {
        client: r.client,
        adaPrice: r.bySymbol["ADA-USD"]?.mark ?? 0,
        isNewAccount: r.isNewAccount,
        startBalance: Number(r.account?.wallet_balance ?? 0),
        onClose: () => r.setSheet(null),
        onCredited: () => (r.refresh(), r.notify("ok", "Deposit credited", "Your Perps balance is updated."))
      }
    ),
    r.sheet === "withdraw" && /* @__PURE__ */ e(
      Wd,
      {
        client: r.client,
        available: r.available,
        adaPrice: r.bySymbol["ADA-USD"]?.mark ?? 0,
        startBalance: Number(r.account?.wallet_balance ?? 0),
        onClose: () => r.setSheet(null),
        onDone: () => (r.refresh(), r.notify("ok", "Withdrawal processed", "The ADA is on its way to your wallet."))
      }
    )
  ] });
}
const tu = (
  /* css */
  `
:host([variant="app"]) {
  width: var(--se-width, 100%);
  height: var(--se-height, 100%);
  min-width: 320px;
  min-height: 560px;
  max-width: none;
}
:host([variant="app"]) .se-mount { height: 100%; min-height: inherit; }
.pa {
  --pa-bg: var(--strike-bg, #0e0e0f);
  --pa-card: var(--strike-card, #1b1b1d);
  --pa-card-2: var(--strike-card-2, #242427);
  --pa-sheet: var(--strike-sheet, #19191b);
  --pa-line: var(--strike-line, rgba(255,255,255,.07));
  --pa-line-2: var(--strike-line-2, rgba(255,255,255,.12));
  --pa-text: var(--strike-text, #f4f4f5);
  --pa-soft: var(--strike-soft, #d4d4d8);
  --pa-muted: var(--strike-muted, #9b9ba3);
  --pa-faint: var(--strike-faint, #6b6b73);
  --pa-accent: #4efab0;
  --pa-accent-rgb: 78,250,176;
  --pa-accent-ink: #04120c;
  --pa-neg: #ff5770;
  --pa-neg-rgb: 255,87,112;
  --pa-gold: #ffb719;
  --pa-font: var(--strike-font, Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  position: relative;
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--pa-bg);
  color: var(--pa-text);
  font: 400 15px/1.4 var(--pa-font);
  letter-spacing: -0.005em;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}
.pa .num { font-family: var(--pa-font); font-variant-numeric: tabular-nums; letter-spacing: -0.01em; }
.pa .pos { color: var(--pa-accent); }
.pa .neg { color: var(--pa-neg); }
.pa .muted { color: var(--pa-muted); }
.pa .pa-accent { color: var(--pa-accent); }
/* :where keeps the reset at element specificity, so every .pa-* class can set its own font size. */
:where(.pa) button { font: inherit; color: inherit; cursor: pointer; }
:where(.pa) button:disabled { cursor: not-allowed; }
.pa a { color: inherit; }
.pa :focus-visible { outline: 2px solid rgba(var(--pa-accent-rgb), .7); outline-offset: 2px; }
/* Text fields show focus on their rounded container instead. */
.pa input:focus-visible { outline: none; }
.pa-search:focus-within { box-shadow: inset 0 0 0 1.5px rgba(var(--pa-accent-rgb), .45); }

/* ---------------------------------------------------------------- mobile stack */
.pa-mobile { position: relative; flex: 1; min-height: 0; display: flex; }
.pa-stage { flex: 1; min-width: 0; display: flex; animation: pa-in .2s ease-out; }
@keyframes pa-in { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: none; } }
.pa-screen { position: relative; flex: 1; min-width: 0; display: flex; flex-direction: column; min-height: 0; }
.pa-top { flex: none; display: flex; align-items: center; gap: 12px; padding: 12px 16px 8px; min-height: 64px; }
.pa-top .sp { flex: 1; }
.pa-title { font-size: 20px; font-weight: 600; display: flex; align-items: center; gap: 8px; min-width: 0; }
.pa-title.two { flex-direction: column; align-items: flex-start; gap: 0; line-height: 1.25; }
.pa-title.two b { font-size: 17px; font-weight: 600; }
.pa-title.two > span { font-size: 15px; color: var(--pa-muted); }
.pa-side { display: inline-flex; align-items: center; gap: 4px; font-size: 17px; font-weight: 600; padding: 0; }
.pa-chip-test { font-size: 11px; font-weight: 500; color: #f2cf86; white-space: nowrap; }
.pa-net { font-size: 12px; font-weight: 500; color: #f2cf86; white-space: nowrap; }
.pa-round { flex: none; width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; background: var(--pa-card-2); color: var(--pa-text); transition: background .15s; }
.pa-round:hover { background: #2e2e32; }
.pa-round.ghost { background: none; pointer-events: none; }
.pa-round.done { background: var(--pa-accent); color: var(--pa-accent-ink); }
.pa-round.done:disabled { opacity: .4; }
.pa-scroll { flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden; padding: 0 16px; scrollbar-width: none; overscroll-behavior: contain; }
.pa-scroll::-webkit-scrollbar { display: none; }
.pa-bottom-pad { height: 104px; }
.pa-bottom-pad.sm { height: 24px; }
.pa-equity { font-size: 46px; font-weight: 700; letter-spacing: -0.03em; margin: 2px 0 2px; }
.pa-equity-sub { font-size: 15px; margin-bottom: 14px; }
.pa-equity + .pa-card { margin-top: 18px; }
.pa-card { background: var(--pa-card); border-radius: 22px; padding: 18px 20px; margin: 0 0 14px; position: relative; }
.pa-card.funds { padding: 14px 20px 18px; }
.pa-card.funds .pa-row { padding: 6px 0 12px; }
.pa-card.funds .pa-row .k { font-size: 16px; font-weight: 500; }
.pa-two { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.pa-hint { margin-top: 12px; font-size: 13px; color: var(--pa-muted); line-height: 1.45; }
.pa-card.gs { padding: 18px 110px 18px 20px; }
.pa-card.gs .eyebrow { font-size: 13px; font-weight: 600; letter-spacing: .06em; color: var(--pa-muted); }
.pa-card.gs .t { font-size: 19px; line-height: 1.3; margin: 6px 0 12px; font-weight: 500; }
.pa-card.gs .link { color: var(--pa-accent); font-size: 16px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; padding: 0; }
.pa-card.gs .x { position: absolute; top: 14px; right: 14px; width: 26px; height: 26px; display: grid; place-items: center; color: var(--pa-muted); border-radius: 50%; }
.pa-card.gs .art { position: absolute; right: 20px; bottom: 30px; }
.pa-h2 { font-size: 24px; font-weight: 700; letter-spacing: -0.02em; margin: 26px 0 12px; display: flex; align-items: center; gap: 4px; padding: 0; text-align: left; }
.pa-h2.sm { font-size: 18px; margin: 20px 0 10px; }
.pa-h2.link svg { color: var(--pa-muted); }
.pa-chips { display: grid; gap: 8px; margin: 0 -16px; padding: 0 16px; overflow-x: auto; scrollbar-width: none; }
.pa-chips::-webkit-scrollbar { display: none; }
.pa-chiprow { display: flex; gap: 8px; }
.pa-chip { flex: none; display: inline-flex; align-items: center; gap: 7px; height: 40px; padding: 0 14px; border-radius: 999px; background: var(--pa-card); font-size: 16px; font-weight: 500; white-space: nowrap; }
.pa-chip svg { color: var(--pa-accent); }
.pa-chip:hover { background: var(--pa-card-2); }
.pa-chip.sm { height: 34px; font-size: 14px; padding: 0 12px; gap: 5px; }
.pa-chip.sm svg { color: var(--pa-muted); }
.pa-chip.on { background: rgba(var(--pa-accent-rgb), .14); color: var(--pa-accent); }
.pa-group { background: var(--pa-card); border-radius: 22px; padding: 4px 18px; margin-bottom: 14px; }
.pa-group.mk { padding: 8px 18px; }
.pa-row { display: flex; align-items: center; gap: 10px; width: 100%; padding: 15px 0; text-align: left; border-bottom: 1px solid var(--pa-line); background: none; }
.pa-group > .pa-row:last-child, .pa-group > :last-child .pa-row { border-bottom: 0; }
.pa-row .l { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.pa-row .k { font-size: 16px; display: inline-flex; align-items: center; gap: 6px; }
.pa-row .s { font-size: 14px; color: var(--pa-muted); overflow: hidden; text-overflow: ellipsis; }
.pa-row .r { text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
.pa-row .v { font-size: 16px; }
.pa-row .vs { font-size: 13px; color: var(--pa-muted); }
.pa-row .chev { color: var(--pa-muted); flex: none; }
.pa-row.opt .ck { width: 22px; flex: none; color: var(--pa-accent); display: grid; place-items: center; }
.pa-i { display: inline-grid; place-items: center; color: var(--pa-muted); cursor: pointer; }
.pa-i:hover { color: var(--pa-text); }
.pa-lines .pa-row { padding: 18px 0; }
.pa-lines .pa-row .k { font-size: 15px; color: var(--pa-muted); }
.pa-lines .pa-row .s { font-size: 17px; color: var(--pa-text); }

/* coins */
.pa-coin { position: relative; flex: none; display: inline-block; border-radius: 50%; }
.pa-coin img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block; background: #222; }
.pa-mono { width: 100%; height: 100%; border-radius: 50%; display: grid; place-items: center; font-weight: 700; color: #04120c; letter-spacing: 0; }
.pa-rank { position: absolute; right: -3px; bottom: -3px; width: 18px; height: 18px; border-radius: 50%; display: grid; place-items: center; font-size: 10.5px; font-weight: 700; color: #1a1300; border: 2px solid var(--pa-card); }
.pa-rank.r1 { background: #f5c542; } .pa-rank.r2 { background: #c8ccd4; } .pa-rank.r3 { background: #e3935a; }
.pa-lev { display: inline-block; font-size: 12px; font-weight: 600; color: var(--pa-muted); margin-left: 4px; }

/* market rows */
.pa-mrow { display: flex; align-items: center; gap: 12px; width: 100%; padding: 11px 0; text-align: left; }
.pa-mrow .l { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.pa-mrow .l b { font-size: 17px; font-weight: 600; white-space: nowrap; }
.pa-mrow .s { font-size: 15px; color: var(--pa-muted); }
.pa-mrow .r { text-align: right; display: flex; flex-direction: column; gap: 2px; }
.pa-mrow .r b { font-size: 17px; font-weight: 500; }
.pa-mrow .r span { font-size: 15px; }
.pa-mrow.list { padding: 10px 0; }
.pa-num { width: 22px; flex: none; text-align: center; font-size: 15px; color: var(--pa-muted); }
.pa-num.medal { width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; font-size: 11px; font-weight: 700; color: #1a1300; }
.pa-num.medal.r1 { background: #f5c542; } .pa-num.medal.r2 { background: #c8ccd4; } .pa-num.medal.r3 { background: #e3935a; }
.pa-empty-row, .pa-empty { padding: 26px 0; text-align: center; color: var(--pa-muted); font-size: 15px; }
.pa-pos { display: flex; align-items: center; gap: 12px; width: 100%; padding: 13px 0; text-align: left; border-bottom: 1px solid var(--pa-line); }
.pa-group > .pa-pos:last-child { border-bottom: 0; }
.pa-pos .l { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.pa-pos .l b { font-size: 16px; font-weight: 600; }
.pa-pos .s { font-size: 14px; color: var(--pa-muted); }
.pa-pos .r { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; font-size: 14px; }
.pa-pos .r b { font-size: 16px; font-weight: 500; }
.pa-pos .chev { color: var(--pa-muted); }

/* search / filters */
.pa-search { display: flex; align-items: center; gap: 10px; height: 46px; padding: 0 16px; border-radius: 999px; background: var(--pa-card-2); color: var(--pa-muted); margin: 2px 0 12px; }
.pa-search input { flex: 1; min-width: 0; background: none; border: 0; outline: none; color: var(--pa-text); font: inherit; font-size: 16px; }
.pa-search input::placeholder { color: var(--pa-muted); }
.pa-search button { display: grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; background: #3a3a3f; color: var(--pa-text); }
.pa-filter { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; margin: 0 -16px 8px; padding: 0 16px; }
.pa-filter::-webkit-scrollbar { display: none; }
.pa-thead { display: flex; align-items: center; gap: 12px; padding: 10px 0 4px; font-size: 15px; color: var(--pa-muted); }
.pa-thead .n { width: 22px; text-align: center; }
.pa-thead .m { flex: 1; padding-left: 52px; }
.pa-thead .p { display: inline-flex; align-items: center; gap: 4px; color: var(--pa-muted); padding: 0; }

/* buttons */
.pa-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 44px; padding: 0 18px; border-radius: 999px; font-size: 16px; font-weight: 600; background: var(--pa-card-2); color: var(--pa-text); text-decoration: none; transition: filter .15s, background .15s, opacity .15s; white-space: nowrap; }
.pa-btn:hover:not(:disabled) { filter: brightness(1.12); }
.pa-btn:disabled { opacity: .4; }
.pa-btn.dark { background: #26262a; }
.pa-btn.dark.on { background: rgba(var(--pa-accent-rgb), .16); color: var(--pa-accent); }
.pa-btn.primary, .pa-btn.long { background: var(--pa-accent); color: var(--pa-accent-ink); }
.pa-btn.short { background: var(--pa-neg); color: #fff; }
.pa-btn.caution { background: var(--pa-gold); color: #1b1200; }
.pa-btn.wide { width: 100%; margin-top: 6px; }
.pa-btn.big { width: 100%; height: 54px; font-size: 17px; }
.pa-btn.xs { height: 32px; font-size: 13.5px; padding: 0 12px; }
a.pa-btn.wide { margin: 8px 0 0; }
.pa-dock { position: absolute; left: 0; right: 0; bottom: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 14px 16px 18px; background: linear-gradient(to top, var(--pa-bg) 62%, rgba(14,14,15,0)); z-index: 5; }
.pa-dock .pa-btn { height: 54px; font-size: 18px; }
.pa-dock.single { position: static; grid-template-columns: 1fr; background: none; padding: 10px 16px 18px; }
.pa-foot-link { display: flex; align-items: center; gap: 6px; padding: 10px 0 0; font-size: 14px; color: var(--pa-muted); text-align: left; }
.pa-foot-link:first-of-type { padding-top: 22px; }
.pa-powered { padding: 18px 0 0; font-size: 12.5px; color: var(--pa-faint); }
.pa-powered b { color: var(--pa-muted); font-weight: 600; }

/* market screen */
.pa-coinhead { display: flex; align-items: center; gap: 8px; margin-top: 2px; }
.pa-coinhead .nm { font-size: 22px; font-weight: 600; }
.pa-price { font-size: 38px; font-weight: 700; letter-spacing: -0.025em; margin-top: 4px; }
.pa-chg { font-size: 16px; font-weight: 500; margin: 2px 0 10px; }
.pa-chg .muted { font-weight: 400; }
.pa-line { position: relative; margin: 0 -16px; color: var(--pa-accent); touch-action: pan-y; user-select: none; }
.pa-line.dn { color: var(--pa-neg); }
.pa-line svg { display: block; }
.pa-line .xh { stroke: rgba(255,255,255,.35); stroke-dasharray: 3 4; }
.pa-line-msg { position: absolute; inset: 0; display: grid; place-items: center; color: var(--pa-muted); font-size: 14px; }
.pa-candles { margin: 0 -16px; }
.pa-candles .chart { border: 0; }
.pa-ranges { display: flex; align-items: center; justify-content: space-between; margin: 10px 0 4px; }
.pa-ranges button { height: 30px; min-width: 40px; padding: 0 10px; border-radius: 999px; font-size: 14px; font-weight: 600; color: var(--pa-muted); display: inline-flex; align-items: center; gap: 5px; }
.pa-ranges button.on { background: var(--pa-text); color: #0b0b0c; }
.pa-ranges .pa-livedot { display: inline-block; width: 12px; height: 9px; margin-right: 4px; background: currentColor; -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 10'%3E%3Cpath d='M1 5h2.6l1.9-3.6 3 7.2L10.4 5H13' fill='none' stroke='%23000' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 10'%3E%3Cpath d='M1 5h2.6l1.9-3.6 3 7.2L10.4 5H13' fill='none' stroke='%23000' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat; }
.pa-ranges .ic { min-width: 30px; padding: 0 6px; }

/* trade: amount + keypad */
.pa-screen.trade { overflow: hidden; }
.pa-amount { flex: 1; min-height: 0; display: flex; flex-direction: column; padding: 0 16px 10px; }
.pa-amount-top { flex: 1; min-height: 120px; display: flex; flex-direction: column; justify-content: center; }
.pa-big { font-weight: 300; letter-spacing: -0.04em; line-height: 1.02; white-space: nowrap; overflow: hidden; }
.pa-big.xxxl { font-size: 84px; } .pa-big.xxl { font-size: 66px; } .pa-big.xl { font-size: 50px; }
.pa-big.zero { color: var(--pa-soft); }
.pa-review .pa-big { margin: 28px 0 26px; }
.pa-levline { display: inline-flex; align-items: center; gap: 6px; font-size: 20px; padding: 6px 0 0; align-self: flex-start; }
.pa-levline.sub { font-size: 16px; color: var(--pa-muted); padding-top: 4px; }
.pa-err { color: var(--pa-neg); font-size: 16px; margin-top: 8px; }
.pa-err.sm { font-size: 13.5px; line-height: 1.4; margin: 10px 2px 0; }
.pa-note { color: var(--pa-muted); font-size: 14px; margin-top: 8px; display: flex; align-items: center; gap: 6px; }
.pa-balance { display: flex; align-items: center; justify-content: space-between; padding: 12px 2px; font-size: 16px; color: var(--pa-soft); text-align: left; }
.pa-balance b { font-weight: 600; color: var(--pa-text); }
.pa-pcts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.pa-pcts.four { grid-template-columns: repeat(4, 1fr); margin: 4px 0 14px; }
.pa-pcts .pa-btn { height: 52px; font-size: 17px; font-weight: 500; }
.pa-keypad { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 8px; }
.pa-keypad button { height: 64px; font-size: 28px; font-weight: 400; border-radius: 16px; display: grid; place-items: center; }
.pa-keypad button:active { background: var(--pa-card); }
@media (max-height: 700px) { .pa-keypad button { height: 52px; font-size: 24px; } .pa-big.xxxl { font-size: 68px; } }

/* review */
.pa-review { flex: 1; min-height: 0; display: flex; flex-direction: column; }
.pa-review .pa-scroll { padding-bottom: 8px; }
.pa-warn { display: flex; gap: 8px; align-items: flex-start; margin: 10px 0 0; padding: 12px 14px; border-radius: 16px; background: rgba(255,69,58,.12); border: 1px solid rgba(255,69,58,.3); color: #ffd0cc; font-size: 14px; line-height: 1.45; }
.pa-warn > svg:first-child { flex: none; color: #ff453a; margin-top: 2px; }
.pa-warn svg { flex: none; margin-top: 1px; }

/* sheets */
.pa-scrim { position: absolute; inset: 0; z-index: 40; background: rgba(0,0,0,.55); display: flex; align-items: flex-end; justify-content: center; animation: pa-fade .18s ease-out; }
@keyframes pa-fade { from { opacity: 0; } }
.pa-sheet { width: 100%; max-width: 520px; max-height: 88%; display: flex; flex-direction: column; background: var(--pa-sheet); border-radius: 32px 32px 0 0; padding: 14px 16px 22px; animation: pa-up .22s cubic-bezier(.2,.8,.2,1); outline: none; }
.pa-sheet.tall { max-height: 92%; }
@keyframes pa-up { from { transform: translateY(40px); opacity: .4; } }
.pa-sheet-h { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.pa-sheet-h .t { flex: 1; text-align: center; font-size: 18px; font-weight: 600; }
.pa-sheet-b { overflow-y: auto; min-height: 0; scrollbar-width: none; }
.pa-sheet-b::-webkit-scrollbar { display: none; }
.pa-sheet .pa-group { background: var(--pa-card-2); }
.pa-sheet .pa-group .pa-row { border-color: rgba(255,255,255,.06); }
.pa-p { color: var(--pa-muted); font-size: 15px; line-height: 1.45; margin: 4px 2px 14px; }
.pa-p.c { text-align: center; }
.pa-p.sm { font-size: 13px; margin-top: 10px; }
.pa-levbig { text-align: center; font-size: 44px; font-weight: 600; margin: 10px 0 18px; }
.pa-levmarks { display: flex; justify-content: space-between; gap: 4px; margin: 10px 0 18px; }
.pa-levmarks button { flex: 1; height: 30px; border-radius: 999px; font-size: 13px; color: var(--pa-muted); background: var(--pa-card-2); }
.pa-levmarks button.on { background: rgba(var(--pa-accent-rgb), .16); color: var(--pa-accent); }
.pa-slider { position: relative; height: 28px; margin: 0 4px; }
.pa-slider .track { position: absolute; left: 0; right: 0; top: 12px; height: 5px; border-radius: 3px; background: #333338; }
.pa-slider .fill { position: absolute; left: 0; top: 12px; height: 5px; border-radius: 3px; background: var(--pa-accent); }
.pa-slider .mk { position: absolute; top: 12px; width: 5px; height: 5px; margin-left: -2.5px; border-radius: 50%; background: #55555c; }
.pa-slider .mk.on { background: rgba(4,18,12,.55); }
.pa-slider .knob { position: absolute; top: 4px; width: 21px; height: 21px; margin-left: -10.5px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 4px rgba(var(--pa-accent-rgb), .9), 0 2px 8px rgba(0,0,0,.4); pointer-events: none; }
.pa-slider input { position: absolute; inset: 0; width: 100%; opacity: 0; margin: 0; cursor: pointer; }
.pa-slider.off { opacity: .4; }
.pa-slider.off input { cursor: not-allowed; }
.pa-radio { flex: none; width: 22px; height: 22px; border-radius: 50%; border: 2px solid #4a4a50; }
.pa-radio.on { border: 6px solid var(--pa-accent); }
.pa-field { display: flex; flex-direction: column; gap: 6px; padding: 14px 18px; border-radius: 20px; background: var(--pa-card-2); margin-bottom: 12px; border: 1.5px solid transparent; text-align: left; width: 100%; }
.pa-field.focus, .pa-field:focus-within { border-color: rgba(var(--pa-accent-rgb), .45); }
.pa-field .lbl { font-size: 14px; color: var(--pa-muted); }
.pa-field .lbl.big { font-size: 16px; color: var(--pa-text); }
.pa-field.toggle { flex-direction: row; align-items: center; justify-content: space-between; }
.pa-field.toggle .v { display: inline-flex; align-items: center; gap: 6px; color: var(--pa-soft); }
.pa-field .in { display: flex; align-items: center; gap: 4px; font-size: 18px; }
.pa-field input { flex: 1; min-width: 0; background: none; border: 0; outline: none; color: var(--pa-text); font: inherit; font-size: 18px; font-variant-numeric: tabular-nums; }
.pa-field input::placeholder { color: var(--pa-faint); }
.pa-field .clr { width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; background: #3a3a3f; flex: none; }
.pa-field .hint { font-size: 13px; color: var(--pa-muted); }
.pa-alert { display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 4px 4px 2px; }
.pa-alert .ic { width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; background: var(--pa-neg); color: #fff; margin-bottom: 8px; }
.pa-alert b { font-size: 20px; font-weight: 600; }
.pa-alert > span:not(.ic) { color: var(--pa-muted); font-size: 16px; margin-bottom: 10px; }
.pa-prose { color: var(--pa-soft); font-size: 15px; line-height: 1.55; }
.pa-prose p { margin: 0 0 12px; }
.pa-prose b { color: var(--pa-text); }
.pa-prose a { color: var(--pa-accent); }

/* banner (island toast) */
.pa-banner { position: absolute; z-index: 70; top: 10px; left: 50%; transform: translateX(-50%); width: min(420px, calc(100% - 24px)); display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; border-radius: 24px; background: #232326; box-shadow: 0 16px 40px rgba(0,0,0,.55); animation: pa-drop .25s cubic-bezier(.2,.8,.2,1); }
@keyframes pa-drop { from { transform: translate(-50%, -16px); opacity: 0; } }
.pa-banner .ic { flex: none; width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; }
.pa-banner.ok .ic { background: var(--pa-accent); color: var(--pa-accent-ink); }
.pa-banner.err .ic { background: #ff453a; color: #fff; }
.pa-banner.progress .ic { color: var(--pa-accent); }
.pa-banner .tx { flex: 1; display: flex; flex-direction: column; gap: 2px; font-size: 15px; line-height: 1.35; min-width: 0; }
.pa-banner .tx b { font-weight: 500; }
.pa-banner .tx span { color: var(--pa-soft); }
.pa-banner .ok { align-self: flex-start; margin-top: 8px; color: var(--pa-accent); font-weight: 600; padding: 2px 0; }
.pa-banner .x { color: var(--pa-muted); padding: 2px; }
.pa-spin { display: inline-block; border-radius: 50%; border: 2px solid rgba(255,255,255,.18); border-top-color: currentColor; animation: pa-rot .8s linear infinite; vertical-align: -3px; }
@keyframes pa-rot { to { transform: rotate(360deg); } }

/* history */
.pa-month { font-size: 20px; font-weight: 600; margin: 10px 0 6px; }
.pa-act { display: flex; align-items: center; gap: 12px; padding: 12px 0; }
.pa-act .glyph { width: 38px; height: 38px; flex: none; border-radius: 50%; display: grid; place-items: center; background: var(--pa-card-2); color: var(--pa-soft); }
.pa-act .l { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.pa-act .l b { font-weight: 500; font-size: 16px; }
.pa-act .s { font-size: 14px; color: var(--pa-muted); }
.pa-act .r { font-size: 16px; font-weight: 500; }
.pa-nothing { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 34% 0 0; color: var(--pa-muted); font-size: 16px; }
.pa-nothing .ic { width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; background: var(--pa-card-2); }

/* onboarding */
.pa-dots { flex: 1; display: flex; justify-content: center; gap: 5px; }
.pa-dots span { width: 6px; height: 6px; border-radius: 3px; background: #3a3a3f; transition: width .2s; }
.pa-dots span.on { width: 20px; background: var(--pa-accent); }
.pa-ob { flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; padding: 0 20px 20px; gap: 0; }
.pa-ob .sp { flex: 1; min-height: 16px; }
.pa-ob h1 { font-size: 34px; line-height: 1.12; letter-spacing: -0.025em; font-weight: 700; margin: 8px 0 10px; }
.pa-ob h1.c, .pa-ob .c { text-align: center; }
.pa-ob .lede { color: var(--pa-muted); font-size: 16px; line-height: 1.45; margin: 0 0 18px; }
.pa-ob .pt { display: flex; gap: 14px; align-items: flex-start; margin: 6px 0 12px; }
.pa-ob .pt svg { flex: none; color: var(--pa-text); margin-top: 2px; }
.pa-ob .pt b { display: block; font-size: 17px; font-weight: 600; }
.pa-ob .pt span span { color: var(--pa-muted); font-size: 15px; }
.pa-ob .pa-btn.big { margin-top: 10px; flex: none; }
.pa-ob-art { width: 100%; max-height: 220px; margin: 6px 0 10px; }
.pa-ob-facts { display: grid; gap: 10px; margin-top: 10px; }
.pa-ob-facts div { background: var(--pa-card); border-radius: 18px; padding: 14px 16px; display: flex; flex-direction: column; gap: 2px; }
.pa-ob-facts b { font-size: 17px; }
.pa-ob-facts span { color: var(--pa-muted); font-size: 14.5px; }
.pa-risks { display: grid; gap: 10px; margin: 6px 0 12px; }
.pa-risk { display: flex; gap: 14px; align-items: flex-start; padding: 16px; border-radius: 20px; background: var(--pa-card); text-align: left; border: 1.5px solid transparent; }
.pa-risk.on { border-color: rgba(var(--pa-accent-rgb), .55); }
.pa-risk > svg { flex: none; margin-top: 2px; }
.pa-risk .l { flex: 1; display: flex; flex-direction: column; gap: 3px; }
.pa-risk .l b { font-size: 17px; font-weight: 600; }
.pa-risk .l span { color: var(--pa-muted); font-size: 14.5px; line-height: 1.4; }
.pa-risk .l .lev { color: var(--pa-accent); font-size: 13px; font-weight: 600; }
.pa-risk .pa-radio { margin-top: 18px; }

/* scrollbars: thin, dark, on-theme (no grey system bars) */
.pa, .pa * { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.14) transparent; }
.pa ::-webkit-scrollbar { width: 6px; height: 6px; }
.pa ::-webkit-scrollbar-track { background: transparent; }
.pa ::-webkit-scrollbar-thumb { background: rgba(255,255,255,.14); border-radius: 3px; }
.pa ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,.24); }
.pa ::-webkit-scrollbar-corner { background: transparent; }
/* phone-style screens scroll without a visible bar */
.pa-mobile .pa-ob, .pa-mobile .pa-sheet-b { scrollbar-width: none; }
.pa-mobile .pa-ob::-webkit-scrollbar, .pa-mobile .pa-sheet-b::-webkit-scrollbar { display: none; }

/* funds: big amount input, summary, safety card, wallet wait, step timeline */
.pa-bigin { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 18px 0 16px; cursor: text; }
.pa-bigrow { display: flex; align-items: baseline; justify-content: center; gap: 8px; max-width: 100%; }
.pa-bigin input { -webkit-appearance: none; appearance: none; box-shadow: none; padding: 0; border-radius: 0; width: 6.5ch; max-width: 100%; background: transparent; border: 0; outline: none; color: var(--pa-text); font: 300 54px/1.05 var(--pa-font); letter-spacing: -0.03em; text-align: center; font-variant-numeric: tabular-nums; field-sizing: content; min-width: 1.2ch; }
.pa-bigin input::placeholder { color: var(--pa-faint); }
.pa-bigin .u { font: 300 32px/1 var(--pa-font); color: var(--pa-muted); }
.pa-bigin .sub { font-size: 14px; color: var(--pa-muted); text-align: center; }
.pa-amount-sum { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 0 18px; text-align: center; }
.pa-amount-sum b { font: 300 38px/1.1 var(--pa-font); letter-spacing: -0.02em; }
.pa-amount-sum span { color: var(--pa-muted); font-size: 14px; }
.pa-safe { display: flex; gap: 10px; align-items: flex-start; padding: 12px 14px; margin: 2px 0 14px; border-radius: 16px; background: rgba(var(--pa-accent-rgb), .07); color: var(--pa-soft); font-size: 13.5px; line-height: 1.45; }
.pa-safe svg { flex: none; color: var(--pa-accent); margin-top: 1px; }
.pa-safe b { color: var(--pa-text); font-weight: 600; }
.pa-msg { margin: 0 0 12px; padding: 12px 14px; border-radius: 14px; background: var(--pa-card-2); color: var(--pa-muted); font: 12px/1.5 ui-monospace, SFMono-Regular, Consolas, monospace; white-space: pre-wrap; word-break: break-all; max-height: 150px; overflow: auto; }
.pa-foot-link.c { justify-content: center; width: 100%; padding: 12px 0 2px; }
.pa-foot-link.c:first-of-type { padding-top: 12px; }
.pa-wait { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px; padding: 26px 10px 18px; }
.pa-wait .ring { position: relative; width: 76px; height: 76px; border-radius: 50%; display: grid; place-items: center; background: var(--pa-card-2); margin-bottom: 10px; }
.pa-wait .ring::before { content: ""; position: absolute; inset: -6px; border-radius: 50%; border: 2px solid rgba(var(--pa-accent-rgb), .25); border-top-color: var(--pa-accent); animation: pa-rot 1.1s linear infinite; }
.pa-wait .ring img { width: 40px; height: 40px; border-radius: 10px; }
.pa-wait b { font-size: 20px; font-weight: 600; }
.pa-wait > span { color: var(--pa-muted); font-size: 14.5px; line-height: 1.45; max-width: 340px; }
.pa-wait ol { margin: 10px 0 0; padding: 12px 16px 12px 34px; border-radius: 16px; background: var(--pa-card-2); text-align: left; color: var(--pa-soft); font-size: 14px; line-height: 1.7; align-self: stretch; }
.pa-steps { display: flex; flex-direction: column; gap: 0; margin: 0 0 16px; padding: 4px 4px 0; }
.pa-step { position: relative; display: flex; gap: 12px; padding: 0 0 18px; }
.pa-step:not(:last-child)::before { content: ""; position: absolute; left: 12px; top: 26px; bottom: 2px; width: 2px; background: var(--pa-line-2); }
.pa-step.done:not(:last-child)::before { background: rgba(var(--pa-accent-rgb), .45); }
.pa-step .pa-sdot { flex: none; width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; font-size: 12px; font-weight: 600; background: var(--pa-card-2); color: var(--pa-muted); }
.pa-step.done .pa-sdot { background: var(--pa-accent); color: var(--pa-accent-ink); }
.pa-step.active .pa-sdot { background: rgba(var(--pa-accent-rgb), .14); color: var(--pa-accent); }
.pa-step.error .pa-sdot { background: rgba(var(--pa-neg-rgb), .18); color: var(--pa-neg); }
.pa-step .tx { display: flex; flex-direction: column; gap: 2px; padding-top: 3px; min-width: 0; }
.pa-step .tx b { font-size: 15px; font-weight: 500; }
.pa-step.todo .tx b { color: var(--pa-muted); }
.pa-step .tx span { color: var(--pa-muted); font-size: 13px; line-height: 1.4; }
.pa-step .tx a { color: var(--pa-accent); text-decoration: none; }
.pa-pcts.four .pa-btn { font-size: 15px; padding: 0 6px; }
.pa-seg { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; padding: 4px; margin: 0 0 12px; border-radius: 999px; background: var(--pa-card-2); }
.pa-seg button { height: 38px; border-radius: 999px; font-size: 15px; font-weight: 600; color: var(--pa-muted); }
.pa-seg button.on { background: #38383d; color: var(--pa-text); }
.pa-tools { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 8px; margin: 4px 0 14px; }
.pa-tools button { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 12px 4px; border-radius: 18px; background: var(--pa-card); font-size: 13px; font-weight: 600; color: var(--pa-soft); }
.pa-tools button svg { color: var(--pa-accent); }
.pa-tools button:hover { background: var(--pa-card-2); }
.pa-lbl-row { font-size: 14px; color: var(--pa-muted); margin: 4px 2px 8px; }
.pa-rev { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 14px 0 10px; font-size: 18px; font-weight: 600; }
.pa-rev svg { color: var(--pa-muted); }
.pa-seg.three { grid-template-columns: repeat(3, 1fr); }
.pa-seg.three button { font-size: 12.5px; padding: 0 4px; }
.pa-switch { flex: none; width: 46px; height: 28px; border-radius: 14px; background: #3a3a3f; position: relative; transition: background .15s; }
.pa-switch span { position: absolute; top: 3px; left: 3px; width: 22px; height: 22px; border-radius: 50%; background: #fff; transition: transform .15s; }
.pa-switch.on { background: var(--pa-accent); }
.pa-switch.on span { transform: translateX(18px); }
.pa-chipmini { flex: none; height: 26px; padding: 0 10px; border-radius: 999px; background: #38383d; font-size: 12.5px; font-weight: 600; color: var(--pa-soft); }

/* reused funding sheets (connect / deposit / withdraw) */
.pa .overlay { z-index: 60; background: rgba(0,0,0,.6); backdrop-filter: none; display: flex; align-items: flex-end; justify-content: center; }
.pa .sheet { width: 100%; max-width: 520px; max-height: 92%; background: var(--pa-sheet); border: 0; border-radius: 32px 32px 0 0; padding: 22px 20px 24px; gap: 14px; font: 400 14px/1.45 var(--pa-font); color: var(--pa-text); }
.pa .sheet h3 { font-size: 20px; font-weight: 600; }
.pa .sheet h3 .x { width: 36px; height: 36px; border-radius: 50%; background: var(--pa-card-2); display: grid; place-items: center; font-size: 20px; color: var(--pa-text); padding: 0; }
.pa .sheet p { font-size: 14px; color: var(--pa-muted); }
.pa .sheet .cta { min-height: 52px; border-radius: 999px; font-size: 16px; background: var(--pa-accent); color: var(--pa-accent-ink); }
.pa .sheet .cta.ghost { background: var(--pa-card-2); color: var(--pa-text); border: 0; }
.pa .sheet .wallet { padding: 14px 16px; border-radius: 18px; background: var(--pa-card-2); font-size: 16px; }
.pa .sheet .wallet img { width: 30px; height: 30px; border-radius: 8px; }
.pa .sheet .note, .pa .sheet .warn { border-radius: 16px; padding: 12px 14px; font-size: 13.5px; }
.pa .sheet .warn { padding-left: 38px; }
.pa .sheet .warn::before { left: 14px; top: 13px; }
.pa .sheet .note { background: var(--pa-card-2); }
.pa .sheet .field { height: 54px; border-radius: 16px; background: var(--pa-card-2); }
.pa .sheet .field input { font-family: var(--pa-font); font-size: 18px; }
.pa .sheet .kv { font-size: 14px; }
.pa .sheet .details { background: var(--pa-card-2); border-radius: 16px; padding: 12px 14px; gap: 8px; }
.pa .sheet .consent { border-radius: 12px; background: #111; }
.pa .sheet .step .s { width: 22px; height: 22px; }

/* ---------------------------------------------------------------- desktop */
.pa.desk { --pa-bg: var(--strike-bg, #121214); font-size: 13px; }
.pd { flex: 1; min-height: 0; display: grid; gap: 8px; padding: 8px; grid-template-columns: minmax(0, 1fr) 330px; grid-template-rows: auto minmax(0, 1fr) minmax(190px, 30%) auto; grid-template-areas: "head right" "chart right" "bottom right" "foot foot"; }
.pd.with-book { grid-template-columns: minmax(0, 1fr) 290px 330px; grid-template-areas: "head book right" "chart book right" "bottom bottom right" "foot foot foot"; }
.pd.with-list.with-book { grid-template-columns: 300px minmax(0, 1fr) 290px 330px; grid-template-areas: "list head book right" "list chart book right" "list bottom bottom right" "foot foot foot foot"; }
.pd-panel { background: rgba(255,255,255,.045); border-radius: 10px; min-width: 0; min-height: 0; overflow: hidden; display: flex; flex-direction: column; }
.pd-list { grid-area: list; }
.pd-head { grid-area: head; flex-direction: row; align-items: center; gap: 18px; padding: 10px 16px; position: relative; overflow: visible; z-index: 6; min-height: 64px; }
.pd-stats { flex: 1; min-width: 0; display: flex; gap: 26px; overflow-x: auto; scrollbar-width: none; mask-image: linear-gradient(90deg, #000 calc(100% - 28px), transparent); padding-right: 24px; }
.pd-stats::-webkit-scrollbar { display: none; }
.pd-sym { flex: none; }
.pd-chart { grid-area: chart; position: relative; }
.pd-book { grid-area: book; }
.pd-right { grid-area: right; display: flex; flex-direction: column; gap: 8px; min-height: 0; }
.pd-bottom { grid-area: bottom; }
.pd-foot { grid-area: foot; display: flex; align-items: center; gap: 14px; padding: 2px 6px 0; font-size: 12.5px; color: var(--pa-muted); }
.pd-foot .sp { flex: 1; }
.pd-foot .dot { flex: none; display: inline-block; width: 14px; height: 10px; background: var(--pa-accent); -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 10'%3E%3Cpath d='M1 5h2.6l1.9-3.6 3 7.2L10.4 5H13' fill='none' stroke='%23000' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 10'%3E%3Cpath d='M1 5h2.6l1.9-3.6 3 7.2L10.4 5H13' fill='none' stroke='%23000' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat; }
.pd-foot .dot.test { background: var(--pa-gold); }
.pd-foot .pa-net { color: var(--pa-muted); }
/* layout="panel": one column for a host's side panel */
.pd.pp { display: flex; flex-direction: column; overflow-y: auto; scrollbar-width: thin; scrollbar-color: var(--strike-scrollbar, rgba(255,255,255,.18)) transparent; }
.pd.pp::-webkit-scrollbar { width: 8px; }
.pd.pp::-webkit-scrollbar-thumb { background: var(--strike-scrollbar, rgba(255,255,255,.16)); border-radius: 8px; border: 2px solid transparent; background-clip: padding-box; }
.pd.pp::-webkit-scrollbar-track { background: transparent; }
.pd.pp > * { flex: none; }
.pp-head { gap: 12px; }
.pp-head .sp { flex: 1; }
.pp-px { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
.pp-px b { font-size: 17px; font-weight: 600; }
.pp-px span { font-size: 12px; }
.pp-head .pd-pop { left: 0; right: 0; width: auto; }
.pp-chart { padding-top: 8px; }
.pp-right { min-height: auto; }
.pp-trades { padding-bottom: 4px; }
.pp-item { display: flex; flex-direction: column; gap: 7px; padding: 12px 14px; border-top: 1px solid var(--pa-line); }
.pp-line { display: flex; align-items: center; gap: 8px; font-size: 13px; }
.pp-line .sp { flex: 1; }
.pp-acts { display: flex; flex-wrap: wrap; gap: 6px; }
.pp-trades .pd-tabs + .pp-item, .pp-trades .pd-tabs + .pp-empty { border-top: 0; }
.pp-empty { padding: 18px 14px; text-align: center; font-size: 13px; border-top: 1px solid var(--pa-line); }
.pd-link { color: var(--pa-muted); text-decoration: none; padding: 0; font-size: 12.5px; }
.pd-link:hover { color: var(--pa-text); }
.pd-sym { display: flex; align-items: center; gap: 10px; text-align: left; padding: 0; }
.pd-sym span { display: flex; flex-direction: column; line-height: 1.2; }
.pd-sym b { font-size: 20px; font-weight: 600; }
.pd-sym .muted { font-size: 12px; }
.pd-stat { flex: none; display: flex; flex-direction: column; gap: 2px; }
.pd-stat .k { font-size: 12px; color: var(--pa-muted); white-space: nowrap; }
.pd-stat .v { font-size: 13px; white-space: nowrap; }
.pd-pop { position: absolute; left: 8px; top: calc(100% + 6px); width: 340px; height: min(560px, 70vh); z-index: 30; box-shadow: 0 20px 50px rgba(0,0,0,.6); border-radius: 12px; background: var(--pa-sheet); display: flex; }
.pd-pop .pd-list { flex: 1; background: none; }
.pd-tabs { flex: none; display: flex; border-bottom: 1px solid var(--pa-line); }
.pd-tabs button { flex: 1; height: 44px; font-size: 14.5px; font-weight: 600; color: var(--pa-muted); border-bottom: 2px solid transparent; margin-bottom: -1px; }
.pd-tabs button.on { color: var(--pa-text); border-bottom-color: var(--pa-text); }
.pd-tabs.ls button.on.long { color: var(--pa-accent); border-bottom-color: var(--pa-accent); }
.pd-tabs.ls button.on.short { color: var(--pa-neg); border-bottom-color: var(--pa-neg); }
.pd-tabs.left { justify-content: flex-start; }
.pd-tabs.left button { flex: none; padding: 0 18px; }
.pd-tabs.scroll { overflow-x: auto; scrollbar-width: none; }
.pd-tabs.scroll::-webkit-scrollbar { display: none; }
.pd-tabs.scroll button { white-space: nowrap; padding: 0 12px; font-size: 13.5px; }
.pd-subtabs { flex: none; display: flex; gap: 6px; padding: 10px 12px 0; }
.pd-subtabs button { height: 28px; padding: 0 12px; border-radius: 999px; font-size: 12.5px; font-weight: 600; color: var(--pa-muted); background: var(--pa-card-2); }
.pd-subtabs button.on { color: var(--pa-text); background: #3a3a40; }
/* Scroll-driven fade: the right edge fades only while more tabs are hidden (unsupported browsers just scroll). */
@supports (animation-timeline: scroll()) {
  .pd-tabs.scroll { animation: pd-tabfade linear both; animation-timeline: scroll(self inline); }
  @keyframes pd-tabfade { from { mask-image: linear-gradient(90deg, #000 calc(100% - 48px), transparent); } to { mask-image: none; } }
}
.pd-menu.up { top: auto; bottom: calc(100% + 6px); right: 0; width: 190px; }
.pd-table td.act .pd-dd { display: inline-block; }
.pd-search { display: flex; align-items: center; gap: 8px; height: 36px; margin: 10px 10px 4px; padding: 0 12px; border-radius: 10px; background: rgba(255,255,255,.06); color: var(--pa-muted); }
.pd-search input { flex: 1; min-width: 0; background: none; border: 0; outline: none; color: var(--pa-text); font: inherit; }
.pd-list-h { display: flex; justify-content: space-between; padding: 8px 14px 4px; font-size: 12px; color: var(--pa-muted); }
.pd-list-b { flex: 1; min-height: 0; overflow-y: auto; padding: 0 6px 6px; scrollbar-width: thin; }
.pd-mrow { display: flex; align-items: center; gap: 10px; width: 100%; padding: 8px; border-radius: 8px; text-align: left; }
.pd-mrow:hover { background: rgba(255,255,255,.05); }
.pd-mrow.on { background: rgba(var(--pa-accent-rgb), .08); }
.pd-mrow .l { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
.pd-mrow .l b { font-size: 14px; font-weight: 600; white-space: nowrap; }
.pd-mrow .l .muted { font-size: 12px; }
.pd-mrow .r { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; font-size: 12px; }
.pd-mrow .r b { font-size: 13.5px; font-weight: 500; }
.pd-mrow .pa-lev { font-size: 11.5px; }
.pd-star { flex: none; display: grid; place-items: center; width: 20px; height: 20px; margin-right: -4px; color: rgba(255,255,255,.22); border-radius: 5px; cursor: pointer; }
.pd-star:hover { color: var(--pa-soft); }
.pd-star.on { color: var(--pa-gold); }
.pd-star.on svg path { fill: currentColor; }
.pd-ivs { flex: none; display: flex; gap: 2px; padding: 8px 10px; border-bottom: 1px solid var(--pa-line); }
.pd-ivs button { height: 26px; padding: 0 9px; border-radius: 6px; font-size: 12.5px; font-weight: 600; color: var(--pa-muted); }
.pd-ivs button.on { background: rgba(255,255,255,.1); color: var(--pa-text); }
.pd-ctabs { flex: none; display: flex; flex-wrap: wrap; align-items: center; gap: 4px 10px; padding: 6px 10px; border-bottom: 1px solid var(--pa-line); }
.pd-ctabs::-webkit-scrollbar { display: none; }
.pd-ctabs .tabs { display: flex; gap: 2px; flex: none; }
.pd-ctabs .tabs button { height: 28px; padding: 0 11px; border-radius: 7px; font-size: 13px; font-weight: 600; color: var(--pa-muted); white-space: nowrap; }
.pd-ctabs .tabs button:hover { color: var(--pa-text); }
.pd-ctabs .tabs button.on { color: var(--pa-text); background: rgba(255,255,255,.08); }
.pd-ivs.flat { border: 0; padding: 0; margin-left: auto; flex: none; }
.pd-tabbody { flex: 1; min-height: 0; display: flex; flex-direction: column; }
.pd-fh { flex: none; display: flex; align-items: center; gap: 12px; padding: 10px 14px 4px; font-size: 12.5px; flex-wrap: wrap; }
.pd-fh b { font-size: 13.5px; font-weight: 600; }
.pd-fh .sp { flex: 1; }
.pd-fh .muted { font-variant-numeric: tabular-nums; }
.pd-svgbox { flex: 1; min-height: 160px; position: relative; display: flex; }
.pd-svgbox svg { display: block; }
.pd-svgbox .grid { stroke: rgba(255,255,255,.06); }
.pd-svgbox .zero { stroke: rgba(255,255,255,.22); }
.pd-svgbox .ax { fill: var(--pa-muted); font-size: 11px; font-family: var(--pa-font); font-variant-numeric: tabular-nums; }
.pd-svgbox rect.pos { fill: var(--pa-accent); }
.pd-svgbox rect.neg { fill: var(--pa-neg); }
.pd-svgbox .cum { fill: none; stroke: rgba(255,255,255,.7); stroke-width: 1.5; }
.pd-svgbox .cross { stroke: rgba(255,255,255,.28); stroke-dasharray: 3 3; }
.pd-svgbox .bidfill { fill: rgba(var(--pa-accent-rgb), .14); }
.pd-svgbox .askfill { fill: rgba(255,87,112,.14); }
.pd-svgbox .bidline { fill: none; stroke: var(--pa-accent); stroke-width: 1.5; }
.pd-svgbox .askline { fill: none; stroke: var(--pa-neg); stroke-width: 1.5; }
.pd-legend { flex: none; display: flex; justify-content: center; gap: 18px; padding: 4px 10px 10px; font-size: 12px; color: var(--pa-muted); }
.pd-legend span { display: inline-flex; align-items: center; gap: 6px; }
.pd-legend .sw { width: 10px; height: 10px; border-radius: 2px; }
.pd-legend .sw.pos { background: var(--pa-accent); }
.pd-legend .sw.neg { background: var(--pa-neg); }
.pd-legend .sw.line { height: 2px; background: rgba(255,255,255,.7); }
.pd-details { overflow-y: auto; scrollbar-width: thin; scrollbar-color: var(--strike-scrollbar, rgba(255,255,255,.18)) transparent; }
.pd-dgrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 6px 28px; padding: 14px 18px 18px; }
.pd-dgrid section { min-width: 0; }
.pd-dgrid h4 { margin: 8px 0 4px; font-size: 13.5px; font-weight: 600; color: var(--pa-text); }
.pd-drow { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; padding: 9px 0; border-bottom: 1px solid var(--pa-line); }
.pd-drow .l { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.pd-drow .l span { font-size: 13px; color: var(--pa-soft, var(--pa-text)); }
.pd-drow small { font-size: 11.5px; color: var(--pa-muted); line-height: 1.35; }
.pd-drow b { font-size: 13px; font-weight: 600; white-space: nowrap; text-align: right; }
.pd-tiers { width: 100%; border-collapse: collapse; font-size: 12.5px; font-variant-numeric: tabular-nums; }
.pd-tiers th { text-align: left; font-weight: 500; color: var(--pa-muted); padding: 7px 0; border-bottom: 1px solid var(--pa-line); }
.pd-tiers td { padding: 6px 0; border-bottom: 1px solid var(--pa-line); }
.pd-tiers th:not(:first-child), .pd-tiers td:not(:first-child) { text-align: right; }
.pd-chart-box { flex: 1; min-height: 0; }
.pd-chart-box .chart { border: 0; }
.pd-center { flex: 1; display: flex; flex-direction: column; gap: 10px; align-items: center; justify-content: center; padding: 20px; text-align: center; min-height: 100px; }
.pd-ob { flex: 1; min-height: 0; display: flex; flex-direction: column; font-size: 12.5px; }
.pd-ob-h { flex: none; display: grid; grid-template-columns: 1fr 1fr 1fr; padding: 8px 12px 4px; color: var(--pa-muted); font-size: 12px; }
.pd-ob-h span:not(:first-child), .pd-ob .lv span:not(:first-child):not(.bar) { text-align: right; }
.pd-ob-side { flex: 1; min-height: 0; display: flex; flex-direction: column; overflow: hidden; }
.pd-ob-side.asks { justify-content: flex-end; }
.pd-ob .lv { position: relative; display: grid; grid-template-columns: 1fr 1fr 1fr; padding: 2.5px 12px; width: 100%; text-align: left; font-variant-numeric: tabular-nums; }
.pd-ob button.lv:hover { background: rgba(255,255,255,.05); }
.pd-ob .lv .bar { position: absolute; right: 0; top: 1px; bottom: 1px; opacity: .14; pointer-events: none; }
.pd-ob .asks .bar { background: var(--pa-neg); }
.pd-ob .bids .bar { background: var(--pa-accent); }
.pd-spread { flex: none; display: grid; grid-template-columns: 1fr 1fr 1fr; padding: 6px 12px; margin: 3px 0; background: rgba(255,255,255,.04); color: var(--pa-muted); font-size: 12px; }
.pd-spread span:not(:first-child) { text-align: right; }
.pd-ob-tools { flex: none; display: flex; align-items: center; gap: 6px; padding: 8px 10px 2px; }
.pd-ob-tools .sp { flex: 1; }
.pd-ob-tools .views { display: flex; gap: 4px; }
.pd-ob-tools .views button { width: 24px; height: 22px; border-radius: 5px; display: flex; flex-direction: column; justify-content: center; gap: 2px; padding: 0 5px; opacity: .45; }
.pd-ob-tools .views button.on { opacity: 1; background: rgba(255,255,255,.08); }
.pd-ob-tools .views i { display: block; height: 4px; border-radius: 1px; }
.pd-ob-tools .v-both i:first-child, .pd-ob-tools .v-asks i { background: var(--pa-neg); }
.pd-ob-tools .v-both i:last-child, .pd-ob-tools .v-bids i { background: var(--pa-accent); }
.pd-sel { height: 24px; padding: 0 6px; border-radius: 6px; border: 1px solid var(--pa-line); background: var(--pa-card-2); color: var(--pa-text); font: inherit; font-size: 12px; font-variant-numeric: tabular-nums; cursor: pointer; }
.pd-bs { flex: none; display: flex; align-items: center; gap: 8px; padding: 6px 12px 8px; font-size: 12px; font-weight: 600; }
.pd-bs .b { color: var(--pa-accent); }
.pd-bs .s { color: var(--pa-neg); }
.pd-bs .bar { flex: 1; height: 5px; border-radius: 3px; background: var(--pa-neg); overflow: hidden; display: flex; }
.pd-bs .bar i { display: block; height: 100%; background: var(--pa-accent); }
.pd-ob-empty { padding: 12px; color: var(--pa-muted); text-align: center; font-size: 12px; }
.pd-trades { flex: 1; min-height: 0; overflow-y: auto; }
.pd-order { flex: 1; }
.pd-form { flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 11px; padding: 14px 14px 14px; scrollbar-width: thin; }
.pd-pills { flex: none; display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 10px 12px 0; }
.pd-pill { height: 32px; border-radius: 8px; background: rgba(255,255,255,.07); font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; }
.pd-pill:hover:not(:disabled):not(.static) { background: rgba(255,255,255,.11); }
.pd-pill:disabled { opacity: .6; }
.pd-pill.static { cursor: default; }
.pd-menu.wide { width: 270px; max-height: 360px; overflow-y: auto; }
.pd-chips { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.pd-chips button { height: 28px; padding: 0 10px; border-radius: 8px; background: rgba(255,255,255,.06); font-size: 12.5px; font-weight: 600; color: var(--pa-soft); }
.pd-chips button.on { background: rgba(var(--pa-accent-rgb), .16); color: var(--pa-accent); }
.pd-mini { display: inline-flex; align-items: center; gap: 4px; height: 28px; padding: 0 8px; border-radius: 8px; background: rgba(255,255,255,.06); font-size: 12px; color: var(--pa-muted); }
.pd-mini input { width: 42px; background: none; border: 0; outline: none; color: var(--pa-text); font: inherit; font-size: 12.5px; text-align: right; }
.pd-opts { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 14px; }
.pd-check { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; color: var(--pa-soft); cursor: pointer; }
.pd-check input { accent-color: var(--pa-accent); width: 14px; height: 14px; margin: 0; }
.pd-tif { display: inline-flex; padding: 2px; border-radius: 8px; background: rgba(255,255,255,.06); }
.pd-tif.wide { display: grid; grid-template-columns: repeat(3, 1fr); }
.pd-tif button { height: 24px; padding: 0 9px; border-radius: 6px; font-size: 11.5px; font-weight: 600; color: var(--pa-muted); }
.pd-tif.wide button { height: 30px; font-size: 13px; }
.pd-tif button.on { background: rgba(255,255,255,.12); color: var(--pa-text); }
.pd-box.static { justify-content: center; font-size: 13.5px; }
.pd-link { display: inline-flex; align-items: center; gap: 4px; }
.pd-order-foot { flex: none; display: flex; flex-direction: column; gap: 8px; padding: 10px 14px 14px; border-top: 1px solid var(--pa-line); }
.pd-kv { display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: 13px; }
.pd-kv.muted { color: var(--pa-muted); }
.pd-kv.muted .num { color: var(--pa-soft); }
.pd-lbl { font-size: 13px; margin-bottom: -4px; }
.pd-dd { position: relative; }
.pd-dd > button { display: inline-flex; align-items: center; gap: 4px; font-weight: 600; padding: 0; }
.pd-menu { position: absolute; right: 0; top: calc(100% + 6px); z-index: 10; width: 220px; display: flex; flex-direction: column; padding: 6px; border-radius: 12px; background: #232326; box-shadow: 0 16px 40px rgba(0,0,0,.5); }
.pd-menu button { display: flex; flex-direction: column; align-items: flex-start; gap: 1px; padding: 8px 10px; border-radius: 8px; text-align: left; }
.pd-menu button:hover, .pd-menu button.on { background: rgba(255,255,255,.06); }
.pd-menu span { color: var(--pa-muted); font-size: 12px; }
.pd-input { display: flex; align-items: center; gap: 8px; height: 42px; padding: 0 12px; border-radius: 12px; background: rgba(255,255,255,.06); border: 1px solid transparent; }
.pd-input:focus-within { border-color: rgba(var(--pa-accent-rgb), .45); }
.pd-input.big { height: 48px; border-radius: 16px; }
.pd-input .pre { color: var(--pa-muted); font-weight: 500; }
.pd-input input { flex: 1; min-width: 0; background: none; border: 0; outline: none; color: var(--pa-text); font: inherit; font-size: 15px; font-variant-numeric: tabular-nums; }
.pd-input.big input { font-size: 17px; }
.pd-input .suf { color: var(--pa-soft); font-size: 12.5px; padding: 0; white-space: nowrap; }
.pd-input .suf.unit { display: inline-flex; align-items: center; gap: 5px; height: 28px; padding: 0 10px; border-radius: 999px; background: rgba(255,255,255,.08); font-weight: 600; color: var(--pa-text); }
.pd-sl { display: flex; align-items: center; gap: 10px; }
.pd-sl .pa-slider { flex: 1; }
.pd-box { display: flex; align-items: center; width: 64px; height: 36px; padding: 0 10px; border-radius: 12px; background: rgba(255,255,255,.06); }
.pd-box input { width: 100%; min-width: 0; background: none; border: 0; outline: none; color: var(--pa-text); text-align: right; font: inherit; font-size: 13.5px; }
.pd-box span { color: var(--pa-muted); margin-left: 3px; font-size: 12px; }
.pd-calc { align-self: flex-start; display: inline-flex; align-items: center; gap: 6px; padding: 2px 0; font-size: 12.5px; color: var(--pa-muted); }
.pd-calc:hover { color: var(--pa-text); }
.calc { display: flex; flex-direction: column; gap: 14px; container-type: inline-size; }
.pa.desk .pa-sheet:has(.calc) { max-width: 660px; }
.calc-tabs { margin: -4px 0 0; }
.calc-body { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 14px; align-items: stretch; }
@container (max-width: 520px) { .calc-body { grid-template-columns: minmax(0, 1fr); } }
.calc-in { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.calc-l { font-size: 12.5px; color: var(--pa-muted); margin-top: 4px; }
.pd-seg2 { display: grid; grid-template-columns: 1fr 1fr; padding: 3px; border-radius: 10px; background: rgba(255,255,255,.06); }
.pd-seg2 button { height: 32px; border-radius: 8px; font-size: 13px; font-weight: 600; color: var(--pa-muted); }
.pd-seg2 button.on.long { background: rgba(var(--pa-accent-rgb), .16); color: var(--pa-accent); }
.pd-seg2 button.on.short { background: rgba(255,87,112,.16); color: var(--pa-neg); }
.calc-lev { display: flex; align-items: center; justify-content: space-between; height: 40px; padding: 0 6px; border-radius: 10px; border: 1px solid var(--pa-line); }
.calc-lev button { width: 30px; height: 30px; border-radius: 8px; display: grid; place-items: center; color: var(--pa-soft); }
.calc-lev button:hover { background: rgba(255,255,255,.06); color: var(--pa-text); }
.calc-lev b { font-size: 15px; font-weight: 600; }
.calc-ends { display: flex; justify-content: space-between; font-size: 11.5px; color: var(--pa-muted); margin-top: -2px; }
.calc-out { border: 1px solid var(--pa-line); border-radius: 12px; padding: 14px; display: flex; flex-direction: column; gap: 10px; min-height: 100%; }
.calc-h { font-size: 13.5px; font-weight: 600; }
.calc-r { display: flex; justify-content: space-between; gap: 10px; font-size: 13px; color: var(--pa-soft); }
.calc-r b { font-weight: 600; color: var(--pa-text); }
.calc-r b.pos { color: var(--pa-accent); }
.calc-r b.neg { color: var(--pa-neg); }
.calc-warn { margin: 2px 0 0; font-size: 12px; color: var(--pa-gold); }
.calc-note { margin: auto 0 0; font-size: 11.5px; line-height: 1.45; color: var(--pa-muted); }
.pd-hint { font-size: 12px; color: var(--pa-muted); margin-top: -6px; }
.pd-box input:disabled { cursor: not-allowed; opacity: .5; }
.pd-switch { width: 42px; height: 24px; border-radius: 12px; background: #3a3a3f; position: relative; transition: background .15s; }
.pd-switch span { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform .15s; }
.pd-switch.on { background: var(--pa-accent); }
.pd-switch.on span { transform: translateX(18px); }
.pd-auto { display: flex; flex-direction: column; gap: 8px; }
.pd-auto-h { display: flex; align-items: center; justify-content: space-between; font-size: 12.5px; color: var(--pa-muted); }
.pd-chipbtn { display: inline-flex; align-items: center; gap: 4px; height: 24px; padding: 0 9px; border-radius: 999px; background: rgba(255,255,255,.08); font-size: 12px; font-weight: 600; color: var(--pa-text); }
.pd-warn { position: relative; padding: 9px 11px 9px 33px; border-radius: 10px; background: rgba(255,69,58,.12); border: 1px solid rgba(255,69,58,.3); color: #ffd0cc; font-size: 12.5px; line-height: 1.4; }
.pd-warn::before { content: ""; position: absolute; left: 11px; top: 9px; width: 16px; height: 16px; background: #ff453a; -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 4 3 20h18L12 4z'/%3E%3Cpath d='M12 10v4.5'/%3E%3Ccircle cx='12' cy='17.2' r='1.1' fill='%23000' stroke='none'/%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 4 3 20h18L12 4z'/%3E%3Cpath d='M12 10v4.5'/%3E%3Ccircle cx='12' cy='17.2' r='1.1' fill='%23000' stroke='none'/%3E%3C/svg%3E") center / contain no-repeat; }
.pd-cta { width: 100%; height: 46px; border-radius: 12px; font-size: 15px; font-weight: 600; background: var(--pa-accent); color: var(--pa-accent-ink); flex: none; display: inline-flex; align-items: center; justify-content: center; }
.pd-cta.short { background: var(--pa-neg); color: #fff; }
.pd-cta.caution { background: var(--pa-gold); color: #1b1200; }
.pd-cta:disabled { opacity: .45; }
.pd-acct { flex: none; padding: 14px; gap: 9px; }
.pd-acct .pd-kv b { font-weight: 600; }
.pd-btn { height: 36px; padding: 0 14px; border-radius: 10px; background: rgba(255,255,255,.08); color: var(--pa-text); font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; }
.pd-btn:hover:not(:disabled) { background: rgba(255,255,255,.12); }
.pd-btn:disabled { opacity: .45; }
.pd-btn.primary { background: var(--pa-accent); color: var(--pa-accent-ink); }
.pd-btn.sm { height: 28px; padding: 0 10px; font-size: 12px; border-radius: 8px; }
.pd-acct .pd-btn { width: 100%; }
.pd-addr { display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: var(--pa-muted); }
.pd-table-wrap { flex: 1; min-height: 0; overflow: auto; display: flex; flex-direction: column; }
.pd-table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
.pd-table th { position: sticky; top: 0; background: #19191b; text-align: left; font-weight: 500; color: var(--pa-muted); padding: 8px 12px; white-space: nowrap; }
.pd-table td { padding: 8px 12px; border-top: 1px solid var(--pa-line); white-space: nowrap; }
.pd-table td.act { text-align: right; display: flex; gap: 6px; justify-content: flex-end; }
.pd-mk { display: inline-flex; align-items: center; gap: 7px; padding: 0; }
.pd-badge { font-size: 11.5px; font-weight: 600; white-space: nowrap; }
.pd-badge.long { color: var(--pa-accent); }
.pd-badge.short { color: var(--pa-neg); }
.pa.desk .pa-sheet { border-radius: 24px; margin-bottom: auto; margin-top: auto; max-width: 480px; }
.pa.desk .pa-scrim { align-items: center; }
.pa.desk .overlay { align-items: center; }
.pa.desk .sheet { border-radius: 20px; max-width: 460px; }
.pa.desk .pa-banner { top: 14px; }
`
), nu = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Fragment+Mono&display=swap", iu = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap", ru = (
  /* css */
  `
:host {
  /* Stop host-page inherited styles (text-align, letter-spacing, text-transform, ...) leaking in.
     Custom properties are unaffected, and styles the page sets on <strike-trade> itself still win. */
  all: initial;
  --se-bg: #0a0a0a;
  --se-surface: #141414;
  --se-surface-2: #1a1a1a;
  --se-raised: #252525;
  --se-border: #252525;
  --se-border-strong: #363636;
  --se-text: #ffffff;
  --se-text-soft: #d0d0d0;
  --se-text-2: #b8b8b8;
  --se-muted: rgba(255,255,255,0.6);
  --se-faint: rgba(255,255,255,0.4);
  --se-input: rgba(255,255,255,0.08);
  --se-input-hover: rgba(255,255,255,0.12);
  --se-accent: #4efab0;
  --se-accent-rgb: 78,250,176;
  --se-accent-ink: #04120c;
  --se-neg: #f43f5e;
  --se-neg-rgb: 244,63,94;
  --se-gold: #f8931a;
  --se-radius: 6px;
  --se-radius-sm: 4px;
  --se-font: "IBM Plex Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  /* Numbers use Plex Sans tabular figures; Fragment Mono only for raw text (consent, addresses): Plex Mono's zero is dotted. */
  --se-num: var(--se-font);
  --se-mono: "Fragment Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  display: block;
  width: var(--se-width, 380px);
  max-width: 100%;
  min-width: min(300px, 100%);
  color: var(--se-text);
  font: 400 13px/1.45 var(--se-font);
  -webkit-font-smoothing: antialiased;
  container-type: inline-size;
}
* { box-sizing: border-box; }
button, input, select { font: inherit; color: inherit; }
button { cursor: pointer; border: 0; background: none; padding: 0; }
button:disabled { cursor: not-allowed; }
:focus-visible { outline: 2px solid rgba(var(--se-accent-rgb), .7); outline-offset: 1px; }
.num { font-family: var(--se-num); font-variant-numeric: tabular-nums; letter-spacing: 0; }
.pos { color: var(--se-accent); }
.neg { color: var(--se-neg); }
.muted { color: var(--se-muted); }
.soft { color: var(--se-text-2); }
.dotted { border-bottom: 1px dashed rgba(255,255,255,.35); padding-bottom: 1px; cursor: help; }
/* tap-to-open help (Info): an ⓘ button and its popover, kept inside the card by a measured shift */
.info { position: relative; display: inline-flex; vertical-align: -2px; margin-left: 4px; }
.info-b { position: relative; width: 14px; height: 14px; display: grid; place-items: center; border-radius: 50%; color: var(--se-faint); }
.info-b::after { content: ""; position: absolute; inset: -7px; }
.info-b:hover, .info-b[aria-expanded="true"] { color: var(--se-text); }
.info-pop { position: absolute; z-index: 25; top: calc(100% + 6px); left: -12px; width: max-content; max-width: 250px; padding: 8px 10px; border-radius: var(--se-radius); background: var(--se-surface-2); border: 1px solid var(--se-border-strong); box-shadow: 0 10px 30px rgba(0,0,0,.55); font: 400 12px/1.45 var(--se-font); color: var(--se-text-soft); text-align: left; white-space: normal; letter-spacing: 0; cursor: auto; }
.info-pop b { color: var(--se-text); font-weight: 600; }
/* one-line muted helper texts in the ticket */
.helper { font-size: 12px; line-height: 1.4; color: var(--se-muted); }
.ticket > .helper { margin-top: -5px; }
.ticket > .helper.summary { margin-top: 0; color: var(--se-text-2); }
.helper .linkbtn { font-size: inherit; }
.seg-hint { font-size: 11px; color: var(--se-faint); }

.card {
  position: relative;
  background: var(--se-bg);
  border: 1px solid var(--se-border);
  border-radius: 10px;
  overflow: hidden;
}

/* ---------- market header ---------- */
.mkt { display: flex; align-items: center; gap: 10px; padding: 12px 14px 10px; border-bottom: 1px solid var(--se-border); }
.coin { width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; font-weight: 700; font-size: 11px; color: var(--se-accent-ink); background: var(--se-accent); flex: none; }
.coin.img { background: #111; overflow: hidden; }
.coin.img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.mkt-id { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; min-width: 0; }
.chip-test { font-size: 10.5px; font-weight: 500; color: #f2cf86; white-space: nowrap; }
.mkt-pick { display: flex; align-items: center; gap: 6px; font-size: 17px; font-weight: 600; letter-spacing: .01em; }
.mkt-pick svg { opacity: .75; }
.mkt-price { margin-left: auto; text-align: right; line-height: 1.2; }
.mkt-price .big { font-size: 16px; font-weight: 600; }
.mkt-price .chg { font-size: 12px; }
.stats { display: grid; grid-template-columns: 1fr 1.45fr 1fr; gap: 4px 10px; padding: 8px 14px 10px; border-bottom: 1px solid var(--se-border); }
.stat .k { font-size: 11px; color: var(--se-text-2); }
.stat .v { font-size: 12px; font-weight: 500; }
.stat .v.fund { font-size: 11.5px; white-space: nowrap; }
.spark { display: block; width: 100%; height: 56px; border-bottom: 1px solid var(--se-border); }

/* ---------- market views: price / chart / book ---------- */
.views { display: flex; align-items: center; gap: 8px; padding: 0 14px; height: 30px; border-bottom: 1px solid var(--se-border); font-size: 12px; }
.vtabs, .ivs, .ptype, .chips, .durs { display: flex; gap: 2px; }
.vtabs button, .ivs button, .ptype button, .chips button, .durs button { height: 26px; min-width: 28px; padding: 0 8px; border-radius: var(--se-radius-sm); color: var(--se-text-2); font-weight: 500; }
.vtabs button:hover, .ivs button:hover, .ptype button:hover, .chips button:hover, .durs button:hover { color: var(--se-text); }
.vtabs button.on, .ivs button.on, .ptype button.on, .chips button.on, .durs button.on { background: var(--se-raised); color: var(--se-text); }
.ivs { margin-left: auto; }
.ivs button { padding: 0 6px; font-family: var(--se-num); font-variant-numeric: tabular-nums; font-size: 11.5px; }
.chart { position: relative; border-bottom: 1px solid var(--se-border); overflow: hidden; touch-action: pan-y; user-select: none; }
.chart svg { display: block; }
.ptype { position: absolute; left: 8px; top: 5px; background: rgba(10,10,10,.85); border-radius: var(--se-radius-sm); z-index: 1; }
.ptype button { height: 20px; padding: 0 7px; font-size: 11px; }
.ohlc { position: absolute; left: 8px; right: 62px; top: 29px; font-size: 10.5px; color: var(--se-text-2); pointer-events: none; z-index: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ohlc b { color: var(--se-text); font-weight: 500; margin-right: 3px; }
.ohlc b.pos { color: var(--se-accent); } .ohlc b.neg { color: var(--se-neg); }
.chart-msg { position: absolute; inset: 0; display: grid; place-items: center; color: var(--se-muted); font-size: 12.5px; text-align: center; padding: 0 20px; }
.chart .gl { stroke: #1d1d1d; }
.chart .ax { fill: var(--se-faint); font: 10px var(--se-num); font-variant-numeric: tabular-nums; }
.chart .cu { stroke: var(--se-accent); fill: var(--se-accent); }
.chart .cd { stroke: var(--se-neg); fill: var(--se-neg); }
.chart .vol { stroke: none; opacity: .28; }
.chart .now { stroke-dasharray: 3 3; opacity: .8; }
.chart .tag { fill: var(--se-accent-ink); stroke: none; font: 600 10px var(--se-num); font-variant-numeric: tabular-nums; }
.chart .cd .tag { fill: #fff; }
.chart .xh line { stroke: rgba(255,255,255,.35); stroke-dasharray: 2 3; }
.chart .xh rect { fill: #3a3a3a; }
.chart .xh text { fill: #fff; font: 10px var(--se-num); font-variant-numeric: tabular-nums; }
.book { position: relative; min-height: 120px; padding: 4px 0 6px; border-bottom: 1px solid var(--se-border); font-size: 11.5px; }
.book-cap { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0 10px; padding: 2px 14px 4px; font-size: 11px; color: var(--se-faint); }
.book-cap .pos, .book-cap .neg { font-weight: 600; }
.lvl { position: relative; display: grid; grid-template-columns: 1.1fr 1fr 1fr; gap: 8px; width: 100%; height: 19px; align-items: center; padding: 0 14px; text-align: right; }
.lvl .px, .lvl.hd > span:first-child { text-align: left; }
.lvl .bar { position: absolute; right: 0; top: 1px; bottom: 1px; opacity: .13; pointer-events: none; }
.lvl.ask .bar { background: var(--se-neg); } .lvl.bid .bar { background: var(--se-accent); }
.lvl.ask .px { color: var(--se-neg); } .lvl.bid .px { color: var(--se-accent); }
.lvl:not(.hd):hover { background: var(--se-input); }
.lvl.hd { color: var(--se-faint); font-size: 11px; cursor: default; }
.lvl > span { position: relative; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.book-empty { padding: 10px 14px; color: var(--se-text-2); font-size: 12px; text-align: center; }
.spread { display: flex; justify-content: space-between; gap: 8px; padding: 3px 14px; margin: 2px 0; background: var(--se-surface); color: var(--se-text-2); font-size: 11px; }

.menu { position: absolute; z-index: 20; top: 50px; left: 10px; right: 10px; max-height: 320px; overflow: auto; background: var(--se-surface-2); border: 1px solid var(--se-border-strong); border-radius: 8px; box-shadow: 0 16px 40px rgba(0,0,0,.6); padding: 6px; }
.menu input { width: 100%; background: var(--se-input); border: 1px solid transparent; border-radius: var(--se-radius); padding: 8px 10px; margin-bottom: 6px; outline: none; }
.menu-row { display: grid; grid-template-columns: 1fr auto auto; gap: 10px; align-items: center; width: 100%; text-align: left; padding: 7px 8px; border-radius: var(--se-radius-sm); }
.menu-row:hover, .menu-row.on { background: var(--se-input); }
.menu-row .n { font-weight: 600; }
.menu-row .menu-id { display: flex; align-items: center; gap: 10px; min-width: 0; }
.menu-row .menu-id .coin { width: 24px; height: 24px; }
.menu-row .t { font-size: 11px; color: var(--se-muted); }
.menu.inl { position: relative; top: auto; left: 0; right: 0; margin-top: -6px; }
.menu.inl .menu-row { grid-template-columns: 1fr; }
.confirm { display: grid; gap: 8px; padding: 9px 10px; border-radius: var(--se-radius); background: var(--se-surface-2); border: 1px solid var(--se-border-strong); font-size: 12px; line-height: 1.45; color: var(--se-text-soft); }
.confirm-a { display: flex; justify-content: flex-end; flex-wrap: wrap; gap: 6px; }
.confirm-a .mini { margin-left: 0; }

/* ---------- ticket ---------- */
.ticket { padding: 12px 14px 14px; display: grid; gap: 10px; }
.pills { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.pill { height: 32px; border-radius: var(--se-radius); background: var(--se-raised); font-weight: 600; font-size: 13px; display: flex; align-items: center; justify-content: center; gap: 4px; min-width: 0; white-space: nowrap; }
.pill-k { color: var(--se-text-2); font-weight: 500; font-size: 11.5px; }
.pill:hover:not(:disabled) { background: #2e2e2e; }
.pillx { display: flex; align-items: center; min-width: 0; border-radius: var(--se-radius); background: var(--se-raised); }
.pillx .pill, .pillx .pill:hover:not(:disabled) { flex: 1; background: none; }
.pillx:has(.pill:hover:not(:disabled)) { background: #2e2e2e; }
.pillx .pill:disabled { color: var(--se-text-soft); }
.pillx .info { margin: 0 9px 0 0; }
.levs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; padding: 0 4px 4px; }
.levs .pill { height: auto; padding: 5px 0 4px; flex-direction: column; gap: 0; line-height: 1.25; }
.levs .pill.on { background: rgba(var(--se-accent-rgb), .18); color: var(--se-accent); }
.levs .lq { font-size: 10.5px; font-weight: 500; color: var(--se-text-2); }
.tabs { display: flex; gap: 18px; border-bottom: 1px solid var(--se-border); }
.tab { padding: 6px 0 8px; color: var(--se-text-2); font-weight: 500; border-bottom: 2px solid transparent; margin-bottom: -1px; }
.tab.on { color: var(--se-text); border-bottom-color: var(--se-accent); }
.seg { display: grid; grid-template-columns: 1fr 1fr; background: var(--se-raised); border-radius: var(--se-radius); padding: 2px; }
.seg button { height: 32px; border-radius: 5px; font-weight: 600; color: var(--se-text); }
.seg .long.on { background: rgba(var(--se-accent-rgb), .22); color: var(--se-accent); }
.seg .short.on { background: rgba(var(--se-neg-rgb), .22); color: var(--se-neg); }
.kv { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; font-size: 12.5px; }
.kv .k { color: var(--se-text-2); }
.kv .v { color: var(--se-text); font-weight: 500; text-align: right; }
.field { display: flex; align-items: center; height: 40px; background: var(--se-input); border-radius: var(--se-radius); padding: 0 10px; border: 1px solid transparent; }
.field:focus-within { border-color: rgba(var(--se-accent-rgb), .55); }
.field label { color: var(--se-text-2); margin-right: 8px; white-space: nowrap; }
.field input { flex: 1; min-width: 0; background: none; border: 0; outline: none; text-align: right; font-family: var(--se-num); font-variant-numeric: tabular-nums; font-size: 14px; }
.field .unit { margin-left: 8px; font-weight: 600; color: var(--se-text-soft); }
.field input::placeholder { color: rgba(255,255,255,.35); }
.slider-row { display: grid; grid-template-columns: 1fr 64px auto; gap: 10px; align-items: center; }
.slider-row .info { margin-left: -2px; }
.slider { position: relative; height: 18px; }
.slider input { position: absolute; inset: 0; width: 100%; opacity: 0; cursor: pointer; margin: 0; }
.slider .track { position: absolute; left: 0; right: 0; top: 8px; height: 3px; background: #2f2f2f; border-radius: 2px; }
.slider .fill { position: absolute; left: 0; top: 8px; height: 3px; background: var(--se-accent); border-radius: 2px; }
.slider .tick { position: absolute; top: 6px; width: 7px; height: 7px; margin-left: -3.5px; border-radius: 50%; background: #3a3a3a; }
.slider .tick.on { background: var(--se-accent); }
.slider .knob { position: absolute; top: 2px; width: 14px; height: 14px; margin-left: -7px; border-radius: 50%; border: 2px solid var(--se-accent); background: var(--se-bg); pointer-events: none; }
.pct { height: 32px; border: 1px solid var(--se-border-strong); border-radius: var(--se-radius); display: flex; align-items: center; gap: 3px; padding: 0 8px; font-weight: 600; cursor: text; }
.pct:focus-within { border-color: rgba(var(--se-accent-rgb), .6); }
.pct input { flex: 1; min-width: 0; width: 100%; background: transparent; border: 0; outline: none; padding: 0; text-align: right; font: inherit; color: inherit; }
.connect-strip { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 10px 14px; border-bottom: 1px solid var(--se-border); font-size: 13px; color: var(--se-text-2); }
.connect-strip .mini { margin-left: 0; flex: none; height: 30px; padding: 0 14px; border-radius: 999px; font-size: 12.5px; font-weight: 600; }
.connect-strip .mini.go { background: var(--se-accent); color: var(--se-accent-ink); }
.connect-strip .mini.go:hover { filter: brightness(1.06); }
.checks { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 18px; }
.checks .helper { font-size: 11.5px; }
.linkbtn.adv { margin-left: auto; display: inline-flex; align-items: center; gap: 3px; font-size: 12px; text-decoration: none; }
.linkbtn.adv[aria-expanded="true"] svg { transform: rotate(180deg); }
.linkbtn:disabled { opacity: .55; cursor: default; }
.linkbtn.dep { margin-left: 8px; font-size: 12px; color: var(--se-accent); text-decoration: none; }
.check { display: inline-flex; align-items: center; gap: 8px; font-weight: 500; cursor: pointer; user-select: none; }
.check .box { width: 15px; height: 15px; border: 1.5px solid #5a5a5a; border-radius: 3px; display: grid; place-items: center; }
.check.on .box { background: var(--se-accent); border-color: var(--se-accent); }
.tpsl { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.tpsl .field { height: 36px; }
.cta { min-height: 40px; padding: 5px 10px; line-height: 1.25; border-radius: var(--se-radius); background: var(--se-accent); color: var(--se-accent-ink); font-weight: 600; font-size: 14px; width: 100%; transition: filter .15s; }
.cta:hover:not(:disabled) { filter: brightness(1.06); }
.cta.short { background: var(--se-neg); color: #fff; }
.cta:disabled { opacity: .45; }
.cta.ghost { background: transparent; color: var(--se-accent); border: 1px solid rgba(var(--se-accent-rgb), .55); }
.cta.caution { background: var(--se-gold); color: #1a0f00; }
.durs { align-items: center; flex-wrap: wrap; }
.durs .lbl { color: var(--se-text-2); margin-right: auto; font-size: 12.5px; }
.durs button { height: 26px; font-size: 12px; background: var(--se-input); }
.details { display: grid; gap: 6px; padding-top: 2px; }
.warn { position: relative; font-size: 12px; line-height: 1.4; padding: 8px 10px 8px 34px; border-radius: var(--se-radius); background: rgba(255,69,58,.12); border: 1px solid rgba(255,69,58,.3); color: #ffd0cc; }
.warn::before { content: ""; position: absolute; left: 10px; top: 8px; width: 16px; height: 16px; background: #ff453a; -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 4 3 20h18L12 4z'/%3E%3Cpath d='M12 10v4.5'/%3E%3Ccircle cx='12' cy='17.2' r='1.1' fill='%23000' stroke='none'/%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 4 3 20h18L12 4z'/%3E%3Cpath d='M12 10v4.5'/%3E%3Ccircle cx='12' cy='17.2' r='1.1' fill='%23000' stroke='none'/%3E%3C/svg%3E") center / contain no-repeat; }
.note { font-size: 12px; line-height: 1.45; padding: 8px 10px; border-radius: var(--se-radius); background: rgba(var(--se-accent-rgb), .07); color: var(--se-text-soft); }
.note b, .warn b { color: var(--se-text); }

/* ---------- bottom tabs / tables ---------- */
.lower { border-top: 1px solid var(--se-border); }
.lower .tabs { padding: 0 14px; gap: 16px; overflow-x: auto; scrollbar-width: none; }
.lower .tabs::-webkit-scrollbar { display: none; }
.ticket > *, .ticket .field, .ticket .durs { min-width: 0; }
@container (max-width: 360px) {
  .lower .tabs { flex-wrap: wrap; overflow: visible; column-gap: 12px; }
  .durs .lbl { flex-basis: 100%; margin-bottom: 4px; }
}
.lower .tab { flex: none; white-space: nowrap; }
.list { padding: 6px 14px 12px; display: grid; gap: 8px; min-height: 64px; }
.empty { color: var(--se-muted); text-align: center; padding: 14px 0 6px; font-size: 12.5px; }
.row { border: 1px solid var(--se-border); border-radius: 8px; padding: 9px 10px; display: grid; gap: 4px; }
.row-h { display: flex; align-items: center; gap: 8px; font-weight: 600; }
.badge { font-size: 11px; font-weight: 600; padding: 1px 6px; border-radius: 4px; }
.badge.long { background: rgba(var(--se-accent-rgb), .15); color: var(--se-accent); }
.badge.short { background: rgba(var(--se-neg-rgb), .15); color: var(--se-neg); }
.row-g { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px 8px; font-size: 12px; }
.row-g .k { color: var(--se-text-2); font-size: 11px; }
.pos-t { min-width: 0; }
.pos-t .muted { font-weight: 500; }
.row-g.pos-g { grid-template-columns: repeat(2, 1fr); }
.pos-g .wide { grid-column: 1 / -1; }
.of { font-family: var(--se-font); font-size: 11.5px; color: var(--se-text-2); letter-spacing: 0; }
.row.flash, .field.flash { animation: flash 1.5s ease-out; }
.chart-note { position: absolute; left: 8px; right: 60px; top: 34px; font-size: 11.5px; color: var(--se-text-2); background: rgba(10,10,10,.78); padding: 4px 8px; border-radius: var(--se-radius-sm); pointer-events: none; }
@keyframes flash { 0%, 35% { background: rgba(var(--se-accent-rgb), .13); border-color: rgba(var(--se-accent-rgb), .6); } 100% { background: transparent; border-color: var(--se-border); } }
.mini { height: 26px; padding: 0 10px; border-radius: var(--se-radius-sm); background: var(--se-raised); font-weight: 600; font-size: 12px; margin-left: auto; }
.mini:hover:not(:disabled) { background: #303030; }
.mini.go { background: rgba(var(--se-accent-rgb), .18); color: var(--se-accent); }
.mini.danger { background: rgba(var(--se-neg-rgb), .2); color: #fda4b4; }
.mini.more { margin: 0 auto; }
.list-h { display: flex; align-items: center; font-size: 12px; }
.r { margin-left: auto; }
.t { font-size: 11.5px; }
.chips { flex-wrap: wrap; }
.chips button { font-size: 12px; }
.hrow { padding: 7px 0; border-bottom: 1px solid var(--se-border); display: grid; gap: 2px; font-size: 12.5px; }
.hrow .row-h { font-weight: 600; min-width: 0; }
.hrow .num.r { font-weight: 500; white-space: nowrap; }
.prog { height: 4px; border-radius: 2px; background: #2a2a2a; overflow: hidden; }
.prog span { display: block; height: 100%; background: var(--se-accent); }
.risk { display: flex; align-items: center; gap: 8px; font-size: 12.5px; }
.risk .k { color: var(--se-text-2); white-space: nowrap; }
.meter { flex: 1; min-width: 30px; height: 5px; border-radius: 3px; background: #2a2a2a; overflow: hidden; }
.meter span { display: block; height: 100%; background: var(--se-accent); }
.meter .lv-warn { background: var(--se-gold); } .meter .lv-danger { background: var(--se-neg); }
.mgrid { grid-template-columns: repeat(2, 1fr); gap: 6px 12px; }
.vaults { display: grid; gap: 4px; padding-top: 8px; border-top: 1px solid var(--se-border); }
.vaults .row-h { font-size: 12.5px; }
.vaults .linkbtn { font-size: 11.5px; font-weight: 400; }
.vault { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; gap: 10px; align-items: center; padding: 6px 8px; margin: 0 -8px; border-radius: var(--se-radius-sm); color: inherit; text-decoration: none; font-size: 12px; }
.vault:hover { background: var(--se-input); }
.vn { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* ---------- footer ---------- */
.foot { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px; padding: 8px 14px; border-top: 1px solid var(--se-border); font-size: 11.5px; color: var(--se-text-2); }
.foot > * { white-space: nowrap; }
.dot { flex: none; display: inline-block; width: 14px; height: 10px; background: var(--se-accent); -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 10'%3E%3Cpath d='M1 5h2.6l1.9-3.6 3 7.2L10.4 5H13' fill='none' stroke='%23000' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 10'%3E%3Cpath d='M1 5h2.6l1.9-3.6 3 7.2L10.4 5H13' fill='none' stroke='%23000' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat; }
.dot.test { background: var(--se-gold); }
.foot .brand { margin-left: auto; }
.foot .brand b { color: var(--se-text); font-weight: 600; }
.foot a { color: inherit; text-decoration: none; }
.foot a:hover { color: var(--se-text); }
.acct { display: inline-flex; align-items: center; gap: 6px; }
.linkbtn { color: var(--se-text-2); text-decoration: underline; text-underline-offset: 2px; }
.linkbtn:hover { color: var(--se-text); }

/* ---------- modal ---------- */
.overlay { position: absolute; inset: 0; z-index: 30; background: rgba(0,0,0,.72); backdrop-filter: blur(3px); display: grid; align-items: end; }
.sheet { background: var(--se-surface); border-top: 1px solid var(--se-border-strong); border-radius: 12px 12px 0 0; padding: 16px 16px 18px; display: grid; gap: 12px; max-height: 100%; overflow: auto; animation: rise .18s ease-out; }
@keyframes rise { from { transform: translateY(14px); opacity: .4; } to { transform: none; opacity: 1; } }
.sheet h3 { margin: 0; font-size: 16px; font-weight: 600; display: flex; align-items: center; }
.sheet h3 .x { margin-left: auto; color: var(--se-text-2); font-size: 18px; line-height: 1; padding: 2px 4px; }
.sheet p { margin: 0; color: var(--se-text-2); font-size: 12.5px; line-height: 1.5; }
.wallets { display: grid; gap: 6px; }
.wallet { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; background: var(--se-input); font-weight: 600; text-align: left; }
.wallet:hover { background: var(--se-input-hover); }
.wallet img { width: 22px; height: 22px; border-radius: 5px; }
.steps { display: grid; gap: 8px; }
.step { display: flex; gap: 10px; align-items: center; font-size: 12.5px; color: var(--se-text-2); }
.step .s { width: 18px; height: 18px; border-radius: 50%; border: 1.5px solid #4a4a4a; display: grid; place-items: center; font-size: 10px; flex: none; }
.step.done { color: var(--se-text); }
.step.done .s { background: var(--se-accent); border-color: var(--se-accent); color: var(--se-accent-ink); }
.step.active { color: var(--se-text); }
.step.active .s { border-color: var(--se-accent); }
.spin { width: 12px; height: 12px; border: 2px solid rgba(var(--se-accent-rgb), .25); border-top-color: var(--se-accent); border-radius: 50%; animation: spin .8s linear infinite; display: inline-block; vertical-align: -2px; }
@keyframes spin { to { transform: rotate(360deg); } }
.consent { font-family: var(--se-mono); font-size: 11px; white-space: pre-wrap; background: var(--se-bg); border: 1px solid var(--se-border); border-radius: 6px; padding: 8px; color: var(--se-text-2); max-height: 120px; overflow: auto; }
.addr { font-family: var(--se-mono); font-size: 11.5px; word-break: break-all; color: var(--se-text-soft); }

/* ---------- toast ---------- */
.toast { position: fixed; z-index: 2147483000; left: 50%; transform: translateX(-50%); width: min(360px, calc(100vw - 24px)); bottom: 16px; padding: 10px 12px; border-radius: 8px; background: var(--se-surface-2); border: 1px solid var(--se-border-strong); box-shadow: 0 10px 30px rgba(0,0,0,.5); font-size: 12.5px; display: flex; gap: 8px; align-items: flex-start; animation: rise .18s ease-out; }
.ticket-msg { font-size: 12.5px; padding: 8px 10px; border-radius: var(--se-radius); line-height: 1.4; }
.ticket-msg.ok { background: rgba(var(--se-accent-rgb), .1); color: var(--se-accent); }
.ticket-msg.err { background: rgba(var(--se-neg-rgb), .12); color: #fda4b4; }
.toast.ok { border-color: rgba(var(--se-accent-rgb), .45); }
.toast.err { border-color: rgba(var(--se-neg-rgb), .5); }
.toast .x { margin-left: auto; color: var(--se-text-2); }

@container (max-width: 340px) {
  .stats { grid-template-columns: repeat(2, 1fr); }
  .row-g { grid-template-columns: repeat(2, 1fr); }
  .views { padding: 0 10px; gap: 4px; }
  .vtabs button { padding: 0 6px; }
  .ivs button { padding: 0 4px; }
  .book-cap { padding: 2px 10px 4px; }
  .seg-hint .w { display: none; }
  .lower .tabs { gap: 12px; }
  .lvl { padding: 0 10px; gap: 6px; }
}
@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
`
), su = "0.2.0", au = ["builder-code", "fee-bps", "max-fee-bps", "market", "network", "partner-id", "partner-api", "max-leverage", "persist", "referral-code", "width", "side", "variant", "layout", "closable", "height", "screen", "amount", "chart", "network-badge", "leverage"];
function Za(t = nu, n = "font") {
  if (document.querySelector(`link[data-strike-everywhere-${n}]`)) return;
  const i = document.createElement("link");
  i.rel = "stylesheet", i.href = t, i.setAttribute(`data-strike-everywhere-${n}`, ""), document.head.appendChild(i);
}
class Ps extends HTMLElement {
  constructor() {
    super(...arguments);
    ee(this, "root", null);
    ee(this, "teardown", null);
  }
  connectedCallback() {
    if (Za(), this.teardown && clearTimeout(this.teardown), this.teardown = null, !this.root) {
      this.root = this.attachShadow({ mode: "open" });
      const i = document.createElement("style");
      i.textContent = ru + tu, this.root.appendChild(i);
      const r = document.createElement("div");
      r.className = "se-mount", this.root.appendChild(r);
      for (const s of ["keydown", "keyup", "keypress"]) this.root.addEventListener(s, (a) => a.stopPropagation());
    }
    this.renderApp();
  }
  disconnectedCallback() {
    this.teardown && clearTimeout(this.teardown), this.teardown = setTimeout(() => {
      this.teardown = null;
      const i = this.root?.lastElementChild;
      i && !this.isConnected && ji(null, i);
    }, 0);
  }
  attributeChangedCallback() {
    this.root && this.isConnected && this.renderApp();
  }
  config() {
    const i = this.getAttribute("builder-code")?.trim();
    if (!i) return 'Missing required attribute: builder-code="your-strike-builder-code"';
    const r = (l, d) => {
      const p = this.getAttribute(l);
      if (p === null || p.trim() === "") return d;
      const u = Number(p);
      return Number.isFinite(u) ? u : d;
    }, s = (l) => (this.getAttribute(l) ?? "").trim().toLowerCase(), a = s("network") === "testnet" ? "testnet" : "mainnet", o = r("fee-bps", 5);
    return {
      builderCode: i,
      network: a,
      feeBps: o,
      maxFeeBps: r("max-fee-bps", o),
      market: (this.getAttribute("market") || "ADA-USD").trim().toUpperCase(),
      partnerId: this.getAttribute("partner-id") || void 0,
      partnerApi: this.getAttribute("partner-api") || void 0,
      referralCode: this.getAttribute("referral-code") || void 0,
      maxLeverage: Math.max(1, r("max-leverage", 10)),
      persist: s("persist") === "session" ? "session" : "memory",
      side: s("side") === "sell" ? "sell" : "buy",
      amount: r("amount", 0) > 0 ? r("amount", 0) : void 0,
      leverage: r("leverage", 0) >= 1 ? Math.round(r("leverage", 0)) : void 0,
      chart: s("chart") !== "off",
      networkBadge: s("network-badge") !== "off"
    };
  }
  renderApp() {
    const i = this.root.lastElementChild, r = (l, d) => {
      const p = this.getAttribute(l)?.trim();
      p ? this.style.setProperty(d, /^\d+(\.\d+)?$/.test(p) ? `${p}px` : p) : this.style.removeProperty(d);
    };
    r("width", "--se-width"), r("height", "--se-height");
    const s = (this.getAttribute("variant") ?? "").trim().toLowerCase(), a = this.config();
    if (typeof a == "string") {
      ji(
        /* @__PURE__ */ e("div", { class: "card", children: /* @__PURE__ */ e("div", { class: "ticket", children: /* @__PURE__ */ e("div", { class: "warn", children: a }) }) }),
        i
      );
      return;
    }
    const o = [s, a.network, a.builderCode, a.feeBps, a.maxFeeBps, a.partnerApi, a.partnerId, a.referralCode, a.persist].join("|");
    if (s === "app") {
      Za(iu, "app-font");
      const l = (this.getAttribute("layout") ?? "").trim().toLowerCase(), d = { ...a, layout: l === "mobile" || l === "desktop" || l === "panel" ? l : "auto", closable: this.hasAttribute("closable") };
      ji(/* @__PURE__ */ e(eu, { config: d, host: this, screen: this.getAttribute("screen") ?? void 0 }, o), i);
      return;
    }
    ji(/* @__PURE__ */ e($d, { config: a }, o), i);
  }
}
ee(Ps, "observedAttributes", [...au]);
typeof customElements < "u" && !customElements.get("strike-trade") && customElements.define("strike-trade", Ps);
typeof window < "u" && (window.StrikeEverywhere = Object.assign(window.StrikeEverywhere ?? {}, { VERSION: su, Client: Li, Element: Ps }));
export {
  Li as StrikeEverywhere,
  Ps as StrikeTradeElement,
  su as VERSION
};
//# sourceMappingURL=strike-everywhere.js.map
