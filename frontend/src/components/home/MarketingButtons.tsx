import React from 'react';
import { Link } from 'gatsby';
import { Grid, Typography, IconButton, makeStyles } from '@material-ui/core';

import marketingAdornment from '../../images/marketing-adornment.svg';
import moreByUs from '../../images/more-by-us.svg';
import store from '../../images/store.svg';

const useStyles = makeStyles(theme => ({
  button: {
    backgroundImage: `url(${marketingAdornment})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '50rem',
    width: '50rem',
    transition: 'transform 0.5s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
    [theme.breakpoints.down('lg')]: {
      height: '40rem',
      width: '40rem',
      margin: '3rem',
    },
    [theme.breakpoints.down('sm')]: {
      height: '30rem',
      width: '30rem',
    },
    [theme.breakpoints.down('xs')]: {
      height: '25rem',
      width: '25rem',
    },
  },
  container: {
    margin: '15rem 0',
  },
  icon: {
    [theme.breakpoints.down('sm')]: {
      height: '8rem',
      width: '8rem',
    },
  },
  label: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.75rem',
    },
  },
}));

const MarketingButtons: React.FC = () => {
  const classes = useStyles();

  const buttons = [
    { label: 'Store', icon: store, link: '/hoodies' },
    { label: 'More By Us', icon: moreByUs, href: 'https://www.google.com' },
  ];

  return (
    <Grid
      container
      justifyContent='space-around'
      classes={{ root: classes.container }}
    >
      {buttons.map(button => (
        <Grid item key={button.label}>
          <Grid
            container
            alignItems='center'
            justifyContent='center'
            direction='column'
            classes={{ root: classes.button }}
            component={button.link ? Link : 'a'}
            to={button.link}
            href={button.href}
          >
            <Grid item>
              <img
                src={button.icon}
                alt={button.label}
                className={classes.icon}
              />
            </Grid>
            <Grid item>
              <Typography variant='h1' classes={{ root: classes.label }}>
                {button.label}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default MarketingButtons;
