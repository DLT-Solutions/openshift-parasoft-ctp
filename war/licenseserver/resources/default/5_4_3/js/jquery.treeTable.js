/*
 * jQuery treeTable Plugin VERSION
 * http://ludo.cubicphuse.nl/jquery-plugins/treeTable/doc/
 *
 * Copyright 2011, Ludo van den Boom
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function($) {
	// Helps to make options available to all functions
	// TODO: This gives problems when there are both expandable and
	// non-expandable
	// trees on a page. The options shouldn't be global to all these instances!
	var defaultPaddingLeft;
	var persistStore;
	$.fn.treeTable = function(opts) {
		var options = $.extend({}, $.fn.treeTable.defaults, opts);
		// store options to table data
		$(this).data("options", options);
		if (options.persist) {
			persistStore = new Persist.Store(options.persistStoreName);
		}
		return this
				.each(function() {
					$(this)
							.addClass("treeTable")
							.find("tbody tr")
							.each(
									function() {
										// Skip initialized nodes.
										if (!$(this).hasClass('initialized')) {
											var isRootNode = ($(this)[0].className
													.search(options.childPrefix) == -1)
													|| (!parentOf($(this),
															options)[0]);
											// To optimize performance of
											// indentation, I retrieve the
											// padding-left
											// value of the first root node.
											// This way I only have to call
											// +css+
											// once.
											if (isRootNode
													&& isNaN(defaultPaddingLeft)) {
												defaultPaddingLeft = parseInt(
														$(
																$(this)
																		.children(
																				"td")[options.treeColumn])
																.css(
																		'padding-left'),
														10);
											}
											// Set child nodes to initial state
											// if we're in expandable mode.
											if (!isRootNode
													&& options.expandable
													&& options.initialState == "collapsed") {
												$(this).addClass(
														'ui-helper-hidden');
											}
											// If we're not in expandable mode,
											// initialize all nodes.
											// If we're in expandable mode, only
											// initialize root nodes.
											if (!options.expandable
													|| isRootNode) {
												initialize($(this), options);
											}
										}
									});
				});
	};
	$.fn.getOptions = function() {
		var collection = $(this).closest(".treeTable");
		if ((collection == null) || (collection.lenght == 0)) {
			return null;
		}
		var treetable = collection[0];
		return $(treetable).data("options");
	};
	$.fn.treeTable.defaults = {
		childPrefix : "child-of-",
		clickableNodeNames : false,
		expandable : true,
		indent : 19,
		initialState : "collapsed",
		onNodeShow : null,
		onNodeHide : null,
		treeColumn : 0,
		persist : false,
		persistStoreName : 'treeTable',
		stringExpand : "Expand",
		stringCollapse : "Collapse"
	};
	// Expand all nodes
	$.fn.expandAll = function() {
		$(this).find("tr").each(function() {
			$(this).expand();
		});
	};
	// Collapse all nodes
	$.fn.collapseAll = function() {
		$(this).find("tr").each(function() {
			$(this).collapse();
		});
	};
	// Recursively hide all node's children in a tree
	$.fn.collapse = function() {
		var options = $(this).getOptions();
		return this.each(function() {
			$(this).removeClass("expanded").addClass("collapsed");
			if (options.persist) {
				persistNodeState($(this));
			}
			childrenOf($(this), options).each(function() {
				if (!$(this).hasClass("collapsed")) {
					$(this).collapse();
				}
				$(this).addClass('ui-helper-hidden');
				if ($.isFunction(options.onNodeHide)) {
					options.onNodeHide.call(this);
				}
			});
		});
	};
	// Recursively show all node's children in a tree
	$.fn.expand = function() {
		var options = $(this).getOptions();
		return this.each(function() {
			$(this).removeClass("collapsed").addClass("expanded");
			if (options.persist) {
				persistNodeState($(this));
			}
			childrenOf($(this), options).each(function() {
				initialize($(this), options);
				if ($(this).is(".expanded.parent")) {
					$(this).expand();
				}
				$(this).removeClass('ui-helper-hidden');
				if ($.isFunction(options.onNodeShow)) {
					options.onNodeShow.call(this);
				}
			});
		});
	};
	// Reveal a node by expanding all ancestors
	$.fn.reveal = function() {
		var options = $(this).getOptions();
		$(ancestorsOf($(this), options).reverse()).each(function() {
			initialize($(this), options);
			$(this).expand().show();
		});
		return this;
	};
	// Add an entire branch to +destination+
	$.fn.appendBranchTo1 = function(destination, opts) {
		var node = $(this);
		var options = $(this).getOptions();
		var parent = parentOf(node, options);
		var ancestorNames = $.map(ancestorsOf($(destination), options),
				function(a) {
					return a.id;
				});
		// Conditions:
		// 1: +node+ should not be inserted in a location in a branch if this
		// would
		// result in +node+ being an ancestor of itself.
		// 2: +node+ should not have a parent OR the destination should not be
		// the
		// same as +node+'s current parent (this last condition prevents +node+
		// from being moved to the same location where it already is).
		// 3: +node+ should not be inserted as a child of +node+ itself.
		if ($.inArray(node[0].id, ancestorNames) == -1
				&& (!parent || (destination.id != parent[0].id))
				&& destination.id != node[0].id) {
			indent(node, ancestorsOf(node, options).length * options.indent
					* -1, options); // Remove indentation
			if (parent) {
				node.removeClass(options.childPrefix + parent[0].id);
			}
			node.addClass(options.childPrefix + destination.id);
			move(node, destination, options); // Recursively move nodes to new
												// location
			indent(node, ancestorsOf(node, options).length * options.indent,
					options);
			jQuery(destination).removeClass("initialized");
			initialize(jQuery(destination), options);
			if (parent != null) {
				jQuery(parent).removeClass("initialized");
				initialize(jQuery(parent), options);
			}
			if ((opts != null) && opts.onSuccessEvent) {
				opts.onSuccessEvent();
			}
		} else {
			if ((opts != null) && opts.onDeclineEvent) {
				opts.onDeclineEvent();
			}
		}
		return this;
	};
	// Add an entire branch to +destination+
	$.fn.appendBranchTo = function(destination) {
		return $(this).appendBranchTo1(destination, null);
	};
	// Add reverse() function from JS Arrays
	$.fn.reverse = function() {
		return this.pushStack(this.get().reverse(), arguments);
	};
	// Toggle an entire branch
	$.fn.toggleBranch = function() {
		if ($(this).hasClass("collapsed")) {
			$(this).expand();
		} else {
			$(this).collapse();
		}
		return this;
	};
	// === Private functions
	function ancestorsOf(node, options) {
		var ancestors = [];
		while (node = parentOf(node, options)) {
			ancestors[ancestors.length] = node[0];
		}
		return ancestors;
	}
	;
	function childrenOf(node, options) {
		return $(node).siblings("tr." + options.childPrefix + node[0].id);
	}
	;
	function getPaddingLeft(node, options) {
		var paddingLeft = parseInt(node[0].style.paddingLeft, 10);
		return (isNaN(paddingLeft)) ? defaultPaddingLeft : paddingLeft;
	}
	function indent(node, value, options) {
		var cell = $(node.children("td")[options.treeColumn]);
		cell[0].style.paddingLeft = getPaddingLeft(cell, options) + value
				+ "px";
		childrenOf(node, options).each(function() {
			indent($(this), value, options);
		});
	}
	;
	function initialize(node, options) {
		if (!node.hasClass("initialized")) {
			node.addClass("initialized");
			var childNodes = childrenOf(node, options);
			if (!node.hasClass("parent") && childNodes.length > 0) {
				node.addClass("parent");
			}
			if (node.hasClass("parent") && childNodes.length == 0) {
				$(node.children("td")[options.treeColumn]).find(".expander")
						.remove();
				node.removeClass("parent");
			}
			if (node.hasClass("parent")) {
				var cell = $(node.children("td")[options.treeColumn]);
				var padding = getPaddingLeft(cell, options) + options.indent;
				childNodes
						.each(function() {
							$(this).children("td")[options.treeColumn].style.paddingLeft = padding
									+ "px";
						});
				if (options.expandable) {
					var newLink = '<a href="#" title="' + options.stringExpand
							+ '" style="margin-left: -' + options.indent
							+ 'px; padding-left: ' + options.indent
							+ 'px" class="expander"></a>';
					if (options.clickableNodeNames) {
						cell.wrapInner(newLink);
					} else {
						$(newLink).prependTo(cell);
					}
					$(cell[0].firstChild).click(function() {
						node.toggleBranch();
						return false;
					}).mousedown(function() {
						return false;
					});
					$(cell[0].firstChild).keydown(function(e) {
						if (e.keyCode == 13) {
							node.toggleBranch();
							return false;
						}
					});
					if (options.clickableNodeNames) {
						cell[0].style.cursor = "pointer";
						$(cell).click(function(e) {
							// Don't double-toggle if the click is on the
							// existing expander icon
							if (e.target.className != 'expander') {
								node.toggleBranch();
							}
						});
					}
					if (options.persist && getPersistedNodeState(node)) {
						node.addClass('expanded');
					}
					// Check for a class set explicitly by the user, otherwise
					// set the default class
					if (!(node.hasClass("expanded") || node
							.hasClass("collapsed"))) {
						node.addClass(options.initialState);
					}
					if (node.hasClass("expanded")) {
						node.expand();
					}
				}
			}
		}
	}
	;
	function move(node, destination, options) {
		node.insertAfter(destination);
		childrenOf(node, options).reverse().each(function() {
			move($(this), node[0], options);
		});
	}
	;
	function parentOf(node, options) {
		var classNames = node[0].className.split(' ');
		for ( var key = 0; key < classNames.length; key++) {
			if (classNames[key].match(options.childPrefix)) {
				return $(node).siblings(
						"#"
								+ classNames[key]
										.substring(options.childPrefix.length));
			}
		}
		return null;
	}
	;
	// saving state functions, not critical, so will not generate alerts on
	// error
	function persistNodeState(node) {
		if (node.hasClass('expanded')) {
			try {
				persistStore.set(node.attr('id'), '1');
			} catch (err) {
			}
		} else {
			try {
				persistStore.remove(node.attr('id'));
			} catch (err) {
			}
		}
	}
	function getPersistedNodeState(node) {
		try {
			return persistStore.get(node.attr('id')) == '1';
		} catch (err) {
			return false;
		}
	}
})(jQuery);