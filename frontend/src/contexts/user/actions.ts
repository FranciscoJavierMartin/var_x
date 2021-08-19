import { User } from '../../interfaces/user';

export enum ActionTypes {
  SET_USER = 'SET_USER',
}

export interface SetUserType {
  type: ActionTypes.SET_USER;
  payload: User;
}

export type UserActionsTypes = SetUserType;

export const setUser = (user: User): SetUserType => {
  return {
    type: ActionTypes.SET_USER,
    payload: user,
  };
};
