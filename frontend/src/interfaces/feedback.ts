import { FeedbackActionsTypes } from '../contexts/feedback/actions';

export interface FeedbackState {
  open: boolean;
  backgroundColor: string;
  message: string;
}

export interface FeedbackContextState {
  feedback: FeedbackState;
  dispatchFeedback: React.Dispatch<FeedbackActionsTypes>;
}
