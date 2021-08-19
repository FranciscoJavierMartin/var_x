import { FeedbackState } from '../../interfaces/feedback';
import {
  FeedbackActionTypes,
  FeedbackActionsTypes,
  SnackbarStatus,
} from './actions';
import {
  error as errorColor,
  success as successColor,
} from '../../components/ui/theme';

export default function feedbackReducer(
  state: FeedbackState,
  action: FeedbackActionsTypes
): FeedbackState {
  let newState: FeedbackState;

  switch (action.type) {
    case FeedbackActionTypes.OPEN_SNACKBAR:
      const { status, message } = action.payload;
      newState = {
        ...state,
        open: true,
        backgroundColor:
          status === SnackbarStatus.Error ? errorColor : successColor,
        message,
      };
      break;
    case FeedbackActionTypes.CLOSE_SNACKBAR:
      newState = {
        ...state,
        open: false,
        backgroundColor: 'transparent',
        message: '',
      };
      break;
    default:
      newState = state;
  }

  return newState;
}
