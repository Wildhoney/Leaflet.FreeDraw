import { Point } from 'leaflet';
import { flatten, identical, complement } from 'ramda';
import { Clipper, PolyFillType } from 'clipper-lib';
import { createFor, removeFor } from './Polygon';
import { latLngsToClipperPoints } from './Simplify';

/**
 * @method fillPolygon
 * @param {Object} map
 * @param {Array} polygons
 * @param {Object} options
 * @return {Array}
 */
export function fillPolygon(map, polygon, options) {

    // Simplify the polygon which prevents voids in its shape.
    const points = latLngsToClipperPoints(map, polygon.getLatLngs()[0]);
    Clipper.SimplifyPolygon(points, PolyFillType.pftNonZero);
    removeFor(map, polygon);

    // Convert the Clipper points back into lat/lng pairs.
    const latLngs = points.map(model => map.layerPointToLatLng(new Point(model.X, model.Y)));

    createFor(map, latLngs, options, true);

}

/**
 * @param {Object} map
 * @param {Array} polygons
 * @param {Object} options
 * @return {Array}
 */
export default (map, polygons, options) => {

    const analysis = polygons.reduce((accum, polygon) => {

        const latLngs = polygon.getLatLngs()[0];
        const points = latLngsToClipperPoints(map, polygon.getLatLngs()[0]);
        const bounds = polygon.getBounds();

        // Determine if the current polygon intersects any of the other polygons currently on the map.
        const intersects = polygons.filter(complement(identical(polygon))).some(polygon => {
            return bounds.intersects(polygon.getBounds());
        });

        const key = intersects ? 'intersecting' : 'rest';

        return {
            ...accum,
            [key]: [...accum[key], intersects ? points : latLngs],
            intersectingPolygons: intersects ? [...accum.intersectingPolygons, polygon] : accum.intersectingPolygons
        };

    }, { intersecting: [], rest: [], intersectingPolygons: [] });

    // Merge all of the polygons.
    const mergePolygons = Clipper.SimplifyPolygons(analysis.intersecting, PolyFillType.pftNonZero);

    // Remove all of the existing polygons that are intersecting another polygon.
    analysis.intersectingPolygons.forEach(polygon => removeFor(map, polygon));

    return flatten(mergePolygons.map(polygon => {

        // Determine if it's an intersecting polygon or not.
        const latLngs = polygon.map(model => {
            return map.layerPointToLatLng(new Point(model.X, model.Y));
        });

        // Create the polygon, but this time prevent any merging, otherwise we'll find ourselves
        // in an infinite loop.
        return createFor(map, latLngs, options, true);

    }));

};
