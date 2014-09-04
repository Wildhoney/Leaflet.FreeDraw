(function Example(window) {

    /**
     * Invoked once DOM is ready, and then goodness knows what happens after that.
     *
     * @method beginExample
     * @return {void}
     */
    var beginExample = function beginExample() {

        // Setup Leaflet: http://leafletjs.com/examples/quick-start.html
        var mapContainer = window.document.querySelector('section.map'),
            map          = L.map(mapContainer).setView([51.505, -0.09], 14);
        L.tileLayer('https://tiles.lyrk.org/lr/{z}/{x}/{y}?apikey=b86b18b0645848bea383827fdccb878e').addTo(map);

        var freeDraw = window.freeDraw = new L.FreeDraw({
            mode: L.FreeDraw.MODES.EDIT | L.FreeDraw.MODES.CREATE | L.FreeDraw.MODES.APPEND
        });

        freeDraw.options.setBoundariesAfterEdit(false);
        freeDraw.options.exitModeAfterCreate(false);
//        freeDraw.options.addElbowOnlyWithinDistance(true);

        freeDraw.on('markers', function getMarkers(eventData) {

            // Output the lat/lngs in the MySQL multi-polygon format.
//            console.log(L.FreeDraw.Utilities.getMySQLMultiPolygon(eventData.latLngs));

        });

        map.addLayer(freeDraw);

    };

    // Hold onto your hats!
    window.document.addEventListener('DOMContentLoaded', beginExample);

})(window);