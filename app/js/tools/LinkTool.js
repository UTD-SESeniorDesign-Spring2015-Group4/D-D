// This is the link tool that links two objects together.
define(['./Tool'], function (Tool) {
    'use strict';

    /**
     * Freeze or unfreeze all components on the graph.
     *
     * @param freeze
     *  True to freeze and false to unfreeze all components on the graph.
     */
    function freezeComponents(freeze) {
        window.graph.get('cells').forEach(function(cell) {
            window.paper.findViewByModel(cell).options.interactive = !freeze;
        });
    }

    function highlightComponent(component, highlighted){
        //if (highlighted == true)
        component.highlight("red");
        //else
        //component.highlight("")
    }



    var componentClickStack = [];

    // These are the listeners that are called whenever
    // the tool is used
    // onActivated: when the tool is chosen from the toolbox
    // onDeactivated: when the tool is deselcted in the toolbox (another tool chosen)
    // onClick: when the canvas is clicked while this tool is active
    return _.defaults({
        name: 'link',
        icon: 'img/link-tool.svg',

        onActivated: function() {
            freezeComponents(true);
        },
        onDeactivated: function() {
            freezeComponents(false);
        },
        onClick: function(cellView) {
            highlightComponent(cellView, true);
            componentClickStack.push(cellView);

            if (componentClickStack.length === 2) {
                var element1 = componentClickStack.pop();
                var element2 = componentClickStack.pop();

                // We don't want to link an element to itself.
                if (element1 === element2)
                    return;

                graph.addCell(new joint.dia.Link({
                    source: {
                        id: element1.model.id
                    },
                    target: {
                        id: element2.model.id
                    },
                    router: {
                        name: 'manhattan'
                    }
                }));

            }
        }
    }, Tool);
});