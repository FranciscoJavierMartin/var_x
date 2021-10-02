import React, { useState, useContext, useEffect } from 'react';
import {
  Button,
  Grid,
  Typography,
  makeStyles,
  Theme,
  useMediaQuery,
} from '@material-ui/core';
import clsx from 'clsx';
import { useSpring, useSprings, animated } from 'react-spring';
import useResizeAware from 'react-resize-aware';
import Settings from './Settings';
import OrderHistory from './OrderHistory';
import { UserContext } from '../../contexts';
import { setUser } from '../../contexts/user/actions';

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
    [theme.breakpoints.down('md')]: {
      padding: ({ showComponent }) => (showComponent ? 0 : '5rem 0'),
      '& > :not(:last-child)': {
        marginBottom: ({ showComponent }) => (showComponent ? 0 : '5rem'),
      },
    },
    [theme.breakpoints.down('xs')]: {
      padding: ({ showComponent }) => (showComponent ? 0 : '2rem 0'),
      '& > :not(:last-child)': {
        marginBottom: ({ showComponent }) => (showComponent ? 0 : '2rem'),
      },
    },
  },
  icon: {
    height: '12rem',
    width: '12rem',
    [theme.breakpoints.down('lg')]: {
      height: '10rem',
      width: '10rem',
    },
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
  logout: {
    color: theme.palette.error.main,
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
    component: OrderHistory,
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
  const { user, dispatchUser, defaultUser } = useContext(UserContext);
  const [resizeListener, sizes] = useResizeAware();
  const classes = useStyles({ showComponent });
  const matchesLG = useMediaQuery<Theme>(theme => theme.breakpoints.down('lg'));
  const matchesMD = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
  const matchesXS = useMediaQuery<Theme>(theme => theme.breakpoints.down('xs'));

  const buttonWidth = matchesXS
    ? `${sizes.width || 0 - 64}px`
    : matchesMD
    ? `${sizes.width || 0 - 160}px`
    : matchesLG
    ? '288px'
    : '352px';
  const buttonHeight = matchesMD ? '22rem' : matchesLG ? '18rem' : '22rem';

  const handleClick = (label: string): void => {
    if (selectedSetting === label) {
      setSelectedSetting('');
    } else {
      setSelectedSetting(label);
    }
  };

  const handleLogout = (): void => {
    dispatchUser(setUser(defaultUser));
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
          height:
            selectedSetting === button.label
              ? matchesMD
                ? '120rem'
                : '60rem'
              : buttonHeight,
          width:
            selectedSetting === button.label ? `${sizes.width}px` : buttonWidth,
          borderRadius: selectedSetting === button.label ? 0 : 25,
          delay: selectedSetting ? 600 : 0,
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
      <animated.div></animated.div>
      <Grid item>
        <Typography
          align='center'
          variant='h4'
          classes={{ root: classes.name }}
        >
          Welcome back, {user.username}
        </Typography>
      </Grid>
      <Grid item>
        <Button onClick={handleLogout}>
          <Typography variant='h5' classes={{ root: classes.logout }}>
            Logout
          </Typography>
        </Button>
      </Grid>
      <Grid
        item
        container
        alignItems='center'
        justifyContent='space-around'
        direction={matchesMD ? 'column' : 'row'}
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
