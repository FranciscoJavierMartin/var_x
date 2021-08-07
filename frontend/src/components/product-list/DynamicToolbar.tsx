import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import FunctionContainer from './FunctionContainer';

const useStyles = makeStyles(theme => ({
  toolbar: {
    border: `5px solid ${theme.palette.primary.main}`,
    borderRadius: 25,
    width: '95%',
    height: '20rem',
  },
}));

const DynamicToolbar: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid item container direction='column' classes={{ root: classes.toolbar }}>
      <FunctionContainer />
    </Grid>
  );
};

export default DynamicToolbar;
