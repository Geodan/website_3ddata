
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { IronOverlayBehaviorImpl } from '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-form/iron-form.js';


class OfferteDialog extends PolymerElement {
    static get is() { return 'offerte-dialog'; }
    static get properties(){
        return {
            opened: {
                type: Boolean
            },
            numItems: {
                computed: '_calcNumItems(hokken.*)'
            },
            total: Number,
            hokken: Object,
            buildings: Boolean,
            breaklines: Boolean,
            hardness: Boolean
        }
    }
    _calcNumItems(hokken){
        return hokken.base.length;
    }
    open(){
        this.$.dialog.open();
    }
    ready(){
        super.ready();
        var self = this;
        this.shadowRoot.querySelector('#gform').addEventListener('iron-form-presubmit', function(event) {
            self.sendForm(event);
        });
    }
    submitForm(){
        this.shadowRoot.querySelector('#gform').submit();
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
    static get template() {
        return html`
      
<style include="iron-flex iron-flex-alignment"></style>
<style>
 
#dialog {
        width: 50%;
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
</style>
  <paper-dialog id='dialog' opened='{{opened}}'>
  <iron-form id="gform">
        <form method="POST" action="https://script.google.com/a/geodan.nl/macros/s/AKfycbzvArH9RXdknHFP6GujzeMVvBrH3zBzlXpZYJkaNkj8TYF5IQ/exec">
        <div class="subsection grid">
            <section>
                <h2 id="accountInfoHeading">Bestelling</h2>
                
                <b>[[numItems]]</b> km&sup2; geselecteerd voor:<br>
            
                <paper-checkbox name="gebouwen" enabled checked={{buildings}} label="Gebouwen"></paper-checkbox> Gebouwen<br>
                <paper-checkbox name="hoogtelijnen" enabled checked={{breaklines}} label="Hoogtelijnen"></paper-checkbox> Hoogtelijnen<br>
                <paper-checkbox name="bodemgebieden" enabled checked={{hardness}} label="Bodemgebieden"></paper-checkbox> Bodemgebieden<br>

                Totaalprijs: 

                <div class="row input-row">
                    <paper-input name="strippenkaart" label="Code strippenkaart"></paper-input>
                    <paper-icon-button icon="icons:info"></paper-icon-button>
                </div>
                <div class="row total-row">
                    <div class="flex">Totaal</div>
                    <div>&euro; [[total]]</div>
                </div>
            
            </section>
            <section>
                <h2>Gegevens</h2>
                <div class="row input-row">
                    <paper-input name="name" label="Naam" value="Test" required></paper-input>
                </div>
                <div class="row input-row">
                    <paper-input name="organisation" label="Organisatie" value="Test"></paper-input>
                </div>
                <div class="row input-row">
                    <paper-input name="street" label="Straat" size="200" value="Test"></paper-input>
                    <paper-input name="number" label="Nummer" value=42></paper-input>
                </div>
                <div class="row input-row">
                    <paper-input name="postcode" label="Postcode" value="9999AA"></paper-input>
                    <paper-input name="city" label="Plaats" value="Lutjebroek"></paper-input>
                </div>
                <div class="row input-row">
                    <paper-input name="phone" label="Telefoonnummer" pattern="\d{10,}" value="06123456789"></paper-input>
                </div>
                <div class="row input-row">
                    <paper-input name="email" label="E-mail" value="test@test.nl" required></paper-input>
                </div>
            </section>
        </div>
        </form>
    </iron-form>
    
    <p>
        Na het verzenden van dit bestelformulier ontvangt u ter verificatie een mail (binnen één werkdag). De bestelling wordt definitief gemaakt na akkoord op de mail.
    </p>
  <div class="buttons">
    <paper-button dialog-dismiss>Sluit</paper-button>
    <paper-button raised on-click="submitForm">Verzend</paper-button>
  </div>
</paper-dialog>
`;
}

}
window.customElements.define(OfferteDialog.is, OfferteDialog);
