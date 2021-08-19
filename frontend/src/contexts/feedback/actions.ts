export enum FeedbackActionTypes {
  SET_SNACKBAR = 'SET_SNACKBAR',
}

export enum SnackbarStatus {
  Error,
  Success,
}

export interface SetSnackbarType {
  type: FeedbackActionTypes.SET_SNACKBAR;
  payload: {
    status: SnackbarStatus;
    message: string;
    open: boolean;
  };
}

export type FeedbarActionsTypes = SetSnackbarType;

export const setSnackbar = (
  status: SnackbarStatus,
  message: string,
  open: boolean
): FeedbarActionsTypes => ({
  type: FeedbackActionTypes.SET_SNACKBAR,
  payload: { status, message, open },
});
