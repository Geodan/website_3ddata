import { Element } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../../node_modules/@polymer/iron-pages/iron-pages.js';
import '../../node_modules/@polymer/iron-icons/iron-icons.js';
import '../../node_modules/@polymer/iron-collapse/iron-collapse.js';
import '../../node_modules/@polymer/paper-tabs/paper-tabs.js';
import '../../node_modules/@polymer/paper-tabs/paper-tab.js';
import '../../node_modules/@polymer/paper-listbox/paper-listbox.js';
import '../../node_modules/@polymer/paper-card/paper-card.js';
import '../../node_modules/@polymer/paper-toast/paper-toast.js';
import '../../node_modules/@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '../../node_modules/@polymer/app-layout/app-drawer/app-drawer.js';
import '../../node_modules/@polymer/app-layout/app-header-layout/app-header-layout.js';
import '../../node_modules/@polymer/app-layout/app-header/app-header.js';
import '../../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../../node_modules/@polymer/paper-input/paper-input.js';
import '../../node_modules/@polymer/paper-button/paper-button.js';
import '../../node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../node_modules/@polymer/paper-item/paper-item.js';
import '../../node_modules/@polymer/paper-item/paper-item-body.js';
import '../../node_modules/@polymer/paper-icon-button/paper-icon-button.js';
import '../../node_modules/@polymer/paper-spinner/paper-spinner.js';
import '../../node_modules/@polymer/paper-toggle-button/paper-toggle-button.js';
import '../../node_modules/@polymer/paper-checkbox/paper-checkbox.js';
import '../../node_modules/@polymer/paper-radio-group/paper-radio-group.js';
import '../../node_modules/@polymer/paper-radio-button/paper-radio-button.js';
//import '../../node_modules/mapbox-gl/mapbox-gl.js';
import './mapbox-element.js';
import './gm-search.js';
import './opening-dialog.js';
import './pricing-dialog.js';
import './offerte-dialog.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="verkoop-app">
<template>

