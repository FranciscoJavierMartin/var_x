import React, { useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { CartContext } from '../../contexts';

const useStyles = makeStyles(theme => ({}));

interface CartItemsProps {}

const CartItems: React.FC<CartItemsProps> = ({}) => {
  const { cart } = useContext(CartContext);
  const classes = useStyles();

  return (
    <Grid item container direction='column' xs={6}>
      {cart.cart.map(item => (
        <div></div>
      ))}
    </Grid>
  );
};

export default CartItems;
