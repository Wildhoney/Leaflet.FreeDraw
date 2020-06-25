import L from 'leaflet';
import { module } from 'angular';
import FreeDraw, { NONE, CREATE, EDIT, DELETE, APPEND, ALL, polygons } from '../../src/FreeDraw';

module('leafletApp', []).controller('MapController', $scope => {

    /**
     * @constant MODES
     * @type {Object}
     */
    $scope.MODES = { CREATE, EDIT, DELETE, APPEND, NONE };

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
    $scope.isDisabled = mode => !(mode & $scope.mode);

    /**
     * @method stopPropagation
     * @param {Object} event
     * @return {void}
     */
    $scope.stopPropagation = event => event.stopPropagation();

    /**
     * @method toggleMode
     * @param mode {Number}
     * @return {void}
     */
    $scope.toggleMode = mode => {

        if ($scope.isDisabled(mode)) {

            // Enabled the mode.
            $scope.mode = $scope.mode | mode;
            return;

        }

        // Otherwise disable it.
        $scope.mode = $scope.mode ^ mode;

    };

    /**
     * @method setModeOnly
     * @param mode {Number}
     * @return {void}
     */
    $scope.setModeOnly = mode => {
        $scope.mode = $scope.MODES.NONE | mode;
    };

}).directive('map', () => {

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
        controller($scope) {

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
        link(scope, element) {
            const LAT_LNG = [51.505, -0.09];

            // Instantiate L.Map and the FreeDraw layer, passing in the default mode.
            const map = new L.Map(element[0], { doubleClickZoom: false }).setView([51.505, -0.09], 14);
            const freeDraw = window.freeDraw = new FreeDraw({ mode: ALL });

            // Add the tile layer and the FreeDraw layer.
            L.tileLayer(scope.TILE_URL).addTo(map);
            map.addLayer(freeDraw);

            console.log(L);

            const sensor = new L.circle(LAT_LNG, {
                color: 'red',
                fillColor: 'red',
                fillOpacity: 1,
                radius: 150,
                id: 1, // sensor's id
              }).addTo(map);
              
              sensor.bindPopup('This is the sensor ' + sensor.options.id + '.');

            freeDraw.on('mode', event => {

                // Memorise the mode and re-render the directive.
                scope.mode = event.mode;
                !scope.$root.$$phase && scope.$apply();

            });

            // Listen for a change in the mode.
            scope.$watch('mode', mode => freeDraw.mode(mode));

            document.addEventListener('keydown', event => {

                // Cancel the current FreeDraw action when the escape key is pressed.
                event.key === 'Escape' && freeDraw.cancel();

            });


            freeDraw.on('markers', event => {

                // Listen for any markers added, removed or edited, and then output the lat lng boundaries.
                console.log('LatLngs:', event.latLngs, 'Polygons:', freeDraw.size());

            });

            // Exposed for testing purposes.
            window._polygons = polygons.get(map);

        }

    }
});
