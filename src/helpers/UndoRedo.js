import { removeFor, createFor } from "./Polygon";
import { rawLatLngKey } from "../FreeDraw";
import Stack from './Stack';

export const actionTypes = {
  'add_polygon': 'add_polygon',
  'remove_polygon': 'remove_polygon',
}
export default function UndoRedo() {
  let undoStack = Stack();
  let redoStack = Stack();
  
  const undo = () => {
    if (undoStack.length()) {
      const action = undoStack.pop();
      redoStack.push(action);
      return action;
    }
  };

  const redo = () => {
    if (redoStack.length()) return redoStack.pop();
  }

  const undoHandler = (action, map) => {
    if (!action) return;
    switch(action.type) {
      case actionTypes.add_polygon: {
        removeFor(map, action.polygon);
        return;
      };
      case actionTypes.remove_polygon: {
        createFor(map, action.polygon[rawLatLngKey], action.polygon._options);
        return;
      }
    }
  }

  const redoHandler = (action, map) => {
    if (!action) return;
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
      undoStack.push(data);
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