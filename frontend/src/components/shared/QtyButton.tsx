import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  ButtonGroup,
  Button,
  Typography,
  Badge,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core';
import clsx from 'clsx';
import { Stock } from '../../interfaces/stock';
import { CartContext } from '../../contexts';
import { addToCart, removeFromCart } from '../../contexts/cart/actions';
import { Variant } from '../../interfaces/category-products';

import Cart from '../../images/Cart';

const useStyles = makeStyles<Theme, { isCart?: boolean }>(theme => ({
  mainGroup: {
    height: '3rem',
  },
  qtyText: {
    color: ({ isCart }) =>
      isCart ? theme.palette.secondary.main : theme.palette.common.white,
  },
  editButtons: {
    height: '1.525rem',
    borderRadius: 0,
    backgroundColor: ({ isCart }) =>
      isCart ? theme.palette.common.white : theme.palette.secondary.main,
    borderLeft: ({ isCart }) =>
      `2px solid ${
        isCart ? theme.palette.secondary.main : theme.palette.common.white
      }`,
    borderRight: `2px solid ${theme.palette.common.white}`,
    borderBottom: 'none',
    borderTop: 'none',
  },
  endButtons: {
    borderRadius: 50,
    backgroundColor: ({ isCart }) =>
      isCart ? theme.palette.common.white : theme.palette.secondary.main,
    border: 'none',
  },
  cartButton: {
    marginLeft: '0 !important',
    transition: 'background-color 1s ease',
  },
  minusButton: {
    borderTop: ({ isCart }) =>
      `2px solid ${
        isCart ? theme.palette.secondary.main : theme.palette.common.white
      }`,
  },
  minus: {
    marginTop: '-0.25rem',
  },
  qtyButton: {
    '&:hover': {
      backgroundColor: ({ isCart }) =>
        isCart ? theme.palette.common.white : theme.palette.secondary.main,
    },
  },
  badge: {
    color: theme.palette.common.white,
    fontSize: '1.5rem',
    backgroundColor: theme.palette.secondary.main,
    padding: 0,
  },
  success: {
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.main,
    },
  },
}));

interface QtyButtonProps {
  stock: Stock;
  selectedVariant: number;
  name: string;
  variants: Variant[];
  isCart?: boolean;
}

const QtyButton: React.FC<QtyButtonProps> = ({
  variants,
  stock,
  selectedVariant,
  name,
  isCart,
}) => {
  const { cart, dispatchCart } = useContext(CartContext);
  const [qty, setQty] = useState<number>(() =>
    isCart
      ? cart.cart.find(item => item.variant === variants[selectedVariant])
          ?.qty || 1
      : 1
  );
  const [success, setSuccess] = useState<boolean>(false);
  const classes = useStyles({ isCart });
  const theme = useTheme();

  const handleChange = (direction: 'increment' | 'decrement') => {
    if (
      stock &&
      !(qty === stock[selectedVariant].qty && direction === 'increment') &&
      !(qty === 1 && direction === 'decrement')
    ) {
      setQty(prevState =>
        direction === 'increment' ? prevState + 1 : prevState - 1
      );

      if (isCart) {
        if (direction === 'increment') {
          dispatchCart(
            addToCart(
              { ...variants[selectedVariant], style: '' },
              1,
              name,
              stock[0].qty
            )
          );
        } else if (direction === 'decrement') {
          dispatchCart(
            removeFromCart({ ...variants[selectedVariant], style: '' }, 1)
          );
        }
      }
    }
  };

  const handleCart = (): void => {
    setSuccess(true);
    dispatchCart(
      addToCart(
        variants[selectedVariant] as any,
        qty,
        name,
        stock![selectedVariant].qty
      )
    );
  };

  useEffect(() => {
    if (stock && qty > stock[selectedVariant].qty) {
      setQty(stock[selectedVariant].qty);
    }
  }, [stock, selectedVariant]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (success) {
      timer = setTimeout(() => {
        setSuccess(false);
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [success]);

  return (
    <Grid item>
      <ButtonGroup classes={{ root: classes.mainGroup }}>
        <Button classes={{ root: clsx(classes.endButtons, classes.qtyButton) }}>
          <Typography variant='h3' classes={{ root: classes.qtyText }}>
            {qty}
          </Typography>
        </Button>
        <ButtonGroup orientation='vertical'>
          <Button
            onClick={() => handleChange('increment')}
            classes={{ root: classes.editButtons }}
          >
            <Typography variant='h3' classes={{ root: classes.qtyText }}>
              +
            </Typography>
          </Button>
          <Button
            onClick={() => handleChange('decrement')}
            classes={{ root: clsx(classes.editButtons, classes.minusButton) }}
          >
            <Typography
              variant='h3'
              classes={{ root: clsx(classes.qtyText, classes.minus) }}
            >
              -
            </Typography>
          </Button>
        </ButtonGroup>
        {isCart ? null : (
          <Button
            onClick={handleCart}
            classes={{
              root: clsx(classes.endButtons, classes.cartButton, {
                [classes.success]: success,
              }),
            }}
          >
            {success ? (
              <Typography variant='h3' classes={{ root: classes.qtyText }}>
                ✓
              </Typography>
            ) : (
              <Badge
                overlap='circular'
                badgeContent='+'
                classes={{ badge: classes.badge }}
              >
                <Cart color={theme.palette.common.white} />
              </Badge>
            )}
          </Button>
        )}
      </ButtonGroup>
    </Grid>
  );
};

export default QtyButton;
