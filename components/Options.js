(function($window) {

    "use strict";

    /**
     * @module FreeDraw
     * @submodule Options
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/Leaflet.FreeDraw
     * @constructor
     */
    $window.FreeDraw.Options = function FreeDrawOptions() {};

    /**
     * @property prototype
     * @type {Object}
     */
    $window.FreeDraw.Options.prototype = {

        /**
         * @property multiplePolygons
         * @type {Boolean}
         */
        multiplePolygons: true,

        /**
         * @property hullAlgorithm
         * @type {String}
         */
        hullAlgorithm: 'brian3kbGrahamScan',

        /**
         * @property hullAlgorithms
         * @type {Object}
         */
        hullAlgorithms: {
            'brian3kb/graham_scan_js': 'brian3kbGrahamScan',
            'Wildhoney/ConcaveHull': 'wildhoneyConcaveHull'
        },

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

            this.hullAlgorithm = this.hullAlgorithms[algorithm];

        }

    };

})(window);