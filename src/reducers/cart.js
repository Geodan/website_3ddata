import {
    SET_CART,
    ADD_TO_CART,
    EDIT_CART,
    REMOVE_FROM_CART,
    CLEAR_CART
  } from '../actions/cart.js';
  import { createSelector } from 'reselect';
  
  const cart = (state = {}, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        return {
          ...state,
          [action.entryId]: entry(state[action.entryId], action)
        };
      case REMOVE_FROM_CART:
        const result = {...state};
        delete result[action.entryId];
        return result;
      case CLEAR_CART:
        return {};
      default:
        return state;
    }
  }
  
  const entry = (state = {}, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        return {
          ...action.entry,
          quantity: (state.quantity || 0) + action.entry.quantity
        };
      case EDIT_CART:
        return {
          ...action.entry
        };
      default:
        return state;
    }
  }
  
  export default cart;
  
  const cartSelector = state => state.cart;
  
  export const numItemsSelector = createSelector(
    cartSelector,
    cart => {
      if (cart) {
        return Object.keys(cart).reduce((total, key) => {
          return total + cart[key].quantity;
        }, 0);
      }
  
      return 0;
    }
  )
  
  export const totalSelector = createSelector(
    cartSelector,
    cart => {
      if (cart) {
        return Object.keys(cart).reduce((total, key) => {
          const entry = cart[key];
          return total + entry.quantity * entry.item.price;
        }, 0);
      }
  
      return 0;
    }
  )