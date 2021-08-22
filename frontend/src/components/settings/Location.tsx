import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import locationIcon from '../../images/location.svg';
import streetAdornment from '../../images/street-adornment.svg';
import zipAdornment from '../../images/zip-adornment.svg';

const useStyles = makeStyles(theme => ({}));

interface LocationProps {}

const Location: React.FC<LocationProps> = ({}) => {
  const classes = useStyles();

  return (
    <Grid item container direction='column' xs={6} alignItems='center'>
      <Grid item>
        <img src={locationIcon} alt='location settings' />
      </Grid>
    </Grid>
  );
};

export default Location;
