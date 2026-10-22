var pl = Object.defineProperty;
var ul = (t, n, i) => n in t ? pl(t, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[n] = i;
var re = (t, n, i) => ul(t, typeof n != "symbol" ? n + "" : n, i);
var ur, Te, eo, Cn, ta, to, Xr, as, Zr, Jr, Ci = {}, no = [], hl = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, os = Array.isArray;
function xn(t, n) {
  for (var i in n) t[i] = n[i];
  return t;
}
function io(t) {
  t && t.parentNode && t.parentNode.removeChild(t);
}
function ml(t, n, i) {
  var r, s, a, o = {};
  for (a in n) a == "key" ? r = n[a] : a == "ref" ? s = n[a] : o[a] = n[a];
  if (arguments.length > 2 && (o.children = arguments.length > 3 ? ur.call(arguments, 2) : i), typeof t == "function" && t.defaultProps != null) for (a in t.defaultProps) o[a] === void 0 && (o[a] = t.defaultProps[a]);
  return Zi(t, o, r, s, null);
}
function Zi(t, n, i, r, s) {
  var a = { type: t, props: n, key: i, ref: r, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: s ?? ++eo, __i: -1, __u: 0 };
  return s == null && Te.vnode != null && Te.vnode(a), a;
}
function U(t) {
  return t.children;
}
function Ji(t, n) {
  this.props = t, this.context = n;
}
function Vn(t, n) {
  if (n == null) return t.__ ? Vn(t.__, t.__i + 1) : null;
  for (var i; n < t.__k.length; n++) if ((i = t.__k[n]) != null && i.__e != null) return i.__e;
  return typeof t.type == "function" ? Vn(t) : null;
}
function ro(t) {
  var n, i;
  if ((t = t.__) != null && t.__c != null) {
    for (t.__e = t.__c.base = null, n = 0; n < t.__k.length; n++) if ((i = t.__k[n]) != null && i.__e != null) {
      t.__e = t.__c.base = i.__e;
      break;
    }
    return ro(t);
  }
}
function na(t) {
  (!t.__d && (t.__d = !0) && Cn.push(t) && !nr.__r++ || ta !== Te.debounceRendering) && ((ta = Te.debounceRendering) || to)(nr);
}
function nr() {
  var t, n, i, r, s, a, o, c;
  for (Cn.sort(Xr); t = Cn.shift(); ) t.__d && (n = Cn.length, r = void 0, a = (s = (i = t).__v).__e, o = [], c = [], i.__P && ((r = xn({}, s)).__v = s.__v + 1, Te.vnode && Te.vnode(r), ls(i.__P, r, s, i.__n, i.__P.namespaceURI, 32 & s.__u ? [a] : null, o, a ?? Vn(s), !!(32 & s.__u), c), r.__v = s.__v, r.__.__k[r.__i] = r, oo(o, r, c), r.__e != a && ro(r)), Cn.length > n && Cn.sort(Xr));
  nr.__r = 0;
}
function so(t, n, i, r, s, a, o, c, d, p, u) {
  var l, h, m, f, k, y = r && r.__k || no, _ = n.length;
  for (i.__d = d, gl(i, n, y), d = i.__d, l = 0; l < _; l++) (m = i.__k[l]) != null && (h = m.__i === -1 ? Ci : y[m.__i] || Ci, m.__i = l, ls(t, m, h, s, a, o, c, d, p, u), f = m.__e, m.ref && h.ref != m.ref && (h.ref && cs(h.ref, null, m), u.push(m.ref, m.__c || f, m)), k == null && f != null && (k = f), 65536 & m.__u || h.__k === m.__k ? d = ao(m, d, t) : typeof m.type == "function" && m.__d !== void 0 ? d = m.__d : f && (d = f.nextSibling), m.__d = void 0, m.__u &= -196609);
  i.__d = d, i.__e = k;
}
function gl(t, n, i) {
  var r, s, a, o, c, d = n.length, p = i.length, u = p, l = 0;
  for (t.__k = [], r = 0; r < d; r++) (s = n[r]) != null && typeof s != "boolean" && typeof s != "function" ? (o = r + l, (s = t.__k[r] = typeof s == "string" || typeof s == "number" || typeof s == "bigint" || s.constructor == String ? Zi(null, s, null, null, null) : os(s) ? Zi(U, { children: s }, null, null, null) : s.constructor === void 0 && s.__b > 0 ? Zi(s.type, s.props, s.key, s.ref ? s.ref : null, s.__v) : s).__ = t, s.__b = t.__b + 1, a = null, (c = s.__i = fl(s, i, o, u)) !== -1 && (u--, (a = i[c]) && (a.__u |= 131072)), a == null || a.__v === null ? (c == -1 && l--, typeof s.type != "function" && (s.__u |= 65536)) : c !== o && (c == o - 1 ? l-- : c == o + 1 ? l++ : (c > o ? l-- : l++, s.__u |= 65536))) : s = t.__k[r] = null;
  if (u) for (r = 0; r < p; r++) (a = i[r]) != null && !(131072 & a.__u) && (a.__e == t.__d && (t.__d = Vn(a)), lo(a, a));
}
function ao(t, n, i) {
  var r, s;
  if (typeof t.type == "function") {
    for (r = t.__k, s = 0; r && s < r.length; s++) r[s] && (r[s].__ = t, n = ao(r[s], n, i));
    return n;
  }
  t.__e != n && (n && t.type && !i.contains(n) && (n = Vn(t)), i.insertBefore(t.__e, n || null), n = t.__e);
  do
    n = n && n.nextSibling;
  while (n != null && n.nodeType === 8);
  return n;
}
function fl(t, n, i, r) {
  var s = t.key, a = t.type, o = i - 1, c = i + 1, d = n[i];
  if (d === null || d && s == d.key && a === d.type && !(131072 & d.__u)) return i;
  if (r > (d != null && !(131072 & d.__u) ? 1 : 0)) for (; o >= 0 || c < n.length; ) {
    if (o >= 0) {
      if ((d = n[o]) && !(131072 & d.__u) && s == d.key && a === d.type) return o;
      o--;
    }
    if (c < n.length) {
      if ((d = n[c]) && !(131072 & d.__u) && s == d.key && a === d.type) return c;
      c++;
    }
  }
  return -1;
}
function ia(t, n, i) {
  n[0] === "-" ? t.setProperty(n, i ?? "") : t[n] = i == null ? "" : typeof i != "number" || hl.test(n) ? i : i + "px";
}
function Vi(t, n, i, r, s) {
  var a;
  e: if (n === "style") if (typeof i == "string") t.style.cssText = i;
  else {
    if (typeof r == "string" && (t.style.cssText = r = ""), r) for (n in r) i && n in i || ia(t.style, n, "");
    if (i) for (n in i) r && i[n] === r[n] || ia(t.style, n, i[n]);
  }
  else if (n[0] === "o" && n[1] === "n") a = n !== (n = n.replace(/(PointerCapture)$|Capture$/i, "$1")), n = n.toLowerCase() in t || n === "onFocusOut" || n === "onFocusIn" ? n.toLowerCase().slice(2) : n.slice(2), t.l || (t.l = {}), t.l[n + a] = i, i ? r ? i.u = r.u : (i.u = as, t.addEventListener(n, a ? Jr : Zr, a)) : t.removeEventListener(n, a ? Jr : Zr, a);
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
function ra(t) {
  return function(n) {
    if (this.l) {
      var i = this.l[n.type + t];
      if (n.t == null) n.t = as++;
      else if (n.t < i.u) return;
      return i(Te.event ? Te.event(n) : n);
    }
  };
}
function ls(t, n, i, r, s, a, o, c, d, p) {
  var u, l, h, m, f, k, y, _, w, T, $, v, C, S, q, x, z = n.type;
  if (n.constructor !== void 0) return null;
  128 & i.__u && (d = !!(32 & i.__u), a = [c = n.__e = i.__e]), (u = Te.__b) && u(n);
  e: if (typeof z == "function") try {
    if (_ = n.props, w = "prototype" in z && z.prototype.render, T = (u = z.contextType) && r[u.__c], $ = u ? T ? T.props.value : u.__ : r, i.__c ? y = (l = n.__c = i.__c).__ = l.__E : (w ? n.__c = l = new z(_, $) : (n.__c = l = new Ji(_, $), l.constructor = z, l.render = xl), T && T.sub(l), l.props = _, l.state || (l.state = {}), l.context = $, l.__n = r, h = l.__d = !0, l.__h = [], l._sb = []), w && l.__s == null && (l.__s = l.state), w && z.getDerivedStateFromProps != null && (l.__s == l.state && (l.__s = xn({}, l.__s)), xn(l.__s, z.getDerivedStateFromProps(_, l.__s))), m = l.props, f = l.state, l.__v = n, h) w && z.getDerivedStateFromProps == null && l.componentWillMount != null && l.componentWillMount(), w && l.componentDidMount != null && l.__h.push(l.componentDidMount);
    else {
      if (w && z.getDerivedStateFromProps == null && _ !== m && l.componentWillReceiveProps != null && l.componentWillReceiveProps(_, $), !l.__e && (l.shouldComponentUpdate != null && l.shouldComponentUpdate(_, l.__s, $) === !1 || n.__v === i.__v)) {
        for (n.__v !== i.__v && (l.props = _, l.state = l.__s, l.__d = !1), n.__e = i.__e, n.__k = i.__k, n.__k.some(function(N) {
          N && (N.__ = n);
        }), v = 0; v < l._sb.length; v++) l.__h.push(l._sb[v]);
        l._sb = [], l.__h.length && o.push(l);
        break e;
      }
      l.componentWillUpdate != null && l.componentWillUpdate(_, l.__s, $), w && l.componentDidUpdate != null && l.__h.push(function() {
        l.componentDidUpdate(m, f, k);
      });
    }
    if (l.context = $, l.props = _, l.__P = t, l.__e = !1, C = Te.__r, S = 0, w) {
      for (l.state = l.__s, l.__d = !1, C && C(n), u = l.render(l.props, l.state, l.context), q = 0; q < l._sb.length; q++) l.__h.push(l._sb[q]);
      l._sb = [];
    } else do
      l.__d = !1, C && C(n), u = l.render(l.props, l.state, l.context), l.state = l.__s;
    while (l.__d && ++S < 25);
    l.state = l.__s, l.getChildContext != null && (r = xn(xn({}, r), l.getChildContext())), w && !h && l.getSnapshotBeforeUpdate != null && (k = l.getSnapshotBeforeUpdate(m, f)), so(t, os(x = u != null && u.type === U && u.key == null ? u.props.children : u) ? x : [x], n, i, r, s, a, o, c, d, p), l.base = n.__e, n.__u &= -161, l.__h.length && o.push(l), y && (l.__E = l.__ = null);
  } catch (N) {
    if (n.__v = null, d || a != null) {
      for (n.__u |= d ? 160 : 128; c && c.nodeType === 8 && c.nextSibling; ) c = c.nextSibling;
      a[a.indexOf(c)] = null, n.__e = c;
    } else n.__e = i.__e, n.__k = i.__k;
    Te.__e(N, n, i);
  }
  else a == null && n.__v === i.__v ? (n.__k = i.__k, n.__e = i.__e) : n.__e = bl(i.__e, n, i, r, s, a, o, d, p);
  (u = Te.diffed) && u(n);
}
function oo(t, n, i) {
  n.__d = void 0;
  for (var r = 0; r < i.length; r++) cs(i[r], i[++r], i[++r]);
  Te.__c && Te.__c(n, t), t.some(function(s) {
    try {
      t = s.__h, s.__h = [], t.some(function(a) {
        a.call(s);
      });
    } catch (a) {
      Te.__e(a, s.__v);
    }
  });
}
function bl(t, n, i, r, s, a, o, c, d) {
  var p, u, l, h, m, f, k, y = i.props, _ = n.props, w = n.type;
  if (w === "svg" ? s = "http://www.w3.org/2000/svg" : w === "math" ? s = "http://www.w3.org/1998/Math/MathML" : s || (s = "http://www.w3.org/1999/xhtml"), a != null) {
    for (p = 0; p < a.length; p++) if ((m = a[p]) && "setAttribute" in m == !!w && (w ? m.localName === w : m.nodeType === 3)) {
      t = m, a[p] = null;
      break;
    }
  }
  if (t == null) {
    if (w === null) return document.createTextNode(_);
    t = document.createElementNS(s, w, _.is && _), c && (Te.__m && Te.__m(n, a), c = !1), a = null;
  }
  if (w === null) y === _ || c && t.data === _ || (t.data = _);
  else {
    if (a = a && ur.call(t.childNodes), y = i.props || Ci, !c && a != null) for (y = {}, p = 0; p < t.attributes.length; p++) y[(m = t.attributes[p]).name] = m.value;
    for (p in y) if (m = y[p], p != "children") {
      if (p == "dangerouslySetInnerHTML") l = m;
      else if (!(p in _)) {
        if (p == "value" && "defaultValue" in _ || p == "checked" && "defaultChecked" in _) continue;
        Vi(t, p, null, m, s);
      }
    }
    for (p in _) m = _[p], p == "children" ? h = m : p == "dangerouslySetInnerHTML" ? u = m : p == "value" ? f = m : p == "checked" ? k = m : c && typeof m != "function" || y[p] === m || Vi(t, p, m, y[p], s);
    if (u) c || l && (u.__html === l.__html || u.__html === t.innerHTML) || (t.innerHTML = u.__html), n.__k = [];
    else if (l && (t.innerHTML = ""), so(t, os(h) ? h : [h], n, i, r, w === "foreignObject" ? "http://www.w3.org/1999/xhtml" : s, a, o, a ? a[0] : i.__k && Vn(i, 0), c, d), a != null) for (p = a.length; p--; ) io(a[p]);
    c || (p = "value", w === "progress" && f == null ? t.removeAttribute("value") : f !== void 0 && (f !== t[p] || w === "progress" && !f || w === "option" && f !== y[p]) && Vi(t, p, f, y[p], s), p = "checked", k !== void 0 && k !== t[p] && Vi(t, p, k, y[p], s));
  }
  return t;
}
function cs(t, n, i) {
  try {
    if (typeof t == "function") {
      var r = typeof t.__u == "function";
      r && t.__u(), r && n == null || (t.__u = t(n));
    } else t.current = n;
  } catch (s) {
    Te.__e(s, i);
  }
}
function lo(t, n, i) {
  var r, s;
  if (Te.unmount && Te.unmount(t), (r = t.ref) && (r.current && r.current !== t.__e || cs(r, null, n)), (r = t.__c) != null) {
    if (r.componentWillUnmount) try {
      r.componentWillUnmount();
    } catch (a) {
      Te.__e(a, n);
    }
    r.base = r.__P = null;
  }
  if (r = t.__k) for (s = 0; s < r.length; s++) r[s] && lo(r[s], n, i || typeof t.type != "function");
  i || io(t.__e), t.__c = t.__ = t.__e = t.__d = void 0;
}
function xl(t, n, i) {
  return this.constructor(t, i);
}
function Yi(t, n, i) {
  var r, s, a, o;
  Te.__ && Te.__(t, n), s = (r = !1) ? null : n.__k, a = [], o = [], ls(n, t = n.__k = ml(U, null, [t]), s || Ci, Ci, n.namespaceURI, s ? null : n.firstChild ? ur.call(n.childNodes) : null, a, s ? s.__e : n.firstChild, r, o), oo(a, t, o);
}
ur = no.slice, Te = { __e: function(t, n, i, r) {
  for (var s, a, o; n = n.__; ) if ((s = n.__c) && !s.__) try {
    if ((a = s.constructor) && a.getDerivedStateFromError != null && (s.setState(a.getDerivedStateFromError(t)), o = s.__d), s.componentDidCatch != null && (s.componentDidCatch(t, r || {}), o = s.__d), o) return s.__E = s;
  } catch (c) {
    t = c;
  }
  throw t;
} }, eo = 0, Ji.prototype.setState = function(t, n) {
  var i;
  i = this.__s != null && this.__s !== this.state ? this.__s : this.__s = xn({}, this.state), typeof t == "function" && (t = t(xn({}, i), this.props)), t && xn(i, t), t != null && this.__v && (n && this._sb.push(n), na(this));
}, Ji.prototype.forceUpdate = function(t) {
  this.__v && (this.__e = !0, t && this.__h.push(t), na(this));
}, Ji.prototype.render = U, Cn = [], to = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Xr = function(t, n) {
  return t.__v.__b - n.__v.__b;
}, nr.__r = 0, as = 0, Zr = ra(!1), Jr = ra(!0);
var vl = 0;
function e(t, n, i, r, s, a) {
  n || (n = {});
  var o, c, d = n;
  "ref" in n && (o = n.ref, delete n.ref);
  var p = { type: t, props: d, key: i, ref: o, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: --vl, __i: -1, __u: 0, __source: s, __self: a };
  if (typeof t == "function" && (o = t.defaultProps)) for (c in o) d[c] === void 0 && (d[c] = o[c]);
  return Te.vnode && Te.vnode(p), p;
}
const kl = {
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
}, Wt = 100, yl = 100;
function kn(t) {
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
const An = (t) => new TextEncoder().encode(t);
function ir(...t) {
  const n = new Uint8Array(t.reduce((r, s) => r + s.length, 0));
  let i = 0;
  for (const r of t)
    n.set(r, i), i += r.length;
  return n;
}
async function wl(t) {
  const n = typeof t == "string" ? An(t) : t, i = await globalThis.crypto.subtle.digest("SHA-256", n);
  return ct(new Uint8Array(i));
}
function Dt() {
  return globalThis.crypto.randomUUID();
}
function hr(t) {
  if (!isFinite(t) || t <= 0) return 8;
  const n = t.toString();
  return n.includes("e-") ? Number(n.split("e-")[1]) : (n.split(".")[1] ?? "").length;
}
function me(t, n, i = "round") {
  const r = hr(n), s = t / n;
  return ((i === "floor" ? Math.floor(s + 1e-9) : i === "ceil" ? Math.ceil(s - 1e-9) : Math.round(s)) * n).toFixed(r);
}
function be(t, n = {}) {
  if (!isFinite(t)) return "—";
  const i = n.decimals ?? (Math.abs(t) >= 1e3 ? 0 : 2), r = Math.abs(t).toLocaleString("en-US", { minimumFractionDigits: i, maximumFractionDigits: i });
  return `${t < 0 ? "-" : n.sign && t > 0 ? "+" : ""}$${r}`;
}
function $e(t, n) {
  if (!isFinite(t)) return "—";
  const i = n ? hr(n) : t >= 1e3 ? 2 : t >= 1 ? 4 : 5;
  return t.toLocaleString("en-US", { minimumFractionDigits: i, maximumFractionDigits: i });
}
function Qr(t, n = 2) {
  return isFinite(t) ? `${t > 0 ? "+" : ""}${t.toFixed(n)}%` : "—";
}
function mr(t) {
  const n = Number(t.iso_balance);
  return t.margin_mode === "isolated" && n > 0 ? n : Math.abs(Number(t.size)) * Number(t.entry_price) / Math.max(1, Number(t.leverage) || 1);
}
function co(t, n) {
  const i = [...t].sort((r, s) => Number(r.max_notional) - Number(s.max_notional));
  return i.find((r) => n <= Number(r.max_notional)) ?? i[i.length - 1];
}
function Yn(t, n) {
  return co(t, n)?.max_leverage ?? 1;
}
function po(t) {
  const n = co(t.tiers, t.notional), i = Number(n?.maintenance_margin_rate ?? 0.01), r = Number(n?.maintenance_amount ?? 0), s = t.notional / t.entry, a = t.notional / t.leverage;
  return t.side === "buy" ? Math.max(0, (s * t.entry - a - r) / (s * (1 - i))) : (a + s * t.entry + r) / (s * (1 + i));
}
function es(t) {
  const n = t.notional * t.takerRate, i = t.notional * t.builderFeeBps / 1e4, r = po({ side: t.side, entry: t.price, leverage: t.leverage, notional: t.notional, tiers: t.tiers });
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
function Pn(t) {
  return Number.isFinite(t) ? t.toLocaleString("en-US", { maximumFractionDigits: 8 }) : "—";
}
function Li(t, n) {
  if (!(t > 0) || !Number.isFinite(n)) return "";
  const i = (n - t) / t * 100, r = Math.abs(i), s = r < 10 ? r.toFixed(1) : r.toFixed(0);
  return `${Number(s) === 0 ? "" : i < 0 ? "−" : "+"}${s}%`;
}
function mi(t, n) {
  return t ? `${t > 0 ? "Long" : "Short"} ${Pn(Math.abs(t))} ${n}` : "";
}
function _l(t, n, i, r = !1) {
  const s = t + (n === "buy" ? i : -i);
  return r && Math.sign(s) !== Math.sign(t) || Math.abs(s) < 1e-12 ? 0 : s;
}
function ds(t, n) {
  if (t !== "buy" && t !== "sell") return "";
  const i = !!n;
  return t === "buy" ? i ? "Close Short" : "Open Long" : i ? "Close Long" : "Open Short";
}
function Sl(t) {
  if (!t.position || t.reduceOnly || !(t.size > 0)) return null;
  const n = t.position > 0;
  if (n === (t.side === "buy")) return null;
  const i = Math.abs(t.position), r = (t.step ?? 0) / 2 || i * 1e-9, s = n ? "Long" : "Short", a = (o) => `${Pn(o)} ${t.base}`;
  return t.size < i - r ? `This reduces your ${s} ${a(i)} to ${a(i - t.size)}.` : t.size <= i + r ? `This closes your ${s} ${a(i)}.` : `This closes your ${s} ${a(i)} and opens a ${n ? "Short" : "Long"} of ${a(t.size - i)}. To just exit, use Close in Positions.`;
}
function $l(t) {
  if (!(t.size > 0) || !(t.price > 0)) return null;
  const n = t.size * t.price;
  let i = `= ${Pn(t.size)} ${t.base} ≈ ${be(n)} · uses ${be(n / Math.max(1, t.leverage))} of your balance`;
  return t.step && t.step > 0 && Math.abs(n - t.usd) > 0.01 && (i += ` (rounded to Strike's ${Pn(t.step)} ${t.base} step)`), i;
}
function Cl(t) {
  const n = t.side === "buy", i = t.resting ? n ? "you'll buy" : "you'll sell" : n ? "you're buying" : "you're selling", r = `~${Pn(t.size)} ${t.base} (~${be(t.notional)})${t.when ?? ""}`;
  if (t.reduceOnly) return `Reduce-only: ${i} ${r}. It can only shrink your ${n ? "Short" : "Long"}, never open a new position.`;
  const s = be(t.margin);
  let a = `${t.leverage}x ${n ? "Long" : "Short"}: ${i} ${r} using ${s} of your balance. You gain if ${t.base} ${n ? "rises" : "falls"}.`;
  const o = t.liqPrice ?? 0;
  if (o > 0 && t.entry > 0) {
    const c = t.fmtPrice ?? ((d) => d.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    a += ` You'd be liquidated (losing that ${s}) if ${t.base} ${n ? "falls" : "rises"} to ~$${c(o)} (${Li(t.entry, o)}).`;
  }
  return a;
}
function Ml(t) {
  const n = `${t.side === "buy" ? "Long" : "Short"} ${t.base}`, i = [t.type === "twap" ? `TWAP ${n}` : n];
  return t.type === "limit" && t.price && i.push(`Limit @ ${t.price}`), t.type === "stop" && t.trigger && i.push(`Stop @ ${t.trigger}`), t.type === "stop_limit" && t.trigger && i.push(`Stop @ ${t.trigger}${t.price ? ` → Limit ${t.price}` : ""}`), t.notional && t.notional > 0 && i.push(be(t.notional)), i.join(" · ");
}
function ps(t) {
  if (!Number.isFinite(t) || t === 0) return "None now";
  const n = (Math.abs(t) * 100).toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
  return `${t > 0 ? "Longs" : "Shorts"} pay ${n}%/h`;
}
function zl(t) {
  const n = t.mark > 0 ? ` (~${be(Math.abs(t.size) * t.mark)})` : "", i = Number.isFinite(t.upnl) ? ` Est. profit/loss ${be(t.upnl, { sign: !0 })} before fees.` : "";
  return `Close ${mi(t.size, t.base)} at market${n}?${i}`;
}
/*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) */
const at = 2n ** 255n - 19n, vi = 2n ** 252n + 27742317777372353535851937790883648493n, sa = 0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an, aa = 0x6666666666666666666666666666666666666666666666666666666666666658n, Ki = {
  a: -1n,
  // where a=-1, d = -(121665/121666) == -(121665 * inv(121666)) mod P
  d: 37095705934669439343138083508754565189542113879843219016388785533085940283555n,
  h: 8
}, ot = (t = "") => {
  throw new Error(t);
}, uo = (t) => typeof t == "string", Tl = (t) => t instanceof Uint8Array || t != null && typeof t == "object" && t.constructor.name === "Uint8Array", Mi = (t, n) => (
  // is Uint8Array (of specific length)
  !Tl(t) || typeof n == "number" && n > 0 && t.length !== n ? ot("Uint8Array of valid length expected") : t
), Kn = (t) => new Uint8Array(t), Xn = (t, n) => Mi(uo(t) ? hs(t) : Kn(Mi(t)), n), se = (t, n = at) => {
  let i = t % n;
  return i >= 0n ? i : n + i;
}, oa = (t) => t instanceof wt ? t : ot("Point expected");
class wt {
  constructor(n, i, r, s) {
    this.ex = n, this.ey = i, this.ez = r, this.et = s;
  }
  static fromAffine(n) {
    return new wt(n.x, n.y, 1n, se(n.x * n.y));
  }
  static fromHex(n, i = !1) {
    const { d: r } = Ki;
    n = Xn(n, 32);
    const s = n.slice(), a = n[31];
    s[31] = a & -129;
    const o = ms(s);
    i && !(0n <= o && o < 2n ** 256n) && ot("bad y coord 1"), !i && !(0n <= o && o < at) && ot("bad y coord 2");
    const c = se(o * o), d = se(c - 1n), p = se(r * c + 1n);
    let { isValid: u, value: l } = Al(d, p);
    u || ot("bad y coordinate 3");
    const h = (l & 1n) === 1n, m = (a & 128) !== 0;
    return !i && l === 0n && m && ot("bad y coord 3"), m !== h && (l = se(-l)), new wt(l, o, 1n, se(l * o));
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
    const { ex: i, ey: r, ez: s } = this, { ex: a, ey: o, ez: c } = oa(n), d = se(i * c), p = se(a * s), u = se(r * c), l = se(o * s);
    return d === p && u === l;
  }
  is0() {
    return this.equals(gi);
  }
  negate() {
    return new wt(se(-this.ex), this.ey, this.ez, se(-this.et));
  }
  double() {
    const { ex: n, ey: i, ez: r } = this, { a: s } = Ki, a = se(n * n), o = se(i * i), c = se(2n * se(r * r)), d = se(s * a), p = n + i, u = se(se(p * p) - a - o), l = d + o, h = l - c, m = d - o, f = se(u * h), k = se(l * m), y = se(u * m), _ = se(h * l);
    return new wt(f, k, _, y);
  }
  add(n) {
    const { ex: i, ey: r, ez: s, et: a } = this, { ex: o, ey: c, ez: d, et: p } = oa(n), { a: u, d: l } = Ki, h = se(i * o), m = se(r * c), f = se(a * l * p), k = se(s * d), y = se((i + r) * (o + c) - h - m), _ = se(k - f), w = se(k + f), T = se(m - u * h), $ = se(y * _), v = se(w * T), C = se(y * T), S = se(_ * w);
    return new wt($, v, S, C);
  }
  mul(n, i = !0) {
    if (n === 0n)
      return i === !0 ? ot("cannot multiply by 0") : gi;
    if (typeof n == "bigint" && 0n < n && n < vi || ot("invalid scalar, must be < L"), !i && this.is0() || n === 1n)
      return this;
    if (this.equals(yn))
      return ql(n).p;
    let r = gi, s = yn;
    for (let a = this; n > 0n; a = a.double(), n >>= 1n)
      n & 1n ? r = r.add(a) : i && (s = s.add(a));
    return r;
  }
  multiply(n) {
    return this.mul(n);
  }
  // Aliases for compatibilty
  clearCofactor() {
    return this.mul(BigInt(Ki.h), !1);
  }
  // multiply by cofactor
  isSmallOrder() {
    return this.clearCofactor().is0();
  }
  // check if P is small order
  isTorsionFree() {
    let n = this.mul(vi / 2n, !1).double();
    return vi % 2n && (n = n.add(this)), n.is0();
  }
  toAffine() {
    const { ex: n, ey: i, ez: r } = this;
    if (this.equals(gi))
      return { x: 0n, y: 1n };
    const s = go(r);
    return se(r * s) !== 1n && ot("invalid inverse"), { x: se(n * s), y: se(i * s) };
  }
  toRawBytes() {
    const { x: n, y: i } = this.toAffine(), r = mo(i);
    return r[31] |= n & 1n ? 128 : 0, r;
  }
  toHex() {
    return us(this.toRawBytes());
  }
  // encode to hex string
}
wt.BASE = new wt(sa, aa, 1n, se(sa * aa));
wt.ZERO = new wt(0n, 1n, 1n, 0n);
const { BASE: yn, ZERO: gi } = wt, ho = (t, n) => t.toString(16).padStart(n, "0"), us = (t) => Array.from(t).map((n) => ho(n, 2)).join(""), hs = (t) => {
  const n = t.length;
  (!uo(t) || n % 2) && ot("hex invalid 1");
  const i = Kn(n / 2);
  for (let r = 0; r < i.length; r++) {
    const s = r * 2, a = t.slice(s, s + 2), o = Number.parseInt(a, 16);
    (Number.isNaN(o) || o < 0) && ot("hex invalid 2"), i[r] = o;
  }
  return i;
}, mo = (t) => hs(ho(t, 32 * 2)).reverse(), ms = (t) => BigInt("0x" + us(Kn(Mi(t)).reverse())), zi = (...t) => {
  const n = Kn(t.reduce((r, s) => r + Mi(s).length, 0));
  let i = 0;
  return t.forEach((r) => {
    n.set(r, i), i += r.length;
  }), n;
}, go = (t, n = at) => {
  (t === 0n || n <= 0n) && ot("no inverse n=" + t + " mod=" + n);
  let i = se(t, n), r = n, s = 0n, a = 1n;
  for (; i !== 0n; ) {
    const o = r / i, c = r % i, d = s - a * o;
    r = i, i = c, s = a, a = d;
  }
  return r === 1n ? se(s, n) : ot("no inverse");
}, Kt = (t, n) => {
  let i = t;
  for (; n-- > 0n; )
    i *= i, i %= at;
  return i;
}, Nl = (t) => {
  const i = t * t % at * t % at, r = Kt(i, 2n) * i % at, s = Kt(r, 1n) * t % at, a = Kt(s, 5n) * s % at, o = Kt(a, 10n) * a % at, c = Kt(o, 20n) * o % at, d = Kt(c, 40n) * c % at, p = Kt(d, 80n) * d % at, u = Kt(p, 80n) * d % at, l = Kt(u, 10n) * a % at;
  return { pow_p_5_8: Kt(l, 2n) * t % at, b2: i };
}, la = 19681161376707505956807079304988542015446066515923890162744021073123829784752n, Al = (t, n) => {
  const i = se(n * n * n), r = se(i * i * n), s = Nl(t * r).pow_p_5_8;
  let a = se(t * i * s);
  const o = se(n * a * a), c = a, d = se(a * la), p = o === t, u = o === se(-t), l = o === se(-t * la);
  return p && (a = c), (u || l) && (a = d), (se(a) & 1n) === 1n && (a = se(-a)), { isValid: p || u, value: a };
}, rr = (t) => se(ms(t), vi);
let ki;
const gs = (...t) => bs.sha512Async(...t), Pl = (...t) => (
  // Sync SHA512, not set by default
  typeof ki == "function" ? ki(...t) : ot("etc.sha512Sync not set")
), fo = (t) => {
  const n = t.slice(0, 32);
  n[0] &= 248, n[31] &= 127, n[31] |= 64;
  const i = t.slice(32, 64), r = rr(n), s = yn.mul(r), a = s.toRawBytes();
  return { head: n, prefix: i, scalar: r, point: s, pointBytes: a };
}, fs = (t) => gs(Xn(t, 32)).then(fo), Ll = (t) => fo(Pl(Xn(t, 32))), El = (t) => fs(t).then((n) => n.pointBytes);
function bo(t, n) {
  return gs(n.hashable).then(n.finish);
}
const Il = (t, n, i) => {
  const { pointBytes: r, scalar: s } = t, a = rr(n), o = yn.mul(a).toRawBytes();
  return { hashable: zi(o, r, i), finish: (p) => {
    const u = se(a + rr(p) * s, vi);
    return Mi(zi(o, mo(u)), 64);
  } };
}, Fl = async (t, n) => {
  const i = Xn(t), r = await fs(n), s = await gs(r.prefix, i);
  return bo(!0, Il(r, s, i));
}, xo = { zip215: !0 }, Dl = (t, n, i, r = xo) => {
  n = Xn(n), t = Xn(t, 64);
  const { zip215: s } = r;
  let a, o, c, d, p = new Uint8Array();
  try {
    a = wt.fromHex(i, s), o = wt.fromHex(t.slice(0, 32), s), c = ms(t.slice(32, 64)), d = yn.mul(c, !1), p = zi(o.toRawBytes(), a.toRawBytes(), n);
  } catch {
  }
  return { hashable: p, finish: (l) => {
    if (d == null || !s && a.isSmallOrder())
      return !1;
    const h = rr(l);
    return o.add(a.mul(h, !1)).add(d.negate()).clearCofactor().is0();
  } };
}, Ol = async (t, n, i, r = xo) => bo(!0, Dl(t, n, i, r)), ca = () => (
  // We support: 1) browsers 2) node.js 19+
  typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0
), bs = {
  bytesToHex: us,
  hexToBytes: hs,
  concatBytes: zi,
  mod: se,
  invert: go,
  randomBytes: (t = 32) => {
    const n = ca();
    return (!n || !n.getRandomValues) && ot("crypto.getRandomValues must be defined"), n.getRandomValues(Kn(t));
  },
  sha512Async: async (...t) => {
    const n = ca();
    (!n || !n.subtle) && ot("crypto.subtle or etc.sha512Async must be defined");
    const i = zi(...t);
    return Kn(await n.subtle.digest("SHA-512", i.buffer));
  },
  sha512Sync: void 0
  // Actual logic below
};
Object.defineProperties(bs, { sha512Sync: {
  configurable: !1,
  get() {
    return ki;
  },
  set(t) {
    ki || (ki = t);
  }
} });
const Bl = {
  getExtendedPublicKeyAsync: fs,
  getExtendedPublicKey: Ll,
  randomPrivateKey: () => bs.randomBytes(32),
  precompute(t = 8, n = yn) {
    return n.multiply(3n), n;
  }
  // no-op
}, Mn = 8, Rl = () => {
  const t = [], n = 256 / Mn + 1;
  let i = yn, r = i;
  for (let s = 0; s < n; s++) {
    r = i, t.push(r);
    for (let a = 1; a < 2 ** (Mn - 1); a++)
      r = r.add(i), t.push(r);
    i = r.double();
  }
  return t;
};
let da;
const ql = (t) => {
  const n = da || (da = Rl()), i = (u, l) => {
    let h = l.negate();
    return u ? h : l;
  };
  let r = gi, s = yn;
  const a = 1 + 256 / Mn, o = 2 ** (Mn - 1), c = BigInt(2 ** Mn - 1), d = 2 ** Mn, p = BigInt(Mn);
  for (let u = 0; u < a; u++) {
    const l = u * o;
    let h = Number(t & c);
    t >>= p, h > o && (h -= d, t += 1n);
    const m = l, f = l + Math.abs(h) - 1, k = u % 2 !== 0, y = h < 0;
    h === 0 ? s = s.add(i(k, n[m])) : r = r.add(i(y, n[f]));
  }
  return { p: r, f: s };
}, Zn = globalThis.crypto?.subtle, pa = Zn?.generateKey.bind(Zn), ua = Zn?.exportKey.bind(Zn), ha = Zn?.sign.bind(Zn);
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
    if (!pa || !ua) return null;
    try {
      const n = await pa({ name: "Ed25519" }, !1, ["sign", "verify"]);
      if (n.privateKey.extractable !== !1 || n.privateKey.algorithm?.name !== "Ed25519") return null;
      const i = ct(new Uint8Array(await ua("raw", n.publicKey)));
      return await Xt.fromCryptoKey(n.privateKey, i);
    } catch {
      return null;
    }
  }
  static async generateInMemory() {
    const n = Bl.randomPrivateKey();
    return Xt.fromBytes(n);
  }
  /**
   * Wraps a browser-held private key (e.g. one restored from IndexedDB). Signs a probe and checks it against
   * the public key first, so a key that doesn't match or doesn't sign proper Ed25519 is rejected up front.
   */
  static async fromCryptoKey(n, i) {
    if (!ha) throw new Error("This browser can't sign with WebCrypto.");
    if (n.extractable !== !1) throw new Error("Refusing a trading key that can be exported.");
    const r = async (a) => new Uint8Array(await ha({ name: "Ed25519" }, n, a)), s = An(`strike-everywhere key check ${i}`);
    if (!await Ol(await r(s), s, kn(i))) throw new Error("Trading key doesn't match its public key.");
    return new Xt(r, i, n);
  }
  /** For bots and tests that bring their own key. The widget never does this. */
  static async fromPrivateKeyHex(n) {
    return Xt.fromBytes(kn(n));
  }
  static async fromBytes(n) {
    return new Xt((i) => Fl(i, n), ct(await El(n)), null);
  }
  async sign(n) {
    return ct(await this.signBytes(An(n)));
  }
}
async function Ul(t, n, i, r, s) {
  return `${t.toUpperCase()}:${n}:${i}:${r}:${await wl(s)}`;
}
async function Hl(t, n, i, r, s, a) {
  const o = await Ul(n, i, s, a, r);
  return {
    "X-API-Wallet-Public-Key": t.publicKeyHex,
    "X-API-Wallet-Signature": await t.sign(o),
    "X-API-Wallet-Timestamp": String(s),
    "X-API-Wallet-Nonce": a
  };
}
async function Wl(t, n) {
  return t.sign(`session.logon:${n}:${t.publicKeyHex}`);
}
class Qi extends Error {
  constructor(n, i, r, s) {
    super(i), this.status = n, this.body = r, this.path = s, this.name = "StrikeApiError";
  }
}
const jl = /signature expired|invalid timestamp/i;
class Gl {
  constructor(n, i = globalThis.fetch.bind(globalThis)) {
    /**
     * Server time minus local time, in milliseconds. Strike rejects signatures whose timestamp is even a few
     * ms in the future, so this must not be rounded to whole seconds (a +0.85 s offset rounded to +1 s made
     * ~1 in 4 signed requests fail in testing).
     */
    re(this, "clockSkewMs", 0);
    re(this, "key", null);
    /** Runs before every signed request; may drop `key` (e.g. the session ran out while timers were asleep). */
    re(this, "beforeSign", null);
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
      if (s instanceof Qi && (r.auth ?? (r.base ?? "api") === "api") && jl.test(s.message))
        return await this.syncClock(), this.send(n, i, r);
      throw s;
    }
  }
  async send(n, i, r) {
    const s = r.base ?? "api", a = r.auth ?? s === "api", o = r.body === void 0 ? "" : JSON.stringify(r.body), c = {};
    if (o && (c["Content-Type"] = "application/json"), a) {
      if (this.beforeSign?.(), !this.key) throw new Qi(401, "Not connected: connect a wallet first.", null, i);
      const h = Math.floor(this.serverNowMs() / 1e3);
      Object.assign(c, await Hl(this.key, n, i, o, h, Dt()));
    }
    r.builderFeeBps !== void 0 && (c["X-Builder-Fee-Bps"] = String(r.builderFeeBps));
    const d = (s === "price" ? this.net.price : s === "stat" ? this.net.stat : this.net.api) + i, p = await this.fetchImpl(d, { method: n, headers: c, body: o || void 0, signal: r.signal }), u = await p.text();
    let l = u;
    try {
      l = u ? p.ok && r.parse ? r.parse(u) : JSON.parse(u) : null;
    } catch {
    }
    if (!p.ok) {
      const h = l && (l.error || l.msg || l.message || l.detail), m = (typeof h == "string" ? h : h ? JSON.stringify(h) : "") || `HTTP ${p.status}`;
      throw new Qi(p.status, String(m), l, i);
    }
    return l;
  }
}
const Ye = (t) => {
  const n = Object.entries(t).filter(([, i]) => i != null && i !== "").map(([i, r]) => `${encodeURIComponent(i)}=${encodeURIComponent(String(r))}`);
  return n.length ? `?${n.join("&")}` : "";
};
function Vl(t, n) {
  if (typeof t != "string" || !t.trim()) throw new Error("Strike sent an empty message to sign. Not signing.");
  if (t.length > 4096) throw new Error("Strike's message to sign is unexpectedly long. Not signing.");
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F‪-‮⁦-⁩]/.test(t))
    throw new Error("Strike's message to sign contains hidden control characters. Not signing.");
  t.toLowerCase().includes(n.toLowerCase()) || console.warn("[strike-everywhere] Strike's consent message doesn't name the API key being bound.");
}
async function Yl(t) {
  const n = await Xt.generate(), i = (c) => t.http.request("POST", "/auth/builder/request-signature", {
    auth: !1,
    body: {
      address: t.address,
      chain: t.chain,
      code: t.builderCode,
      fee_share_bps: t.feeShareBps,
      public_key: n.publicKeyHex,
      ...c && t.referralCode ? { referral_code: t.referralCode } : {}
    }
  }), r = (c) => /own builder code/i.test(c?.message ?? "") ? new Error(`This wallet owns the builder code ${t.builderCode}, and Strike doesn't let a builder trade through its own code. Connect a different wallet.`) : c;
  let s;
  try {
    s = await i(!0);
  } catch (c) {
    if (!t.referralCode || c?.status !== 400 || /own builder code/i.test(c?.message ?? "")) throw r(c);
    s = await i(!1).catch((d) => Promise.reject(r(d)));
  }
  Vl(s.message_to_sign, n.publicKeyHex), t.onMessage?.(s.message_to_sign);
  const a = await t.signMessage(s.message_to_sign);
  let o;
  try {
    o = await t.http.request("POST", "/auth/builder/verify-signature", {
      auth: !1,
      body: { address: t.address, chain: t.chain, nonce: s.nonce, wallet_signature: a }
    });
  } catch (c) {
    throw /expir|nonce|challenge/i.test(c?.message ?? "") ? new Error("The signature request expired (Strike allows a few minutes). Click Sign & connect to get a new one.") : r(c);
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
function vo(t) {
  return JSON.parse(t.replace(/"(lastUpdateId|U|u)":\s*(\d+)/g, '"$1":"$2"'));
}
function ko(t) {
  const n = typeof t == "number" ? Number.isSafeInteger(t) && t >= 0 ? String(t) : "" : typeof t == "string" ? t.trim() : typeof t == "bigint" ? String(t) : "";
  return /^\d{1,20}$/.test(n) ? BigInt(n) : null;
}
function sr(t) {
  if (!Array.isArray(t)) return [];
  const n = [];
  for (const i of t) {
    if (!Array.isArray(i)) continue;
    const r = Number(i[0]), s = Number(i[1]);
    Number.isFinite(r) && r > 0 && Number.isFinite(s) && s >= 0 && n.push([r, s]);
  }
  return n;
}
function Kl(t) {
  const n = ko(t?.lastUpdateId);
  return n === null ? null : { lastUpdateId: n, bids: sr(t.bids).filter((i) => i[1] > 0), asks: sr(t.asks).filter((i) => i[1] > 0) };
}
function Xl(t) {
  if (t?.e !== "depthUpdate" || typeof t.s != "string") return null;
  const n = ko(t.u);
  return n === null ? null : { symbol: t.s, u: n, bids: sr(t.b), asks: sr(t.a) };
}
class ma {
  constructor(n = 400) {
    re(this, "bids", /* @__PURE__ */ new Map());
    re(this, "asks", /* @__PURE__ */ new Map());
    re(this, "lastUpdateId", null);
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
    return yo(i, r);
  }
}
function yo(t, n) {
  if (!t.length && !n.length) return null;
  const i = t.length ? t[0][0] : NaN, r = n.length ? n[0][0] : NaN, s = t.length > 0 && n.length > 0;
  return s && !(i < r) ? null : { bids: t, asks: n, bestBid: i, bestAsk: r, mid: s ? (i + r) / 2 : NaN, spread: s ? r - i : NaN };
}
function gr(t, n, i, r = {}) {
  if (!(i > 0)) return null;
  const s = n === "buy" ? t.asks : t.bids;
  if (!s.length) return null;
  const a = r.mark && r.mark > 0 ? r.mark : Number.isFinite(t.mid) ? t.mid : s[0][0], o = r.mark && r.mark > 0 ? r.bound ?? 0.05 : 1 / 0, c = n === "buy" ? a * (1 + o) : a * (1 - o);
  let d = i, p = 0, u = s[0][0], l = !1;
  for (const [k, y] of s) {
    if (d <= 0) break;
    if (n === "buy" ? k > c : k < c) {
      l = !0;
      break;
    }
    const _ = Math.min(d, y);
    p += _ * k, d -= _, u = k;
  }
  const h = i - Math.max(0, d), m = h > 0 ? p / h : s[0][0], f = a > 0 ? (n === "buy" ? m - a : a - m) / a : 0;
  return { avgPrice: m, filled: h, complete: d <= i * 1e-9, worstPrice: u, slippage: Math.max(0, f), beyondBand: l };
}
class Zl {
  constructor(n, i, r, s = {}) {
    re(this, "book", new ma());
    re(this, "recent", []);
    re(this, "listeners", /* @__PURE__ */ new Set());
    re(this, "offs", []);
    re(this, "timeout");
    re(this, "interval");
    re(this, "syncing", !1);
    re(this, "lastResync", 0);
    re(this, "closed", !1);
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
    const i = Xl(n);
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
        const r = new ma();
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
function Tt(t, n) {
  if (Array.isArray(t)) return t;
  const i = t?.[n];
  return Array.isArray(i) ? i : [];
}
function lt(t) {
  if (t == null || t === "" || typeof t == "boolean" || typeof t == "object") return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}
function ar(t, ...n) {
  for (const i of n) if (t?.[i] !== void 0 && t?.[i] !== null) return t[i];
}
const ve = (t, ...n) => lt(ar(t, ...n)), je = (t, ...n) => {
  const i = ar(t, ...n);
  return typeof i == "string" || typeof i == "number" ? String(i) : "";
}, Jl = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, ga = (t) => typeof t == "string" && Jl.test(t);
function Ql(t) {
  if (!Array.isArray(t)) return [];
  const n = [];
  for (const i of t) {
    if (!Array.isArray(i)) continue;
    const r = { openTime: Number(i[0]), open: +i[1], high: +i[2], low: +i[3], close: +i[4], volume: +i[5] || 0 };
    [r.openTime, r.open, r.high, r.low, r.close].every((s) => Number.isFinite(s) && s > 0) && n.push(r);
  }
  return n.sort((i, r) => i.openTime - r.openTime);
}
function ec(t) {
  if (!Array.isArray(t)) return [];
  const n = [];
  for (const i of t) {
    const r = { id: Number(i?.id), price: Number(i?.price), size: Number(i?.qty), time: Number(i?.time), side: i?.isBuyerMaker ? "sell" : "buy" };
    Number.isFinite(r.id) && r.price > 0 && r.size > 0 && r.time > 0 && n.push(r);
  }
  return n.sort((i, r) => r.time - i.time || r.id - i.id);
}
function tc(t) {
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
function fa(t) {
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
class nc {
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
    return this.http.request("GET", `/v2/premiumIndex${Ye({ symbol: n })}`, { base: "price", auth: !1 });
  }
  /** Candles (Binance layout: [openTime, open, high, low, close, volume, closeTime, ...]); malformed rows are dropped. */
  async klines(n, i = "1h", r = 48, s = "last") {
    const a = await this.http.request("GET", `/v2/klines${Ye({ symbol: n, interval: i, limit: r, priceType: s === "last" ? void 0 : s })}`, { base: "price", auth: !1 });
    return Ql(a);
  }
  /**
   * Order book snapshot (`GET /price/v2/depth`, best first per side). Strike caches it for 5 s.
   * Throws on a malformed or crossed book rather than returning one that would mislead.
   */
  async depth(n, i = 20) {
    const r = await this.http.request("GET", `/v2/depth${Ye({ symbol: n, limit: Math.max(1, Math.min(1e3, Math.round(i))) })}`, {
      base: "price",
      auth: !1,
      parse: vo
    }), s = Kl(r);
    if (!s) throw new Error("Malformed order book from Strike");
    if (s.bids.length && s.asks.length && s.bids[0][0] >= s.asks[0][0]) throw new Error("Crossed order book from Strike");
    return s;
  }
  /** Recent public trades, newest first (`GET /price/v2/trades`). `side` is the taker's side. */
  async trades(n, i = 30) {
    const r = await this.http.request("GET", `/v2/trades${Ye({ symbol: n, limit: Math.max(1, Math.min(500, Math.round(i))) })}`, { base: "price", auth: !1 });
    return ec(r);
  }
  /** Open interest in base units (`GET /price/v2/openInterest`), or null if Strike doesn't say. */
  async openInterest(n) {
    const i = await this.http.request("GET", `/v2/openInterest${Ye({ symbol: n })}`, { base: "price", auth: !1 });
    return lt(i?.openInterest);
  }
  /** Hourly funding rate history (`GET /stat/v1/stats/coin/history/funding`): `{columns:["ts","funding_rate"], data:[[ts, rate]]}`. */
  async fundingHistory(n, i = 7) {
    const r = await this.http.request("GET", `/v1/stats/coin/history/funding${Ye({ symbol: n, days: Math.max(1, Math.min(90, Math.round(i))) })}`, { base: "stat", auth: !1 });
    return (Array.isArray(r?.data) ? r.data : []).map((a) => Array.isArray(a) && a[1] !== null && a[1] !== "" ? { time: Number(a[0]), rate: Number(a[1]) } : null).filter((a) => !!a && a.time > 0 && Number.isFinite(a.rate)).sort((a, o) => a.time - o.time);
  }
  /**
   * Strike's liquidation map (`GET /stat/v1/stats/coin/liquidation-map`, used by Strike's own trade page; verified live
   * 2026-10-21): price bins with the base size of open longs and shorts that would be liquidated there.
   */
  async liquidationMap(n, i = 0.85) {
    const r = await this.http.request("GET", `/v1/stats/coin/liquidation-map${Ye({ symbol: n, range_pct: i })}`, { base: "stat", auth: !1 }), s = Array.isArray(r?.columns) ? r.columns : [], a = (u, l) => s.indexOf(u) >= 0 ? s.indexOf(u) : l, [o, c, d] = [a("price", 0), a("long_base", 1), a("short_base", 2)];
    return (Array.isArray(r?.data) ? r.data : []).map((u) => Array.isArray(u) ? { price: Number(u[o]), long: Number(u[c]) || 0, short: Number(u[d]) || 0 } : null).filter((u) => !!u && u.price > 0 && u.long >= 0 && u.short >= 0).sort((u, l) => u.price - l.price);
  }
  /** Public vault list (`GET /v2/vaults`, active vaults by default). */
  async vaults(n = 20) {
    const i = await this.http.request("GET", `/v2/vaults${Ye({ limit: n })}`, { auth: !1 });
    return Tt(i, "vaults").map(tc).filter((r) => r !== null);
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
class ic {
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
    return xs(await this.account(), n, !1);
  }
  /** Signed: portfolio summary (`GET /v2/portfolio`): all-time PnL / volume / fees and the fee tier. */
  async portfolio() {
    return cc(await this.http.request("GET", "/v2/portfolio"));
  }
  /** Signed: fills, newest first. Page with `fromId` (the previous page's `next`). */
  async fillsPage(n = {}) {
    const i = n.limit ?? 20, r = await this.http.request("GET", `/v2/history/fill${Ye({ symbol: n.symbol, limit: i, fromId: n.fromId ?? void 0, startTime: n.startTime, endTime: n.endTime })}`), s = Tt(r, "fills").map(sc).filter((a) => a !== null);
    return { items: s, next: Dr(s, i, (a) => a.id) };
  }
  /** Signed: funding payments, newest first (`GET /v2/history/funding`, cursor `fromId`). */
  async fundingPage(n = {}) {
    const i = n.limit ?? 20, r = await this.http.request("GET", `/v2/history/funding${Ye({ limit: i, fromId: n.fromId ?? void 0 })}`), s = Tt(r, "funding").map(ac).filter((a) => a !== null);
    return { items: s, next: Dr(s, i, (a) => a.id) };
  }
  /**
   * Balance transactions, newest first (`GET /v2/history/transaction`): deposits, withdrawals, fees, funding.
   * Public by account id (Strike doesn't paginate it; up to 1000 rows).
   */
  async transactions(n, i = 100) {
    const r = await this.http.request("GET", `/v2/history/transaction${Ye({ account_id: n, limit: Math.max(1, Math.min(1e3, i)) })}`, { auth: !1 });
    return Tt(r, "transactions").map(rc).filter((s) => s !== null).sort((s, a) => a.time - s.time);
  }
  /** Signed: order history, newest first (`GET /v2/history/order`, cursor `fromOrderID`). */
  async orderHistoryPage(n = {}) {
    const i = n.limit ?? 20, r = await this.http.request("GET", `/v2/history/order${Ye({ limit: i, fromOrderID: n.fromOrderId ?? void 0 })}`), s = Tt(r, "orders").filter(Or).map(Fr).filter((a) => Number.isFinite(Number(a.id)));
    return { items: s, next: Dr(s, i, (a) => Number(a.id)) };
  }
  /**
   * Signed: closed positions, newest close first (`GET /v2/closedPositions`; no cursor, so pages use
   * `endTime`). Strike's rows carry no PnL, so realized PnL is summed from fills in each position's window.
   */
  async closedPositionsPage(n = {}) {
    const i = n.limit ?? 10, r = await this.http.request("GET", `/v2/closedPositions${Ye({ limit: i, endTime: n.endTime ?? void 0 })}`), s = Tt(r, "positions").map(oc).filter((l) => l !== null);
    if (!s.length) return { items: [], next: null };
    const a = Math.min(...s.map((l) => l.openTime)) - lr, o = Math.max(...s.map((l) => l.closeTime)) + lr, c = [];
    let d = !1, p = null;
    try {
      for (let l = 0; l < 3; l++) {
        const h = await this.fillsPage({ limit: 1e3, fromId: p, startTime: Math.max(0, a), endTime: o });
        if (c.push(...h.items), h.next === null) {
          d = !0;
          break;
        }
        p = h.next;
      }
    } catch {
    }
    const u = s[s.length - 1];
    return { items: lc(s, c, d), next: s.length >= i && u.closeTime > 0 ? u.closeTime - 1 : null };
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
    return Tt(n, "positions").filter((i) => i && Number.isFinite(Number(i.size)) && Number(i.size) !== 0);
  }
  async openOrders(n) {
    const i = await this.http.request("GET", `/v2/openOrders${Ye({ symbol: n })}`);
    return Tt(i, "orders").filter(Or).map(Fr);
  }
  async orderHistory(n = {}) {
    const i = await this.http.request("GET", `/v2/history/order${Ye({ symbol: n.symbol, limit: n.limit ?? 20 })}`);
    return Tt(i, "orders").filter(Or).map(Fr);
  }
  async fills(n = {}) {
    const i = await this.http.request("GET", `/v2/history/fill${Ye({ symbol: n.symbol, limit: n.limit ?? 50 })}`);
    return Tt(i, "fills");
  }
  /**
   * Public lookup (no auth): does this wallet already have a Strike account?
   * Strike returns 404 "user not found" for new wallets (they need a first deposit before trading).
   * Returns null when Strike can't answer (e.g. testnet 500 "failed to calculate balance"): unknown, not fatal.
   */
  async exists(n) {
    try {
      return await this.http.request("GET", `/v2/account${Ye({ blockchain_address: n })}`, { auth: !1 }), !0;
    } catch (i) {
      return i instanceof Qi && i.status === 404 ? !1 : (console.warn("[strike-everywhere] account lookup failed:", i?.message || i), null);
    }
  }
}
function rc(t) {
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
function Fr(t) {
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
function xs(t, n, i = !0) {
  const r = String(t?.symbol_settings?.[n]?.margin_mode ?? (i ? t?.default_margin_mode ?? "" : "")).toLowerCase();
  return r === "cross" || r === "isolated" ? r : null;
}
function Dr(t, n, i) {
  if (t.length < n) return null;
  const r = i(t[t.length - 1]);
  return Number.isFinite(r) ? r : null;
}
const or = (t, ...n) => ve(t, ...n) ?? 0, Or = (t) => !!t && typeof t == "object";
function sc(t) {
  const n = ve(t, "id", "ID");
  if (n === null) return null;
  const i = je(t, "side", "Side").toLowerCase();
  return {
    id: n,
    orderId: ve(t, "order_id", "OrderID") ?? 0,
    symbol: je(t, "symbol", "Symbol"),
    side: i === "buy" || i === "sell" ? i : "",
    role: je(t, "role", "Role"),
    price: ve(t, "price", "Price"),
    size: ve(t, "size", "Size", "qty"),
    fee: ve(t, "fee", "Fee", "commission"),
    realizedPnl: ve(t, "realized_pnl", "RealizedPnl"),
    autoClose: je(t, "auto_close_type"),
    time: or(t, "timestamp", "Timestamp", "time")
  };
}
function ac(t) {
  const n = ve(t, "id", "ID");
  return n === null ? null : {
    id: n,
    symbol: je(t, "symbol", "Symbol"),
    positionSide: je(t, "position_side", "PositionSide"),
    positionSize: ve(t, "position_size", "PositionSize"),
    rate: ve(t, "funding_rate", "FundingRate"),
    amount: ve(t, "amount", "Amount", "income"),
    time: or(t, "timestamp", "Timestamp", "time")
  };
}
function oc(t) {
  const n = ve(t, "ID", "id"), i = je(t, "Symbol", "symbol");
  return n === null || !i ? null : {
    id: n,
    symbol: i,
    marginMode: je(t, "MarginMode", "margin_mode"),
    openTime: or(t, "OpenTimestamp", "open_timestamp", "create_timestamp"),
    closeTime: or(t, "CloseTimestamp", "close_timestamp"),
    // Not documented, but use it if Strike ever includes it.
    realizedPnl: ve(t, "realized_pnl", "RealizedPnl", "RealizedPNL")
  };
}
const lr = 2e3;
function lc(t, n, i) {
  const r = n.length ? Math.min(...n.map((a) => a.time)) : 1 / 0, s = /* @__PURE__ */ new Map();
  for (const a of n) {
    const o = t.filter((d) => d.symbol === a.symbol && d.openTime && d.closeTime);
    let c = o.find((d) => a.time > d.openTime && a.time <= d.closeTime);
    if (!c) {
      let d = 1 / 0;
      for (const p of o) {
        const u = a.time <= p.openTime ? p.openTime - a.time : a.time - p.closeTime;
        u <= lr && u < d && (d = u, c = p);
      }
    }
    c && s.set(c.id, (s.get(c.id) ?? 0) + (a.realizedPnl ?? 0));
  }
  return t.map((a) => a.realizedPnl !== null ? a : !a.openTime || !a.closeTime || !i && a.openTime - lr < r ? { ...a, realizedPnl: null } : { ...a, realizedPnl: s.get(a.id) ?? 0 });
}
function cc(t) {
  const n = ar(t, "account", "perp_account"), i = lt(t?.fee_tier), r = Tt(t, "fee_tiers"), s = i === null ? void 0 : r.find((o) => Number(ar(o, "Tier", "tier")) === i), a = lt(t?.maker_fee_rate_override);
  return {
    realizedPnl: ve(n, "realized_pnl"),
    volume: lt(t?.volume) ?? ve(n, "all_time_volume"),
    fees: lt(t?.fees),
    feeTier: i,
    takerRate: ve(s, "TakerRate", "taker_rate"),
    makerRate: a ?? ve(s, "MakerRate", "maker_rate"),
    referralDiscountPct: lt(t?.fee_discount_rate),
    stakingDiscount: lt(t?.staking_fee_discount_rate)
  };
}
const yi = 300, wi = 86400, ba = 30;
function wo(t, n, i, r) {
  const s = vs(t, n, i, r);
  if (s.perOrder >= s.minPerOrder - 1e-12) return null;
  const a = r && r > 0 ? ` (about $${Math.ceil(s.minTotal * r).toLocaleString("en-US")})` : "";
  return `Too small for this duration: Strike splits a TWAP into about ${s.orders} orders (one every ${s.intervalSec} s) and each must meet the market minimum. Use at least ${Number(s.minTotal.toPrecision(6))} ${t.baseAsset}${a}, or a shorter duration.`;
}
function vs(t, n, i, r) {
  const s = Math.max(1, Math.floor(i / ba)), a = Math.max(t.minQty || 0, t.marketStepSize ?? t.stepSize ?? 0), o = r && r > 0 && t.minNotional > 0 ? t.minNotional / r : 0, c = Math.max(a, o), d = t.marketStepSize ?? t.stepSize, p = d > 0 ? Number(me(c * s, d, "ceil")) : c * s;
  return { intervalSec: ba, orders: s, perOrder: n / s, minPerOrder: c, minTotal: p };
}
const dc = (t) => t === "stop" || t === "stop_limit", ks = (t) => t === "take_profit" || t === "take_profit_limit", zn = (t) => dc(t) || ks(t), nn = (t) => t === "limit" || t === "stop_limit" || t === "take_profit_limit", _o = (t) => t === "market" || t === "stop" || t === "take_profit" || t === "trailing_stop_market", Ln = 0.1, En = 5;
function So(t, n, i) {
  return Number(me(n, i, t === "buy" ? "ceil" : "floor"));
}
function $o(t, n, i) {
  return Number(me(n, i, t === "buy" ? "floor" : "ceil"));
}
function _i(t) {
  if (t.type === "trailing_stop_market") {
    const d = Number(t.callbackRate);
    return d >= Ln && d <= En ? t.activationPrice !== void 0 && !(Number(t.activationPrice) > 0) ? "Enter a valid activation price" : null : `Trail distance must be ${Ln}–${En}%`;
  }
  if (!zn(t.type)) return null;
  const n = ks(t.type), i = Number(t.stopPrice), r = t.tickSize && i > 0 ? n ? $o(t.side, i, t.tickSize) : So(t.side, i, t.tickSize) : i;
  if (!(r > 0)) return "Enter a trigger price";
  if (nn(t.type) && !(Number(t.price) > 0)) return "Enter a limit price";
  const s = t.workingType === "contract_price", a = s ? Number(t.last) : t.mark, o = s ? "last price" : "mark price";
  if (!(a > 0)) return `Waiting for the ${o}`;
  if (!n && t.side === "buy" && !(r > a)) return `Buy stop trigger must be above the ${o}`;
  if (!n && t.side === "sell" && !(r < a)) return `Sell stop trigger must be below the ${o}`;
  if (n && t.side === "sell" && !(r > a)) return `Sell take-profit trigger must be above the ${o}`;
  if (n && t.side === "buy" && !(r < a)) return `Buy take-profit trigger must be below the ${o}`;
  const c = t.priceBound ?? 0.05;
  return nn(t.type) && Math.abs(Number(t.price) - r) / r > c ? `Limit price must be within ${(c * 100).toFixed(0)}% of the trigger` : null;
}
class Nn extends Error {
  constructor(n) {
    super(pc(n.error_message || n.close_reason || "rejected")), this.order = n, this.name = "OrderRejectedError";
  }
}
class Jt extends Error {
  constructor(i, r, s = null) {
    super("Sent to Strike. It hasn't confirmed the result yet, so check Positions and Open Orders before sending it again.");
    re(this, "settled", Promise.resolve(null));
    this.symbol = i, this.clientOrderId = r, this.lastError = s, this.name = "OrderUnconfirmedError";
  }
}
const xa = (t, n) => Promise.race([t, new Promise((i, r) => setTimeout(() => r(new Error(`no answer within ${n / 1e3} s`)), n))]);
function pc(t) {
  return {
    order_price_out_of_limit: "Price is too far from the market. Limit prices must stay within 5% of the current price.",
    order_price_out_of_price_cap: "Price is outside the allowed range for this market.",
    insufficient_balance: "Not enough available balance for this order.",
    insufficient_margin: "Not enough margin for this order. Lower the size or leverage.",
    reduce_only_rejected: "Reduce-only order would increase the position."
  }[t] ?? t.replace(/_/g, " ");
}
function va(t, n, i) {
  const r = _o(n.type) ? t.marketStepSize ?? t.stepSize : t.stepSize, s = me(n.size, r, "floor");
  if (!(Number(s) > 0)) throw new Error("Order size is below this market's minimum step.");
  const a = {
    client_order_id: i,
    symbol: n.symbol,
    side: n.side,
    // lowercase: the API rejects "BUY" despite the builder guide's example
    type: n.type,
    size: s
  };
  if (nn(n.type)) {
    if (!(Number(n.price) > 0)) throw new Error("Limit orders need a price.");
    a.price = me(Number(n.price), t.tickSize), a.time_in_force = n.timeInForce ?? "GTC", n.postOnly && n.type === "limit" && (a.post_only = !0);
  }
  if (zn(n.type)) {
    if (!(Number(n.stopPrice) > 0)) throw new Error("Conditional orders need a trigger price.");
    const o = ks(n.type) ? $o(n.side, Number(n.stopPrice), t.tickSize) : So(n.side, Number(n.stopPrice), t.tickSize);
    a.stop_price = o.toFixed(hr(t.tickSize)), a.working_type = n.workingType ?? "mark_price";
  }
  if (n.type === "trailing_stop_market") {
    const o = Number(n.callbackRate);
    if (!(o >= Ln && o <= En)) throw new Error(`Trail distance must be ${Ln}–${En}%.`);
    a.callback_rate = String(Math.round(o * 100) / 100), n.activationPrice !== void 0 && (a.activation_price = me(Number(n.activationPrice), t.tickSize)), a.working_type = n.workingType ?? "mark_price";
  }
  if (n.type !== "market" && n.type !== "limit" && (n.takeProfit || n.stopLoss))
    throw new Error("TP/SL can only be attached to market and limit orders.");
  return n.type === "market" && n.slippage !== void 0 && n.slippage > 0 && (a.slippage = String(Math.round(n.slippage * 1e4) / 1e4)), n.reduceOnly && (a.reduce_only = !0), n.closePosition && n.type !== "market" && n.type !== "limit" && (a.close_position = !0), a;
}
function Co(t, n) {
  return !(t.lower > 0) || !(t.upper > 0) ? "Enter the price range" : t.upper > t.lower ? Number.isInteger(t.grids) && t.grids >= 2 && t.grids <= 200 ? t.collateral > 0 ? t.mode === "NEUTRAL" && t.sl ? "Neutral grids take separate long and short stop-losses" : t.mode === "LONG" && t.sl && !(t.sl < t.lower) ? "Stop-loss must be below the lower price" : t.mode === "SHORT" && t.sl && !(t.sl > t.upper) ? "Stop-loss must be above the upper price" : t.longSl && !(t.longSl < t.lower) ? "Long stop-loss must be below the lower price" : t.shortSl && !(t.shortSl > t.upper) ? "Short stop-loss must be above the upper price" : n > 0 && t.mode === "NEUTRAL" && !(t.lower < n && n < t.upper) ? "A neutral grid's range must include the current price" : null : "Enter the collateral" : "Grids must be a whole number from 2 to 200" : "Upper price must be above the lower price";
}
function uc(t) {
  const n = je(t, "id", "bot_id");
  if (!n) return null;
  const i = Array.isArray(t?.orders) ? t.orders : [];
  return {
    id: n,
    symbol: je(t, "symbol"),
    status: je(t, "status").toUpperCase(),
    mode: je(t, "mode").toUpperCase(),
    lower: ve(t, "lower_price"),
    upper: ve(t, "upper_price"),
    grids: ve(t, "grid_count"),
    leverage: ve(t, "leverage"),
    collateral: ve(t, "collateral"),
    profit: ve(t, "grid_profit"),
    levels: i.length,
    filledLevels: i.filter((r) => r?.filled === !0).length,
    createdAt: ve(t, "created_at_ms") ?? 0
  };
}
class Si {
  constructor(n, i) {
    this.http = n, this.account = i;
  }
  /**
   * Edits an open order: Strike's `POST /v2/order/replace` cancels it and places `next` in one request
   * (with the builder fee, like any new order).
   */
  async replaceOrder(n, i, r, s, a = Dt()) {
    const o = { cancel: { order_id: Number(i.id), symbol: i.symbol }, new_order: va(n, r, a) };
    return await this.http.request("POST", "/v2/order/replace", { body: o, builderFeeBps: s }), { clientOrderId: a };
  }
  /** Adds or removes margin on an isolated position (`POST /v2/isoMargin`). */
  async modifyIsolatedMargin(n, i, r) {
    if (!(i > 0)) throw new Error("Enter an amount.");
    await this.http.request("POST", "/v2/isoMargin", { body: { symbol: n, amount: String(Math.floor(i * 100) / 100), modify_type: r } });
  }
  /** Creates a grid bot (`POST /v2/grid/bot`). Returns the bot id. */
  async createGrid(n, i, r) {
    const s = (c) => me(c, n.tickSize), a = { symbol: i.symbol, mode: i.mode, upper_price: s(i.upper), lower_price: s(i.lower), grid_count: Math.round(i.grids), collateral: String(Math.floor(i.collateral * 100) / 100) };
    i.sl && (a.sl_price = s(i.sl)), i.longSl && (a.long_sl_price = s(i.longSl)), i.shortSl && (a.short_sl_price = s(i.shortSl));
    const o = await this.http.request("POST", "/v2/grid/bot", { body: a, builderFeeBps: r });
    return { id: je(o, "bot_id", "id"), status: je(o, "status") };
  }
  async grids(n = 50) {
    const i = await this.http.request("GET", `/v2/grid/bot${Ye({ limit: n })}`);
    return Tt(i, "bots").map(uc).filter((r) => r !== null);
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
    return n.takeProfit && i.push(Dt()), n.stopLoss && i.push(Dt()), i.length ? { clientOrderId: Dt(), strategyId: Dt(), legClientOrderIds: i } : { clientOrderId: Dt() };
  }
  async placeOrder(n, i, r, s = Si.newOrderIds(i)) {
    const a = s.clientOrderId, o = va(n, i, a);
    if (i.takeProfit || i.stopLoss) {
      const c = s.strategyId ?? Dt(), d = o.size, p = { ...o, strategy_id: c }, u = [], l = [...s.legClientOrderIds ?? []];
      if (i.takeProfit) {
        const h = l.shift() ?? Dt();
        u.push(h), p.tp_order = { client_order_id: h, type: "take_profit", size: d, stop_price: me(i.takeProfit, n.tickSize), working_type: "mark_price" };
      }
      if (i.stopLoss) {
        const h = l.shift() ?? Dt();
        u.push(h), p.sl_order = { client_order_id: h, type: "stop", size: d, stop_price: me(i.stopLoss, n.tickSize), working_type: "mark_price" };
      }
      return await this.http.request("POST", "/v2/order/strategy", { body: p, builderFeeBps: r }), { clientOrderId: a, strategyId: c, legClientOrderIds: u };
    }
    return await this.http.request("POST", "/v2/order", { body: o, builderFeeBps: r }), { clientOrderId: a };
  }
  /**
   * Waits for Strike to report the order's outcome. Strike accepts orders asynchronously, so this polls its
   * order history and its fills together: a filled order can show up in either one first. Throws
   * OrderRejectedError on rejection, and OrderUnconfirmedError (never a plain failure: the order may have
   * filled) if Strike hasn't reported the outcome in time. A stop order Strike has accepted but not yet
   * triggered reports "untriggered" (or "open"): that's a success.
   */
  async waitForOrder(n, i, r = 2e4) {
    const s = Date.now() + r;
    let a = 300, o = null, c;
    const d = (p) => (u) => (o = u, console.warn(`[strike-everywhere] confirming order ${i}: ${p} failed`, u?.status ?? "", u?.message ?? u), null);
    for (let p = 0; Date.now() < s; p++) {
      await new Promise((f) => setTimeout(f, a)), a = Math.min(a * 1.5, 1500);
      const [u, l] = await Promise.all([
        xa(this.account.orderHistory({ symbol: p % 3 === 2 ? void 0 : n, limit: 50 }), 5e3).catch(d("order history")),
        xa(this.account.fills({ symbol: n, limit: 50 }), 5e3).catch(d("fills"))
      ]), h = u?.find((f) => f.client_order_id === i);
      if (h && (c = h), h && h.status !== "pending") {
        if (h.status === "rejected") throw new Nn(h);
        return h;
      }
      const m = (l ?? []).filter((f) => f.client_order_id === i);
      if (m.length) {
        const f = m.reduce((y, _) => y + Number(_.size), 0), k = m[0];
        return { ...c ?? { id: k.order_id, client_order_id: i, account_id: k.account_id, symbol: n, side: k.side, type: "market", size: String(f), price: k.price, stop_price: "0", reduce_only: !1, close_reason: null, create_timestamp: k.timestamp }, status: "filled", filled: String(f) };
      }
    }
    throw new Jt(n, i, o);
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
    if (!(s >= yi && s <= wi)) throw new Error("TWAP duration must be between 5 minutes and 24 hours.");
    const a = me(i.size, n.marketStepSize ?? n.stepSize, "floor");
    if (!(Number(a) > 0)) throw new Error("Order size is below this market's minimum step.");
    const o = wo(n, Number(a), s);
    if (o) throw new Error(o);
    const c = {
      symbol: i.symbol,
      side: i.side === "buy" ? "BUY" : "SELL",
      // the algo API uses uppercase sides, unlike /v2/order
      total_size: a,
      duration_sec: s
    };
    if (i.limitPrice !== void 0) {
      if (!(i.limitPrice > 0)) throw new Error("Enter a valid limit price.");
      c.limit_price = me(i.limitPrice, n.tickSize);
    }
    i.reduceOnly && (c.reduce_only = !0), i.randomize && (c.randomize = !0);
    const d = await this.http.request("POST", "/v2/algo/twap", { body: c, builderFeeBps: r });
    return { strategyId: je(d, "strategy_id", "id"), status: je(d, "status") || "active" };
  }
  /** TWAP strategies; Strike's default ("active") returns active and cancelling ones. */
  async twaps(n = "active") {
    const i = await this.http.request("GET", `/v2/algo/twap${Ye({ status: n })}`);
    return Tt(i, "strategies").map(hc).filter((r) => r !== null);
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
    const o = ys(n, Math.abs(Number(i.size)), a, "market");
    if (!(o > 0)) throw new Error("That's smaller than the market's minimum size. Close a larger part.");
    const c = Number(i.size) > 0 ? "sell" : "buy";
    return this.placeOrder(n, { symbol: i.symbol, side: c, type: "market", size: o, reduceOnly: !0 }, r, s);
  }
}
function ys(t, n, i, r) {
  if (i >= 1) return n;
  const s = r === "market" ? t.marketStepSize ?? t.stepSize : t.stepSize;
  return Number(me(n * Math.max(0, i), s || 1e-8, "floor"));
}
function hc(t) {
  const n = je(t, "strategy_id", "id");
  return n ? {
    id: n,
    symbol: je(t, "market", "symbol"),
    side: je(t, "side").toLowerCase() === "sell" ? "sell" : "buy",
    status: je(t, "status").toLowerCase(),
    totalSize: ve(t, "total_size"),
    filledSize: ve(t, "filled_size"),
    durationSec: ve(t, "duration_sec"),
    slicesFired: ve(t, "slices_fired"),
    nominalSlices: ve(t, "nominal_slices"),
    createdAt: ve(t, "created_at_ms", "created_at") ?? 0,
    lastError: je(t, "last_error")
  } : null;
}
var Ti = {};
Object.defineProperty(Ti, "__esModule", { value: !0 });
Ti.bech32m = Ni = Ti.bech32 = void 0;
const cr = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", Mo = {};
for (let t = 0; t < cr.length; t++) {
  const n = cr.charAt(t);
  Mo[n] = t;
}
function Gn(t) {
  const n = t >> 25;
  return (t & 33554431) << 5 ^ -(n >> 0 & 1) & 996825010 ^ -(n >> 1 & 1) & 642813549 ^ -(n >> 2 & 1) & 513874426 ^ -(n >> 3 & 1) & 1027748829 ^ -(n >> 4 & 1) & 705979059;
}
function ka(t) {
  let n = 1;
  for (let i = 0; i < t.length; ++i) {
    const r = t.charCodeAt(i);
    if (r < 33 || r > 126)
      return "Invalid prefix (" + t + ")";
    n = Gn(n) ^ r >> 5;
  }
  n = Gn(n);
  for (let i = 0; i < t.length; ++i) {
    const r = t.charCodeAt(i);
    n = Gn(n) ^ r & 31;
  }
  return n;
}
function ws(t, n, i, r) {
  let s = 0, a = 0;
  const o = (1 << i) - 1, c = [];
  for (let d = 0; d < t.length; ++d)
    for (s = s << n | t[d], a += n; a >= i; )
      a -= i, c.push(s >> a & o);
  if (r)
    a > 0 && c.push(s << i - a & o);
  else {
    if (a >= n)
      return "Excess padding";
    if (s << i - a & o)
      return "Non-zero padding";
  }
  return c;
}
function mc(t) {
  return ws(t, 8, 5, !0);
}
function gc(t) {
  const n = ws(t, 5, 8, !1);
  if (Array.isArray(n))
    return n;
}
function fc(t) {
  const n = ws(t, 5, 8, !1);
  if (Array.isArray(n))
    return n;
  throw new Error(n);
}
function zo(t) {
  let n;
  t === "bech32" ? n = 1 : n = 734539939;
  function i(o, c, d) {
    if (d = d || 90, o.length + 7 + c.length > d)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let p = ka(o);
    if (typeof p == "string")
      throw new Error(p);
    let u = o + "1";
    for (let l = 0; l < c.length; ++l) {
      const h = c[l];
      if (h >> 5)
        throw new Error("Non 5-bit word");
      p = Gn(p) ^ h, u += cr.charAt(h);
    }
    for (let l = 0; l < 6; ++l)
      p = Gn(p);
    p ^= n;
    for (let l = 0; l < 6; ++l) {
      const h = p >> (5 - l) * 5 & 31;
      u += cr.charAt(h);
    }
    return u;
  }
  function r(o, c) {
    if (c = c || 90, o.length < 8)
      return o + " too short";
    if (o.length > c)
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
    const l = o.slice(0, u), h = o.slice(u + 1);
    if (h.length < 6)
      return "Data too short";
    let m = ka(l);
    if (typeof m == "string")
      return m;
    const f = [];
    for (let k = 0; k < h.length; ++k) {
      const y = h.charAt(k), _ = Mo[y];
      if (_ === void 0)
        return "Unknown character " + y;
      m = Gn(m) ^ _, !(k + 6 >= h.length) && f.push(_);
    }
    return m !== n ? "Invalid checksum for " + o : { prefix: l, words: f };
  }
  function s(o, c) {
    const d = r(o, c);
    if (typeof d == "object")
      return d;
  }
  function a(o, c) {
    const d = r(o, c);
    if (typeof d == "object")
      return d;
    throw new Error(d);
  }
  return {
    decodeUnsafe: s,
    decode: a,
    encode: i,
    toWords: mc,
    fromWordsUnsafe: gc,
    fromWords: fc
  };
}
var Ni = Ti.bech32 = zo("bech32");
Ti.bech32m = zo("bech32m");
const To = 1023;
function ts(t) {
  const n = t[0], i = n >> 4, r = n & 15, a = i === 14 || i === 15 ? r === 1 ? "stake" : "stake_test" : r === 1 ? "addr" : "addr_test";
  return Ni.encode(a, Ni.toWords(t), To);
}
function bc(t) {
  return ts(kn(t));
}
function xc(t) {
  const { words: n } = Ni.decode(t, To);
  return ct(new Uint8Array(Ni.fromWords(n)));
}
function en(t, n = 12, i = 6) {
  return t.length <= n + i + 1 ? t : `${t.slice(0, n)}…${t.slice(-i)}`;
}
function Ei(t, n) {
  if (!(n >= 0 && n < t.length)) throw new Error(`CBOR: unexpected end at ${n}`);
  const i = t[n], r = i >> 5, s = i & 31;
  if (s < 24) return { major: r, info: s, len: s, hdr: 1 };
  if (n + (s === 24 ? 2 : s === 25 ? 3 : s === 26 ? 5 : s === 27 ? 9 : 1) > t.length) throw new Error(`CBOR: truncated head at ${n}`);
  if (s === 24) return { major: r, info: s, len: t[n + 1], hdr: 2 };
  if (s === 25) return { major: r, info: s, len: t[n + 1] << 8 | t[n + 2], hdr: 3 };
  if (s === 26) return { major: r, info: s, len: (t[n + 1] << 24 >>> 0) + (t[n + 2] << 16) + (t[n + 3] << 8) + t[n + 4], hdr: 5 };
  if (s === 27) {
    let o = 0n;
    for (let c = 1; c <= 8; c++) o = o << 8n | BigInt(t[n + c]);
    return { major: r, info: s, len: o <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(o) : -2, hdr: 9, big: o };
  }
  if (s === 31) return { major: r, info: s, len: -1, hdr: 1 };
  throw new Error(`CBOR: reserved additional info ${s} at ${n}`);
}
function Zt(t, n) {
  const i = vc(t, n);
  if (i > t.length) throw new Error(`CBOR: item at ${n} runs past the end`);
  return i;
}
function vc(t, n) {
  const i = Ei(t, n);
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
        for (; t[r] !== 255; ) r = kc(t, r);
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
function kc(t, n) {
  return Zt(t, Zt(t, n));
}
function ya(t, n) {
  return n < 24 ? new Uint8Array([t << 5 | n]) : n < 256 ? new Uint8Array([t << 5 | 24, n]) : n < 65536 ? new Uint8Array([t << 5 | 25, n >> 8, n & 255]) : new Uint8Array([t << 5 | 26, n >>> 24 & 255, n >> 16 & 255, n >> 8 & 255, n & 255]);
}
function No(t, n) {
  const i = Ei(t, n);
  if (i.major !== 4 && i.major !== 5) throw new Error("CBOR: expected array or map");
  let r = n + i.hdr;
  const s = [], a = i.len === -1 ? 1 / 0 : i.major === 5 ? i.len * 2 : i.len;
  for (let o = 0; o < a && !(i.len === -1 && t[r] === 255); o++) {
    const c = Zt(t, r);
    s.push([r, c]), r = c;
  }
  return s;
}
class fr {
  constructor(n, i) {
    this.tag = n, this.value = i;
  }
}
function bn(t, n = 0) {
  const i = Ei(t, n);
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
          const [c, d] = bn(t, r);
          o.push(typeof c == "string" ? new TextEncoder().encode(c) : c), r = d;
        }
        a = ir(...o), r += 1;
      } else
        a = t.slice(r, r + i.len), r += i.len;
      return [i.major === 3 ? new TextDecoder().decode(a) : a, r];
    }
    case 4: {
      const a = [], o = i.len === -1 ? 1 / 0 : i.len;
      for (let c = 0; c < o; c++) {
        if (i.len === -1 && t[r] === 255) {
          r += 1;
          break;
        }
        const [d, p] = bn(t, r);
        a.push(d), r = p;
      }
      return [a, r];
    }
    case 5: {
      const a = /* @__PURE__ */ new Map(), o = i.len === -1 ? 1 / 0 : i.len;
      for (let c = 0; c < o; c++) {
        if (i.len === -1 && t[r] === 255) {
          r += 1;
          break;
        }
        const [d, p] = bn(t, r), [u, l] = bn(t, p);
        a.set(d, u), r = l;
      }
      return [a, r];
    }
    case 6: {
      const [a, o] = bn(t, r);
      return [new fr(i.len, a), o];
    }
    default:
      return i.info === 20 ? [!1, r] : i.info === 21 ? [!0, r] : i.info === 22 ? [null, r] : i.info === 23 ? [void 0, r] : [i.len, r];
  }
}
function wa(t, n) {
  const i = Ei(t, n);
  let r = new Uint8Array(0), s = n;
  return i.major === 6 && (r = t.slice(n, n + i.hdr), s = n + i.hdr), { tagBytes: r, items: No(t, s).map(([a, o]) => t.slice(a, o)) };
}
function yc(t, n) {
  const i = (o) => {
    const c = No(o, 0), d = /* @__PURE__ */ new Map();
    for (let p = 0; p < c.length; p += 2) {
      const [u, l] = c[p], [h, m] = c[p + 1];
      d.set(ct(o.slice(u, l)), { key: o.slice(u, l), b: o, vs: h, ve: m });
    }
    return d;
  }, r = i(t), s = /* @__PURE__ */ new Map();
  for (const [o, c] of r) s.set(o, { key: c.key, raw: c.b.slice(c.vs, c.ve) });
  for (const [o, c] of i(n)) {
    const d = r.get(o);
    if (!d) {
      s.set(o, { key: c.key, raw: c.b.slice(c.vs, c.ve) });
      continue;
    }
    const p = wa(d.b, d.vs), u = wa(c.b, c.vs), l = /* @__PURE__ */ new Set(), h = [];
    for (const f of [...p.items, ...u.items]) {
      const k = ct(f);
      l.has(k) || (l.add(k), h.push(f));
    }
    const m = p.tagBytes.length ? p.tagBytes : u.tagBytes;
    s.set(o, { key: d.key, raw: ir(m, ya(4, h.length), ...h) });
  }
  const a = [ya(5, s.size)];
  for (const o of s.values()) a.push(o.key, o.raw);
  return ir(...a);
}
function wc(t, n) {
  const i = Ei(t, 0);
  if (i.major !== 4) throw new Error("CBOR: transaction is not an array");
  const r = i.hdr, s = Zt(t, r), a = Zt(t, s), o = t.slice(s, a), d = o.length === 1 && o[0] === 160 ? n : yc(o, n);
  return ir(t.slice(0, s), d, t.slice(a));
}
const dr = (t) => typeof t == "bigint" ? t : BigInt(t);
function _c(t) {
  const n = /* @__PURE__ */ new Map();
  if (!(t instanceof Map)) return n;
  for (const [i, r] of t)
    if (r instanceof Map)
      for (const [s, a] of r) {
        const o = `${ct(i)}.${ct(s)}`;
        n.set(o, (n.get(o) ?? 0n) + dr(a));
      }
  return n;
}
function _a(t) {
  if (Array.isArray(t)) {
    const n = t[1];
    return { lovelace: dr(t[0]), assetPolicies: n instanceof Map ? n.size : 0, assets: _c(n) };
  }
  return { lovelace: dr(t), assetPolicies: 0, assets: /* @__PURE__ */ new Map() };
}
function Sc(t) {
  if (!Array.isArray(t) || t[0] !== 1) return;
  const n = t[1], i = n instanceof fr ? n.value : n;
  if (i instanceof Uint8Array)
    try {
      return bn(i)[0];
    } catch {
      return;
    }
}
function $c(t) {
  if (t instanceof Map) {
    const r = _a(t.get(1));
    return { address: ts(t.get(0)), ...r, hasDatum: t.has(2), inlineDatum: t.has(2) ? Sc(t.get(2)) : void 0 };
  }
  const n = t, i = _a(n[1]);
  return { address: ts(n[0]), ...i, hasDatum: n.length > 2 };
}
const Cc = (t) => t instanceof fr ? t.value : t, Mc = (t) => {
  const [n, i] = t;
  return { txHash: ct(n), index: Number(i) };
};
function Ao(t) {
  const [n] = bn(kn(t)), i = n;
  if (!Array.isArray(i) || !(i[0] instanceof Map)) throw new Error("Not a Cardano transaction.");
  const r = i[0], s = r.get(1).map($c), a = Cc(r.get(0)).map(Mc);
  return {
    outputs: s,
    fee: dr(r.get(2)),
    inputCount: a.length,
    inputs: a,
    ttl: r.has(3) ? Number(r.get(3)) : void 0,
    bodyKeys: [...r.keys()].map(Number),
    isValid: i.length < 3 || i[2] === !0
  };
}
function fi(t, n = []) {
  return t instanceof Uint8Array ? n.push(t) : Array.isArray(t) ? t.forEach((i) => fi(i, n)) : t instanceof Map ? t.forEach((i, r) => (fi(r, n), fi(i, n))) : t instanceof fr && fi(t.value, n), n;
}
const Ke = (t) => Number(t) / 1e6;
class gt extends Error {
}
class br extends Error {
  constructor(n, i, r) {
    super(`Your deposit is on-chain (tx ${i.slice(0, 12)}…). Strike usually credits it from the chain on its own; registering it directly failed (${r}). Don't send it again. You can retry registering.`), this.requestId = n, this.txHash = i, this.name = "DepositRegistrationError";
  }
}
const zc = /* @__PURE__ */ new Set([0, 1, 2, 3, 7, 8, 14, 15]), Tc = 3000000n, ns = 2000000n, Po = 3.5, Nc = (t) => Math.max(0, Math.floor((t - Po) * 100) / 100);
function Ac(t) {
  const n = xc(t), i = parseInt(n[0], 16);
  return i > 7 || i % 2 !== 0 ? null : n.slice(2, 58);
}
function Sa(t, n) {
  let i;
  try {
    i = Ao(t);
  } catch (u) {
    throw new gt(`Couldn't read the transaction (${u?.message || u}). Not signing.`);
  }
  const r = i.bodyKeys.filter((u) => !zc.has(u));
  if (r.length) throw new gt(`Transaction contains unexpected fields (${r.join(", ")}). Not signing.`);
  if (!i.isValid) throw new gt("Transaction is marked invalid. Not signing.");
  if (i.fee > Tc) throw new gt(`Network fee of ${Number(i.fee) / 1e6} ADA is too high. Not signing.`);
  const s = i.outputs.filter((u) => u.address !== n.walletAddress);
  if (s.length !== 1) throw new gt(`Expected one deposit output, found ${s.length}. Not signing.`);
  const a = s[0], o = a.lovelace - n.lovelace;
  if (o < 0n || o > ns)
    throw new gt(`Transaction sends ${a.lovelace} lovelace but ${n.lovelace} was requested (plus at most ${ns} for Strike's forwarding). Not signing.`);
  if (a.assetPolicies > 0) throw new gt("Transaction would move native tokens. Not signing.");
  if (a.inlineDatum === void 0) throw new gt("Deposit output has no readable datum. Not signing.");
  const c = new Set(fi(a.inlineDatum).map(ct)), d = Ac(n.walletAddress), p = [[ct(An(n.requestId)), "this deposit request"]];
  d && p.push([d, "your wallet"]), n.accountId && p.push([ct(An(n.accountId)), "your Strike account"]);
  for (const [u, l] of p)
    if (!c.has(u)) throw new gt(`Deposit datum doesn't reference ${l}. Not signing.`);
  return { preview: i, dest: a, forwardingCost: o };
}
class Pc {
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
    }).catch((l) => {
      throw /build/i.test(l?.message ?? "") ? new Error(`Strike couldn't build the deposit transaction. Besides the amount, your wallet needs ${Number(ns) / 1e6} ADA for Strike's forwarding, about 0.2 ADA network fee and about 1 ADA left as change. Try a smaller amount.`) : l;
    });
    if (o.format !== "cardano_cbor") throw new gt(`Unexpected transaction format: ${o.format}`);
    const { preview: c, dest: d, forwardingCost: p } = Sa(o.unsigned_tx, { walletAddress: n.address, lovelace: i, requestId: s.request_id, accountId: r }), u = Number(s.quote?.expiration_at);
    return Object.freeze({
      requestId: s.request_id,
      lovelace: i,
      usdValue: Number(s.quote.usd_value),
      exchangeRate: Number(s.quote.exchange_rate),
      confirmationsRequired: s.confirmations_required,
      unsignedTx: o.unsigned_tx,
      preview: c,
      destination: { address: d.address, lovelace: d.lovelace },
      forwardingCost: p,
      networkFee: c.fee,
      quotedAddress: s.deposit_address,
      expiresAt: Number.isFinite(u) && u > 0 ? u < 1e12 ? u * 1e3 : u : void 0,
      accountId: r
    });
  }
  /** Step 3: re-check, wallet signs (CIP-30 signTx), we splice witnesses, submit on-chain, then register with Strike. */
  async signAndSubmit(n, i) {
    if (i.expiresAt && Date.now() > i.expiresAt - 15e3) throw new gt("This quote has expired. Review the deposit again.");
    Sa(i.unsignedTx, { walletAddress: n.address, lovelace: i.lovelace, requestId: i.requestId, accountId: i.accountId });
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
        s = o, a < r - 1 && await new Promise((c) => setTimeout(c, 1500 * 2 ** a));
      }
    throw new br(n, i, s?.message || String(s));
  }
}
const jt = 5;
class Nt extends Error {
}
const Lc = /* @__PURE__ */ new Set([0, 1, 2, 3, 7, 8, 14, 15]), Ec = 5000000n, Ic = 3000000n;
function Fc(t) {
  const n = String(t ?? "");
  if (n.length >= 32 && n.length % 2 === 0 && /^[0-9a-fA-F]+$/.test(n)) {
    const i = kn(n);
    let r;
    try {
      r = new TextDecoder("utf-8", { fatal: !0 }).decode(i);
    } catch {
      r = n;
    }
    return { text: r, hex: n.toLowerCase() };
  }
  return { text: n, hex: ct(An(n)) };
}
function $a(t, n) {
  let i;
  try {
    i = Ao(t);
  } catch (o) {
    throw new Nt(`Couldn't read Strike's funding transaction (${o?.message || o}). Not signing.`);
  }
  const r = i.bodyKeys.filter((o) => !Lc.has(o));
  if (r.length) throw new Nt(`Funding transaction contains unexpected fields (${r.join(", ")}). Not signing.`);
  if (!i.isValid) throw new Nt("Funding transaction is marked invalid. Not signing.");
  if (i.fee > Ic) throw new Nt(`Network fee of ${Number(i.fee) / 1e6} ADA is too high. Not signing.`);
  const s = i.outputs.filter((o) => o.address !== n.walletAddress);
  if (!s.length) throw new Nt("Funding transaction pays nothing to Strike's validator. Not signing.");
  for (const o of s) {
    if (o.address !== n.validatorAddress) throw new Nt(`Funding transaction pays an unexpected address (${o.address.slice(0, 20)}…). Not signing.`);
    if (o.assetPolicies > 0) throw new Nt("Funding transaction would move native tokens. Not signing.");
  }
  const a = s.reduce((o, c) => o + c.lovelace, 0n);
  if (a > Ec) throw new Nt(`Funding transaction sends ${Number(a) / 1e6} ADA to the validator (expected about 1–2). Not signing.`);
  return { preview: i, lovelace: a };
}
class Dc {
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
    const o = Fc(r.message_to_sign), c = { withdrawId: r.withdraw_id, usdValue: n, fee: Number(r.fee), messageToSign: o.text, messageHex: o.hex, asset: s };
    if (r.tx_cbor) {
      if (!i) throw new Error("Reconnect your wallet to withdraw.");
      if (!r.validator_address) throw new Nt("Strike sent a funding transaction without its validator address. Not signing.");
      const { preview: d, lovelace: p } = $a(r.tx_cbor, { walletAddress: i, validatorAddress: r.validator_address });
      c.funding = { unsignedTx: r.tx_cbor, validatorAddress: r.validator_address, lovelace: p, networkFee: d.fee, preview: d };
    }
    return Object.freeze(c);
  }
  /** Step 2: the user's own wallet signs Strike's message (and the funding transaction, if any); the API key alone cannot withdraw. */
  async signAndSubmit(n, i) {
    const r = await n.signHex(i.messageHex), s = { withdraw_id: i.withdrawId, wallet_signature: r };
    i.funding && ($a(i.funding.unsignedTx, { walletAddress: n.address, validatorAddress: i.funding.validatorAddress }), s.signed_tx_cbor = await n.signTransaction(i.funding.unsignedTx));
    const a = await this.http.request("POST", "/v2/withdraw", { body: s });
    return { status: a.status, requestId: a.request_id };
  }
}
class Lo {
  constructor(n, i = globalThis.WebSocket) {
    re(this, "ws", null);
    re(this, "listeners", /* @__PURE__ */ new Set());
    re(this, "stateListeners", /* @__PURE__ */ new Set());
    re(this, "retry", 0);
    re(this, "closedByUser", !1);
    re(this, "pingTimer", null);
    re(this, "reconnectTimer", null);
    re(this, "nextId", 1);
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
        const c = o.trim();
        if (!c) continue;
        let d;
        try {
          d = this.parse(c);
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
class Oc extends Lo {
  constructor() {
    super(...arguments);
    re(this, "subs", /* @__PURE__ */ new Map());
  }
  /** `depthUpdate` sequence ids are uint64 and may exceed 2^53: keep them exact. */
  parse(i) {
    return i.includes('"depthUpdate"') ? vo(i) : JSON.parse(i);
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
const Br = 900001;
class Bc extends Lo {
  /**
   * @param serverNowMs current Strike server time in ms, never ahead of it (StrikeHttp.serverNowMs). Read on
   * every (re)connect, so a later clock re-sync also fixes the socket's logon.
   */
  constructor(i, r, s = () => Date.now() - 500, a) {
    super(i, a);
    re(this, "triedAltLogon", !1);
    this.key = r, this.serverNowMs = s, this.onMessage((o) => {
      if (o?.result?.authenticated) {
        this.send({ method: "subscribe", channel: "userstream" });
        return;
      }
      o?.id === Br && !this.triedAltLogon && (this.triedAltLogon = !0, this.logon(!0));
    });
  }
  async logon(i) {
    const r = this.serverNowMs(), s = this.key.publicKeyHex, a = i ? await this.key.sign(`apiKey=${s}&timestamp=${r}`) : await Wl(this.key, r);
    this.send({ id: i ? Br + 1 : Br, method: "session.logon", params: { apiKey: s, signature: a, timestamp: r } });
  }
  async onOpen() {
    this.triedAltLogon = !1, await this.logon(!1);
  }
}
const Rc = 6e4;
class qc {
  constructor(n, i, r, s, a = Uc(), o = Hc()) {
    re(this, "live", null);
    re(this, "lastWrite", 0);
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
        const o = Dt();
        if (await this.vault.put({ id: o, key: i.cryptoKey, publicKeyHex: i.publicKeyHex, expiresAt: a.expiresAt, lastActive: s }), this.live !== a) return void this.vault.delete(o).catch(() => {
        });
        a.keyId = o;
        const c = { v: 2, session: n, keyId: o, publicKeyHex: i.publicKeyHex, expiresAt: a.expiresAt, lastActive: s };
        this.meta.setItem(this.storageKey, JSON.stringify(c));
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
    if (!i || this.expiry(n) || (i.lastActive = n, n - this.lastWrite < Rc || !i.keyId)) return;
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
function Uc() {
  try {
    return typeof sessionStorage < "u" ? sessionStorage : null;
  } catch {
    return null;
  }
}
function Hc() {
  try {
    return typeof indexedDB < "u" ? new jc() : null;
  } catch {
    return null;
  }
}
const Wc = "strike-everywhere-keys", Rr = "keys";
class jc {
  constructor() {
    re(this, "db", null);
  }
  open() {
    return this.db ?? (this.db = new Promise((n, i) => {
      const r = indexedDB.open(Wc, 1);
      r.onupgradeneeded = () => r.result.createObjectStore(Rr, { keyPath: "id" }), r.onsuccess = () => n(r.result), r.onerror = () => i(r.error), r.onblocked = () => i(new Error("IndexedDB blocked"));
    }).catch((n) => {
      throw this.db = null, n;
    })), this.db;
  }
  async run(n, i) {
    const r = await this.open();
    return new Promise((s, a) => {
      const o = r.transaction(Rr, n), c = i(o.objectStore(Rr));
      o.oncomplete = () => s(c ? c.result : void 0), o.onerror = () => a(o.error), o.onabort = () => a(o.error);
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
const Gc = /* @__PURE__ */ new Set(["_events", "_eventsCount", "_maxListeners", "enable", "isEnabled"]), Vc = { nufi: "NuFi", vespr: "VESPR", gerowallet: "GeroWallet", typhoncip30: "Typhon" };
function Yc(t) {
  return !t || /[A-Z]/.test(t) ? t : Vc[t] ?? t.charAt(0).toUpperCase() + t.slice(1);
}
function Kc(t = globalThis) {
  const n = t?.cardano;
  if (!n || typeof n != "object") return [];
  const i = /* @__PURE__ */ new Set(), r = [];
  for (const s of Object.keys(n)) {
    if (Gc.has(s)) continue;
    const a = n[s];
    !a || typeof a.enable != "function" || i.has(a) || (i.add(a), r.push({ id: s, name: Yc(a.name || s), icon: a.icon }));
  }
  return r.sort((s, a) => s.name.localeCompare(a.name));
}
function Jn(t) {
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
class Eo extends Error {
  constructor(n, i) {
    super(
      n === 1 ? "Your wallet is on a test network. Switch it to Cardano Mainnet." : "Your wallet is on Mainnet. Switch it to the Preprod test network."
    ), this.expected = n, this.actual = i;
  }
}
class $i {
  constructor(n, i, r, s, a) {
    this.id = n, this.name = i, this.api = r, this.addressHex = s, this.address = a;
  }
  static async enable(n, i, r = globalThis) {
    const s = r?.cardano?.[n];
    if (!s?.enable) throw new Error(`Wallet "${n}" is not installed in this browser.`);
    const a = await s.enable(), o = await a.getNetworkId();
    if (o !== i.cardanoNetworkId) throw new Eo(i.cardanoNetworkId, o);
    const c = await a.getChangeAddress();
    return new $i(n, s.name || n, a, c, bc(c));
  }
  /** CIP-30 `signData`, formatted the way Strike expects: `"{coseSign1Hex}:{coseKeyHex}"`. */
  async signMessage(n) {
    return this.signHex(ct(An(n)));
  }
  /** CIP-30 `signData` over exact bytes given as hex, in Strike's `"{coseSign1Hex}:{coseKeyHex}"` format. */
  async signHex(n) {
    const { signature: i, key: r } = await this.api.signData(this.addressHex, n);
    return `${i}:${r}`;
  }
  /** Spendable ADA in lovelace (ignores native assets). */
  async balanceLovelace() {
    const [n] = bn(kn(await this.api.getBalance())), i = Array.isArray(n) ? n[0] : n;
    return typeof i == "bigint" ? i : BigInt(i);
  }
  async utxos() {
    return await this.api.getUtxos() ?? [];
  }
  /** Signs an unsigned transaction and returns the fully witnessed transaction hex. */
  async signTransaction(n) {
    const i = await this.api.signTx(n, !0);
    return ct(wc(kn(n), kn(i)));
  }
  async submit(n) {
    return this.api.submitTx(n);
  }
}
const Xc = 30 * 6e4, Ca = ["pointerdown", "pointermove", "keydown", "wheel", "touchstart"];
class Ii {
  constructor(n) {
    re(this, "net");
    re(this, "http");
    re(this, "market");
    re(this, "account");
    re(this, "trading");
    re(this, "deposits");
    re(this, "withdrawals");
    re(this, "feeBps");
    re(this, "maxFeeBps");
    re(this, "session", null);
    re(this, "wallet", null);
    re(this, "store");
    re(this, "listeners", /* @__PURE__ */ new Set());
    re(this, "specs", /* @__PURE__ */ new Map());
    re(this, "rawMarkets", /* @__PURE__ */ new Map());
    re(this, "priceStream", null);
    re(this, "userStream", null);
    re(this, "idleTimer", null);
    re(this, "idleTimeoutMs");
    re(this, "onActivity", (n) => {
      n.isTrusted && this.touch();
    });
    re(this, "onVisible", () => {
      typeof document < "u" && document.visibilityState === "visible" && this.checkExpiry();
    });
    this.opts = n, this.net = kl[n.network ?? "mainnet"], this.http = new Gl(this.net), this.market = new nc(this.http), this.account = new ic(this.http), this.trading = new Si(this.http, this.account), this.deposits = new Pc(this.http), this.withdrawals = new Dc(this.http);
    const i = Ma(n.feeBps ?? 5);
    this.maxFeeBps = Ma(n.maxFeeBps ?? i, i), this.feeBps = Math.min(i, this.maxFeeBps), this.idleTimeoutMs = Math.max(0, Number(n.idleTimeoutMs ?? Xc) || 0), this.store = new qc(n.persist ?? "memory", `strike-everywhere:${this.net.network}:${n.builderCode}`, n.sessionTtlMs ?? 12 * 36e5, this.idleTimeoutMs), this.http.beforeSign = () => this.checkExpiry();
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
      for (const n of Ca) window.addEventListener(n, this.onActivity, { capture: !0, passive: !0 });
      document.addEventListener("visibilitychange", this.onVisible), this.idleTimer = setInterval(() => this.checkExpiry(), 3e4);
    }
  }
  unwatchActivity() {
    if (this.idleTimer && clearInterval(this.idleTimer), this.idleTimer = null, !(typeof window > "u")) {
      for (const n of Ca) window.removeEventListener(n, this.onActivity, { capture: !0 });
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
    return Kc();
  }
  /** Enables the wallet and checks Strike's new-account rule before asking for any signature. */
  async checkOnboarding(n) {
    this.wallet = await $i.enable(n, this.net);
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
    (!this.wallet || this.wallet.id !== n) && (this.wallet = await $i.enable(n, this.net));
    const r = this.wallet, { session: s, key: a } = await Yl({
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
    if (this.wallet || (this.wallet = await $i.enable(n, this.net)), this.session?.address && this.wallet.address !== this.session.address)
      throw this.wallet = null, new Error(
        "Your wallet's active address isn't the one connected to Strike here. Switch back to that account, or turn on single-address mode in your wallet (multi-address mode can rotate addresses), or disconnect and connect again."
      );
    return this.wallet;
  }
  // ---------------------------------------------------------------- markets
  async loadMarkets() {
    const n = await this.market.markets();
    for (const i of n)
      this.rawMarkets.set(i.symbol, i), this.specs.set(i.symbol, fa(i));
    return n.filter((i) => i.status === "trading").map(fa);
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
    return this.priceStream || (this.priceStream = new Oc(this.net.wsPrice), this.priceStream.connect()), this.priceStream;
  }
  userEvents() {
    return this.http.key ? (this.userStream || (this.userStream = new Bc(this.net.wsUser, this.http.key, () => this.http.serverNowMs()), this.userStream.onMessage((n) => this.emit({ type: "user", data: n })), this.userStream.connect()), this.userStream) : null;
  }
  // ---------------------------------------------------------------- trading
  /**
   * Places an order with this builder's fee and waits for Strike's final verdict.
   * Throws without sending if the requested leverage can't be applied (the user was shown margin and
   * liquidation at that leverage, so sending at a different one would misrepresent the risk).
   */
  async placeOrder(n) {
    const i = this.spec(n.symbol);
    if (n.leverage && await this.applyLeverage(n.symbol, n.leverage), zn(n.type)) {
      const s = n.workingType === "contract_price", [a, o] = await Promise.all([this.markPrice(n.symbol).catch(() => 0), s ? this.lastPrice(n.symbol).catch(() => 0) : Promise.resolve(0)]), c = _i({ ...n, mark: a, last: o, priceBound: Number(this.raw(n.symbol)?.order_limit_price_bound) || void 0, tickSize: i.tickSize }), d = s ? o : a;
      if (c) throw new Error(d > 0 ? `${c}. Order not sent.` : `Couldn't check the trigger against the current ${s ? "last" : "mark"} price. Order not sent.`);
    } else if (n.type === "trailing_stop_market") {
      const s = _i({ ...n, mark: 0 });
      if (s) throw new Error(`${s}. Order not sent.`);
    }
    const r = n.price ?? n.stopPrice ?? Number(this.raw(n.symbol)?.mark_price ?? 0);
    return this.submitTracked(n.symbol, Si.newOrderIds(n), n.side, n.size * r, (s) => this.trading.placeOrder(i, n, this.orderFeeBps, s));
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
    const s = wo(i, Number(me(n.size, i.marketStepSize ?? i.stepSize, "floor")), Math.round(Number(n.durationSec)), r);
    if (s) throw new Error(s);
    if (n.limitPrice !== void 0) {
      const c = Number(this.raw(n.symbol)?.order_limit_price_bound) || 0.05;
      if (!(n.limitPrice > 0) || Math.abs(n.limitPrice - r) / r > c)
        throw new Error(`TWAP limit price must be within ${(c * 100).toFixed(0)}% of the mark price. TWAP not started.`);
    }
    n.leverage && await this.applyLeverage(n.symbol, n.leverage);
    const a = await this.trading.createTwap(i, n, this.orderFeeBps), o = r;
    return ga(a.strategyId) && this.beacon({ type: "order", status: "twap", clientOrderId: a.strategyId, symbol: n.symbol, side: n.side, notional: n.size * o, reduceOnly: !!n.reduceOnly }), a;
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
    return new Zl(this.market, this.prices(), n).start();
  }
  /** Strike app page of a vault (falls back to the vault list for anything that isn't a vault UUID). */
  vaultUrl(n) {
    return this.appUrl(ga(n) ? `/vaults/${n}` : "/vaults");
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
      price: nn(r) ? i.price ?? Number(n.price) : void 0,
      stopPrice: zn(r) ? i.stopPrice ?? Number(n.stop_price) : void 0,
      reduceOnly: !!n.reduce_only,
      // Keep the price the trigger watches; without it the replacement would fall back to the mark.
      workingType: zn(r) && n.working_type === "contract_price" ? "contract_price" : void 0
    };
    if (zn(r)) {
      const d = o.workingType === "contract_price", [p, u] = await Promise.all([this.markPrice(n.symbol).catch(() => 0), d ? this.lastPrice(n.symbol).catch(() => 0) : Promise.resolve(0)]), l = _i({ ...o, mark: p, last: u, priceBound: Number(this.raw(n.symbol)?.order_limit_price_bound) || void 0, tickSize: s.tickSize });
      if (l) throw new Error(`${l}. Order not changed.`);
    }
    const c = o.price ?? o.stopPrice ?? Number(this.raw(n.symbol)?.mark_price ?? 0);
    return this.submitTracked(n.symbol, { clientOrderId: Dt() }, n.side, o.size * c, (d) => this.trading.replaceOrder(s, n, o, this.orderFeeBps, d.clientOrderId), !!o.reduceOnly);
  }
  /**
   * Adds take-profit and/or stop-loss orders to an open position: reduce-only conditional orders on the closing side,
   * for `fraction` of the position (Strike's order-type docs recommend reduce-only for exits).
   */
  async setPositionExits(n, i) {
    const r = Math.abs(Number(n.size)) * Math.min(1, Math.max(0, i.fraction ?? 1)), s = Number(n.size) > 0 ? "sell" : "buy", a = [];
    let o = null;
    const c = [];
    i.takeProfit && c.push({ symbol: n.symbol, side: s, type: "take_profit", size: r, stopPrice: i.takeProfit, reduceOnly: !0, closePosition: (i.fraction ?? 1) >= 1, workingType: i.workingType }), i.stopLoss && c.push({ symbol: n.symbol, side: s, type: "stop", size: r, stopPrice: i.stopLoss, reduceOnly: !0, closePosition: (i.fraction ?? 1) >= 1, workingType: i.workingType });
    for (const d of c)
      try {
        a.push(await this.placeOrder(d));
      } catch (p) {
        if (!(p instanceof Jt)) throw p;
        if (o) {
          const [u, l] = [o.settled, p.settled];
          p.settled = Promise.all([u, l]).then(([h, m]) => h && m ? m : null);
        }
        o = p;
      }
    if (o) throw o;
    return a;
  }
  /** Trailing stop on an open position: reduce-only `trailing_stop_market` for the whole position. */
  async trailPosition(n, i, r, s) {
    const a = Number(n.size) > 0 ? "sell" : "buy";
    return this.placeOrder({ symbol: n.symbol, side: a, type: "trailing_stop_market", size: Math.abs(Number(n.size)), callbackRate: i, activationPrice: r, reduceOnly: !0, workingType: s });
  }
  /** Closes (part of) a position with a reduce-only limit order at `price`. */
  async limitClose(n, i, r = 1) {
    const s = Number(n.size) > 0 ? "sell" : "buy", a = ys(this.spec(n.symbol), Math.abs(Number(n.size)), Math.min(1, r), "limit");
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
        s instanceof Jt ? i.push({ symbol: r.symbol, ok: !0, status: "unconfirmed" }) : i.push({ symbol: r.symbol, ok: !1, error: s?.message || String(s) });
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
    const r = await this.markPrice(n.symbol).catch(() => 0), s = Co(n, r);
    if (s) throw new Error(`${s}. Grid not started.`);
    return this.trading.createGrid(i, n, this.orderFeeBps);
  }
  /** Closes a position at market; `fraction` (0–1) closes part of it. */
  async closePosition(n, i = 1) {
    const r = this.spec(n.symbol), s = Number(this.raw(n.symbol)?.mark_price ?? n.entry_price), a = Number(n.size) > 0 ? "sell" : "buy", o = Math.abs(Number(n.size)) * Math.min(1, Math.max(0, i)) * s;
    return this.submitTracked(n.symbol, Si.newOrderIds({}), a, o, (c) => this.trading.closePosition(r, n, this.orderFeeBps, c, i), !0);
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
          await new Promise((c) => setTimeout(c, 400));
        }
      } catch (a) {
        const o = await this.account.positions().catch(() => []), c = Number(o.find((d) => d.symbol === n && Number(d.size) !== 0)?.leverage);
        if (Number.isFinite(c) && c > 0 && c <= i) return;
        throw new Error(`Couldn't set ${n} leverage to ${i}x (${a?.message || a}). Order not sent.`);
      }
  }
  /**
   * Registers the order's ids with the partner API *before* sending it (attribution is only credited
   * for ids registered before Strike created the order, so nobody can claim fills after the fact),
   * then places it and reports the outcome.
   */
  async submitTracked(n, i, r, s, a, o = !1) {
    const c = { clientOrderId: i.clientOrderId, legClientOrderIds: i.legClientOrderIds, symbol: n, side: r, notional: s, reduceOnly: o };
    await this.beacon({ type: "order", status: "intent", ...c }, 1500);
    const d = await a(i);
    try {
      const p = await this.trading.waitForOrder(n, d.clientOrderId);
      return this.beacon({ type: "order", ...c, orderId: p.id, status: p.status }), this.emit({ type: "order", order: p }), p;
    } catch (p) {
      throw this.beacon({ type: "order", ...c, status: p instanceof Nn ? "rejected" : "pending" }), p instanceof Jt && (p.settled = this.trading.waitForOrder(n, d.clientOrderId, 18e4).then(
        (u) => (this.beacon({ type: "order", ...c, orderId: u.id, status: u.status }), this.emit({ type: "order", order: u }), u),
        (u) => {
          if (u instanceof Nn)
            throw this.beacon({ type: "order", ...c, status: "rejected" }), u;
          return null;
        }
      )), p;
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
      throw i instanceof br && this.beacon({ type: "deposit", usd: n.usdValue, txHash: i.txHash }), i;
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
function Ma(t, n = 5) {
  const i = Number(t);
  return Math.max(0, Math.min(yl, Math.round(Number.isFinite(i) ? i : n)));
}
var Qn, He, qr, za, pr = 0, Io = [], We = Te, Ta = We.__b, Na = We.__r, Aa = We.diffed, Pa = We.__c, La = We.unmount, Ea = We.__;
function xr(t, n) {
  We.__h && We.__h(He, t, pr || n), pr = 0;
  var i = He.__H || (He.__H = { __: [], __h: [] });
  return t >= i.__.length && i.__.push({}), i.__[t];
}
function g(t) {
  return pr = 1, Zc(Fo, t);
}
function Zc(t, n, i) {
  var r = xr(Qn++, 2);
  if (r.t = t, !r.__c && (r.__ = [Fo(void 0, n), function(c) {
    var d = r.__N ? r.__N[0] : r.__[0], p = r.t(d, c);
    d !== p && (r.__N = [p, r.__[1]], r.__c.setState({}));
  }], r.__c = He, !He.u)) {
    var s = function(c, d, p) {
      if (!r.__c.__H) return !0;
      var u = r.__c.__H.__.filter(function(h) {
        return !!h.__c;
      });
      if (u.every(function(h) {
        return !h.__N;
      })) return !a || a.call(this, c, d, p);
      var l = !1;
      return u.forEach(function(h) {
        if (h.__N) {
          var m = h.__[0];
          h.__ = h.__N, h.__N = void 0, m !== h.__[0] && (l = !0);
        }
      }), !(!l && r.__c.props === c) && (!a || a.call(this, c, d, p));
    };
    He.u = !0;
    var a = He.shouldComponentUpdate, o = He.componentWillUpdate;
    He.componentWillUpdate = function(c, d, p) {
      if (this.__e) {
        var u = a;
        a = void 0, s(c, d, p), a = u;
      }
      o && o.call(this, c, d, p);
    }, He.shouldComponentUpdate = s;
  }
  return r.__N || r.__;
}
function Z(t, n) {
  var i = xr(Qn++, 3);
  !We.__s && _s(i.__H, n) && (i.__ = t, i.i = n, He.__H.__h.push(i));
}
function ii(t, n) {
  var i = xr(Qn++, 4);
  !We.__s && _s(i.__H, n) && (i.__ = t, i.i = n, He.__h.push(i));
}
function Oe(t) {
  return pr = 5, tn(function() {
    return { current: t };
  }, []);
}
function tn(t, n) {
  var i = xr(Qn++, 7);
  return _s(i.__H, n) && (i.__ = t(), i.__H = n, i.__h = t), i.__;
}
function Jc() {
  for (var t; t = Io.shift(); ) if (t.__P && t.__H) try {
    t.__H.__h.forEach(er), t.__H.__h.forEach(is), t.__H.__h = [];
  } catch (n) {
    t.__H.__h = [], We.__e(n, t.__v);
  }
}
We.__b = function(t) {
  He = null, Ta && Ta(t);
}, We.__ = function(t, n) {
  t && n.__k && n.__k.__m && (t.__m = n.__k.__m), Ea && Ea(t, n);
}, We.__r = function(t) {
  Na && Na(t), Qn = 0;
  var n = (He = t.__c).__H;
  n && (qr === He ? (n.__h = [], He.__h = [], n.__.forEach(function(i) {
    i.__N && (i.__ = i.__N), i.i = i.__N = void 0;
  })) : (n.__h.forEach(er), n.__h.forEach(is), n.__h = [], Qn = 0)), qr = He;
}, We.diffed = function(t) {
  Aa && Aa(t);
  var n = t.__c;
  n && n.__H && (n.__H.__h.length && (Io.push(n) !== 1 && za === We.requestAnimationFrame || ((za = We.requestAnimationFrame) || Qc)(Jc)), n.__H.__.forEach(function(i) {
    i.i && (i.__H = i.i), i.i = void 0;
  })), qr = He = null;
}, We.__c = function(t, n) {
  n.some(function(i) {
    try {
      i.__h.forEach(er), i.__h = i.__h.filter(function(r) {
        return !r.__ || is(r);
      });
    } catch (r) {
      n.some(function(s) {
        s.__h && (s.__h = []);
      }), n = [], We.__e(r, i.__v);
    }
  }), Pa && Pa(t, n);
}, We.unmount = function(t) {
  La && La(t);
  var n, i = t.__c;
  i && i.__H && (i.__H.__.forEach(function(r) {
    try {
      er(r);
    } catch (s) {
      n = s;
    }
  }), i.__H = void 0, n && We.__e(n, i.__v));
};
var Ia = typeof requestAnimationFrame == "function";
function Qc(t) {
  var n, i = function() {
    clearTimeout(r), Ia && cancelAnimationFrame(n), setTimeout(t);
  }, r = setTimeout(i, 100);
  Ia && (n = requestAnimationFrame(i));
}
function er(t) {
  var n = He, i = t.__c;
  typeof i == "function" && (t.__c = void 0, i()), He = n;
}
function is(t) {
  var n = He;
  t.__c = t.__(), He = n;
}
function _s(t, n) {
  return !t || t.length !== n.length || n.some(function(i, r) {
    return i !== t[r];
  });
}
function Fo(t, n) {
  return typeof n == "function" ? n(t) : n;
}
const Ur = ({ size: t = 12 }) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 12 12", "aria-hidden": "true", children: /* @__PURE__ */ e("path", { d: "M3 4.5 6 7.5 9 4.5", fill: "none", stroke: "currentColor", "stroke-width": "1.6", "stroke-linecap": "round", "stroke-linejoin": "round" }) }), Fa = ["#4efab0", "#7aa2ff", "#f8931a", "#c084fc", "#38bdf8", "#facc15", "#fb7185"], Da = "https://app.strikefinance.org/images/";
function Oa({ base: t }) {
  const n = [`${Da}${encodeURIComponent(t.toLowerCase())}.webp`, `${Da}${encodeURIComponent(t.toLowerCase())}.svg`], [i, r] = g(0);
  if (Z(() => r(0), [t]), i < n.length)
    return /* @__PURE__ */ e("span", { class: "coin img", "aria-hidden": "true", children: /* @__PURE__ */ e("img", { src: n[i], alt: "", width: 26, height: 26, loading: "lazy", decoding: "async", referrerpolicy: "no-referrer", onError: () => r(i + 1) }) });
  const s = t === "ADA" ? "#4efab0" : Fa[[...t].reduce((a, o) => a + o.charCodeAt(0), 0) % Fa.length];
  return /* @__PURE__ */ e("span", { class: "coin", style: { background: s }, "aria-hidden": "true", children: t.slice(0, t.length > 3 ? 2 : 3) });
}
let ed = 0;
function Wn({ children: t, label: n = "What is this?" }) {
  const [i, r] = g(!1), [s, a] = g(0), o = Oe(null), c = Oe(null), d = Oe(`se-info-${++ed}`).current;
  return Z(() => {
    if (!i) return;
    const p = (h) => o.current && !h.composedPath().includes(o.current) && r(!1), u = o.current?.getRootNode() ?? document, l = (h) => h.key === "Escape" && r(!1);
    return document.addEventListener("pointerdown", p, !0), u.addEventListener("keydown", l), () => {
      document.removeEventListener("pointerdown", p, !0), u.removeEventListener("keydown", l);
    };
  }, [i]), ii(() => {
    if (!i || !c.current) return a(0);
    const p = (c.current.closest(".card, .sheet") ?? document.documentElement).getBoundingClientRect(), u = c.current.getBoundingClientRect(), l = u.left - s, h = u.right - s;
    a(Math.round(h > p.right - 8 ? Math.max(p.left + 8 - l, p.right - 8 - h) : l < p.left + 8 ? p.left + 8 - l : 0));
  }), /* @__PURE__ */ e("span", { class: "info", ref: o, onKeyDown: (p) => p.key === "Escape" && i && (p.stopPropagation(), r(!1)), children: [
    /* @__PURE__ */ e("button", { type: "button", class: "info-b", "aria-label": n, "aria-expanded": i, "aria-controls": d, onClick: (p) => (p.stopPropagation(), r(!i)), children: /* @__PURE__ */ e("svg", { width: "13", height: "13", viewBox: "0 0 14 14", "aria-hidden": "true", children: [
      /* @__PURE__ */ e("circle", { cx: "7", cy: "7", r: "6.2", fill: "none", stroke: "currentColor", "stroke-width": "1.2" }),
      /* @__PURE__ */ e("path", { d: "M7 6.2v3.6", stroke: "currentColor", "stroke-width": "1.4", "stroke-linecap": "round" }),
      /* @__PURE__ */ e("circle", { cx: "7", cy: "4.2", r: ".85", fill: "currentColor" })
    ] }) }),
    i && /* @__PURE__ */ e("span", { class: "info-pop", id: d, role: "tooltip", ref: c, style: s ? { transform: `translateX(${s}px)` } : void 0, children: t })
  ] });
}
function Fe({ k: t, v: n, hint: i, info: r, cls: s }) {
  return /* @__PURE__ */ e("div", { class: "kv", children: [
    /* @__PURE__ */ e("span", { class: `k${i ? " dotted" : ""}`, title: i, children: [
      t,
      r && /* @__PURE__ */ e(Wn, { label: typeof t == "string" ? `About ${t}` : void 0, children: r })
    ] }),
    /* @__PURE__ */ e("span", { class: `v ${s ?? ""}`, children: n })
  ] });
}
function Hr({ on: t, label: n, onToggle: i }) {
  return /* @__PURE__ */ e("span", { class: `check${t ? " on" : ""}`, role: "checkbox", "aria-checked": t, tabIndex: 0, onClick: i, onKeyDown: (r) => (r.key === " " || r.key === "Enter") && (r.preventDefault(), i()), children: [
    /* @__PURE__ */ e("span", { class: "box", children: t && /* @__PURE__ */ e("svg", { width: "10", height: "10", viewBox: "0 0 10 10", "aria-hidden": "true", children: /* @__PURE__ */ e("path", { d: "M2 5.2 4.1 7.2 8 3", fill: "none", stroke: "#04120c", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round" }) }) }),
    n
  ] });
}
function td({ value: t, onChange: n }) {
  const i = Math.max(0, Math.min(100, t));
  return /* @__PURE__ */ e("div", { class: "slider", children: [
    /* @__PURE__ */ e("div", { class: "track" }),
    /* @__PURE__ */ e("div", { class: "fill", style: { width: `${i}%` } }),
    [0, 25, 50, 75, 100].map((r) => /* @__PURE__ */ e("span", { class: `tick${i >= r ? " on" : ""}`, style: { left: `${r}%` } }, r)),
    /* @__PURE__ */ e("span", { class: "knob", style: { left: `${i}%` } }),
    /* @__PURE__ */ e("input", { type: "range", min: 0, max: 100, step: 1, value: i, "aria-label": "Order size as % of buying power", onInput: (r) => n(Number(r.target.value)) })
  ] });
}
function nd({ points: t, up: n }) {
  if (t.length < 2) return /* @__PURE__ */ e("svg", { class: "spark" });
  const i = 380, r = 56, s = Math.min(...t), o = Math.max(...t) - s || 1, d = t.map((l, h) => [h / (t.length - 1) * i, r - 6 - (l - s) / o * (r - 14)]).map(([l, h], m) => `${m ? "L" : "M"}${l.toFixed(1)},${h.toFixed(1)}`).join(" "), p = n ? "#4efab0" : "#f43f5e", u = n ? "se-up" : "se-dn";
  return /* @__PURE__ */ e("svg", { class: "spark", viewBox: `0 0 ${i} ${r}`, preserveAspectRatio: "none", "aria-label": "48-hour price chart", role: "img", children: [
    /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ e("linearGradient", { id: u, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ e("stop", { offset: "0", "stop-color": p, "stop-opacity": ".22" }),
      /* @__PURE__ */ e("stop", { offset: "1", "stop-color": p, "stop-opacity": "0" })
    ] }) }),
    /* @__PURE__ */ e("path", { d: `${d} L${i},${r} L0,${r} Z`, fill: `url(#${u})` }),
    /* @__PURE__ */ e("path", { d, fill: "none", stroke: p, "stroke-width": "1.6", "vector-effect": "non-scaling-stroke" })
  ] });
}
function Ot() {
  return /* @__PURE__ */ e("span", { class: "spin", "aria-label": "Loading" });
}
function cn({ state: t, n, children: i }) {
  return /* @__PURE__ */ e("div", { class: `step ${t === "todo" ? "" : t}`, children: [
    /* @__PURE__ */ e("span", { class: "s", children: t === "done" ? "✓" : t === "active" ? /* @__PURE__ */ e(Ot, {}) : n }),
    /* @__PURE__ */ e("span", { children: i })
  ] });
}
function rn(t) {
  if (t == null || !Number.isFinite(t)) return "—";
  const n = Math.abs(t);
  return t.toLocaleString("en-US", n >= 1e3 ? { maximumFractionDigits: 0 } : n >= 1 ? { maximumFractionDigits: 2 } : { maximumSignificantDigits: 4 });
}
function ei(t, n = !1) {
  return t > 0 ? new Date(t).toLocaleString("en-US", n ? { month: "short", day: "numeric" } : { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }) : "—";
}
const At = () => typeof document < "u" && document.hidden;
function tr({ children: t, actions: n }) {
  return /* @__PURE__ */ e("div", { class: "confirm", role: "alertdialog", children: [
    /* @__PURE__ */ e("div", { children: t }),
    /* @__PURE__ */ e("div", { class: "confirm-a", children: n })
  ] });
}
function id(t) {
  const n = t.replace(/,/g, ".").replace(/[^0-9.]/g, ""), i = n.indexOf(".");
  return i === -1 ? n : n.slice(0, i + 1) + n.slice(i + 1).replace(/\./g, "");
}
function Ce(t) {
  const n = t.target, i = id(n.value);
  return n.value !== i && (n.value = i), i;
}
const rd = [
  { name: "Lace", href: "https://www.lace.io/" },
  { name: "Eternl", href: "https://eternl.io/" }
];
function Do({ client: t, onClose: n, onConnected: i }) {
  const [r, s] = g([]), [a, o] = g(null), [c, d] = g(null), [p, u] = g("pick"), [l, h] = g(""), [m, f] = g(!1), [k, y] = g("");
  Z(() => {
    const v = () => s(Ii.wallets());
    v();
    const C = setTimeout(v, 400), S = setTimeout(v, 1500);
    return () => (clearTimeout(C), clearTimeout(S));
  }, []);
  const _ = async (v) => {
    o(v), y(""), u("checking");
    try {
      d(await t.checkOnboarding(v.id)), u("review");
    } catch (C) {
      y(C instanceof Eo ? C.message : Jn(C) || "Could not open the wallet."), u("pick");
    }
  }, w = async () => {
    if (a) {
      y(""), u("signing");
      try {
        await t.connect(a.id, { onMessage: h }), u("done"), setTimeout(i, 600);
      } catch (v) {
        y(Jn(v)), u("review");
      }
    }
  }, T = (t.feeBps / 100).toFixed(2), $ = (t.maxFeeBps / 100).toFixed(2);
  return /* @__PURE__ */ e("div", { class: "overlay", onClick: (v) => v.target === v.currentTarget && p !== "signing" && n(), children: /* @__PURE__ */ e("div", { class: "sheet", role: "dialog", "aria-modal": "true", "aria-label": "Connect wallet", children: [
    /* @__PURE__ */ e("h3", { children: [
      p === "pick" ? "Connect a Cardano wallet" : a?.name,
      /* @__PURE__ */ e("button", { class: "x", onClick: n, "aria-label": "Close", disabled: p === "signing", children: "×" })
    ] }),
    p === "pick" && /* @__PURE__ */ e(U, { children: [
      r.length ? /* @__PURE__ */ e("div", { class: "wallets", children: r.map((v) => /* @__PURE__ */ e("button", { class: "wallet", onClick: () => _(v), children: [
        v.icon ? /* @__PURE__ */ e("img", { src: v.icon, alt: "" }) : /* @__PURE__ */ e("span", { class: "coin", children: v.name.slice(0, 2) }),
        v.name
      ] }, v.id)) }) : /* @__PURE__ */ e("p", { children: [
        "No Cardano wallet found in this browser. Install",
        " ",
        rd.map((v, C) => /* @__PURE__ */ e("span", { children: [
          C ? " or " : "",
          /* @__PURE__ */ e("a", { href: v.href, target: "_blank", rel: "noopener", class: "linkbtn", children: v.name })
        ] }, v.name)),
        " ",
        "and reload."
      ] }),
      /* @__PURE__ */ e("p", { children: "Strike perps run on Strike's exchange; this widget never holds your funds. Your wallet signs once to create a trading key that cannot withdraw." })
    ] }),
    p === "checking" && /* @__PURE__ */ e("p", { children: [
      /* @__PURE__ */ e(Ot, {}),
      " Checking your wallet and Strike account…"
    ] }),
    (p === "review" || p === "signing" || p === "done") && c && /* @__PURE__ */ e(U, { children: [
      /* @__PURE__ */ e("div", { class: "addr", children: en(c.address, 18, 10) }),
      c.hasStrikeAccount === null ? /* @__PURE__ */ e("div", { class: "note", children: [
        /* @__PURE__ */ e("b", { children: "Strike couldn't look up this wallet right now." }),
        " You can still connect. If it's new to Strike, its first deposit needs to be at least ",
        be(c.minFirstDepositUsd, { decimals: 0 }),
        " (Strike's rule)."
      ] }) : c.hasStrikeAccount ? /* @__PURE__ */ e("div", { class: "note", children: [
        /* @__PURE__ */ e("b", { children: "Existing Strike account found." }),
        " Your balance and positions carry over."
      ] }) : /* @__PURE__ */ e("div", { class: c.canAffordFirstDeposit ? "note" : "warn", children: [
        /* @__PURE__ */ e("b", { children: "New to Strike." }),
        " Signing creates your Strike account. Strike asks for a first deposit of at least ",
        /* @__PURE__ */ e("b", { children: be(c.minFirstDepositUsd, { decimals: 0 }) }),
        " (later deposits from $5). This wallet holds ≈ ",
        be(c.walletUsd),
        " (",
        c.walletAda.toFixed(1),
        " ADA).",
        !c.canAffordFirstDeposit && " You can connect now and deposit later."
      ] }),
      /* @__PURE__ */ e("div", { class: "note", children: [
        "This site charges a ",
        /* @__PURE__ */ e("b", { children: [
          T,
          "%"
        ] }),
        " builder fee per trade on top of Strike's fees. You approve a cap of ",
        /* @__PURE__ */ e("b", { children: [
          $,
          "%"
        ] }),
        "; it can never charge more."
      ] }),
      l && /* @__PURE__ */ e("div", { class: "consent", children: l }),
      /* @__PURE__ */ e("label", { class: "check", style: { alignItems: "flex-start" }, children: [
        /* @__PURE__ */ e("input", { type: "checkbox", checked: m, onChange: (v) => f(v.target.checked), style: { marginTop: "2px" } }),
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
        /* @__PURE__ */ e(cn, { n: 1, state: "done", children: "Wallet connected" }),
        /* @__PURE__ */ e(cn, { n: 2, state: p === "signing" ? "active" : p === "done" ? "done" : "todo", children: "Sign Strike's connect message" }),
        /* @__PURE__ */ e(cn, { n: 3, state: p === "done" ? "done" : "todo", children: "Trading key created for this site" })
      ] }),
      /* @__PURE__ */ e("button", { class: "cta", disabled: !m || p !== "review", onClick: w, children: p === "signing" ? "Waiting for wallet…" : p === "done" ? "Connected" : "Sign & connect" })
    ] }),
    k && /* @__PURE__ */ e("div", { class: "warn", children: k })
  ] }) });
}
function sd({
  client: t,
  adaPrice: n,
  isNewAccount: i,
  startBalance: r,
  onClose: s,
  onCredited: a
}) {
  const o = i ? Wt : 5, c = n > 0 ? Math.ceil((i ? Wt * 1.05 : 25) / n / 5) * 5 : 0, [d, p] = g(c ? String(c) : ""), [u, l] = g("amount"), [h, m] = g(null), [f, k] = g(""), [y, _] = g(""), w = Number(d || 0) * n, T = t.net.network === "mainnet" ? "https://cardanoscan.io/transaction/" : "https://preprod.cardanoscan.io/transaction/", $ = async () => {
    _(""), l("preparing");
    try {
      if (!t.wallet) throw new Error("Reconnect your wallet to deposit.");
      m(await t.prepareDeposit(Number(d))), l("review");
    } catch (x) {
      _(x instanceof gt ? `Safety check failed: ${x.message}` : x?.message || String(x)), l("amount");
    }
  }, v = async () => {
    if (h) {
      _(""), l("signing");
      try {
        const { txHash: x } = await t.confirmDeposit(h);
        k(x), l("crediting");
      } catch (x) {
        if (x instanceof br) {
          k(x.txHash), _(x.message), l("registering");
          return;
        }
        const z = String(x?.info || x?.message || x);
        _(x instanceof gt ? `Safety check failed: ${z}` : Jn(x)), l("review");
      }
    }
  }, C = async () => {
    if (!(!h || !f)) {
      _("");
      try {
        await t.retryDepositRegistration(h.requestId, f), l("crediting");
      } catch (x) {
        _(x?.message || String(x));
      }
    }
  }, [S, q] = g(!1);
  return Z(() => {
    if (u !== "crediting") return;
    const x = setTimeout(() => q(!0), 15 * 6e4), z = setInterval(async () => {
      try {
        const N = await t.account.account();
        Number(N.wallet_balance) > r + Math.max(0.5, (h?.usdValue ?? 0) * 0.5) && (l("done"), a());
      } catch {
      }
    }, 8e3);
    return () => (clearInterval(z), clearTimeout(x));
  }, [u]), /* @__PURE__ */ e("div", { class: "overlay", onClick: (x) => x.target === x.currentTarget && u === "amount" && s(), children: /* @__PURE__ */ e("div", { class: "sheet", role: "dialog", "aria-modal": "true", "aria-label": "Deposit ADA", children: [
    /* @__PURE__ */ e("h3", { children: [
      "Deposit ADA",
      /* @__PURE__ */ e("button", { class: "x", onClick: s, "aria-label": "Close", disabled: u === "signing" || u === "registering", children: "×" })
    ] }),
    (u === "amount" || u === "preparing") && /* @__PURE__ */ e(U, { children: [
      /* @__PURE__ */ e("div", { class: "field", children: [
        /* @__PURE__ */ e("label", { for: "se-dep-amt", children: "Amount" }),
        /* @__PURE__ */ e("input", { id: "se-dep-amt", inputMode: "decimal", value: d, placeholder: "0", onInput: (x) => p(Ce(x)) }),
        /* @__PURE__ */ e("span", { class: "unit", children: "ADA" })
      ] }),
      /* @__PURE__ */ e(Fe, { k: "Value", v: /* @__PURE__ */ e("span", { class: "num", children: [
        "≈ ",
        be(w)
      ] }) }),
      /* @__PURE__ */ e("p", { children: [
        "Your ADA is converted to USD margin on Strike.",
        " ",
        i ? /* @__PURE__ */ e(U, { children: [
          "Strike asks for at least ",
          /* @__PURE__ */ e("b", { children: be(Wt, { decimals: 0 }) }),
          " on a new account's first deposit; after that the minimum is $5."
        ] }) : /* @__PURE__ */ e(U, { children: "Minimum deposit $5." })
      ] }),
      /* @__PURE__ */ e("button", { class: "cta", disabled: !(w >= o) || u === "preparing", onClick: $, children: u === "preparing" ? /* @__PURE__ */ e(U, { children: [
        /* @__PURE__ */ e(Ot, {}),
        " Building transaction…"
      ] }) : w >= o ? "Review deposit" : `Minimum ${be(o, { decimals: 0 })}` })
    ] }),
    h && u !== "amount" && u !== "preparing" && /* @__PURE__ */ e(U, { children: [
      /* @__PURE__ */ e("div", { class: "details", children: [
        /* @__PURE__ */ e(Fe, { k: "You send", v: /* @__PURE__ */ e("span", { class: "num", children: [
          Ke(h.destination.lovelace).toLocaleString("en-US"),
          " ADA"
        ] }) }),
        h.forwardingCost > 0n && /* @__PURE__ */ e(Fe, { k: "Strike forwarding", v: /* @__PURE__ */ e("span", { class: "num", children: [
          Ke(h.forwardingCost).toFixed(2),
          " ADA"
        ] }) }),
        /* @__PURE__ */ e(Fe, { k: "To (Strike)", v: /* @__PURE__ */ e("span", { class: "addr", children: en(h.destination.address, 14, 8) }), hint: h.destination.address }),
        /* @__PURE__ */ e(Fe, { k: "Strike quotes", v: /* @__PURE__ */ e("span", { class: "num", children: [
          "≈ ",
          be(h.usdValue)
        ] }) }),
        /* @__PURE__ */ e(Fe, { k: "Network fee", v: /* @__PURE__ */ e("span", { class: "num", children: [
          Ke(h.networkFee).toFixed(3),
          " ADA"
        ] }) }),
        /* @__PURE__ */ e(Fe, { k: "Confirmations", v: h.confirmationsRequired })
      ] }),
      /* @__PURE__ */ e("div", { class: "note", children: [
        /* @__PURE__ */ e("b", { children: "Checked before signing:" }),
        " exactly ",
        Ke(h.destination.lovelace),
        " ADA leaves your wallet in one output",
        h.forwardingCost > 0n ? ` (${Ke(h.lovelace)} to deposit plus ${Ke(h.forwardingCost)} for Strike's forwarding)` : "",
        ", no tokens move, the change returns to you, and the deposit is tagged for your Strike account and this request."
      ] }),
      /* @__PURE__ */ e("div", { class: "steps", children: [
        /* @__PURE__ */ e(cn, { n: 1, state: u === "review" ? "todo" : u === "signing" ? "active" : "done", children: "Sign in your wallet" }),
        /* @__PURE__ */ e(cn, { n: 2, state: u === "crediting" ? "active" : u === "done" ? "done" : "todo", children: f ? /* @__PURE__ */ e(U, { children: [
          "Confirming on Cardano · ",
          /* @__PURE__ */ e("a", { class: "linkbtn", target: "_blank", rel: "noopener", href: T + f, children: "view tx" })
        ] }) : "Confirming on Cardano" }),
        /* @__PURE__ */ e(cn, { n: 3, state: u === "done" ? "done" : "todo", children: "Credited to your Strike balance" })
      ] }),
      u === "review" && /* @__PURE__ */ e("button", { class: "cta", onClick: v, children: "Sign deposit" }),
      u === "registering" && /* @__PURE__ */ e("button", { class: "cta", onClick: C, children: "Retry registering with Strike" }),
      u === "crediting" && !S && /* @__PURE__ */ e("p", { children: "This usually takes a few minutes while Strike waits for Cardano confirmations. You can close this; the balance updates on its own." }),
      u === "crediting" && S && /* @__PURE__ */ e("div", { class: "warn", children: [
        /* @__PURE__ */ e("b", { children: "Strike hasn't credited this deposit yet." }),
        " Your transaction is on-chain; crediting is handled by Strike. If it doesn't appear soon, contact Strike support with this transaction:",
        " ",
        /* @__PURE__ */ e("a", { class: "linkbtn", target: "_blank", rel: "noopener", href: T + f, children: [
          f.slice(0, 16),
          "…"
        ] })
      ] }),
      u === "done" && /* @__PURE__ */ e("button", { class: "cta", onClick: s, children: "Start trading" })
    ] }),
    y && /* @__PURE__ */ e("div", { class: "warn", children: y })
  ] }) });
}
function ad({
  client: t,
  available: n,
  adaPrice: i,
  startBalance: r,
  onClose: s,
  onDone: a
}) {
  const [o, c] = g(""), [d, p] = g("amount"), [u, l] = g(null), [h, m] = g(""), f = Number(o) || 0, [k, y] = g({ maxUsd: null, minUsd: null });
  Z(() => {
    t.withdrawLimits().then(y).catch(() => {
    });
  }, [t]);
  const _ = Math.floor((k.maxUsd !== null ? Math.min(k.maxUsd, n) : n) * 100) / 100, w = Math.max(jt, k.minUsd ?? 0), T = i > 0 ? Math.max(0, f - 1) / i : 0, $ = async () => {
    m(""), p("quoting");
    try {
      if (!t.wallet) throw new Error("Reconnect your wallet to withdraw.");
      l(await t.prepareWithdrawal(f)), p("review");
    } catch (C) {
      m(C instanceof Nt ? `Safety check failed: ${C.message}` : C?.message || String(C)), p("amount");
    }
  }, v = async () => {
    if (u) {
      m(""), p("signing");
      try {
        await t.confirmWithdrawal(u), p("pending");
      } catch (C) {
        const S = String(C?.info || C?.message || C);
        m(C instanceof Nt ? `Safety check failed: ${S}` : Jn(C)), p("review");
      }
    }
  };
  return Z(() => {
    if (d !== "pending") return;
    const C = setInterval(async () => {
      try {
        const S = await t.account.account();
        Number(S.wallet_balance) < r - f * 0.5 && (p("done"), a());
      } catch {
      }
    }, 6e3);
    return () => clearInterval(C);
  }, [d]), /* @__PURE__ */ e("div", { class: "overlay", onClick: (C) => C.target === C.currentTarget && d === "amount" && s(), children: /* @__PURE__ */ e("div", { class: "sheet", role: "dialog", "aria-modal": "true", "aria-label": "Withdraw", children: [
    /* @__PURE__ */ e("h3", { children: [
      "Withdraw to your wallet",
      /* @__PURE__ */ e("button", { class: "x", onClick: s, "aria-label": "Close", disabled: d === "signing", children: "×" })
    ] }),
    (d === "amount" || d === "quoting") && /* @__PURE__ */ e(U, { children: [
      /* @__PURE__ */ e("p", { children: [
        "Paid out in ADA (or USDM where Strike only supports it) to the wallet you connected. Minimum ",
        be(w, { decimals: 0 }),
        "."
      ] }),
      /* @__PURE__ */ e("div", { class: "field", children: [
        /* @__PURE__ */ e("label", { for: "se-wd-amt", children: "Amount" }),
        /* @__PURE__ */ e("input", { id: "se-wd-amt", inputMode: "decimal", value: o, placeholder: "0.00", onInput: (C) => c(Ce(C)) }),
        /* @__PURE__ */ e("button", { class: "unit linkbtn", style: { textDecoration: "none" }, onClick: () => c(String(_)), children: "Max" })
      ] }),
      /* @__PURE__ */ e(Fe, { k: "Available", v: /* @__PURE__ */ e("span", { class: "num", children: be(n) }) }),
      /* @__PURE__ */ e(Fe, { k: "Fee", v: /* @__PURE__ */ e("span", { class: "num", children: "$1.00" }), hint: "Strike's flat withdrawal fee" }),
      /* @__PURE__ */ e(Fe, { k: "You receive (est.)", v: /* @__PURE__ */ e("span", { class: "num", children: [
        "≈ ",
        T.toFixed(2),
        " ADA"
      ] }) }),
      t.session && /* @__PURE__ */ e(Fe, { k: "To", v: /* @__PURE__ */ e("span", { class: "addr", children: en(t.session.address, 12, 6) }), hint: "Strike locks the destination to the wallet you connected with" }),
      /* @__PURE__ */ e("button", { class: "cta", disabled: !(f >= w && f <= _) || d === "quoting", onClick: $, children: d === "quoting" ? /* @__PURE__ */ e(U, { children: [
        /* @__PURE__ */ e(Ot, {}),
        " Getting quote…"
      ] }) : f > _ ? "Exceeds what you can withdraw now" : f >= w ? "Review withdrawal" : `Minimum ${be(w, { decimals: 0 })}` })
    ] }),
    u && d !== "amount" && d !== "quoting" && /* @__PURE__ */ e(U, { children: [
      /* @__PURE__ */ e("p", { children: [
        "Your wallet will sign Strike's withdrawal message",
        u.funding ? " and a small funding transaction" : "",
        ". The trading key alone cannot withdraw, so every withdrawal needs your signature."
      ] }),
      /* @__PURE__ */ e(
        Fe,
        {
          k: "You receive",
          v: /* @__PURE__ */ e("span", { class: "num", children: u.asset === "USDM" ? `≈ ${be(Math.max(0, u.usdValue - u.fee))} in USDM` : `≈ ${T.toFixed(2)} ADA` }),
          hint: u.asset === "USDM" ? "Strike pays Cardano withdrawals out in USDM (a USD stablecoin) on this network" : "Paid out in ADA at Strike's rate"
        }
      ),
      /* @__PURE__ */ e("div", { class: "consent", children: u.messageToSign }),
      u.funding && /* @__PURE__ */ e(U, { children: [
        /* @__PURE__ */ e("div", { class: "details", children: [
          /* @__PURE__ */ e(Fe, { k: "Validator min-UTxO", v: /* @__PURE__ */ e("span", { class: "num", children: [
            Ke(u.funding.lovelace).toFixed(2),
            " ADA"
          ] }), hint: "Strike's Cardano withdrawals ask you to fund the validator's minimum UTxO before it pays out" }),
          /* @__PURE__ */ e(Fe, { k: "Network fee", v: /* @__PURE__ */ e("span", { class: "num", children: [
            Ke(u.funding.networkFee).toFixed(3),
            " ADA"
          ] }) }),
          /* @__PURE__ */ e(Fe, { k: "To (Strike validator)", v: /* @__PURE__ */ e("span", { class: "addr", children: en(u.funding.validatorAddress, 14, 8) }), hint: u.funding.validatorAddress })
        ] }),
        /* @__PURE__ */ e("div", { class: "note", children: [
          /* @__PURE__ */ e("b", { children: "Checked before signing:" }),
          " the funding transaction only pays ",
          Ke(u.funding.lovelace).toFixed(2),
          " ADA to Strike's quoted validator, moves no tokens and contains nothing else. Your wallet will ask twice: the message, then the transaction."
        ] })
      ] }),
      /* @__PURE__ */ e("div", { class: "steps", children: [
        /* @__PURE__ */ e(cn, { n: 1, state: d === "review" ? "todo" : d === "signing" ? "active" : "done", children: u.funding ? "Sign the message and funding transaction" : "Sign in your wallet" }),
        /* @__PURE__ */ e(cn, { n: 2, state: d === "pending" ? "active" : d === "done" ? "done" : "todo", children: "Strike processes the withdrawal" }),
        /* @__PURE__ */ e(cn, { n: 3, state: d === "done" ? "done" : "todo", children: "ADA arrives in your wallet" })
      ] }),
      d === "review" && /* @__PURE__ */ e("button", { class: "cta", onClick: v, children: "Sign withdrawal" }),
      d === "review" && /* @__PURE__ */ e("button", { class: "linkbtn", style: { justifySelf: "center", fontSize: "12px" }, onClick: () => (l(null), m(""), p("amount")), children: "Change amount (gets a fresh quote)" }),
      d === "pending" && /* @__PURE__ */ e("p", { children: "Submitted. Large withdrawals can be queued for review by Strike." }),
      d === "done" && /* @__PURE__ */ e("button", { class: "cta", onClick: s, children: "Done" })
    ] }),
    h && /* @__PURE__ */ e("div", { class: "warn", children: h })
  ] }) });
}
function od({
  positions: t,
  marks: n,
  ticks: i,
  busy: r,
  flash: s,
  note: a,
  confirming: o,
  onAsk: c,
  onClose: d,
  closeText: p
}) {
  return t.length ? /* @__PURE__ */ e(U, { children: t.map((u) => {
    const l = Number(u.size), h = l > 0, m = u.symbol.split("-")[0], f = i[u.symbol], k = n[u.symbol] ?? Number(u.entry_price), y = Number(u.upnl), _ = Math.abs(l) * Number(u.entry_price), w = _ > 0 && u.leverage ? _ / u.leverage : 0, T = w > 0 ? y / w * 100 : 0, $ = Number(u.liquidation_price), v = `pos:${u.id}`;
    return /* @__PURE__ */ e("div", { class: `row${s === u.symbol ? " flash" : ""}`, children: [
      /* @__PURE__ */ e("div", { class: "row-h", children: [
        /* @__PURE__ */ e("span", { class: `badge ${h ? "long" : "short"}`, children: h ? "Long" : "Short" }),
        /* @__PURE__ */ e("span", { class: "pos-t", children: [
          /* @__PURE__ */ e("span", { class: "num", children: Pn(Math.abs(l)) }),
          " ",
          m,
          " ",
          /* @__PURE__ */ e("span", { class: "muted", children: [
            "(~",
            be(Math.abs(l) * k),
            ")",
            Number(u.leverage) > 0 ? ` · ${u.leverage}x` : ""
          ] })
        ] }),
        /* @__PURE__ */ e("button", { class: "mini", disabled: r.has(v), "aria-expanded": o === u.id, onClick: () => c(o === u.id ? null : u), children: r.has(v) ? /* @__PURE__ */ e(Ot, {}) : "Close" })
      ] }),
      a && a.id === u.id && /* @__PURE__ */ e("div", { class: `ticket-msg ${a.kind}`, role: "status", children: a.text }),
      o === u.id && !r.has(v) && /* @__PURE__ */ e(
        tr,
        {
          actions: /* @__PURE__ */ e(U, { children: [
            /* @__PURE__ */ e("button", { class: "mini", onClick: () => c(null), children: "Keep" }),
            /* @__PURE__ */ e("button", { class: "mini danger", onClick: () => d(u), children: "Close at market" })
          ] }),
          children: p(u)
        }
      ),
      /* @__PURE__ */ e("div", { class: "row-g pos-g", children: [
        /* @__PURE__ */ e("div", { class: "wide", children: [
          /* @__PURE__ */ e("div", { class: "k", children: "Profit/Loss" }),
          /* @__PURE__ */ e("div", { class: `num ${y >= 0 ? "pos" : "neg"}`, children: [
            be(y, { sign: !0 }),
            " · ",
            T >= 0 ? "+" : "",
            T.toFixed(1),
            "% ",
            /* @__PURE__ */ e("span", { class: "of", children: "of margin" })
          ] })
        ] }),
        /* @__PURE__ */ e("div", { children: [
          /* @__PURE__ */ e("div", { class: "k", children: "Entry" }),
          /* @__PURE__ */ e("div", { class: "num", children: $e(Number(u.entry_price), f) })
        ] }),
        /* @__PURE__ */ e("div", { children: [
          /* @__PURE__ */ e("div", { class: "k", children: "Mark" }),
          /* @__PURE__ */ e("div", { class: "num", children: $e(k, f) })
        ] }),
        /* @__PURE__ */ e("div", { children: [
          /* @__PURE__ */ e("div", { class: "k", children: "Liq. price" }),
          /* @__PURE__ */ e("div", { class: "num", children: $ > 0 ? /* @__PURE__ */ e(U, { children: [
            $e($, f),
            " ",
            /* @__PURE__ */ e("span", { class: "of", children: [
              "(",
              Li(k, $),
              " away)"
            ] })
          ] }) : "—" })
        ] }),
        /* @__PURE__ */ e("div", { children: [
          /* @__PURE__ */ e("div", { class: "k", children: "Margin" }),
          /* @__PURE__ */ e("div", { class: "num", children: [
            w > 0 ? `${be(w)} · ` : "",
            /* @__PURE__ */ e("span", { class: "of", children: u.margin_mode === "cross" ? "Cross" : "Isolated" })
          ] })
        ] })
      ] })
    ] }, u.id);
  }) }) : /* @__PURE__ */ e("div", { class: "empty", children: "No open positions yet. Open a Long or Short above; it will appear here with live profit/loss." });
}
function ld(t) {
  return t.reduce_only ? t.side === "buy" ? "Buy: closes (part of) a Short" : "Sell: closes (part of) a Long" : t.side === "buy" ? "Buy: opens or adds to a Long (or reduces a Short)" : "Sell: opens or adds to a Short (or reduces a Long)";
}
function cd({
  orders: t,
  ticks: n,
  busy: i,
  onCancel: r
}) {
  return t.length ? /* @__PURE__ */ e(U, { children: t.map((s) => /* @__PURE__ */ e("div", { class: "row", children: [
    /* @__PURE__ */ e("div", { class: "row-h", children: [
      s.symbol,
      /* @__PURE__ */ e("span", { class: `badge ${s.side === "buy" ? "long" : "short"}`, title: ld(s), children: [
        s.side === "buy" ? "Buy" : "Sell",
        " · ",
        String(s.type ?? "").replace(/_/g, " ")
      ] }),
      s.reduce_only && /* @__PURE__ */ e("span", { class: "t muted", children: [
        "closes ",
        s.side === "buy" ? "Short" : "Long"
      ] }),
      /* @__PURE__ */ e("button", { class: "mini", disabled: i.has(`ord:${s.id}`), onClick: () => r(s), children: i.has(`ord:${s.id}`) ? /* @__PURE__ */ e(Ot, {}) : "Cancel" })
    ] }),
    /* @__PURE__ */ e("div", { class: "row-g", children: [
      /* @__PURE__ */ e("div", { children: [
        /* @__PURE__ */ e("div", { class: "k", children: "Price" }),
        /* @__PURE__ */ e("div", { class: "num", children: Number(s.stop_price) > 0 ? `Trigger ${$e(Number(s.stop_price), n[s.symbol])}${Number(s.price) > 0 ? ` · ${$e(Number(s.price), n[s.symbol])}` : ""}` : Number(s.price) > 0 ? $e(Number(s.price), n[s.symbol]) : "Market" })
      ] }),
      /* @__PURE__ */ e("div", { children: [
        /* @__PURE__ */ e("div", { class: "k", children: "Size" }),
        /* @__PURE__ */ e("div", { class: "num", children: rn(Number(s.size)) })
      ] }),
      /* @__PURE__ */ e("div", { children: [
        /* @__PURE__ */ e("div", { class: "k", children: "Filled" }),
        /* @__PURE__ */ e("div", { class: "num", children: rn(Number(s.filled)) })
      ] })
    ] })
  ] }, s.id)) }) : /* @__PURE__ */ e("div", { class: "empty", children: "Limit and stop orders that are waiting to fill show here." });
}
const Oo = { "15m": 9e5, "1h": 36e5, "4h": 144e5, "1d": 864e5 }, dd = { "1m": 6e4, "5m": 3e5, ...Oo, "1w": 6048e5 }, Wr = 58, pd = (t) => t.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 1 });
function vr({
  client: t,
  symbol: n,
  interval: i,
  tick: r,
  live: s,
  height: a
}) {
  const [o, c] = g("mark"), [d, p] = g(null), [u, l] = g(!1), [h, m] = g(null), [f, k] = g(352), [y, _] = g(0), w = Oe(null);
  ii(() => {
    const G = w.current;
    if (!G || typeof ResizeObserver > "u") return;
    const X = new ResizeObserver(() => G.clientWidth && k(G.clientWidth));
    return X.observe(G), k(G.clientWidth || 352), () => X.disconnect();
  }, []), Z(() => {
    let G = !0;
    p(null), l(!1), m(null);
    const X = () => t.market.klines(n, i, 120, o).then((Re) => G && (p(Re), l(!Re.length))).catch(() => G && l(!0));
    X();
    const xe = setInterval(() => !At() && X(), 6e4);
    return () => {
      G = !1, clearInterval(xe);
    };
  }, [t, n, i, o, y]);
  const T = s[o];
  Z(() => {
    T > 0 && p((G) => {
      if (!G?.length) return G;
      const X = G[G.length - 1], xe = dd[i], Re = Date.now();
      if (Re >= X.openTime + xe) {
        const Ee = X.openTime + Math.floor((Re - X.openTime) / xe) * xe;
        return [...G.slice(-199), { openTime: Ee, open: X.close, high: Math.max(X.close, T), low: Math.min(X.close, T), close: T, volume: 0 }];
      }
      return [...G.slice(0, -1), { ...X, close: T, high: Math.max(X.high, T), low: Math.min(X.low, T) }];
    });
  }, [T, i]);
  const $ = /* @__PURE__ */ e("div", { class: "ptype", role: "radiogroup", "aria-label": "Price type", children: ["mark", "last", "index"].map((G) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": o === G, class: o === G ? "on" : "", onClick: () => c(G), children: G === "mark" ? "Mark" : G === "last" ? "Last" : "Index" }, G)) }), v = a ?? (f >= 480 ? 250 : 210);
  if (!d?.length)
    return /* @__PURE__ */ e("div", { class: "chart", ref: w, style: { height: `${v}px` }, children: [
      $,
      /* @__PURE__ */ e("div", { class: "chart-msg", children: u ? /* @__PURE__ */ e(U, { children: [
        "Chart data isn't available right now.",
        " ",
        /* @__PURE__ */ e("button", { class: "linkbtn", onClick: () => _(y + 1), children: "Retry" })
      ] }) : "Loading chart…" })
    ] });
  const C = Math.max(60, f - Wr), S = Math.max(10, Math.min(d.length, Math.floor(C / 6.5))), q = d.slice(-S), x = C / S, z = 30, N = v * 0.66, R = z + N + 6, oe = v - R - 18;
  let M = Math.min(...q.map((G) => G.low)), I = Math.max(...q.map((G) => G.high));
  T > 0 && (M = Math.min(M, T), I = Math.max(I, T));
  const F = (I - M) * 0.06 || I * 0.01 || 1;
  M -= F, I += F;
  const W = (G) => z + (I - G) / (I - M) * N, P = Math.max(...q.map((G) => G.volume), 0) || 1, A = Math.max(1, x * 0.64), O = [0.1, 0.37, 0.63, 0.9].map((G) => I - (I - M) * G), J = h ? q[h.i] : null, le = h ? I - (h.y - z) / N * (I - M) : 0, Me = [Math.floor(S * 0.15), Math.floor(S * 0.5), Math.floor(S * 0.85)], Le = i === "1d" || i === "4h" || i === "1w", pt = (G) => {
    const X = G.currentTarget.getBoundingClientRect(), xe = G.clientX - X.left, Re = G.clientY - X.top;
    if (xe < 0 || xe > C || Re < z || Re > z + N) return m(null);
    m({ i: Math.max(0, Math.min(S - 1, Math.floor(xe / x))), y: Re });
  }, ke = q.length > 1 && I - M - 2 * F <= (r ?? 0) / 2;
  return /* @__PURE__ */ e("div", { class: "chart", ref: w, style: { height: `${v}px`, position: "relative" }, children: [
    $,
    ke && /* @__PURE__ */ e("div", { class: "chart-note", children: o === "last" ? "No trades in this period, so the last-traded price hasn't moved. Mark follows the market." : "The price hasn't moved in this period." }),
    J && /* @__PURE__ */ e("div", { class: "ohlc num", "aria-live": "polite", children: [
      /* @__PURE__ */ e("span", { class: "muted", children: ei(J.openTime) }),
      " O ",
      /* @__PURE__ */ e("b", { children: $e(J.open, r) }),
      " H ",
      /* @__PURE__ */ e("b", { children: $e(J.high, r) }),
      " L ",
      /* @__PURE__ */ e("b", { children: $e(J.low, r) }),
      " C",
      " ",
      /* @__PURE__ */ e("b", { class: J.close >= J.open ? "pos" : "neg", children: $e(J.close, r) }),
      J.volume > 0 && /* @__PURE__ */ e(U, { children: [
        " V ",
        /* @__PURE__ */ e("b", { children: pd(J.volume) })
      ] })
    ] }),
    /* @__PURE__ */ e("svg", { width: f, height: v, role: "img", "aria-label": `${n} ${i} candlestick chart`, onPointerMove: pt, onPointerDown: pt, onPointerLeave: () => m(null), children: [
      O.map((G) => /* @__PURE__ */ e("g", { children: [
        /* @__PURE__ */ e("line", { x1: 0, x2: C, y1: W(G), y2: W(G), class: "gl" }),
        !(T > 0 && Math.abs(W(G) - W(T)) < 14) && !(h && Math.abs(W(G) - h.y) < 14) && /* @__PURE__ */ e("text", { x: f - 4, y: W(G) + 3.5, class: "ax", "text-anchor": "end", children: $e(G, r) })
      ] }, G)),
      q.map((G, X) => {
        const xe = X * x + x / 2, Ee = G.close >= G.open ? "cu" : "cd", st = G.volume / P * oe;
        return /* @__PURE__ */ e("g", { class: Ee, children: [
          st > 0 && /* @__PURE__ */ e("rect", { x: xe - A / 2, y: R + oe - st, width: A, height: st, class: "vol" }),
          /* @__PURE__ */ e("line", { x1: xe, x2: xe, y1: W(G.high), y2: W(G.low) }),
          /* @__PURE__ */ e("rect", { x: xe - A / 2, y: W(Math.max(G.open, G.close)), width: A, height: Math.max(1, Math.abs(W(G.open) - W(G.close))) })
        ] }, G.openTime);
      }),
      Me.map(
        (G) => q[G] ? (
          // Edge labels anchor inward so they never clip at narrow widths.
          /* @__PURE__ */ e("text", { x: G * x + x / 2 < 40 ? 2 : G * x + x / 2, y: v - 5, class: "ax", "text-anchor": G * x + x / 2 < 40 ? "start" : "middle", children: ei(q[G].openTime, Le) }, G)
        ) : null
      ),
      T > 0 && /* @__PURE__ */ e("g", { class: T >= q[q.length - 1].open ? "cu" : "cd", children: [
        /* @__PURE__ */ e("line", { x1: 0, x2: C, y1: W(T), y2: W(T), class: "now" }),
        /* @__PURE__ */ e("rect", { x: C + 2, y: W(T) - 8, width: Wr - 3, height: 16, rx: 2 }),
        /* @__PURE__ */ e("text", { x: f - 4, y: W(T) + 3.5, class: "tag", "text-anchor": "end", children: $e(T, r) })
      ] }),
      h && J && /* @__PURE__ */ e("g", { class: "xh", children: [
        /* @__PURE__ */ e("line", { x1: h.i * x + x / 2, x2: h.i * x + x / 2, y1: z, y2: R + oe }),
        /* @__PURE__ */ e("line", { x1: 0, x2: C, y1: h.y, y2: h.y }),
        /* @__PURE__ */ e("rect", { x: C + 2, y: h.y - 8, width: Wr - 3, height: 16, rx: 2 }),
        /* @__PURE__ */ e("text", { x: f - 4, y: h.y + 3.5, "text-anchor": "end", children: $e(le, r) })
      ] })
    ] })
  ] });
}
function ud({ book: t, depth: n, tick: i, base: r, hint: s, onPick: a }) {
  if (!t) return /* @__PURE__ */ e("div", { class: "book", children: /* @__PURE__ */ e("div", { class: "chart-msg", children: t === null ? "Order book unavailable right now…" : "Loading order book…" }) });
  const o = (l) => {
    let h = 0;
    return l.slice(0, n).map(([m, f]) => [m, f, h += f]);
  }, c = o(t.asks), d = o(t.bids), p = Math.max(c[c.length - 1]?.[2] ?? 0, d[d.length - 1]?.[2] ?? 0) || 1, u = (l) => ([h, m, f]) => /* @__PURE__ */ e("button", { class: `lvl ${l}`, onClick: () => a(h), title: s, children: [
    /* @__PURE__ */ e("span", { class: "bar", style: { width: `${f / p * 100}%` } }),
    /* @__PURE__ */ e("span", { class: "num px", children: $e(h, i) }),
    /* @__PURE__ */ e("span", { class: "num", children: rn(m) }),
    /* @__PURE__ */ e("span", { class: "num", children: rn(f) })
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
    c.length ? [...c].reverse().map(u("ask")) : /* @__PURE__ */ e("div", { class: "book-empty", children: "No sellers right now" }),
    Number.isFinite(t.spread) ? /* @__PURE__ */ e("div", { class: "spread num", children: [
      /* @__PURE__ */ e("span", { children: [
        "Spread ",
        $e(t.spread, i),
        " (",
        (t.spread / t.mid * 100).toFixed(3),
        "%)"
      ] }),
      /* @__PURE__ */ e("span", { children: [
        "Mid ",
        $e(t.mid, i ? Number((i / 10).toPrecision(1)) : void 0)
      ] })
    ] }) : /* @__PURE__ */ e("div", { class: "spread", children: /* @__PURE__ */ e("span", { children: [
      "Only ",
      t.asks.length ? "sellers" : "buyers",
      " on this market right now (thin market)"
    ] }) }),
    d.length ? d.map(u("bid")) : /* @__PURE__ */ e("div", { class: "book-empty", children: "No buyers right now" })
  ] });
}
const Qt = (t) => t == null || t === "" || !Number.isFinite(Number(t)) ? null : Number(t), ln = (t, n = !1) => t === null ? "—" : be(t, { sign: n }), Ai = (t) => t === null || t === 0 ? "" : t > 0 ? "pos" : "neg", jr = (t) => t === null ? "—" : `${(t * 100).toFixed(3)}%`;
function Ht({ k: t, v: n, cls: i, hint: r }) {
  return /* @__PURE__ */ e("div", { children: [
    /* @__PURE__ */ e("div", { class: `k${r ? " dotted" : ""}`, title: r, children: t }),
    /* @__PURE__ */ e("div", { class: `num ${i ?? ""}`, children: n })
  ] });
}
function hd(t) {
  const n = /* @__PURE__ */ new Set();
  return t.filter((i) => n.has(i.id) ? !1 : (n.add(i.id), !0));
}
function md({ twaps: t, busy: n, onCancel: i }) {
  return t.length ? /* @__PURE__ */ e(U, { children: t.map((r) => {
    const s = r.totalSize ?? 0, a = s > 0 && r.filledSize !== null ? Math.min(1, r.filledSize / s) : 0, o = r.createdAt && r.durationSec ? r.createdAt + r.durationSec * 1e3 : 0, c = o ? Math.max(0, o - Date.now()) : 0, d = r.status === "cancelling";
    return /* @__PURE__ */ e("div", { class: "row", children: [
      /* @__PURE__ */ e("div", { class: "row-h", children: [
        r.symbol || "—",
        /* @__PURE__ */ e("span", { class: `badge ${r.side === "buy" ? "long" : "short"}`, children: [
          r.side === "buy" ? "Buy" : "Sell",
          " · TWAP"
        ] }),
        /* @__PURE__ */ e("button", { class: "mini", disabled: d || n.has(`twap:${r.id}`), onClick: () => i(r), children: n.has(`twap:${r.id}`) ? /* @__PURE__ */ e(Ot, {}) : d ? "Cancelling" : "Cancel" })
      ] }),
      /* @__PURE__ */ e("div", { class: "prog", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(a * 100), children: /* @__PURE__ */ e("span", { style: { width: `${a * 100}%` } }) }),
      /* @__PURE__ */ e("div", { class: "row-g", children: [
        /* @__PURE__ */ e(Ht, { k: "Filled", v: `${rn(r.filledSize)} / ${rn(r.totalSize)}` }),
        /* @__PURE__ */ e(Ht, { k: "Slices", v: r.slicesFired === null ? "—" : `${r.slicesFired}${r.nominalSlices ? ` / ${r.nominalSlices}` : ""}` }),
        /* @__PURE__ */ e(Ht, { k: "Time left", v: o ? c > 0 ? `${Math.ceil(c / 6e4)} min` : "ending" : "—" })
      ] }),
      r.lastError && /* @__PURE__ */ e("div", { class: "t muted", children: r.lastError })
    ] }, r.id);
  }) }) : /* @__PURE__ */ e("div", { class: "empty", children: "No active TWAP orders" });
}
const gd = [
  ["fills", "Fills"],
  ["funding", "Funding"],
  ["closed", "Closed"],
  ["orders", "Orders"]
];
function fd({ client: t, ticks: n }) {
  const [i, r] = g("fills"), [s, a] = g({}), o = s[i], c = async (d, p) => {
    const u = s[d], l = p ? u?.next ?? null : null;
    a((h) => ({ ...h, [d]: { ...h[d] ?? { items: [], next: null, loaded: !1 }, loading: !0, error: "" } }));
    try {
      const h = t.account, m = d === "fills" ? await h.fillsPage({ fromId: l }) : d === "funding" ? await h.fundingPage({ fromId: l }) : d === "closed" ? await h.closedPositionsPage({ endTime: l }) : await h.orderHistoryPage({ fromOrderId: l });
      a((f) => ({ ...f, [d]: { items: hd([...p ? f[d]?.items ?? [] : [], ...m.items]), next: m.next, loading: !1, error: "", loaded: !0 } }));
    } catch (h) {
      a((m) => ({ ...m, [d]: { items: m[d]?.items ?? [], next: m[d]?.next ?? null, loading: !1, loaded: !0, error: h?.message || "Couldn't load history" } }));
    }
  };
  return Z(() => {
    s[i] || c(i, !1);
  }, [i]), /* @__PURE__ */ e(U, { children: [
    /* @__PURE__ */ e("div", { class: "chips", role: "tablist", "aria-label": "History", children: gd.map(([d, p]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": i === d, class: i === d ? "on" : "", onClick: () => r(d), children: p }, d)) }),
    o?.error && /* @__PURE__ */ e("div", { class: "warn", children: [
      "Strike: ",
      o.error
    ] }),
    o?.loaded && !o.items.length && !o.error && /* @__PURE__ */ e("div", { class: "empty", children: i === "fills" || i === "orders" ? "Your trades will appear here after your first order." : "Nothing here yet" }),
    o?.items.map(
      (d) => i === "fills" ? /* @__PURE__ */ e(bd, { f: d, tick: n[d.symbol] }, d.id) : i === "funding" ? /* @__PURE__ */ e(xd, { f: d }, d.id) : i === "closed" ? /* @__PURE__ */ e(vd, { p: d }, d.id) : /* @__PURE__ */ e(kd, { o: d, tick: n[d.symbol] }, d.id)
    ),
    (!o || o.loading) && /* @__PURE__ */ e("div", { class: "empty", children: /* @__PURE__ */ e(Ot, {}) }),
    o && !o.loading && o.next !== null && /* @__PURE__ */ e("button", { class: "mini more", onClick: () => c(i, !0), children: "Load more" })
  ] });
}
function kr({ sym: t, badge: n, long: i, right: r, rightCls: s, sub: a }) {
  return /* @__PURE__ */ e("div", { class: "hrow", children: [
    /* @__PURE__ */ e("div", { class: "row-h", children: [
      t || "—",
      n && /* @__PURE__ */ e("span", { class: `badge ${i === null ? "" : i ? "long" : "short"}`, children: n }),
      /* @__PURE__ */ e("span", { class: `num r ${s ?? ""}`, children: r })
    ] }),
    /* @__PURE__ */ e("div", { class: "t muted num", children: a })
  ] });
}
function bd({ f: t, tick: n }) {
  const i = t.realizedPnl;
  return /* @__PURE__ */ e(
    kr,
    {
      sym: t.symbol,
      badge: ds(t.side, i),
      long: t.side ? t.side === "buy" : null,
      right: `${rn(t.size)} @ ${t.price === null ? "—" : $e(t.price, n)}`,
      sub: [`Fee ${ln(t.fee)}`, i ? `PnL ${ln(i, !0)}` : "", t.autoClose ? t.autoClose.replace(/_/g, " ") : "", ei(t.time)].filter(Boolean).join(" · ")
    }
  );
}
function xd({ f: t }) {
  const n = t.positionSide.toLowerCase();
  return /* @__PURE__ */ e(
    kr,
    {
      sym: t.symbol,
      badge: t.positionSide,
      long: n === "long" ? !0 : n === "short" ? !1 : null,
      right: ln(t.amount, !0),
      rightCls: Ai(t.amount),
      sub: `Rate ${t.rate === null ? "—" : `${(t.rate * 100).toFixed(4)}%`} · Size ${rn(t.positionSize)} · ${ei(t.time)}`
    }
  );
}
function vd({ p: t }) {
  const n = t.openTime && t.closeTime ? Math.max(0, Math.round((t.closeTime - t.openTime) / 6e4)) : null, i = n === null ? "" : n >= 1440 ? `${Math.floor(n / 1440)}d ${Math.floor(n % 1440 / 60)}h` : n >= 60 ? `${Math.floor(n / 60)}h ${n % 60}m` : `${n}m`;
  return /* @__PURE__ */ e(
    kr,
    {
      sym: t.symbol,
      badge: t.marginMode ? t.marginMode[0].toUpperCase() + t.marginMode.slice(1) : "",
      long: null,
      right: t.realizedPnl === null ? "PnL —" : ln(t.realizedPnl, !0),
      rightCls: Ai(t.realizedPnl),
      sub: `Closed ${ei(t.closeTime)}${i ? ` · held ${i}` : ""}`
    }
  );
}
function kd({ o: t, tick: n }) {
  const i = Qt(t.price), r = Qt(t.stop_price);
  return /* @__PURE__ */ e(
    kr,
    {
      sym: t.symbol,
      badge: `${t.side === "buy" ? "Buy" : "Sell"} · ${String(t.type ?? "").replace(/_/g, " ")}`,
      long: t.side === "buy",
      right: String(t.status ?? "—"),
      rightCls: t.status === "rejected" ? "neg" : "",
      sub: [
        t.reduce_only ? `closes ${t.side === "buy" ? "Short" : "Long"}` : "",
        `${rn(Qt(t.filled))} / ${rn(Qt(t.size))}`,
        i ? `@ ${$e(i, n)}` : r ? `trigger ${$e(r, n)}` : "market",
        ei(Number(t.create_timestamp))
      ].filter(Boolean).join(" · ")
    }
  );
}
function yd(t) {
  const n = Qt(t?.maintenance_margin) ?? 0, i = Qt(t?.margin_balance);
  if (i === null) return { ratio: null, level: "ok", label: "" };
  if (i <= 0) return n > 0 ? { ratio: null, level: "danger", label: "At risk" } : { ratio: 0, level: "ok", label: "Healthy" };
  const r = n / i;
  return { ratio: r, level: r >= 0.9 ? "danger" : r >= 0.7 ? "warn" : "ok", label: r >= 0.9 ? "Reduce-only" : r >= 0.7 ? "Margin call" : "Healthy" };
}
function wd({ client: t, account: n }) {
  const [i, r] = g(null);
  Z(() => {
    let o = !0;
    const c = () => t.account.portfolio().then((p) => o && r(p)).catch(() => {
    });
    c();
    const d = setInterval(() => !At() && c(), 6e4);
    return () => {
      o = !1, clearInterval(d);
    };
  }, [t]);
  const s = yd(n), a = Qt(n?.unrealized_pnl);
  return /* @__PURE__ */ e(U, { children: [
    /* @__PURE__ */ e("div", { class: "risk", children: [
      /* @__PURE__ */ e("span", { class: "k dotted", title: "Maintenance margin ÷ equity. Strike issues a margin call at 70%, restricts to reduce-only at 90% and liquidates at 100%.", children: "Margin ratio" }),
      /* @__PURE__ */ e("span", { class: "meter", children: /* @__PURE__ */ e("span", { class: `lv-${s.level}`, style: { width: `${Math.min(100, (s.ratio ?? (s.level === "danger" ? 1 : 0)) * 100)}%` } }) }),
      /* @__PURE__ */ e("span", { class: `num ${s.level === "ok" ? "" : "neg"}`, children: s.ratio === null ? "—" : `${(s.ratio * 100).toFixed(1)}%` }),
      /* @__PURE__ */ e("span", { class: `badge ${s.level === "ok" ? "long" : "short"}`, children: s.label || "—" })
    ] }),
    /* @__PURE__ */ e("div", { class: "row-g mgrid", children: [
      /* @__PURE__ */ e(Ht, { k: "Equity", v: ln(Qt(n?.margin_balance)) }),
      /* @__PURE__ */ e(Ht, { k: "Available", v: ln(Qt(n?.available_balance)) }),
      /* @__PURE__ */ e(Ht, { k: "Balance", v: ln(Qt(n?.wallet_balance)) }),
      /* @__PURE__ */ e(Ht, { k: "Unrealized PnL", v: ln(a, !0), cls: Ai(a) }),
      /* @__PURE__ */ e(Ht, { k: "All-time PnL", v: ln(i?.realizedPnl ?? null, !0), cls: Ai(i?.realizedPnl ?? null), hint: "Realized PnL since the account opened (Strike portfolio)" }),
      /* @__PURE__ */ e(Ht, { k: "Volume", v: i?.volume == null ? "—" : be(i.volume, { decimals: 0 }) }),
      /* @__PURE__ */ e(
        Ht,
        {
          k: "Fee tier",
          v: i?.feeTier == null ? "—" : `${i.feeTier} · ${jr(i.takerRate)}`,
          hint: i?.feeTier == null ? void 0 : `Strike fee tier ${i.feeTier}: taker ${jr(i.takerRate)}, maker ${jr(i.makerRate)}`
        }
      ),
      /* @__PURE__ */ e(Ht, { k: "Fee discount", v: i?.referralDiscountPct == null ? "—" : `${i.referralDiscountPct}%`, hint: "Referral fee discount on Strike's trading fees" })
    ] })
  ] });
}
function _d({ client: t }) {
  const [n, i] = g(null);
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
    n === null && /* @__PURE__ */ e("div", { class: "empty", children: /* @__PURE__ */ e(Ot, {}) }),
    n === "err" && /* @__PURE__ */ e("div", { class: "t muted", children: "Vaults aren't available right now." }),
    Array.isArray(n) && n.map((r) => /* @__PURE__ */ e("a", { class: "vault", href: t.vaultUrl(r.id), target: "_blank", rel: "noopener noreferrer", title: `Open ${r.name} on Strike`, children: [
      /* @__PURE__ */ e("span", { class: "vn", children: r.name }),
      /* @__PURE__ */ e("span", { class: "num", children: r.tvl === null ? "—" : `$${r.tvl.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 1 })}` }),
      /* @__PURE__ */ e("span", { class: `num ${Ai(r.aprPct)}`, children: r.aprPct === null ? "—" : `${Qr(r.aprPct, 1)} APR` })
    ] }, r.id)),
    Array.isArray(n) && /* @__PURE__ */ e("div", { class: "t muted", children: "Read-only. Deposits into vaults happen in Strike's app." })
  ] });
}
const Sd = [1, 2, 3, 5, 10, 15, 20, 25, 40, 50, 75, 100], Ba = "strike-everywhere:wallet", Ra = [
  ["stop", "Stop Market", "Market order once the mark price reaches a trigger"],
  ["stop_limit", "Stop Limit", "Limit order once the mark price reaches a trigger"],
  ["twap", "TWAP", "Split into timed market slices over 5 min – 24 h"]
], $d = [5, 15, 60, 240], Cd = 8, qa = 5e-3, Md = 0.02;
function zd(t) {
  try {
    return sessionStorage.getItem(t);
  } catch {
    return null;
  }
}
function Td(t, n) {
  try {
    sessionStorage.setItem(t, n);
  } catch {
  }
}
const Hn = Pn, Gr = (t) => t < 60 ? `${t} min` : t % 60 ? `${Math.floor(t / 60)} h ${t % 60} min` : `${t / 60} h`, Je = (t, n = 0) => Number.isFinite(Number(t)) && t !== null && t !== "" ? Number(t) : n;
function Nd({ config: t }) {
  const n = tn(() => new Ii(t), []), [i, r] = g([]), [s, a] = g(t.market), [o, c] = g({}), [d, p] = g([]), [u, l] = g(5e-4), [h, m] = g(""), [f, k] = g("price"), [y, _] = g("1h"), [w, T] = g(void 0), [$, v] = g(n.session), [C, S] = g(null), [q, x] = g([]), [z, N] = g([]), [R, oe] = g([]), [M, I] = g(t.side ?? "buy"), [F, W] = g("market"), [P, A] = g(""), [O, J] = g(""), [le, Me] = g(""), [Le, pt] = g(Math.min(3, t.maxLeverage)), [ke, G] = g(!1), [X, xe] = g(!1), [Re, Ee] = g(""), [st, ft] = g(""), [ut, ze] = g(60), [Pt, pn] = g(""), [et, St] = g(""), [Bt, L] = g(!1), [B, Q] = g(""), ae = Oe(null), [te, D] = g(null), [ie, de] = g(!1), [V, Pe] = g(!1), [ge, he] = g(null), [Ge, Xe] = g(null), [Ze, $t] = g(null), [ye, wn] = g(""), [Ct, _n] = g("positions"), [Lt, ht] = g(null), [Di, Bn] = g(""), Rn = Oe(), [Oi, Bi] = g(!1), [Et, Ri] = g(/* @__PURE__ */ new Set()), Mt = (b, j) => Ri((ee) => {
    const pe = new Set(ee);
    return j ? pe.add(b) : pe.delete(b), pe;
  }), [wr, Gt] = g(!1);
  Z(() => {
    Gt(!1), !(!$ || !t.referralCode) && n.withdrawLimits().then((b) => Gt(b.feeDiscountPct === 0)).catch(() => {
    });
  }, [$]), Z(() => a(t.market), [t.market]), Z(() => I(t.side ?? "buy"), [t.side]), Z(() => pt((b) => Math.min(b, t.maxLeverage)), [t.maxLeverage]), Z(() => {
    J(""), Me(""), St(""), Ee(""), ft(""), ht(null), he(null);
  }, [s]);
  const [Rt, Sn] = g(null), si = Oe(), [E, bt] = g(null), ai = Oe(), fe = (b, j, ee = !1) => {
    Sn({ kind: b, text: j }), clearTimeout(si.current), si.current = setTimeout(() => Sn(null), b === "ok" ? 4500 : 8e3), ee && (bt({ kind: b, text: j }), clearTimeout(ai.current), ai.current = setTimeout(() => bt(null), b === "ok" ? 1e4 : 15e3));
  };
  Z(() => {
    let b = !0;
    const j = n.on((_e) => {
      _e.type === "session" && v(_e.session), _e.type === "session" && _e.reason === "idle" && fe("err", `Signed out after ${Math.round(n.idleTimeoutMs / 6e4)} minutes without activity. Connect again to trade.`), _e.type === "session" && _e.reason === "expired" && fe("err", "Session expired. Connect again."), _e.type === "user" && Yo();
    });
    (async () => {
      for (let _e = 0; b; _e++)
        try {
          _e === 0 && await n.init();
          const [Ft, qt, Ut] = await Promise.all([n.loadMarkets(), n.market.tickers().catch(() => []), n.market.baseTakerRate()]);
          if (!b) return;
          r(Ft), l(Ut), m("");
          const yt = {};
          for (const it of Ft) {
            const zt = n.raw(it.symbol), Un = Array.isArray(qt) ? qt.find((dl) => dl?.symbol === it.symbol) : void 0, ea = Je(zt.mark_price);
            yt[it.symbol] = {
              mark: ea,
              index: Je(zt.index_price),
              funding: Je(zt.funding_rate),
              last: Je(Un?.lastPrice, Je(zt.last_price)),
              open: Un ? Je(Un.lastPrice) / (1 + Je(Un.priceChangePercent) / 100) : ea,
              quoteVolume: Un ? Je(Un.quoteVolume) : 0
            };
          }
          c(yt);
          return;
        } catch (Ft) {
          if (!b) return;
          m(Ft?.message || "Could not reach Strike."), await new Promise((qt) => setTimeout(qt, Math.min(3e4, 2e3 * 2 ** _e)));
        }
    })();
    const ee = n.prices();
    ee.subscribe("!markprice@arr"), ee.subscribe("!miniticker@arr");
    const pe = ee.onMessage((_e) => {
      const Ft = Array.isArray(_e) ? _e : Array.isArray(_e?.data) ? _e.data : _e?.data ? [_e.data] : [_e];
      c((qt) => {
        let Ut = !1;
        const yt = { ...qt };
        for (const it of Ft) {
          if (!it?.s || !yt[it.s]) continue;
          const zt = yt[it.s];
          it.e === "markPriceUpdate" ? (yt[it.s] = { ...zt, mark: Je(it.p, zt.mark), index: Je(it.i, zt.index), funding: Je(it.r, zt.funding) }, Ut = !0) : it.e === "24hrMiniTicker" && (yt[it.s] = { ...zt, open: Je(it.o, zt.open), last: Je(it.c, zt.last), quoteVolume: Je(it.q, zt.quoteVolume) }, Ut = !0);
        }
        return Ut ? yt : qt;
      });
    }), we = setInterval(async () => {
      if (!At())
        try {
          const _e = await n.market.markets();
          c((Ft) => {
            const qt = { ...Ft };
            for (const Ut of _e) {
              const yt = qt[Ut.symbol];
              yt && (qt[Ut.symbol] = { ...yt, mark: Je(Ut.mark_price, yt.mark), index: Je(Ut.index_price, yt.index), funding: Je(Ut.funding_rate, yt.funding) });
            }
            return qt;
          });
        } catch {
        }
    }, 15e3);
    return () => {
      b = !1, j(), pe(), clearInterval(we), n.dispose();
    };
  }, [n]), Z(() => {
    i.length && !i.find((b) => b.symbol === s) && a(i[0].symbol);
  }, [i, s]), Z(() => {
    let b = !0;
    p([]);
    const j = () => n.market.klines(s, "1h", 48, "mark").then((pe) => b && p(pe.map((we) => we.close))).catch(() => {
    });
    j();
    const ee = setInterval(() => !At() && j(), 6e4);
    return () => {
      b = !1, clearInterval(ee);
    };
  }, [n, s]);
  const oi = Oe(), un = Oe(!0);
  Z(
    () => () => {
      un.current = !1, clearTimeout(oi.current), clearTimeout(Rn.current);
    },
    []
  );
  const Fs = Oe(!1);
  Fs.current = Ct === "twap" || R.length > 0;
  const tt = async (b = !1) => {
    const j = n.session;
    if (!un.current || !j) return;
    const ee = b || Fs.current ? n.trading.twaps().catch(() => null) : null;
    try {
      const [we, _e, Ft] = await Promise.all([n.account.account(), n.account.positions(), n.account.openOrders()]);
      if (!un.current || n.session !== j) return;
      S(we), x(_e), N(Ft);
    } catch (we) {
      we?.status === 401 && n.session && (n.disconnect(), fe("err", "Session expired. Connect again."));
    }
    const pe = await ee;
    pe && un.current && n.session === j && oe(pe);
  }, Yo = () => {
    clearTimeout(oi.current), oi.current = setTimeout(tt, 400);
  };
  Z(() => {
    if (!$) {
      S(null), x([]), N([]), oe([]);
      return;
    }
    tt(!0), n.userEvents();
    const b = setInterval(() => !At() && tt(), 5e3);
    return () => clearInterval(b);
  }, [$]), Z(() => {
    $ && Ct === "twap" && tt(!0);
  }, [Ct]);
  const De = i.find((b) => b.symbol === s), Ds = n.raw(s), xt = o[s], qe = xt?.mark ?? 0, _r = d.length >= 25 ? d[d.length - 25] : xt?.open ?? 0, Sr = _r > 0 && qe > 0 ? (qe - _r) / _r * 100 : 0, nt = De?.baseAsset ?? s.split("-")[0], vt = De?.tickSize, $r = tn(() => Object.fromEntries(i.map((b) => [b.symbol, b.tickSize])), [i]), Os = tn(() => Object.fromEntries(Object.entries(o).map(([b, j]) => [b, j.mark])), [o]), Ko = d.length ? [...d.slice(0, -1), qe || d[d.length - 1]] : [], qi = F === "stop" || F === "stop_limit", li = F === "limit" || F === "stop_limit", ci = F === "market" || F === "limit", It = Number(P) || 0, Ue = F === "market" ? qe : F === "stop" ? Number(le) > 0 ? Number(le) : qe : F === "twap" ? qe : Number(O) > 0 ? Number(O) : qe, Bs = De ? Yn(De.marginTiers, Math.max(It, 1)) : 1, Cr = Math.max(1, Math.min(t.maxLeverage, Bs)), mt = Math.min(Le, Cr), Vt = Je(C?.available_balance), Mr = Vt * mt, di = Mr > 0 ? Math.min(100, It / Mr * 100) : 0, hn = De ? li ? De.stepSize : De.marketStepSize ?? De.stepSize : 0, zr = Ue > 0 && De ? Number(me(It / Ue, hn, "floor")) : 0, Ie = De && Ue > 0 && hn > 0 && zr * Ue < De.minNotional && It >= De.minNotional ? Number(me(zr + hn, hn, "floor")) : zr, Ui = n.orderFeeBps, kt = De && Ue > 0 && It > 0 ? es({ side: M, price: Ue, notional: Ie * Ue, leverage: mt, takerRate: u, builderFeeBps: Ui, tiers: De.marginTiers }) : null, Hi = q.find((b) => b.symbol === s), mn = Hi ? Number(Hi.size) : 0, Yt = (ut || Number(Pt) || 0) * 60, Tr = It > 0 ? $l({ usd: It, size: Ie, price: Ue, leverage: mt, base: nt, step: hn }) : null, Nr = Sl({ position: mn, side: M, size: Ie, base: nt, reduceOnly: ke, step: hn }), gn = (b) => $e(b, vt), Xo = F === "limit" && Number(O) > 0 ? ` at ${gn(Number(O))} or better` : F === "stop" && Number(le) > 0 ? ` once the mark reaches ${gn(Number(le))}` : F === "stop_limit" && Number(le) > 0 ? ` at ${Number(O) > 0 ? gn(Number(O)) : "your limit"} once the mark reaches ${gn(Number(le))}` : F === "twap" && Yt >= yi && Yt <= wi ? ` over ${Gr(Yt / 60)}` : "", Rs = kt && Ie > 0 && !Nr ? Cl({
    side: M,
    leverage: mt,
    base: nt,
    size: Ie,
    notional: kt.notional,
    margin: kt.margin,
    entry: Ue,
    liqPrice: kt.liquidationPrice,
    fmtPrice: gn,
    resting: F !== "market",
    when: Xo,
    reduceOnly: ke
  }) : null, Zo = !C || Number(C.wallet_balance) <= 0 && q.length === 0, qn = Number(Ds?.order_limit_price_bound ?? 0.05) || 0.05, pi = xs(C, s) ?? "cross", Ar = Number(Ds?.order_market_price_bound) || qn, Ne = F === "market" && w && Ie > 0 ? gr(w, M, Ie, { mark: qe, bound: Ar }) : null, Wi = F === "market" && It > 0 && w === null, qs = `${s}|${M}|${Ie}|${Ne ? Ne.complete ? Math.ceil(Ne.slippage * 200) : "partial" : Wi ? "nobook" : ""}`, Us = !!Ne && (Ne.slippage > Md || !Ne.complete) || Wi, ji = (() => {
    if (!De) return "Loading market…";
    if (!$ || Vt <= 0 && !ke) return null;
    if (!It) return "Enter a size";
    if (!ke && Ie * Ue < De.minNotional) return `Minimum order ${be(De.minNotional, { decimals: 0 })}`;
    if (!ke && It / mt > Vt * 1.0001) return "Not enough available balance";
    if (F === "limit") {
      if (!(Number(O) > 0)) return "Enter a limit price";
      if (Math.abs(Number(O) - qe) / qe > qn) return `Limit price must be within ${(qn * 100).toFixed(0)}% of mark`;
    }
    if (qi) {
      const b = _i({ side: M, type: F, stopPrice: Number(le), price: Number(O), mark: qe, priceBound: qn, tickSize: vt });
      if (b) return b;
    }
    if (F === "twap" && !(Yt >= yi && Yt <= wi)) return "Duration must be 5–1440 minutes";
    if (F === "twap" && Number(et) > 0 && Math.abs(Number(et) - qe) / qe > qn) return `Limit price must be within ${(qn * 100).toFixed(0)}% of mark`;
    if (F === "market" && w === void 0) return "Checking order book…";
    if (X && ci) {
      const b = Number(Re), j = Number(st);
      if (b && (M === "buy" ? b <= Ue : b >= Ue)) return "Take-profit must be beyond entry";
      if (j && (M === "buy" ? j >= Ue : j <= Ue)) return "Stop-loss must be on the losing side of entry";
    }
    return null;
  })(), Hs = Us && B !== qs;
  Z(() => {
    if (!B) return;
    const b = setTimeout(() => Q(""), 15e3);
    return () => clearTimeout(b);
  }, [B]);
  const Ws = !!De && (f === "book" || F === "market" && It > 0);
  Z(() => {
    if (T(void 0), !Ws) return;
    const b = n.orderBook(s);
    let j;
    const ee = b.onUpdate(() => {
      j || (j = setTimeout(() => (j = void 0, T(b.view(200))), 200));
    }), pe = setTimeout(() => T((we) => we === void 0 ? null : we), 1e4);
    return () => {
      ee(), clearTimeout(j), clearTimeout(pe), b.close();
    };
  }, [n, s, Ws]);
  const js = async () => {
    if (!(!De || ji)) {
      if (Hs) return Q(qs);
      de(!0), Q("");
      try {
        if (F === "twap") {
          await n.placeTwap({
            symbol: s,
            side: M,
            size: Ie,
            durationSec: Yt,
            limitPrice: Number(et) > 0 ? Number(et) : void 0,
            reduceOnly: ke,
            randomize: Bt,
            leverage: ke ? void 0 : mt
          }), fe("ok", `TWAP started: ${M === "buy" ? "Long" : "Short"} ${Hn(Ie)} ${nt} over ${Gr(Yt / 60)}`, !0), A(""), _n("twap"), tt(!0);
          return;
        }
        const b = await n.placeOrder({
          symbol: s,
          side: M,
          type: F,
          size: Ie,
          price: li ? Number(O) : void 0,
          stopPrice: qi ? Number(le) : void 0,
          reduceOnly: ke,
          takeProfit: X && ci && Number(Re) > 0 ? Number(Re) : void 0,
          stopLoss: X && ci && Number(st) > 0 ? Number(st) : void 0,
          leverage: ke ? void 0 : mt
        }), j = b.status === "open" || b.status === "untriggered", ee = `${M === "buy" ? "Long" : "Short"} ${Hn(Ie)} ${nt}`;
        if (b.status === "filled") {
          const pe = Ne?.avgPrice ?? Ue, we = _l(mn, M, Ie, ke);
          fe("ok", `Filled: ${ee} at ~${$e(pe, vt)} (~${be(Ie * pe)}). ${we ? `You now hold ${mi(we, nt)}` : `Your ${nt} position is closed`}`, !0), Bn(s), clearTimeout(Rn.current), Rn.current = setTimeout(() => Bn(""), 1600);
        } else if (/cancel|expire/i.test(b.status) && (F === "market" || F === "stop"))
          fe("err", `Not filled: there were no ${M === "buy" ? "sellers" : "buyers"} close enough to the market price (within Strike's ${(Ar * 100).toFixed(0)}% band), so Strike cancelled the order. Nothing was traded.`, !0);
        else {
          const pe = b.status === "untriggered" ? "Stop order placed" : b.status === "open" ? "Order placed" : `Order ${b.status}`;
          fe("ok", `${pe}: ${ee}`, !0);
        }
        A(""), he(null), _n(j ? "orders" : "positions"), tt();
      } catch (b) {
        if (b instanceof Jt) {
          const j = `${M === "buy" ? "Long" : "Short"} ${Hn(Ie)} ${nt}`;
          fe("ok", `Sent to Strike: ${j}. Confirming the result; don't send it again.`, !0), A(""), b.settled.then(
            (ee) => {
              tt(), ee ? /cancel|expire/i.test(ee.status) ? fe("err", "Not filled: Strike cancelled the order. Nothing was traded.", !0) : fe("ok", ee.status === "filled" ? `Filled: ${j}` : `Order ${ee.status}: ${j}`, !0) : fe("ok", "Strike hasn't confirmed this order yet. Check Positions and Open Orders before trying again.", !0);
            },
            (ee) => (tt(), fe("err", `Rejected: ${ee?.message || ee}`, !0))
          );
        } else fe("err", b instanceof Nn ? `Rejected: ${b.message}` : b?.message || String(b), !0);
      } finally {
        de(!1);
      }
    }
  };
  Z(() => {
    if (!Ge) return;
    const b = setTimeout(() => ae.current?.querySelector(".sheet")?.scrollIntoView({ block: "start", behavior: "smooth" }), 30);
    return () => clearTimeout(b);
  }, [Ge]);
  const [Jo, Gs] = g(null), Vs = Oe(), Gi = (b, j) => {
    Gs({ id: b, ...j }), clearTimeout(Vs.current), Vs.current = setTimeout(() => Gs(null), 15e3), setTimeout(() => ae.current?.querySelector(".list .ticket-msg")?.scrollIntoView({ block: "center", behavior: "smooth" }), 50);
  }, Qo = async (b) => {
    const j = `pos:${b.id}`;
    if (ht(null), !Et.has(j)) {
      Mt(j, !0);
      try {
        const ee = await n.closePosition(b), pe = mi(Number(b.size), b.symbol.split("-")[0]), we = ee.status === "filled" ? { kind: "ok", text: `✓ Closed ${pe} · PnL ≈ ${be(Number(b.upnl), { sign: !0 })}` } : /cancel|expire/i.test(ee.status) ? { kind: "err", text: `Not closed: there were no ${Number(b.size) > 0 ? "buyers" : "sellers"} close enough to the market price (within Strike's price band), so Strike cancelled the close order. Your ${pe} position is still open.` } : { kind: "ok", text: `Close order ${ee.status}` };
        fe(we.kind, we.text), Gi(b.id, we), tt();
      } catch (ee) {
        if (ee instanceof Jt) {
          const pe = mi(Number(b.size), b.symbol.split("-")[0]);
          Gi(b.id, { kind: "ok", text: "Close sent to Strike. Confirming; don't send it again." }), ee.settled.then(
            (we) => {
              tt();
              const _e = we ? we.status === "filled" ? { kind: "ok", text: `✓ Closed ${pe}` } : /cancel|expire/i.test(we.status) ? { kind: "err", text: `Not closed: Strike cancelled the close order. Your ${pe} position is still open.` } : { kind: "ok", text: `Close order ${we.status}` } : { kind: "ok", text: "Strike hasn't confirmed the close yet. Check Positions before trying again." };
              fe(_e.kind, _e.text), Gi(b.id, _e);
            },
            (we) => (tt(), fe("err", we?.message || String(we)))
          );
        } else
          fe("err", ee?.message || String(ee)), Gi(b.id, { kind: "err", text: ee?.message || String(ee) });
      } finally {
        Mt(j, !1);
      }
    }
  }, el = async (b) => {
    const j = `ord:${b.id}`;
    if (!Et.has(j)) {
      Mt(j, !0);
      try {
        await n.trading.cancelOrder(b.symbol, b.id), fe("ok", "Order cancelled"), setTimeout(tt, 600);
      } catch (ee) {
        fe("err", ee?.message || String(ee));
      } finally {
        Mt(j, !1);
      }
    }
  }, Ys = async (b) => {
    if (ht(null), !Et.has("cancelall")) {
      Mt("cancelall", !0);
      try {
        const j = await n.cancelAll(b);
        fe("ok", j === null ? "Cancelling orders…" : `Cancelled ${j} order${j === 1 ? "" : "s"}`), setTimeout(tt, 600);
      } catch (j) {
        fe("err", j?.message || String(j));
      } finally {
        Mt("cancelall", !1);
      }
    }
  }, tl = async (b) => {
    const j = `twap:${b.id}`;
    if (!Et.has(j)) {
      Mt(j, !0);
      try {
        await n.trading.cancelTwap(b.id), fe("ok", "TWAP cancelling"), tt(!0);
      } catch (ee) {
        fe("err", ee?.message || String(ee));
      } finally {
        Mt(j, !1);
      }
    }
  }, nl = async () => {
    const b = pi === "cross" ? "isolated" : "cross";
    ht(null), Bi(!0);
    try {
      await n.setMarginMode(s, b), fe("ok", `${s} now uses ${b} margin`), tt();
    } catch (j) {
      fe("err", j?.message || String(j));
    } finally {
      Bi(!1);
    }
  }, Ks = async (b) => {
    if (!n.wallet) {
      const j = zd(Ba);
      if (j)
        try {
          await n.ensureWallet(j);
        } catch (ee) {
          fe("err", ee?.message || String(ee));
          return;
        }
    }
    if (!n.wallet) return Xe("connect");
    Xe(b);
  }, Pr = () => Ks("deposit"), Xs = (b) => {
    if (Mr <= 0 || !De) return;
    if (b === 0) return A("");
    const j = u + Ui / 1e4;
    let ee = Vt * mt * (b / 100);
    for (let pe = 0; pe < 4; pe++) {
      const we = Math.max(1, Math.min(mt, Yn(De.marginTiers, ee)));
      ee = Vt * (b / 100) / (1 / we + j);
    }
    A((Math.floor(ee * 0.998 * 100) / 100).toString());
  }, il = (b) => {
    const j = me(b, vt ?? 1e-4);
    F === "stop" ? Me(j) : F === "twap" ? St(j) : (J(j), li || (he({ from: F, price: O }), W("limit"))), setTimeout(() => {
      const ee = ae.current?.querySelector(F === "stop" ? "#se-trigger" : F === "twap" ? "#se-twap-limit" : "#se-price"), pe = ee?.closest(".field") ?? ee;
      pe && (pe.scrollIntoView({ block: "center", behavior: "smooth" }), pe.classList.remove("flash"), pe.offsetWidth, pe.classList.add("flash"));
    }, 50);
  }, rl = () => {
    ge && (W(ge.from), J(ge.price), he(null));
  }, Zs = (b) => (W(b), he(null)), sl = i.filter((b) => !ye || b.symbol.toLowerCase().includes(ye.toLowerCase()) || b.name.toLowerCase().includes(ye.toLowerCase())), Lr = (b, j, ee, pe, we, _e = !0) => /* @__PURE__ */ e("div", { class: "field", children: [
    /* @__PURE__ */ e("label", { for: b, children: j }),
    /* @__PURE__ */ e("input", { id: b, inputMode: "decimal", placeholder: we ?? (qe ? $e(qe, vt).replace(/,/g, "") : "0"), value: ee, onInput: (Ft) => pe(Ce(Ft)) }),
    _e && /* @__PURE__ */ e("button", { class: "unit linkbtn", style: { textDecoration: "none" }, onClick: () => pe(me(qe, vt ?? 1e-4)), children: "Mark" })
  ] }), ui = (b) => /* @__PURE__ */ e("div", { class: "empty", children: [
    "Connect a wallet to see your ",
    b,
    ".",
    " ",
    /* @__PURE__ */ e("button", { class: "linkbtn", onClick: () => Xe("connect"), children: "Connect" })
  ] }), al = (() => {
    if (!$) return /* @__PURE__ */ e("button", { class: "cta", onClick: () => Xe("connect"), children: "Connect Wallet" });
    if (Vt <= 0 && !ke) return /* @__PURE__ */ e("button", { class: "cta", onClick: Pr, children: "Deposit to trade" });
    if (!ji && Hs && !ie)
      return /* @__PURE__ */ e("button", { class: "cta caution", onClick: js, children: Wi ? "Confirm: slippage unknown" : Ne && !Ne.complete ? "Confirm: the book can't fill it all" : `Confirm: est. slippage ${((Ne?.slippage ?? 0) * 100).toFixed(2)}%` });
    const b = Ml({
      side: M,
      base: nt,
      type: F,
      price: li && Number(O) > 0 ? gn(Number(O)) : void 0,
      trigger: qi && Number(le) > 0 ? gn(Number(le)) : void 0,
      notional: It ? Ie * Ue : 0
    });
    return /* @__PURE__ */ e("button", { class: `cta${M === "sell" ? " short" : ""}`, disabled: !!ji || ie, onClick: js, children: ie ? /* @__PURE__ */ e(U, { children: [
      /* @__PURE__ */ e(Ot, {}),
      " Placing…"
    ] }) : ji ?? b });
  })();
  if (h && !i.length)
    return /* @__PURE__ */ e("div", { class: "card", children: /* @__PURE__ */ e("div", { class: "ticket", children: /* @__PURE__ */ e("div", { class: "warn", children: "Can't reach Strike right now. Retrying…" }) }) });
  const Er = Ra.find((b) => b[0] === F)?.[1];
  n.net.network;
  const Ir = Ue || qe, ol = Ie > 0 && Ue > 0 ? Ie * Ue : 100, Js = (b) => De && Ir > 0 ? Li(Ir, es({ side: M, price: Ir, notional: ol, leverage: b, takerRate: u, builderFeeBps: Ui, tiers: De.marginTiers }).liquidationPrice) : "", Qs = V || ke, ll = {
    market: Ne ? "Average fill estimated from the live order book" : "Market orders fill near the mark price",
    limit: "Your limit price",
    stop: "Your trigger price; once the mark reaches it, a market order fills near it",
    stop_limit: "Your limit price, once the mark reaches the trigger",
    twap: "Slices fill at market over the duration (never past your limit, if set)"
  }, cl = [
    ["positions", $ ? `Positions (${q.length})` : "Positions"],
    ["orders", $ ? `Orders (${z.length})` : "Orders"],
    ["twap", $ && R.length ? `TWAP (${R.length})` : "TWAP"],
    ["history", "History"],
    ["account", "Account"]
  ], hi = z.filter((b) => b.symbol === s).length;
  return /* @__PURE__ */ e(
    "div",
    {
      ref: ae,
      class: "card",
      onClick: (b) => Ze && !b.target.closest(".menu, [data-menu]") && $t(null),
      onKeyDown: (b) => b.key === "Escape" && (Ze ? $t(null) : Lt ? ht(null) : B ? Q("") : Ge && Xe(null)),
      children: [
        /* @__PURE__ */ e("div", { class: "mkt", children: [
          /* @__PURE__ */ e(Oa, { base: nt }),
          /* @__PURE__ */ e("div", { class: "mkt-id", children: /* @__PURE__ */ e("button", { class: "mkt-pick", "data-menu": !0, onClick: () => $t(Ze === "market" ? null : "market"), "aria-haspopup": "listbox", "aria-expanded": Ze === "market", children: [
            s,
            " ",
            /* @__PURE__ */ e(Ur, {})
          ] }) }),
          /* @__PURE__ */ e("div", { class: "mkt-price", children: [
            /* @__PURE__ */ e("div", { class: "big num", children: qe ? $e(qe, vt) : "—" }),
            /* @__PURE__ */ e("div", { class: `chg num ${Sr >= 0 ? "pos" : "neg"}`, children: xt ? Qr(Sr) : "" })
          ] })
        ] }),
        Ze === "market" && /* @__PURE__ */ e("div", { class: "menu", role: "listbox", children: [
          /* @__PURE__ */ e("input", { placeholder: "Search markets", "aria-label": "Search markets", value: ye, onInput: (b) => wn(b.target.value), autoFocus: !0 }),
          sl.map((b) => {
            const j = o[b.symbol], ee = j && j.open ? (j.mark - j.open) / j.open * 100 : 0;
            return /* @__PURE__ */ e("button", { class: `menu-row${b.symbol === s ? " on" : ""}`, role: "option", "aria-selected": b.symbol === s, onClick: () => (a(b.symbol), $t(null), wn("")), children: [
              /* @__PURE__ */ e("span", { class: "menu-id", children: [
                /* @__PURE__ */ e(Oa, { base: b.baseAsset ?? b.symbol.split("-")[0] }),
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
              /* @__PURE__ */ e("span", { class: "num", children: j ? $e(j.mark, b.tickSize) : "" }),
              /* @__PURE__ */ e("span", { class: `num ${ee >= 0 ? "pos" : "neg"}`, children: j ? Qr(ee) : "" })
            ] }, b.symbol);
          })
        ] }),
        !$ && // Always visible, so hosts that show the widget in a short scrolling area (e.g. a wallet popup) don't hide connecting below the fold.
        /* @__PURE__ */ e("div", { class: "connect-strip", children: [
          /* @__PURE__ */ e("span", { children: "Connect a Cardano wallet to trade" }),
          /* @__PURE__ */ e("button", { class: "mini go", onClick: () => Xe("connect"), children: "Connect" })
        ] }),
        /* @__PURE__ */ e("div", { class: "stats", children: [
          /* @__PURE__ */ e("div", { class: "stat", children: [
            /* @__PURE__ */ e("div", { class: "k", children: [
              "Index",
              /* @__PURE__ */ e(Wn, { label: "About the index price", children: [
                "The average ",
                nt,
                " spot price on major external exchanges. Strike's price is kept close to it."
              ] })
            ] }),
            /* @__PURE__ */ e("div", { class: "v num", children: xt ? $e(xt.index, vt) : "—" })
          ] }),
          /* @__PURE__ */ e("div", { class: "stat", children: [
            /* @__PURE__ */ e("div", { class: "k", children: [
              "Funding",
              /* @__PURE__ */ e(Wn, { label: "About funding", children: "Every hour, one side pays the other to keep the price close to the index. Positive: longs pay shorts; negative: shorts pay longs." })
            ] }),
            /* @__PURE__ */ e("div", { class: `v fund ${!xt || !xt.funding ? "" : xt.funding < 0 ? "neg" : "pos"}`, children: xt ? ps(xt.funding) : "—" })
          ] }),
          /* @__PURE__ */ e("div", { class: "stat", children: [
            /* @__PURE__ */ e("div", { class: "k", children: "24h Volume" }),
            /* @__PURE__ */ e("div", { class: "v num", children: xt ? be(xt.quoteVolume, { decimals: 0 }) : "—" })
          ] })
        ] }),
        /* @__PURE__ */ e("div", { class: "views", children: [
          /* @__PURE__ */ e("div", { class: "vtabs", role: "tablist", "aria-label": "Market view", children: ["price", "chart", "book"].map((b) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": f === b, class: f === b ? "on" : "", onClick: () => k(b), children: b === "price" ? "Price" : b === "chart" ? "Chart" : "Book" }, b)) }),
          f === "chart" && /* @__PURE__ */ e("div", { class: "ivs", role: "radiogroup", "aria-label": "Candle interval", children: Object.keys(Oo).map((b) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": y === b, class: y === b ? "on" : "", onClick: () => _(b), children: b === "1d" ? "1D" : b }, b)) })
        ] }),
        f === "price" && /* @__PURE__ */ e(nd, { points: Ko, up: Sr >= 0 }),
        f === "chart" && /* @__PURE__ */ e(vr, { client: n, symbol: s, interval: y, tick: vt, live: { mark: qe, last: xt?.last ?? 0, index: xt?.index ?? 0 } }),
        f === "book" && /* @__PURE__ */ e(
          ud,
          {
            book: w,
            depth: Cd,
            tick: vt,
            base: nt,
            onPick: il,
            hint: F === "stop" || F === "stop_limit" ? "Tap a price to use it in your stop order" : F === "twap" ? "Tap a price to set the TWAP limit" : "Tap a price to place a Limit order there"
          }
        ),
        /* @__PURE__ */ e("div", { class: "ticket", children: [
          /* @__PURE__ */ e("div", { class: "pills", children: [
            /* @__PURE__ */ e("span", { class: "pillx", children: [
              /* @__PURE__ */ e(
                "button",
                {
                  class: "pill",
                  disabled: !$ || !C || Oi || !!Hi || z.some((b) => b.symbol === s),
                  "aria-label": `Margin mode: ${pi}`,
                  title: $ ? Hi || z.some((b) => b.symbol === s) ? "Close this market's position and open orders to change margin mode" : "Switch between cross and isolated margin for this market" : "Cross margin (Strike's default). Connect to change it.",
                  onClick: () => ht(Lt === "margin" ? null : "margin"),
                  children: Oi ? /* @__PURE__ */ e(Ot, {}) : pi === "cross" ? "Cross margin" : "Isolated margin"
                }
              ),
              /* @__PURE__ */ e(Wn, { label: "Cross vs isolated margin", children: [
                /* @__PURE__ */ e("b", { children: "Cross:" }),
                " your whole balance backs your positions, so liquidation is further away, but a big loss can use all of it. ",
                /* @__PURE__ */ e("b", { children: "Isolated:" }),
                " each position can only lose the margin you put in it."
              ] })
            ] }),
            /* @__PURE__ */ e("span", { class: "pillx", children: [
              /* @__PURE__ */ e("button", { class: "pill", "data-menu": !0, onClick: () => $t(Ze === "leverage" ? null : "leverage"), "aria-label": `Leverage ${mt}x, change`, title: "Leverage: tap to change", children: [
                /* @__PURE__ */ e("span", { class: "pill-k", children: "Leverage" }),
                " ",
                mt,
                "x"
              ] }),
              /* @__PURE__ */ e(Wn, { label: "About leverage", children: [
                "Leverage multiplies your position: at ",
                mt,
                "x, $10 of your balance controls $",
                10 * mt,
                " of ",
                nt,
                ". Gains and losses grow ",
                mt,
                "x too, and liquidation comes closer."
              ] })
            ] })
          ] }),
          Lt === "margin" && (mn ? /* @__PURE__ */ e(tr, { actions: /* @__PURE__ */ e("button", { class: "mini", onClick: () => ht(null), children: "OK" }), children: [
            "Close your ",
            s,
            " position first: Strike only changes margin mode with no open position."
          ] }) : /* @__PURE__ */ e(
            tr,
            {
              actions: /* @__PURE__ */ e(U, { children: [
                /* @__PURE__ */ e("button", { class: "mini", onClick: () => ht(null), children: "Cancel" }),
                /* @__PURE__ */ e("button", { class: "mini go", onClick: nl, children: "Switch" })
              ] }),
              children: pi === "cross" ? `Switch ${s} to isolated margin? Each new position only risks the margin you give it, so its liquidation price is closer.` : `Switch ${s} to cross margin? Your whole balance backs positions: liquidation is further away, but losses can draw on all of it.`
            }
          )),
          Ze === "leverage" && /* @__PURE__ */ e("div", { class: "menu inl", children: [
            /* @__PURE__ */ e("div", { class: "t muted", style: { padding: "4px 8px 6px", fontSize: "11.5px" }, children: [
              "Max ",
              Cr,
              "x for this size",
              t.maxLeverage < Bs ? ` (site limit ${t.maxLeverage}x)` : "",
              " · % = price move to liquidation",
              Ie > 0 && Ue > 0 ? "" : " (for a $100 position)"
            ] }),
            /* @__PURE__ */ e("div", { class: "levs", children: Sd.filter((b) => b <= Cr).map((b) => /* @__PURE__ */ e("button", { class: `pill${b === mt ? " on" : ""}`, onClick: () => (pt(b), $t(null)), "aria-label": `${b}x leverage, liquidation about ${Js(b) || "unknown"} away`, children: [
              b,
              "x",
              /* @__PURE__ */ e("span", { class: "lq num", children: Js(b) || "—" })
            ] }, b)) }),
            /* @__PURE__ */ e("div", { class: "t muted", style: { padding: "6px 8px 2px", fontSize: "11.5px" }, children: "Higher leverage = bigger gains and losses, and liquidation comes closer." })
          ] }),
          /* @__PURE__ */ e("div", { class: "tabs", role: "tablist", "aria-label": "Order type", children: [
            ["market", "limit"].map((b) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": F === b, class: `tab${F === b ? " on" : ""}`, onClick: () => Zs(b), children: b === "market" ? "Market" : "Limit" }, b)),
            /* @__PURE__ */ e(
              "button",
              {
                role: "tab",
                "aria-selected": !!Er,
                "aria-haspopup": "menu",
                "aria-expanded": Ze === "ordertype",
                "data-menu": !0,
                class: `tab${Er ? " on" : ""}`,
                onClick: () => $t(Ze === "ordertype" ? null : "ordertype"),
                children: [
                  Er ?? "Advanced",
                  " ",
                  /* @__PURE__ */ e(Ur, { size: 10 })
                ]
              }
            )
          ] }),
          ge && F === "limit" && /* @__PURE__ */ e("div", { class: "helper", role: "status", children: [
            "Switched to a Limit order",
            Number(O) > 0 ? ` at ${gn(Number(O))}` : "",
            " ·",
            " ",
            /* @__PURE__ */ e("button", { class: "linkbtn", onClick: rl, children: "Undo" })
          ] }),
          Ze === "ordertype" && /* @__PURE__ */ e("div", { class: "menu inl", role: "menu", "aria-label": "Advanced order types", children: Ra.map(([b, j, ee]) => /* @__PURE__ */ e("button", { role: "menuitem", class: `menu-row${F === b ? " on" : ""}`, onClick: () => (Zs(b), $t(null)), children: /* @__PURE__ */ e("span", { children: [
            /* @__PURE__ */ e("div", { class: "n", children: j }),
            /* @__PURE__ */ e("div", { class: "t", children: ee })
          ] }) }, b)) }),
          /* @__PURE__ */ e("div", { class: "seg", children: [
            /* @__PURE__ */ e("button", { class: `long${M === "buy" ? " on" : ""}`, onClick: () => I("buy"), children: "Long/Buy" }),
            /* @__PURE__ */ e("button", { class: `short${M === "sell" ? " on" : ""}`, onClick: () => I("sell"), children: "Short/Sell" })
          ] }),
          /* @__PURE__ */ e("div", { class: "helper seg-hint", children: [
            "Long = profit if ",
            nt,
            " goes up · Short = ",
            /* @__PURE__ */ e("span", { class: "w", children: "profit " }),
            "if it goes down"
          ] }),
          /* @__PURE__ */ e(
            Fe,
            {
              k: /* @__PURE__ */ e(U, { children: [
                "Available to Trade",
                $ && /* @__PURE__ */ e("button", { class: "linkbtn dep", onClick: Pr, children: "+ Deposit" })
              ] }),
              v: $ ? /* @__PURE__ */ e("span", { class: "num", children: be(Vt) }) : "—"
            }
          ),
          /* @__PURE__ */ e(
            Fe,
            {
              k: "Current Position",
              v: mn ? /* @__PURE__ */ e("span", { class: `num ${mn > 0 ? "pos" : "neg"}`, children: [
                mi(mn, nt),
                qe ? ` (~${be(Math.abs(mn) * qe)})` : ""
              ] }) : "—"
            }
          ),
          qi && Lr("se-trigger", "Trigger", le, Me),
          li && Lr("se-price", "Price", O, J),
          /* @__PURE__ */ e("div", { class: "field", children: [
            /* @__PURE__ */ e("label", { for: "se-size", children: "Size" }),
            /* @__PURE__ */ e("input", { id: "se-size", inputMode: "decimal", placeholder: "0.00", value: P, onInput: (b) => A(Ce(b)), "aria-label": "Order size in USD", "aria-describedby": Tr ? "se-size-line" : void 0 }),
            /* @__PURE__ */ e("span", { class: "unit", children: "USD" })
          ] }),
          Tr && /* @__PURE__ */ e("div", { class: "helper", id: "se-size-line", children: Tr }),
          /* @__PURE__ */ e("div", { class: "slider-row", children: [
            /* @__PURE__ */ e(td, { value: di, onChange: Xs }),
            /* @__PURE__ */ e("label", { class: "pct num", children: [
              /* @__PURE__ */ e(
                "input",
                {
                  inputMode: "decimal",
                  "aria-label": "Order size as percent of buying power",
                  value: te ?? (di ? di.toFixed(1) : ""),
                  placeholder: "0",
                  onFocus: () => D(di ? di.toFixed(1) : ""),
                  onInput: (b) => D(Ce(b)),
                  onBlur: () => {
                    const b = Number(te);
                    te !== null && Number.isFinite(b) && Xs(Math.max(0, Math.min(100, b))), D(null);
                  },
                  onKeyDown: (b) => b.key === "Enter" && b.target.blur()
                }
              ),
              "%"
            ] }),
            /* @__PURE__ */ e(Wn, { label: "About the size slider", children: "The slider sets your order size as a % of your buying power (available balance × leverage). Change leverage with the Leverage button above." })
          ] }),
          F === "twap" && /* @__PURE__ */ e(U, { children: [
            /* @__PURE__ */ e("div", { class: "durs", role: "radiogroup", "aria-label": "TWAP duration", children: [
              /* @__PURE__ */ e("span", { class: "lbl", children: "Duration" }),
              $d.map((b) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": ut === b, class: ut === b ? "on" : "", onClick: () => ze(b), children: b < 60 ? `${b}m` : `${b / 60}h` }, b)),
              /* @__PURE__ */ e("button", { role: "radio", "aria-checked": ut === 0, class: ut === 0 ? "on" : "", onClick: () => ze(0), children: "Custom" })
            ] }),
            ut === 0 && /* @__PURE__ */ e("div", { class: "field", children: [
              /* @__PURE__ */ e("label", { for: "se-dur", children: "Duration" }),
              /* @__PURE__ */ e("input", { id: "se-dur", inputMode: "numeric", placeholder: "5 – 1440", value: Pt, onInput: (b) => pn(b.target.value.replace(/[^0-9]/g, "").slice(0, 4)) }),
              /* @__PURE__ */ e("span", { class: "unit", children: "min" })
            ] }),
            Lr("se-twap-limit", "Limit", et, St, "Optional", !1)
          ] }),
          /* @__PURE__ */ e("div", { class: "checks", children: [
            ci && /* @__PURE__ */ e(Hr, { on: X, label: "TP/SL", onToggle: () => xe(!X) }),
            F === "twap" && /* @__PURE__ */ e(Hr, { on: Bt, label: "Randomize", onToggle: () => L(!Bt) }),
            /* @__PURE__ */ e("button", { class: "linkbtn adv", "aria-expanded": Qs, "aria-controls": "se-adv", disabled: ke, onClick: () => Pe(!V), children: [
              "Advanced options ",
              /* @__PURE__ */ e(Ur, { size: 10 })
            ] })
          ] }),
          Qs && /* @__PURE__ */ e("div", { class: "checks", id: "se-adv", children: [
            /* @__PURE__ */ e(Hr, { on: ke, label: "Reduce Only", onToggle: () => G(!ke) }),
            /* @__PURE__ */ e("span", { class: "helper", children: "Only shrinks an open position, never opens or flips one" })
          ] }),
          X && ci && /* @__PURE__ */ e("div", { class: "tpsl", children: [
            /* @__PURE__ */ e("div", { class: "field", children: [
              /* @__PURE__ */ e("label", { for: "se-tp", children: "TP" }),
              /* @__PURE__ */ e("input", { id: "se-tp", inputMode: "decimal", placeholder: "Take-profit price", value: Re, onInput: (b) => Ee(Ce(b)) })
            ] }),
            /* @__PURE__ */ e("div", { class: "field", children: [
              /* @__PURE__ */ e("label", { for: "se-sl", children: "SL" }),
              /* @__PURE__ */ e("input", { id: "se-sl", inputMode: "decimal", placeholder: "Stop-loss price", value: st, onInput: (b) => ft(Ce(b)) })
            ] })
          ] }),
          Nr && /* @__PURE__ */ e("div", { class: Ie > Math.abs(mn) + hn / 2 ? "warn" : "note", children: Nr }),
          Rs && /* @__PURE__ */ e("div", { class: "helper summary", children: Rs }),
          al,
          E && // The order result right where the user just clicked (a toast can be scrolled out of view in short hosts).
          /* @__PURE__ */ e("div", { class: `ticket-msg ${E.kind}`, role: "status", children: [
            E.kind === "ok" ? "✓ " : "",
            E.text
          ] }),
          Ne && !Ne.complete && /* @__PURE__ */ e("div", { class: "warn", children: [
            /* @__PURE__ */ e("b", { children: "Thin book:" }),
            " only ",
            Hn(Number(me(Ne.filled, hn || 1e-8, "floor"))),
            " of ",
            Hn(Ie),
            " ",
            nt,
            " can fill",
            Ne.beyondBand ? ` within Strike's ${(Ar * 100).toFixed(0)}% price band around the mark` : " from the visible book",
            "; the rest may not fill."
          ] }),
          Wi && /* @__PURE__ */ e("div", { class: "warn", children: [
            /* @__PURE__ */ e("b", { children: "Order book unavailable:" }),
            " slippage can't be estimated right now. Click again to send anyway, or wait a moment."
          ] }),
          Ne && Ne.complete && Ne.slippage > qa && /* @__PURE__ */ e("div", { class: "warn", children: [
            /* @__PURE__ */ e("b", { children: "Slippage:" }),
            " this size moves through the book, est. ",
            (Ne.slippage * 100).toFixed(2),
            "% from the mark price (avg ≈ ",
            $e(Ne.avgPrice, vt),
            ").",
            Us ? " Click again to confirm." : ""
          ] }),
          kt && kt.liquidationDistance < 0.1 && !ke && /* @__PURE__ */ e("div", { class: "warn", children: [
            /* @__PURE__ */ e("b", { children: "High risk:" }),
            " the estimated liquidation price is only ",
            (kt.liquidationDistance * 100).toFixed(1),
            "% away. Consider lower leverage."
          ] }),
          /* @__PURE__ */ e("div", { class: "details", children: [
            /* @__PURE__ */ e(
              Fe,
              {
                k: F === "market" && Ne ? "Est. Fill Price" : F === "stop" ? "Trigger" : "Est. Entry",
                hint: ll[F],
                v: /* @__PURE__ */ e("span", { class: "num", children: Ne ? $e(Ne.avgPrice, vt) : Ue ? $e(Ue, vt) : "—" })
              }
            ),
            Ne && /* @__PURE__ */ e(Fe, { k: "Est. Slippage", hint: "Average fill vs the mark price, from the live book", v: /* @__PURE__ */ e("span", { class: `num ${Ne.slippage > qa ? "neg" : ""}`, children: [
              (Ne.slippage * 100).toFixed(2),
              "%"
            ] }) }),
            F === "twap" && /* @__PURE__ */ e(Fe, { k: "Duration", v: /* @__PURE__ */ e("span", { class: "num", children: Yt >= yi && Yt <= wi ? Gr(Yt / 60) : "—" }) }),
            /* @__PURE__ */ e(
              Fe,
              {
                k: "Liq. price (worst case)",
                info: pi === "isolated" ? "If the price reaches this, the position is closed and you lose its margin. Estimated for this position alone, backed by size ÷ leverage of margin; fees and funding move it slightly. The position card shows Strike's actual price once it's open." : "If the price reaches this, the position is closed and you lose its margin. Worst case: it assumes this position alone, backed only by size ÷ leverage. In cross margin your whole balance backs it, so Strike's actual price (shown on the position card) is usually further away.",
                v: /* @__PURE__ */ e("span", { class: "num", children: kt && !ke ? $e(kt.liquidationPrice, vt) : "—" })
              }
            ),
            /* @__PURE__ */ e(Fe, { k: "Margin", info: "The part of your balance set aside for this position: size ÷ leverage.", v: /* @__PURE__ */ e("span", { class: "num", children: kt ? be(kt.margin) : "—" }) }),
            /* @__PURE__ */ e(Fe, { k: "Order Size", v: /* @__PURE__ */ e("span", { class: "num", children: Ie ? `${Hn(Ie)} ${nt}` : "—" }) }),
            /* @__PURE__ */ e(
              Fe,
              {
                k: "Fees",
                info: `Paid when the order fills: Strike's taker fee ${(u * 100).toFixed(3)}% + builder fee ${(Ui / 100).toFixed(2)}% (${t.builderCode}), on the order's size.`,
                v: /* @__PURE__ */ e("span", { class: "num", children: kt ? be(kt.totalFee, { decimals: kt.totalFee < 0.1 ? 4 : 2 }) : "—" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ e("div", { class: "lower", children: [
          /* @__PURE__ */ e("div", { class: "tabs", role: "tablist", "aria-label": "Account panels", children: cl.map(([b, j]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": Ct === b, class: `tab${Ct === b ? " on" : ""}`, onClick: () => _n(b), children: j }, b)) }),
          /* @__PURE__ */ e("div", { class: "list", role: "tabpanel", children: [
            Ct === "positions" && ($ ? /* @__PURE__ */ e(
              od,
              {
                positions: q,
                marks: Os,
                ticks: $r,
                busy: Et,
                flash: Di,
                note: Jo,
                confirming: Lt?.startsWith("close:") ? Number(Lt.slice(6)) : null,
                onAsk: (b) => ht(b ? `close:${b.id}` : null),
                onClose: Qo,
                closeText: (b) => zl({ size: Number(b.size), base: b.symbol.split("-")[0], mark: Os[b.symbol] ?? Number(b.entry_price), upnl: Number(b.upnl) })
              }
            ) : ui("positions")),
            Ct === "orders" && ($ ? /* @__PURE__ */ e(U, { children: [
              z.length > 0 && /* @__PURE__ */ e("div", { class: "list-h", children: [
                /* @__PURE__ */ e("span", { class: "muted", children: [
                  z.length,
                  " open"
                ] }),
                /* @__PURE__ */ e("button", { class: "mini", disabled: Et.has("cancelall"), onClick: () => ht(Lt === "cancelall" ? null : "cancelall"), "aria-expanded": Lt === "cancelall", children: Et.has("cancelall") ? /* @__PURE__ */ e(Ot, {}) : "Cancel all" })
              ] }),
              Lt === "cancelall" && z.length > 0 && /* @__PURE__ */ e(
                tr,
                {
                  actions: /* @__PURE__ */ e(U, { children: [
                    /* @__PURE__ */ e("button", { class: "mini", onClick: () => ht(null), children: "Keep" }),
                    hi > 0 && hi < z.length && /* @__PURE__ */ e("button", { class: "mini go", onClick: () => Ys(s), children: [
                      s,
                      " (",
                      hi,
                      ")"
                    ] }),
                    /* @__PURE__ */ e("button", { class: "mini danger", onClick: () => Ys(hi === z.length ? s : void 0), children: hi === z.length ? `Cancel ${z.length}` : `All markets (${z.length})` })
                  ] }),
                  children: "Cancel open orders? Positions stay open; TWAPs are cancelled separately."
                }
              ),
              /* @__PURE__ */ e(cd, { orders: z, ticks: $r, busy: Et, onCancel: el })
            ] }) : ui("open orders")),
            Ct === "twap" && ($ ? /* @__PURE__ */ e(md, { twaps: R, busy: Et, onCancel: tl }) : ui("TWAP orders")),
            Ct === "history" && ($ ? /* @__PURE__ */ e(fd, { client: n, ticks: $r }, $.accountId) : ui("trade history")),
            Ct === "account" && /* @__PURE__ */ e(U, { children: [
              $ ? /* @__PURE__ */ e(U, { children: [
                /* @__PURE__ */ e(wd, { client: n, account: C }, $.accountId),
                /* @__PURE__ */ e("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "4px" }, children: [
                  /* @__PURE__ */ e("button", { class: "cta", style: { minHeight: "34px", fontSize: "13px" }, onClick: Pr, children: "Deposit ADA" }),
                  /* @__PURE__ */ e("button", { class: "cta ghost", style: { minHeight: "34px", fontSize: "13px" }, disabled: Vt < jt, onClick: () => Ks("withdraw"), children: "Withdraw" })
                ] }),
                C && Vt < jt && /* @__PURE__ */ e("div", { class: "helper", style: { textAlign: "right" }, children: [
                  "Minimum ",
                  be(jt, { decimals: 0 }),
                  " to withdraw"
                ] }),
                wr && n.referralLink() && /* @__PURE__ */ e("div", { class: "note", children: [
                  "Save on Strike's trading fees: apply referral code ",
                  /* @__PURE__ */ e("b", { children: t.referralCode }),
                  ".",
                  " ",
                  /* @__PURE__ */ e("a", { class: "linkbtn", href: n.referralLink(), target: "_blank", rel: "noopener", children: "Apply on Strike ↗" })
                ] }),
                /* @__PURE__ */ e("a", { class: "linkbtn", style: { fontSize: "12px", justifySelf: "end" }, href: n.appUrl("/portfolio"), target: "_blank", rel: "noopener", children: "Full account on Strike ↗" })
              ] }) : ui("balance and account metrics"),
              /* @__PURE__ */ e(_d, { client: n })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ e("div", { class: "foot", children: [
          /* @__PURE__ */ e("span", { class: "acct", children: [
            /* @__PURE__ */ e("span", { class: `dot${n.net.network === "testnet" ? " test" : ""}` }),
            n.net.network === "testnet" ? "Testnet" : "Mainnet"
          ] }),
          $ && /* @__PURE__ */ e("span", { class: "acct", children: [
            "· ",
            /* @__PURE__ */ e("span", { class: "num", title: $.address, children: en($.address, 9, 4) }),
            /* @__PURE__ */ e("button", { class: "linkbtn", onClick: () => (n.disconnect(), fe("ok", "Disconnected")), children: "Disconnect" })
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
          /* @__PURE__ */ e("button", { class: "x", onClick: () => Sn(null), "aria-label": "Dismiss", children: "×" })
        ] }),
        Ge === "connect" && /* @__PURE__ */ e(
          Do,
          {
            client: n,
            onClose: () => Xe(null),
            onConnected: () => {
              n.wallet && Td(Ba, n.wallet.id), Xe(null), fe("ok", "Wallet connected. Your trades run on Strike.");
            }
          }
        ),
        Ge === "deposit" && /* @__PURE__ */ e(
          sd,
          {
            client: n,
            adaPrice: o["ADA-USD"]?.mark ?? 0,
            isNewAccount: Zo,
            startBalance: Number(C?.wallet_balance ?? 0),
            onClose: () => Xe(null),
            onCredited: () => (tt(), fe("ok", "Deposit credited"))
          }
        ),
        Ge === "withdraw" && /* @__PURE__ */ e(
          ad,
          {
            client: n,
            available: Vt,
            adaPrice: o["ADA-USD"]?.mark ?? 0,
            startBalance: Number(C?.wallet_balance ?? 0),
            onClose: () => Xe(null),
            onDone: () => (tt(), fe("ok", "Withdrawal processed"))
          }
        )
      ]
    }
  );
}
const Ad = /* @__PURE__ */ new Set(["ADA", "BNB", "BTC", "ETH", "HYPE", "NEAR", "NIGHT", "PUMP", "SOL", "XRP", "ZEC", "DOGE", "SUI", "AVAX", "LINK", "LTC", "TRX", "SNEK"]), Pd = /* @__PURE__ */ new Set(["BTC", "ETH", "SOL", "BNB", "XRP"]), Ld = /* @__PURE__ */ new Set(["ADA", "NIGHT", "SNEK"]), Ed = /* @__PURE__ */ new Set(["XAU", "XAG", "WTI", "BRENT", "NATGAS", "COPPER"]), Id = /* @__PURE__ */ new Set(["NAS100", "SP500", "US30", "DJI", "SPX", "NDX"]);
function jn(t) {
  const n = t.toUpperCase();
  return Ad.has(n) ? "crypto" : Ed.has(n) ? "commodity" : Id.has(n) ? "index" : "stock";
}
const Fd = 864e5, Tn = [
  { id: "blue", label: "Blue Chips", icon: "bulb", test: (t) => Pd.has(t) },
  { id: "cardano", label: "Cardano", icon: "ada", test: (t) => Ld.has(t) },
  // Strike's equity perps include listed stocks, an ETF and private companies (e.g. SpaceX), hence not "Stocks".
  { id: "stocks", label: "Equities", icon: "building", test: (t) => jn(t) === "stock" },
  { id: "indices", label: "Indices", icon: "chart", test: (t) => jn(t) === "index" },
  { id: "commodities", label: "Commodities", icon: "cube", test: (t) => jn(t) === "commodity" },
  { id: "crypto", label: "Crypto", icon: "coins", test: (t) => jn(t) === "crypto" },
  { id: "gainers", label: "Gainers", icon: "up", test: (t, n) => n.change > 0, sort: "change" },
  { id: "losers", label: "Losers", icon: "down", test: (t, n) => n.change < 0, sort: "-change" },
  { id: "new", label: "New", icon: "sparkle", test: (t, n) => n.createdAt > 0 && Date.now() - n.createdAt < 60 * Fd, sort: "new" }
];
function Dd(t, n) {
  return (t || "").replace(/\s*\/\s*USD.*$/i, "").trim() || n;
}
const Ua = "https://app.strikefinance.org/images/";
function Od(t) {
  const n = encodeURIComponent(t.toLowerCase());
  return [`${Ua}${n}.webp`, `${Ua}${n}.svg`];
}
const Ha = ["#4efab0", "#7aa2ff", "#f8931a", "#c084fc", "#38bdf8", "#facc15", "#fb7185"];
function Bd(t) {
  return Ha[[...t].reduce((n, i) => n + i.charCodeAt(0), 0) % Ha.length];
}
function In(t) {
  return !Number.isFinite(t) || t <= 0 ? "$0" : "$" + t.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: t >= 1e3 ? 1 : 0 });
}
function K(t, n) {
  if (!Number.isFinite(t) || t <= 0) return "—";
  const i = n ? Math.max(0, Math.min(8, Rd(n))) : t >= 1e3 ? 2 : t >= 1 ? 4 : 5;
  return "$" + t.toLocaleString("en-US", { minimumFractionDigits: i, maximumFractionDigits: i });
}
function Rd(t) {
  const n = t.toString();
  return n.includes("e-") ? Number(n.split("e-")[1]) : (n.split(".")[1] ?? "").length;
}
function ue(t) {
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
function sn(t) {
  return new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function an(t) {
  return new Date(t).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}
function Ss(t) {
  const n = Math.max(0, Math.floor((t - Date.now()) / 1e3)), i = Math.floor(n / 60), r = Math.floor(i / 60);
  return r > 0 ? `${r}h ${String(i % 60).padStart(2, "0")}m` : `${i}m ${String(n % 60).padStart(2, "0")}s`;
}
const ce = { fill: "none", stroke: "currentColor", "stroke-width": 1.8, "stroke-linecap": "round", "stroke-linejoin": "round" }, qd = {
  x: /* @__PURE__ */ e("path", { ...ce, d: "M6 6l12 12M18 6 6 18" }),
  back: /* @__PURE__ */ e("path", { ...ce, d: "M15 5l-7 7 7 7" }),
  right: /* @__PURE__ */ e("path", { ...ce, d: "M9 5l7 7-7 7" }),
  down: /* @__PURE__ */ e("path", { ...ce, d: "M6 9l6 6 6-6" }),
  up: /* @__PURE__ */ e("path", { ...ce, d: "M6 15l6-6 6 6" }),
  search: /* @__PURE__ */ e(U, { children: [
    /* @__PURE__ */ e("circle", { ...ce, cx: "11", cy: "11", r: "6.5" }),
    /* @__PURE__ */ e("path", { ...ce, d: "M16 16l4 4" })
  ] }),
  clock: /* @__PURE__ */ e(U, { children: [
    /* @__PURE__ */ e("circle", { ...ce, cx: "12", cy: "12", r: "8" }),
    /* @__PURE__ */ e("path", { ...ce, d: "M12 8v4.5l3 2" })
  ] }),
  sliders: /* @__PURE__ */ e("path", { ...ce, d: "M6 4v6m0 4v6M12 4v2m0 4v10M18 4v9m0 4v3M4 12h4M10 8h4M16 15h4" }),
  plus: /* @__PURE__ */ e("path", { ...ce, d: "M12 5v14M5 12h14" }),
  minus: /* @__PURE__ */ e("path", { ...ce, d: "M5 12h14" }),
  check: /* @__PURE__ */ e("path", { ...ce, d: "M5 12.5l4.5 4.5L19 7.5" }),
  info: /* @__PURE__ */ e(U, { children: [
    /* @__PURE__ */ e("circle", { ...ce, cx: "12", cy: "12", r: "8" }),
    /* @__PURE__ */ e("path", { ...ce, d: "M12 11v5" }),
    /* @__PURE__ */ e("circle", { cx: "12", cy: "8", r: "1.1", fill: "currentColor" })
  ] }),
  warn: /* @__PURE__ */ e(U, { children: [
    /* @__PURE__ */ e("path", { ...ce, d: "M12 4 3 20h18L12 4z" }),
    /* @__PURE__ */ e("path", { ...ce, d: "M12 10v4.5" }),
    /* @__PURE__ */ e("circle", { cx: "12", cy: "17.2", r: "1.1", fill: "currentColor" })
  ] }),
  candles: /* @__PURE__ */ e("path", { ...ce, d: "M7 4v3m0 8v5M17 4v5m0 8v3M5 7h4v8H5zM15 9h4v8h-4z" }),
  line: /* @__PURE__ */ e("path", { ...ce, d: "M3 17l5-6 4 4 8-9" }),
  bulb: /* @__PURE__ */ e("path", { ...ce, d: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" }),
  ada: /* @__PURE__ */ e(U, { children: [
    /* @__PURE__ */ e("circle", { ...ce, cx: "12", cy: "12", r: "2.6" }),
    /* @__PURE__ */ e("circle", { cx: "12", cy: "4.5", r: "1.3", fill: "currentColor" }),
    /* @__PURE__ */ e("circle", { cx: "12", cy: "19.5", r: "1.3", fill: "currentColor" }),
    /* @__PURE__ */ e("circle", { cx: "5.5", cy: "8.2", r: "1.3", fill: "currentColor" }),
    /* @__PURE__ */ e("circle", { cx: "18.5", cy: "8.2", r: "1.3", fill: "currentColor" }),
    /* @__PURE__ */ e("circle", { cx: "5.5", cy: "15.8", r: "1.3", fill: "currentColor" }),
    /* @__PURE__ */ e("circle", { cx: "18.5", cy: "15.8", r: "1.3", fill: "currentColor" })
  ] }),
  building: /* @__PURE__ */ e("path", { ...ce, d: "M4 20h16M6 20V9l6-4 6 4v11M10 20v-5h4v5M9 11h.01M15 11h.01" }),
  chart: /* @__PURE__ */ e("path", { ...ce, d: "M4 19h16M5 15l4-4 3 3 6-7" }),
  cube: /* @__PURE__ */ e("path", { ...ce, d: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM4 7.5l8 4.5 8-4.5M12 12v9" }),
  coins: /* @__PURE__ */ e(U, { children: [
    /* @__PURE__ */ e("ellipse", { ...ce, cx: "9", cy: "8", rx: "5", ry: "2.6" }),
    /* @__PURE__ */ e("path", { ...ce, d: "M4 8v4c0 1.4 2.2 2.6 5 2.6M14 8v1.5" }),
    /* @__PURE__ */ e("ellipse", { ...ce, cx: "15", cy: "14", rx: "5", ry: "2.6" }),
    /* @__PURE__ */ e("path", { ...ce, d: "M10 14v3.4c0 1.4 2.2 2.6 5 2.6s5-1.2 5-2.6V14" })
  ] }),
  sparkle: /* @__PURE__ */ e("path", { ...ce, d: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM18.5 16l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" }),
  arrowUp: /* @__PURE__ */ e("path", { ...ce, d: "M12 19V5m0 0-6 6m6-6 6 6" }),
  arrowDown: /* @__PURE__ */ e("path", { ...ce, d: "M12 5v14m0 0-6-6m6 6 6-6" }),
  chat: /* @__PURE__ */ e("path", { ...ce, d: "M5 5h14v10H9l-4 4V5z" }),
  book: /* @__PURE__ */ e("path", { ...ce, d: "M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4V4zM5 16a4 4 0 0 1 4-4h10" }),
  shield: /* @__PURE__ */ e("path", { ...ce, d: "M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" }),
  wallet: /* @__PURE__ */ e("path", { ...ce, d: "M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1V7zm0 0 11-3v3M16 13.5h.01" }),
  swap: /* @__PURE__ */ e("path", { ...ce, d: "M5 8h13l-3-3M19 16H6l3 3" }),
  close: /* @__PURE__ */ e("path", { ...ce, d: "M6 6l12 12M18 6 6 18" }),
  more: /* @__PURE__ */ e(U, { children: [
    /* @__PURE__ */ e("circle", { cx: "6", cy: "12", r: "1.5", fill: "currentColor" }),
    /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "1.5", fill: "currentColor" }),
    /* @__PURE__ */ e("circle", { cx: "18", cy: "12", r: "1.5", fill: "currentColor" })
  ] }),
  bolt: /* @__PURE__ */ e("path", { ...ce, d: "M13 3 5 14h6l-1 7 8-11h-6l1-7z" }),
  star: /* @__PURE__ */ e("path", { ...ce, d: "m12 3.5 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8L12 3.5z" }),
  ext: /* @__PURE__ */ e("path", { ...ce, d: "M14 5h5v5M19 5l-8 8M17 14v5H5V7h5" })
};
function Y({ n: t, size: n = 20, cls: i }) {
  return /* @__PURE__ */ e("svg", { class: i, width: n, height: n, viewBox: "0 0 24 24", "aria-hidden": "true", children: qd[t] ?? null });
}
function _t({ base: t, size: n = 40, rank: i }) {
  const r = Od(t), [s, a] = g(0);
  return Z(() => a(0), [t]), /* @__PURE__ */ e("span", { class: "pa-coin", style: { width: `${n}px`, height: `${n}px` }, children: [
    s < r.length ? /* @__PURE__ */ e("img", { src: r[s], alt: "", width: n, height: n, loading: "lazy", decoding: "async", referrerpolicy: "no-referrer", onError: () => a(s + 1) }) : /* @__PURE__ */ e("span", { class: "pa-mono", style: { background: Bd(t), fontSize: `${Math.round(n * 0.34)}px` }, children: t.slice(0, t.length > 4 ? 2 : 3) }),
    i ? /* @__PURE__ */ e("span", { class: `pa-rank r${i}`, children: i }) : null
  ] });
}
function rt({ n: t, label: n, onClick: i, cls: r }) {
  return /* @__PURE__ */ e("button", { class: `pa-round ${r ?? ""}`, "aria-label": n, title: n, onClick: i, children: /* @__PURE__ */ e(Y, { n: t, size: 20 }) });
}
function Qe({ size: t = 16 }) {
  return /* @__PURE__ */ e("span", { class: "pa-spin", style: { width: `${t}px`, height: `${t}px` }, "aria-label": "Loading" });
}
function Be({
  title: t,
  onClose: n,
  onBack: i,
  onDone: r,
  doneDisabled: s,
  children: a,
  tall: o
}) {
  const c = Oe(null);
  return Z(() => {
    c.current?.focus();
  }, []), /* @__PURE__ */ e("div", { class: "pa-scrim", onClick: (d) => d.target === d.currentTarget && n(), children: /* @__PURE__ */ e("div", { class: `pa-sheet${o ? " tall" : ""}`, role: "dialog", "aria-modal": "true", "aria-label": t, tabIndex: -1, ref: c, onKeyDown: (d) => d.key === "Escape" && (d.stopPropagation(), n()), children: [
    /* @__PURE__ */ e("div", { class: "pa-sheet-h", children: [
      i ? /* @__PURE__ */ e(rt, { n: "back", label: "Back", onClick: i }) : /* @__PURE__ */ e(rt, { n: "x", label: "Close", onClick: n }),
      /* @__PURE__ */ e("div", { class: "t", children: t }),
      r ? /* @__PURE__ */ e("button", { class: "pa-round done", "aria-label": "Apply", disabled: s, onClick: r, children: /* @__PURE__ */ e(Y, { n: "check", size: 20 }) }) : /* @__PURE__ */ e("span", { class: "pa-round ghost" })
    ] }),
    /* @__PURE__ */ e("div", { class: "pa-sheet-b", children: a })
  ] }) });
}
function Ae({ children: t, cls: n }) {
  return /* @__PURE__ */ e("div", { class: `pa-group ${n ?? ""}`, children: t });
}
function ne({
  k: t,
  sub: n,
  v: i,
  vsub: r,
  vcls: s,
  onClick: a,
  chevron: o,
  info: c
}) {
  const d = /* @__PURE__ */ e(U, { children: [
    /* @__PURE__ */ e("span", { class: "l", children: [
      /* @__PURE__ */ e("span", { class: "k", children: [
        t,
        c && /* @__PURE__ */ e(
          "span",
          {
            class: "pa-i",
            role: "button",
            tabIndex: 0,
            "aria-label": "More info",
            onClick: (p) => (p.stopPropagation(), c()),
            onKeyDown: (p) => (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.stopPropagation(), c()),
            children: /* @__PURE__ */ e(Y, { n: "info", size: 15 })
          }
        )
      ] }),
      n !== void 0 && /* @__PURE__ */ e("span", { class: "s", children: n })
    ] }),
    /* @__PURE__ */ e("span", { class: `r ${s ?? ""}`, children: [
      i !== void 0 && /* @__PURE__ */ e("span", { class: "v", children: i }),
      r !== void 0 && /* @__PURE__ */ e("span", { class: "vs", children: r })
    ] }),
    o && /* @__PURE__ */ e(Y, { n: o, size: 18, cls: "chev" })
  ] });
  return a ? /* @__PURE__ */ e("button", { class: "pa-row", onClick: a, children: d }) : /* @__PURE__ */ e("div", { class: "pa-row", children: d });
}
function Ud({ onKey: t }) {
  return Z(() => {
    const i = (r) => {
      (r.composedPath?.()[0] ?? r.target)?.closest?.("input, textarea, select, [contenteditable]") || r.ctrlKey || r.metaKey || r.altKey || (/^[0-9]$/.test(r.key) || r.key === "." || r.key === "," ? t(r.key === "," ? "." : r.key) : r.key === "Backspace" && t("del"));
    };
    return window.addEventListener("keydown", i, !0), () => window.removeEventListener("keydown", i, !0);
  }, [t]), /* @__PURE__ */ e("div", { class: "pa-keypad", children: ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "del"].map((i) => /* @__PURE__ */ e("button", { "aria-label": i === "del" ? "Delete" : i, onClick: () => t(i), children: i === "del" ? /* @__PURE__ */ e(Y, { n: "back", size: 22 }) : i }, i)) });
}
function Hd(t, n, i = 2) {
  if (n === "del") return t.slice(0, -1);
  if (n === ".") return t.includes(".") || i === 0 ? t : (t || "0") + ".";
  const r = t.indexOf(".");
  return r >= 0 && t.length - r - 1 >= i || t.replace(".", "").length >= 12 ? t : t === "0" ? n : t + n;
}
function Wd({ toast: t, onDismiss: n }) {
  return t ? /* @__PURE__ */ e("div", { class: `pa-banner ${t.kind}`, role: t.kind === "err" ? "alert" : "status", children: [
    /* @__PURE__ */ e("span", { class: "ic", children: t.kind === "progress" ? /* @__PURE__ */ e(Qe, { size: 18 }) : t.kind === "ok" ? /* @__PURE__ */ e(Y, { n: "check", size: 16 }) : t.kind === "info" ? /* @__PURE__ */ e(Y, { n: "info", size: 15 }) : /* @__PURE__ */ e(Y, { n: "warn", size: 15 }) }),
    /* @__PURE__ */ e("span", { class: "tx", children: [
      /* @__PURE__ */ e("b", { children: t.title }),
      t.text && /* @__PURE__ */ e("span", { children: t.text }),
      (t.kind === "err" || t.kind === "info") && /* @__PURE__ */ e("button", { class: "ok", onClick: n, children: "OK" })
    ] }),
    t.kind === "ok" && /* @__PURE__ */ e("button", { class: "x", "aria-label": "Dismiss", onClick: n, children: /* @__PURE__ */ e(Y, { n: "x", size: 14 }) })
  ] }) : null;
}
function Pi({ min: t, max: n, value: i, onChange: r, label: s, marks: a, disabled: o }) {
  const c = Math.max(1e-9, n - t), d = Math.max(0, Math.min(100, (i - t) / c * 100));
  return /* @__PURE__ */ e("div", { class: `pa-slider${o ? " off" : ""}`, children: [
    /* @__PURE__ */ e("div", { class: "track" }),
    /* @__PURE__ */ e("div", { class: "fill", style: { width: `${d}%` } }),
    a?.map((p) => /* @__PURE__ */ e("span", { class: `mk${i >= p ? " on" : ""}`, style: { left: `${(p - t) / c * 100}%` } }, p)),
    /* @__PURE__ */ e("span", { class: "knob", style: { left: `${d}%` } }),
    /* @__PURE__ */ e("input", { type: "range", min: t, max: n, step: 1, value: i, "aria-label": s, disabled: o, onInput: (p) => r(Number(p.target.value)) })
  ] });
}
function dn(t, n) {
  try {
    if (n === void 0) return localStorage.getItem(`strike-everywhere:ui:${t}`);
    localStorage.setItem(`strike-everywhere:ui:${t}`, n);
  } catch {
  }
  return n ?? null;
}
function Bo({ steps: t }) {
  return /* @__PURE__ */ e("div", { class: "pa-steps", children: t.map((n, i) => /* @__PURE__ */ e("div", { class: `pa-step ${n.state}`, children: [
    /* @__PURE__ */ e("span", { class: "pa-sdot", children: n.state === "done" ? /* @__PURE__ */ e(Y, { n: "check", size: 14 }) : n.state === "active" ? /* @__PURE__ */ e(Qe, { size: 14 }) : n.state === "error" ? /* @__PURE__ */ e(Y, { n: "x", size: 12 }) : i + 1 }),
    /* @__PURE__ */ e("span", { class: "tx", children: [
      /* @__PURE__ */ e("b", { children: n.label }),
      n.sub && /* @__PURE__ */ e("span", { children: n.sub })
    ] })
  ] }, i)) });
}
function Ro({ client: t, lines: n }) {
  const i = tn(() => Ii.wallets().find((s) => s.id === t.wallet?.id), [t.wallet?.id]), r = i?.name ?? t.wallet?.name ?? "your wallet";
  return /* @__PURE__ */ e("div", { class: "pa-wait", role: "status", children: [
    /* @__PURE__ */ e("span", { class: "ring", children: i?.icon ? /* @__PURE__ */ e("img", { src: i.icon, alt: "" }) : /* @__PURE__ */ e(Y, { n: "wallet", size: 26 }) }),
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
function jd({ children: t }) {
  return /* @__PURE__ */ e("div", { class: "pa-safe", children: [
    /* @__PURE__ */ e(Y, { n: "shield", size: 18 }),
    /* @__PURE__ */ e("span", { children: t })
  ] });
}
function qo({ value: t, onInput: n, unit: i, label: r, sub: s }) {
  return /* @__PURE__ */ e("label", { class: "pa-bigin", children: [
    /* @__PURE__ */ e("span", { class: "pa-bigrow", children: [
      i === "$" && /* @__PURE__ */ e("span", { class: "u", children: "$" }),
      /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: "0", value: t, "aria-label": r, onInput: (a) => n(Ce(a)), autoFocus: !0, style: { width: `${Math.max(1, t.length) * 0.62 + 0.3}em` } }),
      i !== "$" && /* @__PURE__ */ e("span", { class: "u", children: i })
    ] }),
    s && /* @__PURE__ */ e("span", { class: "sub", children: s })
  ] });
}
const Gd = (t) => t.net.network === "mainnet" ? "https://cardanoscan.io/transaction/" : "https://preprod.cardanoscan.io/transaction/";
function Vd({ client: t, adaPrice: n, isNewAccount: i, startBalance: r, onClose: s, onCredited: a }) {
  const o = i ? Wt : 5, c = (M) => n > 0 ? String(Math.ceil(M / n / 5) * 5) : "", [d, p] = g(() => c(i ? Wt * 1.05 : 25)), [u, l] = g("amount"), [h, m] = g(null), [f, k] = g(""), [y, _] = g(""), [w, T] = g(null), [$, v] = g(!1), C = (Number(d) || 0) * n;
  Z(() => {
    t.wallet?.balanceLovelace().then((M) => T(Number(M) / 1e6)).catch(() => {
    });
  }, [t.wallet?.id]);
  const S = async () => {
    _(""), l("preparing");
    try {
      if (!t.wallet) throw new Error("Reconnect your wallet to add funds.");
      m(await t.prepareDeposit(Number(d))), l("review");
    } catch (M) {
      _(M instanceof gt ? `Safety check failed: ${M.message}` : M?.message || String(M)), l("amount");
    }
  }, q = async () => {
    if (h) {
      _(""), l("signing");
      try {
        const { txHash: M } = await t.confirmDeposit(h);
        k(M), l("crediting");
      } catch (M) {
        if (M instanceof br) {
          k(M.txHash), _(M.message), l("registering");
          return;
        }
        _(M instanceof gt ? `Safety check failed: ${String(M?.message)}` : Jn(M)), l("review");
      }
    }
  }, x = async () => {
    if (!(!h || !f)) {
      _("");
      try {
        await t.retryDepositRegistration(h.requestId, f), l("crediting");
      } catch (M) {
        _(M?.message || String(M));
      }
    }
  };
  Z(() => {
    if (u !== "crediting") return;
    const M = setTimeout(() => v(!0), 15 * 6e4), I = setInterval(async () => {
      try {
        const F = await t.account.account();
        Number(F.wallet_balance) > r + Math.max(0.5, (h?.usdValue ?? 0) * 0.5) && (l("done"), a());
      } catch {
      }
    }, 8e3);
    return () => (clearInterval(I), clearTimeout(M));
  }, [u]);
  const z = u === "signing" || u === "registering", N = [25, 50, 100, 250].filter((M) => M >= o || M === 100), R = w !== null ? Nc(w) : null, oe = R !== null && Number(d) > R;
  return /* @__PURE__ */ e(Be, { title: "Add funds", onClose: () => !z && s(), tall: !0, children: [
    (u === "amount" || u === "preparing") && /* @__PURE__ */ e(U, { children: [
      /* @__PURE__ */ e(qo, { value: d, onInput: p, unit: "ADA", label: "Amount of ADA to add", sub: /* @__PURE__ */ e("span", { class: "num", children: [
        "≈ ",
        H(C),
        w !== null ? ` · ${w.toLocaleString("en-US", { maximumFractionDigits: 2 })} ADA in your wallet` : ""
      ] }) }),
      /* @__PURE__ */ e("div", { class: "pa-pcts four", children: N.map((M) => /* @__PURE__ */ e("button", { class: "pa-btn dark", onClick: () => p(c(M)), children: [
        "$",
        M
      ] }, M)) }),
      /* @__PURE__ */ e("p", { class: "pa-p sm", children: [
        "Your ADA goes to Strike and is credited as USD margin.",
        " ",
        i ? `Strike asks new accounts for a first deposit of at least $${Wt}; after that, from $5.` : "Minimum $5."
      ] }),
      y && /* @__PURE__ */ e("div", { class: "pa-warn", children: [
        /* @__PURE__ */ e(Y, { n: "warn", size: 16 }),
        y
      ] }),
      R !== null && n > 0 && R * n < o && /* @__PURE__ */ e("p", { class: "pa-p sm", children: [
        "Your wallet needs about ",
        Math.ceil(o / n + Po),
        " ADA to add the ",
        H(o, { decimals: 0 }),
        " minimum (the amount plus Strike's 2 ADA forwarding, the fee and change). It holds ",
        w?.toLocaleString("en-US", { maximumFractionDigits: 2 }),
        " ADA."
      ] }),
      oe && w !== null && Number(d) <= w && /* @__PURE__ */ e("p", { class: "pa-p sm", children: [
        "You can add up to ",
        R,
        " ADA: the rest of your wallet covers Strike's 2 ADA forwarding, the network fee and the change that stays with you."
      ] }),
      /* @__PURE__ */ e("button", { class: "pa-btn primary big", disabled: !(C >= o) || u === "preparing" || oe, onClick: S, children: u === "preparing" ? /* @__PURE__ */ e(U, { children: [
        /* @__PURE__ */ e(Qe, { size: 16 }),
        " Building transaction…"
      ] }) : w !== null && Number(d) > w ? "More than your wallet holds" : oe ? `Up to ${R} ADA after fees` : C >= o ? "Review" : `Minimum ${H(o, { decimals: 0 })}` })
    ] }),
    h && u !== "amount" && u !== "preparing" && /* @__PURE__ */ e(U, { children: [
      u === "review" && /* @__PURE__ */ e(U, { children: [
        /* @__PURE__ */ e("div", { class: "pa-amount-sum", children: [
          /* @__PURE__ */ e("b", { class: "num", children: [
            Ke(h.lovelace).toLocaleString("en-US"),
            " ADA"
          ] }),
          /* @__PURE__ */ e("span", { class: "num", children: [
            "Strike quotes ≈ ",
            H(h.usdValue),
            " · Strike sets the final credit"
          ] })
        ] }),
        /* @__PURE__ */ e(Ae, { children: [
          /* @__PURE__ */ e(ne, { k: "To", v: /* @__PURE__ */ e("span", { class: "num", children: [
            "Strike · ",
            en(h.destination.address, 8, 6)
          ] }) }),
          h.forwardingCost > 0n && /* @__PURE__ */ e(ne, { k: "Strike forwarding", sub: "Strike's deposit hop to its vault", v: /* @__PURE__ */ e("span", { class: "num", children: [
            Ke(h.forwardingCost).toFixed(2),
            " ADA"
          ] }) }),
          /* @__PURE__ */ e(ne, { k: "Network fee", v: /* @__PURE__ */ e("span", { class: "num", children: [
            Ke(h.networkFee).toFixed(3),
            " ADA"
          ] }) }),
          /* @__PURE__ */ e(ne, { k: "Cardano confirmations", v: String(h.confirmationsRequired) })
        ] }),
        /* @__PURE__ */ e(jd, { children: [
          /* @__PURE__ */ e("b", { children: "Checked before you sign:" }),
          " exactly ",
          Ke(h.destination.lovelace),
          " ADA leaves your wallet in one output",
          h.forwardingCost > 0n ? ` (${Ke(h.lovelace)} to deposit plus ${Ke(h.forwardingCost)} for Strike's forwarding)` : "",
          ", no tokens move, your change comes back to you, and the deposit is tagged for your Strike account."
        ] }),
        y && /* @__PURE__ */ e("div", { class: "pa-warn", children: [
          /* @__PURE__ */ e(Y, { n: "warn", size: 16 }),
          y
        ] }),
        /* @__PURE__ */ e("button", { class: "pa-btn primary big", onClick: q, children: "Confirm in wallet" }),
        /* @__PURE__ */ e("button", { class: "pa-foot-link c", onClick: () => (m(null), l("amount")), children: "Change amount" })
      ] }),
      u === "signing" && /* @__PURE__ */ e(Ro, { client: t, lines: ["Sign the deposit transaction"] }),
      (u === "registering" || u === "crediting" || u === "done") && /* @__PURE__ */ e(U, { children: [
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
          Bo,
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
                sub: f ? /* @__PURE__ */ e("a", { href: Gd(t) + f, target: "_blank", rel: "noopener", children: "View transaction ↗" }) : void 0,
                state: u === "crediting" ? "active" : u === "done" ? "done" : "todo"
              },
              { label: "Credited to your Perps balance", state: u === "done" ? "done" : "todo" }
            ]
          }
        ),
        u === "registering" && /* @__PURE__ */ e(U, { children: [
          y && /* @__PURE__ */ e("div", { class: "pa-warn", children: [
            /* @__PURE__ */ e(Y, { n: "warn", size: 16 }),
            y
          ] }),
          /* @__PURE__ */ e("button", { class: "pa-btn primary big", onClick: x, children: "Retry registering with Strike" })
        ] }),
        u === "crediting" && !$ && /* @__PURE__ */ e("p", { class: "pa-p sm c", children: "This usually takes a few minutes. You can close this; your balance updates on its own." }),
        u === "crediting" && $ && /* @__PURE__ */ e("div", { class: "pa-warn", children: [
          /* @__PURE__ */ e(Y, { n: "warn", size: 16 }),
          "Strike hasn't credited this deposit yet. Your ADA is on-chain; crediting is handled by Strike. If it doesn't show up soon, contact Strike support with the transaction above."
        ] }),
        u === "done" ? /* @__PURE__ */ e("button", { class: "pa-btn primary big", onClick: s, children: "Start trading" }) : u === "crediting" && /* @__PURE__ */ e("button", { class: "pa-btn dark big", onClick: s, children: "Close" })
      ] })
    ] })
  ] });
}
function Yd({ client: t, available: n, adaPrice: i, startBalance: r, onClose: s, onDone: a }) {
  const [o, c] = g(""), [d, p] = g("amount"), [u, l] = g(null), [h, m] = g(""), [f, k] = g(!1), [y, _] = g({ maxUsd: null, minUsd: null });
  Z(() => {
    t.withdrawLimits().then(_).catch(() => {
    });
  }, [t]);
  const w = Number(o) || 0, T = Math.floor((y.maxUsd !== null ? Math.min(y.maxUsd, n) : n) * 100) / 100, $ = Math.max(jt, y.minUsd ?? 0), v = i > 0 ? Math.max(0, w - 1) / i : 0, C = async () => {
    m(""), p("quoting");
    try {
      if (!t.wallet) throw new Error("Reconnect your wallet to withdraw.");
      l(await t.prepareWithdrawal(w)), p("review");
    } catch (x) {
      m(x instanceof Nt ? `Safety check failed: ${x.message}` : x?.message || String(x)), p("amount");
    }
  }, S = async () => {
    if (u) {
      m(""), p("signing");
      try {
        await t.confirmWithdrawal(u), p("pending");
      } catch (x) {
        m(x instanceof Nt ? `Safety check failed: ${x.message}` : Jn(x)), p("review");
      }
    }
  };
  Z(() => {
    if (d !== "pending") return;
    const x = setInterval(async () => {
      try {
        const z = await t.account.account();
        Number(z.wallet_balance) < r - w * 0.5 && (p("done"), a());
      } catch {
      }
    }, 6e3);
    return () => clearInterval(x);
  }, [d]);
  const q = u ? u.asset === "USDM" ? `≈ ${H(Math.max(0, u.usdValue - u.fee))} in USDM` : `≈ ${v.toFixed(2)} ADA` : `≈ ${v.toFixed(2)} ADA`;
  return /* @__PURE__ */ e(Be, { title: "Withdraw", onClose: () => d !== "signing" && s(), tall: !0, children: [
    (d === "amount" || d === "quoting") && /* @__PURE__ */ e(U, { children: [
      /* @__PURE__ */ e(qo, { value: o, onInput: c, unit: "$", label: "Amount to withdraw in USD", sub: /* @__PURE__ */ e("span", { class: "num", children: w > 0 ? `You receive ${q}` : `Available ${H(n)}` }) }),
      /* @__PURE__ */ e("div", { class: "pa-pcts four", children: [0.25, 0.5, 0.75, 1].map((x) => /* @__PURE__ */ e("button", { class: "pa-btn dark", disabled: T < $, onClick: () => c(String(Math.floor(T * x * 100) / 100)), children: x === 1 ? "Max" : `${x * 100}%` }, x)) }),
      /* @__PURE__ */ e(Ae, { children: [
        /* @__PURE__ */ e(ne, { k: "Available", v: /* @__PURE__ */ e("span", { class: "num", children: H(n) }) }),
        /* @__PURE__ */ e(ne, { k: "Strike fee", v: /* @__PURE__ */ e("span", { class: "num", children: "$1.00" }) }),
        t.session && /* @__PURE__ */ e(ne, { k: "To your wallet", v: /* @__PURE__ */ e("span", { class: "num", children: en(t.session.address, 8, 6) }) })
      ] }),
      /* @__PURE__ */ e("p", { class: "pa-p sm", children: [
        "Paid out in ADA (or USDM where Strike only supports it) to the wallet you connected. Minimum ",
        H($, { decimals: 0 }),
        "."
      ] }),
      h && /* @__PURE__ */ e("div", { class: "pa-warn", children: [
        /* @__PURE__ */ e(Y, { n: "warn", size: 16 }),
        h
      ] }),
      /* @__PURE__ */ e("button", { class: "pa-btn primary big", disabled: !(w >= $ && w <= T) || d === "quoting", onClick: C, children: d === "quoting" ? /* @__PURE__ */ e(U, { children: [
        /* @__PURE__ */ e(Qe, { size: 16 }),
        " Getting quote…"
      ] }) : w > T ? "More than you can withdraw now" : w >= $ ? "Review" : `Minimum ${H($, { decimals: 0 })}` })
    ] }),
    u && d === "review" && /* @__PURE__ */ e(U, { children: [
      /* @__PURE__ */ e("div", { class: "pa-amount-sum", children: [
        /* @__PURE__ */ e("b", { class: "num", children: q.replace("≈ ", "") }),
        /* @__PURE__ */ e("span", { class: "num", children: [
          "from ",
          H(u.usdValue),
          " on Strike"
        ] })
      ] }),
      /* @__PURE__ */ e(Ae, { children: [
        /* @__PURE__ */ e(ne, { k: "To your wallet", v: /* @__PURE__ */ e("span", { class: "num", children: en(t.session?.address ?? "", 8, 6) }) }),
        /* @__PURE__ */ e(ne, { k: "Strike fee", v: /* @__PURE__ */ e("span", { class: "num", children: H(u.fee) }) }),
        u.funding && /* @__PURE__ */ e(ne, { k: "Funding transaction", sub: "Strike's Cardano payout needs a small deposit to its validator", v: /* @__PURE__ */ e("span", { class: "num", children: [
          Ke(u.funding.lovelace).toFixed(2),
          " ADA"
        ] }), vsub: /* @__PURE__ */ e("span", { class: "num", children: [
          "+",
          Ke(u.funding.networkFee).toFixed(3),
          " ADA fee"
        ] }) })
      ] }),
      /* @__PURE__ */ e("button", { class: "pa-foot-link c", onClick: () => k(!f), children: [
        f ? "Hide" : "View",
        " the message you'll sign"
      ] }),
      f && /* @__PURE__ */ e("pre", { class: "pa-msg", children: u.messageToSign }),
      h && /* @__PURE__ */ e("div", { class: "pa-warn", children: [
        /* @__PURE__ */ e(Y, { n: "warn", size: 16 }),
        h
      ] }),
      /* @__PURE__ */ e("button", { class: "pa-btn primary big", onClick: S, children: "Confirm in wallet" }),
      /* @__PURE__ */ e("button", { class: "pa-foot-link c", onClick: () => (l(null), m(""), p("amount")), children: "Change amount" })
    ] }),
    u && d === "signing" && /* @__PURE__ */ e(Ro, { client: t, lines: u.funding ? ["Sign Strike's withdrawal message", `Approve the ${Ke(u.funding.lovelace).toFixed(2)} ADA funding transaction`] : ["Sign Strike's withdrawal message"] }),
    u && (d === "pending" || d === "done") && /* @__PURE__ */ e(U, { children: [
      /* @__PURE__ */ e("div", { class: "pa-amount-sum", children: [
        /* @__PURE__ */ e("b", { class: "num", children: q.replace("≈ ", "") }),
        /* @__PURE__ */ e("span", { class: "num", children: [
          "to ",
          en(t.session?.address ?? "", 8, 6)
        ] })
      ] }),
      /* @__PURE__ */ e(
        Bo,
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
function Kd(t, n) {
  const i = (n.client.orderFeeBps / 100).toFixed(2), r = (n.takerRate * 100).toFixed(3);
  switch (t) {
    case "basics":
      return {
        title: "How Perps work",
        body: /* @__PURE__ */ e(U, { children: [
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
        body: /* @__PURE__ */ e(U, { children: [
          /* @__PURE__ */ e("p", { children: "Higher leverage means a smaller move wipes out your margin. For a position backed only by its own margin, roughly: at 2x a 50% move against you liquidates it, at 10x about 10%, at 20x about 5%." }),
          /* @__PURE__ */ e("p", { children: "The leverage screen shows that estimate before you open. Strike's actual liquidation price (shown on the position once it's open) is usually further away: Strike uses cross margin by default, where your whole Perps balance backs your positions. That also means a big loss can use all of that balance." }),
          /* @__PURE__ */ e("p", { children: "Each market has its own maximum leverage on Strike, and larger positions get lower limits. Starting out? 2–3x keeps liquidation far away." })
        ] })
      };
    case "funding":
      return {
        title: "Funding",
        body: /* @__PURE__ */ e(U, { children: [
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
        body: /* @__PURE__ */ e(U, { children: [
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
        body: /* @__PURE__ */ e(U, { children: [
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
function $s({ s: t }) {
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
const Wa = [
  ["volume", "Volume"],
  ["change", "24h change"],
  ["price", "Price"],
  ["leverage", "Max leverage"],
  ["name", "Name"]
];
function rs(t, n, i) {
  const r = (s) => n === "volume" ? s.vol24 : n === "price" ? s.mark : n === "change" ? s.change : n === "leverage" ? s.strikeMaxLev : s.base;
  return [...t].sort((s, a) => {
    const o = r(s), c = r(a), d = typeof o == "string" ? o.localeCompare(c) : o - c;
    return i ? -d : d;
  });
}
function Uo(t, n, i) {
  const r = Tn.find((a) => a.id === i), s = n.trim().toLowerCase();
  return t.filter(
    (a) => (!r || r.test(a.base, { change: a.change, createdAt: a.createdAt })) && (!s || a.base.toLowerCase().includes(s) || a.name.toLowerCase().includes(s) || a.symbol.toLowerCase().includes(s))
  );
}
function Xd({ s: t, nav: n, list: i, pick: r, focus: s }) {
  const [a, o] = g(""), [c, d] = g(i), p = Tn.find((v) => v.id === c), [u, l] = g(p?.sort === "change" || p?.sort === "-change" ? "change" : "volume"), [h, m] = g(p?.sort !== "-change"), [f, k] = g(!1), y = Oe(null);
  Z(() => {
    s && setTimeout(() => y.current?.focus(), 50);
  }, []);
  const _ = rs(Uo(t.markets, a, c), u, h), w = rs(t.markets, "volume", !0).map((v) => v.symbol), T = (v) => r ? n.replace({ k: "trade", sym: v.symbol, side: r }) : n.push({ k: "market", sym: v.symbol }), $ = r ? r === "buy" ? "Long which market?" : "Short which market?" : p?.label ?? "Perps";
  return /* @__PURE__ */ e("div", { class: "pa-screen", children: [
    /* @__PURE__ */ e("div", { class: "pa-top", children: [
      /* @__PURE__ */ e(rt, { n: "back", label: "Back", onClick: n.back }),
      /* @__PURE__ */ e("div", { class: "pa-title", children: $ })
    ] }),
    /* @__PURE__ */ e("div", { class: "pa-scroll", children: [
      /* @__PURE__ */ e("label", { class: "pa-search", children: [
        /* @__PURE__ */ e(Y, { n: "search", size: 18 }),
        /* @__PURE__ */ e("input", { ref: y, placeholder: "Search", "aria-label": "Search markets", value: a, onInput: (v) => o(v.target.value) }),
        a && /* @__PURE__ */ e("button", { "aria-label": "Clear", onClick: () => o(""), children: /* @__PURE__ */ e(Y, { n: "x", size: 14 }) })
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-filter", children: [
        /* @__PURE__ */ e("button", { class: "pa-chip sm", onClick: () => k(!0), children: [
          Wa.find((v) => v[0] === u)?.[1],
          " ",
          /* @__PURE__ */ e(Y, { n: "down", size: 14 })
        ] }),
        c && /* @__PURE__ */ e("button", { class: "pa-chip sm on", onClick: () => d(void 0), children: [
          p?.label,
          " ",
          /* @__PURE__ */ e(Y, { n: "x", size: 12 })
        ] }),
        !c && Tn.slice(0, 6).map((v) => /* @__PURE__ */ e("button", { class: "pa-chip sm", onClick: () => d(v.id), children: v.label }, v.id))
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-thead", children: [
        /* @__PURE__ */ e("span", { class: "n", children: "#" }),
        /* @__PURE__ */ e("span", { class: "m", children: "Perps" }),
        /* @__PURE__ */ e("button", { class: "p", onClick: () => m(!h), "aria-label": "Reverse order", children: [
          u === "change" ? "24h" : u === "volume" ? "Volume" : u === "leverage" ? "Leverage" : u === "name" ? "Name" : "Price",
          /* @__PURE__ */ e(Y, { n: h ? "arrowDown" : "arrowUp", size: 13 })
        ] })
      ] }),
      _.map((v) => {
        const C = w.indexOf(v.symbol) + 1;
        return /* @__PURE__ */ e("button", { class: "pa-mrow list", onClick: () => T(v), children: [
          /* @__PURE__ */ e("span", { class: `pa-num${C <= 3 ? ` medal r${C}` : ""}`, children: C }),
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
              In(v.vol24),
              " Vol"
            ] })
          ] }),
          /* @__PURE__ */ e("span", { class: "r num", children: [
            /* @__PURE__ */ e("b", { children: K(v.mark, v.spec.tickSize) }),
            /* @__PURE__ */ e("span", { class: v.change >= 0 ? "pos" : "neg", children: dt(v.change) })
          ] })
        ] }, v.symbol);
      }),
      !_.length && /* @__PURE__ */ e("div", { class: "pa-empty", children: t.markets.length ? "No markets match" : "Loading markets…" }),
      /* @__PURE__ */ e("div", { class: "pa-bottom-pad sm" })
    ] }),
    f && /* @__PURE__ */ e(Be, { title: "Sort by", onClose: () => k(!1), children: /* @__PURE__ */ e("div", { class: "pa-group", children: Wa.map(([v, C]) => /* @__PURE__ */ e("button", { class: "pa-row", onClick: () => (l(v), m(v !== "name"), k(!1)), children: [
      /* @__PURE__ */ e("span", { class: "l", children: /* @__PURE__ */ e("span", { class: "k", children: C }) }),
      u === v && /* @__PURE__ */ e(Y, { n: "check", size: 18, cls: "pa-accent" })
    ] }, v)) }) })
  ] });
}
const ja = 11, bi = (t, n) => {
  const i = n?.toString() ?? "", r = n ? Math.min(8, i.includes("e-") ? Number(i.split("e-")[1]) : (i.split(".")[1] ?? "").length) : t >= 1e3 ? 1 : 4;
  return t.toLocaleString("en-US", { minimumFractionDigits: r, maximumFractionDigits: r });
};
function Zd({ s: t, sym: n, base: i, tick: r, book: s, onPrice: a }) {
  const [o, c] = g("book");
  return /* @__PURE__ */ e("div", { class: "pd-panel pd-book", children: [
    /* @__PURE__ */ e("div", { class: "pd-tabs", children: [
      /* @__PURE__ */ e("button", { class: o === "book" ? "on" : "", onClick: () => c("book"), children: "Order Book" }),
      /* @__PURE__ */ e("button", { class: o === "trades" ? "on" : "", onClick: () => c("trades"), children: "Trades" })
    ] }),
    o === "book" ? /* @__PURE__ */ e(Jd, { book: s, base: i, tick: r, onPrice: a }) : /* @__PURE__ */ e(Qd, { s: t, sym: n, base: i, tick: r })
  ] });
}
function Ga(t, n, i) {
  if (!(n > 0)) return t;
  const r = [];
  for (const [s, a] of t) {
    const o = i === "ask" ? Math.ceil(s / n - 1e-9) * n : Math.floor(s / n + 1e-9) * n, c = r[r.length - 1];
    c && Math.abs(c[0] - o) < n / 2 ? c[1] += a : r.push([o, a]);
  }
  return r;
}
function Jd({ book: t, base: n, tick: i, onPrice: r }) {
  const [s, a] = g(1), [o, c] = g("both"), [d, p] = g(!1);
  if (Z(() => a(1), [n]), t === void 0)
    return /* @__PURE__ */ e("div", { class: "pd-center", children: /* @__PURE__ */ e(Qe, {}) });
  if (t === null) return /* @__PURE__ */ e("div", { class: "pd-center muted", children: "Order book unavailable right now." });
  const u = (N) => Number(((i ?? 0) * N).toPrecision(12)), l = i && i > 0 ? u(s) : 0, h = o === "both" ? ja : ja * 2 + 1, m = Ga(t.asks.map(([N, R]) => [N, R]), l, "ask").slice(0, h), f = Ga(t.bids.map(([N, R]) => [N, R]), l, "bid").slice(0, h), k = ([N, R]) => d ? N * R : R, y = (N) => N.reduce((R, oe) => (R.push((R[R.length - 1] ?? 0) + k(oe)), R), []), _ = y(m), w = y(f), T = Math.max(_[_.length - 1] ?? 0, w[w.length - 1] ?? 0) || 1, $ = Number.isFinite(t.spread) && Number.isFinite(t.mid) && t.mid > 0 ? t.spread / t.mid * 100 : NaN, v = (N) => d ? N >= 1e3 ? `$${Math.round(N).toLocaleString("en-US")}` : `$${N.toFixed(2)}` : ue(N), C = l > 0 ? l : void 0, S = t.bids.reduce((N, [R, oe]) => N + R * oe, 0), q = t.asks.reduce((N, [R, oe]) => N + R * oe, 0), x = S + q > 0 ? S / (S + q) * 100 : 50, z = d ? "USD" : n;
  return /* @__PURE__ */ e("div", { class: "pd-ob", children: [
    /* @__PURE__ */ e("div", { class: "pd-ob-tools", children: [
      /* @__PURE__ */ e("span", { class: "views", role: "radiogroup", "aria-label": "Book sides", children: ["both", "bids", "asks"].map((N) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": o === N, "aria-label": N === "both" ? "Buyers and sellers" : N === "bids" ? "Buyers only" : "Sellers only", title: N === "both" ? "Buyers and sellers" : N === "bids" ? "Buyers only" : "Sellers only", class: `v-${N}${o === N ? " on" : ""}`, onClick: () => c(N), children: [
        /* @__PURE__ */ e("i", {}),
        /* @__PURE__ */ e("i", {})
      ] }, N)) }),
      /* @__PURE__ */ e("span", { class: "sp" }),
      /* @__PURE__ */ e("select", { class: "pd-sel", "aria-label": "Size unit", value: d ? "usd" : "base", onChange: (N) => p(N.target.value === "usd"), children: [
        /* @__PURE__ */ e("option", { value: "base", children: n }),
        /* @__PURE__ */ e("option", { value: "usd", children: "USD" })
      ] }),
      i && i > 0 && /* @__PURE__ */ e("select", { class: "pd-sel", "aria-label": "Price grouping", value: String(s), onChange: (N) => a(Number(N.target.value)), children: [1, 10, 100, 1e3].map((N) => /* @__PURE__ */ e("option", { value: String(N), children: bi(u(N), u(N)) }, N)) })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-ob-h", children: [
      /* @__PURE__ */ e("span", { children: "Price" }),
      /* @__PURE__ */ e("span", { children: [
        "Size (",
        z,
        ")"
      ] }),
      /* @__PURE__ */ e("span", { children: [
        "Total (",
        z,
        ")"
      ] })
    ] }),
    o !== "bids" && /* @__PURE__ */ e("div", { class: "pd-ob-side asks", children: m.length ? m.map((N, R) => ({ lv: N, total: _[R] })).reverse().map(({ lv: N, total: R }) => /* @__PURE__ */ e("button", { class: "lv", onClick: () => r(N[0]), title: "Use this price for a limit order", children: [
      /* @__PURE__ */ e("span", { class: "bar", style: { width: `${R / T * 100}%` } }),
      /* @__PURE__ */ e("span", { class: "p neg", children: bi(N[0], C ?? i) }),
      /* @__PURE__ */ e("span", { children: v(k(N)) }),
      /* @__PURE__ */ e("span", { children: v(R) })
    ] }, N[0])) : /* @__PURE__ */ e("div", { class: "pd-ob-empty", children: "No sellers right now" }) }),
    /* @__PURE__ */ e("div", { class: "pd-spread", children: [
      /* @__PURE__ */ e("span", { children: "Spread" }),
      /* @__PURE__ */ e("span", { class: "num", children: Number.isFinite(t.spread) ? bi(t.spread, i) : "—" }),
      /* @__PURE__ */ e("span", { class: "num", children: Number.isFinite($) ? `${$.toFixed(3)}%` : "" })
    ] }),
    o !== "asks" && /* @__PURE__ */ e("div", { class: "pd-ob-side bids", children: f.length ? f.map((N, R) => /* @__PURE__ */ e("button", { class: "lv", onClick: () => r(N[0]), title: "Use this price for a limit order", children: [
      /* @__PURE__ */ e("span", { class: "bar", style: { width: `${w[R] / T * 100}%` } }),
      /* @__PURE__ */ e("span", { class: "p pos", children: bi(N[0], C ?? i) }),
      /* @__PURE__ */ e("span", { children: v(k(N)) }),
      /* @__PURE__ */ e("span", { children: v(w[R]) })
    ] }, N[0])) : /* @__PURE__ */ e("div", { class: "pd-ob-empty", children: "No buyers right now" }) }),
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
function Qd({ s: t, sym: n, base: i, tick: r }) {
  const [s, a] = g(null);
  return Z(() => {
    let o = !0;
    a(null);
    const c = () => t.client.market.trades(n, 40).then((p) => o && a(p)).catch(() => o && a((p) => p ?? []));
    c();
    const d = setInterval(() => !At() && c(), 4e3);
    return () => {
      o = !1, clearInterval(d);
    };
  }, [n]), s === null ? /* @__PURE__ */ e("div", { class: "pd-center", children: /* @__PURE__ */ e(Qe, {}) }) : s.length ? /* @__PURE__ */ e("div", { class: "pd-ob", children: [
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
      /* @__PURE__ */ e("span", { class: `p ${o.side === "buy" ? "pos" : "neg"}`, children: bi(o.price, r) }),
      /* @__PURE__ */ e("span", { children: ue(o.size) }),
      /* @__PURE__ */ e("span", { class: "muted", children: an(o.time) })
    ] }, o.id)) })
  ] }) : /* @__PURE__ */ e("div", { class: "pd-center muted", children: "No recent trades." });
}
function Cs() {
  const t = Oe(null), [n, i] = g([0, 0]);
  return ii(() => {
    const r = t.current;
    if (!r || typeof ResizeObserver > "u") return;
    const s = new ResizeObserver(() => i([r.clientWidth, r.clientHeight]));
    return s.observe(r), i([r.clientWidth, r.clientHeight]), () => s.disconnect();
  }, []), [t, n[0], n[1]];
}
const xi = (t, n = 4) => {
  const i = Math.abs(t).toFixed(n);
  return `${t < 0 && Number(i) !== 0 ? "-" : ""}${i}%`;
}, Va = (t, n) => [t, 0, n].filter((i, r, s) => s.indexOf(i) === r && i >= t && i <= n), ep = { "24h": 24, "1w": 168, "1m": 720 };
function tp({ s: t, sym: n }) {
  const [i, r] = g(void 0), [s, a] = g("1w"), [o, c] = g(null), [d, p, u] = Cs();
  Z(() => {
    let A = !0;
    r(void 0);
    const O = () => t.client.market.fundingHistory(n, 30).then((le) => A && r(le)).catch(() => A && r((le) => le ?? null));
    O();
    const J = setInterval(() => !At() && O(), 10 * 6e4);
    return () => (A = !1, clearInterval(J));
  }, [n]);
  const l = (i ?? []).slice(-ep[s]).map((A) => ({ time: A.time, v: A.rate * 100 }));
  let h = 0;
  const m = l.map((A) => h += A.v), f = 70, k = 66, y = 14, _ = 26, w = Math.max(10, p - f - k), T = Math.max(10, u - y - _), $ = Math.min(0, ...l.map((A) => A.v)), v = Math.max(0, ...l.map((A) => A.v)) || 1e-4, C = Math.min(0, ...m), S = Math.max(0, ...m) || 1e-4, q = (A) => y + (1 - (A - $) / (v - $ || 1)) * T, x = (A) => y + (1 - (A - C) / (S - C || 1)) * T, z = l.length ? w / l.length : w, N = Math.max(1, z * 0.7), R = q(0), oe = m.map((A, O) => `${O ? "L" : "M"}${(f + O * z + z / 2).toFixed(1)},${x(A).toFixed(1)}`).join(""), M = Va($, v), I = Va(C, S), F = l.length ? [0, Math.floor(l.length / 2), l.length - 1] : [], W = o !== null && l[o] ? o : null, P = (A) => s === "24h" ? new Date(A).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }) : new Date(A).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return /* @__PURE__ */ e("div", { class: "pd-tabbody", children: [
    /* @__PURE__ */ e("div", { class: "pd-fh", children: [
      /* @__PURE__ */ e("b", { children: "Funding Rate History" }),
      /* @__PURE__ */ e("span", { class: "muted", children: W !== null ? `${new Date(l[W].time).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })} · ${xi(l[W].v)} · total ${xi(m[W], 3)}` : "Paid every hour. Positive: longs pay shorts." }),
      /* @__PURE__ */ e("span", { class: "sp" }),
      /* @__PURE__ */ e("span", { class: "pd-ivs flat", role: "radiogroup", "aria-label": "Range", children: ["24h", "1w", "1m"].map((A) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": s === A, class: s === A ? "on" : "", onClick: () => a(A), children: A === "24h" ? "24H" : A === "1w" ? "1W" : "1M" }, A)) })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-svgbox", ref: d, onMouseLeave: () => c(null), children: i === void 0 ? /* @__PURE__ */ e("div", { class: "pd-center", children: /* @__PURE__ */ e(Qe, {}) }) : i === null ? /* @__PURE__ */ e("div", { class: "pd-center muted", children: "Funding history is unavailable right now." }) : l.length ? p > 0 && /* @__PURE__ */ e(
      "svg",
      {
        width: p,
        height: u,
        viewBox: `0 0 ${p} ${u}`,
        role: "img",
        "aria-label": `Hourly funding rates for ${n}, ${s}`,
        onMouseMove: (A) => {
          const O = A.currentTarget.getBoundingClientRect(), J = Math.floor((A.clientX - O.left - f) / z);
          c(J >= 0 && J < l.length ? J : null);
        },
        children: [
          M.map((A) => /* @__PURE__ */ e("g", { children: [
            /* @__PURE__ */ e("line", { x1: f, x2: f + w, y1: q(A), y2: q(A), class: "grid" }),
            /* @__PURE__ */ e("text", { x: f - 8, y: q(A) + 4, "text-anchor": "end", class: "ax", children: xi(A, 4) })
          ] }, `l${A}`)),
          I.map((A) => /* @__PURE__ */ e("text", { x: f + w + 8, y: x(A) + 4, class: "ax", children: xi(A, 2) }, `r${A}`)),
          /* @__PURE__ */ e("line", { x1: f, x2: f + w, y1: R, y2: R, class: "zero" }),
          l.map((A, O) => {
            const J = f + O * z + (z - N) / 2, le = Math.min(q(A.v), R);
            return /* @__PURE__ */ e("rect", { x: J, y: le, width: N, height: Math.max(1, Math.abs(q(A.v) - R)), class: A.v >= 0 ? "pos" : "neg", opacity: W === null || W === O ? 1 : 0.45 }, A.time);
          }),
          /* @__PURE__ */ e("path", { d: oe, class: "cum" }),
          W !== null && /* @__PURE__ */ e("line", { x1: f + W * z + z / 2, x2: f + W * z + z / 2, y1: y, y2: y + T, class: "cross" }),
          F.map((A, O) => /* @__PURE__ */ e("text", { x: f + A * z + z / 2, y: u - 6, "text-anchor": O === 0 ? "start" : O === 2 ? "end" : "middle", class: "ax", children: P(l[A].time) }, A))
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
function np({ book: t, base: n, tick: i }) {
  const [r, s, a] = Cs(), [o, c] = g(null);
  if (t === void 0)
    return /* @__PURE__ */ e("div", { class: "pd-tabbody", children: /* @__PURE__ */ e("div", { class: "pd-center", children: /* @__PURE__ */ e(Qe, {}) }) });
  if (t === null || !t.bids.length && !t.asks.length)
    return /* @__PURE__ */ e("div", { class: "pd-tabbody", children: /* @__PURE__ */ e("div", { class: "pd-center muted", children: "The order book is unavailable right now." }) });
  const d = Number.isFinite(t.mid) && t.mid > 0 ? t.mid : t.bids[0]?.[0] ?? t.asks[0]?.[0] ?? 0, p = 0.15, u = t.bids.filter(([O]) => O >= d * (1 - p)), l = t.asks.filter(([O]) => O <= d * (1 + p));
  let h = 0;
  const m = u.map(([O, J]) => [O, h += J]);
  let f = 0;
  const k = l.map(([O, J]) => [O, f += J]), y = Math.min(m.length ? m[m.length - 1][0] : d, d * 0.995), _ = Math.max(k.length ? k[k.length - 1][0] : d, d * 1.005), w = Math.max(d - y, _ - d), T = d - w, $ = d + w, v = Math.max(h, f) || 1, C = 62, S = 12, q = 12, x = 26, z = Math.max(10, s - C - S), N = Math.max(10, a - q - x), R = (O) => C + (O - T) / ($ - T || 1) * z, oe = (O) => q + (1 - O / v) * N, M = (O) => {
    let J = `M${R(d).toFixed(1)},${oe(0).toFixed(1)}`, le = 0;
    for (const [Me, Le] of O) J += `L${R(Me).toFixed(1)},${oe(le).toFixed(1)}L${R(Me).toFixed(1)},${oe(Le).toFixed(1)}`, le = Le;
    return J;
  }, I = M(m), F = M(k), W = (O, J) => O.length ? `${J}L${R(O[O.length - 1][0]).toFixed(1)},${oe(0).toFixed(1)}Z` : "";
  let P = null;
  if (o !== null) {
    const O = T + (o - C) / z * ($ - T);
    if (O >= d) {
      const J = k.filter(([le]) => le <= O);
      P = { p: O, q: J.length ? J[J.length - 1][1] : 0, impact: (O - d) / d };
    } else {
      const J = m.filter(([le]) => le >= O);
      P = { p: O, q: J.length ? J[J.length - 1][1] : 0, impact: (d - O) / d };
    }
  }
  const A = [T, (T + d) / 2, d, (d + $) / 2, $];
  return /* @__PURE__ */ e("div", { class: "pd-tabbody", children: [
    /* @__PURE__ */ e("div", { class: "pd-fh", children: [
      /* @__PURE__ */ e("b", { children: "Depth" }),
      /* @__PURE__ */ e("span", { class: "muted", children: P ? `Price ${K(P.p, i)} · Impact ${(P.impact * 100).toFixed(2)}% · ${ue(P.q)} ${n} · ${H(P.q * P.p, { decimals: 0 })}` : `Mid ${K(d, i)} · buyers left, sellers right` })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-svgbox", ref: r, onMouseLeave: () => c(null), children: s > 0 && /* @__PURE__ */ e(
      "svg",
      {
        width: s,
        height: a,
        viewBox: `0 0 ${s} ${a}`,
        role: "img",
        "aria-label": `Order book depth around ${K(d, i)}`,
        onMouseMove: (O) => {
          const J = O.currentTarget.getBoundingClientRect(), le = O.clientX - J.left;
          c(le >= C && le <= C + z ? le : null);
        },
        children: [
          [0, 0.5, 1].map((O) => /* @__PURE__ */ e("g", { children: [
            /* @__PURE__ */ e("line", { x1: C, x2: C + z, y1: oe(v * O), y2: oe(v * O), class: "grid" }),
            /* @__PURE__ */ e("text", { x: C - 8, y: oe(v * O) + 4, "text-anchor": "end", class: "ax", children: ue(v * O) })
          ] }, O)),
          /* @__PURE__ */ e("path", { d: W(m, I), class: "bidfill" }),
          /* @__PURE__ */ e("path", { d: W(k, F), class: "askfill" }),
          /* @__PURE__ */ e("path", { d: I, class: "bidline" }),
          /* @__PURE__ */ e("path", { d: F, class: "askline" }),
          /* @__PURE__ */ e("line", { x1: R(d), x2: R(d), y1: q, y2: q + N, class: "cross" }),
          o !== null && /* @__PURE__ */ e("line", { x1: o, x2: o, y1: q, y2: q + N, class: "cross" }),
          A.map((O, J) => /* @__PURE__ */ e("text", { x: R(O), y: a - 6, "text-anchor": J === 0 ? "start" : J === A.length - 1 ? "end" : "middle", class: "ax", children: K(O, i).replace("$", "") }, J))
        ]
      }
    ) })
  ] });
}
function ip({ s: t, m: n }) {
  const [i, r] = g(void 0), [s, a] = g(null), [o, c, d] = Cs();
  Z(() => {
    let P = !0;
    r(void 0);
    const A = () => t.client.market.liquidationMap(n.symbol).then((J) => P && r(J)).catch(() => P && r((J) => J ?? null));
    A();
    const O = setInterval(() => !At() && A(), 6e4);
    return () => (P = !1, clearInterval(O));
  }, [n.symbol]);
  const p = n.mark, u = n.spec.tickSize, l = (i ?? []).map((P) => ({ price: P.price, long: P.long * P.price, short: P.short * P.price })), h = l.some((P) => P.long > 0 || P.short > 0), m = new Array(l.length).fill(0), f = new Array(l.length).fill(0);
  for (let P = l.length - 1, A = 0; P >= 0; P--) l[P].price < p && (m[P] = A += l[P].long);
  for (let P = 0, A = 0; P < l.length; P++) l[P].price > p && (f[P] = A += l[P].short);
  const k = 62, y = 66, _ = 14, w = 26, T = Math.max(10, c - k - y), $ = Math.max(10, d - _ - w), v = l.length ? l[0].price : p * 0.9, C = l.length ? l[l.length - 1].price : p * 1.1, S = (P) => k + (P - v) / (C - v || 1) * T, q = Math.max(1, ...l.map((P) => Math.max(P.long, P.short))), x = Math.max(1, ...m, ...f), z = (P) => _ + (1 - P / q) * $, N = (P) => _ + (1 - P / x) * $, R = Math.max(1, T / Math.max(1, l.length) * 0.6), oe = (P, A) => P.map((O, J) => `${J ? "L" : "M"}${S(l[O].price).toFixed(1)},${N(A[O]).toFixed(1)}`).join(""), M = l.map((P, A) => A).filter((P) => l[P].price < p), I = l.map((P, A) => A).filter((P) => l[P].price > p), F = s !== null && l[s] ? l[s] : null, W = (P) => H(P, { decimals: 0 });
  return /* @__PURE__ */ e("div", { class: "pd-tabbody", children: [
    /* @__PURE__ */ e("div", { class: "pd-fh", children: [
      /* @__PURE__ */ e("b", { children: "Liquidation Map" }),
      /* @__PURE__ */ e("span", { class: "muted", children: F && s !== null ? `${K(F.price, u)} · ${F.price < p ? `longs ${W(F.long)} · ${W(m[s])} down to here` : `shorts ${W(F.short)} · ${W(f[s])} up to here`}` : "Where open positions on Strike would be liquidated, in USD" })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-svgbox", ref: o, onMouseLeave: () => a(null), children: i === void 0 ? /* @__PURE__ */ e("div", { class: "pd-center", children: /* @__PURE__ */ e(Qe, {}) }) : i === null ? /* @__PURE__ */ e("div", { class: "pd-center muted", children: "The liquidation map is unavailable right now." }) : h ? c > 0 && /* @__PURE__ */ e(
      "svg",
      {
        width: c,
        height: d,
        viewBox: `0 0 ${c} ${d}`,
        role: "img",
        "aria-label": `Liquidation levels for ${n.symbol}`,
        onMouseMove: (P) => {
          const A = P.currentTarget.getBoundingClientRect(), O = v + (P.clientX - A.left - k) / T * (C - v);
          let J = -1, le = 1 / 0;
          l.forEach((Me, Le) => Math.abs(Me.price - O) < le && (le = Math.abs(Me.price - O), J = Le)), a(J >= 0 ? J : null);
        },
        children: [
          [0, 0.5, 1].map((P) => /* @__PURE__ */ e("g", { children: [
            /* @__PURE__ */ e("line", { x1: k, x2: k + T, y1: z(q * P), y2: z(q * P), class: "grid" }),
            /* @__PURE__ */ e("text", { x: k - 8, y: z(q * P) + 4, "text-anchor": "end", class: "ax", children: W(q * P) }),
            /* @__PURE__ */ e("text", { x: k + T + 8, y: N(x * P) + 4, class: "ax", children: W(x * P) })
          ] }, P)),
          l.map(
            (P, A) => P.price < p && P.long > 0 ? /* @__PURE__ */ e("rect", { x: S(P.price) - R / 2, y: z(P.long), width: R, height: Math.max(1, z(0) - z(P.long)), class: "neg" }, A) : P.price > p && P.short > 0 ? /* @__PURE__ */ e("rect", { x: S(P.price) - R / 2, y: z(P.short), width: R, height: Math.max(1, z(0) - z(P.short)), class: "pos" }, A) : null
          ),
          M.length > 1 && /* @__PURE__ */ e("path", { d: oe(M, m), class: "askline" }),
          I.length > 1 && /* @__PURE__ */ e("path", { d: oe(I, f), class: "bidline" }),
          /* @__PURE__ */ e("line", { x1: S(p), x2: S(p), y1: _, y2: _ + $, class: "cross" }),
          /* @__PURE__ */ e("text", { x: Math.min(S(p) + 6, k + T - 120), y: _ + 12, class: "ax", children: `Price ${K(p, u)}` }),
          s !== null && /* @__PURE__ */ e("line", { x1: S(l[s].price), x2: S(l[s].price), y1: _, y2: _ + $, class: "cross" }),
          [v, p, C].map((P, A) => /* @__PURE__ */ e("text", { x: S(P), y: d - 6, "text-anchor": A === 0 ? "start" : A === 2 ? "end" : "middle", class: "ax", children: K(P, u).replace("$", "") }, A))
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
const on = (t) => t == null || t === "" ? NaN : Number(t), Ya = (t) => {
  if (!Number.isFinite(t) || t <= 0) return 0;
  const n = t.toString();
  return n.includes("e-") ? Number(n.split("e-")[1]) : (n.split(".")[1] ?? "").length;
}, Vr = (t) => Number.isFinite(t) && t > 0 ? `±${(t * 100).toFixed(t * 100 < 1 ? 2 : 0)}% from the mark` : "—";
function Ve({ k: t, d: n, v: i }) {
  return /* @__PURE__ */ e("div", { class: "pd-drow", children: [
    /* @__PURE__ */ e("span", { class: "l", children: [
      /* @__PURE__ */ e("span", { children: t }),
      /* @__PURE__ */ e("small", { children: n })
    ] }),
    /* @__PURE__ */ e("b", { class: "num", children: i })
  ] });
}
function rp({ s: t, m: n }) {
  const [, i] = g(0);
  Z(() => {
    const l = setInterval(() => i((h) => h + 1), 1e3);
    return () => clearInterval(l);
  }, []);
  const r = t.client.raw(n.symbol);
  if (!r)
    return /* @__PURE__ */ e("div", { class: "pd-tabbody", children: /* @__PURE__ */ e("div", { class: "pd-center muted", children: "Market details are unavailable right now." }) });
  const s = n.base, a = (l) => Number.isFinite(on(l)) ? `${ue(on(l))} ${s}` : "—", o = [...n.spec.marginTiers].sort((l, h) => Number(l.max_notional) - Number(h.max_notional)), c = o.map((l) => Number(l.maintenance_margin_rate)).filter((l) => Number.isFinite(l)), d = c.length ? `${(Math.min(...c) * 100).toFixed(2)}% – ${(Math.max(...c) * 100).toFixed(2)}%` : "—", p = n.spec.tickSize, u = n.spec.stepSize;
  return /* @__PURE__ */ e("div", { class: "pd-tabbody pd-details", children: /* @__PURE__ */ e("div", { class: "pd-dgrid", children: [
    /* @__PURE__ */ e("section", { children: [
      /* @__PURE__ */ e("h4", { children: "Market Overview" }),
      /* @__PURE__ */ e(Ve, { k: "Trading Pair", d: n.name, v: n.symbol }),
      /* @__PURE__ */ e(Ve, { k: "Maximum Leverage", d: "The most you can use when opening a small position", v: `${n.strikeMaxLev}x` }),
      n.maxLev < n.strikeMaxLev && /* @__PURE__ */ e(Ve, { k: "Leverage in this app", d: "This app caps leverage below Strike's maximum", v: `${n.maxLev}x` })
    ] }),
    /* @__PURE__ */ e("section", { children: [
      /* @__PURE__ */ e("h4", { children: "Order Size Rules" }),
      /* @__PURE__ */ e(Ve, { k: "Smallest Limit Order", d: "Minimum size for a limit order", v: a(r.order_limit_min_size) }),
      /* @__PURE__ */ e(Ve, { k: "Largest Limit Order", d: "Maximum size of one limit order", v: a(r.order_limit_max_size) }),
      /* @__PURE__ */ e(Ve, { k: "Smallest Market Order", d: "Minimum size for a market order", v: a(r.order_market_min_size) }),
      /* @__PURE__ */ e(Ve, { k: "Largest Market Order", d: "Maximum size of one market order", v: a(r.order_market_max_size) }),
      /* @__PURE__ */ e(Ve, { k: "Minimum Order Value", d: "An order must be worth at least this", v: Number.isFinite(on(r.order_min_notional)) ? H(on(r.order_min_notional), { decimals: 0 }) : "—" })
    ] }),
    /* @__PURE__ */ e("section", { children: [
      /* @__PURE__ */ e("h4", { children: "Funding & Fees" }),
      /* @__PURE__ */ e(Ve, { k: "Current Funding Rate", d: "Paid every hour. Positive: longs pay shorts", v: xi(n.funding * 100) }),
      /* @__PURE__ */ e(Ve, { k: "Next Funding Payment", d: "Time until the next hourly payment", v: n.nextFunding > Date.now() ? Ss(n.nextFunding) : "—" }),
      /* @__PURE__ */ e(Ve, { k: "Maintenance Margin", d: "Below this a position is liquidated (rises with size)", v: d }),
      /* @__PURE__ */ e(Ve, { k: "Liquidation Fee", d: "Charged if a position is liquidated", v: Number.isFinite(on(r.liquidation_fee_rate)) ? `${(on(r.liquidation_fee_rate) * 100).toFixed(2)}%` : "—" }),
      /* @__PURE__ */ e(Ve, { k: "Trading Fee", d: "Strike's base taker fee, plus this app's builder fee", v: `${(t.takerRate * 100).toFixed(3)}% + ${(t.client.orderFeeBps / 100).toFixed(2)}%` })
    ] }),
    /* @__PURE__ */ e("section", { children: [
      /* @__PURE__ */ e("h4", { children: "Order Precision" }),
      /* @__PURE__ */ e(Ve, { k: "Price Decimal Places", d: "Decimals allowed in a price", v: `${Ya(p)}` }),
      /* @__PURE__ */ e(Ve, { k: "Size Decimal Places", d: "Decimals allowed in a size", v: `${Ya(u)}` }),
      /* @__PURE__ */ e(Ve, { k: "Minimum Price Movement", d: "Smallest price step", v: Number.isFinite(p) ? String(r.order_tick_price) : "—" }),
      /* @__PURE__ */ e(Ve, { k: "Order Size Increment", d: "Sizes are multiples of this", v: a(r.order_limit_step_size) })
    ] }),
    /* @__PURE__ */ e("section", { children: [
      /* @__PURE__ */ e("h4", { children: "Price Protection" }),
      /* @__PURE__ */ e(Ve, { k: "Limit Order Price Range", d: "How far a limit price can be from the market", v: Vr(on(r.order_limit_price_bound)) }),
      /* @__PURE__ */ e(Ve, { k: "Market Order Price Range", d: "Most a market order can move from the market", v: Vr(on(r.order_market_price_bound)) }),
      /* @__PURE__ */ e(Ve, { k: "Stop Order Protection", d: "Buffer against stops triggering on brief spikes", v: Vr(on(r.trigger_protect)).replace(" from the mark", "") })
    ] }),
    /* @__PURE__ */ e("section", { children: [
      /* @__PURE__ */ e("h4", { children: "Margin Tiers" }),
      /* @__PURE__ */ e("table", { class: "pd-tiers", children: [
        /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ e("tr", { children: [
          /* @__PURE__ */ e("th", { children: "Max Notional" }),
          /* @__PURE__ */ e("th", { children: "Max Leverage" }),
          /* @__PURE__ */ e("th", { children: "MMR" })
        ] }) }),
        /* @__PURE__ */ e("tbody", { children: o.map((l) => /* @__PURE__ */ e("tr", { children: [
          /* @__PURE__ */ e("td", { class: "num", children: H(Number(l.max_notional), { decimals: 0 }) }),
          /* @__PURE__ */ e("td", { class: "num", children: [
            l.max_leverage,
            "x"
          ] }),
          /* @__PURE__ */ e("td", { class: "num", children: [
            (Number(l.maintenance_margin_rate) * 100).toFixed(2),
            "%"
          ] })
        ] }, l.max_notional)) })
      ] })
    ] })
  ] }) });
}
const sp = [0.25, 0.5, 0.75, 1];
function Fi(t, n) {
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
function Ho({ value: t, onChange: n }) {
  return /* @__PURE__ */ e("div", { class: "pa-pcts four", children: sp.map((i) => /* @__PURE__ */ e("button", { class: `pa-btn dark${t === i ? " on" : ""}`, onClick: () => n(i), children: [
    i * 100,
    "%"
  ] }, i)) });
}
function ti({ label: t, value: n, onInput: i, aria: r, hint: s, mark: a, tick: o }) {
  return /* @__PURE__ */ e("label", { class: "pa-field", children: [
    /* @__PURE__ */ e("span", { class: "lbl", children: t }),
    /* @__PURE__ */ e("span", { class: "in", children: [
      /* @__PURE__ */ e("span", { class: "muted", children: "$" }),
      /* @__PURE__ */ e("input", { inputMode: "decimal", value: n, placeholder: "Enter price", "aria-label": r, onInput: (c) => i(Ce(c)) }),
      a ? /* @__PURE__ */ e("button", { class: "pa-chipmini", onClick: (c) => (c.preventDefault(), i(me(a, o ?? 1e-4))), children: "Mark" }) : null
    ] }),
    s && /* @__PURE__ */ e("span", { class: "hint num", children: s })
  ] });
}
function Fn({ busy: t, label: n, onClick: i, disabled: r, cls: s }) {
  return /* @__PURE__ */ e("button", { class: `pa-btn ${s ?? "primary"} big`, disabled: t || r, onClick: i, children: t ? /* @__PURE__ */ e(Qe, { size: 18 }) : n });
}
function yr(t, n) {
  return t.orders.filter((i) => i.symbol === n && i.reduce_only);
}
const ap = (t) => {
  const n = String(t.type);
  return n.startsWith("take_profit") ? "Take profit" : n.startsWith("trailing") ? "Trailing stop" : n.startsWith("stop") ? "Stop loss" : n === "limit" ? "Limit close" : "Closing order";
};
function Ms({ s: t, p: n, onClose: i }) {
  const r = Fi(t, n), [s, a] = g(""), [o, c] = g(""), [d, p] = g(1), [u, l] = g("mark_price"), [h, m] = g(!1), f = Number(s) || 0, k = Number(o) || 0, y = ($) => (r.long ? 1 : -1) * ($ - r.entry) * r.abs * d, _ = f && (r.long ? f <= r.mark : f >= r.mark) ? `Take profit must be ${r.long ? "above" : "below"} the current price` : k && (r.long ? k >= r.mark : k <= r.mark) ? `Stop loss must be ${r.long ? "below" : "above"} the current price` : k && r.liq > 0 && (r.long ? k <= r.liq : k >= r.liq) ? "Stop loss is past the liquidation price, so it would never trigger" : null, w = yr(t, n.symbol), T = async () => {
    m(!0);
    const $ = await t.setExits(n, { takeProfit: f || void 0, stopLoss: k || void 0, fraction: d, workingType: u });
    m(!1), $ && i();
  };
  return /* @__PURE__ */ e(Be, { title: "Take profit / Stop loss", onClose: () => !h && i(), tall: !0, children: [
    /* @__PURE__ */ e(Ae, { children: [
      /* @__PURE__ */ e(ne, { k: "Entry price", v: /* @__PURE__ */ e("span", { class: "num", children: K(r.entry, r.tick) }) }),
      /* @__PURE__ */ e(ne, { k: "Mark price", v: /* @__PURE__ */ e("span", { class: "num", children: K(r.mark, r.tick) }) }),
      r.liq > 0 && /* @__PURE__ */ e(ne, { k: "Liquidation price", v: /* @__PURE__ */ e("span", { class: "num", children: K(r.liq, r.tick) }) })
    ] }),
    /* @__PURE__ */ e(ti, { label: "Take profit", value: s, onInput: a, aria: "Take profit price", mark: r.mark, tick: r.tick, hint: f ? `Est. P&L ≈ ${H(y(f), { sign: !0 })} (${dt((y(f) / (r.abs * d * r.entry / r.lev) || 0) * 100, 0)})` : void 0 }),
    /* @__PURE__ */ e(ti, { label: "Stop loss", value: o, onInput: c, aria: "Stop loss price", mark: r.mark, tick: r.tick, hint: k ? `Est. P&L ≈ ${H(y(k), { sign: !0 })}` : void 0 }),
    /* @__PURE__ */ e("div", { class: "pa-lbl-row", children: "Size" }),
    /* @__PURE__ */ e(Ho, { value: d, onChange: p }),
    /* @__PURE__ */ e("div", { class: "pa-seg", role: "radiogroup", "aria-label": "Trigger price", children: ["mark_price", "contract_price"].map(($) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": u === $, class: u === $ ? "on" : "", onClick: () => l($), children: $ === "mark_price" ? "Trigger on mark" : "Trigger on last" }, $)) }),
    w.length > 0 && /* @__PURE__ */ e(U, { children: [
      /* @__PURE__ */ e("div", { class: "pa-lbl-row", children: "Existing exit orders" }),
      /* @__PURE__ */ e(Ae, { children: w.map(($) => /* @__PURE__ */ e("div", { class: "pa-row", children: [
        /* @__PURE__ */ e("span", { class: "l", children: [
          /* @__PURE__ */ e("span", { class: "k", children: ap($) }),
          /* @__PURE__ */ e("span", { class: "s num", children: [
            ue(Number($.size)),
            " ",
            r.base,
            " @ ",
            K(Number($.stop_price) || Number($.price), r.tick)
          ] })
        ] }),
        /* @__PURE__ */ e("button", { class: "pa-btn dark xs", onClick: () => t.cancelOrder($), children: "Cancel" })
      ] }, $.id)) })
    ] }),
    _ && /* @__PURE__ */ e("div", { class: "pa-warn", children: [
      /* @__PURE__ */ e(Y, { n: "warn", size: 16 }),
      _
    ] }),
    /* @__PURE__ */ e("p", { class: "pa-p sm", children: "Exits are reduce-only market orders that trigger at your price, so they can only shrink this position." }),
    /* @__PURE__ */ e(Fn, { busy: h, label: "Confirm", onClick: T, disabled: !!_ || !f && !k })
  ] });
}
function zs({ s: t, p: n, onClose: i }) {
  const r = Fi(t, n), [s, a] = g("1"), [o, c] = g(""), [d, p] = g("mark_price"), [u, l] = g(!1), h = Number(s) || 0, m = h >= Ln && h <= En, f = r.long ? r.mark * (1 - h / 100) : r.mark * (1 + h / 100), k = async () => {
    l(!0);
    const y = await t.trail(n, h, Number(o) > 0 ? Number(o) : void 0, d);
    l(!1), y && i();
  };
  return /* @__PURE__ */ e(Be, { title: "Trailing stop", onClose: () => !u && i(), tall: !0, children: [
    /* @__PURE__ */ e("p", { class: "pa-p", children: "The stop follows the price as it moves your way and closes the position at market if it turns back by your trail distance." }),
    /* @__PURE__ */ e("label", { class: "pa-field", children: [
      /* @__PURE__ */ e("span", { class: "lbl", children: "Trail distance" }),
      /* @__PURE__ */ e("span", { class: "in", children: [
        /* @__PURE__ */ e("input", { inputMode: "decimal", value: s, "aria-label": "Trail distance percent", onInput: (y) => a(Ce(y)) }),
        /* @__PURE__ */ e("span", { children: "%" })
      ] }),
      /* @__PURE__ */ e("span", { class: "hint num", children: m ? `If it started now: closes at ≈ ${K(f, r.tick)}` : `Strike allows ${Ln}–${En}%` })
    ] }),
    /* @__PURE__ */ e("div", { class: "pa-pcts four", children: [0.5, 1, 2, 5].map((y) => /* @__PURE__ */ e("button", { class: `pa-btn dark${h === y ? " on" : ""}`, onClick: () => a(String(y)), children: [
      y,
      "%"
    ] }, y)) }),
    /* @__PURE__ */ e(ti, { label: "Activation price (optional)", value: o, onInput: c, aria: "Activation price", mark: r.mark, tick: r.tick, hint: "Leave empty to start trailing right away" }),
    /* @__PURE__ */ e("div", { class: "pa-seg", role: "radiogroup", "aria-label": "Trigger price", children: ["mark_price", "contract_price"].map((y) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": d === y, class: d === y ? "on" : "", onClick: () => p(y), children: y === "mark_price" ? "Follow mark" : "Follow last" }, y)) }),
    /* @__PURE__ */ e(Fn, { busy: u, label: "Set trailing stop", onClick: k, disabled: !m })
  ] });
}
function Ts({ s: t, p: n, onClose: i }) {
  const r = Fi(t, n), [s, a] = g("add"), [o, c] = g(""), [d, p] = g(!1), u = mr(n), l = Number(o) || 0, h = async () => {
    p(!0);
    const m = await t.modifyMargin(n.symbol, l, s);
    p(!1), m && i();
  };
  return /* @__PURE__ */ e(Be, { title: "Modify margin", onClose: () => !d && i(), children: [
    /* @__PURE__ */ e("div", { class: "pa-seg", role: "radiogroup", children: ["add", "remove"].map((m) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": s === m, class: s === m ? "on" : "", onClick: () => a(m), children: m === "add" ? "Add margin" : "Remove margin" }, m)) }),
    /* @__PURE__ */ e("label", { class: "pa-field", children: [
      /* @__PURE__ */ e("span", { class: "lbl", children: "Amount" }),
      /* @__PURE__ */ e("span", { class: "in", children: [
        /* @__PURE__ */ e("span", { class: "muted", children: "$" }),
        /* @__PURE__ */ e("input", { inputMode: "decimal", value: o, placeholder: "0.00", "aria-label": "Margin amount", onInput: (m) => c(Ce(m)) }),
        s === "add" && /* @__PURE__ */ e("button", { class: "pa-chipmini", onClick: (m) => (m.preventDefault(), c(String(Math.floor(t.available * 100) / 100))), children: "Max" })
      ] })
    ] }),
    /* @__PURE__ */ e(Ae, { children: [
      /* @__PURE__ */ e(ne, { k: "Current margin", v: /* @__PURE__ */ e("span", { class: "num", children: H(u) }) }),
      /* @__PURE__ */ e(ne, { k: s === "add" ? "Available to add" : "After removing", v: /* @__PURE__ */ e("span", { class: "num", children: H(s === "add" ? t.available : Math.max(0, u - l)) }) }),
      r.liq > 0 && /* @__PURE__ */ e(ne, { k: "Liquidation price now", v: /* @__PURE__ */ e("span", { class: "num", children: K(r.liq, r.tick) }) })
    ] }),
    /* @__PURE__ */ e("p", { class: "pa-p sm", children: "Adding margin moves the liquidation price further away; removing it brings it closer. Strike checks how much can be removed." }),
    /* @__PURE__ */ e(Fn, { busy: d, label: s === "add" ? "Add margin" : "Remove margin", onClick: h, disabled: !(l > 0) || s === "add" && l > t.available })
  ] });
}
function Ns({ s: t, p: n, onClose: i }) {
  const r = Fi(t, n), [s, a] = g(!1), o = async () => {
    a(!0);
    const c = await t.reverse(n);
    a(!1), c && i();
  };
  return /* @__PURE__ */ e(Be, { title: "Reverse position", onClose: () => !s && i(), children: [
    /* @__PURE__ */ e("div", { class: "pa-rev", children: [
      /* @__PURE__ */ e("span", { class: r.long ? "pos" : "neg", children: [
        r.long ? "Long" : "Short",
        " ",
        ue(r.abs),
        " ",
        r.base
      ] }),
      /* @__PURE__ */ e(Y, { n: "right", size: 18 }),
      /* @__PURE__ */ e("span", { class: r.long ? "neg" : "pos", children: [
        r.long ? "Short" : "Long",
        " ",
        ue(r.abs),
        " ",
        r.base
      ] })
    ] }),
    /* @__PURE__ */ e("p", { class: "pa-p", children: [
      "One market order of ",
      ue(r.abs * 2),
      " ",
      r.base,
      " on the other side closes this position and opens the opposite one at the same size and ",
      r.lev,
      "x. It needs margin for the new side and pays fees on the full order."
    ] }),
    /* @__PURE__ */ e(Fn, { busy: s, label: `Go ${r.long ? "Short" : "Long"}`, onClick: o, cls: r.long ? "short" : "long" })
  ] });
}
function As({ s: t, p: n, onClose: i, onClosed: r }) {
  const s = Fi(t, n), [a, o] = g("market"), [c, d] = g(1), [p, u] = g(""), [l, h] = g(!1), m = s.m ? ys(s.m.spec, s.abs, c, a) : s.abs * c, [f, k] = g(void 0);
  Z(() => {
    let v = !0;
    return t.client.market.depth(n.symbol, 100).then(
      (C) => v && k(yo(C.bids, C.asks)),
      () => v && k(null)
    ), () => {
      v = !1;
    };
  }, [n.symbol]);
  const y = Number(t.client.raw(n.symbol)?.order_market_price_bound) || 0.05, _ = f && m > 0 ? gr(f, s.long ? "sell" : "buy", m, { mark: s.mark, bound: y }) : null, w = f !== void 0 && (!_ || _.beyondBand || !_.complete), T = _ && !w ? (s.long ? 1 : -1) * (_.avgPrice - s.entry) * m : null, $ = async () => {
    h(!0);
    const v = a === "limit" ? await t.limitClose(n, Number(p), c) : await t.closePosition(n, c);
    h(!1), v ? (i(), c >= 1 && a === "market" && r?.()) : a === "market" && (o("limit"), !p && s.mark > 0 && u(me(s.mark, s.tick)));
  };
  return /* @__PURE__ */ e(Be, { title: "Close position", onClose: () => !l && i(), children: [
    /* @__PURE__ */ e("div", { class: "pa-seg", role: "radiogroup", "aria-label": "Close type", children: ["market", "limit"].map((v) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": a === v, class: a === v ? "on" : "", onClick: () => o(v), children: v === "market" ? "Market close" : "Limit close" }, v)) }),
    a === "limit" && /* @__PURE__ */ e(ti, { label: "Close at price", value: p, onInput: u, aria: "Limit close price", mark: s.mark, tick: s.tick, hint: Number(p) > 0 ? `Est. P&L at this price ≈ ${H((s.long ? 1 : -1) * (Number(p) - s.entry) * m, { sign: !0 })}` : void 0 }),
    /* @__PURE__ */ e(Ho, { value: c, onChange: d }),
    /* @__PURE__ */ e(Ae, { children: [
      /* @__PURE__ */ e(ne, { k: "You close", v: /* @__PURE__ */ e("span", { class: "num", children: `${ue(m)} ${s.base}` }), vsub: /* @__PURE__ */ e("span", { class: "num", children: `≈ ${H(m * s.mark)}` }) }),
      a === "market" && /* @__PURE__ */ e(
        ne,
        {
          k: "Estimated P&L",
          sub: _ && !w ? `at about ${K(_.avgPrice, s.tick)}` : void 0,
          v: T !== null ? /* @__PURE__ */ e("span", { class: `num ${T >= 0 ? "pos" : "neg"}`, children: H(T, { sign: !0 }) }) : /* @__PURE__ */ e("span", { class: "num", children: "—" })
        }
      ),
      m < s.abs && /* @__PURE__ */ e(ne, { k: "Stays open", v: /* @__PURE__ */ e("span", { class: "num", children: `${ue(s.abs - m)} ${s.base}` }) })
    ] }),
    /* @__PURE__ */ e("p", { class: "pa-p sm", children: a === "market" ? w ? `There aren't enough ${s.long ? "buyers" : "sellers"} within ${(y * 100).toFixed(0)}% of the market price right now, so Strike would cancel a market close. Try a limit close instead.` : `Closes at the market price. Strike cancels the close if there are no ${s.long ? "buyers" : "sellers"} close enough to the market price; your position then stays open (try a limit close instead).` : "A reduce-only limit order: it waits on the book and closes when the price reaches yours. It can only shrink this position." }),
    /* @__PURE__ */ e(Fn, { busy: l, label: a === "limit" ? c >= 1 ? "Place limit close" : `Limit close ${c * 100}%` : c >= 1 ? "Close position" : `Close ${c * 100}%`, onClick: $, disabled: a === "limit" && !(Number(p) > 0) })
  ] });
}
function op({ s: t, onClose: n }) {
  const [i, r] = g(!1), s = async () => {
    r(!0), await t.closeAll(), r(!1), n();
  }, a = t.positions.reduce((o, c) => o + Number(c.upnl), 0);
  return /* @__PURE__ */ e(Be, { title: "Close all positions", onClose: () => !i && n(), children: [
    /* @__PURE__ */ e(Ae, { children: t.positions.map((o) => /* @__PURE__ */ e(ne, { k: `${o.symbol.split("-")[0]} ${Number(o.size) > 0 ? "Long" : "Short"}`, sub: /* @__PURE__ */ e("span", { class: "num", children: ue(Math.abs(Number(o.size))) }), v: /* @__PURE__ */ e("span", { class: `num ${Number(o.upnl) >= 0 ? "pos" : "neg"}`, children: H(Number(o.upnl), { sign: !0 }) }) }, o.id)) }),
    /* @__PURE__ */ e("p", { class: "pa-p sm", children: [
      "All positions close at the market price (",
      H(a, { sign: !0 }),
      " estimated P&L). Strike cancels any close it can't fill near the market price; those positions stay open."
    ] }),
    /* @__PURE__ */ e(Fn, { busy: i, label: "Close all at market", onClick: s })
  ] });
}
function Wo({ s: t, o: n, onClose: i }) {
  const r = t.bySymbol[n.symbol], s = r?.spec.tickSize ?? 1e-4, a = String(n.type), o = nn(a), c = zn(a), d = Math.max(0, Number(n.size) - (Number(n.filled) || 0)), [p, u] = g(o ? String(Number(n.price) || "") : ""), [l, h] = g(c ? String(Number(n.stop_price) || "") : ""), [m, f] = g(String(d)), [k, y] = g(!1), _ = async () => {
    y(!0);
    const T = await t.editOrder(n, { price: o ? Number(p) : void 0, stopPrice: c ? Number(l) : void 0, size: Number(m) || d });
    y(!1), T && i();
  }, w = n.symbol.split("-")[0];
  return /* @__PURE__ */ e(Be, { title: "Edit order", onClose: () => !k && i(), children: [
    /* @__PURE__ */ e(Ae, { children: /* @__PURE__ */ e(ne, { k: `${n.side === "buy" ? "Buy" : "Sell"} ${String(n.type).replace(/_/g, " ")}`, sub: n.reduce_only ? "Reduce only" : void 0, v: /* @__PURE__ */ e("span", { class: "num", children: K(r?.mark ?? 0, s) }), vsub: "current price" }) }),
    c && /* @__PURE__ */ e(ti, { label: "Trigger price", value: l, onInput: h, aria: "Trigger price", mark: r?.mark, tick: s }),
    o && /* @__PURE__ */ e(ti, { label: "Limit price", value: p, onInput: u, aria: "Limit price", mark: r?.mark, tick: s }),
    /* @__PURE__ */ e("label", { class: "pa-field", children: [
      /* @__PURE__ */ e("span", { class: "lbl", children: [
        "Size (",
        w,
        ")"
      ] }),
      /* @__PURE__ */ e("span", { class: "in", children: /* @__PURE__ */ e("input", { inputMode: "decimal", value: m, "aria-label": "Order size", onInput: (T) => f(Ce(T)) }) })
    ] }),
    /* @__PURE__ */ e("p", { class: "pa-p sm", children: "Strike replaces the order in one step (cancel + new order). Orders linked to a TP/SL bracket or a grid bot can't be edited this way." }),
    /* @__PURE__ */ e(Fn, { busy: k, label: "Save changes", onClick: _, disabled: !(Number(m) > 0) || o && !(Number(p) > 0) || c && !(Number(l) > 0) })
  ] });
}
function lp(t, n) {
  const i = [];
  for (const r of t) {
    const s = r.type.toLowerCase();
    if (s !== "deposit" && s !== "withdraw" && s !== "withdrawal") continue;
    const a = s === "deposit", c = !(a && /pending_settlement/i.test(r.status)) && /pending|processing|submitted/i.test(r.status) && !/settled|completed/i.test(r.status);
    i.push({
      id: `t${r.id}`,
      time: r.time,
      icon: { glyph: a ? "arrowDown" : "arrowUp" },
      title: `${a ? "Deposited" : "Withdrew"}${r.asset ? ` ${r.asset}` : a ? " ADA" : ""}`,
      sub: `Perps · ${sn(r.time)}${c ? " · Pending" : /fail|reject/i.test(r.status) ? " · Failed" : ""}`,
      amount: H(a ? Math.abs(r.amount) : -Math.abs(r.amount), { sign: !0 }),
      cls: a ? "pos" : ""
    });
  }
  for (const r of n) {
    const s = r.symbol.split("-")[0], a = ds(r.side, r.realizedPnl), o = r.realizedPnl ?? 0;
    i.push({
      id: `f${r.id}`,
      time: r.time,
      icon: { coin: s },
      title: `${a || "Trade"} ${r.size !== null ? ue(r.size) : ""} ${s}`.replace(/\s+/g, " ").trim(),
      sub: `${r.price !== null ? `at $${r.price.toLocaleString("en-US", { maximumFractionDigits: 6 })}` : "Perps"} · ${sn(r.time)}${r.autoClose ? ` · ${r.autoClose.replace(/_/g, " ")}` : ""}`,
      amount: o ? H(o, { sign: !0 }) : r.size !== null && r.price !== null ? H(r.size * r.price) : "",
      cls: o > 0 ? "pos" : o < 0 ? "neg" : "muted"
    });
  }
  return i.sort((r, s) => s.time - r.time);
}
function Ps(t) {
  const [n, i] = g(null), [r, s] = g("");
  return Z(() => {
    if (!t.session) return;
    let a = !0;
    return Promise.all([t.client.account.transactions(t.session.accountId, 200).catch(() => null), t.client.account.fillsPage({ limit: 100 }).catch(() => null)]).then(([o, c]) => {
      a && (!o && !c && s("Couldn't load your activity from Strike."), i(lp(o ?? [], c?.items ?? [])));
    }), () => {
      a = !1;
    };
  }, [t.session?.accountId]), { items: n, error: r };
}
function cp({ s: t, nav: n }) {
  const { items: i, error: r } = Ps(t), s = [];
  for (const a of i ?? []) {
    const o = new Date(a.time).toLocaleDateString("en-US", { month: "long", year: "numeric" }), c = s[s.length - 1];
    c && c[0] === o ? c[1].push(a) : s.push([o, [a]]);
  }
  return /* @__PURE__ */ e("div", { class: "pa-screen", children: [
    /* @__PURE__ */ e("div", { class: "pa-top", children: [
      /* @__PURE__ */ e(rt, { n: "back", label: "Back", onClick: n.back }),
      /* @__PURE__ */ e("div", { class: "pa-title", children: "History" })
    ] }),
    /* @__PURE__ */ e("div", { class: "pa-scroll", children: [
      !t.session && /* @__PURE__ */ e("div", { class: "pa-empty", children: "Connect a wallet to see your activity." }),
      t.session && i === null && /* @__PURE__ */ e("div", { class: "pa-empty", children: /* @__PURE__ */ e(Qe, {}) }),
      r && /* @__PURE__ */ e("div", { class: "pa-warn", children: [
        /* @__PURE__ */ e(Y, { n: "warn", size: 16 }),
        r
      ] }),
      i && !i.length && !r && /* @__PURE__ */ e("div", { class: "pa-nothing", children: [
        /* @__PURE__ */ e("span", { class: "ic", children: /* @__PURE__ */ e(Y, { n: "x", size: 18 }) }),
        "No Activity Found"
      ] }),
      s.map(([a, o]) => /* @__PURE__ */ e("div", { children: [
        /* @__PURE__ */ e("div", { class: "pa-month", children: a }),
        o.map((c) => /* @__PURE__ */ e("div", { class: "pa-act", children: [
          c.icon.coin ? /* @__PURE__ */ e(_t, { base: c.icon.coin, size: 38 }) : /* @__PURE__ */ e("span", { class: "glyph", children: /* @__PURE__ */ e(Y, { n: c.icon.glyph, size: 18 }) }),
          /* @__PURE__ */ e("span", { class: "l", children: [
            /* @__PURE__ */ e("b", { children: c.title }),
            /* @__PURE__ */ e("span", { class: "s", children: c.sub })
          ] }),
          /* @__PURE__ */ e("span", { class: `r num ${c.cls}`, children: c.amount })
        ] }, c.id))
      ] }, a)),
      /* @__PURE__ */ e("div", { class: "pa-bottom-pad sm" })
    ] })
  ] });
}
const dp = [
  ["closed", "Positions"],
  ["ohist", "Orders"],
  ["fills", "Trades"],
  ["funding", "Funding"]
];
function pp({ s: t, onPick: n }) {
  const [i, r] = g("positions"), [s, a] = g("closed"), o = i === "history" ? s : i, c = [
    ["positions", `Positions (${t.positions.length})`],
    ["orders", `Open Orders (${t.orders.length})`],
    ["twap", "TWAP"],
    ["grid", "Grid"],
    ["history", "History"],
    ["transfers", "Transfers"]
  ];
  return /* @__PURE__ */ e("div", { class: "pd-panel pd-bottom", children: [
    /* @__PURE__ */ e("div", { class: "pd-tabs left scroll", children: c.map(([d, p]) => /* @__PURE__ */ e("button", { class: i === d ? "on" : "", onClick: () => r(d), children: p }, d)) }),
    i === "history" && /* @__PURE__ */ e("div", { class: "pd-subtabs", role: "tablist", "aria-label": "History", children: dp.map(([d, p]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": s === d, class: s === d ? "on" : "", onClick: () => a(d), children: p }, d)) }),
    /* @__PURE__ */ e("div", { class: "pd-table-wrap", children: t.session ? o === "positions" ? /* @__PURE__ */ e(up, { s: t, onPick: n }) : o === "orders" ? /* @__PURE__ */ e(hp, { s: t, onPick: n }) : o === "twap" ? /* @__PURE__ */ e(mp, { s: t }) : o === "grid" ? /* @__PURE__ */ e(gp, { s: t }) : o === "closed" ? /* @__PURE__ */ e(fp, { s: t }) : o === "ohist" ? /* @__PURE__ */ e(bp, { s: t }) : o === "fills" ? /* @__PURE__ */ e(xp, { s: t }) : o === "funding" ? /* @__PURE__ */ e(vp, { s: t }) : /* @__PURE__ */ e(kp, { s: t }) : /* @__PURE__ */ e("div", { class: "pd-center", children: [
      /* @__PURE__ */ e("span", { class: "muted", children: "No wallet connected" }),
      /* @__PURE__ */ e("button", { class: "pd-btn sm", onClick: () => t.setSheet("connect"), children: "Connect wallet" })
    ] }) })
  ] });
}
function Dn({ sym: t, onPick: n }) {
  const i = t.split("-")[0], r = /* @__PURE__ */ e(U, { children: [
    /* @__PURE__ */ e(_t, { base: i, size: 20 }),
    /* @__PURE__ */ e("b", { children: i })
  ] });
  return n ? /* @__PURE__ */ e("button", { class: "pd-mk", onClick: () => n(t), children: r }) : /* @__PURE__ */ e("span", { class: "pd-mk", children: r });
}
function up({ s: t, onPick: n }) {
  const [i, r] = g(null);
  return t.positions.length ? /* @__PURE__ */ e(U, { children: [
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
        const a = t.bySymbol[s.symbol], o = s.symbol.split("-")[0], c = Number(s.size), d = a?.mark || Number(s.entry_price), p = a?.spec.tickSize, u = mr(s), l = Number(s.upnl), h = yr(t, s.symbol), m = h.find((y) => String(y.type).startsWith("take_profit")), f = h.find((y) => String(y.type).startsWith("stop")), k = h.find((y) => String(y.type).startsWith("trailing"));
        return /* @__PURE__ */ e("tr", { children: [
          /* @__PURE__ */ e("td", { children: /* @__PURE__ */ e("span", { class: "pd-mk", children: [
            /* @__PURE__ */ e("button", { class: "pd-mk", onClick: () => n(s.symbol), children: [
              /* @__PURE__ */ e(_t, { base: o, size: 20 }),
              /* @__PURE__ */ e("b", { children: o })
            ] }),
            /* @__PURE__ */ e("span", { class: `pd-badge ${c > 0 ? "long" : "short"}`, children: [
              c > 0 ? "Long" : "Short",
              " ",
              s.leverage,
              "x ",
              s.margin_mode === "isolated" ? "Iso" : ""
            ] })
          ] }) }),
          /* @__PURE__ */ e("td", { class: "num", children: [
            ue(Math.abs(c)),
            " ",
            o
          ] }),
          /* @__PURE__ */ e("td", { class: "num", children: H(Math.abs(c) * d) }),
          /* @__PURE__ */ e("td", { class: "num", children: K(Number(s.entry_price), p) }),
          /* @__PURE__ */ e("td", { class: "num", children: K(d, p) }),
          /* @__PURE__ */ e("td", { class: `num ${l >= 0 ? "pos" : "neg"}`, children: [
            H(l, { sign: !0 }),
            " (",
            dt(u > 0 ? l / u * 100 : 0, 1),
            ")"
          ] }),
          /* @__PURE__ */ e("td", { class: "num", children: Number(s.liquidation_price) > 0 ? K(Number(s.liquidation_price), p) : "—" }),
          /* @__PURE__ */ e("td", { class: "num", children: H(u) }),
          /* @__PURE__ */ e("td", { class: "num", children: Number(s.accumulated_funding_fees) ? H(Number(s.accumulated_funding_fees), { decimals: 4 }) : "—" }),
          /* @__PURE__ */ e("td", { class: "num", children: /* @__PURE__ */ e("button", { class: "pd-link", onClick: () => r({ kind: "tpsl", p: s }), title: "Edit take profit / stop loss", children: [
            m ? K(Number(m.stop_price), p) : "—",
            " / ",
            f ? K(Number(f.stop_price), p) : "—",
            k ? " · trail" : "",
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
    i?.kind === "close" && /* @__PURE__ */ e(As, { s: t, p: i.p, onClose: () => r(null) }),
    i?.kind === "tpsl" && /* @__PURE__ */ e(Ms, { s: t, p: i.p, onClose: () => r(null) }),
    i?.kind === "trail" && /* @__PURE__ */ e(zs, { s: t, p: i.p, onClose: () => r(null) }),
    i?.kind === "margin" && /* @__PURE__ */ e(Ts, { s: t, p: i.p, onClose: () => r(null) }),
    i?.kind === "reverse" && /* @__PURE__ */ e(Ns, { s: t, p: i.p, onClose: () => r(null) }),
    i?.kind === "closeall" && /* @__PURE__ */ e(op, { s: t, onClose: () => r(null) })
  ] }) : /* @__PURE__ */ e("div", { class: "pd-center muted", children: "No open positions" });
}
function hp({ s: t, onPick: n }) {
  const [i, r] = g(null);
  return t.orders.length ? /* @__PURE__ */ e(U, { children: [
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
            sn(Number(s.create_timestamp)),
            " ",
            an(Number(s.create_timestamp))
          ] }),
          /* @__PURE__ */ e("td", { children: /* @__PURE__ */ e(Dn, { sym: s.symbol, onPick: n }) }),
          /* @__PURE__ */ e("td", { children: [
            String(s.type).replace(/_/g, " "),
            s.reduce_only ? " · reduce only" : ""
          ] }),
          /* @__PURE__ */ e("td", { class: s.side === "buy" ? "pos" : "neg", children: s.side === "buy" ? "Buy" : "Sell" }),
          /* @__PURE__ */ e("td", { class: "num", children: ue(Number(s.size)) }),
          /* @__PURE__ */ e("td", { class: "num", children: Number(s.price) ? K(Number(s.price), a) : "Market" }),
          /* @__PURE__ */ e("td", { class: "num", children: Number(s.stop_price) ? K(Number(s.stop_price), a) : "—" }),
          /* @__PURE__ */ e("td", { class: "num", children: ue(Number(s.filled) || 0) }),
          /* @__PURE__ */ e("td", { class: "act", children: [
            o && /* @__PURE__ */ e("button", { class: "pd-btn sm", onClick: () => r(s), children: "Edit" }),
            /* @__PURE__ */ e("button", { class: "pd-btn sm", onClick: () => t.cancelOrder(s), children: "Cancel" })
          ] })
        ] }, s.id);
      }) })
    ] }),
    i && /* @__PURE__ */ e(Wo, { s: t, o: i, onClose: () => r(null) })
  ] }) : /* @__PURE__ */ e("div", { class: "pd-center muted", children: "No open orders" });
}
function ri(t, n, i = 0) {
  const [r, s] = g(null), [a, o] = g(0);
  return Z(() => {
    let c = !0;
    const d = () => t().then((u) => c && s(u)).catch(() => c && s((u) => u ?? []));
    d();
    const p = i ? setInterval(() => !At() && d(), i) : void 0;
    return () => {
      c = !1, p && clearInterval(p);
    };
  }, [...n, a]), [r, () => o(a + 1)];
}
const On = () => /* @__PURE__ */ e("div", { class: "pd-center", children: /* @__PURE__ */ e(Qe, {}) });
function mp({ s: t }) {
  const [n, i] = ri(() => t.client.trading.twaps("all"), [t.session?.accountId], 5e3);
  return n === null ? /* @__PURE__ */ e(On, {}) : n.length ? /* @__PURE__ */ e("table", { class: "pd-table", children: [
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
      /* @__PURE__ */ e("td", { class: "muted num", children: r.createdAt ? `${sn(r.createdAt)} ${an(r.createdAt)}` : "—" }),
      /* @__PURE__ */ e("td", { children: /* @__PURE__ */ e(Dn, { sym: r.symbol }) }),
      /* @__PURE__ */ e("td", { class: r.side === "buy" ? "pos" : "neg", children: r.side === "buy" ? "Buy" : "Sell" }),
      /* @__PURE__ */ e("td", { class: "num", children: [
        ue(r.filledSize ?? 0),
        " / ",
        ue(r.totalSize ?? 0)
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
function gp({ s: t }) {
  const [n, i] = ri(() => t.client.trading.grids(), [t.session?.accountId], 8e3);
  return n === null ? /* @__PURE__ */ e(On, {}) : n.length ? /* @__PURE__ */ e("table", { class: "pd-table", children: [
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
        /* @__PURE__ */ e("td", { class: "muted num", children: r.createdAt ? `${sn(r.createdAt)} ${an(r.createdAt)}` : "—" }),
        /* @__PURE__ */ e("td", { children: /* @__PURE__ */ e(Dn, { sym: r.symbol }) }),
        /* @__PURE__ */ e("td", { children: r.mode.toLowerCase() }),
        /* @__PURE__ */ e("td", { class: "num", children: [
          r.lower ? K(r.lower, s) : "—",
          " – ",
          r.upper ? K(r.upper, s) : "—"
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
function fp({ s: t }) {
  const [n] = ri(() => t.client.account.closedPositionsPage({ limit: 25 }).then((i) => i.items), [t.session?.accountId, t.positions.length]);
  return n === null ? /* @__PURE__ */ e(On, {}) : n.length ? /* @__PURE__ */ e("table", { class: "pd-table", children: [
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
          sn(i.closeTime),
          " ",
          an(i.closeTime)
        ] }),
        /* @__PURE__ */ e("td", { children: /* @__PURE__ */ e(Dn, { sym: i.symbol }) }),
        /* @__PURE__ */ e("td", { children: i.marginMode || "—" }),
        /* @__PURE__ */ e("td", { class: "num", children: r === null ? "—" : r >= 1440 ? `${Math.floor(r / 1440)}d` : r >= 60 ? `${Math.floor(r / 60)}h ${r % 60}m` : `${r}m` }),
        /* @__PURE__ */ e("td", { class: `num ${(i.realizedPnl ?? 0) > 0 ? "pos" : (i.realizedPnl ?? 0) < 0 ? "neg" : ""}`, children: i.realizedPnl === null ? "—" : H(i.realizedPnl, { sign: !0 }) })
      ] }, i.id);
    }) })
  ] }) : /* @__PURE__ */ e("div", { class: "pd-center muted", children: "No closed positions yet." });
}
function bp({ s: t }) {
  const [n] = ri(() => t.client.account.orderHistoryPage({ limit: 50 }).then((i) => i.items), [t.session?.accountId, t.orders.length, t.positions.length]);
  return n === null ? /* @__PURE__ */ e(On, {}) : n.length ? /* @__PURE__ */ e("table", { class: "pd-table", children: [
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
        sn(Number(i.create_timestamp)),
        " ",
        an(Number(i.create_timestamp))
      ] }),
      /* @__PURE__ */ e("td", { children: /* @__PURE__ */ e(Dn, { sym: i.symbol }) }),
      /* @__PURE__ */ e("td", { children: [
        String(i.type).replace(/_/g, " "),
        i.reduce_only ? " · reduce only" : ""
      ] }),
      /* @__PURE__ */ e("td", { class: i.side === "buy" ? "pos" : "neg", children: i.side === "buy" ? "Buy" : "Sell" }),
      /* @__PURE__ */ e("td", { class: "num", children: ue(Number(i.size)) }),
      /* @__PURE__ */ e("td", { class: "num", children: ue(Number(i.filled) || 0) }),
      /* @__PURE__ */ e("td", { class: "num", children: Number(i.price) ? K(Number(i.price), t.bySymbol[i.symbol]?.spec.tickSize) : Number(i.stop_price) ? `@${K(Number(i.stop_price), t.bySymbol[i.symbol]?.spec.tickSize)}` : "Market" }),
      /* @__PURE__ */ e("td", { class: i.status === "rejected" ? "neg" : "muted", children: i.status })
    ] }, i.id)) })
  ] }) : /* @__PURE__ */ e("div", { class: "pd-center muted", children: "No orders yet." });
}
function xp({ s: t }) {
  const [n] = ri(() => t.client.account.fillsPage({ limit: 50 }).then((i) => i.items), [t.session?.accountId, t.positions.length]);
  return n === null ? /* @__PURE__ */ e(On, {}) : n.length ? /* @__PURE__ */ e("table", { class: "pd-table", children: [
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
        sn(i.time),
        " ",
        an(i.time)
      ] }),
      /* @__PURE__ */ e("td", { children: /* @__PURE__ */ e(Dn, { sym: i.symbol }) }),
      /* @__PURE__ */ e("td", { class: i.side === "buy" ? "pos" : "neg", children: ds(i.side, i.realizedPnl) || "—" }),
      /* @__PURE__ */ e("td", { class: "num", children: i.price === null ? "—" : K(i.price, t.bySymbol[i.symbol]?.spec.tickSize) }),
      /* @__PURE__ */ e("td", { class: "num", children: i.size === null ? "—" : ue(i.size) }),
      /* @__PURE__ */ e("td", { class: "num", children: i.fee === null ? "—" : H(i.fee, { decimals: 4 }) }),
      /* @__PURE__ */ e("td", { class: `num ${(i.realizedPnl ?? 0) > 0 ? "pos" : (i.realizedPnl ?? 0) < 0 ? "neg" : "muted"}`, children: i.realizedPnl ? H(i.realizedPnl, { sign: !0 }) : "—" })
    ] }, i.id)) })
  ] }) : /* @__PURE__ */ e("div", { class: "pd-center muted", children: "Your trades will appear here after your first order." });
}
function vp({ s: t }) {
  const [n] = ri(() => t.client.account.fundingPage({ limit: 50 }).then((i) => i.items), [t.session?.accountId]);
  return n === null ? /* @__PURE__ */ e(On, {}) : n.length ? /* @__PURE__ */ e("table", { class: "pd-table", children: [
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
        sn(i.time),
        " ",
        an(i.time)
      ] }),
      /* @__PURE__ */ e("td", { children: /* @__PURE__ */ e(Dn, { sym: i.symbol }) }),
      /* @__PURE__ */ e("td", { children: i.positionSide }),
      /* @__PURE__ */ e("td", { class: "num", children: i.positionSize === null ? "—" : ue(i.positionSize) }),
      /* @__PURE__ */ e("td", { class: "num", children: i.rate === null ? "—" : `${(i.rate * 100).toFixed(4)}%` }),
      /* @__PURE__ */ e("td", { class: `num ${(i.amount ?? 0) > 0 ? "pos" : (i.amount ?? 0) < 0 ? "neg" : ""}`, children: i.amount === null ? "—" : H(i.amount, { sign: !0, decimals: 4 }) })
    ] }, i.id)) })
  ] }) : /* @__PURE__ */ e("div", { class: "pd-center muted", children: "No funding payments yet. They happen every hour while a position is open." });
}
function kp({ s: t }) {
  const { items: n, error: i } = Ps(t), r = (n ?? []).filter((s) => s.id.startsWith("t"));
  return n === null ? /* @__PURE__ */ e(On, {}) : i ? /* @__PURE__ */ e("div", { class: "pd-center muted", children: i }) : r.length ? /* @__PURE__ */ e("table", { class: "pd-table", children: [
    /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ e("tr", { children: [
      /* @__PURE__ */ e("th", { children: "Time" }),
      /* @__PURE__ */ e("th", { children: "Activity" }),
      /* @__PURE__ */ e("th", { children: "Status" }),
      /* @__PURE__ */ e("th", { children: "Amount" })
    ] }) }),
    /* @__PURE__ */ e("tbody", { children: r.map((s) => /* @__PURE__ */ e("tr", { children: [
      /* @__PURE__ */ e("td", { class: "muted num", children: [
        sn(s.time),
        " ",
        an(s.time)
      ] }),
      /* @__PURE__ */ e("td", { children: s.title }),
      /* @__PURE__ */ e("td", { class: "muted", children: /Pending/.test(s.sub) ? "Pending" : /Failed/.test(s.sub) ? "Failed" : "Completed" }),
      /* @__PURE__ */ e("td", { class: `num ${s.cls}`, children: s.amount })
    ] }, s.id)) })
  ] }) : /* @__PURE__ */ e("div", { class: "pd-center muted", children: "No deposits or withdrawals yet." });
}
const ni = [
  { type: "market", label: "Market", desc: "Fills right away, near the market price" },
  { type: "limit", label: "Limit", desc: "Fills only at your price or better" },
  { type: "stop", label: "Stop Market", desc: "Market order once the price reaches your trigger", advanced: !0 },
  { type: "stop_limit", label: "Stop Limit", desc: "Limit order once the price reaches your trigger", advanced: !0 },
  { type: "take_profit", label: "Take Profit Market", desc: "Market order once the price reaches your target", advanced: !0 },
  { type: "take_profit_limit", label: "Take Profit Limit", desc: "Limit order once the price reaches your target", advanced: !0 },
  { type: "trailing_stop_market", label: "Trailing Stop", desc: "Follows the price and triggers when it turns by your trail %", advanced: !0 },
  { type: "twap", label: "TWAP", desc: "Splits the order into slices over 5 min – 24 h", advanced: !0 }
];
function yp(t, n) {
  return nn(t.type) && t.limitPrice > 0 ? t.limitPrice : (t.type === "stop" || t.type === "take_profit") && Number(t.triggerPrice) > 0 ? Number(t.triggerPrice) : t.type === "trailing_stop_market" && Number(t.activationPrice) > 0 ? Number(t.activationPrice) : n;
}
function wp(t, n) {
  const i = t.type;
  return {
    symbol: t.symbol,
    side: t.side,
    type: i,
    size: n.size,
    price: nn(i) ? t.limitPrice : void 0,
    stopPrice: i === "stop" || i === "stop_limit" || i === "take_profit" || i === "take_profit_limit" ? t.triggerPrice : void 0,
    workingType: t.workingType,
    timeInForce: nn(i) ? t.tif : void 0,
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
const _p = (t) => Math.ceil(t * 100 - 1e-9) / 100, Sp = (t) => Math.floor(t * 100 + 1e-9) / 100;
function Ka(t, n, i, r) {
  const s = r / 100 / Math.max(1, i);
  return t === "buy" ? n * (1 + s) : n * (1 - s);
}
function vn(t, n, i, r) {
  if (!(n > 0) || !(r > 0)) return 0;
  const s = (r - n) / n;
  return (t === "buy" ? s : -s) * Math.max(1, i) * 100;
}
function Ls(t, n, i) {
  const r = t.spec;
  if (!r || !(t.available > 0)) return 0;
  const s = t.takerRate + t.feeBps / 1e4;
  let a = Math.max(1, n), o = 0;
  for (let c = 0; c < 4; c++)
    o = t.available * i / (1 + a * s), a = Math.max(1, Math.min(n, Yn(r.marginTiers, o * a)));
  return Sp(o * 0.998);
}
function Es(t, n) {
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
  const a = yp(t, n.mark), o = t.type === "twap" || _o(t.type) ? i.marketStepSize ?? i.stepSize : i.stepSize, c = Math.max(1, Math.round(t.leverage)), d = t.unit === "usd" ? t.amount * c : t.amount * a, p = Yn(i.marginTiers, Math.max(d, 1)), u = Math.max(1, Math.min(n.maxLeverage, i.maxLeverage, p)), l = Math.min(c, u), h = t.unit === "usd" ? t.amount * l : t.amount * a, m = Number(me(h / a, o, "floor")), f = o > 0 && m * a < i.minNotional && h >= i.minNotional ? Number(me(m + o, o, "floor")) : m, k = f * a, y = es({ side: t.side, price: a, notional: k || 1, leverage: l, takerRate: n.takerRate, builderFeeBps: n.feeBps, tiers: i.marginTiers }), _ = k / l, w = k * r, T = _p(i.minNotional / l), $ = Ls(n, l, 1), v = t.type === "market" || t.type === "limit", C = v && t.tp > 0 ? t.autoMode === "pnl" ? Ka(t.side, a, l, t.tp) : t.tp : 0, S = v && t.sl > 0 ? t.autoMode === "pnl" ? Ka(t.side, a, l, -t.sl) : t.sl : 0, q = { ...s, px: a, lev: l, levCap: u, size: f, notional: k, margin: _, fee: w, liq: y.liquidationPrice, liqDistance: y.liquidationDistance, minMargin: T, maxMargin: $, tpPrice: C, slPrice: S, step: o }, x = (N, R) => ({ ...q, problem: N, kind: R });
  if (!(t.amount > 0)) return x("Enter an amount", "empty");
  const z = t.reduceOnly || t.type === "trailing_stop_market";
  if (t.type === "trailing_stop_market" && n.position !== void 0) {
    const N = n.position;
    if (!N) return x("A trailing stop closes or reduces an open position. Open one first.", "price");
    if (N > 0 == (t.side === "buy")) return x(`A trailing stop protects your ${N > 0 ? "long" : "short"}: switch to ${N > 0 ? "Short/Sell" : "Long/Buy"}.`, "price");
    if (f > Math.abs(N) + 1e-12) return x("A trailing stop can't be larger than your position", "price");
  }
  if (t.type === "limit") {
    if (!(t.limitPrice > 0)) return x("Enter a limit price", "price");
    if (Math.abs(t.limitPrice - n.mark) / n.mark > n.limitBound) return x(`Limit price must be within ${(n.limitBound * 100).toFixed(0)}% of the current price`, "price");
  }
  if (t.type !== "market" && t.type !== "limit" && t.type !== "twap") {
    const N = _i({ side: t.side, type: t.type, stopPrice: t.triggerPrice, price: t.limitPrice, mark: n.mark, last: n.last, workingType: t.workingType, priceBound: n.limitBound, tickSize: i.tickSize, callbackRate: t.callbackRate, activationPrice: Number(t.activationPrice) > 0 ? t.activationPrice : void 0 });
    if (N) return x(N, "price");
  }
  if (t.type === "twap") {
    const N = (t.twapMinutes ?? 0) * 60;
    if (!(N >= yi && N <= wi)) return x("Duration must be 5 – 1440 minutes", "price");
    const R = vs(i, f, N, a);
    if (t.amount > 0 && R.perOrder < R.minPerOrder - 1e-12)
      return x(`Too small for ${t.twapMinutes} min: at least ${Number(R.minTotal.toPrecision(6))} ${i.baseAsset} (≈ $${Math.ceil(R.minTotal * a).toLocaleString("en-US")})`, "min");
    if (Number(t.twapLimit) > 0 && Math.abs(Number(t.twapLimit) - n.mark) / n.mark > n.limitBound) return x(`Limit price must be within ${(n.limitBound * 100).toFixed(0)}% of the current price`, "price");
  }
  return !z && k < i.minNotional ? x(t.unit === "usd" ? `Minimum margin: $${T.toFixed(2)}` : `Minimum order: $${i.minNotional.toFixed(0)}`, "min") : !z && _ + w > n.available * 1.0001 ? x("Insufficient funds", "funds") : C && (t.side === "buy" ? C <= a : C >= a) ? x("Take profit must be above entry for a long, below for a short", "tpsl") : S && (t.side === "buy" ? S >= a : S <= a) ? x("Stop loss must be below entry for a long, above for a short", "tpsl") : S && y.liquidationPrice > 0 && (t.side === "buy" ? S <= y.liquidationPrice : S >= y.liquidationPrice) ? x("Stop loss is past the liquidation price, so it would never trigger", "tpsl") : { ...q, ok: !0 };
}
const Yr = (t) => t.replace(/,/g, ".").replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1"), $p = (t, n) => Number.isFinite(t) && t > 0 ? K(t, n).replace(/[$,]/g, "") : "";
function Cp({ m: t }) {
  const n = t.spec.tickSize, [i, r] = g("pnl"), [s, a] = g("buy"), [o, c] = g(Math.max(1, Math.min(t.maxLev, t.spec.defaultLeverage || 10))), [d, p] = g($p(t.mark, n)), [u, l] = g(""), [h, m] = g(""), [f, k] = g(!0), [y, _] = g(""), w = Number(d), T = Number(h), $ = w > 0 && T > 0 ? f ? T : T * w : 0, v = $ > 0 ? $ / w : 0, C = $ > 0 ? $ / o : 0, S = s === "buy" ? 1 : -1, q = Number(u), x = v > 0 && q > 0 ? v * (q - w) * S : NaN, z = C > 0 && Number.isFinite(x) ? x / C * 100 : NaN, N = $ > 0 ? po({ side: s, entry: w, leverage: o, notional: $, tiers: t.spec.marginTiers }) : NaN, R = Number(y), oe = w > 0 && y !== "" && Number.isFinite(R) ? w * (1 + S * R / 100 / o) : NaN, M = $ > 0 ? Number(Yn(t.spec.marginTiers, $)) : t.maxLev, I = (W) => c((P) => Math.max(1, Math.min(t.maxLev, P + W))), F = (W, P, A = "") => /* @__PURE__ */ e("div", { class: "calc-r", children: [
    /* @__PURE__ */ e("span", { children: W }),
    /* @__PURE__ */ e("b", { class: `num ${A}`, children: P })
  ] });
  return /* @__PURE__ */ e("div", { class: "calc", children: [
    /* @__PURE__ */ e("div", { class: "pd-tabs left calc-tabs", role: "tablist", children: [
      ["pnl", "PnL"],
      ["liq", "Liquidation Price"],
      ["target", "Target Price"]
    ].map(([W, P]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": i === W, class: i === W ? "on" : "", onClick: () => r(W), children: P }, W)) }),
    /* @__PURE__ */ e("div", { class: "calc-body", children: [
      /* @__PURE__ */ e("div", { class: "calc-in", children: [
        /* @__PURE__ */ e("div", { class: "pd-seg2", role: "radiogroup", "aria-label": "Side", children: [
          /* @__PURE__ */ e("button", { role: "radio", "aria-checked": s === "buy", class: s === "buy" ? "on long" : "", onClick: () => a("buy"), children: "Long/Buy" }),
          /* @__PURE__ */ e("button", { role: "radio", "aria-checked": s === "sell", class: s === "sell" ? "on short" : "", onClick: () => a("sell"), children: "Short/Sell" })
        ] }),
        /* @__PURE__ */ e("span", { class: "calc-l", children: "Leverage" }),
        /* @__PURE__ */ e("div", { class: "calc-lev", children: [
          /* @__PURE__ */ e("button", { "aria-label": "Less leverage", onClick: () => I(-1), children: /* @__PURE__ */ e(Y, { n: "minus", size: 16 }) }),
          /* @__PURE__ */ e("b", { class: "num", children: [
            o,
            "x"
          ] }),
          /* @__PURE__ */ e("button", { "aria-label": "More leverage", onClick: () => I(1), children: /* @__PURE__ */ e(Y, { n: "plus", size: 16 }) })
        ] }),
        /* @__PURE__ */ e(Pi, { min: 1, max: t.maxLev, value: o, onChange: c, label: "Leverage", marks: [1, Math.round(t.maxLev / 4), Math.round(t.maxLev / 2), Math.round(t.maxLev * 3 / 4), t.maxLev].filter((W, P, A) => W >= 1 && A.indexOf(W) === P) }),
        /* @__PURE__ */ e("div", { class: "calc-ends", children: [
          /* @__PURE__ */ e("span", { children: "1x" }),
          /* @__PURE__ */ e("span", { children: [
            t.maxLev,
            "x"
          ] })
        ] }),
        /* @__PURE__ */ e("span", { class: "calc-l", children: "Entry Price" }),
        /* @__PURE__ */ e("label", { class: "pd-input", children: [
          /* @__PURE__ */ e("input", { inputMode: "decimal", value: d, onInput: (W) => p(Yr(W.target.value)), "aria-label": "Entry price" }),
          /* @__PURE__ */ e("span", { class: "suf", children: "USD" })
        ] }),
        i === "pnl" && /* @__PURE__ */ e(U, { children: [
          /* @__PURE__ */ e("span", { class: "calc-l", children: "Exit Price" }),
          /* @__PURE__ */ e("label", { class: "pd-input", children: [
            /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: "0", value: u, onInput: (W) => l(Yr(W.target.value)), "aria-label": "Exit price" }),
            /* @__PURE__ */ e("span", { class: "suf", children: "USD" })
          ] })
        ] }),
        i !== "target" ? /* @__PURE__ */ e(U, { children: [
          /* @__PURE__ */ e("span", { class: "calc-l", children: "Amount" }),
          /* @__PURE__ */ e("label", { class: "pd-input", children: [
            /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: "0", value: h, onInput: (W) => m(Yr(W.target.value)), "aria-label": `Amount in ${f ? "USD" : t.base}` }),
            /* @__PURE__ */ e("button", { class: "suf unit", onClick: (W) => (W.preventDefault(), k(!f), m("")), "aria-label": "Switch unit", children: [
              f ? "USD" : t.base,
              " ",
              /* @__PURE__ */ e(Y, { n: "swap", size: 12 })
            ] })
          ] })
        ] }) : /* @__PURE__ */ e(U, { children: [
          /* @__PURE__ */ e("span", { class: "calc-l", children: "ROI" }),
          /* @__PURE__ */ e("label", { class: "pd-input", children: [
            /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: "0", value: y, onInput: (W) => _(W.target.value.replace(/[^0-9.\-]/g, "")), "aria-label": "Return on margin, percent" }),
            /* @__PURE__ */ e("span", { class: "suf", children: "%" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { class: "calc-out", children: [
        /* @__PURE__ */ e("b", { class: "calc-h", children: "Results" }),
        i === "pnl" && /* @__PURE__ */ e(U, { children: [
          F("Margin", C > 0 ? H(C) : "—"),
          F("Est. PnL", Number.isFinite(x) ? H(x, { sign: !0 }) : "—", Number.isFinite(x) ? x >= 0 ? "pos" : "neg" : ""),
          F("PnL%", Number.isFinite(z) ? `${z > 0 ? "+" : ""}${z.toFixed(2)}%` : "—", Number.isFinite(z) ? z >= 0 ? "pos" : "neg" : ""),
          F("Size", v > 0 ? `${ue(v)} ${t.base}` : "—")
        ] }),
        i === "liq" && /* @__PURE__ */ e(U, { children: [
          F("Est. Liquidation Price", Number.isFinite(N) && N > 0 ? K(N, n) : "—"),
          F("Margin", C > 0 ? H(C) : "—"),
          F("Size", v > 0 ? `${ue(v)} ${t.base}` : "—")
        ] }),
        i === "target" && F("Target Price", Number.isFinite(oe) && oe > 0 ? K(oe, n) : "—"),
        $ > 0 && o > M && i !== "target" && /* @__PURE__ */ e("p", { class: "calc-warn", children: [
          "Strike allows up to ",
          M,
          "x for a position this size."
        ] }),
        /* @__PURE__ */ e("p", { class: "calc-note", children: i === "liq" ? "Estimate for an isolated position. With cross margin your whole balance backs it, so liquidation is usually further away." : "Estimate before fees and funding." })
      ] })
    ] })
  ] });
}
function Mp({ s: t, m: n, onBack: i }) {
  const [r, s] = g("NEUTRAL"), [a, o] = g(""), [c, d] = g(""), [p, u] = g("10"), [l, h] = g(""), [m, f] = g(2), [k, y] = g(""), [_, w] = g(""), [T, $] = g(""), [v, C] = g(!1), S = n?.spec.tickSize ?? 1e-4;
  if (Z(() => {
    n?.mark && (o(me(n.mark * 0.95, S)), d(me(n.mark * 1.05, S)));
  }, [n?.symbol, !!n?.mark]), !n) return /* @__PURE__ */ e("div", { class: "pd-center muted", children: "Loading market…" });
  const q = Math.max(1, Math.min(t.config.maxLeverage, n.spec.maxLeverage)), x = {
    symbol: n.symbol,
    mode: r,
    lower: Number(a) || 0,
    upper: Number(c) || 0,
    grids: Math.round(Number(p) || 0),
    collateral: Number(l) || 0,
    sl: r !== "NEUTRAL" && Number(k) > 0 ? Number(k) : void 0,
    longSl: r === "NEUTRAL" && Number(_) > 0 ? Number(_) : void 0,
    shortSl: r === "NEUTRAL" && Number(T) > 0 ? Number(T) : void 0
  }, z = x.grids > 0 ? x.collateral * m / x.grids : 0, N = x.grids > 1 && x.lower > 0 ? (x.upper - x.lower) / (x.grids - 1) / x.lower * 100 : 0, R = t.session ? Co(x, n.mark) ?? (x.collateral > t.available ? "More than your available balance" : z > 0 && z < n.spec.minNotional ? `Each level needs at least ${H(n.spec.minNotional, { decimals: 0 })}: add collateral, leverage or fewer grids` : null) : null, oe = async () => {
    if (!R) {
      C(!0), t.notify("progress", `Starting a ${r.toLowerCase()} grid on ${n.base}`);
      try {
        const I = await t.client.startGrid({ ...x, leverage: m });
        t.notify("ok", "Grid bot started", `Bot ${I.id.slice(0, 8)}… · ${x.grids} levels from ${K(x.lower, S)} to ${K(x.upper, S)}. Find it under Grid below.`), h(""), t.refresh();
      } catch (I) {
        t.notify("err", "Grid not started", I?.message || String(I));
      } finally {
        C(!1);
      }
    }
  }, M = (I, F, W, P, A) => /* @__PURE__ */ e("label", { class: "pd-input", children: [
    /* @__PURE__ */ e("span", { class: "pre", children: I }),
    /* @__PURE__ */ e("input", { inputMode: "decimal", value: F, onInput: (O) => W(Ce(O)), "aria-label": P }),
    A && /* @__PURE__ */ e("span", { class: "suf muted", children: A })
  ] });
  return /* @__PURE__ */ e(U, { children: [
    /* @__PURE__ */ e("div", { class: "pd-form", children: [
      /* @__PURE__ */ e("div", { class: "pd-kv", children: [
        /* @__PURE__ */ e("button", { class: "pd-link", onClick: i, children: [
          /* @__PURE__ */ e(Y, { n: "back", size: 12 }),
          " Order types"
        ] }),
        /* @__PURE__ */ e("b", { children: "Grid bot" })
      ] }),
      /* @__PURE__ */ e("div", { class: "pd-tif wide", role: "radiogroup", "aria-label": "Grid mode", children: ["LONG", "NEUTRAL", "SHORT"].map((I) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": r === I, class: r === I ? "on" : "", onClick: () => s(I), children: I === "LONG" ? "Long" : I === "SHORT" ? "Short" : "Neutral" }, I)) }),
      /* @__PURE__ */ e("div", { class: "pd-hint", children: r === "LONG" ? "Places buy entries in the range and sells each one level higher." : r === "SHORT" ? "Places sell entries in the range and buys each back one level lower." : "Places both sides around the current price and trades the range." }),
      M("Lower", a, o, "Lower price"),
      M("Upper", c, d, "Upper price"),
      M("Grids", p, u, "Number of grid levels", "2–200"),
      M("Collateral", l, h, "Collateral in USD", "USD"),
      /* @__PURE__ */ e("div", { class: "pd-lbl", children: "Leverage" }),
      /* @__PURE__ */ e("div", { class: "pd-sl", children: [
        /* @__PURE__ */ e(Pi, { min: 1, max: q, value: Math.min(m, q), onChange: f, label: "Grid leverage", marks: [1, q] }),
        /* @__PURE__ */ e("span", { class: "pd-box static", children: [
          m,
          "x"
        ] })
      ] }),
      r === "NEUTRAL" ? /* @__PURE__ */ e(U, { children: [
        M("Long SL", _, w, "Long stop-loss (optional)"),
        M("Short SL", T, $, "Short stop-loss (optional)")
      ] }) : M("Stop loss", k, y, "Stop-loss (optional)"),
      /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
        /* @__PURE__ */ e("span", { children: "Per level" }),
        /* @__PURE__ */ e("span", { class: "num", children: z > 0 ? H(z) : "—" })
      ] }),
      /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
        /* @__PURE__ */ e("span", { children: "Grid step" }),
        /* @__PURE__ */ e("span", { class: "num", children: N > 0 ? `${N.toFixed(2)}%` : "—" })
      ] }),
      /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
        /* @__PURE__ */ e("span", { children: "Current price" }),
        /* @__PURE__ */ e("span", { class: "num", children: K(n.mark, S) })
      ] })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-order-foot", children: [
      R && /* @__PURE__ */ e("div", { class: "pd-warn", children: R }),
      t.session ? /* @__PURE__ */ e("button", { class: "pd-cta", disabled: !!R || v || !(x.collateral > 0), onClick: oe, children: v ? /* @__PURE__ */ e(Qe, { size: 16 }) : `Start ${r.toLowerCase()} grid` }) : /* @__PURE__ */ e("button", { class: "pd-cta", onClick: () => t.setSheet("connect"), children: "Connect wallet" })
    ] })
  ] });
}
const zp = 0.02, Tp = [5, 15, 60, 240], Np = [0.5, 1, 2, 5];
function jo({ s: t, m: n, book: i, side: r, setSide: s, limitPick: a }) {
  const o = n?.symbol ?? "", c = n ? t.client.raw(o) : void 0, [d, p] = g("market"), u = d === "grid" ? "market" : d, [l, h] = g(!1), [m, f] = g("usd"), [k, y] = g(""), [_, w] = g(() => Math.max(1, Number(dn("default-leverage")) || 3)), [T, $] = g(""), [v, C] = g(""), [S, q] = g("mark_price"), [x, z] = g("GTC"), [N, R] = g(!1), [oe, M] = g(!1), [I, F] = g("1"), [W, P] = g(""), [A, O] = g(""), [J, le] = g(!1), [Me, Le] = g(60), [pt, ke] = g(""), [G, X] = g(!1), [xe, Re] = g(!1), [Ee, st] = g("price"), [ft, ut] = g(""), [ze, Pt] = g(!1), [pn, et] = g(""), [St, Bt] = g(""), [L, B] = g(!1), [Q, ae] = g(!1);
  Z(() => {
    t.config.amount && t.config.amount > 0 && (f("usd"), y(String(Math.round(t.config.amount * 100) / 100)));
  }, [t.config.amount]), Z(() => {
    t.config.leverage && t.config.leverage >= 1 && w(t.config.leverage);
  }, [t.config.leverage]);
  const te = Number(t.account?.symbol_settings?.[o]?.leverage) || 0;
  Z(() => {
    te >= 1 && !t.config.leverage && w(te);
  }, [o, te]), Z(() => ($(""), C(""), P(""), ke(""), ut(""), et(""), Bt("")), [o]), Z(() => {
    !a || !n || ((d === "market" || d === "grid" || d === "trailing_stop_market" || d === "stop" || d === "take_profit") && p("limit"), d === "twap" ? ke(me(a.p, n.spec.tickSize)) : $(me(a.p, n.spec.tickSize)));
  }, [a?.n]), Z(() => {
    if (!St) return;
    const E = setTimeout(() => Bt(""), 15e3);
    return () => clearTimeout(E);
  }, [St]);
  const D = {
    spec: n?.spec,
    mark: n?.mark ?? 0,
    last: n?.last ?? 0,
    available: t.available,
    takerRate: t.takerRate,
    feeBps: t.client.orderFeeBps,
    maxLeverage: t.config.maxLeverage,
    limitBound: Number(c?.order_limit_price_bound) || 0.05,
    position: t.session ? Number(t.positions.find((E) => E.symbol === o)?.size) || 0 : void 0
  }, ie = u === "market" || u === "limit", de = {
    symbol: o,
    side: r,
    type: u,
    amount: Number(k) || 0,
    unit: m,
    leverage: _,
    limitPrice: Number(T) || 0,
    tp: xe && ie && Number(ft) || 0,
    sl: xe && ie && Number(pn) || 0,
    autoMode: Ee,
    triggerPrice: Number(v) || 0,
    workingType: S,
    tif: x,
    postOnly: N,
    reduceOnly: oe,
    callbackRate: Number(I) || 0,
    activationPrice: Number(W) || 0,
    slippage: Number(A) > 0 ? Number(A) / 100 : 0,
    twapMinutes: Me,
    twapLimit: Number(pt) || 0,
    randomize: G
  }, V = Es(de, D), Pe = oe || u === "trailing_stop_market", ge = n?.base ?? "", he = n?.spec.tickSize, Ge = n ? Math.max(1, Math.min(t.config.maxLeverage, n.spec.maxLeverage)) : 1, Xe = V.maxMargin > 0 ? Math.min(100, V.margin / V.maxMargin * 100) : 0, Ze = Number(c?.order_market_price_bound) || D.limitBound, $t = u === "market", ye = $t && i && V.size > 0 ? gr(i, r, V.size, { mark: D.mark, bound: Number(A) > 0 ? Math.min(Number(A) / 100, Ze) : Ze }) : null, wn = $t && V.size > 0 && i === null, Ct = $t && V.size > 0 && !!i && !(r === "buy" ? i.asks.length : i.bids.length), _n = !!ye && (ye.slippage > zp || !ye.complete || ye.beyondBand) || wn || Ct, Lt = `k|${o}|${r}|${V.size}|${ye ? ye.complete ? Math.ceil(ye.slippage * 200) : "p" : wn ? "n" : "e"}`, ht = xs(t.account, o) ?? "cross", Di = t.positions.some((E) => E.symbol === o) || t.orders.some((E) => E.symbol === o), Bn = !!t.session && t.available > 0 && !!n, Rn = (E) => {
    if (E <= 0) return y("");
    const bt = Ls(D, V.lev, E / 100);
    bt > 0 && y(m === "usd" ? bt.toFixed(2) : me(bt * V.lev / (V.px || D.mark), n.spec.stepSize, "floor"));
  }, Oi = () => {
    k && V.size > 0 && y(m === "usd" ? String(V.size) : V.margin.toFixed(2)), f(m === "usd" ? "base" : "usd");
  }, Bi = async () => {
    if (n) {
      ae(!0);
      try {
        await t.client.setMarginMode(o, ht === "cross" ? "isolated" : "cross"), t.notify("ok", `${o} now uses ${ht === "cross" ? "isolated" : "cross"} margin`), t.refresh();
      } catch (E) {
        t.notify("err", "Margin mode", E?.message || String(E));
      } finally {
        ae(!1);
      }
    }
  }, Et = async () => {
    if (!n || !V.ok) return;
    if (_n && St !== Lt) return Bt(Lt);
    B(!0), Bt("");
    const E = await t.placeDraft(de, V, ge, ye && ye.complete && !ye.beyondBand ? ye.avgPrice : void 0);
    B(!1), E !== "failed" && (y(""), ut(""), et(""));
  }, Ri = d === "grid" ? "Grid bot" : ni.find((E) => E.type === d)?.label ?? "Market", Mt = r === "buy" ? "Long" : "Short", wr = (() => {
    if (!t.session) return /* @__PURE__ */ e("button", { class: "pd-cta", onClick: () => t.setSheet("connect"), children: "Connect wallet" });
    if (t.accountLoaded && t.available <= 0 && !Pe) return /* @__PURE__ */ e("button", { class: "pd-cta", onClick: () => t.openFunds("deposit"), children: "Deposit to trade" });
    if (V.ok && _n && St === Lt && !L)
      return /* @__PURE__ */ e("button", { class: "pd-cta caution", onClick: Et, children: wn ? "Confirm: slippage unknown" : ye && !ye.complete ? "Confirm: the book can't fill it all" : `Confirm: est. slippage ${((ye?.slippage ?? 0) * 100).toFixed(2)}%` });
    const E = u === "market" ? `${Mt} ${ge}` : u === "limit" ? `${Mt} ${ge} @ ${K(V.px, he)}` : u === "twap" ? `Start TWAP · ${Mt} ${ge}` : `Place ${Ri} · ${Mt}`;
    return /* @__PURE__ */ e("button", { class: `pd-cta ${r === "buy" ? "long" : "short"}`, disabled: !V.ok || L, onClick: Et, children: L ? /* @__PURE__ */ e(Qe, { size: 16 }) : V.kind === "empty" || V.kind === "load" ? E : V.problem ?? E });
  })(), Gt = xe ? V.tpPrice : 0, Rt = xe ? V.slPrice : 0, Sn = (E, bt, ai, fe, oi = !0) => /* @__PURE__ */ e("label", { class: "pd-input", children: [
    /* @__PURE__ */ e("span", { class: "pre", children: E }),
    /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: n ? K(n.mark, he).slice(1).replace(/,/g, "") : "0", value: bt, onInput: (un) => ai(Ce(un)), "aria-label": fe }),
    oi && /* @__PURE__ */ e("button", { class: "suf", onClick: (un) => (un.preventDefault(), n && ai(me(n.mark, he ?? 1e-4))), children: "Mark" })
  ] }), si = u === "stop" || u === "stop_limit" || u === "take_profit" || u === "take_profit_limit";
  return /* @__PURE__ */ e("div", { class: "pd-panel pd-order", children: [
    /* @__PURE__ */ e("div", { class: "pd-pills", children: [
      /* @__PURE__ */ e(
        "button",
        {
          class: "pd-pill",
          disabled: !t.session || Q || Di,
          title: Di ? "Close this market's position and open orders to change margin mode" : "Cross: your whole balance backs positions. Isolated: each position only risks its own margin.",
          onClick: Bi,
          children: Q ? /* @__PURE__ */ e(Qe, { size: 12 }) : ht === "cross" ? "Cross" : "Isolated"
        }
      ),
      /* @__PURE__ */ e("span", { class: "pd-pill static", title: "Leverage for this order (set below)", children: [
        V.lev,
        "x"
      ] })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-tabs ls", children: [
      /* @__PURE__ */ e("button", { class: r === "buy" ? "on long" : "", onClick: () => s("buy"), children: "Long" }),
      /* @__PURE__ */ e("button", { class: r === "sell" ? "on short" : "", onClick: () => s("sell"), children: "Short" })
    ] }),
    d === "grid" ? /* @__PURE__ */ e(Mp, { s: t, m: n, onBack: () => p("market") }) : /* @__PURE__ */ e(U, { children: [
      /* @__PURE__ */ e("div", { class: "pd-form", children: [
        /* @__PURE__ */ e("div", { class: "pd-kv", children: [
          /* @__PURE__ */ e("span", { children: "Available to Trade" }),
          /* @__PURE__ */ e("span", { class: "num", children: H(t.session ? t.available : 0) })
        ] }),
        /* @__PURE__ */ e("div", { class: "pd-kv", children: [
          /* @__PURE__ */ e("span", { children: "Order Type" }),
          /* @__PURE__ */ e("span", { class: "pd-dd", children: [
            /* @__PURE__ */ e("button", { onClick: () => h(!l), "aria-haspopup": "listbox", "aria-expanded": l, children: [
              Ri,
              " ",
              /* @__PURE__ */ e(Y, { n: "down", size: 14 })
            ] }),
            l && /* @__PURE__ */ e("span", { class: "pd-menu wide", role: "listbox", children: [...ni.map((E) => ({ id: E.type, label: E.label, desc: E.desc })), { id: "grid", label: "Grid bot", desc: "Buys low and sells high inside a price range, automatically" }].map((E) => /* @__PURE__ */ e("button", { role: "option", "aria-selected": d === E.id, class: d === E.id ? "on" : "", onClick: () => (p(E.id), h(!1)), children: [
              /* @__PURE__ */ e("b", { children: E.label }),
              /* @__PURE__ */ e("span", { children: E.desc })
            ] }, E.id)) })
          ] })
        ] }),
        si && Sn(u.startsWith("take") ? "Target" : "Trigger", v, C, "Trigger price"),
        nn(u) && Sn("Price", T, $, "Limit price"),
        u === "trailing_stop_market" && /* @__PURE__ */ e(U, { children: [
          /* @__PURE__ */ e("label", { class: "pd-input", children: [
            /* @__PURE__ */ e("span", { class: "pre", children: "Trail" }),
            /* @__PURE__ */ e("input", { inputMode: "decimal", value: I, onInput: (E) => F(Ce(E)), "aria-label": "Trail distance percent" }),
            /* @__PURE__ */ e("span", { class: "suf muted", children: "%" })
          ] }),
          /* @__PURE__ */ e("div", { class: "pd-chips", children: Np.map((E) => /* @__PURE__ */ e("button", { class: Number(I) === E ? "on" : "", onClick: () => F(String(E)), children: [
            E,
            "%"
          ] }, E)) }),
          /* @__PURE__ */ e("label", { class: "pd-input", children: [
            /* @__PURE__ */ e("span", { class: "pre", children: "Activation" }),
            /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: "Optional · starts now", value: W, onInput: (E) => P(Ce(E)), "aria-label": "Activation price (optional)" })
          ] }),
          /* @__PURE__ */ e("div", { class: "pd-hint", children: [
            "Trails ",
            Ln,
            "–",
            En,
            "% behind the best price and triggers a market order when the price turns by that much. Leave activation empty to start trailing now. Like on Strike, it only closes or reduces your open position."
          ] })
        ] }),
        u === "twap" && /* @__PURE__ */ e(U, { children: [
          /* @__PURE__ */ e("div", { class: "pd-chips", role: "radiogroup", "aria-label": "TWAP duration", children: [
            Tp.map((E) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": Me === E, class: Me === E ? "on" : "", onClick: () => Le(E), children: E < 60 ? `${E}m` : `${E / 60}h` }, E)),
            /* @__PURE__ */ e("label", { class: "pd-mini", children: [
              /* @__PURE__ */ e("input", { inputMode: "numeric", value: String(Me), "aria-label": "TWAP duration in minutes", onInput: (E) => Le(Math.min(1440, Number(Ce(E)) || 0)) }),
              "min"
            ] })
          ] }),
          Sn("Limit", pt, ke, "TWAP price limit (optional)", !1),
          /* @__PURE__ */ e("label", { class: "pd-check", children: [
            /* @__PURE__ */ e("input", { type: "checkbox", checked: G, onChange: (E) => X(E.target.checked) }),
            " Randomize slice timing and size"
          ] })
        ] }),
        /* @__PURE__ */ e("label", { class: "pd-input big", children: [
          m === "usd" && /* @__PURE__ */ e("span", { class: "pre", children: "$" }),
          /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: "0", value: k, onInput: (E) => y(Ce(E)), "aria-label": m === "usd" ? "Margin in USD" : `Size in ${ge}` }),
          /* @__PURE__ */ e("button", { class: "suf unit", onClick: Oi, title: "Switch between margin in USD and size in the coin", children: [
            m === "usd" ? "USD" : ge,
            " ",
            /* @__PURE__ */ e(Y, { n: "swap", size: 14 })
          ] })
        ] }),
        /* @__PURE__ */ e("div", { class: "pd-sl", children: [
          /* @__PURE__ */ e(Pi, { min: 0, max: 100, value: Math.round(Xe), onChange: Rn, label: "Share of available balance", marks: [0, 25, 50, 75, 100], disabled: !Bn }),
          /* @__PURE__ */ e("label", { class: "pd-box", children: [
            /* @__PURE__ */ e("input", { inputMode: "decimal", disabled: !Bn, value: Xe ? Math.round(Xe) : "", placeholder: "0", "aria-label": "Percent of available balance", onInput: (E) => Rn(Math.min(100, Number(Ce(E)) || 0)) }),
            /* @__PURE__ */ e("span", { children: "%" })
          ] })
        ] }),
        !Bn && /* @__PURE__ */ e("div", { class: "pd-hint", children: t.session ? "Add funds to size by % of your balance." : "Connect a wallet to size by % of your balance." }),
        /* @__PURE__ */ e("div", { class: "pd-lbl", children: "Leverage" }),
        /* @__PURE__ */ e("div", { class: "pd-sl", children: [
          /* @__PURE__ */ e(Pi, { min: 1, max: Ge, value: Math.min(_, Ge), onChange: w, label: "Leverage", marks: [1, ...[2, 5, 10, 20, 40, 75].filter((E) => E < Ge), Ge] }),
          /* @__PURE__ */ e("label", { class: "pd-box", children: [
            /* @__PURE__ */ e(
              "input",
              {
                inputMode: "numeric",
                value: String(Math.min(_, Ge)),
                "aria-label": "Leverage",
                onInput: (E) => {
                  const bt = Number(Ce(E));
                  bt >= 1 && w(Math.min(Ge, Math.round(bt)));
                }
              }
            ),
            /* @__PURE__ */ e("span", { children: "x" })
          ] })
        ] }),
        V.lev < Math.min(_, Ge) && /* @__PURE__ */ e("div", { class: "pd-hint", children: [
          "Strike allows up to ",
          V.lev,
          "x for this size."
        ] }),
        /* @__PURE__ */ e("div", { class: "pd-opts", children: [
          /* @__PURE__ */ e("label", { class: "pd-check", title: "Only shrinks an open position; never opens or flips one", children: [
            /* @__PURE__ */ e("input", { type: "checkbox", checked: Pe, disabled: u === "trailing_stop_market", onChange: (E) => M(E.target.checked) }),
            " Reduce Only"
          ] }),
          u === "limit" && /* @__PURE__ */ e("label", { class: "pd-check", title: "Rests on the book as a maker order; cancelled if it would fill at once", children: [
            /* @__PURE__ */ e("input", { type: "checkbox", checked: N, onChange: (E) => R(E.target.checked) }),
            " Post Only"
          ] }),
          nn(u) && /* @__PURE__ */ e("span", { class: "pd-tif", role: "radiogroup", "aria-label": "Time in force", children: ["GTC", "IOC", "FOK"].map((E) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": x === E, class: x === E ? "on" : "", title: E === "GTC" ? "Good till cancelled" : E === "IOC" ? "Immediate or cancel: fill what you can now, cancel the rest" : "Fill or kill: fill all now or cancel", onClick: () => z(E), children: E }, E)) }),
          (si || u === "trailing_stop_market") && /* @__PURE__ */ e("span", { class: "pd-tif", role: "radiogroup", "aria-label": "Trigger price type", children: ["mark_price", "contract_price"].map((E) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": S === E, class: S === E ? "on" : "", onClick: () => q(E), children: E === "mark_price" ? "Mark" : "Last" }, E)) })
        ] }),
        /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
          /* @__PURE__ */ e("span", { children: "Liquidation Price Est." }),
          /* @__PURE__ */ e("span", { class: "num", children: V.size > 0 && !Pe ? `${K(V.liq, he)} (${Li(V.px, V.liq)})` : "N/A" })
        ] }),
        /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
          /* @__PURE__ */ e("span", { children: "Order Value" }),
          /* @__PURE__ */ e("span", { class: "num", children: V.size > 0 ? `${H(V.notional)} · ${ue(V.size)} ${ge}` : "N/A" })
        ] }),
        u === "twap" && n && Number(Me) > 0 && (() => {
          const E = vs(n.spec, V.size, Number(Me) * 60, V.px);
          return /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
            /* @__PURE__ */ e("span", { title: "Strike sends one suborder about every 30 seconds; sizes adjust to catch up if some are skipped.", children: "Suborders" }),
            /* @__PURE__ */ e("span", { class: "num", children: `~${E.orders} · every ${E.intervalSec}s${V.size > 0 ? ` · ${ue(E.perOrder)} ${ge} each` : ""}` })
          ] });
        })(),
        /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
          /* @__PURE__ */ e("span", { children: "Margin Required" }),
          /* @__PURE__ */ e("span", { class: "num", children: V.size > 0 && !Pe ? H(V.margin) : "N/A" })
        ] }),
        /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
          /* @__PURE__ */ e("span", { title: `Strike taker ${(t.takerRate * 100).toFixed(3)}% + builder ${(t.client.orderFeeBps / 100).toFixed(2)}%. A limit order that waits on the book pays Strike's lower maker fee.`, children: u === "market" ? "Fees" : "Fees (up to)" }),
          /* @__PURE__ */ e("span", { class: "num", children: V.size > 0 ? H(V.fee, { decimals: V.fee < 0.1 ? 4 : 2 }) : `${(V.feeRate * 100).toFixed(3)}%` })
        ] }),
        /* @__PURE__ */ e("button", { class: "pd-calc", onClick: () => Pt(!0), children: [
          /* @__PURE__ */ e(Y, { n: "sliders", size: 14 }),
          " Calculator"
        ] }),
        $t && /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
          /* @__PURE__ */ e("span", { children: "Max slippage" }),
          /* @__PURE__ */ e("span", { class: "pd-dd", children: [
            /* @__PURE__ */ e("button", { onClick: () => le(!J), children: [
              Number(A) > 0 ? `${A}%` : `Auto (${(Ze * 100).toFixed(0)}%)`,
              " ",
              /* @__PURE__ */ e(Y, { n: "down", size: 12 })
            ] }),
            J && /* @__PURE__ */ e("span", { class: "pd-menu", role: "listbox", children: ["", "0.5", "1", "2", "3"].filter((E) => !E || Number(E) / 100 <= Ze).map((E) => /* @__PURE__ */ e("button", { class: A === E ? "on" : "", onClick: () => (O(E), le(!1)), children: [
              /* @__PURE__ */ e("b", { children: E ? `${E}%` : "Auto" }),
              /* @__PURE__ */ e("span", { children: E ? "Fill only within this distance from the mark; the rest is cancelled" : `Strike's band for this market (${(Ze * 100).toFixed(0)}%)` })
            ] }, E || "auto")) })
          ] })
        ] }),
        ye && ye.complete && !ye.beyondBand && /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
          /* @__PURE__ */ e("span", { children: "Est. Fill · Slippage" }),
          /* @__PURE__ */ e("span", { class: `num ${ye.slippage > 5e-3 ? "neg" : ""}`, children: [
            K(ye.avgPrice, he),
            " · ",
            (ye.slippage * 100).toFixed(2),
            "%"
          ] })
        ] }),
        ie && /* @__PURE__ */ e("div", { class: "pd-kv", children: [
          /* @__PURE__ */ e("span", { children: "Auto Close" }),
          /* @__PURE__ */ e("button", { class: `pd-switch${xe ? " on" : ""}`, role: "switch", "aria-checked": xe, "aria-label": "Auto close (take profit / stop loss)", onClick: () => Re(!xe), children: /* @__PURE__ */ e("span", {}) })
        ] }),
        xe && ie && /* @__PURE__ */ e("div", { class: "pd-auto", children: [
          /* @__PURE__ */ e("div", { class: "pd-auto-h", children: [
            /* @__PURE__ */ e("span", { children: "Take profit / Stop loss" }),
            /* @__PURE__ */ e(
              "button",
              {
                class: "pd-chipbtn",
                onClick: () => {
                  const E = Ee === "price" ? "pnl" : "price", bt = V.px || D.mark;
                  E === "pnl" ? (ut(Gt ? vn(r, bt, V.lev, Gt).toFixed(0) : ""), et(Rt ? Math.abs(vn(r, bt, V.lev, Rt)).toFixed(0) : "")) : (ut(Gt ? me(Gt, he ?? 1e-4) : ""), et(Rt ? me(Rt, he ?? 1e-4) : "")), st(E);
                },
                children: [
                  Ee === "price" ? "Price" : "% P&L",
                  " ",
                  /* @__PURE__ */ e(Y, { n: "swap", size: 12 })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ e("label", { class: "pd-input", children: [
            /* @__PURE__ */ e("span", { class: "pre pos", children: "TP" }),
            /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: Ee === "price" ? "Price" : "% gain", value: ft, onInput: (E) => ut(Ce(E)), "aria-label": "Take profit" }),
            /* @__PURE__ */ e("span", { class: "suf muted num", children: Gt ? Ee === "price" ? dt(vn(r, V.px || D.mark, V.lev, Gt), 0) : K(Gt, he) : "" })
          ] }),
          /* @__PURE__ */ e("label", { class: "pd-input", children: [
            /* @__PURE__ */ e("span", { class: "pre neg", children: "SL" }),
            /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: Ee === "price" ? "Price" : "% loss", value: pn, onInput: (E) => et(Ce(E)), "aria-label": "Stop loss" }),
            /* @__PURE__ */ e("span", { class: "suf muted num", children: Rt ? Ee === "price" ? dt(vn(r, V.px || D.mark, V.lev, Rt), 0) : K(Rt, he) : "" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { class: "pd-order-foot", children: [
        _n && V.ok && /* @__PURE__ */ e("div", { class: "pd-warn", children: wn ? "The order book isn't available, so slippage can't be estimated." : Ct ? `There are no ${r === "buy" ? "sellers" : "buyers"} on the order book right now, so a market order would be cancelled.` : ye && (!ye.complete || ye.beyondBand) ? `There aren't enough ${r === "buy" ? "sellers" : "buyers"} near the market price to fill this, so Strike may cancel some or all of it.` : `Est. slippage ${((ye?.slippage ?? 0) * 100).toFixed(2)}% from the market price.` }),
        V.ok && !Pe && V.liqDistance > 0 && V.liqDistance < 0.1 && /* @__PURE__ */ e("div", { class: "pd-warn", children: [
          "High risk: liquidation is only ",
          (V.liqDistance * 100).toFixed(1),
          "% away."
        ] }),
        wr
      ] })
    ] }),
    ze && n && /* @__PURE__ */ e(Be, { title: "Calculator", onClose: () => Pt(!1), children: /* @__PURE__ */ e(Cp, { m: n }) })
  ] });
}
function Go({ s: t }) {
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
    t.session ? /* @__PURE__ */ e(U, { children: [
      /* @__PURE__ */ e("button", { class: "pd-btn primary", onClick: () => t.openFunds("deposit"), children: "Deposit" }),
      /* @__PURE__ */ e("button", { class: "pd-btn", disabled: t.available < jt, onClick: () => t.openFunds("withdraw"), children: "Withdraw" }),
      /* @__PURE__ */ e("div", { class: "pd-addr", children: [
        /* @__PURE__ */ e("span", { class: "num", title: t.session.address, children: en(t.session.address, 10, 6) }),
        /* @__PURE__ */ e("button", { class: "pd-link", onClick: t.disconnect, children: "Disconnect" })
      ] })
    ] }) : /* @__PURE__ */ e("button", { class: "pd-btn primary", onClick: () => t.setSheet("connect"), children: "Connect wallet" })
  ] });
}
const Ap = ["1m", "5m", "15m", "1h", "4h", "1d", "1w"], Pp = [
  ["chart", "Chart"],
  ["funding", "Funding"],
  ["depth", "Depth"],
  ["liq", "Liquidations"],
  ["details", "Details"]
];
function Lp({ s: t, width: n }) {
  const [i, r] = g(t.config.market), [s, a] = g(t.config.side ?? "buy"), [o, c] = g("15m"), [d, p] = g("chart"), [u, l] = g(void 0), [h, m] = g(null), [f, k] = g(!1), [y, _] = g(!1), [, w] = g(0), [T, $] = g(null), v = n >= 1380, C = n >= 1080;
  Z(() => r(t.config.market), [t.config.market]), Z(() => {
    t.markets.length && !t.bySymbol[i] && r(t.markets[0].symbol);
  }, [t.markets.length, i]);
  const S = t.bySymbol[i];
  Z(() => {
    if (l(void 0), !S) return;
    const z = t.client.orderBook(i);
    let N;
    const R = z.onUpdate(() => {
      N || (N = setTimeout(() => (N = void 0, l(z.view(200))), 250));
    }), oe = setTimeout(() => l((M) => M === void 0 ? null : M), 1e4);
    return () => (R(), clearTimeout(N), clearTimeout(oe), z.close());
  }, [i, !!S]), Z(() => {
    let z = !0;
    $(null);
    const N = () => t.client.market.openInterest(i).then((M) => z && $(M)).catch(() => {
    });
    N();
    const R = setInterval(N, 6e4), oe = setInterval(() => w((M) => M + 1), 1e3);
    return () => (z = !1, clearInterval(R), clearInterval(oe));
  }, [i]);
  const q = (z) => (r(z), k(!1)), x = S?.spec.tickSize;
  return /* @__PURE__ */ e("div", { class: `pd${v ? " with-list" : ""}${C ? " with-book" : ""}`, children: [
    v && /* @__PURE__ */ e(ss, { s: t, sym: i, onPick: q }),
    /* @__PURE__ */ e("div", { class: "pd-panel pd-head", children: [
      S ? /* @__PURE__ */ e(U, { children: [
        /* @__PURE__ */ e("button", { class: "pd-sym", onClick: () => !v && k(!f), "aria-haspopup": v ? void 0 : "listbox", children: [
          /* @__PURE__ */ e(_t, { base: S.base, size: 30 }),
          /* @__PURE__ */ e("span", { children: [
            /* @__PURE__ */ e("b", { children: [
              S.base,
              "-USD"
            ] }),
            /* @__PURE__ */ e("span", { class: "muted", children: S.name })
          ] }),
          !v && /* @__PURE__ */ e(Y, { n: "down", size: 16 })
        ] }),
        t.testnet && t.config.networkBadge !== !1 && /* @__PURE__ */ e("span", { class: "pa-net", children: "Testnet" }),
        /* @__PURE__ */ e("div", { class: "pd-stats", children: [
          /* @__PURE__ */ e(fn, { k: "Mark", v: K(S.mark, x) }),
          /* @__PURE__ */ e(fn, { k: "Index", v: K(S.index, x), title: "Index price: average spot price on major external exchanges" }),
          /* @__PURE__ */ e(fn, { k: "24h Change", v: `${H(S.changeAbs, { sign: !0, decimals: Math.abs(S.changeAbs) < 1 ? 4 : 2 })} / ${dt(S.change)}`, cls: S.change >= 0 ? "pos" : "neg" }),
          /* @__PURE__ */ e(fn, { k: "24h High", v: S.high24 > 0 ? K(S.high24, x) : "—" }),
          /* @__PURE__ */ e(fn, { k: "24h Low", v: S.low24 > 0 ? K(S.low24, x) : "—" }),
          /* @__PURE__ */ e(fn, { k: "24h Volume", v: In(S.vol24) }),
          /* @__PURE__ */ e(fn, { k: "Open Interest", v: T === null ? "—" : In(T * S.mark) }),
          /* @__PURE__ */ e(fn, { k: "Funding / Countdown", v: `${ps(S.funding)}${S.nextFunding > Date.now() ? ` · ${Ss(S.nextFunding)}` : ""}`, cls: S.funding > 0 ? "neg" : S.funding < 0 ? "pos" : "" })
        ] })
      ] }) : /* @__PURE__ */ e("span", { class: "muted", children: t.loadError ? "Can't reach Strike right now. Retrying…" : "Loading markets…" }),
      f && !v && /* @__PURE__ */ e("div", { class: "pd-pop", children: /* @__PURE__ */ e(ss, { s: t, sym: i, onPick: q, compact: !0 }) })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-panel pd-chart", children: [
      /* @__PURE__ */ e("div", { class: "pd-ctabs", children: [
        /* @__PURE__ */ e("span", { class: "tabs", role: "tablist", "aria-label": "Chart view", children: Pp.map(([z, N]) => /* @__PURE__ */ e("button", { role: "tab", "aria-selected": d === z, class: d === z ? "on" : "", onClick: () => p(z), children: N }, z)) }),
        d === "chart" && /* @__PURE__ */ e("span", { class: "pd-ivs flat", role: "radiogroup", "aria-label": "Candle interval", children: Ap.map((z) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": o === z, class: o === z ? "on" : "", onClick: () => c(z), children: z === "1d" ? "1D" : z === "1w" ? "1W" : z }, z)) })
      ] }),
      S && d === "chart" && /* @__PURE__ */ e(Ep, { s: t, m: S, iv: o }),
      S && d === "funding" && /* @__PURE__ */ e(tp, { s: t, sym: i }),
      S && d === "depth" && /* @__PURE__ */ e(np, { book: u, base: S.base, tick: x }),
      S && d === "liq" && /* @__PURE__ */ e(ip, { s: t, m: S }),
      S && d === "details" && /* @__PURE__ */ e(rp, { s: t, m: S })
    ] }),
    C && S && /* @__PURE__ */ e(Zd, { s: t, sym: i, base: S.base, tick: x, book: u, onPrice: (z) => m({ p: z, n: Date.now() }) }),
    /* @__PURE__ */ e("div", { class: "pd-right", children: [
      /* @__PURE__ */ e(jo, { s: t, m: S, book: u, side: s, setSide: a, limitPick: h }),
      /* @__PURE__ */ e(Go, { s: t })
    ] }),
    /* @__PURE__ */ e(pp, { s: t, onPick: q }),
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
    y && /* @__PURE__ */ e(Be, { title: "Disclosures", onClose: () => _(!1), tall: !0, children: /* @__PURE__ */ e($s, { s: t }) })
  ] });
}
function fn({ k: t, v: n, cls: i, title: r }) {
  return /* @__PURE__ */ e("div", { class: "pd-stat", title: r, children: [
    /* @__PURE__ */ e("span", { class: "k", children: t }),
    /* @__PURE__ */ e("span", { class: `v num ${i ?? ""}`, children: n })
  ] });
}
function Ep({ s: t, m: n, iv: i }) {
  const r = Oe(null), [s, a] = g(360);
  return ii(() => {
    const o = r.current;
    if (!o || typeof ResizeObserver > "u") return;
    const c = new ResizeObserver(() => o.clientHeight && a(Math.max(220, o.clientHeight)));
    return c.observe(o), () => c.disconnect();
  }, []), /* @__PURE__ */ e("div", { class: "pd-chart-box", ref: r, children: /* @__PURE__ */ e(vr, { client: t.client, symbol: n.symbol, interval: i, tick: n.spec.tickSize, height: s, live: { mark: n.mark, last: n.last, index: n.index } }) });
}
function Ip() {
  const [t, n] = g(() => {
    try {
      const r = JSON.parse(dn("favorites") ?? "[]");
      return new Set(Array.isArray(r) ? r.filter((s) => typeof s == "string") : []);
    } catch {
      return /* @__PURE__ */ new Set();
    }
  });
  return [t, (r) => n((s) => {
    const a = new Set(s);
    return a.has(r) ? a.delete(r) : a.add(r), dn("favorites", JSON.stringify([...a])), a;
  })];
}
function ss({ s: t, sym: n, onPick: i, compact: r }) {
  const [s, a] = g(""), [o, c] = g("all"), [d, p] = Ip(), u = rs(Uo(t.markets, s), "volume", !0).filter(
    (l) => o === "all" ? !0 : o === "fav" ? d.has(l.symbol) : o === "crypto" ? jn(l.base) === "crypto" : jn(l.base) !== "crypto"
  );
  return /* @__PURE__ */ e("div", { class: `pd-panel pd-list${r ? " compact" : ""}`, children: [
    /* @__PURE__ */ e("div", { class: "pd-tabs", children: ["fav", "all", "crypto", "tradfi"].map((l) => /* @__PURE__ */ e("button", { class: o === l ? "on" : "", onClick: () => c(l), "aria-label": l === "fav" ? "Favorites" : void 0, title: l === "fav" ? "Favorites" : void 0, children: l === "fav" ? /* @__PURE__ */ e(Y, { n: "star", size: 16 }) : l === "all" ? "All" : l === "crypto" ? "Crypto" : "TradFi" }, l)) }),
    /* @__PURE__ */ e("label", { class: "pd-search", children: [
      /* @__PURE__ */ e(Y, { n: "search", size: 16 }),
      /* @__PURE__ */ e("input", { placeholder: "Search markets", value: s, onInput: (l) => a(l.target.value), "aria-label": "Search markets" })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-list-h", children: [
      /* @__PURE__ */ e("span", { children: "Market" }),
      /* @__PURE__ */ e("span", { children: "Price / 24h" })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-list-b", children: [
      u.map((l) => /* @__PURE__ */ e("button", { class: `pd-mrow${l.symbol === n ? " on" : ""}`, onClick: () => i(l.symbol), children: [
        /* @__PURE__ */ e(
          "span",
          {
            class: `pd-star${d.has(l.symbol) ? " on" : ""}`,
            role: "button",
            tabIndex: 0,
            "aria-pressed": d.has(l.symbol),
            "aria-label": d.has(l.symbol) ? `Remove ${l.base} from favorites` : `Add ${l.base} to favorites`,
            onClick: (h) => (h.stopPropagation(), p(l.symbol)),
            onKeyDown: (h) => (h.key === "Enter" || h.key === " ") && (h.preventDefault(), h.stopPropagation(), p(l.symbol)),
            children: /* @__PURE__ */ e(Y, { n: "star", size: 14 })
          }
        ),
        /* @__PURE__ */ e(_t, { base: l.base, size: 28 }),
        /* @__PURE__ */ e("span", { class: "l", children: [
          /* @__PURE__ */ e("b", { children: [
            l.base,
            " ",
            /* @__PURE__ */ e("span", { class: "pa-lev", title: "Strike's maximum leverage for this market", children: [
              l.strikeMaxLev,
              "x"
            ] })
          ] }),
          /* @__PURE__ */ e("span", { class: "muted num", children: [
            In(l.vol24),
            " Vol"
          ] })
        ] }),
        /* @__PURE__ */ e("span", { class: "r num", children: [
          /* @__PURE__ */ e("b", { children: K(l.mark, l.spec.tickSize) }),
          /* @__PURE__ */ e("span", { class: l.change >= 0 ? "pos" : "neg", children: dt(l.change) })
        ] })
      ] }, l.symbol)),
      !u.length && /* @__PURE__ */ e("div", { class: "pd-center muted", children: t.markets.length ? o === "fav" && !s ? "Star a market to keep it here." : "No markets match" : "Loading…" })
    ] })
  ] });
}
const Fp = ["15m", "1h", "4h", "1d"];
function Dp({ s: t }) {
  const [n, i] = g(t.config.market), [r, s] = g(t.config.side ?? "buy"), [a, o] = g("1h"), [c, d] = g(void 0), [p, u] = g(!1), [l, h] = g(!1);
  Z(() => i(t.config.market), [t.config.market]), Z(() => s(t.config.side ?? "buy"), [t.config.side, t.config.amount]), Z(() => {
    t.markets.length && !t.bySymbol[n] && i(t.markets[0].symbol);
  }, [t.markets.length, n]);
  const m = t.bySymbol[n];
  Z(() => {
    if (d(void 0), !m) return;
    const k = t.client.orderBook(n);
    let y;
    const _ = k.onUpdate(() => {
      y || (y = setTimeout(() => (y = void 0, d(k.view(200))), 250));
    }), w = setTimeout(() => d((T) => T === void 0 ? null : T), 1e4);
    return () => (_(), clearTimeout(y), clearTimeout(w), k.close());
  }, [n, !!m]);
  const f = (k) => (i(k), u(!1));
  return /* @__PURE__ */ e("div", { class: "pd pp", children: [
    /* @__PURE__ */ e("div", { class: "pd-panel pd-head pp-head", children: [
      m ? /* @__PURE__ */ e(U, { children: [
        /* @__PURE__ */ e("button", { class: "pd-sym", onClick: () => u(!p), "aria-haspopup": "listbox", "aria-expanded": p, children: [
          /* @__PURE__ */ e(_t, { base: m.base, size: 32 }),
          /* @__PURE__ */ e("span", { children: [
            /* @__PURE__ */ e("b", { children: [
              m.base,
              "-USD"
            ] }),
            /* @__PURE__ */ e("span", { class: "muted", children: m.name })
          ] }),
          /* @__PURE__ */ e(Y, { n: "down", size: 16 })
        ] }),
        /* @__PURE__ */ e("span", { class: "sp" }),
        /* @__PURE__ */ e("span", { class: "pp-px", children: [
          /* @__PURE__ */ e("b", { class: "num", children: K(m.mark, m.spec.tickSize) }),
          /* @__PURE__ */ e("span", { class: `num ${m.change >= 0 ? "pos" : "neg"}`, children: [
            H(m.changeAbs, { sign: !0, decimals: Math.abs(m.changeAbs) < 1 ? 4 : 2 }),
            " (",
            dt(m.change),
            ")"
          ] })
        ] })
      ] }) : /* @__PURE__ */ e("span", { class: "muted", children: t.loadError ? "Can't reach Strike right now. Retrying…" : "Loading markets…" }),
      p && /* @__PURE__ */ e("div", { class: "pd-pop", children: /* @__PURE__ */ e(ss, { s: t, sym: n, onPick: f, compact: !0 }) })
    ] }),
    t.config.chart !== !1 && /* @__PURE__ */ e("div", { class: "pd-panel pp-chart", children: [
      /* @__PURE__ */ e("div", { class: "pd-ivs", role: "radiogroup", "aria-label": "Candle interval", children: Fp.map((k) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": a === k, class: a === k ? "on" : "", onClick: () => o(k), children: k === "1d" ? "1D" : k }, k)) }),
      m && /* @__PURE__ */ e(vr, { client: t.client, symbol: m.symbol, interval: a, tick: m.spec.tickSize, height: 170, live: { mark: m.mark, last: m.last, index: m.index } })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-right pp-right", children: [
      /* @__PURE__ */ e(jo, { s: t, m, book: c, side: r, setSide: s, limitPick: null }),
      t.session && /* @__PURE__ */ e(Op, { s: t, onPick: i }),
      /* @__PURE__ */ e(Go, { s: t })
    ] }),
    /* @__PURE__ */ e("div", { class: "pd-foot", children: [
      /* @__PURE__ */ e("span", { class: "pa-net", children: t.testnet ? "Strike testnet" : "Strike mainnet" }),
      /* @__PURE__ */ e("span", { class: "sp" }),
      /* @__PURE__ */ e("button", { class: "pd-link", onClick: () => h(!0), children: "Disclosures" }),
      /* @__PURE__ */ e("a", { class: "pd-link", href: t.client.appUrl(), target: "_blank", rel: "noopener", children: "Powered by Strike" })
    ] }),
    l && /* @__PURE__ */ e(Be, { title: "Disclosures", onClose: () => h(!1), tall: !0, children: /* @__PURE__ */ e($s, { s: t }) })
  ] });
}
function Op({ s: t, onPick: n }) {
  const [i, r] = g("positions"), [s, a] = g(null);
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
      const c = t.bySymbol[o.symbol], d = o.symbol.split("-")[0], p = Number(o.size), u = c?.mark || Number(o.entry_price), l = c?.spec.tickSize, h = mr(o), m = Number(o.upnl), f = yr(t, o.symbol), k = f.find((w) => String(w.type).startsWith("take_profit")), y = f.find((w) => String(w.type).startsWith("stop")), _ = f.find((w) => String(w.type).startsWith("trailing"));
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
          /* @__PURE__ */ e("b", { class: `num ${m >= 0 ? "pos" : "neg"}`, children: [
            H(m, { sign: !0 }),
            " (",
            dt(h > 0 ? m / h * 100 : 0, 1),
            ")"
          ] })
        ] }),
        /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
          /* @__PURE__ */ e("span", { children: "Size" }),
          /* @__PURE__ */ e("span", { class: "num", children: [
            ue(Math.abs(p)),
            " ",
            d,
            " · ",
            H(Math.abs(p) * u)
          ] })
        ] }),
        /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
          /* @__PURE__ */ e("span", { children: "Entry · Liq." }),
          /* @__PURE__ */ e("span", { class: "num", children: [
            K(Number(o.entry_price), l),
            " · ",
            Number(o.liquidation_price) > 0 ? K(Number(o.liquidation_price), l) : "—"
          ] })
        ] }),
        /* @__PURE__ */ e("div", { class: "pd-kv muted", children: [
          /* @__PURE__ */ e("span", { children: "TP / SL" }),
          /* @__PURE__ */ e("button", { class: "pd-link num", onClick: () => a({ kind: "tpsl", p: o }), title: "Edit take profit / stop loss", children: [
            k ? K(Number(k.stop_price), l) : "—",
            " / ",
            y ? K(Number(y.stop_price), l) : "—",
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
      const c = t.bySymbol[o.symbol]?.spec.tickSize, d = !/market$|^market|trailing/.test(String(o.type)), p = Number(o.price) ? K(Number(o.price), c) : Number(o.stop_price) ? K(Number(o.stop_price), c) : "Market";
      return /* @__PURE__ */ e("div", { class: "pp-item", children: [
        /* @__PURE__ */ e("div", { class: "pp-line", children: [
          /* @__PURE__ */ e("button", { class: "pd-mk", onClick: () => n(o.symbol), children: [
            /* @__PURE__ */ e(_t, { base: o.symbol.split("-")[0], size: 20 }),
            /* @__PURE__ */ e("b", { children: o.symbol.split("-")[0] })
          ] }),
          /* @__PURE__ */ e("span", { class: o.side === "buy" ? "pos" : "neg", children: o.side === "buy" ? "Buy" : "Sell" }),
          /* @__PURE__ */ e("span", { class: "sp" }),
          /* @__PURE__ */ e("span", { class: "num", children: [
            ue(Number(o.size)),
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
    s?.kind === "close" && /* @__PURE__ */ e(As, { s: t, p: s.p, onClose: () => a(null) }),
    s?.kind === "tpsl" && /* @__PURE__ */ e(Ms, { s: t, p: s.p, onClose: () => a(null) }),
    s?.kind === "trail" && /* @__PURE__ */ e(zs, { s: t, p: s.p, onClose: () => a(null) }),
    s?.kind === "margin" && /* @__PURE__ */ e(Ts, { s: t, p: s.p, onClose: () => a(null) }),
    s?.kind === "reverse" && /* @__PURE__ */ e(Ns, { s: t, p: s.p, onClose: () => a(null) }),
    s?.kind === "edit" && /* @__PURE__ */ e(Wo, { s: t, o: s.o, onClose: () => a(null) })
  ] });
}
function Bp({ s: t, nav: n }) {
  const { items: i } = Ps(t), r = (i ?? []).filter((a) => a.id.startsWith("t")).slice(0, 8), s = t.testnet ? "https://preprod.cardanoscan.io/address/" : "https://cardanoscan.io/address/";
  return /* @__PURE__ */ e("div", { class: "pa-screen", children: [
    /* @__PURE__ */ e("div", { class: "pa-top", children: [
      /* @__PURE__ */ e(rt, { n: "back", label: "Back", onClick: n.back }),
      /* @__PURE__ */ e("div", { class: "pa-title", children: "Deposit and withdrawal issues" })
    ] }),
    /* @__PURE__ */ e("div", { class: "pa-scroll", children: [
      /* @__PURE__ */ e("div", { class: "pa-prose", children: [
        /* @__PURE__ */ e("p", { children: "Deposits usually take a few minutes: Strike waits for Cardano confirmations before crediting. Withdrawals usually arrive within a few minutes." }),
        /* @__PURE__ */ e("p", { children: "Your ADA is always visible on-chain. If a transfer seems stuck, check it in a Cardano explorer, then contact Strike support with the transaction." })
      ] }),
      t.session ? /* @__PURE__ */ e(U, { children: [
        /* @__PURE__ */ e("h2", { class: "pa-h2 sm", children: "Funds" }),
        /* @__PURE__ */ e(Ae, { children: [
          /* @__PURE__ */ e(ne, { k: "Account value", v: /* @__PURE__ */ e("span", { class: "num", children: H(t.equity) }) }),
          /* @__PURE__ */ e(ne, { k: "Available to trade", v: /* @__PURE__ */ e("span", { class: "num", children: H(t.available) }) }),
          /* @__PURE__ */ e(ne, { k: "Unrealized P&L", v: /* @__PURE__ */ e("span", { class: `num ${t.upnl >= 0 ? "pos" : "neg"}`, children: H(t.upnl, { sign: !0 }) }) })
        ] }),
        /* @__PURE__ */ e("h2", { class: "pa-h2 sm", children: "Recent transfers" }),
        i === null ? /* @__PURE__ */ e("div", { class: "pa-empty", children: /* @__PURE__ */ e(Qe, {}) }) : r.length ? /* @__PURE__ */ e(Ae, { children: r.map((a) => /* @__PURE__ */ e(ne, { k: a.title, sub: a.sub, v: /* @__PURE__ */ e("span", { class: `num ${a.cls}`, children: a.amount }) }, a.id)) }) : /* @__PURE__ */ e("div", { class: "pa-empty", children: "No deposits or withdrawals yet." }),
        /* @__PURE__ */ e("a", { class: "pa-btn dark wide", href: s + encodeURIComponent(t.session.address), target: "_blank", rel: "noopener", children: "View your wallet on Cardanoscan" })
      ] }) : /* @__PURE__ */ e("div", { class: "pa-empty", children: "Connect a wallet to see your transfers." }),
      /* @__PURE__ */ e("a", { class: "pa-btn dark wide", href: t.client.appUrl(), target: "_blank", rel: "noopener", children: "Open Strike" }),
      /* @__PURE__ */ e("div", { class: "pa-bottom-pad sm" })
    ] })
  ] });
}
function Rp({ s: t, nav: n, onClose: i, onLearn: r, onDisclosures: s }) {
  const [a, o] = g(dn("getstarted-hidden") === "1"), c = [...t.markets].sort((p, u) => u.vol24 - p.vol24).slice(0, 5), d = (p) => n.push({ k: "markets", pick: p });
  return /* @__PURE__ */ e("div", { class: "pa-screen", children: [
    /* @__PURE__ */ e("div", { class: "pa-top", children: [
      i ? /* @__PURE__ */ e(rt, { n: "x", label: "Close Perps", onClick: i }) : null,
      /* @__PURE__ */ e("div", { class: "pa-title", children: [
        "Perps",
        t.testnet && t.config.networkBadge !== !1 && /* @__PURE__ */ e("span", { class: "pa-net", children: "Testnet" })
      ] }),
      /* @__PURE__ */ e("span", { class: "sp" }),
      t.session && /* @__PURE__ */ e(rt, { n: "clock", label: "History", onClick: () => n.push({ k: "history" }) }),
      /* @__PURE__ */ e(rt, { n: "search", label: "Search markets", onClick: () => n.push({ k: "markets", focus: !0 }) })
    ] }),
    /* @__PURE__ */ e("div", { class: "pa-scroll", children: [
      /* @__PURE__ */ e("div", { class: "pa-equity num", children: H(t.session ? t.equity : 0) }),
      t.session && t.upnl !== 0 && /* @__PURE__ */ e("div", { class: `pa-equity-sub num ${t.upnl > 0 ? "pos" : "neg"}`, children: [
        H(t.upnl, { sign: !0 }),
        " unrealized"
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-card funds", children: [
        /* @__PURE__ */ e(ne, { k: "Available funds", info: () => r("funds"), v: /* @__PURE__ */ e("span", { class: "num", children: H(t.session ? t.available : 0) }) }),
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
      t.positions.length > 0 && /* @__PURE__ */ e(U, { children: [
        /* @__PURE__ */ e("h2", { class: "pa-h2", children: "Your Positions" }),
        /* @__PURE__ */ e(Ae, { children: t.positions.map((p) => {
          const u = t.bySymbol[p.symbol], l = Number(p.size), h = p.symbol.split("-")[0], m = Number(p.upnl), f = Math.abs(l) * (u?.mark || Number(p.entry_price));
          return /* @__PURE__ */ e("button", { class: "pa-pos", onClick: () => n.push({ k: "position", id: p.id }), children: [
            /* @__PURE__ */ e(_t, { base: h, size: 36 }),
            /* @__PURE__ */ e("span", { class: "l", children: [
              /* @__PURE__ */ e("b", { children: [
                h,
                " ",
                /* @__PURE__ */ e("span", { class: l > 0 ? "pos" : "neg", children: l > 0 ? "Long" : "Short" }),
                " ",
                /* @__PURE__ */ e("span", { class: "pa-lev", children: [
                  p.leverage,
                  "x"
                ] })
              ] }),
              /* @__PURE__ */ e("span", { class: "s num", children: [
                ue(Math.abs(l)),
                " ",
                h
              ] })
            ] }),
            /* @__PURE__ */ e("span", { class: "r num", children: [
              /* @__PURE__ */ e("b", { children: H(f) }),
              /* @__PURE__ */ e("span", { class: m >= 0 ? "pos" : "neg", children: H(m, { sign: !0 }) })
            ] }),
            /* @__PURE__ */ e(Y, { n: "right", size: 18, cls: "chev" })
          ] }, p.id);
        }) })
      ] }),
      !a && !t.positions.length && /* @__PURE__ */ e("div", { class: "pa-card gs", children: [
        /* @__PURE__ */ e("button", { class: "x", "aria-label": "Dismiss", onClick: () => (dn("getstarted-hidden", "1"), o(!0)), children: /* @__PURE__ */ e(Y, { n: "x", size: 14 }) }),
        /* @__PURE__ */ e("div", { class: "eyebrow", children: "GET STARTED" }),
        /* @__PURE__ */ e("div", { class: "t", children: "New to Perps? Learn the basics in a minute" }),
        /* @__PURE__ */ e("button", { class: "link", onClick: () => n.push({ k: "onboard" }), children: [
          "Learn More ",
          /* @__PURE__ */ e(Y, { n: "right", size: 14 })
        ] }),
        /* @__PURE__ */ e(qp, {})
      ] }),
      /* @__PURE__ */ e("button", { class: "pa-h2 link", onClick: () => n.push({ k: "markets" }), children: [
        "Lists ",
        /* @__PURE__ */ e(Y, { n: "right", size: 18 })
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-chips", children: [Tn.slice(0, Math.ceil(Tn.length / 2)), Tn.slice(Math.ceil(Tn.length / 2))].map((p, u) => /* @__PURE__ */ e("div", { class: "pa-chiprow", children: p.map((l) => /* @__PURE__ */ e("button", { class: "pa-chip", onClick: () => n.push({ k: "markets", list: l.id }), children: [
        /* @__PURE__ */ e(Y, { n: l.icon, size: 17 }),
        l.label
      ] }, l.id)) }, u)) }),
      /* @__PURE__ */ e("button", { class: "pa-h2 link", onClick: () => n.push({ k: "markets" }), children: [
        "Explore Perps ",
        /* @__PURE__ */ e(Y, { n: "right", size: 18 })
      ] }),
      /* @__PURE__ */ e(Ae, { cls: "mk", children: c.length ? c.map((p, u) => /* @__PURE__ */ e("button", { class: "pa-mrow", onClick: () => n.push({ k: "market", sym: p.symbol }), children: [
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
            In(p.vol24),
            " Vol"
          ] })
        ] }),
        /* @__PURE__ */ e("span", { class: "r num", children: [
          /* @__PURE__ */ e("b", { children: K(p.mark, p.spec.tickSize) }),
          /* @__PURE__ */ e("span", { class: p.change >= 0 ? "pos" : "neg", children: dt(p.change) })
        ] })
      ] }, p.symbol)) : /* @__PURE__ */ e("div", { class: "pa-empty-row", children: t.loadError ? "Can't reach Strike right now. Retrying…" : "Loading markets…" }) }),
      /* @__PURE__ */ e("h2", { class: "pa-h2", children: "Learn" }),
      /* @__PURE__ */ e(Ae, { children: [
        /* @__PURE__ */ e(ne, { k: "How Perps work", sub: "Long, short and leverage in 1 minute", onClick: () => r("basics"), chevron: "right" }),
        /* @__PURE__ */ e(ne, { k: "Leverage and liquidation", sub: "How far the price can move against you", onClick: () => r("leverage"), chevron: "right" }),
        /* @__PURE__ */ e(ne, { k: "Perps FAQ", sub: "Fees, funding, deposits", onClick: () => r("faq"), chevron: "right" })
      ] }),
      /* @__PURE__ */ e("button", { class: "pa-foot-link", onClick: () => n.push({ k: "help" }), children: [
        /* @__PURE__ */ e(Y, { n: "info", size: 15 }),
        " Having issues with a deposit or withdrawal?"
      ] }),
      /* @__PURE__ */ e("button", { class: "pa-foot-link", onClick: s, children: [
        /* @__PURE__ */ e(Y, { n: "info", size: 15 }),
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
function qp() {
  return /* @__PURE__ */ e("svg", { class: "art", width: "76", height: "64", viewBox: "0 0 76 64", "aria-hidden": "true", children: [
    /* @__PURE__ */ e("path", { d: "M6 50 C 18 50, 20 26, 32 26 S 46 44, 56 30 S 66 12, 70 10", fill: "none", stroke: "var(--pa-accent)", "stroke-width": "5", "stroke-linecap": "round" }),
    /* @__PURE__ */ e("circle", { cx: "70", cy: "10", r: "5", fill: "var(--pa-accent)" }),
    /* @__PURE__ */ e("path", { d: "M58 46l2.4 6 6 2.4-6 2.4-2.4 6-2.4-6-6-2.4 6-2.4z", fill: "#ffd36e" })
  ] });
}
const Vo = {
  LIVE: { interval: "1m", limit: 120, refresh: 2e4 },
  "1D": { interval: "15m", limit: 96, refresh: 6e4 },
  "1W": { interval: "1h", limit: 168, refresh: 12e4 },
  "1M": { interval: "4h", limit: 180, refresh: 3e5 },
  "1Y": { interval: "1d", limit: 365, refresh: 9e5 },
  ALL: { interval: "1w", limit: 520, refresh: 9e5 }
};
function Up({
  client: t,
  symbol: n,
  range: i,
  live: r,
  height: s = 240,
  onHover: a,
  onFirst: o
}) {
  const [c, d] = g(null), [p, u] = g(!1), [l, h] = g(360), [m, f] = g(null), k = Oe(null);
  ii(() => {
    const I = k.current;
    if (!I || typeof ResizeObserver > "u") return;
    const F = new ResizeObserver(() => I.clientWidth && h(I.clientWidth));
    return F.observe(I), h(I.clientWidth || 360), () => F.disconnect();
  }, []), Z(() => {
    let I = !0;
    d(null), u(!1);
    const F = Vo[i], W = () => t.market.klines(n, F.interval, F.limit, "mark").then((A) => I && (d(A), u(!A.length))).catch(() => I && u(!0));
    W();
    const P = setInterval(() => !At() && W(), F.refresh);
    return () => {
      I = !1, clearInterval(P);
    };
  }, [t, n, i]);
  const y = c?.length ? [...c.map((I) => ({ t: I.openTime, p: I.close })), ...r > 0 ? [{ t: Date.now(), p: r }] : []] : [], _ = y.length ? c[0].open : 0;
  if (Z(() => {
    _ > 0 && o?.(_);
  }, [_, n, i]), !y.length)
    return /* @__PURE__ */ e("div", { class: "pa-line", ref: k, style: { height: `${s}px` }, children: /* @__PURE__ */ e("div", { class: "pa-line-msg", children: p ? "Chart isn't available right now." : "" }) });
  const w = y.map((I) => I.p);
  let T = Math.min(...w), $ = Math.max(...w);
  const v = ($ - T) * 0.08 || $ * 2e-3 || 1;
  T -= v, $ += v;
  const C = y.length, S = (I) => I / Math.max(1, C - 1) * (l - 12) + 2, q = (I) => 8 + ($ - I) / ($ - T) * (s - 16), x = y.map((I, F) => `${F ? "L" : "M"}${S(F).toFixed(1)},${q(I.p).toFixed(1)}`).join(" "), z = w[C - 1] >= _, N = `pa-g-${z ? "u" : "d"}`, R = m === null ? null : Math.max(0, Math.min(C - 1, Math.round((m - 2) / (l - 12) * (C - 1)))), oe = (I) => {
    const F = I.currentTarget.getBoundingClientRect(), W = I.clientX - F.left;
    f(W);
    const P = Math.max(0, Math.min(C - 1, Math.round((W - 2) / (l - 12) * (C - 1))));
    a?.({ price: y[P].p, time: y[P].t, change: _ > 0 ? (y[P].p - _) / _ * 100 : 0 });
  }, M = () => (f(null), a?.(null));
  return /* @__PURE__ */ e("div", { class: `pa-line ${z ? "up" : "dn"}`, ref: k, style: { height: `${s}px` }, children: /* @__PURE__ */ e("svg", { width: l, height: s, role: "img", "aria-label": `${n} price, ${i}`, onPointerMove: oe, onPointerDown: oe, onPointerLeave: M, onPointerUp: (I) => I.pointerType !== "mouse" && M(), children: [
    /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ e("linearGradient", { id: N, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ e("stop", { offset: "0", "stop-color": "currentColor", "stop-opacity": ".22" }),
      /* @__PURE__ */ e("stop", { offset: "1", "stop-color": "currentColor", "stop-opacity": "0" })
    ] }) }),
    /* @__PURE__ */ e("path", { d: `${x} L${S(C - 1)},${s} L${S(0)},${s} Z`, fill: `url(#${N})`, stroke: "none" }),
    /* @__PURE__ */ e("path", { d: x, fill: "none", stroke: "currentColor", "stroke-width": "2.2", "stroke-linejoin": "round", "stroke-linecap": "round" }),
    R === null ? /* @__PURE__ */ e(U, { children: /* @__PURE__ */ e("circle", { cx: S(C - 1), cy: q(w[C - 1]), r: "3.4", fill: "currentColor" }) }) : /* @__PURE__ */ e(U, { children: [
      /* @__PURE__ */ e("line", { x1: S(R), x2: S(R), y1: 0, y2: s, class: "xh" }),
      /* @__PURE__ */ e("circle", { cx: S(R), cy: q(w[R]), r: "4.5", fill: "currentColor", stroke: "#000", "stroke-width": "2" })
    ] })
  ] }) });
}
const Hp = { LIVE: "1m", "1D": "15m", "1W": "1h", "1M": "4h", "1Y": "1d", ALL: "1w" };
function Wp({ s: t, nav: n, sym: i, onLearn: r }) {
  const s = t.bySymbol[i], [a, o] = g("1D"), [c, d] = g(null), [p, u] = g(0), [l, h] = g(!1), [m, f] = g(null), [, k] = g(0);
  if (Z(() => {
    let S = !0;
    const q = () => t.client.market.openInterest(i).then((N) => S && f(N)).catch(() => {
    });
    q();
    const x = setInterval(q, 6e4), z = setInterval(() => k((N) => N + 1), 1e3);
    return () => {
      S = !1, clearInterval(x), clearInterval(z);
    };
  }, [i]), !s)
    return /* @__PURE__ */ e("div", { class: "pa-screen", children: [
      /* @__PURE__ */ e("div", { class: "pa-top", children: /* @__PURE__ */ e(rt, { n: "back", label: "Back", onClick: n.back }) }),
      /* @__PURE__ */ e("div", { class: "pa-empty", children: t.markets.length ? `${i} isn't listed on this network.` : "Loading…" })
    ] });
  const y = s.spec.tickSize, _ = a === "1D" && s.ref24 > 0 ? s.ref24 : p, w = c?.price ?? s.mark, T = c ? c.change : _ > 0 ? (s.mark - _) / _ * 100 : 0, $ = c ? p > 0 ? c.price - p : 0 : _ > 0 ? s.mark - _ : 0, v = t.positions.find((S) => S.symbol === i), C = t.orders.filter((S) => S.symbol === i);
  return /* @__PURE__ */ e("div", { class: "pa-screen", children: [
    /* @__PURE__ */ e("div", { class: "pa-top", children: [
      /* @__PURE__ */ e(rt, { n: "back", label: "Back", onClick: n.back }),
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
      /* @__PURE__ */ e("div", { class: "pa-price num", children: K(w, y) }),
      /* @__PURE__ */ e("div", { class: `pa-chg num ${T >= 0 ? "pos" : "neg"}`, children: [
        H($, { sign: !0, decimals: Math.abs($) < 1 ? 4 : 2 }),
        " (",
        dt(T),
        ")",
        " ",
        /* @__PURE__ */ e("span", { class: "muted", children: c ? an(c.time) : a === "LIVE" ? "Past 2h" : a === "1D" ? "Past day" : a === "1W" ? "Past week" : a === "1M" ? "Past month" : a === "1Y" ? "Past year" : "All time" })
      ] }),
      l ? /* @__PURE__ */ e("div", { class: "pa-candles", children: /* @__PURE__ */ e(vr, { client: t.client, symbol: i, interval: Hp[a], tick: y, live: { mark: s.mark, last: s.last, index: s.index } }) }) : /* @__PURE__ */ e(Up, { client: t.client, symbol: i, range: a, live: s.mark, onHover: d, onFirst: u }),
      /* @__PURE__ */ e("div", { class: "pa-ranges", role: "radiogroup", "aria-label": "Chart range", children: [
        Object.keys(Vo).map((S) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": a === S, class: a === S ? "on" : "", onClick: () => o(S), children: S === "LIVE" ? /* @__PURE__ */ e(U, { children: [
          /* @__PURE__ */ e("span", { class: "pa-livedot" }),
          "LIVE"
        ] }) : S }, S)),
        /* @__PURE__ */ e("button", { class: "ic", "aria-label": l ? "Line chart" : "Candle chart", onClick: () => h(!l), children: /* @__PURE__ */ e(Y, { n: l ? "line" : "candles", size: 18 }) })
      ] }),
      v && /* @__PURE__ */ e(U, { children: [
        /* @__PURE__ */ e("h2", { class: "pa-h2", children: "Your Position" }),
        /* @__PURE__ */ e(Ae, { children: /* @__PURE__ */ e("button", { class: "pa-pos", onClick: () => n.push({ k: "position", id: v.id }), children: [
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
              ue(Math.abs(Number(v.size))),
              " ",
              s.base
            ] })
          ] }),
          /* @__PURE__ */ e("span", { class: "r num", children: [
            /* @__PURE__ */ e("b", { children: H(Math.abs(Number(v.size)) * s.mark) }),
            /* @__PURE__ */ e("span", { class: Number(v.upnl) >= 0 ? "pos" : "neg", children: H(Number(v.upnl), { sign: !0 }) })
          ] }),
          /* @__PURE__ */ e(Y, { n: "right", size: 18, cls: "chev" })
        ] }) })
      ] }),
      C.length > 0 && /* @__PURE__ */ e(U, { children: [
        /* @__PURE__ */ e("h2", { class: "pa-h2", children: "Open Orders" }),
        /* @__PURE__ */ e(Ae, { children: C.map((S) => /* @__PURE__ */ e("div", { class: "pa-row", children: [
          /* @__PURE__ */ e("span", { class: "l", children: [
            /* @__PURE__ */ e("span", { class: "k", children: [
              /* @__PURE__ */ e("span", { class: S.side === "buy" ? "pos" : "neg", children: S.side === "buy" ? "Buy" : "Sell" }),
              " ",
              String(S.type).replace(/_/g, " "),
              S.reduce_only ? " · closes" : ""
            ] }),
            /* @__PURE__ */ e("span", { class: "s num", children: [
              ue(Number(S.size)),
              " ",
              s.base,
              " @ ",
              K(Number(S.price) || Number(S.stop_price), y)
            ] })
          ] }),
          /* @__PURE__ */ e("button", { class: "pa-btn dark xs", onClick: () => t.cancelOrder(S), children: "Cancel" })
        ] }, S.id)) })
      ] }),
      /* @__PURE__ */ e("h2", { class: "pa-h2", children: "Stats" }),
      /* @__PURE__ */ e(Ae, { children: [
        /* @__PURE__ */ e(ne, { k: "Mark price", info: () => r("mark"), v: /* @__PURE__ */ e("span", { class: "num", children: K(s.mark, y) }) }),
        /* @__PURE__ */ e(ne, { k: "Index price", info: () => r("index"), v: /* @__PURE__ */ e("span", { class: "num", children: K(s.index, y) }) }),
        /* @__PURE__ */ e(ne, { k: "24h volume", v: /* @__PURE__ */ e("span", { class: "num", children: In(s.vol24) }) }),
        /* @__PURE__ */ e(ne, { k: "Open interest", v: /* @__PURE__ */ e("span", { class: "num", children: m === null ? "—" : In(m * s.mark) }) }),
        /* @__PURE__ */ e(
          ne,
          {
            k: "Funding",
            info: () => r("funding"),
            v: /* @__PURE__ */ e("span", { class: `num ${s.funding > 0 ? "neg" : s.funding < 0 ? "pos" : ""}`, children: ps(s.funding) }),
            vsub: s.nextFunding > Date.now() ? /* @__PURE__ */ e("span", { class: "num", children: `next in ${Ss(s.nextFunding)}` }) : void 0
          }
        ),
        /* @__PURE__ */ e(ne, { k: "Max leverage", v: `${s.strikeMaxLev}x`, vsub: s.maxLev < s.strikeMaxLev ? `up to ${s.maxLev}x in this wallet` : void 0 }),
        /* @__PURE__ */ e(ne, { k: "Minimum order", v: /* @__PURE__ */ e("span", { class: "num", children: H(s.spec.minNotional, { decimals: 0 }) }) })
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-bottom-pad" })
    ] }),
    /* @__PURE__ */ e("div", { class: "pa-dock", children: [
      /* @__PURE__ */ e("button", { class: "pa-btn long", onClick: () => n.push({ k: "trade", sym: i, side: "buy" }), children: "Long" }),
      /* @__PURE__ */ e("button", { class: "pa-btn short", onClick: () => n.push({ k: "trade", sym: i, side: "sell" }), children: "Short" })
    ] })
  ] });
}
const Xa = [
  { id: "high", icon: "bolt", title: "High risk tolerance", text: "Big swings are fine with me, and I accept I could lose all of the funds I add.", lev: 10 },
  { id: "medium", icon: "chart", title: "Medium risk tolerance", text: "Some swings are fine, and I accept I could lose a large part of the funds I add.", lev: 5 },
  { id: "low", icon: "shield", title: "Low risk tolerance", text: "I prefer small swings and want liquidation to stay far away.", lev: 2 }
];
function jp({ s: t, nav: n, onLearn: i }) {
  const [r, s] = g(0), [a, o] = g(""), c = Math.max(1, ...t.markets.map((u) => u.maxLev), 1), d = Math.min(...t.markets.map((u) => u.spec.minNotional).filter((u) => u > 0), 10), p = () => {
    const u = Xa.find((l) => l.id === a);
    u && dn("default-leverage", String(Math.min(u.lev, c))), dn("onboarded", "1"), n.back(), t.session || t.setSheet("connect");
  };
  return /* @__PURE__ */ e("div", { class: "pa-screen onboard", children: [
    /* @__PURE__ */ e("div", { class: "pa-top", children: [
      /* @__PURE__ */ e(rt, { n: r ? "back" : "x", label: r ? "Back" : "Close", onClick: () => r ? s(r - 1) : n.back() }),
      /* @__PURE__ */ e("div", { class: "pa-dots", "aria-hidden": "true", children: [0, 1, 2].map((u) => /* @__PURE__ */ e("span", { class: u === r ? "on" : "" }, u)) }),
      /* @__PURE__ */ e("span", { class: "pa-round ghost" })
    ] }),
    r === 0 && /* @__PURE__ */ e("div", { class: "pa-ob", children: [
      /* @__PURE__ */ e(Gp, {}),
      /* @__PURE__ */ e("h1", { children: "Trade future prices with Perps" }),
      /* @__PURE__ */ e("p", { class: "lede", children: `Perps let you trade on whether a price goes up ("long") or down ("short"), on Strike's markets.` }),
      /* @__PURE__ */ e("div", { class: "pt", children: [
        /* @__PURE__ */ e(Y, { n: "wallet", size: 22 }),
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
        /* @__PURE__ */ e(Y, { n: "chart", size: 22 }),
        /* @__PURE__ */ e("span", { children: [
          /* @__PURE__ */ e("b", { children: [
            "Add up to ",
            c,
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
      /* @__PURE__ */ e("div", { class: "pa-risks", role: "radiogroup", children: Xa.map((u) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": a === u.id, class: `pa-risk${a === u.id ? " on" : ""}`, onClick: () => o(u.id), children: [
        /* @__PURE__ */ e(Y, { n: u.icon, size: 20 }),
        /* @__PURE__ */ e("span", { class: "l", children: [
          /* @__PURE__ */ e("b", { children: u.title }),
          /* @__PURE__ */ e("span", { children: u.text }),
          /* @__PURE__ */ e("span", { class: "lev", children: [
            "Starts at ",
            Math.min(u.lev, c),
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
function Gp() {
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
function Vp({ s: t, nav: n, id: i, onLearn: r }) {
  const s = t.positions.find((C) => C.id === i), [a, o] = g(null);
  if (!s)
    return /* @__PURE__ */ e("div", { class: "pa-screen", children: [
      /* @__PURE__ */ e("div", { class: "pa-top", children: [
        /* @__PURE__ */ e(rt, { n: "back", label: "Back", onClick: n.back }),
        /* @__PURE__ */ e("div", { class: "pa-title", children: "Position" })
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-empty", children: "This position is closed." })
    ] });
  const c = t.bySymbol[s.symbol], d = s.symbol.split("-")[0], p = Number(s.size), u = p > 0, l = c?.mark || Number(s.entry_price), h = c?.spec.tickSize, m = Math.abs(p) * l, f = Number(s.entry_price), k = Number(s.upnl), y = mr(s), _ = y > 0 ? k / y * 100 : 0, w = Number(s.liquidation_price), T = yr(t, s.symbol), $ = Number(s.accumulated_funding_fees), v = s.margin_mode === "isolated";
  return /* @__PURE__ */ e("div", { class: "pa-screen", children: [
    /* @__PURE__ */ e("div", { class: "pa-top", children: [
      /* @__PURE__ */ e(rt, { n: "back", label: "Back", onClick: n.back }),
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
        /* @__PURE__ */ e("span", { class: "nm", children: c?.name ?? d })
      ] }),
      /* @__PURE__ */ e("div", { class: `pa-price num ${k >= 0 ? "pos" : "neg"}`, children: H(k, { sign: !0 }) }),
      /* @__PURE__ */ e("div", { class: `pa-chg num ${_ >= 0 ? "pos" : "neg"}`, children: [
        dt(_),
        " ",
        /* @__PURE__ */ e("span", { class: "muted", children: "return on margin" })
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-tools", children: [
        /* @__PURE__ */ e("button", { onClick: () => o("tpsl"), children: [
          /* @__PURE__ */ e(Y, { n: "shield", size: 18 }),
          "TP / SL"
        ] }),
        /* @__PURE__ */ e("button", { onClick: () => o("trail"), children: [
          /* @__PURE__ */ e(Y, { n: "line", size: 18 }),
          "Trailing"
        ] }),
        v && /* @__PURE__ */ e("button", { onClick: () => o("margin"), children: [
          /* @__PURE__ */ e(Y, { n: "plus", size: 18 }),
          "Margin"
        ] }),
        /* @__PURE__ */ e("button", { onClick: () => o("reverse"), children: [
          /* @__PURE__ */ e(Y, { n: "swap", size: 18 }),
          "Reverse"
        ] })
      ] }),
      /* @__PURE__ */ e(Ae, { children: [
        /* @__PURE__ */ e(ne, { k: "Size", v: /* @__PURE__ */ e("span", { class: "num", children: `${ue(Math.abs(p))} ${d}` }), vsub: /* @__PURE__ */ e("span", { class: "num", children: H(m) }) }),
        /* @__PURE__ */ e(ne, { k: "Entry price", v: /* @__PURE__ */ e("span", { class: "num", children: K(f, h) }) }),
        /* @__PURE__ */ e(ne, { k: "Mark price", info: () => r("mark"), v: /* @__PURE__ */ e("span", { class: "num", children: K(l, h) }) }),
        /* @__PURE__ */ e(ne, { k: "Liquidation price", info: () => r("leverage"), v: /* @__PURE__ */ e("span", { class: "num", children: w > 0 ? K(w, h) : "—" }), vsub: w > 0 && l > 0 ? /* @__PURE__ */ e("span", { class: "num", children: `${(Math.abs(w - l) / l * 100).toFixed(1)}% away` }) : void 0 }),
        /* @__PURE__ */ e(ne, { k: "Margin", v: /* @__PURE__ */ e("span", { class: "num", children: H(y) }) }),
        Number.isFinite($) && $ !== 0 && /* @__PURE__ */ e(ne, { k: "Funding fees", info: () => r("funding"), v: /* @__PURE__ */ e("span", { class: "num", children: H($, { decimals: 4 }) }), vsub: "as Strike reports" })
      ] }),
      T.length > 0 && /* @__PURE__ */ e(U, { children: [
        /* @__PURE__ */ e("h2", { class: "pa-h2", children: "Exit orders" }),
        /* @__PURE__ */ e(Ae, { children: T.map((C) => /* @__PURE__ */ e("div", { class: "pa-row", children: [
          /* @__PURE__ */ e("span", { class: "l", children: [
            /* @__PURE__ */ e("span", { class: "k", children: /take_profit/.test(String(C.type)) ? "Take profit" : /trailing/.test(String(C.type)) ? "Trailing stop" : /stop/.test(String(C.type)) ? "Stop loss" : "Limit close" }),
            /* @__PURE__ */ e("span", { class: "s num", children: [
              ue(Number(C.size)),
              " ",
              d,
              " at ",
              K(Number(C.stop_price) || Number(C.price), h)
            ] })
          ] }),
          /* @__PURE__ */ e("button", { class: "pa-btn dark xs", onClick: () => t.cancelOrder(C), children: "Remove" })
        ] }, C.id)) })
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-bottom-pad" })
    ] }),
    /* @__PURE__ */ e("div", { class: "pa-dock", children: [
      /* @__PURE__ */ e("button", { class: "pa-btn dark", onClick: () => n.push({ k: "trade", sym: s.symbol, side: u ? "buy" : "sell" }), children: "Add more" }),
      /* @__PURE__ */ e("button", { class: "pa-btn primary", onClick: () => o("close"), children: "Close" })
    ] }),
    a === "close" && /* @__PURE__ */ e(As, { s: t, p: s, onClose: () => o(null), onClosed: n.back }),
    a === "tpsl" && /* @__PURE__ */ e(Ms, { s: t, p: s, onClose: () => o(null) }),
    a === "trail" && /* @__PURE__ */ e(zs, { s: t, p: s, onClose: () => o(null) }),
    a === "margin" && /* @__PURE__ */ e(Ts, { s: t, p: s, onClose: () => o(null) }),
    a === "reverse" && /* @__PURE__ */ e(Ns, { s: t, p: s, onClose: () => o(null) })
  ] });
}
const Yp = 0.02;
function Kp(t, n, i) {
  for (let r = Math.max(1, Math.floor(i)); r > 1; r--) if (Yn(t, Math.max(1, n) * r) >= r) return r;
  return 1;
}
function Xp({ s: t, nav: n, sym: i, side: r, onLearn: s, onDisclosures: a }) {
  const o = t.bySymbol[i], c = t.client.raw(i), [d, p] = g(r), [u, l] = g("amount"), [h, m] = g("market"), [f, k] = g("usd"), [y, _] = g(""), [w, T] = g(() => {
    const D = t.config.leverage ?? Number(dn("default-leverage"));
    return Math.max(1, Math.min(o?.maxLev ?? 2, D >= 1 ? D : 2));
  }), [$, v] = g(""), [C, S] = g({ workingType: "mark_price", tif: "GTC", callbackRate: 1, twapMinutes: 60 }), [q, x] = g(0), [z, N] = g(0), [R, oe] = g("pnl"), [M, I] = g(null), [F, W] = g(""), [P, A] = g(!1), [O, J] = g(void 0), le = o?.base ?? i.split("-")[0], Me = o?.mark ?? 0, Le = o?.spec.tickSize, pt = {
    spec: o?.spec,
    mark: Me,
    last: o?.last ?? 0,
    available: t.available,
    takerRate: t.takerRate,
    feeBps: t.client.orderFeeBps,
    maxLeverage: t.config.maxLeverage,
    limitBound: Number(c?.order_limit_price_bound) || 0.05,
    position: t.session ? Number(t.positions.find((D) => D.symbol === i)?.size) || 0 : void 0
  }, ke = h === "market" || h === "limit", G = { ...C, symbol: i, side: d, type: h, amount: Number(y) || 0, unit: f, leverage: w, limitPrice: Number($) || 0, tp: ke ? q : 0, sl: ke ? z : 0, autoMode: R }, X = Es(G, pt), xe = f === "usd" ? 2 : hr(o?.spec.stepSize ?? 0.01), Re = Oe(xe);
  Re.current = xe;
  const Ee = tn(() => (D) => _((ie) => Hd(ie, D, Re.current)), []), st = Number(t.account?.symbol_settings?.[i]?.leverage) || 0;
  Z(() => {
    st >= 1 && !t.config.leverage && T(Math.min(o?.maxLev ?? st, st));
  }, [i, st]);
  const ft = u === "review" && h === "market" && X.size > 0;
  Z(() => {
    if (J(void 0), !ft) return;
    const D = t.client.orderBook(i);
    let ie;
    const de = D.onUpdate(() => {
      ie || (ie = setTimeout(() => (ie = void 0, J(D.view(200))), 250));
    }), V = setTimeout(() => J((Pe) => Pe === void 0 ? null : Pe), 1e4);
    return () => (de(), clearTimeout(ie), clearTimeout(V), D.close());
  }, [ft, i]);
  const ut = Number(c?.order_market_price_bound) || pt.limitBound, ze = ft && O ? gr(O, d, X.size, { mark: Me, bound: ut }) : null, Pt = `k|${d}|${X.size}|${ze ? ze.complete ? Math.ceil(ze.slippage * 200) : "partial" : O === null ? "nobook" : "empty"}`, pn = ft && !!O && !(d === "buy" ? O.asks.length : O.bids.length), et = ft && (!!ze && (ze.slippage > Yp || !ze.complete || ze.beyondBand) || O === null || pn);
  if (Z(() => {
    if (!F) return;
    const D = setTimeout(() => W(""), 15e3);
    return () => clearTimeout(D);
  }, [F]), !o)
    return /* @__PURE__ */ e("div", { class: "pa-screen", children: [
      /* @__PURE__ */ e("div", { class: "pa-top", children: /* @__PURE__ */ e(rt, { n: "x", label: "Close", onClick: n.back }) }),
      /* @__PURE__ */ e("div", { class: "pa-empty", children: t.markets.length ? `${i} isn't listed here.` : "Loading…" })
    ] });
  const St = d === "buy" ? "Long" : "Short", Bt = (D) => {
    const ie = Ls(pt, w, D);
    ie > 0 && _(f === "usd" ? ie.toFixed(2) : me(ie * X.lev / (X.px || Me), o.spec.stepSize, "floor"));
  }, L = f === "usd" ? `$${y || "0"}` : `${y || "0"} ${le}`, B = L.length > 9 ? "xl" : L.length > 6 ? "xxl" : "xxxl", Q = X.kind === "min" || X.kind === "funds" || X.kind === "price" || X.kind === "tpsl" ? X.problem : null, ae = async () => {
    if (!X.ok) return I("alert");
    if (et && F !== Pt) return W(Pt);
    A(!0), W("");
    const D = await t.placeDraft(G, X, le, ze && ze.complete && !ze.beyondBand ? ze.avgPrice : void 0);
    A(!1), D !== "failed" && n.replace({ k: "market", sym: i });
  }, te = /* @__PURE__ */ e("div", { class: "pa-top", children: [
    u === "review" ? /* @__PURE__ */ e(rt, { n: "back", label: "Back", onClick: () => l("amount") }) : /* @__PURE__ */ e(rt, { n: "x", label: "Close", onClick: n.back }),
    /* @__PURE__ */ e("div", { class: "pa-title two", children: u === "review" ? /* @__PURE__ */ e(U, { children: [
      /* @__PURE__ */ e("b", { children: "Review" }),
      /* @__PURE__ */ e("span", { children: [
        St,
        " ",
        le
      ] })
    ] }) : /* @__PURE__ */ e(U, { children: [
      /* @__PURE__ */ e("button", { class: "pa-side", onClick: () => I("side"), "aria-label": "Change side", children: [
        St,
        " ",
        le,
        " ",
        /* @__PURE__ */ e(Y, { n: "down", size: 14 })
      ] }),
      /* @__PURE__ */ e("span", { class: "num", children: [
        "Price ",
        K(Me, Le)
      ] })
    ] }) }),
    /* @__PURE__ */ e("span", { class: "sp" }),
    /* @__PURE__ */ e(rt, { n: "sliders", label: "Settings", onClick: () => I("settings") })
  ] });
  return /* @__PURE__ */ e("div", { class: "pa-screen trade", children: [
    te,
    u === "amount" ? /* @__PURE__ */ e("div", { class: "pa-amount", children: [
      /* @__PURE__ */ e("div", { class: "pa-amount-top", children: [
        /* @__PURE__ */ e("div", { class: `pa-big num ${B}${y ? "" : " zero"}`, "aria-live": "polite", children: L }),
        /* @__PURE__ */ e("button", { class: "pa-levline", onClick: () => I("lev"), children: [
          X.lev,
          "x leverage ",
          /* @__PURE__ */ e(Y, { n: "down", size: 16 })
        ] }),
        h !== "market" && /* @__PURE__ */ e("button", { class: "pa-levline sub", onClick: () => I("ordertype"), children: [
          Za(h, $, C, Le),
          " ",
          /* @__PURE__ */ e(Y, { n: "down", size: 16 })
        ] }),
        Q && /* @__PURE__ */ e("div", { class: "pa-err", children: Q }),
        !Q && y && X.size > 0 && /* @__PURE__ */ e("div", { class: "pa-note num", children: [
          "≈ ",
          ue(X.size),
          " ",
          le,
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
        /* @__PURE__ */ e(Y, { n: "down", size: 18 })
      ] }),
      t.session ? t.accountLoaded && t.available <= 0 ? /* @__PURE__ */ e("button", { class: "pa-btn primary big", onClick: () => t.openFunds("deposit"), children: "Add funds" }) : y ? /* @__PURE__ */ e("button", { class: "pa-btn primary big", disabled: !X.ok, onClick: () => l("review"), children: "Review" }) : /* @__PURE__ */ e("div", { class: "pa-pcts", children: [0.25, 0.5, 1].map((D) => /* @__PURE__ */ e("button", { class: "pa-btn dark", onClick: () => Bt(D), children: [
        D * 100,
        "%"
      ] }, D)) }) : /* @__PURE__ */ e("button", { class: "pa-btn primary big", onClick: () => t.setSheet("connect"), children: "Connect wallet" }),
      /* @__PURE__ */ e(Ud, { onKey: Ee })
    ] }) : /* @__PURE__ */ e("div", { class: "pa-review", children: [
      /* @__PURE__ */ e("div", { class: "pa-scroll", children: [
        /* @__PURE__ */ e("div", { class: "pa-big num xxl", children: H(X.margin) }),
        /* @__PURE__ */ e("div", { class: "pa-lines", children: [
          /* @__PURE__ */ e(
            ne,
            {
              k: St,
              sub: /* @__PURE__ */ e("span", { class: "num", children: [
                ue(X.size),
                " ",
                le,
                " · ",
                h === "market" ? `Current Price ${K(Me, Le)}` : Za(h, $, C, Le)
              ] }),
              info: () => I("side")
            }
          ),
          /* @__PURE__ */ e(ne, { k: "Leverage", sub: /* @__PURE__ */ e("span", { class: "num", children: `${X.lev}x · Liq. ≈ ${K(X.liq, Le)}` }), onClick: () => I("lev"), chevron: "down" }),
          ke && /* @__PURE__ */ e(
            ne,
            {
              k: q || z ? "Auto Close" : "Add Auto Close",
              sub: q || z ? /* @__PURE__ */ e("span", { class: "num", children: [X.tpPrice ? `TP ${K(X.tpPrice, Le)}` : "", X.slPrice ? `SL ${K(X.slPrice, Le)}` : ""].filter(Boolean).join(" · ") }) : void 0,
              onClick: () => I("auto"),
              chevron: q || z ? "down" : "plus"
            }
          ),
          /* @__PURE__ */ e(ne, { k: "Payment", sub: /* @__PURE__ */ e("span", { class: "num", children: `Perps Balance · ${h !== "market" ? "up to " : ""}${(X.feeRate * 100).toFixed(3)}% fee` }), info: () => I("fees") }),
          ze && ze.complete && !ze.beyondBand && /* @__PURE__ */ e(
            ne,
            {
              k: "Est. fill price",
              sub: /* @__PURE__ */ e("span", { class: `num ${ze.slippage > 5e-3 ? "neg" : ""}`, children: `${K(ze.avgPrice, Le)} · slippage ${(ze.slippage * 100).toFixed(2)}%` })
            }
          )
        ] }),
        ft && O === void 0 && /* @__PURE__ */ e("div", { class: "pa-note", children: [
          /* @__PURE__ */ e(Qe, { size: 12 }),
          " Checking the order book…"
        ] }),
        et && /* @__PURE__ */ e("div", { class: "pa-warn", children: [
          /* @__PURE__ */ e(Y, { n: "warn", size: 16 }),
          O === null ? "The order book isn't available, so slippage can't be estimated." : pn ? `There are no ${d === "buy" ? "sellers" : "buyers"} on the order book right now, so a market order would be cancelled.` : ze && (!ze.complete || ze.beyondBand) ? `There aren't enough ${d === "buy" ? "sellers" : "buyers"} near the market price to fill this, so Strike may cancel some or all of it.` : `This size moves through the book: est. ${((ze?.slippage ?? 0) * 100).toFixed(2)}% from the market price.`,
          F === Pt ? " Tap Confirm again to send it anyway." : ""
        ] }),
        X.liqDistance > 0 && X.liqDistance < 0.1 && /* @__PURE__ */ e("div", { class: "pa-warn", children: [
          /* @__PURE__ */ e(Y, { n: "warn", size: 16 }),
          " High risk: liquidation is only ",
          (X.liqDistance * 100).toFixed(1),
          "% away. Lower leverage gives you more room."
        ] }),
        /* @__PURE__ */ e("button", { class: "pa-foot-link", onClick: a, children: [
          /* @__PURE__ */ e(Y, { n: "info", size: 15 }),
          " View Disclosures"
        ] })
      ] }),
      /* @__PURE__ */ e("div", { class: "pa-dock single", children: /* @__PURE__ */ e("button", { class: `pa-btn primary big${F === Pt && et ? " caution" : ""}`, disabled: P || ft && O === void 0, onClick: ae, children: P ? /* @__PURE__ */ e(Qe, { size: 18 }) : F === Pt && et ? "Confirm anyway" : "Confirm" }) })
    ] }),
    M === "lev" && /* @__PURE__ */ e(Zp, { s: t, z: X, draft: G, ctx: pt, onClose: () => I(null), onApply: (D) => (T(D), I(null)) }),
    M === "settings" && /* @__PURE__ */ e(Be, { title: "Settings", onClose: () => I(null), children: /* @__PURE__ */ e(Ae, { children: [
      /* @__PURE__ */ e(ne, { k: "Display currency", v: f === "usd" ? "USD" : le, onClick: () => I("currency"), chevron: "right" }),
      /* @__PURE__ */ e(ne, { k: "Order Type", v: ni.find((D) => D.type === h)?.label ?? "Market", onClick: () => I("ordertype"), chevron: "right" })
    ] }) }),
    M === "currency" && /* @__PURE__ */ e(Be, { title: "Display currency", onClose: () => I(null), onBack: () => I("settings"), onDone: () => I(null), children: /* @__PURE__ */ e(Ae, { children: ["usd", "base"].map((D) => /* @__PURE__ */ e("button", { class: "pa-row", onClick: () => (D !== f && _(""), k(D)), children: [
      /* @__PURE__ */ e("span", { class: "l", children: [
        /* @__PURE__ */ e("span", { class: "k", children: D === "usd" ? "USD" : le }),
        /* @__PURE__ */ e("span", { class: "s", children: D === "usd" ? "Enter the margin you put in, in US dollars" : `Enter the position size in ${le}` })
      ] }),
      /* @__PURE__ */ e("span", { class: `pa-radio${f === D ? " on" : ""}` })
    ] }, D)) }) }),
    M === "ordertype" && /* @__PURE__ */ e(
      Jp,
      {
        type: h,
        limit: $,
        ext: C,
        side: d,
        mark: Me,
        tick: Le,
        onBack: () => I("settings"),
        onClose: () => I(null),
        onApply: (D, ie, de) => (m(D), v(ie), S(de), I(null))
      }
    ),
    M === "auto" && /* @__PURE__ */ e(
      Qp,
      {
        side: d,
        entry: X.px || Me,
        lev: X.lev,
        tick: Le,
        mode: R,
        tp: q,
        sl: z,
        onClose: () => I(null),
        onApply: (D, ie, de) => (oe(D), x(ie), N(de), I(null))
      }
    ),
    M === "alert" && /* @__PURE__ */ e(Be, { title: "", onClose: () => I(null), children: /* @__PURE__ */ e("div", { class: "pa-alert", children: [
      /* @__PURE__ */ e("span", { class: "ic", children: /* @__PURE__ */ e(Y, { n: "warn", size: 26 }) }),
      /* @__PURE__ */ e("b", { children: X.problem }),
      /* @__PURE__ */ e("span", { children: X.kind === "min" ? "Increase your margin or leverage to continue." : X.kind === "funds" ? "Add funds or lower the amount to continue." : "Edit your order to continue." }),
      /* @__PURE__ */ e("button", { class: "pa-btn dark wide", onClick: () => (I(null), l("amount")), children: "Edit" })
    ] }) }),
    M === "fees" && /* @__PURE__ */ e(Be, { title: "Fees", onClose: () => I(null), children: [
      /* @__PURE__ */ e(Ae, { children: [
        /* @__PURE__ */ e(ne, { k: "Strike trading fee (taker)", v: /* @__PURE__ */ e("span", { class: "num", children: [
          (t.takerRate * 100).toFixed(3),
          "%"
        ] }) }),
        /* @__PURE__ */ e(ne, { k: `Builder fee (${t.config.builderCode})`, v: /* @__PURE__ */ e("span", { class: "num", children: [
          (t.client.orderFeeBps / 100).toFixed(2),
          "%"
        ] }) }),
        /* @__PURE__ */ e(ne, { k: h === "limit" ? "Estimated total (if it fills at once)" : "Estimated total", v: /* @__PURE__ */ e("span", { class: "num", children: H(X.fee, { decimals: X.fee < 0.1 ? 4 : 2 }) }) })
      ] }),
      /* @__PURE__ */ e("p", { class: "pa-p", children: "Fees are charged on the position size when the order fills, and again when you close. A limit order that waits on the book pays Strike's lower maker fee instead of the taker fee; the builder fee is the same. Funding is paid or received every hour while the position is open." })
    ] }),
    M === "side" && /* @__PURE__ */ e(Be, { title: "Long or Short", onClose: () => I(null), children: [
      /* @__PURE__ */ e(Ae, { children: ["buy", "sell"].map((D) => /* @__PURE__ */ e("button", { class: "pa-row", onClick: () => (p(D), I(null)), children: [
        /* @__PURE__ */ e("span", { class: "l", children: [
          /* @__PURE__ */ e("span", { class: `k ${D === "buy" ? "pos" : "neg"}`, children: D === "buy" ? "Long" : "Short" }),
          /* @__PURE__ */ e("span", { class: "s", children: D === "buy" ? `Profit if ${le} goes up` : `Profit if ${le} goes down` })
        ] }),
        /* @__PURE__ */ e("span", { class: `pa-radio${d === D ? " on" : ""}` })
      ] }, D)) }),
      /* @__PURE__ */ e("button", { class: "pa-foot-link", onClick: () => (I(null), s("basics")), children: [
        /* @__PURE__ */ e(Y, { n: "info", size: 15 }),
        " How Perps work"
      ] })
    ] })
  ] });
}
function Zp({ s: t, z: n, draft: i, ctx: r, onClose: s, onApply: a }) {
  const o = r.spec, c = i.unit === "usd" ? i.amount : n.margin, d = Math.max(1, Math.min(t.config.maxLeverage, o.maxLeverage, c > 0 ? Kp(o.marginTiers, c, o.maxLeverage) : o.maxLeverage)), [p, u] = g(Math.min(n.lev, d)), l = Es({ ...i, leverage: p }, r), h = c > 0 ? Math.ceil(o.minNotional / c - 1e-9) : 1, m = o.tickSize, f = [1, 2, 5, 10, 20, 25, 40, 50, 75, 100].filter((k) => k <= d);
  return /* @__PURE__ */ e(Be, { title: "Leverage", onClose: s, onDone: () => a(p), children: [
    /* @__PURE__ */ e("p", { class: "pa-p c", children: "Leverage multiplies your position, and your gains and losses with it." }),
    /* @__PURE__ */ e("div", { class: "pa-levbig num", children: [
      p,
      "x"
    ] }),
    /* @__PURE__ */ e(Pi, { min: 1, max: d, value: p, onChange: u, label: "Leverage", marks: f }),
    /* @__PURE__ */ e("div", { class: "pa-levmarks", children: f.map((k) => /* @__PURE__ */ e("button", { class: k === p ? "on" : "", onClick: () => u(k), children: [
      k,
      "x"
    ] }, k)) }),
    /* @__PURE__ */ e(Ae, { children: [
      /* @__PURE__ */ e(ne, { k: "Current Price", v: /* @__PURE__ */ e("span", { class: "num", children: K(r.mark, m) }) }),
      /* @__PURE__ */ e(ne, { k: "Liquidation (est.)", v: /* @__PURE__ */ e("span", { class: "num", children: l.liq > 0 ? K(l.liq, m) : "—" }) }),
      /* @__PURE__ */ e(ne, { k: "Distance", v: /* @__PURE__ */ e("span", { class: "num", children: l.liq > 0 ? Li(l.px || r.mark, l.liq) : "—" }) })
    ] }),
    c > 0 && p < h && h <= d && /* @__PURE__ */ e("div", { class: "pa-err sm", children: [
      "This leverage makes your position smaller than the market minimum (",
      H(o.minNotional, { decimals: 0 }),
      "). Use at least ",
      h,
      "x or increase your margin."
    ] }),
    l.liqDistance > 0 && l.liqDistance < 0.1 && /* @__PURE__ */ e("div", { class: "pa-err sm", children: [
      "High risk: a ",
      (l.liqDistance * 100).toFixed(1),
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
function Za(t, n, i, r) {
  const s = ni.find((c) => c.type === t)?.label ?? "Market", a = (c) => Number(c) > 0 ? K(Number(c), r) : "set a price", o = [];
  return t === "limit" ? o.push(`Limit ${a(n)}`) : t === "stop" || t === "take_profit" ? o.push(`${s} · trigger ${a(i.triggerPrice)}`) : t === "stop_limit" || t === "take_profit_limit" ? o.push(`${s} · ${a(i.triggerPrice)} → ${a(n)}`) : t === "trailing_stop_market" ? o.push(`Trailing ${i.callbackRate ?? 1}%${Number(i.activationPrice) > 0 ? ` from ${a(i.activationPrice)}` : ""}`) : t === "twap" ? o.push(`TWAP · ${i.twapMinutes ?? 60} min`) : o.push(s), (t === "limit" || t === "stop_limit" || t === "take_profit_limit") && i.tif && i.tif !== "GTC" && o.push(i.tif), t === "limit" && i.postOnly && o.push("Post only"), (i.reduceOnly || t === "trailing_stop_market") && o.push("Reduce only"), o.join(" · ");
}
function Jp({
  type: t,
  limit: n,
  ext: i,
  side: r,
  mark: s,
  tick: a,
  onBack: o,
  onClose: c,
  onApply: d
}) {
  const [p, u] = g(t), l = s ? me(s, a ?? 1e-4) : "", [h, m] = g(n || l), [f, k] = g(i), [y, _] = g(Number(i.triggerPrice) > 0 ? String(i.triggerPrice) : l), w = (x) => k({ ...f, ...x }), T = p === "limit" || p === "stop_limit" || p === "take_profit_limit", $ = p === "stop" || p === "stop_limit" || p === "take_profit" || p === "take_profit_limit", v = (x) => {
    const z = Number(x) > 0 && s > 0 ? (Number(x) - s) / s * 100 : 0;
    return Math.abs(z) < 5e-3 ? 0 : z;
  }, C = (!T || Number(h) > 0) && (!$ || Number(y) > 0) && (p !== "trailing_stop_market" || Number(f.callbackRate) >= 0.1 && Number(f.callbackRate) <= 5) && (p !== "twap" || Number(f.twapMinutes) >= 5 && Number(f.twapMinutes) <= 1440), S = () => d(p, T ? h : "", { ...f, triggerPrice: $ ? Number(y) : void 0 }), q = p === "stop" || p === "stop_limit" ? r === "buy" ? "Buy stop: set the trigger above the current price." : "Sell stop: set the trigger below the current price." : p === "take_profit" || p === "take_profit_limit" ? r === "sell" ? "Sell take-profit: set the target above the current price." : "Buy take-profit: set the target below the current price." : "";
  return /* @__PURE__ */ e(Be, { title: "Order Type", onClose: c, onBack: o, onDone: S, doneDisabled: !C, tall: !0, children: [
    /* @__PURE__ */ e(Ae, { children: ni.map((x) => /* @__PURE__ */ e("button", { class: "pa-row opt", onClick: () => u(x.type), children: [
      /* @__PURE__ */ e("span", { class: "ck", children: p === x.type && /* @__PURE__ */ e(Y, { n: "check", size: 18 }) }),
      /* @__PURE__ */ e("span", { class: "l", children: [
        /* @__PURE__ */ e("span", { class: "k", children: x.label }),
        /* @__PURE__ */ e("span", { class: "s", children: x.desc })
      ] })
    ] }, x.type)) }),
    $ && /* @__PURE__ */ e("label", { class: "pa-field", children: [
      /* @__PURE__ */ e("span", { class: "lbl", children: p.startsWith("take") ? "Target price" : "Trigger price" }),
      /* @__PURE__ */ e("span", { class: "in", children: [
        /* @__PURE__ */ e("input", { inputMode: "decimal", value: y, "aria-label": "Trigger price", onInput: (x) => _(Ce(x)) }),
        /* @__PURE__ */ e("span", { class: `num ${v(y) >= 0 ? "pos" : "neg"}`, children: [
          "(",
          dt(v(y)),
          ")"
        ] })
      ] }),
      q && /* @__PURE__ */ e("span", { class: "hint", children: q })
    ] }),
    T && /* @__PURE__ */ e("label", { class: "pa-field", children: [
      /* @__PURE__ */ e("span", { class: "lbl", children: "Limit Price" }),
      /* @__PURE__ */ e("span", { class: "in", children: [
        /* @__PURE__ */ e("input", { inputMode: "decimal", value: h, "aria-label": "Limit price", onInput: (x) => m(Ce(x)) }),
        /* @__PURE__ */ e("span", { class: `num ${v(h) >= 0 ? "pos" : "neg"}`, children: [
          "(",
          dt(v(h)),
          ")"
        ] })
      ] })
    ] }),
    p === "trailing_stop_market" && /* @__PURE__ */ e(U, { children: [
      /* @__PURE__ */ e("label", { class: "pa-field", children: [
        /* @__PURE__ */ e("span", { class: "lbl", children: "Trail distance" }),
        /* @__PURE__ */ e("span", { class: "in", children: [
          /* @__PURE__ */ e("input", { inputMode: "decimal", value: String(f.callbackRate ?? ""), "aria-label": "Trail distance percent", onInput: (x) => w({ callbackRate: Number(Ce(x)) || 0 }) }),
          /* @__PURE__ */ e("span", { children: "%" })
        ] }),
        /* @__PURE__ */ e("span", { class: "hint", children: "Strike allows 0.1–5%. The stop follows the price and triggers when it turns back by this much." })
      ] }),
      /* @__PURE__ */ e("label", { class: "pa-field", children: [
        /* @__PURE__ */ e("span", { class: "lbl", children: "Activation price (optional)" }),
        /* @__PURE__ */ e("span", { class: "in", children: /* @__PURE__ */ e("input", { inputMode: "decimal", value: Number(f.activationPrice) > 0 ? String(f.activationPrice) : "", placeholder: "Start now", "aria-label": "Activation price", onInput: (x) => w({ activationPrice: Number(Ce(x)) || 0 }) }) })
      ] })
    ] }),
    p === "twap" && /* @__PURE__ */ e(U, { children: [
      /* @__PURE__ */ e("div", { class: "pa-lbl-row", children: "Duration" }),
      /* @__PURE__ */ e("div", { class: "pa-pcts four", children: [5, 15, 60, 240].map((x) => /* @__PURE__ */ e("button", { class: `pa-btn dark${f.twapMinutes === x ? " on" : ""}`, onClick: () => w({ twapMinutes: x }), children: x < 60 ? `${x}m` : `${x / 60}h` }, x)) }),
      /* @__PURE__ */ e("label", { class: "pa-field", children: [
        /* @__PURE__ */ e("span", { class: "lbl", children: "Price limit (optional)" }),
        /* @__PURE__ */ e("span", { class: "in", children: /* @__PURE__ */ e("input", { inputMode: "decimal", value: Number(f.twapLimit) > 0 ? String(f.twapLimit) : "", placeholder: "No limit", "aria-label": "TWAP price limit", onInput: (x) => w({ twapLimit: Number(Ce(x)) || 0 }) }) }),
        /* @__PURE__ */ e("span", { class: "hint", children: "Slices that would fill past this price are skipped." })
      ] })
    ] }),
    T && /* @__PURE__ */ e("div", { class: "pa-seg three", role: "radiogroup", "aria-label": "Time in force", children: ["GTC", "IOC", "FOK"].map((x) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": (f.tif ?? "GTC") === x, class: (f.tif ?? "GTC") === x ? "on" : "", onClick: () => w({ tif: x }), children: x === "GTC" ? "Good till cancel" : x === "IOC" ? "Fill now (IOC)" : "All or none" }, x)) }),
    ($ || p === "trailing_stop_market") && /* @__PURE__ */ e("div", { class: "pa-seg", role: "radiogroup", "aria-label": "Trigger price type", children: ["mark_price", "contract_price"].map((x) => /* @__PURE__ */ e("button", { role: "radio", "aria-checked": (f.workingType ?? "mark_price") === x, class: (f.workingType ?? "mark_price") === x ? "on" : "", onClick: () => w({ workingType: x }), children: x === "mark_price" ? "Trigger on mark" : "Trigger on last" }, x)) }),
    /* @__PURE__ */ e(Ae, { children: [
      p === "limit" && /* @__PURE__ */ e(Xi, { label: "Post only", sub: "Only adds liquidity (maker); cancelled if it would fill at once", on: !!f.postOnly, onChange: (x) => w({ postOnly: x }) }),
      p === "trailing_stop_market" ? /* @__PURE__ */ e(Xi, { label: "Reduce only", sub: "Always on: like on Strike, a trailing stop only closes or reduces your open position", on: !0, locked: !0, onChange: () => {
      } }) : /* @__PURE__ */ e(Xi, { label: "Reduce only", sub: "Only shrinks an open position, never opens or flips one", on: !!f.reduceOnly, onChange: (x) => w({ reduceOnly: x }) }),
      p === "twap" && /* @__PURE__ */ e(Xi, { label: "Randomize", sub: "Varies slice timing and size", on: !!f.randomize, onChange: (x) => w({ randomize: x }) }),
      /* @__PURE__ */ e(ne, { k: "Current Price", v: /* @__PURE__ */ e("span", { class: "num", children: K(s, a) }) })
    ] })
  ] });
}
function Xi({ label: t, sub: n, on: i, onChange: r, locked: s }) {
  return /* @__PURE__ */ e("button", { class: "pa-row", role: "switch", "aria-checked": i, "aria-disabled": s || void 0, disabled: s, onClick: () => !s && r(!i), children: [
    /* @__PURE__ */ e("span", { class: "l", children: [
      /* @__PURE__ */ e("span", { class: "k", children: t }),
      /* @__PURE__ */ e("span", { class: "s", children: n })
    ] }),
    /* @__PURE__ */ e("span", { class: `pa-switch${i ? " on" : ""}`, children: /* @__PURE__ */ e("span", {}) })
  ] });
}
function Qp({
  side: t,
  entry: n,
  lev: i,
  tick: r,
  mode: s,
  tp: a,
  sl: o,
  onClose: c,
  onApply: d
}) {
  const [p, u] = g(s), [l, h] = g(a ? String(a) : ""), [m, f] = g(o ? String(o) : ""), [k, y] = g("tp"), _ = Number(l) > 0 ? p === "pnl" ? t === "buy" ? n * (1 + Number(l) / 100 / i) : n * (1 - Number(l) / 100 / i) : Number(l) : 0, w = Number(m) > 0 ? p === "pnl" ? t === "buy" ? n * (1 - Number(m) / 100 / i) : n * (1 + Number(m) / 100 / i) : Number(m) : 0, T = () => {
    const v = p === "pnl" ? "price" : "pnl";
    v === "price" ? (h(_ ? me(_, r ?? 1e-4) : ""), f(w ? me(w, r ?? 1e-4) : "")) : (h(_ ? vn(t, n, i, _).toFixed(0) : ""), f(w ? Math.abs(vn(t, n, i, w)).toFixed(0) : "")), u(v);
  }, $ = k === "tp" ? [10, 25, 50, 100] : [10, 25, 50, 75];
  return /* @__PURE__ */ e(Be, { title: "Auto Close", onClose: c, onDone: () => d(p, Number(l) || 0, Number(m) || 0), children: [
    /* @__PURE__ */ e("button", { class: "pa-field toggle", onClick: T, children: [
      /* @__PURE__ */ e("span", { class: "lbl big", children: "Use" }),
      /* @__PURE__ */ e("span", { class: "v", children: [
        p === "pnl" ? "% P&L" : "Price",
        " ",
        /* @__PURE__ */ e(Y, { n: "down", size: 14 })
      ] })
    ] }),
    /* @__PURE__ */ e("label", { class: `pa-field${k === "tp" ? " focus" : ""}`, children: [
      /* @__PURE__ */ e("span", { class: "lbl", children: "Take Profit" }),
      /* @__PURE__ */ e("span", { class: "in", children: [
        p === "pnl" && /* @__PURE__ */ e("span", { class: "pos", children: "+" }),
        /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: "Enter Amount", value: l, onFocus: () => y("tp"), onInput: (v) => h(Ce(v)), "aria-label": "Take profit" }),
        p === "pnl" && l && /* @__PURE__ */ e("span", { children: "%" }),
        l && /* @__PURE__ */ e("button", { class: "clr", "aria-label": "Clear take profit", onClick: (v) => (v.preventDefault(), h("")), children: /* @__PURE__ */ e(Y, { n: "x", size: 12 }) })
      ] }),
      _ > 0 && /* @__PURE__ */ e("span", { class: "hint num", children: p === "pnl" ? `Closes at ≈ ${K(_, r)}` : `≈ ${dt(vn(t, n, i, _), 1)} P&L` })
    ] }),
    /* @__PURE__ */ e("label", { class: `pa-field${k === "sl" ? " focus" : ""}`, children: [
      /* @__PURE__ */ e("span", { class: "lbl", children: "Stop Loss" }),
      /* @__PURE__ */ e("span", { class: "in", children: [
        p === "pnl" && /* @__PURE__ */ e("span", { class: "neg", children: "-" }),
        /* @__PURE__ */ e("input", { inputMode: "decimal", placeholder: "Enter Amount", value: m, onFocus: () => y("sl"), onInput: (v) => f(Ce(v)), "aria-label": "Stop loss" }),
        p === "pnl" && m && /* @__PURE__ */ e("span", { children: "%" }),
        m && /* @__PURE__ */ e("button", { class: "clr", "aria-label": "Clear stop loss", onClick: (v) => (v.preventDefault(), f("")), children: /* @__PURE__ */ e(Y, { n: "x", size: 12 }) })
      ] }),
      w > 0 && /* @__PURE__ */ e("span", { class: "hint num", children: p === "pnl" ? `Closes at ≈ ${K(w, r)}` : `≈ ${dt(vn(t, n, i, w), 1)} P&L` })
    ] }),
    p === "pnl" && /* @__PURE__ */ e("div", { class: "pa-pcts four", children: $.map((v) => /* @__PURE__ */ e("button", { class: "pa-btn dark", onClick: () => k === "tp" ? h(String(v)) : f(String(v)), children: [
      k === "tp" ? "+" : "-",
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
function eu({ s: t, onClose: n, start: i }) {
  const r = [{ k: "home" }];
  i && i.k !== "home" && r.push(i), !t.session && dn("onboarded") !== "1" && r.push({ k: "onboard" });
  const [s, a] = g(r), [o, c] = g(null), [d, p] = g(!1), u = tn(
    () => ({
      push: (f) => a((k) => [...k, f]),
      replace: (f) => a((k) => [...k.slice(0, -1), f]),
      back: () => a((f) => f.length > 1 ? f.slice(0, -1) : f)
    }),
    []
  );
  Z(() => {
    i && i.k !== "home" && a([{ k: "home" }, i]);
  }, [i && JSON.stringify(i)]);
  const l = s[s.length - 1], h = o ? Kd(o, t) : null, m = `${s.length}:${l.k}`;
  return /* @__PURE__ */ e("div", { class: "pa-mobile", children: [
    /* @__PURE__ */ e("div", { class: "pa-stage", children: [
      l.k === "home" && /* @__PURE__ */ e(Rp, { s: t, nav: u, onClose: n, onLearn: c, onDisclosures: () => p(!0) }),
      l.k === "markets" && /* @__PURE__ */ e(Xd, { s: t, nav: u, list: l.list, pick: l.pick, focus: l.focus }),
      l.k === "market" && /* @__PURE__ */ e(Wp, { s: t, nav: u, sym: l.sym, onLearn: c }),
      l.k === "trade" && /* @__PURE__ */ e(Xp, { s: t, nav: u, sym: l.sym, side: l.side, onLearn: c, onDisclosures: () => p(!0) }),
      l.k === "position" && /* @__PURE__ */ e(Vp, { s: t, nav: u, id: l.id, onLearn: c }),
      l.k === "history" && /* @__PURE__ */ e(cp, { s: t, nav: u }),
      l.k === "onboard" && /* @__PURE__ */ e(jp, { s: t, nav: u, onLearn: c }),
      l.k === "help" && /* @__PURE__ */ e(Bp, { s: t, nav: u })
    ] }, m),
    h && /* @__PURE__ */ e(Be, { title: h.title, onClose: () => c(null), tall: !0, children: /* @__PURE__ */ e("div", { class: "pa-prose", children: h.body }) }),
    d && /* @__PURE__ */ e(Be, { title: "Disclosures", onClose: () => p(!1), tall: !0, children: /* @__PURE__ */ e($s, { s: t }) })
  ] });
}
const Ja = "strike-everywhere:wallet", Se = (t, n = 0) => t !== null && t !== "" && t !== void 0 && Number.isFinite(Number(t)) ? Number(t) : n;
function tu(t) {
  try {
    return sessionStorage.getItem(t);
  } catch {
    return null;
  }
}
function nu(t, n) {
  try {
    sessionStorage.setItem(t, n);
  } catch {
  }
}
function iu(t) {
  const n = tn(() => new Ii(t), []), [i, r] = g([]), [s, a] = g({}), [o, c] = g({}), [d, p] = g(5e-4), [u, l] = g(""), [h, m] = g(n.session), [f, k] = g(null), [y, _] = g([]), [w, T] = g([]), [$, v] = g(!1), [C, S] = g(null), [q, x] = g(null), z = Oe(), N = Oe(0), R = Oe(!0), oe = n.net.network === "testnet", M = (L, B, Q, ae) => {
    const te = ++N.current;
    x({ id: te, kind: L, title: B, text: Q }), clearTimeout(z.current), L !== "progress" && (z.current = setTimeout(() => x((D) => D?.id === te ? null : D), ae ?? (L === "ok" ? 4500 : 9e3)));
  }, I = () => (clearTimeout(z.current), x(null));
  Z(() => {
    let L = !0;
    const B = n.on((D) => {
      D.type === "session" && m(D.session), D.type === "session" && D.reason === "idle" && M("err", `Signed out after ${Math.round(n.idleTimeoutMs / 6e4)} minutes without activity`, "Your trading key was forgotten for safety. Connect again to keep trading."), D.type === "session" && D.reason === "expired" && M("err", "Session expired", "Connect again to keep trading."), D.type === "user" && O();
    });
    (async () => {
      for (let D = 0; L; D++)
        try {
          D === 0 && await n.init();
          const [ie, de, V] = await Promise.all([n.loadMarkets(), n.market.tickers().catch(() => []), n.market.baseTakerRate()]);
          if (!L) return;
          const Pe = {};
          for (const ge of ie) {
            const he = n.raw(ge.symbol) ?? {}, Ge = Array.isArray(de) ? de.find((Ze) => Ze?.symbol === ge.symbol) : void 0, Xe = Se(he.mark_price);
            Pe[ge.symbol] = {
              mark: Xe,
              index: Se(he.index_price, Xe),
              last: Se(Ge?.lastPrice, Se(he.last_price, Xe)),
              funding: Se(he.funding_rate),
              nextFunding: Se(he.next_funding_time),
              open: Se(Ge?.openPrice, 0),
              vol: Se(Ge?.quoteVolume),
              high: Se(Ge?.highPrice),
              low: Se(Ge?.lowPrice)
            };
          }
          r(ie), a(Pe), p(V), l("");
          return;
        } catch (ie) {
          if (!L) return;
          l(ie?.message || "Could not reach Strike."), await new Promise((de) => setTimeout(de, Math.min(3e4, 2e3 * 2 ** D)));
        }
    })();
    const Q = n.prices();
    Q.subscribe("!markprice@arr"), Q.subscribe("!miniticker@arr");
    const ae = Q.onMessage((D) => {
      const ie = Array.isArray(D) ? D : Array.isArray(D?.data) ? D.data : D?.data ? [D.data] : [D];
      a((de) => {
        let V = !1;
        const Pe = { ...de };
        for (const ge of ie) {
          const he = ge?.s && Pe[ge.s];
          he && (ge.e === "markPriceUpdate" ? (Pe[ge.s] = { ...he, mark: Se(ge.p, he.mark), index: Se(ge.i, he.index), funding: Se(ge.r, he.funding), nextFunding: Se(ge.T, he.nextFunding) }, V = !0) : ge.e === "24hrMiniTicker" && (Pe[ge.s] = { ...he, open: Se(ge.o, he.open), last: Se(ge.c, he.last), vol: Se(ge.q, he.vol), high: Se(ge.h, he.high), low: Se(ge.l, he.low) }, V = !0));
        }
        return V ? Pe : de;
      });
    }), te = setInterval(async () => {
      if (!At())
        try {
          const D = await n.market.markets();
          a((ie) => {
            const de = { ...ie };
            for (const V of D) {
              const Pe = de[V.symbol];
              Pe && (de[V.symbol] = { ...Pe, mark: Se(V.mark_price, Pe.mark), index: Se(V.index_price, Pe.index), funding: Se(V.funding_rate, Pe.funding), nextFunding: Se(V.next_funding_time, Pe.nextFunding) });
            }
            return de;
          });
        } catch {
        }
    }, 15e3);
    return () => {
      L = !1, R.current = !1, B(), ae(), clearInterval(te), clearTimeout(P.current), clearTimeout(z.current), n.dispose();
    };
  }, [n]), Z(() => {
    if (!oe || !i.length) return;
    let L = !0;
    const B = () => Promise.all(
      i.map(
        (ae) => n.market.klines(ae.symbol, "1h", 25, "mark").then((te) => [ae.symbol, te.length ? te[0].open : 0]).catch(() => [ae.symbol, 0])
      )
    ).then((ae) => L && c(Object.fromEntries(ae.filter(([, te]) => te > 0))));
    B();
    const Q = setInterval(() => !At() && B(), 10 * 6e4);
    return () => {
      L = !1, clearInterval(Q);
    };
  }, [i]);
  const F = tn(
    () => i.map((L) => {
      const B = s[L.symbol], Q = n.raw(L.symbol) ?? {}, ae = B?.mark ?? 0, te = oe ? o[L.symbol] ?? 0 : B?.open ?? 0;
      return {
        spec: L,
        symbol: L.symbol,
        base: L.baseAsset,
        name: Dd(L.name, L.baseAsset),
        mark: ae,
        index: B?.index ?? 0,
        last: B?.last ?? 0,
        funding: B?.funding ?? 0,
        nextFunding: B?.nextFunding ?? 0,
        ref24: te,
        change: te > 0 && ae > 0 ? (ae - te) / te * 100 : 0,
        changeAbs: te > 0 && ae > 0 ? ae - te : 0,
        vol24: B?.vol ?? 0,
        high24: B?.high ?? 0,
        low24: B?.low ?? 0,
        createdAt: Se(Q.created_at),
        maxLev: Math.max(1, Math.min(t.maxLeverage, L.maxLeverage)),
        strikeMaxLev: L.maxLeverage
      };
    }),
    [i, s, o, t.maxLeverage]
  ), W = tn(() => Object.fromEntries(F.map((L) => [L.symbol, L])), [F]), P = Oe(), A = async () => {
    const L = n.session;
    if (!(!R.current || !L))
      try {
        const [B, Q, ae] = await Promise.all([n.account.account(), n.account.positions(), n.account.openOrders()]);
        if (!R.current || n.session !== L) return;
        k(B), _(Q), T(ae), v(!0);
      } catch (B) {
        B?.status === 401 && n.session ? (n.disconnect(), M("err", "Session expired", "Connect again to keep trading.")) : B?.status === 404 && (k(null), v(!0));
      }
  }, O = () => {
    clearTimeout(P.current), P.current = setTimeout(A, 400);
  };
  Z(() => {
    if (!h) {
      k(null), _([]), T([]), v(!1);
      return;
    }
    A(), n.userEvents();
    const L = setInterval(() => !At() && A(), 5e3);
    return () => clearInterval(L);
  }, [h]);
  const J = Se(f?.available_balance), le = Se(f?.margin_balance, Se(f?.wallet_balance)), Me = Se(f?.unrealized_pnl), Le = !f || Se(f.wallet_balance) <= 0 && y.length === 0, pt = async (L) => {
    if (!n.session) return S("connect");
    if (!n.wallet) {
      const B = tu(Ja);
      if (B)
        try {
          await n.ensureWallet(B);
        } catch (Q) {
          M("err", "Wallet", Q?.message || String(Q));
          return;
        }
    }
    if (!n.wallet) return S("connect");
    S(L);
  }, ke = () => {
    n.wallet && nu(Ja, n.wallet.id), S(null), M("ok", "Wallet connected", "Your trades run on Strike.");
  }, G = (L, B, Q) => {
    M("progress", "Sent to Strike, confirming", "Strike is taking longer than usual to confirm. Don't send it again."), L.settled.then(
      (ae) => {
        A(), ae ? /cancel|expire/i.test(ae.status) ? M("err", ...Q) : M("ok", ...B(ae)) : M("info", "Not confirmed yet", "Strike hasn't reported this order's result. Check Positions and Open Orders before trying again.");
      },
      (ae) => (A(), M("err", Q[0], ae?.message || String(ae)))
    );
  }, X = async (L, B, Q, ae) => {
    const te = L.side === "buy" ? "long" : "short", D = ni.find((ie) => ie.type === L.type)?.label ?? "Order";
    M("progress", L.type === "market" ? `Opening ${$n(B.size)} ${Q} ${te} ${B.lev}x` : `Placing ${D.toLowerCase()} · ${$n(B.size)} ${Q} ${te}`);
    try {
      if (L.type === "twap") {
        const de = L.twapMinutes ?? 60;
        return await n.placeTwap({ symbol: L.symbol, side: L.side, size: B.size, durationSec: de * 60, limitPrice: Number(L.twapLimit) > 0 ? L.twapLimit : void 0, reduceOnly: L.reduceOnly, randomize: L.randomize, leverage: L.reduceOnly ? void 0 : B.lev }), A(), M("ok", "TWAP started", `${L.side === "buy" ? "Long" : "Short"} ${$n(B.size)} ${Q} over ${de < 60 ? `${de} min` : `${Math.round(de / 60 * 10) / 10} h`}`), "resting";
      }
      const ie = await n.placeOrder(wp(L, B));
      if (A(), L.type !== "market" && L.type !== "limit" && (ie.status === "untriggered" || ie.status === "open" || ie.status === "pending"))
        return M("ok", `${D} placed`, L.type === "trailing_stop_market" ? `Trails ${L.callbackRate}% behind the price` : `Triggers at $${Number(L.triggerPrice).toLocaleString("en-US", { maximumFractionDigits: 8 })}`), "resting";
      if (ie.status === "filled") {
        const de = L.type === "market" && ae && ae > 0 ? ae : B.px;
        return M("ok", `Opened ${$n(B.size)} ${Q} ${te}`, `${B.lev}x · about ${Kr(B.size * de)} at ~$${de.toLocaleString("en-US", { maximumFractionDigits: de >= 1 ? 2 : 5 })}`), "filled";
      }
      return ie.status === "open" || ie.status === "untriggered" || ie.status === "pending" ? (M("ok", "Limit order placed", `${L.side === "buy" ? "Long" : "Short"} ${$n(B.size)} ${Q} at $${L.limitPrice.toLocaleString("en-US", { maximumFractionDigits: 8 })}`), "resting") : /cancel|expire/i.test(ie.status) ? (M("err", "Position opening failed", `There were no ${L.side === "buy" ? "sellers" : "buyers"} close enough to the market price, so Strike cancelled the order. Nothing was traded.`), "failed") : (M("err", "Position opening failed", `Strike: order ${ie.status}`), "failed");
    } catch (ie) {
      if (ie instanceof Jt) {
        const de = L.type === "market" && ae && ae > 0 ? ae : B.px;
        return G(
          ie,
          (V) => V.status === "filled" ? [`Opened ${$n(B.size)} ${Q} ${te}`, `${B.lev}x · about ${Kr(B.size * de)} at ~$${de.toLocaleString("en-US", { maximumFractionDigits: de >= 1 ? 2 : 5 })}`] : [`${D} placed`],
          ["Position opening failed", `There were no ${L.side === "buy" ? "sellers" : "buyers"} close enough to the market price, so Strike cancelled the order. Nothing was traded.`]
        ), "resting";
      }
      return M("err", "Position opening failed", ie instanceof Nn ? ie.message : ie?.message || String(ie)), "failed";
    }
  }, xe = async (L, B = 1) => {
    const Q = L.symbol.split("-")[0], ae = Math.abs(Number(L.size)), te = Number(L.size) > 0 ? "long" : "short";
    M("progress", B >= 1 ? `Closing ${$n(ae)} ${Q} ${te}` : `Closing ${Math.round(B * 100)}% of your ${Q} ${te}`);
    try {
      const D = await n.closePosition(L, B);
      return A(), D.status === "filled" ? (M("ok", B >= 1 ? `Closed your ${Q} ${te}` : `Closed ${Math.round(B * 100)}% of your ${Q} ${te}`, B >= 1 ? `PnL ≈ ${Kr(Number(L.upnl), !0)}` : void 0), !0) : /cancel|expire/i.test(D.status) ? (M("err", "Close failed", `There were no ${Number(L.size) > 0 ? "buyers" : "sellers"} close enough to the market price, so Strike cancelled the close. Your position is still open.`), !1) : (M("ok", `Close order ${D.status}`), !0);
    } catch (D) {
      return D instanceof Jt ? (G(
        D,
        (ie) => [ie.status === "filled" ? B >= 1 ? `Closed your ${Q} ${te}` : `Closed ${Math.round(B * 100)}% of your ${Q} ${te}` : `Close order ${ie.status}`],
        ["Close failed", `There were no ${Number(L.size) > 0 ? "buyers" : "sellers"} close enough to the market price, so Strike cancelled the close. Your position is still open.`]
      ), !0) : (M("err", "Close failed", D?.message || String(D)), !1);
    }
  }, Re = async (L, B, Q = 1) => {
    const ae = L.symbol.split("-")[0];
    M("progress", `Placing a limit close for your ${ae} position`);
    try {
      const te = await n.limitClose(L, B, Q);
      return A(), te.status === "filled" ? M("ok", `Closed ${Q >= 1 ? "your" : `${Math.round(Q * 100)}% of your`} ${ae} position`) : M("ok", "Limit close placed", `It closes when the price reaches $${B.toLocaleString("en-US", { maximumFractionDigits: 8 })}. You'll find it under Open Orders.`), !0;
    } catch (te) {
      return te instanceof Jt ? (G(te, (D) => [D.status === "filled" ? `Closed ${Q >= 1 ? "your" : `${Math.round(Q * 100)}% of your`} ${ae} position` : "Limit close placed"], ["Limit close failed", "Strike cancelled the limit close. Your position is still open."]), !0) : (M("err", "Limit close failed", te instanceof Nn ? te.message : te?.message || String(te)), !1);
    }
  }, Ee = async (L, B, Q, ae) => {
    M("progress", L);
    try {
      const te = await B();
      return A(), M("ok", typeof Q == "function" ? Q(te) : Q), !0;
    } catch (te) {
      return te instanceof Jt ? (G(te, (D) => [typeof Q == "function" ? Q(D) : Q], [ae, "Strike cancelled the order."]), !0) : (M("err", ae, te instanceof Nn ? te.message : te?.message || String(te)), !1);
    }
  };
  return {
    config: t,
    client: n,
    testnet: oe,
    markets: F,
    bySymbol: W,
    loadError: u,
    takerRate: d,
    session: h,
    account: f,
    accountLoaded: $,
    positions: y,
    orders: w,
    available: J,
    equity: le,
    upnl: Me,
    isNewAccount: Le,
    sheet: C,
    setSheet: S,
    toast: q,
    notify: M,
    dismissToast: I,
    refresh: A,
    openFunds: pt,
    onConnected: ke,
    placeDraft: X,
    closePosition: xe,
    limitClose: Re,
    setExits: (L, B) => Ee("Placing take profit / stop loss", () => n.setPositionExits(L, B), "Take profit / stop loss set", "Couldn't set TP/SL"),
    trail: (L, B, Q, ae) => Ee("Placing trailing stop", () => n.trailPosition(L, B, Q, ae), `Trailing stop set (${B}%)`, "Couldn't set the trailing stop"),
    reverse: (L) => Ee(
      `Reversing your ${L.symbol.split("-")[0]} position`,
      () => n.reversePosition(L),
      (B) => B.status === "filled" ? `Reversed to ${Number(L.size) > 0 ? "Short" : "Long"}` : `Reverse order ${B.status}`,
      "Couldn't reverse"
    ),
    closeAll: () => Ee(
      "Closing all positions",
      () => n.closeAllPositions(),
      (L) => L.some((B) => B.status === "unconfirmed") ? `Sent ${L.filter((B) => B.ok).length} of ${L.length} closes to Strike; check Positions in a moment` : L.every((B) => B.ok) ? `Closed ${L.length} position${L.length === 1 ? "" : "s"}` : `Closed ${L.filter((B) => B.ok).length} of ${L.length}; the rest were cancelled by Strike (no liquidity near the price)`,
      "Close all failed"
    ),
    modifyMargin: (L, B, Q) => Ee(Q === "add" ? "Adding margin" : "Removing margin", () => n.modifyMargin(L, B, Q), Q === "add" ? "Margin added" : "Margin removed", "Couldn't change the margin"),
    editOrder: (L, B) => Ee("Updating the order", () => n.editOrder(L, B), "Order updated", "Couldn't update the order"),
    cancelAll: (L) => Ee("Cancelling orders", () => n.cancelAll(L), (B) => B === null ? "Cancelling orders…" : `Cancelled ${B} order${B === 1 ? "" : "s"}`, "Couldn't cancel"),
    cancelOrder: async (L) => {
      try {
        await n.trading.cancelOrder(L.symbol, L.id), M("ok", "Order cancelled"), setTimeout(A, 600);
      } catch (B) {
        M("err", "Couldn't cancel", B?.message || String(B));
      }
    },
    disconnect: () => {
      n.disconnect(), M("ok", "Disconnected");
    }
  };
}
function $n(t) {
  const n = Math.abs(t);
  return t.toLocaleString("en-US", n >= 1e3 ? { maximumFractionDigits: 0 } : n >= 1 ? { maximumFractionDigits: 4 } : { maximumSignificantDigits: 4 });
}
function Kr(t, n = !1) {
  if (!Number.isFinite(t)) return "—";
  const i = Math.abs(t).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${t < 0 ? "-" : n && t > 0 ? "+" : ""}$${i}`;
}
function ru({ config: t, host: n, screen: i }) {
  const r = iu(t), s = Oe(null), [a, o] = g(() => n.clientWidth || 400);
  ii(() => {
    const u = s.current;
    if (!u || typeof ResizeObserver > "u") return;
    const l = new ResizeObserver(() => u.clientWidth && o(u.clientWidth));
    return l.observe(u), o(u.clientWidth || a), () => l.disconnect();
  }, []);
  const c = t.layout === "auto" ? a >= 900 ? "desktop" : "mobile" : t.layout;
  Z(() => {
    n.dispatchEvent(new CustomEvent("strike-session", { bubbles: !0, composed: !0, detail: r.session ? { connected: !0, address: r.session.address, accountId: r.session.accountId } : { connected: !1 } }));
  }, [r.session?.accountId]);
  const d = t.closable ? () => n.dispatchEvent(new CustomEvent("strike-close", { bubbles: !0, composed: !0 })) : void 0, p = i === "market" ? { k: "market", sym: t.market } : i === "trade" ? { k: "trade", sym: t.market, side: t.side ?? "buy" } : void 0;
  return /* @__PURE__ */ e("div", { class: `pa${c === "desktop" || c === "panel" ? " desk" : ""}`, ref: s, children: [
    /* @__PURE__ */ e(Wd, { toast: r.toast, onDismiss: r.dismissToast }),
    c === "mobile" ? /* @__PURE__ */ e(eu, { s: r, onClose: d, start: p }) : c === "panel" ? /* @__PURE__ */ e(Dp, { s: r }) : /* @__PURE__ */ e(Lp, { s: r, width: a }),
    r.sheet === "connect" && /* @__PURE__ */ e(Do, { client: r.client, onClose: () => r.setSheet(null), onConnected: r.onConnected }),
    r.sheet === "deposit" && /* @__PURE__ */ e(
      Vd,
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
      Yd,
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
const su = (
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
.pa-banner.info .ic { background: var(--pa-line-2); color: var(--pa-text); }
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
), au = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Fragment+Mono&display=swap", ou = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap", lu = (
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
), cu = "0.2.0", du = ["builder-code", "fee-bps", "max-fee-bps", "market", "network", "partner-id", "partner-api", "max-leverage", "persist", "referral-code", "width", "side", "variant", "layout", "closable", "height", "screen", "amount", "chart", "network-badge", "leverage"];
function Qa(t = au, n = "font") {
  if (document.querySelector(`link[data-strike-everywhere-${n}]`)) return;
  const i = document.createElement("link");
  i.rel = "stylesheet", i.href = t, i.setAttribute(`data-strike-everywhere-${n}`, ""), document.head.appendChild(i);
}
class Is extends HTMLElement {
  constructor() {
    super(...arguments);
    re(this, "root", null);
    re(this, "teardown", null);
  }
  connectedCallback() {
    if (Qa(), this.teardown && clearTimeout(this.teardown), this.teardown = null, !this.root) {
      this.root = this.attachShadow({ mode: "open" });
      const i = document.createElement("style");
      i.textContent = lu + su, this.root.appendChild(i);
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
      i && !this.isConnected && Yi(null, i);
    }, 0);
  }
  attributeChangedCallback() {
    this.root && this.isConnected && this.renderApp();
  }
  config() {
    const i = this.getAttribute("builder-code")?.trim();
    if (!i) return 'Missing required attribute: builder-code="your-strike-builder-code"';
    const r = (c, d) => {
      const p = this.getAttribute(c);
      if (p === null || p.trim() === "") return d;
      const u = Number(p);
      return Number.isFinite(u) ? u : d;
    }, s = (c) => (this.getAttribute(c) ?? "").trim().toLowerCase(), a = s("network") === "testnet" ? "testnet" : "mainnet", o = r("fee-bps", 5);
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
    const i = this.root.lastElementChild, r = (c, d) => {
      const p = this.getAttribute(c)?.trim();
      p ? this.style.setProperty(d, /^\d+(\.\d+)?$/.test(p) ? `${p}px` : p) : this.style.removeProperty(d);
    };
    r("width", "--se-width"), r("height", "--se-height");
    const s = (this.getAttribute("variant") ?? "").trim().toLowerCase(), a = this.config();
    if (typeof a == "string") {
      Yi(
        /* @__PURE__ */ e("div", { class: "card", children: /* @__PURE__ */ e("div", { class: "ticket", children: /* @__PURE__ */ e("div", { class: "warn", children: a }) }) }),
        i
      );
      return;
    }
    const o = [s, a.network, a.builderCode, a.feeBps, a.maxFeeBps, a.partnerApi, a.partnerId, a.referralCode, a.persist].join("|");
    if (s === "app") {
      Qa(ou, "app-font");
      const c = (this.getAttribute("layout") ?? "").trim().toLowerCase(), d = { ...a, layout: c === "mobile" || c === "desktop" || c === "panel" ? c : "auto", closable: this.hasAttribute("closable") };
      Yi(/* @__PURE__ */ e(ru, { config: d, host: this, screen: this.getAttribute("screen") ?? void 0 }, o), i);
      return;
    }
    Yi(/* @__PURE__ */ e(Nd, { config: a }, o), i);
  }
}
re(Is, "observedAttributes", [...du]);
typeof customElements < "u" && !customElements.get("strike-trade") && customElements.define("strike-trade", Is);
typeof window < "u" && (window.StrikeEverywhere = Object.assign(window.StrikeEverywhere ?? {}, { VERSION: cu, Client: Ii, Element: Is }));
export {
  Ii as StrikeEverywhere,
  Is as StrikeTradeElement,
  cu as VERSION
};
//# sourceMappingURL=strike-everywhere.js.map
