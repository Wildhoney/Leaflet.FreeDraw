import { DivIcon, Marker, DomEvent } from 'leaflet';
import { polygons, modesKey, notifyDeferredKey } from '../FreeDraw';
import { createFor } from './Polygon';
import { updateFor } from './Layer';
import { CREATE, EDIT } from './Flags';
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

        return polygon.getLatLngs()[0].map(latLng => {
            return map.latLngToLayerPoint(latLng);
        });

    };

    const markers = fetchLayerPoints(polygon).map(point => {

        const mode = map[modesKey];
        const icon = new DivIcon({ className: `leaflet-edge ${mode & EDIT ? '' : 'disabled'}`.trim() });
        const latLng = map.layerPointToLatLng(point);
        const marker = new Marker(latLng, { icon }).addTo(map);

        // Disable the propagation when you click on the marker.
        DomEvent.disableClickPropagation(marker);

        marker.on('mousedown', function mouseDown() {

            if (!(map[modesKey] & EDIT)) {

                // Polygons can only be created when the mode includes edit.
                map.off('mousedown', mouseDown);
                return;

            }

            // Disable the map dragging as otherwise it's difficult to reposition the edge.
            map.dragging.disable();

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

                if (!(map[modesKey] & CREATE)) {

                    // Re-enable the dragging of the map only if created mode is not enabled.
                    map.dragging.enable();

                }

                // Stop listening to the events.
                map.off('mouseup', mouseUp);
                map.off('mousedown', mouseDown);
                map.off('mousemove', mouseMove);

                // We can optionally recreate the polygon after modifying its shape, as sometimes edges/
                // become "detached" and thus if we choose to re-render the polygon afterwards, those edges
                // will disappear, otherwise they will remain and look somewhat detached, yet still active.
                if (options.recreateAfterEdit) {

                    // Remove all of the existing markers for the current polygon.
                    markers.forEach(marker => map.removeLayer(marker));

                    // As well as the polygon itself.
                    map.removeLayer(polygon);

                    // ...And then recreate the polygon using the updated lat longs.
                    const latLngs = markers.map(marker => marker.getLatLng());
                    createFor(map, latLngs, options);

                }

                // Merge the polygons if the options allow using a two-pass approach as this yields the better results.
                const merge = () => mergePolygons(map, Array.from(polygons.get(map)), options);
                options.mergePolygons && merge() && merge();

                // Trigger the event for having modified the edges of a polygon, unless the `notifyAfterEditExit`
                // option is equal to `true`, in which case we'll defer the notification.
                options.notifyAfterEditExit ? (() => {

                    // Deferred function that will be invoked by `modeFor` when the `EDIT` mode is exited.
                    map[notifyDeferredKey] = () => updateFor(map);

                })() : updateFor(map);

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
