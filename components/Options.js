(function() {

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
         * @property hullAlgorithms
         * @type {Object}
         */
        hullAlgorithms: {
            'brian3kb/graham_scan_js': 'brian3kbGrahamScan',
            'Wildhoney/ConcaveHull': 'wildhoneyConcaveHull'
        },

        /**
         * @property attemptMerge
         * @type {Boolean}
         */
        attemptMerge: false,

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

            this.hullAlgorithm = this.hullAlgorithms[algorithm];

        }

    };

})();