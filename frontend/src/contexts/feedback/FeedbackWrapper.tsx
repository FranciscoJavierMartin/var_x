import React, { useReducer, createContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { closeSnackbar, openSnackbar, SnackbarStatus } from './actions';
import feedbackReducer from './reducer';
import { FeedbackContextState } from '../../interfaces/feedback';

export const FeedbackContext = createContext<FeedbackContextState>(
  {} as FeedbackContextState
);

export const FeedbackWrapper: React.FC = ({ children }) => {
  const [feedback, dispatchFeedback] = useReducer(feedbackReducer, {
    open: false,
    backgroundColor: '',
    message: '',
  });

  return (
    <>
      <FeedbackContext.Provider value={{ feedback, dispatchFeedback }}>
        {children}
      </FeedbackContext.Provider>
      <Snackbar
        open={feedback.open}
        message={feedback.message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={() =>
          dispatchFeedback(closeSnackbar())
        }
        ContentProps={{
          style: {
            backgroundColor: feedback.backgroundColor,
            fontSize: '1.25rem',
          },
        }}
      />
    </>
  );
};
