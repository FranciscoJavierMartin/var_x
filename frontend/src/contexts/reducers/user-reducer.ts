import { USER_STORAGED } from '../../constants/localStorage';
import { User } from '../../interfaces/user';
import { ActionTypes, UserActionsTypes } from '../actions/actions-types';

export default function userReducer(
  state: User,
  action: UserActionsTypes
): User {
  let newState: User;

  switch (action.type) {
    case ActionTypes.SET_USER:
      localStorage.setItem(USER_STORAGED, JSON.stringify(action.payload));
      newState = { ...state, ...action.payload };
      break;
    default:
      newState = state;
  }

  return newState;
}
