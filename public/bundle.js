(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s);
  new MutationObserver((s) => {
    for (const a of s) {
      if (a.type === "childList") {
        for (const o of a.addedNodes) {
          o.tagName === "LINK" && o.rel === "modulepreload" && i(o);
        }
      }
    }
  }).observe(document, { childList: !0, subtree: !0 });
  function e(s) {
    const a = {};
    return (
      s.integrity && (a.integrity = s.integrity),
        s.referrerPolicy && (a.referrerPolicy = s.referrerPolicy),
        s.crossOrigin === "use-credentials"
          ? (a.credentials = "include")
          : s.crossOrigin === "anonymous"
          ? (a.credentials = "omit")
          : (a.credentials = "same-origin"),
        a
    );
  }
  function i(s) {
    if (s.ep) return;
    s.ep = !0;
    const a = e(s);
    fetch(s.href, a);
  }
})();
const kt = class kt {
  constructor(t = 0) {
    t < 1
      ? ((this._ptr = []), (this._capacity = 0), (this._size = 0))
      : ((this._ptr = new Array(t)), (this._capacity = t), (this._size = 0));
  }
  at(t) {
    return this._ptr[t];
  }
  set(t, e) {
    this._ptr[t] = e;
  }
  get(t = 0) {
    const e = new Array();
    for (let i = t; i < this._size; i++) e.push(this._ptr[i]);
    return e;
  }
  pushBack(t) {
    this._size >= this._capacity &&
    this.prepareCapacity(
      this._capacity == 0 ? kt.DefaultSize : this._capacity * 2,
    ), (this._ptr[this._size++] = t);
  }
  clear() {
    (this._ptr.length = 0), (this._size = 0);
  }
  getSize() {
    return this._size;
  }
  assign(t, e) {
    this._size < t && this.prepareCapacity(t);
    for (let s = 0; s < t; s++) this._ptr[s] = e;
    this._size = t;
  }
  resize(t, e = null) {
    this.updateSize(t, e, !0);
  }
  updateSize(t, e = null, i = !0) {
    if (this._size < t) {
      if ((this.prepareCapacity(t), i)) {
        for (let a = this._size; a < t; a++) {
          typeof e == "function"
            ? (this._ptr[a] = JSON.parse(JSON.stringify(new e())))
            : (this._ptr[a] = e);
        }
      } else for (let a = this._size; a < t; a++) this._ptr[a] = e;
    } else {
      const a = this._size - t;
      this._ptr.splice(this._size - a, a);
    }
    this._size = t;
  }
  insert(t, e, i) {
    let s = t._index;
    const a = e._index,
      o = i._index,
      n = o - a;
    this.prepareCapacity(this._size + n);
    const l = this._size - s;
    if (l > 0) { for (let h = 0; h < l; h++) this._ptr.splice(s + h, 0, null); }
    for (let h = a; h < o; h++, s++) this._ptr[s] = e._vector._ptr[h];
    this._size = this._size + n;
  }
  remove(t) {
    return t < 0 || this._size <= t
      ? !1
      : (this._ptr.splice(t, 1), --this._size, !0);
  }
  erase(t) {
    const e = t._index;
    return e < 0 || this._size <= e
      ? t
      : (this._ptr.splice(e, 1), --this._size, new se(this, e));
  }
  prepareCapacity(t) {
    t > this._capacity &&
      (this._capacity == 0
        ? ((this._ptr = new Array(t)), (this._capacity = t))
        : ((this._ptr.length = t), (this._capacity = t)));
  }
  begin() {
    return this._size == 0 ? this.end() : new se(this, 0);
  }
  end() {
    return new se(this, this._size);
  }
  getOffset(t) {
    const e = new kt();
    return (
      (e._ptr = this.get(t)),
        (e._size = this.get(t).length),
        (e._capacity = this.get(t).length),
        e
    );
  }
};
kt.DefaultSize = 10;
let x = kt,
  se = class ve {
    constructor(t, e) {
      (this._vector = t ?? null), (this._index = e ?? 0);
    }
    set(t) {
      return (this._index = t._index), (this._vector = t._vector), this;
    }
    preIncrement() {
      return ++this._index, this;
    }
    preDecrement() {
      return --this._index, this;
    }
    increment() {
      return new ve(this._vector, this._index++);
    }
    decrement() {
      return new ve(this._vector, this._index--);
    }
    ptr() {
      return this._vector._ptr[this._index];
    }
    substitution(t) {
      return (this._index = t._index), (this._vector = t._vector), this;
    }
    notEqual(t) {
      return this._index != t._index || this._vector != t._vector;
    }
  };
var ze;
((r) => {
  (r.csmVector = x), (r.iterator = se);
})(ze || (ze = {}));
class Y {
  append(t, e) {
    return (this.s += e !== void 0 ? t.substr(0, e) : t), this;
  }
  expansion(t, e) {
    for (let i = 0; i < t; i++) this.append(e);
    return this;
  }
  getBytes() {
    return encodeURIComponent(this.s).replace(/%../g, "x").length;
  }
  getLength() {
    return this.s.length;
  }
  isLess(t) {
    return this.s < t.s;
  }
  isGreat(t) {
    return this.s > t.s;
  }
  isEqual(t) {
    return this.s == t;
  }
  isEmpty() {
    return this.s.length == 0;
  }
  constructor(t) {
    this.s = t;
  }
}
var Xe;
((r) => {
  r.csmString = Y;
})(Xe || (Xe = {}));
class Vt {
  static createIdInternal(t) {
    return new Vt(t);
  }
  getString() {
    return this._id;
  }
  isEqual(t) {
    return typeof t == "string"
      ? this._id.isEqual(t)
      : t instanceof Y
      ? this._id.isEqual(t.s)
      : t instanceof Vt
      ? this._id.isEqual(t._id.s)
      : !1;
  }
  isNotEqual(t) {
    return typeof t == "string"
      ? !this._id.isEqual(t)
      : t instanceof Y
      ? !this._id.isEqual(t.s)
      : t instanceof Vt
      ? !this._id.isEqual(t._id.s)
      : !1;
  }
  constructor(t) {
    if (typeof t == "string") {
      this._id = new Y(t);
      return;
    }
    this._id = t;
  }
}
var Ye;
((r) => {
  r.CubismId = Vt;
})(Ye || (Ye = {}));
class us {
  constructor() {
    this._ids = new x();
  }
  release() {
    for (let t = 0; t < this._ids.getSize(); ++t) this._ids.set(t, void 0);
    this._ids = null;
  }
  registerIds(t) {
    for (let e = 0; e < t.length; e++) this.registerId(t[e]);
  }
  registerId(t) {
    let e = null;
    if (typeof t == "string") {
      if ((e = this.findId(t)) != null) return e;
      (e = Vt.createIdInternal(t)), this._ids.pushBack(e);
    } else return this.registerId(t.s);
    return e;
  }
  getId(t) {
    return this.registerId(t);
  }
  isExist(t) {
    return typeof t == "string" ? this.findId(t) != null : this.isExist(t.s);
  }
  findId(t) {
    for (let e = 0; e < this._ids.getSize(); ++e) {
      if (this._ids.at(e).getString().isEqual(t)) return this._ids.at(e);
    }
    return null;
  }
}
var je;
((r) => {
  r.CubismIdManager = us;
})(je || (je = {}));
class A {
  constructor() {
    (this._tr = new Float32Array(16)), this.loadIdentity();
  }
  static multiply(t, e, i) {
    const s = new Float32Array([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ]),
      a = 4;
    for (let o = 0; o < a; ++o) {
      for (let n = 0; n < a; ++n) {
        for (let l = 0; l < a; ++l) s[n + o * 4] += t[l + o * 4] * e[n + l * 4];
      }
    }
    for (let o = 0; o < 16; ++o) i[o] = s[o];
  }
  loadIdentity() {
    const t = new Float32Array([
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
    ]);
    this.setMatrix(t);
  }
  setMatrix(t) {
    for (let e = 0; e < 16; ++e) this._tr[e] = t[e];
  }
  getArray() {
    return this._tr;
  }
  getScaleX() {
    return this._tr[0];
  }
  getScaleY() {
    return this._tr[5];
  }
  getTranslateX() {
    return this._tr[12];
  }
  getTranslateY() {
    return this._tr[13];
  }
  transformX(t) {
    return this._tr[0] * t + this._tr[12];
  }
  transformY(t) {
    return this._tr[5] * t + this._tr[13];
  }
  invertTransformX(t) {
    return (t - this._tr[12]) / this._tr[0];
  }
  invertTransformY(t) {
    return (t - this._tr[13]) / this._tr[5];
  }
  translateRelative(t, e) {
    const i = new Float32Array([
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      t,
      e,
      0,
      1,
    ]);
    A.multiply(i, this._tr, this._tr);
  }
  translate(t, e) {
    (this._tr[12] = t), (this._tr[13] = e);
  }
  translateX(t) {
    this._tr[12] = t;
  }
  translateY(t) {
    this._tr[13] = t;
  }
  scaleRelative(t, e) {
    const i = new Float32Array([
      t,
      0,
      0,
      0,
      0,
      e,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
    ]);
    A.multiply(i, this._tr, this._tr);
  }
  scale(t, e) {
    (this._tr[0] = t), (this._tr[5] = e);
  }
  multiplyByMatrix(t) {
    A.multiply(t.getArray(), this._tr, this._tr);
  }
  clone() {
    const t = new A();
    for (let e = 0; e < this._tr.length; e++) t._tr[e] = this._tr[e];
    return t;
  }
}
var Ge;
((r) => {
  r.CubismMatrix44 = A;
})(Ge || (Ge = {}));
class re {
  constructor(t, e, i, s) {
    (this.x = t), (this.y = e), (this.width = i), (this.height = s);
  }
  getCenterX() {
    return this.x + 0.5 * this.width;
  }
  getCenterY() {
    return this.y + 0.5 * this.height;
  }
  getRight() {
    return this.x + this.width;
  }
  getBottom() {
    return this.y + this.height;
  }
  setRect(t) {
    (this.x = t.x),
      (this.y = t.y),
      (this.width = t.width),
      (this.height = t.height);
  }
  expand(t, e) {
    (this.x -= t), (this.y -= e), (this.width += t * 2), (this.height += e * 2);
  }
}
var He;
((r) => {
  r.csmRect = re;
})(He || (He = {}));
class ge {
  static create() {
    return null;
  }
  static delete(t) {}
  initialize(t) {
    this._model = t;
  }
  drawModel() {
    this.getModel() != null &&
      (this.saveProfile(), this.doDrawModel(), this.restoreProfile());
  }
  setMvpMatrix(t) {
    this._mvpMatrix4x4.setMatrix(t.getArray());
  }
  getMvpMatrix() {
    return this._mvpMatrix4x4;
  }
  setModelColor(t, e, i, s) {
    t < 0 ? (t = 0) : t > 1 && (t = 1),
      e < 0 ? (e = 0) : e > 1 && (e = 1),
      i < 0 ? (i = 0) : i > 1 && (i = 1),
      s < 0 ? (s = 0) : s > 1 && (s = 1),
      (this._modelColor.r = t),
      (this._modelColor.g = e),
      (this._modelColor.b = i),
      (this._modelColor.a = s);
  }
  getModelColor() {
    return JSON.parse(JSON.stringify(this._modelColor));
  }
  getModelColorWithOpacity(t) {
    const e = this.getModelColor();
    return (
      (e.a *= t),
        this.isPremultipliedAlpha() &&
        ((e.r *= e.a), (e.g *= e.a), (e.b *= e.a)),
        e
    );
  }
  setIsPremultipliedAlpha(t) {
    this._isPremultipliedAlpha = t;
  }
  isPremultipliedAlpha() {
    return this._isPremultipliedAlpha;
  }
  setIsCulling(t) {
    this._isCulling = t;
  }
  isCulling() {
    return this._isCulling;
  }
  setAnisotropy(t) {
    this._anisotropy = t;
  }
  getAnisotropy() {
    return this._anisotropy;
  }
  getModel() {
    return this._model;
  }
  useHighPrecisionMask(t) {
    this._useHighPrecisionMask = t;
  }
  isUsingHighPrecisionMask() {
    return this._useHighPrecisionMask;
  }
  constructor() {
    (this._isCulling = !1),
      (this._isPremultipliedAlpha = !1),
      (this._anisotropy = 0),
      (this._model = null),
      (this._modelColor = new k()),
      (this._useHighPrecisionMask = !1),
      (this._mvpMatrix4x4 = new A()),
      this._mvpMatrix4x4.loadIdentity();
  }
}
var ot = ((r) => (
  (r[r.CubismBlendMode_Normal = 0] = "CubismBlendMode_Normal"),
    (r[r.CubismBlendMode_Additive = 1] = "CubismBlendMode_Additive"),
    (r[r.CubismBlendMode_Multiplicative = 2] =
      "CubismBlendMode_Multiplicative"),
    r
))(ot || {});
class k {
  constructor(t = 1, e = 1, i = 1, s = 1) {
    (this.r = t), (this.g = e), (this.b = i), (this.a = s);
  }
}
class js {
  constructor(t, e) {
    (this._clippingIdList = t),
      (this._clippingIdCount = e),
      (this._allClippedDrawRect = new re()),
      (this._layoutBounds = new re()),
      (this._clippedDrawableIndexList = []),
      (this._matrixForMask = new A()),
      (this._matrixForDraw = new A()),
      (this._bufferIndex = 0);
  }
  release() {
    this._layoutBounds != null && (this._layoutBounds = null),
      this._allClippedDrawRect != null && (this._allClippedDrawRect = null),
      this._clippedDrawableIndexList != null &&
      (this._clippedDrawableIndexList = null);
  }
  addClippedDrawable(t) {
    this._clippedDrawableIndexList.push(t);
  }
}
var $e;
((r) => {
  (r.CubismBlendMode = ot), (r.CubismRenderer = ge), (r.CubismTextureColor = k);
})($e || ($e = {}));
const Gs = (r, t, e) => {
    Fe.print(r, "[CSM]" + t, e);
  },
  Jt = (r, t, e) => {
    Gs(
      r,
      t +
        `
`,
      e,
    );
  },
  W = (r) => {
    console.assert(r);
  };
let zt, q, rt, R;
(zt = (r, ...t) => {
  Jt(ct.LogLevel_Debug, "[D]" + r, t);
}),
  (q = (r, ...t) => {
    Jt(ct.LogLevel_Info, "[I]" + r, t);
  }),
  (rt = (r, ...t) => {
    Jt(ct.LogLevel_Warning, "[W]" + r, t);
  }),
  (R = (r, ...t) => {
    Jt(ct.LogLevel_Error, "[E]" + r, t);
  });
class Fe {
  static print(t, e, i) {
    if (t < V.getLoggingLevel()) return;
    const s = V.coreLogFunction;
    if (!s) return;
    const a = e.replace(/\{(\d+)\}/g, (o, n) => i[n]);
    s(a);
  }
  static dumpBytes(t, e, i) {
    for (let s = 0; s < i; s++) {
      s % 16 == 0 && s > 0
        ? this.print(
          t,
          `
`,
        )
        : s % 8 == 0 && s > 0 && this.print(t, "  "),
        this.print(t, "{0} ", [e[s] & 255]);
    }
    this.print(
      t,
      `
`,
    );
  }
  constructor() {}
}
var We;
((r) => {
  r.CubismDebug = Fe;
})(We || (We = {}));
class hs {
  constructor(t, e) {
    (this.first = t ?? null), (this.second = e ?? null);
  }
}
const Nt = class Nt {
  constructor(t) {
    t != null
      ? t < 1
        ? ((this._keyValues = []), (this._dummyValue = null), (this._size = 0))
        : ((this._keyValues = new Array(t)), (this._size = t))
      : ((this._keyValues = []), (this._dummyValue = null), (this._size = 0));
  }
  release() {
    this.clear();
  }
  appendKey(t) {
    this.prepareCapacity(this._size + 1, !1),
      (this._keyValues[this._size] = new hs(t)),
      (this._size += 1);
  }
  getValue(t) {
    let e = -1;
    for (let i = 0; i < this._size; i++) {
      if (this._keyValues[i].first == t) {
        e = i;
        break;
      }
    }
    return e >= 0
      ? this._keyValues[e].second
      : (this.appendKey(t), this._keyValues[this._size - 1].second);
  }
  setValue(t, e) {
    let i = -1;
    for (let s = 0; s < this._size; s++) {
      if (this._keyValues[s].first == t) {
        i = s;
        break;
      }
    }
    i >= 0
      ? (this._keyValues[i].second = e)
      : (this.appendKey(t), (this._keyValues[this._size - 1].second = e));
  }
  isExist(t) {
    for (let e = 0; e < this._size; e++) {
      if (this._keyValues[e].first == t) return !0;
    }
    return !1;
  }
  clear() {
    (this._keyValues = void 0),
      (this._keyValues = null),
      (this._keyValues = []),
      (this._size = 0);
  }
  getSize() {
    return this._size;
  }
  prepareCapacity(t, e) {
    t > this._keyValues.length &&
      (this._keyValues.length == 0
        ? (!e && t < Nt.DefaultSize && (t = Nt.DefaultSize),
          (this._keyValues.length = t))
        : (!e &&
          t < this._keyValues.length * 2 &&
          (t = this._keyValues.length * 2),
          (this._keyValues.length = t)));
  }
  begin() {
    return new _t(this, 0);
  }
  end() {
    return new _t(this, this._size);
  }
  erase(t) {
    const e = t._index;
    return e < 0 || this._size <= e
      ? t
      : (this._keyValues.splice(e, 1), --this._size, new _t(this, e));
  }
  dumpAsInt() {
    for (let t = 0; t < this._size; t++) {
      zt("{0} ,", this._keyValues[t]),
        zt(`
`);
    }
  }
};
Nt.DefaultSize = 10;
let z = Nt;
class _t {
  constructor(t, e) {
    (this._map = t ?? new z()), (this._index = e ?? 0);
  }
  set(t) {
    return (this._index = t._index), (this._map = t._map), this;
  }
  preIncrement() {
    return ++this._index, this;
  }
  preDecrement() {
    return --this._index, this;
  }
  increment() {
    return new _t(this._map, this._index++);
  }
  decrement() {
    const t = new _t(this._map, this._index);
    return (this._map = t._map), (this._index = t._index), this;
  }
  ptr() {
    return this._map._keyValues[this._index];
  }
  notEqual(t) {
    return this._index != t._index || this._map != t._map;
  }
}
var qe;
((r) => {
  (r.csmMap = z), (r.csmPair = hs), (r.iterator = _t);
})(qe || (qe = {}));
class ae {
  static parseJsonObject(t, e) {
    return (
      Object.keys(t).forEach((i) => {
        if (typeof t[i] == "boolean") {
          const s = !!t[i];
          e.put(i, new $(s));
        } else if (typeof t[i] == "string") {
          const s = String(t[i]);
          e.put(i, new Tt(s));
        } else if (typeof t[i] == "number") {
          const s = Number(t[i]);
          e.put(i, new oe(s));
        } else {
          t[i] instanceof Array
            ? e.put(i, ae.parseJsonArray(t[i]))
            : t[i] instanceof Object
            ? e.put(i, ae.parseJsonObject(t[i], new Rt()))
            : t[i] == null
            ? e.put(i, new wt())
            : e.put(i, t[i]);
        }
      }), e
    );
  }
  static parseJsonArray(t) {
    const e = new Ee();
    return (
      Object.keys(t).forEach((i) => {
        if (typeof Number(i) == "number") {
          if (typeof t[i] == "boolean") {
            const a = !!t[i];
            e.add(new $(a));
          } else if (typeof t[i] == "string") {
            const a = String(t[i]);
            e.add(new Tt(a));
          } else if (typeof t[i] == "number") {
            const a = Number(t[i]);
            e.add(new oe(a));
          } else {
            t[i] instanceof Array
              ? e.add(this.parseJsonArray(t[i]))
              : t[i] instanceof Object
              ? e.add(this.parseJsonObject(t[i], new Rt()))
              : t[i] == null
              ? e.add(new wt())
              : e.add(t[i]);
          }
        } else if (t[i] instanceof Array) e.add(this.parseJsonArray(t[i]));
        else if (t[i] instanceof Object) {
          e.add(this.parseJsonObject(t[i], new Rt()));
        } else if (t[i] == null) e.add(new wt());
        else {
          const a = Array(t[i]);
          for (let o = 0; o < a.length; o++) e.add(a[o]);
        }
      }), e
    );
  }
}
const ne = "Error: type mismatch",
  Hs = "Error: index out of bounds";
let O = class K {
  constructor() {}
  getRawString(t, e) {
    return this.getString(t, e);
  }
  toInt(t = 0) {
    return t;
  }
  toFloat(t = 0) {
    return t;
  }
  toBoolean(t = !1) {
    return t;
  }
  getSize() {
    return 0;
  }
  getArray(t = null) {
    return t;
  }
  getVector(t = new x()) {
    return t;
  }
  getMap(t) {
    return t;
  }
  getValueByIndex(t) {
    return K.errorValue.setErrorNotForClientCall(ne);
  }
  getValueByString(t) {
    return K.nullValue.setErrorNotForClientCall(ne);
  }
  getKeys() {
    return K.dummyKeys;
  }
  isError() {
    return !1;
  }
  isNull() {
    return !1;
  }
  isBool() {
    return !1;
  }
  isFloat() {
    return !1;
  }
  isString() {
    return !1;
  }
  isArray() {
    return !1;
  }
  isMap() {
    return !1;
  }
  equals(t) {
    return !1;
  }
  isStatic() {
    return !1;
  }
  setErrorNotForClientCall(t) {
    return Xt.errorValue;
  }
  static staticInitializeNotForClientCall() {
    ($.trueValue = new $(!0)),
      ($.falseValue = new $(!1)),
      (K.errorValue = new Xt("ERROR", !0)),
      (K.nullValue = new wt()),
      (K.dummyKeys = new x());
  }
  static staticReleaseNotForClientCall() {
    ($.trueValue = null),
      ($.falseValue = null),
      (K.errorValue = null),
      (K.nullValue = null),
      (K.dummyKeys = null);
  }
};
class L {
  constructor(t, e) {
    (this._parseCallback = ae.parseJsonObject),
      (this._error = null),
      (this._lineCount = 0),
      (this._root = null),
      t != null && this.parseBytes(t, e, this._parseCallback);
  }
  static create(t, e) {
    const i = new L();
    return i.parseBytes(t, e, i._parseCallback) ? i : (L.delete(i), null);
  }
  static delete(t) {}
  getRoot() {
    return this._root;
  }
  static arrayBufferToString(t) {
    const e = new Uint8Array(t);
    let i = "";
    for (let s = 0, a = e.length; s < a; ++s) {
      i += "%" + this.pad(e[s].toString(16));
    }
    return (i = decodeURIComponent(i)), i;
  }
  static pad(t) {
    return t.length < 2 ? "0" + t : t;
  }
  parseBytes(t, e, i) {
    const s = new Array(1),
      a = L.arrayBufferToString(t);
    if (
      (i == null
        ? (this._root = this.parseValue(a, e, 0, s))
        : (this._root = i(JSON.parse(a), new Rt())),
        this._error)
    ) {
      let o = "\0";
      return (
        (o = "Json parse error : @line " +
          (this._lineCount + 1) +
          `
`),
          (this._root = new Tt(o)),
          q("{0}", this._root.getRawString()),
          !1
      );
    } else if (this._root == null) {
      return (this._root = new Xt(new Y(this._error), !1)), !1;
    }
    return !0;
  }
  getParseError() {
    return this._error;
  }
  checkEndOfFile() {
    return this._root.getArray()[1].equals("EOF");
  }
  parseValue(t, e, i, s) {
    if (this._error) return null;
    let a = null,
      o = i,
      n;
    for (; o < e; o++) {
      switch (t[o]) {
        case "-":
        case ".":
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9": {
          const h = new Array(1);
          return (n = $s(t.slice(o), h)), (s[0] = t.indexOf(h[0])), new oe(n);
        }
        case '"':
          return new Tt(this.parseString(t, e, o + 1, s));
        case "[":
          return (a = this.parseArray(t, e, o + 1, s)), a;
        case "{":
          return (a = this.parseObject(t, e, o + 1, s)), a;
        case "n":
          return (
            o + 3 < e
              ? ((a = new wt()), (s[0] = o + 4))
              : (this._error = "parse null"), a
          );
        case "t":
          return (
            o + 3 < e
              ? ((a = $.trueValue), (s[0] = o + 4))
              : (this._error = "parse true"), a
          );
        case "f":
          return (
            o + 4 < e
              ? ((a = $.falseValue), (s[0] = o + 5))
              : (this._error = "illegal ',' position"), a
          );
        case ",":
          return (this._error = "illegal ',' position"), null;
        case "]":
          return (s[0] = o), null;
        case `
`:
          this._lineCount++;
      }
    }
    return (this._error = "illegal end of value"), null;
  }
  parseString(t, e, i, s) {
    if (this._error) return null;
    if (!t) return (this._error = "string is null"), null;
    let a = i,
      o,
      n;
    const l = new Y("");
    let h = i;
    for (; a < e; a++) {
      switch (((o = t[a]), o)) {
        case '"':
          return (s[0] = a + 1), l.append(t.slice(h), a - h), l.s;
        case "//":
          if (
            (a++, a - 1 > h && l.append(t.slice(h), a - h), (h = a + 1), a < e)
          ) {
            switch (((n = t[a]), n)) {
              case "\\":
                l.expansion(1, "\\");
                break;
              case '"':
                l.expansion(1, '"');
                break;
              case "/":
                l.expansion(1, "/");
                break;
              case "b":
                l.expansion(1, "\b");
                break;
              case "f":
                l.expansion(1, "\f");
                break;
              case "n":
                l.expansion(
                  1,
                  `
`,
                );
                break;
              case "r":
                l.expansion(1, "\r");
                break;
              case "t":
                l.expansion(1, "	");
                break;
              case "u":
                this._error = "parse string/unicord escape not supported";
                break;
            }
          } else this._error = "parse string/escape error";
      }
    }
    return (this._error = "parse string/illegal end"), null;
  }
  parseObject(t, e, i, s) {
    if (this._error) return null;
    if (!t) return (this._error = "buffer is null"), null;
    const a = new Rt();
    let o = "",
      n = i,
      l = "";
    const h = Array(1);
    let u = !1;
    for (; n < e; n++) {
      t: for (; n < e; n++) {
        switch (((l = t[n]), l)) {
          case '"':
            if (((o = this.parseString(t, e, n + 1, h)), this._error)) {
              return null;
            }
            (n = h[0]), (u = !0);
            break t;
          case "}":
            return (s[0] = n + 1), a;
          case ":":
            this._error = "illegal ':' position";
            break;
          case `
`:
            this._lineCount++;
        }
      }
      if (!u) return (this._error = "key not found"), null;
      u = !1;
      t: for (; n < e; n++) {
        switch (((l = t[n]), l)) {
          case ":":
            (u = !0), n++;
            break t;
          case "}":
            this._error = "illegal '}' position";
            break;
          case `
`:
            this._lineCount++;
        }
      }
      if (!u) return (this._error = "':' not found"), null;
      const d = this.parseValue(t, e, n, h);
      if (this._error) return null;
      (n = h[0]), a.put(o, d);
      t: for (; n < e; n++) {
        switch (((l = t[n]), l)) {
          case ",":
            break t;
          case "}":
            return (s[0] = n + 1), a;
          case `
`:
            this._lineCount++;
        }
      }
    }
    return (this._error = "illegal end of perseObject"), null;
  }
  parseArray(t, e, i, s) {
    if (this._error) return null;
    if (!t) return (this._error = "buffer is null"), null;
    let a = new Ee(),
      o = i,
      n;
    const l = new Array(1);
    for (; o < e; o++) {
      const h = this.parseValue(t, e, o, l);
      if (this._error) return null;
      (o = l[0]), h && a.add(h);
      t: for (; o < e; o++) {
        switch (((n = t[o]), n)) {
          case ",":
            break t;
          case "]":
            return (s[0] = o + 1), a;
          case `
`:
            ++this._lineCount;
        }
      }
    }
    return (a = void 0), (this._error = "illegal end of parseObject"), null;
  }
}
class oe extends O {
  constructor(t) {
    super(), (this._value = t);
  }
  isFloat() {
    return !0;
  }
  getString(t, e) {
    const i = "\0";
    return (
      (this._value = parseFloat(i)),
        (this._stringBuffer = i),
        this._stringBuffer
    );
  }
  toInt(t = 0) {
    return parseInt(this._value.toString());
  }
  toFloat(t = 0) {
    return this._value;
  }
  equals(t) {
    return typeof t == "number" ? (Math.round(t) ? !1 : t == this._value) : !1;
  }
}
class $ extends O {
  isBool() {
    return !0;
  }
  toBoolean(t = !1) {
    return this._boolValue;
  }
  getString(t, e) {
    return (
      (this._stringBuffer = this._boolValue ? "true" : "false"),
        this._stringBuffer
    );
  }
  equals(t) {
    return typeof t == "boolean" ? t == this._boolValue : !1;
  }
  isStatic() {
    return !0;
  }
  constructor(t) {
    super(), (this._boolValue = t);
  }
}
class Tt extends O {
  constructor(t) {
    super(),
      typeof t == "string" && (this._stringBuffer = t),
      t instanceof Y && (this._stringBuffer = t.s);
  }
  isString() {
    return !0;
  }
  getString(t, e) {
    return this._stringBuffer;
  }
  equals(t) {
    return typeof t == "string"
      ? this._stringBuffer == t
      : t instanceof Y
      ? this._stringBuffer == t.s
      : !1;
  }
}
class Xt extends Tt {
  isStatic() {
    return this._isStatic;
  }
  setErrorNotForClientCall(t) {
    return (this._stringBuffer = t), this;
  }
  constructor(t, e) {
    typeof t == "string" ? super(t) : super(t), (this._isStatic = e);
  }
  isError() {
    return !0;
  }
}
class wt extends O {
  isNull() {
    return !0;
  }
  getString(t, e) {
    return this._stringBuffer;
  }
  isStatic() {
    return !0;
  }
  setErrorNotForClientCall(t) {
    return (this._stringBuffer = t), Xt.nullValue;
  }
  constructor() {
    super(), (this._stringBuffer = "NullValue");
  }
}
class Ee extends O {
  constructor() {
    super(), (this._array = new x());
  }
  release() {
    for (
      let t = this._array.begin();
      t.notEqual(this._array.end());
      t.preIncrement()
    ) {
      let e = t.ptr();
      e && !e.isStatic() && ((e = void 0), (e = null));
    }
  }
  isArray() {
    return !0;
  }
  getValueByIndex(t) {
    if (t < 0 || this._array.getSize() <= t) {
      return O.errorValue.setErrorNotForClientCall(Hs);
    }
    const e = this._array.at(t);
    return e ?? O.nullValue;
  }
  getValueByString(t) {
    return O.errorValue.setErrorNotForClientCall(ne);
  }
  getString(t, e) {
    const i = e +
      `[
`;
    for (
      let s = this._array.begin();
      s.notEqual(this._array.end());
      s.increment()
    ) {
      const a = s.ptr();
      this._stringBuffer += e +
        "" +
        a.getString(e + " ") +
        `
`;
    }
    return (
      (this._stringBuffer = i +
        e +
        `]
`), this._stringBuffer
    );
  }
  add(t) {
    this._array.pushBack(t);
  }
  getVector(t = null) {
    return this._array;
  }
  getSize() {
    return this._array.getSize();
  }
}
class Rt extends O {
  constructor() {
    super(), (this._map = new z());
  }
  release() {
    const t = this._map.begin();
    for (; t.notEqual(this._map.end());) {
      let e = t.ptr().second;
      e && !e.isStatic() && ((e = void 0), (e = null)), t.preIncrement();
    }
  }
  isMap() {
    return !0;
  }
  getValueByString(t) {
    if (t instanceof Y) {
      const e = this._map.getValue(t.s);
      return e ?? O.nullValue;
    }
    for (
      let e = this._map.begin();
      e.notEqual(this._map.end());
      e.preIncrement()
    ) {
      if (e.ptr().first == t) {
        return e.ptr().second == null ? O.nullValue : e.ptr().second;
      }
    }
    return O.nullValue;
  }
  getValueByIndex(t) {
    return O.errorValue.setErrorNotForClientCall(ne);
  }
  getString(t, e) {
    this._stringBuffer = e +
      `{
`;
    const i = this._map.begin();
    for (; i.notEqual(this._map.end());) {
      const s = i.ptr().first,
        a = i.ptr().second;
      (this._stringBuffer += e +
        " " +
        s +
        " : " +
        a.getString(e + "   ") +
        ` 
`), i.preIncrement();
    }
    return (
      (this._stringBuffer += e +
        `}
`), this._stringBuffer
    );
  }
  getMap(t) {
    return this._map;
  }
  put(t, e) {
    this._map.setValue(t, e);
  }
  getKeys() {
    if (!this._keys) {
      this._keys = new x();
      const t = this._map.begin();
      for (; t.notEqual(this._map.end());) {
        const e = t.ptr().first;
        this._keys.pushBack(e), t.preIncrement();
      }
    }
    return this._keys;
  }
  getSize() {
    return this._keys.getSize();
  }
}
var Je;
((r) => {
  (r.CubismJson = L),
    (r.JsonArray = Ee),
    (r.JsonBoolean = $),
    (r.JsonError = Xt),
    (r.JsonFloat = oe),
    (r.JsonMap = Rt),
    (r.JsonNullvalue = wt),
    (r.JsonString = Tt),
    (r.Value = O);
})(Je || (Je = {}));
function $s(r, t) {
  let e = 0;
  for (let s = 1;; s++) {
    const a = r.slice(s - 1, s);
    if (a == "e" || a == "-" || a == "E") continue;
    const o = r.substring(0, s),
      n = Number(o);
    if (isNaN(n)) break;
    e = s;
  }
  let i = parseFloat(r);
  return isNaN(i) && (i = NaN), (t[0] = r.slice(e)), i;
}
let j = !1,
  St = !1,
  xt = null,
  At = null;
const at = Object.freeze({ vertexOffset: 0, vertexStep: 2 });
function Ot(r) {
  r && (r = void 0);
}
class V {
  static startUp(t = null) {
    if (j) return q("CubismFramework.startUp() is already done."), j;
    if (
      ((xt = t),
        xt != null &&
        Live2DCubismCore.Logging.csmSetLogFunction(xt.logFunction),
        (j = !0),
        j)
    ) {
      const e = Live2DCubismCore.Version.csmGetVersion(),
        i = (e & 4278190080) >> 24,
        s = (e & 16711680) >> 16,
        a = e & 65535,
        o = e;
      q(
        "Live2D Cubism Core version: {0}.{1}.{2} ({3})",
        ("00" + i).slice(-2),
        ("00" + s).slice(-2),
        ("0000" + a).slice(-4),
        o,
      );
    }
    return q("CubismFramework.startUp() is complete."), j;
  }
  static cleanUp() {
    (j = !1), (St = !1), (xt = null), (At = null);
  }
  static initialize(t = 0) {
    if ((W(j), !j)) {
      rt("CubismFramework is not started.");
      return;
    }
    if (St) {
      rt("CubismFramework.initialize() skipped, already initialized.");
      return;
    }
    O.staticInitializeNotForClientCall(),
      (At = new us()),
      Live2DCubismCore.Memory.initializeAmountOfMemory(t),
      (St = !0),
      q("CubismFramework.initialize() is complete.");
  }
  static dispose() {
    if ((W(j), !j)) {
      rt("CubismFramework is not started.");
      return;
    }
    if (!St) {
      rt("CubismFramework.dispose() skipped, not initialized.");
      return;
    }
    O.staticReleaseNotForClientCall(),
      At.release(),
      (At = null),
      ge.staticRelease(),
      (St = !1),
      q("CubismFramework.dispose() is complete.");
  }
  static isStarted() {
    return j;
  }
  static isInitialized() {
    return St;
  }
  static coreLogFunction(t) {
    Live2DCubismCore.Logging.csmGetLogFunction() &&
      Live2DCubismCore.Logging.csmGetLogFunction()(t);
  }
  static getLoggingLevel() {
    return xt != null ? xt.loggingLevel : 5;
  }
  static getIdManager() {
    return At;
  }
  constructor() {}
}
class Ws {}
var ct = ((r) => (
    (r[r.LogLevel_Verbose = 0] = "LogLevel_Verbose"),
      (r[r.LogLevel_Debug = 1] = "LogLevel_Debug"),
      (r[r.LogLevel_Info = 2] = "LogLevel_Info"),
      (r[r.LogLevel_Warning = 3] = "LogLevel_Warning"),
      (r[r.LogLevel_Error = 4] = "LogLevel_Error"),
      (r[r.LogLevel_Off = 5] = "LogLevel_Off"),
      r
  ))(ct || {}),
  Ke;
