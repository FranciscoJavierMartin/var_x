import { ActionTypes } from '../actions/actions-types';

export default function useReducer(state: any, action: any) {
  const { user } = action.payload;

  let newState = { ...state };

  switch (action.type) {
    case ActionTypes.SET_USER:
      localStorage.setItem('user', JSON.stringify(user));
      newState = user;
      return newState;
      break;
      default:
        return state;
  }
}
