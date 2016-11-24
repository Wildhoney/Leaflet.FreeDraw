import { Point } from 'leaflet';
import { Clipper, PolyFillType } from 'clipper-lib';

/**
 * @method latLngsToClipperPoints
 * @param {Object} map
 * @param {LatLng[]} latLngs
 * @return {Array}
 */
export const latLngsToClipperPoints = (map, latLngs) => {

    return latLngs.map(latLng => {
        const point = map.latLngToLayerPoint(latLng);
        return { X: point.x, Y: point.y };
    });

};

/**
 * @method clipperPolygonsToLatLngs
 * @param {Object} map
 * @param {Array} polygons
 * @return {Array}
 */
const clipperPolygonsToLatLngs = (map, polygons) => {

    return polygons.map(polygon => {

        return polygon.map(point => {
            const updatedPoint = new Point(point.X, point.Y);
            return map.layerPointToLatLng(updatedPoint);
        });

    });

};

/**
 * @param {Object} map
 * @param {LatLng[]} latLngs
 * @param {Number} simplifyFactor
 * @return {LatLng[]}
 */
export default (map, latLngs, { simplifyFactor }) => {

    const points = Clipper.CleanPolygon(latLngsToClipperPoints(map, latLngs), simplifyFactor);
    const polygons = Clipper.SimplifyPolygon(points, PolyFillType);

    return clipperPolygonsToLatLngs(map, polygons);

};
