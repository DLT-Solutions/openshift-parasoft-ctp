

if (!window.Planning) {
    window.Planning = {};
}

if (!Planning.Util) {
    Planning.Util = {};
}

if (!Planning.Util.Position) {
	Planning.Util.Position = {};
}

Planning.Util.Position = {Top: 1, TopRight: 2, TopLeft: 3, Bottom: 4, BottomRight: 5, BottomLeft: 6};

Planning.Util.pressedImg = function(imgElement)
{
    imgElement.className = "pressed";
}
    
Planning.Util.activeImg = function (imgElement)
{
    imgElement.className = "active";
}

Planning.Util.inactiveImg = function (imgElement)
{
    imgElement.className = "inactive";
}

Planning.Util.isPageValid = function ()
{
    var isValid = true;
    var images = document.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++)
    {
        var image = images[i];
        if (image.src.indexOf("error.gif") > 0)
        {
            isValid = false;
            break;     
        }
        if (image.src.indexOf("warn.gif") > 0)
        {
            isValid = false;
            break;     
        }        
    }
    return isValid;
}

Planning.Util.getSelectElementValue = function (selectElement)
{
    if (selectElement == null)
    {
        return null;
    }
    var index = selectElement.selectedIndex;
    
    return selectElement.options[index].value;

}

Planning.Util.getSelectElementText = function (selectElement)
{
    if (selectElement == null)
    {
        return null;
    }
    var index = selectElement.selectedIndex;
    
    return selectElement.options[index].text;

}

Planning.Util.addToWorkspace = function(filterToString, comboElement, searchType, userId, placeHolderId) 
{
	var savedSearchId = parseInt(Planning.Util.getSelectElementValue(comboElement));
	if (savedSearchId < 0) {
		 Parasoft.Dialog.alert("!Only Saved Search can be added to your Workspace!");
		 return;
	}
	var name = Planning.Util.getSelectElementText(comboElement) + " (" + filterToString + ")";
	
	//alert("name:" + name + ", type:" + searchType + ", ssId:" + savedSearchId + ", userId:" + userId + ", placeHolderId:" + placeHolderId);
	
	Parasoft.Widget.Plugin.addSavedSearchToWorkspace(
	    name, 
		searchType,
		savedSearchId,
		userId,
		placeHolderId
	);
}


Planning.Util.setSelectElementInComboByText = function (selectElement, text)
{
    if (selectElement == null) {
        return null;
    }
    var optionsList = selectElement.options;
    for (i=0; i < optionsList.length; i++) {
		if (optionsList[i].text == text) {
			selectElement.selectedIndex = optionsList[i].index;
			return; 
		}
	}
}

Planning.Util.setSelectElementInComboByValue = function (selectElement, value)
{
    if (selectElement == null) {
        return null;
    }
    var optionsList = selectElement.options;
    for (i=0; i < optionsList.length; i++) {
		if (optionsList[i].value == value) {
			selectElement.selectedIndex = optionsList[i].index;
			return; 
		}
	}
}

Planning.Util.arrayContains = function (array, value)
{
    var result = false;
    if (this.isEmptyArray(array))
    {
        return result;
    }
    
    if (value == null)
    {
        return result;
    }   
    
    for (var i = 0; i < array.length; i++)
    {
        if (array[i] == value)
        {
            result = true;
            break;
        } 
    }
    return result;
}

Planning.Util.arrayFindPredicate = function (array, predicateContains)
{
    if (this.isEmptyArray(array)) {
        return null;
    }
    
    if (predicateContains == null) {
        return null;
    }   
    
    for (var i = 0; i < array.length; i++) {
    	if (predicateContains(array[i])) {
            return array[i];
    	}
    }
    return null;
};

Planning.Util.indexOf = function (array, value)
{
    var result = -1;
    if (this.isEmptyArray(array))
    {
        return result;
    }
    
    if (value == null)
    {
        return result;
    }   
    
    for (var i = 0; i < array.length; i++)
    {
        if (array[i] == value)
        {
            result = i;
            break;
        } 
    }
    return result;
}

Planning.Util.parseCSV = function (value)
{
    var result = new Array();
    var pattern = /\s*,\s*/;
    
    if (this.isEmptyString(value))
    {
        return result;
    }
    
    result = value.split(pattern);

    return result;
}

Planning.Util.toCSV = function (array)
{
	var values = "";
	if (this.isEmptyArray(array)) {
		return values;
	}
	for (var i = 0; i < array.length; i++)
	{
		if (i < (array.length - 1))
		{
			values += array[i] + ",";
		} else {
			values += array[i];
		}
	} 
	return values;
}

Planning.Util.isEmptyString = function (value)
{
	if (value == null) {
		return true;
	}
	//trim
	value = this.trimString(value);
    return (value.length == 0); 
}

Planning.Util.validateStringLength = function (value, min, max)
{
	if ((value == null) && (min != null)) {
		return false;
	}
	if (value == null) {
		return true;
	}		
	//trim
	value = this.trimString(value);
	if ((min != null) && (value.length < min)) {
		return false;
	}
	if ((max != null) && (value.length > max)) {
		return false;
	}
    return true; 
}

Planning.Util.trimString = function (value)
{
	if (value == null) {
		return value;
	}
	//trim
	return value.replace(/^\s*/, "").replace(/\s*$/, "");		
}

Planning.Util.stringFormat = function(text)
{
    if (arguments.length <= 1 ) {
        //if there are not 2 or more arguments there’s nothing to replace
        //just return the original text
        return text;
    }

    //decrement to move to the second argument in the array
    var tokenCount = arguments.length - 2;
    for(var token = 0; token <= tokenCount; token++) {
        //iterate through the tokens and replace their placeholders from the original text in order
        text = text.replace( new RegExp("\\{" + token + "\\}", "gi"), arguments[ token + 1 ]);
    }

    return text;
}

Planning.Util.isEmptyArray = function (array)
{
    return ((array == null) || (array.length == 0)); 
}

