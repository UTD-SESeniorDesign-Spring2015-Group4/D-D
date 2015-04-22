define(['text!../../tmpl/tool.html', './../app', './SelectionTool', './LinkTool'], function (tmplToolStr, app, SelectionTool, LinkTool) {
  'use strict';

  var paper, graph, $toolbox;

  var toolTemplate = _.template(tmplToolStr);

  var tools = [SelectionTool, LinkTool];

  function getToolByName(name) {
    return _.find(tools, function(tool){
      return tool.name === name;
    });
  }

  function getActiveTool() {
    return getToolByName($toolbox.find('.active').data('tool'));
  }

  $(document).ready(function() {

    // Store globals.
    paper = window.paper;
    graph = window.graph;

    // Cache toolbox reference
    $toolbox = $('.toolbox ul');

    // Set up listeners.
    setupTools();
  });

  function pickTool(tool) {
    var oldTool = $toolbox.find('.active');
    if(oldTool.length !== 0) {
      getActiveTool().onDeactivated();
      oldTool.removeClass('active');
    }

    $('[data-tool='+tool.name+']').addClass('active');
    tool.onActivated();
  }

  /**
   * Sets up click listeners for the "tools".
   */
  function setupTools() {
    tools.forEach(function(tool){
      // Asynchronously load the SVG file to use in the template
      requirejs(['text!' + tool.icon], function(iconSVG){
        tool.iconSVG = iconSVG;
        var toolHTML = toolTemplate(tool);
        $toolbox.append(toolHTML);
        $('[data-tool='+tool.name+']').click(function(e){
          pickTool(tool);
        });

        // Pick default tool
        if (tool === SelectionTool) {
          pickTool(tool);
        }
      });



    });
    paper.on('cell:pointerclick', function(cellView) {
      getActiveTool().onClick.apply(graph, arguments);
    });

    paper.on('cell:pointerdblclick', function(cellView) {
      getActiveTool().onDoubleClick.apply(graph, arguments);
    });

    paper.on('cell:pointerup', function(cellView) {
      getActiveTool().onPointerUp.apply(graph, arguments);
    });

    paper.on('cell:pointerdown', function(cellView) {
      getActiveTool().onPointerDown.apply(graph, arguments);
    });

    paper.on('cell:pointermove', function(cellView) {
      getActiveTool().onPointerMove.apply(graph, arguments);
    });

  }
});
