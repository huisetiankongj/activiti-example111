(function ($) {
    var defaults = {
        fnClick: function () {

        },
        fnDbClick: function () {

        },
        //这是连接线路的绘画样式
        connectorPaintStyle: {
            lineWidth: 2,
            strokeStyle: "#49afcd",
            joinstyle: "round"
        },
        disableConnectorPaintStyle: {
            lineWidth: 2,
            strokeStyle: "#999",
            joinstyle: "round",
            dashstyle: "4 1"
        },
        itemSize:{
            top: 10,
            width: 150,
            height: 120
        }

    };
    /*defaults end*/

    var initEndPoints = function (_dom) {
        _dom.find(".process-flag").each(function (i, e) {
            var p = $(e).parent();
            jsPlumb.makeSource($(e), {
                parent: p,
                anchor: "Continuous",
                endpoint: ["Dot", {radius: 1}],
                connector: ["Flowchart", {stub: [5, 5]}],
                connectorStyle: p.attr("disabled") == "disabled" ? defaults.disableConnectorPaintStyle : defaults.connectorPaintStyle,
                dragOptions: {},
                maxConnections: -1
            });
        });
    };   
    var clear = function () {

        try {

            jsPlumb.detachEveryConnection();
            jsPlumb.deleteEveryEndpoint();
            jsPlumb.repaintEverything();
            return true;
        } catch (e) {
            return false;
        }

    };
    var initFlow = function (_tempId) {

        var _dom = $("<div/>");
        var processData = [];
        $(".popover").remove();
        _tempId.children(".process-step").each(function () {
            var _this = $(this);
            processData.push({"id": _this.attr("process_id"), "pid": _this.attr("process_pid")});
        }).on("mouseover", function () {
            $(this).popover('show');
        }).on("mouseout", function () {
            $(this).popover('hide');
        });
        var level_count = 0;
        var data_len = processData.length;
        var pids_arr = [];
        var groupData = [];
        var node_arr = [];

        for (var i = 0; i < data_len; i++) {
            if (processData[i]["pid"] === "" || processData[i]["pid"] === null) {
                processData[i]["pid"] = 0;
            }
            if (!groupData[processData[i]["pid"]]) {
                groupData[processData[i]["pid"]] = [];
            }
            groupData[processData[i]["pid"]].push(processData[i]);
            pids_arr.push(processData[i]["pid"]);
            node_arr[processData[i]["id"]] = processData[i]["pid"];

        }

        function getLevel(id) {
            if (node_arr[id]) {
                return getLevel(node_arr[id]) + 1;
            } else {
                return 1;
            }
        }

        var max_level = 0;
        for (var i = 0; i < data_len; i++) {
            var c = getLevel(processData[i]["id"]);
            max_level = Math.max(max_level, c);
            if ($.inArray(processData[i]["id"], pids_arr) == -1) {
                level_count++;
            }
        }
        _tempId.css({"width": defaults.itemSize.width * level_count + 180 + "px", "height": max_level * defaults.itemSize.height + 50 + "px","margin":"0 auto"});
        defaults.itemSize.left = defaults.itemSize.width * (level_count - 1) / 2;
        var setPosition = function (pid, top_level, left_level) {
            if (!groupData[pid]) {
                return [];
            }
            var list = groupData[pid];
            var len = list.length;
            var left = left_level - list.length / 2;
            var top = top_level;
            var ileft = "";
            var itop = "";
            var subIds = [];
            var thisw = defaults.itemSize.width * (len - 1) / 2;

            for (var i = 0; i < len; i++) {
                ileft = left_level - thisw + i * defaults.itemSize.width;
                itop = top_level + defaults.itemSize.height;
                groupData[pid][i]["left"] = ileft;
                groupData[pid][i]["top"] = itop - defaults.itemSize.height;
                subIds.push(list[i]["id"]);
                var sub_idarr = setPosition(list[i]["id"], itop, ileft);
                groupData[pid][i]["process_to"] = sub_idarr.join(",");
            }
            return subIds;
        }

        var setChildrenNode = function () {
            var data = [];
            for (i in groupData) {

                for (var j = 0, jl = groupData[i].length; j < jl; j++) {
                    data.push(groupData[i][j]);
                }
            }

            for (var i = 0; i < data_len; i++) {
                var id = data[i]["id"];
                $("#process-step-" + id).attr({
                    "process_to": data[i]["process_to"]
                }).css({"left": data[i]["left"] + "px", "top": data[i]["top"] + "px","width":defaults.itemSize.width-30+"px"});
            }
        }
        setPosition(0, defaults.itemSize.top, defaults.itemSize.left);
        setChildrenNode();
    }
    $.fn.flowprocess = function (options) {
        var _canvas = $(this);
        //右键步骤的步骤号
        options = options || {};
        /*配置*/
        $.each(options, function (i, val) {
            if (typeof val == 'object' && defaults[i])
                $.extend(defaults[i], val);
            else
                defaults[i] = val;
        });
        clear();
        initFlow(_canvas.find(".tiny_flow_process_info:first"));
        jsPlumb.importDefaults({
            DragOptions: {cursor: 'pointer'},
            EndpointStyle: {fillStyle: '#225588'},
            Endpoint: ["Dot", {radius: 1}],
            ConnectionOverlays: [
                ["Arrow", {location: 1}],
                ["Label", {
                    location: 0.1,
                    id: "label",
                    cssClass: "aLabel"
                }]
            ],
            Anchor: 'Continuous',
            ConnectorZIndex: 5,
            HoverPaintStyle: defaults.connectorHoverStyle
        });
        if ($.browser.msie && $.browser.version < '9.0') { //ie9以下，用VML画图
            jsPlumb.setRenderMode(jsPlumb.VML);
        } else { //其他浏览器用SVG
            jsPlumb.setRenderMode(jsPlumb.SVG);
        }

        var timeout = null;
        //点击或双击事件,这里进行了一个单击事件延迟，因为同时绑定了双击事件
        _canvas.find(".process-step").on('click', function () {
            var obj = this;
            _canvas.find('.tiny_flow_active_id').val($(this).attr("process_id")),
                clearTimeout(timeout);
            timeout = setTimeout(defaults.fnClick, 300);
        }).on('dblclick', function () {
            clearTimeout(timeout);
            defaults.fnDbClick();
        }).each(function (index) {
            var _this = $(this);
            var id = _this.attr("process_id");
            _this.mousedown(function (e) {
                if (e.which == 3) { //右键绑定
                    _this.contextMenu("process-menu-" + id);
                }
            });
        });
        initEndPoints(_canvas);

        //reset  start
        var _canvas_design = function () {

            //连接关联的步骤
            _canvas.find('.process-step').each(function (i) {
                var sourceId = $(this).attr('process_id');
                var prcsto = $(this).attr('process_to');
                if(!prcsto||!sourceId){ return true;}
                var toArr = prcsto.split(",");
                $.each(toArr, function (j, targetId) {
                    if (targetId != '' && targetId != 0) {
                        if ($("#process-step-" + prcsto).length > 0) {
                            jsPlumb.connect({
                                source: "process-step-" + sourceId,
                                target: "process-step-" + targetId
                            });
                        }
                    }
                })
            });
        }//_canvas_design end reset
        _canvas_design();
        var flowprocess = {
            getActiveId: function () {
                return _canvas.find(".tiny_flow_active_id").val();
            },
            clear: function () {
                try {

                    jsPlumb.detachEveryConnection();
                    jsPlumb.deleteEveryEndpoint();
                    jsPlumb.repaintEverything();
                    return true;
                } catch (e) {
                    return false;
                }
            },
            refresh: function () {
                try {
                    this.clear();
                    _canvas_design();
                    return true;
                } catch (e) {
                    return false;
                }
            }
        };
        return flowprocess;
    }//$.fn
})(jQuery);