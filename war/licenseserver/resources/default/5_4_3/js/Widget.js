if (!window.Parasoft) {
    window.Parasoft = {};
}

if (!Parasoft.Widget) {
	Parasoft.Widget = {};
}

Parasoft.Widget = function(options) {
	this._definition = null;
	this._id = options.id;
	this._placeHolderId = options.placeHolderId;
	this._userId = options.userId;
	this._events = {
	    onCreate: options.events.onCreate
	};
	this._init();
}

Parasoft.Widget.prototype = {
    		
	getDefSection: function()	
	{
		return jQuery("#" + this._placeHolderId + " " + Parasoft.Widget.Consts.DefSelector.ROOT);
	},		
	
	showApplyButton: function() {
		var def = this.getDefSection();
		jQuery(def).find(Parasoft.Widget.Consts.DefSelector.BUTTONS + " " 
				+ Parasoft.Widget.Consts.DefSelector.APPLY_BTN).removeClass("hidden");		
	},
	
	hideApplyButton: function() {
		var def = this.getDefSection();
		jQuery(def).find(Parasoft.Widget.Consts.DefSelector.BUTTONS + " " 
				+ Parasoft.Widget.Consts.DefSelector.APPLY_BTN).addClass("hidden");		
	},
	
	hideWidgetName: function() {
		var def = this.getDefSection();
		jQuery(def).find(Parasoft.Widget.Consts.DefSelector.COMMON + " " + 
				Parasoft.Widget.Consts.DefSelector.NAME).addClass("hidden");	
		jQuery(def).find(Parasoft.Widget.Consts.DefSelector.COMMON + " " + 
				Parasoft.Widget.Consts.DefSelector.NAME + " input").val("");
	},
	
	serialize: function() {
		var json = new Array();
		
		json.push(Planning.Util.buildJson(Parasoft.Widget.Consts.Serialize.WIDGET_ID, this._id));
		json.push(Planning.Util.buildJson(Parasoft.Widget.Consts.Serialize.PLACE_HOLEDER_ID, this._placeHolderId));
		json.push(Planning.Util.buildJson(Parasoft.Widget.Consts.Serialize.USER_ID, this._userId));
		
		var value = Planning.Util.toCSV(json);
		value = "{" + value + "}";		
		
		return value;
	},
	
	getUserId: function() {
		return this._userId;
	},
	
	_getWidgetName: function() {
		var def = this.getDefSection();
		
		return jQuery(def).find(Parasoft.Widget.Consts.DefSelector.COMMON + " " + 
				Parasoft.Widget.Consts.DefSelector.NAME + " input").val();
	},
	
	_getWidgetType: function() {
		var def = this.getDefSection();
		
		return jQuery(def).find(Parasoft.Widget.Consts.DefSelector.COMMON + " " + 
				Parasoft.Widget.Consts.DefSelector.TYPE + " select").val();
	},
	
	_init: function()
	{
		var head = this._getHead();	
		jQuery(head).find(Parasoft.Widget.Consts.DefSelector.SHOW_LINK).bind("click", {widget: this}, this._onShowDefPanel);
		jQuery(head).find(Parasoft.Widget.Consts.DefSelector.HIDE_LINK).bind("click", {widget: this}, this._onHideDefPanel);
		
		this._initDefSection();
	},
	
	_initDefSection: function()
	{
		var def = this.getDefSection();
		jQuery(def).find(Parasoft.Widget.Consts.DefSelector.BUTTONS + " " 
				+ Parasoft.Widget.Consts.DefSelector.CANCEL_BTN).bind("click", {widget: this}, this._onHideDefPanel);
		
		jQuery(def).find(Parasoft.Widget.Consts.DefSelector.BUTTONS + " " 
				+ Parasoft.Widget.Consts.DefSelector.APPLY_BTN).bind("click", {widget: this}, this._onApplyBtnClicked);
		
		jQuery(def).find(Parasoft.Widget.Consts.DefSelector.COMMON + " " 
				+ Parasoft.Widget.Consts.DefSelector.TYPE + " select").bind("change", {widget: this}, this._onDefTypeChange);
	},
	
	_getHead: function()	
	{
		return jQuery("#" + this._placeHolderId + " " + Parasoft.Widget.Consts.WidgetSelector.HEADER);
	},
	
	/** event handlers **/
	_onApplyBtnClicked: function(event) {
		var widget = event.data.widget;
		
		var json = new Array();	
		
		var type = widget._getWidgetType();
		if (!type) {
			throw "_onApplyBtnClicked: Can not save widget definition, widget.type is null" 
		}
		json.push(Planning.Util.buildJson(Parasoft.Widget.Consts.CreateActionKeys.TYPE, type));
		
		var name = widget._getWidgetName();
        if (Planning.Util.isEmptyString(name)) {
            Parasoft.Dialog.alert("!Widget Title can not be empty!");
            return;
        }
        json.push(Planning.Util.buildJson(Parasoft.Widget.Consts.CreateActionKeys.NAME, name));
        
		if (!widget._definition) {
			throw "_onApplyBtnClicked: Can not save widget definition, widget._definition is null" 
		}
		
		var attrs = widget._definition.getData();
		
		if (!attrs) {
			throw "_onApplyBtnClicked: Can not save widget definition, widget._definition.getData() is null" 
		}
		
		json.push(Planning.Util.buildJson(Parasoft.Widget.Consts.CreateActionKeys.ATTRS, attrs));
		
		var value = Planning.Util.toCSV(json);
		value = "{" + value + "}";		
		
		Parasoft.Widget.Operation.addWidgetToUser(
			widget._userId,
			3,
			widget._placeHolderId,
			value,
			function(data)
			{
				if (!data && !data.id) {
					throw "_onApplyBtnClicked: there was as problem with widget creation! Response does not contain id." 
				}
				if (!widget._events) {
					return;
				}
				if (!widget._events.onCreate) {
					return;
				}	
				widget._hideDefPanel();
				widget._events.onCreate(data.id);
			}
		);		
	},
	
	_onShowDefPanel: function(event)
	{
		var head = event.data.widget._getHead();		
		jQuery(head).find(Parasoft.Widget.Consts.DefSelector.SHOW_LINK).addClass("hidden");
		jQuery(head).find(Parasoft.Widget.Consts.DefSelector.HIDE_LINK).removeClass("hidden");
		
		var def = event.data.widget.getDefSection();
		jQuery(def).removeClass("hidden");
	},
	
	_onHideDefPanel: function(event)
	{
		var widget = event.data.widget;
		var head = widget._hideDefPanel();
	},
	
	_hideDefPanel: function() {
		var head = this._getHead();
		jQuery(head).find(Parasoft.Widget.Consts.DefSelector.HIDE_LINK).addClass("hidden");
		jQuery(head).find(Parasoft.Widget.Consts.DefSelector.SHOW_LINK).removeClass("hidden");
		
		if (this._definition) {
			this._definition.destroy();
			this._definition = null;
		}
		
		jQuery(def).find(Parasoft.Widget.Consts.DefSelector.COMMON + " " + 
				Parasoft.Widget.Consts.DefSelector.TYPE + " select").val(-1);
		var def = this.getDefSection();
		jQuery(def).addClass("hidden");
		
		this.hideApplyButton();
		this.hideWidgetName();
	},
	
	_onDefTypeChange: function(event)
	{
		var value = jQuery(event.target).val();
		var widget = event.data.widget;
		widget.hideWidgetName();
		
		//detroy previosly selected definition
		if (widget._definition) {
			widget._definition.destroy();
			widget._definition = null;
			widget.hideApplyButton();			
		}
		if (value == Parasoft.Widget.Consts.UNDEFINED) {
			return;
		}
		jQuery.getJSON(Parasoft.Widget.Consts.SERVLET, {value: value, action: Parasoft.Widget.Consts.Action.TYPE, userid: widget._userId},
			function(data)
			{
				switch (value)
				{
				    case Parasoft.Widget.Consts.SS_TYPE:
				    	widget._definition = new Parasoft.Widget.Definition.SavedSearch({widget: widget});
				    break;	
				    case Parasoft.Widget.Consts.REPORT_TYPE:
				    	//TODO
				    break;				    
				}
				jQuery(widget.getDefSection()).find(Parasoft.Widget.Consts.DefSelector.COMMON + " " + 
						Parasoft.Widget.Consts.DefSelector.NAME).removeClass("hidden");				
				widget._definition.init(data);
			}
		);		
	}
}

