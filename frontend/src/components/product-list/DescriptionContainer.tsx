import React, { useState } from 'react';
import {
  Grid,
  Typography,
  ButtonGroup,
  Button,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';

import background from '../../images/toolbar-background.svg';
import ListIcon from '../../images/List';
import GridIcon from '../../images/Grid';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    padding: '3rem',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
  },
  descriptionContainer: {
    backgroundColor: theme.palette.primary.main,
    height: '15rem',
    width: '60rem',
    borderRadius: 25,
    padding: '1rem',
  },
  description: {
    color: theme.palette.common.white,
  },
  button: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRightColor: `${theme.palette.primary.main} !important`,
    borderRadius: 25,
    backgroundColor: theme.palette.common.white,
    padding: '0.5rem 1.5rem',
    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  buttonGroup: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginRight: '3rem',
    marginBottom: '3rem',
  },
}));

interface DescriptionContainerProps {
  name: string;
  description: string;
  layout: 'grid' | 'list';
  setLayout: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
}

const DescriptionContainer: React.FC<DescriptionContainerProps> = ({
  name,
  description,
  layout,
  setLayout,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid
      item
      container
      classes={{ root: classes.mainContainer }}
      justifyContent='center'
    >
      <Grid item classes={{ root: classes.descriptionContainer }}>
        <Typography align='center' variant='h4' paragraph gutterBottom>
          {name}
        </Typography>
        <Typography
          align='center'
          variant='body1'
          classes={{ root: classes.description }}
        >
          {description}
        </Typography>
      </Grid>
      <Grid item classes={{ root: classes.buttonGroup }}>
        <ButtonGroup>
          <Button
            onClick={() => setLayout('list')}
            classes={{
              outlined: clsx(classes.button, {
                [classes.selected]: layout === 'list',
              }),
            }}
          >
            <ListIcon
              color={layout === 'list' ? theme.palette.common.white : undefined}
            />
          </Button>
          <Button
            onClick={() => setLayout('grid')}
            classes={{
              outlined: clsx(classes.button, {
                [classes.selected]: layout === 'grid',
              }),
            }}
          >
            <GridIcon
              color={layout === 'grid' ? theme.palette.common.white : undefined}
            />
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default DescriptionContainer;
