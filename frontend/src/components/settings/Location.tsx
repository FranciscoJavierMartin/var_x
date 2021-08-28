import React, { useState, useEffect, useContext } from 'react';
import { CircularProgress, Grid, Chip, makeStyles } from '@material-ui/core';
import axios from 'axios';
import Fields from '../shared/Fields';
import Slots from './Slots';
import { User } from '../../interfaces/user';
import { FeedbackContext } from '../../contexts';
import { openSnackbar, SnackbarStatus } from '../../contexts/feedback/actions';

import locationIcon from '../../images/location.svg';
import streetAdornment from '../../images/street-adornment.svg';
import zipAdornment from '../../images/zip-adornment.svg';

const useStyles = makeStyles(theme => ({
  locationContainer: {
    position: 'relative',
  },
  icon: {
    marginBottom: '3rem',
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
    bottom: 0,
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
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatchFeedback } = useContext(FeedbackContext);
  const classes = useStyles();

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
        console.log(response);
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
    setValues({ ...user.locations[slot] });
  }, [slot]);

  useEffect(() => {
    const changed = Object.keys(user.locations[slot]).some(
      field => values[field] !== (user.locations[slot] as any)[field]
    );

    setChangesMade(changed);

    if (values.zip.length === 5) {
      if (!values.city) {
        getLocation();
      }
    } else if (values.zip.length < 5 && values.city) {
      setValues(prevState => ({ ...prevState, city: '', state: '' }));
    }
  }, [values]);

  return (
    <Grid
      item
      container
      direction='column'
      xs={6}
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
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
          isWhite
          disabled={!edit}
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
      <Grid item container classes={{ root: classes.slotsContainer }}>
        <Slots slot={slot} setSlot={setSlot} />
      </Grid>
    </Grid>
  );
};

export default Location;