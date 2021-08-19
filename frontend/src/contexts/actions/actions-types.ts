import { User } from '../../interfaces/user';

export enum ActionTypes {
  SET_USER = 'SET_USER',
}

export interface SetUserType {
  type: ActionTypes.SET_USER;
  payload: User;
}

export type UserActionsTypes = SetUserType;
