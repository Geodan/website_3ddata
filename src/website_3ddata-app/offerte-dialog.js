import { Element } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/paper-dialog/paper-dialog.js';
import '../../node_modules/@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '../../node_modules/@polymer/paper-input/paper-input.js';
import '../../node_modules/@polymer/paper-button/paper-button.js';
import '../../node_modules/@polymer/paper-icon-button/paper-icon-button.js';
import '../../node_modules/@polymer/paper-checkbox/paper-checkbox.js';
import '../../node_modules/@polymer/iron-form/iron-form.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="offerte-dialog">

<template>
<style include="iron-flex iron-flex-alignment"></style>
<style>
    #dialog {
        width: 50%;
    }
    shop-input, shop-select {
        font-size: 16px;
    }
    shop-select {
        margin-bottom: 20px;
    }
    .grid {
        margin-top: 40px;
        @apply --layout-horizontal;
      }
      .grid > section {
        @apply --layout-flex;
      }
      .grid > section:not(:first-child) {
        margin-left: 80px;
      }
    .row {
        @apply --layout-horizontal;
        @apply --layout-end;
    }
    .column {
        @apply --layout-vertical;
    }
    .row > .flex,
      .input-row > * {
        @apply --layout-flex;
    }
    .input-row > *:not(:first-child) {
        margin-left: 8px;
    }
    .hidden {
        display: none;
    }
</style>

<paper-dialog id="dialog">
  <paper-dialog-scrollable>
    <iron-form id="gform">
        <form method="POST" action="https://script.google.com/a/geodan.nl/macros/s/AKfycbzvArH9RXdknHFP6GujzeMVvBrH3zBzlXpZYJkaNkj8TYF5IQ/exec">
        <div class="subsection grid">
            <section>
                <h2 id="accountInfoHeading">Bestelling</h2>
                <paper-input class="hidden" name="hokken" value="[[_selectedhokkenstr]]"></paper-input>
                <b>[[hokken]]</b> km² geselecteerd voor:<br>
            
                <paper-checkbox name="gebouwen" enabled="" checked="{{panden}}" label="Gebouwen"></paper-checkbox> Gebouwen<br>
                <paper-checkbox name="hoogtelijnen" enabled="" checked="{{breeklijnen}}" label="Hoogtelijnen"></paper-checkbox> Hoogtelijnen<br>
                <paper-checkbox name="bodemgebieden" enabled="" checked="{{bodemgebieden}}" label="Bodemgebieden"></paper-checkbox> Bodemgebieden<br>

                <div class="row total-row">
                    <div class="flex">Totaal</div>
                    <div>€ [[totaal]]</div>
                </div>

                <div class="row input-row">
                    <paper-input name="strippenkaart" label="Code strippenkaart"></paper-input>
                    <!--<paper-icon-button icon="icons:info"></paper-icon-button>-->
                </div>
                
            
            </section>
            <section>
                <h2>Gegevens</h2>
                <div class="row input-row">
                    <paper-input name="name" label="Naam" required=""></paper-input>
                </div>
                <div class="row input-row">
                    <paper-input name="organisation" label="Organisatie"></paper-input>
                </div>
                <div class="row input-row">
                    <paper-input name="street" label="Straat" size="200"></paper-input>
                    <paper-input name="number" label="Nummer"></paper-input>
                </div>
                <div class="row input-row">
                    <paper-input name="postcode" label="Postcode"></paper-input>
                    <paper-input name="city" label="Plaats"></paper-input>
                </div>
                <div class="row input-row">
                    <paper-input name="phone" label="Telefoonnummer" pattern="\\d{10,}"></paper-input>
                </div>
                <div class="row input-row">
                    <paper-input name="email" label="E-mail" required=""></paper-input>
                </div>
            </section>
        </div>
        </form>
    </iron-form>
    
    <p>
        Na het verzenden van dit bestelformulier ontvangt u ter verificatie een mail (binnen één werkdag). De bestelling wordt definitief gemaakt na akkoord op de mail.
    </p>
  </paper-dialog-scrollable>
  <div class="buttons">
    <paper-button dialog-dismiss="">Sluit</paper-button>
    <paper-button raised="" on-click="submitForm">Verzend</paper-button>
  </div>
</paper-dialog>
</template>
 <!--</dom-module>-->


</dom-module>`;

document.head.appendChild($_documentContainer);
/*</dom-module>*/
class OfferteDialog extends Element {
    static get is() { return 'offerte-dialog'; }
    static get properties() {
        return {
            totaal: {
                type: Number,
                value: 0
            },
            hokken: {
                type: Number,
                value: 0
            },
            selectedhokken: {
                type: Array
            },
            panden: {
                type: Number,
                value: 0
            },
            breeklijnen: {
                type: Number,
                value: 0
            },
            bodemgebieden: {
                type: Number,
                value: 0
            },
            _selectedhokkenstr: {
                type: String
            }
        }
    }
    static get observers() {
        return [
        'selectedhokkenchanged(selectedhokken.*)'
        ]
    }
    open(){
        this.$.dialog.open();
    }
    ready(){
        super.ready();
        var self = this;
        this.$.gform.addEventListener('iron-form-presubmit', function(event) {
            self.sendForm(event);
        });
    }
    submitForm(){
        this.$.gform.submit();
        this.$.dialog.close();
        this.dispatchEvent(new CustomEvent('submit'));
    }
    sendForm(event){
        event.preventDefault();           // we are submitting via xhr below
        var request = event.target.request; 
        // add form-specific values into the data
        request.body.formDataNameOrder = JSON.stringify(["name","organisation","street","number","postcode","city","phone","email","strippenkaart","gebouwen","hoogtelijnen","bodemgebieden","hokken"]);
        request.body.formGoogleSheetName = "responses"; // default sheet name
        request.body.formGoogleSendEmail = ""; // no email by default

        console.log(request.body);
        request.generateRequest();
    }
    selectedhokkenchanged(selectedhokken){
        this._selectedhokkenstr = this.selectedhokken.toString();
    }
}
window.customElements.define(OfferteDialog.is, OfferteDialog);
