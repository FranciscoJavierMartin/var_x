import React from 'react';
import { FeedbackActionsTypes } from '../contexts/feedback/actions';
import { UserActionsTypes } from '../contexts/user/actions';
import { FeedbackState } from './feedback';
import { User } from './user';

export interface AuthStepsProps {
  setSelectedStep: React.Dispatch<React.SetStateAction<number>>;
  steps: { component: any; label: string }[];
  user: User;
  dispatchUser: React.Dispatch<UserActionsTypes>;
  feedback: FeedbackState;
  dispatchFeedback: React.Dispatch<FeedbackActionsTypes>;
}
