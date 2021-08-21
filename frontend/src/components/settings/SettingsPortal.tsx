import React, { useContext } from 'react';
import { Grid, Button, Typography, makeStyles } from '@material-ui/core';
import { UserContext } from '../../contexts';

import accountIcon from '../../images/account.svg';
import settingsIcon from '../../images/settings.svg';
import orderHistoryIcon from '../../images/order-history.svg';
import favoritesIcon from '../../images/favorite.svg';
import subscriptionIcon from '../../images/subscription.svg';
import background from '../../images/toolbar-background.svg';

const useStyles = makeStyles(theme => ({
  name: {
    color: theme.palette.secondary.main,
  },
  dashboard: {
    width: '100%',
    height: '30rem',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderTop: `0.5rem solid ${theme.palette.primary.main}`,
    borderBottom: `0.5rem solid ${theme.palette.primary.main}`,
    margin: '5rem 0',
  },
  icon: {
    height: '12rem',
    width: '12rem',
  },
  button: {
    height: '22rem',
    width: '22rem',
    borderRadius: 25,
  },
}));

interface SettingsPortalProps {}

const SettingsPortal: React.FC<SettingsPortalProps> = ({}) => {
  const { user } = useContext(UserContext);
  const classes = useStyles();

  const buttons = [
    {
      label: 'Settings',
      icon: settingsIcon,
    },
    {
      label: 'Order history',
      icon: orderHistoryIcon,
    },
    {
      label: 'Favorites',
      icon: favoritesIcon,
    },
    {
      label: 'Subscriptions',
      icon: subscriptionIcon,
    },
  ];

  return (
    <Grid container direction='column' alignItems='center'>
      <Grid item>
        <img src={accountIcon} alt='settings page' />
      </Grid>
      <Grid item>
        <Typography variant='h4' classes={{ root: classes.name }}>
          Welcome back, {user.username}
        </Typography>
      </Grid>
      <Grid
        item
        container
        alignItems='center'
        justifyContent='space-around'
        classes={{ root: classes.dashboard }}
      >
        {buttons.map(button => (
          <Grid item key={button.label}>
            <Button
              variant='contained'
              color='primary'
              classes={{ root: classes.button }}
            >
              <Grid container direction='column'>
                <Grid item>
                  <img
                    src={button.icon}
                    alt={button.label}
                    className={classes.icon}
                  />
                </Grid>
                <Grid item>
                  <Typography variant='h5'>{button.label}</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default SettingsPortal;
