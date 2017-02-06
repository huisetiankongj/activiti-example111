var languageCN={
    oAria: {
        sSortAscending: ": 激活列升序",
        sSortDescending: ": 激活列降序"
    },
    sProcessing: "处理中...",
    sLengthMenu: "每页显示条数  _MENU_",
    sZeroRecords: "没有匹配结果",
    sInfo: "显示 _START_-_END_ 总共有 _TOTAL_ 条目",
    sInfoEmpty: "显示 0-0 总共有 0 条目",
    sInfoFiltered: "",
    sInfoPostFix: "",
    sSearch: "搜索:",
    sUrl: "",
    sEmptyTable: "暂无数据",
    oPaginate: {
        sFirst: "首页",
        sPrevious: "上页",
        sNext: "下页",
        sLast: "末页"
    }
};
$.extend(true, $.fn.DataTable.defaults,{
    oLanguage: languageCN,
    bProcessing: false,
    bServerSide: true,
    bSort: false,
    bAutoWidth: true,
    sDom: 'R<"tableButton"CTl>t<"tableFooter"birp>',
    sServerMethod: "POST",
    iDisplayLength: 15,
    aLengthMenu: [ [ 10, 15, 30, 50, 100, 200 ], [ 10, 15, 30, 50, 100, 200 ] ],
    fnSvcInitComplete: function (oSettings, json) {
    	// 绑定【全选/取消】按钮事件
    	$(oSettings.nTHead).find(".TableCheckall").click(function(){
    		if($(this).is(':checked')){
    			$(oSettings.nTBody).find(".TableCheckbox").not(":checked").trigger('click');
    		}else{
    			$(oSettings.nTBody).find(".TableCheckbox:checked").trigger('click');
    		}
    	});
    },
	fnSvcDrawCallback:function(oSettings){
		// 表格重绘后同步【全选/取消】按钮状态
		var $tableCheckAll, $tableCheckbox, $notCheck;
		$tableCheckAll = $(oSettings.nTHead).find(".TableCheckall"), $tableCheckbox = $(oSettings.nTBody).find(".TableCheckbox"), 
        $notCheck = $tableCheckbox.not(":checked"), 
        0 == $notCheck.length && $tableCheckbox.length > 0 ? $tableCheckAll.prop("checked", true) : $tableCheckAll.prop("checked", false);
	}
});

// 转换成datatables数据模型功能
function svcToDataTables(json,sEcho){
	return {
        iTotalDisplayRecords:json.totalRows,
        iTotalRecords:json.currentPage,
        aaData:json.datas,
        sEcho:sEcho
    };
}

//获取排序参数
function getDataTableSequence(setData){
	if(setData.iSortCol_0!=undefined){
		var sequenceIndex = setData.iSortCol_0;//排序列索引
		var sortDir = setData.sSortDir_0;//排序方向
		var sequence = setData["mDataProp_"+sequenceIndex];
		var obParameter={};
		obParameter[sequence+"_ob"]=sortDir;//加上_ob后缀,符合后台的排序标准
		return obParameter;
	 }else{
		return {};
	 }
}

//DataTable的请求
function fnServer(byParameter){
	return function(url,setData,fnCallback){
		 var _this = this;
		 var setData=$.deparam($.param(setData));
		 delete setData.setData;
		 var obParameter = getDataTableSequence(setData);
		 var findBy=$.extend({
			 	paginate:{
			 		currentPage:Math.ceil(setData.iDisplayStart / setData.iDisplayLength) + 1,
			 		rowsOfPage:setData.iDisplayLength*1,
			 		menuId:currentMenuId
			 	}
			 }, _this.reDrawParams||byParameter||{},obParameter); 
		
		 // 判断是否显示遮罩，当isShowTips为false时不显示，其他显示
		 if((this.fnSettings().oInit.isShowTips != null) && (this.fnSettings().oInit.isShowTips != undefined) && (this.fnSettings().oInit.isShowTips === false)){
			 var option = {
						url : url,
						param :findBy,
						success : function(json){ 
							_this.permission = json.permission||[];
							var dataModel=svcToDataTables(json,setData.sEcho*1); 
							fnCallback(dataModel); 
						},
						isShowTips : false
			};
			Svc.AjaxJson.jsonCall(option);
		 }else{
			 Svc.AjaxJson.post(url,findBy,function(json){
			 	 _this.permission = json.permission||[];
				 var dataModel=svcToDataTables(json,setData.sEcho*1);
				 fnCallback(dataModel);
			 });
		 }
	};
}

