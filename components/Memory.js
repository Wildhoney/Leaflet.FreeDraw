(function() {

    "use strict";

    /**
     * @module FreeDraw
     * @submodule Memory
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/Leaflet.FreeDraw
     * @constructor
     */
    L.FreeDraw.Memory = function FreeDrawMemory() {};

    /**
     * @property prototype
     * @type {Object}
     */
    L.FreeDraw.Memory.prototype = {

        /**
         * @property states
         * @type {Array}
         */
        states: [[]],

        /**
         * @property current
         * @type {Number}
         */
        current: 0,

        /**
         * @method save
         * @param polygons {Array}
         * @return {void}
         */
        save: function save(polygons) {

            this.current++;

            if (this.states[this.current]) {

                // If the current state exists then the user has started to overwrite their
                // redo history, which is expected behaviour. With that in mind, let's remove
                // the states before the current!
                this.clearFrom(this.current);

            }

            if (!this.states[this.current]) {

                // Otherwise the index is currently empty and therefore we should initialise it
                // to an empty array.
                this.states[this.current] = [];

            }

            polygons.forEach(function forEach(polygon) {

                // Each polygon is represented as a separate entry in the array.
                this.states[this.current].push(polygon._latlngs);

            }.bind(this));

        },

        /**
         * Responsible for rewinding the state and returning the current state.
         *
         * @method previous
         * @return {Array}
         */
        undo: function undo() {

            this.current--;

            if (!this.states[this.current]) {

                // Index doesn't exist in the state array.
                this.current++;

            }
            return this.states[this.current];

        },

        /**
         * @method canUndo
         * @return {Boolean}
         */
        canUndo: function canUndo() {
            return !!this.states[this.current - 1];
        },

        /**
         * Responsible for fast-forwarding the state and returning the current state.
         *
         * @method previous
         * @return {Array}
         */
        redo: function redo() {

            this.current++;

            if (!this.states[this.current]) {

                // Index doesn't exist in the state array.
                this.current--;

            }

            return this.states[this.current];

        },

        /**
         * @method canRedo
         * @return {Boolean}
         */
        canRedo: function canRedo() {
            return !!this.states[this.current + 1];
        },

        /**
         * Responsible for clearing the history from a given index, including the index supplied.
         *
         * @method clearFrom
         * @param index {Number}
         * @return {void}
         */
        clearFrom: function clearFrom(index) {
            this.states.splice(index);
        }

    };

})();