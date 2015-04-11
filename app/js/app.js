define([
  'components/ApplicationServer',
  'components/Client',
  'components/DatabaseServer',
  'components/Loadbalancer',
  'components/MiddlewareServer',
  'components/Wan',
  'components/WebfrontendServer'
], function (ApplicationServer, Client, DatabaseServer, Loadbalancer, MiddlewareServer, Wan, WebfrontendServer) {
  "use strict";

  var $sidebar;
  var $canvas;

  var graph;
  var paper;

  // The component that is currently being dragged.
  var componentDragged;

  $(document).ready(function() {
    setUpCommonQueries();
    setUpPaper();
    setUpDragAndDrop();
  });

  function setUpCommonQueries() {
    $sidebar = $("#sidebar");
    $canvas = $("#canvas");
  }

  /**
   * Set up the paper / graph.
   */
  function setUpPaper() {
    graph = new joint.dia.Graph;
    paper = new joint.dia.Paper({
      el: $canvas,
      width: "100%",
      height: "100%",
      gridSize: 10,
      model: graph
    });
    window.paper = paper;

    $(window).resize(function(){
      var $window = $(window);
      paper.setDimensions($window.width(), $window.height());
    });

    // Expose the graph so it can be accessed by the fileIO code.
    window.graph = graph;
    graph.on('change add remove', function(e){
      graph.set('unsavedChanges', true, {silent: true});
      if(!_.endsWith(document.title, '*'))
        document.title += '*';
    }, graph);
  }

  function setUpDragAndDrop() {
    $canvas.on('drop', dropOnPaper);
    $('.component').on('dragstart', componentDragStart);
  }

  // Drag and drop handlers ////////////////////////////////////////////////////
  function componentDragStart(event) {
    componentDragged = $(event.target).is('img') ? $(event.target) : $(event.target).children();
  }

  function dropOnPaper(event) {
    var scaleFactor = 2;
    var component;
    var type = componentDragged.data('component');

    // Set the size for the new component.
    var size = {
      width: componentDragged.width() * scaleFactor,
      height: componentDragged.height() * scaleFactor
    };

    // Get the offset of the canvas from the window.
    var offset = $canvas.offset();

    // Edit the offset to center the drop point with the icon being dragged.
    offset.left += (componentDragged.width() / 2);
    offset.top -= (componentDragged.height() / 2);

    var position = {
      x: event.originalEvent.clientX - offset.left,
      y: event.originalEvent.clientY + offset.top
    };

    switch(type) {
      case 'Client':
        component = new Client({
          position: position,
          size: size
        });
        break;
      case 'Wan':
        component = new Wan({
          position: position,
          size: size
        });
        break;
      case 'Loadbalancer':
        component = new Loadbalancer({
          position: position,
          size: size
        });
        break;
      case 'WebfrontendServer':
        component = new WebfrontendServer({
          position: position,
          size: size
        });
        break;
      case 'MiddlewareServer':
        component = new MiddlewareServer({
          position: position,
          size: size
        });
        break;
      case 'ApplicationServer':
        component = new ApplicationServer({
          position: position,
          size: size
        });
        break;
      case 'DatabaseServer':
        component = new DatabaseServer({
          position: position,
          size: size
        });
    }

    if (component !== undefined) {
      graph.addCell(component);
    } else {
      Console.log("You have dragged a component of unknown type onto the canvas.");
    }
  }
});
