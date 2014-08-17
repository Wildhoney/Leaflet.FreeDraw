(function($window) {

    "use strict";

    /**
     * @method throwException
     * @param message {String}
     * @param link {String}
     * @return {void}
     */
    var throwException = function throwException(message, link) {

        if (link) {

            // Output a link for a more informative message in the EXCEPTIONS.md.
            console.error('See: https://github.com/Wildhoney/Leaflet.FreeDraw/' + link);
        }

        // ..And then output the thrown exception.
        throw "Leaflet.FreeDraw: " + message + ".";

    };

    /**
     * @module FreeDraw
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/Leaflet.FreeDraw
     * @constructor
     */
    $window.FreeDraw = function FreeDraw(map) {

        // FreeDraw requires access to the Leaflet map instance.
        this.setMap(map);

        // Hook up the options object.
        this.options = new $window.FreeDraw.Options;

    };

    /**
     * @property prototype
     * @type {Object}
     */
    $window.FreeDraw.prototype = {

        /**
         * @property map
         * @type {L.map|null}
         */
        map: null,

        /**
         * @property options
         * @type {Object}
         */
        options: {},

        /**
         * @method setMap
         * @param map {L.map}
         * @return {void}
         */
        setMap: function setMap(map) {

            if (!map || !(map instanceof L.Map)) {

                // We didn't receive a valid `L.Map` instance during instantiation.
                throwException('Upon instantiation an instance of L.Map must be passed', 'passing-an-l.map-instance');

            }

            // Everything is okay.
            this.map = map;

        }

    };

})(window);