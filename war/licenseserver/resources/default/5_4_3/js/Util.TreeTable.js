if (!window.Parasoft) {
    window.Parasoft = {};
}

if (!Parasoft.Util) {
    Parasoft.Util = {};
}

if (!Parasoft.Util.TreeTable) {
    Parasoft.Util.TreeTable = {};
}

Parasoft.Util.TreeTable.initializeHoverStyles = function(tableQuery, childPrefix) {
    jQuery(tableQuery + " > tbody > tr").hover(
        function() {
            //var d1 = new Date();
            Parasoft.Util.TreeTable.onMouseOver(tableQuery, childPrefix, this)
            //var d2 = new Date();
            //console.log("IN: " + (d2.getTime() - d1.getTime()));
        },
        function() {
            //var d1 = new Date();
            Parasoft.Util.TreeTable.onMouseOut(tableQuery, childPrefix, this)
            //var d2 = new Date();
            //console.log("OUT: " + (d2.getTime() - d1.getTime()));
        }
    );
}

Parasoft.Util.TreeTable.onMouseOver = function(tableQuery, childPrefix, row) {
    jQuery(row).addClass("hover");
    jQuery(Parasoft.Util.TreeTable.getDescendantsOf(tableQuery, childPrefix, row)).addClass("descHover");
}

Parasoft.Util.TreeTable.onMouseOut = function(tableQuery, childPrefix, row) {
    jQuery(row).removeClass("hover");
    jQuery(tableQuery + " > tbody > tr.descHover").removeClass("descHover");
}

Parasoft.Util.TreeTable.applyAltering = function(tableQuery, childPrefix) {
    var rows = Parasoft.Util.TreeTable.getRowsForAltering(tableQuery, childPrefix, null);
    if (rows.length > 1) {
        Parasoft.Util.TreeTable.applyAlteringToRows(tableQuery, childPrefix, rows);
    }
}

Parasoft.Util.TreeTable.getRowsForAltering = function(tableQuery, childPrefix, node) {
    var rows = null;
    if (node == null) {
        rows = jQuery(tableQuery).find("tbody").find("tr:not([class*='" + childPrefix + "'])");
    } else {
        rows = Parasoft.Util.TreeTable.getChildrenOf(tableQuery, childPrefix, node);
    }
    if (rows.length > 1) {
        return rows;
    } else if (rows.length == 1) {
        return Parasoft.Util.TreeTable.getRowsForAltering(tableQuery, childPrefix, rows[0]);
    } else {
        return jQuery([]);
    }
}

Parasoft.Util.TreeTable.applyAlteringToRows = function(tableQuery, childPrefix, rows) {
    for (i = 0; i < rows.length; i++) {
        jQuery(rows[i]).addClass("firstAltLevel");
        if ((i % 2) != 0) {
            jQuery(rows[i]).addClass("alt");
            jQuery(Parasoft.Util.TreeTable.getDescendantsOf(tableQuery, childPrefix, rows[i])).addClass("alt");
        }
    }
}

Parasoft.Util.TreeTable.getDescendantsOf = function(tableQuery, childPrefix, node) {
    var res = new Array();
    var children = jQuery.makeArray(Parasoft.Util.TreeTable.getChildrenOf(tableQuery, childPrefix, node));
    res = res.concat(children);
    for (var i = 0; i < children.length; i++) {
        var desc = Parasoft.Util.TreeTable.getDescendantsOf(tableQuery, childPrefix, children[i]);
        res = res.concat(desc);
    }
    return res;
}

Parasoft.Util.TreeTable.getAncestorsOf = function(tableQuery, childPrefix, node) {
    var ancestors = [];
    while(node = Parasoft.Util.TreeTable.getParentOf(tableQuery, childPrefix, node)) {
      ancestors[ancestors.length] = node[0];
    }
    return jQuery(ancestors);
}

Parasoft.Util.TreeTable.getChildrenOf = function(tableQuery, childPrefix, node) {
    return jQuery(tableQuery).find("tbody").find("tr." + childPrefix + node.id);
}

Parasoft.Util.TreeTable.getParentOf = function(tableQuery, childPrefix, node) {
    var classNames = node.get(0).className.split(' ');
    for(key in classNames) {
        if(classNames[key].match(childPrefix)) {
            return jQuery(tableQuery + " tbody #" + classNames[key].substring(childPrefix.length));
        }
    }
}

Parasoft.Util.TreeTable.expandAll = function(tableQuery) {
    jQuery(tableQuery).fadeTo("fast", 0.5, function() {
        Parasoft.Util.TreeTable.expandAllImpl(tableQuery);
        jQuery(tableQuery).fadeTo("fast", 1);
    });
}

Parasoft.Util.TreeTable.expandAllImpl = function(tableQuery) {
    jQuery(Planning.Util.escapeId(tableQuery) + " > tbody > tr").each(function() {
        if(!jQuery(this).is(".expanded")) {
        	jQuery(this).expand();
        }
    });
}

Parasoft.Util.TreeTable.collapseAll = function(tableQuery) {
    jQuery(tableQuery).fadeTo("fast", 0.5, function() {
        Parasoft.Util.TreeTable.collapseAllImpl(tableQuery);
        jQuery(tableQuery).fadeTo("fast", 1);
    });
}

Parasoft.Util.TreeTable.collapseAllImpl = function(tableQuery) {
    jQuery(Planning.Util.escapeId(tableQuery) + " > tbody > tr.expanded").each(function() {
        jQuery(this).collapse();
    });	
}

Parasoft.Util.TreeTable.expandTo = function(tableQuery, childPrefix, rowClass) {
	//var d1 = new Date();   	
	jQuery(tableQuery).fadeTo("fast", 0.5, function() {
		Parasoft.Util.TreeTable.collapseAllImpl(tableQuery);
	    jQuery(tableQuery).find("tbody").find("tr." + rowClass).each(function() {
	    	var tr = jQuery(this);
	    	tr.reveal();
	    });
	    jQuery(tableQuery).fadeTo("fast", 1);
    });    
    //var d2 = new Date();
    //console.log("Parasoft.Util.TreeTable.expandTo1 for rowClass [" + rowClass + "]: " + (d2.getTime() - d1.getTime())); 
}

Parasoft.Util.TreeTable.onUpdateParentIdComplete = function(data)
{
    var json = null;
    try {
        json = eval("(" + data + ")");
    } catch (e) {
        //nothing
    }
    if (json == null) {
        return;
    }               
    var tableObj = Planning.Util.getComponent(json.compId);   
    if (tableObj == null) {
        return;
    }          
    tableObj.updateRow(tableObj.getRow(json.ID.toString()), json.responseData);             
} 
