import {LitElement,html} from 'lit-element/lit-element.js'
import { connect } from 'pwa-helpers/connect-mixin.js';
import { addToCart, removeFromCart } from '../actions/cart.js';

import 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.js';

class  MbMap extends connect(store)(LitElement) {
	static get is() { return 'mb-map'; }
	// Public property API that triggers re-render (synched with attributes)
	static get properties() {
        return {
            map: {
                type: Object
            },
            selectedHokken: {
                type: Array
            }
        }
    }
    ready(){
        super.ready();
        var self =this;
        this.selectedHokken = [];
        mapboxgl.accessToken = 'pk.eyJ1IjoidGlsdCIsImEiOiJjaXl5dnAydjYwMDAxMnFwYWR1Z2ZjMngwIn0.JYt8pUcgFf9QETgo5FzA0A';

        this.map = new mapboxgl.Map({
            container: this.shadowRoot.querySelector('#map'),
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [4.555,52.255],
            zoom: 13,
            pitch: 45
        });
        this.map.on('load', function() {
            var map = self.map;
            map.addSource('kmhokken', {
                type: 'vector',
                tiles:["http://saturnus.geodan.nl/mvt_mimas/km_hokken/{z}/{x}/{y}.mvt"],
                minzoom: 9,
                maxzoom: 20
                //data: "./data/km_hokken.geojson"
            });
            map.addLayer({
                "id": "kmhokken",
                "type": "fill",
                "source": "kmhokken",
                "source-layer": "km_hokken",
                "paint": {
                    "fill-outline-color": "rgba(0,0,0,0.1)",
                    "fill-color": "rgba(0,0,0,0)"
                },
            }); 
            

			map.addSource("odwh_bodemvlakken", {
                type: 'vector',
                tiles:["http://saturnus.geodan.nl/mvt_mimas/odwh_bodemvlakken/{z}/{x}/{y}.mvt"],
                minzoom: 13,
                maxzoom: 18
            });
            map.addLayer({
                'id': 'odwh_bodemvlakken',
                'type': 'fill',
                'source': 'odwh_bodemvlakken',
                "source-layer": "odwh_bodemvlakken",

                'paint': {
                    'fill-color': {
                        "property": "type",
						"type": "categorical",
                        "stops": [
                        ['BGTwater', 'rgb(16,247,254)'],
                        ['BGTverhard', 'rgb(200,200,200)'],
						['BGT_onverhard', 'hsl(78,53%,87%)']
                        ]
                    },
                    'fill-opacity': 1
                }
            });

			map.addLayer({
                "id": "kmhokken-highlighted",
                "type": "fill",
                "source": "kmhokken",
                "source-layer": "km_hokken",
                "paint": {
                    "fill-outline-color": "#484896",
                    "fill-color": "#6e599f",
                    "fill-opacity": 0.75
                },
                "filter": ["in", "uid", ""]
            }); 

            map.addSource("odwh_panden", {
                type: 'vector',
                tiles:["http://saturnus.geodan.nl/mvt_mimas/odwh_panden/{z}/{x}/{y}.mvt"],
                minzoom: 13,
                maxzoom: 18
            });
            map.addLayer({
                'id': 'building-extrusion',
                'type': 'fill-extrusion',
                'source': 'odwh_panden',
                "source-layer": "odwh_panden",

                'paint': {
					
                    'fill-extrusion-color': {
                        "property": "relhoogte",
                        "stops": [
						[0,  'rgb(26,150,63)'],
                        [3.5,  'rgb(90,181,83)'],
                        [4.9,  'rgb(151,209,100)'],
                        [6.3,  'rgb(197,230,135)'],
                        [7.6, 'rgb(236,247,173)'],
                        [8.8, 'rgb(255,237,171)'],
                        [10.3, 'rgb(255,201,130)'],
                        [12.6, 'rgb(250,157,90)'],
                        [17.1, 'rgb(232,90,58)'],
                        [27.1, 'rgb(214,24,97)'],
						[100, 'rgb(214,24,97)']
                        ]
                    },
                    'fill-extrusion-height': {
                        'property': 'relhoogte',
                        'type': 'identity'
                    },
                    'fill-extrusion-opacity': 1
                }
            });
			

            
			// Create a popup, but don't add it to the map yet.
			var popup = new mapboxgl.Popup({
				closeButton: false,
				closeOnClick: false
			});
			
			map.on('mouseenter', 'building-extrusion', function(e) {
				// Change the cursor style as a UI indicator.
				map.getCanvas().style.cursor = 'pointer';

				// Populate the popup and set its coordinates
				// based on the feature found.
				popup.setLngLat(e.lngLat)
					.setHTML(e.features[0].properties.adres+'<br><i>'+e.features[0].properties.functie+'</i>')
					.addTo(map);
			});

			map.on('mouseleave', 'building-extrusion', function() {
				map.getCanvas().style.cursor = '';
				popup.remove();
			});
			
           
            

            map.on('click', function(e) {
                // set bbox as 5px reactangle area around clicked point
                var bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
                var features = map.queryRenderedFeatures(bbox, { layers: ['kmhokken'] });
                
                // Run through the selected features and set a filter
                // to match features with unique FIPS codes to activate
                // the `counties-highlighted` layer.
                features.forEach(feature=>{
                    self.dispatchEvent(new CustomEvent('hok', {detail: feature.properties.uid}));
                    var i = self.selectedHokken.indexOf(feature.properties.uid);
                    if (i < 0) {
                        self.selectedHokken.push(feature.properties.uid);
                        store.dispatch(addToCart(feature.properties.uid));
                    }
                    else {
                        self.selectedHokken.splice(i,1);
                        store.dispatch(removeFromCart(feature.properties.uid));
                    }
                });

                var filter = ['in', 'uid'];
                filter = filter.concat(self.selectedHokken);
                
                map.setFilter("kmhokken-highlighted", filter);
                self.dispatchEvent(new CustomEvent('kmhokken', {detail: {kmhokken: self.selectedHokken}}));
            });
            self.layers = map.layers;
        });
    }
    deselectAll(){
        this.selectedHokken = [];
        var filter = ['in', 'uid'];
        filter = filter.concat(this.selectedHokken);
        this.map.setFilter("kmhokken-highlighted", filter);
    }
    // This is called every time something is updated in the store.
    _stateChanged(state) {
        this.selectedHokken = state.selectedHokken;
    }
    _render({}){
        return html`
            <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.css' rel='stylesheet' />
            <div id='map' style='width: 100%; height: 1000px;'></div>
        `;
    }
    zoomTo(coords){
		this.map.flyTo({
			center: [
				coords.detail[0],
				coords.detail[1]
			]
		});
	}
}
window.customElements.define(MbMap.is, MbMap);