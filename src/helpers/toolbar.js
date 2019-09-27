import { toggleMode } from './ToolbarHelper'
import { NONE, CREATE, EDIT, DELETE, DELETEMARKERS, DELETEPOINT, APPEND, ALL } from '../FreeDraw';

export const customControl =  L.Control.extend({

    options: {
      position: 'topleft'
    },

    initialize: function (options) {
        this.mapOptions = options;
    },

    addButton: function (container, mode, map, mapOptions, type) {

        var child = L.DomUtil.create('div' ,'edit-mode-button' , container);
        child.style.backgroundColor = 'white';

        var icon = L.DomUtil.create('i' ,'material-icons' , child);
        icon.innerHTML = type;


        if(mode === DELETEMARKERS){
            icon.style.opacity = 0.3;
        } else {
            icon.style.opacity = 1;
        }
        
        child.onclick = function(){
            // toggle logic
            if(icon.style.opacity == 0.3) {
                if(mode === DELETEMARKERS) {
                    // disable all other buttons
                     container.childNodes.forEach(element => {
                        element.firstChild.style.opacity = 0.3;
                     });
                }    
                icon.style.opacity = 1;
            } else {
                icon.style.opacity = 0.3;
            }
            toggleMode(mode, map, mapOptions);
        }


    },
   
    onAdd: function (map) {

        var container = L.DomUtil.create('div', 'edit-mode-buttons-container');

        this.addButton(container, CREATE, map, this.mapOptions, "create");
        this.addButton(container, EDIT, map, this.mapOptions, "gesture");
        this.addButton(container, DELETE, map, this.mapOptions, "delete_forever");
        this.addButton(container, APPEND, map, this.mapOptions, "add");
        this.addButton(container, DELETEPOINT, map, this.mapOptions, "remove");
        this.addButton(container, DELETEMARKERS, map, this.mapOptions, "delete_sweep");
        
        return container;
        }
  });


  