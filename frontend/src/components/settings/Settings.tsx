import React, { useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Details from './Details';
import Payments from './Payments';
import Location from './Location';
import Edit from './Edit';
import { UserContext } from '../../contexts';

const useStyles = makeStyles(theme => ({
  sectionContainer: {
    height: '50%',
  },
  bottomRow: {
    borderTop: `4px solid ${theme.palette.common.white}`,
  },
}));

interface SettingsProps {
  setSelectedSetting: React.Dispatch<React.SetStateAction<string>>;
}

const Settings: React.FC<SettingsProps> = ({ setSelectedSetting }) => {
  const { user } = useContext(UserContext);
  const classes = useStyles();

  return (
    <>
      <Grid container classes={{ root: classes.sectionContainer }}>
        <Details user={user} />
        <Payments user={user} />
      </Grid>
      <Grid
        container
        classes={{ root: clsx(classes.bottomRow, classes.sectionContainer) }}
      >
        <Location user={user} />
        <Edit user={user} setSelectedSetting={setSelectedSetting} />
      </Grid>
    </>
  );
};

export default Settings;
