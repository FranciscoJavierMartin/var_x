import { User } from '../../interfaces/user';
import { ActionTypes, SetUserType } from './actions-types';

export const setUser = (user: User): SetUserType => {
  return {
    type: ActionTypes.SET_USER,
    payload: user,
  };
};
