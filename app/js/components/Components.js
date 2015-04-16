// This file keeps references to all components in one place
define([
    './ApplicationServer',
    './Client',
    './DatabaseServer',
    './Loadbalancer',
    './MiddlewareServer',
    './Wan',
    './WebfrontendServer'
], function(ApplicationServer, Client, DatabaseServer, Loadbalancer, MiddlewareServer, Wan, WebfrontendServer){
    var components = [].splice.call(arguments, 0);
    var typeComponentMap = {};
    components.forEach(function(component) {
        typeComponentMap[component.prototype.defaults.type] = component;
    });

    return {
        all: components,
        typeComponentMap: typeComponentMap
    };
});
