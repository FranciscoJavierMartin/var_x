export enum FeedbackActionTypes {
  OPEN_SNACKBAR = 'OPEN_SNACKBAR',
  CLOSE_SNACKBAR = 'CLOSE_SNACKBAR',
}

export enum SnackbarStatus {
  Error,
  Success,
}

export interface OpenSnackbarType {
  type: FeedbackActionTypes.OPEN_SNACKBAR;
  payload: {
    status: SnackbarStatus;
    message: string;
  };
}

export interface CloseSnackbarType {
  type: FeedbackActionTypes.CLOSE_SNACKBAR;
}

export type FeedbackActionsTypes = OpenSnackbarType | CloseSnackbarType;

export const openSnackbar = (
  status: SnackbarStatus,
  message: string
): OpenSnackbarType => ({
  type: FeedbackActionTypes.OPEN_SNACKBAR,
  payload: { status, message },
});

export const closeSnackbar = (): CloseSnackbarType => ({
  type: FeedbackActionTypes.CLOSE_SNACKBAR,
});
