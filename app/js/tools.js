define([
  'components/ApplicationServer',
  'components/Client',
  'components/DatabaseServer',
  'components/Loadbalancer',
  'components/MiddlewareServer',
  'components/Wan',
  'components/WebfrontendServer'
], function (ApplicationServer, Client, DatabaseServer, Loadbalancer, MiddlewareServer, Wan, WebfrontendServer) {
  'use strict';

  // Cached selectors.
  var $selectTool;
  var $linkTool;

  // Globals.
  var paper;
  var graph;

  // Stack for counting component clicks.
  var componentClickStack = [];

  $(document).ready(function() {
    // Cache selectors.
    $selectTool = $('#select-tool');
    $linkTool = $('#link-tool');

    // Store globals.
    paper = window.paper;
    graph = window.graph;

    // Set up listeners.
    setupToolClickListeners();
    setupLinkListener();
  });

  /**
   * Sets up click listeners for the "tools".
   */
  function setupToolClickListeners() {
    $selectTool.click(function() {
      $selectTool.addClass('active');
      $linkTool.removeClass('active');

      $('html').data('tool', 'select');
      freezeComponents(false);
    });

    $linkTool.click(function() {
      $linkTool.addClass('active');
      $selectTool.removeClass('active');

      $('html').data('tool', 'link');
      freezeComponents(true);
    });
  }

  /**
   * Setup the listener for link creation.
   */
  function setupLinkListener() {
    paper.on('cell:pointerclick', function(cellView) {
      var currentTool = $('html').data('tool');
      console.log(currentTool);

      // Make sure that the link tool is currently active.
      if (currentTool === 'link') {
        componentClickStack.push(cellView);

        if (componentClickStack.length === 2) {
          var element1 = componentClickStack.pop();
          var element2 = componentClickStack.pop();

          // We don't want to like an element to itself.
          if (element1 !== element2) {
            graph.addCell(new joint.dia.Link({
              source: {
                id: element1.model.id
              },
              target: {
                id: element2.model.id
              }
            }));
          }
        }
      }
    });
  }

  /**
   * Freeze or unfreeze all components on the graph.
   *
   * @param freeze
   *  True to freeze and false to unfreeze all components on the graph.
   */
  function freezeComponents(freeze) {
    freeze = (freeze === undefined) ? false : !freeze;

    window.graph.get('cells').forEach(function(cell) {
      window.paper.findViewByModel(cell).options.interactive = freeze;
    });
  }
});
