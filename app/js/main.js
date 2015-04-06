requirejs.config({
    baseUrl: 'js/',
});

requirejs([
    'winstate',
    'configGUI',
    'app'
], function($, _, Backbone, joint, winstate, configGUI, App) {
});
