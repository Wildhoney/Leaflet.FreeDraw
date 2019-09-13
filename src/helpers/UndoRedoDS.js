import { removeFor, createFor, createForPolygon } from "./Polygon";
import { rawLatLngKey, polygonID } from "../FreeDraw";
import Stack from './Stack';

export const mainStack = Stack();
export const stackObject = new Map();

export const redoMainStack = Stack();
export const redoStackObject = new Map();

export const mergedPolygonsMap = new Map(); // Map which holds the Polygons to made when Undo operation is perfromed on Merged Polygon .

export default function UndoRedoDS() {
  
  const undoHandler = (map) => {
    const id = mainStack.length ? mainStack.pop() : 0;
    id && redoMainStack.push(id);
    const undoPoppedEl = id && stackObject[id] ? stackObject[id].pop() : 0;
    if(!redoStackObject[id]){
        redoStackObject[id] = new Stack();
    }
    undoPoppedEl && redoStackObject[id].push(undoPoppedEl);
    undoPoppedEl && removeFor(map, undoPoppedEl);
    if(id && !stackObject[id].empty()){
        const revertedToPoly = stackObject[id].pop();
        createFor(map, revertedToPoly[rawLatLngKey], revertedToPoly._options, true, id , 1);
    }
    else if(mergedPolygonsMap[id] && mergedPolygonsMap[id].length){
        console.log("elements :");
        mergedPolygonsMap[id].forEach(element => {
            console.log(element);
            createFor(map, element[rawLatLngKey], element._options, true, element[polygonID] , 3); // Should not Update undoStack State .
        });
    }
  }

  const redoHandler = (map) => {
    const id = redoMainStack.pop();
    const redoPoppedEl = id ? redoStackObject[id].pop() : 0;
    const currentEl = id && stackObject[id].length() ? stackObject[id].top() : 0 ;
    if(currentEl) {
        // remove currentEl
      removeFor(map, currentEl);
        // draw redoPoppedEl
      redoPoppedEl && createFor(map, redoPoppedEl[rawLatLngKey], redoPoppedEl._options, true, id , 0);    // change options
    }
    else if(mergedPolygonsMap[id] && mergedPolygonsMap[id].length) { // It is a special Merged polygon -> Remove from 'mergedPolygonsMap' and then draw Redo Polygon .
      console.log("I am special");  
      mergedPolygonsMap[id].forEach(element => {
          removeFor(map, stackObject[element[polygonID]].top());
      });
      createFor(map, redoPoppedEl[rawLatLngKey], redoPoppedEl._options, true, id , 4);    // change options
    }
    else { // If Polygon has no State in UNDO STACK -> Simply draw REDO polygon
      redoPoppedEl && createFor(map, redoPoppedEl[rawLatLngKey], redoPoppedEl._options, true, id , 0);    // change options
    }
  }

  return {
    do(data) {
     
    },
    attachListeners(map) {
      document.addEventListener('keydown', e => {
        if (e.key === 'z' && e.metaKey && !e.shiftKey) {
          undoHandler(map);
        }
        if (e.key === 'z' && e.metaKey && e.shiftKey) {
          redoHandler(map);
        }
      })
    }
  };
}