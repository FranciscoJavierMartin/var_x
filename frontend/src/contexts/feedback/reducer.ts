import { useTheme } from '@material-ui/core';
import { FeedbackState } from '../../interfaces/feedback';
import {
  FeedbackActionTypes,
  FeedbarActionsTypes,
  SnackbarStatus,
} from './actions';

export default function feedbackReducer(
  state: FeedbackState,
  action: FeedbarActionsTypes
): FeedbackState {
  let newState: FeedbackState;
  const theme = useTheme();

  switch (action.type) {
    case FeedbackActionTypes.SET_SNACKBAR:
      const { open, status, message } = action.payload;
      if (!open) {
        newState = state;
      } else {
        newState = {
          ...state,
          backgroundColor:
            status === SnackbarStatus.Error
              ? theme.palette.common.error
              : theme.palette.common.success,
          message,
        };
      }
      break;
    default:
      newState = state;
  }

  return newState;
}
