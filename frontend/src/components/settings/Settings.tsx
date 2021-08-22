import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Details from './Details';

const useStyles = makeStyles(theme => ({}));

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = ({}) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Details />
    </Grid>
  );
};

export default Settings;
