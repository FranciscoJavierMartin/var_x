import { USER_STORAGED } from '../../constants/localStorage';
import { UserState } from '../../interfaces/user';
import { ActionTypes, UserActionsTypes } from '../actions/actions-types';

export default function userReducer(
  state: UserState,
  action: UserActionsTypes
): UserState {
  let newState: UserState;

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
