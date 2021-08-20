import React, { useState, useEffect, useContext } from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import axios from 'axios';
import Login from './Login';
import SignUp from './SignUp';
import Complete from './Complete';
import { UserContext, FeedbackContext } from '../../contexts';
import { openSnackbar, SnackbarStatus } from '../../contexts/feedback/actions';
import { setUser } from '../../contexts/user/actions';
import {
  COMPLETE_LABEL,
  LOGIN_LABEL,
  RESET_LABEL,
  SIGN_UP_LABEL,
} from '../../constants/authPortalLabels';
import Reset from './Reset';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: '8rem',
  },
  paper: {
    border: `2rem solid ${theme.palette.secondary.main}`,
    width: '50rem',
    height: '40rem',
    borderRadius: 0,
  },
  inner: {
    height: '40rem',
    width: '100%',
    border: `2rem solid ${theme.palette.primary.main}`,
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

interface AuthPortalProps {}

const AuthPortal: React.FC<AuthPortalProps> = ({}) => {
  const classes = useStyles();
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const { user, dispatchUser } = useContext(UserContext);
  const { feedback, dispatchFeedback } = useContext(FeedbackContext);

  const steps: { component: any; label: string }[] = [
    {
      component: Login,
      label: LOGIN_LABEL,
    },
    {
      component: SignUp,
      label: SIGN_UP_LABEL,
    },
    {
      component: Complete,
      label: COMPLETE_LABEL,
    },
    {
      component: Reset,
      label: RESET_LABEL,
    },
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const access_token = params.get('access_token');

    if (code) {
      const resetStepIndex = steps.findIndex(
        step => step.label === RESET_LABEL
      );
      setSelectedStep(resetStepIndex);
    } else if (access_token) {
      axios
        .get(`${process.env.GATSBY_STRAPI_URL}/auth/facebook/callback`, {
          params: { access_token },
        })
        .then(response => {
          dispatchUser(
            setUser({
              ...response.data.user,
              jwt: response.data.jwt,
              onboarding: true,
            })
          );
          history.replaceState(null, '', location.pathname);
        })
        .catch(error => {
          dispatchFeedback(
            openSnackbar(
              SnackbarStatus.Error,
              'Connecting to Facebook failed, please try again.'
            )
          );
        });
    }
  }, []);

  return (
    <Grid
      container
      justifyContent='center'
      classes={{ root: classes.container }}
    >
      <Grid item>
        <Paper elevation={6} classes={{ root: classes.paper }}>
          <Grid
            container
            direction='column'
            justifyContent='space-between'
            alignItems='center'
            classes={{ root: classes.inner }}
          >
            {steps.map((Step, i) =>
              selectedStep === i ? (
                <Step.component
                  key={Step.label}
                  setSelectedStep={setSelectedStep}
                  user={user}
                  dispatchUser={dispatchUser}
                  feedback={feedback}
                  dispatchFeedback={dispatchFeedback}
                  steps={steps}
                />
              ) : null
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AuthPortal;
