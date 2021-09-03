import React, { useState, useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import CheckoutNavigation from './CheckoutNavigation';
import { UserContext } from '../../contexts';

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
  const { user } = useContext(UserContext);
  const classes = useStyles();

  const steps = [
    {
      title: 'Contact info',
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
      ></Grid>
    </Grid>
  );
};

export default CheckoutPortal;
