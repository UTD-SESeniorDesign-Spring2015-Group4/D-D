requirejs.config({
    baseUrl: 'js/'
});

requirejs([
    'configGUI',
    'app'
], function(configGUI, App) {
    // Disable brower opening files when dragging onto the window
    window.ondragover = function(e) { e.preventDefault(); return false };
    window.ondrop = function(e) { e.preventDefault(); return false };
});
