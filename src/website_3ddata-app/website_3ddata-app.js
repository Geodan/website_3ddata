import { Element } from '../../node_modules/@polymer/polymer/polymer-element.js';
/**
 * @customElement
 * @polymer
 */
class Website_3ddataApp extends Element {
  static get template() {
    return `
    <style>
      :host {
        display: block;
      }
    </style>
    <h2>Hello [[prop1]]!</h2>
`;
  }

  static get is() { return 'website_3ddata-app'; }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'website_3ddata-app'
      }
    };
  }
}

window.customElements.define(Website_3ddataApp.is, Website_3ddataApp);
