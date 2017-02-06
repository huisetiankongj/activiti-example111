"use strict";
define(function (t, e, n) {
    function o() {
    }

    function i() {
    }

    function a(t) {
        var e = new o;
        return "string" == typeof t ? e.$ = document.querySelector(t) : e.$ = t, null != e.$ && void 0 == e.on ? e.__proto__ = new i : e = void 0, e
    }

    function r(t) {
        if (/^\#j-x-/.test(t)) {
            var e = new o;
            return e.$ = document.createElement("div"), e.$.id = t.replace(/^\#/, ""), e.__proto__ = new i, e
        }
    }

    function c(t) {
        t.preventDefault()
    }

    i.prototype.html = function (t) {
        return this.$.innerHTML = t, this
    }, i.prototype.append = function () {
        return s.$.insertBefore(this.$, null), this
    }, i.prototype.remove = function () {
        return s.$.removeChild(this.$), this
    }, i.prototype.addClass = function (t) {
        return t && this.$.classList.add(t), this
    }, i.prototype.hasClass = function (t) {
        return t ? this.$.classList.contains(t) : !1
    }, i.prototype.on = function (t, e) {
        return this.$.addEventListener(t, e), this
    }, i.prototype.off = function (t, e) {
        return this.$.removeEventListener(t, e), this
    }, i.prototype.find = function (t) {
        var e = new o;
        return e.$ = this.$.querySelector(t), null != e.$ && void 0 == e.on ? e.__proto__ = new i : e = void 0, e
    }, i.prototype.touchend = function (t) {
        return this.on("touchstart", u.touchends).on("touchmove", u.touchends).on("touchend", u.touchends), this.$.__proto__.touchendCB = t, this
    };
    var s = a("body"), u = {
        touchends: function (t) {
            "touchstart" == t.type ? u.touchendXY = u.touchendXY2 = [t.changedTouches[0].pageX, t.changedTouches[0].pageY] : "touchmove" == t.type ? u.touchendXY2 = [t.changedTouches[0].pageX, t.changedTouches[0].pageY] : void 0 != this.touchendCB && Math.abs(u.touchendXY[0] - u.touchendXY2[0]) < 5 && Math.abs(u.touchendXY[1] - u.touchendXY2[1]) < 5 && this.touchendCB.apply(this, [t])
        }, alertBtnClick: function () {
            var t = void 0;
            a(this).hasClass("x-y") ? "function" == typeof u.alertcbY && (t = u.alertcbY) : "function" == typeof u.alertcbN && (t = u.alertcbN), d.removeAlert(t)
        }
    }, d = {
        loading: function () {
            var t = a("#j-x-loading");
            t && d.removeLoading(), t = r("#j-x-loading").html("<span><i></i><i></i></span>").append().on("touchstart", c)
        }, toast: function (t, e, n) {
            var o = a("#j-x-toast");
            o && (clearTimeout(u.t), o.remove(), n && n()), e = e ? e : 2e3, o = r("#j-x-toast").html("<p>" + t + "</p>").append(), clearTimeout(u.t2), clearTimeout(u.t3), u.t2 = setTimeout(function () {
                o.addClass("j-x-show")
            }, 0), u.t3 = setTimeout(function () {
                d.removeToast(n)
            }, e)
        }, alert: function (t) {
            void 0 != t && "object" != typeof t && (t = {txt: t}), t["class"] = t["class"] ? t["class"] : "", t.txt = t.txt || t.text, t.btnY = t.btnY ? t.btnY : t.btn ? t.btn : "确定", u.alertcbN = t.callbackN ? t.callbackN : void 0, u.alertcbY = t.callbackY ? t.callbackY : t.callback ? t.callback : void 0;
            var e = a("#j-x-alert");
            e && (clearTimeout(u.t4), e.off("touchstart", c).remove());
            var n = "<div class='x-inalert'><div class='p'><p>" + t.txt + "</p></div>";
            n += "<div class='x-btns'>", t.btnN && (n += "<a href='javascript:;' class='x-btn x-n'>" + t.btnN + "</a>"), n += "<a href='javascript:;' class='x-btn x-y'>" + t.btnY + "</a>", n += "</div></div>", e = r("#j-x-alert").addClass(t["class"]).html(n).append().on("touchstart", c), setTimeout(function () {
                e.addClass("j-x-show")
            }, 0), t.btnN && e.find(".x-inalert .x-btns .x-n").touchend(u.alertBtnClick), e.find(".x-inalert .x-btns .x-y").touchend(u.alertBtnClick)
        }, removeAlert: function (t) {
            var e = a("#j-x-alert");
            e && (e.addClass("j-x-hide"), clearTimeout(u.t4), u.t4 = setTimeout(function () {
                e.off("touchstart", c).remove(), t && t()
            }, 150))
        }, removeLoading: function () {
            var t = a("#j-x-loading");
            t && t.off("touchstart", c).remove()
        }, removeToast: function (t) {
            var e = a("#j-x-toast");
            e && (e.addClass("j-x-hide"), clearTimeout(u.t), u.t = setTimeout(function () {
                e.remove(), t && t()
            }, 150))
        }, isMobile: function (t) {
            var e = /^0{0,1}(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;
            return e.test(t)
        }, isEmail: function (t) {
            var e = /^\w+([-+.]\w+)*\@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            return e.test(t)
        }, isIDCard: function (t) {
            var e = /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/;
            return e.test(t)
        }, isIOS: function () {
            return /iphone|ipad/gi.test(navigator.appVersion)
        }, isAndroid: function () {
            return /android/gi.test(navigator.appVersion)
        }, weixinPay: function (t, e) {
            function n(t, e) {
                WeixinJSBridge.invoke("getBrandWCPayRequest", t, e)
            }

            "undefined" == typeof WeixinJSBridge ? document.addEventListener ? document.addEventListener("WeixinJSBridgeReady", n, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", n), document.attachEvent("onWeixinJSBridgeReady", n)) : n(t, e)
        }, isNumber: function (t) {
            var e = /^[1-9]\d*$/;
            return e.test(t)
        }
    };
    return d
});