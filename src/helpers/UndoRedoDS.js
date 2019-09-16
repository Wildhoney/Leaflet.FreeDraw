import { removeFor, createFor, createForPolygon } from "./Polygon";
import { rawLatLngKey, polygonID, polygons } from "../FreeDraw";
import Stack from './Stack';

export const mainStack = Stack();
export const stackObject = new Map();

export const redoMainStack = Stack();
export const redoStackObject = new Map();

export const mergedPolygonsMap = new Map(); // Map which holds the Polygons to made when Undo operation is perfromed on Merged Polygon .


/*
from = 0 : When existing polygon is edited -> comes from Polyfill() in Merge.js
from = 1 : When Undo operation is performed -> comes from UndoRedoDS.js
from = 2 : When new Polygon is created AND it is intersecting -> comes from Merge() in Merge.js
from = 3 : When Undo operation is performed on a Merged polygon -> comes from UndoRedo.js
*/
export function maintainStackStates(map, addedPolygons, options, preventMutations, isIntersecting, count, pid, from) {
    const limitReached = polygons.get(map).size === options.maximumPolygons;
    // if new Polygon is created and it is intersecting -> do not add to Undo Stack .    ;
    if(isIntersecting && !limitReached && !preventMutations && polygons.get(map).size > 1 && options.mergePolygons) {
        redoMainStack.clear();
        redoStackObject.clear();
    } 
    else if(from === 2){ // The current Polygon is merged Polygon .
            // Add the merged polygon in Undo Stack which is mapped to [intersectingPolygons - current Polygon]
        mainStack.push(count);
        stackObject[count] = Stack()
        stackObject[count].push(addedPolygons[0]);

        options.mergedFromPolygons && (mergedPolygonsMap[count] = options.mergedFromPolygons) ;
    }
    else if(from === 3) {  // the current polygon came from Undo . (special Case)
        // Remove from stackObject the latest state of pid .
        stackObject[pid] && stackObject[pid].pop();
        // Add the new Polygon which has now listeners attached to mainStack .
        stackObject[pid].push(addedPolygons[0]);
    }
    else if(from === 4){ // The current Polygon is merged Polygon .
        // Add the merged polygon in Undo Stack which is mapped to [intersectingPolygons - current Polygon]
        mainStack.push(pid);
        stackObject[pid] = Stack()
        stackObject[pid].push(addedPolygons[0]);

        options.mergedFromPolygons && (mergedPolygonsMap[pid] = options.mergedFromPolygons) ;
    }
    else {
            // comes in edit mode and does not merges/ self-intersects AND add to main Stack .
        if(pid && addedPolygons.length === 1 && from === 0){
            mainStack.push(pid);
            stackObject[pid].push(addedPolygons[0]);
        }
        else if(pid && addedPolygons.length === 1 && from === 1) {  // comes in Undo Listener and does not merges/ self-intersects .
            stackObject[pid].push(addedPolygons[0]);
        }
        else { // new Polygon is created -> Clear REDO Stack .
                redoMainStack.clear();
                redoStackObject.clear();
                addedPolygons.forEach(p => {
                    stackObject[count] = Stack(); 
                    stackObject[count].push(p);
                    mainStack.push(count);
                });
        }
    }

    console.log("UNDO Stack : " + mainStack.show());
    console.log("REDO Stack : " + redoMainStack.show());
}

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
        mergedPolygonsMap[id].forEach(element => {
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