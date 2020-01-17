function StatusInfo(richStatusId, props)
{
	var _TYPE_INFO = 0;
	var _TYPE_WARN = 1;
	var _TYPE_ERROR = 2;
	
	var _richStatusId = richStatusId;
	var _props = props;
	
	this.statusError = function(text)
	{
		this._createStatus(_TYPE_ERROR, text);
	}
	
	this.statusWarn = function(text)
	{
		this._createStatus(_TYPE_WARN, text);
	}
	
	this.statusInfo = function(text)
	{
		this._createStatus(_TYPE_INFO, text);
	}
	
	this.clear = function()
	{
		var statusElement = document.getElementById(_richStatusId);
		statusElement.className = "rich-message message";
		
		var labelSpan = this._cleanUp(statusElement);
		labelSpan.className = "rich-message-label";
	}
	
	this._createStatus = function(type, text)
	{
		var iconSrc = null;
		var style = null;
		switch (type) {
		case _TYPE_INFO:
			iconSrc = _props.infoIcon;
			style = _props.infoStyle;
			break;
		case _TYPE_WARN:
			iconSrc = _props.warnIcon;
			style = _props.warnStyle;			
			break;
		case _TYPE_ERROR:
			iconSrc = _props.errorIcon;
			style = _props.errorStyle;			
			break;			
		default:
			break;
		}
		
		var statusElement = document.getElementById(_richStatusId);		
		statusElement.className = "message rich-message " + style;
		
		var labelSpan = this._cleanUp(statusElement);
		var iconSpan = document.createElement('span');		
		
		iconSpan.className = "rich-message-marker";
		var icon = document.createElement('img');
		icon.src = iconSrc;
		iconSpan.appendChild(icon);
		
		labelSpan.className = "rich-message-label";
		labelSpan.innerHTML = text;
		
		statusElement.insertBefore(iconSpan, labelSpan);
	}
	
	this._cleanUp = function(element)
	{
		var iconSpan = null;
		var labelSpan = null;
		var nodes = element.childNodes;
		switch (nodes.length) {
		case 2:
			iconSpan = nodes[0];
			labelSpan = nodes[1];
			break;
		case 1:
			labelSpan = nodes[0];
			break;
		default:
			break;
		}
		
		if (iconSpan != null) {
			element.removeChild(iconSpan);
		}
		labelSpan.innerHTML = "";
		return labelSpan;
	}
}