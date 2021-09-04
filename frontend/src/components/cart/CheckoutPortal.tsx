import React, { useState, useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import CheckoutNavigation from './CheckoutNavigation';
import { UserContext } from '../../contexts';
import Details from '../settings/Details';

const useStyles = makeStyles(theme => ({
  stepContainer: {
    width: '40rem',
    height: '25rem',
    backgroundColor: theme.palette.primary.main,
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
  const { user } = useContext(UserContext);
  const classes = useStyles();

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
    },
    {
      title: 'Shipping',
    },
    {
      title: 'Payment',
    },
    {
      title: 'Confirmation',
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