// 新增一个datatables按钮
TableTools.BUTTONS.tiny=$.extend( {}, TableTools.buttonBase,{fnInit:function( nButton, oConfig ) {
    oConfig.sLinerClass && $("span",nButton).addClass( oConfig.sLinerClass);
    $("span",nButton).after($("span",nButton).text()).text("");
	},sButtonClass:"btn btn-default btn-sm"
});

/*
 * File:        DTCheckbox.js
 * Version:     base
 * Description: Allow columns to be reordered in a DataTable
 * Language:    Javascript
 * Project:     DataTables
 */

var DTCheckbox;
(function($, window, document) {

	DTCheckbox = function(oSet, oDT, oOpts) {
		if(oOpts==null){
			return ;
		}
		var NAME = DTCheckbox.NAME;
		var colIndex = oOpts.iColIndex;
		var col = oSet.aoColumns[colIndex];
		var primary = col.mData;
		var fnChange = oOpts.fnChange;
		var fnCreated = oOpts.fnCreated;
		var that = this;
		this.selectData = {};
		this.table=oDT[0];

		oSet.aoRowCreatedCallback.push({
			sName : NAME,
			fn : function(tr, data, rowIndex) {
				var $checkbox = $("<input type='checkbox' />");
				var id = data[primary];
				if (that.selectData[id]) {
					$checkbox.prop("checked", "checked");
				}
				fnCreated && fnCreated.call(that, this, data);
				$checkbox.addClass(that.CLASS);
				$checkbox.data(NAME, data);
				$("td", tr).eq(oOpts.iColIndex).html($checkbox);
				$checkbox.on("change", function() {
					var data = $(this).data(NAME);
					var id = data[primary];
					$(this).is(":checked") ? that.selectData[id] = data : delete that.selectData[id];
					fnChange && fnChange.call(that, this, data);
					// 如果都选中，把全选的状态改为选中， 否则改为不选中
					$(oSet.nTBody).find('.TableCheckbox').not(':checked').length==0? $(oSet.nTHead).find('.TableCheckall').prop('checked',true):$(oSet.nTHead).find('.TableCheckall').prop('checked',false);
				});
			}
		});
	};

	DTCheckbox.VERSION = "base";
	DTCheckbox.NAME = "DTCheckbox";
	DTCheckbox.prototype.CLASS = "TableCheckbox";
	DTCheckbox.AInstances = [];
	DTCheckbox.fnGetInstance = function ( node )
	{
		if ( typeof node != 'object' )
		{
			node = document.getElementById(node);
		}
		
		for ( var i=0, iLen=DTCheckbox.AInstances.length ; i<iLen ; i++ )
		{
			if (DTCheckbox.AInstances[i].table == node )
			{
				return DTCheckbox.AInstances[i];
			}
		}
		return null;
	};
	
	/*
	 * Register a new feature with DataTables
	 */
	if ( typeof $.fn.dataTable == "function" && typeof $.fn.dataTableExt.fnVersionCheck == "function" && $.fn.dataTableExt.fnVersionCheck('1.7.0')) {

		$.fn.dataTableExt.aoFeatures.push({
			"fnInit" : function(set) {

				var oCC = new DTCheckbox(set, set.oInstance, set.oInit.oDTCheckbox);
				
				DTCheckbox.AInstances.push( oCC );
				
			},
			"cFeature" : "b",
			"sFeature" : DTCheckbox.NAME
		});
	} else {
		alert("Warning: DTCheckbox requires DataTables 1.7 or greater - www.datatables.net/download");
	}
})(jQuery, window, document);
