function replaceImage(imageElem, url)
{	
	imageElem.src = url;
}

function showHideDivChildren(elemName, tagName, imgElementId, imageShow, imageHide, showTitle, hideTitle) {
	var element = getByName(elemName, tagName);
    if (element.hasChildNodes) {
    	var children = element.childNodes;
        for(var c=0; c < children.length; c++) {
        	if (children[c].nodeType == 1 && children[c].nodeName == tagName) {
            	if (getStyle(children[c], 'display') == 'none') {
      				state = 'block';
       				src = imageHide;
       				title=hideTitle;
       			} else {
       				state = 'none';
       				src = imageShow;
       				title=showTitle;
       			}
       			children[c].style.display = state;
       			imgElementId.src = src;
       			imgElementId.title = title;
       			
            }
        }
    }
}

function showHideElement(divName, tagName, textElementId, showText, hideText, display) 
{
	var element = getByName(divName, tagName);
	var browser=navigator.appName;
	//this is because IE supports only following types of display:
	// Major:
	// - block
	// - inline
	// Minor:
	// - inline-block
	// - list-item
	// - table-header-group
	// - table-footer-group 
	if ((browser!="Netscape") && 
		((display!="block") && (display!="inline"))
		) 
	{
		display = 'block';	
	}	
	
    if (element.nodeType == 1 && element.nodeName == tagName) {		
    	if (getStyle(element, 'display') == 'none') {
      		state = display;
       		text = hideText;
       	} else {
       		state = 'none';
       		text = showText;
       	}
       	element.style.display = state;
       			
       	textElementId.innerHTML = text;
    }
}

function showHideElement(divName, tagName, textElementId, showText, hideText)
{
	showHideElement(divName, tagName, textElementId, showText, hideText, 'block');
}

function showHideElementToogleImage(divName, tagName, imageElem, imageShow, imageHide, display) 
{
	showHideElementToogleImage(divName, tagName, imageElem, imageShow, imageHide, display, true); 
}

function showHideElementToogleImage(divName, tagName, imageElem, imageShow, imageHide, display, setDefTitle) 
{
	var browser=navigator.appName;
	//this is because IE supports only following types of display:
	// Major:
	// - block
	// - inline
	// Minor:
	// - inline-block
	// - list-item
	// - table-header-group
	// - table-footer-group 
	if ((browser!="Netscape") && 
		((display!="block") || (display!="inline"))
		) 
	{
		display = 'block';	
	}
	var element = getByName(divName, tagName);
    if (element.nodeType == 1 && element.nodeName == tagName) {
    	if (getStyle(element, 'display') == 'none') {
      		state = display;
       		src = imageHide;
       		title = "Collapse";
       	} else {
       		state = 'none';
       		src = imageShow;
       		title = "Expand";
       	}
       	element.style.display = state;       			
       	imageElem.src = src;
       	if (setDefTitle)
       	{
       		imageElem.title = title;
       	}
    }
}
    
function showHide(status, tagName, textElementId, showText, hideText) {
	var elements = document.getElementsByTagName(tagName);
    for (i=0; i < elements.length; i++) {
    	var name = elements.item(i).getAttribute('name');
        if (name != null) {
        	if (name.search(/status_0/i) != -1) {
      			if (getStyle(elements.item(i), 'display') == 'none') {
      				state = 'block';
       				text = hideText;
       			} else {
       				state = 'none';
       				text = showText;
       				
       			}
       			elements.item(i).style.display = state;
       			
       			document.getElementById(textElementId).innerHTML = text;
           	}
        }
    }
}
     
function getByName(name, tagName) {
	var elements = document.getElementsByTagName(tagName);
    for (i=0; i < elements.length; i++) {
    	if (elements.item(i).getAttribute( 'name' ) == name ) {
        	return elements.item(i);
        }
    }
}

function getStyle(el,styleProp)
{
	if (el.currentStyle)
		var y = el.currentStyle[styleProp];
	else if (window.getComputedStyle)
		var y = document.defaultView.getComputedStyle(el,null).getPropertyValue(styleProp);
	return y;
}

function getXmlHttp()
{
  var xmlHttp;
  try {
    // Firefox, Opera 8.0+, Safari
    xmlHttp=new XMLHttpRequest();
  } catch (e) {
   	// Internet Explorer
   	try {
  	  xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        alert("Your browser does not support AJAX!");
        return false;
      }
    }
  }
  return xmlHttp;
}

function getY(oElement)
{
 var iReturnValue = 0;
 while( oElement != null ) {
  iReturnValue += oElement.offsetTop;
  oElement = oElement.offsetParent;
 }
 return iReturnValue;
}
function getX(oElement)
{
 var iReturnValue = 0;
 while( oElement != null ) {
  iReturnValue += oElement.offsetLeft;
  oElement = oElement.offsetParent;
 }
 return iReturnValue;
}