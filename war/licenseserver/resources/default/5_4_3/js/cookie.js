    //Cookie Monster
    function getCookie(NameOfCookie)
    { 
	if (document.cookie.length > 0) { 
	    begin = document.cookie.indexOf(NameOfCookie+"=");
	    if (begin != -1) { 
		begin += NameOfCookie.length+1;
                end = document.cookie.indexOf(";", begin);
	        if (end == -1) end = document.cookie.length;
		return unescape(document.cookie.substring(begin, end)); 
	    }
	}
    return null;
    }

    function setCookie(NameOfCookie, value, expiredays)
    { 
        var ExpireDate = new Date ();
	ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000));
 	document.cookie = NameOfCookie + "=" + escape(value) + "; path=/" +
	    ((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString());
    }

    function delCookie (NameOfCookie)
    { 
        if (getCookie(NameOfCookie)) {
	    document.cookie = NameOfCookie + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
        }
    }
