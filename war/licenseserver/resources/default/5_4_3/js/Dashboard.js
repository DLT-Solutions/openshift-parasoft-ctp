if (!window.Parasoft) {
    window.Parasoft = {};
}

if (!Parasoft.Dashboard) {
     Parasoft.Dashboard = {};
}

Parasoft.Dashboard = function(options) {
    // id of dashboard used to identify widgets in db
    //can be one of the following "architect", "tester", "developer", "manager" 
    this.dashboardId = options.dashboardId; 
    this.dashboardSelector = (typeof options.dashboardSelector !="undefined")?options.dashboardSelector:"#dashboard";
    this._debugLevel = 1; // debug message level 1- info... 5 - error
    this.lastId = 1; //new widget will have id starts with
    this.columns = (typeof options.columns !="undefined")?options.columns:2;  //dashbord's number of columns
    this.sortableSelector = (typeof options.sortableSelector !="undefined")?options.sortableSelector:".column"; //selector of element to which sortable functionality will be attached
    this.dialogSelector = (typeof options.dialogSelector !="undefined")?options.dialogSelector:"#dialog";//selector of element where dialog will be attached
    this.addWidgetSelector = (typeof options.addWidgetSelector !="undefined")?options.addWidgetSelector:"#addWidget";//selector of element with link to add new widget
    this.urlSuffix = (typeof options.urlSuffix !="undefined")?options.urlSuffix:"";//url suffix for every iframe url used to pass drop-period properties back to processor
    this._init();
}

