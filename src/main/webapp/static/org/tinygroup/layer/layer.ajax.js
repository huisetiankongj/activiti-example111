/*layer.config({
    path: contextPath+"/static/org/tinygroup/layer/",
    shift: 5
});*/
$(function() {
    $(document).on("click","[ly-ajax]",function(){
        var $this=$(this);
        var defaults={
            title:"",
            type:1,
            scrollbar:false,
            content: "",
            maxmin:true,
            shadeClose: true,
            zIndex:1050,
            area: ["80%", "80%"]
        };
        var url=$(this).attr("data-url");
        var option=$.extend({},
            defaults, $this.data()
        );
        if(option.type==1){
            $.ajax({
                url:url,
                success:function(str) {
                    layer.closeAll();
                    option.content = str;
                    layer.open(option);
                }
            });
        }else{
            option.content=url;
            layer.open(option);
        }
        return false;
    });
});