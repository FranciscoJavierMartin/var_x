import React, { useState, useContext, useMemo } from 'react';
import {
  Button,
  Chip,
  Grid,
  Typography,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import Fields from '../shared/Fields';
import { CartContext } from '../../contexts';
import { calculateTotalPrice } from '../../utils/cart';

import confirmationIcon from '../../images/tag.svg';
import NameAdornment from '../../images/NameAdornment';
import EmailAdornment from '../../images/EmailAdornment';
import PhoneAdornment from '../../images/PhoneAdornment';
import streetAdornment from '../../images/street-adornment.svg';
import zipAdornment from '../../images/zip-adornment.svg';
import cardAdornment from '../../images/card.svg';
import promoAdornment from '../../images/promo-code.svg';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: '100%',
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameWrapper: {
    height: 22,
    width: 22,
  },
  emailWrapper: {
    height: 17,
    width: 22,
  },
  phoneWrapper: {
    height: 25.122,
    width: 25.173,
  },
  fieldWrapper: {
    marginLeft: '1.25rem',
  },
  buttonWrapper: {
    marginTop: 'auto',
  },
  chipRoot: {
    backgroundColor: theme.palette.common.white,
  },
  text: {
    fontSize: '1rem',
    color: theme.palette.common.white,
  },
  card: {
    height: 18,
    width: 25,
  },
  priceLabel: {
    fontSize: '1.5rem',
  },
  priceValue: {
    marginRight: '1rem',
  },
  darkBackground: {
    backgroundColor: theme.palette.secondary.main,
  },
  fieldRow: {
    height: '2.5rem',
  },
  centerText: {
    display: 'flex',
    alignItems: 'center',
  },
  adornmentWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    height: '7rem',
    borderRadius: 0,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  chipLabel: {
    color: theme.palette.secondary.main,
  },
}));

interface ConfirmationProps {
  detailValues: {
    [key: string]: string;
  };
  billingDetails: {
    [key: string]: string;
  };
  detailForBilling: boolean | number;
  locationValues: {
    [key: string]: string;
  };
  billingLocation: {
    [key: string]: string;
  };
  locationForBilling: boolean | number;
  shippingOptions: { label: string; price: number }[];
  selectedShipping: string;
}

const Confirmation: React.FC<ConfirmationProps> = ({
  detailValues,
  billingDetails,
  detailForBilling,
  locationValues,
  billingLocation,
  locationForBilling,
  shippingOptions,
  selectedShipping,
}) => {
  const [promo, setPromo] = useState<{ [key: string]: string }>({
    promo: '',
  });
  const [promoError, setPromoError] = useState<{ [key: string]: boolean }>({});
  const { cart } = useContext(CartContext);
  const subtotal = useMemo<number>(
    () => calculateTotalPrice(cart.cart),
    [cart.cart]
  );
  const tax = subtotal * 0.21;
  const classes = useStyles();
  const theme = useTheme();

  const shipping = shippingOptions.find(
    option => option.label === selectedShipping
  )!;

  const firstFields = [
    {
      value: detailValues.name,
      adornment: (
        <div className={classes.nameWrapper}>
          <NameAdornment color={theme.palette.common.white} />
        </div>
      ),
    },
    {
      value: detailValues.email,
      adornment: (
        <div className={classes.emailWrapper}>
          <EmailAdornment color={theme.palette.common.white} />
        </div>
      ),
    },
    {
      value: detailValues.phone,
      adornment: (
        <div className={classes.phoneWrapper}>
          <PhoneAdornment color={theme.palette.common.white} />
        </div>
      ),
    },
    {
      value: locationValues.street,
      adornment: <img src={streetAdornment} alt='street address' />,
    },
  ];

  const secondFields = [
    {
      value: `${locationValues.city}, ${locationValues.state} ${locationValues.zip}`,
      adornment: <img src={zipAdornment} alt='city, state, zip code' />,
    },
    {
      value: '**** **** **** 1234',
      adornment: (
        <img src={cardAdornment} alt='credit card' className={classes.card} />
      ),
    },
    {
      promo: {
        helperText: '',
        placeholder: 'Promo code',
        startAdornment: <img src={promoAdornment} alt='promo code' />,
      },
    },
  ];

  const prices: { label: string; value: string }[] = [
    {
      label: 'Subtotal',
      value: subtotal.toFixed(2),
    },
    {
      label: 'Shipping',
      value: shipping.price.toFixed(2),
    },
    {
      label: 'Tax',
      value: tax.toFixed(2),
    },
  ];

  const totalPrice = prices.reduce(
    (total, item) => total + parseFloat(item.value),
    0
  );

  const adornmentValue = (adornment: any, value: string) => (
    <>
      <Grid item xs={2} classes={{ root: classes.adornmentWrapper }}>
        {adornment}
      </Grid>
      <Grid item xs={10} classes={{ root: classes.centerText }}>
        <Typography variant='body1' classes={{ root: classes.text }}>
          {value}
        </Typography>
      </Grid>
    </>
  );

  return (
    <Grid
      item
      container
      direction='column'
      classes={{ root: classes.mainContainer }}
    >
      <Grid item container>
        <Grid item container direction='column' xs={7}>
          {firstFields.map((field, i) => (
            <Grid
              item
              container
              alignItems='center'
              key={field.value}
              classes={{
                root: clsx(classes.fieldRow, {
                  [classes.darkBackground]: i % 2 !== 0,
                }),
              }}
            >
              {adornmentValue(field.adornment, field.value)}
            </Grid>
          ))}
        </Grid>
        <Grid item xs={5} classes={{ root: classes.iconWrapper }}>
          <img src={confirmationIcon} alt='confirmation' />
        </Grid>
      </Grid>
      {secondFields.map((field, i) => (
        <Grid
          item
          container
          key={i}
          alignItems='center'
          classes={{
            root: clsx(classes.fieldRow, {
              [classes.darkBackground]: i % 2 !== 0,
            }),
          }}
        >
          <Grid item container xs={7}>
            {field.promo ? (
              <span className={classes.fieldWrapper}>
                <Fields
                  fields={field}
                  values={promo}
                  setValues={setPromo}
                  errors={promoError}
                  setErrors={setPromoError}
                  isWhite
                />
              </span>
            ) : (
              adornmentValue(field.adornment, field.value)
            )}
          </Grid>
          <Grid item container xs={5}>
            <Grid item xs={6}>
              <Typography variant='h5' classes={{ root: classes.priceLabel }}>
                {prices[i].label}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                align='right'
                variant='body2'
                classes={{ root: classes.priceValue }}
              >{`$${prices[i].value}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Grid item classes={{ root: classes.buttonWrapper }}>
        <Button classes={{ root: classes.button }}>
          <Grid container justifyContent='space-around' alignItems='center'>
            <Grid item>
              <Typography variant='h5'>Place order</Typography>
            </Grid>
            <Grid item>
              <Chip
                label={`$${totalPrice.toFixed(2)}`}
                classes={{ root: classes.chipRoot, label: classes.chipLabel }}
              />
            </Grid>
          </Grid>
        </Button>
      </Grid>
    </Grid>
  );
};

export default Confirmation;
