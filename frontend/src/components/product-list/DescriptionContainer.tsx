import React from 'react';
import {
  Grid,
  Typography,
  ButtonGroup,
  Button,
  makeStyles,
  useTheme,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import clsx from 'clsx';

import background from '../../images/repeating-smallest.svg';
import ListIcon from '../../images/List';
import GridIcon from '../../images/Grid';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    padding: '3rem',
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      padding: '3rem 0',
    },
  },
  descriptionContainer: {
    backgroundColor: theme.palette.primary.main,
    height: '15rem',
    width: '60%',
    borderRadius: 25,
    padding: '1rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0,
    },
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
    [theme.breakpoints.down('md')]: {
      position: 'relative',
      display: 'flex',
      alignSelf: 'flex-end',
      marginRight: 0,
      marginBottom: 0,
      marginTop: '3rem',
    },
    [theme.breakpoints.down('md')]: {
      marginRight: '1.5rem',
    },
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
  const matchesMD = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));

  const changeLayout = (option: 'list' | 'grid'): void => {
    setLayout(option);
  };

  return (
    <Grid
      item
      container
      direction={matchesMD ? 'column' : 'row'}
      classes={{ root: classes.mainContainer }}
      justifyContent='center'
      alignItems={matchesMD ? 'center' : undefined}
    >
      <Grid item classes={{ root: classes.descriptionContainer }}>
        <Typography align='center' variant='h4'>
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
      {/* FIXME: Push down the button group to not overlap with container */}
      <Grid item classes={{ root: classes.buttonGroup }}>
        <ButtonGroup>
          <Button
            onClick={() => changeLayout('list')}
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
            onClick={() => changeLayout('grid')}
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
