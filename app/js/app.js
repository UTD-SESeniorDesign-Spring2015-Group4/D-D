(function () {
  "use strict";

  var $canvas;

  var graph;
  var paper;



  $(document).ready(function() {
    setUpCommonQueries();
    setUpPaper();
  });

  function setUpCommonQueries() {
    $canvas = $("#canvas");
  }

  function setUpPaper() {
    graph = new joint.dia.Graph;
    paper = new joint.dia.Paper({
      el: $canvas,
      width: $canvas.width(),
      height: $canvas.height(),
      gridSize: 10,
      model: graph
    });

    $(window).resize(function(){
      var $window = $(window);
      paper.setDimensions($window.width(), $window.height());
    });

    for (var i = 0; i < 50; i++) {
      var rect = new joint.shapes.basic.Rect({
        position: { x: 50 + i * 10, y: 70 + i * 10 },
        size: { width: 100, height: 40 }
      });
      graph.addCell(rect);
    }
  }


})(jQuery);
