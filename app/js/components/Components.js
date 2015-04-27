/**
 * Consolidates all components so they do not have to be individually required.
 * This MUST be updated whenever a component is added or removed.
 */
define([
	'./ApplicationServer',
	'./Client',
	'./DatabaseServer',
	'./Loadbalancer',
	'./MiddlewareServer',
	'./Wan',
	'./WebfrontendServer'
], function (ApplicationServer,
             Client,
             DatabaseServer,
             Loadbalancer,
             MiddlewareServer,
             Wan,
             WebfrontendServer) {

	// Create an array of all components.
	var components = [].splice.call(arguments, 0);

	// Create a map between each component type and its component.
	var typeComponentMap = {};
	components.forEach(function (component) {
		typeComponentMap[component.prototype.defaults.type] = component;
	});

	return {
		all: components,
		typeComponentMap: typeComponentMap
	};
});