((r) => {
  (r.Constant = at), (r.csmDelete = Ot), (r.CubismFramework = V);
})(Ke || (Ke = {}));
const Ze = 1,
  qs = 2,
  Js = 0.8,
  Ks = -1,
  Zs = 1,
  Qs = -2,
  tr = 2,
  er = -2,
  ir = 2,
  gs = "../../Resources/",
  sr = "icon_gear.png",
  be = ["ryusei-chan"],
  rr = be.length,
  ar = "Idle",
  nr = "TapBody",
  Qe = "Head",
  ti = "Body",
  or = 1,
  lr = 2,
  ei = 3,
  ur = ct.LogLevel_Verbose;
let E = null,
  m = null,
  Ct = null;
class Ae {
  static getInstance() {
    return Ct == null && (Ct = new Ae()), Ct;
  }
  static releaseInstance() {
    Ct != null && Ct.release(), (Ct = null);
  }
  constructor() {
    (E = document.createElement("canvas")),
      (m = E.getContext("webgl2")),
      m ||
      (alert("Cannot initialize WebGL. This browser does not support."),
        (m = null),
        (document.body.innerHTML =
          "This browser does not support the <code>&lt;canvas&gt;</code> element."));
  }
  release() {}
}
const C = Object.freeze({
  HitAreaPrefix: "HitArea",
  HitAreaHead: "Head",
  HitAreaBody: "Body",
  PartsIdCore: "Parts01Core",
  PartsArmPrefix: "Parts01Arm_",
  PartsArmLPrefix: "Parts01ArmL_",
  PartsArmRPrefix: "Parts01ArmR_",
  ParamAngleX: "ParamAngleX",
  ParamAngleY: "ParamAngleY",
  ParamAngleZ: "ParamAngleZ",
  ParamEyeLOpen: "ParamEyeLOpen",
  ParamEyeLSmile: "ParamEyeLSmile",
  ParamEyeROpen: "ParamEyeROpen",
  ParamEyeRSmile: "ParamEyeRSmile",
  ParamEyeBallX: "ParamEyeBallX",
  ParamEyeBallY: "ParamEyeBallY",
  ParamEyeBallForm: "ParamEyeBallForm",
  ParamBrowLY: "ParamBrowLY",
  ParamBrowRY: "ParamBrowRY",
  ParamBrowLX: "ParamBrowLX",
  ParamBrowRX: "ParamBrowRX",
  ParamBrowLAngle: "ParamBrowLAngle",
  ParamBrowRAngle: "ParamBrowRAngle",
  ParamBrowLForm: "ParamBrowLForm",
  ParamBrowRForm: "ParamBrowRForm",
  ParamMouthForm: "ParamMouthForm",
  ParamMouthOpenY: "ParamMouthOpenY",
  ParamCheek: "ParamCheek",
  ParamBodyAngleX: "ParamBodyAngleX",
  ParamBodyAngleY: "ParamBodyAngleY",
  ParamBodyAngleZ: "ParamBodyAngleZ",
  ParamBreath: "ParamBreath",
  ParamArmLA: "ParamArmLA",
  ParamArmRA: "ParamArmRA",
  ParamArmLB: "ParamArmLB",
  ParamArmRB: "ParamArmRB",
  ParamHandL: "ParamHandL",
  ParamHandR: "ParamHandR",
  ParamHairFront: "ParamHairFront",
  ParamHairSide: "ParamHairSide",
  ParamHairBack: "ParamHairBack",
  ParamHairFluffy: "ParamHairFluffy",
  ParamShoulderY: "ParamShoulderY",
  ParamBustX: "ParamBustX",
  ParamBustY: "ParamBustY",
  ParamBaseX: "ParamBaseX",
  ParamBaseY: "ParamBaseY",
  ParamNONE: "NONE:",
});
var ii;
((r) => {
  (r.HitAreaBody = C.HitAreaBody),
    (r.HitAreaHead = C.HitAreaHead),
    (r.HitAreaPrefix = C.HitAreaPrefix),
    (r.ParamAngleX = C.ParamAngleX),
    (r.ParamAngleY = C.ParamAngleY),
    (r.ParamAngleZ = C.ParamAngleZ),
    (r.ParamArmLA = C.ParamArmLA),
    (r.ParamArmLB = C.ParamArmLB),
    (r.ParamArmRA = C.ParamArmRA),
    (r.ParamArmRB = C.ParamArmRB),
    (r.ParamBaseX = C.ParamBaseX),
    (r.ParamBaseY = C.ParamBaseY),
    (r.ParamBodyAngleX = C.ParamBodyAngleX),
    (r.ParamBodyAngleY = C.ParamBodyAngleY),
    (r.ParamBodyAngleZ = C.ParamBodyAngleZ),
    (r.ParamBreath = C.ParamBreath),
    (r.ParamBrowLAngle = C.ParamBrowLAngle),
    (r.ParamBrowLForm = C.ParamBrowLForm),
    (r.ParamBrowLX = C.ParamBrowLX),
    (r.ParamBrowLY = C.ParamBrowLY),
    (r.ParamBrowRAngle = C.ParamBrowRAngle),
    (r.ParamBrowRForm = C.ParamBrowRForm),
    (r.ParamBrowRX = C.ParamBrowRX),
    (r.ParamBrowRY = C.ParamBrowRY),
    (r.ParamBustX = C.ParamBustX),
    (r.ParamBustY = C.ParamBustY),
    (r.ParamCheek = C.ParamCheek),
    (r.ParamEyeBallForm = C.ParamEyeBallForm),
    (r.ParamEyeBallX = C.ParamEyeBallX),
    (r.ParamEyeBallY = C.ParamEyeBallY),
    (r.ParamEyeLOpen = C.ParamEyeLOpen),
    (r.ParamEyeLSmile = C.ParamEyeLSmile),
    (r.ParamEyeROpen = C.ParamEyeROpen),
    (r.ParamEyeRSmile = C.ParamEyeRSmile),
    (r.ParamHairBack = C.ParamHairBack),
    (r.ParamHairFluffy = C.ParamHairFluffy),
    (r.ParamHairFront = C.ParamHairFront),
    (r.ParamHairSide = C.ParamHairSide),
    (r.ParamHandL = C.ParamHandL),
    (r.ParamHandR = C.ParamHandR),
    (r.ParamMouthForm = C.ParamMouthForm),
    (r.ParamMouthOpenY = C.ParamMouthOpenY),
    (r.ParamNONE = C.ParamNONE),
    (r.ParamShoulderY = C.ParamShoulderY),
    (r.PartsArmLPrefix = C.PartsArmLPrefix),
    (r.PartsArmPrefix = C.PartsArmPrefix),
    (r.PartsArmRPrefix = C.PartsArmRPrefix),
    (r.PartsIdCore = C.PartsIdCore);
})(ii || (ii = {}));
class cs {}
var si;
((r) => {
  r.ICubismModelSetting = cs;
})(si || (si = {}));
const tt = "FileReferences",
  hr = "Groups",
  gr = "Layout",
  cr = "HitAreas",
  dr = "Moc",
  _r = "Textures",
  mr = "Physics",
  pr = "Pose",
  fr = "Expressions",
  yr = "Motions",
  ri = "UserData",
  et = "Name",
  ai = "File",
  Sr = "Id",
  Kt = "Ids",
  ni = "Sound",
  oi = "FadeInTime",
  li = "FadeOutTime",
  _e = "LipSync",
  me = "EyeBlink";
class ds extends cs {
  constructor(t, e) {
    super(),
      (this._json = L.create(t, e)),
      this.getJson() &&
      ((this._jsonValue = new x()),
        this._jsonValue.pushBack(this.getJson().getRoot().getValueByString(hr)),
        this._jsonValue.pushBack(
          this.getJson().getRoot().getValueByString(tt).getValueByString(dr),
        ),
        this._jsonValue.pushBack(
          this.getJson().getRoot().getValueByString(tt).getValueByString(yr),
        ),
        this._jsonValue.pushBack(
          this.getJson().getRoot().getValueByString(tt).getValueByString(fr),
        ),
        this._jsonValue.pushBack(
          this.getJson().getRoot().getValueByString(tt).getValueByString(_r),
        ),
        this._jsonValue.pushBack(
          this.getJson().getRoot().getValueByString(tt).getValueByString(mr),
        ),
        this._jsonValue.pushBack(
          this.getJson().getRoot().getValueByString(tt).getValueByString(pr),
        ),
        this._jsonValue.pushBack(
          this.getJson().getRoot().getValueByString(cr),
        ));
  }
  release() {
    L.delete(this._json), (this._jsonValue = null);
  }
  getJson() {
    return this._json;
  }
  getModelFileName() {
    return this.isExistModelFile() ? this._jsonValue.at(1).getRawString() : "";
  }
  getTextureCount() {
    return this.isExistTextureFiles() ? this._jsonValue.at(4).getSize() : 0;
  }
  getTextureDirectory() {
    const e = this._jsonValue
        .at(4)
        .getValueByIndex(0)
        .getRawString()
        .split("/"),
      i = e.length - 1;
    let s = "";
    for (let a = 0; a < i; a++) (s += e[a]), a < i - 1 && (s += "/");
    return s;
  }
  getTextureFileName(t) {
    return this._jsonValue.at(4).getValueByIndex(t).getRawString();
  }
  getHitAreasCount() {
    return this.isExistHitAreas() ? this._jsonValue.at(7).getSize() : 0;
  }
  getHitAreaId(t) {
    return V.getIdManager().getId(
      this._jsonValue
        .at(7)
        .getValueByIndex(t)
        .getValueByString(Sr)
        .getRawString(),
    );
  }
  getHitAreaName(t) {
    return this._jsonValue
      .at(7)
      .getValueByIndex(t)
      .getValueByString(et)
      .getRawString();
  }
  getPhysicsFileName() {
    return this.isExistPhysicsFile()
      ? this._jsonValue.at(5).getRawString()
      : "";
  }
  getPoseFileName() {
    return this.isExistPoseFile() ? this._jsonValue.at(6).getRawString() : "";
  }
  getExpressionCount() {
    return this.isExistExpressionFile() ? this._jsonValue.at(3).getSize() : 0;
  }
  getExpressionName(t) {
    return this._jsonValue
      .at(3)
      .getValueByIndex(t)
      .getValueByString(et)
      .getRawString();
  }
  getExpressionFileName(t) {
    return this._jsonValue
      .at(3)
      .getValueByIndex(t)
      .getValueByString(ai)
      .getRawString();
  }
  getMotionGroupCount() {
    return this.isExistMotionGroups()
      ? this._jsonValue.at(2).getKeys().getSize()
      : 0;
  }
  getMotionGroupName(t) {
    return this.isExistMotionGroups()
      ? this._jsonValue.at(2).getKeys().at(t)
      : null;
  }
  getMotionCount(t) {
    return this.isExistMotionGroupName(t)
      ? this._jsonValue.at(2).getValueByString(t).getSize()
      : 0;
  }
  getMotionFileName(t, e) {
    return this.isExistMotionGroupName(t)
      ? this._jsonValue
        .at(2)
        .getValueByString(t)
        .getValueByIndex(e)
        .getValueByString(ai)
        .getRawString()
      : "";
  }
  getMotionSoundFileName(t, e) {
    return this.isExistMotionSoundFile(t, e)
      ? this._jsonValue
        .at(2)
        .getValueByString(t)
        .getValueByIndex(e)
        .getValueByString(ni)
        .getRawString()
      : "";
  }
  getMotionFadeInTimeValue(t, e) {
    return this.isExistMotionFadeIn(t, e)
      ? this._jsonValue
        .at(2)
        .getValueByString(t)
        .getValueByIndex(e)
        .getValueByString(oi)
        .toFloat()
      : -1;
  }
  getMotionFadeOutTimeValue(t, e) {
    return this.isExistMotionFadeOut(t, e)
      ? this._jsonValue
        .at(2)
        .getValueByString(t)
        .getValueByIndex(e)
        .getValueByString(li)
        .toFloat()
      : -1;
  }
  getUserDataFile() {
    return this.isExistUserDataFile()
      ? this.getJson()
        .getRoot()
        .getValueByString(tt)
        .getValueByString(ri)
        .getRawString()
      : "";
  }
  getLayoutMap(t) {
    const e = this.getJson().getRoot().getValueByString(gr).getMap();
    if (e == null) return !1;
    let i = !1;
    for (const s = e.begin(); s.notEqual(e.end()); s.preIncrement()) {
      t.setValue(s.ptr().first, s.ptr().second.toFloat()), (i = !0);
    }
    return i;
  }
  getEyeBlinkParameterCount() {
    if (!this.isExistEyeBlinkParameters()) return 0;
    let t = 0;
    for (let e = 0; e < this._jsonValue.at(0).getSize(); e++) {
      const i = this._jsonValue.at(0).getValueByIndex(e);
      if (
        !(i.isNull() || i.isError()) &&
        i.getValueByString(et).getRawString() == me
      ) {
        t = i.getValueByString(Kt).getVector().getSize();
        break;
      }
    }
    return t;
  }
  getEyeBlinkParameterId(t) {
    if (!this.isExistEyeBlinkParameters()) return null;
    for (let e = 0; e < this._jsonValue.at(0).getSize(); e++) {
      const i = this._jsonValue.at(0).getValueByIndex(e);
      if (
        !(i.isNull() || i.isError()) &&
        i.getValueByString(et).getRawString() == me
      ) {
        return V.getIdManager().getId(
          i.getValueByString(Kt).getValueByIndex(t).getRawString(),
        );
      }
    }
    return null;
  }
  getLipSyncParameterCount() {
    if (!this.isExistLipSyncParameters()) return 0;
    let t = 0;
    for (let e = 0; e < this._jsonValue.at(0).getSize(); e++) {
      const i = this._jsonValue.at(0).getValueByIndex(e);
      if (
        !(i.isNull() || i.isError()) &&
        i.getValueByString(et).getRawString() == _e
      ) {
        t = i.getValueByString(Kt).getVector().getSize();
        break;
      }
    }
    return t;
  }
  getLipSyncParameterId(t) {
    if (!this.isExistLipSyncParameters()) return null;
    for (let e = 0; e < this._jsonValue.at(0).getSize(); e++) {
      const i = this._jsonValue.at(0).getValueByIndex(e);
      if (
        !(i.isNull() || i.isError()) &&
        i.getValueByString(et).getRawString() == _e
      ) {
        return V.getIdManager().getId(
          i.getValueByString(Kt).getValueByIndex(t).getRawString(),
        );
      }
    }
    return null;
  }
  isExistModelFile() {
    const t = this._jsonValue.at(1);
    return !t.isNull() && !t.isError();
  }
  isExistTextureFiles() {
    const t = this._jsonValue.at(4);
    return !t.isNull() && !t.isError();
  }
  isExistHitAreas() {
    const t = this._jsonValue.at(7);
    return !t.isNull() && !t.isError();
  }
  isExistPhysicsFile() {
    const t = this._jsonValue.at(5);
    return !t.isNull() && !t.isError();
  }
  isExistPoseFile() {
    const t = this._jsonValue.at(6);
    return !t.isNull() && !t.isError();
  }
  isExistExpressionFile() {
    const t = this._jsonValue.at(3);
    return !t.isNull() && !t.isError();
  }
  isExistMotionGroups() {
    const t = this._jsonValue.at(2);
    return !t.isNull() && !t.isError();
  }
  isExistMotionGroupName(t) {
    const e = this._jsonValue.at(2).getValueByString(t);
    return !e.isNull() && !e.isError();
  }
  isExistMotionSoundFile(t, e) {
    const i = this._jsonValue
      .at(2)
      .getValueByString(t)
      .getValueByIndex(e)
      .getValueByString(ni);
    return !i.isNull() && !i.isError();
  }
  isExistMotionFadeIn(t, e) {
    const i = this._jsonValue
      .at(2)
      .getValueByString(t)
      .getValueByIndex(e)
      .getValueByString(oi);
    return !i.isNull() && !i.isError();
  }
  isExistMotionFadeOut(t, e) {
    const i = this._jsonValue
      .at(2)
      .getValueByString(t)
      .getValueByIndex(e)
      .getValueByString(li);
    return !i.isNull() && !i.isError();
  }
  isExistUserDataFile() {
    const t = this.getJson()
      .getRoot()
      .getValueByString(tt)
      .getValueByString(ri);
    return !t.isNull() && !t.isError();
  }
  isExistEyeBlinkParameters() {
    if (this._jsonValue.at(0).isNull() || this._jsonValue.at(0).isError()) {
      return !1;
    }
    for (let t = 0; t < this._jsonValue.at(0).getSize(); ++t) {
      if (
        this._jsonValue
          .at(0)
          .getValueByIndex(t)
          .getValueByString(et)
          .getRawString() == me
      ) {
        return !0;
      }
    }
    return !1;
  }
  isExistLipSyncParameters() {
    if (this._jsonValue.at(0).isNull() || this._jsonValue.at(0).isError()) {
      return !1;
    }
    for (let t = 0; t < this._jsonValue.at(0).getSize(); ++t) {
      if (
        this._jsonValue
          .at(0)
          .getValueByIndex(t)
          .getValueByString(et)
          .getRawString() == _e
      ) {
        return !0;
      }
    }
    return !1;
  }
}
var ui;
((r) => {
  r.CubismModelSettingJson = ds;
})(ui || (ui = {}));
class Wt {
  static create() {
    return new Wt();
  }
  static delete(t) {}
  setParameters(t) {
    this._breathParameters = t;
  }
  getParameters() {
    return this._breathParameters;
  }
  updateParameters(t, e) {
    this._currentTime += e;
    const i = this._currentTime * 2 * 3.14159;
    for (let s = 0; s < this._breathParameters.getSize(); ++s) {
      const a = this._breathParameters.at(s);
      t.addParameterValueById(
        a.parameterId,
        a.offset + a.peak * Math.sin(i / a.cycle),
        a.weight,
      );
    }
  }
  constructor() {
    this._currentTime = 0;
  }
}
class vt {
  constructor(t, e, i, s, a) {
    (this.parameterId = t ?? null),
      (this.offset = e ?? 0),
      (this.peak = i ?? 0),
      (this.cycle = s ?? 0),
      (this.weight = a ?? 0);
  }
}
var hi;
((r) => {
  (r.BreathParameterData = vt), (r.CubismBreath = Wt);
})(hi || (hi = {}));
const Ut = class Ut {
  static create(t = null) {
    return new Ut(t);
  }
  static delete(t) {}
  setBlinkingInterval(t) {
    this._blinkingIntervalSeconds = t;
  }
  setBlinkingSetting(t, e, i) {
    (this._closingSeconds = t),
      (this._closedSeconds = e),
      (this._openingSeconds = i);
  }
  setParameterIds(t) {
    this._parameterIds = t;
  }
  getParameterIds() {
    return this._parameterIds;
  }
  updateParameters(t, e) {
    this._userTimeSeconds += e;
    let i,
      s = 0;
    switch (this._blinkingState) {
      case 2:
        (s = (this._userTimeSeconds - this._stateStartTimeSeconds) /
          this._closingSeconds),
          s >= 1 &&
          ((s = 1),
            (this._blinkingState = 3),
            (this._stateStartTimeSeconds = this._userTimeSeconds)),
          (i = 1 - s);
        break;
      case 3:
        (s = (this._userTimeSeconds - this._stateStartTimeSeconds) /
          this._closedSeconds),
          s >= 1 &&
          ((this._blinkingState = 4),
            (this._stateStartTimeSeconds = this._userTimeSeconds)),
          (i = 0);
        break;
      case 4:
        (s = (this._userTimeSeconds - this._stateStartTimeSeconds) /
          this._openingSeconds),
          s >= 1 &&
          ((s = 1),
            (this._blinkingState = 1),
            (this._nextBlinkingTime = this.determinNextBlinkingTiming())),
          (i = s);
        break;
      case 1:
        this._nextBlinkingTime < this._userTimeSeconds &&
        ((this._blinkingState = 2),
          (this._stateStartTimeSeconds = this._userTimeSeconds)), (i = 1);
        break;
      case 0:
      default:
        (this._blinkingState = 1),
          (this._nextBlinkingTime = this.determinNextBlinkingTiming()),
          (i = 1);
        break;
    }
    Ut.CloseIfZero || (i = -i);
    for (let o = 0; o < this._parameterIds.getSize(); ++o) {
      t.setParameterValueById(this._parameterIds.at(o), i);
    }
  }
  constructor(t) {
    if (
      ((this._blinkingState = 0),
        (this._nextBlinkingTime = 0),
        (this._stateStartTimeSeconds = 0),
        (this._blinkingIntervalSeconds = 4),
        (this._closingSeconds = 0.1),
        (this._closedSeconds = 0.05),
        (this._openingSeconds = 0.15),
        (this._userTimeSeconds = 0),
        (this._parameterIds = new x()),
        t != null)
    ) {
      for (let e = 0; e < t.getEyeBlinkParameterCount(); ++e) {
        this._parameterIds.pushBack(t.getEyeBlinkParameterId(e));
      }
    }
  }
  determinNextBlinkingTiming() {
    const t = Math.random();
    return this._userTimeSeconds + t * (2 * this._blinkingIntervalSeconds - 1);
  }
};
Ut.CloseIfZero = !0;
let Yt = Ut;
var _s = ((r) => (
    (r[r.EyeState_First = 0] = "EyeState_First"),
      (r[r.EyeState_Interval = 1] = "EyeState_Interval"),
      (r[r.EyeState_Closing = 2] = "EyeState_Closing"),
      (r[r.EyeState_Closed = 3] = "EyeState_Closed"),
      (r[r.EyeState_Opening = 4] = "EyeState_Opening"),
      r
  ))(_s || {}),
  gi;
((r) => {
  (r.CubismEyeBlink = Yt), (r.EyeState = _s);
})(gi || (gi = {}));
const xr = 0.001,
  pe = 0.5,
  ci = "FadeInTime",
  di = "Link",
  Cr = "Groups",
  Mr = "Id";
