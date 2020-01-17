function ListMenu(menuId)
{

	var _menuId = menuId;
	var _elements_to_hide_map = null;
	var _elements = null;
	/** this detects ie 6 navigator **/
	/** see http://www.thefutureoftheweb.com/blog/detect-ie6-in-javascript  for details **/
	var _isIE6 = false /*@cc_on || @_jscript_version < 5.7 @*/;
	var _beforeShowEvents = new Array();
	var _beforeHideEvents = new Array();
	
	this.hover = function() 
	{
		if (_isIE6) {
			//clear map
			_elements_to_hide_map = new Hashtable();			
		}
		
		var menuElement = document.getElementById(_menuId);
		if (menuElement == null) {
			return;
		}			
		var sfEls = menuElement.getElementsByTagName("LI");
				
		for (var i=0; i<sfEls.length; i++) {
		
			var li = sfEls[i];		
	
			if (_isIE6 && 
				(_elements != null)) {
				putRelatedElementToMap(li, _elements);
			}
			li.onmouseover=function() {
				if (_isIE6) {					
					hide(this.id);
				}
				
				for (var j = 0; j < _beforeShowEvents.length; j++)
				{
					eval(_beforeShowEvents[j]);
				}
				
				this.className+=" liHover";

			}
			li.onmouseout=function() {
				if (_isIE6) {
					show(this.id);
				}		
				for (var j = 0; j < _beforeHideEvents.length; j++)
				{
					eval(_beforeHideEvents[j]);
				}
				this.className=this.className.replace(new RegExp(" liHover\\b"), "");		
					
			}
		}
	}
	
	this.onBeforeShowEvent = function (funcName)
	{
		_beforeShowEvents[_beforeShowEvents.length] = funcName;
	}
	
	this.onBeforeHideEvent = function (funcName)
	{
		_beforeHideEvents[_beforeHideEvents.length] = funcName;
	}
	
	this.elementsToHide = function (elements)
	{
		_elements = elements; 	
	}
	
	this.isIE6 = function()
	{
		return _isIE6;
	}
	
	function putRelatedElementToMap(li, elements)
	{	
		for (var i = 0; i < elements.length; i++)
		{
			if (isAbove(li, elements[i]))
			{
				_elements_to_hide_map.put(li.id, elements[i].id);
			}	
		}
	}
	
	function isAbove(value1, value2)
	{
		var res = false;
		var value1Y= getY(value1);
		var value1X = getX(value1);
		var value1Y1 = value1Y + 100;
		//the right border: 180 - this value because the width of menu item == 180px;
		var value1X1 = value1X + 180;		       
		
		res = isBetween(value1X, value1X1, getX(value2));
		if (!res) {
			//check also with elem offsetWidth
			res = isBetween(value1X, value1X1, (getX(value2) + value2.offsetWidth));
		}
		res = (res && isBetween(value1Y, value1Y1, getY(value2)));
	
		return res;			 
	} 
	
	function isBetween(borderDown, borderUp, value)
	{
		if ((value >= borderDown) && (value <= borderUp))
		{
			return true;
		}
		return false;
	}
	
	function show(id)
	{
		var elementsIdToShow = _elements_to_hide_map.getAll(id);
		for (var i = 0; i < elementsIdToShow.length; i++)
		{
			var elem = document.getElementById(elementsIdToShow[i]);
			if (elem != null) {
				elem.parentNode.style.width = "";
				elem.style.display = "inline";
			}
			
		}	
	}
	
	function hide(id)
	{
		var elementsIdToHide = _elements_to_hide_map.getAll(id);
		for (var i = 0; i < elementsIdToHide.length; i++)
		{
			var elem = document.getElementById(elementsIdToHide[i]);
			if (elem != null) {
				var origWidth = elem.parentNode.offsetWidth;						 
				elem.style.display = "none";
				elem.parentNode.style.width = origWidth;
			}
			 		
		}			
	}

}

var listmenu = new ListMenu("menu");
if (window.attachEvent) window.attachEvent("onload", listmenu.hover);

var headMenu = new ListMenu("head-menu");
if (window.attachEvent) window.attachEvent("onload", headMenu.hover);