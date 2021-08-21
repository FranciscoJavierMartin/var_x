import React, { useState, useEffect, useContext } from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import Login from './Login';
import SignUp from './SignUp';
import Complete from './Complete';
import Reset from './Reset';
import { UserContext, FeedbackContext } from '../../contexts';
import {
  COMPLETE_LABEL,
  LOGIN_LABEL,
  RESET_LABEL,
  SIGN_UP_LABEL,
} from '../../constants/authPortalLabels';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: '8rem',
    [theme.breakpoints.down('md')]: {
      marginTop: '5rem',
    },
  },
  paper: {
    border: `2rem solid ${theme.palette.secondary.main}`,
    width: '50rem',
    height: '40rem',
    borderRadius: 0,
    [theme.breakpoints.down('md')]: {
      width: '30rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100vw - 2rem)',
      borderWidth: '1rem',
    },
  },
  inner: {
    height: '40rem',
    width: '100%',
    border: `2rem solid ${theme.palette.primary.main}`,
    [theme.breakpoints.down('xs')]: {
      borderWidth: '1rem',
    },
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

interface AuthPortalProps {}

const AuthPortal: React.FC<AuthPortalProps> = ({}) => {
  const classes = useStyles();
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const { user, dispatchUser } = useContext(UserContext);
  const { feedback, dispatchFeedback } = useContext(FeedbackContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (code) {
      const resetStepIndex = steps.findIndex(
        step => step.label === RESET_LABEL
      );
      setSelectedStep(resetStepIndex);
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
