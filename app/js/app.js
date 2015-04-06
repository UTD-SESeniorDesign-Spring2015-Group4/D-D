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

  function setUpPaper() {
    graph = new joint.dia.Graph;
    paper = new joint.dia.Paper({
      el: $canvas,
      width: "100%",
      height: "100%",
      gridSize: 10,
      model: graph
    });

    $(window).resize(function(){
      var $window = $(window);
      paper.setDimensions($window.width(), $window.height());
    });
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
    var component;
    var type = componentDragged.data('component');

    // Get the offset of the canvas from the window.
    var offset = $canvas.offset();

    // Edit the offset to center the drop point with the icon being dragged.
    offset.left += (componentDragged.width() / 2);
    offset.top -= (componentDragged.height() / 2);

    var position = {
      x: event.originalEvent.clientX - offset.left,
      y: event.originalEvent.clientY + offset.top
    };

    var size = {
      width: componentDragged.width(),
      height: componentDragged.height()
    };

    switch(type) {
      case 'client':
        component = new Client({
          position: position,
          size: size
        });
        break;
      case 'wan':
        component = new Wan({
          position: position,
          size: size
        });
        break;
      case 'loadbalancer':
        component = new Loadbalancer({
          position: position,
          size: size
        });
        break;
      case 'webfrontendserver':
        component = new WebfrontendServer({
          position: position,
          size: size
        });
        break;
      case 'middlewareserver':
        component = new MiddlewareServer({
          position: position,
          size: size
        });
        break;
      case 'applicationserver':
        component = new ApplicationServer({
          position: position,
          size: size
        });
        break;
      case 'databaseserver':
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
