module.exports = function(grunt) {

    grunt.initConfig({

        /**
         * @property pkg
         * @type {Object}
         */
        pkg: grunt.file.readJSON('package.json'),

        /**
         * @property jshint
         * @type {Object}
         */
        jshint: {
            all: 'components/*.js',
            options: {
                jshintrc: '.jshintrc'
            }
        },

        /**
         * @property uglify
         * @type {Object}
         */
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> by <%= pkg.author %> created on <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['dist/<%= pkg.name %>-src.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        /**
         * @property compress
         * @type {Object}
         */
        compress: {
            main: {
                options: {
                    archive: 'releases/<%= pkg.version %>.zip'
                },
                files: [
                    { flatten: true, src: 'dist/<%= pkg.name %>.js', dest: './', filter: 'isFile' }
                ]
            }
        },

        /**
         * @property jasmine
         * @type {Object}
         */
        jasmine: {
            components: {
                src: ['components/FreeDraw.js', 'components/*.js'],
                options: {
                    specs: 'tests/JasmineTests.js',
                    helpers: ['example/js/vendor/leaflet/dist/leaflet-src.js',
                        'example/js/vendor/concavehull/dist/concavehull.js',
                        'example/js/vendor/d3/d3.js',
                        'example/js/vendor/evispa-timo-jsclipper/clipper_unminified.js']
                }
            }
        },

        /**
         * @property karma
         * @type {Object}
         */
        karma: {
            components: {
                configFile: 'karma.conf.js',
                background: false,
                browsers: ['Firefox']
            }
        },

        /**
         * @property concat
         * @type {Object}
         */
        concat: {
            options: {
                separator: '\n\n'
            },
            dist: {
                src: ['components/FreeDraw.js', 'components/*.js'],
                dest: 'dist/<%= pkg.name %>-src.js'
            }
        },

        /**
         * @property copy
         * @type {Object}
         */
        copy: {
            vendor: {
                expand: true,
                flatten: true,
                src: ['components/*'],
                dest: 'example/js/vendor/<%= pkg.name %>',
                filter: 'isFile'
            }
        }

    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('build', ['concat', 'uglify', 'copy', 'compress']);
    grunt.registerTask('test', ['jshint', 'jasmine', 'karma']);
    grunt.registerTask('default', ['test', 'build']);

};