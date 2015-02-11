module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodewebkit: {
      default: {
        options: {
          build_dir: 'dist',
          linux32: false,
          linux64: false,
          mac: true,
          win: true
        },
        src: 'app/**'  
      },
      linux: {
        options: {
          build_dir: 'dist',
          linux32: true,
          linux64: true,
          mac: false,
          win: false
        },
        src: 'app/**'
      },
    windows: {
      options: {
        build_dir: 'dist',
        linux32: false,
        linux64: false,
        mac: false,
        win: true
      },
      src: 'app/**'
    }
      
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
      },
      nsis: {
        cmd: "sleep 5 && \"C:\\Program Files (x86)\\NSIS\\makensis.exe\" install-config.nsi"
      }
    },
  });
  grunt.registerTask('build', ['nodewebkit:default']);
  grunt.registerTask('build-linux', ['nodewebkit:linux']);
  grunt.registerTask('build-installer', ['build:windows', 'exec:nsis']);
  grunt.registerTask('run', ['exec:runNW']);
  return grunt.registerTask('default', ['run']);
};