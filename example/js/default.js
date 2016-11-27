import L from 'leaflet';
import FreeDraw, { VIEW, CREATE, EDIT, DELETE, APPEND, ALL } from '../../src/FreeDraw';

import { module } from 'angular';

module('leafletApp', []).controller('MapController', function MapController($scope) {

    /**
     * @constant MODES
     * @type {Object}
     */
    $scope.MODES = { CREATE, EDIT, DELETE, APPEND, VIEW };

    /**
     * @property mode
     * @type {Number}
     */
    $scope.mode = ALL;

    /**
     * @method isDisabled
     * @param mode {Number}
     * @returns {Boolean}
     */
    $scope.isDisabled = function isDisabled(mode) {
        return !(mode & $scope.mode);
    };

    /**
     * @method stopPropagation
     * @param {Object} event
     * @return {void}
     */
    $scope.stopPropagation = function stopPropagation(event) {
        event.stopPropagation();
    };

    /**
     * @method toggleMode
     * @param mode {Number}
     * @return {void}
     */
    $scope.toggleMode = function toggleMode(mode) {

        if ($scope.isDisabled(mode)) {

            // Enabled the mode.
            $scope.mode = $scope.mode | mode;
            return;

        }

        // Otherwise disable it.
        $scope.mode = $scope.mode ^ mode;

    };

    /**
     * @method modeOnly
     * @param mode {Number}
     * @return {void}
     */
    $scope.modeOnly = function modeOnly(mode) {
        $scope.mode = $scope.MODES.VIEW | mode;
    };

}).directive('map', function mapDirective() {

    return {

        /**
         * @property restrict
         * @type {String}
         */
        restrict: 'C',

        /**
         * @property scope
         * @type {Object}
         */
        scope: {
            mode: '='
        },

        /**
         * @method controller
         * @param $scope {Object}
         * @return {void}
         */
        controller: function controller($scope) {

            /**
             * @constant TILE_URL
             * @type {String}
             */
            $scope.TILE_URL = 'https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}@2x.png';
            // $scope.TILE_URL = 'https://tiles.lyrk.org/lr/{z}/{x}/{y}?apikey=f2ae86661a4e487bbced29a755799884';

        },

        /**
         * @method link
         * @param scope {Object}
         * @param element {Object}
         * @return {void}
         */
        link: function link(scope, element) {

            const map = new L.Map(element[0], { doubleClickZoom: false }).setView([51.505, -0.09], 14);
            L.tileLayer(scope.TILE_URL).addTo(map);

            const freeDraw = new FreeDraw({
                mode: scope.mode
            });

            map.on('mode', function modeReceived(eventData) {

                scope.mode = eventData.mode;

                if (!scope.$root.$$phase) {
                    scope.$apply();
                }

            });

            // map ng-isolate-scope leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-touch-zoom leaflet-grab leaflet-touch-drag mode-edit mode-delete mode-append

            scope.$watch('mode', function modeReceived(mode) {
                freeDraw.mode(mode);
            });

            map.on('markers', function getMarkers(eventData) {

                // Output the lat/lngs in the MySQL multi-polygon format.
                console.log('LatLngs:', eventData.latLngs, 'Polygons:', eventData.latLngs.length);

            });

            map.addLayer(freeDraw);

        }

    }
});
