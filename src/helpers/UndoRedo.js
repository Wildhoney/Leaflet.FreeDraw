import Stack from './Stack';
import { pubSub } from './PubSub';
import {mergedPolygonCreatedHandler, mergePolygonUndoHandler, mergePolygonRedoHandler, newPolygonCreatedHandler, existingPolygonEditedHandler, undoHandler, redoHandler} from './Handlers';

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

pubSub.subscribe("Polygon_made_is_overlapping_with_other_polygons", mergedPolygonCreatedHandler);
pubSub.subscribe("Polygon_to_undo_is_merged_polygon", mergePolygonUndoHandler);
pubSub.subscribe("Polygon_to_redo_is_merged_polygon", mergePolygonRedoHandler);
pubSub.subscribe("Simple_new_Polygon_is_created", newPolygonCreatedHandler);
pubSub.subscribe("Existing_Polygon_is_edited_and_it_is_non_overlapping", existingPolygonEditedHandler);

/*
from = 0 : When existing polygon is edited -> comes from Polyfill() in Merge.js
from = 1 : When Undo operation is performed -> comes from UndoRedoDS.js
from = 2 : When new Polygon is created AND it is intersecting -> comes from Merge() in Merge.js
from = 3 : When Undo operation is performed on a Merged polygon -> comes from UndoRedo.js
*/
export function maintainStackStates(data) {
    console.log(data);
    switch (data.from) {
        case 2 : {
            console.log("CASE 2");
            pubSub.publish("Polygon_made_is_overlapping_with_other_polygons", data);
            return;
        }
        case 3: {
            console.log("CASE 3");
            pubSub.publish("Polygon_to_undo_is_merged_polygon", data);
            return;
        }
        case 4: {
            console.log("CASE 4");
            pubSub.publish("Polygon_to_redo_is_merged_polygon", data);
            return;
        }
        default: {
            if(data.pid) {
                pubSub.publish("Existing_Polygon_is_edited_and_it_is_non_overlapping", data);
            } else {
                pubSub.publish("Simple_new_Polygon_is_created", data);
            }
            return;
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
