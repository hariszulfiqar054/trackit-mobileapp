import * as Types from '../action.types';

export const addToCart = (payload) => {
  return {
    type: Types.ADD_TO_CART,
    payload,
  };
};

export const itemInc = (payload) => {
  return {
    type: Types.ITEM_INC,
    payload,
  };
};

export const itemDec = (payload) => {
  return {
    type: Types.ITEM_DEC,
    payload,
  };
};

export const itemRemove = (payload) => {
  return {
    type: Types.ITEM_REMOVE,
    payload,
  };
};

export const emptyCart = () => {
  return {
    type: Types.EMPTY_CART,
  };
};
