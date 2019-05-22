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
  
  const handler = (action, map, opType) => {
    if (!action) return;
    const actions = {
      [actionTypes.add_polygon]: {
        undo: () => removeFor(map, action.polygon),
        redo: () => createFor.apply(this, action.args)
      },
      [actionTypes.remove_polygon]: {
        undo: () => createFor(map, action.polygon[rawLatLngKey], action.polygon._options),
        redo: () => removeFor(map, action.polygon)
      }
    };
    // perform
    actions[action.type][opType]();
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
          handler(undo(), map, 'undo');
        }
        if (e.key === 'z' && e.metaKey && e.shiftKey) {
          handler(redo(), map, 'redo');
        }
      })
    }
  };
}