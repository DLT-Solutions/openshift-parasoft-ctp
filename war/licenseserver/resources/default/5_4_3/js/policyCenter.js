if (window.Parasoft === undefined) {
	window.Parasoft = {};
}

if (Parasoft.PolicyCenter === undefined) {
	Parasoft.PolicyCenter = function() {

	};
}

Parasoft.PolicyCenter.prototype = {
	init: function() {
		this.attachButtons();
	},

	attachButtons: function() {
		jQuery('#new-policy').click(function() {
			var html = Parasoft.PolicyTemplates.PolicyTemplate({});
			jQuery('.checkerContent').hide();
			jQuery('.new-checker-settings').empty().append(html);
		});
	}
};

jQuery(function() {
	if (Parasoft.PolicyTemplates === undefined) {
		Parasoft.PolicyTemplates = {};
		Parasoft.PolicyTemplates.PolicyTemplate = Handlebars.compile(jQuery("#policy-template").html());
	}
	var policyCenter = new Parasoft.PolicyCenter();
	policyCenter.init();
	

	var policyListContext = {
		policy: [
			{
				name: 'OWASP Policy',
				version: '1.0'
			},
			{
				name: 'MISRA Policy',
				version: '1.0'
			}
		]
	};


	var policyListSource = jQuery("#policy-list-template").html();
	var policyListTemplate = Handlebars.compile(policyListSource);
	var policyList = policyListTemplate(policyListContext);
	jQuery('#ten-x-policies').append(policyList);

	jQuery('.rich-list-item').click(function() {
		jQuery('.reset-button .btn, .save-button .btn').each(function() {
			jQuery(this).removeClass('disabled').attr('disabled', false);
		});
	});

	jQuery('.navigation-item a').click(function() {
		jQuery('.reset-button .btn, .save-button .btn').each(function() {
			jQuery(this).addClass('disabled').attr('disabled', true);
		});
		jQuery('.ten-x-policy.selected, .checkers li .active, .checkers li .psactivedisabled, .checkers li a.activedirty, .checkers li a.psactivedisableddirty').removeClass('active psactivedisabled activedirty psactivedisabledirty selected');
		jQuery('.navigation-item.selected').removeClass('selected');
		jQuery(this).parents('.navigation-item').addClass('selected');
		var source   = jQuery("#policy-template").html();
		var policyTemplate = Handlebars.compile(source);
		var context = {
			id: 1,
			name: 'OWASP Policy',
			isEnabled: true,
			version: '1.0',
			description: 'This is the description for this policy',
			owner: 'jonathan',
			tags: ['something', 'nothing', 'parasoft'],
			practices: {
				staticAnalysis: true,
				owasp: true,
				misra: true,
				unitTest: false,
				codeReview: false
			}
		};
		var html = policyTemplate(context);
		jQuery('.checkerContent').hide();
		jQuery('.new-checker-settings').empty().append(html);
	});

	
});