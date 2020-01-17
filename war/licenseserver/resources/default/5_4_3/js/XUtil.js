if (!window.Planning) {
    window.Planning = {};
}

if (!Planning.XUtil) {
    Planning.XUtil = {};
}

Planning.XUtil.CODE_TAB = "code";
Planning.XUtil.TESTS_TAB = "tests";
Planning.XUtil.SCENARIOS_TAB = "scenarios";
Planning.XUtil.TRACER_TAB = "tracer";

Planning.XUtil.updateParentTab = function (value, type)
{
	if (parent.updateTooltip)
	{
		parent.updateTooltip(value, type);
	}
	
}

Planning.XUtil.refreshFrame = function (frameId)
{
	var frame = document.getElementById(frameId);
	if (frame != null) { 					
		frame.src = frame.src + "&amp;refreshMe=true";
	}	
}

Planning.XUtil.onLoad = function (id, typeId) 
{
	this.initTab(Planning.XUtil.CODE_TAB, id, typeId,         
	    function (data)
	    {        
	        var sum = jQuery("#" + Planning.XUtil.CODE_TAB + "sum");
	        sum.removeClass();       
	        sum.addClass("tab-sum");             
	        sum.addClass("code-tab");
	
	        sum.text(data.count);
	    }
	);
	
	this.initTab(Planning.XUtil.TESTS_TAB, id, typeId,         
	    function (data)
	    {        
	        var sum = jQuery("#" + Planning.XUtil.TESTS_TAB + "sum");
	        sum.removeClass();       
	        sum.addClass("tab-sum");             
	        sum.addClass("auto-test-tab");
	
	        sum.text(data.count);
	    }
	);	
}

Planning.XUtil.onTabSelect = function (tab, url)
{
	var iframe = jQuery(tab.attr("href") + " iframe");
	if (Planning.Util.isEmptyString(iframe.attr("src"))) {
		iframe.attr("src", url);
	}
}

Planning.XUtil.initTab = function (tabId, id, typeId, callback)
{
    var sum = jQuery("#" + tabId + "sum");
    sum.addClass("tab-loader");
    sum.addClass("tab-sum");
    
    jQuery.getJSON("/grs/TabSummary", {action: tabId, id: id, typeId: typeId}, callback);     
}