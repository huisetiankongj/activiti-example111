jQuery.cookie = function(c, l, o) {
    if (typeof l != "undefined") {
        o = o || {};
        if (l === null) {
            l = "";
            o.expires = -1
        }
        var g = "";
        if (o.expires && (typeof o.expires == "number" || o.expires.toUTCString)) {
            var h;
            if (typeof o.expires == "number") {
                h = new Date();
                h.setTime(h.getTime() + (o.expires * 24 * 60 * 60 * 1000))
            } else {
                h = o.expires
            }
            g = "; expires=" + h.toUTCString()
        }
        var n = o.path ? "; path=" + (o.path) : "";
        var j = o.domain ? "; domain=" + (o.domain) : "";
        var b = o.secure ? "; secure": "";
        document.cookie = [c, "=", encodeURIComponent(l), g, n, j, b].join("")
    } else {
        var f = null;
        if (document.cookie && document.cookie != "") {
            var m = document.cookie.split(";");
            for (var k = 0; k < m.length; k++) {
                var d = jQuery.trim(m[k]);
                if (d.substring(0, c.length + 1) == (c + "=")) {
                    f = decodeURIComponent(d.substring(c.length + 1));
                    break
                }
            }
        }
        return f
    }
}; (function(c) {
    c.hotkeys = {
        version: "0.8",
        specialKeys: {
            8 : "backspace",
            9 : "tab",
            13 : "return",
            16 : "shift",
            17 : "ctrl",
            18 : "alt",
            19 : "pause",
            20 : "capslock",
            27 : "esc",
            32 : "space",
            33 : "pageup",
            34 : "pagedown",
            35 : "end",
            36 : "home",
            37 : "left",
            38 : "up",
            39 : "right",
            40 : "down",
            45 : "insert",
            46 : "del",
            96 : "0",
            97 : "1",
            98 : "2",
            99 : "3",
            100 : "4",
            101 : "5",
            102 : "6",
            103 : "7",
            104 : "8",
            105 : "9",
            106 : "*",
            107 : "+",
            109 : "-",
            110 : ".",
            111 : "/",
            112 : "f1",
            113 : "f2",
            114 : "f3",
            115 : "f4",
            116 : "f5",
            117 : "f6",
            118 : "f7",
            119 : "f8",
            120 : "f9",
            121 : "f10",
            122 : "f11",
            123 : "f12",
            144 : "numlock",
            145 : "scroll",
            191 : "/",
            224 : "meta"
        },
        shiftNums: {
            "`": "~",
            "1": "!",
            "2": "@",
            "3": "#",
            "4": "$",
            "5": "%",
            "6": "^",
            "7": "&",
            "8": "*",
            "9": "(",
            "0": ")",
            "-": "_",
            "=": "+",
            ";": ": ",
            "'": '"',
            ",": "<",
            ".": ">",
            "/": "?",
            "\\": "|"
        }
    };
    function b(f) {
        if (typeof f.data !== "string") {
            return
        }
        var d = f.handler,
        g = f.data.toLowerCase().split(" ");
        f.handler = function(p) {
            if (this !== p.target && (/textarea|select/i.test(p.target.nodeName) || p.target.type === "text")) {
                return
            }
            var k = p.type !== "keypress" && c.hotkeys.specialKeys[p.which],
            q = String.fromCharCode(p.which).toLowerCase(),
            n,
            o = "",
            j = {};
            if (p.altKey && k !== "alt") {
                o += "alt+"
            }
            if (p.ctrlKey && k !== "ctrl") {
                o += "ctrl+"
            }
            if (p.metaKey && !p.ctrlKey && k !== "meta") {
                o += "meta+"
            }
            if (p.shiftKey && k !== "shift") {
                o += "shift+"
            }
            if (k) {
                j[o + k] = true
            } else {
                j[o + q] = true;
                j[o + c.hotkeys.shiftNums[q]] = true;
                if (o === "shift+") {
                    j[c.hotkeys.shiftNums[q]] = true
                }
            }
            for (var m = 0,
            h = g.length; m < h; m++) {
                if (j[g[m]]) {
                    return d.apply(this, arguments)
                }
            }
        }
    }
    c.each(["keydown", "keyup", "keypress"],
    function() {
        c.event.special[this] = {
            add: b
        }
    })
})(jQuery);

