import { Point } from 'leaflet';
import flatten from 'ramda/src/flatten';
import { Clipper, PolyFillType } from 'clipper-lib';
import { createFor, removeFor } from './Polygon';
import { latLngsToClipperPoints } from './Simplify';

/**
 * @param {Object} map
 * @param {Array} polygons
 * @param {Object} options
 * @return {Array}
 */
export default (map, polygons, options) => {

    // Transform all of the polygon lat longs into Clipper point models.
    const points = polygons.map(polygon => {
        return latLngsToClipperPoints(map, polygon.getLatLngs()[0]);
    });

    // Merge all of the polygons.
    const mergePolygons = Clipper.SimplifyPolygons(points, PolyFillType.pftNonZero);

    // Remove all of the existing polygons on the map.
    polygons.forEach(polygon => removeFor(map, polygon));

    return flatten(mergePolygons.map(polygon => {

        const latLngs = polygon.map(model => {
            return map.layerPointToLatLng(new Point(model.X, model.Y));
        });

        // Create the polygon, but this time prevent any merging, otherwise we'll find ourselves
        // in an infinite loop.
        return createFor(map, latLngs, options, true);

    }));

};
