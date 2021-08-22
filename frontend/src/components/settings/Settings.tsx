import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Details from './Details';
import Payments from './Payments';
import Location from './Location';

const useStyles = makeStyles(theme => ({}));

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = ({}) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Details />
      <Payments />
      <Location />
    </Grid>
  );
};

export default Settings;