(function() {
    var j, h, o, n, m, l = {}.hasOwnProperty,
    k = function(g, f) {
        function q() {
            this.constructor = g
        }
        for (var p in f) {
            l.call(f, p) && (g[p] = f[p])
        }
        return q.prototype = f.prototype,
        g.prototype = new q,
        g.__super__ = f.prototype,
        g
    };
    n = function() {
        function c() {
            this.options_index = 0,
            this.parsed = []
        }
        return c.prototype.add_node = function(b) {
            return "OPTGROUP" === b.nodeName.toUpperCase() ? this.add_group(b) : this.add_option(b)
        },
        c.prototype.add_group = function(p) {
            var v, u, t, s, r, q;
            for (v = this.parsed.length, this.parsed.push({
                array_index: v,
                group: !0,
                label: this.escapeExpression(p.label),
                children: 0,
                disabled: p.disabled,
                title: p.title,
                search_keys: j.trim(p.getAttribute("data-keys") || "").replace(/,/, " ")
            }), r = p.childNodes, q = [], t = 0, s = r.length; s > t; t++) {
                u = r[t],
                q.push(this.add_option(u, v, p.disabled))
            }
            return q
        },
        c.prototype.add_option = function(f, p, g) {
            return "OPTION" === f.nodeName.toUpperCase() ? ("" !== f.text ? (null != p && (this.parsed[p].children += 1), this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                value: f.value,
                text: f.text,
                title: f.title,
                html: f.innerHTML,
                selected: f.selected,
                disabled: g === !0 ? g: f.disabled,
                group_array_index: p,
                classes: f.className,
                style: f.style.cssText,
                search_keys: j.trim(f.getAttribute("data-keys") || "").replace(/,/, " ")
            })) : this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                empty: !0
            }), this.options_index += 1) : void 0
        },
        c.prototype.escapeExpression = function(f) {
            var d, g;
            return null == f || f === !1 ? "": /[\&\<\>\"\'\`]/.test(f) ? (d = {
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            g = /&(?!\w+;)|[\<\>\"\'\`]/g, f.replace(g,
            function(b) {
                return d[b] || "&amp;"
            })) : f
        },
        c
    } (),
    n.select_to_array = function(p) {
        var d, t, s, r, q;
        for (t = new n, q = p.childNodes, s = 0, r = q.length; r > s; s++) {
            d = q[s],
            t.add_node(d)
        }
        return t.parsed
    },
    h = function() {
        function b(d, f) {
            this.form_field = d,
            this.options = null != f ? f: {},
            b.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers())
        }
        return b.prototype.set_default_values = function() {
            var c = this;
            return this.click_test_action = function(d) {
                return c.test_active_click(d)
            },
            this.activate_action = function(d) {
                return c.activate_field(d)
            },
            this.active_field = !1,
            this.mouse_on_container = !1,
            this.results_showing = !1,
            this.result_highlighted = null,
            this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text ? this.options.allow_single_deselect: !1,
            this.disable_search_threshold = this.options.disable_search_threshold || 0,
            this.disable_search = this.options.disable_search || !1,
            this.enable_split_word_search = null != this.options.enable_split_word_search ? this.options.enable_split_word_search: !0,
            this.group_search = null != this.options.group_search ? this.options.group_search: !0,
            this.search_contains = this.options.search_contains || !1,
            this.single_backstroke_delete = null != this.options.single_backstroke_delete ? this.options.single_backstroke_delete: !0,
            this.max_selected_options = this.options.max_selected_options || 1 / 0,
            this.inherit_select_classes = this.options.inherit_select_classes || !1,
            this.display_selected_options = null != this.options.display_selected_options ? this.options.display_selected_options: !0,
            this.display_disabled_options = null != this.options.display_disabled_options ? this.options.display_disabled_options: !0
        },
        b.prototype.set_default_text = function() {
            return this.default_text = this.form_field.getAttribute("data-placeholder") ? this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.options.placeholder_text_multiple || this.options.placeholder_text || b.default_multiple_text: this.options.placeholder_text_single || this.options.placeholder_text || b.default_single_text,
            this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || b.default_no_result_text
        },
        b.prototype.mouse_enter = function() {
            return this.mouse_on_container = !0
        },
        b.prototype.mouse_leave = function() {
            return this.mouse_on_container = !1
        },
        b.prototype.input_focus = function(d) {
            var c = this;
            if (this.is_multiple) {
                if (!this.active_field) {
                    return setTimeout(function() {
                        return c.container_mousedown()
                    },
                    50)
                }
            } else {
                if (!this.active_field) {
                    return this.activate_field()
                }
            }
        },
        b.prototype.input_blur = function(d) {
            var c = this;
            return this.mouse_on_container ? void 0 : (this.active_field = !1, setTimeout(function() {
                return c.blur_test()
            },
            100))
        },
        b.prototype.results_option_build = function(p) {
            var g, t, s, r, q;
            for (g = "", q = this.results_data, s = 0, r = q.length; r > s; s++) {
                t = q[s],
                g += t.group ? this.result_add_group(t) : this.result_add_option(t),
                (null != p ? p.first: void 0) && (t.selected && this.is_multiple ? this.choice_build(t) : t.selected && !this.is_multiple && this.single_set_selected_text(t.text))
            }
            return g
        },
        b.prototype.result_add_option = function(f) {
            var d, g;
            return f.search_match && this.include_option_in_results(f) ? (d = [], f.disabled || f.selected && this.is_multiple || d.push("active-result"), !f.disabled || f.selected && this.is_multiple || d.push("disabled-result"), f.selected && d.push("result-selected"), null != f.group_array_index && d.push("group-option"), "" !== f.classes && d.push(f.classes), g = document.createElement("li"), g.className = d.join(" "), g.style.cssText = f.style, g.title = f.title, g.setAttribute("data-option-array-index", f.array_index), g.innerHTML = f.search_text, this.outerHTML(g)) : ""
        },
        b.prototype.result_add_group = function(d) {
            var c;
            return (d.search_match || d.group_match) && d.active_options > 0 ? (c = document.createElement("li"), c.className = "group-result", c.title = d.title, c.innerHTML = d.search_text, this.outerHTML(c)) : ""
        },
        b.prototype.results_update_field = function() {
            return this.set_default_text(),
            this.is_multiple || this.results_reset_cleanup(),
            this.result_clear_highlight(),
            this.results_build(),
            this.results_showing ? this.winnow_results() : void 0
        },
        b.prototype.reset_single_select_options = function() {
            var g, f, r, q, p;
            for (q = this.results_data, p = [], f = 0, r = q.length; r > f; f++) {
                g = q[f],
                p.push(g.selected ? g.selected = !1 : void 0)
            }
            return p
        },
        b.prototype.results_toggle = function() {
            return this.results_showing ? this.results_hide() : this.results_show()
        },
        b.prototype.results_search = function(c) {
            return this.results_showing ? this.winnow_results() : this.results_show()
        },
        b.prototype.winnow_results = function() {
            var B, A, z, y, x, w, v, u, t, s, r, q, p;
            for (this.no_results_clear(), x = 0, v = this.get_search_text(), B = v.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), y = this.search_contains ? "": "^", z = new RegExp(y + B, "i"), s = new RegExp(B, "i"), p = this.results_data, r = 0, q = p.length; q > r; r++) {
                A = p[r],
                A.search_match = !1,
                w = null,
                this.include_option_in_results(A) && (A.group && (A.group_match = !1, A.active_options = 0), null != A.group_array_index && this.results_data[A.group_array_index] && (w = this.results_data[A.group_array_index], 0 === w.active_options && w.search_match && (x += 1), w.active_options += 1), (!A.group || this.group_search) && (A.search_text = A.group ? A.label: A.html, A.search_keys_match = this.search_string_match(A.search_keys, z), A.search_text_match = this.search_string_match(A.search_text, z), A.search_match = A.search_text_match || A.search_keys_match, A.search_match && !A.group && (x += 1), A.search_match ? (A.search_text_match && A.search_text.length ? (u = A.search_text.search(s), t = A.search_text.substr(0, u + v.length) + "</em>" + A.search_text.substr(u + v.length), A.search_text = t.substr(0, u) + "<em>" + t.substr(u)) : A.search_keys_match && A.search_keys.length && (u = A.search_keys.search(s), t = A.search_keys.substr(0, u + v.length) + "</em>" + A.search_keys.substr(u + v.length), A.search_text += '&nbsp; <small style="opacity: 0.7">' + t.substr(0, u) + "<em>" + t.substr(u) + "</small>"), null != w && (w.group_match = !0)) : null != A.group_array_index && this.results_data[A.group_array_index].search_match && (A.search_match = !0)))
            }
            return this.result_clear_highlight(),
            1 > x && v.length ? (this.update_results_content(""), this.no_results(v)) : (this.update_results_content(this.results_option_build()), this.winnow_results_set_highlight())
        },
        b.prototype.search_string_match = function(p, g) {
            var t, s, r, q;
            if (g.test(p)) {
                return ! 0
            }
            if (this.enable_split_word_search && (p.indexOf(" ") >= 0 || 0 === p.indexOf("[")) && (s = p.replace(/\[|\]/g, "").split(" "), s.length)) {
                for (r = 0, q = s.length; q > r; r++) {
                    if (t = s[r], g.test(t)) {
                        return ! 0
                    }
                }
            }
        },
        b.prototype.choices_count = function() {
            var g, f, q, p;
            if (null != this.selected_option_count) {
                return this.selected_option_count
            }
            for (this.selected_option_count = 0, p = this.form_field.options, f = 0, q = p.length; q > f; f++) {
                g = p[f],
                g.selected && "" != g.value && (this.selected_option_count += 1)
            }
            return this.selected_option_count
        },
        b.prototype.choices_click = function(c) {
            return c.preventDefault(),
            this.results_showing || this.is_disabled ? void 0 : this.results_show()
        },
        b.prototype.keyup_checker = function(f) {
            var d, g;
            switch (d = null != (g = f.which) ? g: f.keyCode, this.search_field_scale(), d) {
            case 8:
                if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0) {
                    return this.keydown_backstroke()
                }
                if (!this.pending_backstroke) {
                    return this.result_clear_highlight(),
                    this.results_search()
                }
                break;
            case 13:
                if (f.preventDefault(), this.results_showing) {
                    return this.result_select(f)
                }
                break;
            case 27:
                return this.results_showing && this.results_hide(),
                !0;
            case 9:
            case 38:
            case 40:
            case 16:
            case 91:
            case 17:
                break;
            default:
                return this.results_search()
            }
        },
        b.prototype.clipboard_event_checker = function(d) {
            var c = this;
            return setTimeout(function() {
                return c.results_search()
            },
            50)
        },
        b.prototype.container_width = function() {
            return null != this.options.width ? this.options.width: "" + this.form_field.offsetWidth + "px"
        },
        b.prototype.include_option_in_results = function(c) {
            return this.is_multiple && !this.display_selected_options && c.selected ? !1 : !this.display_disabled_options && c.disabled ? !1 : c.empty ? !1 : !0
        },
        b.prototype.search_results_touchstart = function(c) {
            return this.touch_started = !0,
            this.search_results_mouseover(c)
        },
        b.prototype.search_results_touchmove = function(c) {
            return this.touch_started = !1,
            this.search_results_mouseout(c)
        },
        b.prototype.search_results_touchend = function(c) {
            return this.touch_started ? this.search_results_mouseup(c) : void 0
        },
        b.prototype.outerHTML = function(d) {
            var c;
            return d.outerHTML ? d.outerHTML: (c = document.createElement("div"), c.appendChild(d), c.innerHTML)
        },
        b.browser_is_supported = function() {
            return "Microsoft Internet Explorer" === window.navigator.appName ? document.documentMode >= 8 : /iP(od|hone)/i.test(window.navigator.userAgent) ? !1 : /Android/i.test(window.navigator.userAgent) && /Mobile/i.test(window.navigator.userAgent) ? !1 : !0
        },
        b.default_multiple_text = "",
        b.default_single_text = "",
        b.default_no_result_text = "No results match",
        b
    } (),
    j = jQuery,
    j.fn.extend({
        chosen: function(b) {
            return h.browser_is_supported() ? this.each(function(c) {
                var g, d;
                g = j(this),
                d = g.data("chosen"),
                "destroy" === b && d ? d.destroy() : d || g.data("chosen", new o(this, b))
            }) : this
        }
    }),
    o = function(d) {
        function f() {
            return m = f.__super__.constructor.apply(this, arguments)
        }
        return k(f, d),
        f.prototype.setup = function() {
            return this.form_field_jq = j(this.form_field),
            this.current_selectedIndex = this.form_field.selectedIndex,
            this.is_rtl = this.form_field_jq.hasClass("chosen-rtl")
        },
        f.prototype.set_up_html = function() {
            var g, q;
            g = ["chosen-container"],
            g.push("chosen-container-" + (this.is_multiple ? "multi": "single")),
            this.inherit_select_classes && this.form_field.className && g.push(this.form_field.className),
            this.is_rtl && g.push("chosen-rtl");
            var p = this.form_field.getAttribute("data-css-class");
            return p && g.push(p),
            q = {
                "class": g.join(" "),
                style: "width: " + this.container_width() + ";",
                title: this.form_field.title
            },
            this.form_field.id.length && (q.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"),
            this.container = j("<div />", q),
            this.container.html(this.is_multiple ? '<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>': '<a class="chosen-single chosen-default" tabindex="-1"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'),
            this.form_field_jq.hide().after(this.container),
            this.dropdown = this.container.find("div.chosen-drop").first(),
            this.search_field = this.container.find("input").first(),
            this.search_results = this.container.find("ul.chosen-results").first(),
            this.search_field_scale(),
            this.search_no_results = this.container.find("li.no-results").first(),
            this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(), this.selected_item = this.container.find(".chosen-single").first()),
            this.options.drop_width && this.dropdown.css("width", this.options.drop_width).addClass("chosen-drop-size-limited"),
            this.results_build(),
            this.set_tab_index(),
            this.set_label_behavior(),
            this.form_field_jq.trigger("chosen:ready", {
                chosen: this
            })
        },
        f.prototype.register_observers = function() {
            var b = this;
            return this.container.bind("mousedown.chosen",
            function(c) {
                b.container_mousedown(c)
            }),
            this.container.bind("mouseup.chosen",
            function(c) {
                b.container_mouseup(c)
            }),
            this.container.bind("mouseenter.chosen",
            function(c) {
                b.mouse_enter(c)
            }),
            this.container.bind("mouseleave.chosen",
            function(c) {
                b.mouse_leave(c)
            }),
            this.search_results.bind("mouseup.chosen",
            function(c) {
                b.search_results_mouseup(c)
            }),
            this.search_results.bind("mouseover.chosen",
            function(c) {
                b.search_results_mouseover(c)
            }),
            this.search_results.bind("mouseout.chosen",
            function(c) {
                b.search_results_mouseout(c)
            }),
            this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen",
            function(c) {
                b.search_results_mousewheel(c)
            }),
            this.search_results.bind("touchstart.chosen",
            function(c) {
                b.search_results_touchstart(c)
            }),
            this.search_results.bind("touchmove.chosen",
            function(c) {
                b.search_results_touchmove(c)
            }),
            this.search_results.bind("touchend.chosen",
            function(c) {
                b.search_results_touchend(c)
            }),
            this.form_field_jq.bind("chosen:updated.chosen",
            function(c) {
                b.results_update_field(c)
            }),
            this.form_field_jq.bind("chosen:activate.chosen",
            function(c) {
                b.activate_field(c)
            }),
            this.form_field_jq.bind("chosen:open.chosen",
            function(c) {
                b.container_mousedown(c)
            }),
            this.form_field_jq.bind("chosen:close.chosen",
            function(c) {
                b.input_blur(c)
            }),
            this.search_field.bind("blur.chosen",
            function(c) {
                b.input_blur(c)
            }),
            this.search_field.bind("keyup.chosen",
            function(c) {
                b.keyup_checker(c)
            }),
            this.search_field.bind("keydown.chosen",
            function(c) {
                b.keydown_checker(c)
            }),
            this.search_field.bind("focus.chosen",
            function(c) {
                b.input_focus(c)
            }),
            this.search_field.bind("cut.chosen",
            function(c) {
                b.clipboard_event_checker(c)
            }),
            this.search_field.bind("paste.chosen",
            function(c) {
                b.clipboard_event_checker(c)
            }),
            this.is_multiple ? this.search_choices.bind("click.chosen",
            function(c) {
                b.choices_click(c)
            }) : this.container.bind("click.chosen",
            function(c) {
                c.preventDefault()
            })
        },
        f.prototype.destroy = function() {
            return j(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action),
            this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex),
            this.container.remove(),
            this.form_field_jq.removeData("chosen"),
            this.form_field_jq.show()
        },
        f.prototype.search_field_disabled = function() {
            return this.is_disabled = this.form_field_jq[0].disabled,
            this.is_disabled ? (this.container.addClass("chosen-disabled"), this.search_field[0].disabled = !0, this.is_multiple || this.selected_item.unbind("focus.chosen", this.activate_action), this.close_field()) : (this.container.removeClass("chosen-disabled"), this.search_field[0].disabled = !1, this.is_multiple ? void 0 : this.selected_item.bind("focus.chosen", this.activate_action))
        },
        f.prototype.container_mousedown = function(c) {
            return this.is_disabled || (c && "mousedown" === c.type && !this.results_showing && c.preventDefault(), null != c && j(c.target).hasClass("search-choice-close")) ? void 0 : (this.active_field ? this.is_multiple || !c || j(c.target)[0] !== this.selected_item[0] && !j(c.target).parents("a.chosen-single").length || (c.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), j(this.container[0].ownerDocument).bind("click.chosen", this.click_test_action), this.results_show()), this.activate_field())
        },
        f.prototype.container_mouseup = function(b) {
            return "ABBR" !== b.target.nodeName || this.is_disabled ? void 0 : this.results_reset(b)
        },
        f.prototype.search_results_mousewheel = function(g) {
            var c;
            return g.originalEvent && (c = -g.originalEvent.wheelDelta || g.originalEvent.detail),
            null != c ? (g.preventDefault(), "DOMMouseScroll" === g.type && (c = 40 * c), this.search_results.scrollTop(c + this.search_results.scrollTop())) : void 0
        },
        f.prototype.blur_test = function(b) {
            return ! this.active_field && this.container.hasClass("chosen-container-active") ? this.close_field() : void 0
        },
        f.prototype.close_field = function() {
            return j(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action),
            this.active_field = !1,
            this.results_hide(),
            this.container.removeClass("chosen-container-active"),
            this.clear_backstroke(),
            this.show_search_field_default(),
            this.search_field_scale()
        },
        f.prototype.activate_field = function() {
            return this.container.addClass("chosen-container-active"),
            this.active_field = !0,
            this.search_field.val(this.search_field.val()),
            this.search_field.focus()
        },
        f.prototype.test_active_click = function(g) {
            var p;
            return p = j(g.target).closest(".chosen-container"),
            p.length && this.container[0] === p[0] ? this.active_field = !0 : this.close_field()
        },
        f.prototype.results_build = function() {
            return this.parsing = !0,
            this.selected_option_count = null,
            this.results_data = n.select_to_array(this.form_field),
            this.is_multiple ? this.search_choices.find("li.search-choice").remove() : this.is_multiple || (this.single_set_selected_text(), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0, this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1, this.container.removeClass("chosen-container-single-nosearch"))),
            this.update_results_content(this.results_option_build({
                first: !0
            })),
            this.search_field_disabled(),
            this.show_search_field_default(),
            this.search_field_scale(),
            this.parsing = !1
        },
        f.prototype.result_do_highlight = function(p) {
            var g, t, s, r, q;
            if (p.length) {
                if (this.result_clear_highlight(), this.result_highlight = p, this.result_highlight.addClass("highlighted"), s = parseInt(this.search_results.css("maxHeight"), 10), q = this.search_results.scrollTop(), r = s + q, t = this.result_highlight.position().top + this.search_results.scrollTop(), g = t + this.result_highlight.outerHeight(), g >= r) {
                    return this.search_results.scrollTop(g - s > 0 ? g - s: 0)
                }
                if (q > t) {
                    return this.search_results.scrollTop(t)
                }
            }
        },
        f.prototype.result_clear_highlight = function() {
            return this.result_highlight && this.result_highlight.removeClass("highlighted"),
            this.result_highlight = null
        },
        f.prototype.results_show = function() {
            return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
                chosen: this
            }), !1) : (this.container.addClass("chosen-with-drop"), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.search_field.val()), this.winnow_results(), this.form_field_jq.trigger("chosen:showing_dropdown", {
                chosen: this
            }))
        },
        f.prototype.update_results_content = function(b) {
            return this.search_results.html(b)
        },
        f.prototype.results_hide = function() {
            return this.results_showing && (this.result_clear_highlight(), this.container.removeClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:hiding_dropdown", {
                chosen: this
            })),
            this.results_showing = !1
        },
        f.prototype.set_tab_index = function(g) {
            var c;
            return this.form_field.tabIndex ? (c = this.form_field.tabIndex, this.form_field.tabIndex = -1, this.search_field[0].tabIndex = c) : void 0
        },
        f.prototype.set_label_behavior = function() {
            var c = this;
            return this.form_field_label = this.form_field_jq.parents("label"),
            !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = j("label[for='" + this.form_field.id + "']")),
            this.form_field_label.length > 0 ? this.form_field_label.bind("click.chosen",
            function(b) {
                return c.is_multiple ? c.container_mousedown(b) : c.activate_field()
            }) : void 0
        },
        f.prototype.show_search_field_default = function() {
            return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"))
        },
        f.prototype.search_results_mouseup = function(g) {
            var p;
            return p = j(g.target).hasClass("active-result") ? j(g.target) : j(g.target).parents(".active-result").first(),
            p.length ? (this.result_highlight = p, this.result_select(g), this.search_field.focus()) : void 0
        },
        f.prototype.search_results_mouseover = function(g) {
            var p;
            return p = j(g.target).hasClass("active-result") ? j(g.target) : j(g.target).parents(".active-result").first(),
            p ? this.result_do_highlight(p) : void 0
        },
        f.prototype.search_results_mouseout = function(c) {
            return j(c.target).hasClass("active-result") ? this.result_clear_highlight() : void 0
        },
        f.prototype.choice_build = function(g) {
            var r, q, p = this;
            return r = j("<li />", {
                "class": "search-choice"
            }).html("<span title='" + g.html + "'>" + g.html + "</span>"),
            g.disabled ? r.addClass("search-choice-disabled") : (q = j("<a />", {
                "class": "search-choice-close",
                "data-option-array-index": g.array_index
            }), q.bind("click.chosen",
            function(b) {
                return p.choice_destroy_link_click(b)
            }), r.append(q)),
            this.search_container.before(r)
        },
        f.prototype.choice_destroy_link_click = function(c) {
            return c.preventDefault(),
            c.stopPropagation(),
            this.is_disabled ? void 0 : this.choice_destroy(j(c.target))
        },
        f.prototype.choice_destroy = function(b) {
            return this.result_deselect(b[0].getAttribute("data-option-array-index")) ? (this.show_search_field_default(), this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1 && this.results_hide(), b.parents("li").first().remove(), this.search_field_scale()) : void 0
        },
        f.prototype.results_reset = function() {
            return this.reset_single_select_options(),
            this.form_field.options[0].selected = !0,
            this.single_set_selected_text(),
            this.show_search_field_default(),
            this.results_reset_cleanup(),
            this.form_field_jq.trigger("change"),
            this.active_field ? this.results_hide() : void 0
        },
        f.prototype.results_reset_cleanup = function() {
            return this.current_selectedIndex = this.form_field.selectedIndex,
            this.selected_item.find("abbr").remove()
        },
        f.prototype.result_select = function(p) {
            var g, q;
            return this.result_highlight ? (g = this.result_highlight, this.result_clear_highlight(), this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
                chosen: this
            }), !1) : (this.is_multiple ? g.removeClass("active-result") : this.reset_single_select_options(), q = this.results_data[g[0].getAttribute("data-option-array-index")], q.selected = !0, this.form_field.options[q.options_index].selected = !0, this.selected_option_count = null, this.is_multiple ? this.choice_build(q) : this.single_set_selected_text(q.text), (p.metaKey || p.ctrlKey) && this.is_multiple || this.results_hide(), this.search_field.val(""), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.form_field_jq.trigger("change", {
                selected: this.form_field.options[q.options_index].value
            }), this.current_selectedIndex = this.form_field.selectedIndex, this.search_field_scale())) : void 0
        },
        f.prototype.single_set_selected_text = function(b) {
            return null == b && (b = this.default_text),
            b === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClass("chosen-default")),
            this.selected_item.find("span").attr("title", b).text(b)
        },
        f.prototype.result_deselect = function(g) {
            var c;
            return c = this.results_data[g],
            this.form_field.options[c.options_index].disabled ? !1 : (c.selected = !1, this.form_field.options[c.options_index].selected = !1, this.selected_option_count = null, this.result_clear_highlight(), this.results_showing && this.winnow_results(), this.form_field_jq.trigger("change", {
                deselected: this.form_field.options[c.options_index].value
            }), this.search_field_scale(), !0)
        },
        f.prototype.single_deselect_control_build = function() {
            return this.allow_single_deselect ? (this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'), this.selected_item.addClass("chosen-single-with-deselect")) : void 0
        },
        f.prototype.get_search_text = function() {
            return this.search_field.val() === this.default_text ? "": j("<div/>").text(j.trim(this.search_field.val())).html()
        },
        f.prototype.winnow_results_set_highlight = function() {
            var g, c;
            return c = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"),
            g = c.length ? c.first() : this.search_results.find(".active-result").first(),
            null != g ? this.result_do_highlight(g) : void 0
        },
        f.prototype.no_results = function(g) {
            var p;
            return p = j('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>'),
            p.find("span").first().html(g),
            this.search_results.append(p),
            this.form_field_jq.trigger("chosen:no_results", {
                chosen: this
            })
        },
        f.prototype.no_results_clear = function() {
            return this.search_results.find(".no-results").remove()
        },
        f.prototype.keydown_arrow = function() {
            var b;
            return this.results_showing && this.result_highlight ? (b = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(b) : void 0 : this.results_show()
        },
        f.prototype.keyup_arrow = function() {
            var b;
            return this.results_showing || this.is_multiple ? this.result_highlight ? (b = this.result_highlight.prevAll("li.active-result"), b.length ? this.result_do_highlight(b.first()) : (this.choices_count() > 0 && this.results_hide(), this.result_clear_highlight())) : void 0 : this.results_show()
        },
        f.prototype.keydown_backstroke = function() {
            var b;
            return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke()) : (b = this.search_container.siblings("li.search-choice").last(), b.length && !b.hasClass("search-choice-disabled") ? (this.pending_backstroke = b, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0)
        },
        f.prototype.clear_backstroke = function() {
            return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"),
            this.pending_backstroke = null
        },
        f.prototype.keydown_checker = function(p) {
            var g, q;
            switch (g = null != (q = p.which) ? q: p.keyCode, this.search_field_scale(), 8 !== g && this.pending_backstroke && this.clear_backstroke(), g) {
            case 8:
                this.backstroke_length = this.search_field.val().length;
                break;
            case 9:
                this.results_showing && !this.is_multiple && this.result_select(p),
                this.mouse_on_container = !1;
                break;
            case 13:
                p.preventDefault();
                break;
            case 38:
                p.preventDefault(),
                this.keyup_arrow();
                break;
            case 40:
                p.preventDefault(),
                this.keydown_arrow()
            }
        },
        f.prototype.search_field_scale = function() {
            var x, w, v, u, t, s, r, q, p;
            if (this.is_multiple) {
                for (v = 0, r = 0, t = "position:absolute; left: -1000px; top: -1000px; display:none;", s = ["font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"], q = 0, p = s.length; p > q; q++) {
                    u = s[q],
                    t += u + ":" + this.search_field.css(u) + ";"
                }
                return x = j("<div />", {
                    style: t
                }),
                x.text(this.search_field.val()),
                j("body").append(x),
                r = x.width() + 25,
                x.remove(),
                w = this.container.outerWidth(),
                r > w - 10 && (r = w - 10),
                this.search_field.css({
                    width: r + "px"
                })
            }
        },
        f
    } (h)
}).call(this); (function(b) {
    b.extend(b.fn, {
        swapClass: function(g, f) {
            var d = this.filter("." + g);
            this.filter("." + f).removeClass(f).addClass(g);
            d.removeClass(g).addClass(f);
            return this
        },
        replaceClass: function(f, d) {
            return this.filter("." + f).removeClass(f).addClass(d).end()
        },
        hoverClass: function(d) {
            d = d || "hover";
            return this.hover(function() {
                b(this).addClass(d)
            },
            function() {
                b(this).removeClass(d)
            })
        },
        heightToggle: function(d, f) {
            d ? this.animate({
                height: "toggle"
            },
            d, f) : this.each(function() {
                jQuery(this)[jQuery(this).css("display") == "none" ? "show": "hide"]();
                if (f) {
                    f.apply(this, arguments)
                }
            })
        },
        heightHide: function(d, f) {
            if (d) {
                this.animate({
                    height: "hide"
                },
                d, f)
            } else {
                this.hide();
                if (f) {
                    this.each(f)
                }
            }
        },
        prepareBranches: function(d) {
            if (!d.prerendered) {
                this.filter(":last-child:not(ul)").addClass(c.last);
                this.filter((d.collapsed ? "": "." + c.closed) + ":not(." + c.open + ")").find(">ul").hide()
            }
            return this.filter(":has(>ul)")
        },
        applyClasses: function(d, f) {
            this.filter(":has(>ul):not(:has(>a))").find(">span").click(function(g) {
                f.apply(b(this).next())
            }).add(b("a", this)).hoverClass();
            if (!d.prerendered) {
                this.filter(":has(>ul:hidden)").addClass(c.expandable).replaceClass(c.last, c.lastExpandable);
                this.not(":has(>ul:hidden)").addClass(c.collapsable).replaceClass(c.last, c.lastCollapsable);
                this.prepend('<div class="' + c.hitarea + '"/>').find("div." + c.hitarea).each(function() {
                    var g = "";
                    b.each(b(this).parent().attr("class").split(" "),
                    function() {
                        g += this + "-hitarea "
                    });
                    b(this).addClass(g)
                })
            }
            this.find("div." + c.hitarea).click(f)
        },
        treeview: function(f) {
            f = b.extend({
                cookieId: "treeview"
            },
            f);
            if (f.add) {
                return this.trigger("add", [f.add])
            }
            if (f.toggle) {
                var l = f.toggle;
                f.toggle = function() {
                    return l.apply(b(this).parent()[0], arguments)
                }
            }
            function d(o, q) {
                function p(r) {
                    return function() {
                        h.apply(b("div." + c.hitarea, o).filter(function() {
                            return r ? b(this).parent("." + r).length: true
                        }));
                        return false
                    }
                }
                b("a:eq(0)", q).click(p(c.collapsable));
                b("a:eq(1)", q).click(p(c.expandable));
                b("a:eq(2)", q).click(p())
            }
            function h() {
                b(this).parent().find(">.hitarea").swapClass(c.collapsableHitarea, c.expandableHitarea).swapClass(c.lastCollapsableHitarea, c.lastExpandableHitarea).end().swapClass(c.collapsable, c.expandable).swapClass(c.lastCollapsable, c.lastExpandable).find(">ul").heightToggle(f.animated, f.toggle);
                if (f.unique) {
                    b(this).parent().siblings().find(">.hitarea").replaceClass(c.collapsableHitarea, c.expandableHitarea).replaceClass(c.lastCollapsableHitarea, c.lastExpandableHitarea).end().replaceClass(c.collapsable, c.expandable).replaceClass(c.lastCollapsable, c.lastExpandable).find(">ul").heightHide(f.animated, f.toggle)
                }
            }
            function n() {
                function p(q) {
                    return q ? 1 : 0
                }
                var o = [];
                m.each(function(q, r) {
                    o[q] = b(r).is(":has(>ul:visible)") ? 1 : 0
                });
                b.cookie(f.cookieId, o.join(""))
            }
            function g() {
                var o = b.cookie(f.cookieId);
                if (o) {
                    var p = o.split("");
                    m.each(function(q, r) {
                        b(r).find(">ul")[parseInt(p[q]) ? "show": "hide"]()
                    })
                }
            }
            this.addClass("treeview");
            var m = this.find("li").prepareBranches(f);
            switch (f.persist) {
            case "cookie":
                var k = f.toggle;
                f.toggle = function() {
                    n();
                    if (k) {
                        k.apply(this, arguments)
                    }
                };
                g();
                break;
            case "location":
                var j = this.find("a").filter(function() {
                    return this.href.toLowerCase() == location.href.toLowerCase()
                });
                if (j.length) {
                    j.addClass("selected").parents("ul, li").add(j.next()).show()
                }
                break
            }
            m.applyClasses(f, h);
            if (f.control) {
                d(this, f.control);
                b(f.control).show()
            }
            return this.bind("add",
            function(p, o) {
                b(o).prev().removeClass(c.last).removeClass(c.lastCollapsable).removeClass(c.lastExpandable).find(">.hitarea").removeClass(c.lastCollapsableHitarea).removeClass(c.lastExpandableHitarea);
                b(o).find("li").andSelf().prepareBranches(f).applyClasses(f, h)
            })
        }
    });
    var c = b.fn.treeview.classes = {
        open: "open",
        closed: "closed",
        expandable: "expandable",
        expandableHitarea: "expandable-hitarea",
        lastExpandableHitarea: "lastExpandable-hitarea",
        collapsable: "collapsable",
        collapsableHitarea: "collapsable-hitarea",
        lastCollapsableHitarea: "lastCollapsable-hitarea",
        lastCollapsable: "lastCollapsable",
        lastExpandable: "lastExpandable",
        last: "last",
        hitarea: "hitarea"
    };
    b.fn.Treeview = b.fn.treeview
})(jQuery); 
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