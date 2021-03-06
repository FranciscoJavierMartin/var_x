import React, { useState, useContext, useEffect } from 'react';
import { Grid, makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutNavigation from './CheckoutNavigation';
import Details from '../settings/Details';
import Location from '../settings/Location';
import Shipping from './Shipping';
import Payments from '../settings/Payments';
import Confirmation from './Confirmation';
import ThankYou from './ThankYou';
import BillingConfirmation from './BillingConfirmation';
import { CartContext, UserContext } from '../../contexts';
import validate from '../../utils/validate';
import { CartStep } from '../../interfaces/cart-steps';
import { Order } from '../../interfaces/order';

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('md')]: {
      marginBottom: '5rem',
    },
  },
  stepContainer: {
    width: '40rem',
    height: '25rem',
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  '@global': {
    '.MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before':
      {
        borderBottom: `2px solid ${theme.palette.common.white}`,
      },
    '.MuiInput-underline:after': {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
}));

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PK!);
interface CheckoutPortalProps {}

const CheckoutPortal: React.FC<CheckoutPortalProps> = ({}) => {
  const { cart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const hasSubcriptionCart: boolean = cart.cart.some(item => item.subscription);
  const hasSubcriptionActive: boolean =
    !!user.subscriptions && user.subscriptions?.length > 0;
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const [detailValues, setDetailValues] = useState<{ [key: string]: string }>({
    name: '',
    email: '',
    phone: '',
  });
  const [billingDetails, setBillingDetails] = useState<{
    [key: string]: string;
  }>({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [detailSlot, setDetailSlot] = useState<number>(0);
  const [detailForBilling, setDetailForBilling] = useState<boolean | number>(
    false
  );
  const [locationValues, setLocationValues] = useState<{
    [key: string]: string;
  }>({
    street: '',
    zip: '',
    city: '',
    state: '',
  });
  const [billingLocation, setBillingLocation] = useState<{
    [key: string]: string;
  }>({
    street: '',
    zip: '',
    city: '',
    state: '',
  });
  const [locationSlot, setLocationSlot] = useState<number>(0);
  const [locationForBilling, setLocationForBilling] = useState<
    boolean | number
  >(false);
  const [selectedShipping, setSelectedShipping] = useState<string>('');
  const [cardSlot, setCardSlot] = useState<number>(0);
  const [cardError, setCardError] = useState<boolean>(true);
  const [saveCard, setSaveCard] = useState<boolean>(hasSubcriptionActive);
  const [card, setCard] = useState<{ [key: string]: string }>({
    brand: '',
    last4: '',
  });
  const [order, setOrder] = useState<Order | null>(null);

  const classes = useStyles();
  const matchesMD = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));

  const shippingOptions = [
    { label: 'Free shipping', price: 0 },
    { label: '2 day shipping', price: 9.99 },
    { label: 'Overnight shipping', price: 29.99 },
  ];

  const errorHelper = (
    values: { [key: string]: string },
    forBilling?: number | boolean,
    billingValues?: { [key: string]: string },
    slot?: number
  ): boolean => {
    let res: boolean;
    const isValid = validate(values);
    // If we have one slot marked as billing
    if (forBilling !== false && forBilling !== undefined) {
      // ... validate billing values
      const billingValid = validate(billingValues!);

      // If we are currently on the same slot as marked for billing, ie billing and shipping are the same ...
      if (forBilling === slot) {
        // ... then we just need to validate the one set of values because the are the same
        res = Object.keys(isValid).some(value => !isValid[value]);
      } else {
        // Otherwise, if we are currently on a different slot than the slot marked for billing, ie billing and shipping are different, then we need to validate both the billing values, and the shipping values
        res =
          Object.values(billingValid).some(value => !value) ||
          Object.values(isValid).some(value => !value);
      }
    } else {
      // If no slots were marked for billing, just validate current slot
      res = Object.keys(isValid).some(value => !isValid[value]);
    }

    return res;
  };

  let steps: CartStep[] = [
    {
      title: 'Contact Info',
      component: (
        <Details
          user={user}
          values={detailValues}
          setValues={setDetailValues}
          slot={detailSlot}
          setSlot={setDetailSlot}
          errors={errors}
          setErrors={setErrors}
          billing={detailForBilling}
          setBilling={setDetailForBilling}
          billingValues={billingDetails}
          setBillingValues={setBillingDetails}
          isCheckout
          edit={false}
          setChangesMade={() => {}}
          selectedStep={selectedStep}
          stepNumber={0}
        />
      ),
      error: errorHelper(
        detailValues,
        detailForBilling,
        billingDetails,
        detailSlot
      ),
      hasActions: true,
    },
    {
      title: 'Billing Info',
      component: (
        <Details
          values={billingDetails}
          setValues={setBillingDetails}
          errors={errors}
          setErrors={setErrors}
          isCheckout
          noSlots
          user={user}
          edit={false}
          setChangesMade={() => {}}
          setSlot={() => {}}
          slot={0}
          billing={false}
          setBilling={() => {}}
          selectedStep={selectedStep}
          stepNumber={0}
        />
      ),
      error: errorHelper(billingDetails),
    },
    {
      title: 'Address',
      component: (
        <Location
          user={user}
          values={locationValues}
          setValues={setLocationValues}
          errors={errors}
          setErrors={setErrors}
          slot={locationSlot}
          setSlot={setLocationSlot}
          billing={locationForBilling}
          setBilling={setLocationForBilling}
          billingValues={billingLocation}
          setBillingValues={setBillingLocation}
          isCheckout
          edit={false}
          setChangesMade={() => {}}
          selectedStep={selectedStep}
          stepNumber={0}
        />
      ),
      error: errorHelper(
        locationValues,
        locationForBilling,
        billingLocation,
        locationSlot
      ),
      hasActions: true,
    },
    {
      title: 'Billing Address',
      component: (
        <Location
          values={billingLocation}
          setValues={setBillingLocation}
          errors={errors}
          setErrors={setErrors}
          isCheckout
          noSlots
          user={user}
          edit={false}
          setChangesMade={() => {}}
          setSlot={() => {}}
          slot={0}
          billing={false}
          setBilling={() => {}}
          selectedStep={selectedStep}
          stepNumber={0}
        />
      ),
      error: errorHelper(billingLocation),
    },
    {
      title: 'Shipping',
      component: (
        <Shipping
          shippingOptions={shippingOptions}
          selectedShipping={selectedShipping}
          setSelectedShipping={setSelectedShipping}
          selectedStep={selectedStep}
          stepNumber={0}
        />
      ),
      error: !selectedShipping,
    },
    {
      title: 'Payment',
      component: (
        <Payments
          user={user}
          slot={cardSlot}
          setSlot={setCardSlot}
          saveCard={saveCard}
          setSaveCard={setSaveCard}
          setCardError={setCardError}
          isCheckout
          selectedStep={selectedStep}
          stepNumber={0}
          setCard={setCard}
          hasSubcriptionCart={hasSubcriptionCart}
          hasSubcriptionActive={hasSubcriptionActive}
        />
      ),
      error: cardError,
    },
    {
      title: 'Confirmation',
      component: (
        <Confirmation
          user={user}
          detailValues={detailValues}
          billingDetails={billingDetails}
          detailForBilling={detailForBilling}
          locationValues={locationValues}
          billingLocation={billingLocation}
          locationForBilling={locationForBilling}
          shippingOptions={shippingOptions}
          selectedShipping={selectedShipping}
          selectedStep={selectedStep}
          setSelectedStep={setSelectedStep}
          order={order}
          setOrder={setOrder}
          stepNumber={0}
          saveCard={saveCard}
          card={card}
          cardSlot={cardSlot}
        />
      ),
    },
    {
      title: `Thanks, ${user.username.split(' ')[0]}`,
      component: (
        <ThankYou
          selectedStep={selectedStep}
          order={order}
          selectedShipping={selectedShipping}
          stepNumber={0}
        />
      ),
    },
  ];

  if (detailForBilling !== false) {
    steps = steps.filter(step => step.title !== 'Billing Info');
  }

  if (locationForBilling !== false) {
    steps = steps.filter(step => step.title !== 'Billing Address');
  }

  useEffect(() => {
    setErrors({});
  }, [detailSlot, locationSlot, selectedStep]);

  return (
    <Grid
      item
      container
      direction='column'
      alignItems={matchesMD ? 'flex-start' : 'flex-end'}
      classes={{ root: classes.container }}
      lg={6}
    >
      <CheckoutNavigation
        steps={steps}
        selectedStep={selectedStep}
        setSelectedStep={setSelectedStep}
        details={detailValues}
        setDetails={setDetailValues}
        detailSlot={detailSlot}
        location={locationValues}
        setLocation={setLocationValues}
        locationSlot={locationSlot}
        setErrors={setErrors}
      />

      <Grid
        item
        container
        direction='column'
        alignItems='center'
        classes={{ root: classes.stepContainer }}
      >
        <Elements stripe={stripePromise}>
          {steps.map((step, index) =>
            React.cloneElement(step.component, {
              stepNumber: index,
              key: index,
            })
          )}
        </Elements>
      </Grid>
      {steps[selectedStep].title === 'Confirmation' && (
        <BillingConfirmation
          detailForBilling={detailForBilling}
          billingDetails={billingDetails}
          detailSlot={detailSlot}
          locationForBilling={locationForBilling}
          billingLocation={billingLocation}
          locationSlot={locationSlot}
        />
      )}
    </Grid>
  );
};

export default CheckoutPortal;
