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
    case Types.ITEM_INC: {
      state.cartItems[action?.payload].orderQty =
        (state.cartItems[action?.payload]?.orderQty || 1) + 1;

      return {
        ...state,
        cartItems: [...state.cartItems],
      };
    }

    case Types.ITEM_DEC: {
      if (state.cartItems[action?.payload].orderQty > 1)
        state.cartItems[action?.payload].orderQty =
          (state.cartItems[action?.payload]?.orderQty || 1) - 1;
      return {
        ...state,
        cartItems: [...state.cartItems],
      };
    }
    case Types.ITEM_REMOVE: {
      const filteredArray = state.cartItems.filter(
        (data) => data?._id !== action?.payload,
      );
      return {
        ...state,
        cartItems: [...filteredArray],
      };
    }
    case Types.EMPTY_CART: {
      return {
        ...state,
        cart: [],
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
