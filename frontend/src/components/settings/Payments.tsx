import React from 'react';
import {
  Button,
  Typography,
  Grid,
  FormControlLabel,
  Switch,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core';
import {
  CardElement,
  useStripe,
  useElements,
  StripeCardElementChangeEvent,
} from '@stripe/react-stripe-js';
import Slots from './Slots';
import { PaymentMethod, User } from '../../interfaces/user';

import cardIcon from '../../images/card.svg';

const useStyles = makeStyles<Theme, { isCheckout?: boolean }>(theme => ({
  paymentsContainer: {
    borderLeft: ({ isCheckout }) =>
      isCheckout ? 0 : `4px solid ${theme.palette.common.white}`,
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      height: '30rem',
      borderLeft: 0,
    },
  },
  icon: {
    marginBottom: '3rem',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1rem',
    },
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
  switchWrapper: {
    marginRight: 4,
  },
  switchLabel: {
    color: theme.palette.common.white,
    fontWeight: 600,
  },
  form: {
    width: '75%',
    height: '2rem',
    borderBottom: `2px solid ${theme.palette.common.white}`,
    marginTop: '-1rem',
  },
}));

interface PaymentsProps {
  user: User;
  slot: number;
  setSlot: React.Dispatch<React.SetStateAction<number>>;
  isCheckout?: boolean;
  saveCard: boolean;
  setSaveCard: React.Dispatch<React.SetStateAction<boolean>>;
  setCardError: React.Dispatch<React.SetStateAction<boolean>>;
}

const Payments: React.FC<PaymentsProps> = ({
  user,
  slot,
  setSlot,
  isCheckout,
  saveCard,
  setSaveCard,
  setCardError,
}) => {
  const classes = useStyles({ isCheckout });
  const theme = useTheme();
  const stripe = useStripe();
  const elements = useElements();

  const card: PaymentMethod =
    user.username === 'Guest'
      ? { last4: '', brand: '' }
      : user.paymentMethods[slot];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
    }
  };

  const handleCardChange = async (event: StripeCardElementChangeEvent) => {
    if (event.complete) {
      setCardError(false);
    } else{
      setCardError(true);
    }
  };

  const cardWrapper = (
    <form onSubmit={handleSubmit} className={classes.form}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '20px',
              color: theme.palette.common.white,
              iconColor: theme.palette.common.white,
              '::placeholder': {
                color: theme.palette.common.white,
              },
            },
          },
        }}
        onChange={handleCardChange}
      />
    </form>
  );

  return (
    <Grid
      item
      container
      direction='column'
      lg={isCheckout ? 12 : 6}
      xs={12}
      justifyContent='center'
      alignItems='center'
      classes={{ root: classes.paymentsContainer }}
    >
      <Grid item>
        <img src={cardIcon} alt='payment settings' className={classes.icon} />
      </Grid>
      <Grid item container justifyContent='center'>
        {isCheckout && !card.last4 ? cardWrapper : null}
        <Grid item>
          <Typography
            align='center'
            variant='h3'
            classes={{ root: classes.number }}
          >
            {card.last4
              ? `${card.brand.toUpperCase()} **** **** **** ${card.last4}`
              : isCheckout
              ? null
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
      <Grid
        item
        container
        justifyContent='space-between'
        classes={{ root: classes.slotsContainer }}
      >
        <Slots slot={slot} setSlot={setSlot} noLabel />
        {isCheckout && (
          <Grid item>
            <FormControlLabel
              label='Save card for future use'
              labelPlacement='start'
              control={
                <Switch
                  checked={saveCard}
                  onChange={() => setSaveCard(prevState => !prevState)}
                  color='secondary'
                />
              }
              classes={{
                root: classes.switchWrapper,
                label: classes.switchLabel,
              }}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Payments;
