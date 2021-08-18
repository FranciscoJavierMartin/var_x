import { ActionTypes } from './actions-types';

export const setUser = (user: any) => {
  return {
    type: ActionTypes.SET_USER,
    payload: { user },
  };
};
