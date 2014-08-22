Leaflet.FreeDraw
================

![Travis](http://img.shields.io/travis/Wildhoney/Leaflet.FreeDraw.svg?style=flat)
&nbsp;
![npm](http://img.shields.io/npm/v/leaflet.freedraw.svg?style=flat)
&nbsp;
![MIT License](http://img.shields.io/badge/license-MIT-lightgrey.svg?style=flat)

* **Heroku**: [http://freedraw.herokuapp.com/](http://freedraw.herokuapp.com/)
* **Bower:** `bower install leaflet.freedraw`;

Use [Leaflet.draw](https://github.com/Leaflet/Leaflet.draw) for drawing pre-defined polygons and linear shapes &ndash; `Leaflet.FreeDraw`'s selling point is that it allows you to freely draw a polygon like [Zoopla](http://www.zoopla.co.uk/for-sale/map/property/london/?include_retirement_homes=true&include_shared_ownership=true&new_homes=include&q=London&results_sort=newest_listings&search_source=home&pn=1&view_type=map). Convex Hulls are also supported to normalise polygons when users draw an insane polygon &ndash; currently `Leaflet.FreeDraw` supports Brian Barnett's [Graham Scan module](https://github.com/brian3kb/graham_scan_js) and my adaptation of the [concave hull algorithm](https://github.com/Wildhoney/ConcaveHull).

![FreeDraw Screenshot](http://i.imgur.com/aCt4xCf.png)

---

## Getting Started

`L.FreeDraw` follows the same convention as other modules, and therefore you should invoke the `addLayer` on your map instance &ndash; passing in an instance of `L.FreeDraw`.

```javascript
// Create Leaflet.js instance and then add FreeDraw on top.
var map = L.map('map').setView([51.505, -0.09], 14);
map.addLayer(new L.FreeDraw());
```

Upon instantiation `L.FreeDraw` you can immediately define the mode &ndash; with the default being `L.FreeDraw.MODES.VIEW` &ndash; please see [modes](#modes) for more information.

![Washes Right Off](http://images1.fanpop.com/images/photos/2500000/Calvin-and-Hobbes-Comic-Strips-calvin-and-hobbes-2509598-600-191.gif)

## Fetching Markers

Once the user has created, deleted, or edited a polygon, you'll likely wish to load in markers based on the polygons visible &ndash; with `L.FreeDraw` you can specify a callback, which passes a second argument that should be invoked with an array of `L.LatLng` objects:

```javascript
freeDraw.options.getMarkers(function getMarkers(boundaries, setMarkers) {
    var latLng = L.latLng(51.505, -0.09);
    setMarkers([latLng]);
});
```

You may also use the second argument of the `setMarkers` resolution method to specify a custom `L.DivIcon`.

## Options

FreeDraw has quite a few options &ndash; all of which can be seen by taking a look at the `L.FreeDraw.Options` object. However, there are certain options that you are likely to use more than others.

```javascript
// Allow the user to define multiple polygons on one map.
freeDraw.options.allowMultiplePolygons(true);

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

When a user is modifying a polygon the `getBoundaries` callback is invoked each and every time &ndash; which may be overkill, especially if your requests are somewhat time consuming. In this case `L.FreeDraw` allows you to defer the fetching of markers for when the edit mode has been exited with `freeDraw.options.setBoundariesAfterEdit(true)`.

### Exit Create Mode

After drawing a polygon the `L.FreeDraw.MODES.CREATE` mode will automatically be exited &ndash; but this can be suppressed by specifying `freeDraw.options.exitModeAfterCreate(false)` in which case the create mode will be persisted until the user explicitly exits it.

## Modes

FreeDraw by default uses the `L.FreeDraw.MODES.VIEW` mode which prevents the user from creating, editing, or deleting any polygons. When instantiating `L.FreeDraw` you may override the default mode &ndash; in the following case a user may **only** delete polygons:

```javascript
var freeDraw = window.freeDraw = new L.FreeDraw({
    mode: L.FreeDraw.MODES.DELETE
});
```

In specifying the mode you are using [bitwise operators](http://en.wikipedia.org/wiki/Bitwise_operation) with the mapping being as follows:

```javascript
L.FreeDraw.MODES: {
    VIEW:   1,
    CREATE: 2,
    EDIT:   4,
    DELETE: 8,
    ALL:    1 | 2 | 4 | 8
}
```

Therefore you're able to combine the bitwise operators to specify multiple modes. For example, if you would like to allow the user to create and delete, then you would specify the options as `L.FreeDraw.MODES.CREATE | L.FreeDraw.MODES.DELETE`. By allowing a user to perform every action you would have to concatenate all of the modes via the pipe (`|`) character &ndash; therefore `L.FreeDraw` provides the convenient `L.FreeDraw.MODES.ALL` property which does that for you.

Using the `L.FreeDraw.MODES.ALL` property you could easily enable all the modes **except** edit with the following: `L.FreeDraw.MODES.ALL ^ L.FreeDraw.MODES.EDIT`.

All modes allow the user to zoom and drag **except** when you have the `L.FreeDraw.MODES.CREATE` enabled &ndash; even when used in conjunction with other modes.

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
 
Another example would be changing the `cursor` type when the user is in polygon creation mode:

```css
section.map.mode-create {
    cursor: crosshair;
}
```