if (!Parasoft.Widget.Definition) {
	Parasoft.Widget.Definition = {};
}

if (!Parasoft.Widget.Definition.SavedSearch) {
	Parasoft.Widget.Definition.SavedSearch = {};
}

Parasoft.Widget.Definition.SavedSearch = function(options) {	
	this._widget = options.widget;
}

Parasoft.Widget.Definition.SavedSearch.prototype = {
		
    init: function(data) {
		if (Planning.Util.isEmptyArray(data)) {
			return;
		}
		var ssTypeInputSelector = Parasoft.Widget.Consts.SearchSelector.ROOT + 
			" " + Parasoft.Widget.Consts.SearchSelector.TYPE + 
			" " + Parasoft.Widget.Consts.CommonSelector.INPUT;
		var def = this._widget.getDefSection();
		
		var select = this._createSelectElement(data, ssTypeInputSelector, def);
		
		//bind event
		jQuery(select).bind("change", {def: this}, this._onTypeChange);
		jQuery(def).find(Parasoft.Widget.Consts.SearchSelector.ROOT).removeClass("hidden");
    },

	destroy: function() {
		var def = this._widget.getDefSection();
		
		jQuery(def).find(Parasoft.Widget.Consts.SearchSelector.ROOT + 
				" " + Parasoft.Widget.Consts.SearchSelector.TYPE + 
				" " + Parasoft.Widget.Consts.CommonSelector.INPUT + " select").remove();
		
		this._destroyValue(def);
		
		jQuery(def).find(Parasoft.Widget.Consts.SearchSelector.ROOT).addClass("hidden");	
		
    },
    
    getData: function() {
    	
    	var res = new Hashtable();
    	
    	res.put(Parasoft.Widget.Consts.AttrKeys.SAVED_SEARCH_TYPE, this._getType());
    	res.put(Parasoft.Widget.Consts.AttrKeys.SAVED_SEARCH_ID, this._getValue());
    	
    	return res;
    	
    },
    
    _getType: function() {
    	var def = this._widget.getDefSection();
		
		return jQuery(def).find(Parasoft.Widget.Consts.SearchSelector.ROOT + 
				" " + Parasoft.Widget.Consts.SearchSelector.TYPE + 
				" " + Parasoft.Widget.Consts.CommonSelector.INPUT + " select").val();    	
    },
    
    _getValue: function() {
    	var def = this._widget.getDefSection();
		
		return jQuery(def).find(Parasoft.Widget.Consts.SearchSelector.ROOT + 
				" " + Parasoft.Widget.Consts.SearchSelector.VALUE + 
				" " + Parasoft.Widget.Consts.CommonSelector.INPUT + " select").val();     	
    },
    
    _destroyValue: function(parent) {
		jQuery(parent).find(Parasoft.Widget.Consts.SearchSelector.ROOT + 
				" " + Parasoft.Widget.Consts.SearchSelector.VALUE + 
				" " + Parasoft.Widget.Consts.CommonSelector.INPUT + " select").remove();
		jQuery(parent).find(Parasoft.Widget.Consts.SearchSelector.ROOT + " " + Parasoft.Widget.Consts.SearchSelector.VALUE).addClass("hidden");    	
    },
    
    _createSelectElement: function(data, selector, parent) {
    	
		var select = jQuery("<select></select>").addClass("inputTxt");
		
		jQuery(parent).find(selector + " select").remove();
		jQuery(parent).find(selector).append(select);
		
		jQuery(select).append(jQuery("<option value=\"-1\"> --- </option>"));
		
		var object = null;
		for (var i = 0; i< data.length; i++) {
			object = data[i];
			for (var key in object) {
				jQuery(select).append(jQuery("<option value=\"" + object[key] + "\">" + key + "</option>"));
			}
		}    	
		
		return select;
    },
    
    /** event handlers **/
    
    _onTypeChange: function(event) {
		var value = jQuery(event.target).val();
		var definition = event.data.def;
		var widget = definition._widget;
		
		definition._destroyValue(widget.getDefSection());
		
		if (value == Parasoft.Widget.Consts.UNDEFINED) {
			return;
		}
		
		jQuery.getJSON(Parasoft.Widget.Consts.SERVLET, {value: value, action: Parasoft.Widget.Consts.Action.SS_TYPE, userid: widget._userId},
			function(data)
			{
				if (Planning.Util.isEmptyArray(data)) {
					return;
				}
				var ssValueInputSelector = Parasoft.Widget.Consts.SearchSelector.ROOT + 
				" " + Parasoft.Widget.Consts.SearchSelector.VALUE + 
				" " + Parasoft.Widget.Consts.CommonSelector.INPUT;
				
				var defSection = widget.getDefSection();				
				var select = definition._createSelectElement(data, ssValueInputSelector, defSection);
				
				jQuery(select).bind("change", {def: definition}, definition._onValueChange);
				jQuery(defSection).find(Parasoft.Widget.Consts.SearchSelector.ROOT + " " + Parasoft.Widget.Consts.SearchSelector.VALUE).removeClass("hidden");
			}
		);    	
    },
    
    _onValueChange: function(event) {
    	var value = jQuery(event.target).val();
    	
    	var definition = event.data.def;
		var widget = definition._widget;
		
		if (value == Parasoft.Widget.Consts.UNDEFINED) {
			widget.hideApplyButton();
		} else {
			widget.showApplyButton();
		}
    }
}