class jt {
  static create(t, e) {
    const i = L.create(t, e);
    if (!i) return null;
    const s = new jt(),
      a = i.getRoot();
    a.getValueByString(ci).isNull() ||
      ((s._fadeTimeSeconds = a.getValueByString(ci).toFloat(pe)),
        s._fadeTimeSeconds <= 0 && (s._fadeTimeSeconds = pe));
    const o = a.getValueByString(Cr),
      n = o.getSize();
    for (let l = 0; l < n; ++l) {
      const h = o.getValueByIndex(l),
        u = h.getSize();
      let d = 0;
      for (let _ = 0; _ < u; ++_) {
        const g = h.getValueByIndex(_),
          c = new Gt(),
          f = V.getIdManager().getId(g.getValueByString(Mr).getRawString());
        if (((c.partId = f), !g.getValueByString(di).isNull())) {
          const p = g.getValueByString(di),
            S = p.getSize();
          for (let y = 0; y < S; ++y) {
            const B = new Gt(),
              v = V.getIdManager().getId(p.getValueByIndex(y).getString());
            (B.partId = v), c.link.pushBack(B);
          }
        }
        s._partGroups.pushBack(c.clone()), ++d;
      }
      s._partGroupCounts.pushBack(d);
    }
    return L.delete(i), s;
  }
  static delete(t) {}
  updateParameters(t, e) {
    t != this._lastModel && this.reset(t),
      (this._lastModel = t),
      e < 0 && (e = 0);
    let i = 0;
    for (let s = 0; s < this._partGroupCounts.getSize(); s++) {
      const a = this._partGroupCounts.at(s);
      this.doFade(t, e, i, a), (i += a);
    }
    this.copyPartOpacities(t);
  }
  reset(t) {
    let e = 0;
    for (let i = 0; i < this._partGroupCounts.getSize(); ++i) {
      const s = this._partGroupCounts.at(i);
      for (let a = e; a < e + s; ++a) {
        this._partGroups.at(a).initialize(t);
        const o = this._partGroups.at(a).partIndex,
          n = this._partGroups.at(a).parameterIndex;
        if (!(o < 0)) {
          t.setPartOpacityByIndex(o, a == e ? 1 : 0),
            t.setParameterValueByIndex(n, a == e ? 1 : 0);
          for (let l = 0; l < this._partGroups.at(a).link.getSize(); ++l) {
            this._partGroups.at(a).link.at(l).initialize(t);
          }
        }
      }
      e += s;
    }
  }
  copyPartOpacities(t) {
    for (let e = 0; e < this._partGroups.getSize(); ++e) {
      const i = this._partGroups.at(e);
      if (i.link.getSize() == 0) continue;
      const s = this._partGroups.at(e).partIndex,
        a = t.getPartOpacityByIndex(s);
      for (let o = 0; o < i.link.getSize(); ++o) {
        const l = i.link.at(o).partIndex;
        l < 0 || t.setPartOpacityByIndex(l, a);
      }
    }
  }
  doFade(t, e, i, s) {
    let a = -1,
      o = 1;
    const n = 0.5,
      l = 0.15;
    for (let h = i; h < i + s; ++h) {
      const u = this._partGroups.at(h).partIndex,
        d = this._partGroups.at(h).parameterIndex;
      if (t.getParameterValueByIndex(d) > xr) {
        if (a >= 0) break;
        (a = h),
          (o = t.getPartOpacityByIndex(u)),
          (o += e / this._fadeTimeSeconds),
          o > 1 && (o = 1);
      }
    }
    a < 0 && ((a = 0), (o = 1));
    for (let h = i; h < i + s; ++h) {
      const u = this._partGroups.at(h).partIndex;
      if (a == h) t.setPartOpacityByIndex(u, o);
      else {
        let d = t.getPartOpacityByIndex(u),
          _;
        o < n ? (_ = (o * (n - 1)) / n + 1) : (_ = ((1 - o) * n) / (1 - n)),
          (1 - _) * (1 - o) > l && (_ = 1 - l / (1 - o)),
          d > _ && (d = _),
          t.setPartOpacityByIndex(u, d);
      }
    }
  }
  constructor() {
    (this._fadeTimeSeconds = pe),
      (this._lastModel = null),
      (this._partGroups = new x()),
      (this._partGroupCounts = new x());
  }
}
class Gt {
  constructor(t) {
    if (
      ((this.parameterIndex = 0),
        (this.partIndex = 0),
        (this.link = new x()),
        t != null)
    ) {
      this.partId = t.partId;
      for (
        const e = t.link.begin();
        e.notEqual(t.link.end());
        e.preIncrement()
      ) {
        this.link.pushBack(e.ptr().clone());
      }
    }
  }
  assignment(t) {
    this.partId = t.partId;
    for (const e = t.link.begin(); e.notEqual(t.link.end()); e.preIncrement()) {
      this.link.pushBack(e.ptr().clone());
    }
    return this;
  }
  initialize(t) {
    (this.parameterIndex = t.getParameterIndex(this.partId)),
      (this.partIndex = t.getPartIndex(this.partId)),
      t.setParameterValueByIndex(this.parameterIndex, 1);
  }
  clone() {
    const t = new Gt();
    (t.partId = this.partId),
      (t.parameterIndex = this.parameterIndex),
      (t.partIndex = this.partIndex),
      (t.link = new x());
    for (
      let e = this.link.begin();
      e.notEqual(this.link.end());
      e.increment()
    ) {
      t.link.pushBack(e.ptr().clone());
    }
    return t;
  }
}
var _i;
((r) => {
  (r.CubismPose = jt), (r.PartData = Gt);
})(_i || (_i = {}));
class ms extends A {
  constructor(t, e) {
    super(),
      (this._width = t !== void 0 ? t : 0),
      (this._height = e !== void 0 ? e : 0),
      this.setHeight(2);
  }
  setWidth(t) {
    const e = t / this._width,
      i = e;
    this.scale(e, i);
  }
  setHeight(t) {
    const e = t / this._height,
      i = e;
    this.scale(e, i);
  }
  setPosition(t, e) {
    this.translate(t, e);
  }
  setCenterPosition(t, e) {
    this.centerX(t), this.centerY(e);
  }
  top(t) {
    this.setY(t);
  }
  bottom(t) {
    const e = this._height * this.getScaleY();
    this.translateY(t - e);
  }
  left(t) {
    this.setX(t);
  }
  right(t) {
    const e = this._width * this.getScaleX();
    this.translateX(t - e);
  }
  centerX(t) {
    const e = this._width * this.getScaleX();
    this.translateX(t - e / 2);
  }
  setX(t) {
    this.translateX(t);
  }
  centerY(t) {
    const e = this._height * this.getScaleY();
    this.translateY(t - e / 2);
  }
  setY(t) {
    this.translateY(t);
  }
  setupFromLayout(t) {
    const e = "width",
      i = "height",
      s = "x",
      a = "y",
      o = "center_x",
      n = "center_y",
      l = "top",
      h = "bottom",
      u = "left",
      d = "right";
    for (const _ = t.begin(); _.notEqual(t.end()); _.preIncrement()) {
      const g = _.ptr().first,
        c = _.ptr().second;
      g == e ? this.setWidth(c) : g == i && this.setHeight(c);
    }
    for (const _ = t.begin(); _.notEqual(t.end()); _.preIncrement()) {
      const g = _.ptr().first,
        c = _.ptr().second;
      g == s
        ? this.setX(c)
        : g == a
        ? this.setY(c)
        : g == o
        ? this.centerX(c)
        : g == n
        ? this.centerY(c)
        : g == l
        ? this.top(c)
        : g == h
        ? this.bottom(c)
        : g == u
        ? this.left(c)
        : g == d && this.right(c);
    }
  }
}
var mi;
((r) => {
  r.CubismModelMatrix = ms;
})(mi || (mi = {}));
class M {
  constructor(t, e) {
    (this.x = t), (this.y = e), (this.x = t ?? 0), (this.y = e ?? 0);
  }
  add(t) {
    const e = new M(0, 0);
    return (e.x = this.x + t.x), (e.y = this.y + t.y), e;
  }
  substract(t) {
    const e = new M(0, 0);
    return (e.x = this.x - t.x), (e.y = this.y - t.y), e;
  }
  multiply(t) {
    const e = new M(0, 0);
    return (e.x = this.x * t.x), (e.y = this.y * t.y), e;
  }
  multiplyByScaler(t) {
    return this.multiply(new M(t, t));
  }
  division(t) {
    const e = new M(0, 0);
    return (e.x = this.x / t.x), (e.y = this.y / t.y), e;
  }
  divisionByScalar(t) {
    return this.division(new M(t, t));
  }
  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  getDistanceWith(t) {
    return Math.sqrt(
      (this.x - t.x) * (this.x - t.x) + (this.y - t.y) * (this.y - t.y),
    );
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  normalize() {
    const t = Math.pow(this.x * this.x + this.y * this.y, 0.5);
    (this.x = this.x / t), (this.y = this.y / t);
  }
  isEqual(t) {
    return this.x == t.x && this.y == t.y;
  }
  isNotEqual(t) {
    return !this.isEqual(t);
  }
}
var pi;
((r) => {
  r.CubismVector2 = M;
})(pi || (pi = {}));
const bt = class bt {
  static range(t, e, i) {
    return t < e ? (t = e) : t > i && (t = i), t;
  }
  static sin(t) {
    return Math.sin(t);
  }
  static cos(t) {
    return Math.cos(t);
  }
  static abs(t) {
    return Math.abs(t);
  }
  static sqrt(t) {
    return Math.sqrt(t);
  }
  static cbrt(t) {
    if (t === 0) return t;
    let e = t;
    const i = e < 0;
    i && (e = -e);
    let s;
    return (
      e === 1 / 0
        ? (s = 1 / 0)
        : ((s = Math.exp(Math.log(e) / 3)), (s = (e / (s * s) + 2 * s) / 3)),
        i ? -s : s
    );
  }
  static getEasingSine(t) {
    return t < 0 ? 0 : t > 1 ? 1 : 0.5 - 0.5 * this.cos(t * Math.PI);
  }
  static max(t, e) {
    return t > e ? t : e;
  }
  static min(t, e) {
    return t > e ? e : t;
  }
  static degreesToRadian(t) {
    return (t / 180) * Math.PI;
  }
  static radianToDegrees(t) {
    return (t * 180) / Math.PI;
  }
  static directionToRadian(t, e) {
    const i = Math.atan2(e.y, e.x),
      s = Math.atan2(t.y, t.x);
    let a = i - s;
    for (; a < -Math.PI;) a += Math.PI * 2;
    for (; a > Math.PI;) a -= Math.PI * 2;
    return a;
  }
  static directionToDegrees(t, e) {
    const i = this.directionToRadian(t, e);
    let s = this.radianToDegrees(i);
    return e.x - t.x > 0 && (s = -s), s;
  }
  static radianToDirection(t) {
    const e = new M();
    return (e.x = this.sin(t)), (e.y = this.cos(t)), e;
  }
  static quadraticEquation(t, e, i) {
    return this.abs(t) < bt.Epsilon
      ? this.abs(e) < bt.Epsilon ? -i : -i / e
      : -(e + this.sqrt(e * e - 4 * t * i)) / (2 * t);
  }
  static cardanoAlgorithmForBezier(t, e, i, s) {
    if (this.sqrt(t) < bt.Epsilon) {
      return this.range(this.quadraticEquation(e, i, s), 0, 1);
    }
    const a = e / t,
      o = i / t,
      n = s / t,
      l = (3 * o - a * a) / 3,
      h = l / 3,
      u = (2 * a * a * a - 9 * a * o + 27 * n) / 27,
      d = u / 2,
      _ = d * d + h * h * h,
      g = 0.5,
      c = g + 0.01;
    if (_ < 0) {
      const B = -l / 3,
        v = B * B * B,
        I = this.sqrt(v),
        b = -u / (2 * I),
        D = this.range(b, -1, 1),
        J = Math.acos(D),
        ft = 2 * this.cbrt(I),
        yt = ft * this.cos(J / 3) - a / 3;
      if (this.abs(yt - g) < c) return this.range(yt, 0, 1);
      const Et = ft * this.cos((J + 2 * Math.PI) / 3) - a / 3;
      if (this.abs(Et - g) < c) return this.range(Et, 0, 1);
      const Ys = ft * this.cos((J + 4 * Math.PI) / 3) - a / 3;
      return this.range(Ys, 0, 1);
    }
    if (_ == 0) {
      let B;
      d < 0 ? (B = this.cbrt(-d)) : (B = -this.cbrt(d));
      const v = 2 * B - a / 3;
      if (this.abs(v - g) < c) return this.range(v, 0, 1);
      const I = -B - a / 3;
      return this.range(I, 0, 1);
    }
    const f = this.sqrt(_),
      p = this.cbrt(f - d),
      S = this.cbrt(f + d),
      y = p - S - a / 3;
    return this.range(y, 0, 1);
  }
  static mod(t, e) {
    if (!isFinite(t) || e === 0 || isNaN(t) || isNaN(e)) {
      return (
        console.warn(`divided: ${t}, divisor: ${e} mod() returns 'NaN'.`), NaN
      );
    }
    const i = Math.abs(t),
      s = Math.abs(e);
    let a = i - Math.floor(i / s) * s;
    return (a *= Math.sign(t)), a;
  }
  constructor() {}
};
bt.Epsilon = 1e-5;
let P = bt;
var fi;
((r) => {
  r.CubismMath = P;
})(fi || (fi = {}));
const fe = 30,
  yi = 0.01;
class ps {
  constructor() {
    (this._faceTargetX = 0),
      (this._faceTargetY = 0),
      (this._faceX = 0),
      (this._faceY = 0),
      (this._faceVX = 0),
      (this._faceVY = 0),
      (this._lastTimeSeconds = 0),
      (this._userTimeSeconds = 0);
  }
  update(t) {
    this._userTimeSeconds += t;
    const i = ((40 / 10) * 1) / fe;
    if (this._lastTimeSeconds == 0) {
      this._lastTimeSeconds = this._userTimeSeconds;
      return;
    }
    const s = (this._userTimeSeconds - this._lastTimeSeconds) * fe;
    this._lastTimeSeconds = this._userTimeSeconds;
    const o = 0.15 * fe,
      n = (s * i) / o,
      l = this._faceTargetX - this._faceX,
      h = this._faceTargetY - this._faceY;
    if (P.abs(l) <= yi && P.abs(h) <= yi) return;
    const u = P.sqrt(l * l + h * h),
      d = (i * l) / u,
      _ = (i * h) / u;
    let g = d - this._faceVX,
      c = _ - this._faceVY;
    const f = P.sqrt(g * g + c * c);
    (f < -n || f > n) && ((g *= n / f), (c *= n / f)),
      (this._faceVX += g),
      (this._faceVY += c);
    {
      const p = 0.5 * (P.sqrt(n * n + 16 * n * u - 8 * n * u) - n),
        S = P.sqrt(this._faceVX * this._faceVX + this._faceVY * this._faceVY);
      S > p && ((this._faceVX *= p / S), (this._faceVY *= p / S));
    }
    (this._faceX += this._faceVX), (this._faceY += this._faceVY);
  }
  getX() {
    return this._faceX;
  }
  getY() {
    return this._faceY;
  }
  set(t, e) {
    (this._faceTargetX = t), (this._faceTargetY = e);
  }
}
var Si;
((r) => {
  r.CubismTargetPoint = ps;
})(Si || (Si = {}));
class Ft {
  constructor() {
    (this.setFinishedMotionHandler = (t) => (this._onFinishedMotion = t)),
      (this.getFinishedMotionHandler = () => this._onFinishedMotion),
      (this._fadeInSeconds = -1),
      (this._fadeOutSeconds = -1),
      (this._weight = 1),
      (this._offsetSeconds = 0),
      (this._firedEventValues = new x());
  }
  static delete(t) {
    t.release(), (t = null);
  }
  release() {
    this._weight = 0;
  }
  updateParameters(t, e, i) {
    if (!e.isAvailable() || e.isFinished()) return;
    this.setupMotionQueueEntry(e, i);
    const s = this.updateFadeWeight(e, i);
    this.doUpdateParameters(t, i, s, e),
      e.getEndTime() > 0 && e.getEndTime() < i && e.setIsFinished(!0);
  }
  setupMotionQueueEntry(t, e) {
    if (t == null || t.isStarted() || !t.isAvailable()) return;
    t.setIsStarted(!0),
      t.setStartTime(e - this._offsetSeconds),
      t.setFadeInStartTime(e);
    const i = this.getDuration();
    t.getEndTime() < 0 && t.setEndTime(i <= 0 ? -1 : t.getStartTime() + i);
  }
  updateFadeWeight(t, e) {
    t == null && Fe.print(ct.LogLevel_Error, "motionQueueEntry is null.");
    let i = this._weight;
    const s = this._fadeInSeconds == 0
        ? 1
        : P.getEasingSine((e - t.getFadeInStartTime()) / this._fadeInSeconds),
      a = this._fadeOutSeconds == 0 || t.getEndTime() < 0
        ? 1
        : P.getEasingSine((t.getEndTime() - e) / this._fadeOutSeconds);
    return (i = i * s * a), t.setState(e, i), W(0 <= i && i <= 1), i;
  }
  setFadeInTime(t) {
    this._fadeInSeconds = t;
  }
  setFadeOutTime(t) {
    this._fadeOutSeconds = t;
  }
  getFadeOutTime() {
    return this._fadeOutSeconds;
  }
  getFadeInTime() {
    return this._fadeInSeconds;
  }
  setWeight(t) {
    this._weight = t;
  }
  getWeight() {
    return this._weight;
  }
  getDuration() {
    return -1;
  }
  getLoopDuration() {
    return -1;
  }
  setOffsetTime(t) {
    this._offsetSeconds = t;
  }
  getFiredEvent(t, e) {
    return this._firedEventValues;
  }
  isExistModelOpacity() {
    return !1;
  }
  getModelOpacityIndex() {
    return -1;
  }
  getModelOpacityId(t) {
    return null;
  }
  getModelOpacityValue() {
    return 1;
  }
}
var xi;
((r) => {
  r.ACubismMotion = Ft;
})(xi || (xi = {}));
const Pr = "FadeInTime",
  Br = "FadeOutTime",
  Ci = "Parameters",
  vr = "Id",
  br = "Value",
  Zt = "Blend",
  Ir = "Add",
  Vr = "Multiply",
  wr = "Overwrite",
  Mi = 1,
  U = class U extends Ft {
    static create(t, e) {
      const i = new U();
      return i.parse(t, e), i;
    }
    doUpdateParameters(t, e, i, s) {
      for (let a = 0; a < this._parameters.getSize(); ++a) {
        const o = this._parameters.at(a);
        switch (o.blendType) {
          case 0: {
            t.addParameterValueById(o.parameterId, o.value, i);
            break;
          }
          case 1: {
            t.multiplyParameterValueById(o.parameterId, o.value, i);
            break;
          }
          case 2: {
            t.setParameterValueById(o.parameterId, o.value, i);
            break;
          }
        }
      }
    }
    calculateExpressionParameters(t, e, i, s, a, o) {
      if (!(i == null || s == null) && i.isAvailable()) {
        this._fadeWeight = this.updateFadeWeight(i, e);
        for (let n = 0; n < s.getSize(); ++n) {
          const l = s.at(n);
          if (l.parameterId == null) continue;
          const h = (l.overwriteValue = t.getParameterValueById(l.parameterId)),
            u = this.getExpressionParameters();
          let d = -1;
          for (let p = 0; p < u.getSize(); ++p) {
            if (l.parameterId == u.at(p).parameterId) {
              d = p;
              break;
            }
          }
          if (d < 0) {
            a == 0
              ? ((l.additiveValue = U.DefaultAdditiveValue),
                (l.multiplyValue = U.DefaultMultiplyValue),
                (l.overwriteValue = h))
              : ((l.additiveValue = this.calculateValue(
                l.additiveValue,
                U.DefaultAdditiveValue,
                o,
              )),
                (l.multiplyValue = this.calculateValue(
                  l.multiplyValue,
                  U.DefaultMultiplyValue,
                  o,
                )),
                (l.overwriteValue = this.calculateValue(
                  l.overwriteValue,
                  h,
                  o,
                )));
            continue;
          }
          const _ = u.at(d).value;
          let g, c, f;
          switch (u.at(d).blendType) {
            case 0:
              (g = _), (c = U.DefaultMultiplyValue), (f = h);
              break;
            case 1:
              (g = U.DefaultAdditiveValue), (c = _), (f = h);
              break;
            case 2:
              (g = U.DefaultAdditiveValue),
                (c = U.DefaultMultiplyValue),
                (f = _);
              break;
            default:
              return;
          }
          a == 0
            ? ((l.additiveValue = g),
              (l.multiplyValue = c),
              (l.overwriteValue = f))
            : ((l.additiveValue = l.additiveValue * (1 - o) + g * o),
              (l.multiplyValue = l.multiplyValue * (1 - o) + c * o),
              (l.overwriteValue = l.overwriteValue * (1 - o) + f * o));
        }
      }
    }
    getExpressionParameters() {
      return this._parameters;
    }
    getFadeWeight() {
      return this._fadeWeight;
    }
    parse(t, e) {
      const i = L.create(t, e);
      if (!i) return;
      const s = i.getRoot();
      this.setFadeInTime(s.getValueByString(Pr).toFloat(Mi)),
        this.setFadeOutTime(s.getValueByString(Br).toFloat(Mi));
      const a = s.getValueByString(Ci).getSize();
      this._parameters.prepareCapacity(a);
      for (let o = 0; o < a; ++o) {
        const n = s.getValueByString(Ci).getValueByIndex(o),
          l = V.getIdManager().getId(n.getValueByString(vr).getRawString()),
          h = n.getValueByString(br).toFloat();
        let u;
        n.getValueByString(Zt).isNull() ||
          n.getValueByString(Zt).getString() == Ir
          ? (u = 0)
          : n.getValueByString(Zt).getString() == Vr
          ? (u = 1)
          : n.getValueByString(Zt).getString() == wr
          ? (u = 2)
          : (u = 0);
        const d = new ys();
        (d.parameterId = l),
          (d.blendType = u),
          (d.value = h),
          this._parameters.pushBack(d);
      }
      L.delete(i);
    }
    calculateValue(t, e, i) {
      return t * (1 - i) + e * i;
    }
    constructor() {
      super(), (this._parameters = new x()), (this._fadeWeight = 0);
    }
  };
(U.DefaultAdditiveValue = 0), (U.DefaultMultiplyValue = 1);
let nt = U;
var fs = ((r) => (
  (r[r.Additive = 0] = "Additive"),
    (r[r.Multiply = 1] = "Multiply"),
    (r[r.Overwrite = 2] = "Overwrite"),
    r
))(fs || {});
class ys {}
var Pi;
((r) => {
  (r.CubismExpressionMotion = nt),
    (r.ExpressionBlendType = fs),
    (r.ExpressionParameter = ys);
})(Pi || (Pi = {}));
class Ss {
  constructor() {
    (this._autoDelete = !1),
      (this._motion = null),
      (this._available = !0),
      (this._finished = !1),
      (this._started = !1),
      (this._startTimeSeconds = -1),
      (this._fadeInStartTimeSeconds = 0),
      (this._endTimeSeconds = -1),
      (this._stateTimeSeconds = 0),
      (this._stateWeight = 0),
      (this._lastEventCheckSeconds = 0),
      (this._motionQueueEntryHandle = this),
      (this._fadeOutSeconds = 0),
      (this._isTriggeredFadeOut = !1);
  }
  release() {
    this._autoDelete && this._motion && Ft.delete(this._motion);
  }
  setFadeOut(t) {
    (this._fadeOutSeconds = t), (this._isTriggeredFadeOut = !0);
  }
  startFadeOut(t, e) {
    const i = e + t;
    (this._isTriggeredFadeOut = !0),
      (this._endTimeSeconds < 0 || i < this._endTimeSeconds) &&
      (this._endTimeSeconds = i);
  }
  isFinished() {
    return this._finished;
  }
  isStarted() {
    return this._started;
  }
  getStartTime() {
    return this._startTimeSeconds;
  }
  getFadeInStartTime() {
    return this._fadeInStartTimeSeconds;
  }
  getEndTime() {
    return this._endTimeSeconds;
  }
  setStartTime(t) {
    this._startTimeSeconds = t;
  }
  setFadeInStartTime(t) {
    this._fadeInStartTimeSeconds = t;
  }
  setEndTime(t) {
    this._endTimeSeconds = t;
  }
  setIsFinished(t) {
    this._finished = t;
  }
  setIsStarted(t) {
    this._started = t;
  }
  isAvailable() {
    return this._available;
  }
  setIsAvailable(t) {
    this._available = t;
  }
  setState(t, e) {
    (this._stateTimeSeconds = t), (this._stateWeight = e);
  }
  getStateTime() {
    return this._stateTimeSeconds;
  }
  getStateWeight() {
    return this._stateWeight;
  }
  getLastCheckEventSeconds() {
    return this._lastEventCheckSeconds;
  }
  setLastCheckEventSeconds(t) {
    this._lastEventCheckSeconds = t;
  }
  isTriggeredFadeOut() {
    return this._isTriggeredFadeOut;
  }
  getFadeOutSeconds() {
    return this._fadeOutSeconds;
  }
  getCubismMotion() {
    return this._motion;
  }
}
var Bi;
((r) => {
  r.CubismMotionQueueEntry = Ss;
})(Bi || (Bi = {}));
class De {
  constructor() {
    (this._userTimeSeconds = 0),
      (this._eventCallBack = null),
      (this._eventCustomData = null),
      (this._motions = new x());
  }
  release() {
    for (let t = 0; t < this._motions.getSize(); ++t) {
      this._motions.at(t) &&
        (this._motions.at(t).release(), this._motions.set(t, null));
    }
    this._motions = null;
  }
  startMotion(t, e, i) {
    if (t == null) return le;
    let s = null;
    for (let a = 0; a < this._motions.getSize(); ++a) {
      (s = this._motions.at(a)),
        s != null && s.setFadeOut(s._motion.getFadeOutTime());
    }
    return (
      (s = new Ss()),
        (s._autoDelete = e),
        (s._motion = t),
        this._motions.pushBack(s),
        s._motionQueueEntryHandle
    );
  }
  isFinished() {
    for (let t = this._motions.begin(); t.notEqual(this._motions.end());) {
      let e = t.ptr();
      if (e == null) {
        t = this._motions.erase(t);
        continue;
      }
      if (e._motion == null) {
        e.release(), (e = null), (t = this._motions.erase(t));
        continue;
      }
      if (e.isFinished()) t.preIncrement();
      else return !1;
    }
    return !0;
  }
  isFinishedByHandle(t) {
    for (
      let e = this._motions.begin();
      e.notEqual(this._motions.end());
      e.increment()
    ) {
      const i = e.ptr();
      if (i != null && i._motionQueueEntryHandle == t && !i.isFinished()) {
        return !1;
      }
    }
    return !0;
  }
  stopAllMotions() {
    for (let t = this._motions.begin(); t.notEqual(this._motions.end());) {
      let e = t.ptr();
      if (e == null) {
        t = this._motions.erase(t);
        continue;
      }
      e.release(), (e = null), (t = this._motions.erase(t));
    }
  }
  getCubismMotionQueueEntries() {
    return this._motions;
  }
  getCubismMotionQueueEntry(t) {
    for (
      let e = this._motions.begin();
      e.notEqual(this._motions.end());
      e.preIncrement()
    ) {
      const i = e.ptr();
      if (i != null && i._motionQueueEntryHandle == t) return i;
    }
    return null;
  }
  setEventCallback(t, e = null) {
    (this._eventCallBack = t), (this._eventCustomData = e);
  }
  doUpdateMotion(t, e) {
    let i = !1;
    for (let s = this._motions.begin(); s.notEqual(this._motions.end());) {
      let a = s.ptr();
      if (a == null) {
        s = this._motions.erase(s);
        continue;
      }
      const o = a._motion;
      if (o == null) {
        a.release(), (a = null), (s = this._motions.erase(s));
        continue;
      }
      o.updateParameters(t, a, e), (i = !0);
      const n = o.getFiredEvent(
        a.getLastCheckEventSeconds() - a.getStartTime(),
        e - a.getStartTime(),
      );
      for (let l = 0; l < n.getSize(); ++l) {
        this._eventCallBack(this, n.at(l), this._eventCustomData);
      }
      a.setLastCheckEventSeconds(e),
        a.isFinished()
          ? (a.release(), (a = null), (s = this._motions.erase(s)))
          : (a.isTriggeredFadeOut() && a.startFadeOut(a.getFadeOutSeconds(), e),
            s.preIncrement());
    }
    return i;
  }
}
const le = -1;
var vi;
((r) => {
  (r.CubismMotionQueueManager = De),
    (r.InvalidMotionQueueEntryHandleValue = le);
})(vi || (vi = {}));
class Rr {}
class xs extends De {
  constructor() {
    super(),
      (this._currentPriority = 0),
      (this._reservePriority = 0),
      (this._expressionParameterValues = new x()),
      (this._fadeWeights = new x());
  }
  release() {
    this._expressionParameterValues &&
    (Ot(this._expressionParameterValues),
      (this._expressionParameterValues = null)),
      this._fadeWeights && (Ot(this._fadeWeights), (this._fadeWeights = null));
  }
  getCurrentPriority() {
    return this._currentPriority;
  }
  getReservePriority() {
    return this._reservePriority;
  }
  getFadeWeight(t) {
    return this._fadeWeights.at(t);
  }
  setReservePriority(t) {
    this._reservePriority = t;
  }
  startMotionPriority(t, e, i) {
    return (
      i == this.getReservePriority() && this.setReservePriority(0),
        (this._currentPriority = i),
        this._fadeWeights.pushBack(0),
        this.startMotion(t, e)
    );
  }
  updateMotion(t, e) {
    this._userTimeSeconds += e;
    let i = !1;
    const s = this.getCubismMotionQueueEntries();
    let a = 0,
      o = 0;
    for (let n = this._motions.begin(); n.notEqual(this._motions.end());) {
      const l = n.ptr();
      if (l == null) {
        n = s.erase(n);
        continue;
      }
      const h = l.getCubismMotion();
      if (h == null) {
        Ot(l), (n = s.erase(n));
        continue;
      }
      const u = h.getExpressionParameters();
      if (l.isAvailable()) {
        for (let d = 0; d < u.getSize(); ++d) {
          if (u.at(d).parameterId == null) continue;
          let _ = -1;
          for (let c = 0; c < this._expressionParameterValues.getSize(); ++c) {
            if (
              this._expressionParameterValues.at(c).parameterId ==
                u.at(d).parameterId
            ) {
              _ = c;
              break;
            }
          }
          if (_ >= 0) continue;
          const g = new Rr();
          (g.parameterId = u.at(d).parameterId),
            (g.additiveValue = nt.DefaultAdditiveValue),
            (g.multiplyValue = nt.DefaultMultiplyValue),
            (g.overwriteValue = t.getParameterValueById(g.parameterId)),
            this._expressionParameterValues.pushBack(g);
        }
      }
      h.setupMotionQueueEntry(l, this._userTimeSeconds),
        this._fadeWeights.set(o, h.updateFadeWeight(l, this._userTimeSeconds)),
        h.calculateExpressionParameters(
          t,
          this._userTimeSeconds,
          l,
          this._expressionParameterValues,
          o,
          this._fadeWeights.at(o),
        ),
        (a += h.getFadeInTime() == 0 ? 1 : P.getEasingSine(
          (this._userTimeSeconds - l.getFadeInStartTime()) /
            h.getFadeInTime(),
        )),
        (i = !0),
        l.isTriggeredFadeOut() &&
        l.startFadeOut(l.getFadeOutSeconds(), this._userTimeSeconds),
        n.preIncrement(),
        ++o;
    }
    if (
      s.getSize() > 1 &&
      (s.at(s.getSize() - 1).getCubismMotion(),
        this._fadeWeights.at(this._fadeWeights.getSize() - 1) >= 1)
    ) {
      for (let l = s.getSize() - 2; l >= 0; --l) {
        const h = s.at(l);
        Ot(h), s.remove(l), this._fadeWeights.remove(l);
      }
    }
    a > 1 && (a = 1);
    for (let n = 0; n < this._expressionParameterValues.getSize(); ++n) {
      const l = this._expressionParameterValues.at(n);
      t.setParameterValueById(
        l.parameterId,
        (l.overwriteValue + l.additiveValue) * l.multiplyValue,
        a,
      ),
        (l.additiveValue = nt.DefaultAdditiveValue),
        (l.multiplyValue = nt.DefaultMultiplyValue);
    }
    return i;
  }
}
var bi;
((r) => {
  r.CubismExpressionMotionManager = xs;
})(bi || (bi = {}));
var G = ((r) => (
    (r[r.CubismMotionCurveTarget_Model = 0] = "CubismMotionCurveTarget_Model"),
      (r[r.CubismMotionCurveTarget_Parameter = 1] =
        "CubismMotionCurveTarget_Parameter"),
      (r[r.CubismMotionCurveTarget_PartOpacity = 2] =
        "CubismMotionCurveTarget_PartOpacity"),
      r
  ))(G || {}),
  H = ((r) => (
    (r[r.CubismMotionSegmentType_Linear = 0] =
      "CubismMotionSegmentType_Linear"),
      (r[r.CubismMotionSegmentType_Bezier = 1] =
        "CubismMotionSegmentType_Bezier"),
      (r[r.CubismMotionSegmentType_Stepped = 2] =
        "CubismMotionSegmentType_Stepped"),
      (r[r.CubismMotionSegmentType_InverseStepped = 3] =
        "CubismMotionSegmentType_InverseStepped"),
      r
  ))(H || {});
class Le {
  constructor() {
    (this.time = 0), (this.value = 0);
  }
}
class Cs {
  constructor() {
    (this.evaluate = null), (this.basePointIndex = 0), (this.segmentType = 0);
  }
}
class Ms {
  constructor() {
    (this.type = 0),
      (this.segmentCount = 0),
      (this.baseSegmentIndex = 0),
      (this.fadeInTime = 0),
      (this.fadeOutTime = 0);
  }
}
class Ps {
  constructor() {
    this.fireTime = 0;
  }
}
class Bs {
  constructor() {
    (this.duration = 0),
      (this.loop = !1),
      (this.curveCount = 0),
      (this.eventCount = 0),
      (this.fps = 0),
      (this.curves = new x()),
      (this.segments = new x()),
      (this.points = new x()),
      (this.events = new x());
  }
}
var Ii;
((r) => {
  (r.CubismMotionCurve = Ms),
    (r.CubismMotionCurveTarget = G),
    (r.CubismMotionData = Bs),
    (r.CubismMotionEvent = Ps),
    (r.CubismMotionPoint = Le),
    (r.CubismMotionSegment = Cs),
    (r.CubismMotionSegmentType = H);
})(Ii || (Ii = {}));
const N = "Meta",
  Tr = "Duration",
  Fr = "Loop",
  Er = "AreBeziersRestricted",
  Ar = "CurveCount",
  Dr = "Fps",
  Lr = "TotalSegmentCount",
  Or = "TotalPointCount",
  it = "Curves",
  kr = "Target",
  Nr = "Id",
  Qt = "FadeInTime",
  te = "FadeOutTime",
  Vi = "Segments",
  wi = "UserData",
  Ur = "UserDataCount",
  zr = "TotalUserDataSize",
  Xr = "Time",
  Yr = "Value";
class vs {
  constructor(t, e) {
    this._json = L.create(t, e);
  }
  release() {
    L.delete(this._json);
  }
  getMotionDuration() {
    return this._json
      .getRoot()
      .getValueByString(N)
      .getValueByString(Tr)
      .toFloat();
  }
  isMotionLoop() {
    return this._json
      .getRoot()
      .getValueByString(N)
      .getValueByString(Fr)
      .toBoolean();
  }
  getEvaluationOptionFlag(t) {
    return t == 0
      ? this._json
        .getRoot()
        .getValueByString(N)
        .getValueByString(Er)
        .toBoolean()
      : !1;
  }
  getMotionCurveCount() {
    return this._json
      .getRoot()
      .getValueByString(N)
      .getValueByString(Ar)
      .toInt();
  }
  getMotionFps() {
    return this._json
      .getRoot()
      .getValueByString(N)
      .getValueByString(Dr)
      .toFloat();
  }
  getMotionTotalSegmentCount() {
    return this._json
      .getRoot()
      .getValueByString(N)
      .getValueByString(Lr)
      .toInt();
  }
  getMotionTotalPointCount() {
    return this._json
      .getRoot()
      .getValueByString(N)
      .getValueByString(Or)
      .toInt();
  }
  isExistMotionFadeInTime() {
    return !this._json
      .getRoot()
      .getValueByString(N)
      .getValueByString(Qt)
      .isNull();
  }
  isExistMotionFadeOutTime() {
    return !this._json
      .getRoot()
      .getValueByString(N)
      .getValueByString(te)
      .isNull();
  }
  getMotionFadeInTime() {
    return this._json
      .getRoot()
      .getValueByString(N)
      .getValueByString(Qt)
      .toFloat();
  }
  getMotionFadeOutTime() {
    return this._json
      .getRoot()
      .getValueByString(N)
      .getValueByString(te)
      .toFloat();
  }
  getMotionCurveTarget(t) {
    return this._json
      .getRoot()
      .getValueByString(it)
      .getValueByIndex(t)
      .getValueByString(kr)
      .getRawString();
  }
  getMotionCurveId(t) {
    return V.getIdManager().getId(
      this._json
        .getRoot()
        .getValueByString(it)
        .getValueByIndex(t)
        .getValueByString(Nr)
        .getRawString(),
    );
  }
  isExistMotionCurveFadeInTime(t) {
    return !this._json
      .getRoot()
      .getValueByString(it)
      .getValueByIndex(t)
      .getValueByString(Qt)
      .isNull();
  }
  isExistMotionCurveFadeOutTime(t) {
    return !this._json
      .getRoot()
      .getValueByString(it)
      .getValueByIndex(t)
      .getValueByString(te)
      .isNull();
  }
  getMotionCurveFadeInTime(t) {
    return this._json
      .getRoot()
      .getValueByString(it)
      .getValueByIndex(t)
      .getValueByString(Qt)
      .toFloat();
  }
  getMotionCurveFadeOutTime(t) {
    return this._json
      .getRoot()
      .getValueByString(it)
      .getValueByIndex(t)
      .getValueByString(te)
      .toFloat();
  }
  getMotionCurveSegmentCount(t) {
    return this._json
      .getRoot()
      .getValueByString(it)
      .getValueByIndex(t)
      .getValueByString(Vi)
      .getVector()
      .getSize();
  }
  getMotionCurveSegment(t, e) {
    return this._json
      .getRoot()
      .getValueByString(it)
      .getValueByIndex(t)
      .getValueByString(Vi)
      .getValueByIndex(e)
      .toFloat();
  }
  getEventCount() {
    return this._json
      .getRoot()
      .getValueByString(N)
      .getValueByString(Ur)
      .toInt();
  }
  getTotalEventValueSize() {
    return this._json
      .getRoot()
      .getValueByString(N)
      .getValueByString(zr)
      .toInt();
  }
  getEventTime(t) {
    return this._json
      .getRoot()
      .getValueByString(wi)
      .getValueByIndex(t)
      .getValueByString(Xr)
      .toFloat();
  }
  getEventValue(t) {
    return new Y(
      this._json
        .getRoot()
        .getValueByString(wi)
        .getValueByIndex(t)
        .getValueByString(Yr)
        .getRawString(),
    );
  }
}
var bs = ((r) => (
    (r[r.EvaluationOptionFlag_AreBeziersRistricted = 0] =
      "EvaluationOptionFlag_AreBeziersRistricted"), r
  ))(bs || {}),
  Ri;
((r) => {
  r.CubismMotionJson = vs;
})(Ri || (Ri = {}));
const jr = "EyeBlink",
  Gr = "LipSync",
  Hr = "Model",
  $r = "Parameter",
  Wr = "PartOpacity",
  ee = "Opacity",
  qr = !1;
function X(r, t, e) {
  const i = new Le();
  return (
    (i.time = r.time + (t.time - r.time) * e),
      (i.value = r.value + (t.value - r.value) * e),
      i
  );
}
function Jr(r, t) {
  let e = (t - r[0].time) / (r[1].time - r[0].time);
  return e < 0 && (e = 0), r[0].value + (r[1].value - r[0].value) * e;
}
function Kr(r, t) {
  let e = (t - r[0].time) / (r[3].time - r[0].time);
  e < 0 && (e = 0);
  const i = X(r[0], r[1], e),
    s = X(r[1], r[2], e),
    a = X(r[2], r[3], e),
    o = X(i, s, e),
    n = X(s, a, e);
  return X(o, n, e).value;
}
function Zr(r, t) {
  const e = t,
    i = r[0].time,
    s = r[3].time,
    a = r[1].time,
    o = r[2].time,
    n = s - 3 * o + 3 * a - i,
    l = 3 * o - 6 * a + 3 * i,
    h = 3 * a - 3 * i,
    u = i - e,
    d = P.cardanoAlgorithmForBezier(n, l, h, u),
    _ = X(r[0], r[1], d),
    g = X(r[1], r[2], d),
    c = X(r[2], r[3], d),
    f = X(_, g, d),
    p = X(g, c, d);
  return X(f, p, d).value;
}
function Qr(r, t) {
  return r[0].value;
}
function ta(r, t) {
  return r[1].value;
}
function ye(r, t, e) {
  const i = r.curves.at(t);
  let s = -1;
  const a = i.baseSegmentIndex + i.segmentCount;
  let o = 0;
  for (let l = i.baseSegmentIndex; l < a; ++l) {
    if (
      ((o = r.segments.at(l).basePointIndex +
        (r.segments.at(l).segmentType == H.CubismMotionSegmentType_Bezier
          ? 3
          : 1)),
        r.points.at(o).time > e)
    ) {
      s = l;
      break;
    }
  }
  if (s == -1) return r.points.at(o).value;
  const n = r.segments.at(s);
  return n.evaluate(r.points.get(n.basePointIndex), e);
}
class ce extends Ft {
  static create(t, e, i) {
    const s = new ce();
    return (
      s.parse(t, e),
        (s._sourceFrameRate = s._motionData.fps),
        (s._loopDurationSeconds = s._motionData.duration),
        (s._onFinishedMotion = i),
        s
    );
  }
  doUpdateParameters(t, e, i, s) {
    this._modelCurveIdEyeBlink == null &&
    (this._modelCurveIdEyeBlink = V.getIdManager().getId(jr)),
      this._modelCurveIdLipSync == null &&
      (this._modelCurveIdLipSync = V.getIdManager().getId(Gr)),
      this._modelCurveIdOpacity == null &&
      (this._modelCurveIdOpacity = V.getIdManager().getId(ee));
    let a = e - s.getStartTime();
    a < 0 && (a = 0);
    let o = Number.MAX_VALUE,
      n = Number.MAX_VALUE;
    const l = 64;
    let h = 0,
      u = 0;
    this._eyeBlinkParameterIds.getSize() > l &&
    zt(
      "too many eye blink targets : {0}",
      this._eyeBlinkParameterIds.getSize(),
    ),
      this._lipSyncParameterIds.getSize() > l &&
      zt(
        "too many lip sync targets : {0}",
        this._lipSyncParameterIds.getSize(),
      );
    const d = this._fadeInSeconds <= 0
        ? 1
        : P.getEasingSine((e - s.getFadeInStartTime()) / this._fadeInSeconds),
      _ = this._fadeOutSeconds <= 0 || s.getEndTime() < 0
        ? 1
        : P.getEasingSine((s.getEndTime() - e) / this._fadeOutSeconds);
    let g,
      c,
      f,
      p = a;
    if (this._isLoop) {
      for (; p > this._motionData.duration;) p -= this._motionData.duration;
    }
    const S = this._motionData.curves;
    for (
      c = 0;
      c < this._motionData.curveCount &&
      S.at(c).type == G.CubismMotionCurveTarget_Model;
      ++c
    ) {
      (g = ye(this._motionData, c, p)),
        S.at(c).id == this._modelCurveIdEyeBlink
          ? (n = g)
          : S.at(c).id == this._modelCurveIdLipSync
          ? (o = g)
          : S.at(c).id == this._modelCurveIdOpacity &&
            ((this._modelOpacity = g),
              t.setModelOapcity(this.getModelOpacityValue()));
    }
    for (
      ;
      c < this._motionData.curveCount &&
      S.at(c).type == G.CubismMotionCurveTarget_Parameter;
      ++c
    ) {
      if (((f = t.getParameterIndex(S.at(c).id)), f == -1)) continue;
      const y = t.getParameterValueByIndex(f);
      if (((g = ye(this._motionData, c, p)), n != Number.MAX_VALUE)) {
        for (
          let v = 0;
          v < this._eyeBlinkParameterIds.getSize() && v < l;
          ++v
        ) {
          if (this._eyeBlinkParameterIds.at(v) == S.at(c).id) {
            (g *= n), (u |= 1 << v);
            break;
          }
        }
      }
      if (o != Number.MAX_VALUE) {
        for (let v = 0; v < this._lipSyncParameterIds.getSize() && v < l; ++v) {
          if (this._lipSyncParameterIds.at(v) == S.at(c).id) {
            (g += o), (h |= 1 << v);
            break;
          }
        }
      }
      let B;
      if (S.at(c).fadeInTime < 0 && S.at(c).fadeOutTime < 0) {
        B = y + (g - y) * i;
      } else {
        let v, I;
        S.at(c).fadeInTime < 0
          ? (v = d)
          : (v = S.at(c).fadeInTime == 0 ? 1 : P.getEasingSine(
            (e - s.getFadeInStartTime()) / S.at(c).fadeInTime,
          )),
          S.at(c).fadeOutTime < 0
            ? (I = _)
            : (I = S.at(c).fadeOutTime == 0 || s.getEndTime() < 0
              ? 1
              : P.getEasingSine(
                (s.getEndTime() - e) / S.at(c).fadeOutTime,
              ));
        const b = this._weight * v * I;
        B = y + (g - y) * b;
      }
      t.setParameterValueByIndex(f, B, 1);
    }
    {
      if (n != Number.MAX_VALUE) {
        for (
          let y = 0;
          y < this._eyeBlinkParameterIds.getSize() && y < l;
          ++y
        ) {
          const B = t.getParameterValueById(this._eyeBlinkParameterIds.at(y));
          if ((u >> y) & 1) continue;
          const v = B + (n - B) * i;
          t.setParameterValueById(this._eyeBlinkParameterIds.at(y), v);
        }
      }
      if (o != Number.MAX_VALUE) {
        for (let y = 0; y < this._lipSyncParameterIds.getSize() && y < l; ++y) {
          const B = t.getParameterValueById(this._lipSyncParameterIds.at(y));
          if ((h >> y) & 1) continue;
          const v = B + (o - B) * i;
          t.setParameterValueById(this._lipSyncParameterIds.at(y), v);
        }
      }
    }
    for (
      ;
      c < this._motionData.curveCount &&
      S.at(c).type == G.CubismMotionCurveTarget_PartOpacity;
      ++c
    ) {
      (f = t.getParameterIndex(S.at(c).id)),
        f != -1 &&
        ((g = ye(this._motionData, c, p)), t.setParameterValueByIndex(f, g));
    }
    a >= this._motionData.duration &&
    (this._isLoop
      ? (s.setStartTime(e), this._isLoopFadeIn && s.setFadeInStartTime(e))
      : (this._onFinishedMotion && this._onFinishedMotion(this),
        s.setIsFinished(!0))), (this._lastWeight = i);
  }
  setIsLoop(t) {
    this._isLoop = t;
  }
  isLoop() {
    return this._isLoop;
  }
  setIsLoopFadeIn(t) {
    this._isLoopFadeIn = t;
  }
  isLoopFadeIn() {
    return this._isLoopFadeIn;
  }
  getDuration() {
    return this._isLoop ? -1 : this._loopDurationSeconds;
  }
  getLoopDuration() {
    return this._loopDurationSeconds;
  }
  setParameterFadeInTime(t, e) {
    const i = this._motionData.curves;
    for (let s = 0; s < this._motionData.curveCount; ++s) {
      if (t == i.at(s).id) {
        i.at(s).fadeInTime = e;
        return;
      }
    }
  }
  setParameterFadeOutTime(t, e) {
    const i = this._motionData.curves;
    for (let s = 0; s < this._motionData.curveCount; ++s) {
      if (t == i.at(s).id) {
        i.at(s).fadeOutTime = e;
        return;
      }
    }
  }
  getParameterFadeInTime(t) {
    const e = this._motionData.curves;
    for (let i = 0; i < this._motionData.curveCount; ++i) {
      if (t == e.at(i).id) return e.at(i).fadeInTime;
    }
    return -1;
  }
  getParameterFadeOutTime(t) {
    const e = this._motionData.curves;
    for (let i = 0; i < this._motionData.curveCount; ++i) {
      if (t == e.at(i).id) return e.at(i).fadeOutTime;
    }
    return -1;
  }
  setEffectIds(t, e) {
    (this._eyeBlinkParameterIds = t), (this._lipSyncParameterIds = e);
  }
  constructor() {
    super(),
      (this._sourceFrameRate = 30),
      (this._loopDurationSeconds = -1),
      (this._isLoop = !1),
      (this._isLoopFadeIn = !0),
      (this._lastWeight = 0),
      (this._motionData = null),
      (this._modelCurveIdEyeBlink = null),
      (this._modelCurveIdLipSync = null),
      (this._modelCurveIdOpacity = null),
      (this._eyeBlinkParameterIds = null),
      (this._lipSyncParameterIds = null),
      (this._modelOpacity = 1);
  }
  release() {
    (this._motionData = void 0), (this._motionData = null);
  }
  parse(t, e) {
    this._motionData = new Bs();
    let i = new vs(t, e);
    if (!i) {
      i.release(), (i = void 0);
      return;
    }
    (this._motionData.duration = i.getMotionDuration()),
      (this._motionData.loop = i.isMotionLoop()),
      (this._motionData.curveCount = i.getMotionCurveCount()),
      (this._motionData.fps = i.getMotionFps()),
      (this._motionData.eventCount = i.getEventCount());
    const s = i.getEvaluationOptionFlag(
      bs.EvaluationOptionFlag_AreBeziersRistricted,
    );
    i.isExistMotionFadeInTime()
      ? (this._fadeInSeconds = i.getMotionFadeInTime() < 0
        ? 1
        : i.getMotionFadeInTime())
      : (this._fadeInSeconds = 1),
      i.isExistMotionFadeOutTime()
        ? (this._fadeOutSeconds = i.getMotionFadeOutTime() < 0
          ? 1
          : i.getMotionFadeOutTime())
        : (this._fadeOutSeconds = 1),
      this._motionData.curves.updateSize(this._motionData.curveCount, Ms, !0),
      this._motionData.segments.updateSize(
        i.getMotionTotalSegmentCount(),
        Cs,
        !0,
      ),
      this._motionData.points.updateSize(i.getMotionTotalPointCount(), Le, !0),
      this._motionData.events.updateSize(this._motionData.eventCount, Ps, !0);
    let a = 0,
      o = 0;
    for (let n = 0; n < this._motionData.curveCount; ++n) {
      i.getMotionCurveTarget(n) == Hr
        ? (this._motionData.curves.at(n).type = G.CubismMotionCurveTarget_Model)
        : i.getMotionCurveTarget(n) == $r
        ? (this._motionData.curves.at(n).type =
          G.CubismMotionCurveTarget_Parameter)
        : i.getMotionCurveTarget(n) == Wr
        ? (this._motionData.curves.at(n).type =
          G.CubismMotionCurveTarget_PartOpacity)
        : rt(
          'Warning : Unable to get segment type from Curve! The number of "CurveCount" may be incorrect!',
        ),
        (this._motionData.curves.at(n).id = i.getMotionCurveId(n)),
        (this._motionData.curves.at(n).baseSegmentIndex = o),
        (this._motionData.curves.at(n).fadeInTime =
          i.isExistMotionCurveFadeInTime(n)
            ? i.getMotionCurveFadeInTime(n)
            : -1),
        (this._motionData.curves.at(n).fadeOutTime =
          i.isExistMotionCurveFadeOutTime(n)
            ? i.getMotionCurveFadeOutTime(n)
            : -1);
      for (let l = 0; l < i.getMotionCurveSegmentCount(n);) {
        switch (
          (l == 0
            ? ((this._motionData.segments.at(o).basePointIndex = a),
              (this._motionData.points.at(a).time = i.getMotionCurveSegment(
                n,
                l,
              )),
              (this._motionData.points.at(a).value = i.getMotionCurveSegment(
                n,
                l + 1,
              )),
              (a += 1),
              (l += 2))
            : (this._motionData.segments.at(o).basePointIndex = a - 1),
            i.getMotionCurveSegment(n, l))
        ) {
          case H.CubismMotionSegmentType_Linear: {
            (this._motionData.segments.at(o).segmentType =
              H.CubismMotionSegmentType_Linear),
              (this._motionData.segments.at(o).evaluate = Jr),
              (this._motionData.points.at(a).time = i.getMotionCurveSegment(
                n,
                l + 1,
              )),
              (this._motionData.points.at(a).value = i.getMotionCurveSegment(
                n,
                l + 2,
              )),
              (a += 1),
              (l += 3);
            break;
          }
          case H.CubismMotionSegmentType_Bezier: {
            (this._motionData.segments.at(o).segmentType =
              H.CubismMotionSegmentType_Bezier),
              s || qr
                ? (this._motionData.segments.at(o).evaluate = Kr)
                : (this._motionData.segments.at(o).evaluate = Zr),
              (this._motionData.points.at(a).time = i.getMotionCurveSegment(
                n,
                l + 1,
              )),
              (this._motionData.points.at(a).value = i.getMotionCurveSegment(
                n,
                l + 2,
              )),
              (this._motionData.points.at(a + 1).time = i.getMotionCurveSegment(
                n,
                l + 3,
              )),
              (this._motionData.points.at(a + 1).value = i
                .getMotionCurveSegment(n, l + 4)),
              (this._motionData.points.at(a + 2).time = i.getMotionCurveSegment(
                n,
                l + 5,
              )),
              (this._motionData.points.at(a + 2).value = i
                .getMotionCurveSegment(n, l + 6)),
              (a += 3),
              (l += 7);
            break;
          }
          case H.CubismMotionSegmentType_Stepped: {
            (this._motionData.segments.at(o).segmentType =
              H.CubismMotionSegmentType_Stepped),
              (this._motionData.segments.at(o).evaluate = Qr),
              (this._motionData.points.at(a).time = i.getMotionCurveSegment(
                n,
                l + 1,
              )),
              (this._motionData.points.at(a).value = i.getMotionCurveSegment(
                n,
                l + 2,
              )),
              (a += 1),
              (l += 3);
            break;
          }
          case H.CubismMotionSegmentType_InverseStepped: {
            (this._motionData.segments.at(o).segmentType =
              H.CubismMotionSegmentType_InverseStepped),
              (this._motionData.segments.at(o).evaluate = ta),
              (this._motionData.points.at(a).time = i.getMotionCurveSegment(
                n,
                l + 1,
              )),
              (this._motionData.points.at(a).value = i.getMotionCurveSegment(
                n,
                l + 2,
              )),
              (a += 1),
              (l += 3);
            break;
          }
          default: {
            W(0);
            break;
          }
        }
        ++this._motionData.curves.at(n).segmentCount, ++o;
      }
    }
    for (let n = 0; n < i.getEventCount(); ++n) {
      (this._motionData.events.at(n).fireTime = i.getEventTime(n)),
        (this._motionData.events.at(n).value = i.getEventValue(n));
    }
    i.release(), (i = void 0), (i = null);
  }
  getFiredEvent(t, e) {
    this._firedEventValues.updateSize(0);
    for (let i = 0; i < this._motionData.eventCount; ++i) {
      this._motionData.events.at(i).fireTime > t &&
        this._motionData.events.at(i).fireTime <= e &&
        this._firedEventValues.pushBack(
          new Y(this._motionData.events.at(i).value.s),
        );
    }
    return this._firedEventValues;
  }
  isExistModelOpacity() {
    for (let t = 0; t < this._motionData.curveCount; t++) {
      const e = this._motionData.curves.at(t);
      if (
        e.type == G.CubismMotionCurveTarget_Model &&
        e.id.getString().s.localeCompare(ee) == 0
      ) {
        return !0;
      }
    }
    return !1;
  }
  getModelOpacityIndex() {
    if (this.isExistModelOpacity()) {
      for (let t = 0; t < this._motionData.curveCount; t++) {
        const e = this._motionData.curves.at(t);
        if (
          e.type == G.CubismMotionCurveTarget_Model &&
          e.id.getString().s.localeCompare(ee) == 0
        ) {
          return t;
        }
      }
    }
    return -1;
  }
  getModelOpacityId(t) {
    if (t != -1) {
      const e = this._motionData.curves.at(t);
      if (
        e.type == G.CubismMotionCurveTarget_Model &&
        e.id.getString().s.localeCompare(ee) == 0
      ) {
        return V.getIdManager().getId(e.id.getString().s);
      }
    }
    return null;
  }
  getModelOpacityValue() {
    return this._modelOpacity;
  }
}
var Ti;
((r) => {
  r.CubismMotion = ce;
})(Ti || (Ti = {}));
class Is extends De {
  constructor() {
    super(), (this._currentPriority = 0), (this._reservePriority = 0);
  }
  getCurrentPriority() {
    return this._currentPriority;
  }
  getReservePriority() {
    return this._reservePriority;
  }
  setReservePriority(t) {
    this._reservePriority = t;
  }
  startMotionPriority(t, e, i) {
    return (
      i == this._reservePriority && (this._reservePriority = 0),
        (this._currentPriority = i),
        super.startMotion(t, e)
    );
  }
  updateMotion(t, e) {
    this._userTimeSeconds += e;
    const i = super.doUpdateMotion(t, this._userTimeSeconds);
    return this.isFinished() && (this._currentPriority = 0), i;
  }
  reserveMotion(t) {
    return t <= this._reservePriority || t <= this._currentPriority
      ? !1
      : ((this._reservePriority = t), !0);
  }
}
var Fi;
((r) => {
  r.CubismMotionManager = Is;
})(Fi || (Fi = {}));
var ue = ((r) => (
    (r[r.CubismPhysicsTargetType_Parameter = 0] =
      "CubismPhysicsTargetType_Parameter"), r
  ))(ue || {}),
  st = ((r) => (
    (r[r.CubismPhysicsSource_X = 0] = "CubismPhysicsSource_X"),
      (r[r.CubismPhysicsSource_Y = 1] = "CubismPhysicsSource_Y"),
      (r[r.CubismPhysicsSource_Angle = 2] = "CubismPhysicsSource_Angle"),
      r
  ))(st || {});
class ea {
  constructor() {
    (this.gravity = new M(0, 0)), (this.wind = new M(0, 0));
  }
}
class Oe {}
class Ie {}
class Vs {
  constructor() {
    (this.initialPosition = new M(0, 0)),
      (this.position = new M(0, 0)),
      (this.lastPosition = new M(0, 0)),
      (this.lastGravity = new M(0, 0)),
      (this.force = new M(0, 0)),
      (this.velocity = new M(0, 0));
  }
}
class ws {
  constructor() {
    (this.normalizationPosition = new Ie()),
      (this.normalizationAngle = new Ie());
  }
}
class Rs {
  constructor() {
    this.source = new Oe();
  }
}
class Ts {
  constructor() {
    (this.destination = new Oe()), (this.translationScale = new M(0, 0));
  }
}
class Fs {
  constructor() {
    (this.settings = new x()),
      (this.inputs = new x()),
      (this.outputs = new x()),
      (this.particles = new x()),
      (this.gravity = new M(0, 0)),
      (this.wind = new M(0, 0)),
      (this.fps = 0);
  }
}
var Ei;
((r) => {
  (r.CubismPhysicsInput = Rs),
    (r.CubismPhysicsNormalization = Ie),
    (r.CubismPhysicsOutput = Ts),
    (r.CubismPhysicsParameter = Oe),
    (r.CubismPhysicsParticle = Vs),
    (r.CubismPhysicsRig = Fs),
    (r.CubismPhysicsSource = st),
    (r.CubismPhysicsSubRig = ws),
    (r.CubismPhysicsTargetType = ue),
    (r.PhysicsJsonEffectiveForces = ea);
})(Ei || (Ei = {}));
const Dt = "Position",
  Se = "X",
  xe = "Y",
  Ce = "Angle",
  Ai = "Type",
  Di = "Id",
  Z = "Meta",
  ie = "EffectiveForces",
  ia = "TotalInputCount",
  sa = "TotalOutputCount",
  ra = "PhysicsSettingCount",
  Li = "Gravity",
  Oi = "Wind",
  aa = "VertexCount",
  na = "Fps",
  F = "PhysicsSettings",
  Mt = "Normalization",
  ki = "Minimum",
  Ni = "Maximum",
  Ui = "Default",
  zi = "Reflect",
  Xi = "Weight",
  Lt = "Input",
  oa = "Source",
  lt = "Output",
  la = "Scale",
  ua = "VertexIndex",
  ha = "Destination",
  ut = "Vertices",
  ga = "Mobility",
  ca = "Delay",
  da = "Radius",
  _a = "Acceleration";
class Es {
  constructor(t, e) {
    this._json = L.create(t, e);
  }
  release() {
    L.delete(this._json);
  }
  getGravity() {
    const t = new M(0, 0);
    return (
      (t.x = this._json
        .getRoot()
        .getValueByString(Z)
        .getValueByString(ie)
        .getValueByString(Li)
        .getValueByString(Se)
        .toFloat()),
        (t.y = this._json
          .getRoot()
          .getValueByString(Z)
          .getValueByString(ie)
          .getValueByString(Li)
          .getValueByString(xe)
          .toFloat()),
        t
    );
  }
  getWind() {
    const t = new M(0, 0);
    return (
      (t.x = this._json
        .getRoot()
        .getValueByString(Z)
        .getValueByString(ie)
        .getValueByString(Oi)
        .getValueByString(Se)
        .toFloat()),
        (t.y = this._json
          .getRoot()
          .getValueByString(Z)
          .getValueByString(ie)
          .getValueByString(Oi)
          .getValueByString(xe)
          .toFloat()),
        t
    );
  }
  getFps() {
    return this._json
      .getRoot()
      .getValueByString(Z)
      .getValueByString(na)
      .toFloat(0);
  }
  getSubRigCount() {
    return this._json
      .getRoot()
      .getValueByString(Z)
      .getValueByString(ra)
      .toInt();
  }
  getTotalInputCount() {
    return this._json
      .getRoot()
      .getValueByString(Z)
      .getValueByString(ia)
      .toInt();
  }
  getTotalOutputCount() {
    return this._json
      .getRoot()
      .getValueByString(Z)
      .getValueByString(sa)
      .toInt();
  }
  getVertexCount() {
    return this._json
      .getRoot()
      .getValueByString(Z)
      .getValueByString(aa)
      .toInt();
  }
  getNormalizationPositionMinimumValue(t) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(Mt)
      .getValueByString(Dt)
      .getValueByString(ki)
      .toFloat();
  }
  getNormalizationPositionMaximumValue(t) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(Mt)
      .getValueByString(Dt)
      .getValueByString(Ni)
      .toFloat();
  }
  getNormalizationPositionDefaultValue(t) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(Mt)
      .getValueByString(Dt)
      .getValueByString(Ui)
      .toFloat();
  }
  getNormalizationAngleMinimumValue(t) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(Mt)
      .getValueByString(Ce)
      .getValueByString(ki)
      .toFloat();
  }
  getNormalizationAngleMaximumValue(t) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(Mt)
      .getValueByString(Ce)
      .getValueByString(Ni)
      .toFloat();
  }
  getNormalizationAngleDefaultValue(t) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(Mt)
      .getValueByString(Ce)
      .getValueByString(Ui)
      .toFloat();
  }
  getInputCount(t) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(Lt)
      .getVector()
      .getSize();
  }
  getInputWeight(t, e) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(Lt)
      .getValueByIndex(e)
      .getValueByString(Xi)
      .toFloat();
  }
  getInputReflect(t, e) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(Lt)
      .getValueByIndex(e)
      .getValueByString(zi)
      .toBoolean();
  }
  getInputType(t, e) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(Lt)
      .getValueByIndex(e)
      .getValueByString(Ai)
      .getRawString();
  }
  getInputSourceId(t, e) {
    return V.getIdManager().getId(
      this._json
        .getRoot()
        .getValueByString(F)
        .getValueByIndex(t)
        .getValueByString(Lt)
        .getValueByIndex(e)
        .getValueByString(oa)
        .getValueByString(Di)
        .getRawString(),
    );
  }
  getOutputCount(t) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(lt)
      .getVector()
      .getSize();
  }
  getOutputVertexIndex(t, e) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(lt)
      .getValueByIndex(e)
      .getValueByString(ua)
      .toInt();
  }
  getOutputAngleScale(t, e) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(lt)
      .getValueByIndex(e)
      .getValueByString(la)
      .toFloat();
  }
  getOutputWeight(t, e) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(lt)
      .getValueByIndex(e)
      .getValueByString(Xi)
      .toFloat();
  }
  getOutputDestinationId(t, e) {
    return V.getIdManager().getId(
      this._json
        .getRoot()
        .getValueByString(F)
        .getValueByIndex(t)
        .getValueByString(lt)
        .getValueByIndex(e)
        .getValueByString(ha)
        .getValueByString(Di)
        .getRawString(),
    );
  }
  getOutputType(t, e) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(lt)
      .getValueByIndex(e)
      .getValueByString(Ai)
      .getRawString();
  }
  getOutputReflect(t, e) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(lt)
      .getValueByIndex(e)
      .getValueByString(zi)
      .toBoolean();
  }
  getParticleCount(t) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(ut)
      .getVector()
      .getSize();
  }
  getParticleMobility(t, e) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(ut)
      .getValueByIndex(e)
      .getValueByString(ga)
      .toFloat();
  }
  getParticleDelay(t, e) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(ut)
      .getValueByIndex(e)
      .getValueByString(ca)
      .toFloat();
  }
  getParticleAcceleration(t, e) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(ut)
      .getValueByIndex(e)
      .getValueByString(_a)
      .toFloat();
  }
  getParticleRadius(t, e) {
    return this._json
      .getRoot()
      .getValueByString(F)
      .getValueByIndex(t)
      .getValueByString(ut)
      .getValueByIndex(e)
      .getValueByString(da)
      .toFloat();
  }
  getParticlePosition(t, e) {
    const i = new M(0, 0);
    return (
      (i.x = this._json
        .getRoot()
        .getValueByString(F)
        .getValueByIndex(t)
        .getValueByString(ut)
        .getValueByIndex(e)
        .getValueByString(Dt)
        .getValueByString(Se)
        .toFloat()),
        (i.y = this._json
          .getRoot()
          .getValueByString(F)
          .getValueByIndex(t)
          .getValueByString(ut)
          .getValueByIndex(e)
          .getValueByString(Dt)
          .getValueByString(xe)
          .toFloat()),
        i
    );
  }
}
var Yi;
((r) => {
  r.CubismPhysicsJson = Es;
})(Yi || (Yi = {}));
const ji = "X",
  Gi = "Y",
  Hi = "Angle",
  ma = 5,
  Ve = 100,
  $i = 0.001,
  pa = 5;
