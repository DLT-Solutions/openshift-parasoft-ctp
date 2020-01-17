if (!window.Parasoft) {
    window.Parasoft = {};
}

if (!Parasoft.Menu) {
	Parasoft.Menu = {};
}


Parasoft.Menu = function(options) {
	
	this._mode = options.mode == null ? Parasoft.Menu.Mode.Tabbed : options.mode; 
	this._useEffect = options.useEffect;
	this._showEvent = options.showEvent == null ? "click" : options.showEvent;
};

Parasoft.Menu.prototype = {
    
	create: function()
	{
		switch (this._mode) {
			case Parasoft.Menu.Mode.Menu:
				this._createMenu();
				break;
			case Parasoft.Menu.Mode.Tabbed:
				this._createTabs();
				break;	
			default:
				break;
		}
	},
	
	prependMenuItem: function(parent, menuItem) {
		jQuery(parent).prepend(menuItem);
	},
	
	addPanel: function(panel, menuItem)
	{
		var li = jQuery(menuItem).find('li');	
		var children = jQuery(li).children();
		//already contains this panel
		if (children.length > 0) {
			return;
		}
		jQuery(menuItem).unbind('mouseleave');
		jQuery("#content").bind('click', {menuItem: menuItem, menu: this}, this._hideSubMenuEventHandler);	
		
		jQuery(panel).appendTo(jQuery(li));
		panel[0].style.display = "block";
	},
	
	_createMenu: function()
	{
        var array = jQuery("ul.root li.parent");
        for (var i = 0 ; i<array.length; i++) {
            this._attachOnMouseOverEventToSubParent(array[i]);
        }
        array = jQuery("ul.root > li");
        for (var i = 0 ; i<array.length; i++) {
            this._attachOnMouseOverEventToSubParent(array[i]);
        }		
	},
	
	_createTabs: function()
	{
        var array = jQuery("ul.root li.parent");
        for (var i = 0 ; i<array.length; i++) {
            this._attachOnMouseOverEventToSubParent(array[i]);
        }
		var array = jQuery("ul.root div.sub");
        for (var i = 0 ; i<array.length; i++) {
            this._attachEventToSubDiv(array[i]);
        }		
	},
	
	_attachOnMouseOverEventToSubParent: function (elem) 
	{
    	var ul = jQuery(elem).find('ul');
    	var onShowFunc = this._showSubMenuMouseoverEventHandler;
    	
    	var onShowAttrValue = elem.getAttribute("onshow");
    	if (onShowAttrValue != null) {
    		var onshow = null;
    		if (typeof(onShowAttrValue) == "string") {
    			onshow = eval(onShowAttrValue);
    		} else {
    			onshow = onShowAttrValue;
    		}
    		onShowFunc = function(event) { 
    			event.data.menu._showSubMenuEventHandler(event);    			
    			onshow(event);
    		}    		
    	}
    	
    	jQuery(elem).bind("mouseover", {menuItem: ul[0], menu: this}, onShowFunc);
		jQuery(elem, ul[0]).bind('mouseleave', {menuItem: ul[0], menu: this}, this._hideSubMenuEventHandler);
	},
	
	
    _attachEventToSubDiv: function(elem)
    {
    	var ul = jQuery(elem).parent().find('ul');
    	var onShowFunc = this._showSubMenuEventHandler;
    	
    	var onShowAttrValue = elem.getAttribute("onshow");
    	if (onShowAttrValue != null) {
    		var onshow = null;
    		if (typeof(onShowAttrValue) == "string") {
    			onshow = eval(onShowAttrValue);
    		} else {
    			onshow = onShowAttrValue;
    		}
    		onShowFunc = function(event) {
    			event.data.menu._showSubMenuEventHandler(event);    			
    			onshow(event);
    		}    		
    	}
    	
    	jQuery(elem).bind(this._showEvent, {menuItem: ul[0], menu: this}, onShowFunc);
    	jQuery(ul[0]).bind('mouseleave', {menuItem: ul[0], menu: this}, this._hideSubMenuEventHandler);
    },
    
    _showSubMenuEventHandler: function(event)
    {    	
    	var menuItem = event.data.menuItem;
    	var menu = event.data.menu;

    	if (menuItem == null) {
    		return;
    	}
		var isOpen = (jQuery("#" + menuItem.id + ":visible").length == 1);
		if (isOpen) {
    		menu._hide(menuItem);
    	} else {
    		menu._show(menuItem);
    		var idsToSkipp = menu._getIdsToSkipp(menuItem.id);
    		menu._hideAllSubMenus(idsToSkipp);
    	}
    },
    
    _showSubMenuMouseoverEventHandler: function(event)
    {    	
    	var menuItem = event.data.menuItem;
    	var menu = event.data.menu;

    	if (menuItem == null) {
    		return;
    	}
		event.stopPropagation();
		menu._show(menuItem);
		var idsToSkipp = menu._getIdsToSkipp(menuItem.id);
		menu._hideAllSubMenus(idsToSkipp);
    },    

    _hideSubMenuEventHandler: function(event)
    {
    	var menuItem = event.data.menuItem;
    	var menu = event.data.menu;
    	if (menuItem != null) {
    		menu._hide(menuItem);
    	}
    },
    
    _show: function(elem)
    {
    	if (this._useEffect) {
	        var options = {};
	        jQuery(elem).show("slide",options,300,null);
    	} else {
    		elem.style.display = "block";   
    	}
    },
    
    _hide: function(elem)
    {
        if (this._useEffect) {
	        var options = {};
	        jQuery(elem).hide("slide",options,300,null);
        } else {
        	elem.style.display = "none";
        }
    },
    
    _getIdsToSkipp: function(clientId)
    {
    	var result = new Array();
    	if (Planning.Util.isEmptyString(clientId)) {
    		return result;
    	}
    	while (clientId.indexOf(":") > 0) {
    		result.push(clientId);
    		clientId = clientId.substr(0, clientId.lastIndexOf(":"));
    	}
    	result.push(clientId);
        return result;
    },
    
    _hideAllSubMenus: function(idsToSkipp)
    {
        var ul = null;
        var uls = jQuery("ul.root ul:visible");
        if (Planning.Util.isEmptyArray(uls)) {
            return;
        }  
        for (var i = 0 ; i<uls.length; i++) {
        	ul = uls[i];
        	if (jQuery.inArray(ul.id, idsToSkipp) >= 0) {
        		continue;
        	}        		
            this._hide(ul);
        }
    }

}

if (!Parasoft.Menu.Mode) {
	Parasoft.Menu.Mode = {};
}

Parasoft.Menu.Mode = {Menu: 1, Tabbed: 2};
