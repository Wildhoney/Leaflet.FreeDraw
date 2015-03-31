Leaflet.FreeDraw
================

![Travis](http://img.shields.io/travis/Wildhoney/Leaflet.FreeDraw.svg?style=flat)
&nbsp;
![npm](http://img.shields.io/npm/v/leaflet.freedraw.svg?style=flat)
&nbsp;
![MIT License](http://img.shields.io/badge/license-MIT-lightgrey.svg?style=flat)
&nbsp;
![IE9+](http://img.shields.io/badge/support-IE9-blue.svg?style=flat)

* **Heroku**: [http://freedraw.herokuapp.com/](http://freedraw.herokuapp.com/)
* **Bower:** `bower install leaflet.freedraw`;

Use [Leaflet.draw](https://github.com/Leaflet/Leaflet.draw) for drawing pre-defined polygons and linear shapes &ndash; `Leaflet.FreeDraw`'s selling point is that it allows you to freely draw a polygon like [Zoopla](http://www.zoopla.co.uk/for-sale/map/property/london/?include_retirement_homes=true&include_shared_ownership=true&new_homes=include&q=London&results_sort=newest_listings&search_source=home&pn=1&view_type=map). Hulls are also supported to normalise polygons when users draw an insane polygon &ndash; currently `Leaflet.FreeDraw` supports Brian Barnett's [Graham Scan module](https://github.com/brian3kb/graham_scan_js) and my adaptation of the [concave hull algorithm](https://github.com/Wildhoney/ConcaveHull).

`L.FreeDraw` has been tested in IE9+

![FreeDraw Screenshot](http://i.imgur.com/5ab3P4j.png)

---

## Getting Started

`L.FreeDraw` follows the same convention as other modules, and therefore you should invoke the `addLayer` on your map instance &ndash; passing in an instance of `L.FreeDraw`.

```javascript
// Create Leaflet.js instance and then add FreeDraw on top.
var map = L.map('map').setView([51.505, -0.09], 14);
map.addLayer(new L.FreeDraw());
```

Upon instantiation of `L.FreeDraw` you can immediately define the mode &ndash; with the default being `L.FreeDraw.MODES.VIEW` &ndash; please see [modes](#modes) for more information.

```javascript
// Allow the user to only create and edit polygons.
map.addLayer(new L.FreeDraw({
    mode: L.FreeDraw.MODES.CREATE | L.FreeDraw.MODES.EDIT
}));
```

Worth noting is that Leaflet.js often ships with `new`able equivalents &ndash; such as `L.map` for `new L.Map` &mdash; [see why here](http://37.media.tumblr.com/6a9fcffde2da977266b0ea99b15d5803/tumblr_n42cjjsriB1smcbm7o1_400.gif) &mdash; `L.FreeDraw` follows the same convention and provides a convenient `L.freeDraw` method for instantiating `L.FreeDraw` for you whilst passing through the options.

![Washes Right Off](http://images1.fanpop.com/images/photos/2500000/Calvin-and-Hobbes-Comic-Strips-calvin-and-hobbes-2509598-600-191.gif)

Furthermore by invoking the `cancelAction` method you can cancel the current action &ndash; such as drawing a polygon &ndash; this method is especially useful for allowing the user to cancel their action by pressing the escape key.

## Fetching Markers

Once the user has created, deleted, or edited a polygon, you'll likely wish to load in markers based on the polygons visible &ndash; with `L.FreeDraw` the event `markers` is emitted with an array of `L.LatLng` objects in the first argument as `eventData.latLngs`:

```javascript
freeDraw.on('markers', function getMarkers(eventData) {
    var latLngs = eventData.latLngs;
    // ...
});
```

Once you have your markers it's entirely up to you to add them to your Leaflet.js map using the [marker methods](http://leafletjs.com/reference.html#marker).

## Options

FreeDraw has quite a few options &ndash; all of which can be seen by taking a look at the `L.FreeDraw.Options` object. However, there are certain options that you are likely to use more than others.

```javascript
// Prevent the rendering of the polygon via a convex/concave hull.
freeDraw.options.setHullAlgorithm(false);

// Utilise Brian Barnett's convex hull.
freeDraw.options.setHullAlgorithm('brian3kb/graham_scan_js');

// ...Or my adaptation of the concave hull.
freeDraw.options.setHullAlgorithm('Wildhoney/ConcaveHull');
```

For the hull algorithm implementations, take a look at the [following paper](http://ubicomp.algoritmi.uminho.pt/local/concavehull.html) on convex hulls and concave hulls.

All of the polygons drawn with `L.FreeDraw` can be modified using the options and [standard CSS](http://tutorials.jenkov.com/svg/svg-and-css.html).

Once the user has drawn their free-hand drawing, it is converted into a polygon by Leaflet.js &ndash; you can define how smooth the rendered polygon is by using the `setSmoothFactor` method &ndash; by default the `smoothFactor` is **5**.

### Polygon Mutation

When a user is modifying a polygon the `markers` event is emitted each and every time &ndash; which may be overkill, especially if your requests are somewhat time consuming. In this case `L.FreeDraw` allows you to defer the fetching of markers for when the edit mode has been exited with `freeDraw.options.setBoundariesAfterEdit(true)`.

### Polygon Intersection

By invoking the `freeDraw.allowPolygonMerging(true)` method, `L.FreeDraw` will attempt to join up any polygons that intersect.

### Exit Create Mode

After drawing a polygon the `L.FreeDraw.MODES.CREATE` mode will automatically be exited &ndash; but this can be suppressed by specifying `freeDraw.options.exitModeAfterCreate(false)` in which case the create mode will be persisted until the user explicitly exits it.

## Modes

FreeDraw by default uses the `L.FreeDraw.MODES.VIEW` mode which prevents the user from creating, editing, or deleting any polygons. When instantiating `L.FreeDraw` you may override the default mode &ndash; in the following case a user may **only** delete polygons:

```javascript
var freeDraw = new L.FreeDraw({
    mode: L.FreeDraw.MODES.DELETE
});
```

In specifying the mode you are using [bitwise operators](http://en.wikipedia.org/wiki/Bitwise_operation) with the mapping being as follows:

```javascript
L.FreeDraw.MODES = {
    VIEW:        1,
    CREATE:      2,
    EDIT:        4,
    DELETE:      8,
    APPEND:      16,
    EDIT_APPEND: 4 | 16,
    ALL:         1 | 2 | 4 | 8 | 16
}
```

Therefore you're able to combine the bitwise operators to specify multiple modes. For example, if you would like to allow the user to create and delete, then you would specify the options as `L.FreeDraw.MODES.CREATE | L.FreeDraw.MODES.DELETE`. By allowing a user to perform every action you would have to concatenate all of the modes via the pipe (`|`) character &ndash; therefore `L.FreeDraw` provides the convenient `L.FreeDraw.MODES.ALL` property which does that for you.

Using the `L.FreeDraw.MODES.ALL` property you could easily enable all the modes **except** edit with the following: `L.FreeDraw.MODES.ALL ^ L.FreeDraw.MODES.EDIT`.

All modes allow the user to zoom and drag **except** when you have the `L.FreeDraw.MODES.CREATE` enabled &ndash; even when used in conjunction with other modes.

It's quite likely that you'll want to change the mode as the user interacts with your application &ndash; for this you have the `setMode` method which accepts an aforementioned bitwise operator for determining what actions the user is able to perform.

```javascript
// Change the mode to allow the user to only edit and delete polygons.
var freeDraw = new L.FreeDraw();
freeDraw.setMode(L.FreeDraw.MODES.EDIT | L.FreeDraw.MODES.DELETE);
```

`L.FreeDraw` also ships with the `freeDraw.unsetMode` for unsetting a mode based on the current mode.

You may also listen to updates of the mode using the `freeDraw.on('mode')` event.

### Elbow Creation

Using the `L.FreeDraw.MODES.APPEND` mode you can allow users to create new edges on the polygon. If both the `L.FreeDraw.MODES.APPEND` and `L.FreeDraw.MODES.DELETE` modes are active at the same time then some logic is applied to decide whether the user wishes to delete or create a new edge. However if `L.FreeDraw.MODES.APPEND` is active and `L.FreeDraw.MODES.DELETE` is not then any click on the polygon will create a new edge &ndash; and vice-versa for the inverse.

If you would like to control the edge size in which a new polygon will be created when both aforementioned modes are active, you can do so using the `setMaximumDistanceForElbow` method where the default is currently set to **10**.

Even when the `L.FreeDraw.MODES.APPEND` mode is active exclusively, you still may not wish for **any** click to add a new elbow, and therefore by enabling the `addElbowOnlyWithinDistance` mode a click on the polygon will stay pay attention to the `setMaximumDistanceForElbow` value.

### Class Names

Depending on the mode you can apply different CSS styles &ndash; for example when the user is not in edit mode you probably wish to hide the edges &ndash; by default all edges would be hidden, and only enabled when the `mode-edit` class has been applied to the `map` node:

```css
section.map.mode-edit div.polygon-elbow {
    opacity: 1;
    pointer-events: all;
}
```

Each mode maps to a different class which is conditionally applied to the `map` based on whether that mode is active:

 * `mode-view` maps to `L.FreeDraw.MODES.VIEW`;
 * `mode-create` maps to `L.FreeDraw.MODES.CREATE`;
 * `mode-edit` maps to `L.FreeDraw.MODES.EDIT`;
 * `mode-delete` maps to `L.FreeDraw.MODES.DELETE`;
 * `mode-append` maps to `L.FreeDraw.MODES.APPEND`;
 
Another example would be changing the `cursor` type when the user is in polygon creation mode:

```css
section.map.mode-create {
    cursor: crosshair;
}
```

You may change the class name of the polygon edges with the `setIconClassName` method, and the SVG class name with `setSVGClassName`.

# Common Issues

## Invisible Drawing Path

When you're drawing a polygon on the map, the path that is being drawn is invisible &ndash; this is caused by a handful of missing styles that you need to apply to the `svg.tracer` node:

```css
svg.tracer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```

It's worth noting that the above style properties may well be changed to suit your circumstances, but this is a good starting point.