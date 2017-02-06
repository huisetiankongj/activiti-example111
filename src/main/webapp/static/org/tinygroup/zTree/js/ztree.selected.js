function getSelectedNodeText(zTreeObj){
		return getSelectedNodeByKey(zTreeObj,zTreeObj.setting.data.key.name);
	}	
	function getSelectedNodeId(zTreeObj){
		return getSelectedNodeByKey(zTreeObj,zTreeObj.setting.data.simpleData.idKey);
	}
	function getCheckedNodeText(zTreeObj){
		return getCheckedNodeByKey(zTreeObj,zTreeObj.setting.data.key.name);
	}	
	function getCheckedNodeId(zTreeObj){
		return getCheckedNodeByKey(zTreeObj,zTreeObj.setting.data.simpleData.idKey);
	}
	function getSelectedNodeByKey(zTreeObj,key){
		nodes = zTreeObj.getSelectedNodes(true);
		v = "";
		nodes.sort(function compare(a,b){return a.id-b.id;});
		for (var i=0, l=nodes.length; i<l; i++) {
				v += nodes[i][key] + ",";
		}
		if (v.length > 0 ) v = v.substring(0, v.length-1);
		return v;
	}	
	function getCheckedNodeByKey(zTreeObj,key){
		nodes = zTreeObj.getCheckedNodes(true);
		v = "";
		nodes.sort(function compare(a,b){return a.id-b.id;});
		for (var i=0, l=nodes.length; i<l; i++) {
				v += nodes[i][key] + ",";
		}
		if (v.length > 0 ) v = v.substring(0, v.length-1);
		return v;
	}