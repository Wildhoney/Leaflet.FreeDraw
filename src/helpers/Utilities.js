import { DomEvent, DomUtil, Polygon } from 'leaflet';
import { defaultOptions, edgesKey, modesKey, instanceKey, notifyDeferredKey, polygons } from '../FreeDraw';
import { NONE, CREATE, EDIT, DELETE, APPEND } from './Flags';
import concavePolygon from './Concave';
import mergePolygons from './Merge';
import createEdges from './Edges';
import handlePolygonClick from './Polygon';

/**
 * @method createFor
 * @param {Object} map
 * @param {Array} latLngs
 * @param {Object} [options = defaultOptions]
 * @param {Boolean} [preventMutations = false]
 * @return {Array}
 */
export const createFor = (map, latLngs, options = defaultOptions, preventMutations = false) => {

    // Apply the concave hull algorithm to the created polygon if the options allow.
    const concavedLatLngs = !preventMutations && options.concavePolygon ? concavePolygon(map, latLngs) : latLngs;

    // Simplify the polygon before adding it to the map.
    const addedPolygons = map.simplifyPolygon(map, concavedLatLngs, options).map(latLngs => {

        const polygon = new Polygon(options.simplifyPolygon ? map.simplifyPolygon(map, latLngs, options) : latLngs, {
            ...defaultOptions, ...options, className: 'leaflet-polygon'
        }).addTo(map);

        // Attach the edges to the polygon.
        polygon[edgesKey] = createEdges(map, polygon, options);

        // Disable the propagation when you click on the marker.
        DomEvent.disableClickPropagation(polygon);

        // Yield the click handler to the `handlePolygonClick` function.
        polygon.on('click', handlePolygonClick(map, polygon, options));

        return polygon;

    });

    // Append the current polygon to the master set.
    addedPolygons.forEach(polygon => polygons.get(map).add(polygon));

    if (!preventMutations && polygons.get(map).size > 1 && options.mergePolygons) {

        // Attempt a merge of all the polygons if the options allow, and the polygon count is above one.
        const addedMergedPolygons = mergePolygons(map, Array.from(polygons.get(map)), options);

        // Clear the set, and added all of the merged polygons into the master set.
        polygons.get(map).clear();
        addedMergedPolygons.forEach(polygon => polygons.get(map).add(polygon));

        return addedMergedPolygons;

    }

    return addedPolygons;

};

/**
 * @method removeFor
 * @param {Object} map
 * @param {Object} polygon
 * @return {void}
 */
export const removeFor = (map, polygon) => {

    // Remove polygon and all of its associated edges.
    map.removeLayer(polygon);
    edgesKey in polygon && polygon[edgesKey].map(edge => map.removeLayer(edge));

    // Remove polygon from the master set.
    polygons.get(map).delete(polygon);

};

/**
 * @method clearFor
 * @param {Object} map
 * @return {void}
 */
export const clearFor = map => {
    Array.from(polygons.get(map).values()).forEach(polygon => removeFor(map, polygon));
};

/**
 * @method triggerFor
 * @param {Object} map
 * @return {void}
 */
export const triggerFor = map => {

    const latLngs = Array.from(polygons.get(map)).map(polygon => {

        // Ensure the polygon has been closed.
        const latLngs = polygon.getLatLngs();
        return [ ...latLngs[0], latLngs[0][0] ];

    });

    // Fire the current set of lat lngs.
    map[instanceKey].fire('markers', { latLngs });

};

/**
 * @method classesFor
 * @param {Object} map
 * @param {Number} mode
 * @return {void}
 */
export const classesFor = (map, mode) => {

    /**
     * @constant modeMap
     * @type {Object}
     */
    const modeMap = {
        [NONE]: 'mode-none',
        [CREATE]: 'mode-create',
        [EDIT]: 'mode-edit',
        [DELETE]: 'mode-delete',
        [APPEND]: 'mode-append'
    };

    Object.keys(modeMap).forEach(key => {

        const className = modeMap[key];
        const isModeActive = mode & key;

        // Remove the class name if it's set already on the map container.
        DomUtil.removeClass(map._container, className);

        // Apply the class names to the node container depending on whether the mode is active.
        isModeActive && DomUtil.addClass(map._container, className);

    });

};

/**
 * @method modeFor
 * @param {Object} map
 * @param {Number} mode
 * @param {Object} options
 * @return {Number}
 */
export const modeFor = (map, mode, options) => {

    // Update the mode.
    map[modesKey] = mode;

    // Fire the updated mode.
    map[instanceKey].fire('mode', { mode });

    // Disable the map if the `CREATE` mode is a default flag.
    mode & CREATE ? map.dragging.disable() : map.dragging.enable();

    Array.from(polygons.get(map)).forEach(polygon => {

        polygon[edgesKey].forEach(edge => {

            // Modify the edge class names based on whether edit mode is enabled.
            mode & EDIT ? DomUtil.removeClass(edge._icon, 'disabled') : DomUtil.addClass(edge._icon, 'disabled');

        });

    });

    // Apply the conditional class names to the map container.
    classesFor(map, mode);

    // Fire the event for having manipulated the polygons if the `hasManipulated` is `true` and the
    // `notifyAfterLeaveEdit` option is equal to `true`, and then reset the `notifyDeferredKey`.
    options.notifyAfterLeaveEdit && map[notifyDeferredKey]();
    map[notifyDeferredKey] = () => {};

    return mode;

};
