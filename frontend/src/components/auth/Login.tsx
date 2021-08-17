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
import validate from '../../utils/validate';

import accountIcon from '../../images/account.svg';
import EmailAdornment from '../../images/EmailAdornment';
import passwordAdornment from '../../images/password-adornment.svg';
import hidePassword from '../../images/hide-password.svg';
import showPassword from '../../images/show-password.svg';
import addUserIcon from '../../images/add-user.svg';
import forgotPasswordIcon from '../../images/forgot.svg';

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
  '@global': {
    '.MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before':
      {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
      },
    '.MuiInput:underline:after': {
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
  },
}));

interface LoginProps {
  setSelectedStep: React.Dispatch<React.SetStateAction<number>>;
  steps: { component: any; label: string }[];
}

const Login: React.FC<LoginProps> = ({ setSelectedStep }) => {
  const classes = useStyles();
  const [values, setValues] = useState<{ [key: string]: string }>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

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
        return (
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
        );
      })}
      <Grid item>
        <Button
          variant='contained'
          color='secondary'
          classes={{ root: classes.loginButton }}
        >
          <Typography variant='h5'>Login</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button classes={{ root: classes.facebookButton }}>
          <Typography
            variant='h3'
            classes={{ root: classes.facebookButtonText }}
          >
            Login with Facebook
          </Typography>
        </Button>
      </Grid>
      <Grid container item justifyContent='space-between'>
        <Grid item>
          <IconButton>
            <img src={addUserIcon} alt='sign up' />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <img src={forgotPasswordIcon} alt='forgot password' />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
