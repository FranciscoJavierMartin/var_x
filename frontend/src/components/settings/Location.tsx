import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  CircularProgress,
  Grid,
  Chip,
  FormControlLabel,
  Switch,
  makeStyles,
  Theme,
  useMediaQuery,
} from '@material-ui/core';
import axios from 'axios';
import Fields from '../shared/Fields';
import Slots from './Slots';
import { User } from '../../interfaces/user';
import { FeedbackContext } from '../../contexts';
import { openSnackbar, SnackbarStatus } from '../../contexts/feedback/actions';

import locationIcon from '../../images/location.svg';
import streetAdornment from '../../images/street-adornment.svg';
import zipAdornment from '../../images/zip-adornment.svg';

const useStyles = makeStyles<Theme, { isCheckout?: boolean }>(theme => ({
  locationContainer: {
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      borderBottom: `4px solid ${theme.palette.common.white}`,
      height: '30rem',
    },
  },
  icon: {
    marginBottom: ({ isCheckout }) => (isCheckout ? '1rem' : '3rem'),
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1rem',
    },
  },
  fieldContainer: {
    '& > :not(:first-child)': {
      marginTop: '2rem',
    },
  },
  chipWrapper: {
    marginTop: '2rem',
    marginBottom: '3rem',
  },
  slotsContainer: {
    position: 'absolute',
    bottom: ({ isCheckout }) => (isCheckout ? -8 : 0),
  },
  switchWrapper: {
    marginRight: 4,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  switchLabel: {
    color: theme.palette.common.white,
    fontWeight: 600,
  },
}));

interface LocationProps {
  user: User;
  edit: boolean;
  setChangesMade: React.Dispatch<React.SetStateAction<boolean>>;
  values: { [key: string]: string };
  setValues: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  slot: number;
  setSlot: React.Dispatch<React.SetStateAction<number>>;
  errors: { [key: string]: boolean };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  billing?: boolean | number;
  setBilling?: React.Dispatch<React.SetStateAction<boolean | number>>;
  isCheckout?: boolean;
  noSlots?: boolean;
  billingValues?: { [key: string]: string };
  setBillingValues?: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
}

const Location: React.FC<LocationProps> = ({
  user,
  edit,
  setChangesMade,
  values,
  setValues,
  slot,
  setSlot,
  errors,
  setErrors,
  billing,
  setBilling,
  isCheckout,
  noSlots,
  billingValues,
  setBillingValues,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const { dispatchFeedback } = useContext(FeedbackContext);
  const isMounted = useRef<boolean>(false);
  const classes = useStyles({ isCheckout });
  const matchesXS = useMediaQuery<Theme>(theme => theme.breakpoints.down('xs'));

  const fields = {
    street: {
      placeholder: 'Street',
      helperText: 'Invalid address',
      startAdornment: <img src={streetAdornment} alt='street' />,
    },
    zip: {
      placeholder: 'Zip Code',
      helperText: 'Invalid zip code',
      startAdornment: <img src={zipAdornment} alt='zip code' />,
    },
  };

  const getLocation = (): void => {
    setIsLoading(true);

    axios
      .get(
        `https://data.opendatasoft.com/api/records/1.0/search/?dataset=geonames-postal-code%40public&rows=1&facet=country_code&facet=admin_name1&facet=place_name&facet=postal_code&refine.country_code=US&refine.postal_code=${values.zip}`
      )
      .then(response => {
        setIsLoading(false);
        const { place_name, admin_name1 } = response.data.records[0].fields;
        setValues(prevState => ({
          ...prevState,
          city: place_name,
          state: admin_name1,
        }));
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
        dispatchFeedback(
          openSnackbar(
            SnackbarStatus.Error,
            'There was a problem with your with your zip code, please try again'
          )
        );
      });
  };

  useEffect(() => {
    if (!noSlots || user.username !== 'Guest') {
      setValues({ ...user.locations[slot] });
    }
  }, [slot]);

  useEffect(() => {
    if (!isCheckout) {
      const changed = Object.keys(user.locations[slot]).some(
        field => values[field] !== (user.locations[slot] as any)[field]
      );

      setChangesMade(changed);
    }

    if (values.zip.length === 5) {
      if (!values.city) {
        getLocation();
      }
    } else if (values.zip.length < 5 && values.city) {
      setValues(prevState => ({ ...prevState, city: '', state: '' }));
    }
  }, [values]);

  useEffect(() => {
    if (!noSlots || user.username !== 'Guest') {
      if (!isMounted.current) {
        isMounted.current = true;
      } else {
        if (billing === false) {
          setValues(billingValues!);
        } else {
          setBillingValues && setBillingValues(values);
        }
      }
    } else {
      isMounted.current = false;
    }
  }, [billing]);

  return (
    <Grid
      item
      container
      direction='column'
      lg={isCheckout ? 12 : 6}
      xs={12}
      justifyContent='center'
      alignItems='center'
      classes={{ root: classes.locationContainer }}
    >
      <Grid item>
        <img
          src={locationIcon}
          alt='location settings'
          className={classes.icon}
        />
      </Grid>
      <Grid
        item
        container
        direction='column'
        alignItems='center'
        classes={{ root: classes.fieldContainer }}
      >
        <Fields
          fields={fields}
          values={billing === slot && !noSlots ? billingValues! : values}
          setValues={
            billing === slot && !noSlots ? setBillingValues! : setValues
          }
          errors={errors}
          setErrors={setErrors}
          isWhite
          disabled={isCheckout ? false : !edit}
        />
      </Grid>
      <Grid item classes={{ root: classes.chipWrapper }}>
        {isLoading ? (
          <CircularProgress color='secondary' />
        ) : (
          <Chip
            label={
              values.city ? `${values.city}, ${values.state}` : 'City, State'
            }
          />
        )}
      </Grid>
      {noSlots ? null : (
        <Grid
          item
          container
          justifyContent='space-between'
          classes={{ root: classes.slotsContainer }}
        >
          <Slots slot={slot} setSlot={setSlot} isCheckout={isCheckout} />
          {isCheckout && (
            <Grid item>
              <FormControlLabel
                label='Billing'
                labelPlacement='start'
                control={
                  <Switch
                    checked={billing === slot}
                    onChange={() =>
                      setBilling &&
                      setBilling(prevState =>
                        prevState === slot ? false : slot
                      )
                    }
                    color='secondary'
                  />
                }
                classes={{
                  root: classes.switchWrapper,
                  label: classes.switchLabel,
                }}
              />
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default Location;
