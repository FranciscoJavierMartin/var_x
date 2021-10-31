import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Typography,
  Grid,
  FormControlLabel,
  Switch,
  CircularProgress,
  makeStyles,
  Theme,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import {
  CardElement,
  useStripe,
  useElements,
  StripeCardElementChangeEvent,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import clsx from 'clsx';
import Slots from './Slots';
import { PaymentMethod, User } from '../../interfaces/user';
import { FeedbackContext, UserContext } from '../../contexts';
import { openSnackbar, SnackbarStatus } from '../../contexts/feedback/actions';
import { setUser } from '../../contexts/user/actions';

import cardIcon from '../../images/card.svg';

const useStyles = makeStyles<
  Theme,
  { isCheckout?: boolean; selectedStep?: number; stepNumber?: number }
>(theme => ({
  paymentsContainer: {
    height: '100%',
    display: ({ isCheckout, selectedStep, stepNumber }) =>
      isCheckout && selectedStep !== stepNumber ? 'none' : 'flex',
    borderLeft: ({ isCheckout }) =>
      isCheckout ? 0 : `4px solid ${theme.palette.common.white}`,
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      height: ({ isCheckout }) => (isCheckout ? '100%' : '30rem'),
      borderLeft: 0,
    },
  },
  icon: {
    marginBottom: '3rem',
    [theme.breakpoints.down('xs')]: {
      marginBottom: ({ isCheckout }) => (isCheckout ? '3rem' : '1rem'),
    },
  },
  number: {
    color: theme.palette.common.white,
    marginBottom: '5rem',
    [theme.breakpoints.down('xs')]: {
      marginBottom: ({ isCheckout }) => (isCheckout ? '1rem' : undefined),
      fontSize: ({ isCheckout }) => (isCheckout ? '1.5rem' : undefined),
    },
  },
  removeCardButton: {
    backgroundColor: theme.palette.common.white,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: '2rem',
    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: ({ isCheckout }) => (isCheckout ? 0 : undefined),
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
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.25rem',
    },
  },
  switchItem: {
    width: '100%',
  },
  numberWrapper: {
    marginBottom: '6rem',
  },
  form: {
    width: '75%',
    height: '2rem',
    borderBottom: `2px solid ${theme.palette.common.white}`,
    marginTop: '-1rem',
    [theme.breakpoints.down('xs')]: {
      width: '85%',
    },
  },
  spinner: {
    marginLeft: '3rem',
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
  stepNumber?: number;
  selectedStep?: number;
  setCard: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

const Payments: React.FC<PaymentsProps> = ({
  user,
  slot,
  setSlot,
  isCheckout,
  saveCard,
  setSaveCard,
  setCardError,
  stepNumber,
  selectedStep,
  setCard,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const classes = useStyles({ isCheckout, stepNumber, selectedStep });
  const matchesXS = useMediaQuery<Theme>(theme => theme.breakpoints.down('xs'));
  const theme = useTheme();
  const stripe = useStripe();
  const elements = useElements();

  const { dispatchFeedback } = useContext(FeedbackContext);
  const { dispatchUser } = useContext(UserContext);

  const card: PaymentMethod =
    user.username === 'Guest'
      ? { last4: '', brand: '' }
      : user.paymentMethods[slot];

  const removeCard = () => {
    setIsLoading(true);

    axios
      .post(
        `${process.env.GATSBY_STRAPI_URL}/orders/removeCard`,
        {
          card: card.last4,
        },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      )
      .then(response => {
        setIsLoading(false);

        dispatchUser(
          setUser({ ...response.data.user, jwt: user.jwt, onboarding: true })
        );
        setCardError(true);
        setCard({ brand: '', last4: '' });
      })
      .catch(() => {
        setIsLoading(false);
        dispatchFeedback(
          openSnackbar(
            SnackbarStatus.Error,
            'There was a problem removing your card. Please try again'
          )
        );
      });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
    }
  };

  const handleCardChange = async (event: StripeCardElementChangeEvent) => {
    if (event.complete) {
      const cardElement = elements?.getElement(CardElement);
      if (cardElement) {
        const result = await stripe?.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });
        if (result) {
          const { paymentMethod, error } = result;
          setCardError(false);
          setCard({
            brand: paymentMethod!.card!.brand,
            last4: paymentMethod!.card!.last4,
          });
        }
      }
    } else {
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

  useEffect(() => {
    if (isCheckout || user.jwt) {
      if (user.paymentMethods[slot].last4) {
        setCard(user.paymentMethods[slot] as any);
        setCardError(false);
      } else {
        setCard({ brand: '', last4: '' });
        setCardError(true);
      }
    }
  }, [slot]);

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
      <Grid
        item
        container
        justifyContent='center'
        classes={{
          root: clsx({
            [classes.numberWrapper]: isCheckout && matchesXS,
          }),
        }}
      >
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
          <Grid item classes={{ root: clsx({ [classes.spinner]: isLoading }) }}>
            {isLoading ? (
              <CircularProgress color='secondary' />
            ) : (
              <Button
                onClick={removeCard}
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
            )}
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
        {isCheckout && user.username !== 'Guest' && (
          <Grid
            item
            classes={{
              root: clsx({
                [classes.switchItem]: matchesXS,
              }),
            }}
          >
            <FormControlLabel
              label='Save card for future use'
              labelPlacement='start'
              control={
                <Switch
                  disabled={!!user.paymentMethods[slot].last4}
                  checked={user.paymentMethods[slot].last4 ? true : saveCard}
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
