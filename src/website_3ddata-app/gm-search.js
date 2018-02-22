import { Element } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/iron-ajax/iron-ajax.js';
import '../../node_modules/@polymer/iron-selector/iron-selector.js';
import '../../node_modules/@polymer/iron-icon/iron-icon.js';
import '../../node_modules/@polymer/paper-input/paper-input.js';
import '../../node_modules/@polymer/paper-item/paper-item.js';
import '../../node_modules/@polymer/paper-item/paper-item-body.js';
//import '../../node_modules/terraformer/terraformer.min.js';
//import '../../node_modules/terraformer-wkt-parser/terraformer-wkt-parser.min.js';

class GmGeosearch extends Element {
  static get template() {
    return `
<style>
paper-item {
	cursor: pointer;
}
iron-input {
	background: white;
}
</style>
	
		<iron-ajax auto="" url="{{listUrl}}" id="getList" verbose="true" handle-as="json" with-credentials="true" on-response="handleList" on-error="handleError"></iron-ajax>

		<iron-ajax auto="" url="{{searchUrl}}" id="getLocation" verbose="true" handle-as="json" with-credentials="true" on-response="handleLocation" on-error="handleError"></iron-ajax>

		<paper-input id="keystring" value="{{key::input}}" on-input="_keyChanged" placeholder="zoek een plaats" autosave="test" results="5">
			<iron-icon icon="search" slot="prefix"></iron-icon>
		</paper-input>

		<iron-selector selected="{{selectedconfig}}">
			<template is="dom-repeat" items="{{suggestions}}">
				<paper-item on-click="_getlocation">
					<div>{{item.displayname}}</div>
				</paper-item>
			</template>
		</iron-selector>
`;
  }

  static get is() { return 'gm-geosearch'; }
  static get properties() {
      return {
          servicekey: {
              type: String
          },
          key: {
              type: String,
              notify: true
              //observer: '_keyChanged'
          },
          suggestions: {
              type: Array
          },
          otap: {
              type: String,
              value: 'prod'
          },
          location: {
              //deprecated
              type: Object,
              notify: true
          },
          lastLocation: {
              //to replace location
              type: Object,
              notify: true
          },
          lastBoundary: {
              type: Object,
              notify: true
          }
      }
  }
  _getlocation(e){
      var item = e.model.item;
      this.key = item.displayname;
      this.searchUrl = this.baseUrl + "/geosearch/lookup?q="+item.id+"&servicekey="+this.servicekey;
	}
  // add a callback to the element's prototype
  handleList(d){
      var documents =d.detail.xhr.response;
      this.error = '';
      this.suggestions = documents.response.docs;
	}
  handleLocation(d){
      var documents =d.detail.xhr.response;
      this.error = '';
      var l = documents.response.docs[0];
      var center = l.centroid[0].replace('POINT(','').replace(')','').split(' ');
      var boundary = Terraformer.WKT.parse(l.geom);
      this.suggestions = [];
      this.location = [parseFloat(center[0]),parseFloat(center[1])];
      this.lastLocation = this.location;
      this.lastBoundary = boundary;
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

  _keyChanged(k){
      var k = this.$.keystring.value;
    	var keystring = k.replace(' ','+');
    	this.listUrl = this.baseUrl + '/geosearch/suggest?q=' + keystring+"&servicekey="+this.servicekey;
  }
}
window.customElements.define(GmGeosearch.is, GmGeosearch);
