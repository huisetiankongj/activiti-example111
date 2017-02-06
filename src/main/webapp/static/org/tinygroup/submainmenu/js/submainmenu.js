(function ($) {
    var menuNav = function (config) {
        config = config || {};
        var defaults = menuNav.defaults
        // 合并默认配置
        for (var i in defaults) {
            if (config[i] === undefined) config[i] = defaults[i];
        }
        ;
        return new menuNav.fn._init(config);
    };

    menuNav.fn = menuNav.prototype = {
        _init: function (config) {
            this.groups = {};
            this.config = config;
            this.pid = config.pid;
            this.name = config.name;
            this.menuData = config.menu;
            this.getRootMenu();
            this.group();
            var html = this.getDom(this.groups["tiny_menu_nav" + config.id]);
            $('#' + config.id).append(html);
            this.editDom(config.id); 	//修改dom结构
            this._bindEnv(config.id);	//绑定点击事件
            this.currentEvn(config.id, config.currentId);  //当前选中效果
            return this;
        },
        getRootMenu: function () {
            var data = this.menuData;
            var l = data.length, is_root = false;
            for (var i = 0; i < l; i++) {
                is_root = true;
                for (var j = 0; j < l; j++) {
                    if (data[i][this.pid] == data[j].id) {
                        is_root = false;
                        break;
                    }
                }
                if (is_root) {
                    this.menuData[i][this.pid] = "tiny_menu_nav" + this.config.id;
                }
            }
        },
        group: function () {
            var data = this.menuData;
            //var that = this;
            for (var i = 0; i < data.length; i++) {
                if (data[i][this.pid] === "" || data[i][this.pid] === null) {
                    data[i][this.pid] = 0;
                }
                if (this.groups[data[i][this.pid]]) {
                    this.groups[data[i][this.pid]].push(data[i]);
                } else {
                    this.groups[data[i][this.pid]] = [];
                    this.groups[data[i][this.pid]].push(data[i]);
                }
            }
            //return that;
        },
        getDom: function (data) {
            if (!data) {
                return ''
            }
            var html = '<ul>';
            for (var i = 0; i < data.length; i++) {
                html += '<li><a id="' + data[i].id + '" href="' + this.config.linkUrl + data[i].id + '"><div class="nav-icon"><span class="fa fa-chevron-down"></span></div><div class="menu-title">' + data[i][this.name] + '</div></a>';
                html += this.getDom(this.groups[data[i].id]);
                html += '</li>';
            }
            ;
            html += '</ul>';
            return html;
        },
        editDom: function (id) {
            $('#' + id).find('a').each(function () {
                if ($(this).siblings('ul').length === 0) {
                    $(this).children('div.nav-icon').empty();
                }
            })
        },
        currentEvn: function (id, curId) {
            $('#' + id).find('a').removeClass('active');
            $('#' + curId).addClass('active');
        },
        _bindEnv: function (id) {
            $("#" + id).off('click.treetoggle').on('click.treetoggle', 'span.fa', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if ($(this).parents('a').siblings('ul').length > 0) {
                    $(this).parents('a').siblings('ul').slideToggle(0).end().children('div').children('span').toggleClass('fa-chevron-down fa-chevron-right');
                }
            })
        }
    }
    menuNav.fn._init.prototype = menuNav.fn;
    $.fn.menuNav = function () {
        var config = arguments;
        this[this.live ? 'live' : 'bind']('click', function () {
            menuNav.apply(this, config);
            return false;
        });
        return this;
    };

    /**
     * 默认配置
     */
    menuNav.defaults = {
        id: null,
        menu: null,		//导航数据
        currentId: null, //当前选中ID
        rootId: 0,      //根节点,默认为0
        linkUrl: null,
        pid: 'pId',
        name: 'name'
    };
    window.menuNav = $.menuNav = menuNav;
})(jQuery);