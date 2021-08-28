import React, { useState } from 'react';
import { Button, Typography, Grid, makeStyles } from '@material-ui/core';
import Slots from './Slots';
import { PaymentMethod, User } from '../../interfaces/user';

import cardIcon from '../../images/card.svg';

const useStyles = makeStyles(theme => ({
  paymentsContainer: {
    borderLeft: `4px solid ${theme.palette.common.white}`,
    position: 'relative',
  },
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
  slotsContainer: {
    position: 'absolute',
    bottom: 0,
  },
}));

interface PaymentsProps {
  user: User;
  edit: boolean;
}

const Payments: React.FC<PaymentsProps> = ({ user }) => {
  const [slot, setSlot] = useState<number>(0);
  const classes = useStyles();

  const card: PaymentMethod = user.paymentMethods[slot];

  return (
    <Grid
      item
      container
      direction='column'
      xs={6}
      justifyContent='center'
      alignItems='center'
      classes={{ root: classes.paymentsContainer }}
    >
      <Grid item>
        <img src={cardIcon} alt='payment settings' className={classes.icon} />
      </Grid>
      <Grid item container justifyContent='center'>
        <Grid item>
          <Typography variant='h3' classes={{ root: classes.number }}>
            {card.last4
              ? `${card.brand.toUpperCase()} **** **** **** ${card.last4}`
              : 'Add a new card during checkout'}
          </Typography>
        </Grid>
        {card.last4 && (
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
      <Grid item container classes={{ root: classes.slotsContainer }}>
        <Slots slot={slot} setSlot={setSlot} />
      </Grid>
    </Grid>
  );
};

export default Payments;
