if (!window.Parasoft) {
    window.Parasoft = {};
}

if (!Parasoft.Tree) {
	Parasoft.Tree = {};
}

Parasoft.Tree.InplaceEdit = function(metaInfo) {
	
	this._buttons = metaInfo.buttons;
	this._metaInfo = metaInfo;
	this._objects = new Array();
	this._hasError = false;
}

Parasoft.Tree.InplaceEdit.prototype = {
    
	addObject: function(object)
	{
		this._objects.push(object);
		object.setParent(this);
	},
	
	hasError: function()
	{
		return this._hasError;
	},
	
	enable: function()
	{
		this._hideElement(this._buttons.modifyId);
		this._showElement(this._buttons.cancelId);
		this._showElement(this._buttons.updateId);
		
		var rowObjects = this._objects;
		if (rowObjects == null) {
			return;
		}
		for (var i = 0; i < rowObjects.length; i++)
		{
			var rowObject = rowObjects[i];
			
			rowObject.onKeyDown = this._onEnterKeyDown;
			rowObject.enable();
		}		
	},
	
	disable: function()
	{
		this._cancel(false);
	},
	
	cancel: function()
	{
		this._cancel(true);
	},	
	
	update: function()
	{
		//clear previous errors
		clearStatus();
		this._hasError = false;
		
		var rowObjects = this._objects;
		if (rowObjects == null) {
			return;
		}	
		var rowObject = null;
		var rowObj = null;
		var jsonProps = new Array();
		var jsonProp = null;
		
		for (var i = 0; i < rowObjects.length; i++)
		{
			rowObject = rowObjects[i];
	    	if (rowObject.isError()) {
	    		this._hasError = true;
	    		break;
	    	}
	    	if (rowObject.modified()) {
	    		jsonProp = Planning.Util.buildJson(rowObject.getId(), rowObject.getNewValue());
	    		if (jsonProp != null) {
	    			jsonProps.push(jsonProp);
	    		}
	    	}
		}		
		if (this._hasError) {
			if (Planning.Util.isPageValid()) {
				setStatusError("Specified row contains invalid input, please correct data and try again.");
			}
			return;
		}
		if (jsonProps.length == 0) {
			this.cancel();
			return;
		}
		//ID property
		jsonProp = Planning.Util.buildJson("ID", this.getMetaInfo().rowId);
		jsonProps.push(jsonProp);
		
		jsonProp = Planning.Util.buildJson("nodeKeyId", this.getMetaInfo().nodeKeyId);
		jsonProps.push(jsonProp);
		
		/*jsonProp = Planning.Util.buildJson("parentNodeKeyId", this.getMetaInfo().parentNodeKeyId);
		jsonProps.push(jsonProp);*/
		
		var param = Planning.Util.toCSV(jsonProps);
		param = "{" + param + "}";
		
		if (this.getMetaInfo().updateFunc) {
			this.getMetaInfo().updateFunc(param);
		}
	},			
	
	_onEnterKeyDown: function(sender, event)
	{
		var keyCode = event.keyCode;
		var thisRef = sender.component.getParent()
		if (thisRef == null) {
			return true;
		}
		//alert(keyCode);
		switch (keyCode) {
			case 27://ESC
				thisRef.cancel();
				return false;
			case 13://ENTER
				if(sender.onchange) {
				    sender.onchange();
				}
				thisRef.update();
				return false;			
			default:
				return true;
		}
	},
	
	getMetaInfo: function()
	{
		return this._metaInfo;
	},
	
	_cancel: function(rollbackIfModified)
	{
		var rowObjects = this._objects;
		if (rowObjects == null) {
			return;
		}
		for (var i = 0; i < rowObjects.length; i++)
		{
			var rowObject = rowObjects[i];
	    	if (rowObject.modified() && rollbackIfModified) {
	    		rowObject.rollback();
	    	}
	    	rowObject.disable();
		}		
		
		this._showElement(this._buttons.modifyId);
		this._hideElement(this._buttons.cancelId);
		this._hideElement(this._buttons.updateId);		
	},
	
	_showElement: function(elementId)
	{
		document.getElementById(elementId).style.display = "";
	},
	
	_hideElement: function(elementId)
	{
		document.getElementById(elementId).style.display = "none";
	}
}