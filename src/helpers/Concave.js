import ConcaveHull from 'concavehull';

/**
 * @param {Object} map
 * @param {LatLng[]} latLngs
 * @return {LatLng[]}
 */
export default (map, latLngs) => {
    return new ConcaveHull([ ...latLngs, latLngs[0] ]).getLatLngs();
};
