(function($window, L) {

    "use strict";

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
        simplifyPolygon: true,

        /**
         * @property hullAlgorithm
         * @type {String|Boolean}
         */
        hullAlgorithm: 'wildhoneyConcaveHull',

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
         * @property attemptMerge
         * @type {Boolean}
         */
        attemptMerge: true,

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
         * @property deleteExitMode
         * @type {Boolean}
         */
        deleteExitMode: false,

        /**
         * @property memoriseEachEdge
         * @type {Boolean}
         */
        memoriseEachEdge: true,

        /**
         * @property destroyPrevious
         * @type {Boolean}
         */
        destroyPrevious: false,

        /**
         * @property disablePropagation
         * @type {Boolean}
         */
        disablePropagation: false,

        /**
         * @property elbowDistance
         * @type {Number}
         */
        elbowDistance: 10,

        /**
         * @property onlyInDistance
         * @type {Boolean}
         */
        onlyInDistance: false,

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
         * @method setMemoriseEachEdge
         * @param value {Boolean}
         * @return {void}
         */
        setMemoriseEachEdge: function setMemoriseEachEdge(value) {
            this.memoriseEachEdge = !!value;
        },

        /**
         * @method addElbowOnlyWithinDistance
         * @param value {Boolean}
         */
        addElbowOnlyWithinDistance: function addElbowOnlyWithinDistance(value) {
            this.onlyInDistance = !!value;
        },

        /**
         * @method setPathClipperPadding
         * @param value {Number}
         * @return {void}
         */
        setPathClipperPadding: function setPathClipperPadding(value) {

            // Prevent polygons outside of the viewport from being clipped.
            L.Path.CLIP_PADDING = value;

        },

        /**
         * @method disableStopPropagation
         * @return {void}
         */
        disableStopPropagation: function disableStopPropagation() {
            this.disablePropagation = true;
        },

        /**
         * @method setMaximumDistanceForElbow
         * @param maxDistance {Number}
         * @return {void}
         */
        setMaximumDistanceForElbow: function setMaximumDistanceForElbow(maxDistance) {
            this.elbowDistance = +maxDistance;
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
         * @method exitModeAfterDelete
         * @param value {Boolean}
         * @return {void}
         */
        exitModeAfterDelete: function exitModeAfterDelete(value) {
            this.deleteExitMode = !!value;
        },

        /**
         * @method destroyPreviousPolygon
         * @param value {Boolean}
         * @return {void}
         */
        destroyPreviousPolygon: function destroyPreviousPolygon(value) {
            this.destroyPrevious = !!value;
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

            if (!algorithm) {
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

})(window, window.L);