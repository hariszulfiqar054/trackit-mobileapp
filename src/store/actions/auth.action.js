import * as Types from '../action.types';
const saveUser = (user) => {
  return {
    type: Types.SAVE_USER,
    payload: user,
  };
};

export {saveUser};
