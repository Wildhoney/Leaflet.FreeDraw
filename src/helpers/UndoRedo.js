import { removeFor, createFor } from "./Polygon";
import { rawLatLngKey } from "../FreeDraw";

export const actionTypes = {
  'add_polygon': 'add_polygon',
  'remove_polygon': 'remove_polygon',
}
export default function UndoRedo() {
  const operations = [];
  let top = -1;
  let length = 0;
  
  const undo = () => {
    if (operations.length) return operations.pop()
  };

  const redo = () => {
    if (operations.length) return operations.pop()
  }

  const undoHandler = (action, map) => {
    console.log('undo processing', action, operations, top, length);
    switch(action.type) {
      case actionTypes.add_polygon: {
        removeFor(map, action.polygon);
        return;
      };
      case actionTypes.remove_polygon: {
        createFor(map, action.polygon[rawLatLngKey], action.polygon._options);
        return;;
      }
    }
  }

  const redoHandler = (action, map) => {
    console.log('redo processing', action, operations, top, length);
    switch(action.type) {
      case actionTypes.add_polygon: {
        createFor.apply(this, action.args);
        return;
      }

      case actionTypes.remove_polygon: {
        removeFor(map, action.polygon);
        return;
      }
    }
  }

  return {
    do(data) { 
      operations.push(data);
      return data;
    },
    redo,
    undo,
    attachListeners(map) {
      document.addEventListener('keydown', e => {
        if (e.key === 'z' && e.metaKey && !e.shiftKey) {
          undoHandler(undo(), map);
        }
        if (e.key === 'z' && e.metaKey && e.shiftKey) {
          redoHandler(redo());
        }
      })
    }
  };
}