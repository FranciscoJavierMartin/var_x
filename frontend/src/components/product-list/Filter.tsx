import React from 'react';
import {
  Grid,
  IconButton,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  makeStyles,
} from '@material-ui/core';

import filter from '../../images/filter.svg';
import close from '../../images/close-outline.svg';
import { Filters } from '../../interfaces/filters';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    padding: '1rem 0',
  },
  optionsContainer: {
    [theme.breakpoints.down('xs')]: {
      '& > :not(:last-child)': {
        marginBottom: '2rem',
      },
    },
  },
  chipRoot: {
    backgroundColor: theme.palette.secondary.main,
  },
  chipLabel: {
    ...theme.typography.body1,
    color: theme.palette.common.white,
    fontWeight: 500,
  },
  checkbox: {
    color: theme.palette.common.white,
  },
}));

interface FilterProps {
  setOption: React.Dispatch<React.SetStateAction<'sort' | 'filter' | null>>;
  filterOptions: Filters;
  setFilterOptions: React.Dispatch<React.SetStateAction<Filters>>;
}

const Filter: React.FC<FilterProps> = ({
  setOption,
  filterOptions,
  setFilterOptions,
}) => {
  const classes = useStyles();

  const handleFilter = (option: string, i: number) => {
    const newFilters = { ...filterOptions };
    newFilters[option][i].checked = !newFilters[option][i].checked;
    setFilterOptions(newFilters);
  };

  return (
    <Grid
      item
      container
      justifyContent='space-between'
      alignItems='center'
      classes={{ root: classes.mainContainer }}
    >
      <Grid item>
        <IconButton onClick={() => setOption(null)}>
          <img src={filter} alt='filter' />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Grid
          container
          justifyContent='space-around'
          classes={{ root: classes.optionsContainer }}
        >
          {Object.keys(filterOptions)
            .filter(option => filterOptions[option])
            .map(option => (
              <Grid item key={option}>
                <Grid container direction='column' alignItems='center'>
                  <Grid item>
                    <Chip
                      label={option}
                      classes={{
                        root: classes.chipRoot,
                        label: classes.chipLabel,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <FormGroup>
                        {filterOptions[option].map(
                          ({ label, checked }, i: number) => (
                            <FormControlLabel
                              key={label}
                              label={label}
                              classes={{ label: classes.checkbox }}
                              control={
                                <Checkbox
                                  checked={checked}
                                  name={label}
                                  classes={{ root: classes.checkbox }}
                                  onChange={() => handleFilter(option, i)}
                                />
                              }
                            />
                          )
                        )}
                      </FormGroup>
                    </FormControl>
                  </Grid>
                </Grid>
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

export default Filter;
