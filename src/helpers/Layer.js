import { DomUtil } from 'leaflet';
import { polygons, instanceKey } from '../FreeDraw';
import { NONE, CREATE, EDIT, DELETE, APPEND } from './Flags';

/**
 * @method updateFor
 * @param {Object} map
 * @return {void}
 */
export const updateFor = map => {

    const latLngs = Array.from(polygons.get(map)).map(polygon => {

        // Ensure the polygon has been closed.
        const latLngs = polygon.getLatLngs();
        return [ ...latLngs[0], latLngs[0][0] ];

    });

    // Fire the current set of lat lngs.
    map[instanceKey].fire('markers', { latLngs });

};

/**
 * @method classesFor
 * @param {Object} map
 * @param {Number} mode
 * @return {void}
 */
export const classesFor = (map, mode) => {

    /**
     * @constant modeMap
     * @type {Object}
     */
    const modeMap = {
        [NONE]: 'mode-none',
        [CREATE]: 'mode-create',
        [EDIT]: 'mode-edit',
        [DELETE]: 'mode-delete',
        [APPEND]: 'mode-append'
    };

    Object.keys(modeMap).forEach(key => {

        const className = modeMap[key];
        const isModeActive = mode & key;

        // Remove the class name if it's set already on the map container.
        DomUtil.removeClass(map._container, className);

        // Apply the class names to the node container depending on whether the mode is active.
        isModeActive && DomUtil.addClass(map._container, className);

    });

};
