import React from 'react';
import { Grid, IconButton, makeStyles, useTheme } from '@material-ui/core';

import BackwardsOutline from '../../images/BackwardsOutline';
import editIcon from '../../images/edit.svg';
import saveIcon from '../../images/save.svg';

const useStyles = makeStyles(theme => ({
  editContainer: {
    borderLeft: `4px solid ${theme.palette.common.white}`,
  },
  icon: {
    height: '8rem',
    width: '8rem',
  },
}));

interface EditProps {
  setSelectedSetting: React.Dispatch<React.SetStateAction<string>>;
}

const Edit: React.FC<EditProps> = ({ setSelectedSetting }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid
      item
      container
      xs={6}
      justifyContent='space-evenly'
      alignItems='center'
      classes={{ root: classes.editContainer }}
    >
      <Grid item>
        <IconButton onClick={() => setSelectedSetting('')}>
          <span className={classes.icon}>
            <BackwardsOutline color={theme.palette.common.white} />
          </span>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton>
          <img src={editIcon} alt='edit settings' className={classes.icon} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Edit;
