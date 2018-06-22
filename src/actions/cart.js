
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';


export const addToCart = (entry) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    entryId: entry,
    entry
  });
  
};

export const removeFromCart = (entry) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    entryId: entry,
    entry
  });
  
};

export const clearCart = () => {
  return {
    type: CLEAR_CART
  };
};

