if (!Parasoft.ModificationEvent) {
	Parasoft.ModificationEvent = {};
}

Parasoft.ModificationEvent.createWaitDialog = function()
{
	dialog = jQuery('#wait_view').dialog( {
		autoOpen: false,
		minHeight: 50,
		modal: true,
		resizable: false,
		closeOnEscape: false,
		open: function(event, ui) {
			jQuery(this).parents(".ui-dialog").find(".ui-dialog-titlebar").hide();
		}
	});
	
	dialog.dialog('open');
	return dialog;
};

Parasoft.ModificationEvent.handleResult = function(dialog, message) 
{
	oldContents = jQuery('#wait_view').html();
	jQuery('#wait_view').html(message);
	dialog.dialog("option", "buttons", {
		"Ok" : function() {
			dialog.html(oldContents);
			dialog.dialog("destroy");
		}
	});
};

Parasoft.ModificationEvent.handleModificationEvent = function (entityType, entityId, entityField, saveFunc, element, projectId, saveButton)
{
	var newValue = element.value;
	var oldValue = null;

	for (var i = 0; i < element.options.length; i++) {
		var option = element.options[i];
		if (option.defaultSelected) {
			oldValue = option.value;
		}
	}

	if (newValue != oldValue) {
		jQuery.getJSON('/grs/ModificationEvent', {action: 'getEvents', entityField: entityField, entityType: entityType}, 
				function(data)
				{
					var event = null;

					if (!Planning.Util.isEmptyArray(data)) {
						for (var i = 0; i < data.length; i++) {
							var object = data[i];
							if (object.newValue == newValue && object.oldValue == oldValue) {
								event = object;
								break;
							}
						}	 
					}
					
					if (event != null) {
						Parasoft.ModificationEvent.handleEventAction(event.eventMsg, event.eventAction, [{entityId: entityId, event: event, projectId: projectId}], saveFunc, saveButton);
					}else {
						saveFunc();
					} 
				}
			);
	} else {
		saveFunc();
	}
};

Parasoft.ModificationEvent.handleEventAction = function (message, eventAction, events, callback, saveButton) 
{
	if (eventAction == 'ESIGNATURE') {
		var esignatureModal = new Parasoft.ModificationEvent.EsignatureEvent({
			dialogId: 'esignature_view',
			message: message,
			events: events,
			callback: callback,
			disclaimerAlertMsg: 'You must agree to the conditions of the disclaimer.'
		});
		esignatureModal.openWindow(saveButton);
	} 
	
	if (eventAction == 'MODIFICATION_PURPOSE') {
		var purposeModal = new Parasoft.ModificationEvent.ModificationPurpose( {
			events: events,
			message: message,
			callback: callback,
			dialogId: 'modification_purpose_view'
		});
		purposeModal.openWindow(saveButton);
	}
};

Parasoft.ModificationEvent.ModificationPurpose = function(metaInfo) {
	
	this._callback = metaInfo.callback;
	this._dialogId = metaInfo.dialogId;
	this._events = metaInfo.events;
	this._message = metaInfo.message;
};

