export const createMergedPolygon = () => {

    const map = document.querySelector('section.map');

    map.dispatchEvent(new MouseEvent('mousedown'));
    map.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 100 }));
    map.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 200 }));
    map.dispatchEvent(new MouseEvent('mousemove', { clientX: 200, clientY: 200 }));
    map.dispatchEvent(new MouseEvent('mousemove', { clientX: 200, clientY: 100 }));
    map.dispatchEvent(new MouseEvent('mouseup'));

    map.dispatchEvent(new MouseEvent('mousedown'));
    map.dispatchEvent(new MouseEvent('mousemove', { clientX: 150, clientY: 150 }));
    map.dispatchEvent(new MouseEvent('mousemove', { clientX: 150, clientY: 250 }));
    map.dispatchEvent(new MouseEvent('mousemove', { clientX: 250, clientY: 250 }));
    map.dispatchEvent(new MouseEvent('mousemove', { clientX: 250, clientY: 150 }));
    map.dispatchEvent(new MouseEvent('mouseup'));

    return Array.from(document.querySelectorAll('path.leaflet-polygon'));

};

export const createFirstPolygon = () => {

    const map = document.querySelector('section.map');

    map.dispatchEvent(new MouseEvent('mousedown'));
    map.dispatchEvent(new MouseEvent('mousemove', { clientX: 50, clientY: 50 }));
    map.dispatchEvent(new MouseEvent('mousemove', { clientX: 50, clientY: 100 }));
    map.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 100 }));
    map.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 50 }));
    map.dispatchEvent(new MouseEvent('mouseup'));

    return Array.from(document.querySelectorAll('path.leaflet-polygon'));

};

export const createSecondPolygon = () => {

    const map = document.querySelector('section.map');

    map.dispatchEvent(new MouseEvent('mousedown'));
    map.dispatchEvent(new MouseEvent('mousemove', { clientX: 150, clientY: 150 }));
    map.dispatchEvent(new MouseEvent('mousemove', { clientX: 150, clientY: 250 }));
    map.dispatchEvent(new MouseEvent('mousemove', { clientX: 250, clientY: 250 }));
    map.dispatchEvent(new MouseEvent('mousemove', { clientX: 250, clientY: 150 }));
    map.dispatchEvent(new MouseEvent('mouseup'));

    return Array.from(document.querySelectorAll('path.leaflet-polygon'));

};

export const removeFirstPolygon = () => {

    const polygonClass = Array.from(window.polygons)[0];
    polygonClass.fire('click');

    return Array.from(document.querySelectorAll('path.leaflet-polygon'));

};
