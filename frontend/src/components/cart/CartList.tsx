import React, { useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { CartContext } from '../../contexts';
import CartListItem from './CartListItem';

const useStyles = makeStyles(theme => ({}));

interface CartItemListProps {}

const CartList: React.FC<CartItemListProps> = ({}) => {
  const { cart } = useContext(CartContext);
  const classes = useStyles();

  return (
    <Grid item container direction='column' xs={6}>
      {cart.cart.map(item => ( 
        <CartListItem item={item} key={item.variant.id} />
      ))}
    </Grid>
  );
};

export default CartList;
