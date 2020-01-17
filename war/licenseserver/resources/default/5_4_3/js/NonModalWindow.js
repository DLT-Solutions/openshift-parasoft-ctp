if (!window.Planning) {
    window.Planning = {};
}

if (!Planning.NonModalWindow) {
    Planning.NonModalWindow = {};
}

Planning.NonModalWindow.NoReturnArg = "noReturnArg";

Planning.NonModalWindow.open = function (link, callBack)
{
	this.openWithSize(link, callBack, 910, 650);
}

Planning.NonModalWindow.openWithSize = function (link, callBack, width, height)
{
	this.openNew(link, callBack, width, height, "name");
}

Planning.NonModalWindow.openNew = function(link, callBack, width, height, name)
{
	if (Planning.Util.isEmptyString(link)) {
		return;
	}
    
	var popup = Planning.Util.queryUrl("popup", link);
	if (Planning.Util.isEmptyString(popup)) {
		if (link.indexOf("?") > 0) {
			link += "&popup=true";
		} else {
			link += "?popup=true";
		}
	}
	
	var modal = Planning.Util.queryUrl("modal", link);
	if (Planning.Util.isEmptyString(modal)) {
		if (link.indexOf("?") > 0) {
			link += "&modal=false";
		} else {
			link += "?modal=false";
		}
	}
	
    if (screen.height <= height) {
        height = screen.height;   
    }
    
    if (screen.width <= width) {
        width = screen.width;
    }
    
    var left, top;
	var offsetX = 100, offsetY = 100;
	
	if (document.documentElement && document.documentElement.offsetWidth > width) {
		offsetX = Math.round((document.documentElement.offsetWidth - width) / 2);
	}
	
	if (document.documentElement && document.documentElement.offsetHeight > height) {
		offsetY = Math.round((document.documentElement.offsetHeight - height) / 2);
	}
	
	if (window.screenLeft) { // IE / Chrome
		left = window.screenLeft + offsetX;
		top = window.screenTop + offsetY;
	} else if (window.screenX) { // Mozilla
		left = window.screenX + offsetX;
		top = window.screenY + offsetY;
	} else { // Default
		left = screen.availWidth / 2 - width / 2;
		top = screen.availHeight / 2 - height / 2;
	}
	
    var winRef = window.open(link, name, "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top);
    
    if (callBack != null) {
	    jQuery(winRef.document).ready(function() {
		    var interval = setInterval(function() {
			    if (winRef.closed) {
			    	callBack();
			    	clearInterval(interval);
			    }
		    }, 10);
	    });
    }
}