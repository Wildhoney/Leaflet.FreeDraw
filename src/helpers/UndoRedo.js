import { rawLatLngKey, polygonID, polygons } from '../FreeDraw';
import { removeFor, createFor } from './Polygon';
import Stack from './Stack';

// Undo MAIN Stack that stores the sequence in which Polygons are added/edited.
export const undoMainStack = Stack();

// Map with key as PolygonID and value as Stack where Stack stores versions of a Polygon.
export const undoStackObject = new Map();

// Redo MAIN Stack that stores the sequence in which Polygons are removed.
export const redoMainStack = Stack();

// Map with key as PolygonID and value as Stack where Stack stores versions of a Polygon.
export const redoStackObject = new Map();

// Map which holds the Polygons to made when Undo operation is perfromed on Merged Polygon .
export const mergedPolygonsMap = new Map();


/*
from = 0 : When existing polygon is edited -> comes from Polyfill() in Merge.js
from = 1 : When Undo operation is performed -> comes from UndoRedoDS.js
from = 2 : When new Polygon is created AND it is intersecting -> comes from Merge() in Merge.js
from = 3 : When Undo operation is performed on a Merged polygon -> comes from UndoRedo.js
*/
export function maintainStackStates(map, addedPolygons, options, preventMutations, isIntersecting, count, pid, from) {
    const limitReached = polygons.get(map).size === options.maximumPolygons;

    // if new Polygon is created and it is intersecting -> do not add to Undo Stack .    ;
    if (isIntersecting && !limitReached && !preventMutations && polygons.get(map).size > 1 && options.mergePolygons) {
        redoMainStack.clear();
        redoStackObject.clear();
        return;
    }
    // The current Polygon is merged Polygon .
    // Add the merged polygon in Undo Stack which is mapped to [intersectingPolygons - current Polygon]
    switch (from) {
        case 2 : {
            undoMainStack.push(count);
            undoStackObject[count] = Stack();
            undoStackObject[count].push(addedPolygons[0]);
            options.mergedFromPolygons && (mergedPolygonsMap[count] = options.mergedFromPolygons);
            return;
        }
        // the current polygon came from Undo . (special Case)
        case 3: {
            // Remove from undoStackObject the latest state of pid .
            undoStackObject[pid] && undoStackObject[pid].pop();
            // Add the new Polygon which has now listeners attached to undoMainStack .
            undoStackObject[pid].push(addedPolygons[0]);
            return;
        }
        // The current Polygon is merged Polygon .
        // Add the merged polygon in Undo Stack which is mapped to [intersectingPolygons - current Polygon]
        case 4: {
            undoMainStack.push(pid);
            undoStackObject[pid] = Stack();
            undoStackObject[pid].push(addedPolygons[0]);

            options.mergedFromPolygons && (mergedPolygonsMap[pid] = options.mergedFromPolygons);
            return;
        }
        default: {
            // comes in edit mode and does not merges/ self-intersects AND add to main Stack .
            if (pid && addedPolygons.length === 1 && from === 0) {
                undoMainStack.push(pid);
                if (!undoStackObject[pid]) {
                    undoStackObject[pid] = new Stack();
                }
                undoStackObject[pid].push(addedPolygons[0]);
            } else if (pid && addedPolygons.length === 1 && from === 1) {
                // comes in Undo Listener and does not merges/ self-intersects .
                undoStackObject[pid].push(addedPolygons[0]);
            } else {
                // new Polygon is created -> Clear REDO Stack .
                redoMainStack.clear();
                redoStackObject.clear();
                addedPolygons.forEach(p => {
                    undoStackObject[count] = Stack();
                    undoStackObject[count].push(p);
                    undoMainStack.push(count);
                });
            }
        }
    }
    // console.log("UNDO Stack : " + undoMainStack.show());
    // console.log("REDO Stack : " + redoMainStack.show());
}

export function clearAllStacks() {

    redoMainStack.clear();
    redoStackObject.clear();
    undoMainStack.clear();

}

export default function UndoRedo() {

    const undoHandler = map => {

    // DELETE POLYGON AND HANDLING STATES LOGIC :

    // Pop from Undo_Main_Stack and push to Redo_Main_Stack .
        const id = undoMainStack.length ? undoMainStack.pop() : 0;
        id && redoMainStack.push(id);

    // Pop the polygon currently visible on Screen via the "id" from the undo_stack_Object.
        const undoPoppedEl = id && undoStackObject[id] ? undoStackObject[id].pop() : 0;
        if (!redoStackObject[id]) {
            redoStackObject[id] = new Stack();
        }

    // Add the polygon to redo_stack_Object and remove the popped polygon from the screen.
        undoPoppedEl && redoStackObject[id].push(undoPoppedEl);
        undoPoppedEl && removeFor(map, undoPoppedEl);

    // CREATE POLYGON LOGIC :

    // check if Undo_Main_Stack is not empty and corresponding undo_stack_Object is also not empty.
        if (id && !undoStackObject[id].empty()) {

        // The new Polygon to be created is now at the top of undo_stack_Object.
            const revertedToPoly = undoStackObject[id].pop();
            createFor(map, revertedToPoly[rawLatLngKey], revertedToPoly._options, true, id, 1);

        } else if (mergedPolygonsMap[id] && mergedPolygonsMap[id].length !== 0) {
      // Current Polygon is a merged polygon, so create polygons from which it is made.
            mergedPolygonsMap[id].forEach(element => {
                createFor(map, element[rawLatLngKey], element._options, true, element[polygonID], 3); // Should not Update undoStack State .
            });
        }
    };

    const redoHandler = map => {
    // Pop the id of polygon and the polygon itself from Redo_Main_Stack and redo_stack_Object respectively.
        const id = redoMainStack.pop();
        const redoPoppedEl = id ? redoStackObject[id].pop() : 0;

    // Get the element that we have to remove which is currently on the Screen.
        const currentEl = id && undoStackObject[id].length() ? undoStackObject[id].top() : 0;

        if (currentEl) {
      // remove the polygon currently on Screen.
            removeFor(map, currentEl);

      // Create the polygon which we had popped from redo_stack_Object.
            redoPoppedEl && createFor(map, redoPoppedEl[rawLatLngKey], redoPoppedEl._options, true, id, 0);

        } else if (mergedPolygonsMap[id] && mergedPolygonsMap[id].length !== 0) {
      // The polygon to be made is a merged Polygon, hence removing all the polygons which are overlapping (merged) and then creating the merged polygon.
            mergedPolygonsMap[id].forEach(element => {
                removeFor(map, undoStackObject[element[polygonID]].top());
            });
            createFor(map, redoPoppedEl[rawLatLngKey], redoPoppedEl._options, true, id, 4);

        } else {
        // If Polygon has no State in UNDO STACK -> Simply draw REDO polygon
            redoPoppedEl && createFor(map, redoPoppedEl[rawLatLngKey], redoPoppedEl._options, true, id, 0);
        }

    };

    return {
        attachListeners(map) {
            document.addEventListener('keydown', e => {
            // UNDO listener
                if (e.key === 'z' && e.metaKey && !e.shiftKey) {
                    undoHandler(map);
                }
            // REDO listener
                if (e.key === 'z' && e.metaKey && e.shiftKey) {
                    redoHandler(map);
                }
            });
        }
    };
}