Planning.Util.getWindowHeight = function() 
{
	var windowHeight = 0;
	if (typeof(window.innerHeight) == 'number') {
		windowHeight = window.innerHeight;
	}
	else 
	{
		if (document.documentElement && document.documentElement.clientHeight) {
			windowHeight = document.documentElement.clientHeight;
		}
		else 
		{
			if (document.body && document.body.clientHeight) {
				windowHeight = document.body.clientHeight;
			}
		}
	}
	
	return windowHeight;
}

Planning.Util.getContentHeight = function()
{
	var res = 0;
	if (document.getElementById) {
		var windowHeight = this.getWindowHeight();
		if (windowHeight > 0) {
			var toolBar = document.getElementById('toolBar');
			if (toolBar != null) {
				var toolBarHeight = document.getElementById('toolBar').offsetHeight;
				windowHeight -= toolBarHeight;
			}
			
			var contentElement = document.getElementById('contentBody');
			res = (windowHeight - 125);
		}
	}
	return res;
}

Planning.Util.getWindowWidth = function() 
{
	var windowWidth = 0;
	if (typeof(window.innerWidth) == 'number') {
		windowWidth = window.innerWidth;
	}
	else 
	{
		if (document.documentElement && document.documentElement.clientWidth) {
			windowWidth = document.documentElement.clientWidth;
		}
		else 
		{
			if (document.body && document.body.clientWidth) {
				windowWidth = document.body.clientWidth;
			}
		}
	}
	
	return windowWidth;
}


Planning.Util.getYCords = function (oElement)
{
	var iReturnValue = 0;
	while( oElement != null ) {
		iReturnValue += oElement.offsetTop;
		oElement = oElement.offsetParent;
	}
    return iReturnValue;
}

Planning.Util.getXCords = function (oElement)
{
    var iReturnValue = 0;
    while( oElement != null ) {
        iReturnValue += oElement.offsetLeft;
        oElement = oElement.offsetParent;
    }
    return iReturnValue;
}

Planning.Util.getElementPosition = function(el)
{
    var _3e=null;
    var pos={x:0,y:0};
    var box;
    if(el.getBoundingClientRect)
    {
        box=el.getBoundingClientRect();
        var _41=document.documentElement.scrollTop||document.body.scrollTop;
        var _42=document.documentElement.scrollLeft||document.body.scrollLeft;
        pos.x=box.left+_42-2;
        pos.y=box.top+_41-2;
        return pos;
    } else {
        if(document.getBoxObjectFor){
            box=document.getBoxObjectFor(el);
            pos.x=box.x-2;
            pos.y=box.y-2;
        } else {
            pos.x=el.offsetLeft;
            pos.y=el.offsetTop;
            _3e=el.offsetParent;
            if(_3e!=el) {
               while(_3e){
                  pos.x+=_3e.offsetLeft;
                  pos.y+=_3e.offsetTop;
                  _3e=_3e.offsetParent;
               }
            }
        }
    }
	
	if(window.opera) {
	    _3e=el.offsetParent;
	    while(_3e&&_3e.tagName!="BODY"&&_3e.tagName!="HTML"){
	       pos.x-=_3e.scrollLeft;
	       pos.y-=_3e.scrollTop;
	       _3e=_3e.offsetParent;
	    }
	} else {
	    _3e=el.parentNode;
	    while(_3e&&_3e.tagName!="BODY"&&_3e.tagName!="HTML"){
	        pos.x-=_3e.scrollLeft;
	        pos.y-=_3e.scrollTop;
	        _3e=_3e.parentNode;
	    }
	}
	return pos;
}

Planning.Util.onEnterKeyDownSkipEvent = function (sender, event)
{
    if (event.keyCode == 13) {
        if(sender.onchange) {
            sender.onchange();
        }
        return false;
    }
}

Planning.Util.removeNewLines = function (sender, event)
{
	if (this.isEmptyString(sender.value))
	{
		return;
	}
	sender.value = sender.value.replace(/[\r\n\t]/g, " ");	                     	
}

Planning.Util.isIEBrowser = function()
{
	return /*@cc_on!@*/false;
}

Planning.Util.getIEVersion = function()
{
	var rv = -1; // Return value assumes failure.
	if (navigator.appName == 'Microsoft Internet Explorer')
	{
		var ua = navigator.userAgent;
		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
		rv = parseFloat( RegExp.$1 );
	}
	return rv;
}

Planning.Util.isChrome = function()
{
	return (navigator.userAgent.toLowerCase().indexOf('chrome') > -1);
}


Planning.Util.isMozilla = function()
{
	return (jQuery.browser.mozilla);
}

Planning.Util.isChromeClickOnce = function () {
    var userAgent = navigator.userAgent.toUpperCase();
    if (userAgent.indexOf('.NET CLR 3.5') >= 0) return true;
    if (window.clientInformation && window.clientInformation.plugins) {
        // check to see if a ClickOnce extension is installed.
        for (var i = 0; i < clientInformation.plugins.length; i++)
            if (clientInformation.plugins[i].name == 'ClickOnce plugin for Chrome') return true;
    }
    return false;
}

Planning.Util.isWebKit = function()
{
    return RegExp(" AppleWebKit/").test(navigator.userAgent);
} 

Planning.Util.checkIfClickOnceCapable = function (message)
{
    if (this.isClickOnceCapable()) {
        return true;
    }
    var message = "<ul><li>" + message + "</li>";
    message += "<li> <a href=\"https://chrome.google.com/webstore/detail/eeifaoomkminpbeebjdmdojbhmagnncl\">Google Chrome plugin</a></li>"; 
    message += "<li> <a href=\"https://addons.mozilla.org/en-US/firefox/addon/microsoft-net-framework-assist/\">Mozilla Firefox plugin</a></li></ul>";
    Parasoft.Dialog.alert(message);
    return false;
}

Planning.Util.isClickOnceCapable = function ()
{
    if (navigator.platform.indexOf("Win") == -1) {
        return false;
    }
    
    if (this.isIEBrowser()) {
        return true;
    }
    
    if (this.isChrome() && (this.isChromeClickOnce())) {
    	return true;
    }
    
    if (this.isMozilla()) {
        return true;
    }
    
    return false;
}

