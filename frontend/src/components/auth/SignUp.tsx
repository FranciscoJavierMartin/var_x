import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Typography,
  Grid,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import axios from 'axios';
import Fields from '../shared/Fields';
import { COMPLETE_LABEL, LOGIN_LABEL } from '../../constants/authPortalLabels';
import { EmailPassword } from '../../utils/fieldsData';
import { setUser } from '../../contexts/actions';
import { SetUserType } from '../../contexts/actions/actions-types';
import { AuthResponse } from '../../interfaces/responses';
import { User } from '../../interfaces/user';

import addUserIcon from '../../images/add-user.svg';
import nameAdornment from '../../images/name-adornment.svg';
import forward from '../../images/forward-outline.svg';
import backward from '../../images/backwards-outline.svg';

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
  visibleIcon: {
    padding: 0,
  },
  emailAdornment: {
    height: 17,
    width: 22,
    marginBottom: 10,
  },
  removeButtonMargin: {
    marginTop: 0,
  },
}));

interface SignUpProps {
  setSelectedStep: React.Dispatch<React.SetStateAction<number>>;
  steps: { component: any; label: string }[];
  user: User;
  dispatchUser: React.Dispatch<SetUserType>;
}

const SignUp: React.FC<SignUpProps> = ({
  setSelectedStep,
  steps,
  user,
  dispatchUser,
}) => {
  const classes = useStyles();
  const [values, setValues] = useState<{ [key: string]: string }>({
    email: '',
    password: '',
    name: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [info, setInfo] = useState<boolean>(false);

  const nameField = {
    name: {
      helperText: 'You must enter a name',
      placeholder: 'Name',
      startAdornment: <img src={nameAdornment} alt='name' />,
    },
  };

  const fields = info
    ? EmailPassword(classes, false, false, isVisible, setIsVisible)
    : nameField;

  const disabled =
    Object.values(errors).some(error => error) ||
    Object.keys(errors).length !== Object.keys(values).length;

  const handleComplete = () => {
    axios
      .post<AuthResponse>(
        `${process.env.GATSBY_STRAPI_URL}/auth/local/register`,
        {
          username: values.name,
          email: values.email,
          password: values.password,
        }
      )
      .then(response => {
        dispatchUser(
          setUser({ ...response.data.user, jwt: response.data.jwt })
        );
      })
      .catch(err => console.log(err));
    const completeIndex = steps.findIndex(
      step => step.label === COMPLETE_LABEL
    );
    setSelectedStep(completeIndex);
  };

  const handleNavigate = (direction: 'forward' | 'backward') => {
    switch (direction) {
      case 'forward':
        setInfo(true);
        break;
      case 'backward':
        if (info) {
          setInfo(false);
        } else {
          const loginIndex = steps.findIndex(
            step => step.label === LOGIN_LABEL
          );
          setSelectedStep(loginIndex);
        }
        break;
    }
  };

  return (
    <>
      <Grid item>
        <img src={addUserIcon} alt='new user' className={classes.addUserIcon} />
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
          disabled={info && disabled}
          onClick={() => (info ? handleComplete() : null)}
          classes={{
            root: clsx(classes.facebookButton, {
              [classes.removeButtonMargin]: info,
            }),
          }}
        >
          <Typography
            variant='h5'
            classes={{ root: classes.facebookButtonText }}
          >
            Sign Up{info ? '' : 'with Facebook'}
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
        {info ? null : (
          <Grid item>
            <IconButton onClick={() => handleNavigate('forward')}>
              <img
                src={forward}
                alt='continue registration'
                className={classes.navigation}
              />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default SignUp;
