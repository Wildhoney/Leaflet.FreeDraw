import test from 'ava';
import { LatLng } from 'leaflet';
import { spy } from 'sinon';
import FreeDraw, { ALL, polygons } from '../src/FreeDraw';

test.beforeEach(t => {

    t.context.node = document.createElement('div');

    t.context.map = {
        on: spy(),
        fire: spy(),
        dragging: {
            disable: spy(),
            enable: spy()
        },
        _container: t.context.node,
        latLngToLayerPoint: spy(({ x, y }) => ({ X: x, Y: y }))
    };

    t.context.freeDraw = new FreeDraw({ mergePolygons: false });

});

test('It should be able to create the map instance;', t => {

    const { freeDraw, map, node } = t.context;
    freeDraw.listenForEvents = spy();
    freeDraw.onAdd(map);

    // Ensure the polygons contains the map instance, which will eventually store the polygons.
    t.truthy(polygons.has(map));

    // Ensure the mode has been set by default to `ALL`.
    t.is(freeDraw.getMode(), ALL);

    // Ensure the initial event for the modes was invoked.
    t.is(map.fire.callCount, 1);
    t.truthy(map.fire.calledWith('mode', { mode: ALL }));

    // Ensure D3 has successfully appended the SVG node.
    t.is(node.querySelectorAll('svg').length, 1);

    // Ensure the `listenForEvent` function was invoked.
    t.is(freeDraw.listenForEvents.callCount, 1);

});

test('It should be able to create polygons;', t => {

    const polygon = [new LatLng(51.50249181873096, -0.08634567260742189),
                     new LatLng(51.50281238523426, -0.09501457214355469,
                     new LatLng(51.50799456412721, -0.09441375732421875,
                     new LatLng(51.509062981334914, -0.08428573608398438,
                     new LatLng(51.50249181873096, -0.08634567260742189))))];

    const { freeDraw, map } = t.context;
    freeDraw.onAdd(map);
    freeDraw.createPolygon(polygon);

    // Ensure the simplified polygon function `latLngToLayerPoint` is invoked.
    t.is(map.latLngToLayerPoint.callCount, polygon.length + 1);

    // Ensure it's correctly added to the `polygons` set.
    // t.is(polygons.get(map).size, 1);

});
