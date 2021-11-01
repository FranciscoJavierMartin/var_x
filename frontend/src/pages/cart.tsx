import React, { useContext } from 'react';
import {
  Grid,
  Typography,
  makeStyles,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import Layout from '../components/ui/Layout';
import Seo from '../components/ui/Seo';
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
  const matchesMD = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));

  const items = <CartList />;
  const checkout = <CheckoutPortal />;

  return (
    <Layout>
      <Seo
        title='Cart'
        description='Make one-time purchases or buy a subscription for any of the amazing products at VAR-X'
      />
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
          {matchesMD ? checkout : items}
          {matchesMD ? items : checkout}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Cart;
