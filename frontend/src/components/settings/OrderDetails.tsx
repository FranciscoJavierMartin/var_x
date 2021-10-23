import React from 'react';
import {
  Button,
  Hidden,
  Grid,
  SwipeableDrawer,
  Chip,
  Typography,
  makeStyles,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import clsx from 'clsx';
import { GridRowId } from '@material-ui/data-grid';
import OrderDetailItem from './OrderDetailItem';
import { Item, Order } from '../../interfaces/order';

const useStyles = makeStyles(theme => ({
  drawer: {
    height: '100%',
    width: '30rem',
    backgroundColor: 'transparent',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  id: {
    fontSize: '2.5rem',
    fontWeight: 600,
    marginTop: '1rem',
    marginLeft: '1rem',
  },
  status: {
    marginLeft: '1rem',
  },
  prices: {
    padding: '0.5rem 1rem',
  },
  bold: {
    fontWeight: 600,
  },
  chipRoot: {
    backgroundColor: theme.palette.primary.main,
  },
  date: {
    fontWeight: 600,
    marginLeft: '1rem',
    marginBottom: '1rem',
  },
  padding: {
    padding: '1rem',
  },
  dark: {
    backgroundColor: theme.palette.secondary.main,
  },
  light: {
    backgroundColor: theme.palette.primary.main,
  },
  text: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.25rem',
    },
  },
  spacer: {
    minHeight: '10rem',
  },
}));

interface OrderDetailsProps {
  orders: Order[];
  open: GridRowId | null;
  setOpen: React.Dispatch<React.SetStateAction<GridRowId | null>>;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  orders,
  open,
  setOpen,
}) => {
  const classes = useStyles();
  const matchesXS = useMediaQuery<Theme>(theme => theme.breakpoints.down('xs'));

  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const order = orders.find(order => order.id === open);

  const prices = [
    { label: 'Subtotal', value: order?.subtotal },
    { label: 'Shipping', value: order?.shippingOption.price },
    { label: 'Tax', value: order?.tax },
    { label: 'Total', value: order?.total },
    { label: 'Payment', string: `${order?.paymentMethod.brand.toUpperCase()}` },
    { label: 'Transaction', string: order?.transaction },
  ];

  return (
    <SwipeableDrawer
      open={!!open}
      onOpen={() => null}
      onClose={() => setOpen(null)}
      anchor={matchesXS ? 'bottom' : 'right'}
      classes={{ paper: classes.drawer }}
      disableBackdropTransition={!iOS}
      disableDiscovery={!!iOS}
    >
      <Hidden smUp>
        <Grid
          item
          component={Button}
          onClick={() => setOpen(null)}
          classes={{ root: classes.spacer }}
        />
      </Hidden>
      <Grid container direction='column' classes={{ root: classes.light }}>
        <Grid item classes={{ root: classes.dark }}>
          <Typography variant='h2' classes={{ root: classes.id }}>
            Order #
            {order?.id
              .toString()
              .slice(
                order?.id.toString().length - 10,
                order?.id.toString().length
              )
              .toUpperCase()}
          </Typography>
        </Grid>
        <Grid item container classes={{ root: classes.dark }}>
          <Grid item classes={{ root: classes.status }}>
            <Chip
              label={order?.status}
              classes={{ label: classes.bold, root: classes.light }}
            />
          </Grid>

          <Grid item>
            <Typography variant='body2' classes={{ root: classes.date }}>
              {`${order?.created_at.toString().split('-')[2].split('T')[0]}/${
                order?.created_at.toString().split('-')[0]
              }`}
            </Typography>
          </Grid>
        </Grid>
        <Grid item classes={{ root: classes.padding }}>
          <Typography variant='body2' classes={{ root: classes.bold }}>
            Billing
          </Typography>
          <Typography variant='body2' classes={{ root: classes.text }}>
            {order?.billingInfo.name}
            <br />
            {order?.billingInfo.email}
            <br />
            {order?.billingInfo.phone}
            <br />
            <br />
            {order?.billingAddress.street}
            <br />
            {order?.billingAddress.city}, {order?.billingAddress.state}{' '}
            {order?.billingAddress.zip}
          </Typography>
        </Grid>
        <Grid item classes={{ root: clsx(classes.dark, classes.padding) }}>
          <Typography variant='body2' classes={{ root: classes.bold }}>
            Shipping
          </Typography>
          <Typography variant='body2' classes={{ root: classes.text }}>
            {order?.shippingInfo.name}
            <br />
            {order?.shippingInfo.email}
            <br />
            {order?.shippingInfo.phone}
            <br />
            <br />
            {order?.shippingAddress.street}
            <br />
            {order?.shippingAddress.city}, {order?.shippingAddress.state}{' '}
            {order?.shippingAddress.zip}
          </Typography>
        </Grid>
        {prices.map(price => (
          <Grid
            key={price.label}
            item
            container
            justify='space-between'
            classes={{ root: classes.prices }}
          >
            <Grid item>
              <Typography variant='body2' classes={{ root: classes.bold }}>
                {price.label}
              </Typography>
            </Grid>
            <Grid item>
              {price.string ? (
                <Typography variant='body2' classes={{ root: classes.text }}>
                  {price.string}
                </Typography>
              ) : (
                <Chip
                  label={`$${price.value?.toFixed(2)}`}
                  classes={{ label: classes.bold }}
                />
              )}
            </Grid>
          </Grid>
        ))}
        <Grid item classes={{ root: clsx(classes.dark, classes.padding) }}>
          <Typography
            variant='body2'
            gutterBottom
            classes={{ root: classes.bold }}
          >
            Items
          </Typography>
          {order?.items.map((item: Item) => (
            <OrderDetailItem key={item.variant.id} item={item} />
          ))}
        </Grid>
      </Grid>
    </SwipeableDrawer>
  );
};

export default OrderDetails;
