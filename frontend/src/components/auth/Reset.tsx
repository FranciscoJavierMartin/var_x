import React, { useState, useEffect } from 'react';
import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import Fields from '../shared/Fields';
import { EmailPassword } from '../../utils/fieldsData';
import { openSnackbar, SnackbarStatus } from '../../contexts/feedback/actions';
import { LOGIN_LABEL } from '../../constants/authPortalLabels';
import { AuthStepsProps } from '../../interfaces/auth-steps-props';

import accountIcon from '../../images/account.svg';

const useStyles = makeStyles(theme => ({
  icon: {
    marginTop: '2rem',
  },
  resetButton: {
    width: '20rem',
    borderRadius: 50,
    textTransform: 'none',
    marginBottom: '4rem',
    [theme.breakpoints.down('xs')]: {
      width: '15rem',
    },
  },
  buttonText: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
}));

interface ResetProps extends AuthStepsProps {}

const Reset: React.FC<ResetProps> = ({
  steps,
  setSelectedStep,
  dispatchFeedback,
}) => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [values, setValues] = useState<{ [key: string]: string }>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { password } = EmailPassword(true, false, isVisible, setIsVisible);
  const fields = {
    password,
    confirmation: { ...password, placeholder: 'Confirm Password' },
  };

  const handleReset = () => {
    setLoading(true);
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    axios
      .post(`${process.env.GATSBY_STRAPI_URL}/auth/reset-password`, {
        code,
        password: values.password,
        passwordConfirmation: values.confirmation,
      })
      .then(() => {
        setLoading(false);
        setSuccess(true);
        dispatchFeedback(
          openSnackbar(SnackbarStatus.Success, 'Password reset successfully')
        );
      })
      .catch(error => {
        setLoading(false);
        dispatchFeedback(
          openSnackbar(
            SnackbarStatus.Error,
            error.response.data.message[0].messages[0].message
          )
        );
      });
  };

  const disabled =
    Object.values(errors).some(error => error) ||
    Object.keys(errors).length !== Object.keys(values).length ||
    values.password !== values.confirmation;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (success) {
      timer = setTimeout(() => {
        history.replaceState(null, '', location.pathname);
        const loginIndex = steps.findIndex(step => step.label === LOGIN_LABEL);
        setSelectedStep(loginIndex);
      }, 6000);
    }

    return () => clearTimeout(timer);
  }, [success]);

  return (
    <>
      <Grid item classes={{ root: classes.icon }}>
        <img src={accountIcon} alt='reset password page' />
      </Grid>
      <Fields
        fields={fields}
        errors={errors}
        setErrors={setErrors}
        values={values}
        setValues={setValues}
      />
      <Grid item>
        <Button
          variant='contained'
          color='secondary'
          classes={{ root: classes.resetButton }}
          onClick={handleReset}
          disabled={disabled}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant='h5' classes={{ root: classes.buttonText }}>
              Reset password
            </Typography>
          )}
        </Button>
      </Grid>
    </>
  );
};

export default Reset;
