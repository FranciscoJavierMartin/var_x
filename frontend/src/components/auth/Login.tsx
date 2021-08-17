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
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <>
      <Grid item classes={{ root: classes.accountIcon }}>
        <img src={accountIcon} alt='Login page icon' />
      </Grid>
      <Grid item>
        <TextField
          value={email}
          onChange={e => setEmail(e.target.value)}
          classes={{ root: classes.textField }}
          placeholder='Email'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <span className={classes.emailAdornment}>
                  <EmailAdornment />
                </span>
              </InputAdornment>
            ),
            classes: { input: classes.input },
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          value={password}
          onChange={e => setPassword(e.target.value)}
          classes={{ root: classes.textField }}
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder='Password'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <img src={passwordAdornment} alt='password icon' />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  classes={{ root: classes.visibleIcon }}
                  onClick={() => setIsPasswordVisible(prevState => !prevState)}
                >
                  <img
                    src={isPasswordVisible ? showPassword : hidePassword}
                    alt={`${isPasswordVisible ? 'Show' : 'Hide'} password icon`}
                  />
                </IconButton>
              </InputAdornment>
            ),
            classes: { input: classes.input },
          }}
        />
      </Grid>
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
