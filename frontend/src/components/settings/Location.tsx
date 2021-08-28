import React, { useEffect, useState } from 'react';
import { Grid, Chip, makeStyles } from '@material-ui/core';
import Fields from '../shared/Fields';
import Slots from './Slots';
import { LocationInfo, User } from '../../interfaces/user';

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

  useEffect(() => {
    setValues({ ...user.locations[slot] });
  }, [slot]);

  useEffect(() => {
    const changed = Object.keys(user.contactInfo[slot]).some(
      field => values[field] !== (user.contactInfo[slot] as any)[field]
    );

    if (changed) {
      setChangesMade(true);
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
        <Chip
          label={
            values.city ? `${values.city}, ${values.state}` : 'City, State'
          }
        />
      </Grid>
      <Grid item container classes={{ root: classes.slotsContainer }}>
        <Slots slot={slot} setSlot={setSlot} />
      </Grid>
    </Grid>
  );
};

export default Location;