<style include="iron-flex iron-flex-alignment"></style>
<style is="custom-style">
	:host {
		display: block;
		--geodan-regular-font: 'Open Sans Regular';
		--geodan-light-font: 'Open Sans',sans-serif;
		--geodan-heading1-fontsize: 36px;
		--geodan-heading2-fontsize: 24px;
		--geodan-heading3-fontsize: 17px;
		--geodan-light-fontweight: 300;
		--geodan-color: #333333;

		--geodan-button-normal: #ED3031;
		--geodan-button-hover:  #D60000;
		--geodan-button-pressed: #BB0C16;
		--geodan-button-disabled: #ECECEC;
		--geodan-button-corner-radius: 4px;

		--geodan-checkbox-unckeched: #E3E2E3;
		--geodan-checkbox-checked: #ED3031;

		--geodan-header-background:  #424242;
		
		color: var(--geodan-color);
	}
	
	h1 {
		font-family: var(--geodan-regular-font);
		font-size: var(--geodan-heading1-fontsize);
	}
	h2 {
		font-family: var(--geodan-regular-font);
		font-size: var(--geodan-heading2-fontsize);
	}
	h3 {
		font-family: var(--geodan-regular-font);
		font-size: var(--geodan-heading3-fontsize);
	}

	.title {
		font-family: var(--geodan-regular-font);
		font-size: var(--geodan-heading1-fontsize);
	}
	paper-button.geodan {
		background:var(--geodan-button-normal);
		color:white;
		border-radius:var(--geodan-button-corner-radius); 
		--paper-button-ink-color: var(--geodan-button-normal);
		--paper-button-disabled: var(--geodan-button-disabled);
	}
	paper-button.geodan:hover {
		background:var(--geodan-button-hover);
	}

	paper-button.geodan a{
		color: white;
	}
	paper-icon-button {
		color: var(--geodan-button-normal);
		--paper-icon-button-ink-color: var(--geodan-button-normal);
	}

	a {
		text-decoration: none;
		color: var(--geodan-color);
	}

	app-header {
		height: 80px;
	}

	app-toolbar {
		background: var(--geodan-header-background);
		color: white;
		--app-toolbar-font-size: 18px;
		font-family: var(--geodan-light-font);
		font-weight: var(--geodan-light-fontweight);
		height: 80px;
	}

	paper-tab {
		--paper-tab-ink: var(--geodan-button-normal);
	}

	paper-tabs {
		--paper-tabs-selection-bar-color: var(--geodan-button-normal);

	}

	paper-checkbox {
		--paper-checkbox-unchecked-color: var(--geodan-checkbox-unchecked);
		--paper-checkbox-unchecked-ink-color: var(--geodan-checkbox-checked);
		--paper-checkbox-checked-color: var(--geodan-checkbox-checked);
		--paper-checkbox-checked-ink-color: var(--geodan-checkbox-unchecked);
		--paper-checkbox-checkmark-color: white;
	}
	#notes {
      @apply --layout-vertical;
	  height: 90%;
	  overflow: auto;
    }
	.step {
		/*flex: 0 0 auto;*/
		border-bottom-style: solid;
		border-bottom-width: 2px;
		border-bottom-color: var(--geodan-button-normal);
		padding: 5px;
		margin: 5px;
	}

	.step paper-button {
		width: 100%;
	}
	
    mapbox-gl {
        height: 100%;
    }
 
 </style>
 <paper-toast id="toast" text="Uw bestelling is verzonden" opened="" duration="5"></paper-toast>
 <opening-dialog id="openingdialog" opened=""></opening-dialog>
 <pricing-dialog id="pricingdialog"></pricing-dialog>
 <offerte-dialog id="offertedialog" panden="[[_panden]]" breeklijnen="[[_breeklijnen]]" bodemgebieden="[[_hardzacht]]" selectedhokken="[[selectedHokken]]" hokken="[[_hokken]]" totaal="[[_totaal]]"></offerte-dialog>
 <app-drawer-layout fullbleed="">
		<app-drawer slot="drawer" id="menu">
		
			<app-toolbar class="medium-tall">
			</app-toolbar>
			<div id="notes">
				
				<div class="step">
						
					<gm-geosearch servicekey="2021faff-cc40-11e6-a549-52540031712c" on-goto-coords="zoomTo"></gm-geosearch>
				</div>
				
				<div class="step">
					<b>Gewenste bestanden</b>
					<p>
						<paper-checkbox checked="{{_panden}}">Gebouwen</paper-checkbox><br>
						<paper-checkbox checked="{{_breeklijnen}}">Hoogtelijnen</paper-checkbox><br>
						<paper-checkbox checked="{{_hardzacht}}">Bodemvlakken</paper-checkbox>
					</p>
				</div>
				
				<div class="step">
					<b>Kies je gebied</b>
					<p>Klik km-vlakken in de kaart<br>
						of <a href="mailto:henk.de.kluijver@geodan.nl">mail</a> je onderzoeksgebied</p>
					<paper-button on-click="deselectAll" style="cursor: pointer">
						<iron-icon icon="tab-unselected"></iron-icon>&nbsp; alles deselecteren
					</paper-button>
					<!--
					en/of</p>
					upload studiegebied <paper-icon-button icon="icons:file-upload"></paper-icon-button>
					<input label="upload" type="file" on-change="fileupload">
					-->
					
				</div>
				
				<div class="step">
					<b>Bestel</b>
					<div class="horizontal layout justified">
						<div>
							Geselecteerd: <span>[[_hokken]]</span> km²<br>
							Totaal: € <span>[[_totaal]]</span>,-
						</div>
						<div class="flex"></div>
						<paper-icon-button id="offerbutton" icon="shopping-cart" on-click="openoffertedialog"></paper-icon-button>
					</div>
					<p>
					<small>NB: prijs per km daalt bij grote afname<br>
					10% korting bij afname van alle drie de typen bestanden</small>
					</p>
				</div>
				<div class="flex"></div>
				<div class="step">
					<b>Informatie</b><br>
					<div class="horizontal justified">
						<div on-click="openopeningdialog" style="cursor: pointer"><iron-icon icon="info"></iron-icon>Over</div>
						<div on-click="openpricingdialog" style="cursor: pointer"><iron-icon icon="info"></iron-icon>Prijs per km²</div>
						<a href="./data/Specificaties_3D-model_20171206.pdf" download=""><iron-icon icon="info"></iron-icon>Productspecificaties</a> <small>(pdf)</small><br>
						<a href="./data/demodata_3ddatalab.zip" download=""><iron-icon icon="file-download"></iron-icon>Download proefset</a> <small>(zip)</small>
					</div>
					<a href="mailto:henk.de.kluijver@geodan.nl">henk.de.kluijver@geodan.nl</a> <br>
						+31 (0)6 29076163
				</div>
			</div>
		</app-drawer>
		<app-header-layout fullbleed="">
			<app-header>

				<app-toolbar>
						<h4 condensed-title="">3D model voor SRM2-geluidsstudies</h4>
						<a href="https:\\\\www.geodan.nl"><img src="./img/Geodan_logo_rgb.png" height="80px"></a>
						<h2>&amp; &nbsp;</h2>
						<a href=""><img src="./img/4DWaveLab_logo.png" height="80px"></a>
				</app-toolbar>
			</app-header>
			<div class="flex">
                <content></content>
                <mapbox-element id="map" on-mapready="_mapChanged" map="{{map}}"></mapbox-element>
                <!--
                <mapbox-gl id="map" interactive="" map="{{map}}" script-src="https://api.tiles.mapbox.com/mapbox-gl-js/v0.43.0/mapbox-gl.js" access-token="pk.eyJ1IjoidGlsdCIsImEiOiJjaXl5dnAydjYwMDAxMnFwYWR1Z2ZjMngwIn0.JYt8pUcgFf9QETgo5FzA0A" map-style-url="mapbox://styles/mapbox/streets-v9" latitude="52.255" longitude="4.555" zoom="13" pitch="45" bearing="0"></mapbox-gl>
                -->
			</div>
	</app-header-layout>
	
