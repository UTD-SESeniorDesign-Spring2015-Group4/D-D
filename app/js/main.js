/**
 * This is the entry point for the application.
 * RequireJS will run this script immediately after it is loaded.
 *
 * NOTE: Since node-webkit includes Node.js functions, it already
 * has a global "require" function. RequireJS detects this, and creates
 * a global "requirejs" function instead of the "require" it would normally do.
 */

// Configure RequireJS
requirejs.config({
	baseUrl: 'js/',
	paths: {
		'text': '../vendor/requirejs-text/text'
	},
	config: {
		// Force the text plugin to use XHR instead of node file loading.
		text: {
			env: 'xhr'
		}
	}
});

// Start the application.
// If you need a module to be run on application start,
// add it to this array of dependencies.
requirejs([
	'configGUI',
	'app',
	'tools/Toolbox',
	'Palette'
], function (configGUI, App) {
	// Disable brower opening files when dragging onto the window
	window.ondragover = function (e) {
		e.preventDefault();
		return false;
	};
	window.ondrop = function (e) {
		e.preventDefault();
		return false;
	};

	// Configure toastr
	toastr.options.closeButton = true;
}, function (err) {
	// Catch and display any RequireJS errors. Most of the time this caused by forgetting to run npm or bower install.
	console.error(err);
	alert('RequireJS failed to find the required dependencies. If developing, run "npm install" or "bower install" to make sure dependencies are installed.\n\n' + err.stack);

});
