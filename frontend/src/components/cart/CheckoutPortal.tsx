import React, { useState, useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import CheckoutNavigation from './CheckoutNavigation';
import Details from '../settings/Details';
import Location from '../settings/Location';
import Shipping from './Shipping';
import Payments from '../settings/Payments';
import { UserContext } from '../../contexts';
import Confirmation from './Confirmation';

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
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [detailSlot, setDetailSlot] = useState<number>(0);
  const [detailBilling, setDetailBilling] = useState<boolean>(false);
  const [locationValues, setLocationValues] = useState<{
    [key: string]: string;
  }>({
    street: '',
    zip: '',
    city: '',
    state: '',
  });
  const [locationSlot, setLocationSlot] = useState<number>(0);
  const [locationBilling, setLocationBilling] = useState<boolean>(false);
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

  const steps = [
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
          isCheckout
          edit={false}
          setChangesMade={() => {}}
          billing={detailBilling}
          setBilling={setDetailBilling}
        />
      ),
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
          edit={false}
          setChangesMade={() => {}}
          billing={locationBilling}
          setBilling={setLocationBilling}
          isCheckout
        />
      ),
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
    },
    {
      title: 'Confirmation',
      component: <Confirmation />,
    },
    {
      title: `Thanks, ${user.username}`,
    },
  ];

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
