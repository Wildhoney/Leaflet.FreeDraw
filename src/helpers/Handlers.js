import { rawLatLngKey, polygonID, polygons } from '../FreeDraw';
import { removeFor, createFor } from './Polygon';
import Stack from './Stack';
import {undoMainStack, undoStackObject, redoMainStack, redoStackObject, mergedPolygonsMap} from './UndoRedo';
import { pubSub } from './PubSub'; 


// The current Polygon is merged Polygon .
// Add the merged polygon in Undo Stack which is mapped to [intersectingPolygons - current Polygon]
export const mergedPolygonCreatedHandler = (data) => {
    undoMainStack.push(data.count);
    undoStackObject[data.count] = Stack();
    undoStackObject[data.count].push(data.addedPolygons[0]);
    data.options.mergedFromPolygons && (mergedPolygonsMap[data.count] = data.options.mergedFromPolygons);
    return;
}

// the current polygon came from Undo . (special Case)
export const mergePolygonUndoHandler = (data) => {
    if (!undoStackObject[data.pid]) {
        undoStackObject[data.pid] = new Stack();
    }
    // Remove from undoStackObject the latest state of pid .
    undoStackObject[data.pid].pop();
    // Add the new Polygon which has now listeners attached to undoMainStack .
    undoStackObject[data.pid].push(data.addedPolygons[0]);
    return;
}

// Redo operation performed on a merged Polygon.
// Add the merged polygon in Undo Stack which is mapped to [intersectingPolygons - current Polygon]
export const mergePolygonRedoHandler = (data) => {
    undoMainStack.push(data.pid);
    undoStackObject[data.pid] = Stack();
    undoStackObject[data.pid].push(data.addedPolygons[0]);
    data.options.mergedFromPolygons && (mergedPolygonsMap[data.pid] = data.options.mergedFromPolygons);
    return;   
}

// Polygon is not overlapping!
export const newPolygonCreatedHandler = (data) => {
    console.log("CASE DEFAULT 2");
    // new Polygon is created -> Clear REDO Stack .
    redoMainStack.clear();
    redoStackObject.clear();

    const limitReached = polygons.get(data.map).size === data.options.maximumPolygons;
     // if new Polygon is created and it is intersecting -> do not add to Undo Stack .    ;
    if (data.isIntersecting && !limitReached && !data.preventMutations && polygons.get(data.map).size > 1 && data.options.mergePolygons) {
        return;
    }

    undoStackObject[data.count] = Stack();
    undoStackObject[data.count].push(data.addedPolygons[0]);
    undoMainStack.push(data.count);
    return;
}

// Polygon is not overlapping!
export const existingPolygonEditedHandler = (data) => {
    console.log("CASE DEFAULT 1");
    if (!undoStackObject[data.pid]) {
        undoStackObject[data.pid] = new Stack();
    }

    // comes in edit mode and does not merges/ self-intersects AND add to main Stack .
    if(!data.from) {
        undoMainStack.push(data.pid);
    }
    
    // comes in Undo Listener and does not merges/ self-intersects .
    undoStackObject[data.pid].push(data.addedPolygons[0]);
    return;
}

export const undoHandler = map => {

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

        pubSub.publish('Stack_State_Updated', {map, undoMainStack, redoMainStack});
    };

    export const redoHandler = map => {
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
        pubSub.publish('Stack_State_Updated', {map, undoMainStack, redoMainStack});
    };
