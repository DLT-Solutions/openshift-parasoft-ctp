//requires cookie.js file
if (!window.App) {
    window.App = {};
}

if (!App.Holder) {
    App.Holder = {};
}

_COOKIE_KEY="default-concerto-app";

App.Holder.save = function (appId)
{
	delCookie(_COOKIE_KEY);	
	setCookie(_COOKIE_KEY,appId,365);	
}

App.Holder.get = function (appId)
{
	getCookie(_COOKIE_KEY);		
}