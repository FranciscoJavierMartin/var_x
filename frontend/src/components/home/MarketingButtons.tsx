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
  },
  container: {
    margin: '15rem 0',
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
              <img src={button.icon} alt={button.label} />
            </Grid>
            <Grid item>
              <Typography variant='h1'>{button.label}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default MarketingButtons;
