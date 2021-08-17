import React from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({}));

interface LoginProps {
  setSelectedStep: React.Dispatch<React.SetStateAction<number>>;
  steps: { component: any; label: string }[];
}

const Login: React.FC<LoginProps> = ({ setSelectedStep }) => {
  const classes = useStyles();

  return (
    <Grid>
      Login
      <Button onClick={() => setSelectedStep(1)}>Go to Sign Up</Button>
    </Grid>
  );
};

export default Login;
