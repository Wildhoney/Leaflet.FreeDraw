import { DivIcon, DomEvent } from 'leaflet';
import { createPolygonFor, polygons } from '../FreeDraw';
import mergePolygons from './Merge';

/**
 * @method createEdges
 * @param {Object} map
 * @param {L.Polygon} polygon
 * @param {Object} options
 * @return {Array}
 */
export default function createEdges(map, polygon, options) {

    /**
     * @method fetchLayerPoints
     * @param polygon {Object}
     * @return {Array}
     */
    const fetchLayerPoints = polygon => {

        return polygon._latlngs[0].map(latLng => {
            return map.latLngToLayerPoint(latLng);
        });

    };

    const markers = fetchLayerPoints(polygon).map(point => {

        const icon = new DivIcon({ className: 'leaflet-edge' });
        const latLng = map.layerPointToLatLng(point);
        const marker = L.marker(latLng, { icon }).addTo(map);

        // Disable the propagation when you click on the marker.
        DomEvent.disableClickPropagation(marker);

        marker.on('mousedown', function mouseDown() {

            /**
             * @method mouseMove
             * @param {Object} event
             * @return {void}
             */
            const mouseMove = event => {

                // Determine where to move the marker to from the mouse move event.
                const containerPoint = map.latLngToContainerPoint(event.latlng);
                const latLng = map.containerPointToLatLng(containerPoint);

                // Update the marker with the new lat long.
                marker.setLatLng(latLng);

                // ...And finally update the polygon to match the current markers.
                const latLngs = markers.map(marker => marker.getLatLng());
                polygon.setLatLngs(latLngs);
                polygon.redraw();

            };

            // Listen for the mouse move events to determine where to move the marker to.
            map.on('mousemove', mouseMove);

            /**
             * @method mouseUp
             * @return {void}
             */
            function mouseUp() {

                // Stop listening to the events.
                map.off('mouseup', mouseUp);
                map.off('mousedown', mouseDown);
                map.off('mousemove', mouseMove);

                // We can optionally recreate the polygon after modifying its shape, as sometimes edges/
                // become "detached" and thus if we choose to re-render the polygon afterwards, those edges
                // will disappear, otherwise they will remain and look somewhat detached, yet still active.
                if (options.recreatePostEdit) {

                    // Remove all of the existing markers for the current polygon.
                    markers.forEach(marker => map.removeLayer(marker));

                    // As well as the polygon itself.
                    map.removeLayer(polygon);

                    // ...And then recreate the polygon using the updated lat longs.
                    const latLngs = markers.map(marker => marker.getLatLng());
                    createPolygonFor(map, latLngs, options);

                }

                // Merge the polygons if the options allow.
                options.mergePolygons && mergePolygons(map, Array.from(polygons.get(map)), options);

            }

            // Cleanup the mouse events when the user releases the mouse button.
            // We need to listen on both map and marker, because if the user moves the edge too quickly then
            // the mouse up will occur on the map layer.
            map.on('mouseup', mouseUp);
            marker.on('mouseup', mouseUp);

        });

        return marker;

    });

    return markers;

}
