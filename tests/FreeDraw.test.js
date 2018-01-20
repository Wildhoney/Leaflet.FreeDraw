import test from 'ava';
import { select } from 'd3-selection';
import { LatLng, Point } from 'leaflet';
import { spy } from 'sinon';
import FreeDraw, { polygons, edgesKey } from '../src/FreeDraw';
import { updateFor } from '../src/helpers/Layer';
import { NONE, CREATE, EDIT, DELETE, APPEND, EDIT_APPEND, ALL } from '../src/helpers/Flags';

/**
 * @method mockFunctions
 * @param {Object} map
 * @return {void}
 */
function mockFunctions(map) {
    map.simplifyPolygon = (map, latLngs) => [latLngs];
    map.addLayer = spy();
    map.removeLayer = spy();
}

/**
 * @constant polygon
 * @type {Object}
 */
const polygon = [new LatLng(51.50249181873096, -0.08634567260742189),
                 new LatLng(51.50281238523426, -0.09501457214355469),
                 new LatLng(51.50799456412721, -0.09441375732421875),
                 new LatLng(51.509062981334914, -0.08428573608398438),
                 new LatLng(51.50249181873096, -0.08634567260742189)];

test.beforeEach(t => {

    const node = t.context.node = document.createElement('div');

    t.context.map = {
        on: spy(),
        fire: spy(),
        dragging: {
            disable: spy(),
            enable: spy()
        },
        _container: node,
        latLngToLayerPoint: spy(({ lat, lng }) => ({ x: lat, y: lng })),
        layerPointToLatLng: spy(({ x, y }) => ({ lat: x, lng: y }))
    };

    t.context.svg = select(node).append('svg');
    t.context.polygon = [...polygon];
    t.context.freeDraw = new FreeDraw({ mergePolygons: false, concavePolygon: false });

});

test('It should be able to create the map instance;', t => {

    const { freeDraw, map, node } = t.context;
    freeDraw.fire = spy();
    freeDraw.listenForEvents = spy();
    freeDraw.onAdd(map);

    // Ensure the polygons contains the map instance, which will eventually store the polygons.
    t.truthy(polygons.has(map));

    // Ensure the mode has been set by default to `ALL`.
    t.is(freeDraw.mode(), ALL);

    // Ensure the initial event for the modes was invoked.
    t.is(freeDraw.fire.callCount, 1);
    t.truthy(freeDraw.fire.calledWith('mode', { mode: ALL }));

    // Ensure D3 has successfully appended the SVG node.
    // Twice because the `beforeEach` also appends a SVG node.
    t.is(node.querySelectorAll('svg').length, 2);

    // Ensure the `listenForEvent` function was invoked.
    t.is(freeDraw.listenForEvents.callCount, 1);

});

test('It should be able to create polygons;', t => {

    const { freeDraw, map, polygon } = t.context;
    freeDraw.onAdd(map);
    mockFunctions(map);

    // ...And then invoke the `create` function!
    freeDraw.create(polygon, true);

    // Ensure the expected functions are invoked.
    t.truthy(map.addLayer.called);
    t.is(map.latLngToLayerPoint.callCount, polygon.length - 1);

    // Ensure it's correctly added to the `polygons` set.
    t.is(polygons.get(map).size, 1);

});

test('It should be able to remove polygons;', t => {

    const { freeDraw, map, polygon } = t.context;
    freeDraw.onAdd(map);
    mockFunctions(map);

    // Invoke the `create` function.
    const [firstPolygon] = freeDraw.create(polygon, true);

    // Ensure it's correctly added to the `polygons` set, as well as the associated edges.
    t.is(polygons.get(map).size, 1);
    t.is(firstPolygon[edgesKey].length, 4);

    // ... And then remove it immediately.
    freeDraw.remove(firstPolygon);

    // Ensure it's correctly removed from the `polygons` set.
    t.is(polygons.get(map).size, 0);

    // Ensure the expected functions are invoked.
    t.truthy(map.removeLayer.called);

});

test('It should be able to clear polygons;', t => {

    const { freeDraw, map, polygon } = t.context;
    freeDraw.onAdd(map);
    mockFunctions(map);

    // Invoke the `create` function.
    freeDraw.create(polygon, true);
    freeDraw.create(polygon, true);
    freeDraw.create(polygon, true);

    // Ensure it's correctly added to the `polygons` set.
    t.is(polygons.get(map).size, 3);

    // ... And then clear them all.
    freeDraw.clear();
    t.is(polygons.get(map).size, 0);

});

test('It should be able to trigger events on the map instance;', t => {

    const { freeDraw, map, polygon } = t.context;
    freeDraw.fire = spy();
    freeDraw.onAdd(map);
    mockFunctions(map);

    // Invoke the `create` function.
    const [firstPolygon] = freeDraw.create(polygon, true);

    // Ensure the `fire` method has been invoked with the correct parameters.
    updateFor(map, 'create');

    const closedPolygon = [...firstPolygon.getLatLngs()[0], firstPolygon.getLatLngs()[0][0]];
    t.truthy(freeDraw.fire.calledWith('markers', { latLngs: [closedPolygon], eventType: 'create' }));

});

test('It should be able to clear up once removed;', t => {

    const { freeDraw, map } = t.context;
    freeDraw.onAdd(map);
    mockFunctions(map);

    // Map should be contained within the WeakMap.
    t.truthy(polygons.has(map));

    // But should be gone once removed.
    freeDraw.onRemove(map);
    t.falsy(polygons.has(map));

});

test('It should be able to set the mode on the map;', t => {

    const { freeDraw, map, node } = t.context;
    freeDraw.onAdd(map);

    // Ensure default mode is correctly set, with all of the relevant class names.
    t.is(freeDraw.mode(), ALL);
    t.truthy(node.classList.contains('mode-create'));
    t.truthy(node.classList.contains('mode-edit'));
    t.truthy(node.classList.contains('mode-delete'));
    t.truthy(node.classList.contains('mode-append'));

    // Update the mode to NONE only.
    const firstMode = freeDraw.mode(NONE);
    t.is(firstMode, NONE);
    t.is(freeDraw.mode(), NONE);
    t.falsy(node.classList.contains('mode-create'));
    t.falsy(node.classList.contains('mode-edit'));
    t.falsy(node.classList.contains('mode-delete'));
    t.falsy(node.classList.contains('mode-append'));

    // Update to CREATE and EDIT only.
    const secondMode = freeDraw.mode(CREATE | EDIT);
    t.is(secondMode, CREATE | EDIT);
    t.is(freeDraw.mode(), CREATE | EDIT);
    t.truthy(node.classList.contains('mode-create'));
    t.truthy(node.classList.contains('mode-edit'));
    t.falsy(node.classList.contains('mode-delete'));
    t.falsy(node.classList.contains('mode-append'));

});

test('It should be able to create a path;', t => {

    const { freeDraw, map, svg } = t.context;
    freeDraw.onAdd(map);

    // Initiate the path gene
    const cb = freeDraw.createPath(map, svg, new Point(20, 20));

    // Draw a couple of lines
    cb(new Point(40, 40));
    t.is(svg.selectAll('path').size(), 1);
    cb(new Point(60, 60));
    t.is(svg.selectAll('path').size(), 2);
    cb(new Point(120, 120));
    t.is(svg.selectAll('path').size(), 3);

});