Planning.Util.replyToComment = function(currId, id, from) 
{
	var text_elem = document.getElementById(id);
	var text = text_elem.innerHTML;
	if (this.isEmptyString(text))
	{
		text = '';
	}
	while (text.indexOf('&gt;') >=0 ) {
		text = text.replace('&gt;', '>');	
	}
	while (text.indexOf('&lt;') >=0 ) {
		text = text.replace('&lt;', '<');	
	}
	
   	text = text.split('#new_line#');
   	
	var replytext = "";
	for (var i=0; i < text.length; i++) {
	    replytext += "> " + text[i] + "\n"; 
	}
	
	replytext = "(In reply to " + from + ")\n" + replytext + "\n";
		
	var textarea = document.getElementById(currId);
	textarea.value += replytext;
	
	textarea.focus();
	
}

Planning.Util.getComponent = function(clientId)
{
	if (clientId == null)
	{
		return null;
	}
	try {
		return eval(this.getComponentName(clientId));
	} catch (e) {
		return null;
	}
}

Planning.Util.getComponentName = function(clientId)
{
	if (clientId == null)
	{
		return null;
	}
	while (clientId.indexOf(":") > 0)
	{
		clientId = clientId.replace(":", "_");
	}

	return clientId;
}

Planning.Util.replaceAll = function (value, pattern, replace)
{
	if (value == null)
	{
		return null;
	}
	while (value.indexOf(pattern) > 0)
	{
		value = value.replace(pattern, replace);
	}

	return value;
	
}

Planning.Util.focusOnFirstInput = function() 
{		
	var contentBody = document.getElementById("contentBody");
	if (contentBody == null)
	{
		return;
	}
	var inputs = contentBody.getElementsByTagName('input');
	for (var i = 0; i < inputs.length; i++) {
		var input = inputs[i];
		if (input.type == "text") 
		{		
			if (!input.disabled) 
			{	
				try
				{
					input.focus();
					return;
				}
				catch(err)
				{
					//alert(err.description);
					continue;
				}				
			}
		}
	}
}

Planning.Util.attachEventToElement = function(element, eventType, eventListener) 
{
	if (element.addEventListener) {
		element.addEventListener(eventType, eventListener, false);
	} else if (element.attachEvent) {
		element.attachEvent("on" + eventType, eventListener);
	}
}

Planning.Util.detachEventFromElement = function(element, eventType, eventListener) 
{
	if (element.removeEventListener) {
		element.removeEventListener(eventType, eventListener, false);
	} else if (element.detachEvent) {
		element.detachEvent("on" + eventType, eventListener);
	}
}

Planning.Util.openUploadWindow = function (link, callBack, width, height)
{
	if (Planning.Util.isEmptyString(link)) {
		return;
	}
    
    var top = screen.top;
    var left = screen.left;
    
    if(screen.height > height) {
        top = (screen.height - height) / 2;
    } else {
        height = screen.height;   
    }
    
    if(screen.width > width) {
        left = (screen.width - width) / 2;
    } else {
        width = screen.width;
    }
    
    if (Planning.Util.isIEBrowser())
    {
        var option = "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width="+width+",height="+height+",copyhistory=no,left="+left+",top="+top;

        var modal = Planning.Util.queryUrl("modal", link);
        if (Planning.Util.isEmptyString(modal)) {
        	if (link.indexOf("?") > 0) {
        		link += "&modal=false";
        	} else {
        		link += "?modal=false";
        	}
        }
        
        var popup = window.open(link, "upload", option);
        var oncloseFuncRef = null;    	
        oncloseFuncRef = function() {     	
    		if(callBack != null) {
    	        callBack();
    		}
    		popup.close();
    	};    	
	    Planning.Util.attachEventToElement(popup, "unload", oncloseFuncRef);
    }
    else
    {
    	Planning.NonModalWindow.openWithSize(link, callBack, width, height);
    }
}

Planning.Util.modalWinOrDialogNoSize = function(url, callBackWin, dialogDivId, onLoadFnc, targetObj)
{
	if (window.showModalDialog) {
		Planning.ModalWindow.open(url, callBackWin);
	} else {
		Parasoft.Dialog.loadModalDialog(url, dialogDivId, onLoadFnc, targetObj);
	}
}

Planning.Util.modalWinOrDialog = function(url, callBackWin, dialogDivId, onLoadFnc, targetObj, width, height) 
{
	if (window.showModalDialog) {
		Planning.ModalWindow.openWithSize(url, callBackWin, width, height);
	} else {
		Parasoft.Dialog.loadModalDialogWithSiz(url, width, height, dialogDivId, onLoadFnc, targetObj);
	}
}

Planning.Util.isNumericKeyCodeEvent = function (sender, event)
{
	if (event == null) {
		return false;
	}
	var keyCode;
    if (Planning.Util.isIEBrowser()) {
        keyCode = event.keyCode;
    } else {
    	keyCode = event.which;
    }
    return Planning.Util.isNumericKeyCode(sender.value, keyCode);
}

Planning.Util.isNumericKeyCode = function (value, keyCode)
{
	var keyCodes = new Array(49,50,51,52,53,54,55,56,57,48,96,97,98,100,101,102,103,104,105,99, //numeric key codes
			8,9,13,16,17,20,27,32,33,34,35,36,37,38,39,40,45,46,144,145,19,110,190); // special key codes
	switch (keyCode)
	{
		case 110: //'.'
		case 190: //'.'
			if (value.indexOf('.') > 0) {
				return false;
			}
			if (value.length == 0) {
				return false;
			}			
			break;
	}
	for (var i = 0; i < keyCodes.length; i++)
	{
		if (keyCodes[i] == keyCode) {
			return true;
		}
	}
	return false;
}

Planning.Util.getUniqueId = function(clientId)
{
	if (Planning.Util.isEmptyString(clientId)) {
		return null;
	}
	var lastSepIdx = clientId.lastIndexOf(':');
	if (lastSepIdx != null)
	{
		return clientId.substr((lastSepIdx + 1));
	}
	return null;	
}

Planning.Util.containsNode = function (parentNode, node)
{
	if (parentNode == null || node == null) {
		return false;
	}
	if (parentNode.hasChildNodes()) {
		var children = parentNode.childNodes;
		for (var i = 0; i < children.length; i++) 
		{
			if (children[i].id == node.id) {
				return true;
			}
		}
	}
	return false;
}

