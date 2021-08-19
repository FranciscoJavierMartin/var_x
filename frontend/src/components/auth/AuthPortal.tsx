import React, { useState, useContext } from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import Login from './Login';
import SignUp from './SignUp';
import Complete from './Complete';
import { UserContext } from '../../contexts';
import {
  COMPLETE_LABEL,
  LOGIN_LABEL,
  SIGN_UP_LABEL,
} from '../../constants/authPortalLabels';

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
  ];

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
