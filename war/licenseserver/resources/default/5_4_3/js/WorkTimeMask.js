function WorkTimeMask()
{
	var _D_PATTERN = /[0-9]+\s*(?=d)/ig;
	var _H_PATTERN = /[0-9]+\s*(?=h)/ig;
	var _M_PATTERN = /[0-9]+\s*(?=m)/ig;
	
	var _days = null;
	var _hours = null;
	var _minutes = null;
	
	this.getDays = function()
	{
		return _days;
	}
	
	this.setDays = function(value)
	{
		_days = value;
	}
	
	this.getHours = function()
	{
		return _hours;
	}
	
	this.setHours = function(value)
	{
		_hours = value;
	}	
	
	this.getMinutes = function()
	{
		return _minutes;
	}
	
	this.setMinutes = function(value)
	{
		_minutes = value;
	}
	
	this.parse = function(stringValue)
	{
		if (Planning.Util.isEmptyString(stringValue)) {
			return this;
		}
		if (!isNaN(stringValue)) {
			_days = parseInt(stringValue);
			return this;
		}		
		var match = stringValue.match(_D_PATTERN);
		if ((match != null)) {
			_days = parseInt(match);
		}
		match = stringValue.match(_H_PATTERN);
		if ((match != null)) {
			_hours = parseInt(match);
		}
		match = stringValue.match(_M_PATTERN);
		if ((match != null)) {
			_minutes = parseInt(match);
		}	

		return this;
	}
	
	this.isValid = function(input)
	{
		if (Planning.Util.isEmptyString(input)) {
			return true;
		}
		
		if (!isNaN(input)) {
			return true;
		}
		
		var pattern = /([0-9]+\s*(h|d|m))/gi;
		var validMatcher = input.match(pattern);
		if (validMatcher == null)
		{
			setStatusError("Invalid input: " + input + "\nCorrect format is: [0-9]+d | [0-9]+h | [0-9]+m for example: '1d' or '1d 1h 1m' or '1h'");
			return false;
		}
		var validMatcherString = "";
		for (var i = 0; i < validMatcher.length; i++)
		{
			validMatcherString += validMatcher[i];
		}
		
		var inputNoWhiteSpace = "";
		var char = null;
		for (var i = 0; i < input.length; i++)
		{
			char = input.charAt(i)
			if (!Planning.Util.isEmptyString(char)) {
				inputNoWhiteSpace += char;
			}
		}
		if (validMatcherString != inputNoWhiteSpace) {
			setStatusError("Invalid input: " + input + "\nCorrect format is: [0-9]+d | [0-9]+h | [0-9]+m \nDifferent format is not allowed!");
			return false;	
		}
		var accur = this._getNumerOfAccurances(validMatcherString, _D_PATTERN);
		if (accur > 1) {
			setStatusError("Invalid input: " + input + "\nCorrect format is: [0-9]+d | [0-9]+h | [0-9]+m \nEach group must appear only once!");
			return false;	
		}
		accur = this._getNumerOfAccurances(validMatcherString, _H_PATTERN);
		if (accur > 1) {
			setStatusError("Invalid input: " + input + "\nCorrect format is: [0-9]+d | [0-9]+h | [0-9]+m \nEach group must appear only once!");
			return false;	
		}
		accur = this._getNumerOfAccurances(validMatcherString, _M_PATTERN);
		if (accur > 1) {
			setStatusError("Invalid input: " + input + "\nCorrect format is: [0-9]+d | [0-9]+h | [0-9]+m \nEach group must appear only once!");
			return false;	
		}
		return true;
	}
	
	this._getNumerOfAccurances = function(input, pattern)
	{
		var match = input.match(pattern);
		if (match == null) {
			return 0;
		}
		return match.length;
	}
	
	this.toString = function()
	{
		var res = "";
		if ((_days != null) && (_days > 0)) {
			res += _days + "d ";
		}
		if ((_hours != null) && (_hours > 0)) {
			res += _hours + "h ";
		}
		if ((_minutes != null) && (_minutes > 0)) {
			res += _minutes + "m ";
		}	
		return res;
	}
	
	this.toMaskString = function()
	{
		var res = "";
		res += this._formatNumberForMask(_days) + "d ";
		res += this._formatNumberForMask(_hours) + "h ";
		res += this._formatNumberForMask(_minutes) + "m";
		return res;
	}
	
	this.toJSONString = function()
	{
		var array = new Array();
		if (_days != null) {
			array[array.length] = "days: '" + _days + "'";
		}
		if (_hours != null) {
			array[array.length] = "hours: '" + _hours + "'";
		}
		if (_minutes != null) {
			array[array.length] = "minutes: '" + _minutes + "'";
		}	
		if (Planning.Util.isEmptyArray(array)) {
			array[array.length] = "days: null";
		}
		return "{" + Planning.Util.toCSV(array) + "}";
	}
	
	this._formatNumberForMask = function (value)
	{
		if (value == null) {
			return "00";
		}
		value = new String(value);
		if (value.length == 1) {
			return ("0" + value);
		}
		return value;
	}
}