import React from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({}));

interface SignUpProps {
  setSelectedStep: React.Dispatch<React.SetStateAction<number>>;
  steps: { component: any; label: string }[];
}

const SignUp: React.FC<SignUpProps> = ({ setSelectedStep }) => {
  const classes = useStyles();

  return (
    <Grid>
      Sign Up
      <Button onClick={() => setSelectedStep(0)}>Go to Sign Up</Button>
    </Grid>
  );
};

export default SignUp;