class Ht {
  static create(t, e) {
    const i = new Ht();
    return i.parse(t, e), (i._physicsRig.gravity.y = 0), i;
  }
  static delete(t) {
    t != null && (t.release(), (t = null));
  }
  parse(t, e) {
    this._physicsRig = new Fs();
    let i = new Es(t, e);
    (this._physicsRig.gravity = i.getGravity()),
      (this._physicsRig.wind = i.getWind()),
      (this._physicsRig.subRigCount = i.getSubRigCount()),
      (this._physicsRig.fps = i.getFps()),
      this._physicsRig.settings.updateSize(
        this._physicsRig.subRigCount,
        ws,
        !0,
      ),
      this._physicsRig.inputs.updateSize(i.getTotalInputCount(), Rs, !0),
      this._physicsRig.outputs.updateSize(i.getTotalOutputCount(), Ts, !0),
      this._physicsRig.particles.updateSize(i.getVertexCount(), Vs, !0),
      this._currentRigOutputs.clear(),
      this._previousRigOutputs.clear();
    let s = 0,
      a = 0,
      o = 0;
    for (let n = 0; n < this._physicsRig.settings.getSize(); ++n) {
      (this._physicsRig.settings.at(n).normalizationPosition.minimum = i
        .getNormalizationPositionMinimumValue(n)),
        (this._physicsRig.settings.at(n).normalizationPosition.maximum = i
          .getNormalizationPositionMaximumValue(n)),
        (this._physicsRig.settings.at(n).normalizationPosition.defalut = i
          .getNormalizationPositionDefaultValue(n)),
        (this._physicsRig.settings.at(n).normalizationAngle.minimum = i
          .getNormalizationAngleMinimumValue(n)),
        (this._physicsRig.settings.at(n).normalizationAngle.maximum = i
          .getNormalizationAngleMaximumValue(n)),
        (this._physicsRig.settings.at(n).normalizationAngle.defalut = i
          .getNormalizationAngleDefaultValue(n)),
        (this._physicsRig.settings.at(n).inputCount = i.getInputCount(n)),
        (this._physicsRig.settings.at(n).baseInputIndex = s);
      for (let u = 0; u < this._physicsRig.settings.at(n).inputCount; ++u) {
        (this._physicsRig.inputs.at(s + u).sourceParameterIndex = -1),
          (this._physicsRig.inputs.at(s + u).weight = i.getInputWeight(n, u)),
          (this._physicsRig.inputs.at(s + u).reflect = i.getInputReflect(n, u)),
          i.getInputType(n, u) == ji
            ? ((this._physicsRig.inputs.at(s + u).type =
              st.CubismPhysicsSource_X),
              (this._physicsRig.inputs.at(s + u).getNormalizedParameterValue =
                ya))
            : i.getInputType(n, u) == Gi
            ? ((this._physicsRig.inputs.at(s + u).type =
              st.CubismPhysicsSource_Y),
              (this._physicsRig.inputs.at(s + u).getNormalizedParameterValue =
                Sa))
            : i.getInputType(n, u) == Hi &&
              ((this._physicsRig.inputs.at(s + u).type =
                st.CubismPhysicsSource_Angle),
                (this._physicsRig.inputs.at(s + u).getNormalizedParameterValue =
                  xa)),
          (this._physicsRig.inputs.at(s + u).source.targetType =
            ue.CubismPhysicsTargetType_Parameter),
          (this._physicsRig.inputs.at(s + u).source.id = i.getInputSourceId(
            n,
            u,
          ));
      }
      (s += this._physicsRig.settings.at(n).inputCount),
        (this._physicsRig.settings.at(n).outputCount = i.getOutputCount(n)),
        (this._physicsRig.settings.at(n).baseOutputIndex = a);
      const l = new Wi();
      l.outputs.resize(this._physicsRig.settings.at(n).outputCount);
      const h = new Wi();
      h.outputs.resize(this._physicsRig.settings.at(n).outputCount);
      for (let u = 0; u < this._physicsRig.settings.at(n).outputCount; ++u) {
        l.outputs.set(u, 0),
          h.outputs.set(u, 0),
          (this._physicsRig.outputs.at(a + u).destinationParameterIndex = -1),
          (this._physicsRig.outputs.at(a + u).vertexIndex = i
            .getOutputVertexIndex(n, u)),
          (this._physicsRig.outputs.at(a + u).angleScale = i
            .getOutputAngleScale(n, u)),
          (this._physicsRig.outputs.at(a + u).weight = i.getOutputWeight(n, u)),
          (this._physicsRig.outputs.at(a + u).destination.targetType =
            ue.CubismPhysicsTargetType_Parameter),
          (this._physicsRig.outputs.at(a + u).destination.id = i
            .getOutputDestinationId(n, u)),
          i.getOutputType(n, u) == ji
            ? ((this._physicsRig.outputs.at(a + u).type =
              st.CubismPhysicsSource_X),
              (this._physicsRig.outputs.at(a + u).getValue = Ca),
              (this._physicsRig.outputs.at(a + u).getScale = ba))
            : i.getOutputType(n, u) == Gi
            ? ((this._physicsRig.outputs.at(a + u).type =
              st.CubismPhysicsSource_Y),
              (this._physicsRig.outputs.at(a + u).getValue = Ma),
              (this._physicsRig.outputs.at(a + u).getScale = Ia))
            : i.getOutputType(n, u) == Hi &&
              ((this._physicsRig.outputs.at(a + u).type =
                st.CubismPhysicsSource_Angle),
                (this._physicsRig.outputs.at(a + u).getValue = Pa),
                (this._physicsRig.outputs.at(a + u).getScale = Va)),
          (this._physicsRig.outputs.at(a + u).reflect = i.getOutputReflect(
            n,
            u,
          ));
      }
      this._currentRigOutputs.pushBack(l),
        this._previousRigOutputs.pushBack(h),
        (a += this._physicsRig.settings.at(n).outputCount),
        (this._physicsRig.settings.at(n).particleCount = i.getParticleCount(n)),
        (this._physicsRig.settings.at(n).baseParticleIndex = o);
      for (let u = 0; u < this._physicsRig.settings.at(n).particleCount; ++u) {
        (this._physicsRig.particles.at(o + u).mobility = i.getParticleMobility(
          n,
          u,
        )),
          (this._physicsRig.particles.at(o + u).delay = i.getParticleDelay(
            n,
            u,
          )),
          (this._physicsRig.particles.at(o + u).acceleration = i
            .getParticleAcceleration(n, u)),
          (this._physicsRig.particles.at(o + u).radius = i.getParticleRadius(
            n,
            u,
          )),
          (this._physicsRig.particles.at(o + u).position = i
            .getParticlePosition(n, u));
      }
      o += this._physicsRig.settings.at(n).particleCount;
    }
    this.initialize(), i.release(), (i = void 0), (i = null);
  }
  stabilization(t) {
    var f, p;
    let e, i, s, a;
    const o = new M();
    let n, l, h, u;
    const d = t.getModel().parameters.values,
      _ = t.getModel().parameters.maximumValues,
      g = t.getModel().parameters.minimumValues,
      c = t.getModel().parameters.defaultValues;
    (((f = this._parameterCaches) == null ? void 0 : f.length) ?? 0) <
      t.getParameterCount() &&
    (this._parameterCaches = new Float32Array(t.getParameterCount())),
      (((p = this._parameterInputCaches) == null ? void 0 : p.length) ?? 0) <
        t.getParameterCount() &&
      (this._parameterInputCaches = new Float32Array(t.getParameterCount()));
    for (let S = 0; S < t.getParameterCount(); ++S) {
      (this._parameterCaches[S] = d[S]), (this._parameterInputCaches[S] = d[S]);
    }
    for (let S = 0; S < this._physicsRig.subRigCount; ++S) {
      (e = { angle: 0 }),
        (o.x = 0),
        (o.y = 0),
        (n = this._physicsRig.settings.at(S)),
        (l = this._physicsRig.inputs.get(n.baseInputIndex)),
        (h = this._physicsRig.outputs.get(n.baseOutputIndex)),
        (u = this._physicsRig.particles.get(n.baseParticleIndex));
      for (let y = 0; y < n.inputCount; ++y) {
        (i = l[y].weight / Ve),
          l[y].sourceParameterIndex == -1 &&
          (l[y].sourceParameterIndex = t.getParameterIndex(l[y].source.id)),
          l[y].getNormalizedParameterValue(
            o,
            e,
            d[l[y].sourceParameterIndex],
            g[l[y].sourceParameterIndex],
            _[l[y].sourceParameterIndex],
            c[l[y].sourceParameterIndex],
            n.normalizationPosition,
            n.normalizationAngle,
            l[y].reflect,
            i,
          ),
          (this._parameterCaches[l[y].sourceParameterIndex] =
            d[l[y].sourceParameterIndex]);
      }
      (s = P.degreesToRadian(-e.angle)),
        (o.x = o.x * P.cos(s) - o.y * P.sin(s)),
        (o.y = o.x * P.sin(s) + o.y * P.cos(s)),
        Ra(
          u,
          n.particleCount,
          o,
          e.angle,
          this._options.wind,
          $i * n.normalizationPosition.maximum,
        );
      for (let y = 0; y < n.outputCount; ++y) {
        const B = h[y].vertexIndex;
        if (
          (h[y].destinationParameterIndex == -1 &&
            (h[y].destinationParameterIndex = t.getParameterIndex(
              h[y].destination.id,
            )),
            B < 1 || B >= n.particleCount)
        ) {
          continue;
        }
        let v = new M();
        (v = u[B].position.substract(u[B - 1].position)),
          (a = h[y].getValue(v, u, B, h[y].reflect, this._options.gravity)),
          this._currentRigOutputs.at(S).outputs.set(y, a),
          this._previousRigOutputs.at(S).outputs.set(y, a);
        const I = h[y].destinationParameterIndex,
          b = !Float32Array.prototype.slice &&
              "subarray" in Float32Array.prototype
            ? JSON.parse(JSON.stringify(d.subarray(I)))
            : d.slice(I);
        Me(b, g[I], _[I], a, h[y]);
        for (let D = I, J = 0; D < this._parameterCaches.length; D++, J++) {
          d[D] = this._parameterCaches[D] = b[J];
        }
      }
    }
  }
  evaluate(t, e) {
    var y, B;
    let i, s, a, o;
    const n = new M();
    let l, h, u, d;
    if (0 >= e) return;
    const _ = t.getModel().parameters.values,
      g = t.getModel().parameters.maximumValues,
      c = t.getModel().parameters.minimumValues,
      f = t.getModel().parameters.defaultValues;
    let p;
    if (
      ((this._currentRemainTime += e),
        this._currentRemainTime > pa && (this._currentRemainTime = 0),
        (((y = this._parameterCaches) == null ? void 0 : y.length) ?? 0) <
          t.getParameterCount() &&
        (this._parameterCaches = new Float32Array(t.getParameterCount())),
        (((B = this._parameterInputCaches) == null ? void 0 : B.length) ?? 0) <
          t.getParameterCount())
    ) {
      this._parameterInputCaches = new Float32Array(t.getParameterCount());
      for (let v = 0; v < t.getParameterCount(); ++v) {
        this._parameterInputCaches[v] = _[v];
      }
    }
    for (
      this._physicsRig.fps > 0 ? (p = 1 / this._physicsRig.fps) : (p = e);
      this._currentRemainTime >= p;
    ) {
      for (let I = 0; I < this._physicsRig.subRigCount; ++I) {
        (l = this._physicsRig.settings.at(I)),
          (u = this._physicsRig.outputs.get(l.baseOutputIndex));
        for (let b = 0; b < l.outputCount; ++b) {
          this._previousRigOutputs
            .at(I)
            .outputs.set(b, this._currentRigOutputs.at(I).outputs.at(b));
        }
      }
      const v = p / this._currentRemainTime;
      for (let I = 0; I < t.getParameterCount(); ++I) {
        (this._parameterCaches[I] = this._parameterInputCaches[I] * (1 - v) +
          _[I] * v), (this._parameterInputCaches[I] = this._parameterCaches[I]);
      }
      for (let I = 0; I < this._physicsRig.subRigCount; ++I) {
        (i = { angle: 0 }),
          (n.x = 0),
          (n.y = 0),
          (l = this._physicsRig.settings.at(I)),
          (h = this._physicsRig.inputs.get(l.baseInputIndex)),
          (u = this._physicsRig.outputs.get(l.baseOutputIndex)),
          (d = this._physicsRig.particles.get(l.baseParticleIndex));
        for (let b = 0; b < l.inputCount; ++b) {
          (s = h[b].weight / Ve),
            h[b].sourceParameterIndex == -1 &&
            (h[b].sourceParameterIndex = t.getParameterIndex(h[b].source.id)),
            h[b].getNormalizedParameterValue(
              n,
              i,
              this._parameterCaches[h[b].sourceParameterIndex],
              c[h[b].sourceParameterIndex],
              g[h[b].sourceParameterIndex],
              f[h[b].sourceParameterIndex],
              l.normalizationPosition,
              l.normalizationAngle,
              h[b].reflect,
              s,
            );
        }
        (a = P.degreesToRadian(-i.angle)),
          (n.x = n.x * P.cos(a) - n.y * P.sin(a)),
          (n.y = n.x * P.sin(a) + n.y * P.cos(a)),
          wa(
            d,
            l.particleCount,
            n,
            i.angle,
            this._options.wind,
            $i * l.normalizationPosition.maximum,
            p,
            ma,
          );
        for (let b = 0; b < l.outputCount; ++b) {
          const D = u[b].vertexIndex;
          if (
            (u[b].destinationParameterIndex == -1 &&
              (u[b].destinationParameterIndex = t.getParameterIndex(
                u[b].destination.id,
              )),
              D < 1 || D >= l.particleCount)
          ) {
            continue;
          }
          const J = new M();
          (J.x = d[D].position.x - d[D - 1].position.x),
            (J.y = d[D].position.y - d[D - 1].position.y),
            (o = u[b].getValue(J, d, D, u[b].reflect, this._options.gravity)),
            this._currentRigOutputs.at(I).outputs.set(b, o);
          const pt = u[b].destinationParameterIndex,
            ft = !Float32Array.prototype.slice &&
                "subarray" in Float32Array.prototype
              ? JSON.parse(JSON.stringify(this._parameterCaches.subarray(pt)))
              : this._parameterCaches.slice(pt);
          Me(ft, c[pt], g[pt], o, u[b]);
          for (
            let yt = pt, Et = 0;
            yt < this._parameterCaches.length;
            yt++, Et++
          ) {
            this._parameterCaches[yt] = ft[Et];
          }
        }
      }
      this._currentRemainTime -= p;
    }
    const S = this._currentRemainTime / p;
    this.interpolate(t, S);
  }
  interpolate(t, e) {
    let i, s;
    const a = t.getModel().parameters.values,
      o = t.getModel().parameters.maximumValues,
      n = t.getModel().parameters.minimumValues;
    for (let l = 0; l < this._physicsRig.subRigCount; ++l) {
      (s = this._physicsRig.settings.at(l)),
        (i = this._physicsRig.outputs.get(s.baseOutputIndex));
      for (let h = 0; h < s.outputCount; ++h) {
        if (i[h].destinationParameterIndex == -1) continue;
        const u = i[h].destinationParameterIndex,
          d = !Float32Array.prototype.slice &&
              "subarray" in Float32Array.prototype
            ? JSON.parse(JSON.stringify(a.subarray(u)))
            : a.slice(u);
        Me(
          d,
          n[u],
          o[u],
          this._previousRigOutputs.at(l).outputs.at(h) * (1 - e) +
            this._currentRigOutputs.at(l).outputs.at(h) * e,
          i[h],
        );
        for (let _ = u, g = 0; _ < a.length; _++, g++) a[_] = d[g];
      }
    }
  }
  setOptions(t) {
    this._options = t;
  }
  getOption() {
    return this._options;
  }
  constructor() {
    (this._physicsRig = null),
      (this._options = new As()),
      (this._options.gravity.y = -1),
      (this._options.gravity.x = 0),
      (this._options.wind.x = 0),
      (this._options.wind.y = 0),
      (this._currentRigOutputs = new x()),
      (this._previousRigOutputs = new x()),
      (this._currentRemainTime = 0),
      (this._parameterCaches = null),
      (this._parameterInputCaches = null);
  }
  release() {
    (this._physicsRig = void 0), (this._physicsRig = null);
  }
  initialize() {
    let t, e, i;
    for (let s = 0; s < this._physicsRig.subRigCount; ++s) {
      (e = this._physicsRig.settings.at(s)),
        (t = this._physicsRig.particles.get(e.baseParticleIndex)),
        (t[0].initialPosition = new M(0, 0)),
        (t[0].lastPosition = new M(
          t[0].initialPosition.x,
          t[0].initialPosition.y,
        )),
        (t[0].lastGravity = new M(0, -1)),
        (t[0].lastGravity.y *= -1),
        (t[0].velocity = new M(0, 0)),
        (t[0].force = new M(0, 0));
      for (let a = 1; a < e.particleCount; ++a) {
        (i = new M(0, 0)),
          (i.y = t[a].radius),
          (t[a].initialPosition = new M(
            t[a - 1].initialPosition.x + i.x,
            t[a - 1].initialPosition.y + i.y,
          )),
          (t[a].position = new M(
            t[a].initialPosition.x,
            t[a].initialPosition.y,
          )),
          (t[a].lastPosition = new M(
            t[a].initialPosition.x,
            t[a].initialPosition.y,
          )),
          (t[a].lastGravity = new M(0, -1)),
          (t[a].lastGravity.y *= -1),
          (t[a].velocity = new M(0, 0)),
          (t[a].force = new M(0, 0));
      }
    }
  }
}
class As {
  constructor() {
    (this.gravity = new M(0, 0)), (this.wind = new M(0, 0));
  }
}
class Wi {
  constructor() {
    this.outputs = new x(0);
  }
}
function fa(r) {
  let t = 0;
  return r > 0 ? (t = 1) : r < 0 && (t = -1), t;
}
function ya(r, t, e, i, s, a, o, n, l, h) {
  r.x += ke(e, i, s, a, o.minimum, o.maximum, o.defalut, l) * h;
}
function Sa(r, t, e, i, s, a, o, n, l, h) {
  r.y += ke(e, i, s, a, o.minimum, o.maximum, o.defalut, l) * h;
}
function xa(r, t, e, i, s, a, o, n, l, h) {
  t.angle += ke(e, i, s, a, n.minimum, n.maximum, n.defalut, l) * h;
}
function Ca(r, t, e, i, s) {
  let a = r.x;
  return i && (a *= -1), a;
}
function Ma(r, t, e, i, s) {
  let a = r.y;
  return i && (a *= -1), a;
}
function Pa(r, t, e, i, s) {
  let a;
  return (
    e >= 2
      ? (s = t[e - 1].position.substract(t[e - 2].position))
      : (s = s.multiplyByScaler(-1)),
      (a = P.directionToRadian(s, r)),
      i && (a *= -1),
      a
  );
}
function Ba(r, t) {
  const e = P.max(r, t),
    i = P.min(r, t);
  return P.abs(e - i);
}
function va(r, t) {
  return P.min(r, t) + Ba(r, t) / 2;
}
function ba(r, t) {
  return JSON.parse(JSON.stringify(r.x));
}
function Ia(r, t) {
  return JSON.parse(JSON.stringify(r.y));
}
function Va(r, t) {
  return JSON.parse(JSON.stringify(t));
}
function wa(r, t, e, i, s, a, o, n) {
  let l,
    h,
    u = new M(0, 0),
    d = new M(0, 0),
    _ = new M(0, 0),
    g = new M(0, 0);
  r[0].position = new M(e.x, e.y);
  const c = P.degreesToRadian(i),
    f = P.radianToDirection(c);
  f.normalize();
  for (let p = 1; p < t; ++p) {
    (r[p].force = f.multiplyByScaler(r[p].acceleration).add(s)),
      (r[p].lastPosition = new M(r[p].position.x, r[p].position.y)),
      (l = r[p].delay * o * 30),
      (u = r[p].position.substract(r[p - 1].position)),
      (h = P.directionToRadian(r[p].lastGravity, f) / n),
      (u.x = P.cos(h) * u.x - u.y * P.sin(h)),
      (u.y = P.sin(h) * u.x + u.y * P.cos(h)),
      (r[p].position = r[p - 1].position.add(u)),
      (d = r[p].velocity.multiplyByScaler(l)),
      (_ = r[p].force.multiplyByScaler(l).multiplyByScaler(l)),
      (r[p].position = r[p].position.add(d).add(_)),
      (g = r[p].position.substract(r[p - 1].position)),
      g.normalize(),
      (r[p].position = r[p - 1].position.add(g.multiplyByScaler(r[p].radius))),
      P.abs(r[p].position.x) < a && (r[p].position.x = 0),
      l != 0 &&
      ((r[p].velocity = r[p].position.substract(r[p].lastPosition)),
        (r[p].velocity = r[p].velocity.divisionByScalar(l)),
        (r[p].velocity = r[p].velocity.multiplyByScaler(r[p].mobility))),
      (r[p].force = new M(0, 0)),
      (r[p].lastGravity = new M(f.x, f.y));
  }
}
function Ra(r, t, e, i, s, a) {
  let o = new M(0, 0);
  r[0].position = new M(e.x, e.y);
  const n = P.degreesToRadian(i),
    l = P.radianToDirection(n);
  l.normalize();
  for (let h = 1; h < t; ++h) {
    (r[h].force = l.multiplyByScaler(r[h].acceleration).add(s)),
      (r[h].lastPosition = new M(r[h].position.x, r[h].position.y)),
      (r[h].velocity = new M(0, 0)),
      (o = r[h].force),
      o.normalize(),
      (o = o.multiplyByScaler(r[h].radius)),
      (r[h].position = r[h - 1].position.add(o)),
      P.abs(r[h].position.x) < a && (r[h].position.x = 0),
      (r[h].force = new M(0, 0)),
      (r[h].lastGravity = new M(l.x, l.y));
  }
}
function Me(r, t, e, i, s) {
  let a;
  const o = s.getScale(s.translationScale, s.angleScale);
  (a = i * o),
    a < t
      ? (a < s.valueBelowMinimum && (s.valueBelowMinimum = a), (a = t))
      : a > e &&
        (a > s.valueExceededMaximum && (s.valueExceededMaximum = a), (a = e));
  const n = s.weight / Ve;
  n >= 1 || (a = r[0] * (1 - n) + a * n), (r[0] = a);
}
function ke(r, t, e, i, s, a, o, n) {
  let l = 0;
  const h = P.max(e, t);
  h < r && (r = h);
  const u = P.min(e, t);
  u > r && (r = u);
  const d = P.min(s, a),
    _ = P.max(s, a),
    g = o,
    c = va(u, h),
    f = r - c;
  switch (fa(f)) {
    case 1: {
      const p = _ - g,
        S = h - c;
      S != 0 && ((l = f * (p / S)), (l += g));
      break;
    }
    case -1: {
      const p = d - g,
        S = u - c;
      S != 0 && ((l = f * (p / S)), (l += g));
      break;
    }
    case 0: {
      l = g;
      break;
    }
  }
  return n ? l : l * -1;
}
var qi;
((r) => {
  (r.CubismPhysics = Ht), (r.Options = As);
})(qi || (qi = {}));
const Pe = 4,
  Ta = 36,
  Fa = 32;
