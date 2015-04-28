/**
 * Logic for the Link Tool.
 * Subclass of Tool.
 */
define(['./Tool'], function (Tool) {
	'use strict';

	/**
	 * Stack to keep track of the order of clicked components.
	 * This is used to determine which two components should be linked together.
	 *
	 * @type {Array}
	 */
	var componentClickStack = [];

	/**
	 * Freeze or unfreeze all components on the graph.
	 * This prevents the components from being moved from their current
	 * locations.
	 *
	 * @param freeze
	 *  True to freeze and false to unfreeze all components on the graph.
	 */
	function freezeComponents(freeze) {
		window.graph.get('cells').forEach(function (cell) {
			window.paper.findViewByModel(cell).options.interactive = !freeze;
		});
	}

	// Fields and functions that override the parent classes definitions.
	return _.defaults({
		name: 'link',
		icon: '../img/link-tool.svg',

		/**
		 * Called when this tool is selected in the toolbox.
		 */
		onActivated: function () {
			freezeComponents(true);
		},

		/**
		 * Called when this tool is deselected in the toolbox or another tool
		 * has been selected.
		 */
		onDeactivated: function () {
			freezeComponents(false);
		},

		/**
		 * Called when a CellView on the canvas has been clicked and this
		 * tool is selected.
		 *
		 * @param cellView
		 *  The CellView that was clicked.
		 */
		onClick: function (cellView) {
			// Ensure we are not trying to link to a link.
			if (!(cellView.model.get('type') === "link")) {
				return;
			}

			// Push the cellView onto the "clicked" stack.
			componentClickStack.push(cellView);

			// If there are two components on the componentClickStack, those two
			// components need to be linked together and the stack cleared.
			if (componentClickStack.length === 2) {
				var element2 = componentClickStack.pop();
				var element1 = componentClickStack.pop();

				// The first element to be clicked is currently red, it should
				// be returned to its default color of #333333.
				element1.model.attr('path/fill', '#333333');

				// Ensure that we are not trying to link an element to itself.
				if (element1 === element2) {
					return;
				}

				// Link the two cells together.
				graph.addCell(new joint.dia.Link({
					source: {
						id: element1.model.id
					},
					target: {
						id: element2.model.id
					},
					router: {
						// This defines the link's style.
						name: 'manhattan'
					}
				}));
			} else {
				// Only one element has been selected. It should have its color
				// changed to red to indicate that it is the first element to be
				// linked.
				var element = componentClickStack[0];
				element.model.attr('path/fill', 'red');
			}
		}
	}, Tool);
});
