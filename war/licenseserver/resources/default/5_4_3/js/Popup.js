if (!window.Planning) {
    window.Planning = {};
}

if (!Planning.Popup) {
    Planning.Popup = {};
}

Planning.Popup.popupId = null;
Planning.Popup.openerId = null;

Planning.Popup.open = function (openerElement, targetId)
{
	var pos = Planning.Util.getElementPosition(openerElement);
	var y = pos.y;//Planning.Util.getYCords(openerElement);
	var x = pos.x;//Planning.Util.getXCords(openerElement);
	var yOffset = parseInt(y) + 10;
	var xOffset = parseInt(document.body.clientWidth) - x;
	this.openWithOffset(openerElement, targetId, xOffset, yOffset);
}	

Planning.Popup.openNoOffset = function (openerElement, targetId)
{
	this.openWithOffset(openerElement, targetId, -1, -1);
}

Planning.Popup.openWithOffset = function (openerElement, targetId, xOffset, yOffset)
{	
	if (this.popupId != null) 
	{
		this.close(this.popupId);
	}
	this.popupId = targetId;
	this.openerId = openerElement.id;
	
	var popupElement = document.getElementById(targetId);	 
	if (xOffset >= 0) {		 
		popupElement.style.right = xOffset;
	}
	if (yOffset >= 0) {
		popupElement.style.top = yOffset;
	}
	popupElement.style.display = "block";
	popupElement.style.position = "absolute";
}

Planning.Popup.close = function (targetId)
{
	var popupElement = document.getElementById(targetId);
	popupElement.style.display = "none";
	popupElement.style.position = "";
	this.popupId = null;
	this.openerId = null;	
}

Planning.Popup.move = function ()
{
	if ((this.openerId != null) && 
			(this.popup != null))
	{			
		this.open(document.getElementById(openerId), this.popupId);	    			
	}
}

window.onresize = Planning.Popup.move;