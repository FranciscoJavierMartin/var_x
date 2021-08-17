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

const useStyles = makeStyles(theme => ({
  textField: {},
  input: {},
}));

interface SignUpProps {
  setSelectedStep: React.Dispatch<React.SetStateAction<number>>;
  steps: { component: any; label: string }[];
}

const SignUp: React.FC<SignUpProps> = ({ setSelectedStep }) => {
  const classes = useStyles();
  const [name, setName] = useState('');

  return (
    <>
      <Grid item>
        <img src={addUserIcon} alt='new user' />
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
        <Button variant='contained' color='secondary'>
          <Typography variant='h5'>Sign Up with Facebook</Typography>
        </Button>
      </Grid>
      <Grid item container justifyContent='space-between'>
        <Grid item>
          <IconButton>
            <img src={backward} alt='Back to login' />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <img src={forward} alt='continue registration' />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;