class Ea {
  constructor(t) {
    (this._renderTextureCount = 0),
      (this._clippingMaskBufferSize = 256),
      (this._clippingContextListForMask = new x()),
      (this._clippingContextListForDraw = new x()),
      (this._channelColors = new x()),
      (this._tmpBoundsOnModel = new re()),
      (this._tmpMatrix = new A()),
      (this._tmpMatrixForMask = new A()),
      (this._tmpMatrixForDraw = new A()),
      (this._clippingContexttConstructor = t);
    let e = new k();
    (e.r = 1),
      (e.g = 0),
      (e.b = 0),
      (e.a = 0),
      this._channelColors.pushBack(e),
      (e = new k()),
      (e.r = 0),
      (e.g = 1),
      (e.b = 0),
      (e.a = 0),
      this._channelColors.pushBack(e),
      (e = new k()),
      (e.r = 0),
      (e.g = 0),
      (e.b = 1),
      (e.a = 0),
      this._channelColors.pushBack(e),
      (e = new k()),
      (e.r = 0),
      (e.g = 0),
      (e.b = 0),
      (e.a = 1),
      this._channelColors.pushBack(e);
  }
  release() {
    for (let t = 0; t < this._clippingContextListForMask.getSize(); t++) {
      this._clippingContextListForMask.at(t) &&
      (this._clippingContextListForMask.at(t).release(),
        this._clippingContextListForMask.set(t, void 0)),
        this._clippingContextListForMask.set(t, null);
    }
    this._clippingContextListForMask = null;
    for (let t = 0; t < this._clippingContextListForDraw.getSize(); t++) {
      this._clippingContextListForDraw.set(t, null);
    }
    this._clippingContextListForDraw = null;
    for (let t = 0; t < this._channelColors.getSize(); t++) {
      this._channelColors.set(t, null);
    }
    (this._channelColors = null),
      this._clearedFrameBufferFlags != null &&
      this._clearedFrameBufferFlags.clear(),
      (this._clearedFrameBufferFlags = null);
  }
  initialize(t, e) {
    e % 1 != 0 &&
    (rt(
      "The number of render textures must be specified as an integer. The decimal point is rounded down and corrected to an integer.",
    ),
      (e = ~~e)),
      e < 1 &&
      rt(
        "The number of render textures must be an integer greater than or equal to 1. Set the number of render textures to 1.",
      ),
      (this._renderTextureCount = e < 1 ? 1 : e),
      (this._clearedFrameBufferFlags = new x(this._renderTextureCount));
    for (let i = 0; i < t.getDrawableCount(); i++) {
      if (t.getDrawableMaskCounts()[i] <= 0) {
        this._clippingContextListForDraw.pushBack(null);
        continue;
      }
      let s = this.findSameClip(
        t.getDrawableMasks()[i],
        t.getDrawableMaskCounts()[i],
      );
      s == null &&
      ((s = new this._clippingContexttConstructor(
        this,
        t.getDrawableMasks()[i],
        t.getDrawableMaskCounts()[i],
      )),
        this._clippingContextListForMask.pushBack(s)),
        s.addClippedDrawable(i),
        this._clippingContextListForDraw.pushBack(s);
    }
  }
  findSameClip(t, e) {
    for (let i = 0; i < this._clippingContextListForMask.getSize(); i++) {
      const s = this._clippingContextListForMask.at(i),
        a = s._clippingIdCount;
      if (a != e) continue;
      let o = 0;
      for (let n = 0; n < a; n++) {
        const l = s._clippingIdList[n];
        for (let h = 0; h < a; h++) {
          if (t[h] == l) {
            o++;
            break;
          }
        }
      }
      if (o == a) return s;
    }
    return null;
  }
  setupMatrixForHighPrecision(t, e) {
    let i = 0;
    for (let s = 0; s < this._clippingContextListForMask.getSize(); s++) {
      const a = this._clippingContextListForMask.at(s);
      this.calcClippedDrawTotalBounds(t, a), a._isUsing && i++;
    }
    if (i > 0) {
      if (
        (this.setupLayoutBounds(0),
          this._clearedFrameBufferFlags.getSize() != this._renderTextureCount)
      ) {
        this._clearedFrameBufferFlags.clear();
        for (let s = 0; s < this._renderTextureCount; s++) {
          this._clearedFrameBufferFlags.pushBack(!1);
        }
      } else {
        for (let s = 0; s < this._renderTextureCount; s++) {
          this._clearedFrameBufferFlags.set(s, !1);
        }
      }
      for (let s = 0; s < this._clippingContextListForMask.getSize(); s++) {
        const a = this._clippingContextListForMask.at(s),
          o = a._allClippedDrawRect,
          n = a._layoutBounds,
          l = 0.05;
        let h = 0,
          u = 0;
        const d = t.getPixelsPerUnit(),
          _ = a.getClippingManager().getClippingMaskBufferSize(),
          g = n.width * _,
          c = n.height * _;
        this._tmpBoundsOnModel.setRect(o),
          this._tmpBoundsOnModel.width * d > g
            ? (this._tmpBoundsOnModel.expand(o.width * l, 0),
              (h = n.width / this._tmpBoundsOnModel.width))
            : (h = d / g),
          this._tmpBoundsOnModel.height * d > c
            ? (this._tmpBoundsOnModel.expand(0, o.height * l),
              (u = n.height / this._tmpBoundsOnModel.height))
            : (u = d / c),
          this.createMatrixForMask(e, n, h, u),
          a._matrixForMask.setMatrix(this._tmpMatrixForMask.getArray()),
          a._matrixForDraw.setMatrix(this._tmpMatrixForDraw.getArray());
      }
    }
  }
  createMatrixForMask(t, e, i, s) {
    this._tmpMatrix.loadIdentity(),
      this._tmpMatrix.translateRelative(-1, -1),
      this._tmpMatrix.scaleRelative(2, 2),
      this._tmpMatrix.translateRelative(e.x, e.y),
      this._tmpMatrix.scaleRelative(i, s),
      this._tmpMatrix.translateRelative(
        -this._tmpBoundsOnModel.x,
        -this._tmpBoundsOnModel.y,
      ),
      this._tmpMatrixForMask.setMatrix(this._tmpMatrix.getArray()),
      this._tmpMatrix.loadIdentity(),
      this._tmpMatrix.translateRelative(e.x, e.y * (t ? -1 : 1)),
      this._tmpMatrix.scaleRelative(i, s * (t ? -1 : 1)),
      this._tmpMatrix.translateRelative(
        -this._tmpBoundsOnModel.x,
        -this._tmpBoundsOnModel.y,
      ),
      this._tmpMatrixForDraw.setMatrix(this._tmpMatrix.getArray());
  }
  setupLayoutBounds(t) {
    const e = this._renderTextureCount <= 1
      ? Ta
      : Fa * this._renderTextureCount;
    if (t <= 0 || t > e) {
      t > e &&
        R(
          `not supported mask count : {0}
[Details] render texture count : {1}, mask count : {2}`,
          t - e,
          this._renderTextureCount,
          t,
        );
      for (let h = 0; h < this._clippingContextListForMask.getSize(); h++) {
        const u = this._clippingContextListForMask.at(h);
        (u._layoutChannelIndex = 0),
          (u._layoutBounds.x = 0),
          (u._layoutBounds.y = 0),
          (u._layoutBounds.width = 1),
          (u._layoutBounds.height = 1),
          (u._bufferIndex = 0);
      }
      return;
    }
    const i = this._renderTextureCount <= 1 ? 9 : 8;
    let s = t / this._renderTextureCount;
    const a = t % this._renderTextureCount;
    s = Math.ceil(s);
    let o = s / Pe;
    const n = s % Pe;
    o = ~~o;
    let l = 0;
    for (let h = 0; h < this._renderTextureCount; h++) {
      for (let u = 0; u < Pe; u++) {
        let d = o + (u < n ? 1 : 0);
        const _ = n + (o < 1 ? -1 : 0);
        if ((u == _ && a > 0 && (d -= h < a ? 0 : 1), d != 0)) {
          if (d == 1) {
            const g = this._clippingContextListForMask.at(l++);
            (g._layoutChannelIndex = u),
              (g._layoutBounds.x = 0),
              (g._layoutBounds.y = 0),
              (g._layoutBounds.width = 1),
              (g._layoutBounds.height = 1),
              (g._bufferIndex = h);
          } else if (d == 2) {
            for (let g = 0; g < d; g++) {
              let c = g % 2;
              c = ~~c;
              const f = this._clippingContextListForMask.at(l++);
              (f._layoutChannelIndex = u),
                (f._layoutBounds.x = c * 0.5),
                (f._layoutBounds.y = 0),
                (f._layoutBounds.width = 0.5),
                (f._layoutBounds.height = 1),
                (f._bufferIndex = h);
            }
          } else if (d <= 4) {
            for (let g = 0; g < d; g++) {
              let c = g % 2,
                f = g / 2;
              (c = ~~c), (f = ~~f);
              const p = this._clippingContextListForMask.at(l++);
              (p._layoutChannelIndex = u),
                (p._layoutBounds.x = c * 0.5),
                (p._layoutBounds.y = f * 0.5),
                (p._layoutBounds.width = 0.5),
                (p._layoutBounds.height = 0.5),
                (p._bufferIndex = h);
            }
          } else if (d <= i) {
            for (let g = 0; g < d; g++) {
              let c = g % 3,
                f = g / 3;
              (c = ~~c), (f = ~~f);
              const p = this._clippingContextListForMask.at(l++);
              (p._layoutChannelIndex = u),
                (p._layoutBounds.x = c / 3),
                (p._layoutBounds.y = f / 3),
                (p._layoutBounds.width = 1 / 3),
                (p._layoutBounds.height = 1 / 3),
                (p._bufferIndex = h);
            }
          } else {
            R(
              `not supported mask count : {0}
[Details] render texture count : {1}, mask count : {2}`,
              t - e,
              this._renderTextureCount,
              t,
            );
            for (let g = 0; g < d; g++) {
              const c = this._clippingContextListForMask.at(l++);
              (c._layoutChannelIndex = 0),
                (c._layoutBounds.x = 0),
                (c._layoutBounds.y = 0),
                (c._layoutBounds.width = 1),
                (c._layoutBounds.height = 1),
                (c._bufferIndex = 0);
            }
          }
        }
      }
    }
  }
  calcClippedDrawTotalBounds(t, e) {
    let i = Number.MAX_VALUE,
      s = Number.MAX_VALUE,
      a = Number.MIN_VALUE,
      o = Number.MIN_VALUE;
    const n = e._clippedDrawableIndexList.length;
    for (let l = 0; l < n; l++) {
      const h = e._clippedDrawableIndexList[l],
        u = t.getDrawableVertexCount(h),
        d = t.getDrawableVertices(h);
      let _ = Number.MAX_VALUE,
        g = Number.MAX_VALUE,
        c = -Number.MAX_VALUE,
        f = -Number.MAX_VALUE;
      const p = u * at.vertexStep;
      for (let S = at.vertexOffset; S < p; S += at.vertexStep) {
        const y = d[S],
          B = d[S + 1];
        y < _ && (_ = y), y > c && (c = y), B < g && (g = B), B > f && (f = B);
      }
      if (_ != Number.MAX_VALUE) {
        if (
          (_ < i && (i = _),
            g < s && (s = g),
            c > a && (a = c),
            f > o && (o = f),
            i == Number.MAX_VALUE)
        ) {
          (e._allClippedDrawRect.x = 0),
            (e._allClippedDrawRect.y = 0),
            (e._allClippedDrawRect.width = 0),
            (e._allClippedDrawRect.height = 0),
            (e._isUsing = !1);
        } else {
          e._isUsing = !0;
          const S = a - i,
            y = o - s;
          (e._allClippedDrawRect.x = i),
            (e._allClippedDrawRect.y = s),
            (e._allClippedDrawRect.width = S),
            (e._allClippedDrawRect.height = y);
        }
      }
    }
  }
  getClippingContextListForDraw() {
    return this._clippingContextListForDraw;
  }
  getClippingMaskBufferSize() {
    return this._clippingMaskBufferSize;
  }
  getRenderTextureCount() {
    return this._renderTextureCount;
  }
  getChannelFlagAsColor(t) {
    return this._channelColors.at(t);
  }
  setClippingMaskBufferSize(t) {
    this._clippingMaskBufferSize = t;
  }
}
let ht;
const Aa = 10;
class dt {
  static getInstance() {
    return ht == null && (ht = new dt()), ht;
  }
  static deleteInstance() {
    ht && (ht.release(), (ht = null));
  }
  constructor() {
    this._shaderSets = new x();
  }
  release() {
    this.releaseShaderProgram();
  }
  setupShaderProgramForDraw(t, e, i) {
    t.isPremultipliedAlpha() || R("NoPremultipliedAlpha is not allowed"),
      this._shaderSets.getSize() == 0 && this.generateShaders();
    let s, a, o, n;
    const l = t.getClippingContextBufferForDraw() != null,
      h = e.getDrawableInvertedMaskBit(i),
      u = l ? (h ? 2 : 1) : 0;
    let d;
    switch (e.getDrawableBlendMode(i)) {
      case ot.CubismBlendMode_Normal:
      default:
        (d = this._shaderSets.at(1 + u)),
          (s = this.gl.ONE),
          (a = this.gl.ONE_MINUS_SRC_ALPHA),
          (o = this.gl.ONE),
          (n = this.gl.ONE_MINUS_SRC_ALPHA);
        break;
      case ot.CubismBlendMode_Additive:
        (d = this._shaderSets.at(4 + u)),
          (s = this.gl.ONE),
          (a = this.gl.ONE),
          (o = this.gl.ZERO),
          (n = this.gl.ONE);
        break;
      case ot.CubismBlendMode_Multiplicative:
        (d = this._shaderSets.at(7 + u)),
          (s = this.gl.DST_COLOR),
          (a = this.gl.ONE_MINUS_SRC_ALPHA),
          (o = this.gl.ZERO),
          (n = this.gl.ONE);
        break;
    }
    this.gl.useProgram(d.shaderProgram),
      t._bufferData.vertex == null &&
      (t._bufferData.vertex = this.gl.createBuffer()),
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, t._bufferData.vertex);
    const _ = e.getDrawableVertices(i);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, _, this.gl.DYNAMIC_DRAW),
      this.gl.enableVertexAttribArray(d.attributePositionLocation),
      this.gl.vertexAttribPointer(
        d.attributePositionLocation,
        2,
        this.gl.FLOAT,
        !1,
        0,
        0,
      ),
      t._bufferData.uv == null && (t._bufferData.uv = this.gl.createBuffer()),
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, t._bufferData.uv);
    const g = e.getDrawableVertexUvs(i);
    if (
      (this.gl.bufferData(this.gl.ARRAY_BUFFER, g, this.gl.DYNAMIC_DRAW),
        this.gl.enableVertexAttribArray(d.attributeTexCoordLocation),
        this.gl.vertexAttribPointer(
          d.attributeTexCoordLocation,
          2,
          this.gl.FLOAT,
          !1,
          0,
          0,
        ),
        l)
    ) {
      this.gl.activeTexture(this.gl.TEXTURE1);
      const I = t
        .getClippingContextBufferForDraw()
        .getClippingManager()
        .getColorBuffer()
        .at(t.getClippingContextBufferForDraw()._bufferIndex);
      this.gl.bindTexture(this.gl.TEXTURE_2D, I),
        this.gl.uniform1i(d.samplerTexture1Location, 1),
        this.gl.uniformMatrix4fv(
          d.uniformClipMatrixLocation,
          !1,
          t.getClippingContextBufferForDraw()._matrixForDraw.getArray(),
        );
      const b = t.getClippingContextBufferForDraw()._layoutChannelIndex,
        D = t
          .getClippingContextBufferForDraw()
          .getClippingManager()
          .getChannelFlagAsColor(b);
      this.gl.uniform4f(d.uniformChannelFlagLocation, D.r, D.g, D.b, D.a);
    }
    const c = e.getDrawableTextureIndex(i),
      f = t.getBindedTextures().getValue(c);
    this.gl.activeTexture(this.gl.TEXTURE0),
      this.gl.bindTexture(this.gl.TEXTURE_2D, f),
      this.gl.uniform1i(d.samplerTexture0Location, 0);
    const p = t.getMvpMatrix();
    this.gl.uniformMatrix4fv(d.uniformMatrixLocation, !1, p.getArray());
    const S = t.getModelColorWithOpacity(e.getDrawableOpacity(i)),
      y = e.getMultiplyColor(i),
      B = e.getScreenColor(i);
    this.gl.uniform4f(d.uniformBaseColorLocation, S.r, S.g, S.b, S.a),
      this.gl.uniform4f(d.uniformMultiplyColorLocation, y.r, y.g, y.b, y.a),
      this.gl.uniform4f(d.uniformScreenColorLocation, B.r, B.g, B.b, B.a),
      t._bufferData.index == null &&
      (t._bufferData.index = this.gl.createBuffer());
    const v = e.getDrawableVertexIndices(i);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, t._bufferData.index),
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, v, this.gl.DYNAMIC_DRAW),
      this.gl.blendFuncSeparate(s, a, o, n);
  }
  setupShaderProgramForMask(t, e, i) {
    t.isPremultipliedAlpha() || R("NoPremultipliedAlpha is not allowed"),
      this._shaderSets.getSize() == 0 && this.generateShaders();
    const s = this._shaderSets.at(0);
    this.gl.useProgram(s.shaderProgram),
      t._bufferData.vertex == null &&
      (t._bufferData.vertex = this.gl.createBuffer()),
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, t._bufferData.vertex);
    const a = e.getDrawableVertices(i);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, a, this.gl.DYNAMIC_DRAW),
      this.gl.enableVertexAttribArray(s.attributePositionLocation),
      this.gl.vertexAttribPointer(
        s.attributePositionLocation,
        2,
        this.gl.FLOAT,
        !1,
        0,
        0,
      ),
      t._bufferData.uv == null && (t._bufferData.uv = this.gl.createBuffer()),
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, t._bufferData.uv);
    const o = e.getDrawableTextureIndex(i),
      n = t.getBindedTextures().getValue(o);
    this.gl.activeTexture(this.gl.TEXTURE0),
      this.gl.bindTexture(this.gl.TEXTURE_2D, n),
      this.gl.uniform1i(s.samplerTexture0Location, 0),
      t._bufferData.uv == null && (t._bufferData.uv = this.gl.createBuffer()),
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, t._bufferData.uv);
    const l = e.getDrawableVertexUvs(i);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, l, this.gl.DYNAMIC_DRAW),
      this.gl.enableVertexAttribArray(s.attributeTexCoordLocation),
      this.gl.vertexAttribPointer(
        s.attributeTexCoordLocation,
        2,
        this.gl.FLOAT,
        !1,
        0,
        0,
      ),
      t.getClippingContextBufferForMask();
    const h = t.getClippingContextBufferForMask()._layoutChannelIndex,
      u = t
        .getClippingContextBufferForMask()
        .getClippingManager()
        .getChannelFlagAsColor(h);
    this.gl.uniform4f(s.uniformChannelFlagLocation, u.r, u.g, u.b, u.a),
      this.gl.uniformMatrix4fv(
        s.uniformClipMatrixLocation,
        !1,
        t.getClippingContextBufferForMask()._matrixForMask.getArray(),
      );
    const d = t.getClippingContextBufferForMask()._layoutBounds;
    this.gl.uniform4f(
      s.uniformBaseColorLocation,
      d.x * 2 - 1,
      d.y * 2 - 1,
      d.getRight() * 2 - 1,
      d.getBottom() * 2 - 1,
    );
    const _ = e.getMultiplyColor(i),
      g = e.getScreenColor(i);
    this.gl.uniform4f(s.uniformMultiplyColorLocation, _.r, _.g, _.b, _.a),
      this.gl.uniform4f(s.uniformScreenColorLocation, g.r, g.g, g.b, g.a);
    const c = this.gl.ZERO,
      f = this.gl.ONE_MINUS_SRC_COLOR,
      p = this.gl.ZERO,
      S = this.gl.ONE_MINUS_SRC_ALPHA;
    t._bufferData.index == null &&
      (t._bufferData.index = this.gl.createBuffer());
    const y = e.getDrawableVertexIndices(i);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, t._bufferData.index),
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, y, this.gl.DYNAMIC_DRAW),
      this.gl.blendFuncSeparate(c, f, p, S);
  }
  releaseShaderProgram() {
    for (let t = 0; t < this._shaderSets.getSize(); t++) {
      this.gl.deleteProgram(this._shaderSets.at(t).shaderProgram),
        (this._shaderSets.at(t).shaderProgram = 0),
        this._shaderSets.set(t, void 0),
        this._shaderSets.set(t, null);
    }
  }
  generateShaders() {
    for (let t = 0; t < Aa; t++) this._shaderSets.pushBack(new Ds());
    (this._shaderSets.at(0).shaderProgram = this.loadShaderProgram(Da, La)),
      (this._shaderSets.at(1).shaderProgram = this.loadShaderProgram(Oa, ka)),
      (this._shaderSets.at(2).shaderProgram = this.loadShaderProgram(Ji, Na)),
      (this._shaderSets.at(3).shaderProgram = this.loadShaderProgram(Ji, Ua)),
      (this._shaderSets.at(4).shaderProgram =
        this._shaderSets.at(1).shaderProgram),
      (this._shaderSets.at(5).shaderProgram =
        this._shaderSets.at(2).shaderProgram),
      (this._shaderSets.at(6).shaderProgram =
        this._shaderSets.at(3).shaderProgram),
      (this._shaderSets.at(7).shaderProgram =
        this._shaderSets.at(1).shaderProgram),
      (this._shaderSets.at(8).shaderProgram =
        this._shaderSets.at(2).shaderProgram),
      (this._shaderSets.at(9).shaderProgram =
        this._shaderSets.at(3).shaderProgram),
      (this._shaderSets.at(0).attributePositionLocation = this.gl
        .getAttribLocation(
          this._shaderSets.at(0).shaderProgram,
          "a_position",
        )),
      (this._shaderSets.at(0).attributeTexCoordLocation = this.gl
        .getAttribLocation(
          this._shaderSets.at(0).shaderProgram,
          "a_texCoord",
        )),
      (this._shaderSets.at(0).samplerTexture0Location = this.gl
        .getUniformLocation(
          this._shaderSets.at(0).shaderProgram,
          "s_texture0",
        )),
      (this._shaderSets.at(0).uniformClipMatrixLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(0).shaderProgram,
          "u_clipMatrix",
        )),
      (this._shaderSets.at(0).uniformChannelFlagLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(0).shaderProgram,
          "u_channelFlag",
        )),
      (this._shaderSets.at(0).uniformBaseColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(0).shaderProgram,
          "u_baseColor",
        )),
      (this._shaderSets.at(0).uniformMultiplyColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(0).shaderProgram,
          "u_multiplyColor",
        )),
      (this._shaderSets.at(0).uniformScreenColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(0).shaderProgram,
          "u_screenColor",
        )),
      (this._shaderSets.at(1).attributePositionLocation = this.gl
        .getAttribLocation(
          this._shaderSets.at(1).shaderProgram,
          "a_position",
        )),
      (this._shaderSets.at(1).attributeTexCoordLocation = this.gl
        .getAttribLocation(
          this._shaderSets.at(1).shaderProgram,
          "a_texCoord",
        )),
      (this._shaderSets.at(1).samplerTexture0Location = this.gl
        .getUniformLocation(
          this._shaderSets.at(1).shaderProgram,
          "s_texture0",
        )),
      (this._shaderSets.at(1).uniformMatrixLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(1).shaderProgram,
          "u_matrix",
        )),
      (this._shaderSets.at(1).uniformBaseColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(1).shaderProgram,
          "u_baseColor",
        )),
      (this._shaderSets.at(1).uniformMultiplyColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(1).shaderProgram,
          "u_multiplyColor",
        )),
      (this._shaderSets.at(1).uniformScreenColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(1).shaderProgram,
          "u_screenColor",
        )),
      (this._shaderSets.at(2).attributePositionLocation = this.gl
        .getAttribLocation(
          this._shaderSets.at(2).shaderProgram,
          "a_position",
        )),
      (this._shaderSets.at(2).attributeTexCoordLocation = this.gl
        .getAttribLocation(
          this._shaderSets.at(2).shaderProgram,
          "a_texCoord",
        )),
      (this._shaderSets.at(2).samplerTexture0Location = this.gl
        .getUniformLocation(
          this._shaderSets.at(2).shaderProgram,
          "s_texture0",
        )),
      (this._shaderSets.at(2).samplerTexture1Location = this.gl
        .getUniformLocation(
          this._shaderSets.at(2).shaderProgram,
          "s_texture1",
        )),
      (this._shaderSets.at(2).uniformMatrixLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(2).shaderProgram,
          "u_matrix",
        )),
      (this._shaderSets.at(2).uniformClipMatrixLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(2).shaderProgram,
          "u_clipMatrix",
        )),
      (this._shaderSets.at(2).uniformChannelFlagLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(2).shaderProgram,
          "u_channelFlag",
        )),
      (this._shaderSets.at(2).uniformBaseColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(2).shaderProgram,
          "u_baseColor",
        )),
      (this._shaderSets.at(2).uniformMultiplyColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(2).shaderProgram,
          "u_multiplyColor",
        )),
      (this._shaderSets.at(2).uniformScreenColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(2).shaderProgram,
          "u_screenColor",
        )),
      (this._shaderSets.at(3).attributePositionLocation = this.gl
        .getAttribLocation(
          this._shaderSets.at(3).shaderProgram,
          "a_position",
        )),
      (this._shaderSets.at(3).attributeTexCoordLocation = this.gl
        .getAttribLocation(
          this._shaderSets.at(3).shaderProgram,
          "a_texCoord",
        )),
      (this._shaderSets.at(3).samplerTexture0Location = this.gl
        .getUniformLocation(
          this._shaderSets.at(3).shaderProgram,
          "s_texture0",
        )),
      (this._shaderSets.at(3).samplerTexture1Location = this.gl
        .getUniformLocation(
          this._shaderSets.at(3).shaderProgram,
          "s_texture1",
        )),
      (this._shaderSets.at(3).uniformMatrixLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(3).shaderProgram,
          "u_matrix",
        )),
      (this._shaderSets.at(3).uniformClipMatrixLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(3).shaderProgram,
          "u_clipMatrix",
        )),
      (this._shaderSets.at(3).uniformChannelFlagLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(3).shaderProgram,
          "u_channelFlag",
        )),
      (this._shaderSets.at(3).uniformBaseColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(3).shaderProgram,
          "u_baseColor",
        )),
      (this._shaderSets.at(3).uniformMultiplyColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(3).shaderProgram,
          "u_multiplyColor",
        )),
      (this._shaderSets.at(3).uniformScreenColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(3).shaderProgram,
          "u_screenColor",
        )),
      (this._shaderSets.at(4).attributePositionLocation = this.gl
        .getAttribLocation(
          this._shaderSets.at(4).shaderProgram,
          "a_position",
        )),
      (this._shaderSets.at(4).attributeTexCoordLocation = this.gl
        .getAttribLocation(
          this._shaderSets.at(4).shaderProgram,
          "a_texCoord",
        )),
      (this._shaderSets.at(4).samplerTexture0Location = this.gl
        .getUniformLocation(
          this._shaderSets.at(4).shaderProgram,
          "s_texture0",
        )),
      (this._shaderSets.at(4).uniformMatrixLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(4).shaderProgram,
          "u_matrix",
        )),
      (this._shaderSets.at(4).uniformBaseColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(4).shaderProgram,
          "u_baseColor",
        )),
      (this._shaderSets.at(4).uniformMultiplyColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(4).shaderProgram,
          "u_multiplyColor",
        )),
      (this._shaderSets.at(4).uniformScreenColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(4).shaderProgram,
          "u_screenColor",
        )),
      (this._shaderSets.at(5).attributePositionLocation = this.gl
        .getAttribLocation(
          this._shaderSets.at(5).shaderProgram,
          "a_position",
        )),
      (this._shaderSets.at(5).attributeTexCoordLocation = this.gl
        .getAttribLocation(
          this._shaderSets.at(5).shaderProgram,
          "a_texCoord",
        )),
      (this._shaderSets.at(5).samplerTexture0Location = this.gl
        .getUniformLocation(
          this._shaderSets.at(5).shaderProgram,
          "s_texture0",
        )),
      (this._shaderSets.at(5).samplerTexture1Location = this.gl
        .getUniformLocation(
          this._shaderSets.at(5).shaderProgram,
          "s_texture1",
        )),
      (this._shaderSets.at(5).uniformMatrixLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(5).shaderProgram,
          "u_matrix",
        )),
      (this._shaderSets.at(5).uniformClipMatrixLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(5).shaderProgram,
          "u_clipMatrix",
        )),
      (this._shaderSets.at(5).uniformChannelFlagLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(5).shaderProgram,
          "u_channelFlag",
        )),
      (this._shaderSets.at(5).uniformBaseColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(5).shaderProgram,
          "u_baseColor",
        )),
      (this._shaderSets.at(5).uniformMultiplyColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(5).shaderProgram,
          "u_multiplyColor",
        )),
      (this._shaderSets.at(5).uniformScreenColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(5).shaderProgram,
          "u_screenColor",
        )),
      (this._shaderSets.at(6).attributePositionLocation = this.gl
        .getAttribLocation(
          this._shaderSets.at(6).shaderProgram,
          "a_position",
        )),
      (this._shaderSets.at(6).attributeTexCoordLocation = this.gl
        .getAttribLocation(
          this._shaderSets.at(6).shaderProgram,
          "a_texCoord",
        )),
      (this._shaderSets.at(6).samplerTexture0Location = this.gl
        .getUniformLocation(
          this._shaderSets.at(6).shaderProgram,
          "s_texture0",
        )),
      (this._shaderSets.at(6).samplerTexture1Location = this.gl
        .getUniformLocation(
          this._shaderSets.at(6).shaderProgram,
          "s_texture1",
        )),
      (this._shaderSets.at(6).uniformMatrixLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(6).shaderProgram,
          "u_matrix",
        )),
      (this._shaderSets.at(6).uniformClipMatrixLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(6).shaderProgram,
          "u_clipMatrix",
        )),
      (this._shaderSets.at(6).uniformChannelFlagLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(6).shaderProgram,
          "u_channelFlag",
        )),
      (this._shaderSets.at(6).uniformBaseColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(6).shaderProgram,
          "u_baseColor",
        )),
      (this._shaderSets.at(6).uniformMultiplyColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(6).shaderProgram,
          "u_multiplyColor",
        )),
      (this._shaderSets.at(6).uniformScreenColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(6).shaderProgram,
          "u_screenColor",
        )),
      (this._shaderSets.at(7).attributePositionLocation = this.gl
        .getAttribLocation(
          this._shaderSets.at(7).shaderProgram,
          "a_position",
        )),
      (this._shaderSets.at(7).attributeTexCoordLocation = this.gl
        .getAttribLocation(
          this._shaderSets.at(7).shaderProgram,
          "a_texCoord",
        )),
      (this._shaderSets.at(7).samplerTexture0Location = this.gl
        .getUniformLocation(
          this._shaderSets.at(7).shaderProgram,
          "s_texture0",
        )),
      (this._shaderSets.at(7).uniformMatrixLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(7).shaderProgram,
          "u_matrix",
        )),
      (this._shaderSets.at(7).uniformBaseColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(7).shaderProgram,
          "u_baseColor",
        )),
      (this._shaderSets.at(7).uniformMultiplyColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(7).shaderProgram,
          "u_multiplyColor",
        )),
      (this._shaderSets.at(7).uniformScreenColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(7).shaderProgram,
          "u_screenColor",
        )),
      (this._shaderSets.at(8).attributePositionLocation = this.gl
        .getAttribLocation(
          this._shaderSets.at(8).shaderProgram,
          "a_position",
        )),
      (this._shaderSets.at(8).attributeTexCoordLocation = this.gl
        .getAttribLocation(
          this._shaderSets.at(8).shaderProgram,
          "a_texCoord",
        )),
      (this._shaderSets.at(8).samplerTexture0Location = this.gl
        .getUniformLocation(
          this._shaderSets.at(8).shaderProgram,
          "s_texture0",
        )),
      (this._shaderSets.at(8).samplerTexture1Location = this.gl
        .getUniformLocation(
          this._shaderSets.at(8).shaderProgram,
          "s_texture1",
        )),
      (this._shaderSets.at(8).uniformMatrixLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(8).shaderProgram,
          "u_matrix",
        )),
      (this._shaderSets.at(8).uniformClipMatrixLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(8).shaderProgram,
          "u_clipMatrix",
        )),
      (this._shaderSets.at(8).uniformChannelFlagLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(8).shaderProgram,
          "u_channelFlag",
        )),
      (this._shaderSets.at(8).uniformBaseColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(8).shaderProgram,
          "u_baseColor",
        )),
      (this._shaderSets.at(8).uniformMultiplyColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(8).shaderProgram,
          "u_multiplyColor",
        )),
      (this._shaderSets.at(8).uniformScreenColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(8).shaderProgram,
          "u_screenColor",
        )),
      (this._shaderSets.at(9).attributePositionLocation = this.gl
        .getAttribLocation(
          this._shaderSets.at(9).shaderProgram,
          "a_position",
        )),
      (this._shaderSets.at(9).attributeTexCoordLocation = this.gl
        .getAttribLocation(
          this._shaderSets.at(9).shaderProgram,
          "a_texCoord",
        )),
      (this._shaderSets.at(9).samplerTexture0Location = this.gl
        .getUniformLocation(
          this._shaderSets.at(9).shaderProgram,
          "s_texture0",
        )),
      (this._shaderSets.at(9).samplerTexture1Location = this.gl
        .getUniformLocation(
          this._shaderSets.at(9).shaderProgram,
          "s_texture1",
        )),
      (this._shaderSets.at(9).uniformMatrixLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(9).shaderProgram,
          "u_matrix",
        )),
      (this._shaderSets.at(9).uniformClipMatrixLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(9).shaderProgram,
          "u_clipMatrix",
        )),
      (this._shaderSets.at(9).uniformChannelFlagLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(9).shaderProgram,
          "u_channelFlag",
        )),
      (this._shaderSets.at(9).uniformBaseColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(9).shaderProgram,
          "u_baseColor",
        )),
      (this._shaderSets.at(9).uniformMultiplyColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(9).shaderProgram,
          "u_multiplyColor",
        )),
      (this._shaderSets.at(9).uniformScreenColorLocation = this.gl
        .getUniformLocation(
          this._shaderSets.at(9).shaderProgram,
          "u_screenColor",
        ));
  }
  loadShaderProgram(t, e) {
    let i = this.gl.createProgram(),
      s = this.compileShaderSource(this.gl.VERTEX_SHADER, t);
    if (!s) return R("Vertex shader compile error!"), 0;
    let a = this.compileShaderSource(this.gl.FRAGMENT_SHADER, e);
    return a
      ? (this.gl.attachShader(i, s),
        this.gl.attachShader(i, a),
        this.gl.linkProgram(i),
        this.gl.getProgramParameter(i, this.gl.LINK_STATUS)
          ? (this.gl.deleteShader(s), this.gl.deleteShader(a), i)
          : (R("Failed to link program: {0}", i),
            this.gl.deleteShader(s),
            (s = 0),
            this.gl.deleteShader(a),
            (a = 0),
            i && (this.gl.deleteProgram(i), (i = 0)),
            0))
      : (R("Vertex shader compile error!"), 0);
  }
  compileShaderSource(t, e) {
    const i = e,
      s = this.gl.createShader(t);
    if ((this.gl.shaderSource(s, i), this.gl.compileShader(s), !s)) {
      const o = this.gl.getShaderInfoLog(s);
      R("Shader compile log: {0} ", o);
    }
    return this.gl.getShaderParameter(s, this.gl.COMPILE_STATUS)
      ? s
      : (this.gl.deleteShader(s), null);
  }
  setGl(t) {
    this.gl = t;
  }
}
class Ds {}
var Ls = ((r) => (
  (r[r.ShaderNames_SetupMask = 0] = "ShaderNames_SetupMask"),
    (r[r.ShaderNames_NormalPremultipliedAlpha = 1] =
      "ShaderNames_NormalPremultipliedAlpha"),
    (r[r.ShaderNames_NormalMaskedPremultipliedAlpha = 2] =
      "ShaderNames_NormalMaskedPremultipliedAlpha"),
    (r[r.ShaderNames_NomralMaskedInvertedPremultipliedAlpha = 3] =
      "ShaderNames_NomralMaskedInvertedPremultipliedAlpha"),
    (r[r.ShaderNames_AddPremultipliedAlpha = 4] =
      "ShaderNames_AddPremultipliedAlpha"),
    (r[r.ShaderNames_AddMaskedPremultipliedAlpha = 5] =
      "ShaderNames_AddMaskedPremultipliedAlpha"),
    (r[r.ShaderNames_AddMaskedPremultipliedAlphaInverted = 6] =
      "ShaderNames_AddMaskedPremultipliedAlphaInverted"),
    (r[r.ShaderNames_MultPremultipliedAlpha = 7] =
      "ShaderNames_MultPremultipliedAlpha"),
    (r[r.ShaderNames_MultMaskedPremultipliedAlpha = 8] =
      "ShaderNames_MultMaskedPremultipliedAlpha"),
    (r[r.ShaderNames_MultMaskedPremultipliedAlphaInverted = 9] =
      "ShaderNames_MultMaskedPremultipliedAlphaInverted"),
    r
))(Ls || {});
const Da =
    "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_myPos;uniform mat4       u_clipMatrix;void main(){   gl_Position = u_clipMatrix * a_position;   v_myPos = u_clipMatrix * a_position;   v_texCoord = a_texCoord;   v_texCoord.y = 1.0 - v_texCoord.y;}",
  La =
    "precision mediump float;varying vec2       v_texCoord;varying vec4       v_myPos;uniform vec4       u_baseColor;uniform vec4       u_channelFlag;uniform sampler2D  s_texture0;void main(){   float isInside =        step(u_baseColor.x, v_myPos.x/v_myPos.w)       * step(u_baseColor.y, v_myPos.y/v_myPos.w)       * step(v_myPos.x/v_myPos.w, u_baseColor.z)       * step(v_myPos.y/v_myPos.w, u_baseColor.w);   gl_FragColor = u_channelFlag * texture2D(s_texture0, v_texCoord).a * isInside;}",
  Oa =
    "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;uniform mat4       u_matrix;void main(){   gl_Position = u_matrix * a_position;   v_texCoord = a_texCoord;   v_texCoord.y = 1.0 - v_texCoord.y;}",
  Ji =
    "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_clipPos;uniform mat4       u_matrix;uniform mat4       u_clipMatrix;void main(){   gl_Position = u_matrix * a_position;   v_clipPos = u_clipMatrix * a_position;   v_texCoord = a_texCoord;   v_texCoord.y = 1.0 - v_texCoord.y;}",
  ka =
    "precision mediump float;varying vec2       v_texCoord;uniform vec4       u_baseColor;uniform sampler2D  s_texture0;uniform vec4       u_multiplyColor;uniform vec4       u_screenColor;void main(){   vec4 texColor = texture2D(s_texture0, v_texCoord);   texColor.rgb = texColor.rgb * u_multiplyColor.rgb;   texColor.rgb = (texColor.rgb + u_screenColor.rgb * texColor.a) - (texColor.rgb * u_screenColor.rgb);   vec4 color = texColor * u_baseColor;   gl_FragColor = vec4(color.rgb, color.a);}",
  Na =
    "precision mediump float;varying vec2       v_texCoord;varying vec4       v_clipPos;uniform vec4       u_baseColor;uniform vec4       u_channelFlag;uniform sampler2D  s_texture0;uniform sampler2D  s_texture1;uniform vec4       u_multiplyColor;uniform vec4       u_screenColor;void main(){   vec4 texColor = texture2D(s_texture0, v_texCoord);   texColor.rgb = texColor.rgb * u_multiplyColor.rgb;   texColor.rgb = (texColor.rgb + u_screenColor.rgb * texColor.a) - (texColor.rgb * u_screenColor.rgb);   vec4 col_formask = texColor * u_baseColor;   vec4 clipMask = (1.0 - texture2D(s_texture1, v_clipPos.xy / v_clipPos.w)) * u_channelFlag;   float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;   col_formask = col_formask * maskVal;   gl_FragColor = col_formask;}",
  Ua =
    "precision mediump float;varying vec2      v_texCoord;varying vec4      v_clipPos;uniform sampler2D s_texture0;uniform sampler2D s_texture1;uniform vec4      u_channelFlag;uniform vec4      u_baseColor;uniform vec4      u_multiplyColor;uniform vec4      u_screenColor;void main(){   vec4 texColor = texture2D(s_texture0, v_texCoord);   texColor.rgb = texColor.rgb * u_multiplyColor.rgb;   texColor.rgb = (texColor.rgb + u_screenColor.rgb * texColor.a) - (texColor.rgb * u_screenColor.rgb);   vec4 col_formask = texColor * u_baseColor;   vec4 clipMask = (1.0 - texture2D(s_texture1, v_clipPos.xy / v_clipPos.w)) * u_channelFlag;   float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;   col_formask = col_formask * (1.0 - maskVal);   gl_FragColor = col_formask;}";