if (!Parasoft.Widget.Operation) {
	Parasoft.Widget.Operation = {};
}

Parasoft.Widget.Operation = {
    
	addWidgetToUser: function(userId, placeholderType, placeholderId, data, callback) {
		
		jQuery.getJSON(
			Parasoft.Widget.Consts.SERVLET, 
			{
				value: data, 
				action: Parasoft.Widget.Consts.Action.CREATE,
				userid: userId,
				placeholdertype: placeholderType,
				placeholderid: placeholderId
			}, 
			callback
		);		
	},
	
	updatePosition: function(userId, data, callback) {
		
		jQuery.getJSON(
			Parasoft.Widget.Consts.SERVLET, 
			{
				value: data, 
				action: Parasoft.Widget.Consts.Action.UPDATE_POSITION,
				userid: userId
			}, 
			callback
		);		
	}	
}

if (!Parasoft.Widget.Plugin) {
	Parasoft.Widget.Plugin = {};
}

Parasoft.Widget.Plugin = {	
		
	addSavedSearchToWorkspace: function(name, searchType, ssId, userId, placeholderType) {
		
		var json = new Array();	
		
		json.push(Planning.Util.buildJson(Parasoft.Widget.Consts.CreateActionKeys.TYPE, Parasoft.Widget.Consts.SS_TYPE));
        json.push(Planning.Util.buildJson(Parasoft.Widget.Consts.CreateActionKeys.NAME, name));

		var attrs = new Hashtable();
		
		attrs.put(Parasoft.Widget.Consts.AttrKeys.SAVED_SEARCH_TYPE, searchType);
		attrs.put(Parasoft.Widget.Consts.AttrKeys.SAVED_SEARCH_ID, ssId);
		
		json.push(Planning.Util.buildJson(Parasoft.Widget.Consts.CreateActionKeys.ATTRS, attrs));
		
		var value = Planning.Util.toCSV(json);
		value = "{" + value + "}";		
		
		Parasoft.Widget.Operation.addWidgetToUser(
			userId,
			placeholderType,
			-1,
			value,
			function(data)
			{
				if (!data && !data.id) {
					throw "_onApplyBtnClicked: there was as problem with widget creation! Response does not contain id." 
				}
				setStatusInfo("!Saved Search [" + name + "] has been added as a widget to your Workspace.!");
			}
		);		
	},
	
	addReportToWorkspace: function(name, url, userId, placeholderType) {
		
		var json = new Array();	
		
		json.push(Planning.Util.buildJson(Parasoft.Widget.Consts.CreateActionKeys.TYPE, Parasoft.Widget.Consts.REPORT_TYPE));
        json.push(Planning.Util.buildJson(Parasoft.Widget.Consts.CreateActionKeys.NAME, name));

		var attrs = new Hashtable();
		
		attrs.put(Parasoft.Widget.Consts.AttrKeys.URL, url);
		
		json.push(Planning.Util.buildJson(Parasoft.Widget.Consts.CreateActionKeys.ATTRS, attrs));
		
		var value = Planning.Util.toCSV(json);
		value = "{" + value + "}";		
		
		Parasoft.Widget.Operation.addWidgetToUser(
			userId,
			placeholderType,
			-1,
			value,
			function(data)
			{
				if (!data && !data.id) {
					throw "_onApplyBtnClicked: there was as problem with widget creation! Response does not contain id." 
				}				
				parent.setStatusInfo("!Report [" + name + "] has been added as a widget to your Workspace.!");
			}
		);		
	}	
}

