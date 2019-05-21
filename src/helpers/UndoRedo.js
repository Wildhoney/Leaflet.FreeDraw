import { removeFor, createFor } from "./Polygon";
import { rawLatLngKey } from "../FreeDraw";

export const actionTypes = {
  'add_polygon': 'add_polygon',
  'remove_polygon': 'remove_polygon',
}
export default function UndoRedo() {
  let undoStack = [];
  let redoStack = [];

  const popUndo = () => undoStack.pop();
  const popRedo = () => redoStack.pop();
  const pushUndo = data => undoStack.push(data);
  const pushRedo = data => redoStack.push(data);
  const clearUndo = () => undoStack = [];
  const clearRedo = () => redoStack = [];
  
  const undo = () => {
    if (undoStack.length) {
      const action = popUndo();
      pushRedo(action);
      return action;
    }
  };

  const redo = () => {
    if (redoStack.length) return popRedo();
  }

  const undoHandler = (action, map) => {
    console.log({undoStack, redoStack})
    if (!action) return;
    switch(action.type) {
      case actionTypes.add_polygon: {
        removeFor(map, action.polygon);
        // because `removeFor` will also add `remove_polygon`
        // action
        popUndo();
        return;
      };
      case actionTypes.remove_polygon: {
        createFor(map, action.polygon[rawLatLngKey], action.polygon._options);
        popUndo();
        return;;
      }
    }
  }

  const redoHandler = (action, map) => {
    console.log({undoStack, redoStack})
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
      pushUndo(data);
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