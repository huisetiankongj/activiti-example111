UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
UE.Editor.prototype.getActionUrl = function(action) {
    if (action == 'uploadimage' || action == 'uploadscrawl' || action == 'uploadimage' ||action == 'uploadfile') {
        return UPLOAD_ACTION_URL;
    } else if (action == 'config') {
        //console.log("editor config test");
        return contextPath+'/org/tinygroup/ueditor/config.pagelet';
    } else {
        return this._bkGetActionUrl.call(this, action);    }
}