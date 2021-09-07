import React, { useState, useContext, useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import CheckoutNavigation from './CheckoutNavigation';
import Details from '../settings/Details';
import Location from '../settings/Location';
import Shipping from './Shipping';
import Payments from '../settings/Payments';
import Confirmation from './Confirmation';
import { UserContext } from '../../contexts';
import validate from '../../utils/validate';
import { CartStep } from '../../interfaces/cart-steps';

const useStyles = makeStyles(theme => ({
  stepContainer: {
    width: '40rem',
    height: '25rem',
    backgroundColor: theme.palette.primary.main,
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

interface CheckoutPortalProps {}

const CheckoutPortal: React.FC<CheckoutPortalProps> = ({}) => {
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
  const [billingSlot, setBillingSlot] = useState<number>(0);
  const [saveCard, setSaveCard] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const classes = useStyles();

  const shippingOptions = [
    { label: 'Free shipping', price: 0 },
    { label: '2 day shipping', price: 9.99 },
    { label: 'Overnight shipping', price: 29.99 },
  ];

  const errorHelper = (values: { [key: string]: string }): boolean => {
    const isValid = validate(values);
    return Object.keys(isValid).some(value => !isValid[value]);
  };

  let steps: CartStep[] = [
    {
      title: 'Contact info',
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
        />
      ),
      error: errorHelper(detailValues),
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
        />
      ),
      error: errorHelper(locationValues),
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
        />
      ),
      error: !selectedShipping,
    },
    {
      title: 'Payment',
      component: (
        <Payments
          user={user}
          slot={billingSlot}
          setSlot={setBillingSlot}
          saveCard={saveCard}
          setSaveCard={setSaveCard}
          isCheckout
        />
      ),
      error: false,
    },
    {
      title: 'Confirmation',
      component: (
        <Confirmation
          detailValues={detailValues}
          billingDetails={billingDetails}
          detailForBilling={detailForBilling}
          locationValues={locationValues}
          billingLocation={billingLocation}
          locationForBilling={locationForBilling}
          shippingOptions={shippingOptions}
          selectedShipping={selectedShipping}
        />
      ),
    },
    {
      title: `Thanks, ${user.username}`,
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
    <Grid item container direction='column' alignItems='flex-end' xs={6}>
      <CheckoutNavigation
        steps={steps}
        selectedStep={selectedStep}
        setSelectedStep={setSelectedStep}
      />

      <Grid
        item
        container
        direction='column'
        alignItems='center'
        classes={{ root: classes.stepContainer }}
      >
        {steps[selectedStep].component}
      </Grid>
    </Grid>
  );
};

export default CheckoutPortal;
