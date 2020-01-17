function DateMask()
{	
	this.isValid = function(input)
	{
		if (Planning.Util.isEmptyString(input)) {
			return true;
		}
		
		if (!isNaN(input)) {
			return true;
		}
	    
		var matches = /^([0-9]{4}|[0-9]{2})[.\/-]([0]?[1-9]|[1][0-2])[.\/-]([0]?[1-9]|[1|2][0-9]|[3][0|1])$/.exec(input);
		if (matches == null) {
	    	setStatusError("Invalid value: Start date. A proper start date format is: yyyy-mm-dd.");
	    	return false;
	    }
		clearStatus();
		return true;
	};
	
	this.parse = function(stringValue)
	{
		return stringValue;
	};
	
}