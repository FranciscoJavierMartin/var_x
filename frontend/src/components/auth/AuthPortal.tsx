import React, { useState } from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import Login from './Login';
import SignUp from './SignUp';
import { useEffect } from 'react';

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
}));

interface AuthPortalProps {}

const AuthPortal: React.FC<AuthPortalProps> = ({}) => {
  const classes = useStyles();
  const [selectedStep, setSelectedStep] = useState<number>(0);

  const steps: { component: any; label: string }[] = [
    {
      component: Login,
      label: 'Login',
    },
    {
      component: SignUp,
      label: 'Sign Up',
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
            alignItems='center'
            classes={{ root: classes.inner }}
          >
            {steps.map((Step, i) =>
              selectedStep === i ? (
                <Step.component
                  key={Step.label}
                  setSelectedStep={setSelectedStep}
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
