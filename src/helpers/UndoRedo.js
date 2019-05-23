import { removeFor, createFor } from "./Polygon";
import { rawLatLngKey } from "../FreeDraw";
import Stack from './Stack';

export const actionTypes = {
  'add_polygon': 'add_polygon',
  'remove_polygon': 'remove_polygon',
}

export default function UndoRedo() {
  const undoStack = Stack();
  const redoStack = Stack();

  let inProgress = '';
  
  const undo = () => undoStack.length() && undoStack.pop();
  const redo = () => redoStack.length() && redoStack.pop();

  const handler = (action, map, opType) => {
    if (!action) return;
    inProgress = opType;
    const actions = {
      [actionTypes.add_polygon]: {
        undo: (a) => removeFor(map, action.polygon),
        redo: (a) => removeFor(map, action.polygon),
      },
      [actionTypes.remove_polygon]: {
        undo: (a) => createFor(map, action.polygon[rawLatLngKey], action.polygon._options),
        redo: (a) => createFor(map, action.polygon[rawLatLngKey], action.polygon._options),
      }
    };
    // perform
    actions[action.type][opType]();
  }

  return {
    do(data) {
      if (inProgress) {
        switch(inProgress) {
          case 'undo':
            redoStack.push(data);
            break;
          case 'redo':
            undoStack.push(data);
            break;
        }
        inProgress = '';
      } else {
        redoStack.clear();

        // clear all actions which had the the same instance of polygon
        undoStack.filter(d => !(d.polygon === data.polygon))
        
        undoStack.push(data);
      }
      undoStack.log('undo: ')
      redoStack.log('redo: ')
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