import React from 'react';
import { Grid, IconButton, Chip, makeStyles } from '@material-ui/core';

import sort from '../../images/sort.svg';
import close from '../../images/close-outline.svg';

const useStyles = makeStyles(theme => ({
  chipContainer: {
    [theme.breakpoints.down('md')]: {
      margin: '0.5rem',
    },
  },
}));

interface SortProps {
  setOption: React.Dispatch<React.SetStateAction<'sort' | 'filter' | null>>;
}

const Sort: React.FC<SortProps> = ({ setOption }) => {
  const classes = useStyles();

  const sortOptions = [
    { label: 'A-Z' },
    { label: 'Z-A' },
    { label: 'NEWEST' },
    { label: 'OLDEST' },
    { label: 'PRICE ↑' },
    { label: 'PRICE ↓' },
    { label: 'REVIEWS' },
  ];

  return (
    <Grid item container justify='space-between' alignItems='center'>
      <Grid item>
        <IconButton onClick={() => setOption(null)}>
          <img src={sort} alt='sort' />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Grid container justify='space-around'>
          {sortOptions.map(option => (
            <Grid
              item
              key={option.label}
              classes={{ root: classes.chipContainer }}
            >
              <Chip label={option.label} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <IconButton onClick={() => setOption(null)}>
          <img src={close} alt='close' />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Sort;
