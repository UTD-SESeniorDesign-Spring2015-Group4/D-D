/**
 * This is the initialization script that does some critical
 * configuration before the application loads, then loads
 * RequireJS which will start the application.
 *
 * YOU DO NOT NEED TO TOUCH THIS SCRIPT IF YOU WANT TO MODIFY
 * THE APPLICATION LOGIC. ONLY MODIFY THIS SCRIPT IF YOU KNOW WHAT
 * YOU ARE DOING. If you are looking for the entry point of the
 * application, look at main.js
 */
(function () {

	// Catch uncaught exceptions so they don't crash the entire program
	// TODO: add indicator that program crashed?
	process.on('uncaughtException', function (e) {
		console.error(e, e.stack);
	});

	// Store references to node-webkit API in the global context
	window.nwgui = require('nw.gui');
	window.nwWindow = nwgui.Window.get();

	// Add developer shortcuts that work even if the application crashes.
	document.addEventListener('keydown', function (e) {
		// Ctrl/Cmd + Alt + I : Open Dev Tools
		if ((e.ctrlKey || e.metaKey) && e.altKey && e.keyCode === 'I'.charCodeAt(0))
			window.nwWindow.showDevTools();
		// Ctrl/Cmd + Shift + R : Reload Application
		if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 'R'.charCodeAt(0))
			window.nwWindow.reloadDev();
	});

	// Start RequireJS pipeline by appending the script to the document.
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.setAttribute("data-main", "js/main"); // main entry point requirejs
	script.src = "vendor/requirejs/require.js"; // link to require.js
	document.body.appendChild(script);

}());
