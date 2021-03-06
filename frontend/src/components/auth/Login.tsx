import React, { useState, useEffect } from 'react';
import {
  Button,
  IconButton,
  Grid,
  CircularProgress,
  Typography,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import axios from 'axios';
import Fields from '../shared/Fields';
import { EmailPassword } from '../../utils/fieldsData';
import { SIGN_UP_LABEL } from '../../constants/authPortalLabels';
import { setUser } from '../../contexts/user/actions';
import { openSnackbar, SnackbarStatus } from '../../contexts/feedback/actions';
import { AuthResponse } from '../../interfaces/responses';
import { AuthStepsProps } from '../../interfaces/auth-steps-props';

import accountIcon from '../../images/account.svg';
import addUserIcon from '../../images/add-user.svg';
import forgotPasswordIcon from '../../images/forgot.svg';
import close from '../../images/close.svg';

const useStyles = makeStyles(theme => ({
  accountIcon: {
    marginTop: '2rem',
  },
  emailAdornment: {
    height: 17,
    width: 22,
    marginBottom: 10,
  },
  loginButton: {
    width: '20rem',
    borderRadius: 50,
    textTransform: 'none',
    [theme.breakpoints.down('xs')]: {
      width: '15rem',
    },
  },
  facebookButton: {
    marginTop: '-1rem',
  },
  facebookButtonText: {
    fontSize: '1.5rem',
    fontWeight: 600,
    textTransform: 'none',
  },

  passwordError: {
    marginTop: 0,
  },
  close: {
    paddingTop: 5,
  },
  reset: {
    marginTop: '-4rem',
  },
  buttonText: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
}));

interface LoginProps extends AuthStepsProps {}

const Login: React.FC<LoginProps> = ({
  setSelectedStep,
  steps,
  dispatchUser,
  dispatchFeedback,
}) => {
  const classes = useStyles();
  const [values, setValues] = useState<{ [key: string]: string }>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [forgot, setForgot] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const fields = EmailPassword(
    false,
    forgot,
    isPasswordVisible,
    setIsPasswordVisible
  );

  const disabled =
    Object.values(errors).some(error => error) ||
    Object.keys(errors).length !== Object.keys(values).length;

  const navigateSignUp = () => {
    const signUpIndex = steps.findIndex(step => step.label === SIGN_UP_LABEL);
    setSelectedStep(signUpIndex);
  };

  const handleLogin = () => {
    setLoading(true);

    axios
      .post<AuthResponse>(`${process.env.GATSBY_STRAPI_URL}/auth/local`, {
        identifier: values.email,
        password: values.password,
      })
      .then(response => {
        setLoading(false);
        dispatchUser(
          setUser({
            ...response.data.user,
            jwt: response.data.jwt,
            onboarding: true,
          })
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

  const handleForgot = () => {
    setLoading(true);

    axios
      .post(`${process.env.GATSBY_STRAPI_URL}/auth/forgot-password`, {
        email: values.email,
      })
      .then(() => {
        setLoading(false);
        setSuccess(true);
        dispatchFeedback(
          openSnackbar(SnackbarStatus.Success, 'Reset code sent')
        );
      })
      .catch(error => {
        setLoading(false);
        dispatchFeedback(
          openSnackbar(
            SnackbarStatus.Error,
            error.response.data.message.message
          )
        );
      });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (success) {
      timer = setTimeout(() => {
        setForgot(false);
      }, 6000);
    }

    return () => clearTimeout(timer);
  }, [success]);

  return (
    <>
      <Grid item classes={{ root: classes.accountIcon }}>
        <img src={accountIcon} alt='Login page icon' />
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
          disabled={loading || (!forgot && disabled)}
          onClick={() => (forgot ? handleForgot() : handleLogin())}
          classes={{
            root: clsx(classes.loginButton, {
              [classes.reset]: forgot,
            }),
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant='h5' classes={{ root: classes.buttonText }}>
              {forgot ? 'Forgot password' : 'Login'}
            </Typography>
          )}
        </Button>
      </Grid>
      {forgot ? null : (
        <Grid item>
          <Button
            classes={{
              root: clsx(classes.facebookButton, {
                [classes.passwordError]: errors.password,
              }),
            }}
          >
            <Typography
              variant='h3'
              classes={{ root: classes.facebookButtonText }}
            >
              Login with Facebook
            </Typography>
          </Button>
        </Grid>
      )}
      <Grid container item justifyContent='space-between'>
        <Grid item>
          <IconButton onClick={navigateSignUp}>
            <img src={addUserIcon} alt='sign up' />
          </IconButton>
        </Grid>
        <Grid
          item
          classes={{
            root: clsx({
              [classes.close]: forgot,
            }),
          }}
        >
          <IconButton onClick={() => setForgot(prevState => !prevState)}>
            <img
              src={forgot ? close : forgotPasswordIcon}
              alt={forgot ? 'back to login' : 'forgot password'}
            />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
