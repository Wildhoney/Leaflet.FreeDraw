import { stopPropagation } from './ToolbarHelper'
import { undoHandler, redoHandler } from './Handlers'
import { undoMainStack, redoMainStack } from './UndoRedo'
import { pubSub } from './PubSub';

export const undoRedoControl =  L.Control.extend({

    options: {
      position: 'topright'
    },

    addButton: function (container, map, type, toolTip="") {

        var child = L.DomUtil.create('div' ,'edit-mode-button ' , container);
        child.style.backgroundColor = 'white';
        child.title = toolTip;

        var icon = L.DomUtil.create('i' ,'material-icons' , child);
        icon.innerHTML = type;
        icon.style.opacity = 0.3;
        if(type === "undo") {
            map.undoIcon = icon;
        }
        else {
            map.redoIcon = icon;
        }
        
        map.doubleClickZoom.disable();
        
        child.onclick = function(e) {

            if(type === "undo") {
                undoHandler(map);
            } else {
                redoHandler(map);
            }
            stopPropagation(e);
            e.preventDefault();
        }


    },

    enableDisableButton: function(data) {
        data.map.doubleClickZoom.disable();
        if(redoMainStack.empty()) {
            data.map.redoIcon.style.opacity = 0.3;
        } else {
            data.map.redoIcon.style.opacity = 1;
        }
        
        if(undoMainStack.empty()){
            data.map.undoIcon.style.opacity = 0.3;
        } else {
            data.map.undoIcon.style.opacity = 1;
        }
        
    },
   
    onAdd: function (map) {

        pubSub.subscribe("Stack_State_Updated", this.enableDisableButton);
        pubSub.subscribe("Polygon_made_is_overlapping_with_other_polygons", this.enableDisableButton);
        pubSub.subscribe("Polygon_to_undo_is_merged_polygon", this.enableDisableButton);
        pubSub.subscribe("Polygon_to_redo_is_merged_polygon", this.enableDisableButton);
        pubSub.subscribe("Simple_new_Polygon_is_created", this.enableDisableButton);
        pubSub.subscribe("Existing_Polygon_is_edited_and_it_is_non_overlapping", this.enableDisableButton);

        var container = L.DomUtil.create('div', 'undo-redo-buttons-container');

        this.addButton(container, map, "undo", "Undo");
        this.addButton(container, map, "redo", "Redo");
        
        return container;
        }
  });


  