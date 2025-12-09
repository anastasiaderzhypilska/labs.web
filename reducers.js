import { 
  ADD_TO_CART, 
  REMOVE_FROM_CART, 
  UPDATE_QUANTITY, 
  CLEAR_CART 
} from './actions';

const initialState = {
  cartItems: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {


    case ADD_TO_CART: {
      const incomingItem = action.payload;


      const existingItem = state.cartItems.find(
        item => item.id === incomingItem.id
      );


      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === incomingItem.id
              ? { 
                  ...item, 
                  quantity: item.quantity + incomingItem.quantity 
                }
              : item
          )
        };
      }


      return {
        ...state,
        cartItems: [...state.cartItems, { ...incomingItem }]
      };
    }


    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          item => item.id !== action.payload
        )
      };


    case UPDATE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };


    case CLEAR_CART:
      return {
        ...state,
        cartItems: []
      };

    default:
      return state;
  }
};

export default cartReducer;
