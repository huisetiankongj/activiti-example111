(function($){
    $.fn.queryFor = function(sel){
        var items = [];
        var name = $(this).attr("name");
        if(!name){
            name=$(this).attr("id");
        }
        if(!name){
            name=$(this).attr("action");
        }
        var sel=$(sel);
        var _init = function () {
            var v = window.localStorage.getItem(name);
            if (v){
                items = $.parseJSON(v);
            }
        };
        this.list=function(){
            return items;
        };
        var _initSel=function(){
            sel.html('<option value="none">**查询历史**</option>');
            for(var i= 0,l=items.length;i<l;i++){
                if(items[i]&&items[i]["text"]){
                    sel.append($("<option>").attr("value",i).html(items[i].text));
                }
            }
        };
        this.add = function (key, val) {
            items.push({text: key, value: val});
            window.localStorage.setItem(name, JSON.stringify(items));
            _initSel();
        }
        this.getVal=function(key){
            if(!items){return 0;}
            return items[key]["value"]
        };
        this.del=function(key){
            if(items[key]){
                delete items[key];
                window.localStorage.setItem(name, JSON.stringify(items));
                _initSel();
            }

        };
        this.clear=function(key){
            window.localStorage.setItem(name, JSON.stringify(items));
        };
        _init();
        _initSel();
        return this;
    }
})(jQuery);