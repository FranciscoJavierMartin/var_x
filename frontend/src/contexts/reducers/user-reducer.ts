import { USER_STORAGED } from '../../constants/localStorage';
import { ActionTypes, UserActionsTypes } from '../actions/actions-types';

export default function userReducer(state: any, action: UserActionsTypes) {
  let newState: any;

  switch (action.type) {
    case ActionTypes.SET_USER:
      const { user } = action.payload;
      localStorage.setItem(USER_STORAGED, JSON.stringify(user));
      newState = { ...state, user };
      break;
    default:
      newState = state;
  }

  return newState;
}
