(function(e) {
  function t(t) {
    for (
      var r, i, s = t[0], c = t[1], l = t[2], f = 0, p = [];
      f < s.length;
      f++
    )
      (i = s[f]),
        Object.prototype.hasOwnProperty.call(o, i) && o[i] && p.push(o[i][0]),
        (o[i] = 0);
    for (r in c) Object.prototype.hasOwnProperty.call(c, r) && (e[r] = c[r]);
    u && u(t);
    while (p.length) p.shift()();
    return a.push.apply(a, l || []), n();
  }
  function n() {
    for (var e, t = 0; t < a.length; t++) {
      for (var n = a[t], r = !0, s = 1; s < n.length; s++) {
        var c = n[s];
        0 !== o[c] && (r = !1);
      }
      r && (a.splice(t--, 1), (e = i((i.s = n[0]))));
    }
    return e;
  }
  var r = {},
    o = { app: 0 },
    a = [];
  function i(t) {
    if (r[t]) return r[t].exports;
    var n = (r[t] = { i: t, l: !1, exports: {} });
    return e[t].call(n.exports, n, n.exports, i), (n.l = !0), n.exports;
  }
  (i.m = e),
    (i.c = r),
    (i.d = function(e, t, n) {
      i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (i.r = function(e) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (i.t = function(e, t) {
      if ((1 & t && (e = i(e)), 8 & t)) return e;
      if (4 & t && "object" === typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (i.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          i.d(
            n,
            r,
            function(t) {
              return e[t];
            }.bind(null, r)
          );
      return n;
    }),
    (i.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e["default"];
            }
          : function() {
              return e;
            };
      return i.d(t, "a", t), t;
    }),
    (i.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (i.p = "/");
  var s = (window["webpackJsonp"] = window["webpackJsonp"] || []),
    c = s.push.bind(s);
  (s.push = t), (s = s.slice());
  for (var l = 0; l < s.length; l++) t(s[l]);
  var u = c;
  a.push([0, "chunk-vendors"]), n();
})({
  0: function(e, t, n) {
    e.exports = n("56d7");
  },
  "2f69": function(e, t, n) {},
  3955: function(e, t) {
    e.exports = iview;
  },
  "56d7": function(e, t, n) {
    "use strict";
    n.r(t);
    n("cadf"), n("551c"), n("f751"), n("097d");
    var r = n("2b0e"),
      o = n("68cb"),
      a = n.n(o),
      i = function() {
        var e = this,
          t = e.$createElement,
          n = e._self._c || t;
        return n("div", { attrs: { id: "app" } }, [n("router-view")], 1);
      },
      s = [],
      c = (n("7c55"), n("2877")),
      l = {},
      u = Object(c["a"])(l, i, s, !1, null, null, null),
      f = u.exports,
      p = n("8c4f"),
      d = function() {
        var e = this,
          t = e.$createElement,
          n = e._self._c || t;
        return n(
          "div",
          { staticClass: "im_container" },
          [
            e._m(0),
            n(
              "div",
              { ref: "content_list", staticClass: "content_list" },
              [
                e.pageNum > 0
                  ? n(
                      "p",
                      {
                        staticClass: "more",
                        on: { click: e.handleUpdataList }
                      },
                      [e._v("加载更多内容")]
                    )
                  : e._e(),
                e._l(e.list, function(t, r) {
                  return n("div", { key: r, staticClass: "li" }, [
                    n("div", { class: { user: !0, blue: t.name === e.name } }, [
                      e._v("\n        " + e._s(t.name) + "\n      ")
                    ]),
                    n("div", { staticClass: "content" }, [e._v(e._s(t.msg))])
                  ]);
                })
              ],
              2
            ),
            n("div", { staticClass: "footer" }, [
              n("textarea", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: e.msg_content,
                    expression: "msg_content"
                  }
                ],
                staticClass: "input",
                attrs: { type: "text", placeholder: "请输入消息内容" },
                domProps: { value: e.msg_content },
                on: {
                  input: function(t) {
                    t.target.composing || (e.msg_content = t.target.value);
                  }
                }
              }),
              n(
                "button",
                { staticClass: "send_button", on: { click: e.handleMsgSend } },
                [e._v("发送")]
              )
            ]),
            n(
              "Modal",
              {
                attrs: { width: "360" },
                model: {
                  value: e.hasName,
                  callback: function(t) {
                    e.hasName = t;
                  },
                  expression: "hasName"
                }
              },
              [
                n(
                  "p",
                  {
                    staticStyle: { color: "#f60", "text-align": "center" },
                    attrs: { slot: "header" },
                    slot: "header"
                  },
                  [n("span", [e._v("请先输入你的马甲")])]
                ),
                n(
                  "div",
                  { staticStyle: { "text-align": "center" } },
                  [
                    n("Input", {
                      attrs: { placeholder: "请输入你的昵称" },
                      model: {
                        value: e.name,
                        callback: function(t) {
                          e.name = t;
                        },
                        expression: "name"
                      }
                    })
                  ],
                  1
                ),
                n(
                  "div",
                  { attrs: { slot: "footer" }, slot: "footer" },
                  [
                    n(
                      "Button",
                      {
                        attrs: {
                          type: "primary",
                          disabled: e.disabled,
                          size: "large"
                        },
                        on: { click: e.handleSetName }
                      },
                      [e._v("确认")]
                    )
                  ],
                  1
                )
              ]
            )
          ],
          1
        );
      },
      m = [
        function() {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { staticClass: "header" }, [
            e._v("群聊"),
            n("span", {
              staticStyle: { width: "0", height: "0", opacity: "0" }
            })
          ]);
        }
      ],
      h = (n("8e6e"), n("ac6a"), n("456d"), n("96cf"), n("3b8d")),
      g = (n("7f7f"), n("bd86")),
      v = n("2f62");
    function b(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function _(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? b(n, !0).forEach(function(t) {
              Object(g["a"])(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : b(n).forEach(function(t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    var y = {
        name: "home",
        components: {},
        computed: _(
          {},
          Object(v["c"])({
            list: function(e) {
              return e.list;
            },
            pageNum: function(e) {
              return e.pageNum;
            },
            isScroll: function(e) {
              return e.isScroll;
            }
          }),
          {
            disabled: function() {
              return !this.name;
            }
          }
        ),
        data: function() {
          return { msg_content: "", name: "李四", hasName: !0 };
        },
        methods: _({}, Object(v["b"])(["handleUpdataList"]), {
          handleMsgSend: function() {
            this.$socket.emit("client msg", {
              name: this.name,
              msg: this.msg_content
            }),
              (this.msg_content = "");
          },
          handleSetName: function() {
            localforage.setItem("name", this.name), (this.hasName = !1);
          }
        }),
        created: (function() {
          var e = Object(h["a"])(
            regeneratorRuntime.mark(function e() {
              var t, n;
              return regeneratorRuntime.wrap(
                function(e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.prev = 0),
                          (e.next = 3),
                          localforage.getItem("im_detail_list")
                        );
                      case 3:
                        return (
                          (t = e.sent),
                          t &&
                            Array.isArray(t) &&
                            this.$store.dispatch("handleImList", t),
                          (e.next = 7),
                          localforage.getItem("name")
                        );
                      case 7:
                        (n = e.sent), (this.hasName = !n), (e.next = 14);
                        break;
                      case 11:
                        throw ((e.prev = 11), (e.t0 = e["catch"](0)), e.t0);
                      case 14:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                this,
                [[0, 11]]
              );
            })
          );
          function t() {
            return e.apply(this, arguments);
          }
          return t;
        })(),
        mounted: function() {
          var e = this.$refs.content_list;
          e.scrollTop = e.scrollHeight;
        },
        updated: function() {
          if (this.isScroll) {
            var e = this.$refs.content_list;
            e.scrollTop = e.scrollHeight;
          }
        }
      },
      w = y,
      O = (n("a0f5"), Object(c["a"])(w, d, m, !1, null, "d6b4d078", null)),
      j = O.exports;
    r["a"].use(p["a"]);
    var x = new p["a"]({
        mode: "history",
        base: "/",
        routes: [{ path: "/", name: "home", component: j }]
      }),
      S = n("75fc"),
      N = n("91c8"),
      k = n.n(N);
    r["a"].use(v["a"]);
    var P = new v["a"].Store({
        state: { im_detail_list: [], list: [], pageNum: 0, isScroll: !0 },
        mutations: {
          addImMsg: function(e, t) {
            (e.isScroll = !0), e.list.push(t);
          },
          upDateIm_detail_list: function(e, t) {
            var n,
              r = t.im_list,
              o = t.pageNum;
            (e.im_detail_list = r),
              (e.pageNum = o),
              (e.isScroll = !0),
              (n = e.list).unshift.apply(n, Object(S["a"])(r[o]));
          },
          handleUpdataList: function(e) {
            var t,
              n = e.pageNum - 1;
            (e.pageNum = n),
              (e.isScroll = !1),
              (t = e.list).unshift.apply(
                t,
                Object(S["a"])(e.im_detail_list[n])
              );
          }
        },
        actions: {
          listen_new_msg: (function() {
            var e = Object(h["a"])(
              regeneratorRuntime.mark(function e(t, n) {
                var r;
                return regeneratorRuntime.wrap(function(e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          t.commit("addImMsg", n),
                          (e.next = 3),
                          localforage.getItem("im_detail_list")
                        );
                      case 3:
                        (r = e.sent),
                          r && Array.isArray(r) ? r.push(n) : (r = [n]),
                          localforage.setItem("im_detail_list", r);
                      case 6:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            function t(t, n) {
              return e.apply(this, arguments);
            }
            return t;
          })(),
          handleImList: function(e, t) {
            var n = k()(t, 15);
            e.commit("upDateIm_detail_list", {
              im_list: n,
              pageNum: n.length - 1
            });
          }
        }
      }),
      I = n("3955"),
      C = n.n(I),
      M = n("9483");
    Object(M["a"])("".concat("/", "service-worker.js"), {
      ready: function() {
        console.log(
          "App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB"
        );
      },
      registered: function() {
        console.log("Service worker has been registered.");
      },
      cached: function() {
        console.log("Content has been cached for offline use.");
      },
      updatefound: function() {
        console.log("New content is downloading.");
      },
      updated: function() {
        console.log("New content is available; please refresh.");
      },
      offline: function() {
        console.log(
          "No internet connection found. App is running in offline mode."
        );
      },
      error: function(e) {
        console.error("Error during service worker registration:", e);
      }
    });
    n("b059");
    localforage.config({
      name: "IM",
      version: "1.0.0",
      description: "本地数据储存数据库"
    }),
      (r["a"].config.productionTip = !1);
    var $ = a()("https://dev.server.jindll.com");
    $.on("service msg", function(e) {
      P.dispatch("listen_new_msg", e);
    }),
      r["a"].use(C.a),
      (r["a"].prototype.$socket = $),
      new r["a"]({
        router: x,
        store: P,
        render: function(e) {
          return e(f);
        }
      }).$mount("#app");
  },
  "5c48": function(e, t, n) {},
  "68cb": function(e, t) {
    e.exports = io;
  },
  "7c55": function(e, t, n) {
    "use strict";
    var r = n("5c48"),
      o = n.n(r);
    o.a;
  },
  a0f5: function(e, t, n) {
    "use strict";
    var r = n("2f69"),
      o = n.n(r);
    o.a;
  },
  b059: function(e, t, n) {}
});
