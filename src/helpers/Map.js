import { point } from 'leaflet';

/**
 * {@link https://github.com/Leaflet/Leaflet/issues/1542#issuecomment-151679021}
 * @param {TouchEvent} event
 * @param {HTMLElement} container
 * @return {L.Point}
 */
export const touchEventToContainerPoint = (event, container) => {
    const touch = event.touches[0];
    const rect = container.getBoundingClientRect();

    const lat = touch.clientX - rect.left - container.clientLeft;
    const lng = touch.clientY - rect.top - container.clientTop;

    return point(lat, lng);
};
