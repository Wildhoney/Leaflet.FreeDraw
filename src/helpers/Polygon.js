import { LineUtil, Point, Polygon, DomEvent } from 'leaflet';
import { defaultOptions, edgesKey, modesKey, polygons } from '../FreeDraw';
import { updateFor } from './Layer';
import createEdges from './Edges';
import { DELETE, APPEND } from './Flags';
import handlePolygonClick from './Polygon';
import concavePolygon from './Concave';
import mergePolygons from './Merge';

/**
 * @method appendEdgeFor
 * @param {Object} map
 * @param {Object} polygon
 * @param {Object} options
 * @param {Array} parts
 * @param {Object} newPoint
 * @param {Object} startPoint
 * @param {Object} endPoint
 * @return {void}
 */
const appendEdgeFor = (map, polygon, options, { parts, newPoint, startPoint, endPoint }) => {

    const latLngs = parts.reduce((accumulator, point, index) => {

        const nextPoint = parts[index + 1] || parts[0];

        if (point === startPoint && nextPoint === endPoint) {

            return [

                // We've found the location to add the new polygon.
                ...accumulator,
                map.containerPointToLatLng(point),
                map.containerPointToLatLng(newPoint)

            ];

        }

        return [ ...accumulator, map.containerPointToLatLng(point) ];

    }, []);

    // Update the lat longs with the newly inserted edge.
    polygon.setLatLngs(latLngs);

    // Remove the current set of edges for the polygon, and then recreate them, assigning the
    // new set of edges back into the polygon.
    polygon[edgesKey].map(edge => map.removeLayer(edge));
    polygon[edgesKey] = createEdges(map, polygon, options);

};

/**
 * @method createFor
 * @param {Object} map
 * @param {Array} latLngs
 * @param {Object} [options = defaultOptions]
 * @param {Boolean} [preventMutations = false]
 * @return {Array|Boolean}
 */
export const createFor = (map, latLngs, options = defaultOptions, preventMutations = false) => {

    // Determine whether we've reached the maximum polygons.
    const limitReached = polygons.get(map).size === options.maximumPolygons;

    // Apply the concave hull algorithm to the created polygon if the options allow.
    const concavedLatLngs = !preventMutations && options.concavePolygon ? concavePolygon(map, latLngs) : latLngs;

    // Simplify the polygon before adding it to the map.
    const addedPolygons = limitReached ? [] : map.simplifyPolygon(map, concavedLatLngs, options).map(latLngs => {

        const polygon = new Polygon(latLngs, {
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

    if (!limitReached && !preventMutations && polygons.get(map).size > 1 && options.mergePolygons) {

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
 * @param {Object} map
 * @param {Object} polygon
 * @param {Object} options
 * @return {Function}
 */
export default (map, polygon, options) => {

    return event => {

        // Gather all of the points from the lat longs of the current polygon.
        const newPoint = map.mouseEventToContainerPoint('originalEvent' in event ? event.originalEvent : event);
        const parts = polygon.getLatLngs()[0].map(latLng => map.latLngToContainerPoint(latLng));

        const { startPoint, endPoint, lowestDistance } = parts.reduce((accumulator, point, index) => {

            const startPoint = point;
            const endPoint = parts[index + 1] || parts[0];
            const distance = LineUtil.pointToSegmentDistance(newPoint, startPoint, endPoint);

            if (distance < accumulator.lowestDistance) {

                // If the distance is less than the previous then we'll update the accumulator.
                return { lowestDistance: distance, startPoint, endPoint };

            }

            // Otherwise we'll simply yield the previous accumulator.
            return accumulator;

        }, { lowestDistance: Infinity, startPoint: new Point(), endPoint: Point() });

        // Setup the conditions for the switch statement to make the cases clearer.
        const mode = map[modesKey];
        const isDelete = Boolean(mode & DELETE);
        const isAppend = Boolean(mode & APPEND);
        const isDeleteAndAppend = Boolean(mode & DELETE && mode & APPEND);

        // Partially apply the remove and append functions.
        const removePolygon = () => removeFor(map, polygon);
        const appendEdge = () => appendEdgeFor(map, polygon, options, { parts, newPoint, startPoint, endPoint });

        switch (true) {

            // If both modes DELETE and APPEND are active then we need to do a little work to determine
            // which action to take based on where the user clicked on the polygon.
            case isDeleteAndAppend:
                lowestDistance > options.elbowDistance ? removePolygon() : appendEdge();
                break;

            case isDelete:
                removePolygon();
                break;

            case isAppend:
                appendEdge();
                break;

        }

        // Trigger the event for having deleted a polygon or appended an edge.
        (isDelete || isAppend) && updateFor(map);

    };

};
