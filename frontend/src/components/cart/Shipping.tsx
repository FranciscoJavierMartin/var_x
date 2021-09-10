import React from 'react';
import { Grid, Button, Typography, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import shippingIcon from '../../images/shipping.svg';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
  },
  icon: {
    marginTop: '-2rem',
    marginBottom: '1rem',
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 15,
    height: '10rem',
    width: '10rem',
    [theme.breakpoints.down('xs')]: {
      height: '6rem',
      width: '6rem',
    },
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  selected: {
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },
  },
  label: {
    fontSize: '1.5rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.9rem',
    },
  },

  price: {
    color: theme.palette.common.white,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2rem',
    },
  },
  selectedText: {
    color: theme.palette.secondary.main,
  },
}));

interface ShippingProps {
  shippingOptions: { label: string; price: number }[];
  selectedShipping: string;
  setSelectedShipping: React.Dispatch<React.SetStateAction<string>>;
}

const Shipping: React.FC<ShippingProps> = ({
  shippingOptions,
  selectedShipping,
  setSelectedShipping,
}) => {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      classes={{ root: classes.container }}
    >
      <Grid item>
        <img src={shippingIcon} alt='shipping' className={classes.icon} />
      </Grid>
      <Grid item container justifyContent='space-around'>
        {shippingOptions.map(option => (
          <Grid item key={option.label}>
            <Button
              classes={{
                root: clsx(classes.button, {
                  [classes.selected]: selectedShipping === option.label,
                }),
              }}
              onClick={() => setSelectedShipping(option.label)}
            >
              <Grid container direction='column'>
                <Grid item>
                  <Typography
                    variant='h5'
                    classes={{
                      root: clsx(classes.label, {
                        [classes.selectedText]:
                          selectedShipping === option.label,
                      }),
                    }}
                  >
                    {option.label}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant='body1'
                    classes={{
                      root: clsx(classes.price, {
                        [classes.selectedText]:
                          selectedShipping === option.label,
                      }),
                    }}
                  >
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
