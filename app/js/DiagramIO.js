/**
 * This module handles the reading and writing of diagram and manifest files.
 */

var fs = require('fs');

define(['./components/Components'], function (Components) {

	/**
	 * Creates a manifest JSON object from the JSON of the diagram Graph.
	 * @param json The JSON representation of the Graph of the diagram to create a manifest for.
	 * @returns {{components: *}} Returns the JSON object representation of the manifest file.
	 */
	function createManifest(json) {
		return {
			components: _(json.cells)
				.map(function (c) {
					var component = _.pick(c, ['id', 'name', 'type']);
					component.connections = _(json.cells)
						.filter(function (l) {
							return l.type === 'link' && (l.source.id === component.id || l.target.id === component.id);
						})
						.map(function (l) {
							return l.target.id === component.id ? l.source.id : l.target.id;
						});
					return component;
				}).filter(function (c) {
					return c.type !== 'link';
				})
		};
	}

	// Expose functions to be used by other modules.
	return {
		/**
		 * Reads and loads a diagram file.
		 * @param path The path of the diagram file.
		 * @param cb Callback to call on completion. If there is an error, the first argument will be the error, otherwise it is undefined.
		 */
		read: function (path, cb) {
			// Default callback is noop
			cb = cb || $.noop;
			// Read the file using node's fs module
			fs.readFile(path, function (err, data) {
				try {
					if (err)
						throw err;
					// Clear the current diagram
					window.graph.clear();
					// Parse the data as JSON
					var json = JSON.parse(data),
						links = [];

					// Recreate each cell as its corresponding class and add it to the diagram
					// We do this so we can have all the functionality of the classes after
					// loading the file.
					// NOTE: Do not try to use Graph.fromJSON(). It will just create the SVGs for
					// the diagram, but the components will not have any of their functions from
					// Component.js
					json.cells.forEach(function (cell) {
						var type = cell.type;
						// Cell is a component
						if (type !== 'link') {
							var SomeSubclassOfComponent = Components.typeComponentMap[type];
							var component = new SomeSubclassOfComponent(
								_.pick(cell, ['position', 'size', 'angle', 'name', 'id', 'z'])
							);
							graph.addCell(component);
						}
						// Cell is a link
						else {
							var link = new joint.dia.Link(
								_.pick(cell, ['source', 'target', 'router', 'id', 'z'])
							);
							links.push(link);
						}
					});
					// Add links later just incase there's an issue trying to add links to components that don't exist
					graph.addCells(links);
					cb();
				}
				catch (e) {
					cb(e);
				}
			});
		},

		/**
		 * Write the current diagram to file.
		 * @param path The path of the file to write to.
		 * @param cb Callback to call on completion. If there is an error, the first argument will be the error, otherwise it is undefined.
		 */
		write: function (path, cb) {
			// Default callback is noop
			cb = cb || $.noop;
			var json = window.graph.toJSON();
			fs.writeFile(path, JSON.stringify(json), cb);

		},

		/**
		 * Export the current diagram to file.
		 * @param path The path of the file to write to.
		 * @param cb Callback to call on completion. If there is an error, the first argument will be the error, otherwise it is undefined.
		 */
		export: function (path, cb) {
			// Default callback is noop
			cb = cb || $.noop;
			fs.writeFile(path, JSON.stringify(createManifest(window.graph.toJSON())), cb);
		}
	};
});
