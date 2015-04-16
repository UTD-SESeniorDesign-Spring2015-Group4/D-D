// This is the base class for all tools. Don't actually use an instance of this, extend it and use that.
define([], function () {
    'use strict';

    // These are the listeners that are called whenever
    // the tool is used
    // onActivated: when the tool is chosen from the toolbox
    // onDeactivated: when the tool is deselected in the toolbox (another tool chosen)
    // onClick: when the canvas is clicked while this tool is active
    //
    // Subclasses also need to specify a name and icon for the toolbox to use
    return {
        name: null,
        icon: null,
        onActivated: _.noop,
        onDeactivated: _.noop,
        onClick: _.noop,
        onPointerUp: _.noop,
        onPointerDown: _.noop,
        onPointerMove: _.noop,
        onMouseOver: _.noop,
        onMouseOut: _.noop
    };
});
