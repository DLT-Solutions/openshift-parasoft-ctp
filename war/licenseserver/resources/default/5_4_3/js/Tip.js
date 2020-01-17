if (!window.Parasoft) {
    window.Parasoft = {};
}

if (!Parasoft.Tip) {
	Parasoft.Tip = {};
}

Parasoft.Tip = function(options) {

	this._placeHolderSelector = options.placeHolderSelector;
	this._targetElementSelector = options.targetElementSelector;
	this._showTrigger = !options.showTrigger ? "mouseenter" : options.showTrigger;
	this._hideTrigger = !options.hideTrigger ? "mouseleave" : options.hideTrigger;
	this._attributes = !options.attributes ? new Array("title") : options.attributes;
	this._offset = !options.offset ? 0 : options.offset;
	this._position = !options.position ? Planning.Util.Position.BottomRight : options.position;
	this._content = options.content;
	this._data = options.data;
	this._dataRetriever = options.dataRetriever;
	this._addClass = options.addClass;
}

Parasoft.Tip.prototype = {
    	
	updateContent: function(value) {
		if (Planning.Util.isEmptyString(value)) {
        	this._hideTip();
		    return;
		}		
		var element = this._getOrCreateTipElement();
		element.innerHTML = value;
	},

	init: function()	
	{
		var elements = jQuery(this._targetElementSelector);
		var element = null;
		var dataValue = this._data.value;
		for (var i = 0 ; i < elements.length; i++) {
			element = jQuery(elements[i]);
			if (this._dataRetriever) {
				dataValue = this._dataRetriever(element, this._data.value);
			}

        	if (dataValue != "") {
		        element.bind(this._showTrigger, {tip: this, dataValue: dataValue}, this._onShowTriggerEventHandler);
		        element.bind(this._hideTrigger, {tip: this}, this._onHideTriggerEventHandler);
		        
		        if (this._addClass) {
		        	jQuery(element).addClass(this._addClass);
		        }
        	}
		}
	},
	
	_onShowTriggerEventHandler: function(event) {
		var tip = event.data.tip;
		var element = tip._getOrCreateTipElement();
		
		jQuery(element).stopTime("hide");
		jQuery(event.target).oneTime(300, "show", function() {
			tip._showTip(event);
		});
		return false;
	},
	
	_onHideTriggerEventHandler: function(event) {
		var tip = event.data.tip;
		var element = tip._getOrCreateTipElement();
		
		jQuery(event.target).stopTime("show");
	    jQuery(element).oneTime(300, "hide", function() {
	    	tip._hideTip();
	    });		
	},
	
	_showTip: function(event) {		
		var tip = event.data.tip;
		
		var element = tip._getOrCreateTipElement();		
		jQuery(element).show();
		
		tip._retrievAndUpdateTipContent(event.target, event.data.dataValue);

		Planning.Util.calculatePosition(element, jQuery(event.target), tip._position, 0);

	    jQuery(element).bind('mouseenter', null, function(event) {
	    	jQuery(event.target).stopTime("hide");
	    });
	    jQuery(element).bind('mouseleave', {tip: tip}, function(event) {
	    	tip._hideTip();
	    });

	    //jQuery(element).show();
	},
	
	_hideTip: function() {
	    jQuery("#title-tip:visible").hide(); 
	},	
	
	_getOrCreateTipElement: function() {
		var tipElement = document.getElementById("title-tip");
		if (tipElement == null) {
			tipElement = document.createElement('div');
			tipElement.id = "title-tip";
			tipElement.className = "title-tip";		
			tipElement.style.display = "none";
			jQuery(tipElement).appendTo(this._placeHolderSelector);
		}	
		return tipElement;
	},
	
	/**
	 * returns first non null attribute value
	 */
	_retrievAndUpdateTipContent: function(target, dataValue) {		
		this.updateContent("Loading...");
		var myself = this;
		if (!this._data.renderFunction) {
			this.updateContent(dataValue);
		} else {
			this._data.renderFunction(target, dataValue, function(value) {
				myself.updateContent(value);
			});
		}
	}
}