/**
 * This file configures all the tasks used in running/building the project.
 */
module.exports = function (grunt) {
	// load-grunt-tasks automatically handles loading grunt plugins in our package.json
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// This task creates the distributable (portable) release binaries of the project
		// They will be saved to the dist/ directory
		// By default it will only build Windows and Mac binaries
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
			// This executes our app in nodewebkit to test the application with
			runNW: {
				cwd: './node_modules/nodewebkit/bin',
				cmd: function () {
					if (process.platform === 'win32') {
						return 'start /b node nodewebkit ../../../app';
					} else {
						return 'nodewebkit ../../../app &';
					}
				}
			},
			// This executes the nsis-installer maker to create the installer for our application
			// NSIS must be already be installed for this to work
			nsis: {
				cmd: "sleep 5 && \"C:\\Program Files (x86)\\NSIS\\makensis.exe\" install-config.nsi"
			}
		},
		// This task cleans the built files created by other tasks
		clean: {
			default: ['./dist'],
			options: {
				force: true
			}
		},
		// This task checks the javascript source files for syntax errors and reports them
		jshint: {
			js: ['app/js/**/*.js']
		}
	});

	// Creating composite tasks
	grunt.registerTask('build', ['jshint', 'clean', 'nodewebkit:default']);
	grunt.registerTask('build-linux', ['jshint', 'clean', 'nodewebkit:linux']);
	grunt.registerTask('build-installer', ['jshint', 'clean', 'build:windows', 'exec:nsis']);
	grunt.registerTask('run', ['jshint', 'exec:runNW']);
	return grunt.registerTask('default', ['run']);
};