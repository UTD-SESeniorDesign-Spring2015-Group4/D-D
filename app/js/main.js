requirejs.config({
    baseUrl: 'js/',
    paths: {
        'text': '../vendor/requirejs-text/text'
    },
    config: {
        text: {
            env: 'xhr'
        }
    }
});

requirejs([
    'configGUI',
    'app',
    'Toolbox',
    'Palette'
], function(configGUI, App) {
    // Disable brower opening files when dragging onto the window
    window.ondragover = function(e) { e.preventDefault(); return false };
    window.ondrop = function(e) { e.preventDefault(); return false };

    toastr.options.closeButton = true;
}, function(err) {
    console.error(err);
    alert('RequireJS failed to find the required dependencies. If developing, run "npm install" or "bower install" to make sure dependencies are installed.\n\n' + err.stack);

});
