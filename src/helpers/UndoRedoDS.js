import { removeFor, createFor, createForPolygon } from "./Polygon";
import { rawLatLngKey } from "../FreeDraw";
import Stack from './Stack';

export const mainStack = Stack();
export const stackObject = new Map();

export const redoMainStack = Stack();
export const redoStackObject = new Map();

export default function UndoRedoDS() {
  
  const undoHandler = (map) => {
    const id = mainStack.length ? mainStack.pop() : 0;
    id && redoMainStack.push(id);
    const undoPoppedEl = id ? stackObject[id].pop() : 0;
    if(!redoStackObject[id]){
        redoStackObject[id] = new Stack();
    }
    undoPoppedEl && redoStackObject[id].push(undoPoppedEl);
    undoPoppedEl && removeFor(map, undoPoppedEl);
    if(id && !stackObject[id].empty()){
        const revertedToPoly = stackObject[id].pop();
        createFor(map, revertedToPoly[rawLatLngKey], revertedToPoly._options, true, id , 1);
    }
  }

  const redoHandler = (map) => {
    const id = redoMainStack.pop();
    const redoPoppedEl = id ? redoStackObject[id].pop() : 0;
    const currentEl = id && stackObject[id].length() ? stackObject[id].top() : 0 ;
    if(currentEl) {
        // remove currentEl
      removeFor(map, currentEl);
    }
        // draw redoPoppedEl
    redoPoppedEl && createFor(map, redoPoppedEl[rawLatLngKey], redoPoppedEl._options, true, id , 0);    // change options
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