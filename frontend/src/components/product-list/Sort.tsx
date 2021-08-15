import React from 'react';
import {
  Grid,
  IconButton,
  Chip,
  makeStyles,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import clsx from 'clsx';
import { Edge } from '../../interfaces/category-products';

import sort from '../../images/sort.svg';
import close from '../../images/close-outline.svg';

const useStyles = makeStyles(theme => ({
  chipContainer: {
    [theme.breakpoints.down('md')]: {
      margin: '0.5rem',
    },
  },
  notActive: {
    backgroundColor: theme.palette.primary.main,
  },
}));

interface SortProps {
  setOption: React.Dispatch<React.SetStateAction<'sort' | 'filter' | null>>;
  sortOptions: {
    label: string;
    active: boolean;
    function: (data: Edge[]) => Edge[];
  }[];
  setSortOptions: React.Dispatch<
    React.SetStateAction<
      {
        label: string;
        active: boolean;
        function: (data: Edge[]) => Edge[];
      }[]
    >
  >;
}

const Sort: React.FC<SortProps> = ({
  setOption,
  sortOptions,
  setSortOptions,
}) => {
  const classes = useStyles();
  const matchesXS = useMediaQuery<Theme>(theme => theme.breakpoints.down('xs'));

  const handleSort = (index: number) => {
    setSortOptions(prevState => {
      const newOptions = prevState.map(option => ({
        ...option,
        active: false,
      }));

      newOptions[index].active = true;

      return newOptions;
    });
  };

  return (
    <Grid item container justifyContent='space-between' alignItems='center'>
      <Grid item>
        <IconButton onClick={() => setOption(null)}>
          <img src={sort} alt='sort' />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Grid
          container
          justifyContent='space-around'
          alignItems={matchesXS ? 'center' : undefined}
          direction={matchesXS ? 'column' : 'row'}
        >
          {sortOptions.map((option, index: number) => (
            <Grid
              item
              key={option.label}
              classes={{ root: classes.chipContainer }}
            >
              <Chip
                label={option.label}
                color={option.active ? 'secondary' : 'primary'}
                onClick={() => handleSort(index)}
                classes={{
                  root: clsx({ [classes.notActive]: !option.active }),
                }}
              />
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
