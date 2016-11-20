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
 * @method createPolygonFor
 * @param {Object} map
 * @param {Array} latLngs
 * @return {void}
 */
export const createPolygonFor = (map, latLngs) => {

    console.log(map, latLngs);

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

        // Disable the map if the `CREATE` mode is a default flag.
        this.options.mode & CREATE && map.dragging.disable();

        // Instantiate the SVG layer that sits on top of the map.
        const svg = d3.select(map._container).append('svg').classed('free-draw', true).attr('width', '100%').attr('height', '100%');

        // Set the mouse events.
        this.listenForEvents(map, svg);

    }

    /**
     * @method listenForEvents
     * @param {Object} map
     * @param {Object} svg
     * @return {void}
     */
    listenForEvents(map, svg) {

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
                latLngs.size && createPolygonFor(map, Array.from(latLngs));

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
        svg.append('path').classed('drawing-line', true).attr('d', lineFunction(lineData)).attr('fill', 'none');

        // Recursively invoke the generator function, passing in the current to point as the from point.
        yield *this.createPath(map, svg, toPoint);

    }

}

export { CREATE, EDIT, DELETE } from './helpers/Flags';