Parasoft.Dashboard.prototype = {
        
    _init: function() {
        this._log('Entering _init', 1);
        if (typeof this.dashboardId == "undefined") {
            this._log('_init: Required parameter "dashboadrId" not specified', 5);
            return; 
        }
        this._log('_init: initialize sortable plugin', 1);
        this._addUserWidgets();
    },
    
    _addUserWidgets: function (){
        this._log('Entering: _addUserWidgets', 1);
        var thisRef = this;
        
        $.getJSON('/grs/Dashboard', {
            "action": "GET_USER_WIDGETS",
            "dashboardId" : thisRef.dashboardId,
            "rnd" : thisRef._getRandomValue()
        }, function(data) {
            thisRef._log('_addUserWidgets: Retrieving user widgets json data: ', 1);
            var widgets = data.result.data;
            addColumns(thisRef.columns);
            for (i = 0; i < widgets.length; i++) {
                thisRef.addWidget(widgets[i], false);
            }
            
            thisRef._appendStyles();
            
            $(thisRef.sortableSelector).sortable(
                {
                    connectWith: thisRef.sortableSelector,
                    opacity: 0.3,
                    forcePlaceholderSize: true,
                    delay: 300,
                    tolerance: "pointer",
                    stop:  function() {
                        thisRef._saveDashboard();
                    }
                }
            );
            
            $(thisRef.sortableSelector).disableSelection();
            
            $(thisRef.addWidgetSelector).click(function() {
                thisRef._log("_init: attaching click to add link ", 1);
                thisRef._initDialog();
                $(thisRef.dialogSelector).dialog({
                    "width": 500,
                    "height": 600,
                    "position" : ["center",100]
                });
            });
            
        }).error(function() {alert('Can\'t connect to server')});
        
        function addColumns(colsNumber) {
            for (i = 0; i < colsNumber; i++) {
                $(thisRef.dashboardSelector).append('<div class="column"></div>');
                $(thisRef.dashboardSelector).find(thisRef.sortableSelector).css('width', (100/colsNumber + "%"));
            }
        }
        
        //attach "this" to "body" element
        $.data(document.body, 'Parasoft.Dashboard.data', thisRef);
    },
    
    _initDialog : function() {
        this._log('_initDialog: Inititalizing dialog' + this.dialogSelector, 1);
        
        var thisRef = this;
        
        $.getJSON('/grs/Dashboard', {
            "action": "GET_WIDGET_DIRECTORY",
            "source": "file",
            "dashboardId" : thisRef.dashboardId,
            "rnd" : thisRef._getRandomValue()
        },function(data) {
            thisRef._log('_initDialog: Retrieving categories json data: ', 1);
            var categories = data.categories.category;
            $(thisRef.dialogSelector).html('');
            for (i = 0; i < categories.length; i++) {
                var category = categories[i]; 
                var categoryTitle = category.title;
                $(thisRef.dialogSelector).append('<div>' + categoryTitle + '</div><ul></ul>').end();
                
                var categoryUrl = category.url;
                $.getJSON(categoryUrl, function(data) {
                    thisRef._log('_initDialog: Retrieving category json data: ', 1);
                    var widgets = data.result.data;
                    
                    for(j = 0; j < widgets.length; j++) {
                        var widget = widgets[j]; 
                        
                        var liContent = getWidgetItem(widget);
                        
                        $(thisRef.dialogSelector + " ul").append(liContent);
                        
                        $(thisRef.dialogSelector + " ul > li:last .addWidgetBtn").data('widgetData', widget);
                   }
                   attachAddButtonOnClick();
                });
            }
        }).error(function() {alert('Can\'t connect to server')});
        
        function getWidgetItem(widget) {
            var widgetTitle = widget.attrs.title;
            var widgetDescription = widget.attrs.description;
            var widgetImage = widget.attrs.image;
            var liContent = '<li>' +
                '<img class="widgetImage" src="' + widgetImage + '"/>' +
                '<em>' + widgetTitle + '</em>' +
                '<span class="description">' + widgetDescription + '</span>' + 
                '<div class="clear"/>' +
                '<div class="actions"><input type="button" class="button addWidgetBtn" value="Add"/></div>' +
                '<div class="clear"/>' +
                '</li>';
            return liContent;
        }
        
        function attachAddButtonOnClick() {
            $(thisRef.dialogSelector).find(".addWidgetBtn").each(function() {
                thisRef._log("_init: attaching click to add widget in dialog", 1);
                $(this).click(function() {
                    var data = $(this).data('widgetData');
                    thisRef.addWidget(data, true); 
                    $(thisRef.dialogSelector).dialog("close");                
                })
            });
        }
    },
    
    _appendStyles: function (id) {
        this._log('Entering _appendStyles', 1);
        var thisRef = this;
        
        var modifier = "";
        if (typeof id != "undefined") {
            modifier = "#"+id; 
        }
        
        $(modifier + ".portlet" ).addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
        .find( ".portlet-header" )
            .addClass( "ui-widget-header ui-corner-all" )
            //.prepend( "<span class='' style='float:right;'>Edit</span>")
            .prepend( "<span class='ui-icon ui-icon-gear configBtn'></span>")
            .prepend( "<span class='ui-icon ui-icon-close deleteBtn' style='float:right;'>!del!</span>")
            .end()
        .find( ".portlet-content" );

        
        $(modifier + ".portlet" ).find(".configBtn").each(function () {
            $(this).click(function(){
                var clientId = $(this).closest(modifier + ".portlet" ).attr('id');
                var widgetJSON = $("#" + clientId).data("widgetJSON");


                
                $( this ).toggle();
                $( this ).parents( ".portlet:first" ).find( ".portlet-content" ).flip({
                	direction:'lr',
                	color: 'white',
                	onEnd: function() {
                		$('#report_'+ widgetJSON.attrs.clientid).toggle();
                		$('#report_'+ widgetJSON.attrs.clientid + '_config').toggle();
                	}
                })
            });
        });
        
        $(modifier + ".portlet" ).find(".cancelBtn").each(function () {
            $(this).click(function(){
                var clientId = $(this).closest(modifier + ".portlet" ).attr('id');
                var widgetJSON = $("#" + clientId).data("widgetJSON");

                $( this ).parents( ".portlet:first" ).find( ".configBtn" ).toggle();

                
                $( this ).parents( ".portlet:first" ).find( ".portlet-content" ).flip({
                	direction:'lr',
                	color: 'white',
                	onEnd: function() {
                		$('#report_'+ widgetJSON.attrs.clientid).toggle();
                		$('#report_'+ widgetJSON.attrs.clientid + '_config').toggle();
                	}
                })
            });
        });
        
        $(modifier + ".portlet" ).find(".saveBtn").each(function () {
            $(this).click(function(){
                var clientId = $(this).closest(modifier + ".portlet" ).attr('id');
                var widgetJSON = $("#" + clientId).data("widgetJSON", widgetJSON);
                

                if (widgetJSON.attrs.url.substr(0,8) == "/reports") {
                	   EmbeddedReporting.remove("report_" + widgetJSON.attrs.clientid);
                }
        		$('#report_'+ widgetJSON.attrs.clientid).remove();
                
                var parsedParams = $.parseJSON(widgetJSON.attrs.reportparams);
                parsedParams.runId = parseInt($("#projectSelector_" + widgetJSON.attrs.clientid).val());
                if (parsedParams.runId == 1) {
                	parsedParams.project = "C%2B%2Btest";
                } else if (parsedParams.runId == 6) {
                	parsedParams.project = "Checkstyle";
                } else if (parsedParams.runId == 3) {
                	parsedParams.project = "Concerto";
                }
                widgetJSON.attrs.reportparams = JSON.stringify(parsedParams);
                
                var protocol = document.location.protocol;
                var host = document.location.hostname;
                var port = document.location.port;
                var applicationUrl = protocol + "//" + host + ":" + port + "/reports";
                
                var options = {
          		      applicationUrl : applicationUrl,
          		      report : widgetJSON.attrs.reporttemplate,
          		      autoSizing : 'all',
          		      linkParams : $.parseJSON(widgetJSON.attrs.reportparams)
          		   };
          		 

        		$('#report_'+ widgetJSON.attrs.clientid + '_config').toggle();
                $( this ).parents( ".portlet:first" ).find( ".portlet-content" ).append('<div class="widgetFrame" id="report_'+ widgetJSON.attrs.clientid + '">');
                
                EmbeddedReporting.create("report_" + widgetJSON.attrs.clientid, options);

                
                $( this ).parents( ".portlet:first" ).find( ".configBtn" ).toggle();
                $( this ).parents( ".portlet:first" ).find( ".portlet-content" ).flip({
                	direction:'lr',
                	color: 'white'
                })

                thisRef._saveDashboard();
            });
        });
        
        $(modifier + ".portlet" ).find(".deleteBtn").each(function () {
            $(this).click(function(){
                var clientId = $(this).closest(modifier + ".portlet" ).attr('id');
                var widgetJSON = $("#" + clientId).data("widgetJSON", widgetJSON);
                thisRef._deleteWidget(widgetJSON);
                $(this).closest(modifier + ".portlet" ).remove();
            });
        });
    },
    
    addWidget: function(data, refresh) {
//		use this to see which project is currently selected
//      alert($(".projectCombo").find('option:selected').text());
    	
        this._log("Entering addWidget", 1);
        if (typeof data == "undefined") {
            this._log("addWidget: data was not defined", 5);
        }
        
        var thisRef = this;
        var widgetId = data.id;
        
        var widgetClientId = "w_" + this.lastId++;
        var width = $(thisRef.dashboardSelector).width()/thisRef.columns-50;
        var height = $(thisRef.dashboardSelector).height();
        var height = 180;
        
        var columnIdx = getBestColumn();
        var position = $(this.sortableSelector + ':eq('+columnIdx+')' + ' .portlet').length;
        
        if (data.attrs.reportparams == undefined) {
	        var reportParams;
	        if (data.attrs.reportsubtemplate == undefined) {
	        	reportParams = {'project' : 'Checkstyle', 'runConfigurationId' : 14};
	        } else {
	        	reportParams = {'project' : 'C%2B%2Btest', 'runId' : 1, "groupBy" : data.attrs.reportsubtemplate};
	        }
        } else {
        	reportParams = jQuery.parseJSON(data.attrs.reportparams);
        }
        
        var widgetJSON = {
                "id" : data.id,
                "name" : data.name,
                "column" : columnIdx,
                "position": position,
                "attrs" : {
                    "title" : data.attrs.title,
                    "description" : data.attrs.description,
                    "url" : data.attrs.url,
                    "clientId" : widgetClientId,
                    "reportTemplate" : data.attrs.reporttemplate,
                    "reportParams" : reportParams
                }
        };
        
        $("#" + widgetJSON.attrs.clientId).data("widgetJSON", widgetJSON);
        
        thisRef._saveWidget(widgetJSON, position);
        
        this.urlSuffix
        
        
        if (widgetJSON.attrs.url.substr(0,32) == "/grs/tabbed_xreport.jsp?xreport=") {

            var widgetIframUrl = widgetJSON.attrs.url+'&width='+ width+'&height='+ height + '&' + thisRef.urlSuffix;
	        $(this.sortableSelector + ':eq('+columnIdx+')').append(
	                '<div class="portlet" id="'+widgetJSON.attrs.clientId+'">' +
	                '<div class="portlet-header">'+ widgetJSON.attrs.title + '</div>'+
	                '<div class="portlet-content">' +
	                '<iframe class="widgetFrame" scrolling="no" src="'+ widgetIframUrl +'"/>' +
	                '</div></div>');
        } else if(widgetJSON.attrs.url == "/reports") {

        	$(this.sortableSelector + ':eq('+columnIdx+')').append(
	                '<div class="portlet" id="'+widgetJSON.attrs.clientId+'">' +
	                '<div class="portlet-header">'+ widgetJSON.attrs.title + '</div>'+
	                '<div class="portlet-content">' +
	                '<div class="widgetFrame" id="report_'+ widgetJSON.attrs.clientId + '"></div>' +
	                '<div class="configFrame" id="report_'+ widgetJSON.attrs.clientId + '_config" style="display:none;">' +
	                '<div class="configWrapper"><span class="widgetHeadline">' + widgetJSON.attrs.title + '</span><br><span class="wrapupTitle">configuration</span><br>' +
	                '<div id="configWrapup"><span class="configOption">Project:</span><select id="projectSelector_' + widgetJSON.attrs.clientId + '"><option value="1">C++test</option><option value="6">Checkstyle</option><option value="3">Concerto</option></select></div>' +
	                '<a href="#" class="saveBtn">save</a>' +
	                '<a href="#" class="cancelBtn">cancel</a></div></div>' +
	                '</div></div>');
        	

            var protocol = document.location.protocol;
            var host = document.location.hostname;
            var port = document.location.port;
            var applicationUrl = protocol + "//" + host + ":" + port + "/reports";
        	
        	var options = {
        		      applicationUrl : applicationUrl,
        		      report : widgetJSON.attrs.reportTemplate,
        		      autoSizing : 'height',
        		      linkParams : widgetJSON.attrs.reportParams
        		   };
        		 
        	EmbeddedReporting.create("report_" + widgetJSON.attrs.clientId, options);
        } else {
        	if (widgetJSON.attrs.url == "Risk") {
        		$(this.sortableSelector + ':eq('+columnIdx+')').append(
    	                '<div class="portlet" id="'+widgetJSON.attrs.clientId+'">' +
    	                '<div class="portlet-header">'+ widgetJSON.attrs.title + '</div>'+
    	                '<div class="portlet-content">' +
    	                '<div class="widgetFrame" id="report_'+ widgetJSON.attrs.clientId + '">'+
    	                
    	                '<div id="reportWrapper" class="reportWrapper">' +
    	                '<span class="widgetHeadline">Risk</span><br><span class="wrapupTitle">SOAtest</span><br>' +
    	                '<div id="divWrapup"><div id="green" class="circle"></div><div id="outerBox"><div id="redZone" style="width: 40%;"></div><div id="statusBar" style="width: 22.3%;"></div></div><div style="margin-top: 51px;margin-left: 84px;position: absolute;">0%</div><div style="margin-top: 51px;position: absolute;margin-left: 27%;">100%</div></div>' +
    	                '<div id="diffStat"><span class="wrapup" style="margin-top: -10px;">Low</span></div></div>' +    	                
    	                '</div></div>');
        	}
        	if (widgetJSON.attrs.url == "Security") {
        		$(this.sortableSelector + ':eq('+columnIdx+')').append(
    	                '<div class="portlet" id="'+widgetJSON.attrs.clientId+'">' +
    	                '<div class="portlet-header">'+ widgetJSON.attrs.title + '</div>'+
    	                '<div class="portlet-content">' +
    	                '<div class="widgetFrame" id="report_'+ widgetJSON.attrs.clientId + '">'+
    	                
    	                '<div id="reportWrapper" class="reportWrapper">' +
    	                '<span class="widgetHeadline">Security</span><br><span class="wrapupTitle">SOAtest</span><br>' +
    	                '<div id="divWrapup"><div id="red" class="circle"></div><div id="outerBox"><div id="redZone"></div><div id="statusBar" style="width: 9%;"></div></div><div style="margin-top: 51px;margin-left: 84px;position: absolute;">0%</div><div style="margin-top: 51px;position: absolute;margin-left: 27%;">100%</div></div>' +
    	                '<div id="diffStat"><span class="wrapup" style="margin-top: -10px;">10</span><span class="ofRules">of 30 rules.</span><span class="negativeChange">+3</span></div></div>' +
    	                '</div></div>');
        	}
        	if (widgetJSON.attrs.url == "Compliance") {
        		$(this.sortableSelector + ':eq('+columnIdx+')').append(
    	                '<div class="portlet" id="'+widgetJSON.attrs.clientId+'">' +
    	                '<div class="portlet-header">'+ widgetJSON.attrs.title + '</div>'+
    	                '<div class="portlet-content">' +
    	                '<div class="widgetFrame" id="report_'+ widgetJSON.attrs.clientId + '">'+
    	                
    	                '<div id="reportWrapper" class="reportWrapper">' +
    	                '<span class="widgetHeadline">Compliance - FDA</span><br><span class="wrapupTitle">SOAtest</span><br>' +
    	                '<div id="divWrapup"><div id="yellow" class="circle"></div><div id="outerBox"><div id="redZone" style="width: 88%;"></div><div id="statusBar" style="width: 20%;"></div></div><div style="margin-top: 51px;margin-left: 84px;position: absolute;">0%</div><div style="margin-top: 51px;position: absolute;margin-left: 27%;">100%</div></div>' +
    	                '<div id="diffStat"><span class="wrapup" style="margin-top: -10px;">212</span><span class="ofRules">of 250 rules.</span><span class="positiveChange">-42</span></div></div>' +
    	                '</div></div>');
        	}
        	if (widgetJSON.attrs.url == "Requirement Traceability") {
        		$(this.sortableSelector + ':eq('+columnIdx+')').append(
    	                '<div class="portlet" id="'+widgetJSON.attrs.clientId+'">' +
    	                '<div class="portlet-header">'+ widgetJSON.attrs.title + '</div>'+
    	                '<div class="portlet-content">' +
    	                '<div class="widgetFrame" id="report_'+ widgetJSON.attrs.clientId + '">'+
    	                
    	                '<div id="reportWrapper" class="reportWrapper">' +
    	                '<span class="widgetHeadline">Requirement Traceability</span><br><span class="wrapupTitle">SOAtest</span><br>' +
    	                '<div id="divWrapup"><div id="green" class="circle"></div><div id="outerBox"><div id="redZone" style="width: 66%;"></div><div id="statusBar" style="width: 19%;"></div></div><div style="margin-top: 51px;margin-left: 84px;position: absolute;">0%</div><div style="margin-top: 51px;position: absolute;margin-left: 27%;">100%</div></div>' +
    	                '<div id="diffStat"><span class="wrapup" style="margin-top: -10px;">80%</span><span class="ofRules">of requirements tested.</span></div>' +
    	                '</div></div>');
        	}
        }
        
        if (refresh) {
            this._appendStyles(widgetClientId);
            $(this.sortableSelector).sortable('refresh');
        }
        
//        thisRef._saveDashboard();
        
        function getBestColumn() {
            var min = 1000;
            var columnIdx = 0;
            $(thisRef.sortableSelector).each(function (index) {
               var widgetsCount = $(this).find(".portlet").length;
               if (widgetsCount < min ) {
                   min = widgetsCount;
                   columnIdx = index;
               }
             });
            return columnIdx;
        }
    },
    
    _saveWidget: function(data) {
        var thisRef = this;
        thisRef._log("Entering _saveWidget", 1);
        var clientId = data.attrs.clientId;

        var id = "";
        
        $.post('/grs/Dashboard', {
            "action" : "SAVE_WIDGET",
            "data" : JSON.stringify(data),
            "dashboardId" : thisRef.dashboardId,
            "columns" : thisRef.columns,
            "rnd" : thisRef._getRandomValue()
        }, function (innerData) {
            thisRef._log("innerData", 1);
            var dataJSON = eval('('+innerData+')');
            $("#" + clientId).data("widgetJSON", dataJSON);
//            $("#" + clientId).attr("id", "w_"+dataJSON.id);
        });
        
    },
    
    _saveDashboard : function () {
        var thisRef = this;
        thisRef._log("Entering _saveDashboard", 1);
        var serialized = thisRef.serialize();
        
        $.post('/grs/Dashboard', {
            "action" : "SAVE_WIDGETS",
            "data" : JSON.stringify(serialized) ,
            "rnd" : thisRef._getRandomValue()
        });
    },
    
    _deleteWidget : function (dataJSON) {
        var thisRef = this;
        thisRef._log("Entering _deleteWidget", 1);

        if (dataJSON.attrs.url.substr(0,8) == "/reports") {
        	   EmbeddedReporting.remove("report_" + dataJSON.id);
        }
        
        $.post('/grs/Dashboard', {
            "action" : "DELETE_WIDGET",
            "id" : dataJSON.id,
            "rnd" : thisRef._getRandomValue()
        });
    },
    
    serialize: function(event, ui) {
        var thisRef = jQuery.data(document.body, 'Parasoft.Dashboard.data');
        if (!$(thisRef.sortableSelector).data( 'sortable' )) {
            return;
        }
        thisRef._log('serialize: Entering serialization', 1);
        
        var result = {
                "dashboard" : { 
                    "dashboardId" : thisRef.dashboardId,    
                    "columns" : thisRef.columns,
                    "data" : []
                }
        };
        
        $(thisRef.sortableSelector).each(function(index) {
            var columnWidgets = $(this).sortable('toArray');
            for(i=0; i < columnWidgets.length; i++) {
              var widgetJSON = $("#" + columnWidgets[i]).data("widgetJSON");
              widgetJSON.position = i;
              widgetJSON.column = index;
              result.dashboard.data.push(widgetJSON);
            }
        });
        return result;
    },
    
    _getRandomValue : function () {
        return Math.floor((Math.random()*10000)+1);
    },
    
    _log: function(msg, level) {
        if (level >= this._debugLevel && typeof console != "undefined") {
            var errorType = "";
            if (level == 1) {
                errorType = "INFO"
            } else if (level == 2) {
                errorType = "EVENT"
            } else if (level == 3) {
                errorType = "WARNING"
            } else if (level == 5) {
                errorType = "ERROR"
            }
            console.log(errorType + ": " + msg)
        }
    }
    
}