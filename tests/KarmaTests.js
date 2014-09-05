describe('Leaflet FreeDraw', function() {

    var freeDraw = {};

    /**
     * @method getPolygon
     * @param name {String}
     * @return {String}
     */
    var getPolygon = function getPolygon(name) {
        return JSON.parse(window.__html__['tests/fixtures/' + name + '.json']);
    };

    beforeEach(function() {

        var element = document.body.appendChild(document.createElement('div')),
            map     = L.map(element).setView([51.505, -0.09], 14);

        freeDraw = new L.FreeDraw({
            mode: L.FreeDraw.MODES.ALL
        });

        map.addLayer(freeDraw);

    });

    it('Should be able to create a polygon on the map with merging', function() {

        var lambethPolygon = freeDraw.createPolygon(getPolygon('Lambeth-SouthBank')),
            lambethEdges   = lambethPolygon._parts[0].length;
        expect(lambethPolygon instanceof L.Polygon).toBeTruthy();
        expect(freeDraw.getPolygons().length).toEqual(1);
        expect(freeDraw.edges.length).toEqual(lambethEdges);

        var bermondseyPolygon = freeDraw.createPolygon(getPolygon('Bermondsey')),
            bermondseyEdges   = bermondseyPolygon._parts[0].length;
        expect(bermondseyPolygon instanceof L.Polygon).toBeTruthy();
        expect(freeDraw.getPolygons().length).toEqual(2);
        expect(freeDraw.edges.length).toEqual(bermondseyEdges + lambethEdges);

        // Because of merged polygons it should equal 2, not 3.
        freeDraw.on('markers', function markersReceived(eventData) {

            expect(eventData.latLngs.length).toEqual(2);
            expect(eventData.latLngs[0].length).toEqual(11);

            var firstLatLng = eventData.latLngs[0][0],
                lastLatLng  = eventData.latLngs[0][eventData.latLngs[0].length - 1];

            // Should be a closed polygon when sharing!
            expect(firstLatLng.lat).toEqual(lastLatLng.lat);
            expect(firstLatLng.lng).toEqual(lastLatLng.lng);

        });

        // Southwark polygon should merge with the Lambeth polygon as they converge.
        var southwarkPolygon        = freeDraw.createPolygon(getPolygon('Southwark-Borough')),
            southwarkEdgesPostMerge = 12;
        expect(southwarkPolygon instanceof L.Polygon).toBeTruthy();
        expect(freeDraw.getPolygons().length).toEqual(2);
        expect(freeDraw.edges.length).toEqual(bermondseyEdges + lambethEdges + southwarkEdgesPostMerge);
        freeDraw.off('markers');

        // ...And now we'll remove a polygon.
        lambethPolygon = freeDraw.getPolygons()[0];
        expect(freeDraw.getPolygons().length).toEqual(2);
        freeDraw.destroyPolygon(lambethPolygon);
        expect(freeDraw.getPolygons().length).toEqual(1);

        // ...And clear the remainder of the polygons.
        freeDraw.clearPolygons();
        expect(freeDraw.getPolygons().length).toEqual(0);
        expect(freeDraw.edges.length).toEqual(0);

    });

    it('Should be able to delete a polygon when clicked on', function() {

        // Ensure the notified boundaries are empty.
        freeDraw.on('markers', function markersReceived(eventData) {
            expect(eventData.latLngs.length).toEqual(1);
        });

        freeDraw.createPolygon(getPolygon('Lambeth-SouthBank'));
        var fakeEvent  = { originalEvent: { clientX: 200, clientY: 200 } },
        lambethPolygon = freeDraw.getPolygons()[0];
        freeDraw.off('markers');

        // Ensure the edges relate to the polygon.
        expect(freeDraw.edges[0]._freedraw.polygon).toEqual(lambethPolygon);

        freeDraw.unsetMode(L.FreeDraw.MODES.DELETE);
        freeDraw.handlePolygonClick(lambethPolygon, fakeEvent);
        expect(freeDraw.getPolygons(true).length).toEqual(1);

        // Ensure the notified boundaries are empty.
        freeDraw.on('markers', function markersReceived(eventData) {
            expect(eventData.latLngs.length).toEqual(0);
        });

        freeDraw.setMode(L.FreeDraw.MODES.DELETE);
        freeDraw.handlePolygonClick(lambethPolygon, fakeEvent);
        expect(freeDraw.getPolygons().length).toEqual(0);
        expect(freeDraw.getPolygons(true).length).toEqual(0);

        freeDraw.destroyEdges(lambethPolygon);
        expect(freeDraw.edges.length).toEqual(0);

    });

});