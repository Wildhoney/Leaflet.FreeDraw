describe('Leaflet FreeDraw', function() {

    var freeDraw = {};

    /**
     * @method createMockPolygon
     * @return {L.Polygon|Boolean}
     */
    var createMockPolygon = function createMockPolygon() {

        var latLngs = [new L.LatLng(10, 15), new L.LatLng(15, 18), new L.LatLng(18, 9), new L.LatLng(9, 14)],
            polygon = freeDraw.createPolygon(latLngs);

        if (!polygon) {
            return false;
        }

        // Define some make-believe edges.
        polygon._parts[0] = [new L.Point(100, 100), new L.Point(200, 200)];

        return polygon;

    };

    beforeEach(function() {

        var element = document.createElement('div'),
            map     = L.map(element).setView([51.505, -0.09], 14);

        freeDraw = new L.FreeDraw({
            mode: L.FreeDraw.MODES.ALL
        });

        map.addLayer(freeDraw);

        // Required to be a valid Leaflet.js module!
        expect(typeof freeDraw.initialize).toBe('function');
        expect(typeof freeDraw.onAdd).toBe('function');
        expect(typeof freeDraw.onRemove).toBe('function');

        // Mock the `emitPolygonCount` since it is problematic in tests.
        spyOn(freeDraw, 'emitPolygonCount');

    });

    it('Should be able to configure the various modes correctly;', function() {

        expect(L.FreeDraw.MODES.VIEW).toEqual(2 >> 1);
        expect(L.FreeDraw.MODES.CREATE).toEqual(4 >> 1);
        expect(L.FreeDraw.MODES.EDIT).toEqual(8 >> 1);
        expect(L.FreeDraw.MODES.DELETE).toEqual(16 >> 1);
        expect(L.FreeDraw.MODES.APPEND).toEqual(32 >> 1);

        expect(L.FreeDraw.MODES.EDIT_APPEND).toEqual(L.FreeDraw.MODES.EDIT | L.FreeDraw.MODES.APPEND);
        expect(L.FreeDraw.MODES.ALL).toEqual
        (
            L.FreeDraw.MODES.CREATE | L.FreeDraw.MODES.EDIT |
            L.FreeDraw.MODES.DELETE | L.FreeDraw.MODES.APPEND | L.FreeDraw.MODES.VIEW
        );

    });

    it('Should be able to throw an exception;', function() {

        expect(function throwException() {
            L.FreeDraw.Throw('We threw an exception!');
        }).toThrow('Leaflet.FreeDraw: We threw an exception!.');

    });

    it('Should be able to provide a unique list of latitude/longitude values;', function() {

        var latLngs = [new L.LatLng(100, 100), new L.LatLng(120, 120), new L.LatLng(100, 100)];
        expect(freeDraw.uniqueLatLngs(latLngs).length).toEqual(2);

    });

    it('Should be able to prevent the drawing of multiple polygons;', function() {

        var firstPolygon = createMockPolygon(),
            secondPolygon = createMockPolygon(),
            thirdPolygon = createMockPolygon();

        expect(freeDraw.getPolygons(true).length).toEqual(3);
        freeDraw.clearPolygons();
        freeDraw.destroyPolygon(firstPolygon);
        freeDraw.destroyPolygon(secondPolygon);
        freeDraw.destroyPolygon(thirdPolygon);
        expect(freeDraw.getPolygons(true).length).toEqual(0);

        // Prevent the user from drawing multiple polygons!
        freeDraw.options.allowMultiplePolygons(false);

        // Attempt to create two polygons.
        createMockPolygon(); createMockPolygon();
        expect(freeDraw.getPolygons(true).length).toEqual(1);

    });

    it('Should be able to cancel the current action;', function() {

        freeDraw.creating   = 'Creating';
        freeDraw.movingEdge = 'Moving';

        // Cancel the current action!
        freeDraw.cancelAction();

        expect(freeDraw.creating).toEqual(false);
        expect(freeDraw.movingEdge).toBeNull();

    });

    it('Should be able to perform events in silent mode;', function() {

        expect(freeDraw.silenced).toBeFalsy();

        freeDraw.silently(function() {
            expect(freeDraw.silenced).toBeTruthy();
        });

        expect(freeDraw.silenced).toBeFalsy();

    });

    it('Should be able to set/unset the mode accordingly;', function() {

        freeDraw.setMode(L.FreeDraw.MODES.CREATE);
        expect(freeDraw.mode).toEqual(L.FreeDraw.MODES.CREATE);

        freeDraw.unsetMode(L.FreeDraw.MODES.CREATE);
        expect(freeDraw.mode).toEqual(L.FreeDraw.MODES.VIEW);

        freeDraw.setMode(L.FreeDraw.MODES.CREATE | L.FreeDraw.MODES.APPEND);
        expect(freeDraw.mode).toEqual(L.FreeDraw.MODES.CREATE | L.FreeDraw.MODES.APPEND);

    });

    it('Should be able to convert lat/longs to ClipperJS points;', function() {

        var latLngs = [new L.LatLng(10, 100), new L.LatLng(20, 210), new L.LatLng(185, 95)],
            points  = freeDraw.latLngsToClipperPoints(latLngs);

        expect(points[0].X).toBeDefined();
        expect(points[0].Y).toEqual(585290);
        expect(points.length).toEqual(3);

    });

    it('Should be able to convert ClipperJS polygons to flattened lat/lngs;', function() {

        var latLngs         = [new L.LatLng(10, 100), new L.LatLng(20, 210), new L.LatLng(185, 95)],
            firstPolygon    = freeDraw.latLngsToClipperPoints(latLngs),
            secondPolygon   = freeDraw.latLngsToClipperPoints(latLngs),
            clipperPolygons = [firstPolygon, secondPolygon],
            transformed     = freeDraw.clipperPolygonsToLatLngs(clipperPolygons);

        expect(transformed.length).toEqual(6);
        expect(transformed[2].lat).toEqual(85.0511287798066);
        expect(transformed[2].lng).toEqual(94.99998092651367);

    });

    it('Should be able to create a triangle on the map and then remove it;', function() {

        var latLngs = [new L.LatLng(10, 100), new L.LatLng(20, 210), new L.LatLng(185, 95), new L.LatLng(200, 200)],
            polygon = freeDraw.createPolygon(latLngs);

        freeDraw.on('markers', function markersReceived(eventData) {
            expect(eventData.latLngs).toBeDefined();
        });

        expect(polygon instanceof L.Polygon).toBeTruthy();
        expect(polygon._latlngs).toBeDefined();
        expect(freeDraw.getPolygons(true).length).toEqual(1);
        expect(freeDraw.polygonCount).toEqual(1);

        freeDraw.destroyPolygon(polygon);
        expect(freeDraw.getPolygons(true).length).toEqual(0);
        expect(freeDraw.polygonCount).toEqual(0);

    });

    it('Should be able to create and remove the edges belonging to a polygon;', function() {

        var firstLatLngs  = [new L.LatLng(10, 15), new L.LatLng(15, 18), new L.LatLng(18, 9), new L.LatLng(9, 14)],
            secondLatLngs = [new L.LatLng(12, 15), new L.LatLng(15, 13), new L.LatLng(18, 9), new L.LatLng(28, 14)],
            firstPolygon  = freeDraw.createPolygon(firstLatLngs),
            secondPolygon = freeDraw.createPolygon(secondLatLngs);

        expect(firstPolygon instanceof L.Polygon).toBeTruthy();
        expect(secondPolygon instanceof L.Polygon).toBeTruthy();
        expect(freeDraw.getPolygons(true).length).toEqual(2);

        // Define some make-believe edges.
        firstPolygon._parts[0]  = [new L.Point(100, 100), new L.Point(200, 200)];
        secondPolygon._parts[0] = [new L.Point(300, 300), new L.Point(400, 400)];

        // Add some manual edges.
        freeDraw.createEdges(firstPolygon);
        expect(freeDraw.edges.length).toEqual(4);
        freeDraw.createEdges(secondPolygon);
        expect(freeDraw.edges.length).toEqual(8);

        freeDraw.destroyEdges(firstPolygon);
        expect(freeDraw.edges.length).toEqual(4);

        freeDraw.clearPolygons();
        expect(freeDraw.edges.length).toEqual(0);

    });

    it('Should be able to emit an event of the markers upon events;', function() {

        freeDraw.silently(function silently() {

            var latLngs = [new L.LatLng(10, 100), new L.LatLng(20, 210), new L.LatLng(185, 95), new L.LatLng(200, 200)],
                polygon = freeDraw.createPolygon(latLngs);

            // Define some make-believe edges.
            polygon._parts[0] = [new L.Point(300, 300), new L.Point(400, 400)];

        });

        freeDraw.on('markers', function markersReceived(eventData) {

            var latLngs = eventData.latLngs;

            expect(latLngs.length).toEqual(1);
            expect(latLngs[0].length).toEqual(7);

            var firstLatLng = latLngs[0][0],
                lastLatLng  = latLngs[0][latLngs[0].length - 1];

            // Should be a closed polygon when sharing!
            expect(firstLatLng.lat).toEqual(lastLatLng.lat);
            expect(firstLatLng.lng).toEqual(lastLatLng.lng);

        });

        // Force the notification.
        freeDraw.notifyBoundaries();

    });

    it('Should be able to re-create edges for a given polygon;', function() {

        var polygon = createMockPolygon();

        // Add some manual edges, and then attempt to re-create them.
        freeDraw.createEdges(polygon);

        spyOn(freeDraw, 'createEdges').and.callThrough();
        var edgeCount = freeDraw.recreateEdges(polygon);
        expect(edgeCount).toEqual(4);
        expect(freeDraw.createEdges).toHaveBeenCalled();

    });

    it('Should be able to resurrect any possible orphans', function(done) {

        var polygon = createMockPolygon();
        freeDraw.resurrectOrphans();

        spyOn(freeDraw, 'recreateEdges').and.callThrough();

        setTimeout(function setTimeout() {

            expect(freeDraw.recreateEdges).toHaveBeenCalled();
            done();

        }, 1);

    });

    it('Should be able to decline creating a polygon using the right mouse button;', function() {

        var event       = document.createEvent('MouseEvents'),
            mouseX      = 100,
            mouseY      = 200,
            RIGHT_CLICK = 2;
        event.initMouseEvent('mousedown', true, true, window, 1, 12, 345, mouseX, mouseY, false, false, true, false, RIGHT_CLICK, null);
        spyOn(event, 'stopPropagation');
        spyOn(event, 'preventDefault');
        freeDraw.map._container.dispatchEvent(event);
        expect(freeDraw.fromPoint.x).not.toEqual(mouseX);
        expect(freeDraw.fromPoint.y).not.toEqual(mouseY);
        expect(event.stopPropagation).not.toHaveBeenCalled();
        expect(event.preventDefault).not.toHaveBeenCalled();

    });

    it('Should be able to place the map in create mode and make a polygon;', function() {

        // Disable the simplification of polygons for this example otherwise we're at the mercy of the
        // JSClipper algorithm.
        freeDraw.options.simplifyPolygon = false;
        expect(freeDraw.getPolygons(true).length).toEqual(0);

        var event  = document.createEvent('MouseEvents'),
            mouseX = 0,
            mouseY = 0;

        // Begin the creation of a polygon.
        expect(freeDraw.creating).toBeFalsy();
        event.initMouseEvent('mousedown', true, true, window, 1, 12, 345, mouseX, mouseY, false, false, true, false, 0, null);
        freeDraw.map._container.dispatchEvent(event);
        expect(freeDraw.creating).toBeTruthy();
        expect(freeDraw.fromPoint.x).toEqual(mouseX);
        expect(freeDraw.fromPoint.y).toEqual(mouseY);
        expect(freeDraw.latLngs.length).toEqual(0);

        // Create three more points for the polygon.
        mouseX = 100;
        mouseY = 0;
        event  = document.createEvent('MouseEvents');
        event.initMouseEvent('mousemove', true, true, window, 1, 12, 345, mouseX, mouseY, false, false, true, false, 0, null);
        freeDraw.map._container.dispatchEvent(event);
        expect(freeDraw.latLngs.length).toEqual(1);

        mouseX = 100;
        mouseY = 100;
        event  = document.createEvent('MouseEvents');
        event.initMouseEvent('mousemove', true, true, window, 1, 12, 345, mouseX, mouseY, false, false, true, false, 0, null);
        freeDraw.map._container.dispatchEvent(event);
        expect(freeDraw.latLngs.length).toEqual(2);

        mouseX = 0;
        mouseY = 100;
        event  = document.createEvent('MouseEvents');
        event.initMouseEvent('mousemove', true, true, window, 1, 12, 345, mouseX, mouseY, false, false, true, false, 0, null);
        freeDraw.map._container.dispatchEvent(event);
        expect(freeDraw.latLngs.length).toEqual(3);

        // And finish the polygon creation!
        mouseX = 0;
        mouseY = 50;
        spyOn(freeDraw, '_createMouseUp').and.callThrough();
        event  = document.createEvent('MouseEvents');
        event.initMouseEvent('mouseup', true, true, window, 1, 12, 345, mouseX, mouseY, false, false, true, false, 0, null);
        freeDraw.map._container.dispatchEvent(event);
        expect(freeDraw._createMouseUp).toHaveBeenCalled();
        expect(freeDraw.creating).toBeFalsy();
        expect(freeDraw.getPolygons(true).length).toEqual(1);

    });

    it('Should be able to report the current mode;', function() {

        freeDraw.on('mode', function modeReceived(eventData) {
            expect(eventData.mode).toEqual(L.FreeDraw.MODES.DELETE);
        });

        freeDraw.setMode(L.FreeDraw.MODES.DELETE);
        freeDraw.off('mode');

        freeDraw.on('mode', function modeReceived(eventData) {
            expect(eventData.mode).toEqual(L.FreeDraw.MODES.DELETE | L.FreeDraw.MODES.APPEND);
        });

        freeDraw.setMode(L.FreeDraw.MODES.DELETE | L.FreeDraw.MODES.APPEND);
        freeDraw.off('mode');

        freeDraw.on('mode', function modeReceived(eventData) {
            expect(eventData.mode).toEqual(L.FreeDraw.MODES.VIEW);
        });

        freeDraw.unsetMode(L.FreeDraw.MODES.DELETE | L.FreeDraw.MODES.APPEND);
        freeDraw.off('mode');

    });

    it('Should be able to create and destroy the D3 layer;', function() {

        freeDraw.destroyD3();
        expect(typeof freeDraw.svg).toEqual('object');
        expect(freeDraw.svg.toString()).toEqual('[object Object]');
        freeDraw.createD3();
        expect(freeDraw.svg.toString()).toEqual('[object SVGSVGElement]');

    });

    it('Should be able to define the necessary classes on the map element;', function() {

        var element = freeDraw.map._container;

        // Every class should be added to the map element.
        freeDraw.setMode(L.FreeDraw.MODES.ALL);
        expect(element.classList.contains('mode-create')).toBeTruthy();
        expect(element.classList.contains('mode-edit')).toBeTruthy();
        expect(element.classList.contains('mode-view')).toBeTruthy();
        expect(element.classList.contains('mode-delete')).toBeTruthy();
        expect(element.classList.contains('mode-append')).toBeTruthy();

        freeDraw.unsetMode(L.FreeDraw.MODES.CREATE);
        expect(element.classList.contains('mode-create')).toBeFalsy();
        expect(element.classList.contains('mode-edit')).toBeTruthy();
        expect(element.classList.contains('mode-view')).toBeTruthy();
        expect(element.classList.contains('mode-delete')).toBeTruthy();
        expect(element.classList.contains('mode-append')).toBeTruthy();

        freeDraw.unsetMode(L.FreeDraw.MODES.EDIT);
        expect(element.classList.contains('mode-create')).toBeFalsy();
        expect(element.classList.contains('mode-edit')).toBeFalsy();
        expect(element.classList.contains('mode-view')).toBeTruthy();
        expect(element.classList.contains('mode-delete')).toBeTruthy();
        expect(element.classList.contains('mode-append')).toBeTruthy();

        freeDraw.unsetMode(L.FreeDraw.MODES.VIEW);
        expect(element.classList.contains('mode-create')).toBeFalsy();
        expect(element.classList.contains('mode-edit')).toBeFalsy();
        expect(element.classList.contains('mode-view')).toBeFalsy();
        expect(element.classList.contains('mode-delete')).toBeTruthy();
        expect(element.classList.contains('mode-append')).toBeTruthy();

        freeDraw.setMode(L.FreeDraw.MODES.APPEND);
        expect(element.classList.contains('mode-create')).toBeFalsy();
        expect(element.classList.contains('mode-edit')).toBeFalsy();
        expect(element.classList.contains('mode-view')).toBeFalsy();
        expect(element.classList.contains('mode-delete')).toBeFalsy();
        expect(element.classList.contains('mode-append')).toBeTruthy();

        freeDraw.setMode(0);
        expect(element.classList.contains('mode-create')).toBeFalsy();
        expect(element.classList.contains('mode-edit')).toBeFalsy();
        expect(element.classList.contains('mode-view')).toBeTruthy();
        expect(element.classList.contains('mode-delete')).toBeFalsy();
        expect(element.classList.contains('mode-append')).toBeFalsy();

    });

    it('Should be able to handle the clicking of a polygon;', function() {

        var polygon   = createMockPolygon(),
            fakeEvent = { originalEvent: { clientX: 12, clientY: 17 } };

        spyOn(freeDraw, 'destroyPolygon').and.callThrough();
        spyOn(freeDraw.map, 'latLngToContainerPoint').and.callThrough();
        spyOn(L.LineUtil, 'pointToSegmentDistance').and.callThrough();

        // Simulate the click on the polygon.
        freeDraw.handlePolygonClick(polygon, fakeEvent);

        // Ensure the necessary methods were invoked
        expect(freeDraw.map.latLngToContainerPoint).toHaveBeenCalled();
        expect(L.LineUtil.pointToSegmentDistance).toHaveBeenCalled();
        expect(freeDraw.destroyPolygon).toHaveBeenCalled();

        // ...And now let's try to add a polygon elbow instead of deleting.
        polygon   = createMockPolygon();
        fakeEvent = { originalEvent: { clientX: 12, clientY: 17 } };

        expect(polygon._latlngs.length).toEqual(5);
        spyOn(freeDraw, 'createEdges').and.callThrough();
        spyOn(freeDraw, 'destroyEdges').and.callThrough();

        freeDraw.setMode(L.FreeDraw.MODES.APPEND);
        freeDraw.handlePolygonClick(polygon, fakeEvent);
        expect(freeDraw.createEdges).toHaveBeenCalled();
        expect(freeDraw.destroyEdges).toHaveBeenCalled();
        expect(polygon._latlngs.length).toEqual(6);

    });

    describe('Hull Algorithms:', function() {

        it('Should be able to specify the map instance;', function() {

            expect(freeDraw.hull.map).toBeNull();
            freeDraw.hull.setMap({ map: true });
            expect(typeof freeDraw.hull.map).toBe('object');
            expect('map' in freeDraw.hull.map).toBeTruthy();

        });

    });

    describe('Utility Methods:', function() {

        it('Should be able to transform lat/long groups into MULTIPOLYGON;', function() {

            var latLngs      = [new L.LatLng(100, 100), new L.LatLng(200, 200), new L.LatLng(300, 300)],
                multiPolygon = L.FreeDraw.Utilities.getMySQLMultiPolygon([latLngs]);

            expect(typeof multiPolygon).toBe('string');
            expect(multiPolygon).toEqual('MULTIPOLYGON(((100 100,200 200,300 300)))');

        });

        it('Should be able to transform lat/long groups into multiple POLYGON;', function() {

            var latLngs  = [new L.LatLng(100, 100), new L.LatLng(200, 200), new L.LatLng(300, 300)],
                polygons = L.FreeDraw.Utilities.getMySQLPolygons([latLngs]);

            expect(typeof polygons).toBe('object');
            expect(polygons.length).toEqual(1);
            expect(polygons[0]).toEqual('POLYGON((100 100,200 200,300 300))');

        });

    });

    describe('State Memorisation:', function() {

        it('Should be able to define the first state as an empty array;', function() {

            expect(freeDraw.memory instanceof L.FreeDraw.Memory).toBeTruthy();
            expect(Array.isArray(freeDraw.memory.states[0])).toBeTruthy();
            expect(freeDraw.memory.states[0].length).toEqual(0);

        });

        it('Should be able to add a state to the state array;', function() {

            var latLngs = [new L.LatLng(100, 100), new L.LatLng(200, 200), new L.LatLng(300, 300)];
            freeDraw.memory.save([latLngs]);
            expect(freeDraw.memory.states.length).toEqual(2);

        });

        it('Should be able to undo and redo the state;', function() {

            var latLngs = [new L.LatLng(100, 100), new L.LatLng(200, 200), new L.LatLng(300, 300)];
            freeDraw.memory.save([latLngs]);

            expect(freeDraw.memory.current).toEqual(1);
            freeDraw.memory.undo();
            expect(freeDraw.memory.current).toEqual(0);
            freeDraw.memory.redo();
            expect(freeDraw.memory.current).toEqual(1);

        });

        it('Should be able to overwrite the redo state if the user desires;', function() {

            var latLngs = [new L.LatLng(100, 100), new L.LatLng(200, 200), new L.LatLng(300, 300)];
            freeDraw.memory.save([latLngs]);

            expect(freeDraw.memory.current).toEqual(1);

            freeDraw.memory.undo();
            freeDraw.memory.save([latLngs]);

            expect(freeDraw.memory.current).toEqual(1);
            expect(freeDraw.memory.states.length).toEqual(2);

        });

        it('Should not be able to undo/redo more than is available;', function() {

            var latLngs = [new L.LatLng(100, 100), new L.LatLng(200, 200), new L.LatLng(300, 300)];
            freeDraw.memory.save([latLngs]);

            expect(freeDraw.memory.canUndo()).toBeTruthy();
            freeDraw.memory.undo();
            expect(freeDraw.memory.canUndo()).toBeFalsy();

            expect(freeDraw.memory.current).toEqual(0);
            freeDraw.memory.undo(); freeDraw.memory.undo(); freeDraw.memory.undo(); freeDraw.memory.undo();
            expect(freeDraw.memory.current).toEqual(0);

            expect(freeDraw.memory.canRedo()).toBeTruthy();
            freeDraw.memory.redo(); freeDraw.memory.redo(); freeDraw.memory.redo();
            expect(freeDraw.memory.canRedo()).toBeFalsy();
            expect(freeDraw.memory.current).toEqual(1);

        });

    });

});