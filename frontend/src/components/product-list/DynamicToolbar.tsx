import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import FunctionContainer from './FunctionContainer';
import { Filters } from '../../interfaces/filters';

const useStyles = makeStyles(theme => ({
  toolbar: {
    border: `5px solid ${theme.palette.primary.main}`,
    borderRadius: 25,
    width: '95%',
    height: '20rem',
  },
}));

interface DynamicToolbarProps {
  filterOptions: Filters;
}

const DynamicToolbar: React.FC<DynamicToolbarProps> = ({ filterOptions }) => {
  const classes = useStyles();

  return (
    <Grid item container direction='column' classes={{ root: classes.toolbar }}>
      <FunctionContainer filterOptions={filterOptions} />
    </Grid>
  );
};

export default DynamicToolbar;
