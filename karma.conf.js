module.exports = function(config) {

    config.set({

        basePath:       '',
        frameworks:     ['jasmine'],
        files:          [
                            'tests/KarmaTests.js',
                            'example/js/vendor/leaflet/dist/leaflet-src.js',
                            'example/js/vendor/evispa-timo-jsclipper/clipper_unminified.js',
                            'example/js/vendor/d3/d3.js',
                            { pattern: 'tests/fixtures/*' },
                            { pattern: 'components/*' }
                        ],
        exclude:        [],
        preprocessors:  {
                            'tests/fixtures/*.html': ['html2js'],
                            'tests/fixtures/*.json': ['html2js']
                        },
        reporters:      ['progress'],
        port:           9876,
        colors:         true,
        logLevel:       config.LOG_INFO,
        autoWatch:      false,
        browsers:       ['Firefox'],
        singleRun:      true

    });

};
