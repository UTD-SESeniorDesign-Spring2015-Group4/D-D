var fs = require('fs');

define([], function () {

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
            fs.readFile(path, function(err, data){
                try {
                    if(err)
                        throw err;
                    window.graph.clear();
                    window.graph.fromJSON(JSON.parse(data));
                    cb();
                }
                catch(e) {
                    cb(e);
                }
            });
        },
        write: function(path, cb) {
            var json = window.graph.toJSON();
            fs.writeFile(path, JSON.stringify(json), cb);

        },
        export: function(path, cb) {
            fs.writeFile(path, JSON.stringify(createManifest(window.graph.toJSON())), cb);
        }
    };
});
