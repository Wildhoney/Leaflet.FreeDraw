import { FeatureGroup } from 'leaflet';
import * as d3 from 'd3';
import { CREATE, EDIT, DELETE } from './helpers/Flags';

/**
 * @constant defaultOptions
 * @type {Object}
 */
const defaultOptions = {
    mode: CREATE
};

/**
 * @constant points
 * @type {WeakMap}
 */
const points = new WeakMap();

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

        // Disable the map if the `CREATE` mode is a default flag.
        this.options.mode & CREATE && map.dragging.disable();

        // Instantiate the SVG layer that sits on top of the map.
        const svg = d3.select(map._container).append('svg').classed('free-draw', true).attr('width', '100%').attr('height', '100%');

        // Create the line iterator and move it to its first `yield` point.
        const lineIterator = this.createLine(map, svg, new L.Point(0, 0));
        lineIterator.next();

        // Attach the events to the map.
        map.on('mousemove', event => {

            // Resolve the pixel point to the latitudinal and longitudinal equivalent.
            const point  = map.mouseEventToContainerPoint(event.originalEvent);
            // const latLng = map.containerPointToLatLng(point);

            lineIterator.next(new L.Point(point.x, point.y));

        });

    }

    /**
     * @method createLine
     * @param {Object} map
     * @param {Object} svg
     * @param {L.Point} fromPoint
     * @return {void}
     */
    *createLine(map, svg, fromPoint) {

        // Define the line function to be used for the hand-drawn lines.
        const lineFunction = d3.line().curve(d3.curveMonotoneX).x(d => d.x).y(d => d.y);

        // Wait for the iterator to be invoked by passing in the next point.
        const toPoint = yield;

        // Line data that is fed into the D3 line function we defined earlier.
        const lineData = [fromPoint, toPoint];

        // Draw SVG line based on the last movement of the mouse's position.
        svg.append('path').classed('drawing-line', true).attr('d', lineFunction(lineData)).attr('fill', 'none');

        // Recursively invoke the generator function, passing in the current to point as the from point.
        yield *this.createLine(map, svg, toPoint);

    }

}

export { CREATE, EDIT, DELETE } from './helpers/Flags';
