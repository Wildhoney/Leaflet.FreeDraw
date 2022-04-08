export const createMergedPolygon = () => {

    const map = document.querySelector('section.map');

    map.dispatchEvent(new MouseEvent('pointerdown'));
    map.dispatchEvent(new MouseEvent('pointermove', { clientX: 100, clientY: 100 }));
    map.dispatchEvent(new MouseEvent('pointermove', { clientX: 100, clientY: 200 }));
    map.dispatchEvent(new MouseEvent('pointermove', { clientX: 200, clientY: 200 }));
    map.dispatchEvent(new MouseEvent('pointermove', { clientX: 200, clientY: 100 }));
    map.dispatchEvent(new MouseEvent('pointerup'));

    map.dispatchEvent(new MouseEvent('pointerdown'));
    map.dispatchEvent(new MouseEvent('pointermove', { clientX: 150, clientY: 150 }));
    map.dispatchEvent(new MouseEvent('pointermove', { clientX: 150, clientY: 250 }));
    map.dispatchEvent(new MouseEvent('pointermove', { clientX: 250, clientY: 250 }));
    map.dispatchEvent(new MouseEvent('pointermove', { clientX: 250, clientY: 150 }));
    map.dispatchEvent(new MouseEvent('pointerup'));

    return Array.from(document.querySelectorAll('path.leaflet-polygon'));

};

export const createFirstPolygon = () => {

    const map = document.querySelector('section.map');

    map.dispatchEvent(new MouseEvent('pointerdown'));
    map.dispatchEvent(new MouseEvent('pointermove', { clientX: 50, clientY: 50 }));
    map.dispatchEvent(new MouseEvent('pointermove', { clientX: 50, clientY: 100 }));
    map.dispatchEvent(new MouseEvent('pointermove', { clientX: 100, clientY: 100 }));
    map.dispatchEvent(new MouseEvent('pointermove', { clientX: 100, clientY: 50 }));
    map.dispatchEvent(new MouseEvent('pointerup'));

    return Array.from(document.querySelectorAll('path.leaflet-polygon'));

};

export const createSecondPolygon = () => {

    const map = document.querySelector('section.map');

    map.dispatchEvent(new MouseEvent('pointerdown'));
    map.dispatchEvent(new MouseEvent('pointermove', { clientX: 150, clientY: 150 }));
    map.dispatchEvent(new MouseEvent('pointermove', { clientX: 150, clientY: 250 }));
    map.dispatchEvent(new MouseEvent('pointermove', { clientX: 250, clientY: 250 }));
    map.dispatchEvent(new MouseEvent('pointermove', { clientX: 250, clientY: 150 }));
    map.dispatchEvent(new MouseEvent('pointerup'));

    return Array.from(document.querySelectorAll('path.leaflet-polygon'));

};

export const removeFirstPolygon = () => {

    const polygonClass = Array.from(window._polygons)[0];
    polygonClass.fire('click');

    return Array.from(document.querySelectorAll('path.leaflet-polygon'));

};