Parasoft.ModificationEvent.ModificationPurpose.prototype = {
		
		openWindow : function(saveButton)
		{
			
			var reasonInput = document.getElementById('reasonInput');
			jQuery('#modificationEventMsg').text(this._message);
			
			var dialogRef = jQuery('#'+ this.getDialogId()).dialog( {
				autoOpen: false,
				height: 175,
				width: 400,
				modal: true,
				resizable: false,
				title: "Modification Reason",
				closeOnEscape: false,
				close: function(event, ui) {
					reasonInput.value = '';
					Planning.Util.enableBtn(saveButton);
				}
				
			});
			var thisRef = this;
			
			var submitFunc = function() {
				
				var purpose = reasonInput.value;
				if (Planning.Util.isEmptyString(purpose)) {
					alert('Modification reason cannot be empty.');
					return;
				}
				
				var waitDialog = Parasoft.ModificationEvent.createWaitDialog();
					
				jQuery.post('/grs/ModificationEvent', 
					{
						action: 'modificationPurposeAction',
						modificationPurpose: purpose,
						events: Planning.Util.stringifyArray(thisRef.getEvents())
					},
					function(data) 
					{
						var createResult = JSON.parse(data);
						if (createResult.result == "failed") {
							Parasoft.ModificationEvent.handleResult(waitDialog, createResult.message);
						} else if (createResult.result == "warn") {
							dialogRef.dialog("close");
							thisRef._callback();
							Parasoft.ModificationEvent.handleResult(waitDialog, createResult.message);
						} else {
							waitDialog.dialog("close");
							dialogRef.dialog("close");
							thisRef._callback();
						}
					}
				);
			};
			
			dialogRef.dialog("option", "buttons", {
				"Submit" : submitFunc,
				"Cancel" : function() {
					dialogRef.dialog("close");
					Planning.Util.enableBtn(saveButton);
				}
			});
			
			dialogRef.dialog('open');
		
		},
		
		getDialogId : function() 
		{
			return this._dialogId;
		},
		
		getEvents : function() 
		{
			return this._events;
		}
};

Parasoft.ModificationEvent.EsignatureEvent = function(metaInfo) {	
	this._dialogId = metaInfo.dialogId;
	this._callback = metaInfo.callback;
	this._disclaimerAlertMsg = metaInfo.disclaimerAlertMsg;
	this._events = metaInfo.events;
	this._message = metaInfo.message;
};

Parasoft.ModificationEvent.EsignatureEvent.prototype = {
		
		openWindow: function(saveButton) 
		{
			var loginInput = document.getElementById('userLogin');
			var passwordInput = document.getElementById('password');
			var disclaimerCheckBox = document.getElementById('disclaimerAgreement');
			
			jQuery('#eventMsg').text(this._message);
			
			var dialogRef = jQuery('#' + this.getDialogId()).dialog( {
				autoOpen: false,
				height: 'auto',
				width: 400,
				modal: true,
				resizable: false,
				title: "Parasoft E-Signature",
				closeOnEscape: false,
				close: function (event, ui) {
					disclaimerCheckBox.checked = false;
					loginInput.value = "";
					passwordInput.value = "";
					Planning.Util.enableBtn(saveButton);
				}
			});
			
			var thisRef = this;
			
			var submitFunc = function() {
				
				if (!disclaimerCheckBox.checked) {
					alert(thisRef._disclaimerAlertMsg);
					return;
				}
				
				var login = loginInput.value;
				var password = passwordInput.value;
				
				var waitDialog = Parasoft.ModificationEvent.createWaitDialog();
				
				jQuery.post('/grs/ModificationEvent',
					{
						action: 'esignatureAction', 
						login: login, 
						password: password, 
						events: Planning.Util.stringifyArray(thisRef.getEvents())
						
					}, 
					function(data)
					{
						var createResult = JSON.parse(data);
						if (createResult.result == "failed") {
							Parasoft.ModificationEvent.handleResult(waitDialog, createResult.message);
						} else if (createResult.result == "warn") {
							dialogRef.dialog("close");
							thisRef._callback();
							Parasoft.ModificationEvent.handleResult(waitDialog, createResult.message);
						} else {
							waitDialog.dialog("close");
							dialogRef.dialog("close");
							thisRef._callback();
						}
					}	
				);
			};
			
			dialogRef.dialog("option", "buttons", {
				"Submit" : submitFunc,
				"Cancel" : function() {
					dialogRef.dialog("close");
					Planning.Util.enableBtn(saveButton);
				}
			});
			
			dialogRef.dialog('open');	
		},


		getDialogId: function()
		{
			return this._dialogId;
		},		
		
		getEvents : function() 
		{
			return this._events;
		}
};
