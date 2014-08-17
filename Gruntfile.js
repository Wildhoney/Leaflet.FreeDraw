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
                src: ['dist/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>.min.js'
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
         * @property karma
         * @type {Object}
         */
        karma: {
            unit: {
                configFile: 'KarmaUnit.js',
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
                dest: 'dist/<%= pkg.name %>.js'
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

    grunt.registerTask('build', ['concat', 'uglify', 'copy', 'compress']);
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['jshint']);

};