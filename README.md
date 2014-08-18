Leaflet.FreeDraw
================

![Travis](https://api.travis-ci.org/Wildhoney/Leaflet.FreeDraw.png)
&nbsp;
![npm](https://badge.fury.io/js/leaflet.freedraw.png)
&nbsp;
![MIT License](http://img.shields.io/badge/license-MIT-orange.svg)

* **Heroku**: [http://freedraw.herokuapp.com/](http://freedraw.herokuapp.com/)
* **Bower:** `bower install leaflet.freedraw`

---

Use [Leaflet.draw](https://github.com/Leaflet/Leaflet.draw) for drawing pre-defined polygons and linear shapes &ndash; `Leaflet.FreeDraw`'s selling point is that it allows you to freely draw a polygon like [Zoopla](http://www.zoopla.co.uk/for-sale/map/property/london/?include_retirement_homes=true&include_shared_ownership=true&new_homes=include&q=London&results_sort=newest_listings&search_source=home&pn=1&view_type=map). Convex Hulls are also supported to normalise polygons when users draw an insane polygon &ndash; currently `Leaflet.FreeDraw` supports Brian Barnett's [Graham Scan module](https://github.com/brian3kb/graham_scan_js). Additionally `Leaflet.FreeDraw` also supports [Delaunay triangulation](http://en.wikipedia.org/wiki/Delaunay_triangulation) for more precise &mdash; albeit slower &mdash; polygons.