import { toggleMode } from './ToolbarHelper'
import { NONE, CREATE, EDIT, DELETE, DELETEMARKERS, DELETEPOINT, APPEND, ALL } from '../FreeDraw';

export const customControl =  L.Control.extend({

    options: {
      position: 'topleft'
    },

    initialize: function (options) {
        this.mapOptions = options;
        console.log("this.mapOptions");
        console.log(this.mapOptions);
    },

    addButton: function (container, mode, map, mapOptions, url) {

        var child = L.DomUtil.create('input' ,'' , container);
        child.type="button";
        //   child.title="Create";
        //   child.value = "Create";
        child.style.backgroundColor = 'white';     
        child.style.backgroundImage = url;
        child.style.backgroundSize = "30px 30px";
        child.style.width = '32px';
        child.style.height = '32px';
        
        child.onmouseover = function(){
            child.style.backgroundColor = 'pink'; 
        }
        child.onmouseout = function(){
            child.style.backgroundColor = 'white'; 
        }
    
        child.onclick = function(){
            console.log('buttonClicked');

            child.style.backgroundColor = 'pink'; 
           
            toggleMode(mode, map, mapOptions);
        }

        container.append(L.DomUtil.create('br'));

    },
   
    onAdd: function (map) {

        var container = L.DomUtil.create('div', 'leaflet-draw-section');

        //   var link = L.DomUtil.create('a',  '', container);
        //   var sr = L.DomUtil.create('span', 'sr-only', container);
        //   link.href = '#';
        //   link.appendChild(sr);

        this.addButton(container, CREATE, map, this.mapOptions, "url(https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/add-circle-green-512.png)");
        this.addButton(container, EDIT, map, this.mapOptions, "url(https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/write-circle-green-512.png)");
        this.addButton(container, DELETE, map, this.mapOptions, "url(https://cdn4.iconfinder.com/data/icons/generic-interaction/143/close-x-cross-multiply-delete-cancel-modal-error-no-512.png)");
        this.addButton(container, APPEND, map, this.mapOptions, "url(https://cdn4.iconfinder.com/data/icons/generic-interaction/143/close-x-cross-multiply-delete-cancel-modal-error-no-512.png)");
        this.addButton(container, DELETEMARKERS, map, this.mapOptions, "url(https://cdn1.iconfinder.com/data/icons/map-objects/154/map-object-cancel-exit-close-delete-point-512.png)");

        
        return container;
        }
  });

    // map.addControl(new customControl());
  