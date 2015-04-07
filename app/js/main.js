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
    'app'
], function(configGUI, App) {
    // Disable brower opening files when dragging onto the window
    window.ondragover = function(e) { e.preventDefault(); return false };
    window.ondrop = function(e) { e.preventDefault(); return false };

    toastr.options.closeButton = true;
});
