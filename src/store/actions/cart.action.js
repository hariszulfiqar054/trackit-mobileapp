import * as Types from '../action.types';

export const addToCart = (payload) => {
  return {
    type: Types.ADD_TO_CART,
    payload,
  };
};
