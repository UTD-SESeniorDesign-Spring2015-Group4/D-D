/**
 * Logic for the Selection Tool.
 * Subclass of Tool.
 */
define(
	[
		'./Tool',
		'../Palette',
		'text!../../tmpl/editComponentDialog.html'
	],
	function (Tool, Palette, tmplEditComponent) {
		'use strict';

		var editComponentTemplate = _.template(tmplEditComponent);

		// Fields and functions that override the parent classes definitions.
		return _.defaults({
			name: 'selection',
			icon: '../img/mouse_tool.svg',

			/**
			 * Called when this tool is selected in the toolbox.
			 */
			onActivated: function () {
				// Allow components to be dragged from the palette onto the
				// canvas.
				Palette.enablePalette(true);
			},

			/**
			 * Called when this tool is deselected in the toolbox or another tool
			 * has been selected.
			 */
			onDeactivated: function () {
				// Disallow components to be dragged form the palette onto the
				// canvas.
				Palette.enablePalette(false);
			},

			/**
			 * Called when a CellView on the canvas has been double-clicked and
			 * this tool is selected.
			 *
			 * @param cellView
			 *  The CellView that was clicked.
			 */
			onDoubleClick: function (cellView) {
				var componentClicked = cellView.model;

				// Display an options menu.
				picoModal({
					content: editComponentTemplate({
						title: 'Edit Component',
						text: 'This diagram has unsaved changes. ',
						componentName: componentClicked.get('name'),
						buttons: {
							btnSave: {
								text: 'Save',
								className: 'pure-button pure-button-primary'
							},
							btnDelete: {
								text: 'Delete Component',
								className: 'pure-button pure-button-danger'
							},
							btnCancel: {
								text: 'Cancel',
								className: 'pure-button'
							}
						}
					}),
					closeButton: false,
					overlayClose: false
				}).afterCreate(function (modal) {
					var $modal = $(modal.modalElem());

					/**
					 * Click listener for the save button.
					 */
					$modal.find('#btnSave').click(function () {
						modal.destroy();
						var componentNameInputValue = $modal.find('#component-name-input').val();
						componentClicked.set('name', componentNameInputValue);
					});

					/**
					 * Click listener for the delete button.
					 */
					$modal.find('#btnDelete').click(function () {
						modal.destroy();
						componentClicked.remove();
					});

					/**
					 * Click listener for the cancel button.
					 */
					$modal.find('#btnCancel').click(function () {
						modal.destroy();
					});

					/**
					 * Override the form submission handler to not actually
					 * submit the form but click the "save" button instead.
					 */
					$modal.find('form').submit(function (e) {
						e.preventDefault();
						$modal.find('#btnSave').click();
					});
				}).show();
			}
		}, Tool);
	});
