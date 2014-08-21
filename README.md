Leaflet.FreeDraw
================

![Travis](http://img.shields.io/travis/Wildhoney/Leaflet.FreeDraw.svg?style=flat)
&nbsp;
![npm](http://img.shields.io/npm/v/leaflet.freedraw.svg?style=flat)
&nbsp;
![MIT License](http://img.shields.io/badge/license-MIT-lightgrey.svg?style=flat)

* **Heroku**: [http://freedraw.herokuapp.com/](http://freedraw.herokuapp.com/)
* **Bower:** `bower install leaflet.freedraw`

Use [Leaflet.draw](https://github.com/Leaflet/Leaflet.draw) for drawing pre-defined polygons and linear shapes &ndash; `Leaflet.FreeDraw`'s selling point is that it allows you to freely draw a polygon like [Zoopla](http://www.zoopla.co.uk/for-sale/map/property/london/?include_retirement_homes=true&include_shared_ownership=true&new_homes=include&q=London&results_sort=newest_listings&search_source=home&pn=1&view_type=map). Convex Hulls are also supported to normalise polygons when users draw an insane polygon &ndash; currently `Leaflet.FreeDraw` supports Brian Barnett's [Graham Scan module](https://github.com/brian3kb/graham_scan_js).

![FreeDraw Screenshot](http://i.imgur.com/HlDVRUe.png)

---

## Getting Started

By instantiating `FreeDraw` you are required to pass in your map instance so that `FreeDraw` can create the relationship between your map and the canvas layers &ndash; therefore when you instantiate the object, pass in your `L.Map` instance.

```javascript
// Create Leaflet.js instance and then add FreeDraw on top.
var map = L.map('map').setView([51.505, -0.09], 14);
    freeDraw = new FreeDraw(map);
```

FreeDraw has quite a few options &ndash; all of which can be seen by taking a look at the `FreeDraw.Options` object. However, there are certain options that you are likely to use quite often.

```javascript
// Allow the user to define multiple polygons on one map.
freeDraw.options.allowMultiplePolygons(true);

// Disallow the rendering of the polygon via a convex/concave hull.
freeDraw.options.setHullAlgorithm(false);

// Utilise Brian's convex hull.
freeDraw.options.setHullAlgorithm('brian3kb/graham_scan_js');

// ...Or Wildhoney's concave hull.
freeDraw.options.setHullAlgorithm('Wildhoney/ConcaveHull');
```

You may also toggle the mode for allowing users to drag the map instead of creating a polygon &ndash; for this you have `freeDraw.enableEdit();` and `freeDraw.disableEdit();`.

All of the polygons drawn with FreeDraw can be modified using the options and [standard CSS](http://tutorials.jenkov.com/svg/svg-and-css.html).

Once the user has drawn their free-hand drawing, it is converted into a polygon by Leaflet.js &ndash; you can define how smooth the rendered polygon is by using the `setSmoothFactor` method &ndash; by default the `smoothFactor` is **5**.