var Ki;
((r) => {
  (r.CubismShaderSet = Ds), (r.CubismShader_WebGL = dt), (r.ShaderNames = Ls);
})(Ki || (Ki = {}));
let Q, he;
class we extends Ea {
  getMaskRenderTexture() {
    if (this._maskTexture && this._maskTexture.textures != null) {
      this._maskTexture.frameNo = this._currentFrameNo;
    } else {
      this._maskRenderTextures != null && this._maskRenderTextures.clear(),
        (this._maskRenderTextures = new x()),
        this._maskColorBuffers != null && this._maskColorBuffers.clear(),
        (this._maskColorBuffers = new x());
      const t = this._clippingMaskBufferSize;
      for (let e = 0; e < this._renderTextureCount; e++) {
        this._maskColorBuffers.pushBack(this.gl.createTexture()),
          this.gl.bindTexture(this.gl.TEXTURE_2D, this._maskColorBuffers.at(e)),
          this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0,
            this.gl.RGBA,
            t,
            t,
            0,
            this.gl.RGBA,
            this.gl.UNSIGNED_BYTE,
            null,
          ),
          this.gl.texParameteri(
            this.gl.TEXTURE_2D,
            this.gl.TEXTURE_WRAP_S,
            this.gl.CLAMP_TO_EDGE,
          ),
          this.gl.texParameteri(
            this.gl.TEXTURE_2D,
            this.gl.TEXTURE_WRAP_T,
            this.gl.CLAMP_TO_EDGE,
          ),
          this.gl.texParameteri(
            this.gl.TEXTURE_2D,
            this.gl.TEXTURE_MIN_FILTER,
            this.gl.LINEAR,
          ),
          this.gl.texParameteri(
            this.gl.TEXTURE_2D,
            this.gl.TEXTURE_MAG_FILTER,
            this.gl.LINEAR,
          ),
          this.gl.bindTexture(this.gl.TEXTURE_2D, null),
          this._maskRenderTextures.pushBack(this.gl.createFramebuffer()),
          this.gl.bindFramebuffer(
            this.gl.FRAMEBUFFER,
            this._maskRenderTextures.at(e),
          ),
          this.gl.framebufferTexture2D(
            this.gl.FRAMEBUFFER,
            this.gl.COLOR_ATTACHMENT0,
            this.gl.TEXTURE_2D,
            this._maskColorBuffers.at(e),
            0,
          );
      }
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, he),
        (this._maskTexture = new Os(
          this._currentFrameNo,
          this._maskRenderTextures,
        ));
    }
    return this._maskTexture.textures;
  }
  setGL(t) {
    this.gl = t;
  }
  constructor() {
    super(ks);
  }
  setupClippingContext(t, e) {
    this._currentFrameNo++;
    let i = 0;
    for (let s = 0; s < this._clippingContextListForMask.getSize(); s++) {
      const a = this._clippingContextListForMask.at(s);
      this.calcClippedDrawTotalBounds(t, a), a._isUsing && i++;
    }
    if (i > 0) {
      this.gl.viewport(
        0,
        0,
        this._clippingMaskBufferSize,
        this._clippingMaskBufferSize,
      ),
        (this._currentMaskRenderTexture = this.getMaskRenderTexture().at(0)),
        e.preDraw(),
        this.setupLayoutBounds(i),
        this.gl.bindFramebuffer(
          this.gl.FRAMEBUFFER,
          this._currentMaskRenderTexture,
        ),
        this._clearedFrameBufferFlags.getSize() != this._renderTextureCount &&
        (this._clearedFrameBufferFlags.clear(),
          (this._clearedFrameBufferFlags = new x(this._renderTextureCount)));
      for (let s = 0; s < this._clearedFrameBufferFlags.getSize(); s++) {
        this._clearedFrameBufferFlags.set(s, !1);
      }
      for (let s = 0; s < this._clippingContextListForMask.getSize(); s++) {
        const a = this._clippingContextListForMask.at(s),
          o = a._allClippedDrawRect,
          n = a._layoutBounds,
          l = 0.05;
        let h = 0,
          u = 0;
        const d = this.getMaskRenderTexture().at(a._bufferIndex);
        this._currentMaskRenderTexture != d &&
        ((this._currentMaskRenderTexture = d),
          e.preDraw(),
          this.gl.bindFramebuffer(
            this.gl.FRAMEBUFFER,
            this._currentMaskRenderTexture,
          )),
          this._tmpBoundsOnModel.setRect(o),
          this._tmpBoundsOnModel.expand(o.width * l, o.height * l),
          (h = n.width / this._tmpBoundsOnModel.width),
          (u = n.height / this._tmpBoundsOnModel.height),
          this._tmpMatrix.loadIdentity(),
          this._tmpMatrix.translateRelative(-1, -1),
          this._tmpMatrix.scaleRelative(2, 2),
          this._tmpMatrix.translateRelative(n.x, n.y),
          this._tmpMatrix.scaleRelative(h, u),
          this._tmpMatrix.translateRelative(
            -this._tmpBoundsOnModel.x,
            -this._tmpBoundsOnModel.y,
          ),
          this._tmpMatrixForMask.setMatrix(this._tmpMatrix.getArray()),
          this._tmpMatrix.loadIdentity(),
          this._tmpMatrix.translateRelative(n.x, n.y),
          this._tmpMatrix.scaleRelative(h, u),
          this._tmpMatrix.translateRelative(
            -this._tmpBoundsOnModel.x,
            -this._tmpBoundsOnModel.y,
          ),
          this._tmpMatrixForDraw.setMatrix(this._tmpMatrix.getArray()),
          a._matrixForMask.setMatrix(this._tmpMatrixForMask.getArray()),
          a._matrixForDraw.setMatrix(this._tmpMatrixForDraw.getArray());
        const _ = a._clippingIdCount;
        for (let g = 0; g < _; g++) {
          const c = a._clippingIdList[g];
          t.getDrawableDynamicFlagVertexPositionsDidChange(c) &&
            (e.setIsCulling(t.getDrawableCulling(c) != !1),
              this._clearedFrameBufferFlags.at(a._bufferIndex) ||
              (this.gl.clearColor(1, 1, 1, 1),
                this.gl.clear(this.gl.COLOR_BUFFER_BIT),
                this._clearedFrameBufferFlags.set(a._bufferIndex, !0)),
              e.setClippingContextBufferForMask(a),
              e.drawMeshWebGL(t, c));
        }
      }
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, he),
        e.setClippingContextBufferForMask(null),
        this.gl.viewport(Q[0], Q[1], Q[2], Q[3]);
    }
  }
  getColorBuffer() {
    return this._maskColorBuffers;
  }
  getClippingMaskCount() {
    return this._clippingContextListForMask.getSize();
  }
}
class Os {
  constructor(t, e) {
    (this.frameNo = t), (this.textures = e);
  }
}
class ks extends js {
  constructor(t, e, i) {
    super(e, i), (this._owner = t);
  }
  getClippingManager() {
    return this._owner;
  }
  setGl(t) {
    this._owner.setGL(t);
  }
}
class za {
  setGlEnable(t, e) {
    e ? this.gl.enable(t) : this.gl.disable(t);
  }
  setGlEnableVertexAttribArray(t, e) {
    e
      ? this.gl.enableVertexAttribArray(t)
      : this.gl.disableVertexAttribArray(t);
  }
  save() {
    if (this.gl == null) {
      R(`'gl' is null. WebGLRenderingContext is required.
Please call 'CubimRenderer_WebGL.startUp' function.`);
      return;
    }
    (this._lastArrayBufferBinding = this.gl.getParameter(
      this.gl.ARRAY_BUFFER_BINDING,
    )),
      (this._lastElementArrayBufferBinding = this.gl.getParameter(
        this.gl.ELEMENT_ARRAY_BUFFER_BINDING,
      )),
      (this._lastProgram = this.gl.getParameter(this.gl.CURRENT_PROGRAM)),
      (this._lastActiveTexture = this.gl.getParameter(this.gl.ACTIVE_TEXTURE)),
      this.gl.activeTexture(this.gl.TEXTURE1),
      (this._lastTexture1Binding2D = this.gl.getParameter(
        this.gl.TEXTURE_BINDING_2D,
      )),
      this.gl.activeTexture(this.gl.TEXTURE0),
      (this._lastTexture0Binding2D = this.gl.getParameter(
        this.gl.TEXTURE_BINDING_2D,
      )),
      (this._lastVertexAttribArrayEnabled[0] = this.gl.getVertexAttrib(
        0,
        this.gl.VERTEX_ATTRIB_ARRAY_ENABLED,
      )),
      (this._lastVertexAttribArrayEnabled[1] = this.gl.getVertexAttrib(
        1,
        this.gl.VERTEX_ATTRIB_ARRAY_ENABLED,
      )),
      (this._lastVertexAttribArrayEnabled[2] = this.gl.getVertexAttrib(
        2,
        this.gl.VERTEX_ATTRIB_ARRAY_ENABLED,
      )),
      (this._lastVertexAttribArrayEnabled[3] = this.gl.getVertexAttrib(
        3,
        this.gl.VERTEX_ATTRIB_ARRAY_ENABLED,
      )),
      (this._lastScissorTest = this.gl.isEnabled(this.gl.SCISSOR_TEST)),
      (this._lastStencilTest = this.gl.isEnabled(this.gl.STENCIL_TEST)),
      (this._lastDepthTest = this.gl.isEnabled(this.gl.DEPTH_TEST)),
      (this._lastCullFace = this.gl.isEnabled(this.gl.CULL_FACE)),
      (this._lastBlend = this.gl.isEnabled(this.gl.BLEND)),
      (this._lastFrontFace = this.gl.getParameter(this.gl.FRONT_FACE)),
      (this._lastColorMask = this.gl.getParameter(this.gl.COLOR_WRITEMASK)),
      (this._lastBlending[0] = this.gl.getParameter(this.gl.BLEND_SRC_RGB)),
      (this._lastBlending[1] = this.gl.getParameter(this.gl.BLEND_DST_RGB)),
      (this._lastBlending[2] = this.gl.getParameter(this.gl.BLEND_SRC_ALPHA)),
      (this._lastBlending[3] = this.gl.getParameter(this.gl.BLEND_DST_ALPHA)),
      (this._lastFBO = this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)),
      (this._lastViewport = this.gl.getParameter(this.gl.VIEWPORT));
  }
  restore() {
    if (this.gl == null) {
      R(`'gl' is null. WebGLRenderingContext is required.
Please call 'CubimRenderer_WebGL.startUp' function.`);
      return;
    }
    this.gl.useProgram(this._lastProgram),
      this.setGlEnableVertexAttribArray(
        0,
        this._lastVertexAttribArrayEnabled[0],
      ),
      this.setGlEnableVertexAttribArray(
        1,
        this._lastVertexAttribArrayEnabled[1],
      ),
      this.setGlEnableVertexAttribArray(
        2,
        this._lastVertexAttribArrayEnabled[2],
      ),
      this.setGlEnableVertexAttribArray(
        3,
        this._lastVertexAttribArrayEnabled[3],
      ),
      this.setGlEnable(this.gl.SCISSOR_TEST, this._lastScissorTest),
      this.setGlEnable(this.gl.STENCIL_TEST, this._lastStencilTest),
      this.setGlEnable(this.gl.DEPTH_TEST, this._lastDepthTest),
      this.setGlEnable(this.gl.CULL_FACE, this._lastCullFace),
      this.setGlEnable(this.gl.BLEND, this._lastBlend),
      this.gl.frontFace(this._lastFrontFace),
      this.gl.colorMask(
        this._lastColorMask[0],
        this._lastColorMask[1],
        this._lastColorMask[2],
        this._lastColorMask[3],
      ),
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._lastArrayBufferBinding),
      this.gl.bindBuffer(
        this.gl.ELEMENT_ARRAY_BUFFER,
        this._lastElementArrayBufferBinding,
      ),
      this.gl.activeTexture(this.gl.TEXTURE1),
      this.gl.bindTexture(this.gl.TEXTURE_2D, this._lastTexture1Binding2D),
      this.gl.activeTexture(this.gl.TEXTURE0),
      this.gl.bindTexture(this.gl.TEXTURE_2D, this._lastTexture0Binding2D),
      this.gl.activeTexture(this._lastActiveTexture),
      this.gl.blendFuncSeparate(
        this._lastBlending[0],
        this._lastBlending[1],
        this._lastBlending[2],
        this._lastBlending[3],
      );
  }
  setGl(t) {
    this.gl = t;
  }
  constructor() {
    (this._lastVertexAttribArrayEnabled = new Array(4)),
      (this._lastColorMask = new Array(4)),
      (this._lastBlending = new Array(4)),
      (this._lastViewport = new Array(4));
  }
}
class Ne extends ge {
  initialize(t, e = 1) {
    t.isUsingMasking() &&
    ((this._clippingManager = new we()),
      this._clippingManager.initialize(t, e)),
      this._sortedDrawableIndexList.resize(t.getDrawableCount(), 0),
      super.initialize(t);
  }
  bindTexture(t, e) {
    this._textures.setValue(t, e);
  }
  getBindedTextures() {
    return this._textures;
  }
  setClippingMaskBufferSize(t) {
    if (!this._model.isUsingMasking()) return;
    const e = this._clippingManager.getRenderTextureCount();
    this._clippingManager.release(),
      (this._clippingManager = void 0),
      (this._clippingManager = null),
      (this._clippingManager = new we()),
      this._clippingManager.setClippingMaskBufferSize(t),
      this._clippingManager.initialize(this.getModel(), e);
  }
  getClippingMaskBufferSize() {
    return this._model.isUsingMasking()
      ? this._clippingManager.getClippingMaskBufferSize()
      : -1;
  }
  getRenderTextureCount() {
    return this._model.isUsingMasking()
      ? this._clippingManager.getRenderTextureCount()
      : -1;
  }
  constructor() {
    super(),
      (this._clippingContextBufferForMask = null),
      (this._clippingContextBufferForDraw = null),
      (this._rendererProfile = new za()),
      (this.firstDraw = !0),
      (this._textures = new z()),
      (this._sortedDrawableIndexList = new x()),
      (this._bufferData = {
        vertex: (WebGLBuffer = null),
        uv: (WebGLBuffer = null),
        index: (WebGLBuffer = null),
      }),
      this._textures.prepareCapacity(32, !0);
  }
  release() {
    this._clippingManager &&
    (this._clippingManager.release(),
      (this._clippingManager = void 0),
      (this._clippingManager = null)),
      this.gl != null &&
      (this.gl.deleteBuffer(this._bufferData.vertex),
        (this._bufferData.vertex = null),
        this.gl.deleteBuffer(this._bufferData.uv),
        (this._bufferData.uv = null),
        this.gl.deleteBuffer(this._bufferData.index),
        (this._bufferData.index = null),
        (this._bufferData = null),
        (this._textures = null));
  }
  doDrawModel() {
    if (this.gl == null) {
      R(`'gl' is null. WebGLRenderingContext is required.
Please call 'CubimRenderer_WebGL.startUp' function.`);
      return;
    }
    this._clippingManager != null &&
    (this.preDraw(),
      this.isUsingHighPrecisionMask()
        ? this._clippingManager.setupMatrixForHighPrecision(this.getModel(), !1)
        : this._clippingManager.setupClippingContext(this.getModel(), this)),
      this.preDraw();
    const t = this.getModel().getDrawableCount(),
      e = this.getModel().getDrawableRenderOrders();
    for (let i = 0; i < t; ++i) {
      const s = e[i];
      this._sortedDrawableIndexList.set(s, i);
    }
    for (let i = 0; i < t; ++i) {
      const s = this._sortedDrawableIndexList.at(i);
      if (!this.getModel().getDrawableDynamicFlagIsVisible(s)) continue;
      const a = this._clippingManager != null
        ? this._clippingManager.getClippingContextListForDraw().at(s)
        : null;
      if (a != null && this.isUsingHighPrecisionMask()) {
        a._isUsing &&
          (this.gl.viewport(
            0,
            0,
            this._clippingManager.getClippingMaskBufferSize(),
            this._clippingManager.getClippingMaskBufferSize(),
          ),
            this.preDraw(),
            this.gl.bindFramebuffer(
              this.gl.FRAMEBUFFER,
              a.getClippingManager().getMaskRenderTexture().at(a._bufferIndex),
            ),
            this.gl.clearColor(1, 1, 1, 1),
            this.gl.clear(this.gl.COLOR_BUFFER_BIT));
        {
          const o = a._clippingIdCount;
          for (let n = 0; n < o; n++) {
            const l = a._clippingIdList[n];
            this._model.getDrawableDynamicFlagVertexPositionsDidChange(l) &&
              (this.setIsCulling(this._model.getDrawableCulling(l) != !1),
                this.setClippingContextBufferForMask(a),
                this.drawMeshWebGL(this._model, l));
          }
        }
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, he),
          this.setClippingContextBufferForMask(null),
          this.gl.viewport(Q[0], Q[1], Q[2], Q[3]),
          this.preDraw();
      }
      this.setClippingContextBufferForDraw(a),
        this.setIsCulling(this.getModel().getDrawableCulling(s)),
        this.drawMeshWebGL(this._model, s);
    }
  }
  drawMeshWebGL(t, e) {
    this.isCulling()
      ? this.gl.enable(this.gl.CULL_FACE)
      : this.gl.disable(this.gl.CULL_FACE),
      this.gl.frontFace(this.gl.CCW),
      this.isGeneratingMask()
        ? dt.getInstance().setupShaderProgramForMask(this, t, e)
        : dt.getInstance().setupShaderProgramForDraw(this, t, e);
    {
      const i = t.getDrawableVertexIndexCount(e);
      this.gl.drawElements(this.gl.TRIANGLES, i, this.gl.UNSIGNED_SHORT, 0);
    }
    this.gl.useProgram(null),
      this.setClippingContextBufferForDraw(null),
      this.setClippingContextBufferForMask(null);
  }
  saveProfile() {
    this._rendererProfile.save();
  }
  restoreProfile() {
    this._rendererProfile.restore();
  }
  static doStaticRelease() {
    dt.deleteInstance();
  }
  setRenderState(t, e) {
    (he = t), (Q = e);
  }
  preDraw() {
    if (
      (this.firstDraw && (this.firstDraw = !1),
        this.gl.disable(this.gl.SCISSOR_TEST),
        this.gl.disable(this.gl.STENCIL_TEST),
        this.gl.disable(this.gl.DEPTH_TEST),
        this.gl.frontFace(this.gl.CW),
        this.gl.enable(this.gl.BLEND),
        this.gl.colorMask(!0, !0, !0, !0),
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null),
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null),
        this.getAnisotropy() > 0 && this._extension)
    ) {
      for (let t = 0; t < this._textures.getSize(); ++t) {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this._textures.getValue(t)),
          this.gl.texParameterf(
            this.gl.TEXTURE_2D,
            this._extension.TEXTURE_MAX_ANISOTROPY_EXT,
            this.getAnisotropy(),
          );
      }
    }
  }
  setClippingContextBufferForMask(t) {
    this._clippingContextBufferForMask = t;
  }
  getClippingContextBufferForMask() {
    return this._clippingContextBufferForMask;
  }
  setClippingContextBufferForDraw(t) {
    this._clippingContextBufferForDraw = t;
  }
  getClippingContextBufferForDraw() {
    return this._clippingContextBufferForDraw;
  }
  isGeneratingMask() {
    return this.getClippingContextBufferForMask() != null;
  }
  startUp(t) {
    (this.gl = t),
      this._clippingManager && this._clippingManager.setGL(t),
      dt.getInstance().setGl(t),
      this._rendererProfile.setGl(t),
      (this._extension =
        this.gl.getExtension("EXT_texture_filter_anisotropic") ||
        this.gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
        this.gl.getExtension("MOZ_EXT_texture_filter_anisotropic"));
  }
}
ge.staticRelease = () => {
  Ne.doStaticRelease();
};
var Zi;
((r) => {
  (r.CubismClippingContext = ks),
    (r.CubismClippingManager_WebGL = we),
    (r.CubismRenderTextureResource = Os),
    (r.CubismRenderer_WebGL = Ne);
})(Zi || (Zi = {}));
class Qi {
  constructor(t = !1, e = new k()) {
    (this.isOverwritten = t), (this.color = e);
  }
}
class ts {
  constructor(t = !1, e = new k()) {
    (this.isOverwritten = t), (this.color = e);
  }
}
class Xa {
  constructor(t = !1, e = !1) {
    (this.isOverwritten = t), (this.isCulling = e);
  }
}
class Ns {
  update() {
    this._model.update(), this._model.drawables.resetDynamicFlags();
  }
  getPixelsPerUnit() {
    return this._model == null ? 0 : this._model.canvasinfo.PixelsPerUnit;
  }
  getCanvasWidth() {
    return this._model == null ? 0 : this._model.canvasinfo.CanvasWidth /
      this._model.canvasinfo.PixelsPerUnit;
  }
  getCanvasHeight() {
    return this._model == null ? 0 : this._model.canvasinfo.CanvasHeight /
      this._model.canvasinfo.PixelsPerUnit;
  }
  saveParameters() {
    const t = this._model.parameters.count,
      e = this._savedParameters.getSize();
    for (let i = 0; i < t; ++i) {
      i < e
        ? this._savedParameters.set(i, this._parameterValues[i])
        : this._savedParameters.pushBack(this._parameterValues[i]);
    }
  }
  getMultiplyColor(t) {
    return this.getOverwriteFlagForModelMultiplyColors() ||
        this.getOverwriteFlagForDrawableMultiplyColors(t)
      ? this._userMultiplyColors.at(t).color
      : this.getDrawableMultiplyColor(t);
  }
  getScreenColor(t) {
    return this.getOverwriteFlagForModelScreenColors() ||
        this.getOverwriteFlagForDrawableScreenColors(t)
      ? this._userScreenColors.at(t).color
      : this.getDrawableScreenColor(t);
  }
  setMultiplyColorByTextureColor(t, e) {
    this.setMultiplyColorByRGBA(t, e.r, e.g, e.b, e.a);
  }
  setMultiplyColorByRGBA(t, e, i, s, a = 1) {
    (this._userMultiplyColors.at(t).color.r = e),
      (this._userMultiplyColors.at(t).color.g = i),
      (this._userMultiplyColors.at(t).color.b = s),
      (this._userMultiplyColors.at(t).color.a = a);
  }
  setScreenColorByTextureColor(t, e) {
    this.setScreenColorByRGBA(t, e.r, e.g, e.b, e.a);
  }
  setScreenColorByRGBA(t, e, i, s, a = 1) {
    (this._userScreenColors.at(t).color.r = e),
      (this._userScreenColors.at(t).color.g = i),
      (this._userScreenColors.at(t).color.b = s),
      (this._userScreenColors.at(t).color.a = a);
  }
  getPartMultiplyColor(t) {
    return this._userPartMultiplyColors.at(t).color;
  }
  getPartScreenColor(t) {
    return this._userPartScreenColors.at(t).color;
  }
  setPartColor(t, e, i, s, a, o, n) {
    if (
      ((o.at(t).color.r = e),
        (o.at(t).color.g = i),
        (o.at(t).color.b = s),
        (o.at(t).color.a = a),
        o.at(t).isOverwritten)
    ) {
      for (let l = 0; l < this._partChildDrawables.at(t).getSize(); ++l) {
        const h = this._partChildDrawables.at(t).at(l);
        (n.at(h).color.r = e),
          (n.at(h).color.g = i),
          (n.at(h).color.b = s),
          (n.at(h).color.a = a);
      }
    }
  }
  setPartMultiplyColorByTextureColor(t, e) {
    this.setPartMultiplyColorByRGBA(t, e.r, e.g, e.b, e.a);
  }
  setPartMultiplyColorByRGBA(t, e, i, s, a) {
    this.setPartColor(
      t,
      e,
      i,
      s,
      a,
      this._userPartMultiplyColors,
      this._userMultiplyColors,
    );
  }
  setPartScreenColorByTextureColor(t, e) {
    this.setPartScreenColorByRGBA(t, e.r, e.g, e.b, e.a);
  }
  setPartScreenColorByRGBA(t, e, i, s, a) {
    this.setPartColor(
      t,
      e,
      i,
      s,
      a,
      this._userPartScreenColors,
      this._userScreenColors,
    );
  }
  getOverwriteFlagForModelMultiplyColors() {
    return this._isOverwrittenModelMultiplyColors;
  }
  getOverwriteFlagForModelScreenColors() {
    return this._isOverwrittenModelScreenColors;
  }
  setOverwriteFlagForModelMultiplyColors(t) {
    this._isOverwrittenModelMultiplyColors = t;
  }
  setOverwriteFlagForModelScreenColors(t) {
    this._isOverwrittenModelScreenColors = t;
  }
  getOverwriteFlagForDrawableMultiplyColors(t) {
    return this._userMultiplyColors.at(t).isOverwritten;
  }
  getOverwriteFlagForDrawableScreenColors(t) {
    return this._userScreenColors.at(t).isOverwritten;
  }
  setOverwriteFlagForDrawableMultiplyColors(t, e) {
    this._userMultiplyColors.at(t).isOverwritten = e;
  }
  setOverwriteFlagForDrawableScreenColors(t, e) {
    this._userScreenColors.at(t).isOverwritten = e;
  }
  getOverwriteColorForPartMultiplyColors(t) {
    return this._userPartMultiplyColors.at(t).isOverwritten;
  }
  getOverwriteColorForPartScreenColors(t) {
    return this._userPartScreenColors.at(t).isOverwritten;
  }
  setOverwriteColorForPartColors(t, e, i, s) {
    i.at(t).isOverwritten = e;
    for (let a = 0; a < this._partChildDrawables.at(t).getSize(); ++a) {
      const o = this._partChildDrawables.at(t).at(a);
      (s.at(o).isOverwritten = e),
        e &&
        ((s.at(o).color.r = i.at(t).color.r),
          (s.at(o).color.g = i.at(t).color.g),
          (s.at(o).color.b = i.at(t).color.b),
          (s.at(o).color.a = i.at(t).color.a));
    }
  }
  setOverwriteColorForPartMultiplyColors(t, e) {
    (this._userPartMultiplyColors.at(t).isOverwritten = e),
      this.setOverwriteColorForPartColors(
        t,
        e,
        this._userPartMultiplyColors,
        this._userMultiplyColors,
      );
  }
  setOverwriteColorForPartScreenColors(t, e) {
    (this._userPartScreenColors.at(t).isOverwritten = e),
      this.setOverwriteColorForPartColors(
        t,
        e,
        this._userPartScreenColors,
        this._userScreenColors,
      );
  }
  getDrawableCulling(t) {
    if (
      this.getOverwriteFlagForModelCullings() ||
      this.getOverwriteFlagForDrawableCullings(t)
    ) {
      return this._userCullings.at(t).isCulling;
    }
    const e = this._model.drawables.constantFlags;
    return !Live2DCubismCore.Utils.hasIsDoubleSidedBit(e[t]);
  }
  setDrawableCulling(t, e) {
    this._userCullings.at(t).isCulling = e;
  }
  getOverwriteFlagForModelCullings() {
    return this._isOverwrittenCullings;
  }
  setOverwriteFlagForModelCullings(t) {
    this._isOverwrittenCullings = t;
  }
  getOverwriteFlagForDrawableCullings(t) {
    return this._userCullings.at(t).isOverwritten;
  }
  setOverwriteFlagForDrawableCullings(t, e) {
    this._userCullings.at(t).isOverwritten = e;
  }
  getModelOapcity() {
    return this._modelOpacity;
  }
  setModelOapcity(t) {
    this._modelOpacity = t;
  }
  getModel() {
    return this._model;
  }
  getPartIndex(t) {
    let e;
    const i = this._model.parts.count;
    for (e = 0; e < i; ++e) if (t == this._partIds.at(e)) return e;
    return this._notExistPartId.isExist(t)
      ? this._notExistPartId.getValue(t)
      : ((e = i + this._notExistPartId.getSize()),
        this._notExistPartId.setValue(t, e),
        this._notExistPartOpacities.appendKey(e),
        e);
  }
  getPartId(t) {
    const e = this._model.parts.ids[t];
    return V.getIdManager().getId(e);
  }
  getPartCount() {
    return this._model.parts.count;
  }
  setPartOpacityByIndex(t, e) {
    if (this._notExistPartOpacities.isExist(t)) {
      this._notExistPartOpacities.setValue(t, e);
      return;
    }
    W(0 <= t && t < this.getPartCount()), (this._partOpacities[t] = e);
  }
  setPartOpacityById(t, e) {
    const i = this.getPartIndex(t);
    i < 0 || this.setPartOpacityByIndex(i, e);
  }
  getPartOpacityByIndex(t) {
    return this._notExistPartOpacities.isExist(t)
      ? this._notExistPartOpacities.getValue(t)
      : (W(0 <= t && t < this.getPartCount()), this._partOpacities[t]);
  }
  getPartOpacityById(t) {
    const e = this.getPartIndex(t);
    return e < 0 ? 0 : this.getPartOpacityByIndex(e);
  }
  getParameterIndex(t) {
    let e;
    const i = this._model.parameters.count;
    for (e = 0; e < i; ++e) if (t == this._parameterIds.at(e)) return e;
    return this._notExistParameterId.isExist(t)
      ? this._notExistParameterId.getValue(t)
      : ((e = this._model.parameters.count +
        this._notExistParameterId.getSize()),
        this._notExistParameterId.setValue(t, e),
        this._notExistParameterValues.appendKey(e),
        e);
  }
  getParameterCount() {
    return this._model.parameters.count;
  }
  getParameterType(t) {
    return this._model.parameters.types[t];
  }
  getParameterMaximumValue(t) {
    return this._model.parameters.maximumValues[t];
  }
  getParameterMinimumValue(t) {
    return this._model.parameters.minimumValues[t];
  }
  getParameterDefaultValue(t) {
    return this._model.parameters.defaultValues[t];
  }
  getParameterId(t) {
    return V.getIdManager().getId(this._model.parameters.ids[t]);
  }
  getParameterValueByIndex(t) {
    return this._notExistParameterValues.isExist(t)
      ? this._notExistParameterValues.getValue(t)
      : (W(0 <= t && t < this.getParameterCount()), this._parameterValues[t]);
  }
  getParameterValueById(t) {
    const e = this.getParameterIndex(t);
    return this.getParameterValueByIndex(e);
  }
  setParameterValueByIndex(t, e, i = 1) {
    if (this._notExistParameterValues.isExist(t)) {
      this._notExistParameterValues.setValue(
        t,
        i == 1
          ? e
          : this._notExistParameterValues.getValue(t) * (1 - i) + e * i,
      );
      return;
    }
    W(0 <= t && t < this.getParameterCount()),
      this._model.parameters.maximumValues[t] < e &&
      (e = this._model.parameters.maximumValues[t]),
      this._model.parameters.minimumValues[t] > e &&
      (e = this._model.parameters.minimumValues[t]),
      (this._parameterValues[t] = i == 1
        ? e
        : (this._parameterValues[t] = this._parameterValues[t] * (1 - i) +
          e * i));
  }
  setParameterValueById(t, e, i = 1) {
    const s = this.getParameterIndex(t);
    this.setParameterValueByIndex(s, e, i);
  }
  addParameterValueByIndex(t, e, i = 1) {
    this.setParameterValueByIndex(t, this.getParameterValueByIndex(t) + e * i);
  }
  addParameterValueById(t, e, i = 1) {
    const s = this.getParameterIndex(t);
    this.addParameterValueByIndex(s, e, i);
  }
  multiplyParameterValueById(t, e, i = 1) {
    const s = this.getParameterIndex(t);
    this.multiplyParameterValueByIndex(s, e, i);
  }
  multiplyParameterValueByIndex(t, e, i = 1) {
    this.setParameterValueByIndex(
      t,
      this.getParameterValueByIndex(t) * (1 + (e - 1) * i),
    );
  }
  getDrawableIndex(t) {
    const e = this._model.drawables.count;
    for (let i = 0; i < e; ++i) if (this._drawableIds.at(i) == t) return i;
    return -1;
  }
  getDrawableCount() {
    return this._model.drawables.count;
  }
  getDrawableId(t) {
    const e = this._model.drawables.ids;
    return V.getIdManager().getId(e[t]);
  }
  getDrawableRenderOrders() {
    return this._model.drawables.renderOrders;
  }
  getDrawableTextureIndices(t) {
    return this.getDrawableTextureIndex(t);
  }
  getDrawableTextureIndex(t) {
    return this._model.drawables.textureIndices[t];
  }
  getDrawableDynamicFlagVertexPositionsDidChange(t) {
    const e = this._model.drawables.dynamicFlags;
    return Live2DCubismCore.Utils.hasVertexPositionsDidChangeBit(e[t]);
  }
  getDrawableVertexIndexCount(t) {
    return this._model.drawables.indexCounts[t];
  }
  getDrawableVertexCount(t) {
    return this._model.drawables.vertexCounts[t];
  }
  getDrawableVertices(t) {
    return this.getDrawableVertexPositions(t);
  }
  getDrawableVertexIndices(t) {
    return this._model.drawables.indices[t];
  }
  getDrawableVertexPositions(t) {
    return this._model.drawables.vertexPositions[t];
  }
  getDrawableVertexUvs(t) {
    return this._model.drawables.vertexUvs[t];
  }
  getDrawableOpacity(t) {
    return this._model.drawables.opacities[t];
  }
  getDrawableMultiplyColor(t) {
    const e = this._model.drawables.multiplyColors,
      i = t * 4,
      s = new k();
    return (
      (s.r = e[i]), (s.g = e[i + 1]), (s.b = e[i + 2]), (s.a = e[i + 3]), s
    );
  }
  getDrawableScreenColor(t) {
    const e = this._model.drawables.screenColors,
      i = t * 4,
      s = new k();
    return (
      (s.r = e[i]), (s.g = e[i + 1]), (s.b = e[i + 2]), (s.a = e[i + 3]), s
    );
  }
  getDrawableParentPartIndex(t) {
    return this._model.drawables.parentPartIndices[t];
  }
  getDrawableBlendMode(t) {
    const e = this._model.drawables.constantFlags;
    return Live2DCubismCore.Utils.hasBlendAdditiveBit(e[t])
      ? ot.CubismBlendMode_Additive
      : Live2DCubismCore.Utils.hasBlendMultiplicativeBit(e[t])
      ? ot.CubismBlendMode_Multiplicative
      : ot.CubismBlendMode_Normal;
  }
  getDrawableInvertedMaskBit(t) {
    const e = this._model.drawables.constantFlags;
    return Live2DCubismCore.Utils.hasIsInvertedMaskBit(e[t]);
  }
  getDrawableMasks() {
    return this._model.drawables.masks;
  }
  getDrawableMaskCounts() {
    return this._model.drawables.maskCounts;
  }
  isUsingMasking() {
    for (let t = 0; t < this._model.drawables.count; ++t) {
      if (!(this._model.drawables.maskCounts[t] <= 0)) return !0;
    }
    return !1;
  }
  getDrawableDynamicFlagIsVisible(t) {
    const e = this._model.drawables.dynamicFlags;
    return Live2DCubismCore.Utils.hasIsVisibleBit(e[t]);
  }
  getDrawableDynamicFlagVisibilityDidChange(t) {
    const e = this._model.drawables.dynamicFlags;
    return Live2DCubismCore.Utils.hasVisibilityDidChangeBit(e[t]);
  }
  getDrawableDynamicFlagOpacityDidChange(t) {
    const e = this._model.drawables.dynamicFlags;
    return Live2DCubismCore.Utils.hasOpacityDidChangeBit(e[t]);
  }
  getDrawableDynamicFlagRenderOrderDidChange(t) {
    const e = this._model.drawables.dynamicFlags;
    return Live2DCubismCore.Utils.hasRenderOrderDidChangeBit(e[t]);
  }
  getDrawableDynamicFlagBlendColorDidChange(t) {
    const e = this._model.drawables.dynamicFlags;
    return Live2DCubismCore.Utils.hasBlendColorDidChangeBit(e[t]);
  }
  loadParameters() {
    let t = this._model.parameters.count;
    const e = this._savedParameters.getSize();
    t > e && (t = e);
    for (let i = 0; i < t; ++i) {
      this._parameterValues[i] = this._savedParameters.at(i);
    }
  }
  initialize() {
    W(this._model),
      (this._parameterValues = this._model.parameters.values),
      (this._partOpacities = this._model.parts.opacities),
      (this._parameterMaximumValues = this._model.parameters.maximumValues),
      (this._parameterMinimumValues = this._model.parameters.minimumValues);
    {
      const e = this._model.parameters.ids,
        i = this._model.parameters.count;
      this._parameterIds.prepareCapacity(i);
      for (let s = 0; s < i; ++s) {
        this._parameterIds.pushBack(V.getIdManager().getId(e[s]));
      }
    }
    const t = this._model.parts.count;
    {
      const e = this._model.parts.ids;
      this._partIds.prepareCapacity(t);
      for (let i = 0; i < t; ++i) {
        this._partIds.pushBack(V.getIdManager().getId(e[i]));
      }
      this._userPartMultiplyColors.prepareCapacity(t),
        this._userPartScreenColors.prepareCapacity(t),
        this._partChildDrawables.prepareCapacity(t);
    }
    {
      const e = this._model.drawables.ids,
        i = this._model.drawables.count;
      this._userMultiplyColors.prepareCapacity(i),
        this._userScreenColors.prepareCapacity(i),
        this._userCullings.prepareCapacity(i);
      const s = new Xa(!1, !1);
      for (let a = 0; a < t; ++a) {
        const o = new k(1, 1, 1, 1),
          n = new k(0, 0, 0, 1),
          l = new ts(!1, o),
          h = new ts(!1, n);
        this._userPartMultiplyColors.pushBack(l),
          this._userPartScreenColors.pushBack(h),
          this._partChildDrawables.pushBack(new x()),
          this._partChildDrawables.at(a).prepareCapacity(i);
      }
      for (let a = 0; a < i; ++a) {
        const o = new k(1, 1, 1, 1),
          n = new k(0, 0, 0, 1),
          l = new Qi(!1, o),
          h = new Qi(!1, n);
        this._drawableIds.pushBack(V.getIdManager().getId(e[a])),
          this._userMultiplyColors.pushBack(l),
          this._userScreenColors.pushBack(h),
          this._userCullings.pushBack(s);
        const u = this.getDrawableParentPartIndex(a);
        u >= 0 && this._partChildDrawables.at(u).pushBack(a);
      }
    }
  }
  constructor(t) {
    (this._model = t),
      (this._parameterValues = null),
      (this._parameterMaximumValues = null),
      (this._parameterMinimumValues = null),
      (this._partOpacities = null),
      (this._savedParameters = new x()),
      (this._parameterIds = new x()),
      (this._drawableIds = new x()),
      (this._partIds = new x()),
      (this._isOverwrittenModelMultiplyColors = !1),
      (this._isOverwrittenModelScreenColors = !1),
      (this._isOverwrittenCullings = !1),
      (this._modelOpacity = 1),
      (this._userMultiplyColors = new x()),
      (this._userScreenColors = new x()),
      (this._userCullings = new x()),
      (this._userPartMultiplyColors = new x()),
      (this._userPartScreenColors = new x()),
      (this._partChildDrawables = new x()),
      (this._notExistPartId = new z()),
      (this._notExistParameterId = new z()),
      (this._notExistParameterValues = new z()),
      (this._notExistPartOpacities = new z());
  }
  release() {
    this._model.release(), (this._model = null);
  }
}
var es;
((r) => {
  r.CubismModel = Ns;
})(es || (es = {}));
class qt {
  static create(t, e) {
    let i = null;
    if (e && !this.hasMocConsistency(t)) return R("Inconsistent MOC3."), i;
    const s = Live2DCubismCore.Moc.fromArrayBuffer(t);
    return (
      s &&
      ((i = new qt(s)),
        (i._mocVersion = Live2DCubismCore.Version.csmGetMocVersion(s, t))), i
    );
  }
  static delete(t) {
    t._moc._release(), (t._moc = null), (t = null);
  }
  createModel() {
    let t = null;
    const e = Live2DCubismCore.Model.fromMoc(this._moc);
    return e && ((t = new Ns(e)), t.initialize(), ++this._modelCount), t;
  }
  deleteModel(t) {
    t != null && (t.release(), (t = null), --this._modelCount);
  }
  constructor(t) {
    (this._moc = t), (this._modelCount = 0), (this._mocVersion = 0);
  }
  release() {
    W(this._modelCount == 0), this._moc._release(), (this._moc = null);
  }
  getLatestMocVersion() {
    return Live2DCubismCore.Version.csmGetLatestMocVersion();
  }
  getMocVersion() {
    return this._mocVersion;
  }
  static hasMocConsistency(t) {
    return Live2DCubismCore.Moc.prototype.hasMocConsistency(t) === 1;
  }
}
var is;
((r) => {
  r.CubismMoc = qt;
})(is || (is = {}));
const ss = "Meta",
  Ya = "UserDataCount",
  ja = "TotalUserDataSize",
  Be = "UserData",
  Ga = "Target",
  Ha = "Id",
  $a = "Value";
