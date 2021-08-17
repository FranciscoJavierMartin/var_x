import React, { useState } from 'react';
import {
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import validate from '../../utils/validate';

import accountIcon from '../../images/account.svg';
import EmailAdornment from '../../images/EmailAdornment';
import passwordAdornment from '../../images/password-adornment.svg';
import hidePassword from '../../images/hide-password.svg';
import showPassword from '../../images/show-password.svg';
import addUserIcon from '../../images/add-user.svg';
import forgotPasswordIcon from '../../images/forgot.svg';
import close from '../../images/close.svg';
import { SIGN_UP_LABEL } from '../../constants/authPortalLabels';

const useStyles = makeStyles(theme => ({
  accountIcon: {
    marginTop: '2rem',
  },
  textField: {
    width: '20rem',
  },
  input: {
    color: theme.palette.secondary.main,
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
    fontWeight: 700,
    textTransform: 'none',
  },
  visibleIcon: {
    padding: 0,
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
  const [errors, setErrors] = useState<any>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [forgot, setForgot] = useState<boolean>(false);

  const fields = {
    email: {
      helperText: 'Invalid email',
      placeholder: 'Email',
      type: 'text',
      startAdornment: (
        <InputAdornment position='start'>
          <span className={classes.emailAdornment}>
            <EmailAdornment />
          </span>
        </InputAdornment>
      ),
    },
    password: {
      helperText:
        'Your password must be at least eight characters and include one uppercase letter, one number, and one special character',
      placeholder: 'Password',
      hidden: forgot,
      type: isPasswordVisible ? 'text' : 'password',
      startAdornment: <img src={passwordAdornment} alt='password icon' />,
      endAdornment: (
        <img
          src={isPasswordVisible ? showPassword : hidePassword}
          alt={`${isPasswordVisible ? 'Show' : 'Hide'} password icon`}
        />
      ),
    },
  };

  const navigateSignUp = () => {
    const signUpIndex = steps.findIndex(step => step.label === SIGN_UP_LABEL);
    setSelectedStep(signUpIndex);
  };

  return (
    <>
      <Grid item classes={{ root: classes.accountIcon }}>
        <img src={accountIcon} alt='Login page icon' />
      </Grid>
      {Object.entries(fields).map(([field, fieldValues]) => {
        const validateHelper = (
          event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => {
          const valid = validate({ [field]: event.target.value });
          setErrors({ ...errors, [field]: !valid[field] });
        };
        return !(fieldValues as any).hidden ? (
          <Grid item key={field}>
            <TextField
              value={values[field]}
              onChange={e => {
                if (errors[field]) {
                  validateHelper(e);
                }
                setValues(prevState => ({
                  ...prevState,
                  [field]: e.target.value,
                }));
              }}
              classes={{ root: classes.textField }}
              type={fieldValues.type}
              placeholder={fieldValues.placeholder}
              onBlur={e => validateHelper(e)}
              error={errors[field]}
              helperText={errors[field] && fieldValues.helperText}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    {fieldValues.startAdornment}
                  </InputAdornment>
                ),
                endAdornment: fieldValues.hasOwnProperty('endAdornment') ? (
                  <InputAdornment position='end'>
                    <IconButton
                      classes={{ root: classes.visibleIcon }}
                      onClick={() =>
                        setIsPasswordVisible(prevState => !prevState)
                      }
                    >
                      {(fieldValues as any).endAdornment}
                    </IconButton>
                  </InputAdornment>
                ) : undefined,
                classes: { input: classes.input },
              }}
            />
          </Grid>
        ) : null;
      })}
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
