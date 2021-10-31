import React, { useState, useContext } from 'react';
import {
  Grid,
  Dialog,
  Button,
  IconButton,
  Typography,
  makeStyles,
  Theme,
  useMediaQuery,
} from '@material-ui/core';
import clsx from 'clsx';
import QtyButton from '../shared/QtyButton';
import { CartContext, FeedbackContext, UserContext } from '../../contexts';
import { addToCart, toggleSubcription } from '../../contexts/cart/actions';
import { openSnackbar, SnackbarStatus } from '../../contexts/feedback/actions';

import SubscriptionIcon from '../../images/SubscriptionIcon';
import { Stock } from '../../interfaces/stock';
import { Variant } from '../../interfaces/product-details';
import SelectFrequency from '../shared/SelectFrequency';
import { CartItem } from '../../interfaces/cart';

const useStyles = makeStyles<Theme, { size?: number; noPadding?: boolean }>(
  theme => ({
    iconButton: {
      padding: ({ noPadding }) => (noPadding ? 0 : undefined),
    },
    iconWrapper: {
      height: ({ size }) => `${size || 2}rem`,
      width: ({ size }) => `${size || 2}rem`,
    },
    row: {
      height: '4rem',
      padding: '0 0.5rem',
      [theme.breakpoints.down('xs')]: {
        height: 'auto',
      },
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
      [theme.breakpoints.down('xs')]: {
        height: 'auto',
      },
    },
    cartText: {
      color: theme.palette.common.white,
      fontSize: '4rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '3.25rem',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '2rem',
      },
    },
    buttonWrapper: {
      width: '100%',
    },
    dialog: {
      borderRadius: 0,
      backgroundColor: theme.palette.secondary.main,
    },
  })
);

interface SubscriptionProps {
  size?: number;
  name: string;
  selectedVariant: number;
  stock: Stock;
  variant: Variant;
  noPadding?: boolean;
  color: string;
  isCart?: CartItem;
  cartFrequency?: string;
}

const Subscription: React.FC<SubscriptionProps> = ({
  size,
  stock,
  selectedVariant,
  variant,
  name,
  noPadding,
  color,
  isCart,
  cartFrequency,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [qty, setQty] = useState<number>(1);
  const [frequency, setFrequency] = useState<string>('Month');
  const { dispatchCart } = useContext(CartContext);
  const { dispatchFeedback } = useContext(FeedbackContext);
  const { user } = useContext(UserContext);
  const classes = useStyles({ size, noPadding });
  const matchesXS = useMediaQuery<Theme>(theme => theme.breakpoints.down('xs'));

  const handleCart = () => {
    dispatchCart(
      addToCart(variant, qty, name, stock![selectedVariant].qty, frequency)
    );
    setIsOpen(false);
    dispatchFeedback(
      openSnackbar(SnackbarStatus.Success, 'Subscription added to cart')
    );
  };

  const handleOpen = () => {
    if (isCart) {
      dispatchCart(toggleSubcription(isCart.variant, cartFrequency!));
    } else if (user.username === 'Guest') {
      dispatchFeedback(
        openSnackbar(
          SnackbarStatus.Error,
          'You must be logged in to create a subscription'
        )
      );
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen} classes={{ root: classes.iconButton }}>
        <span className={classes.iconWrapper}>
          <SubscriptionIcon color={color} />
        </span>
      </IconButton>
      <Dialog
        fullWidth
        fullScreen={matchesXS}
        maxWidth='md'
        open={isOpen}
        onClose={() => setIsOpen(false)}
        classes={{ paper: classes.dialog }}
      >
        <Grid container direction='column' alignItems='center'>
          <Grid
            item
            container
            justify='space-between'
            alignItems='center'
            classes={{ root: clsx(classes.row, classes.dark) }}
          >
            <Grid item>
              <Typography variant='h4'>Quantity</Typography>
            </Grid>
            <Grid item>
              <QtyButton
                stock={stock}
                selectedVariant={selectedVariant}
                white
                hideCartButton
                round
                override={{ value: qty, setValue: setQty }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction='column'>
          <Grid
            item
            container
            alignItems={matchesXS ? 'flex-start' : 'center'}
            justify='space-between'
            direction={matchesXS ? 'column' : 'row'}
            classes={{ root: clsx(classes.row, classes.light) }}
          >
            <Grid item>
              <Typography variant='h4'>Delivery every</Typography>
            </Grid>
            <Grid item>
              <SelectFrequency value={frequency} setValue={setFrequency} />
            </Grid>
          </Grid>
          <Grid item classes={{ root: classes.buttonWrapper }}>
            <Button
              variant='contained'
              color='secondary'
              classes={{ root: classes.cartButton }}
              onClick={handleCart}
              disabled={qty === 0}
            >
              <Typography variant='h1' classes={{ root: classes.cartText }}>
                Add subscription to cart
              </Typography>
            </Button>
          </Grid>
          {matchesXS && (
            <Grid item>
              <Button onClick={() => setIsOpen(false)}>
                <Typography variant='body2'>Cancel</Typography>
              </Button>
            </Grid>
          )}
        </Grid>
      </Dialog>
    </>
  );
};

export default Subscription;
