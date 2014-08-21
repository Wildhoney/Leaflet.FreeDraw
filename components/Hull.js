(function($window) {

    "use strict";

    /**
     * @module FreeDraw
     * @submodule Hull
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/Leaflet.FreeDraw
     * @constructor
     */
    $window.FreeDraw.Hull = function FreeDrawHull() {};

    /**
     * @property prototype
     * @type {Object}
     */
    $window.FreeDraw.Hull.prototype = {

        /**
         * @property map
         * @type {L.Map|Object}
         */
        map: {},

        /**
         * @method setMap
         * @param map {L.Map}
         * @return {void}
         */
        setMap: function setMap(map) {
            this.map = map;
        },

        /**
         * @link https://github.com/brian3kb/graham_scan_js
         * @method brian3kbGrahamScan
         * @param latLngs {L.LatLng[]}
         * @return {L.Point[]}
         */
        brian3kbGrahamScan: function brian3kbGrahamScan(latLngs) {

            var convexHull     = new ConvexHullGrahamScan(),
                resolvedPoints = [],
                points         = [],
                hullLatLngs    = [];

            latLngs.forEach(function forEach(latLng) {

                // Resolve each latitude/longitude to its respective container point.
                points.push(this.map.latLngToContainerPoint(latLng));

            }.bind(this));

            points.forEach(function forEach(point) {
                convexHull.addPoint(point.x, point.y);
            }.bind(this));

            var hullPoints = convexHull.getHull();

            hullPoints.forEach(function forEach(hullPoint) {
                resolvedPoints.push(L.point(hullPoint.x, hullPoint.y));
            }.bind(this));

            // Create an unbroken polygon.
            resolvedPoints.push(resolvedPoints[0]);

            resolvedPoints.forEach(function forEach(point) {
                hullLatLngs.push(this.map.containerPointToLatLng(point));
            }.bind(this));

            return hullLatLngs;

        },

        wildhoneyConcaveHull: function wildhoneyConcaveHull(latLng) {

        }

    }

}(window));