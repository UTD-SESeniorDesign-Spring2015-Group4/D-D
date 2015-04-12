define(['text!../tmpl/tool.html', './tools/SelectionTool', './tools/LinkTool'], function (tmplToolStr, SelectionTool, LinkTool) {
  'use strict';

  var paper, graph, $toolbox;

  var toolTemplate = _.template(tmplToolStr);

  var tools = [SelectionTool, LinkTool];

  function getToolByName(name) {
    return _.find(tools, function(tool){
      return tool.name === name;
    })
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
    if(oldTool.length != 0) {
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
      var toolHTML = toolTemplate(tool);
      $toolbox.append(toolHTML);

      $('[data-tool='+tool.name+']').click(function(e){
        pickTool(tool);
      });
    });

    pickTool(SelectionTool);

    paper.on('cell:pointerclick', function(cellView) {
      getActiveTool().onClick.apply(graph, arguments);
    });

  }

});
