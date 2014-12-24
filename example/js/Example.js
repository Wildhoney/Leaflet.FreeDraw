(function Example($angular) {

    $angular.module('leafletApp', []).controller('MapController', function MapController($scope) {

        /**
         * @constant MODES
         * @type {Object}
         */
        $scope.MODES = L.FreeDraw.MODES;

        /**
         * @property mode
         * @type {Number}
         */
        $scope.mode = L.FreeDraw.MODES.ALL;

        /**
         * @method isDisabled
         * @param mode {Number}
         * @returns {Boolean}
         */
        $scope.isDisabled = function isDisabled(mode) {
            return !(mode & $scope.mode);
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
         * @method setModeOnly
         * @param mode {Number}
         * @return {void}
         */
        $scope.setModeOnly = function setModeOnly(mode) {
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
                $scope.TILE_URL = 'https://tiles.lyrk.org/lr/{z}/{x}/{y}?apikey=f2ae86661a4e487bbced29a755799884';

            },

            /**
             * @method link
             * @param scope {Object}
             * @param element {Object}
             * @return {void}
             */
            link: function link(scope, element) {

                // Setup Leaflet: http://leafletjs.com/examples/quick-start.html
                var map = new L.Map(element[0]).setView([51.505, -0.09], 14);
                L.tileLayer(scope.TILE_URL).addTo(map);

                var freeDraw = window.freeDraw = new L.FreeDraw({
                    mode: scope.mode
                });

//                freeDraw.options.allowMultiplePolygons(false);
//                freeDraw.options.destroyPreviousPolygon(true);
//                freeDraw.options.exitModeAfterCreate(false);

                freeDraw.on('mode', function modeReceived(eventData) {
                    scope.mode = eventData.mode;

                    if (!scope.$root.$$phase) {
                        scope.$apply();
                    }

                });

                scope.$watch('mode', function modeReceived(mode) {
                    freeDraw.setMode(mode);
                });

                freeDraw.on('markers', function getMarkers(eventData) {

                    // Output the lat/lngs in the MySQL multi-polygon format.
                    console.log(L.FreeDraw.Utilities.getMySQLMultiPolygon(eventData.latLngs));

                });

                map.addLayer(freeDraw);

            }

        }
    });

})(window.angular);