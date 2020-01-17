/*includes jsf/planning/js/#VERSION#/Util.js uses*/
if (!window.Planning) {
    window.Planning = {};
}

if (!Planning.ModalWindow) {
    Planning.ModalWindow = {};
}

Planning.ModalWindow.NoReturnArg = "noReturnArg";

Planning.ModalWindow.open = function (link, callBack)
{
	this.openWithSize(link, callBack, 1024, 650);
}

Planning.ModalWindow.callParentCallback = function(w)
{
	w.opener.passedCallBack = w.callBack;
    if (w.returnValue) {
	    w.opener.passedCallBack(w.returnValue);
    } else {
	    w.opener.passedCallBack();
    }
    w.opener.customUnlock();	
}

Planning.ModalWindow.openWithSize = function (link, callBack, width, height)
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
	
    var top = screen.top;
    var left = screen.left;
    
    if(screen.height > height) {
        left = (screen.height - height) / 2;
    } else {
        height = screen.height;   
    }
    
    if(screen.width > width) {
        left = (screen.width - width) / 2;
    } else {
        width = screen.width;
    }        
    
    if (window.showModalDialog) {
    	var returnValue = window.showModalDialog(link, "name", "dialogWidth:" + width + "px;dialogHeight:" + height + "px");
    	if (callBack != null) {
        	//sometimes function is just an object
        	if (!callBack.argumentNames) {
        		callBack(returnValue);
        		return;
        	}
        	if ((callBack.argumentNames() != null) && (callBack.argumentNames().length > 0)) {
        		callBack(returnValue);
        	} else {
        		callBack();
        	}    	
        }
    } else {
    	if (!window.topPosOffset) {
    		window.topPosOffset = 0;
    	}
    	if (!window.leftPosOffset) {
    		window.leftPosOffset = 0;
    	}
    	
    	var winRef = window.open(link, "_blank", "width=" + width + ",height=" + height + ",left=" + (left + window.leftPosOffset) + ",top=" + (window.topPosOffset + 75) );
    	winRef.topPosOffset = window.topPosOffset + 75;
    	winRef.leftPosOffset = window.leftPosOffset + 75;
    	window.blockerChild = winRef;
    	customLock();
    	if (callBack) {
    		winRef.callBack = callBack;
    		if (window.navigator.userAgent.indexOf("MSIE ") >= 0) {
    			Planning.Util.attachEventToElement(winRef, "unload", function() {Planning.ModalWindow.callParentCallback(winRef);});
    		} else {
    			winRef.onbeforeunload = function() {Planning.ModalWindow.callParentCallback(winRef);};
    		}
    	}
    	//alert("Your browser is not compatible with DTP. DTP works excellent under following Web Browsers: Firefox 3+, IE 6+, Google Chrome, Safari");
    	//return;
    }    
}
