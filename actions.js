export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
export const SET_CART_ITEMS = 'SET_CART_ITEMS'; 

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
});

export const updateQuantity = (productId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { productId, quantity }
});

export const clearCart = () => ({
  type: CLEAR_CART
});

export const setCartItems = (items) => ({
  type: SET_CART_ITEMS,
  payload: items
});