import React from 'react';
import { Link } from 'gatsby';
import { Button, Grid, Typography, makeStyles } from '@material-ui/core';
import { Order } from '../../interfaces/order';

import complete from '../../images/order-placed.svg';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    position: 'relative',
  },
  icon: {
    marginTop: '-3rem',
  },
  detailsButton: {
    padding: '0.25rem 0',
    textTransform: 'none',
  },
  order: {
    fontWeight: 600,
  },
  shopWrapper: {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
  },
  shopText: {
    fontSize: '2rem',
    fontWeight: 600,
    textTransform: 'none',
  },
}));

interface ThankYouProps {
  selectedShipping: string;
  order: Order;
}

const ThankYou: React.FC<ThankYouProps> = ({ selectedShipping, order }) => {
  const classes = useStyles();

  const addToDate = (days: number) => {
    const date = new Date();

    date.setDate(date.getDate() + days);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const getExpected = (): string => {
    let res: string;
    switch (selectedShipping) {
      case '2 day shipping':
        res = addToDate(2);
        break;
      case 'Overnight shipping':
        res = addToDate(1);
        break;
      case 'Free shipping':
      default:
        res = addToDate(14);
    }

    return res;
  };

  return (
    <Grid
      item
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
      classes={{ root: classes.container }}
    >
      <Grid item>
        <img src={complete} alt='order placed' className={classes.icon} />
      </Grid>
      <Grid item>
        <Typography variant='h4'>Expected by {getExpected()}</Typography>

        <Grid item container justifyContent='space-between' alignItems='center'>
          <Grid item>
            <Typography variant='body2' classes={{ root: classes.order }}>
              Order #
              {order.id
                .toString()
                .slice(
                  order.id.toString().length - 10,
                  order.id.toString().length
                )}
            </Typography>
          </Grid>
          <Grid item>
            <Button classes={{ root: classes.detailsButton }}>
              <Typography variant='body2'>Details {'>'}</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item classes={{ root: classes.shopWrapper }}>
        <Button component={Link} to='/'>
          <Typography variant='body2' classes={{ root: classes.shopText }}>
            Shop {'>'}
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default ThankYou;
