import { removeFor, createFor, createForPolygon } from "./Polygon";
import { rawLatLngKey } from "../FreeDraw";
import Stack from './Stack';

export const mainStack = Stack();
export const stackObject = new Map();

export default function UndoRedoDS() {
  
  const undoHandler = (map) => {
    const id = mainStack.pop();
    removeFor(map, stackObject[id].pop());
    if(!stackObject[id].empty()){
        const revertedToPoly = stackObject[id].pop();
        createFor(map, revertedToPoly[rawLatLngKey], revertedToPoly._options, true, id , 1);
        //createForPolygon(map , revertedToPoly);
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
        }
      })
    }
  };
}