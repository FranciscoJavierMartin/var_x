import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import Fields from '../shared/Fields';
import { EmailPassword } from '../../utils/fieldsData';
import { SIGN_UP_LABEL } from '../../constants/authPortalLabels';

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
}));

interface LoginProps {
  setSelectedStep: React.Dispatch<React.SetStateAction<number>>;
  steps: { component: any; label: string }[];
}

const Login: React.FC<LoginProps> = ({ setSelectedStep, steps }) => {
  const classes = useStyles();
  const [values, setValues] = useState<{ [key: string]: string }>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [forgot, setForgot] = useState<boolean>(false);

  const fields = EmailPassword(
    classes,
    false,
    forgot,
    isPasswordVisible,
    setIsPasswordVisible
  );

  const navigateSignUp = () => {
    const signUpIndex = steps.findIndex(step => step.label === SIGN_UP_LABEL);
    setSelectedStep(signUpIndex);
  };

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
          classes={{
            root: clsx(classes.loginButton, {
              [classes.reset]: forgot,
            }),
          }}
        >
          <Typography variant='h5'>
            {forgot ? 'Reset password' : 'Login'}
          </Typography>
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
