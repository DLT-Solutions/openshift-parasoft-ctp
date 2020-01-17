if (!window.Parasoft) {
	window.Parasoft = {};
}

if (!Parasoft.handlebarsHelper) {
	Parasoft.handlebarsHelper = function(options) {
		var source = $('#' + options.template).html();
		var template = Handlebars.compile(source);
		var html = template(options.context);
		return html;
	}
}

Handlebars.registerHelper('altRow', function (rowIndex) {
	if(rowIndex % 2 === 0) {
		return 'altRow';
	}
});