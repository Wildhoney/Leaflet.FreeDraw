/**
 * @constant REDO
 * @type {Number}
 */
export const UNDO = 16;

/**
 * @constant REDO
 * @type {Number}
 */
export const REDO = 32;

/**
 * @constant memory
 * @type {WeakMap}
 */
export const memory = new WeakMap();

/**
 * @method addFor
 * @param {Object} map
 * @param {LatLng[]} latLngs
 * @return {void}
 */
export const addFor = (map, latLngs) => {

    // Create the record in memory for the current `map` instance, if it doesn't exist already.
    !memory.has(map) && memory.set(map, new Set());

    // Retrieve the current `map` instance from the map, and then push the lat lng values.
    memory.get(map).add(latLngs);

};
