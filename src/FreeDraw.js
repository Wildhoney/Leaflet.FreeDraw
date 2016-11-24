import { FeatureGroup, Polygon, DomEvent, DomUtil } from 'leaflet';
import * as d3 from 'd3';
import createEdges from './helpers/Edges';
import handlePolygonClick from './helpers/Polygon';
import simplifyPolygon from './helpers/Simplify';
import concavePolygon from './helpers/Concave';
import mergePolygons from './helpers/Merge';
import { VIEW, CREATE, EDIT, DELETE, APPEND, EDIT_APPEND, ALL } from './helpers/Flags';

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
    simplifyFactor: 2,
    mergePolygons: true,
    concavePolygon: true,
    recreatePostEdit: false
};

/**
 * @constant modesKey
 * @type {Symbol}
 */
export const modesKey = Symbol('freedraw/modes');

/**
 * @constant edgesKey
 * @type {Symbol}
 */
export const edgesKey = Symbol('freedraw/edges');

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
    Array.from(polygons.get(map).entries()).forEach(polygon => removeFor(map, polygon));
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
    map.fire('markers', { latLngs });

};

/**
 * @method setModeFor
 * @param {Object} map
 * @param {Number} mode
 * @return {Number}
 */
export const setModeFor = (map, mode) => {

    // Update the mode.
    map[modesKey] = mode;

    // Fire the updated mode.
    map.fire('mode', { mode });

    // Disable the map if the `CREATE` mode is a default flag.
    mode & CREATE ? map.dragging.disable() : map.dragging.enable();

    Array.from(polygons.get(map)).forEach(polygon => {

        polygon[edgesKey].forEach(edge => {

            // Modify the edge class names based on whether edit mode is enabled.
            mode & EDIT ? DomUtil.removeClass(edge._icon, 'disabled') : DomUtil.addClass(edge._icon, 'disabled');

        });

    });

    // Remove all of the current class names so we can begin from scratch.
    const mapNode = map._container;
    DomUtil.removeClass(mapNode, 'mode-create');
    DomUtil.removeClass(mapNode, 'mode-edit');
    DomUtil.removeClass(mapNode, 'mode-delete');
    DomUtil.removeClass(mapNode, 'mode-view');
    DomUtil.removeClass(mapNode, 'mode-append');

    // Apply the class names to the mapNode container depending on the current mode.
    mode & CREATE && DomUtil.addClass(mapNode, 'mode-create');
    mode & EDIT && DomUtil.addClass(mapNode, 'mode-edit');
    mode & DELETE && DomUtil.addClass(mapNode, 'mode-delete');
    mode & VIEW && DomUtil.addClass(mapNode, 'mode-view');
    mode & APPEND && DomUtil.addClass(mapNode, 'mode-append');

    return mode;

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

        // Memorise the map instance, and setup DI for `simplifyPolygon`.
        this.map = map;
        map.simplifyPolygon = simplifyPolygon;

        // Add the item to the map.
        polygons.set(map, new Set());

        // Set the initial mode.
        setModeFor(map, this.options.mode);

        // Instantiate the SVG layer that sits on top of the map.
        const svg = d3.select(map._container).append('svg')
                      .classed('free-draw', true).attr('width', '100%').attr('height', '100%')
                      .style('pointer-events', 'none').style('z-index', '1001').style('position', 'relative');

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
     * @method createPolygon
     * @param {LatLng[]} latLngs
     * @return {Object}
     */
    createPolygon(latLngs) {
        return createFor(this.map, latLngs, this.options);
    }

    /**
     * @method removePolygon
     * @param {Object} polygon
     * @return {void}
     */
    removePolygon(polygon) {
        removeFor(this.map, polygon);
    }

    /**
     * @method clearPolygons
     * @return {void}
     */
    clearPolygons() {
        clearFor(this.map);
    }

    /**
     * @method setMode
     * @param {Number} mode
     * @return {void}
     */
    setMode(mode) {
        return setModeFor(this.map, mode);
    }

    /**
     * @method getMode
     * @return {Number}
     */
    getMode() {
        return this.map[modesKey];
    }

    /**
     * @method listenForEvents
     * @param {Object} map
     * @param {Object} svg
     * @param {Object} options
     * @return {void}
     */
    listenForEvents(map, svg, options) {

        map.on('mousedown touchstart', function mouseDown(event) {

            if (!(map[modesKey] & CREATE)) {

                // Polygons can only be created when the mode includes create.
                map.off('mousedown', mouseDown);
                return;

            }

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
            map.on('mousemove touchmove', mouseMove);


            /**
             * @method mouseUp
             * @return {void}
             */
            const mouseUp = () => {

                // Stop listening to the events.
                map.off('mouseup', mouseUp);
                map.off('mousedown', mouseDown);
                map.off('mousemove', mouseMove);
                'body' in document && document.body.removeEventListener('mouseleave', mouseUp);

                // Clear the SVG canvas.
                svg.selectAll('*').remove();

                // Stop the iterator.
                lineIterator.return();

                // ...And finally if we have any lat longs in our set then we can attempt to
                // create the polygon.
                latLngs.size && createFor(map, Array.from(latLngs), options);

                // Finally invoke the callback for the polygon regions.
                triggerFor(map);

            };

            // Clear up the events when the user releases the mouse.
            map.on('mouseup touchend', mouseUp);
            'body' in document && document.body.addEventListener('mouseleave', mouseUp);

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
        const toPoint = yield fromPoint;

        // Line data that is fed into the D3 line function we defined earlier.
        const lineData = [fromPoint, toPoint];

        // Draw SVG line based on the last movement of the mouse's position.
        svg.append('path').classed('leaflet-line', true).attr('d', lineFunction(lineData)).attr('fill', 'none');

        // Recursively invoke the generator function, passing in the current to point as the from point.
        yield *this.createPath(map, svg, toPoint);

    }

}

export { CREATE, EDIT, DELETE, APPEND, EDIT_APPEND, VIEW, ALL } from './helpers/Flags';
