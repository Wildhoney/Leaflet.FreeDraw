(function($window) {

    "use strict";

    /**
     * @module FreeDraw
     * @submodule ConvexHull
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/Leaflet.FreeDraw
     * @constructor
     */
    $window.FreeDraw.ConvexHull = function FreeDrawConvexHull() {};

    /**
     * @property prototype
     * @type {Object}
     */
    $window.FreeDraw.ConvexHull.prototype = {

        /**
         * @method
         * @param points {L.Point[]}
         * @return {L.Point[]}
         */
        brian3kbGrahamScan: function brian3kbGrahamScan(points) {

            var convexHull     = new ConvexHullGrahamScan(),
                resolvedPoints = [];

            points.forEach(function forEach(point) {
                convexHull.addPoint(point.x, point.y);
            }.bind(this));

            var hullPoints = convexHull.getHull();

            hullPoints.forEach(function forEach(hullPoint) {
                resolvedPoints.push(L.point(hullPoint.x, hullPoint.y));
            }.bind(this));

            // Create an unbroken polygon.
            resolvedPoints.push(resolvedPoints[0]);

            return resolvedPoints;

        }

    }

}(window));