if (!Parasoft.Widget.Consts) {
	Parasoft.Widget.Consts = {};
}

Parasoft.Widget.Consts = {
    UNDEFINED: "-1",	
    SERVLET: "/grs/Widget",
    SS_TYPE: "SAVED_SEARCH",
    REPORT_TYPE: "REPORT",
    
    CreateActionKeys: {
	    NAME: "NAME",
	    ATTRS: "ATTRS",
	    TYPE: "TYPE"	    
    },
    
    AttrKeys: {
	    SAVED_SEARCH_TYPE: "SAVED_SEARCH_TYPE",
	    SAVED_SEARCH_ID: "SAVED_SEARCH_ID",
	    URL: "URL"
    },

    //see WidgetServletAction enum
    Action: {
		TYPE: "TYPE",
		SS_TYPE: "SS_TYPE",
		CREATE: "CREATE",
		UPDATE_POSITION: "UPDATE_POSITION"
	},
    
    CommonSelector: {
		INPUT: ".input"
	},
    
	WidgetSelector: {
		ROOT: ".widget",
		HEADER: ".widget-header",
		DEF: ".widget-def",
		CONTENT: ".widget-content"		
	},
	
	DefSelector: {
		ROOT: ".widget-def",
		COMMON: ".widget-def-common",
		TYPE: ".widget-def-common-type",	
		NAME: ".widget-def-common-name",
		SHOW_LINK: ".show-def",
		HIDE_LINK: ".hide-def",
		BUTTONS: ".widget-def-buttons",
		CANCEL_BTN: ".cancelW",
		APPLY_BTN: ".applyW"
	},
	
    SearchSelector: {
	    ROOT: ".widget-def-ss",
	    TYPE: ".widget-def-ss-type",
	    VALUE: ".widget-def-ss-value"
    },
    
    //see IWidgetConsts.java
    Serialize: {
    	WIDGET_ID: "WIDGET_ID",
    	PLACE_HOLEDER_ID: "PLACE_HOLDER_ID",
    	USER_ID: "USER_ID"
    }
}