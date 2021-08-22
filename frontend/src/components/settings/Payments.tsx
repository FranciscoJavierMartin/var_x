import React from 'react';
import { Button, Typography, Grid, makeStyles } from '@material-ui/core';

import card from '../../images/card.svg';
import Slots from './Slots';

const useStyles = makeStyles(theme => ({
  icon: {
    marginBottom: '3rem',
  },
  number: {
    color: theme.palette.common.white,
    marginBottom: '5rem',
  },
  removeCardButton: {
    backgroundColor: theme.palette.common.white,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: '2rem',
    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },
  },
  removeCardButtonText: {
    fontSize: '1rem',
    fontFamily: 'Philosopher',
    fontStyle: 'italic',
    color: theme.palette.primary.main,
  },
}));

const cards = [
  {
    last4: 1234,
    brand: 'Visa',
  },
];

interface PaymentsProps {}

const Payments: React.FC<PaymentsProps> = ({}) => {
  const classes = useStyles();

  return (
    <Grid item container direction='column' xs={6} alignItems='center'>
      <Grid item>
        <img src={card} alt='payment settings' className={classes.icon} />
      </Grid>
      <Grid item container justifyContent='center'>
        <Grid item>
          <Typography variant='h3' classes={{ root: classes.number }}>
            {cards.length
              ? `${cards[0].brand.toUpperCase()} **** **** **** ${
                  cards[0].last4
                }`
              : 'Add a new card during checkout'}
          </Typography>
        </Grid>
        {cards.length && (
          <Grid item>
            <Button
              variant='contained'
              classes={{ root: classes.removeCardButton }}
            >
              <Typography
                variant='h6'
                classes={{ root: classes.removeCardButtonText }}
              >
                Remove card
              </Typography>
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid item container>
        <Slots />
      </Grid>
    </Grid>
  );
};

export default Payments;
