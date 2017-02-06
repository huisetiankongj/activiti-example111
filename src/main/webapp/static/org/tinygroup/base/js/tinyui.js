(function($){
    $.fn.serializeObject = function(){
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    }

    $.fn.serializeJson = function(){
        return this.serializeObject();
    }

    $.fn.tinyHover = function (obj) {
        $(obj).hover(function () {
            $(this).addClass("hover");
        }, function () {
            $(this).removeClass("hover");
        });
    };
})(jQuery);




var TUI = {};
TUI.html_encode = function (s) {
    var REGX_HTML_ENCODE = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g;
    s = (s != undefined) ? s : this.toString();
    return (typeof s != "string") ? s :
    s.replace(REGX_HTML_ENCODE,
        function ($0) {
            var c = $0.charCodeAt(0), r = ["&#"];
            c = (c == 0x20) ? 0xA0 : c;
            r.push(c);
            r.push(";");
            return r.join("");
        });
};