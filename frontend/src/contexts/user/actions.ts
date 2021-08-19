import { User } from '../../interfaces/user';

export enum UserActionTypes {
  SET_USER = 'SET_USER',
}

export interface SetUserType {
  type: UserActionTypes.SET_USER;
  payload: User;
}

export type UserActionsTypes = SetUserType;

export const setUser = (user: User): SetUserType => ({
  type: UserActionTypes.SET_USER,
  payload: user,
});
