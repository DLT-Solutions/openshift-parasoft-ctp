if (!window.Parasoft) {
    window.Parasoft = {};
}

if (!Parasoft.CodeEditor) {
	Parasoft.CodeEditor = {};
}

Parasoft.CodeEditor = function(options) {
    
    /** fields **/
    this._editorId = options.editorId;                  
    this._headerSelector = options.headerSelector;
    //cache for file content, the key is fileDescriptor                
    this._cache = new Parasoft.DataCache(null);
    this._currentFileDescriptor = null;                
    this._endPointUrl = options.endPointUrl;  
    
    $("#" + options.elementId).data("ParasoftCodeEditor", this);
                                   
};

Parasoft.CodeEditor.prototype.getAceEditor = function() {
    return ace.edit(this._editorId);
};

Parasoft.CodeEditor.prototype.getCache = function() {
    return this._cache;
};            

Parasoft.CodeEditor.prototype._getCacheKey = function(fileDescriptor) {                
    return fileDescriptor.repositoryId + "_" + fileDescriptor.path + "_" + fileDescriptor.revision;
};

Parasoft.CodeEditor.prototype._equals = function(fileDescriptor1, fileDescriptor2) {
	if (fileDescriptor1 == null && fileDescriptor2 == null) {
		return true;
	}
	if (fileDescriptor1 == null) {
		return false;
	}
	if (fileDescriptor2 == null) {
		return false;
	}	
	return ((fileDescriptor1.repositoryId == fileDescriptor2.repositoryId) &&
		   (fileDescriptor1.path == fileDescriptor2.path) &&
		   (fileDescriptor1.revision == fileDescriptor2.revision));
};

Parasoft.CodeEditor.prototype._setEditorContent = function (options) {                                
                    
    /** Ace editor setup **/                                           
    editor = ace.edit(this._editorId);
    editor.setTheme("ace/theme/textmate");
    editor.setShowFoldWidgets(true);
    editor.setShowPrintMargin(false);
    editor.setReadOnly(true);
    editor.session.setUseWrapMode(false); 
    editor.setHighlightGutterLine(false);
    
    var s = editor.getSession();
    
    var fileDescriptor = options.fileDescriptor;
    var fileContent = options.fileContent;
    var fileLang = options.fileLang;
    var annotations = options.annotations;
    var onContentLoadEvent = options.events.onContentLoadEvent;
    
    if ((fileDescriptor != null) && !this._equals(this._currentFileDescriptor, fileDescriptor)) { // do not change content if already loaded
        var filename = Planning.Util.getFileName(fileDescriptor.path);
        var revision = null;
        if (!Planning.Util.isEmptyString(fileDescriptor.revision)) {
        	filename += " v. " + fileDescriptor.revision;
        }
        $(this._headerSelector + " > h2").html(filename);
        $(this._headerSelector + " > h2").attr("title", fileDescriptor.path);            
        
        s.setValue(fileContent);
        s.setMode('ace/mode/' + fileLang);
        
        this._currentFileDescriptor = fileDescriptor;
    }
    
    if (annotations != null) {
        s.setAnnotations(annotations);
    }      
    
    if (onContentLoadEvent != null) {
        onContentLoadEvent(this);
    }                      
};

Parasoft.CodeEditor.prototype.loadSource = function (options) {

    var cacheKey = this._getCacheKey(options.fileDescriptor);
    var cache = this.getCache();
    
    //if content in cache, the read it and return
    if (cache.contains(cacheKey)) {
        var data = cache.get(cacheKey);
        this._setEditorContent({
            fileDescriptor: options.fileDescriptor,
            fileContent: data.content,
            fileLang: data.lang,
            annotations: options.annotations,
            events: {
                onContentLoadEvent: options.events.onContentLoadEvent
            }
        });   
        return;
    }

    //rerender editor
    var parent = $("#" + this._editorId).parent();
    $("#" + this._editorId).remove();
    parent.append("<pre id='" + this._editorId + "' class='loader'/>");                

    var url = this._endPointUrl(options.fileDescriptor);
    _this = this;    
    $.getJSON(url).done(function(data) {
    
        _this._setEditorContent({
            fileDescriptor: options.fileDescriptor,
            fileContent: data.content,
            fileLang: data.lang,
            annotations: options.annotations,
            events: {
                onContentLoadEvent: options.events.onContentLoadEvent
            }
        });                 
        //put content to cache
        cache.put(cacheKey, {content: data.content, lang: data.lang});   
                                                                                       
    }).fail(function(jqxhr, textStatus, error) { // handle request error
    
        var responseText = jQuery.parseJSON(jqxhr.responseText);
        $("#" + _this._editorId).remove();
        parent.append("<pre id='editor_error' class='error'/>");
        $("#editor_error").html("<span class='error'>" + textStatus + ":</span> <span>" + responseText.message + "</span><pre id='" + _this._editorId + "'/>"); 
        
    });            
};

Parasoft.CodeEditor.prototype.setMarkers = function(regions) {
    var editor = this.getAceEditor();
    //clear markers
    var markers = editor.session.getMarkers(false);
    $.each(markers, function(index, marker) {
        editor.session.removeMarker(marker.id);
    });
                    
    var aceRange = ace.require('ace/range').Range;
    var line = null;  
    var entryPointRegion = null;                         
    $.each(regions, function(index, region) {
        //-1 because ace is 0 based index
        region.startLine = region.startLine - 1;
        region.startPos = (region.startPos == null) ? 0 : region.startPos;
        region.endLine = (region.endLine == null) ? region.startLine : region.endLine - 1;
        region.endPos = (region.endPos == null) ? null : region.endPos;
        
        if (region.entryPoint) {
           entryPointRegion = region;
        }
        
        line = Planning.Util.min(line, region.startLine);
        
        editor.session.addMarker(new aceRange(region.startLine, region.startPos, region.endLine, (region.endPos == null) ? Infinity : region.endPos), "ace_selection", "text", false);                      
    });                                        
                                               
    var visibleRows = editor.getLastVisibleRow() - editor.getFirstVisibleRow();
    var middlePage = Math.round(visibleRows/2);
    
    if (entryPointRegion) {
        line = entryPointRegion.startLine;
    }
            
    var lineToScroll = (line - middlePage);
    lineToScroll = ((lineToScroll) < 0) ? 0 : lineToScroll;                                                                
            
    editor.scrollToRow(lineToScroll);   
    editor.moveCursorTo(line);   
    editor.selection.selectLine();     
};             
