import {LitElement,html} from 'lit-element/lit-element.js'
import { repeat } from 'lit-html/lib/repeat.js';
import { IronOverlayBehaviorImpl } from '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';


class PricingDialog extends LitElement {
    static get is() { return 'pricing-dialog'; }
    static get properties(){
        return {
            opened: {
                type: Boolean
            },
            priceclasses: {
                type: Object,
                value: function(){
                    return  [
                        {class: 'tot 10 km²',gebouwen: 275,hoogtelijnen: 55,bodemgebieden: 30,totaal: 324},
                        {class: 'tot 25 km²',gebouwen: 145,hoogtelijnen: 35,bodemgebieden: 17,totaal: 177},
                        {class: 'tot 50 km²',gebouwen: 105,hoogtelijnen: 25,bodemgebieden: 12,totaal: 127},
                        {class: 'tot 100 km²',gebouwen: 85,hoogtelijnen: 20,bodemgebieden: 10,totaal: 104},
                        {class: 'tot 200 km²',gebouwen: 65,hoogtelijnen: 15,bodemgebieden: 7,totaal: 78},
                        {class: 'tot 500 km²',gebouwen: 55,hoogtelijnen: 13,bodemgebieden: 6,totaal: 66}
                        //,{class: 'boven 500 km²',gebouwen: 'Prijs op aanvraag',hoogtelijnen: '',bodemgebieden: '',totaal: ''}
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
                        {class: '500 km²',gebouwen: 10000,hoogtelijnen: 2000,bodemgebieden: 1000,totaal: 33075}
                        //,{class: 'boven 500 km²',gebouwen: 'Prijs op aanvraag',hoogtelijnen: '',bodemgebieden: '',totaal:''}
                    ];
                }
            }
        }
    }
    open(){
        this.opened =true;
    }
    _render({opened}){
        let priceclasses = [
            {class: 'tot 10 km²',gebouwen: 275,hoogtelijnen: 55,bodemgebieden: 30,totaal: 324},
            {class: 'tot 25 km²',gebouwen: 145,hoogtelijnen: 35,bodemgebieden: 17,totaal: 177},
            {class: 'tot 50 km²',gebouwen: 105,hoogtelijnen: 25,bodemgebieden: 12,totaal: 127},
            {class: 'tot 100 km²',gebouwen: 85,hoogtelijnen: 20,bodemgebieden: 10,totaal: 104},
            {class: 'tot 200 km²',gebouwen: 65,hoogtelijnen: 15,bodemgebieden: 7,totaal: 78},
            {class: 'tot 500 km²',gebouwen: 55,hoogtelijnen: 13,bodemgebieden: 6,totaal: 66}
            //{class: 'boven 500 km²',gebouwen: 'Prijs op aanvraag',hoogtelijnen: '',bodemgebieden: '',totaal: ''}
        ];
        let strippenkaart = [
            {class: '25 km²',gebouwen: 2375,hoogtelijnen: 500,bodemgebieden: 250,totaal: 4433},
            {class: '50 km²',gebouwen: 3750,hoogtelijnen: 750,bodemgebieden: 400,totaal: 6368},
            {class: '100 km²',gebouwen: 6000,hoogtelijnen: 1200,bodemgebieden: 600,totaal: 10350},
            {class: '200 km²',gebouwen: 10000,hoogtelijnen: 2000,bodemgebieden: 1000,totaal: 15660},
            {class: '500 km²',gebouwen: 10000,hoogtelijnen: 2000,bodemgebieden: 1000,totaal: 33075}
            //,{class: 'boven 500 km²',gebouwen: 'Prijs op aanvraag',hoogtelijnen: '',bodemgebieden: '',totaal:''}
        ];
        return html`
    
<style include="iron-flex iron-flex-alignment"></style>
<style>
 
    #dialog {
        width: 50%;
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
</style>
  <paper-dialog id='dialog' opened='${opened}'>
  <h2>Prijsinformatie</h2>
  
  <paper-dialog-scrollable>
    <table>
        <tr>
            <th></th><th>Gebouwen</th><th>Hoogtelijnen</th><th>Bodemgebieden</th><th>Totaal</th></tr>

    ${repeat(priceclasses, (i) => i.id, (i, index) => html`
      <tr>
        <td>${i.class}</td>
        <td> &euro; ${i.gebouwen}</td>
        <td> &euro; ${i.hoogtelijnen}</td>
        <td> &euro; ${i.bodemgebieden}</td>
        <td> &euro; ${i.totaal}</td>
      </tr>
    `)}
    <tr><td colspan=4>boven 500 km² prijs op aanvraag </td></td>
    </table>
        <b>Kortingen</b>
        <p>
                Bij bestelling van alle drie de bestandstypen wordt een combi-korting berekend van 10%. De totaal prijs is dan 10% lager dan de som van de prijzen per bestandstypen. <br/>							
                Bij grotere afname (meer km2) wordt de gemiddelde prijs per km2-vlak lager. Bij een bestelling van bijvoorbeeld 26 km2 geldt de bijbehorende km2-prijs ook voor de eerste 25 kilometervlakken. Zo bouw je een aardige korting op.
        </p>
        <b>Strippenkaart</b>
        <p>
            Ook als je niet nu maar later meer km's model wenst dan profiteer je van korting met onze strippenkaart.<br/>
            Je kan de strippenkaart in de loop van het jaar besteden. Het tegoed vervalt een jaar na aankoop.<br/>	
            Met een strippenkaart voor 50 km&sup2;, download je bijvoorbeeld nu 12 km&sup2; en later in het jaar 15 km&sup2; en nog eens 23 km&sup2;. Tot je kaart op is.<br/>
            Je betaalt dan niet het normale '10-25 km&sup2;'-tarief maar profiteert van de korting met het '25-50 km&sup2;'- tarief. Hoe groter het oppervlak, hoe lager de prijs per km&sup2; is.<br/>
            De strippenkaart geldt enkel voor het totaalpakket (gecombineerde aankoop van gebouwen, hoogtelijnen en bodemgebieden).					
        </p>

        <table>
        <tr>
            <th></th><th>Strippenkaart <br/>prijs</th></tr>

    ${repeat(strippenkaart, (i) => i.id, (i, index) => html`
      <tr>
        <td>${i.class}</td>
        <td> &euro; ${i.totaal}</td>
      </tr>
    `)}
    <tr><td colspan=2>boven 500 km² prijs op aanvraag </td></td>
    </table>
    
        <!--
        <vaadin-grid items="[[strippenkaart]]">
            <vaadin-grid-column width="20%">
                <template class="header"></template>
                <template>[[item.class]]</template>
            </vaadin-grid-column>
            <vaadin-grid-column width="calc(10% - 100px)">
                <template class="header">Strippenkaart<br>Prijs</template>
                <template>&euro; [[item.totaal]]</template>
            </vaadin-grid-column>
        </vaadin-grid>            
        -->
  </paper-dialog-scrollable>
  <div class="buttons">
    <paper-button class="geodan" dialog-dismiss>Verder</paper-button>
  </div>
</paper-dialog>
`;
}

}
window.customElements.define(PricingDialog.is, PricingDialog);
