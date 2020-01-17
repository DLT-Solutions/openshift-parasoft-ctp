/**
 * The hashtable [key, value] implementation in javascript.
 * The key set is not uniq, so that get function can return numer of values. 
 * Similar with remove action, if there are more then one (the same) key then all values will be removed.  
 *
 *
 */
function Hashtable ()
{ 
	var _array = new Array();
	
	/**
	 * This function puts key, value into the hashtable.
	 *
	 */
	this.put = function (key, value)
	{
		//alert("put: key=" + key + " value = " + value);
		_array[_array.length] = new KeyValue(key, value);
	} 
	
	/**
	 * Returns value of first accurance for specified key in hashtable.
	 *
	 */
	this.get = function (key) 
	{
		var values = new Array();
		for (var i = 0; i < _array.length; i++)
		{
			if (_array[i].getKey() == key)
			{
				return _array[i].getValue(); 
			}	
		}
	
		return null;
	}
	
	/**
	 * Returns array with all values for specified key.
	 *
	 */	
	this.getAll = function (key) 
	{
		var values = new Array();
		for (var i = 0; i < _array.length; i++)
		{
			if (_array[i].getKey() == key)
			{
				values[values.length] = _array[i].getValue(); 
			}	
		}
	
		return values;
	}
	 
	/**
	 * Removes all [key, value] pair from the collection (for specified key).
	 * 
	 */		 	
	this.removeAll = function (key) 
	{
		var tmpArray = new Array();
		var wasDeleted = false;
		for (var i = 0; i < _array.length; i++)
		{
			if ((_array[i].getKey() == key) &&
				!wasDeleted)
			{
				wasDeleted = true;
				continue; 
			}	
			tmpArray[tmpArray.length] = _array[i];
		}		
		_array = tmpArray; 
	}
	
	/**
	 * Removes [key, value] pair from the collection (for first accurance of key).
	 * 
	 */
	this.remove = function (key) 
	{
		var tmpArray = new Array();
		for (var i = 0; i < _array.length; i++)
		{
			if (_array[i].getKey() == key)
			{
				continue; 
			}	
			tmpArray[tmpArray.length] = _array[i]; 
		}		
		_array = tmpArray; 
	}	
	
	/**
	 * Cleans the collection.
	 *
	 */
	this.clear = function ()
	{
		_array = new Array();
	}
	
	/**
	 * Return size of the hashtable
	 *
	 */
	this.size = function()
	{
		return _array.length;
	}

	function KeyValue(key, value)
	{
		var _key = key;
		var _value = value;
		
		this.getKey = function () 
		{
			return _key;
		}
	
		this.getValue = function () 
		{
			return _value;
		}
		
		this.equals = function (other) 
		{		
			if (typeof(other) != "KeyValue") {
				return false;
			}
			
			return (_key == other.getKey());		
		}
	}	

}