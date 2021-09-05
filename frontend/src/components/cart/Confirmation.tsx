import React, { useState } from 'react';
import { Grid, Typography, makeStyles, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import Fields from '../shared/Fields';

import confirmationIcon from '../../images/tag.svg';
import NameAdornment from '../../images/NameAdornment';
import EmailAdornment from '../../images/EmailAdornment';
import PhoneAdornment from '../../images/PhoneAdornment';
import streetAdornment from '../../images/street-adornment.svg';
import zipAdornment from '../../images/zip-adornment.svg';
import cardAdornment from '../../images/card.svg';
import promoAdornment from '../../images/promo-code.svg';

const useStyles = makeStyles(theme => ({
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
}));

interface ConfirmationProps {}

const Confirmation: React.FC<ConfirmationProps> = ({}) => {
  const [promo, setPromo] = useState<{ [key: string]: string }>({
    promo: '',
  });
  const [promoError, setPromoError] = useState<{ [key: string]: boolean }>({});
  const classes = useStyles();
  const theme = useTheme();

  const firstFields = [
    {
      value: 'John Doe',
      adornment: (
        <div className={classes.nameWrapper}>
          <NameAdornment color={theme.palette.common.white} />
        </div>
      ),
    },
    {
      value: 'test@test.com',
      adornment: (
        <div className={classes.emailWrapper}>
          <EmailAdornment color={theme.palette.common.white} />
        </div>
      ),
    },
    {
      value: '(555) 555-5555',
      adornment: (
        <div className={classes.phoneWrapper}>
          <PhoneAdornment color={theme.palette.common.white} />
        </div>
      ),
    },
    {
      value: '1234 Example St',
      adornment: <img src={streetAdornment} alt='street address' />,
    },
  ];

  const secondFields = [
    {
      value: 'Witchita, KS 67211',
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

  const prices = [
    {
      label: 'Subtotal',
      value: 99.99,
    },
    {
      label: 'Shipping',
      value: 9.99,
    },
    {
      label: 'Tax',
      value: 9.67,
    },
  ];

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
    <Grid item container direction='column'>
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
    </Grid>
  );
};

export default Confirmation;