class Us {
  constructor(t, e) {
    this._json = L.create(t, e);
  }
  release() {
    L.delete(this._json);
  }
  getUserDataCount() {
    return this._json
      .getRoot()
      .getValueByString(ss)
      .getValueByString(Ya)
      .toInt();
  }
  getTotalUserDataSize() {
    return this._json
      .getRoot()
      .getValueByString(ss)
      .getValueByString(ja)
      .toInt();
  }
  getUserDataTargetType(t) {
    return this._json
      .getRoot()
      .getValueByString(Be)
      .getValueByIndex(t)
      .getValueByString(Ga)
      .getRawString();
  }
  getUserDataId(t) {
    return V.getIdManager().getId(
      this._json
        .getRoot()
        .getValueByString(Be)
        .getValueByIndex(t)
        .getValueByString(Ha)
        .getRawString(),
    );
  }
  getUserDataValue(t) {
    return this._json
      .getRoot()
      .getValueByString(Be)
      .getValueByIndex(t)
      .getValueByString($a)
      .getRawString();
  }
}
var rs;
((r) => {
  r.CubismModelUserDataJson = Us;
})(rs || (rs = {}));
const Wa = "ArtMesh";
class zs {}
class $t {
  static create(t, e) {
    const i = new $t();
    return i.parseUserData(t, e), i;
  }
  static delete(t) {
    t != null && (t.release(), (t = null));
  }
  getArtMeshUserDatas() {
    return this._artMeshUserDataNode;
  }
  parseUserData(t, e) {
    let i = new Us(t, e);
    if (!i) {
      i.release(), (i = void 0);
      return;
    }
    const s = V.getIdManager().getId(Wa),
      a = i.getUserDataCount();
    for (let o = 0; o < a; o++) {
      const n = new zs();
      (n.targetId = i.getUserDataId(o)),
        (n.targetType = V.getIdManager().getId(i.getUserDataTargetType(o))),
        (n.value = new Y(i.getUserDataValue(o))),
        this._userDataNodes.pushBack(n),
        n.targetType == s && this._artMeshUserDataNode.pushBack(n);
    }
    i.release(), (i = void 0);
  }
  constructor() {
    (this._userDataNodes = new x()), (this._artMeshUserDataNode = new x());
  }
  release() {
    for (let t = 0; t < this._userDataNodes.getSize(); ++t) {
      this._userDataNodes.set(t, null);
    }
    this._userDataNodes = null;
  }
}
var as;
((r) => {
  (r.CubismModelUserData = $t), (r.CubismModelUserDataNode = zs);
})(as || (as = {}));
class de {
  isInitialized() {
    return this._initialized;
  }
  setInitialized(t) {
    this._initialized = t;
  }
  isUpdating() {
    return this._updating;
  }
  setUpdating(t) {
    this._updating = t;
  }
  setDragging(t, e) {
    this._dragManager.set(t, e);
  }
  setAcceleration(t, e, i) {
    (this._accelerationX = t),
      (this._accelerationY = e),
      (this._accelerationZ = i);
  }
  getModelMatrix() {
    return this._modelMatrix;
  }
  setOpacity(t) {
    this._opacity = t;
  }
  getOpacity() {
    return this._opacity;
  }
  loadModel(t, e = !1) {
    if (((this._moc = qt.create(t, e)), this._moc == null)) {
      R("Failed to CubismMoc.create().");
      return;
    }
    if (((this._model = this._moc.createModel()), this._model == null)) {
      R("Failed to CreateModel().");
      return;
    }
    this._model.saveParameters(),
      (this._modelMatrix = new ms(
        this._model.getCanvasWidth(),
        this._model.getCanvasHeight(),
      ));
  }
  loadMotion(t, e, i, s) {
    return t == null || e == 0
      ? (R("Failed to loadMotion()."), null)
      : ce.create(t, e, s);
  }
  loadExpression(t, e, i) {
    return t == null || e == 0
      ? (R("Failed to loadExpression()."), null)
      : nt.create(t, e);
  }
  loadPose(t, e) {
    if (t == null || e == 0) {
      R("Failed to loadPose().");
      return;
    }
    this._pose = jt.create(t, e);
  }
  loadUserData(t, e) {
    if (t == null || e == 0) {
      R("Failed to loadUserData().");
      return;
    }
    this._modelUserData = $t.create(t, e);
  }
  loadPhysics(t, e) {
    if (t == null || e == 0) {
      R("Failed to loadPhysics().");
      return;
    }
    this._physics = Ht.create(t, e);
  }
  isHit(t, e, i) {
    const s = this._model.getDrawableIndex(t);
    if (s < 0) return !1;
    const a = this._model.getDrawableVertexCount(s),
      o = this._model.getDrawableVertices(s);
    let n = o[0],
      l = o[0],
      h = o[1],
      u = o[1];
    for (let g = 1; g < a; ++g) {
      const c = o[at.vertexOffset + g * at.vertexStep],
        f = o[at.vertexOffset + g * at.vertexStep + 1];
      c < n && (n = c), c > l && (l = c), f < h && (h = f), f > u && (u = f);
    }
    const d = this._modelMatrix.invertTransformX(e),
      _ = this._modelMatrix.invertTransformY(i);
    return n <= d && d <= l && h <= _ && _ <= u;
  }
  getModel() {
    return this._model;
  }
  getRenderer() {
    return this._renderer;
  }
  createRenderer(t = 1) {
    this._renderer && this.deleteRenderer(),
      (this._renderer = new Ne()),
      this._renderer.initialize(this._model, t);
  }
  deleteRenderer() {
    this._renderer != null &&
      (this._renderer.release(), (this._renderer = null));
  }
  motionEventFired(t) {
    q("{0}", t.s);
  }
  static cubismDefaultMotionEventCallback(t, e, i) {
    const s = i;
    s != null && s.motionEventFired(e);
  }
  constructor() {
    (this._moc = null),
      (this._model = null),
      (this._motionManager = null),
      (this._expressionManager = null),
      (this._eyeBlink = null),
      (this._breath = null),
      (this._modelMatrix = null),
      (this._pose = null),
      (this._dragManager = null),
      (this._physics = null),
      (this._modelUserData = null),
      (this._initialized = !1),
      (this._updating = !1),
      (this._opacity = 1),
      (this._lipsync = !0),
      (this._lastLipSyncValue = 0),
      (this._dragX = 0),
      (this._dragY = 0),
      (this._accelerationX = 0),
      (this._accelerationY = 0),
      (this._accelerationZ = 0),
      (this._mocConsistency = !1),
      (this._debugMode = !1),
      (this._renderer = null),
      (this._motionManager = new Is()),
      this._motionManager.setEventCallback(
        de.cubismDefaultMotionEventCallback,
        this,
      ),
      (this._expressionManager = new xs()),
      (this._dragManager = new ps());
  }
  release() {
    this._motionManager != null &&
    (this._motionManager.release(), (this._motionManager = null)),
      this._expressionManager != null &&
      (this._expressionManager.release(), (this._expressionManager = null)),
      this._moc != null &&
      (this._moc.deleteModel(this._model),
        this._moc.release(),
        (this._moc = null)),
      (this._modelMatrix = null),
      jt.delete(this._pose),
      Yt.delete(this._eyeBlink),
      Wt.delete(this._breath),
      (this._dragManager = null),
      Ht.delete(this._physics),
      $t.delete(this._modelUserData),
      this.deleteRenderer();
  }
}
var ns;
((r) => {
  r.CubismUserModel = de;
})(ns || (ns = {}));
const It = class It {
  static loadFileAsBytes(t, e) {
    fetch(t)
      .then((i) => i.arrayBuffer())
      .then((i) => e(i, i.byteLength));
  }
  static getDeltaTime() {
    return this.s_deltaTime;
  }
  static updateTime() {
    (this.s_currentFrame = Date.now()),
      (this.s_deltaTime = (this.s_currentFrame - this.s_lastFrame) / 1e3),
      (this.s_lastFrame = this.s_currentFrame);
  }
  static printMessage(t) {
    console.log(t);
  }
};
(It.lastUpdate = Date.now()),
  (It.s_currentFrame = 0),
  (It.s_lastFrame = 0),
  (It.s_deltaTime = 0);
let T = It,
  Pt = null;
