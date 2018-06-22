import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';

class ShopCartData extends PolymerElement {
  static get template() {
    return html`
    <!--
      <app-localstorage-document key="shop-cart-data" data="{{hokken}}"></app-localstorage-document>
    -->
`;
  }

  static get is() { return 'shop-cart-data'; }

  static get properties() { return {
    buildings: Boolean,
    breaklines: Boolean,
    hardness: Boolean,
    hokken: {
      type: Array,
      value: () => []
    },

    numItems: {
      type: Number,
      computed: '_computeNumItems(hokken.splices)'
    },

    total: {
      type: Number,
      //computed: '_computeTotal(hokken.splices)',
    }

  }}

  static get observers() { return [
    '_computeTotal(hokken.*,buildings, hardness, breaklines)'
  ]}


  setItem(id) {
    let i = this.hokken.indexOf(id);
    if (i !== -1) {
      this.splice('hokken', i, 1);
    }
    else {
        this.push('hokken', id);
    }
  }

  clearCart() {
    this.hokken = [];
  }

  _computeNumItems() {
    if (this.hokken) {
      return this.hokken.length;
    }

    return 0;
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
  _computeTotal(hokken, buildings, hardness, breaklines){
    this.total =  this._calcPrice(hokken.base.length,buildings,hardness,breaklines);
  }
  
}

customElements.define(ShopCartData.is, ShopCartData);