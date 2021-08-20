import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Fields from '../shared/Fields';
import { EmailPassword } from '../../utils/fieldsData';
import { FeedbackActionsTypes } from '../../contexts/feedback/actions';
import { UserActionsTypes } from '../../contexts/user/actions';
import { User } from '../../interfaces/user';
import { FeedbackState } from '../../interfaces/feedback';

import accountIcon from '../../images/account.svg';

const useStyles = makeStyles(theme => ({}));

interface ResetProps {
  setSelectedStep: React.Dispatch<React.SetStateAction<number>>;
  steps: { component: any; label: string }[];
  user: User;
  dispatchUser: React.Dispatch<UserActionsTypes>;
  feedback: FeedbackState;
  dispatchFeedback: React.Dispatch<FeedbackActionsTypes>;
}

const Reset: React.FC<ResetProps> = ({}) => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [values, setValues] = useState<{ [key: string]: string }>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const { password } = EmailPassword(
    classes,
    true,
    false,
    isVisible,
    setIsVisible
  );
  const fields = {
    password,
    confirmation: { ...password, placeholder: 'Confirm Password' },
  };

  return (
    <>
      <Grid item>
        <img src={accountIcon} alt='reset password page' />
      </Grid>
      <Fields
        fields={fields}
        errors={errors}
        setErrors={setErrors}
        values={values}
        setValues={setValues}
      />
    </>
  );
};

export default Reset;