Planning.Util.escapeHTML = function (text)
{
	text = text.replace(/&/g, "&amp;");
	text = text.replace(/>/g, "&gt;");
	text = text.replace(/</g, "&lt;");
	text = text.replace(/"/g, "&quot;");
	text = text.replace(/'/g, "&apos;");
	return text;
}

Planning.Util.escapeString = function (text)
{
	RegExp.escape = function(text) {
		if (!arguments.callee.sRE) {
			var specials = ['/', '.', '*', '+', '?', '|','(', ')', '[', ']', '{', '}', '\\', "\"", "\'"];
			arguments.callee.sRE = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
		}
		return text.replace(arguments.callee.sRE, '\\$1');
	};
	return RegExp.escape(text);
}

Planning.Util.clearInputText = function (element)
{
	if (element == null) {
		return;
	}
    element.value = "";
    element.focus();	
}

Planning.Util.onTagMouseOver = function(removeButton, spenElem)
{
    removeButton.style.visibility = "visible";
    spenElem.style.backgroundColor = "white";
    //spenElem.style.padding = "2px";
}          

Planning.Util.onTagMouseOut = function(removeButton, spenElem)
{
    removeButton.style.visibility = "hidden";
    spenElem.style.backgroundColor = "";
    //spenElem.style.padding = "";
}

Planning.Util.queryUrl = function(key, href) {
	if (this.isEmptyString(key)) {
		return "";
	}
	key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+key+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec(href);
	if(results == null ) {
	    return "";
	} else {
	    return results[1];	
	}
}

Planning.Util.changeUrlParamValue = function (url, key, value)
{
	if (url.indexOf(key + "=") < 0) {
		var sep = "&";
		if (url.indexOf("?") < 0) {
			sep = "?";
		}
		return url + sep + key + "=" + value;
	}	
	var re = new RegExp("(" + key + "=)[^\&]+", "ig");
	return url.replace(re, '$1' + value);
}

Planning.Util.getUrlPathName = function (url)
{
	if (Planning.Util.isEmptyString(url)) {
		return url;
	}
	if (url.indexOf("?") <= 0) {
		return url;
	}
	return url.split("?")[0];
}


Planning.Util.escapeId = function (clientId)
{
	return clientId.replace(/:/gi, "\\:");
}

Planning.Util.fitContentToTabSizeOnIE7 = function()
{
    if (!Planning.Util.isIEBrowser()) {
        return;
    }
    if (Planning.Util.getIEVersion() >= 8.0)
    {
        return;
    }
    
    var height = Planning.Util.getWindowHeight();

    height -= 115;//header
    height -= 80; //tab header
    //height -= 20; //footer  
    
    if (height < 0) {
    	return;
    }
    
    var elementCount = arguments.length;
    var element = null;
    for(var idx = 0; idx <= elementCount; idx++) {
    	element = arguments[idx];
    	if (element != null) {
    		element.style.height = height + "px";
    	}
    }
}

Planning.Util.buildJson = function(colName, value)
{
	if (Planning.Util.isEmptyString(colName)) {
		return null;
	}
	if (value == null) {
		return null;
	}
	
	while (colName.indexOf(" ") > 0)
	{
		colName = colName.replace(" ", "_");
	}
	
	var valueType = typeof(value);
	
	switch (valueType) {
		case "object":
		case "Object":
			//do nothing
			if (value.toJSONString) {
				value = value.toJSONString();
			}
			break;
		case "Number":
		case "number":
			//do nothing
			break;
		default:
			value = "\"" + Planning.Util.escapeString(value) + "\"";
			break;
	}
	
	return colName + ": " + value;	
}

Planning.Util.makeLinksOpenInBlankWindow = function(rootElement)
{
    var links = rootElement.getElementsByTagName("A");
    for (i = 0; i < links.length; i++)
    {
        if (!Planning.Util.isEmptyString(links[i].href)) {
            links[i].target = "_blank";                    
        }
    }
}

Planning.Util.getInputElement = function(control, type) {
    if (!control) {
        return;
    }
    var inputs = control.getElementsByTagName("input");
    if ((inputs == null) || (inputs.length == 0)) {
        return null;
    }
    var input = null;
    for (var i = 0; i < inputs.length; i++) {
        input = inputs[i];
        if (input.type.toLowerCase() == type) {
            return input;
        }
    }
}

Planning.Util.getCheckBoxElement = function(control) {
    return Planning.Util.getInputElement(control, "checkbox");
}

Planning.Util.getTextBoxElement = function(control) {
    return Planning.Util.getInputElement(control, "text");
}

Planning.Util.showMessage = function(imgElement)
{
	var labelElem = imgElement.parentNode.nextSibling;
	if (labelElem != null) {
		labelElem.style.display = 'inline';
	}
}

Planning.Util.hideMessage = function(imgElement)
{
	var labelElem = imgElement.parentNode.nextSibling;
	if (labelElem != null) {
		labelElem.style.display = '';
	}
}

Planning.Util.prepareMessages = function (messages)
{
    var isValid = true;
    var content = document.getElementById("content");
    if (content == null ) {
    	return;
    }
    var images = content.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++)
    {
        var image = images[i];
        if (image.src.indexOf("error.gif") > 0)
        {
        	image.onmouseover = function(){Planning.Util.showMessage(this);};
        	image.onmouseout = function(){Planning.Util.hideMessage(this);};
        	isValid = false;
        }       
    }
    if (!isValid) {
    	if (messages && messages.invalid) {
    		setStatusError(messages.invalid);
    	} else {
    		setStatusError("Some of the fields contain incorrect value. Please review the validation errors below and try again.");
    	}
    }
}

Planning.Util.initToolTipsForSelector = function(selector)
{
	var tip = new Parasoft.Tip({placeHolderSelector: "#page", targetElementSelector: selector, dataRetriever: Planning.Util.retrieveDataToolTips,  data: {renderFunction: Planning.Util.renderToolTips, value: "title"}});
	tip.init();
}

Planning.Util.initToolTipsWithClassForSelector = function(selector, className)
{
	var tip = new Parasoft.Tip({placeHolderSelector: "#page", targetElementSelector: selector, dataRetriever: Planning.Util.retrieveDataToolTips,  data: {renderFunction: Planning.Util.renderToolTips, value: "title"}, addClass: className});
	tip.init();
}

Planning.Util.initToolTips = function()
{
	//var d1 = new Date();
	Planning.Util.initToolTipsWithClassForSelector("label[title]", "tooltip");
	Planning.Util.initToolTipsWithClassForSelector("div.label[title]", "tooltip");
	Planning.Util.initToolTipsForSelector("[title]");
    //var d2 = new Date();
    //console.log("Planning.Util.initToolTips: " + (d2.getTime() - d1.getTime()));
}

Planning.Util.retrieveDataToolTips = function(sender, value) {
	var attrValue = jQuery(sender).attr(value);
	jQuery(sender).removeAttr(value);
	return attrValue;
}

Planning.Util.ToolTipServletGetFromCache = function (key) {
	if (window['_gCache'] != undefined) {
		return _gCache.get(key);
	}
}
	
Planning.Util.ToolTipServletPutToCache = function (key, value) {
	if (window['_gCache'] == undefined) {
		_gCache = new Hashtable();
	}
	if (_gCache.contains(key)) {
		_gCache.remove(key);
	}
	_gCache.put(key, value);
}

Planning.Util.renderToolTips = function(sender, attrValue, callback) {
	 
	var res = null;
    try {
    	res = eval("(" + attrValue + ")");
    } catch(e) {
        //this is string
    	callback(attrValue);
	    return;
    }	
	
	if (!res.id || Planning.Util.isEmptyString(res.type)) {
    	callback(null);
	    return;
	}
	
	if (res.id == '-1') {
		return;
	}
	
	var value = Planning.Util.ToolTipServletGetFromCache(res.type + res.id);
	
	if (value != null) {
		callback(value);
		return;
	}
	var url = "id=" + res.id + "&" + "type=" + res.type;
	if (res.params) {
		url += "&" + res.params;
	}

	jQuery.getJSON("/grs/Tip", url,
		function(array)
		{
			if (Planning.Util.isEmptyArray(array)) {
				callback(null);
			    return;
			} 

	        var content = "";
	        var entry = null;
	        for (var i = 0; i < array.length; i++) {
	        	entry = array[i];
	        	content += "<div style=\"font-weight: bold;\"><em style=\"font-weight: normal; margin-right: 2px;\">" + entry.name + ":</em> ";
				switch (entry.type) {
					case "link":
						content += "<a href=\"" + entry.value + "\">" + entry.label + "</a>"; 
						break;
					case "string":
						content += entry.value; 
						break;							
				}	
				content += "</div>";
	        }
	        if (Planning.Util.isEmptyString(content)) {
	        	callback(null);
			    return;
			} 
			callback(content);
			Planning.Util.ToolTipServletPutToCache(res.type+res.id, content);
		}
	);	
	
}


Planning.Util.initSourceDialog = function()
{
	var tip = new Parasoft.Tip(
			{
				placeHolderSelector: ".noMargin", 
				targetElementSelector: ".diffDlgLink", 
				data: {renderFunction: Planning.Util.renderSourceDialog, value: null}, 
				showTrigger : 'click'});
	tip.init();
}

Planning.Util.renderSourceDialog = function(sender, attrValue, callback) {
	 var jsender = jQuery(sender);
	 var sibl = jsender.siblings(".diffDlgLinkData");
	var jsonData = sibl.val();
	var res = null;
    try {
    	res = eval('(' + jsonData + ')');
    } catch(e) {
        //this is string
    	callback(null);
	    return;
    }	
	
    var revisions = res.revisionsList;
	
	var result = new Array();
		
	var html = '<div class="revisionsList"><div class="caption">Compare ' + res.currRev + ' with:</div><ul>';
	
	var prevText = "";
	var baseText = "";
		
	for ( var rev in revisions) {
		if (revisions[rev] != null && revisions[rev] != res.currRev) {
			var url = 'show_source.jsp?sourceFilePath=' + decodeURI(res.fullName) 
	       	+ '&revision=' + res.currRev
	       	+ '&previousRevision=' + revisions[rev] 
	       	+ '&repositoryId=' + res.repoId
	      	+ '&lineNumber=-1';
			
			if (revisions[rev] == res.prevRev) {
				prevText = " (previous)";
			} else {
				prevText = "";
			}
			
			if (rev == revisions.length-1) {
				baseText = " (base)";
			} else {
				baseText = "";
			}
			
			
			html += '<li><a href="javascript:show_source(\'' + url + '\');">' +
			revisions[rev] + 
			prevText + 
			baseText + 
			'</a></li>';
		}
	}
	
	html += '</ul></div>';
	callback(html);
}


Planning.Util.showToolbox = function (id)
{
	var body = document.getElementById("content");
	if (body != null) {
	    body.onclick = function(){Planning.Util.hideToolbox(id);};
	}            	
    jQuery(function($) {
    	var toolboxes = $(":visible[class*='tool-box-item']");
    	if (toolboxes) {
	    	for (var i = 0; i < toolboxes.length; i++ ) {
	    		Planning.Util.hideToolbox(toolboxes[i].id);
	    	}
    	}
        var options = {};
        $("#" + id).show("slide",options,300,null);              
    });
}

Planning.Util.hideToolbox = function (id)
{
    jQuery(function($) {
        var options = {};
        $("#" + id).hide("slide",options,300,null);              
    }); 
    var body = document.getElementById("content");
    if (body != null) {
        body.onclick = "";
    }  
}

Planning.Util.initializeDropDownWithEvents = function (buttonQuery, dropDownQuery, stopPropagation, clickAreaSelector, events)
{
	var onShowEvent = null;
	var onHideEvent = null;
	if (events != null) {
		onShowEvent = events.onshow;
		onHideEvent = events.onhide;
	}
	jQuery(dropDownQuery).bind("onshow", function() {
        if (onShowEvent != null) {
        	onShowEvent();
        }
	});
	jQuery(dropDownQuery).bind("onhide", function() {
        if (onHideEvent != null) {
        	onHideEvent();
        }
	});
	
	jQuery(buttonQuery).bind("click", function() {
        if(jQuery(dropDownQuery + ":hidden").length == 1) {
        	Planning.Util.hideDropDowns();
        	Planning.Util.showDropDown(dropDownQuery);
        } else {
            jQuery(dropDownQuery).css("display", "none");
            Planning.Util.hideDropDown(dropDownQuery);
        }
        return false;
    });
	if (Planning.Util.isEmptyString(clickAreaSelector)) {
	    jQuery(dropDownQuery).bind("mouseleave", function() {
	    	Planning.Util.hideDropDown(dropDownQuery);
	    });
	} else {
	    jQuery(clickAreaSelector).bind("click", function() {
	    	Planning.Util.hideDropDown(dropDownQuery);
	    });		
	}
    jQuery().bind("click", function(event) {
        if(jQuery(dropDownQuery + ":hidden").length == 0) {
        	Planning.Util.hideDropDown(dropDownQuery);
        }
    });
    if (stopPropagation) {
	    jQuery(dropDownQuery).bind("click", function(event) {
	        event.stopPropagation();
	    });
    }
}

Planning.Util.initializeDropDownWithCloseEvent = function (buttonQuery, dropDownQuery, stopPropagation, clickAreaSelector)
{
	Planning.Util.initializeDropDownWithEvents(buttonQuery, dropDownQuery, stopPropagation, clickAreaSelector, null);
}

Planning.Util.initializeDropDown = function (buttonQuery, dropDownQuery, stopPropagation)
{
	Planning.Util.initializeDropDownWithCloseEvent(buttonQuery, dropDownQuery, stopPropagation, null);
}

Planning.Util.hideDropDowns = function ()
{	
	jQuery(".dropDown:visible").each(function(index) {
		Planning.Util.hideDropDown(jQuery(this));
	});	
}

Planning.Util.hideDropDown = function (selector)
{
	jQuery(selector).css("display", "none");
	jQuery(selector).trigger("onhide");
}

Planning.Util.showDropDown = function (selector)
{
	jQuery(selector).css("display", "block");
	jQuery(selector).trigger("onshow");
}

Planning.Util.expand = function(selector, callback)
{
	jQuery(selector).show("blind", null, 100, callback);
	jQuery(selector)[0].style.visibility = "";
}  

Planning.Util.collapse = function(selector, callback)
{
	jQuery(selector).hide("blind", null, 100, callback);
}

Planning.Util.expandSec = function(secSelector)
{
	var collapseBtn = jQuery(secSelector).find(".collapse");
	var expandBtn = jQuery(secSelector).find(".expand");
	
	var collapsed = collapseBtn.hasClass("hidden");
	var secBody = jQuery(secSelector).parent().find(".secBody");
	
	if (collapsed) {
		this.expand(secBody, null);
		collapseBtn.removeClass("hidden");
		expandBtn.addClass("hidden");
	} else {
		//make sure btns set up correctly
		expandBtn.addClass("hidden");
		collapseBtn.removeClass("hidden");
	}
}

Planning.Util.collapseSec = function(secSelector)
{
	var collapseBtn = jQuery(secSelector).find(".collapse");
	var expandBtn = jQuery(secSelector).find(".expand");
	
	var collapsed = collapseBtn.hasClass("hidden");
	var secBody = jQuery(secSelector).parent().find(".secBody");
	
	if (!collapsed) {
		this.collapse(secBody, null);
		collapseBtn.addClass("hidden");
		expandBtn.removeClass("hidden");
	} else {
		//make sure btns set up correctly
		collapseBtn.addClass("hidden");
		expandBtn.removeClass("hidden");
	}
}

Planning.Util.toogleSec = function(secSelector)
{
	var collapseBtn = jQuery(secSelector).find(".collapse");
	var expandBtn = jQuery(secSelector).find(".expand");
	
	var collapsed = collapseBtn.hasClass("hidden");
	var sec = jQuery(secSelector).parent();
	var secBody = sec.find(".secBody");
	var cookieKey = sec.attr("id") + location.pathname;	
	var cookieVal = null;
	
	if (collapsed) {
		this.expand(secBody, null);
		collapseBtn.removeClass("hidden");
		expandBtn.addClass("hidden");
		cookieVal = true;
	} else {
		this.collapse(secBody, null);
		collapseBtn.addClass("hidden");
		expandBtn.removeClass("hidden");
		cookieVal = false;
	}
	delCookie(cookieKey);
	setCookie(cookieKey, cookieVal, 365);
}

Planning.Util.initSectionAction = function(options) {
	jQuery(options.selector).each(function (k, value) {
		
		if (!Planning.Util.isEmptyArray(jQuery(value).find("a.collapse"))) {
			Planning.Util.initSectionToogle(value, options);
		}
		jQuery(value).addClass("visibleImp");	    
	});	
}

Planning.Util.initSectionToogle = function(value, options) {
    var collapseBtn = jQuery(value).find("a.collapse");
    var expandBtn = jQuery(value).find("a.expand");
    var sec = jQuery(value).parent();
    
    var cookieKey = sec.attr("id") + location.pathname;
    var cookieValue = getCookie(cookieKey);
    if (cookieValue && cookieValue == "false") {
    	Planning.Util.collapseSec(jQuery(value));
    } else {
    	Planning.Util.expandSec(jQuery(value));    	
    }
    
    collapseBtn.attr("title", options.collapseTitle);
    expandBtn.attr("title", options.expandTitle);	    	    
    
    collapseBtn.bind("click", null, function() {
        Planning.Util.toogleSec(jQuery(value));              
    });
    collapseBtn.bind("mouseover", null, function() {
    	sec.addClass("secHover");           
    });
    collapseBtn.bind("mouseout", null, function() {
    	sec.removeClass("secHover");           
    });
    
    expandBtn.bind("click", null, function() {
    	Planning.Util.toogleSec(jQuery(value));               
    });		
    expandBtn.bind("mouseover", null, function() {
    	sec.addClass("secHover");           
    });
    expandBtn.bind("mouseout", null, function() {
    	sec.removeClass("secHover");           
    });
}

Planning.Util.mailTo = function(aElem, query, subject) {
	var url = Planning.Util.stringFormat("{0}//{1}{2}?{3}", location.protocol, location.host, location.pathname, query);
	var href = Planning.Util.stringFormat("mailto:?Subject=DTP Link: {0}&Body={1}", escape(subject), escape(url));
	aElem.href = href;
}

Planning.Util.addPaddingToContentArea = function()
{
	var docPanel = jQuery(".dockPanel");
	if (docPanel.length == 0) {
		return;
	}
	docPanel.each(function(index){
		var ph = jQuery("<div></div>").addClass("dockPanelPlaceHolder");
		ph[0].style.height = jQuery(this).outerHeight() + "px";
		jQuery(this).parent().append(ph);
	});
}

Planning.Util.initIframes = function() {
    jQuery("iframe.content").each(function(index){
    	var frame = jQuery(this);
        var y = frame.offset().top;
        var x = frame.offset().left + (frame.outerWidth()/2) - 100;
        
        var div = jQuery("<div></div>").addClass("iframe-loader");
      
        div.attr("style","top:40%; left:50%; margin-left: -107px;");
        var img = jQuery("<img></img>");
        img.attr("src", "/grs/images/planning/ajax-loader.gif");

        img.appendTo(div);                        
        div.appendTo(frame.parent());
                                
        frame.load(function(){
            var url = frame[0].contentWindow.location;
            if (!url) {
                return;
            }
            if (url.href.indexOf('about:') < 0) {
            	div.hide();
            }        	
        });
    });	
}

Planning.Util.isFormModified = function(frm)
{
	return this.anyElemenyModified(frm.elements);
}

Planning.Util.anyElemenyModified = function(elementArray)
{
	var fld = null;
	for (i = 0; i < elementArray.length; i++) {
	    fld = elementArray[i];
	    if ((fld.type == "text") ||
	    	(fld.type == "textarea") ||
	        (fld.type == "file"))
	    {
	    	if (fld.value != fld.defaultValue) {
	        	return true;
	        }
	    } else if (fld.type == "checkbox") {
	    	if (fld.checked != fld.defaultChecked) {
	        	return true;
	        }
	    } else if (fld.type == "select-one") {
	    	for (j = 0; j < fld.options.length; j++) {
	    		var fldOption = fld.options[j];
	    		if (fldOption.defaultSelected) {
	    			if (fldOption.value != fld.value) {
	    				return true;
	    			}
	    		}
	    	}
	    }
    }
    return false;
}

Planning.Util.warnIfNoTransitionAvailable = function(transition)
{
	var msg = transition.message;
	var elementArray = transition.array;
	for (i = 0; i < elementArray.length; i++) {
	    fld = elementArray[i];
	    if (fld.type == "select-one") {
	    	if (Planning.Util.isEmptyArray(fld.options)) {
	    		setStatusError(msg);
	    		break;
	    	}
	    }
    }
}

Planning.Util.isElementModified = function(elem)
{
	var elementArray = new Array();
	elementArray.push(elem);
	return this.anyElemenyModified(elementArray);
}

Planning.Util.doubleConfirmation = function(firstConfirm, secondConfirm)
{
	//use with if(! ){return false}
	if(!confirm(firstConfirm)) { 
    	return false;
    }else if(!confirm(secondConfirm)) { 
        return false;
    }
    return true;
}

Planning.Util.confirmUnsaved = function(event,inPageChange)
{
	var msg = "Unsaved changes will be lost.  Are you sure you want to continue?";
	// The 'event' object will be non-null when called from an unload event, but this
	// is only the case in FF.
	if ((typeof inPageChange === 'undefined' || !inPageChange)) {
		// This brings up a special dialog, to confirm navigating away from the page
		return msg;
	}
	return confirm(msg);
}

Planning.Util.setPageDirtyIndicator = function(isDirty)
{
	var title = document.title;
	if (isDirty) {
		if (title.charAt(0) != '*') {
			document.title = '*' + title;
			window.onbeforeunload = this.confirmUnsaved;
		}
	}
	else {
		if (title.charAt(0) == '*') {
			document.title = title.substring(1);
			window.onbeforeunload = null;
		}
	}
}

Planning.Util.calculatePosition = function(element, jqTarget, position, recursionLevel) {
	var y = jqTarget.offset().top;
	var x = jqTarget.offset().left;
			
	var elementWidth = jQuery(element).outerWidth();
	var elementHeight = jQuery(element).outerHeight();
	
	switch (position) {
		case Planning.Util.Position.BottomRight:
			y += jqTarget.outerHeight();
			x += jqTarget.outerWidth();
			break;
		case Planning.Util.Position.Bottom:
			y += jqTarget.outerHeight();
			x += (jqTarget.outerWidth()/2);
			break;	
		case Planning.Util.Position.BottomLeft:
			y += jqTarget.outerHeight();
			x -= elementWidth;
			break;	
		case Planning.Util.Position.TopRight:
			x += jqTarget.outerWidth();
			y -= elementHeight;
			break;
		case Planning.Util.Position.Top:
			x += (jqTarget.outerWidth()/2);
			y -= elementHeight;
			break;	
		case Planning.Util.Position.TopLeft:
			y -= elementHeight;
			x -= elementWidth;
			//do nothing
			break;					
		default:
			
			break;
	}

	var tipXEdge = (x + elementWidth);
	var tipYEdge = (y + elementHeight);
	if ((!this.isOutsideViewPort(tipXEdge, "X") && 
		!this.isOutsideViewPort(tipYEdge, "Y")) || (recursionLevel > 3)) 
	{			
		element.style.top = y + "px";
		element.style.left = x + "px";
	} else if (this.isOutsideViewPort(tipXEdge, "X") && this.isOutsideViewPort(tipYEdge, "Y")) {
		this.calculatePosition(element, jqTarget, Planning.Util.Position.TopLeft, ++recursionLevel);
	} else if (!this.isOutsideViewPort(tipXEdge, "X") && this.isOutsideViewPort(tipYEdge, "Y")) {
		this.calculatePosition(element, jqTarget, Planning.Util.Position.TopRight, ++recursionLevel);
	} else if (this.isOutsideViewPort(tipXEdge, "X") && !this.isOutsideViewPort(tipYEdge, "Y")) {
		this.calculatePosition(element, jqTarget, Planning.Util.Position.BottomLeft, ++recursionLevel);
	}	
}

Planning.Util.isOutsideViewPort = function(value, cords) {
	switch (cords) {
		case "X":
			return (value > Planning.Util.getWindowWidth());
		case "Y":
			return (value > Planning.Util.getWindowHeight());
		default:
			break;
	}
	return false;
}

Planning.Util.disableBtn = function(btn) 
{
	if (btn != null) {
	    btn.disabled = true;
	    btn.className += "-disabled";
	}
}

Planning.Util.enableBtn = function(btn) 
{
	if (btn != null) {
	    btn.disabled = false;
	    btn.className = "button";
	}
}

Planning.Util.applyChangedTableFilter = function(value, callback)
{
	if (!value) {
		//close window pressed do nothing
		return;
	}
	callback(value);
}

Planning.Util.evalJson = function (data) {
    var json = null;
    try {
        json = eval("(" + data + ")");
    } catch (e) {
        //nothing
    }
    return json;
}

/**
 * This is fix for @task 43180
 */
Planning.Util.tryInnerHTML = function(selector, content)
{
    if (Planning.Util.isEmptyString(content)) {
        return;
    }
    var element = jQuery(selector)[0];
	try {
		element.innerHTML = content;
	} catch (err) {

	}                          
} 

Planning.Util.tryInnerHTMLIncludingEmptyContent = function(selector, content)
{
    var element = jQuery(selector)[0];
    try {
        element.innerHTML = content;
    } catch (err) {

    }                          
}

Planning.Util.fadeTo = function (selector, wrappedFunction) {
    jQuery(selector).fadeTo('fast', 0.5, function() {
    	if (wrappedFunction != null) {
    		wrappedFunction();
    	}    	
    });	
}

Planning.Util.autosize = function (selector) {
		
		jQuery(selector).each(function(){
			jQuery(this).keydown(
					function(e)
					{
						jQuery(this).css('overflow', 'hidden');
					}
			);
		});
	
	   jQuery(selector).keyup(function(e) {
		   if (jQuery(this).innerHeight() < this.scrollHeight) {
	        	jQuery(this).height(this.scrollHeight).css('overflow', 'auto');
	        };
	    });	
	    
	    jQuery(selector).focus(function(e) {
	    	jQuery(this).css('overflow', 'hidden');
	    	if(jQuery(this).innerHeight() < this.scrollHeight) {
	        	jQuery(this).height(this.scrollHeight);
	        };
	        jQuery(this).css('overflow', 'auto');
	    });    
}

Planning.Util.stringifyArray = function (array) {
	var arrayToString = new Array();
	for (var i = 0; i < array.length; i++) {
		arrayToString.push(JSON.stringify(array[i]));
	}
	return "[" + Planning.Util.toCSV(arrayToString) + "]";
};

Planning.Util.getFlowAnalysisImage = function (faType) {
    var _THROWING_CHAR = 'E';
    var _IMPORTANT_CHAR = '!';
    var _NORMAL_CHAR = 'N';
    
    var _CAUSE_CHAR = 'C';
    var _POINT_CHAR = 'P';
    var _RULE_CHAR = 'I';
    var _POINT_CAUSE = 'B';
    
    var _PATH_EXCEPTION_IMG = "path_exception";
    var _PATH_NORMAL_IMG = "path_normal";
    var _PATH_NOT_IMPORTANT_IMG = "path_not_important";
    var _VIOLATION_CAUSE_IMG = "violation_cause";
    var _VIOLATION_POINT_IMG = "violation_point";
    var _VIOLATION_RULE_IMG = "violation_rule";
    
    var result = Array();
    //based on com.parasoft.xtest.flowanalysis.checker.ui.FlowPathNodeSubTreeVisualizator#getImageID
    if ((faType.length == 0) || (faType == '.')) {
        result.push(_PATH_NOT_IMPORTANT_IMG);
    } else if (faType.indexOf(_THROWING_CHAR) >= 0) {
        result.push(_PATH_EXCEPTION_IMG);
    } else if ((faType.indexOf(_IMPORTANT_CHAR) >= 0) || (faType.indexOf(_NORMAL_CHAR) < 0)) {
        result.push(_PATH_NORMAL_IMG);
    } else {
        result.push(_PATH_NOT_IMPORTANT_IMG);
    }
    //based on com.parasoft.xtest.flowanalysis.checker.ui.FlowPathNode#getDecoratorUrls
    if (faType.indexOf(_CAUSE_CHAR) > 0) {
        result.push(_VIOLATION_CAUSE_IMG);
    } else if (faType.indexOf(_POINT_CHAR) > 0) {
        result.push(_VIOLATION_POINT_IMG);
    } else if (faType.indexOf(_RULE_CHAR) > 0) {
        result.push(_VIOLATION_RULE_IMG);
    } else if (faType.indexOf(_POINT_CAUSE) > 0) {
        result.push(_VIOLATION_CAUSE_IMG);
        result.push(_VIOLATION_POINT_IMG);
    }
    return result;
};

Planning.Util.max = function (v1, v2) {
    if (v1 == null) {
            return v2;
    }
    if (v2 == null) {
            return v1;
    }        
    if (v1 > v2) {
            return v1;
    }
    return v2;
};

Planning.Util.min = function (v1, v2) {
    if (v1 == null) {
            return v2;
    }
    if (v2 == null) {
            return v1;
    }        
    if (v1 < v2) {
            return v1;
    }
    return v2;
};

Planning.Util.getFileName = function(path) {
    if (Planning.Util.isEmptyString(path)) {
        return path;
    }
    //try with '/'
    if (path.indexOf('/') >= 0) {
        return path.substring(path.lastIndexOf('/') + 1);
    }
    //try with '\'
    if (path.indexOf('\\') >= 0) {
        return path.substring(path.lastIndexOf('\\') + 1);
    }           
    //otherwise return path     
    return path;
};
