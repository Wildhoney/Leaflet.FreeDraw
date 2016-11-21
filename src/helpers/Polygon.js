import { LineUtil, Point } from 'leaflet';
import { removeFor, edgesKey } from '../FreeDraw';
import createEdges from './Edges';
import { DELETE, APPEND } from './Flags';

/**
 * @method appendEdgeFor
 * @param {Object} map
 * @param {Object} polygon
 * @param {Array} parts
 * @param {Object} newPoint
 * @param {Object} startPoint
 * @param {Object} endPoint
 * @param {Object} options
 * @return {void}
 */
const appendEdgeFor = (map, polygon, parts, newPoint, startPoint, endPoint, options) => {

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
 * @param {Object} map
 * @param {Object} polygon
 * @param {Object} options
 * @return {Function}
 */
export default (map, polygon, options) => {

    return event => {

        // Gather all of the points from the lat longs of the current polygon.
        const newPoint = map.mouseEventToContainerPoint(event.originalEvent);
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
        const isDelete = !!(options.mode & DELETE);
        const isAppend = !!(options.mode & APPEND);
        const isDeleteAndAppend = !!(options.mode & DELETE && options.mode & APPEND);

        // Partially apply the remove and append functions.
        const removePolygon = () => removeFor(map, polygon);
        const appendEdge = () => appendEdgeFor(map, polygon, parts, newPoint, startPoint, endPoint, options);

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

    };

};
