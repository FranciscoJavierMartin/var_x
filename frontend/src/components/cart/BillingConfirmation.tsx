import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  heading: {
    color: theme.palette.secondary.main,
    fontSize: '1.5rem',
  },
  values: {
    fontSize: '1.25rem',
  },
  wrapper: {
    margin: '1rem 2rem',
  },
}));

interface BillingConfirmationProps {
  detailForBilling: number | boolean;
  billingDetails: { [key: string]: string };
  detailSlot: number;
  locationForBilling: number | boolean;
  billingLocation: { [key: string]: string };
  locationSlot: number;
}

const BillingConfirmation: React.FC<BillingConfirmationProps> = ({
  detailForBilling,
  billingDetails: { name, email, phone },
  detailSlot,
  locationForBilling,
  billingLocation: { street, zip, city, state },
  locationSlot,
}) => {
  const classes = useStyles();

  const fields = [
    {
      title: 'Billing info',
      values: {
        name,
        email,
        phone,
      },
      hidden: detailForBilling === detailSlot,
    },
    {
      title: 'Billing address',
      values: {
        address1: street,
        address2: `${city}, ${state} ${zip}`,
      },
      hidden: locationForBilling === locationSlot,
    }
  ];

  return (
    <Grid item container justifyContent='flex-end'>
      {fields.map(field =>
        field.hidden ? null : (
          <Grid item key={field.title} classes={{ root: classes.wrapper }}>
            <Typography variant='h4' classes={{ root: classes.heading }}>
              {field.title}
            </Typography>
            <Typography variant='h3' classes={{ root: classes.values }}>
              {Object.keys(field.values).map(value => (
                <span key={value}>
                  {(field.values as any)[value]}
                  <br />
                </span>
              ))}
            </Typography>
          </Grid>
        )
      )}
    </Grid>
  );
};

export default BillingConfirmation;
