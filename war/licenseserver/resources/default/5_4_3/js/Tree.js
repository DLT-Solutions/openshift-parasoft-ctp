if (!window.Planning) {
    window.Planning = {};
}

if (!Planning.Tree) {
    Planning.Tree = {};
}

Planning.Tree.getComponentObject = function(clientId)
{
	var elem = document.getElementById(clientId);
	if (elem == null) {
		return null;
	}
	if (elem.component) {
		return elem.component;
	}
	return null;
}

Planning.Tree.expandCollapseAll = function(statusElement, treeComponent)
{
	if (treeComponent == null) {
		return;
	}
    var status = (statusElement.value == "true") ? true : false;
    var childs =  treeComponent.childs;   
    for (var i=0; i<childs.length; i++)
    {
        var childNodeElement = document.getElementById(childs[i].id);           
        Planning.Tree.toogleExpandRecursive(childNodeElement, status);
    }
    statusElement.value = !status;      
}

Planning.Tree.expandAll = function(treeComponent)
{
	if (treeComponent == null) {
		return;
	}
    var childs =  treeComponent.childs;   
    for (var i=0; i<childs.length; i++)
    {
        var childNodeElement = document.getElementById(childs[i].id);           
        this.expandRecursive(childNodeElement);
    }
}

Planning.Tree.expandRecursive = function (nodeElement)
{
    var nodeObject = nodeElement.object;
    var childs = nodeObject.childs;
    //at firs toogle children 
    for (var i=0; i<childs.length; i++)
    {
        var childNodeElement = document.getElementById(childs[i].id);
        if (!childs[i].hasChilds())
        {
            continue;
        }           
        this.expandRecursive(childNodeElement);        
    }
    
    if (nodeObject.isCollapsed())
    {
        nodeObject.expand();     
    }                              
    
}

Planning.Tree.getSelectedItemIds = function (nodeElement, type)
{
	var res = new Array(); 
    var nodeObject = nodeElement.object;
    var childs = nodeObject.childs;
    for (var i=0; i<childs.length; i++)
    {
        var childNodeElement = document.getElementById(childs[i].id);
        var objectType = childNodeElement.object.getContentType();
        if (!childs[i].hasChilds() && (objectType == type || objectType == ''))
        {
        	var checkBoxElement = this.findInElement(childNodeElement, "input", "checkbox");
        	if (checkBoxElement == null) {
        		continue;
        	}
        	var selected = checkBoxElement.checked;
        	if (selected) {
        		var value = this.findInElement(childNodeElement, "input", "text").value;
        		if (!isNaN(value)) {
        			res[res.length] = value;
        		}
        	}
            continue;
        }           
        var childRes = this.getSelectedItemIds(childNodeElement, type);
        if ((childRes != null) && (childRes.length > 0))
        {
        	res = res.concat(childRes);
        }
    }
	var checkBoxElement = this.findInElement(nodeElement, "input", "checkbox");
	if (checkBoxElement == null) {
		return res;
	}
	var selected = checkBoxElement.checked;
	var objectType = nodeObject.getContentType();
    if ((objectType == type || objectType == '') && selected)
    {
		var value = this.findInElement(nodeElement, "input", "text").value;
		if (!isNaN(value)) {
			res[res.length] = value;
		}
    }
    return res;
}

Planning.Tree.toogleSelectionRecursive = function (nodeElement, checked)
{
    var nodeObject = nodeElement.object;
    var a = nodeObject.getContentType();
    var childs = nodeObject.childs;
    //at firs toogle children 
    for (var i=0; i<childs.length; i++)
    {
        var childNodeElement = document.getElementById(childs[i].id);
        if (!childs[i].hasChilds())
        {
            var cbx = this.findInElement(childNodeElement, "input", "checkbox");
            if (cbx) {
                cbx.checked = checked;
            }
            continue;
        }           
        this.toogleSelectionRecursive(childNodeElement, checked);        
    }
    var cbx = this.findInElement(nodeElement, "input", "checkbox");
    if (cbx) {
        cbx.checked = checked;
    }
    //nodeObject.expand();
}

Planning.Tree.toogleExpandRecursive = function (nodeElement, status)
{
    var nodeObject = nodeElement.object;
    var childs = nodeObject.childs;
    //at firs toogle children 
    for (var i=0; i<childs.length; i++)
    {
        var childNodeElement = document.getElementById(childs[i].id);
        if (!childs[i].hasChilds())
        {
            continue;
        }           
        this.toogleExpandRecursive(childNodeElement, status);        
    }
    
    if (status)
    {
        if (nodeObject.isCollapsed())
        {
            nodeObject.expand();     
        }                       
    }
    else 
    {
        nodeObject.collapse();
    }       
    
}  

Planning.Tree.expandPathUp = function (nodeId)
{
    if (nodeId == "")
    {
        return;
    }

    var nodeElement = document.getElementById(nodeId);
    if (nodeElement == null)
    {
    	return;
    }

    if (nodeElement.object == null)
    {
    	return;
    }        

	var nodeObject = nodeElement.object;

	if (nodeObject.isCollapsed())
	{
		nodeObject.toggleCollapsion();
	}
    
    var parentNode = nodeObject.parent;
    while (parentNode != null)
    {       
                        
        if (!parentNode.parent)
        {
        	if (parentNode.expand)
        	{
        		if (parentNode.isCollapsed())
        		{
        			parentNode.toggleCollapsion();
        		}
        	}	        		
            break;   
        }
        parentNode.expand(); 
        parentNode = parentNode.parent;
    } 	
}

Planning.Tree.findInElement = function (nodeElement, tagName)
{
    return findInElement(nodeElement, tagName, null);
}

Planning.Tree.findInElement = function (nodeElement, tagName, type)
{
    return findInElement(nodeElement, tagName, type, null);
}    
    
Planning.Tree.findInElement = function (nodeElement, tagName, type, possition)
{    
    var pos = 0;
    if (possition != null)
    {
        pos = possition;
    }
    var elements = nodeElement.getElementsByTagName(tagName);
    
    if (elements == null || 
        elements.length == 0)
    {
        return null;
    }        
    
    if (type == null)
    {
        return elements[pos]; 
    }
 
    var element = null;   
    for (var i=0; i<elements.length; i++)
    {        
        var inputType = elements.item(i).getAttribute("type");
        if (inputType == type)
        {
            if (pos == 0)
            {
                element = elements.item(i);
                break;
            }
            else 
            {
                pos = pos - 1;
            }
        }           
    } 
    return element;
}