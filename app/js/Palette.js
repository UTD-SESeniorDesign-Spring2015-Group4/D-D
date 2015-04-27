/**
 * This module sets up and handles the component Palette of the sidebar.
 */
define([
	'text!../tmpl/paletteComponent.html',
	'components/Components'
], function (tmplPaletteComponentStr, Components) {
	'use strict';

	// References to the paper and graph of the application
	var paper, graph;

	// Cached jquery object for the palette element
	var $palette;

	// Flag for whether the palette is enabled or not
	var paletteEnabled;

	// Template for each component of the palette
	var paletteComponentTemplate = _.template(tmplPaletteComponentStr);

	// Array of all components
	var palette = Components.all;

	/**
	 * Searches the palette to find the component that matches the given type.
	 * @param type The type to search for.
	 * @returns {*} The component that was matched. Undefined if there is no match.
	 */
	function getComponentByType(type) {
		return _.find(palette, function (component) {
			return component.defaults.type === type;
		});
	}

	$(document).ready(function () {

		// Store globals.
		paper = window.paper;
		graph = window.graph;

		// Cache palette reference
		$palette = $('.palette ul');

		// Set up listeners.
		setupComponents();
	});


	/**
	 * Creates palette components and sets up drag listeners.
	 */
	function setupComponents() {
		// Create and append template of each component to the palette element
		palette.forEach(function (component) {
			var componentHTML = paletteComponentTemplate(component.prototype.defaults);
			$palette.append(componentHTML);
		});

		// Set up drag listener on component
		$('.component').on('dragstart', function (event) {
			// Do nothing if palette is disabled.
			if (!paletteEnabled) {
				event.preventDefault();
				return false;
			}
			// Put the type of the component in the event's dataTransfer object
			// for the drop event to process.
			var componentDragged = $(event.target).is('img') ? $(event.target) : $(event.target).children();
			event.originalEvent.dataTransfer.setData('component', componentDragged.data('component'));
		});
	}

	/**
	 * Enables or disables the palette.
	 * @param enable Boolean to enable the palette or not.
	 */
	function enablePalette(enable) {
		paletteEnabled = enable;
		if (enable) {
			$palette.parent().removeClass('disabled');
		}
		else {
			$palette.parent().addClass('disabled');
		}
	}

	// Expose the enablePalette function to other modules
	return {
		enablePalette: enablePalette
	};

});
