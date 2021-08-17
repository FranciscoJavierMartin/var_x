import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  makeStyles,
} from '@material-ui/core';

import addUserIcon from '../../images/add-user.svg';
import nameAdornment from '../../images/name-adornment.svg';
import forward from '../../images/forward-outline.svg';
import backward from '../../images/backwards-outline.svg';
import { LOGIN_LABEL } from '../../constants/authPortalLabels';

const useStyles = makeStyles(theme => ({
  addUserIcon: {
    height: '10rem',
    width: '11rem',
    marginTop: '5rem',
  },
  textField: {
    width: '20rem',
  },
  input: {
    color: theme.palette.secondary.main,
  },
  facebookButton: {
    width: '20rem',
    borderRadius: 50,
    marginTop: '-3rem',
  },
  facebookButtonText: {
    textTransform: 'none',
    fontSize: '1.5rem',
  },
  navigation: {
    height: '4rem',
    width: '4rem',
  },
}));

interface SignUpProps {
  setSelectedStep: React.Dispatch<React.SetStateAction<number>>;
  steps: { component: any; label: string }[];
}

const SignUp: React.FC<SignUpProps> = ({ setSelectedStep, steps }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [info, setInfo] = useState<boolean>(false);

  const handleNavigate = (direction: 'forward' | 'backward') => {
    switch (direction) {
      case 'forward':
        setInfo(true);
        break;
      case 'backward':
        const loginIndex = steps.findIndex(step => step.label === LOGIN_LABEL);
        setSelectedStep(loginIndex);
        break;
    }
  };

  return (
    <>
      <Grid item>
        <img src={addUserIcon} alt='new user' className={classes.addUserIcon} />
      </Grid>
      <Grid item>
        <TextField
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
          classes={{ root: classes.textField }}
          type={'text'}
          placeholder={'Name'}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <img src={nameAdornment} alt='Name icon' />
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
          classes={{ root: classes.facebookButton }}
        >
          <Typography
            variant='h5'
            classes={{ root: classes.facebookButtonText }}
          >
            Sign Up with Facebook
          </Typography>
        </Button>
      </Grid>
      <Grid item container justifyContent='space-between'>
        <Grid item>
          <IconButton onClick={() => handleNavigate('backward')}>
            <img
              src={backward}
              alt='Back to login'
              className={classes.navigation}
            />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={() => handleNavigate('forward')}>
            <img
              src={forward}
              alt='continue registration'
              className={classes.navigation}
            />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;
