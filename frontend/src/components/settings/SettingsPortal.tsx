import React, { useState, useContext } from 'react';
import { Grid, Button, Typography, makeStyles } from '@material-ui/core';
import { useSprings, animated } from 'react-spring';
import useResizeAware from 'react-resize-aware';
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
}));

const AnimatedButton = animated(Button);

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

interface SettingsPortalProps {}

const SettingsPortal: React.FC<SettingsPortalProps> = ({}) => {
  const [selectedSetting, setSelectedSetting] = useState<string>('');
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const [resizeListener, sizes] = useResizeAware();

  const handleClick = (label: string) => {
    if (selectedSetting === label) {
      setSelectedSetting('');
    } else {
      setSelectedSetting(label);
    }
  };

  const springs = useSprings(
    buttons.length,
    buttons.map(button => ({
      to: async (next: any, cancel: any) => {
        const scale = {
          transform:
            selectedSetting === button.label || !selectedSetting
              ? 'scale(1)'
              : 'scale(0)',
          delay: selectedSetting ? 600 : 0,
        };

        const size = {
          height: selectedSetting === button.label ? '60rem' : '22rem',
          width:
            selectedSetting === button.label ? `${sizes.width}px` : '352px',
          borderRadius: selectedSetting === button.label ? 0 : 25,
        };

        const hide = {
          display:
            selectedSetting === button.label || !selectedSetting
              ? 'flex'
              : 'none',
          delay: 150,
        };

        await next(selectedSetting ? scale : size);
        await next(hide);
        await next(selectedSetting ? size : scale);
      },
    }))
  );

  return (
    <Grid container direction='column' alignItems='center'>
      {resizeListener}
      <Grid item>
        <img src={accountIcon} alt='settings page' />
      </Grid>
      {sizes.width} x {sizes.height}
      <animated.div></animated.div>
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
        {springs.map((prop, i) => (
          <Grid item key={buttons[i].label}>
            <AnimatedButton
              variant='contained'
              color='primary'
              onClick={() => handleClick(buttons[i].label)}
              style={prop}
            >
              <Grid container direction='column'>
                <Grid item>
                  <img
                    src={buttons[i].icon}
                    alt={buttons[i].label}
                    className={classes.icon}
                  />
                </Grid>
                <Grid item>
                  <Typography variant='h5'>{buttons[i].label}</Typography>
                </Grid>
              </Grid>
            </AnimatedButton>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default SettingsPortal;
