import { DomUtil } from 'leaflet';
import { NONE, CREATE, EDIT, DELETE, APPEND } from './Modes';

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
