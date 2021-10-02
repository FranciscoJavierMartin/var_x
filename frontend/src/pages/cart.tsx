import React, { useContext } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import Layout from '../components/ui/Layout';
import CartList from '../components/cart/CartList';
import CheckoutPortal from '../components/cart/CheckoutPortal';
import { UserContext } from '../contexts';

const useStyles = makeStyles(theme => ({
  cartContainer: {
    minHeight: '70vh',
  },
  name: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '3rem',
    },
  },
}));

interface CartProps {}

const Cart: React.FC<CartProps> = ({}) => {
  const { user } = useContext(UserContext);
  const classes = useStyles();

  return (
    <Layout>
      <Grid
        container
        direction='column'
        alignItems='center'
        classes={{ root: classes.cartContainer }}
      >
        <Grid item>
          <Typography
            align='center'
            variant='h1'
            classes={{ root: classes.name }}
          >
            {user.username}'s cart
          </Typography>
        </Grid>
        <Grid item container>
          <CartList />
          <CheckoutPortal />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Cart;
