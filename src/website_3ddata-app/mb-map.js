import { Element } from '../../node_modules/@polymer/polymer/polymer-element.js';
import 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.0/mapbox-gl.js';


class  MbMap extends Element {
	static get is() { return 'mb-map'; }
	// Public property API that triggers re-render (synched with attributes)
	static get properties() {
    }
    ready(){
        super.ready();
        mapboxgl.accessToken = 'pk.eyJ1IjoidGlsdCIsImEiOiJjaXl5dnAydjYwMDAxMnFwYWR1Z2ZjMngwIn0.JYt8pUcgFf9QETgo5FzA0A';
        var map = new mapboxgl.Map({
            container: this.$.map,
            style: 'mapbox://styles/mapbox/streets-v9'
        });
    }
    //render(){
    //    html`
    static get template() {
        return `
            <div id='map' style='width: 400px; height: 300px;'></div>
        `;
}

}
window.customElements.define(MbMap.is, MbMap);