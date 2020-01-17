if (!window.Parasoft) {
    window.Parasoft = {};
}

if (!Parasoft.TabsUtil) {
    Parasoft.TabsUtil = {};
}


Parasoft.TabsUtil = function(options) {
	this._tabsSelector = options.tabsSelector;
	this._entityTypeId = options.entityTypeId;
	this._entityId = options.entityId;
}

Parasoft.TabsUtil.prototype = {
		
	loadNavigationContent: function()	
	{
		var thisRef = this;
		var tabs = jQuery(this._tabsSelector + " > ul.ui-tabs-nav > li ");
		tabs.each(function(){
			var sumSection = thisRef._getSummarySection(jQuery(this));
			if (sumSection != null) {
				var tabId = thisRef.getTabId(jQuery(this).find("a"));
				sumSection.addClass("tab-loader");
				
				jQuery.getJSON("/grs/TabSummary", {action: tabId, id: thisRef._entityId, typeId: thisRef._entityTypeId}, 
				    function (data)
				    {             
						sumSection.removeClass("tab-loader");
				        sumSection.addClass(data.className);				
				        sumSection.text(data.count);
				    });
			}
		});
		
	},
	
	onTabSelect: function (event, ui) {
    	var tab = jQuery(ui.tab);
    	if (tab.hasClass("loaded")) {
    		return;
    	}
    	tab.addClass("loaded");
    	var onTabSelectedCallback = this._getOnTabSelectFunction(this.getTabId(tab));
    	if (!onTabSelectedCallback) {
    		return;
    	}
    	onTabSelectedCallback(event, ui);
	},
	
	markTabAsLoaded: function(csvTabIds) {
		var tabIds = Planning.Util.parseCSV(csvTabIds);
		jQuery.each(tabIds, function(){
			var tab = jQuery("a[href$=" + this + "]");
	    	if (!tab.hasClass("loaded")) {
	    		tab.addClass("loaded");
	    	}				
		});	
	},
	
	requestTabReload: function (csvTabIds) {
		var tabIds = Planning.Util.parseCSV(csvTabIds);
		jQuery.each(tabIds, function(){
			var tab = jQuery("a[href$=" + this + "]");
	    	if (tab.hasClass("loaded")) {
	    		tab.removeClass("loaded");
	    	}			
		});
	},
	
	getTabId: function(tabNavi) {
		var tabId = tabNavi.attr("href");
		var tab = jQuery(tabId);
		if (tab == null) {
			return null;
		}
		return tab.attr("id");
	},	
	
	_getSummarySection : function(tabNaviLi) {
		var sum = tabNaviLi.find("div");
		if (sum.length > 0) {
			return sum;
		}		
		return null;
	},
	
	_getOnTabSelectFunction: function(tabId) {
        var loadFuncName = "onTabSelect_"+ tabId;
		if (typeof window[loadFuncName] != 'undefined'){
			return window[loadFuncName];
		}	
		return null;
	}
}