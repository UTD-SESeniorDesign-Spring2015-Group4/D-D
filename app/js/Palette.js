define([
    'text!../tmpl/paletteComponent.html',
    'components/Components'
], function (tmplPaletteComponentStr, Components) {
    'use strict';

    var paper, graph, $palette;

    var paletteComponentTemplate= _.template(tmplPaletteComponentStr);

    var palette = Components.all;

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
