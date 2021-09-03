import React from 'react';
import { Button, Typography, Grid, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles<
  Theme,
  { selectedStep: number; finalStep: number }
>(theme => ({
  navbar: {
    backgroundColor: theme.palette.secondary.main,
    width: '40rem',
    height: '5rem',
  },
  back: {
    visibility: ({ selectedStep, finalStep }) =>
      selectedStep === 0 || selectedStep === finalStep ? 'hidden' : 'visible',
  },
  forward: {
    visibility: ({ selectedStep, finalStep }) =>
      selectedStep === finalStep - 1 ? 'hidden' : 'visible',
  },
}));

interface CheckoutNavigationProps {
  steps: { title: string }[];
  selectedStep: number;
  setSelectedStep: React.Dispatch<React.SetStateAction<number>>;
}

const CheckoutNavigation: React.FC<CheckoutNavigationProps> = ({
  steps,
  selectedStep,
  setSelectedStep,
}) => {
  const classes = useStyles({ finalStep: steps.length - 1, selectedStep });

  return (
    <Grid
      item
      container
      justifyContent='center'
      alignItems='center'
      classes={{ root: classes.navbar }}
    >
      <Grid item classes={{ root: classes.back }}>
        <Button onClick={() => setSelectedStep(prevState => prevState - 1)}>
          <Typography variant='h5'>{'<'}</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Typography variant='h5'>
          {steps[selectedStep].title.toUpperCase()}
        </Typography>
      </Grid>
      <Grid item classes={{ root: classes.forward }}>
        <Button onClick={() => setSelectedStep(prevState => prevState + 1)}>
          <Typography variant='h5'>{'>'}</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default CheckoutNavigation;
