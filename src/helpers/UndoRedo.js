import { removeFor, createFor } from "./Polygon";
import { rawLatLngKey } from "../FreeDraw";

export const actionTypes = {
  'add_polygon': 'add_polygon',
  'remove_polygon': 'remove_polygon',
}
export default function UndoRedo() {
  const undoStack = [];
  const redoStack = [];

  const _popUndo = () => undoStack.pop();
  const _popRedo = () => redoStack.pop();
  const _pushUndo = data => undoStack.push(data);
  const _pushRedo = data => redoStack.push(data);
  
  const undo = () => {
    if (undoStack.length) {
      const action = _popUndo();
      _pushRedo(action);
      return action;
    }
  };

  const redo = () => {
    if (redoStack.length) return _popRedo();
  }

  const undoHandler = (action, map) => {
    if (!action) return;
    switch(action.type) {
      case actionTypes.add_polygon: {
        removeFor(map, action.polygon);
        _popUndo();
        return;
      };
      case actionTypes.remove_polygon: {
        createFor(map, action.polygon[rawLatLngKey], action.polygon._options);
        _popUndo();
        return;;
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
      _pushUndo(data);
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