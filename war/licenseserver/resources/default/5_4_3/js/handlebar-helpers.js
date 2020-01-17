Handlebars.registerHelper('checked', function (currentValue) {
	return currentValue == true ? ' checked ' : '';
});