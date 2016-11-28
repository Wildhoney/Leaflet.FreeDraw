import { polygons, instanceKey } from '../FreeDraw';

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
    map[instanceKey].fire('markers', { latLngs });

};
