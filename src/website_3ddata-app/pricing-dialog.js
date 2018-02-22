import { Element } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/paper-dialog/paper-dialog.js';
import '../../node_modules/@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
//import '../../node_modules/vaadin-grid/vaadin-grid.js';
//import '../../node_modules/vaadin-grid/vaadin-grid-column.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="pricing-dialog">

<template>
<style include="iron-flex iron-flex-alignment"></style>
<style>
    #dialog {
        width: 50%;
    }
</style>
<paper-dialog id="dialog">
  <h2>Prijsinformatie</h2>
  <paper-dialog-scrollable>
        <vaadin-grid items="[[priceclasses]]">
            <vaadin-grid-column width="20%">
                <template class="header"></template>
                <template>[[item.class]]</template>
            </vaadin-grid-column>
            <vaadin-grid-column width="10%">
                <template class="header">Gebouwen<br>Prijs/km²</template>
                <template><template is="dom-if" if="[[item.totaal]]">€</template> [[item.gebouwen]]</template>
            </vaadin-grid-column>
            <vaadin-grid-column width="calc(10% - 100px)">
                <template class="header">Hoogtelijnen<br>Prijs/km²</template>
                <template><template is="dom-if" if="[[item.totaal]]">€</template> [[item.hoogtelijnen]]</template>
            </vaadin-grid-column>
            <vaadin-grid-column width="calc(10% - 100px)">
                <template class="header">Bodemgebieden<br>Prijs/km²</template>
                <template><template is="dom-if" if="[[item.totaal]]">€</template> [[item.bodemgebieden]]</template>
            </vaadin-grid-column>
            <vaadin-grid-column width="calc(10% - 100px)">
                <template class="header">Totaal<br>Prijs/km²</template>
                <template><template is="dom-if" if="[[item.totaal]]">€</template> [[item.totaal]]</template>
            </vaadin-grid-column>
        </vaadin-grid>
        <b>Kortingen</b>
        <p>
                Bij bestelling van alle drie de bestandstypen wordt een combi-korting berekend van 10%. De totaal prijs is dan 10% lager dan de som van de prijzen per bestandstypen. <br>							
                Bij grotere afname (meer km2) wordt de gemiddelde prijs per km2-vlak lager. Bij een bestelling van bijvoorbeeld 26 km2 geldt de bijbehorende km2-prijs ook voor de eerste 25 kilometervlakken. Zo bouw je een aardige korting op.
        </p>
        <b>Strippenkaart</b>
        <p>
            Ook als je niet nu maar later meer km's model wenst dan profiteer je van korting met onze strippenkaart.<br>
            Je kan de strippenkaart in de loop van het jaar besteden. Het tegoed vervalt een jaar na aankoop.<br>	
            Met een strippenkaart voor 50 km², download je bijvoorbeeld nu 12 km² en later in het jaar 15 km² en nog eens 23 km². Tot je kaart op is.<br>
            Je betaalt dan niet het normale '10-25 km²'-tarief maar profiteert van de korting met het '25-50 km²'- tarief. Hoe groter het oppervlak, hoe lager de prijs per km² is.<br>
            De strippenkaart geldt enkel voor het totaalpakket (gecombineerde aankoop van gebouwen, hoogtelijnen en bodemgebieden).					
        </p>
        <vaadin-grid items="[[strippenkaart]]">
            <vaadin-grid-column width="20%">
                <template class="header"></template>
                <template>[[item.class]]</template>
            </vaadin-grid-column>
            <!--
            <vaadin-grid-column width="10%">
                <template class="header">Gebouwen<br>Prijs</template>
                <template>&euro; [[item.gebouwen]]</template>
            </vaadin-grid-column>
            <vaadin-grid-column width="calc(10% - 100px)">
                <template class="header">Hoogtelijnen<br>Prijs</template>
                <template>&euro; [[item.hoogtelijnen]]</template>
            </vaadin-grid-column>
            <vaadin-grid-column width="calc(10% - 100px)">
                <template class="header">Bodemgebieden<br>Prijs</template>
                <template>&euro; [[item.bodemgebieden]]</template>
            </vaadin-grid-column>
            -->
            <vaadin-grid-column width="calc(10% - 100px)">
                <template class="header">Strippenkaart<br>Prijs</template>
                <template>€ [[item.totaal]]</template>
            </vaadin-grid-column>
        </vaadin-grid>            
    
  </paper-dialog-scrollable>
  <div class="buttons">
    <paper-button dialog-dismiss="">Sluit</paper-button>
  </div>
</paper-dialog>
</template>
 <!--</dom-module>-->


</dom-module>`;

document.head.appendChild($_documentContainer);
/*</dom-module>*/
class PricingDialog extends Element {
    static get is() { return 'pricing-dialog'; }
    static get properties() {
        return {
            priceclasses: {
                type: Object,
                value: function(){
                    return  [
                        {class: 'tot 10 km²',gebouwen: 275,hoogtelijnen: 55,bodemgebieden: 30,totaal: 324},
                        {class: 'tot 25 km²',gebouwen: 145,hoogtelijnen: 35,bodemgebieden: 17,totaal: 177},
                        {class: 'tot 50 km²',gebouwen: 105,hoogtelijnen: 25,bodemgebieden: 12,totaal: 127},
                        {class: 'tot 100 km²',gebouwen: 85,hoogtelijnen: 20,bodemgebieden: 10,totaal: 104},
                        {class: 'tot 200 km²',gebouwen: 65,hoogtelijnen: 15,bodemgebieden: 7,totaal: 78},
                        {class: 'tot 500 km²',gebouwen: 55,hoogtelijnen: 13,bodemgebieden: 6,totaal: 66},
                        {class: 'boven 500 km²',gebouwen: 'Prijs op aanvraag',hoogtelijnen: '',bodemgebieden: '',totaal: ''}
                    ];
                }
            },
            strippenkaart: {
                type: Object,
                value: function(){
                    return  [
                        {class: '25 km²',gebouwen: 2375,hoogtelijnen: 500,bodemgebieden: 250,totaal: 4433},
                        {class: '50 km²',gebouwen: 3750,hoogtelijnen: 750,bodemgebieden: 400,totaal: 6368},
                        {class: '100 km²',gebouwen: 6000,hoogtelijnen: 1200,bodemgebieden: 600,totaal: 10350},
                        {class: '200 km²',gebouwen: 10000,hoogtelijnen: 2000,bodemgebieden: 1000,totaal: 15660},
                        {class: '500 km²',gebouwen: 10000,hoogtelijnen: 2000,bodemgebieden: 1000,totaal: 33075},
                        {class: 'boven 500 km²',gebouwen: 'Prijs op aanvraag',hoogtelijnen: '',bodemgebieden: '',totaal:''}
                    ];
                }
            }
        }
    }
    open(){
        this.$.dialog.open();
    }
}
window.customElements.define(PricingDialog.is, PricingDialog);
