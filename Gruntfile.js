module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodewebkit: {
      options: {
        build_dir: 'dist',
        linux32: false,
        linux64: false,
        mac: true,
        win: true
      },
      src: 'app/**'
    },
    exec: {
      runNW: {
        cwd: './node_modules/nodewebkit/bin',
        cmd: function() {
          if (process.platform === 'win32') {
            return 'start /b node nodewebkit ../../../app';
          } else {
            return 'nodewebkit ../../../app &';
          }
        }
      }
    },
  });
  grunt.registerTask('build', ['nodewebkit']);
  grunt.registerTask('run', ['exec:runNW']);
  return grunt.registerTask('default', ['run']);
};