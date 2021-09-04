import React from 'react';
import { Grid, Button, Typography, makeStyles } from '@material-ui/core';

import shippingIcon from '../../images/shipping.svg';

const useStyles = makeStyles(theme => ({
  button: {},
  label: {},
  price: {},
}));

interface ShippingProps {
  shippingOptions: { label: string; price: number }[];
  selectedShipping: any;
  setSelectedShipping: React.Dispatch<React.SetStateAction<any>>;
}

const Shipping: React.FC<ShippingProps> = ({
  shippingOptions,
  selectedShipping,
  setSelectedShipping,
}) => {
  const classes = useStyles();

  return (
    <Grid item container direction='column' alignItems='center'>
      <Grid item>
        <img src={shippingIcon} alt='shipping' />
      </Grid>
      <Grid item container>
        {shippingOptions.map(option => (
          <Grid item key={option.label}>
            <Button classes={{ root: classes.button }}>
              <Grid container direction='column'>
                <Grid item>
                  <Typography variant='h5' classes={{ root: classes.label }}>
                    {option.label}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body1' classes={{ root: classes.price }}>
                    {`$${option.price.toFixed(2)}`}
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Shipping;
