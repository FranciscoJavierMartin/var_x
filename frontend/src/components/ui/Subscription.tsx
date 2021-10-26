import React, { useState } from 'react';
import {
  Grid,
  Dialog,
  Chip,
  Button,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import QtyButton from '../shared/QtyButton';
import { CartContext } from '../../contexts';

import SubscriptionIcon from '../../images/SubscriptionIcon';

const useStyles = makeStyles<Theme, { size?: number }>(theme => ({
  iconButton: {
    padding: 0,
  },
  iconWrapper: {
    height: ({ size }) => `${size || 2}rem`,
    width: ({ size }) => `${size || 2}rem`,
  },
  row: {
    height: '4rem',
  },
  dark: {
    backgroundColor: theme.palette.primary.main,
  },
  light: {
    backgroundColor: theme.palette.secondary.main,
  },
  cartButton: {
    height: '8rem',
    borderRadius: 0,
    width: '100%',
  },
  cartText: {
    color: theme.palette.common.white,
    fontSize: '4rem',
  },
  dialog: {
    borderRadius: 0,
  },
}));

interface SubscriptionProps {
  size?: number;
}

const Subscription: React.FC<SubscriptionProps> = ({ size }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const classes = useStyles({ size });

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        classes={{ root: classes.iconButton }}
      >
        <span className={classes.iconWrapper}>
          <SubscriptionIcon />
        </span>
      </IconButton>
      <Dialog
        fullWidth
        maxWidth='md'
        open={isOpen}
        onClose={() => setIsOpen(false)}
        classes={{ paper: classes.dialog }}
      >
        <Grid container direction='column'>
          <Grid
            item
            container
            justify='space-between'
            classes={{ root: clsx(classes.row, classes.dark) }}
          >
            <Grid item>
              <Typography variant='h4'>Quantity</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction='column'>
          <Grid
            item
            container
            justify='space-between'
            classes={{ root: clsx(classes.row, classes.light) }}
          >
            <Grid item>
              <Typography variant='h4'>Delivery every</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='secondary'
              classes={{ root: classes.cartButton }}
            >
              <Typography variant='h1' classes={{ root: classes.cartText }}>
                Add subscription to cart
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default Subscription;
