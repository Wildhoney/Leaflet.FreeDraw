# Passing an `L.Map` instance

FreeDraw requires access to the `L.Map` instance, and therefore must be passed on instantiation of `FreeDraw`:

```javascript
var map      = L.map(mapContainer).setView([51.505, -0.09], 13); 
    freeDraw = new FreeDraw(map);
```