/*!
 * ZUI - v1.3.0 - 2015-05-18
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2015 cnezsoft.com; Licensed MIT
 */
!
function(f, d) {
    if ("undefined" == typeof f) {
        throw new Error("ZUI requires jQuery")
    }
    f.zui || (f.zui = function(c) {
        f.isPlainObject(c) && f.extend(f.zui, c)
    });
    var g = 0;
    f.zui({
        uuid: function() {
            return 1000 * (new Date).getTime() + g++%1000
        },
        callEvent: function(h, l, k) {
            if (f.isFunction(h)) {
                "undefined" != typeof k && (h = f.proxy(h, k));
                var j = h(l);
                return l && (l.result = j),
                !(void 0 !== j && !j)
            }
            return 1
        },
        clientLang: function() {
            var j, h = d.config;
            if ("undefined" != typeof h && h.clientLang) {
                j = h.clientLang
            } else {
                var b = f("html").attr("lang");
                j = b ? b: navigator.userLanguage || navigator.userLanguage || "zh_cn"
            }
            return j.replace("-", "_").toLowerCase()
        }
    }),
    f.fn.callEvent = function(j, q, p) {
        var o = f(this),
        n = j.indexOf(".zui."),
        m = j;
        0 > n && p && p.name ? j += "." + p.name: m = j.substring(0, n);
        var l = f.Event(j, q);
        if ("undefined" == typeof p && n > 0 && (p = o.data(j.substring(n + 1))), p && p.options) {
            var k = p.options[m];
            f.isFunction(k) && f.zui.callEvent(p.options[m], l, p)
        }
        return l
    }
} (jQuery, window),
function(x, w, v) {
    function u(g) {
        if (g = g.toLowerCase(), g && o.test(g)) {
            var f;
            if (4 === g.length) {
                var j = "#";
                for (f = 1; 4 > f; f += 1) {
                    j += g.slice(f, f + 1).concat(g.slice(f, f + 1))
                }
                g = j
            }
            var h = [];
            for (f = 1; 7 > f; f += 2) {
                h.push(parseInt("0x" + g.slice(f, f + 2)))
            }
            return {
                r: h[0],
                g: h[1],
                b: h[2],
                a: 1
            }
        }
        throw new Error("function hexToRgb: Wrong hex string! (hex: " + g + ")")
    }
    function t(c) {
        return "string" == typeof c && ("transparent" === c.toLowerCase() || n[c.toLowerCase()] || o.test(x.trim(c.toLowerCase())))
    }
    function s(E) {
        function D(b) {
            return b = 0 > b ? b + 1 : b > 1 ? b - 1 : b,
            1 > 6 * b ? l + (y - l) * b * 6 : 1 > 2 * b ? y: 2 > 3 * b ? l + (y - l) * (2 / 3 - b) * 6 : l
        }
        var C = E.h,
        B = E.s,
        A = E.l,
        z = E.a;
        C = p(C) % 360 / 360,
        B = q(p(B)),
        A = q(p(A)),
        z = q(p(z));
        var y = 0.5 >= A ? A * (B + 1) : A + B - A * B,
        l = 2 * A - y,
        h = {
            r: 255 * D(C + 1 / 3),
            g: 255 * D(C),
            b: 255 * D(C - 1 / 3),
            a: z
        };
        return h
    }
    function r(b, g, f) {
        return void 0 === f && (f = 0),
        void 0 === g && (g = 255),
        w.min(w.max(b, f), g)
    }
    function q(d, c) {
        return r(d, c)
    }
    function p(b) {
        return "number" == typeof b ? b: parseFloat(b)
    }
    var o = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,
    n = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
    },
    m = function(f, d, y, l) {
        if (this.r = 0, this.g = 0, this.b = 0, this.a = 1, void 0 !== l && (this.a = q(p(l), 1)), void 0 !== f && void 0 !== d && void 0 !== y) {
            this.r = parseInt(q(p(f), 255)),
            this.g = parseInt(q(p(d), 255)),
            this.b = parseInt(q(p(y), 255))
        } else {
            if (void 0 !== f) {
                var k = typeof f;
                if ("string" == k) {
                    f = f.toLowerCase(),
                    "transparent" === f ? this.a = 0 : this.rgb(n[f] ? u(n[f]) : u(f))
                } else {
                    if ("number" == k && void 0 === d) {
                        this.r = parseInt(q(f, 255)),
                        this.g = this.r,
                        this.b = this.r
                    } else {
                        if ("object" == k && f.hasOwnProperty("r")) {
                            this.r = parseInt(q(p(f.r), 255)),
                            f.hasOwnProperty("g") && (this.g = parseInt(q(p(f.g), 255))),
                            f.hasOwnProperty("b") && (this.b = parseInt(q(p(f.b), 255))),
                            f.hasOwnProperty("a") && (this.a = q(p(f.a), 1))
                        } else {
                            if ("object" == k && f.hasOwnProperty("h")) {
                                var h = {
                                    h: q(p(f.h), 360),
                                    s: 1,
                                    l: 1,
                                    a: 1
                                };
                                f.hasOwnProperty("s") && (h.s = q(p(f.s), 1)),
                                f.hasOwnProperty("l") && (h.l = q(p(f.l), 1)),
                                f.hasOwnProperty("a") && (h.a = q(p(f.a), 1)),
                                this.rgb(s(h))
                            }
                        }
                    }
                }
            }
        }
    };
    m.prototype.rgb = function(d) {
        if (void 0 !== d) {
            if ("object" == typeof d) {
                d.hasOwnProperty("r") && (this.r = parseInt(q(p(d.r), 255))),
                d.hasOwnProperty("g") && (this.g = parseInt(q(p(d.g), 255))),
                d.hasOwnProperty("b") && (this.b = parseInt(q(p(d.b), 255))),
                d.hasOwnProperty("a") && (this.a = q(p(d.a), 1))
            } else {
                var c = parseInt(p(d));
                this.r = c,
                this.g = c,
                this.b = c
            }
            return this
        }
        return {
            r: this.r,
            g: this.g,
            b: this.b,
            a: this.a
        }
    },
    m.prototype.hue = function(d) {
        var c = this.toHsl();
        return void 0 === d ? c.h: (c.h = q(p(d), 360), this.rgb(s(c)), this)
    },
    m.prototype.darken = function(d) {
        var c = this.toHsl();
        return c.l -= d / 100,
        c.l = q(c.l, 1),
        this.rgb(s(c)),
        this
    },
    m.prototype.clone = function() {
        return new m(this.r, this.g, this.b, this.a)
    },
    m.prototype.lighten = function(b) {
        return this.darken( - b)
    },
    m.prototype.fade = function(b) {
        return this.a = q(b / 100, 1),
        this
    },
    m.prototype.spin = function(f) {
        var d = this.toHsl(),
        g = (d.h + f) % 360;
        return d.h = 0 > g ? 360 + g: g,
        this.rgb(s(d)),
        this
    },
    m.prototype.toHsl = function() {
        var F, E, D = this.r / 255,
        C = this.g / 255,
        B = this.b / 255,
        A = this.a,
        z = w.max(D, C, B),
        y = w.min(D, C, B),
        l = (z + y) / 2,
        b = z - y;
        if (z === y) {
            F = E = 0
        } else {
            switch (E = l > 0.5 ? b / (2 - z - y) : b / (z + y), z) {
            case D:
                F = (C - B) / b + (B > C ? 6 : 0);
                break;
            case C:
                F = (B - D) / b + 2;
                break;
            case B:
                F = (D - C) / b + 4
            }
            F /= 6
        }
        return {
            h: 360 * F,
            s: E,
            l: l,
            a: A
        }
    },
    m.prototype.luma = function() {
        var b = this.r / 255,
        g = this.g / 255,
        f = this.b / 255;
        return b = 0.03928 >= b ? b / 12.92 : w.pow((b + 0.055) / 1.055, 2.4),
        g = 0.03928 >= g ? g / 12.92 : w.pow((g + 0.055) / 1.055, 2.4),
        f = 0.03928 >= f ? f / 12.92 : w.pow((f + 0.055) / 1.055, 2.4),
        0.2126 * b + 0.7152 * g + 0.0722 * f
    },
    m.prototype.saturate = function(d) {
        var c = this.toHsl();
        return c.s += d / 100,
        c.s = q(c.s),
        this.rgb(s(c)),
        this
    },
    m.prototype.desaturate = function(b) {
        return this.saturate( - b)
    },
    m.prototype.contrast = function(g, f, j) {
        if (f = "undefined" == typeof f ? new m(255, 255, 255, 1) : new m(f), g = "undefined" == typeof g ? new m(0, 0, 0, 1) : new m(g), this.a < 0.5) {
            return g
        }
        if (j = void 0 === j ? 0.43 : p(j), g.luma() > f.luma()) {
            var h = f;
            f = g,
            g = h
        }
        return this.luma() < j ? f: g
    },
    m.prototype.hexStr = function() {
        var f = this.r.toString(16),
        d = this.g.toString(16),
        g = this.b.toString(16);
        return 1 == f.length && (f = "0" + f),
        1 == d.length && (d = "0" + d),
        1 == g.length && (g = "0" + g),
        "#" + f + d + g
    },
    m.prototype.toCssStr = function() {
        return this.a > 0 ? this.a < 1 ? "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")": this.hexStr() : "transparent"
    },
    m.prototype.isColor = t,
    x.zui({
        Color: m
    })
} (jQuery, Math, window),
function(g) {
    var f = 0,
    j = ["primary", "red", "yellow", "green", "blue", "purple", "brown", "dark"],
    h = {
        theme: "light",
        primary: "#3280fc",
        secondary: "#145ccd",
        pale: "#ebf2f9",
        fore: "#353535",
        back: "#ffffff",
        grayDarker: "#222222",
        grayDark: "#333333",
        gray: "#808080",
        grayLight: "#dddddd",
        grayLighter: "#e5e5e5",
        grayPale: "#f1f1f1",
        white: "#ffffff",
        black: "#000000",
        red: "#ea644a",
        yellow: "#f1a325",
        green: "#38b03f",
        blue: "#03b8cf",
        purple: "#8666b8",
        brown: "#bd7b46",
        greenPale: "#ddf4df",
        yellowPale: "#fff0d5",
        redPale: "#ffe5e0",
        bluePale: "#ddf3f5",
        brownPale: "#f7ebe1",
        purplePale: "#f5eeff",
        light: "#ffffff",
        dark: "#353535",
        success: "#38b03f",
        warning: "#f1a325",
        danger: "#ea644a",
        info: "#03b8cf",
        important: "#bd7b46",
        special: "#8666b8",
        successPale: "#ddf4df",
        warningPale: "#fff0d5",
        dangerPale: "#ffe5e0",
        infoPale: "#ddf3f5",
        importantPale: "#f7ebe1",
        specialPale: "#f5eeff"
    };
    h.get = function(b) {
        return ("undefined" == typeof b || "random" === b) && (b = j[f++%j.length]),
        new g.zui.Color(h[b] ? h[b] : b)
    },
    g.zui({
        colorset: h
    }),
    g.zui.Color && g.extend(g.zui.Color, h)
} (jQuery),



