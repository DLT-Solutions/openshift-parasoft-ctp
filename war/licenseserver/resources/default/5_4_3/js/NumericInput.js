if (!window.Planning) {
    window.Planning = {};
}

if (!Planning.NumericInput) {
    Planning.NumericInput = {};
}

Planning.NumericInput.onNumericKeyDown = function(sender, event, nonNumericHandler)
{
    if (!Planning.Util.isNumericKeyCode(sender.value, event.keyCode)) {
        sender.style.backgroundColor = "#FF9090";
        var callBackFunc = "Planning.NumericInput.revertBgrColor('" + sender.id + "')";
        setTimeout(callBackFunc,100);
        return false;
    }                     
    if (nonNumericHandler != null) {
    	return nonNumericHandler(sender, event);
    }
    return true;
} 

Planning.NumericInput.revertBgrColor = function(id)
{
	var elem = document.getElementById(id);
	if (elem != null) {
		elem.style.backgroundColor = "";
	}
}