import * as Types from '../action.types';

const initialState = {
  cartItems: [],
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_TO_CART: {
      return {
        ...state,
        cartItems: state.cartItems.concat(action?.payload),
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default CartReducer;
