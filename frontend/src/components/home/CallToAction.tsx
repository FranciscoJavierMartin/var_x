import React from 'react';
import { Link } from 'gatsby';
import { Grid, Typography, Button, makeStyles } from '@material-ui/core';

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
  },
  buttonContainer: {
    marginTop: '3rem',
  },
}));

const CallToAction: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent='space-around'
      alignItems='center'
      classes={{ root: classes.container }}
    >
      <Grid item>
        <img src={cta} alt='Quality committed' />
      </Grid>
      <Grid item>
        <Grid container direction='column'>
          <Grid item>
            <Typography variant='h1'>Committed to quality</Typography>
          </Grid>
          <Grid item classes={{ root: classes.body }}>
            <Typography variant='body1'>
              At VAR X our mission is to provide comfortable, durable, premium,
              designer clothing and clothing accessories to developers and
              technology enthusiasts
            </Typography>
          </Grid>
          <Grid item container classes={{ root: classes.buttonContainer }}>
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
