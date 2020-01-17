if (!window.Parasoft) {
    window.Parasoft = {};
}

if (!Parasoft.Table) {
	Parasoft.Table = {};
}

if (!Parasoft.Table.Util) {
	Parasoft.Table.Util = {};
}

Parasoft.Table.Util.getSelectedIds = function(clientId) 
{
    var scrollTable = Planning.Util.getComponent(clientId);                
    var ids = Parasoft.Table.Util.getSelectedRowIds(scrollTable);    
    return ids;
};

/**
 * This function retrieves selected rows from given scrollable table (pst:scrollableTable tag).
 * returns csv list of ids of selected rows.
 * Note : there is an util method to parse out id on Java side (see ScrollableTableUtil.parseCSVToInt(...))
 * @author pawelf  
 *   
 */
Parasoft.Table.Util.getSelectedRowIds = function(scrollTable)
{
	if (scrollTable == null)
	{
		return null;
	}
	var rowIds = scrollTable.getSelectedRowIds();
	if (rowIds == null ||
		rowIds.length == 0)
	{
		Parasoft.Dialog.alert(resource.GET_SELECTED_ROW_ID_ALERT);
		return null;
	}
	var ids = "";
	for (var i = 0; i < rowIds.length; i++)
	{
		if (i < (rowIds.length - 1))
		{
			ids += rowIds[i] + ",";
		} else {
			ids += rowIds[i];
		}
	} 
	return ids;
};


Parasoft.Table.Util.openArea = function(clientId)
{
    var id = Planning.Util.escapeId(clientId);
    jQuery(function($) {
        var options = {};
        $("#" + id).show("blind",options,100,null);                                                                
    });
}; 

Parasoft.Table.Util.closeArea = function(clientId)
{
    var id = Planning.Util.escapeId(clientId);
    jQuery(function($) {
        var options = {};
        $("#" + id).hide("blind",options,100,null);          
    });
};

Parasoft.Table.Util.switchArea = function(areaId, showButton, hideButton, isShow)
{
	if (isShow)
	{
		Parasoft.Table.Util.openArea(areaId);
		showButton.style.display = "none";
		hideButton.style.display = "";
	}
	else 
	{
		Parasoft.Table.Util.closeArea(areaId);
		hideButton.style.display = "none";
		showButton.style.display = "";
	}
};

Parasoft.Table.Util.getNewFilterUrl = function(url, filterNameTextBoxId)
{
	var pathName = Planning.Util.getUrlPathName(url);
	document.getElementById(filterNameTextBoxId).value = "";
	return pathName + "?" + "pageMode=NEW";	
};

Parasoft.Table.Util.getEditFilterUrl = function(url, filterNameTextBoxId, filterComboId)
{
	var filterCombo = document.getElementById(filterComboId);
	var filterId = Planning.Util.getSelectElementValue(filterCombo);
	if (filterId >= 0) {
		var name = Planning.Util.getSelectElementText(filterCombo);
		document.getElementById(filterNameTextBoxId).value = name;
	}
	
	if (url.indexOf("?") > 0) {
		return url + "&" + "pageMode=EDIT";	
	}
	return url + "?" + "pageMode=EDIT";	
};

Parasoft.Table.Util.isValidFilterName = function(elem)
{
    var fName = elem.value;

    if (Planning.Util.isEmptyString(fName))
    {
    	Parasoft.Dialog.alert(resource.FILTER_NAME_REQUIRED);
        return false;
    }
    return true;
};

Parasoft.Table.Util.confirmDeleteFilter = function(id)
{
	if (id < 0) {
		Parasoft.Dialog.alert(resource.DELETE_FILTER_CONFIRMATION);
		return false;
	}
    if (confirm(resource.DELETE_FILTER_LAST_CONFIRMATION))
    {
        return true;
    }
    return false;
};

Parasoft.Table.Util.onFilterNameEnterKeyDown = function(event, btnSaveElem)
{
    if (event.keyCode != 13) {
        return true;
    }
    btnSaveElem.click();
                    
    return false;
};

Parasoft.Table.Util.getTableFilterObject = function(tableClientId)
{
	tableClientId += ":filter";
	return Planning.Util.getComponent(tableClientId);
};

Parasoft.Table.Util.confirmUnlockFilter = function (clientId, message)
{
	if (confirm(message)) 
	{ 
		document.getElementById(clientId).style.display = 'none';
	}
};

Parasoft.Table.Util.TableFilter = function(data)
{
	var _data = data;
	
	this.disable = function()
	{
	    var diabledFilter = document.getElementById(_data.disableAreaId);
	    diabledFilter.style.display = "";
	};
	
	this.enable = function()
	{
	    var diabledFilter = document.getElementById(_data.disableAreaId);
	    diabledFilter.style.display = "none";
	};	
};

Parasoft.Table.Util.getTableObjects = function(id)
{
	var result = new Array();
	var tableObject = null;
    jQuery(function($) {
    	var tables = $("table[class*='test_" + id + "']");    	
    	if (tables) {
	    	for (var i = 0; i < tables.length; i++ ) {
	    		tableObject = Planning.Util.getComponent(tables[i].id);
	    		if (tableObject) {
	    			result.push(tableObject);
	    		}
	    	}
    	}           
    });	
	return result;
};

Parasoft.Table.Util.initializeSearchDetails = function(detailsQuery)
{
    jQuery(detailsQuery + " .expand").bind("click", function() {
        jQuery(detailsQuery).addClass("expanded");
        jQuery(detailsQuery + " .expand").addClass("hiddenImp");
        jQuery(detailsQuery + " .collapse").removeClass("hiddenImp");
        return false;
    });
    jQuery(detailsQuery + " .collapse").bind("click", function() {
        jQuery(detailsQuery).removeClass("expanded");
        jQuery(detailsQuery + " .collapse").addClass("hiddenImp");
        jQuery(detailsQuery + " .expand").removeClass("hiddenImp");
        return false;
    });	
};

Parasoft.Table.Util.initializeSearchDetailsButtons = function(detailsQuery)
{
	if (jQuery(detailsQuery + " > div").height() > 20) {
        jQuery(detailsQuery + " .expand").removeClass("hiddenImp");
    }
};

Parasoft.Table.Util.initializePaging = function(selector)
{
	var scrollerTable = jQuery(selector + " div.scroller table");
	if ((!scrollerTable) || (scrollerTable.length == 0)) {
		return;
	}
	if (!Planning.Util.isEmptyString(scrollerTable[0].style.display)) {
		return;
	}
	var tableWrapper = jQuery(selector + " div.tableWrapper");
	tableWrapper.addClass("tableWrapperWithPager");
	
	var scroller = jQuery(selector + " div.scroller");
	scroller.removeClass("hidden");
};

Parasoft.Table.Util.initializeShowPagesLink = function(selector, showPagesLinkClass)
{
	var hiddenDiv = jQuery(selector + " div.scroller" + " div" + showPagesLinkClass);
	if ((!hiddenDiv) || (hiddenDiv.length == 0)) {
		return;
	}
	if (!Planning.Util.isEmptyString(hiddenDiv[0].style.display)) {
		return;
	}

	var scroller = jQuery(selector + " div.scroller");
	scroller.removeClass("hidden");
	
	var tableWrapperOverScroller = jQuery(selector + " div.tableWrapper");
	tableWrapperOverScroller.addClass("tableWrapperWithScroller");
};