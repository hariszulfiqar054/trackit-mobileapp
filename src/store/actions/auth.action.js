import * as Types from '../action.types';
export const saveUser = (user) => {
  return {
    type: Types.SAVE_USER,
    payload: user,
  };
};
