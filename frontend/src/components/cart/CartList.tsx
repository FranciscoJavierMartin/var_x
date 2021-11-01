import React, { useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { CartContext } from '../../contexts';
import CartListItem from './CartListItem';
import { useIsClient } from '../../hooks';

const useStyles = makeStyles(theme => ({}));

interface CartItemListProps {}

const CartList: React.FC<CartItemListProps> = ({}) => {
  const { cart } = useContext(CartContext);
  const classes = useStyles();
  const { isClient, key } = useIsClient();

  return (
    <Grid key={key} item container direction='column' lg={6}>
      {!isClient
        ? null
        : cart.cart.map(item => (
            <CartListItem item={item} key={item.variant.id} />
          ))}
    </Grid>
  );
};

export default CartList;
