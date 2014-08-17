(function Example(window, leaflet, FreeDraw) {

    /**
     * Invoked once DOM is ready, and then goodness knows what happens after that.
     *
     * @method beginExample
     * @return {void}
     */
    var beginExample = function beginExample() {

        // Setup Leaflet: http://leafletjs.com/examples/quick-start.html
        var mapContainer = window.document.querySelector('section.map'),
            map          = L.map(mapContainer).setView([51.505, -0.09], 13);
        L.tileLayer('http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg').addTo(map);

        var freeDraw = new FreeDraw(map);
        freeDraw.options.allowMultiplePolygons(true);
        freeDraw.options.setConvexHullAlgorithm(false);
//        freeDraw.options.setConvexHullAlgorithm('brian3kb/graham_scan_js');

    };

    // Hold onto your hats!
    window.document.addEventListener('DOMContentLoaded', beginExample);

})(window, window.L, window.FreeDraw);