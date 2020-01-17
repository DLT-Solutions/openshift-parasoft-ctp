if (!window.Parasoft) {
    window.Parasoft = {};
}

if (!Parasoft.Kendo) {
	Parasoft.Kendo = {};
}

Parasoft.Kendo.editGridItem = function(gridSelector, path) {
	var grid = $(gridSelector).data("kendoGrid");

    var selectedRows = grid.select();

    var selectedDataItems = [];

    for (var i = 0; i < selectedRows.length; i++) {
        var dataItem = grid.dataItem(selectedRows[i]);

        selectedDataItems.push(dataItem);
    }	
    if (selectedDataItems.length == 0) {
    	alert("Please select one row");
    	return;
    }
    var id = selectedDataItems[0].id;
    
    location.href = path + "/" + id + "?form";	
};

Parasoft.Kendo.initForm = function(options) {
	var form = $("#" + options.formId);
	form.append('<input type="hidden" id="formValid"/>');

	var validator = form.kendoValidator({
	     messages: {
	         required: "Field is required"
	     }		
	}).data("kendoValidator");


//    window.onbeforeunload = function() {
//    	if (!Planning.Util.isEmptyString($("#" + options.formId + " #formValid").val())) {
//    		return;
//    	}
//        if (!Planning.Util.anyElemenyModified($("#" + options.formId + " input, #" + options.formId + " select"))) {
//            return;
//        }
//        return 'You have attempted to leave this page. If you have made any changes to the fields without clicking the [SAVE] button, your changes will be lost.  Are you sure you want to proceed?';    	
//    };	
    

	$("#" + options.formId + " input[type='submit']").click(function(e) {
		if (options.onSubmitButtonClick) {
			if (!options.onSubmitButtonClick(e)) {
				return false;
			}
		}
		if (validator.validate()) {
			$("#" + options.formId + " #formValid").val("true");
			if (options.ajax) {
			    var url = options.formUrl;
			    var jsonData = Parasoft.Kendo.stringifyForm("#" + options.formId);
			    $.ajax({
			           type: options.method,
			           url: url,
			           data: jsonData, // serializes the form's elements.
			           contentType: "application/json; charset=UTF-8",
			           dataType: "json",			           
			           complete: function(arg1, arg2)
			           {
			               if (options.ajaxCallback) {
			            	   options.ajaxCallback(arg1, arg2);
			               }
			           }
			         });

			    return false; // avoid to execute the actual submit of the form.	
			}
		}
	});
};

Parasoft.Kendo.stringifyForm = function (formSelector){	    

    return JSON.stringify(Parasoft.Kendo.jsonifyForm(formSelector));	
};

Parasoft.Kendo.jsonifyForm = function (formSelector){
    var unindexed_array = $(formSelector).serializeArray();
    var json = {};

    $.map(unindexed_array, function(n, i){
    	json[n['name']] = n['value'];
    });		    

    return json;	
};

Parasoft.Kendo.handleError = function (e) {
	var xhr = null;
	if (e.xhr) {
		xhr = e.xhr;
	} else {
		xhr = e;
	}
	if (window.setStatusError) {
		var userMessage = null;
		try {
			userMessage = JSON.parse(xhr.responseText);
		} catch (e) {
			userMessage = "There was a problem, please try again or review log files.";
		}		
		if ($.isPlainObject(userMessage)) {
			setStatusError(userMessage.message);
		} else {
			setStatusError(userMessage);
		}		
		if (userMessage.detailMessage && !Planning.Util.isEmptyString(userMessage.detailMessage)) {
			setDetailMessage(userMessage.detailMessage);
		}
	} else {
		if (window.console) {
		    console.error(
	            "statusCode: " + xhr.status + " \n" +
	            "statusText: " + xhr.statusText + " \n" +
	            "errorThrown: " + xhr.responseText + " \n");			
		}		
	}
};

Parasoft.Kendo.handleMessage = function (e) {
	var xhr = null;
	if (e.xhr) {
		xhr = e.xhr;
	} else {
		xhr = e;
	}
	switch (xhr.status) {
		case 200:
			if (window.setStatusInfo) {
				var userMessage = null;
				try {
					userMessage = JSON.parse(xhr.responseText);
				} catch (e) {
					userMessage = xhr.responseText;
				}		
				if ($.isPlainObject(userMessage)) {
					setStatusInfo(userMessage.message);
				} else {
					setStatusInfo(userMessage);
				}		
				if (userMessage.detailMessage && !Planning.Util.isEmptyString(userMessage.detailMessage)) {
					setDetailMessage(userMessage.detailMessage);
				}
			}			
		break;
		default: 
			Parasoft.Kendo.handleError(e);
		break;
	}
};

Parasoft.Kendo.gridFullTextSearch = function (gridSelector, query) 
{
	var grid = $(gridSelector).data("kendoGrid");

	var filters = new Array();
	if (!Planning.Util.isEmptyString(query)) {		
		var columns = grid.columns;			
		for (var i = 0; i < columns.length; i++) {
			if(columns[i].filterable != false) {
				if (!columns[i].field) {
					continue;
				}
				filters.push({ field: columns[i].field, operator: "contains", value: query });
			}
		}
	}
	grid.dataSource.filter({ 
		logic: "or",
		filters: filters
	});	
};

kendo.data.binders.notVisible = kendo.data.Binder.extend({
    refresh: function() {
        var value = this.bindings["notVisible"].get();
        if (value) {
        	$(this.element).hide();
        } else {
        	$(this.element).show();
        }
    }
});

kendo.data.binders.visibleIfNotEmptyArray = kendo.data.Binder.extend({
    refresh: function() {
        var array = this.bindings["visibleIfNotEmptyArray"].get();
        if (Planning.Util.isEmptyArray(array)) {
        	$(this.element).hide();
        } else {
        	$(this.element).show();
        }
    }
});

kendo.data.binders.visibleIfEmptyArray = kendo.data.Binder.extend({
    refresh: function() {
        var array = this.bindings["visibleIfEmptyArray"].get();
        if (Planning.Util.isEmptyArray(array)) {
        	$(this.element).show();
        } else {
        	$(this.element).hide();
        }
    }
});