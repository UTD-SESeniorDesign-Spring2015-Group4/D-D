var fs = require('fs');

define(['./components/Components'], function (Components) {

    function createManifest(json) {
        return {
            components: _(json.cells)
                .map(function(c) {
                    var component = _.pick(c, ['id', 'name', 'type']);
                    component.connections = _(json.cells)
                        .filter(function(l) {
                            return l.type === 'link' && (l.source.id === component.id || l.target.id === component.id);
                        })
                        .map(function(l) {
                            return l.target.id === component.id ? l.source.id : l.target.id;
                        });
                    return component;
                }).filter(function(c) {
                    return c.type !== 'link';
                })
        };
    }

    return {
        read: function(path, cb) {
            cb = cb || $.noop;
            fs.readFile(path, function(err, data){
                try {
                    if(err)
                        throw err;
                    window.graph.clear();
                    var json = JSON.parse(data),
                        links = [];
                    json.cells.forEach(function(cell){
                        var type = cell.type;
                        // Cell is a component
                        if(type !== 'link') {
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
                catch(e) {
                    cb(e);
                }
            });
        },
        write: function(path, cb) {
            cb = cb || $.noop;
            var json = window.graph.toJSON();
            fs.writeFile(path, JSON.stringify(json), cb);

        },
        export: function(path, cb) {
            cb = cb || $.noop;
            fs.writeFile(path, JSON.stringify(createManifest(window.graph.toJSON())), cb);
        }
    };
});
