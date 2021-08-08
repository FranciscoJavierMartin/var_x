import React from 'react';
import { Grid, Typography, makeStyles, IconButton, Theme } from '@material-ui/core';
import Sort from './Sort';
import Filter from './Filter';

import filter from '../../images/filter.svg';
import sort from '../../images/sort.svg';
import { Filters } from '../../interfaces/filters';

const useStyles = makeStyles<Theme, { option: string }>(theme => ({
  functionContainer: {
    backgroundColor: theme.palette.primary.main,
    minHeight: '6rem',
    height: 'auto',
    borderRadius: ({ option }) => (option ? '10px' : '10px 10px 0px 0px'),
  },
}));

interface FunctionContainerProps {
  filterOptions: Filters;
  option: any;
  setOption: any;
}

const FunctionContainer: React.FC<FunctionContainerProps> = ({
  filterOptions,
  option,
  setOption,
}) => {
  const classes = useStyles({ option });

  const content = () => {
    let res;
    switch (option) {
      case null:
        const items = [
          {
            icon: filter,
            alt: 'filter',
          },
          {
            icon: sort,
            alt: 'sort',
          },
        ];
        res = (
          <Grid
            item
            container
            justifyContent='space-around'
            alignItems='center'
          >
            {items.map(item => (
              <Grid item key={item.alt}>
                <IconButton onClick={() => setOption(item.alt)}>
                  <img src={item.icon} alt={item.alt} />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        );
        break;
      case 'sort':
        res = <Sort setOption={setOption} />;
        break;
      case 'filter':
        res = <Filter setOption={setOption} filterOptions={filterOptions} />;
        break;
      default:
        res = null;
    }
    return res;
  };

  return (
    <Grid item container classes={{ root: classes.functionContainer }}>
      {content()}
    </Grid>
  );
};

export default FunctionContainer;
