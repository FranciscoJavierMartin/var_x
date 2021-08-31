import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  ButtonGroup,
  Button,
  Typography,
  Badge,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import { Stock } from '../../interfaces/stock';
import { CartContext } from '../../contexts';
import { addToCart } from '../../contexts/cart/actions';
import { Variant } from '../../interfaces/category-products';

import Cart from '../../images/Cart';

const useStyles = makeStyles(theme => ({
  mainGroup: {
    height: '3rem',
  },
  qtyText: {
    color: theme.palette.common.white,
  },
  editButtons: {
    height: '1.525rem',
    borderRadius: 0,
    backgroundColor: theme.palette.secondary.main,
    borderLeft: `2px solid ${theme.palette.common.white}`,
    borderRight: `2px solid ${theme.palette.common.white}`,
    borderBottom: 'none',
    borderTop: 'none',
  },
  endButtons: {
    borderRadius: 50,
    backgroundColor: theme.palette.secondary.main,
    border: 'none',
  },
  cartButton: {
    marginLeft: '0 !important',
    transition: 'background-color 1s ease',
  },
  minusButton: {
    borderTop: `2px solid ${theme.palette.common.white}`,
  },
  minus: {
    marginTop: '-0.25rem',
  },
  qtyButton: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
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
}

const QtyButton: React.FC<QtyButtonProps> = ({
  variants,
  stock,
  selectedVariant,
  name,
}) => {
  const [qty, setQty] = useState<number>(1);
  const [success, setSuccess] = useState<boolean>(false);
  const { cart, dispatchCart } = useContext(CartContext);
  const classes = useStyles();
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
      </ButtonGroup>
    </Grid>
  );
};

export default QtyButton;