</app-drawer-layout>
</template>
 <!--</dom-module>-->


</dom-module>`;

document.head.appendChild($_documentContainer);
/*
<link rel="import" href="../../bower_components/paper-header-panel/paper-header-panel.html">
<link rel="import" href="../../bower_components/paper-drawer-panel/paper-drawer-panel.html">
*/
/*</dom-module>*/
class VerkoopApp extends Element {
    static get is() { return 'verkoop-app'; }
    static get properties() {
        return {
            _panden: {
                type: Boolean,
                value: true
            },
            _breeklijnen: {
                type: Boolean,
                value: true
            },
            _hardzacht: {
                type: Boolean,
                value: true
            },
            _hokken: {value: 0},
            _totaal: {value: 0},
            fillextrusionheight: {
                type: Object,
                value: function() {
                    return {
                        'type': 'identity',
                        'property': 'relhoogte'
                    };
                }
            },
            selectedHokken: {
                type: Array,
                value: function(){
                    return [];
                },
                observer: '_calcTotaal'

            },
            offerdisabled: {
                type: Boolean,
                value: true,
            },
            selectedLayers: {
                type: Array
                //observer: '_selectedLayersChanged'
            },
            map: {
                type: Object,
                observer: '_mapChanged'
            },
            layers: {
                type: Array,
                value: function(){
                    return [

                    ];
                }
            }
        }
    }
    static get observers() {
        return [
        '_calcTotaal(selectedHokken.*,_panden, _hardzacht, _breeklijnen)'
        ]
    }


    readerLoad() {
        
        
    }
    fileupload(a,b,c) {
        var self = this;
        let file = a.currentTarget.files[0];
        var readerPromise = new Promise(function(resolve, reject){
            var reader = new FileReader();
            reader.onload = function(){
                if (this.readyState !== 2 || this.error) {
                    return;
                }
                else {
                    var geojson = {
                            "type": "FeatureCollection",
                            "features": []
                    };
                    shapefile.open(this.result)
                    .then(source => source.read()
                        .then(function log(result) {
                            if (result.done) return geojson;
                            geojson.features.push(result.value);
                            return source.read().then(log);
                        }))
                    .then(geojson => {
                        resolve(geojson);
                        
                    })
                    .catch(error => reject(error.stack));
                }
            };
            reader.readAsArrayBuffer(file);

        }).then(geojson => {
            var firstProjection = '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.999908 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs <>';
            var secondProjection = 'EPSG:4326';
            turf.coordEach(geojson, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
                geojson.features[featureIndex].geometry.coordinates[geometryIndex][coordIndex] = proj4(firstProjection,secondProjection,currentCoord);
            });
            turf.geomEach(geojson.features, function(currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {

            });

            self.map.addLayer({
                "id": "lines",
                'type': 'fill',
                "source": {
                    "type": "geojson",
                    "data": geojson
                },
                'layout': {},
                'paint': {
                    'fill-color': '#088',
                    'fill-opacity': 0.8
                }
            });

        });

        
        
    }

    _calcPrice(numhokken, panden, hardzacht, breeklijnen){
        let price_panden = [275,145,105,85,65,55];
        let price_breeklijnen = [55,35,25,20,15,13];
        let price_hardzacht = [30,17,12,10,7,6];
        let reduction = (panden&&breeklijnen&&hardzacht)?0.9:1;
        var unitprice = 0;
        if (numhokken < 10){
            unitprice += panden==true?price_panden[0]:0;
            unitprice += breeklijnen==true?price_breeklijnen[0]:0;
            unitprice += hardzacht==true?price_hardzacht[0]:0;
        }
        else if (numhokken < 25){
            unitprice += panden==true?price_panden[1]:0;
            unitprice += breeklijnen==true?price_breeklijnen[1]:0;
            unitprice += hardzacht==true?price_hardzacht[1]:0;
        }
        else if (numhokken < 50){
            unitprice += panden==true?price_panden[2]:0;
            unitprice += breeklijnen==true?price_breeklijnen[2]:0;
            unitprice += hardzacht==true?price_hardzacht[2]:0;
        }
        else if (numhokken < 100){
            unitprice += panden==true?price_panden[3]:0;
            unitprice += breeklijnen==true?price_breeklijnen[3]:0;
            unitprice += hardzacht==true?price_hardzacht[3]:0;
        }
        else if (numhokken < 200){
            unitprice += panden==true?price_panden[4]:0;
            unitprice += breeklijnen==true?price_breeklijnen[4]:0;
            unitprice += hardzacht==true?price_hardzacht[4]:0;
        }
        else if (numhokken < 500){
            unitprice += panden==true?price_panden[5]:0;
            unitprice += breeklijnen==true?price_breeklijnen[5]:0;
            unitprice += hardzacht==true?price_hardzacht[5]:0;
        }
        else if (numhokken >= 500){
            unitprice += panden==true?price_panden[5]:0;
            unitprice += breeklijnen==true?price_breeklijnen[5]:0;
            unitprice += hardzacht==true?price_hardzacht[5]:0;
        }
        return numhokken * unitprice * reduction;
    }


    _calcTotaal(hokken, panden, hardzacht,breeklijnen){
        
        this._hokken = this.selectedHokken.length;
        this._totaal = this._calcPrice(this._hokken,panden, hardzacht,breeklijnen)
        if (this._totaal > 0){
            this.offerbuttonvisible = true;
        }
        else {
            this.offerbuttonvisible = false;
        }
        
    }

    _mapChanged(e){
        var self =this;
        var map = e.detail;
        map.on('load', function() {
            //var map = self.map;
            window.map = map;
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
                    var i = self.selectedHokken.indexOf(feature.properties.uid);
                    if (i < 0) {
                        self.push('selectedHokken',feature.properties.uid);
                    }
                    else {
                        self.splice('selectedHokken',i,1);
                    }
                });

                var filter = ['in', 'uid'];
                filter = filter.concat(self.selectedHokken);
                
                map.setFilter("kmhokken-highlighted", filter);
            });
            self.layers = map.layers;
        });
    }
    deselectAll(){
        this.selectedHokken = [];
        var filter = ['in', 'uid'];
        filter = filter.concat(this.selectedHokken);
        map.setFilter("kmhokken-highlighted", filter);
    }
    zoomTo(coords){
        this.map.flyTo({
            center: [
                coords.detail[0],
                coords.detail[1]
            ]
        });
    }
    ready(){
        super.ready();
        this.$.openingdialog.open();
        this.layers.forEach(function(l,i){
            
        });

        this.$.offertedialog.addEventListener('submit', e => {
            this.$.toast.open();
        });
    }
    openpricingdialog(){
        this.$.pricingdialog.open();
    }
    openoffertedialog(){
        this.$.offertedialog.open();
    }
    openopeningdialog(){
        this.$.openingdialog.open();
    }
}
window.customElements.define(VerkoopApp.is, VerkoopApp);
