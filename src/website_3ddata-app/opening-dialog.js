import {LitElement} from '../../node_modules/@polymer/lit-element/lit-element.js'
import { html } from '../../node_modules/lit-html/lib/lit-extended.js';
import { Element } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/paper-dialog/paper-dialog.js';
import '../../node_modules/@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '../../node_modules/@polymer/paper-button/paper-button.js';
import '../../node_modules/@polymer/iron-flex-layout/iron-flex-layout-classes.js';


class OpeningDialog extends LitElement {
	static get is() { return 'opening-dialog'; }
	static get properties() {
        return {
        }
    }
    open(){
        this.$.dialog.open();
    }
    render(){
        html`
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
<paper-dialog id='dialog' opened='true'>
  <h2>3Ddatalab.nl 3D-modellen voor SRM2-geluidsstudies</h2>
  <paper-dialog-scrollable>
    
    <h3>3D-modellen voor geluidsstudies</h3>
    <div class="layout horizontal">
        <div>
            <p>
            Via deze website kan je 3D-omgevingsmodellen voor
            geluidsstudies bestellen.
            
            </p>
            <p>De modellering is conform de wettelijke eisen voor SRM2-
            geluidsstudies:
            </p>
            <ul>
            <li>3D-gebouwen: Blokken op nokhoogte, waarbij een gebouw is
            gesplitst op relevante interne hoogteverschillen. De panden
            zijn voorzien van adres- en functie-informatie.
            <li>3D-hoogtelijnen: breaklines (schouder en teen van een talud).
            <li>2D-bodemgebieden: verharding en water met B=0
            </ul>
            <p>
            De bestanden zijn direct geschikt voor import in GeoMilieu en
            WinHavik.
            </p>
        </div>
        <div><img width="225px" src="../img/opening01.jpg"/></div>
    </div>

    <h3>Actuele en betrouwbare gegevens</h3>
    <div class="layout horizontal">
        <div>
            <p>De 3D-modellen zijn opgebouwd op basis van digitale gegevens
            van de rijksoverheid (BAG, BGT en AHN). Gebruik van authentieke
            gegevensbronnen van het rijk, die met een geautomatiseerd
            conversie-proces zijn omgezet in 3D-modellen (geen handwerk)
            leidt tot betrouwbare en eenduidige geluidsmodellen, die direct
            herleidbaar zijn naar de basisgegevens.
            </p>
        </div>
        <div><img width="225px" src="../img/opening02.jpg"/></div>
    </div>

    <h3>Klik en bestel direct via deze site</h3>
    <div class="layout horizontal">
        <div>
        
            <p>
            Bestellen kan eenvoudig direct via deze website. Klik in de kaart de km2-vakken van je studiegebied
            aan en vul daarna je gegevens in bij de bestelknop. Je ontvangt dan een mail en na jouw verificatie
            op deze mail wordt de order in gang gezet.
            </p>
        </div>
        <div><img width="225px" src="../img/opening03.jpg"/></div>
    </div>

    <h3>Stuur een mail voor een groter studiegebied</h3>
    <p>
    Heb je een groot studiegebied? Stuur de shape dan aan <a href="mailto://henk.de.kluijver@geodan.nl">h.kluijver@upcmail.nl</a>. Je ontvangt een mail
    met prijsopgaaf. Na je akkoord wordt de order in gang gezet.
    </p>
        
  </paper-dialog-scrollable>
  <div class="buttons">
    <paper-button class="geodan" dialog-dismiss>Verder</paper-button>
  </div>
</paper-dialog>
`;
}

}
window.customElements.define(OpeningDialog.is, OpeningDialog);