(function($window, L, d3) {

    "use strict";

    /**
     * @method throwException
     * @param message {String}
     * @param path {String}
     * @return {void}
     */
    var throwException = function throwException(message, path) {

        if (path) {

            // Output a link for a more informative message in the EXCEPTIONS.md.
            console.error('See: https://github.com/Wildhoney/Leaflet.FreeDraw/blob/master/EXCEPTIONS.md#' + path);
        }

        // ..And then output the thrown exception.
        throw "Leaflet.FreeDraw: " + message + ".";

    };

    /**
     * @module FreeDraw
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/Leaflet.FreeDraw
     * @constructor
     */
    $window.FreeDraw = function FreeDraw(map) {

        // FreeDraw requires access to the Leaflet map instance.
        this.setMap(map);
        this.map.dragging.disable();

        // Lazily hook up the options and convex hull objects.
        this.options    = new $window.FreeDraw.Options();
        this.convexHull = new $window.FreeDraw.ConvexHull();

        // Define the line function for drawing the polygon from the user's mouse pointer.
        this.lineFunction = d3.svg.line().x(function(d) { return d.x; }).y(function(d) { return d.y; })
                                         .interpolate('linear');

        // Create a new instance of the D3 free-hand tracer.
        this.createD3();

        // Attach all of the events.
        this._attachMouseDown();
        this._attachMouseMove();
        this._attachMouseUpLeave();

    };

    /**
     * @property prototype
     * @type {Object}
     */
    $window.FreeDraw.prototype = {

        /**
         * @property map
         * @type {L.map|null}
         */
        map: null,

        /**
         * @property svg
         * @type {Object}
         */
        svg: {},

        /**
         * Determines whether the user is currently creating a polygon.
         *
         * @property creating
         * @type {Boolean}
         */
        creating: false,

        /**
         * Responsible for holding the line function that is required by D3 to draw the line based
         * on the user's cursor position.
         *
         * @property lineFunction
         * @type {Function}
         */
        lineFunction: function() {},

        /**
         * Responsible for holding an array of latitudinal and longitudinal points for generating
         * the polygon.
         *
         * @property latLngs
         * @type {Array}
         */
        latLngs: [],

        /**
         * @property options
         * @type {Object}
         */
        options: {},

        /**
         * @property convexHull
         * @type {Object}
         */
        convexHull: {},

        /**
         * @property edges
         * @type {Array}
         */
        edges: [],

        /**
         * @property allowEdit
         * @type {Boolean}
         */
        allowEdit: true,

        /**
         * Responsible for holding the coordinates of the user's last cursor position for drawing
         * the D3 polygon tracing the user's cursor.
         *
         * @property fromPoint
         * @type {Object}
         */
        fromPoint: { x: 0, y: 0 },

        /**
         * @property movingEdge
         * @type {L.polyline|null}
         */
        movingEdge: null,

        /**
         * @method setMap
         * @param map {L.map}
         * @return {void}
         */
        setMap: function setMap(map) {

            if (!map || !(map instanceof L.Map)) {

                // We didn't receive a valid `L.Map` instance during instantiation.
                throwException('Upon instantiation an instance of L.Map must be passed', 'passing-an-lmap-instance');

            }

            // Everything is okay.
            this.map = map;

        },

        /**
         * @method enableEdit
         * @return {void}
         */
        enableEdit: function enableEdit() {
            this.allowEdit = true;
            this.map.dragging.disable();
        },

        /**
         * @method disableEdit
         * @return {void}
         */
        disableEdit: function disableEdit() {
            this.allowEdit = false;
            this.map.dragging.enable();
        },

        /**
         * @method createD3
         * @return {void}
         */
        createD3: function createD3() {
            this.svg = d3.select('body').append('svg').attr('class', this.options.svgClassName)
                                    .attr('width', 200).attr('height', 200);
        },

        /**
         * @method destroyD3
         * @return {$window.FreeDraw}
         * @chainable
         */
        destroyD3: function destroyD3() {
            this.svg.remove();
            this.svg = {};
            return this;
        },

        /**
         * @method drawPolygon
         * @param latLngs {L.latLng[]}
         * @return {L.polyline}
         */
        drawPolygon: function drawPolygon(latLngs) {

            // Begin to create a brand-new polygon.
            this.destroyD3().createD3();

            var polyline = L.polyline(latLngs, {
                color: '#D7217E',
                weight: 0,
                fill: true,
                fillColor: '#D7217E',
                fillOpacity: 0.75,
                smoothFactor: this.options.smoothFactor
            }).addTo(this.map);

            this.attachEdges(polyline);
            return polyline;

        },

        /**
         * @method attachEdges
         * @param polygon {L.polyline}
         * @return {void}
         */
        attachEdges: function attachEdges(polygon) {

            // Extract the parts from the polygon.
            var parts = polygon._parts[0];

            parts.forEach(function forEach(point, index) {

                // Leaflet creates elbows in the polygon, which we need to utilise to add the
                // points for modifying its shape.
                var edge = L.divIcon({ className: this.options.iconClassName }),
                    latLng     = this.map.layerPointToLatLng(point);

                edge = L.marker(latLng, { icon: edge }).addTo(this.map);

                // Marker requires instances so that it can modify its shape.
                edge._polygon = polygon;
                edge._index   = index;
                edge._length  = parts.length;
                this.edges.push(edge);

                edge.on('mousedown', function onMouseDown(event) {
                    event.originalEvent.preventDefault();
                    event.originalEvent.stopPropagation();
                    this.movingEdge = event.target;
                }.bind(this));

            }.bind(this));
            
        },

        updatePolygonEdge: function updatePolygon(edge, posX, posY) {

            var updatedLatLng = this.map.containerPointToLatLng(L.point(posX, posY));
            edge.setLatLng(updatedLatLng);
    
            // Fetch all of the edges in the group based on the polygon.
            var edges = this.edges.filter(function filter(marker) {
                return marker._polygon === edge._polygon;
            });
    
            var updatedLatLngs = [];
            edges.forEach(function forEach(marker) {
                updatedLatLngs.push(marker.getLatLng());
            });
    
            // Update the latitude and longitude values.
            edge._polygon.setLatLngs(updatedLatLngs);
            edge._polygon.redraw();
    
        },

        /**
         * @method _attachMouseDown
         * @return {void}
         * @private
         */
        _attachMouseDown: function _attachMouseDown() {

            this.map.on('mousedown', function onMouseDown(event) {

                if (!this.allowEdit) {
                    return;
                }

                var originalEvent = event.originalEvent;

                originalEvent.stopPropagation();
                originalEvent.preventDefault();

                this.latLngs   = [];
                this.creating  = true;
                this.fromPoint = { x: originalEvent.clientX, y: originalEvent.clientY };

            }.bind(this));

        },

        /**
         * @method _attachMouseMove
         * @private
         */
        _attachMouseMove: function _attachMouseMove() {

            this.map.on('mousemove', function onMouseMove(event) {

                var originalEvent = event.originalEvent;

                if (this.movingEdge) {

                    // User is in fact modifying the shape of the polygon.
                    this._editMouseMove(originalEvent);
                    return;

                }

                if (!this.creating) {

                    // We can't do anything else if the user is not in the process of creating a brand-new
                    // polygon.
                    return;

                }

                this._createMouseMove(originalEvent);

            }.bind(this));

        },

        /**
         * @method _editMouseMove
         * @param event {Object}
         * @return {void}
         * @private
         */
        _editMouseMove: function _editMouseMove(event) {

            var pointModel = L.point(event.clientX, event.clientY);

            // Modify the position of the marker on the map based on the user's mouse position.
            var styleDeclaration = this.movingEdge._icon.style;
            styleDeclaration[L.DomUtil.TRANSFORM] = pointModel;

            // Update the polygon's shape in real-time as the user drags their cursor.
            this.updatePolygonEdge(this.movingEdge, pointModel.x, pointModel.y);

//            /**
//             * Responsible for maintaining a closed polygon if the user selects the last marker in the
//             * array of edges.
//             *
//             * @method maintainPolygon
//             * @return {void}
//             */
//            (function maintainPolygon() {
//
//                // Determine if the selected polygon is indeed the last one in the array.
//                var isLast = this.movingEdge._index === ((this.movingEdge._length) - 1);
//
//                if (isLast) {
//
//                    // Locate the first marker in the array.
//                    var firstMarker = this.edges.filter(function filter(marker) {
//                        return marker._polygon === this.movingEdge._polygon;
//                    })[0];
//
//                    // ..And then update the polygon to maintain the closed polygon.
//                    this.updatePolygonEdge(firstMarker, pointModel.x, pointModel.y);
//
//                }
//
//            })();
            
        },

        /**
         * @method _attachMouseUpLeave
         * @return {void}
         * @private
         */
        _attachMouseUpLeave: function _attachMouseUpLeave() {

            this.map.on('mouseup mouseleave', function onMouseUpAndMouseLeave() {

                if (this.movingEdge) {

//                    this.sharePolygonBoundaries(this.pointerEdit._polygon);
                    this.movingEdge = null;
                    return;
                    
                }
                
                this._createMouseUp();
                
            }.bind(this));

        },

        /**
         * @method _createMouseMove
         * @param event {Object}
         * @return {void}
         * @private
         */
        _createMouseMove: function _createMouseMove(event) {

            // Grab the cursor's position from the event object.
            var pointerX = event.clientX,
                pointerY = event.clientY;

            // Resolve the pixel point to the latitudinal and longitudinal equivalent.
            var point  = L.point(pointerX, pointerY),
                latLng = this.map.containerPointToLatLng(point);

            // Line data that is fed into the D3 line function we defined earlier.
            var lineData = [this.fromPoint, { x: pointerX, y: pointerY }];

            // Draw SVG line based on the last movement of the mouse's position.
            this.svg.append('path').attr('d', this.lineFunction(lineData))
                .attr('stroke', '#D7217E').attr('stroke-width', 2).attr('fill', 'none');

            // Take the pointer's position from the event for the next invocation of the mouse move event,
            // and store the resolved latitudinal and longitudinal values.
            this.fromPoint.x = pointerX;
            this.fromPoint.y = pointerY;
            this.latLngs.push(latLng);

        },

        /**
         * @method _createMouseUp
         * @return {void}
         * @private
         */
        _createMouseUp: function _createMouseUp() {

            // User has finished creating their polygon!
            this.creating = false;

            if (this.latLngs.length === 0) {

                // User has failed to drag their cursor enough to create a valid polygon.
                return;

            }

            if (this.options.convexHullAlgorithm) {

                var hullLatLngs = [],
                    points      = [];

                this.latLngs.forEach(function forEach(latLng) {

                    // Resolve each latitude/longitude to its respective container point.
                    points.push(this.map.latLngToContainerPoint(latLng));

                }.bind(this));

                // Use the defined convex hull algorithm.
                var resolvedPoints = this.convexHull[this.options.convexHullAlgorithm](points);

                resolvedPoints.forEach(function forEach(point) {
                    hullLatLngs.push(this.map.containerPointToLatLng(point));
                }.bind(this));

            }

            // Required for joining the two ends of the free-hand drawing to create a closed polygon.
            this.latLngs.push(this.latLngs[0]);

            // Physically draw the Leaflet generated polygon.
            this.drawPolygon(hullLatLngs || this.latLngs);
            this.latLngs = [];

        }

    };

})(window, window.L, window.d3);