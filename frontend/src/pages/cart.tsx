import React, { useContext } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import Layout from '../components/ui/Layout';
import CartItems from '../components/cart/CartItems';
import CheckoutPortal from '../components/cart/CheckoutPortal';
import { UserContext } from '../contexts';

const useStyles = makeStyles(theme => ({}));

interface CartProps {}

const Cart: React.FC<CartProps> = ({}) => {
  const { user } = useContext(UserContext);
  const classes = useStyles();

  return (
    <Layout>
      <Grid container direction='column' alignItems='center'>
        <Grid item>
          <Typography variant='h1'>{user.username}'s cart</Typography>
        </Grid>
        <Grid item container>
          <CartItems />
          <CheckoutPortal />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Cart;
