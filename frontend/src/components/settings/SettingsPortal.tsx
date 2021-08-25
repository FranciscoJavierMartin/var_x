import React, { useState, useContext, useEffect } from 'react';
import { Grid, Typography, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import { useSpring, useSprings, animated } from 'react-spring';
import useResizeAware from 'react-resize-aware';
import Settings from './Settings';
import { UserContext } from '../../contexts';

import accountIcon from '../../images/account.svg';
import settingsIcon from '../../images/settings.svg';
import orderHistoryIcon from '../../images/order-history.svg';
import favoritesIcon from '../../images/favorite.svg';
import subscriptionIcon from '../../images/subscription.svg';
import background from '../../images/repeating-smallest.svg';

const useStyles = makeStyles<Theme, { showComponent: boolean }>(theme => ({
  name: {
    color: theme.palette.secondary.main,
  },
  dashboard: {
    width: '100%',
    minHeight: '30rem',
    height: 'auto',
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    borderTop: ({ showComponent }) =>
      `${showComponent ? 0 : 0.5}rem solid ${theme.palette.primary.main}`,
    borderBottom: ({ showComponent }) =>
      `${showComponent ? 0 : 0.5}rem solid ${theme.palette.primary.main}`,
    margin: '5rem 0',
  },
  icon: {
    height: '12rem',
    width: '12rem',
  },
  button: {
    backgroundColor: theme.palette.primary.main,
  },
  addHover: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

const AnimatedGrid = animated(Grid);

const buttons = [
  {
    label: 'Settings',
    icon: settingsIcon,
    component: Settings,
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
  const [showComponent, setShowComponent] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const [resizeListener, sizes] = useResizeAware();
  const classes = useStyles({ showComponent });

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

  const styles = useSpring({
    opacity: !selectedSetting || showComponent ? 1 : 0,
    delay: !selectedSetting || showComponent ? 0 : 1350,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!selectedSetting) {
      setShowComponent(false);
    } else {
      timer = setTimeout(() => {
        setShowComponent(true);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [selectedSetting]);

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
        {springs.map((prop, i) => {
          const button = buttons[i];
          const Component = button.component;
          return (
            <AnimatedGrid
              key={button.label}
              item
              onClick={() => (showComponent ? null : handleClick(button.label))}
              style={prop}
              classes={{
                root: clsx(classes.button, {
                  [classes.addHover]: !showComponent,
                }),
              }}
            >
              <AnimatedGrid
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
                style={styles}
              >
                {selectedSetting === button.label && showComponent ? (
                  <Component setSelectedSetting={setSelectedSetting} />
                ) : (
                  <>
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
                  </>
                )}
              </AnimatedGrid>
            </AnimatedGrid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default SettingsPortal;
