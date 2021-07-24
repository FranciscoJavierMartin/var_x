import React from 'react';
import { Link } from 'gatsby';
import {
  Grid,
  Typography,
  Button,
  makeStyles,
  useMediaQuery,
  Theme,
} from '@material-ui/core';

import cta from '../../images/cta.svg';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: '15rem',
  },
  account: {
    color: theme.palette.common.white,
    marginLeft: '2rem',
  },
  body: {
    maxWidth: '45rem',
    [theme.breakpoints.down('md')]: {
      padding: '0 1rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0',
    },
  },
  buttonContainer: {
    marginTop: '3rem',
  },
  headingContainer: {
    [theme.breakpoints.down('md')]: {
      padding: '0 1rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0',
    },
  },
  icon: {
    [theme.breakpoints.down('xs')]: {
      height: '18rem',
      width: '20rem',
    },
  },
}));

const CallToAction: React.FC = () => {
  const classes = useStyles();
  const matchesMD = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));

  return (
    <Grid
      container
      justifyContent='space-around'
      alignItems='center'
      classes={{ root: classes.container }}
      direction={matchesMD ? 'column' : 'row'}
    >
      <Grid item>
        <img src={cta} alt='Quality committed' className={classes.icon} />
      </Grid>
      <Grid item>
        <Grid container direction='column'>
          <Grid item classes={{ root: classes.headingContainer }}>
            <Typography align={matchesMD ? 'center' : undefined} variant='h1'>
              Committed to quality
            </Typography>
          </Grid>
          <Grid item classes={{ root: classes.body }}>
            <Typography
              align={matchesMD ? 'center' : undefined}
              variant='body1'
            >
              At VAR X our mission is to provide comfortable, durable, premium,
              designer clothing and clothing accessories to developers and
              technology enthusiasts
            </Typography>
          </Grid>
          <Grid
            item
            justifyContent={matchesMD ? 'center' : undefined}
            container
            classes={{ root: classes.buttonContainer }}
          >
            <Grid item>
              <Button
                component={Link}
                to='/contact'
                variant='outlined'
                color='primary'
              >
                Contact Us
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                component={Link}
                to='/account'
                classes={{ root: classes.account }}
              >
                Create Account
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CallToAction;
