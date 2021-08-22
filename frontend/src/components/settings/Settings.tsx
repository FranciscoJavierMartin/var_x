import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({}));

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = ({}) => {
  const classes = useStyles();

  return <Grid>User settings</Grid>;
};

export default Settings;
