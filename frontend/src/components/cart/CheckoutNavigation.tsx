import React from 'react';
import {
  Button,
  IconButton,
  Typography,
  Grid,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { CartStep } from '../../interfaces/cart-steps';

import save from '../../images/save.svg';
import DeleteIcon from '../../images/DeleteIcon';

const useStyles = makeStyles<
  Theme,
  { selectedStep: number; finalStep: number }
>(theme => ({
  navbar: {
    backgroundColor: theme.palette.secondary.main,
    width: '40rem',
    height: '5rem',
    position: 'relative',
  },
  back: {
    visibility: ({ selectedStep, finalStep }) =>
      selectedStep === 0 || selectedStep === finalStep ? 'hidden' : 'visible',
  },
  forward: {
    visibility: ({ selectedStep, finalStep }) =>
      selectedStep === finalStep - 1 ? 'hidden' : 'visible',
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    height: '2.25rem',
    width: '2.25rem',
  },
  delete: {
    height: '2rem',
    width: '2rem',
  },
  actions: {
    position: 'absolute',
    right: 0,
  },
}));

interface CheckoutNavigationProps {
  steps: CartStep[];
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
        <Button
          disabled={steps[selectedStep].error}
          classes={{ disabled: classes.disabled }}
          onClick={() => setSelectedStep(prevState => prevState + 1)}
        >
          <Typography variant='h5'>{'>'}</Typography>
        </Button>
      </Grid>
      {steps[selectedStep].hasActions ? (
        <Grid item classes={{ root: classes.actions }}>
          <Grid container>
            <Grid item>
              <IconButton>
                <img src={save} alt='save' className={classes.icon} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <span className={classes.delete}>
                  <DeleteIcon />
                </span>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default CheckoutNavigation;
