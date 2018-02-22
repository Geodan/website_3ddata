import { Element } from '../../node_modules/@polymer/polymer/polymer-element.js';
import 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.js';

export class MapboxElement extends Element {

    // Define a string template instead of a `<template>` element.
    static get template() {
      return `
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.css' rel='stylesheet' />
<div id='map' style='width: 100%; height: 100%;'></div>
      `
    }
  
    constructor() {
      super();
    }
  
    // properties, observers, etc. are identical to 2.x
    static get properties() {
      return {
        name: {
          type: String
        }
      }
    }

    ready(){
      super.ready();
      mapboxgl.accessToken = 'pk.eyJ1IjoidGlsdCIsImEiOiJjaXl5dnAydjYwMDAxMnFwYWR1Z2ZjMngwIn0.JYt8pUcgFf9QETgo5FzA0A';
      this.map = new mapboxgl.Map({
          container: this.$.map,
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [4.555,52.255],
          zoom:"13",
          pitch:"45",
          bearing:"0"
      });
      this.dispatchEvent(new CustomEvent('mapready', {detail: this.map}));
    }

  }
  
  customElements.define('mapbox-element', MapboxElement);