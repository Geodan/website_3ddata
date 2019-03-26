import { LitElement,html } from 'lit-element';
import { repeat } from 'lit-html/lib/repeat.js';

//import {html, render} from '@polymer/lit-html/lit-html.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-media-query/iron-media-query.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/iron-collapse/iron-collapse.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import { addHok, removeHok, updateOffline, updateDrawerState, updateLayout } from '../actions/app.js';

//import "https://unpkg.com/shapefile@0.6";
//import "https://cdnjs.cloudflare.com/ajax/libs/Turf.js/5.1.3/turf.min.js";
//import "https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.4.4/proj4.js";

import './shop-cart-data.js';
import './mb-map.js';
import './opening-dialog.js';
import './offerte-dialog.js';
import './pricing-dialog.js';
import './gm-search.js';


class VerkoopApp extends connect(store)(LitElement) {
	static get is() { return 'verkoop-app'; }
	static get properties() {
		return {
			buildings:  Boolean,
			breaklines: Boolean,
			hardness: Boolean,
			selectedHokken: Array,
			hokken: Array,
			numItems: Number,
			total: Number,
			_openingdialogopenend: Boolean,
			_offertedialogopenend: Boolean,
			_pricingdialogopenend: Boolean
		}
	}
    static get observers() {
		return [
    	]
	}
	constructor() {
		super();
		this.buildings = true;
		this.breaklines = true;
		this.hardness = true;
		this.numItems = 0;
		this.total = 0;
	}
	_hok(e){
		this.shadowRoot.querySelector('#cart').setItem(e.detail);
	}
	deselectAll(){
		this.hokken = [];
		this.shadowRoot.querySelector('#map').deselectAll();
	}
	zoomTo(coords){
		this.shadowRoot.querySelector('#map').zoomTo(coords);
	}
	ready(){
		super.ready();
		//this.shadowRoot.querySelector('#openingdialog').open();
	}
	openopeningdialog(){
		//this.shadowRoot.querySelector('#openingdialog').open();
	}
	openpricingdialog(){
		//this.shadowRoot.querySelector('#pricingdialog').open();
	}
	openoffertedialog(){
		//this.shadowRoot.querySelector('#offertedialog').open();
	}
	// If you don’t implement this method, you will get a
	// warning in the console.
	_stateChanged(state) {
		//this.count = state.data.count;
	}
	//static get template() {
	_render({
		buildings,	
		breaklines,	
		hardness,	
		hokken,	
		numItems,	
		total,	
		_openingdialogopenend,	
		_offertedialogopenend,	
		_pricingdialogopenend,
		selectedHokken
		}) {
		return html`
	
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
	
    mb-map {
		height: 100%;
		width: 1000px;
    }
 
 </style>
 <shop-cart-data id="cart" total="${total}" num-items="${numItems}" hokken="${hokken}" buildings="${buildings}" breaklines="${breaklines}" hardness="${hardness}"></shop-cart-data>
 <opening-dialog id="openingdialog" opened="${_openingdialogopenend}"></opening-dialog>
 <pricing-dialog id="pricingdialog" opened="${_pricingdialogopenend}"></pricing-dialog>
 <offerte-dialog id="offertedialog" opened="${_offertedialogopenend}" buildings="${buildings}" breaklines="${breaklines}" hardness="${hardness}" hokken="${hokken}" total="${total}"></offerte-dialog>
 <app-drawer-layout fullbleed>
		<app-drawer slot="drawer" id="menu" >
		
			<app-toolbar class="medium-tall">
			</app-toolbar>
			<div id="notes">
				
				<div class="step">
						
					<gm-geosearch 
					servicekey="2021faff-cc40-11e6-a549-52540031712c"
					on-goto-coords="zoomTo"
					></gm-geosearch>
				</div>
				
				<div class="step">
					<b>Gewenste bestanden</b>
					<p>
						<paper-checkbox checked="${buildings}">Gebouwen</paper-checkbox><br/>
						<paper-checkbox checked="${breaklines}">Hoogtelijnen</paper-checkbox><br/>
						<paper-checkbox checked="${hardness}">Bodemvlakken</paper-checkbox>
					</p>
				</div>
				
				<div class="step">
					<b>Kies je gebied</b>
					<p>Klik km-vlakken in de kaart<br/>
						of <a href="mailto:henk.de.kluijver@geodan.nl">mail</a> je onderzoeksgebied</p>
					<paper-button on-click="deselectAll" style="cursor: pointer">
						<iron-icon icon="tab-unselected"></iron-icon>&nbsp; alles deselecteren
					</paper-button>
				</div>
				
				<div class="step">
					<b>Bestel</b>
					<div class="horizontal layout justified">
						<div>
							Geselecteerd: <span>${numItems}</span> km&sup2;<br/>
							Totaal: &euro; <span>${total}</span>,-
						</div>
						<div class="flex"></div>
						<paper-icon-button id="offerbutton" icon="shopping-cart" on-click="openoffertedialog"></paper-icon-button>
					</div>
					<p>
					<small>NB: prijs per km daalt bij grote afname<br/>
					10% korting bij afname van alle drie de typen bestanden</small>
					</p>
				</div>
				<div class="flex"></div>
				<div class="step">
					<b>Informatie</b><br/>
					<div class="horizontal justified">
						<div on-click="openopeningdialog" style="cursor: pointer"><iron-icon icon="info"></iron-icon>Over</div>
						<div on-click="openpricingdialog" style="cursor: pointer"><iron-icon icon="info" ></iron-icon>Prijs per km&sup2;</div>
						<a href="./data/Specificaties_3D-model_20171206.pdf" download><iron-icon icon="info"></iron-icon>Productspecificaties</a> <small>(pdf)</small><br/>
						<a href="" download><iron-icon icon="file-download"></iron-icon>Download proefset</a> <small>(zip)</small>
					</div>
					<a href="mailto:henk.de.kluijver@geodan.nl">henk.de.kluijver@geodan.nl</a> <br/>
						+31 (0)6 29076163
				</div>
			</div>
		</app-drawer>
		<app-header-layout fullbleed>
			<app-header>

				<app-toolbar>
						<h4 condensed-title>3D model voor SRM2-geluidsstudies</h4>
						<a href="https:\\www.geodan.nl"><img src="./img/Geodan_logo_rgb.png" height="80px"/></a>
						<h2>&amp; &nbsp;</h2>
						<a href=""><img src="./img/4DWaveLab_logo.png" height="80px"/></a>
				</app-toolbar>
			</app-header>
			<div class="flex">
				<content></content>
				<mb-map id="map" 
					selectedHokken="${selectedHokken}" 
					on-hok="_hok"
					on-hok-added="${e => store.dispatch(addHok(e.target.uid))}"
					on-hok-removed="${e => store.dispatch(removeHok(e.target.uid))}"
				></mb-map>
			</div>
	</app-header-layout>
	
</app-drawer-layout>
`;
	}
};

window.customElements.define(VerkoopApp.is, VerkoopApp);