/*!
 * ZUI - v1.3.1 - 2015-05-19
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2015 cnezsoft.com; Licensed MIT
 */
(function(ar) {
    var aq = ar && ar.zui ? ar.zui: this,
    ap = (aq.Chart,
    function(f) {
        this.canvas = f.canvas,
        this.ctx = f;
        var d = function(j, c) {
            return j["offset" + c] ? j["offset" + c] : document.defaultView.getComputedStyle(j).getPropertyValue(c)
        },
        h = this.width = d(f.canvas, "Width"),
        g = this.height = d(f.canvas, "Height");
        f.canvas.width = h,
        f.canvas.height = g;
        var h = this.width = f.canvas.width,
        g = this.height = f.canvas.height;
        return this.aspectRatio = this.width / this.height,
        ao.retinaScale(this),
        this
    });
    ap.defaults = {
        global: {
            animation: !0,
            animationSteps: 60,
            animationEasing: "easeOutQuart",
            showScale: !0,
            scaleOverride: !1,
            scaleSteps: null,
            scaleStepWidth: null,
            scaleStartValue: null,
            scaleLineColor: "rgba(0,0,0,.1)",
            scaleLineWidth: 1,
            scaleShowLabels: !0,
            scaleLabel: "<%=value%>",
            scaleIntegersOnly: !0,
            scaleBeginAtZero: !1,
            scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            scaleFontSize: 12,
            scaleFontStyle: "normal",
            scaleFontColor: "#666",
            responsive: !1,
            maintainAspectRatio: !0,
            showTooltips: !0,
            customTooltips: !1,
            tooltipEvents: ["mousemove", "touchstart", "touchmove", "mouseout"],
            tooltipFillColor: "rgba(0,0,0,0.8)",
            tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            tooltipFontSize: 14,
            tooltipFontStyle: "normal",
            tooltipFontColor: "#fff",
            tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontSize: 14,
            tooltipTitleFontStyle: "bold",
            tooltipTitleFontColor: "#fff",
            tooltipYPadding: 6,
            tooltipXPadding: 6,
            tooltipCaretSize: 8,
            tooltipCornerRadius: 6,
            tooltipXOffset: 10,
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
            multiTooltipTemplate: "<%= value %>",
            multiTooltipKeyBackground: "#fff",
            onAnimationProgress: function() {},
            onAnimationComplete: function() {}
        }
    },
    ap.types = {};
    var ao = ap.helpers = {},
    an = ao.each = function(h, g, m) {
        var l = Array.prototype.slice.call(arguments, 3);
        if (h) {
            if (h.length === +h.length) {
                var k;
                for (k = 0; k < h.length; k++) {
                    g.apply(m, [h[k], k].concat(l))
                }
            } else {
                for (var j in h) {
                    g.apply(m, [h[j], j].concat(l))
                }
            }
        }
    },
    am = ao.clone = function(d) {
        var c = {};
        return an(d,
        function(f, b) {
            d.hasOwnProperty(b) && (c[b] = f)
        }),
        c
    },
    al = ao.extend = function(b) {
        return an(Array.prototype.slice.call(arguments, 1),
        function(c) {
            an(c,
            function(g, f) {
                c.hasOwnProperty(f) && (b[f] = g)
            })
        }),
        b
    },
    ak = ao.merge = function(f, d) {
        var g = Array.prototype.slice.call(arguments, 0);
        return g.unshift({}),
        al.apply(null, g)
    },
    aj = ao.indexOf = function(f, d) {
        if (Array.prototype.indexOf) {
            return f.indexOf(d)
        }
        for (var g = 0; g < f.length; g++) {
            if (f[g] === d) {
                return g
            }
        }
        return - 1
    },
    ai = (ao.where = function(f, d) {
        var g = [];
        return ao.each(f,
        function(b) {
            d(b) && g.push(b)
        }),
        g
    },
    ao.findNextWhere = function(g, f, k) {
        k || (k = -1);
        for (var j = k + 1; j < g.length; j++) {
            var h = g[j];
            if (f(h)) {
                return h
            }
        }
    },
    ao.findPreviousWhere = function(g, f, k) {
        k || (k = g.length);
        for (var j = k - 1; j >= 0; j--) {
            var h = g[j];
            if (f(h)) {
                return h
            }
        }
    },
    ao.inherits = function(g) {
        var f = this,
        j = g && g.hasOwnProperty("constructor") ? g.constructor: function() {
            return f.apply(this, arguments)
        },
        h = function() {
            this.constructor = j
        };
        return h.prototype = f.prototype,
        j.prototype = new h,
        j.extend = ai,
        g && al(j.prototype, g),
        j.__super__ = f.prototype,
        j
    }),
    ah = ao.noop = function() {},
    ag = ao.uid = function() {
        var b = 0;
        return function() {
            return "chart-" + b++
        }
    } (),
    af = ao.warn = function(b) {
        window.console && "function" == typeof window.console.warn && console.warn(b)
    },
    ae = ao.amd = "function" == typeof define && define.amd,
    ad = ao.isNumber = function(b) {
        return ! isNaN(parseFloat(b)) && isFinite(b)
    },
    ac = ao.max = function(b) {
        return Math.max.apply(Math, b)
    },
    aa = ao.min = function(b) {
        return Math.min.apply(Math, b)
    },
    Y = (ao.cap = function(f, d, g) {
        if (ad(d)) {
            if (f > d) {
                return d
            }
        } else {
            if (ad(g) && g > f) {
                return g
            }
        }
        return f
    },
    ao.getDecimalPlaces = function(b) {
        return b % 1 !== 0 && ad(b) ? b.toString().split(".")[1].length: 0
    }),
    W = ao.radians = function(b) {
        return b * (Math.PI / 180)
    },
    U = (ao.getAngleFromPoint = function(h, g) {
        var m = g.x - h.x,
        l = g.y - h.y,
        k = Math.sqrt(m * m + l * l),
        j = 2 * Math.PI + Math.atan2(l, m);
        return 0 > m && 0 > l && (j += 2 * Math.PI),
        {
            angle: j,
            distance: k
        }
    },
    ao.aliasPixel = function(b) {
        return b % 2 === 0 ? 0 : 0.5
    }),
    S = (ao.splineCurve = function(k, j, q, p) {
        var o = Math.sqrt(Math.pow(j.x - k.x, 2) + Math.pow(j.y - k.y, 2)),
        n = Math.sqrt(Math.pow(q.x - j.x, 2) + Math.pow(q.y - j.y, 2)),
        m = p * o / (o + n),
        l = p * n / (o + n);
        return {
            inner: {
                x: j.x - m * (q.x - k.x),
                y: j.y - m * (q.y - k.y)
            },
            outer: {
                x: j.x + l * (q.x - k.x),
                y: j.y + l * (q.y - k.y)
            }
        }
    },
    ao.calculateOrderOfMagnitude = function(b) {
        return Math.floor(Math.log(b) / Math.LN10)
    }),
    Q = (ao.calculateScaleRange = function(G, F, E, D, C) {
        var B = 2,
        A = Math.floor(F / (1.5 * E)),
        z = B >= A,
        y = ac(G),
        x = aa(G);
        y === x && (y += 0.5, x >= 0.5 && !D ? x -= 0.5 : y += 0.5);
        for (var w = Math.abs(y - x), v = S(w), u = Math.ceil(y / (1 * Math.pow(10, v))) * Math.pow(10, v), t = D ? 0 : Math.floor(x / (1 * Math.pow(10, v))) * Math.pow(10, v), q = u - t, p = Math.pow(10, v), H = Math.round(q / p); (H > A || A > 2 * H) && !z;) {
            if (H > A) {
                p *= 2,
                H = Math.round(q / p),
                H % 1 !== 0 && (z = !0)
            } else {
                if (C && v >= 0) {
                    if (p / 2 % 1 !== 0) {
                        break
                    }
                    p /= 2,
                    H = Math.round(q / p)
                } else {
                    p /= 2,
                    H = Math.round(q / p)
                }
            }
        }
        return z && (H = B, p = q / H),
        {
            steps: H,
            stepValue: p,
            min: t,
            max: t + H * p
        }
    },
    ao.template = function(g, f) {
        function j(k, d) {
            var l = /\W/.test(k) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + k.replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');") : h[k] = h[k];
            return d ? l(d) : l
        }
        if (g instanceof Function) {
            return g(f)
        }
        var h = {};
        return j(g, f)
    }),
    O = (ao.generateLabels = function(h, g, l, k) {
        var j = new Array(g);
        return labelTemplateString && an(j,
        function(c, d) {
            j[d] = Q(h, {
                value: l + k * (d + 1)
            })
        }),
        j
    },
    ao.easingEffects = {
        linear: function(b) {
            return b
        },
        easeInQuad: function(b) {
            return b * b
        },
        easeOutQuad: function(b) {
            return - 1 * b * (b - 2)
        },
        easeInOutQuad: function(b) {
            return (b /= 0.5) < 1 ? 0.5 * b * b: -0.5 * (--b * (b - 2) - 1)
        },
        easeInCubic: function(b) {
            return b * b * b
        },
        easeOutCubic: function(b) {
            return 1 * ((b = b / 1 - 1) * b * b + 1)
        },
        easeInOutCubic: function(b) {
            return (b /= 0.5) < 1 ? 0.5 * b * b * b: 0.5 * ((b -= 2) * b * b + 2)
        },
        easeInQuart: function(b) {
            return b * b * b * b
        },
        easeOutQuart: function(b) {
            return - 1 * ((b = b / 1 - 1) * b * b * b - 1)
        },
        easeInOutQuart: function(b) {
            return (b /= 0.5) < 1 ? 0.5 * b * b * b * b: -0.5 * ((b -= 2) * b * b * b - 2)
        },
        easeInQuint: function(b) {
            return 1 * (b /= 1) * b * b * b * b
        },
        easeOutQuint: function(b) {
            return 1 * ((b = b / 1 - 1) * b * b * b * b + 1)
        },
        easeInOutQuint: function(b) {
            return (b /= 0.5) < 1 ? 0.5 * b * b * b * b * b: 0.5 * ((b -= 2) * b * b * b * b + 2)
        },
        easeInSine: function(b) {
            return - 1 * Math.cos(b / 1 * (Math.PI / 2)) + 1
        },
        easeOutSine: function(b) {
            return 1 * Math.sin(b / 1 * (Math.PI / 2))
        },
        easeInOutSine: function(b) {
            return - 0.5 * (Math.cos(Math.PI * b / 1) - 1)
        },
        easeInExpo: function(b) {
            return 0 === b ? 1 : 1 * Math.pow(2, 10 * (b / 1 - 1))
        },
        easeOutExpo: function(b) {
            return 1 === b ? 1 : 1 * ( - Math.pow(2, -10 * b / 1) + 1)
        },
        easeInOutExpo: function(b) {
            return 0 === b ? 0 : 1 === b ? 1 : (b /= 0.5) < 1 ? 0.5 * Math.pow(2, 10 * (b - 1)) : 0.5 * ( - Math.pow(2, -10 * --b) + 2)
        },
        easeInCirc: function(b) {
            return b >= 1 ? b: -1 * (Math.sqrt(1 - (b /= 1) * b) - 1)
        },
        easeOutCirc: function(b) {
            return 1 * Math.sqrt(1 - (b = b / 1 - 1) * b)
        },
        easeInOutCirc: function(b) {
            return (b /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - b * b) - 1) : 0.5 * (Math.sqrt(1 - (b -= 2) * b) + 1)
        },
        easeInElastic: function(g) {
            var f = 1.70158,
            j = 0,
            h = 1;
            return 0 === g ? 0 : 1 == (g /= 1) ? 1 : (j || (j = 0.3), h < Math.abs(1) ? (h = 1, f = j / 4) : f = j / (2 * Math.PI) * Math.asin(1 / h), -(h * Math.pow(2, 10 * (g -= 1)) * Math.sin(2 * (1 * g - f) * Math.PI / j)))
        },
        easeOutElastic: function(g) {
            var f = 1.70158,
            j = 0,
            h = 1;
            return 0 === g ? 0 : 1 == (g /= 1) ? 1 : (j || (j = 0.3), h < Math.abs(1) ? (h = 1, f = j / 4) : f = j / (2 * Math.PI) * Math.asin(1 / h), h * Math.pow(2, -10 * g) * Math.sin(2 * (1 * g - f) * Math.PI / j) + 1)
        },
        easeInOutElastic: function(g) {
            var f = 1.70158,
            j = 0,
            h = 1;
            return 0 === g ? 0 : 2 == (g /= 0.5) ? 1 : (j || (j = 0.3 * 1.5), h < Math.abs(1) ? (h = 1, f = j / 4) : f = j / (2 * Math.PI) * Math.asin(1 / h), 1 > g ? -0.5 * h * Math.pow(2, 10 * (g -= 1)) * Math.sin(2 * (1 * g - f) * Math.PI / j) : h * Math.pow(2, -10 * (g -= 1)) * Math.sin(2 * (1 * g - f) * Math.PI / j) * 0.5 + 1)
        },
        easeInBack: function(d) {
            var c = 1.70158;
            return 1 * (d /= 1) * d * ((c + 1) * d - c)
        },
        easeOutBack: function(d) {
            var c = 1.70158;
            return 1 * ((d = d / 1 - 1) * d * ((c + 1) * d + c) + 1)
        },
        easeInOutBack: function(d) {
            var c = 1.70158;
            return (d /= 0.5) < 1 ? 0.5 * d * d * (((c *= 1.525) + 1) * d - c) : 0.5 * ((d -= 2) * d * (((c *= 1.525) + 1) * d + c) + 2)
        },
        easeInBounce: function(b) {
            return 1 - O.easeOutBounce(1 - b)
        },
        easeOutBounce: function(b) {
            return (b /= 1) < 1 / 2.75 ? 7.5625 * b * b: 2 / 2.75 > b ? 1 * (7.5625 * (b -= 1.5 / 2.75) * b + 0.75) : 2.5 / 2.75 > b ? 1 * (7.5625 * (b -= 2.25 / 2.75) * b + 0.9375) : 1 * (7.5625 * (b -= 2.625 / 2.75) * b + 0.984375)
        },
        easeInOutBounce: function(b) {
            return 0.5 > b ? 0.5 * O.easeInBounce(2 * b) : 0.5 * O.easeOutBounce(2 * b - 1) + 0.5
        }
    }),
    M = ao.requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(b) {
            return window.setTimeout(b, 1000 / 60)
        }
    } (),
    K = ao.cancelAnimFrame = function() {
        return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame ||
        function(b) {
            return window.clearTimeout(b, 1000 / 60)
        }
    } (),
    J = (ao.animationLoop = function(r, q, p, o, n, m) {
        var l = 0,
        k = O[p] || O.linear,
        j = function() {
            l++;
            var d = l / q,
            b = k(d);
            r.call(m, b, d, l),
            o.call(m, b, d),
            q > l ? m.animationFrame = M(j) : n.apply(m)
        };
        M(j)
    },
    ao.getRelativePosition = function(h) {
        var g, m, l = h.originalEvent || h,
        k = h.currentTarget || h.srcElement,
        j = k.getBoundingClientRect();
        return l.touches ? (g = l.touches[0].clientX - j.left, m = l.touches[0].clientY - j.top) : (g = l.clientX - j.left, m = l.clientY - j.top),
        {
            x: g,
            y: m
        }
    },
    ao.addEvent = function(f, d, g) {
        f.addEventListener ? f.addEventListener(d, g) : f.attachEvent ? f.attachEvent("on" + d, g) : f["on" + d] = g
    }),
    ab = ao.removeEvent = function(f, d, g) {
        f.removeEventListener ? f.removeEventListener(d, g, !1) : f.detachEvent ? f.detachEvent("on" + d, g) : f["on" + d] = ah
    },
    Z = (ao.bindEvents = function(f, d, g) {
        f.events || (f.events = {}),
        an(d,
        function(c) {
            f.events[c] = function() {
                g.apply(f, arguments)
            },
            J(f.chart.canvas, c, f.events[c])
        })
    },
    ao.unbindEvents = function(d, c) {
        an(c,
        function(f, g) {
            ab(d.chart.canvas, g, f)
        })
    }),
    X = ao.getMaximumWidth = function(d) {
        var c = d.parentNode;
        return c.clientWidth
    },
    V = ao.getMaximumHeight = function(d) {
        var c = d.parentNode;
        return c.clientHeight
    },
    T = (ao.getMaximumSize = ao.getMaximumWidth, ao.retinaScale = function(g) {
        var f = g.ctx,
        j = g.canvas.width,
        h = g.canvas.height;
        window.devicePixelRatio && (f.canvas.style.width = j + "px", f.canvas.style.height = h + "px", f.canvas.height = h * window.devicePixelRatio, f.canvas.width = j * window.devicePixelRatio, f.scale(window.devicePixelRatio, window.devicePixelRatio))
    }),
    R = ao.clear = function(b) {
        b.ctx.clearRect(0, 0, b.width, b.height)
    },
    P = ao.fontString = function(f, d, g) {
        return d + " " + f + "px " + g
    },
    N = ao.longestText = function(g, f, j) {
        g.font = f;
        var h = 0;
        return an(j,
        function(d) {
            var k = g.measureText(d).width;
            h = k > h ? k: h
        }),
        h
    },
    L = ao.drawRoundedRectangle = function(h, g, m, l, k, j) {
        h.beginPath(),
        h.moveTo(g + j, m),
        h.lineTo(g + l - j, m),
        h.quadraticCurveTo(g + l, m, g + l, m + j),
        h.lineTo(g + l, m + k - j),
        h.quadraticCurveTo(g + l, m + k, g + l - j, m + k),
        h.lineTo(g + j, m + k),
        h.quadraticCurveTo(g, m + k, g, m + k - j),
        h.lineTo(g, m + j),
        h.quadraticCurveTo(g, m, g + j, m),
        h.closePath()
    };
    ap.instances = {},
    ap.Type = function(f, c, g) {
        this.options = c,
        this.chart = g,
        this.id = ag(),
        ap.instances[this.id] = this,
        c.responsive && this.resize(),
        this.initialize.call(this, f)
    },
    al(ap.Type.prototype, {
        initialize: function() {
            return this
        },
        clear: function() {
            return R(this.chart),
            this
        },
        stop: function() {
            return K(this.animationFrame),
            this
        },
        resize: function(g) {
            this.stop();
            var f = this.chart.canvas,
            j = X(this.chart.canvas),
            h = this.options.maintainAspectRatio ? j / this.chart.aspectRatio: V(this.chart.canvas);
            return f.width = this.chart.width = j,
            f.height = this.chart.height = h,
            T(this.chart),
            "function" == typeof g && g.apply(this, Array.prototype.slice.call(arguments, 1)),
            this
        },
        reflow: ah,
        render: function(b) {
            return b && this.reflow(),
            this.options.animation && !b ? ao.animationLoop(this.draw, this.options.animationSteps, this.options.animationEasing, this.options.onAnimationProgress, this.options.onAnimationComplete, this) : (this.draw(), this.options.onAnimationComplete.call(this)),
            this
        },
        generateLegend: function() {
            return Q(this.options.legendTemplate, this)
        },
        destroy: function() {
            this.clear(),
            Z(this, this.events);
            var b = this.chart.canvas;
            b.width = this.chart.width,
            b.height = this.chart.height,
            b.style.removeProperty ? (b.style.removeProperty("width"), b.style.removeProperty("height")) : (b.style.removeAttribute("width"), b.style.removeAttribute("height")),
            delete ap.instances[this.id]
        },
        showTooltip: function(t, s) {
            "undefined" == typeof this.activeElements && (this.activeElements = []);
            var r = function(g) {
                var f = !1;
                return g.length !== this.activeElements.length ? f = !0 : (an(g,
                function(b, h) {
                    b !== this.activeElements[h] && (f = !0)
                },
                this), f)
            }.call(this, t);
            if (r || s) {
                if (this.activeElements = t, this.draw(), this.options.customTooltips && this.options.customTooltips(!1), t.length > 0) {
                    if (this.datasets && this.datasets.length > 1) {
                        for (var q, p, o = this.datasets.length - 1; o >= 0 && (q = this.datasets[o].points || this.datasets[o].bars || this.datasets[o].segments, p = aj(q, t[0]), -1 === p); o--) {}
                        var n = [],
                        d = [],
                        c = function(z) {
                            var y, x, w, v, u, l = [],
                            k = [],
                            h = [];
                            return ao.each(this.datasets,
                            function(b) {
                                b.showTooltips !== !1 && (y = b.points || b.bars || b.segments, y[p] && y[p].hasValue() && l.push(y[p]))
                            }),
                            ao.each(l,
                            function(b) {
                                k.push(b.x),
                                h.push(b.y),
                                n.push(ao.template(this.options.multiTooltipTemplate, b)),
                                d.push({
                                    fill: b._saved.fillColor || b.fillColor,
                                    stroke: b._saved.strokeColor || b.strokeColor
                                })
                            },
                            this),
                            u = aa(h),
                            w = ac(h),
                            v = aa(k),
                            x = ac(k),
                            {
                                x: v > this.chart.width / 2 ? v: x,
                                y: (u + w) / 2
                            }
                        }.call(this, p);
                        new ap.MultiTooltip({
                            x: c.x,
                            y: c.y,
                            xPadding: this.options.tooltipXPadding,
                            yPadding: this.options.tooltipYPadding,
                            xOffset: this.options.tooltipXOffset,
                            fillColor: this.options.tooltipFillColor,
                            textColor: this.options.tooltipFontColor,
                            fontFamily: this.options.tooltipFontFamily,
                            fontStyle: this.options.tooltipFontStyle,
                            fontSize: this.options.tooltipFontSize,
                            titleTextColor: this.options.tooltipTitleFontColor,
                            titleFontFamily: this.options.tooltipTitleFontFamily,
                            titleFontStyle: this.options.tooltipTitleFontStyle,
                            titleFontSize: this.options.tooltipTitleFontSize,
                            cornerRadius: this.options.tooltipCornerRadius,
                            labels: n,
                            legendColors: d,
                            legendColorBackground: this.options.multiTooltipKeyBackground,
                            title: t[0].label,
                            chart: this.chart,
                            ctx: this.chart.ctx,
                            custom: this.options.customTooltips
                        }).draw()
                    } else {
                        an(t,
                        function(g) {
                            var f = g.tooltipPosition();
                            new ap.Tooltip({
                                x: Math.round(f.x),
                                y: Math.round(f.y),
                                xPadding: this.options.tooltipXPadding,
                                yPadding: this.options.tooltipYPadding,
                                fillColor: this.options.tooltipFillColor,
                                textColor: this.options.tooltipFontColor,
                                fontFamily: this.options.tooltipFontFamily,
                                fontStyle: this.options.tooltipFontStyle,
                                fontSize: this.options.tooltipFontSize,
                                caretHeight: this.options.tooltipCaretSize,
                                cornerRadius: this.options.tooltipCornerRadius,
                                text: Q(this.options.tooltipTemplate, g),
                                chart: this.chart,
                                custom: this.options.customTooltips
                            }).draw()
                        },
                        this)
                    }
                }
                return this
            }
        },
        toBase64Image: function() {
            return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments)
        }
    }),
    ap.Type.extend = function(f) {
        var c = this,
        j = function() {
            return c.apply(this, arguments)
        };
        if (j.prototype = am(c.prototype), al(j.prototype, f), j.extend = ap.Type.extend, f.name || c.prototype.name) {
            var h = f.name || c.prototype.name,
            g = ap.defaults[c.prototype.name] ? am(ap.defaults[c.prototype.name]) : {};
            ap.defaults[h] = al(g, f.defaults),
            ap.types[h] = j,
            ap.prototype[h] = function(k, d) {
                var l = ak(ap.defaults.global, ap.defaults[h], d || {});
                return new j(k, l, this)
            }
        } else {
            af("Name not provided for this chart, so it hasn't been registered")
        }
        return c
    },
    ap.Element = function(b) {
        al(this, b),
        this.initialize.apply(this, arguments),
        this.save()
    },
    al(ap.Element.prototype, {
        initialize: function() {},
        restore: function(b) {
            return b ? an(b,
            function(c) {
                this[c] = this._saved[c]
            },
            this) : al(this, this._saved),
            this
        },
        save: function() {
            return this._saved = am(this),
            delete this._saved._saved,
            this
        },
        update: function(b) {
            return an(b,
            function(d, c) {
                this._saved[c] = this[c],
                this[c] = d
            },
            this),
            this
        },
        transition: function(d, c) {
            return an(d,
            function(b, f) {
                this[f] = (b - this._saved[f]) * c + this._saved[f]
            },
            this),
            this
        },
        tooltipPosition: function() {
            return {
                x: this.x,
                y: this.y
            }
        },
        hasValue: function() {
            return ad(this.value)
        }
    }),
    ap.Element.extend = ai,
    ap.Point = ap.Element.extend({
        display: !0,
        inRange: function(f, d) {
            var g = this.hitDetectionRadius + this.radius;
            return Math.pow(f - this.x, 2) + Math.pow(d - this.y, 2) < Math.pow(g, 2)
        },
        draw: function() {
            if (this.display) {
                var b = this.ctx;
                b.beginPath(),
                b.arc(this.x, this.y, this.radius, 0, 2 * Math.PI),
                b.closePath(),
                b.strokeStyle = this.strokeColor,
                b.lineWidth = this.strokeWidth,
                b.fillStyle = this.fillColor,
                b.fill(),
                b.stroke()
            }
        }
    }),
    ap.Arc = ap.Element.extend({
        inRange: function(g, d) {
            var k = ao.getAngleFromPoint(this, {
                x: g,
                y: d
            }),
            j = k.angle >= this.startAngle && k.angle <= this.endAngle,
            h = k.distance >= this.innerRadius && k.distance <= this.outerRadius;
            return j && h
        },
        tooltipPosition: function() {
            var d = this.startAngle + (this.endAngle - this.startAngle) / 2,
            c = (this.outerRadius - this.innerRadius) / 2 + this.innerRadius;
            return {
                x: this.x + Math.cos(d) * c,
                y: this.y + Math.sin(d) * c
            }
        },
        draw: function(d) {
            var c = this.ctx;
            c.beginPath(),
            c.arc(this.x, this.y, this.outerRadius, this.startAngle, this.endAngle),
            c.arc(this.x, this.y, this.innerRadius, this.endAngle, this.startAngle, !0),
            c.closePath(),
            c.strokeStyle = this.strokeColor,
            c.lineWidth = this.strokeWidth,
            c.fillStyle = this.fillColor,
            c.fill(),
            c.lineJoin = "bevel",
            this.showStroke && c.stroke()
        }
    }),
    ap.Rectangle = ap.Element.extend({
        draw: function() {
            var h = this.ctx,
            g = this.width / 2,
            m = this.x - g,
            l = this.x + g,
            k = this.base - (this.base - this.y),
            j = this.strokeWidth / 2;
            this.showStroke && (m += j, l -= j, k += j),
            h.beginPath(),
            h.fillStyle = this.fillColor,
            h.strokeStyle = this.strokeColor,
            h.lineWidth = this.strokeWidth,
            h.moveTo(m, this.base),
            h.lineTo(m, k),
            h.lineTo(l, k),
            h.lineTo(l, this.base),
            h.fill(),
            this.showStroke && h.stroke()
        },
        height: function() {
            return this.base - this.y
        },
        inRange: function(d, c) {
            return d >= this.x - this.width / 2 && d <= this.x + this.width / 2 && c >= this.y && c <= this.base
        }
    }),
    ap.Tooltip = ap.Element.extend({
        draw: function() {
            var j = this.chart.ctx;
            j.font = P(this.fontSize, this.fontStyle, this.fontFamily),
            this.xAlign = "center",
            this.yAlign = "above";
            var h = this.caretPadding = 2,
            o = j.measureText(this.text).width + 2 * this.xPadding,
            n = this.fontSize + 2 * this.yPadding,
            m = n + this.caretHeight + h;
            this.x + o / 2 > this.chart.width ? this.xAlign = "left": this.x - o / 2 < 0 && (this.xAlign = "right"),
            this.y - m < 0 && (this.yAlign = "below");
            var l = this.x - o / 2,
            k = this.y - m;
            if (j.fillStyle = this.fillColor, this.custom) {
                this.custom(this)
            } else {
                switch (this.yAlign) {
                case "above":
                    j.beginPath(),
                    j.moveTo(this.x, this.y - h),
                    j.lineTo(this.x + this.caretHeight, this.y - (h + this.caretHeight)),
                    j.lineTo(this.x - this.caretHeight, this.y - (h + this.caretHeight)),
                    j.closePath(),
                    j.fill();
                    break;
                case "below":
                    k = this.y + h + this.caretHeight,
                    j.beginPath(),
                    j.moveTo(this.x, this.y + h),
                    j.lineTo(this.x + this.caretHeight, this.y + h + this.caretHeight),
                    j.lineTo(this.x - this.caretHeight, this.y + h + this.caretHeight),
                    j.closePath(),
                    j.fill()
                }
                switch (this.xAlign) {
                case "left":
                    l = this.x - o + (this.cornerRadius + this.caretHeight);
                    break;
                case "right":
                    l = this.x - (this.cornerRadius + this.caretHeight)
                }
                L(j, l, k, o, n, this.cornerRadius),
                j.fill(),
                j.fillStyle = this.textColor,
                j.textAlign = "center",
                j.textBaseline = "middle",
                j.fillText(this.text, l + o / 2, k + n / 2)
            }
        }
    }),
    ap.MultiTooltip = ap.Element.extend({
        initialize: function() {
            this.font = P(this.fontSize, this.fontStyle, this.fontFamily),
            this.titleFont = P(this.titleFontSize, this.titleFontStyle, this.titleFontFamily),
            this.height = this.labels.length * this.fontSize + (this.labels.length - 1) * (this.fontSize / 2) + 2 * this.yPadding + 1.5 * this.titleFontSize,
            this.ctx.font = this.titleFont;
            var g = this.ctx.measureText(this.title).width,
            f = N(this.ctx, this.font, this.labels) + this.fontSize + 3,
            j = ac([f, g]);
            this.width = j + 2 * this.xPadding;
            var h = this.height / 2;
            this.y - h < 0 ? this.y = h: this.y + h > this.chart.height && (this.y = this.chart.height - h),
            this.x > this.chart.width / 2 ? this.x -= this.xOffset + this.width: this.x += this.xOffset
        },
        getLineHeight: function(f) {
            var d = this.y - this.height / 2 + this.yPadding,
            g = f - 1;
            return 0 === f ? d + this.titleFontSize / 2 : d + (1.5 * this.fontSize * g + this.fontSize / 2) + 1.5 * this.titleFontSize
        },
        draw: function() {
            if (this.custom) {
                this.custom(this)
            } else {
                L(this.ctx, this.x, this.y - this.height / 2, this.width, this.height, this.cornerRadius);
                var b = this.ctx;
                b.fillStyle = this.fillColor,
                b.fill(),
                b.closePath(),
                b.textAlign = "left",
                b.textBaseline = "middle",
                b.fillStyle = this.titleTextColor,
                b.font = this.titleFont,
                b.fillText(this.title, this.x + this.xPadding, this.getLineHeight(0)),
                b.font = this.font,
                ao.each(this.labels,
                function(d, f) {
                    b.fillStyle = this.textColor,
                    b.fillText(d, this.x + this.xPadding + this.fontSize + 3, this.getLineHeight(f + 1)),
                    b.fillStyle = this.legendColorBackground,
                    b.fillRect(this.x + this.xPadding, this.getLineHeight(f + 1) - this.fontSize / 2, this.fontSize, this.fontSize),
                    b.fillStyle = this.legendColors[f].fill,
                    b.fillRect(this.x + this.xPadding, this.getLineHeight(f + 1) - this.fontSize / 2, this.fontSize, this.fontSize)
                },
                this)
            }
        }
    }),
    ap.Scale = ap.Element.extend({
        initialize: function() {
            this.fit()
        },
        buildYLabels: function() {
            this.yLabels = [];
            for (var d = Y(this.stepValue), c = 0; c <= this.steps; c++) {
                this.yLabels.push(Q(this.templateString, {
                    value: (this.min + c * this.stepValue).toFixed(d)
                }))
            }
            this.yLabelWidth = this.display && this.showLabels ? N(this.ctx, this.font, this.yLabels) : 0
        },
        addXLabel: function(b) {
            this.xLabels.push(b),
            this.valuesCount++,
            this.fit()
        },
        removeXLabel: function() {
            this.xLabels.shift(),
            this.valuesCount--,
            this.fit()
        },
        fit: function() {
            this.startPoint = this.display ? this.fontSize: 0,
            this.endPoint = this.display ? this.height - 1.5 * this.fontSize - 5 : this.height,
            this.startPoint += this.padding,
            this.endPoint -= this.padding;
            var d, c = this.endPoint - this.startPoint;
            for (this.calculateYRange(c), this.buildYLabels(), this.calculateXLabelRotation(); c > this.endPoint - this.startPoint;) {
                c = this.endPoint - this.startPoint,
                d = this.yLabelWidth,
                this.calculateYRange(c),
                this.buildYLabels(),
                d < this.yLabelWidth && this.calculateXLabelRotation()
            }
        },
        calculateXLabelRotation: function() {
            this.ctx.font = this.font;
            var j, h, o = this.ctx.measureText(this.xLabels[0]).width,
            n = this.ctx.measureText(this.xLabels[this.xLabels.length - 1]).width;
            if (this.xScalePaddingRight = n / 2 + 3, this.xScalePaddingLeft = o / 2 > this.yLabelWidth + 10 ? o / 2 : this.yLabelWidth + 10, this.xLabelRotation = 0, this.display) {
                var m, l = N(this.ctx, this.font, this.xLabels);
                this.xLabelWidth = l;
                for (var k = Math.floor(this.calculateX(1) - this.calculateX(0)) - 6; this.xLabelWidth > k && 0 === this.xLabelRotation || this.xLabelWidth > k && this.xLabelRotation <= 90 && this.xLabelRotation > 0;) {
                    m = Math.cos(W(this.xLabelRotation)),
                    j = m * o,
                    h = m * n,
                    j + this.fontSize / 2 > this.yLabelWidth + 8 && (this.xScalePaddingLeft = j + this.fontSize / 2),
                    this.xScalePaddingRight = this.fontSize / 2,
                    this.xLabelRotation++,
                    this.xLabelWidth = m * l
                }
                this.xLabelRotation > 0 && (this.endPoint -= Math.sin(W(this.xLabelRotation)) * l + 3)
            } else {
                this.xLabelWidth = 0,
                this.xScalePaddingRight = this.padding,
                this.xScalePaddingLeft = this.padding
            }
        },
        calculateYRange: ah,
        drawingArea: function() {
            return this.startPoint - this.endPoint
        },
        calculateY: function(d) {
            var c = this.drawingArea() / (this.min - this.max);
            return this.endPoint - c * (d - this.min)
        },
        calculateX: function(g) {
            var f = (this.xLabelRotation > 0, this.width - (this.xScalePaddingLeft + this.xScalePaddingRight)),
            j = f / Math.max(this.valuesCount - (this.offsetGridLines ? 0 : 1), 1),
            h = j * g + this.xScalePaddingLeft;
            return this.offsetGridLines && (h += j / 2),
            Math.round(h)
        },
        update: function(b) {
            ao.extend(this, b),
            this.fit()
        },
        draw: function() {
            var f = this.ctx,
            d = (this.endPoint - this.startPoint) / this.steps,
            g = Math.round(this.xScalePaddingLeft);
            this.display && (f.fillStyle = this.textColor, f.font = this.font, an(this.yLabels,
            function(l, k) {
                var j = this.endPoint - d * k,
                c = Math.round(j),
                b = this.showHorizontalLines;
                f.textAlign = "right",
                f.textBaseline = "middle",
                this.showLabels && f.fillText(l, g - 10, j),
                0 !== k || b || (b = !0),
                b && f.beginPath(),
                k > 0 ? (f.lineWidth = this.gridLineWidth, f.strokeStyle = this.gridLineColor) : (f.lineWidth = this.lineWidth, f.strokeStyle = this.lineColor),
                c += ao.aliasPixel(f.lineWidth),
                b && (f.moveTo(g, c), f.lineTo(this.width, c), f.stroke(), f.closePath()),
                f.lineWidth = this.lineWidth,
                f.strokeStyle = this.lineColor,
                f.beginPath(),
                f.moveTo(g - 5, c),
                f.lineTo(g, c),
                f.stroke(),
                f.closePath()
            },
            this), an(this.xLabels,
            function(h, n) {
                var m = this.calculateX(n) + U(this.lineWidth),
                l = this.calculateX(n - (this.offsetGridLines ? 0.5 : 0)) + U(this.lineWidth),
                k = this.xLabelRotation > 0,
                j = this.showVerticalLines;
                0 !== n || j || (j = !0),
                j && f.beginPath(),
                n > 0 ? (f.lineWidth = this.gridLineWidth, f.strokeStyle = this.gridLineColor) : (f.lineWidth = this.lineWidth, f.strokeStyle = this.lineColor),
                j && (f.moveTo(l, this.endPoint), f.lineTo(l, this.startPoint - 3), f.stroke(), f.closePath()),
                f.lineWidth = this.lineWidth,
                f.strokeStyle = this.lineColor,
                f.beginPath(),
                f.moveTo(l, this.endPoint),
                f.lineTo(l, this.endPoint + 5),
                f.stroke(),
                f.closePath(),
                f.save(),
                f.translate(m, k ? this.endPoint + 12 : this.endPoint + 8),
                f.rotate( - 1 * W(this.xLabelRotation)),
                f.font = this.font,
                f.textAlign = k ? "right": "center",
                f.textBaseline = k ? "middle": "top",
                f.fillText(h, 0, 0),
                f.restore()
            },
            this))
        }
    }),
    ap.RadialScale = ap.Element.extend({
        initialize: function() {
            this.size = aa([this.height, this.width]),
            this.drawingArea = this.display ? this.size / 2 - (this.fontSize / 2 + this.backdropPaddingY) : this.size / 2
        },
        calculateCenterOffset: function(d) {
            var c = this.drawingArea / (this.max - this.min);
            return (d - this.min) * c
        },
        update: function() {
            this.lineArc ? this.drawingArea = this.display ? this.size / 2 - (this.fontSize / 2 + this.backdropPaddingY) : this.size / 2 : this.setScaleSize(),
            this.buildYLabels()
        },
        buildYLabels: function() {
            this.yLabels = [];
            for (var d = Y(this.stepValue), c = 0; c <= this.steps; c++) {
                this.yLabels.push(Q(this.templateString, {
                    value: (this.min + c * this.stepValue).toFixed(d)
                }))
            }
        },
        getCircumference: function() {
            return 2 * Math.PI / this.valuesCount
        },
        setScaleSize: function() {
            var D, C, B, A, z, y, x, w, v, u, t, s, r = aa([this.height / 2 - this.pointLabelFontSize - 5, this.width / 2]),
            q = this.width,
            o = 0;
            for (this.ctx.font = P(this.pointLabelFontSize, this.pointLabelFontStyle, this.pointLabelFontFamily), C = 0; C < this.valuesCount; C++) {
                D = this.getPointPosition(C, r),
                B = this.ctx.measureText(Q(this.templateString, {
                    value: this.labels[C]
                })).width + 5,
                0 === C || C === this.valuesCount / 2 ? (A = B / 2, D.x + A > q && (q = D.x + A, z = C), D.x - A < o && (o = D.x - A, x = C)) : C < this.valuesCount / 2 ? D.x + B > q && (q = D.x + B, z = C) : C > this.valuesCount / 2 && D.x - B < o && (o = D.x - B, x = C)
            }
            v = o,
            u = Math.ceil(q - this.width),
            y = this.getIndexAngle(z),
            w = this.getIndexAngle(x),
            t = u / Math.sin(y + Math.PI / 2),
            s = v / Math.sin(w + Math.PI / 2),
            t = ad(t) ? t: 0,
            s = ad(s) ? s: 0,
            this.drawingArea = r - (s + t) / 2,
            this.setCenterPoint(s, t)
        },
        setCenterPoint: function(g, f) {
            var j = this.width - f - this.drawingArea,
            h = g + this.drawingArea;
            this.xCenter = (h + j) / 2,
            this.yCenter = this.height / 2
        },
        getIndexAngle: function(d) {
            var c = 2 * Math.PI / this.valuesCount;
            return d * c - Math.PI / 2
        },
        getPointPosition: function(f, d) {
            var g = this.getIndexAngle(f);
            return {
                x: Math.cos(g) * d + this.xCenter,
                y: Math.sin(g) * d + this.yCenter
            }
        },
        draw: function() {
            if (this.display) {
                var s = this.ctx;
                if (an(this.yLabels,
                function(j, y) {
                    if (y > 0) {
                        var x, w = y * (this.drawingArea / this.steps),
                        v = this.yCenter - w;
                        if (this.lineWidth > 0) {
                            if (s.strokeStyle = this.lineColor, s.lineWidth = this.lineWidth, this.lineArc) {
                                s.beginPath(),
                                s.arc(this.xCenter, this.yCenter, w, 0, 2 * Math.PI),
                                s.closePath(),
                                s.stroke()
                            } else {
                                s.beginPath();
                                for (var u = 0; u < this.valuesCount; u++) {
                                    x = this.getPointPosition(u, this.calculateCenterOffset(this.min + y * this.stepValue)),
                                    0 === u ? s.moveTo(x.x, x.y) : s.lineTo(x.x, x.y)
                                }
                                s.closePath(),
                                s.stroke()
                            }
                        }
                        if (this.showLabels) {
                            if (s.font = P(this.fontSize, this.fontStyle, this.fontFamily), this.showLabelBackdrop) {
                                var t = s.measureText(j).width;
                                s.fillStyle = this.backdropColor,
                                s.fillRect(this.xCenter - t / 2 - this.backdropPaddingX, v - this.fontSize / 2 - this.backdropPaddingY, t + 2 * this.backdropPaddingX, this.fontSize + 2 * this.backdropPaddingY)
                            }
                            s.textAlign = "center",
                            s.textBaseline = "middle",
                            s.fillStyle = this.fontColor,
                            s.fillText(j, this.xCenter, v)
                        }
                    }
                },
                this), !this.lineArc) {
                    s.lineWidth = this.angleLineWidth,
                    s.strokeStyle = this.angleLineColor;
                    for (var r = this.valuesCount - 1; r >= 0; r--) {
                        if (this.angleLineWidth > 0) {
                            var q = this.getPointPosition(r, this.calculateCenterOffset(this.max));
                            s.beginPath(),
                            s.moveTo(this.xCenter, this.yCenter),
                            s.lineTo(q.x, q.y),
                            s.stroke(),
                            s.closePath()
                        }
                        var p = this.getPointPosition(r, this.calculateCenterOffset(this.max) + 5);
                        s.font = P(this.pointLabelFontSize, this.pointLabelFontStyle, this.pointLabelFontFamily),
                        s.fillStyle = this.pointLabelFontColor;
                        var o = this.labels.length,
                        n = this.labels.length / 2,
                        m = n / 2,
                        l = m > r || r > o - m,
                        k = r === m || r === o - m;
                        s.textAlign = 0 === r ? "center": r === n ? "center": n > r ? "left": "right",
                        s.textBaseline = k ? "middle": l ? "bottom": "top",
                        s.fillText(this.labels[r], p.x, p.y)
                    }
                }
            }
        }
    }),
    ao.addEvent(window, "resize",
    function() {
        var b;
        return function() {
            clearTimeout(b),
            b = setTimeout(function() {
                an(ap.instances,
                function(c) {
                    c.options.responsive && c.resize(c.render, !0)
                })
            },
            50)
        }
    } ()),
    ae ? define(function() {
        return ap
    }) : "object" == typeof module && module.exports && (module.exports = ap),
    aq.Chart = ap,
    ar.fn.chart = function() {
        var b = [];
        return this.each(function() {
            b.push(new ap(this.getContext("2d")))
        }),
        1 === b.length ? b[0] : b
    }
}).call(this, jQuery),
function(g) {
    var f = g && g.zui ? g.zui: this,
    k = f.Chart,
    j = k.helpers,
    h = {
        scaleShowGridLines: !0,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: !0,
        scaleShowVerticalLines: !0,
        bezierCurve: !0,
        bezierCurveTension: 0.4,
        pointDot: !0,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: !0,
        datasetStrokeWidth: 2,
        datasetFill: !0,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };
    k.Type.extend({
        name: "Line",
        defaults: h,
        initialize: function(c) {
            this.PointClass = k.Point.extend({
                strokeWidth: this.options.pointDotStrokeWidth,
                radius: this.options.pointDotRadius,
                display: this.options.pointDot,
                hitDetectionRadius: this.options.pointHitDetectionRadius,
                ctx: this.chart.ctx,
                inRange: function(b) {
                    return Math.pow(b - this.x, 2) < Math.pow(this.radius + this.hitDetectionRadius, 2)
                }
            }),
            this.datasets = [],
            this.options.showTooltips && j.bindEvents(this, this.options.tooltipEvents,
            function(l) {
                var d = "mouseout" !== l.type ? this.getPointsAtEvent(l) : [];
                this.eachPoints(function(b) {
                    b.restore(["fillColor", "strokeColor"])
                }),
                j.each(d,
                function(b) {
                    b.fillColor = b.highlightFill,
                    b.strokeColor = b.highlightStroke
                }),
                this.showTooltip(d)
            }),
            j.each(c.datasets,
            function(m) {
                if (g.zui && g.zui.Color && g.zui.Color.get) {
                    var l = g.zui.Color.get(m.color),
                    d = l.toCssStr();
                    m.fillColor || (m.fillColor = l.clone().fade(20).toCssStr()),
                    m.strokeColor || (m.strokeColor = d),
                    m.pointColor || (m.pointColor = d),
                    m.pointStrokeColor || (m.pointStrokeColor = "#fff"),
                    m.pointHighlightFill || (m.pointHighlightFill = "#fff"),
                    m.pointHighlightStroke || (m.pointHighlightStroke = d)
                }
                var b = {
                    label: m.label || null,
                    fillColor: m.fillColor,
                    strokeColor: m.strokeColor,
                    pointColor: m.pointColor,
                    pointStrokeColor: m.pointStrokeColor,
                    showTooltips: m.showTooltips !== !1,
                    points: []
                };
                this.datasets.push(b),
                j.each(m.data,
                function(n, o) {
                    b.points.push(new this.PointClass({
                        value: n,
                        label: c.labels[o],
                        datasetLabel: m.label,
                        strokeColor: m.pointStrokeColor,
                        fillColor: m.pointColor,
                        highlightFill: m.pointHighlightFill || m.pointColor,
                        highlightStroke: m.pointHighlightStroke || m.pointStrokeColor
                    }))
                },
                this),
                this.buildScale(c.labels),
                this.eachPoints(function(o, n) {
                    j.extend(o, {
                        x: this.scale.calculateX(n),
                        y: this.scale.endPoint
                    }),
                    o.save()
                },
                this)
            },
            this),
            this.render()
        },
        update: function() {
            this.scale.update(),
            j.each(this.activeElements,
            function(b) {
                b.restore(["fillColor", "strokeColor"])
            }),
            this.eachPoints(function(b) {
                b.save()
            }),
            this.render()
        },
        eachPoints: function(b) {
            j.each(this.datasets,
            function(c) {
                j.each(c.points, b, this)
            },
            this)
        },
        getPointsAtEvent: function(l) {
            var d = [],
            m = j.getRelativePosition(l);
            return j.each(this.datasets,
            function(b) {
                j.each(b.points,
                function(c) {
                    c.inRange(m.x, m.y) && d.push(c)
                })
            },
            this),
            d
        },
        buildScale: function(d) {
            var c = this,
            m = function() {
                var b = [];
                return c.eachPoints(function(n) {
                    b.push(n.value)
                }),
                b
            },
            l = {
                templateString: this.options.scaleLabel,
                height: this.chart.height,
                width: this.chart.width,
                ctx: this.chart.ctx,
                textColor: this.options.scaleFontColor,
                fontSize: this.options.scaleFontSize,
                fontStyle: this.options.scaleFontStyle,
                fontFamily: this.options.scaleFontFamily,
                valuesCount: d.length,
                beginAtZero: this.options.scaleBeginAtZero,
                integersOnly: this.options.scaleIntegersOnly,
                calculateYRange: function(o) {
                    var n = j.calculateScaleRange(m(), o, this.fontSize, this.beginAtZero, this.integersOnly);
                    j.extend(this, n)
                },
                xLabels: d,
                font: j.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                lineWidth: this.options.scaleLineWidth,
                lineColor: this.options.scaleLineColor,
                showHorizontalLines: this.options.scaleShowHorizontalLines,
                showVerticalLines: this.options.scaleShowVerticalLines,
                gridLineWidth: this.options.scaleShowGridLines ? this.options.scaleGridLineWidth: 0,
                gridLineColor: this.options.scaleShowGridLines ? this.options.scaleGridLineColor: "rgba(0,0,0,0)",
                padding: this.options.showScale ? 0 : this.options.pointDotRadius + this.options.pointDotStrokeWidth,
                showLabels: this.options.scaleShowLabels,
                display: this.options.showScale
            };
            this.options.scaleOverride && j.extend(l, {
                calculateYRange: j.noop,
                steps: this.options.scaleSteps,
                stepValue: this.options.scaleStepWidth,
                min: this.options.scaleStartValue,
                max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
            }),
            this.scale = new k.Scale(l)
        },
        addData: function(d, c) {
            j.each(d,
            function(b, l) {
                this.datasets[l].points.push(new this.PointClass({
                    value: b,
                    label: c,
                    x: this.scale.calculateX(this.scale.valuesCount + 1),
                    y: this.scale.endPoint,
                    strokeColor: this.datasets[l].pointStrokeColor,
                    fillColor: this.datasets[l].pointColor
                }))
            },
            this),
            this.scale.addXLabel(c),
            this.update()
        },
        removeData: function() {
            this.scale.removeXLabel(),
            j.each(this.datasets,
            function(b) {
                b.points.shift()
            },
            this),
            this.update()
        },
        reflow: function() {
            var b = j.extend({
                height: this.chart.height,
                width: this.chart.width
            });
            this.scale.update(b)
        },
        draw: function(l) {
            var d = l || 1;
            this.clear();
            var p = this.chart.ctx,
            o = function(b) {
                return null !== b.value
            },
            n = function(r, q, s) {
                return j.findNextWhere(q, o, s) || r
            },
            m = function(r, q, s) {
                return j.findPreviousWhere(q, o, s) || r
            };
            this.scale.draw(d),
            j.each(this.datasets,
            function(b) {
                var c = j.where(b.points, o);
                j.each(b.points,
                function(q, r) {
                    q.hasValue() && q.transition({
                        y: this.scale.calculateY(q.value),
                        x: this.scale.calculateX(r)
                    },
                    d)
                },
                this),
                this.options.bezierCurve && j.each(c,
                function(r, q) {
                    var s = q > 0 && q < c.length - 1 ? this.options.bezierCurveTension: 0;
                    r.controlPoints = j.splineCurve(m(r, c, q), r, n(r, c, q), s),
                    r.controlPoints.outer.y > this.scale.endPoint ? r.controlPoints.outer.y = this.scale.endPoint: r.controlPoints.outer.y < this.scale.startPoint && (r.controlPoints.outer.y = this.scale.startPoint),
                    r.controlPoints.inner.y > this.scale.endPoint ? r.controlPoints.inner.y = this.scale.endPoint: r.controlPoints.inner.y < this.scale.startPoint && (r.controlPoints.inner.y = this.scale.startPoint)
                },
                this),
                p.lineWidth = this.options.datasetStrokeWidth,
                p.strokeStyle = b.strokeColor,
                p.beginPath(),
                j.each(c,
                function(r, q) {
                    if (0 === q) {
                        p.moveTo(r.x, r.y)
                    } else {
                        if (this.options.bezierCurve) {
                            var s = m(r, c, q);
                            p.bezierCurveTo(s.controlPoints.outer.x, s.controlPoints.outer.y, r.controlPoints.inner.x, r.controlPoints.inner.y, r.x, r.y)
                        } else {
                            p.lineTo(r.x, r.y)
                        }
                    }
                },
                this),
                p.stroke(),
                this.options.datasetFill && c.length > 0 && (p.lineTo(c[c.length - 1].x, this.scale.endPoint), p.lineTo(c[0].x, this.scale.endPoint), p.fillStyle = b.fillColor, p.closePath(), p.fill()),
                j.each(c,
                function(q) {
                    q.draw()
                })
            },
            this)
        }
    }),
    g.fn.lineChart = function(c, m) {
        var l = [];
        return this.each(function() {
            var b = g(this);
            l.push(new k(this.getContext("2d")).Line(c, g.extend(b.data(), m)))
        }),
        1 === l.length ? l[0] : l
    }
}.call(this, jQuery),
function(g) {
    var f = g && g.zui ? g.zui: this,
    k = f.Chart,
    j = k.helpers,
    h = {
        scaleBeginAtZero: !0,
        scaleShowGridLines: !0,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: !0,
        scaleShowVerticalLines: !0,
        barShowStroke: !0,
        barStrokeWidth: 1,
        barValueSpacing: 5,
        barDatasetSpacing: 1,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };
    k.Type.extend({
        name: "Bar",
        defaults: h,
        initialize: function(c) {
            var d = this.options;
            this.ScaleClass = k.Scale.extend({
                offsetGridLines: !0,
                calculateBarX: function(m, l, q) {
                    var p = this.calculateBaseWidth(),
                    o = this.calculateX(q) - p / 2,
                    n = this.calculateBarWidth(m);
                    return o + n * l + l * d.barDatasetSpacing + n / 2
                },
                calculateBaseWidth: function() {
                    return this.calculateX(1) - this.calculateX(0) - 2 * d.barValueSpacing
                },
                calculateBarWidth: function(m) {
                    var l = this.calculateBaseWidth() - (m - 1) * d.barDatasetSpacing;
                    return l / m
                }
            }),
            this.datasets = [],
            this.options.showTooltips && j.bindEvents(this, this.options.tooltipEvents,
            function(m) {
                var l = "mouseout" !== m.type ? this.getBarsAtEvent(m) : [];
                this.eachBars(function(b) {
                    b.restore(["fillColor", "strokeColor"])
                }),
                j.each(l,
                function(b) {
                    b.fillColor = b.highlightFill,
                    b.strokeColor = b.highlightStroke
                }),
                this.showTooltip(l)
            }),
            this.BarClass = k.Rectangle.extend({
                strokeWidth: this.options.barStrokeWidth,
                showStroke: this.options.barShowStroke,
                ctx: this.chart.ctx
            }),
            j.each(c.datasets,
            function(o, n) {
                if (g.zui && g.zui.Color && g.zui.Color.get) {
                    var m = g.zui.Color.get(o.color),
                    l = m.toCssStr();
                    o.fillColor || (o.fillColor = m.clone().fade(50).toCssStr()),
                    o.strokeColor || (o.strokeColor = l)
                }
                var b = {
                    label: o.label || null,
                    fillColor: o.fillColor,
                    strokeColor: o.strokeColor,
                    bars: []
                };
                this.datasets.push(b),
                j.each(o.data,
                function(p, q) {
                    b.bars.push(new this.BarClass({
                        value: p,
                        label: c.labels[q],
                        datasetLabel: o.label,
                        strokeColor: o.strokeColor,
                        fillColor: o.fillColor,
                        highlightFill: o.highlightFill || o.fillColor,
                        highlightStroke: o.highlightStroke || o.strokeColor
                    }))
                },
                this)
            },
            this),
            this.buildScale(c.labels),
            this.BarClass.prototype.base = this.scale.endPoint,
            this.eachBars(function(m, l, n) {
                j.extend(m, {
                    width: this.scale.calculateBarWidth(this.datasets.length),
                    x: this.scale.calculateBarX(this.datasets.length, n, l),
                    y: this.scale.endPoint
                }),
                m.save()
            },
            this),
            this.render()
        },
        update: function() {
            this.scale.update(),
            j.each(this.activeElements,
            function(b) {
                b.restore(["fillColor", "strokeColor"])
            }),
            this.eachBars(function(b) {
                b.save()
            }),
            this.render()
        },
        eachBars: function(b) {
            j.each(this.datasets,
            function(d, l) {
                j.each(d.bars, b, this, l)
            },
            this)
        },
        getBarsAtEvent: function(l) {
            for (var d, p = [], o = j.getRelativePosition(l), n = function(b) {
                p.push(b.bars[d])
            },
            m = 0; m < this.datasets.length; m++) {
                for (d = 0; d < this.datasets[m].bars.length; d++) {
                    if (this.datasets[m].bars[d].inRange(o.x, o.y)) {
                        return j.each(this.datasets, n),
                        p
                    }
                }
            }
            return p
        },
        buildScale: function(l) {
            var d = this,
            n = function() {
                var b = [];
                return d.eachBars(function(c) {
                    b.push(c.value)
                }),
                b
            },
            m = {
                templateString: this.options.scaleLabel,
                height: this.chart.height,
                width: this.chart.width,
                ctx: this.chart.ctx,
                textColor: this.options.scaleFontColor,
                fontSize: this.options.scaleFontSize,
                fontStyle: this.options.scaleFontStyle,
                fontFamily: this.options.scaleFontFamily,
                valuesCount: l.length,
                beginAtZero: this.options.scaleBeginAtZero,
                integersOnly: this.options.scaleIntegersOnly,
                calculateYRange: function(o) {
                    var c = j.calculateScaleRange(n(), o, this.fontSize, this.beginAtZero, this.integersOnly);
                    j.extend(this, c)
                },
                xLabels: l,
                font: j.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                lineWidth: this.options.scaleLineWidth,
                lineColor: this.options.scaleLineColor,
                showHorizontalLines: this.options.scaleShowHorizontalLines,
                showVerticalLines: this.options.scaleShowVerticalLines,
                gridLineWidth: this.options.scaleShowGridLines ? this.options.scaleGridLineWidth: 0,
                gridLineColor: this.options.scaleShowGridLines ? this.options.scaleGridLineColor: "rgba(0,0,0,0)",
                padding: this.options.showScale ? 0 : this.options.barShowStroke ? this.options.barStrokeWidth: 0,
                showLabels: this.options.scaleShowLabels,
                display: this.options.showScale
            };
            this.options.scaleOverride && j.extend(m, {
                calculateYRange: j.noop,
                steps: this.options.scaleSteps,
                stepValue: this.options.scaleStepWidth,
                min: this.options.scaleStartValue,
                max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
            }),
            this.scale = new this.ScaleClass(m)
        },
        addData: function(d, c) {
            j.each(d,
            function(b, l) {
                this.datasets[l].bars.push(new this.BarClass({
                    value: b,
                    label: c,
                    x: this.scale.calculateBarX(this.datasets.length, l, this.scale.valuesCount + 1),
                    y: this.scale.endPoint,
                    width: this.scale.calculateBarWidth(this.datasets.length),
                    base: this.scale.endPoint,
                    strokeColor: this.datasets[l].strokeColor,
                    fillColor: this.datasets[l].fillColor
                }))
            },
            this),
            this.scale.addXLabel(c),
            this.update()
        },
        removeData: function() {
            this.scale.removeXLabel(),
            j.each(this.datasets,
            function(b) {
                b.bars.shift()
            },
            this),
            this.update()
        },
        reflow: function() {
            j.extend(this.BarClass.prototype, {
                y: this.scale.endPoint,
                base: this.scale.endPoint
            });
            var b = j.extend({
                height: this.chart.height,
                width: this.chart.width
            });
            this.scale.update(b)
        },
        draw: function(d) {
            var c = d || 1;
            this.clear();
            this.chart.ctx;
            this.scale.draw(c),
            j.each(this.datasets,
            function(b, l) {
                j.each(b.bars,
                function(m, n) {
                    m.hasValue() && (m.base = this.scale.endPoint, m.transition({
                        x: this.scale.calculateBarX(this.datasets.length, l, n),
                        y: this.scale.calculateY(m.value),
                        width: this.scale.calculateBarWidth(this.datasets.length)
                    },
                    c).draw())
                },
                this)
            },
            this)
        }
    }),
    g.fn.barChart = function(c, m) {
        var l = [];
        return this.each(function() {
            var b = g(this);
            l.push(new k(this.getContext("2d")).Bar(c, g.extend(b.data(), m)))
        }),
        1 === l.length ? l[0] : l
    }
}.call(this, jQuery);