define([
	'components/Components',
	'./configGUI'
], function (Components, configGUI) {
	"use strict";

	// Cached references to commonly accessed selectors.
	var $sidebar;
	var $canvas;

	var graph;
	var paper;

	/**
	 * Called when the page has finished loading.
	 */
	$(document).ready(function () {
		setUpCommonQueries();
		setUpPaper();
		setUpDragAndDrop();

		// Open a diagram file if specified by command line arguments
		// This also happens if you drag a file onto the executable
		if (nwgui.App.argv.length !== 0) {
			configGUI.open(nwgui.App.argv[0]);
		}
	});

	/**
	 * Cache references to commonly accessed selectors.
	 */
	function setUpCommonQueries() {
		$sidebar = $("#sidebar");
		$canvas = $("#canvas");
	}

	/**
	 * Set up the paper / graph.
	 */
	function setUpPaper() {
		graph = new joint.dia.Graph();
		paper = new joint.dia.Paper({
			el: $canvas,
			width: "100%",
			height: "100%",
			gridSize: 10,
			model: graph
		});
		window.paper = paper;

		$(window).resize(function () {
			var $window = $(window);
			paper.setDimensions($window.width(), $window.height());
		});

		// Expose the graph so it can be accessed by the fileIO code.
		window.graph = graph;
		graph.on('change add remove', function (e) {
			graph.set('unsavedChanges', true, {silent: true});
			if (!_.endsWith(document.title, '*'))
				document.title += '*';
		}, graph);
	}

	/**
	 * Enable dropping of components on the paper.
	 */
	function setUpDragAndDrop() {
		$canvas.on('drop', dropOnPaper);
	}

	/**
	 * Drop handler for dropping of components on the paper.
	 *
	 * @param event
	 *  The drop event.
	 */
	function dropOnPaper(event) {
		var scaleFactor = 2;
		var component;
		var type = event.originalEvent.dataTransfer.getData('component');
		var componentDragged = $('[data-component=' + type + ']');

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

		// Create a component of the correct type.
		var SomeSubclassOfComponent = Components.typeComponentMap[type];
		component = new SomeSubclassOfComponent({
			position: position,
			size: size
		});

		if (component !== undefined) {
			graph.addCell(component);
		} else {
			Console.log("You have dragged a component of unknown type onto the canvas.");
		}
	}
});
