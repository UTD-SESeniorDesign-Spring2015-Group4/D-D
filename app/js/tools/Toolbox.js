/**
 * Logic for the Tool Box.
 */
define(
	[
		'text!../../tmpl/tool.html',
		'./../app',
		'./SelectionTool',
		'./LinkTool'
	],
	function (tmplToolStr, app, SelectionTool, LinkTool) {
		'use strict';

		var paper;
		var graph;
		var $toolbox;

		var toolTemplate = _.template(tmplToolStr);

		var tools = [
			SelectionTool,
			LinkTool
		];

		/**
		 * Gets the tool with the provided name.
		 *
		 * @param name
		 *  The name of the tool to get.
		 *
		 * @returns
		 *  The tool with the provided name.
		 */
		function getToolByName(name) {
			return _.find(tools, function (tool) {
				return tool.name === name;
			});
		}

		/**
		 * Gets the active tool.
		 *
		 * @returns
		 *  The active tool.
		 */
		function getActiveTool() {
			return getToolByName($toolbox.find('.active').data('tool'));
		}

		/**
		 * Calls when the page is loaded.
		 */
		$(document).ready(function () {

			// Store globals.
			paper = window.paper;
			graph = window.graph;

			// Cache toolbox reference
			$toolbox = $('.toolbox ul');

			// Set up listeners.
			setupTools();
		});

		/**
		 * Sets up click listeners for the Tools.
		 */
		function setupTools() {
			tools.forEach(function (tool) {
				// Asynchronously load the SVG file to use in the template.
				requirejs(['text!' + tool.icon], function (iconSVG) {
					tool.iconSVG = iconSVG;
					var toolHTML = toolTemplate(tool);
					$toolbox.append(toolHTML);
					$('[data-tool=' + tool.name + ']').click(function (e) {
						pickTool(tool);
					});

					// Pick the default tool.
					if (tool === SelectionTool) {
						pickTool(tool);
					}
				});
			});

			/**
			 * Enable to selected tool.
			 *
			 * @param tool
			 *  The tool to enable.
			 */
			function pickTool(tool) {
				var oldTool = $toolbox.find('.active');
				if (oldTool.length !== 0) {
					getActiveTool().onDeactivated();
					oldTool.removeClass('active');
				}

				$('[data-tool=' + tool.name + ']').addClass('active');
				tool.onActivated();
			}

			/**
			 * Pass "pointerclick" events to the active tool.
			 */
			paper.on('cell:pointerclick', function (cellView) {
				getActiveTool().onClick.apply(graph, arguments);
			});

			/**
			 * Pass "pointerdblclick" events to the active tool.
			 */
			paper.on('cell:pointerdblclick', function (cellView) {
				getActiveTool().onDoubleClick.apply(graph, arguments);
			});

			/**
			 * Pass "pointerup" events to the active tool.
			 */
			paper.on('cell:pointerup', function (cellView) {
				getActiveTool().onPointerUp.apply(graph, arguments);
			});

			/**
			 * Pass "pointerdown" events to the active tool.
			 */
			paper.on('cell:pointerdown', function (cellView) {
				getActiveTool().onPointerDown.apply(graph, arguments);
			});

			/**
			 * Pass "pointermove" events to the active tool.
			 */
			paper.on('cell:pointermove', function (cellView) {
				getActiveTool().onPointerMove.apply(graph, arguments);
			});
		}
	});
