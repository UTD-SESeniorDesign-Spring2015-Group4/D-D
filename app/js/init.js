(function() {

    // Catch uncaught exceptions so they don't crash the entire program
    // TODO: add indicator that program crashed?
    process.on('uncaughtException', function(e) {
        console.error(e, e.stack);
    });

    // Main entry point that gets included in index.html
    // checks for node-webkit before requirejs pipeline.

    // CHECKING FOR NODE-WEBKIT...
    // solves name-conflict with require statement from requirejs
    window.nwgui = require('nw.gui');
    window.nwWindow = nwgui.Window.get();

    // window.requireNode = require;
    // window.require = undefined;

    // START REQUIRE JS PIPELINE...
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.setAttribute("data-main", "js/main"); // main entry point requirejs
    script.src = "vendor/requirejs/require.js"; // link to require.js
    document.body.appendChild(script);

}()); // immediately executed.
