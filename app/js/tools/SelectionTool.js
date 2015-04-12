// This is the default mouse tool. Since joint.js already does everything for us we don't need to do anything.
define(['./Tool'], function (Tool) {
    'use strict';

    // These are the listeners that are called whenever
    // the tool is used
    // onActivated: when the tool is chosen from the toolbox
    // onDeactivated: when the tool is deselcted in the toolbox (another tool chosen)
    // onClick: when the canvas is clicked while this tool is active
    return _.defaults({
        name: 'selection',
        icon: 'img/mouse_tool.svg'
    }, Tool);
});