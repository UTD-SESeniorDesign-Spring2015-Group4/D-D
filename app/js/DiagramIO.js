var fs = require('fs');

define([], function () {

    function createManifest(json) {
        return {
            components: _.map(json.cells, function(i){
                var component = _.pick(i, ['id', 'name', 'type']);
                component.connections = _.map(_.filter(json.cells, {type: 'link', source: {id: component.id}}), function(link){
                    return link.target.id;
                });
                return component;
            })
        }
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
                catch(err) {
                    cb(err);
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
    }
});
