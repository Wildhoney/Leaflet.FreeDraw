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
            map          = L.map(mapContainer).setView([51.505, -0.09], 14);
        L.tileLayer('http://b.tile.stamen.com/toner/{z}/{x}/{y}.png').addTo(map);

        var freeDraw = new FreeDraw(map);
        freeDraw.options.allowMultiplePolygons(true);
        freeDraw.options.setHullAlgorithm(false);
        freeDraw.options.setHullAlgorithm('brian3kb/graham_scan_js');

        freeDraw.enableEdit();

    };

    // Hold onto your hats!
    window.document.addEventListener('DOMContentLoaded', beginExample);

})(window, window.L, window.FreeDraw);