(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['policy-list-template'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n	<li class=\"navigation-item\" id=\"policy-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-name=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n		<div class=\"primary-label\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n		<div class=\"secondary-label\">";
  if (helper = helpers.version) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.version); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n	</li>\r\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.policy), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });
templates['policy-tag-template'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"tag-btn\">\r\n	<button type=\"button\" class=\"btn btn-secondary\">\r\n			<span class=\"glyphicon glyphicon-remove\"></span>\r\n			<span class=\"tag\">";
  if (helper = helpers.tag) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.tag); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n	</button>\r\n</li>";
  return buffer;
  });
templates['policy-template'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n					<li class=\"tag-btn\">\r\n						<button type=\"button\" class=\"btn btn-secondary\">\r\n								<span class=\"glyphicon glyphicon-remove\"></span>\r\n								<span class=\"tag\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</span>\r\n						</button>\r\n					</li>\r\n				";
  return buffer;
  }

  buffer += "<div class=\"control-group\" data-id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n	<ul class=\"controls\">\r\n		<div class=\"form-title\">Policy Definition</div>\r\n		<li>\r\n			<label class=\"control-label-right-aligned control-label required\">Name:</label>\r\n			<input id=\"policy-name\" class=\"medium\" type=\"text\" value=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" name=\"name\" maxlength=\"200\"></input>\r\n		</li>\r\n\r\n		<li>\r\n			<label class=\"control-label-right-aligned control-label\">Version:</label>\r\n			<input id=\"policy-version\" class=\"small\" type=\"text\" value=\"";
  if (helper = helpers.version) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.version); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" name=\"version\" maxlength=\"10\"></input>\r\n		</li>\r\n\r\n		<li>\r\n			<label class=\"control-label-right-aligned control-label\">Description:</label>\r\n			<textarea id=\"policy-description\" class=\"medium\" name=\"description\">";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</textarea>\r\n		</li>\r\n\r\n		<li>\r\n			<label class=\"control-label-right-aligned control-label\">Owner:</label>\r\n			<input id=\"policy-owner\" class=\"medium\" type=\"text\" value=\"";
  if (helper = helpers.owner) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.owner); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" name=\"owner\" maxlength=\"200\"></input>\r\n		</li>\r\n\r\n		<li>\r\n			<label class=\"control-label-right-aligned control-label\">Tags:</label>\r\n			<div class=\"input-group\">\r\n				<input class=\"small\" type=\"text\" id=\"tag-input\" maxlength=\"100\"></input>\r\n				<button type=\"button\" class=\"btn btn-primary input-group-btn\" id=\"add-tag-btn\">Add</button>\r\n			</div>\r\n			<ul class=\"controls tag-group\">\r\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.tags), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n			</ul>\r\n		</li>\r\n		<div class=\"form-title\">Policy Practices</div>\r\n		<div class=\"form-indent\">\r\n			<li class=\"practices-form-group\">\r\n				<label class=\"control-label control-label-left-aligned\">Static Analysis</label>\r\n				<ul class=\"controls\">\r\n					<li>\r\n						<input id=\"owasp-checkbox\" type=\"checkbox\" value=\"true\" name=\"staticAnalysis_owaspTop10\" "
    + escapeExpression((helper = helpers.checked || (depth0 && depth0.checked),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.practices)),stack1 == null || stack1 === false ? stack1 : stack1.staticAnalysis_owaspTop10), options) : helperMissing.call(depth0, "checked", ((stack1 = (depth0 && depth0.practices)),stack1 == null || stack1 === false ? stack1 : stack1.staticAnalysis_owaspTop10), options)))
    + "></input>\r\n						<label for=\"owasp-checkbox\" class=\"control-label control-label-left-aligned\">OWASP Top 10</label>\r\n					</li>\r\n					<li>\r\n						<input id=\"misra-checkbox\" type=\"checkbox\" value=\"true\" name=\"staticAnalysis_misraC\" "
    + escapeExpression((helper = helpers.checked || (depth0 && depth0.checked),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.practices)),stack1 == null || stack1 === false ? stack1 : stack1.staticAnalysis_misraC), options) : helperMissing.call(depth0, "checked", ((stack1 = (depth0 && depth0.practices)),stack1 == null || stack1 === false ? stack1 : stack1.staticAnalysis_misraC), options)))
    + "></input>\r\n						<label for=\"misra-checkbox\" class=\"control-label control-label-left-aligned\">MISRA C 2012</label>\r\n					</li>\r\n					<li>\r\n						<input id=\"parasoft-1-checkbox\" type=\"checkbox\" value=\"true\" name=\"staticAnalysis_parasoftLevel1\" "
    + escapeExpression((helper = helpers.checked || (depth0 && depth0.checked),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.practices)),stack1 == null || stack1 === false ? stack1 : stack1.staticAnalysis_parasoftLevel1), options) : helperMissing.call(depth0, "checked", ((stack1 = (depth0 && depth0.practices)),stack1 == null || stack1 === false ? stack1 : stack1.staticAnalysis_parasoftLevel1), options)))
    + "></input>\r\n						<label for=\"parasoft-1-checkbox\" class=\"control-label control-label-left-aligned\">Parasoft Level 1</label>\r\n					</li>\r\n					<li>\r\n						<input id=\"parasoft-2-checkbox\" type=\"checkbox\" value=\"true\" name=\"staticAnalysis_parasoftLevel2\" "
    + escapeExpression((helper = helpers.checked || (depth0 && depth0.checked),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.practices)),stack1 == null || stack1 === false ? stack1 : stack1.staticAnalysis_parasoftLevel2), options) : helperMissing.call(depth0, "checked", ((stack1 = (depth0 && depth0.practices)),stack1 == null || stack1 === false ? stack1 : stack1.staticAnalysis_parasoftLevel2), options)))
    + "></input>\r\n						<label for=\"parasoft-2-checkbox\" class=\"control-label control-label-left-aligned\">Parasoft Level 2</label>\r\n					</li>\r\n					<li>\r\n						<input id=\"parasoft-3-checkbox\" type=\"checkbox\" value=\"true\" name=\"staticAnalysis_parasoftLevel3\" "
    + escapeExpression((helper = helpers.checked || (depth0 && depth0.checked),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.practices)),stack1 == null || stack1 === false ? stack1 : stack1.staticAnalysis_parasoftLevel3), options) : helperMissing.call(depth0, "checked", ((stack1 = (depth0 && depth0.practices)),stack1 == null || stack1 === false ? stack1 : stack1.staticAnalysis_parasoftLevel3), options)))
    + "></input>\r\n						<label for=\"parasoft-3-checkbox\" class=\"control-label control-label-left-aligned\">Parasoft Level 3</label>\r\n					</li>\r\n				</ul>\r\n			</li>\r\n			<li class=\"practices-form-group\">\r\n				<input id=\"unit-test-checkbox\" type=\"checkbox\" value=\"true\" name=\"unitTest\" "
    + escapeExpression((helper = helpers.checked || (depth0 && depth0.checked),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.practices)),stack1 == null || stack1 === false ? stack1 : stack1.unitTest), options) : helperMissing.call(depth0, "checked", ((stack1 = (depth0 && depth0.practices)),stack1 == null || stack1 === false ? stack1 : stack1.unitTest), options)))
    + "></input>\r\n				<label for=\"unit-test-checkbox\" class=\"control-label control-label-left-aligned\">Unit Test</label>\r\n			</li>\r\n			<li class=\"practices-form-group\">\r\n				<input id=\"code-review-checkbox\" type=\"checkbox\" value=\"true\" name=\"codeReview\" "
    + escapeExpression((helper = helpers.checked || (depth0 && depth0.checked),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.practices)),stack1 == null || stack1 === false ? stack1 : stack1.codeReview), options) : helperMissing.call(depth0, "checked", ((stack1 = (depth0 && depth0.practices)),stack1 == null || stack1 === false ? stack1 : stack1.codeReview), options)))
    + "></input>\r\n				<label for=\"code-review-checkbox\" class=\"control-label control-label-left-aligned\">Code Review</label>\r\n			</li>\r\n		</div>\r\n	</ul>\r\n\r\n	<div class=\"toolbar\">\r\n		<button type=\"button\" class=\"btn btn-primary\" id=\"policy-save-btn\">Save</button>\r\n		<button type=\"button\" class=\"btn btn-secondary\" id=\"policy-revert-btn\">Cancel</button>\r\n		<button type=\"button\" class=\"btn btn-link\" id=\"policy-delete-btn\">Delete</button>\r\n	</div>\r\n</div>";
  return buffer;
  });
})();