/**
 * This module configures the native GUI parts of node-webkit,
 * such as the window, menu bar, file dialogs, and keyboard shortcuts
 */
define([
	'./DiagramIO',
	'text!../tmpl/dialog.html'
], function (DiagramIO, tmplDialog) {
	// Get native UI API
	var gui = window.nwgui;

	// Test to see if this application is running on a Mac
	var isMac = process.platform === 'darwin';

	// Create dialog template function
	var dialogTemplate = _.template(tmplDialog);

	// Promise for file dialogs that is resolved/rejected when the user makes a choice
	var dialogPromise;

	setupMenu();
	setupFileDialogs();
	setupKeyboardShortcuts();
	setupWindow();

	/**
	 * Sets the path associated with the currently loaded diagram.
	 * @param path The path to associate.
	 */
	function setDiagramPath(path) {
		window.graph.set('path', path, {silent: true});
		window.graph.set('unsavedChanges', false, {silent: true});
		document.title = 'D&D' + (path ? ' - ' + path : '');
	}

	/**
	 * Discards the current diagram and creates new diagram.
	 * Will prompt user to save if there are unsaved changes.
	 */
	function newDiagram() {
		confirmCloseDiagram('Save before creating new empty diagram?', function () {
			window.graph.clear();
			setDiagramPath(undefined);
			toastr.success('Created new empty diagram', 'New Diagram');
		});
	}

	/**
	 * Opens a file dialog to open and load a diagram from file.
	 * Will prompt user to save if there are unsaved changes.
	 */
	function openDiagram() {
		confirmCloseDiagram('Save before opening another diagram?', showOpenFileDialog);
	}

	/**
	 * Quits the application.
	 */
	function quit() {
		nwWindow.close();
	}

	/**
	 * Saves the diagram. If there is a path associated with the diagram
	 * via setDiagramPath() then it will use that path, otherwise it will
	 * prompt the user with a file dialog to set a save path.
	 * @param cb Callback function that is called on successful save.
	 */
	function saveDiagram(cb) {
		// Default callback is noop
		cb = cb || $.noop;
		var path = window.graph.get('path');
		// If path exists, just write to that path
		if (path) {
			DiagramIO.write(path, function (err) {
				if (!err) {
					toastr.success('Saved diagram to ' + path, 'Sucessfully Saved');
					setDiagramPath(path);
					cb();
				}
				else
					toastr.error(err, 'Error');
			});
		}
		// Else ask for a save dialog and save there.
		else
			showSaveFileDialog().then(cb);
	}

	/**
	 * Prompts user for a save location and saves the diagram to that location.
	 */
	function saveDiagramAs() {
		showSaveFileDialog();
	}

	/**
	 * Prompts the user for an export location and exports the diagram to a .manf
	 * file at that location
	 */
	function exportDiagram() {
		showExportFileDialog();
	}

	/**
	 * Triggers a file input element to show its file dialog.
	 * @param selector The selector for the file input element to trigger.
	 * @returns {Promise} A Promise that is resolved/rejected when the user finishes making their choice.
	 */
	function showFileDialog(selector) {
		var $dialog = $(selector);
		// Clear the value so opening the same file triggers a change
		$dialog.val('');
		// Click on file input so file dialog opens
		$dialog.click();

		dialogPromise = $.Deferred();
		return dialogPromise;
	}

	/**
	 * Convenience functions for using showFileDialog() on certain dialogs.
	 */
	var showOpenFileDialog = _.partial(showFileDialog, '#openFileDialog');
	var showSaveFileDialog = _.partial(showFileDialog, '#saveFileDialog');
	var showExportFileDialog = _.partial(showFileDialog, '#exportFileDialog');

	/**
	 * Displays a modal to confirm an action that will close the currently
	 * opened diagram.
	 * @param text The supplementary text to show in the modal.
	 * @param func Callback action to perform if user confirms closing the diagram.
	 */
	function confirmCloseDiagram(text, func) {
		// Only show if there are unsaved changes
		if (window.graph.get('unsavedChanges')) {
			// Create the modal
			picoModal({
				content: dialogTemplate({
					title: 'Save Changes?',
					text: 'This diagram has unsaved changes. ' + text,
					buttons: {
						btnSave: {
							text: 'Save',
							className: 'pure-button pure-button-primary'
						},
						btnDontSave: {
							text: 'Don\'t Save',
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
				// Bind click handlers to the buttons in the modal
				var $modal = $(modal.modalElem());
				$modal.find('#btnSave').click(function () {
					modal.destroy();
					saveDiagram(func);
				});
				$modal.find('#btnDontSave').click(function () {
					modal.destroy();
					func();
				});
				$modal.find('#btnCancel').click(function () {
					modal.destroy();
				});
			}).show();
		}
		// No unsaved changes, just call the callback immediately
		else
			func();
	}

	/**
	 * Sets up the change listeners on the file dialogs,
	 * so that they do something when the user picks a file.
	 */
	function setupFileDialogs() {
		// Setup the open file dialog
		$('#openFileDialog').change(function (e) {
			// Ignore empty values, we clear the value to allow opening the same file again
			if (this.value === '') return;
			var path = this.files[0].path;

			// Read in the file
			DiagramIO.read(path, function (err) {
				if (!err) {
					toastr.success('Opened diagram from ' + path, 'Successfully Opened');
					// Associate the path we just opened
					setDiagramPath(path);
					// Resolve the promise, we're done with the open action
					dialogPromise.resolve();
				}
				else
					toastr.error(err, 'Error');
			});
		});

		// Setup the save file dialog
		$('#saveFileDialog').change(function (e) {
			// Ignore empty values, we clear the value to allow opening the same file again
			if (this.value === '') return;
			var path = this.files[0].path;

			// Write to the file
			DiagramIO.write(path, function (err) {
				if (!err) {
					toastr.success('Saved diagram to ' + path, 'Successfully Saved');
					// Associate the path we just wrote to
					setDiagramPath(path);
					// Resolve the promise, we're done with the save action
					dialogPromise.resolve();
				}
				else
					toastr.error(err, 'Error');
			});
		});

		// Setup the export file dialog
		$('#exportFileDialog').change(function (e) {
			// Ignore empty values, we clear the value to allow opening the same file again
			if (this.value === '') return;
			var path = this.files[0].path;

			// Export to the file
			DiagramIO.export(path, function (err) {
				if (!err) {
					toastr.success('Exported manifest to ' + path, 'Successfully exported');
					// Resolve the promise, we're done with the export action
					dialogPromise.resolve();
				}
			});
		});
	}

	/**
	 * Sets up the native GUI menubar for the application
	 */
	function setupMenu() {
		// Create an empty menu
		var menu = new gui.Menu({type: 'menubar'});

		// Show the appropriate modifier on Macs vs not Macs
		var mod = isMac ? '⌘' : 'Ctrl';

		// Empty app menu when running on Mac
		if (isMac)
			menu.append(new gui.MenuItem({label: 'D&D'}));

		// File menu
		var fileMenu = new gui.MenuItem({
			label: 'File',
			submenu: new gui.Menu()
		});

		fileMenu.submenu.append(new gui.MenuItem({
			label: 'New (' + mod + '+N)',
			click: newDiagram
		}));

		fileMenu.submenu.append(new gui.MenuItem({
			type: 'separator'
		}));

		fileMenu.submenu.append(new gui.MenuItem({
			label: 'Open (' + mod + '+O)',
			click: openDiagram
		}));

		fileMenu.submenu.append(new gui.MenuItem({
			label: 'Save (' + mod + '+S)',
			click: saveDiagram
		}));

		fileMenu.submenu.append(new gui.MenuItem({
			label: 'Save As (' + mod + '+Shift+S)',
			click: saveDiagramAs
		}));

		fileMenu.submenu.append(new gui.MenuItem({
			label: 'Export (' + mod + '+E)',
			click: exportDiagram
		}));

		fileMenu.submenu.append(new gui.MenuItem({
			type: 'separator'
		}));

		fileMenu.submenu.append(new gui.MenuItem({
			label: 'Quit (' + mod + '+Q)',
			click: function () {
				gui.App.closeAllWindows();
			}
		}));

		// Add File menu to the menubar
		menu.append(fileMenu);

		// Assign this as the window menu
		window.nwWindow.menu = menu;
	}

	/**
	 * Sets up the application shortcuts.
	 */
	function setupKeyboardShortcuts() {

		document.addEventListener('keydown', function (e) {
			// Application shortcuts
			// Ctrl/Cmd + N : New Diagram
			if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.keyCode === 'N'.charCodeAt(0))
				newDiagram();
			// Ctrl/Cmd + O : Open Diagram
			if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.keyCode === 'O'.charCodeAt(0))
				openDiagram();
			// Ctrl/Cmd + S : Save Diagram
			if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.keyCode === 'S'.charCodeAt(0))
				saveDiagram();
			// Ctrl/Cmd + Shift + S : Save Diagram As..
			if ((e.ctrlKey || e.metaKey) && !e.altKey && e.shiftKey && e.keyCode === 'S'.charCodeAt(0))
				saveDiagramAs();
			// Ctrl/Cmd + E : Export Diagram
			if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.keyCode === 'E'.charCodeAt(0))
				exportDiagram();
			// Ctrl/Cmd + Q : Save Diagram
			if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.keyCode === 'Q'.charCodeAt(0))
				quit();
		});
	}

	/**
	 * Sets up the application window.
	 */
	function setupWindow() {
		// Show a confirm dialog when closing the window.
		nwWindow.on('close', function () {
			confirmCloseDiagram('Save before closing?', function () {
				nwWindow.close(true);
			});
		});
	}

	// Expose a function to open a diagram from a filepath.
	// We use this in app.js to load files passed in the command line arguments.
	return {
		open: function (path) {
			DiagramIO.read(path, function (err) {
				if (!err) {
					toastr.success('Opened diagram from ' + path, 'Successfully Opened');
					setDiagramPath(path);
				}
				else
					toastr.error(err, 'Error');
			});
		}
	};
});
