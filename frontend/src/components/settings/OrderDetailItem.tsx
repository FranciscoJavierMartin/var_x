import React from 'react';
import { Grid, Chip, makeStyles, Typography } from '@material-ui/core';
import { Item } from '../../interfaces/order';

const useStyles = makeStyles(theme => ({
  container: {
    height: '10rem',
  },
  product: {
    height: '8rem',
    width: '8rem',
  },
  chipRoot: {
    backgroundColor: theme.palette.primary.main,
  },
  itemInfo: {
    textAlign: 'right',
  },
  subcriptionChip: {
    marginTop: '0.5rem',
  },
}));

interface OrderDetailProps {
  item: Item;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ item }) => {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      justifyContent='space-between'
      alignItems='center'
      classes={{ root: classes.container }}
    >
      <Grid item>
        <img
          src={`${process.env.GATSBY_STRAPI_URL}${item.variant.images[0].url}`}
          alt={item.name}
          className={classes.product}
        />
      </Grid>
      <Grid item classes={{ root: classes.itemInfo }}>
        <Typography variant='body2'>
          {item.name} - x{item.qty}
        </Typography>
        {item.variant.style ? (
          <Typography variant='body2'>Style: {item.variant.style}</Typography>
        ) : null}
        {item.variant.size ? (
          <Typography variant='body2'>Size: {item.variant.size}</Typography>
        ) : null}
        <Grid container direction='column'>
          <Grid item>
            <Chip
              label={`$${item.variant.price}`}
              classes={{ root: classes.chipRoot }}
            />
          </Grid>
          {item.subscription ? (
            <Grid item classes={{ root: classes.subcriptionChip }}>
              <Chip
                label={`Every ${item.subscription}`}
                classes={{ root: classes.chipRoot }}
              />
              ∆
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrderDetail;
