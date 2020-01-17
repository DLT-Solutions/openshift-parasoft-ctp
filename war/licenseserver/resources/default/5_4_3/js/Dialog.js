if (!window.Parasoft) {
    window.Parasoft = {};
}

if (!Parasoft.Dialog) {
	Parasoft.Dialog = {};
}

Parasoft.Dialog.alert = function (msg)
{
	var id = "alert";
	Parasoft.Dialog._createModalHtml(id, msg);
	jQuery(function($) {
			$("#" + id).dialog({
				title: resource.ALERT_MODAL_TITLE,
				modal: true,
				resizable: false,
				buttons: {
					OK: function() {
						$(this).dialog('close');
					}
				}
			})
		}
	);
	jQuery(function($) {
		$("#" + id).dialog('open');
    });		
				
}

Parasoft.Dialog.confirm = function (options, events, msg)
{
	var id = "confirm";
	var selector = null;
	var dialogTitle = "Confirm";
	var dialogButton1 = "Confirm";
	var dialogButton2 = "Cancel";
	
	if (options.title) {
		optionsTitle = options.title;
	}
	if (options.okButton) {
		dialogButton1 = options.okButton;
	}
	if (options.cancelButton) {
		dialogButton2 = options.cancelButton;
	}
	if (!options.selector) {
		selector = "#confirm";
		Parasoft.Dialog._createModalHtml(id, msg);		
	} else {
		selector = options.selector;
	}
	
	jQuery(function($) {
			$(selector).dialog({
				title: dialogTitle,
				modal: true,
				resizable: false,
				buttons: {
					OK: function() {
						if (events !=null && events.onOKClicked) {
							events.onOKClicked();
						}
						$(this).dialog('close');
					},
					Cancel: function() {
						if (events !=null && events.onCancelClicked) {
							events.onCancelClicked();
						}
						$(this).dialog('close');
					}
				}
			})
		}
	);
	jQuery(jQuery(selector).next().find("button")[0]).text(dialogButton1);
	jQuery(jQuery(selector).next().find("button")[1]).text(dialogButton2);
	jQuery(function($) {
		$(selector).dialog('open');
    });						
}

Parasoft.Dialog._createModalHtml = function(id, msg)
{
	var mainDiv = document.getElementById(id);
	if (mainDiv != null) {
		mainDiv.parentNode.removeChild(mainDiv);
	}
	
	mainDiv = document.createElement('div');
	mainDiv.id = id;
	mainDiv.style.display = "none";
	mainDiv.className = "alert";
	
	var msgDiv = document.createElement('div');
	msgDiv.innerHTML = msg;
	mainDiv.appendChild(msgDiv);
	
	document.forms[0].appendChild(mainDiv);
}