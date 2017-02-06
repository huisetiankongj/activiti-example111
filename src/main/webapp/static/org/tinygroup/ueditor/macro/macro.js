UE.plugins['macros'] = function () {
    var me = this,thePlugins = 'macros';
    me.commands[thePlugins] = {
        execCommand:function () {
            var dialog = new UE.ui.Dialog({
                iframeUrl:this.options.UEDITOR_HOME_URL +'macro/macro.pagelet',
                name:thePlugins,
                editor:this,
                title: '宏控件',
                cssRules:"width:600px;height:270px;",
                buttons:[
                    {
                        className:'edui-okbutton',
                        label:'确定',
                        onclick:function () {
                            dialog.close(true);
                        }
                    },
                    {
                        className:'edui-cancelbutton',
                        label:'取消',
                        onclick:function () {
                            dialog.close(false);
                        }
                    }]
            });
            dialog.render();
            dialog.open();
        }
    };
    var popup = new baidu.editor.ui.Popup( {
        editor:this,
        content: '',
        className: 'edui-bubble',
        _edittext: function () {
            baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
            me.execCommand(thePlugins);
            this.hide();
        },
        _delete:function(){
            if( window.confirm('确认删除该控件吗？') ) {
                baidu.editor.dom.domUtils.remove(this.anchorEl,false);
            }
            this.hide();
        }
    } );
    popup.render();
    me.addListener( 'mouseover', function( t, evt ) {
        evt = evt || window.event;
        var el = evt.target || evt.srcElement;
        var tinyPlugins = el.getAttribute('tinyplugins');
        if ( /div/ig.test( el.tagName ) && tinyPlugins==thePlugins) {
            var html = popup.formatHtml(
                '<nobr>宏控件: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>' );
            if ( html ) {
                popup.getDom( 'content' ).innerHTML = html;
                popup.anchorEl = el;
                popup.showAnchor( popup.anchorEl );
            } else {
                popup.hide();
            }
        }
    });
    var timer,clickcount=0;
    function dbclick(evt){
        evt = evt || window.event;
        var tinyPlugins,el = evt.target || evt.srcElement;
        var macroEl=$(el).closest("[tinyplugins]").get(0);
        if(typeof(macroEl)!='undefined'){
            tinyPlugins = macroEl.getAttribute('tinyplugins');
            if(tinyPlugins==thePlugins){
                baidu.editor.plugins[thePlugins].editdom=macroEl;
                me.execCommand(thePlugins);
            }
        }
    }
    me.addListener('click', function( t, evt ) {
        clickcount++;
        if(clickcount==2){
            dbclick(evt);
        }
        timer=setTimeout(function(){
            clickcount--;
        },500)
    });
};
UE.ueAddonPlus=function(id){
    UE.registerUI('button_macros',function(editor,uiName){
        editor.registerCommand(uiName,{
            execCommand:function(){
                editor.execCommand('macros');
            }
        });
        //创建一个button
        var btn = new UE.ui.Button({
            //按钮的名字
            name:uiName,
            //提示
            title:"宏编辑器",
            //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
            cssRules :'background-position: -401px -40px;',
            //点击时执行的命令
            onclick:function () {
                //这里可以不用执行命令,做你自己的操作也可
                editor.execCommand(uiName);
            }
        });
        return btn;
    },99999,[id]);
};