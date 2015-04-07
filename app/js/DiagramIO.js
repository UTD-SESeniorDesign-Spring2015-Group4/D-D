var fs = require('fs');

define([], function () {
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
            console.log("Writing file",json);

        },
        export: function(path) {

        }
    }
});
