import React, { useState } from 'react';
import { Grid, Typography, makeStyles, IconButton } from '@material-ui/core';

import filter from '../../images/filter.svg';
import sort from '../../images/sort.svg';
import Sort from './Sort';

const useStyles = makeStyles(theme => ({
  functionContainer: {
    backgroundColor: theme.palette.primary.main,
    height: '6rem',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  },
}));

const FunctionContainer: React.FC = () => {
  const classes = useStyles();
  const [option, setOption] = useState<any>(null);

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
