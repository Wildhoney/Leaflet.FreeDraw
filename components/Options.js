(function($window, L, d3, ClipperLib) {

    "use strict";

    /**
     * @method assertClipperJS
     */
    var assertClipperJS = function assertClipperJS() {

        if (typeof ClipperLib === 'undefined') {

            // Ensure JSClipper has been included.
            L.FreeDraw.Throw(
                'JSClipper is a required library for polygon merging and/or simplification',
                'http://sourceforge.net/p/jsclipper/wiki/Home%206/'
            );

        }

    };

    /**
     * @module FreeDraw
     * @submodule Options
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/Leaflet.FreeDraw
     * @constructor
     */
    L.FreeDraw.Options = function FreeDrawOptions() {};

    /**
     * @property prototype
     * @type {Object}
     */
    L.FreeDraw.Options.prototype = {

        /**
         * @property multiplePolygons
         * @type {Boolean}
         */
        multiplePolygons: true,

        /**
         * @property simplifyPolygon
         * @type {Boolean}
         */
        simplifyPolygon: false,

        /**
         * @property hullAlgorithm
         * @type {String|Boolean}
         */
        hullAlgorithm: false,

        /**
         * @property boundariesAfterEdit
         * @type {Boolean}
         */
        boundariesAfterEdit: false,

        /**
         * @property createExitMode
         * @type {Boolean}
         */
        createExitMode: true,

        /**
         * @property deleteExitMode
         * @type {Boolean}
         */
        deleteExitMode: false,

        /**
         * @property hullAlgorithms
         * @type {Object}
         */
        hullAlgorithms: {

            /**
             * @property brian3kb/graham_scan_js
             * @type {Object}
             */
            'brian3kb/graham_scan_js': {
                method: 'brian3kbGrahamScan',
                name: 'Graham Scan JS',
                global: 'ConvexHullGrahamScan',
                link: 'https://github.com/brian3kb/graham_scan_js'
            },

            /**
             * @property Wildhoney/ConcaveHull
             * @type {Object}
             */
            'Wildhoney/ConcaveHull': {
                method: 'wildhoneyConcaveHull',
                name: 'Concave Hull',
                global: 'ConcaveHull',
                link: 'https://github.com/Wildhoney/ConcaveHull'
            }

        },

        /**
         * @property attemptMerge
         * @type {Boolean}
         */
        attemptMerge: false,

        /**
         * @property refineLatLngs
         * @type {Boolean}
         */
        refineLatLngs: true,

        /**
         * @property svgClassName
         * @type {String}
         */
        svgClassName: 'tracer',

        /**
         * @property smoothFactor
         * @type {Number}
         */
        smoothFactor: 5,

        /**
         * @property iconClassName
         * @type {String}
         */
        iconClassName: 'polygon-elbow',

        /**
         * @method allowPolygonMerging
         * @param value {Boolean}
         * @return {void}
         */
        allowPolygonMerging: function allowPolygonMerging(value) {

            assertClipperJS();
            this.attemptMerge = !!value;

        },

        /**
         * @method exitModeAfterCreate
         * @param value {Boolean}
         * @return {void}
         */
        exitModeAfterCreate: function exitModeAfterCreate(value) {
            this.createExitMode = !!value;
        },

        /**
         * @method refineLatLngsOnZoom
         * @param value {Boolean}
         * @return {void}
         */
        refineLatLngsOnZoom: function refineLatLngsOnZoom(value) {
            this.refineLatLngs = !!value;
        },

        /**
         * @method exitModeAfterDelete
         * @param value {Boolean}
         * @return {void}
         */
        exitModeAfterDelete: function exitModeAfterDelete(value) {
            this.deleteExitMode = !!value;
        },

        /**
         * @method allowMultiplePolygons
         * @param allow {Boolean}
         * @return {void}
         */
        allowMultiplePolygons: function allowMultiplePolygons(allow) {
            this.multiplePolygons = !!allow;
        },

        /**
         * @method setSVGClassName
         * @param className {String}
         * @return {void}
         */
        setSVGClassName: function setSVGClassName(className) {
            this.svgClassName = className;
        },

        /**
         * @method setBoundariesAfterEdit
         * @param value {Boolean}
         * @return {void}
         */
        setBoundariesAfterEdit: function setBoundariesAfterEdit(value) {
            this.boundariesAfterEdit = !!value;
        },

        /**
         * @method smoothFactor
         * @param factor {Number}
         * @return {void}
         */
        setSmoothFactor: function setSmoothFactor(factor) {
            this.smoothFactor = +factor;
        },

        /**
         * @method setPolygonSimplification
         * @param value {Boolean}
         * @return {void}
         */
        setPolygonSimplification: function setPolygonSimplification(value) {

            assertClipperJS();
            this.simplifyPolygon = !!value;

        },

        /**
         * @method setIconClassName
         * @param className {String}
         * @return {void}
         */
        setIconClassName: function setIconClassName(className) {
            this.iconClassName = className;
        },

        /**
         * @method setHullAlgorithm
         * @param algorithm {String|Boolean}
         * @return {void}
         */
        setHullAlgorithm: function setHullAlgorithm(algorithm) {

            if (algorithm && !this.hullAlgorithms.hasOwnProperty(algorithm)) {

                // Ensure the passed algorithm is valid.
                return;

            }

            // Resolve the hull algorithm.
            algorithm = this.hullAlgorithms[algorithm];

            if (typeof $window[algorithm.global] === 'undefined') {

                // Ensure hull algorithm module has been included.
                L.FreeDraw.Throw(algorithm.name + ' is a required library for concave/convex hulls', algorithm.link);

            }

            this.hullAlgorithm = algorithm.method;

        }

    };

})(window, window.L, window.d3, window.ClipperLib);