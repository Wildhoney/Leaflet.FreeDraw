import L from 'leaflet';
import FreeDraw, { CREATE, EDIT } from '../../src/FreeDraw';

document.addEventListener('DOMContentLoaded', () => {

    const map = new L.Map(document.querySelector('section.map'), { doubleClickZoom: false }).setView([51.505, -0.09], 14);
    L.tileLayer('https://tiles.lyrk.org/lr/{z}/{x}/{y}?apikey=f2ae86661a4e487bbced29a755799884').addTo(map);

    const freeDraw = new FreeDraw({
        mode: CREATE | EDIT
    });

    map.addLayer(freeDraw);

});
