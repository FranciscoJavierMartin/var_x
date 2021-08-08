import React, { useState } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import FunctionContainer from './FunctionContainer';
import { Filters } from '../../interfaces/filters';
import DescriptionContainer from './DescriptionContainer';

const useStyles = makeStyles(theme => ({
  toolbar: {
    border: `5px solid ${theme.palette.primary.main}`,
    borderRadius: 25,
    width: '95%',
    height: 'auto',
    marginBottom: '5rem',
  },
}));

interface DynamicToolbarProps {
  filterOptions: Filters;
  name: string;
  description: string;
}

const DynamicToolbar: React.FC<DynamicToolbarProps> = ({
  filterOptions,
  name,
  description,
}) => {
  const classes = useStyles();
  const [option, setOption] = useState<any>(null);

  return (
    <Grid item container direction='column' classes={{ root: classes.toolbar }}>
      <FunctionContainer
        filterOptions={filterOptions}
        option={option}
        setOption={setOption}
      />
      {option === null && (
        <DescriptionContainer name={name} description={description} />
      )}
    </Grid>
  );
};

export default DynamicToolbar;
