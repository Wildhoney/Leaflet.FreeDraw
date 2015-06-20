(function() {

    "use strict";

    /**
     * @module FreeDraw
     * @submodule Utilities
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/Leaflet.FreeDraw
     */
    L.FreeDraw.Utilities = {

        /**
         * Responsible for converting the multiple polygon points into a MySQL object for
         * geo-spatial queries.
         *
         * @method getMySQLMultiPolygon
         * @param latLngGroups {Array}
         * @return {String}
         */
        getMySQLMultiPolygon: function getMySQLMultiPolygon(latLngGroups) {

            var groups = [];

            latLngGroups.forEach(function forEach(latLngs) {

                var group = [];

                latLngs.forEach(function forEach(latLng) {
                    group.push(latLng.lng + ' ' + latLng.lat);
                });

                groups.push('((' + group.join(',') + '))');

            });

            return 'MULTIPOLYGON(' + groups.join(',') + ')';

        },

        /**
         * Responsible to generating disparate MySQL polygons from the lat/long boundaries.
         *
         * @method getMySQLPolygons
         * @param latLngGroups {L.LatLng[]}
         * @returns {Array}
         */
        getMySQLPolygons: function getMySQLPolygons(latLngGroups) {

            var groups = [];

            latLngGroups.forEach(function forEach(latLngs) {

                var group = [];

                latLngs.forEach(function forEach(latLng) {
                    group.push(latLng.lng + ' ' + latLng.lat);
                });

                groups.push('POLYGON((' + group.join(',') + '))');

            });

            return groups;

        },
        
        /**
         * Responsible to generating JSON object for geo-spatial queries.
         *
         * @method getMySQLPolygons
         * @param latLngGroups {L.LatLng[]}
         * @return {Object}
         */
        getJsonPolygons: function getJsonPolygons(latLngGroups) {

            var groups = [];

            latLngGroups.forEach(function forEach(latLngs) {

                var group = [];

                latLngs.forEach(function forEach(latLng) {
                    group.push('[' + latLng.lng + ', ' + latLng.lat + ']');
                });

                groups.push('{ "latLngs": [' + group.join(', ') + '] }');

            });

            return groups;

        },

        /**
         * @method getMySQLPolygons
         * @param latLngGroups {L.LatLng[]}
         * @param [propertyName="location"] {String}
         * @return {Object}
         */
        getElasticSearchPolygons: function getElasticSearchPolygons(latLngGroups, propertyName) {

            propertyName = propertyName || 'location';

            var groups = [];

            latLngGroups.forEach(function forEach(latLngs) {

                latLngs.forEach(function forEach(latLng) {
                    groups.push({ lat: latLng.lat, lng: latLng.lng });
                });

            });

            /* jshint ignore:start */
            var model = { geo_polygon: {} };
            model.geo_polygon[propertyName] = { points: groups };
            return JSON.stringify(model);
            /* jshint ignore:end */

        }

    };

})();
