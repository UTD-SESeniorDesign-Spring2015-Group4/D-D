define([
    'text!../tmpl/paletteComponent.html',
    'components/ApplicationServer',
    'components/Client',
    'components/DatabaseServer',
    'components/Loadbalancer',
    'components/MiddlewareServer',
    'components/Wan',
    'components/WebfrontendServer'
], function (tmplPaletteComponentStr, ApplicationServer, Client, DatabaseServer, Loadbalancer, MiddlewareServer, Wan, WebfrontendServer) {
    'use strict';

    var paper, graph, $palette;

    var paletteComponentTemplate= _.template(tmplPaletteComponentStr);

    var palette = [Client, Wan, Loadbalancer, WebfrontendServer, MiddlewareServer, ApplicationServer, DatabaseServer];

    function getComponentByType(type) {
        return _.find(palette, function(component) {
            return component.defaults.type === type;
        });
    }

    $(document).ready(function() {

        // Store globals.
        paper = window.paper;
        graph = window.graph;

        // Cache palette reference
        $palette = $('.palette ul');

        // Set up listeners.
        setupComponents();
    });


    /**
     * Sets up click listeners for the palette components.
     */
    function setupComponents() {
        palette.forEach(function(component) {
            var componentHTML = paletteComponentTemplate(component.prototype.defaults);
            $palette.append(componentHTML);
        });

        $('.component').on('dragstart', function (event) {
            var componentDragged = $(event.target).is('img') ? $(event.target) : $(event.target).children();
            event.originalEvent.dataTransfer.setData('component', componentDragged.data('component'));
        });
    }

});
