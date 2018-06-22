import {LitElement,html} from '@polymer/lit-element/lit-element.js'
import { repeat } from 'lit-html/lib/repeat.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-item/paper-item.js';

//import * as Terraformer from "https://unpkg.com/terraformer@1.0.8";
//import "https://unpkg.com/terraformer-wkt-parser@1.1.2";

class GmGeosearch extends LitElement {
	static get is() { return 'gm-geosearch'; }
	static get properties() {
        return {
            servicekey: {
                type: String
            },
            key: {
                type: String
                //observer: '_keyChanged'
            },
            suggestions: {
				type: Array,
				value: ()=>{[]}
			},
            otap: {
                type: String,
                value: 'prod'
            },
            location: {
                //deprecated
                type: Object
            },
            lastLocation: {
                //to replace location
                type: Object
            },
            lastBoundary: {
                type: Object
			},
			listUrl: String
        }
    }
	constructor(){
		super();
		this.suggestions = [];
	}
	_getlocation(item){
        this.key = item.displayname;
		this.searchUrl = this.baseUrl + "/geosearch/lookup?q="+item.id+"&servicekey="+this.servicekey;
	}
    // add a callback to the element's prototype
	handleList(d){
		var documents =d.detail.xhr.response;
		this.error = '';
		this.suggestions = documents?documents.response.docs:[];
	}
	handleLocation(d){
		var documents =d.detail.xhr.response;
		this.error = '';
		var l = documents.response.docs[0];
		var center = l.centroid[0].replace('POINT(','').replace(')','').split(' ');
		//var boundary = Terraformer.WKT.parse(l.geom);
        this.suggestions = [];
		this.location = [parseFloat(center[0]),parseFloat(center[1])];
		this.lastLocation = this.location;
		//this.lastBoundary = boundary;
        this.dispatchEvent(new CustomEvent('goto-coords', {bubbles: true, composed: true, detail:[parseFloat(center[0]),parseFloat(center[1])]}));
		//this.fire('goto-coords',[parseFloat(center[0]),parseFloat(center[1])]);
		
		var center = l.centroid_rd[0].replace('POINT(','').replace(')','').split(' ');
        this.dispatchEvent(new CustomEvent('goto-rdcoords', {bubbles: true, composed: true, detail:[parseFloat(center[0]),parseFloat(center[1])]}));
		//this.fire('goto-rdcoords',[parseFloat(center[0]),parseFloat(center[1])]);
	}

	handleError(e){
		if(e.detail.request.xhr.status==404) {
			this.error = "Er zijn geen documenten gevonden"
		}
	}

    _getBaseUrl(){
    }

    ready() {
        super.ready();
        switch(this.otap) {
			case "ontw":
				this.baseUrl = "https://ontw.geodan.nl";
				break;
			default:
				this.baseUrl = "https://services.geodan.nl";
		}
    }

    _keyChanged(e){
    	var keystring = e.target.value.replace(' ','+');
		this.listUrl = this.baseUrl + '/geosearch/suggest?q=' + keystring+"&servicekey="+this.servicekey;
		
	}
	
	_render({ listUrl , searchUrl , suggestions }){
		return html`
		<style>
		paper-item {
			cursor: pointer;
		}
		iron-input {
			background: white;
		}
		</style>
			
		<iron-ajax
			auto
			url="${this.listUrl}"
			id="getList"
			verbose="true"
			handle-as="json"
			with-credentials="true"
			on-response="${e=>this.handleList(e)}"
			on-error="${this.handleError}"
			></iron-ajax>
	
		<iron-ajax
			auto
			url="${this.searchUrl}"
			id="getLocation"
			verbose="true"
			handle-as="json"
			with-credentials="true"
			on-response="${e=>this.handleLocation(e)}"
			on-error="${this.handleError}"
			></iron-ajax>
	
		<paper-input id='keystring' value="${this.key}"
			on-input="${ e => this._keyChanged(e)}"
			placeholder="zoek een plaats" autosave="test" results="5">
			<iron-icon icon="search" slot="prefix"></iron-icon>
		</paper-input>

		<iron-selector selected="${this.selectedconfig}">
			${repeat(this.suggestions, (i) => i.id, (i, index) => html`
				<paper-item on-click='${e=>this._getlocation(i)}'>
					<div>${i.displayname}</div>
				</paper-item>
			`)}
		</iron-selector>
	`;		
	}
};
window.customElements.define(GmGeosearch.is, GmGeosearch);