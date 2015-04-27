/**
 * Logic for Tools.
 * This should be subclassed by more specific definitions of tools.
 */
define([], function () {
	'use strict';

	// Default fields and functions that should be overwritten by subclasses.
	return {
		name: null,
		icon: null,

		/**
		 * Called when this tool is selected in the toolbox.
		 */
		onActivated: _.noop,

		/**
		 * Called when this tool is deselected in the toolbox or another tool
		 * has been selected.
		 */
		onDeactivated: _.noop,

		/**
		 * Called when a CellView on the canvas has been clicked and this
		 * tool is selected.
		 */
		onClick: _.noop,

		/**
		 * Called when a CellView on the canvas has been double-clicked and
		 * this tool is selected.
		 */
		onDoubleClick: _.noop,

		/**
		 * Called when the mouse is released.
		 */
		onPointerUp: _.noop,

		/**
		 * Called when the mouse is clicked.
		 */
		onPointerDown: _.noop,

		/**
		 * Called when the mouse is moved.
		 */
		onPointerMove: _.noop
	};
});