class Ue {
  constructor() {
    (this._loadFiletoBytes = (t, e) => {
      (this._byteReader._fileByte = t),
        (this._byteReader._fileDataView = new DataView(
          this._byteReader._fileByte,
        )),
        (this._byteReader._fileSize = e);
    }),
      (this._pcmData = null),
      (this._userTimeSeconds = 0),
      (this._lastRms = 0),
      (this._sampleOffset = 0),
      (this._wavFileInfo = new qa()),
      (this._byteReader = new Ja());
  }
  static getInstance() {
    return Pt == null && (Pt = new Ue()), Pt;
  }
  static releaseInstance() {
    Pt != null && (Pt = void 0), (Pt = null);
  }
  update(t) {
    let e, i;
    if (
      this._pcmData == null ||
      this._sampleOffset >= this._wavFileInfo._samplesPerChannel
    ) {
      return (this._lastRms = 0), !1;
    }
    (this._userTimeSeconds += t),
      (e = Math.floor(this._userTimeSeconds * this._wavFileInfo._samplingRate)),
      e > this._wavFileInfo._samplesPerChannel &&
      (e = this._wavFileInfo._samplesPerChannel),
      (i = 0);
    for (let s = 0; s < this._wavFileInfo._numberOfChannels; s++) {
      for (let a = this._sampleOffset; a < e; a++) {
        const o = this._pcmData[s][a];
        i += o * o;
      }
    }
    return (
      (i = Math.sqrt(
        i / (this._wavFileInfo._numberOfChannels * (e - this._sampleOffset)),
      )),
        (this._lastRms = i),
        (this._sampleOffset = e),
        !0
    );
  }
  start(t) {
    (this._sampleOffset = 0),
      (this._userTimeSeconds = 0),
      (this._lastRms = 0),
      this.loadWavFile(t);
  }
  getRms() {
    return this._lastRms;
  }
  loadWavFile(t) {
    return new Promise((e) => {
      let i = !1;
      this._pcmData != null && this.releasePcmData();
      const s = async () => fetch(t).then((a) => a.arrayBuffer());
      (async () => {
        if (
          ((this._byteReader._fileByte = await s()),
            (this._byteReader._fileDataView = new DataView(
              this._byteReader._fileByte,
            )),
            (this._byteReader._fileSize =
              this._byteReader._fileByte.byteLength),
            (this._byteReader._readOffset = 0),
            this._byteReader._fileByte == null ||
            this._byteReader._fileSize < 4)
        ) {
          e(!1);
          return;
        }
        this._wavFileInfo._fileName = t;
        try {
          if (!this._byteReader.getCheckSignature("RIFF")) {
            throw ((i = !1), new Error('Cannot find Signeture "RIFF".'));
          }
          if (
            (this._byteReader.get32LittleEndian(),
              !this._byteReader.getCheckSignature("WAVE"))
          ) {
            throw ((i = !1), new Error('Cannot find Signeture "WAVE".'));
          }
          if (!this._byteReader.getCheckSignature("fmt ")) {
            throw ((i = !1), new Error('Cannot find Signeture "fmt".'));
          }
          const a = this._byteReader.get32LittleEndian();
          if (this._byteReader.get16LittleEndian() != 1) {
            throw ((i = !1), new Error("File is not linear PCM."));
          }
          for (
            this._wavFileInfo._numberOfChannels = this._byteReader
              .get16LittleEndian(),
              this._wavFileInfo._samplingRate = this._byteReader
                .get32LittleEndian(),
              this._byteReader.get32LittleEndian(),
              this._byteReader.get16LittleEndian(),
              this._wavFileInfo._bitsPerSample = this._byteReader
                .get16LittleEndian(),
              a > 16 && (this._byteReader._readOffset += a - 16);
            !this._byteReader.getCheckSignature("data") &&
            this._byteReader._readOffset < this._byteReader._fileSize;
          ) {
            this._byteReader._readOffset +=
              this._byteReader.get32LittleEndian() + 4;
          }
          if (this._byteReader._readOffset >= this._byteReader._fileSize) {
            throw ((i = !1), new Error('Cannot find "data" Chunk.'));
          }
          {
            const o = this._byteReader.get32LittleEndian();
            this._wavFileInfo._samplesPerChannel = (o * 8) /
              (this._wavFileInfo._bitsPerSample *
                this._wavFileInfo._numberOfChannels);
          }
          this._pcmData = new Array(this._wavFileInfo._numberOfChannels);
          for (let o = 0; o < this._wavFileInfo._numberOfChannels; o++) {
            this._pcmData[o] = new Float32Array(
              this._wavFileInfo._samplesPerChannel,
            );
          }
          for (let o = 0; o < this._wavFileInfo._samplesPerChannel; o++) {
            for (let n = 0; n < this._wavFileInfo._numberOfChannels; n++) {
              this._pcmData[n][o] = this.getPcmSample();
            }
          }
          (i = !0), e(i);
        } catch (a) {
          console.log(a);
        }
      })().then(() => {
        e(i);
      });
    });
  }
  getPcmSample() {
    let t;
    switch (this._wavFileInfo._bitsPerSample) {
      case 8:
        (t = this._byteReader.get8() - 128), (t <<= 24);
        break;
      case 16:
        t = this._byteReader.get16LittleEndian() << 16;
        break;
      case 24:
        t = this._byteReader.get24LittleEndian() << 8;
        break;
      default:
        t = 0;
        break;
    }
    return t / 2147483647;
  }
  getPcmDataChannel(t) {
    return !this._pcmData || !(t < this._pcmData.length)
      ? null
      : Float32Array.from(this._pcmData[t]);
  }
  getWavSamplingRate() {
    return !this._wavFileInfo || this._wavFileInfo._samplingRate < 1
      ? null
      : this._wavFileInfo._samplingRate;
  }
  releasePcmData() {
    for (let t = 0; t < this._wavFileInfo._numberOfChannels; t++) {
      delete this._pcmData[t];
    }
    delete this._pcmData, (this._pcmData = null);
  }
}
class qa {
  constructor() {
    (this._fileName = ""),
      (this._numberOfChannels = 0),
      (this._bitsPerSample = 0),
      (this._samplingRate = 0),
      (this._samplesPerChannel = 0);
  }
}
class Ja {
  constructor() {
    (this._fileByte = null),
      (this._fileDataView = null),
      (this._fileSize = 0),
      (this._readOffset = 0);
  }
  get8() {
    const t = this._fileDataView.getUint8(this._readOffset);
    return this._readOffset++, t;
  }
  get16LittleEndian() {
    const t = (this._fileDataView.getUint8(this._readOffset + 1) << 8) |
      this._fileDataView.getUint8(this._readOffset);
    return (this._readOffset += 2), t;
  }
  get24LittleEndian() {
    const t = (this._fileDataView.getUint8(this._readOffset + 2) << 16) |
      (this._fileDataView.getUint8(this._readOffset + 1) << 8) |
      this._fileDataView.getUint8(this._readOffset);
    return (this._readOffset += 3), t;
  }
  get32LittleEndian() {
    const t = (this._fileDataView.getUint8(this._readOffset + 3) << 24) |
      (this._fileDataView.getUint8(this._readOffset + 2) << 16) |
      (this._fileDataView.getUint8(this._readOffset + 1) << 8) |
      this._fileDataView.getUint8(this._readOffset);
    return (this._readOffset += 4), t;
  }
  getCheckSignature(t) {
    const e = new Uint8Array(4),
      i = new TextEncoder().encode(t);
    if (t.length != 4) return !1;
    for (let s = 0; s < 4; s++) e[s] = this.get8();
    return e[0] == i[0] && e[1] == i[1] && e[2] == i[2] && e[3] == i[3];
  }
}
class Ka extends de {
  loadAssets(t, e) {
    (this._modelHomeDir = t),
      fetch(`${this._modelHomeDir}${e}`)
        .then((i) => i.arrayBuffer())
        .then((i) => {
          const s = new ds(i, i.byteLength);
          (this._state = 1), this.setupModel(s);
        })
        .catch((i) => {
          R(`Failed to load file ${this._modelHomeDir}${e}`);
        });
  }
  setupModel(t) {
    if (
      ((this._updating = !0),
        (this._initialized = !1),
        (this._modelSetting = t),
        this._modelSetting.getModelFileName() != "")
    ) {
      const _ = this._modelSetting.getModelFileName();
      fetch(`${this._modelHomeDir}${_}`)
        .then((g) => {
          if (g.ok) return g.arrayBuffer();
          if (g.status >= 400) {
            return (
              R(`Failed to load file ${this._modelHomeDir}${_}`),
                new ArrayBuffer(0)
            );
          }
        })
        .then((g) => {
          this.loadModel(g, this._mocConsistency), (this._state = 3), e();
        }), (this._state = 2);
    } else T.printMessage("Model data does not exist.");
    const e = () => {
        if (this._modelSetting.getExpressionCount() > 0) {
          const _ = this._modelSetting.getExpressionCount();
          for (let g = 0; g < _; g++) {
            const c = this._modelSetting.getExpressionName(g),
              f = this._modelSetting.getExpressionFileName(g);
            fetch(`${this._modelHomeDir}${f}`)
              .then((p) => {
                if (p.ok) return p.arrayBuffer();
                if (p.status >= 400) {
                  return (
                    R(`Failed to load file ${this._modelHomeDir}${f}`),
                      new ArrayBuffer(0)
                  );
                }
              })
              .then((p) => {
                const S = this.loadExpression(p, p.byteLength, c);
                this._expressions.getValue(c) != null &&
                (Ft.delete(this._expressions.getValue(c)),
                  this._expressions.setValue(c, null)),
                  this._expressions.setValue(c, S),
                  this._expressionCount++,
                  this._expressionCount >= _ && ((this._state = 5), i());
              });
          }
          this._state = 4;
        } else (this._state = 5), i();
      },
      i = () => {
        if (this._modelSetting.getPhysicsFileName() != "") {
          const _ = this._modelSetting.getPhysicsFileName();
          fetch(`${this._modelHomeDir}${_}`)
            .then((g) => {
              if (g.ok) return g.arrayBuffer();
              if (g.status >= 400) {
                return (
                  R(`Failed to load file ${this._modelHomeDir}${_}`),
                    new ArrayBuffer(0)
                );
              }
            })
            .then((g) => {
              this.loadPhysics(g, g.byteLength), (this._state = 7), s();
            }), (this._state = 6);
        } else (this._state = 7), s();
      },
      s = () => {
        if (this._modelSetting.getPoseFileName() != "") {
          const _ = this._modelSetting.getPoseFileName();
          fetch(`${this._modelHomeDir}${_}`)
            .then((g) => {
              if (g.ok) return g.arrayBuffer();
              if (g.status >= 400) {
                return (
                  R(`Failed to load file ${this._modelHomeDir}${_}`),
                    new ArrayBuffer(0)
                );
              }
            })
            .then((g) => {
              this.loadPose(g, g.byteLength), (this._state = 9), a();
            }), (this._state = 8);
        } else (this._state = 9), a();
      },
      a = () => {
        this._modelSetting.getEyeBlinkParameterCount() > 0 &&
        ((this._eyeBlink = Yt.create(this._modelSetting)), (this._state = 10)),
          o();
      },
      o = () => {
        this._breath = Wt.create();
        const _ = new x();
        _.pushBack(new vt(this._idParamAngleX, 0, 15, 6.5345, 0.5)),
          _.pushBack(new vt(this._idParamAngleY, 0, 8, 3.5345, 0.5)),
          _.pushBack(new vt(this._idParamAngleZ, 0, 10, 5.5345, 0.5)),
          _.pushBack(new vt(this._idParamBodyAngleX, 0, 4, 15.5345, 0.5)),
          _.pushBack(
            new vt(V.getIdManager().getId(C.ParamBreath), 0.5, 0.5, 3.2345, 1),
          ),
          this._breath.setParameters(_),
          (this._state = 11),
          n();
      },
      n = () => {
        if (this._modelSetting.getUserDataFile() != "") {
          const _ = this._modelSetting.getUserDataFile();
          fetch(`${this._modelHomeDir}${_}`)
            .then((g) => {
              if (g.ok) return g.arrayBuffer();
              if (g.status >= 400) {
                return (
                  R(`Failed to load file ${this._modelHomeDir}${_}`),
                    new ArrayBuffer(0)
                );
              }
            })
            .then((g) => {
              this.loadUserData(g, g.byteLength), (this._state = 13), l();
            }), (this._state = 12);
        } else (this._state = 13), l();
      },
      l = () => {
        const _ = this._modelSetting.getEyeBlinkParameterCount();
        for (let g = 0; g < _; ++g) {
          this._eyeBlinkIds.pushBack(
            this._modelSetting.getEyeBlinkParameterId(g),
          );
        }
        (this._state = 14), h();
      },
      h = () => {
        const _ = this._modelSetting.getLipSyncParameterCount();
        for (let g = 0; g < _; ++g) {
          this._lipSyncIds.pushBack(
            this._modelSetting.getLipSyncParameterId(g),
          );
        }
        (this._state = 15), u();
      },
      u = () => {
        const _ = new z();
        if (this._modelSetting == null || this._modelMatrix == null) {
          R("Failed to setupLayout().");
          return;
        }
        this._modelSetting.getLayoutMap(_),
          this._modelMatrix.setupFromLayout(_),
          (this._state = 16),
          d();
      },
      d = () => {
        (this._state = 17),
          this._model.saveParameters(),
          (this._allMotionCount = 0),
          (this._motionCount = 0);
        const _ = [],
          g = this._modelSetting.getMotionGroupCount();
        for (let c = 0; c < g; c++) {
          (_[c] = this._modelSetting.getMotionGroupName(c)),
            (this._allMotionCount += this._modelSetting.getMotionCount(_[c]));
        }
        for (let c = 0; c < g; c++) this.preLoadMotionGroup(_[c]);
        g == 0 &&
          ((this._state = 20),
            this._motionManager.stopAllMotions(),
            (this._updating = !1),
            (this._initialized = !0),
            this.createRenderer(),
            this.setupTextures(),
            this.getRenderer().startUp(m));
      };
  }
  setupTextures() {
    if (this._state == 20) {
      const e = this._modelSetting.getTextureCount();
      for (let i = 0; i < e; i++) {
        if (this._modelSetting.getTextureFileName(i) == "") {
          console.log("getTextureFileName null");
          continue;
        }
        let s = this._modelSetting.getTextureFileName(i);
        s = this._modelHomeDir + s;
        const a = (o) => {
          this.getRenderer().bindTexture(i, o.id),
            this._textureCount++,
            this._textureCount >= e && (this._state = 22);
        };
        w.getInstance().getTextureManager().createTextureFromPngFile(s, !0, a),
          this.getRenderer().setIsPremultipliedAlpha(!0);
      }
      this._state = 21;
    }
  }
  reloadRenderer() {
    this.deleteRenderer(), this.createRenderer(), this.setupTextures();
  }
  update() {
    if (this._state != 22) return;
    const t = T.getDeltaTime();
    (this._userTimeSeconds += t),
      this._dragManager.update(t),
      (this._dragX = this._dragManager.getX()),
      (this._dragY = this._dragManager.getY());
    let e = !1;
    if (
      (this._model.loadParameters(),
        this._motionManager.isFinished()
          ? this.startRandomMotion(ar, or)
          : (e = this._motionManager.updateMotion(this._model, t)),
        this._model.saveParameters(),
        e ||
        (this._eyeBlink != null &&
          this._eyeBlink.updateParameters(this._model, t)),
        this._expressionManager != null &&
        this._expressionManager.updateMotion(this._model, t),
        this._model.addParameterValueById(
          this._idParamAngleX,
          this._dragX * 30,
        ),
        this._model.addParameterValueById(
          this._idParamAngleY,
          this._dragY * 30,
        ),
        this._model.addParameterValueById(
          this._idParamAngleZ,
          this._dragX * this._dragY * -30,
        ),
        this._model.addParameterValueById(
          this._idParamBodyAngleX,
          this._dragX * 10,
        ),
        this._model.addParameterValueById(this._idParamEyeBallX, this._dragX),
        this._model.addParameterValueById(this._idParamEyeBallY, this._dragY),
        this._breath != null && this._breath.updateParameters(this._model, t),
        this._physics != null && this._physics.evaluate(this._model, t),
        this._lipsync)
    ) {
      let i = 0;
      this._wavFileHandler.update(t), (i = this._wavFileHandler.getRms());
      for (let s = 0; s < this._lipSyncIds.getSize(); ++s) {
        this._model.addParameterValueById(this._lipSyncIds.at(s), i, 0.8);
      }
    }
    this._pose != null && this._pose.updateParameters(this._model, t),
      this._model.update();
  }
  startMotion(t, e, i, s) {
    if (i == ei) this._motionManager.setReservePriority(i);
    else if (!this._motionManager.reserveMotion(i)) {
      return this._debugMode && T.printMessage("[APP]can't start motion."), le;
    }
    const a = this._modelSetting.getMotionFileName(t, e),
      o = `${t}_${e}`;
    let n = this._motions.getValue(o),
      l = !1;
    n == null
      ? fetch(`${this._modelHomeDir}${a}`)
        .then((u) => {
          if (u.ok) return u.arrayBuffer();
          if (u.status >= 400) {
            return (
              R(`Failed to load file ${this._modelHomeDir}${a}`),
                new ArrayBuffer(0)
            );
          }
        })
        .then((u) => {
          if (((n = this.loadMotion(u, u.byteLength, null, s)), n == null)) {
            return;
          }
          let d = this._modelSetting.getMotionFadeInTimeValue(t, e);
          d >= 0 && n.setFadeInTime(d),
            (d = this._modelSetting.getMotionFadeOutTimeValue(t, e)),
            d >= 0 && n.setFadeOutTime(d),
            n.setEffectIds(this._eyeBlinkIds, this._lipSyncIds),
            (l = !0);
        })
      : n.setFinishedMotionHandler(s);
    const h = this._modelSetting.getMotionSoundFileName(t, e);
    if (h.localeCompare("") != 0) {
      let u = h;
      (u = this._modelHomeDir + u), this._wavFileHandler.start(u);
    }
    return (
      this._debugMode && T.printMessage(`[APP]start motion: [${t}_${e}`),
        this._motionManager.startMotionPriority(n, l, i)
    );
  }
  startRandomMotion(t, e, i) {
    if (this._modelSetting.getMotionCount(t) == 0) return le;
    const s = Math.floor(Math.random() * this._modelSetting.getMotionCount(t));
    return this.startMotion(t, s, e, i);
  }
  setExpression(t) {
    const e = this._expressions.getValue(t);
    this._debugMode && T.printMessage(`[APP]expression: [${t}]`),
      e != null
        ? this._expressionManager.startMotionPriority(e, !1, ei)
        : this._debugMode && T.printMessage(`[APP]expression[${t}] is null`);
  }
  setRandomExpression() {
    if (this._expressions.getSize() == 0) return;
    const t = Math.floor(Math.random() * this._expressions.getSize());
    for (let e = 0; e < this._expressions.getSize(); e++) {
      if (e == t) {
        const i = this._expressions._keyValues[e].first;
        this.setExpression(i);
        return;
      }
    }
  }
  motionEventFired(t) {
    q("{0} is fired on LAppModel!!", t.s);
  }
  hitTest(t, e, i) {
    if (this._opacity < 1) return !1;
    const s = this._modelSetting.getHitAreasCount();
    for (let a = 0; a < s; a++) {
      if (this._modelSetting.getHitAreaName(a) == t) {
        const o = this._modelSetting.getHitAreaId(a);
        return this.isHit(o, e, i);
      }
    }
    return !1;
  }
  preLoadMotionGroup(t) {
    for (let e = 0; e < this._modelSetting.getMotionCount(t); e++) {
      const i = this._modelSetting.getMotionFileName(t, e),
        s = `${t}_${e}`;
      this._debugMode && T.printMessage(`[APP]load motion: ${i} => [${s}]`),
        fetch(`${this._modelHomeDir}${i}`)
          .then((a) => {
            if (a.ok) return a.arrayBuffer();
            if (a.status >= 400) {
              return (
                R(`Failed to load file ${this._modelHomeDir}${i}`),
                  new ArrayBuffer(0)
              );
            }
          })
          .then((a) => {
            const o = this.loadMotion(a, a.byteLength, s);
            if (o != null) {
              let n = this._modelSetting.getMotionFadeInTimeValue(t, e);
              n >= 0 && o.setFadeInTime(n),
                (n = this._modelSetting.getMotionFadeOutTimeValue(t, e)),
                n >= 0 && o.setFadeOutTime(n),
                o.setEffectIds(this._eyeBlinkIds, this._lipSyncIds),
                this._motions.getValue(s) != null &&
                Ft.delete(this._motions.getValue(s)),
                this._motions.setValue(s, o),
                this._motionCount++,
                this._motionCount >= this._allMotionCount &&
                ((this._state = 20),
                  this._motionManager.stopAllMotions(),
                  (this._updating = !1),
                  (this._initialized = !0),
                  this.createRenderer(),
                  this.setupTextures(),
                  this.getRenderer().startUp(m));
            } else this._allMotionCount--;
          });
    }
  }
  releaseMotions() {
    this._motions.clear();
  }
  releaseExpressions() {
    this._expressions.clear();
  }
  doDraw() {
    if (this._model == null) return;
    const t = [0, 0, E.width, E.height];
    this.getRenderer().setRenderState(Re, t), this.getRenderer().drawModel();
  }
  draw(t) {
    this._model != null &&
      this._state == 22 &&
      (t.multiplyByMatrix(this._modelMatrix),
        this.getRenderer().setMvpMatrix(t),
        this.doDraw());
  }
  async hasMocConsistencyFromFile() {
    if (
      (W(this._modelSetting.getModelFileName().localeCompare("")),
        this._modelSetting.getModelFileName() != "")
    ) {
      const t = this._modelSetting.getModelFileName(),
        i = await (await fetch(`${this._modelHomeDir}${t}`)).arrayBuffer();
      return (
        (this._consistency = qt.hasMocConsistency(i)),
          this._consistency ? q("Consistent MOC3.") : q("Inconsistent MOC3."),
          this._consistency
      );
    } else T.printMessage("Model data does not exist.");
  }
  constructor() {
    super(),
      (this._modelSetting = null),
      (this._modelHomeDir = null),
      (this._userTimeSeconds = 0),
      (this._eyeBlinkIds = new x()),
      (this._lipSyncIds = new x()),
      (this._motions = new z()),
      (this._expressions = new z()),
      (this._hitArea = new x()),
      (this._userArea = new x()),
      (this._idParamAngleX = V.getIdManager().getId(C.ParamAngleX)),
      (this._idParamAngleY = V.getIdManager().getId(C.ParamAngleY)),
      (this._idParamAngleZ = V.getIdManager().getId(C.ParamAngleZ)),
      (this._idParamEyeBallX = V.getIdManager().getId(C.ParamEyeBallX)),
      (this._idParamEyeBallY = V.getIdManager().getId(C.ParamEyeBallY)),
      (this._idParamBodyAngleX = V.getIdManager().getId(C.ParamBodyAngleX)),
      (this._mocConsistency = !0),
      (this._state = 0),
      (this._expressionCount = 0),
      (this._textureCount = 0),
      (this._motionCount = 0),
      (this._allMotionCount = 0),
      (this._wavFileHandler = new Ue()),
      (this._consistency = !1);
  }
}
let Bt = null;
class mt {
  constructor() {
    (this._finishedMotion = (t) => {
      T.printMessage("Motion Finished:"), console.log(t);
    }),
      (this._viewMatrix = new A()),
      (this._models = new x()),
      (this._sceneIndex = 0),
      this.changeScene(this._sceneIndex);
  }
  static getInstance() {
    return Bt == null && (Bt = new mt()), Bt;
  }
  static releaseInstance() {
    Bt != null && (Bt = void 0), (Bt = null);
  }
  getModel(t) {
    return t < this._models.getSize() ? this._models.at(t) : null;
  }
  releaseAllModel() {
    for (let t = 0; t < this._models.getSize(); t++) {
      this._models.at(t).release(), this._models.set(t, null);
    }
    this._models.clear();
  }
  onDrag(t, e) {
    for (let i = 0; i < this._models.getSize(); i++) {
      const s = this.getModel(i);
      s && s.setDragging(t, e);
    }
  }
  onTap(t, e) {
    T.printMessage(`[APP]tap point: {x: ${t.toFixed(2)} y: ${e.toFixed(2)}}`);
    for (let i = 0; i < this._models.getSize(); i++) {
      this._models.at(i).hitTest(Qe, t, e)
        ? (T.printMessage(`[APP]hit area: [${Qe}]`),
          this._models.at(i).setRandomExpression())
        : this._models.at(i).hitTest(ti, t, e) &&
          (T.printMessage(`[APP]hit area: [${ti}]`),
            this._models.at(i).startRandomMotion(nr, lr, this._finishedMotion));
    }
  }
  onUpdate() {
    const { width: t, height: e } = E,
      i = this._models.getSize();
    for (let s = 0; s < i; ++s) {
      const a = new A(),
        o = this.getModel(s);
      o.getModel() &&
      (o.getModel().getCanvasWidth() > 1 && t < e
        ? (o.getModelMatrix().setWidth(2), a.scale(1, t / e))
        : a.scale(e / t, 1),
        this._viewMatrix != null && a.multiplyByMatrix(this._viewMatrix)),
        o.update(),
        o.draw(a);
    }
  }
  nextScene() {
    const t = (this._sceneIndex + 1) % rr;
    this.changeScene(t);
  }
  changeScene(t) {
    (this._sceneIndex = t),
      T.printMessage(`[APP]model index: ${this._sceneIndex}`);
    const e = be[t],
      i = gs + e + "/";
    let s = be[t];
    (s += ".model3.json"),
      this.releaseAllModel(),
      this._models.pushBack(new Ka()),
      this._models.at(0).loadAssets(i, s);
  }
  setViewMatrix(t) {
    for (let e = 0; e < 16; e++) {
      this._viewMatrix.getArray()[e] = t.getArray()[e];
    }
  }
}
class Za {
  constructor() {
    this._textures = new x();
  }
  release() {
    for (
      let t = this._textures.begin();
      t.notEqual(this._textures.end());
      t.preIncrement()
    ) {
      m.deleteTexture(t.ptr().id);
    }
    this._textures = null;
  }
  createTextureFromPngFile(t, e, i) {
    for (
      let a = this._textures.begin();
      a.notEqual(this._textures.end());
      a.preIncrement()
    ) {
      if (a.ptr().fileName == t && a.ptr().usePremultply == e) {
        (a.ptr().img = new Image()),
          a
            .ptr()
            .img.addEventListener("load", () => i(a.ptr()), { passive: !0 }),
          (a.ptr().img.src = t);
        return;
      }
    }
    const s = new Image();
    s.addEventListener(
      "load",
      () => {
        const a = m.createTexture();
        m.bindTexture(m.TEXTURE_2D, a),
          m.texParameteri(
            m.TEXTURE_2D,
            m.TEXTURE_MIN_FILTER,
            m.LINEAR_MIPMAP_LINEAR,
          ),
          m.texParameteri(m.TEXTURE_2D, m.TEXTURE_MAG_FILTER, m.LINEAR),
          e && m.pixelStorei(m.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1),
          m.texImage2D(m.TEXTURE_2D, 0, m.RGBA, m.RGBA, m.UNSIGNED_BYTE, s),
          m.generateMipmap(m.TEXTURE_2D),
          m.bindTexture(m.TEXTURE_2D, null);
        const o = new Qa();
        o != null &&
        ((o.fileName = t),
          (o.width = s.width),
          (o.height = s.height),
          (o.id = a),
          (o.img = s),
          (o.usePremultply = e),
          this._textures.pushBack(o)), i(o);
      },
      { passive: !0 },
    ), (s.src = t);
  }
  releaseTextures() {
    for (let t = 0; t < this._textures.getSize(); t++) {
      this._textures.set(t, null);
    }
    this._textures.clear();
  }
  releaseTextureByTexture(t) {
    for (let e = 0; e < this._textures.getSize(); e++) {
      if (this._textures.at(e).id == t) {
        this._textures.set(e, null), this._textures.remove(e);
        break;
      }
    }
  }
  releaseTextureByFilePath(t) {
    for (let e = 0; e < this._textures.getSize(); e++) {
      if (this._textures.at(e).fileName == t) {
        this._textures.set(e, null), this._textures.remove(e);
        break;
      }
    }
  }
}
class Qa {
  constructor() {
    (this.id = null), (this.width = 0), (this.height = 0);
  }
}
class Xs extends A {
  constructor() {
    super(),
      (this._screenLeft = 0),
      (this._screenRight = 0),
      (this._screenTop = 0),
      (this._screenBottom = 0),
      (this._maxLeft = 0),
      (this._maxRight = 0),
      (this._maxTop = 0),
      (this._maxBottom = 0),
      (this._maxScale = 0),
      (this._minScale = 0);
  }
  adjustTranslate(t, e) {
    this._tr[0] * this._maxLeft + (this._tr[12] + t) > this._screenLeft &&
    (t = this._screenLeft - this._tr[0] * this._maxLeft - this._tr[12]),
      this._tr[0] * this._maxRight + (this._tr[12] + t) < this._screenRight &&
      (t = this._screenRight - this._tr[0] * this._maxRight - this._tr[12]),
      this._tr[5] * this._maxTop + (this._tr[13] + e) < this._screenTop &&
      (e = this._screenTop - this._tr[5] * this._maxTop - this._tr[13]),
      this._tr[5] * this._maxBottom + (this._tr[13] + e) > this._screenBottom &&
      (e = this._screenBottom - this._tr[5] * this._maxBottom - this._tr[13]);
    const i = new Float32Array([
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      t,
      e,
      0,
      1,
    ]);
    A.multiply(i, this._tr, this._tr);
  }
  adjustScale(t, e, i) {
    const s = this.getMaxScale(),
      a = this.getMinScale(),
      o = i * this._tr[0];
    o < a
      ? this._tr[0] > 0 && (i = a / this._tr[0])
      : o > s && this._tr[0] > 0 && (i = s / this._tr[0]);
    const n = new Float32Array([
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        t,
        e,
        0,
        1,
      ]),
      l = new Float32Array([i, 0, 0, 0, 0, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
      h = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -t, -e, 0, 1]);
    A.multiply(h, this._tr, this._tr),
      A.multiply(l, this._tr, this._tr),
      A.multiply(n, this._tr, this._tr);
  }
  setScreenRect(t, e, i, s) {
    (this._screenLeft = t),
      (this._screenRight = e),
      (this._screenBottom = i),
      (this._screenTop = s);
  }
  setMaxScreenRect(t, e, i, s) {
    (this._maxLeft = t),
      (this._maxRight = e),
      (this._maxTop = s),
      (this._maxBottom = i);
  }
  setMaxScale(t) {
    this._maxScale = t;
  }
  setMinScale(t) {
    this._minScale = t;
  }
  getMaxScale() {
    return this._maxScale;
  }
  getMinScale() {
    return this._minScale;
  }
  isMaxScale() {
    return this.getScaleX() >= this._maxScale;
  }
  isMinScale() {
    return this.getScaleX() <= this._minScale;
  }
  getScreenLeft() {
    return this._screenLeft;
  }
  getScreenRight() {
    return this._screenRight;
  }
  getScreenBottom() {
    return this._screenBottom;
  }
  getScreenTop() {
    return this._screenTop;
  }
  getMaxLeft() {
    return this._maxLeft;
  }
  getMaxRight() {
    return this._maxRight;
  }
  getMaxBottom() {
    return this._maxBottom;
  }
  getMaxTop() {
    return this._maxTop;
  }
}
var os;
((r) => {
  r.CubismViewMatrix = Xs;
})(os || (os = {}));
class ls {
  constructor(t, e, i, s, a) {
    (this._rect = new tn()),
      (this._rect.left = t - i * 0.5),
      (this._rect.right = t + i * 0.5),
      (this._rect.up = e + s * 0.5),
      (this._rect.down = e - s * 0.5),
      (this._texture = a),
      (this._vertexBuffer = null),
      (this._uvBuffer = null),
      (this._indexBuffer = null),
      (this._positionLocation = null),
      (this._uvLocation = null),
      (this._textureLocation = null),
      (this._positionArray = null),
      (this._uvArray = null),
      (this._indexArray = null),
      (this._firstDraw = !0);
  }
  release() {
    (this._rect = null),
      m.deleteTexture(this._texture),
      (this._texture = null),
      m.deleteBuffer(this._uvBuffer),
      (this._uvBuffer = null),
      m.deleteBuffer(this._vertexBuffer),
      (this._vertexBuffer = null),
      m.deleteBuffer(this._indexBuffer),
      (this._indexBuffer = null);
  }
  getTexture() {
    return this._texture;
  }
  render(t) {
    if (this._texture != null) {
      if (this._firstDraw) {
        (this._positionLocation = m.getAttribLocation(t, "position")),
          m.enableVertexAttribArray(this._positionLocation),
          (this._uvLocation = m.getAttribLocation(t, "uv")),
          m.enableVertexAttribArray(this._uvLocation),
          (this._textureLocation = m.getUniformLocation(t, "texture")),
          m.uniform1i(this._textureLocation, 0),
          (this._uvArray = new Float32Array([1, 0, 0, 0, 0, 1, 1, 1])),
          (this._uvBuffer = m.createBuffer());
        {
          const e = E.width,
            i = E.height;
          (this._positionArray = new Float32Array([
            (this._rect.right - e * 0.5) / (e * 0.5),
            (this._rect.up - i * 0.5) / (i * 0.5),
            (this._rect.left - e * 0.5) / (e * 0.5),
            (this._rect.up - i * 0.5) / (i * 0.5),
            (this._rect.left - e * 0.5) / (e * 0.5),
            (this._rect.down - i * 0.5) / (i * 0.5),
            (this._rect.right - e * 0.5) / (e * 0.5),
            (this._rect.down - i * 0.5) / (i * 0.5),
          ])), (this._vertexBuffer = m.createBuffer());
        }
        (this._indexArray = new Uint16Array([0, 1, 2, 3, 2, 0])),
          (this._indexBuffer = m.createBuffer()),
          (this._firstDraw = !1);
      }
      m.bindBuffer(m.ARRAY_BUFFER, this._uvBuffer),
        m.bufferData(m.ARRAY_BUFFER, this._uvArray, m.STATIC_DRAW),
        m.vertexAttribPointer(this._uvLocation, 2, m.FLOAT, !1, 0, 0),
        m.bindBuffer(m.ARRAY_BUFFER, this._vertexBuffer),
        m.bufferData(m.ARRAY_BUFFER, this._positionArray, m.STATIC_DRAW),
        m.vertexAttribPointer(this._positionLocation, 2, m.FLOAT, !1, 0, 0),
        m.bindBuffer(m.ELEMENT_ARRAY_BUFFER, this._indexBuffer),
        m.bufferData(m.ELEMENT_ARRAY_BUFFER, this._indexArray, m.DYNAMIC_DRAW),
        m.bindTexture(m.TEXTURE_2D, this._texture),
        m.drawElements(
          m.TRIANGLES,
          this._indexArray.length,
          m.UNSIGNED_SHORT,
          0,
        );
    }
  }
  isHit(t, e) {
    const { height: i } = E,
      s = i - e;
    return (
      t >= this._rect.left &&
      t <= this._rect.right &&
      s <= this._rect.up &&
      s >= this._rect.down
    );
  }
}
class tn {}
class en {
  constructor() {
    (this._startX = 0),
      (this._startY = 0),
      (this._lastX = 0),
      (this._lastY = 0),
      (this._lastX1 = 0),
      (this._lastY1 = 0),
      (this._lastX2 = 0),
      (this._lastY2 = 0),
      (this._lastTouchDistance = 0),
      (this._deltaX = 0),
      (this._deltaY = 0),
      (this._scale = 1),
      (this._touchSingle = !1),
      (this._flipAvailable = !1);
  }
  getCenterX() {
    return this._lastX;
  }
  getCenterY() {
    return this._lastY;
  }
  getDeltaX() {
    return this._deltaX;
  }
  getDeltaY() {
    return this._deltaY;
  }
  getStartX() {
    return this._startX;
  }
  getStartY() {
    return this._startY;
  }
  getScale() {
    return this._scale;
  }
  getX() {
    return this._lastX;
  }
  getY() {
    return this._lastY;
  }
  getX1() {
    return this._lastX1;
  }
  getY1() {
    return this._lastY1;
  }
  getX2() {
    return this._lastX2;
  }
  getY2() {
    return this._lastY2;
  }
  isSingleTouch() {
    return this._touchSingle;
  }
  isFlickAvailable() {
    return this._flipAvailable;
  }
  disableFlick() {
    this._flipAvailable = !1;
  }
  touchesBegan(t, e) {
    (this._lastX = t),
      (this._lastY = e),
      (this._startX = t),
      (this._startY = e),
      (this._lastTouchDistance = -1),
      (this._flipAvailable = !0),
      (this._touchSingle = !0);
  }
  touchesMoved(t, e) {
    (this._lastX = t),
      (this._lastY = e),
      (this._lastTouchDistance = -1),
      (this._touchSingle = !0);
  }
  getFlickDistance() {
    return this.calculateDistance(
      this._startX,
      this._startY,
      this._lastX,
      this._lastY,
    );
  }
  calculateDistance(t, e, i, s) {
    return Math.sqrt((t - i) * (t - i) + (e - s) * (e - s));
  }
  calculateMovingAmount(t, e) {
    if (t > 0 != e > 0) return 0;
    const i = t > 0 ? 1 : -1,
      s = Math.abs(t),
      a = Math.abs(e);
    return i * (s < a ? s : a);
  }
}
class sn {
  constructor() {
    (this._programId = null),
      (this._back = null),
      (this._gear = null),
      (this._touchManager = new en()),
      (this._deviceToScreen = new A()),
      (this._viewMatrix = new Xs());
  }
  initialize() {
    const { width: t, height: e } = E,
      i = t / e,
      s = -i,
      a = i,
      o = Ks,
      n = Zs;
    if (
      (this._viewMatrix.setScreenRect(s, a, o, n),
        this._viewMatrix.scale(Ze, Ze),
        this._deviceToScreen.loadIdentity(),
        t > e)
    ) {
      const l = Math.abs(a - s);
      this._deviceToScreen.scaleRelative(l / t, -l / t);
    } else {
      const l = Math.abs(n - o);
      this._deviceToScreen.scaleRelative(l / e, -l / e);
    }
    this._deviceToScreen.translateRelative(-t * 0.5, -e * 0.5),
      this._viewMatrix.setMaxScale(qs),
      this._viewMatrix.setMinScale(Js),
      this._viewMatrix.setMaxScreenRect(Qs, tr, er, ir);
  }
  release() {
    (this._viewMatrix = null),
      (this._touchManager = null),
      (this._deviceToScreen = null),
      this._gear.release(),
      (this._gear = null),
      this._back.release(),
      (this._back = null),
      m.deleteProgram(this._programId),
      (this._programId = null);
  }
  render() {
    m.useProgram(this._programId),
      this._back && this._back.render(this._programId),
      this._gear && this._gear.render(this._programId),
      m.flush();
    const t = mt.getInstance();
    t.setViewMatrix(this._viewMatrix), t.onUpdate();
  }
  initializeSprite() {
    const t = E.width,
      e = E.height,
      i = w.getInstance().getTextureManager(),
      s = gs;
    let a = "";
    const o = (l) => {
      const h = t * 0.5,
        u = e * 0.5,
        d = l.width * 2,
        _ = e * 0.95;
      this._back = new ls(h, u, d, _, l.id);
    };
    i.createTextureFromPngFile(s, !1, o), (a = sr);
    const n = (l) => {
      const h = t - l.width * 0.5,
        u = e - l.height * 0.5,
        d = l.width,
        _ = l.height;
      this._gear = new ls(h, u, d, _, l.id);
    };
    i.createTextureFromPngFile(s + a, !1, n),
      this._programId == null &&
      (this._programId = w.getInstance().createShader());
  }
  onTouchesBegan(t, e) {
    this._touchManager.touchesBegan(
      t * window.devicePixelRatio,
      e * window.devicePixelRatio,
    );
  }
  onTouchesMoved(t, e) {
    const i = this.transformViewX(this._touchManager.getX()),
      s = this.transformViewY(this._touchManager.getY());
    this._touchManager.touchesMoved(
      t * window.devicePixelRatio,
      e * window.devicePixelRatio,
    ), mt.getInstance().onDrag(i, s);
  }
  onTouchesEnded(t, e) {
    const i = mt.getInstance();
    i.onDrag(0, 0);
    {
      const s = this._deviceToScreen.transformX(this._touchManager.getX()),
        a = this._deviceToScreen.transformY(this._touchManager.getY());
      i.onTap(s, a),
        this._gear.isHit(
          t * window.devicePixelRatio,
          e * window.devicePixelRatio,
        ) && i.nextScene();
    }
  }
  transformViewX(t) {
    const e = this._deviceToScreen.transformX(t);
    return this._viewMatrix.invertTransformX(e);
  }
  transformViewY(t) {
    const e = this._deviceToScreen.transformY(t);
    return this._viewMatrix.invertTransformY(e);
  }
  transformScreenX(t) {
    return this._deviceToScreen.transformX(t);
  }
  transformScreenY(t) {
    return this._deviceToScreen.transformY(t);
  }
}
let gt = null,
  Re = null;
class w {
  static getInstance() {
    return gt == null && (gt = new w()), gt;
  }
  static releaseInstance() {
    gt != null && gt.release(), (gt = null);
  }
  initialize() {
    return (
      document.body.appendChild(E),
        E.setAttribute("id", "live2d-canvas"),
        this._resizeCanvas(),
        Re || (Re = m.getParameter(m.FRAMEBUFFER_BINDING)),
        m.enable(m.BLEND),
        m.blendFunc(m.SRC_ALPHA, m.ONE_MINUS_SRC_ALPHA),
        "ontouchend" in E
          ? (E.addEventListener("touchstart", on, { passive: !0 }),
            E.addEventListener("touchmove", ln, { passive: !0 }),
            E.addEventListener("touchend", un, { passive: !0 }),
            E.addEventListener("touchcancel", hn, { passive: !0 }))
          : (E.addEventListener("mousedown", rn, { passive: !0 }),
            E.addEventListener("mousemove", an, { passive: !0 }),
            E.addEventListener("mouseup", nn, { passive: !0 })),
        this._view.initialize(),
        this.initializeCubism(),
        !0
    );
  }
  onResize() {
    this._resizeCanvas(),
      this._view.initialize(),
      this._view.initializeSprite();
  }
  release() {
    this._textureManager.release(),
      (this._textureManager = null),
      this._view.release(),
      (this._view = null),
      mt.releaseInstance(),
      V.dispose();
  }
  run() {
    const t = () => {
      gt != null &&
        (T.updateTime(),
          m.clearColor(0, 0, 0, 0),
          m.enable(m.DEPTH_TEST),
          m.depthFunc(m.LEQUAL),
          m.clear(m.COLOR_BUFFER_BIT | m.DEPTH_BUFFER_BIT),
          m.clearDepth(1),
          m.enable(m.BLEND),
          m.blendFunc(m.SRC_ALPHA, m.ONE_MINUS_SRC_ALPHA),
          this._view.render(),
          requestAnimationFrame(t));
    };
    t();
  }
  createShader() {
    const t = m.createShader(m.VERTEX_SHADER);
    if (t == null) return T.printMessage("failed to create vertexShader"), null;
    m.shaderSource(
      t,
      "precision mediump float;attribute vec3 position;attribute vec2 uv;varying vec2 vuv;void main(void){   gl_Position = vec4(position, 1.0);   vuv = uv;}",
    ), m.compileShader(t);
    const i = m.createShader(m.FRAGMENT_SHADER);
    if (i == null) {
      return T.printMessage("failed to create fragmentShader"), null;
    }
    m.shaderSource(
      i,
      "precision mediump float;varying vec2 vuv;uniform sampler2D texture;void main(void){   gl_FragColor = texture2D(texture, vuv);}",
    ), m.compileShader(i);
    const a = m.createProgram();
    return (
      m.attachShader(a, t),
        m.attachShader(a, i),
        m.deleteShader(t),
        m.deleteShader(i),
        m.linkProgram(a),
        m.useProgram(a),
        a
    );
  }
  getView() {
    return this._view;
  }
  getTextureManager() {
    return this._textureManager;
  }
  constructor() {
    (this._captured = !1),
      (this._mouseX = 0),
      (this._mouseY = 0),
      (this._isEnd = !1),
      (this._cubismOption = new Ws()),
      (this._view = new sn()),
      (this._textureManager = new Za());
  }
  initializeCubism() {
    (this._cubismOption.logFunction = T.printMessage),
      (this._cubismOption.loggingLevel = ur),
      V.startUp(this._cubismOption),
      V.initialize(),
      mt.getInstance(),
      T.updateTime(),
      this._view.initializeSprite();
  }
  _resizeCanvas() {
    (E.width = window.innerWidth),
      (E.height = window.innerHeight),
      m.viewport(0, 0, m.drawingBufferWidth, m.drawingBufferHeight);
  }
}
function rn(r) {
  if (!w.getInstance()._view) {
    T.printMessage("view notfound");
    return;
  }
  w.getInstance()._captured = !0;
  const t = r.pageX,
    e = r.pageY;
  w.getInstance()._view.onTouchesBegan(t, e);
}
function an(r) {
  if (!w.getInstance()._captured) return;
  if (!w.getInstance()._view) {
    T.printMessage("view notfound");
    return;
  }
  const t = r.target.getBoundingClientRect(),
    e = r.clientX - t.left,
    i = r.clientY - t.top;
  w.getInstance()._view.onTouchesMoved(e, i);
}
function nn(r) {
  if (((w.getInstance()._captured = !1), !w.getInstance()._view)) {
    T.printMessage("view notfound");
    return;
  }
  const t = r.target.getBoundingClientRect(),
    e = r.clientX - t.left,
    i = r.clientY - t.top;
  w.getInstance()._view.onTouchesEnded(e, i);
}
function on(r) {
  if (!w.getInstance()._view) {
    T.printMessage("view notfound");
    return;
  }
  w.getInstance()._captured = !0;
  const t = r.changedTouches[0].pageX,
    e = r.changedTouches[0].pageY;
  w.getInstance()._view.onTouchesBegan(t, e);
}
function ln(r) {
  if (!w.getInstance()._captured) return;
  if (!w.getInstance()._view) {
    T.printMessage("view notfound");
    return;
  }
  const t = r.target.getBoundingClientRect(),
    e = r.changedTouches[0].clientX - t.left,
    i = r.changedTouches[0].clientY - t.top;
  w.getInstance()._view.onTouchesMoved(e, i);
}
function un(r) {
  if (((w.getInstance()._captured = !1), !w.getInstance()._view)) {
    T.printMessage("view notfound");
    return;
  }
  const t = r.target.getBoundingClientRect(),
    e = r.changedTouches[0].clientX - t.left,
    i = r.changedTouches[0].clientY - t.top;
  w.getInstance()._view.onTouchesEnded(e, i);
}
function hn(r) {
  if (((w.getInstance()._captured = !1), !w.getInstance()._view)) {
    T.printMessage("view notfound");
    return;
  }
  const t = r.target.getBoundingClientRect(),
    e = r.changedTouches[0].clientX - t.left,
    i = r.changedTouches[0].clientY - t.top;
  w.getInstance()._view.onTouchesEnded(e, i);
}
window.addEventListener(
  "load",
  () => {
    !Ae.getInstance() || !w.getInstance().initialize() || w.getInstance().run();
  },
  { passive: !0 },
);
window.addEventListener("beforeunload", () => w.releaseInstance(), {
  passive: !0,
});
window.addEventListener(
  "resize",
  () => {
    w.getInstance().onResize();
  },
  { passive: !0 },
);
let Te;
function gn(r) {
  r.data;
  try {
    Te.postMessage(
      'Message received by IFrame: "' + JSON.stringify(r.data) + '"',
    );
  } catch (t) {
    console.error(t);
  }
}
function cn(r) {
  r.ports[0] && ((Te = r.ports[0]), (Te.onmessage = gn));
}
window.addEventListener("message", cn);
//# sourceMappingURL=index-BacQgGIN.js.map
