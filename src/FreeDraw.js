import { FeatureGroup, Polygon, DomEvent } from 'leaflet';
import * as d3 from 'd3';
import createEdges from './helpers/Edges';
import handlePolygonClick from './helpers/Polygon';
import simplifyPolygon from './helpers/Simplify';
import concavePolygon from './helpers/Concave';
import mergePolygons from './helpers/Merge';
import { CREATE, EDIT, DELETE, APPEND, EDIT_APPEND, ALL } from './helpers/Flags';

/**
 * @constant polygons
 * @type {WeakMap}
 */
export const polygons = new WeakMap();

/**
 * @constant defaultOptions
 * @type {Object}
 */
const defaultOptions = {
    mode: ALL,
    smoothFactor: 5,
    elbowDistance: 10,
    simplifyFactor: 1.1,
    mergePolygons: true,
    concavePolygon: true,
    recreatePostEdit: false
};

/**
 * @constant edgesKey
 * @type {Symbol}
 */
export const edgesKey = Symbol('freedraw/edges');

/**
 * @method createPolygonFor
 * @param {Object} map
 * @param {Array} latLngs
 * @param {Object} [options = defaultOptions]
 * @param {Boolean} [preventModifications = false]
 * @return {Array}
 */
export const createPolygonFor = (map, latLngs, options = defaultOptions, preventModifications = false) => {

    // Apply the concave hull algorithm to the created polygon if the options allow.
    const concavedLatLngs = !preventModifications && options.concavePolygon ? concavePolygon(map, latLngs) : latLngs;

    // Simplify the polygon before adding it to the map.
    const addedPolygons = simplifyPolygon(map, concavedLatLngs, options).map(latLngs => {

        const polygon = new Polygon(options.simplifyPolygon ? simplifyPolygon(map, latLngs, options) : latLngs, {
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

    if (!preventModifications && polygons.get(map).size > 1 && options.mergePolygons) {

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
 * @method removePolygonFor
 * @param {Object} map
 * @param polygon
 */
export const removePolygonFor = (map, polygon) => {

    // Remove polygon and all of its associated edges.
    map.removeLayer(polygon);
    edgesKey in polygon && polygon[edgesKey].map(edge => map.removeLayer(edge));

    // Remove polygon from the master set.
    polygons.get(map).delete(polygon);

};

export default class extends FeatureGroup {

    /**
     * @constructor
     * @param {Object} [options = {}]
     * @return {void}
     */
    constructor(options = defaultOptions) {
        super();
        this.options = { ...defaultOptions, ...options };
    }

    /**
     * @method onAdd
     * @param {Object} map
     * @return {void}
     */
    onAdd(map) {

        // Add the item to the map.
        polygons.set(map, new Set());

        // Disable the map if the `CREATE` mode is a default flag.
        this.options.mode & CREATE && map.dragging.disable();

        // Instantiate the SVG layer that sits on top of the map.
        const svg = d3.select(map._container).append('svg').classed('free-draw', true).attr('width', '100%').attr('height', '100%');

        // Set the mouse events.
        this.listenForEvents(map, svg, this.options);

    }

    /**
     * @method onRemove
     * @param {Object} map
     * @return {void}
     */
    onRemove(map) {

        // Remove the item from the map.
        polygons.delete(map);

    }

    /**
     * @method listenForEvents
     * @param {Object} map
     * @param {Object} svg
     * @param {Object} options
     * @return {void}
     */
    listenForEvents(map, svg, options) {

        map.on('mousedown', function mouseDown(event) {

            /**
             * @constant latLngs
             * @type {Set}
             */
            const latLngs = new Set();

            // Create the line iterator and move it to its first `yield` point, passing in the start point
            // from the mouse down event.
            const lineIterator = this.createPath(map, svg, map.latLngToContainerPoint(event.latlng));
            lineIterator.next();

            /**
             * @method mouseMove
             * @param {Object} event
             * @return {void}
             */
            const mouseMove = event => {

                // Resolve the pixel point to the latitudinal and longitudinal equivalent.
                const point = map.mouseEventToContainerPoint(event.originalEvent);

                // Push each lat long value into the points set.
                latLngs.add(map.containerPointToLatLng(point));

                // Invoke the generator by passing in the starting point for the path.
                lineIterator.next(new L.Point(point.x, point.y));

            };

            // Create the path when the user moves their cursor.
            map.on('mousemove', mouseMove);

            // Clear up the events when the user releases the mouse.
            map.on('mouseup', function mouseUp() {

                // Stop listening to the events.
                map.off('mouseup', mouseUp);
                map.off('mousedown', mouseDown);
                map.off('mousemove', mouseMove);

                // Clear the SVG canvas.
                svg.selectAll('*').remove();

                // Stop the iterator.
                lineIterator.return();

                // ...And finally if we have any lat longs in our set then we can attempt to
                // create the polygon.
                latLngs.size && createPolygonFor(map, Array.from(latLngs), options);

            });

        }.bind(this));

    }

    /**
     * @method createPath
     * @param {Object} map
     * @param {Object} svg
     * @param {L.Point} fromPoint
     * @return {void}
     */
    *createPath(map, svg, fromPoint) {

        // Define the line function to be used for the hand-drawn lines.
        const lineFunction = d3.line().curve(d3.curveMonotoneX).x(d => d.x).y(d => d.y);

        // Wait for the iterator to be invoked by passing in the next point.
        const toPoint = yield;

        // Line data that is fed into the D3 line function we defined earlier.
        const lineData = [fromPoint, toPoint];

        // Draw SVG line based on the last movement of the mouse's position.
        svg.append('path').classed('leaflet-line', true).attr('d', lineFunction(lineData)).attr('fill', 'none');

        // Recursively invoke the generator function, passing in the current to point as the from point.
        yield *this.createPath(map, svg, toPoint);

    }

}

export { CREATE, EDIT, DELETE, APPEND, EDIT_APPEND, ALL } from './helpers/Flags';
