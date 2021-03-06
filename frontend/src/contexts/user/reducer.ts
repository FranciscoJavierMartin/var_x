import { USER_STORAGED } from '../../constants/localStorage';
import { User } from '../../interfaces/user';
import { UserActionTypes, UserActionsTypes } from './actions';

export default function userReducer(
  state: User,
  action: UserActionsTypes
): User {
  let newState: User;

  switch (action.type) {
    case UserActionTypes.SET_USER:
      if (action.payload.username === 'Guest') {
        localStorage.removeItem(USER_STORAGED);
      } else {
        localStorage.setItem(USER_STORAGED, JSON.stringify(action.payload));
      }
      newState = action.payload;
      break;
    default:
      newState = state;
  }

  return newState;
}
