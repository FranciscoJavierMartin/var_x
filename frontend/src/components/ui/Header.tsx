import React, { useContext, useState } from 'react';
import { Link } from 'gatsby';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Tabs,
  Tab,
  Badge,
  makeStyles,
  useMediaQuery,
  Theme,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { CartContext } from '../../contexts';

import search from '../../images/search.svg';
import cartIcon from '../../images/cart.svg';
import account from '../../images/account-header.svg';
import menu from '../../images/menu.svg';
import { calculateNumberOfItemsCart } from '../../utils/cart';

interface HeaderProps {
  categories: {
    node: {
      name: string;
      strapiId: string;
    };
  }[];
}

const useStyles = makeStyles(theme => ({
  coloredIndicator: {
    backgroundColor: theme.palette.common.white,
  },
  logoContainer: {
    [theme.breakpoints.down('md')]: {
      marginRight: 'auto',
    },
  },
  logo: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '3rem',
    },
  },
  logoText: {
    color: theme.palette.common.offBlack,
  },
  tab: {
    ...theme.typography.body1,
    fontWeight: 500,
  },
  tabs: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  icon: {
    height: '3rem',
    width: '3rem',
    [theme.breakpoints.down('xs')]: {
      height: '2rem',
      width: '2rem',
    },
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
  },
  listItemText: {
    color: theme.palette.common.white,
  },
  badge: {
    fontSize: '1rem',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.75rem',
      height: '1.1rem',
      width: '1.1rem',
      minWidth: 0,
    },
  },
}));

const Header: React.FC<HeaderProps> = ({ categories }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const { cart } = useContext(CartContext);
  const classes = useStyles();
  const matchesMD = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));

  const iOS: boolean = !!(
    typeof window !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  );

  const activeIndex = (): number | boolean => {
    const pathname =
      typeof window !== 'undefined'
        ? `/${window.location.pathname.split('/')[1]}`
        : '';

    const found = routes.findIndex(
      ({ node: { name, link } }) =>
        (link || `/${name.toLowerCase()}`) === pathname
    );

    return found === -1 ? false : found;
  };

  const routes = [
    ...categories,
    { node: { name: 'Contact us', strapiId: 'contact', link: '/contact' } },
  ];

  const tabs = (
    <Tabs
      value={activeIndex()}
      classes={{ indicator: classes.coloredIndicator, root: classes.tabs }}
    >
      {routes.map(route => (
        <Tab
          component={Link}
          to={route.node.link || `/${route.node.name.toLowerCase()}`}
          classes={{ root: classes.tab }}
          key={route.node.strapiId}
          label={route.node.name}
        />
      ))}
    </Tabs>
  );

  const drawer = (
    <SwipeableDrawer
      open={isDrawerOpen}
      onOpen={() => setIsDrawerOpen(true)}
      onClose={() => setIsDrawerOpen(false)}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      classes={{ paper: classes.drawer }}
    >
      <List disablePadding>
        {routes.map((route, index) => (
          <ListItem
            selected={activeIndex() === index}
            component={Link}
            to={route.node.link || `/${route.node.name.toLowerCase()}`}
            key={route.node.strapiId}
            divider
            button
          >
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary={route.node.name}
            />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );

  const actions = [
    {
      icon: search,
      alt: 'search',
      visible: true,
      onClick: () => {},
    },
    {
      icon: cartIcon,
      alt: 'cart',
      visible: true,
      link: '/cart',
    },
    {
      icon: account,
      alt: 'account',
      visible: !matchesMD,
      link: '/account',
    },
    {
      icon: menu,
      alt: 'menu',
      visible: matchesMD,
      onClick: () => setIsDrawerOpen(true),
    },
  ];

  return (
    <AppBar color='transparent' elevation={0} position='static'>
      <Toolbar disableGutters>
        <Button
          component={Link}
          to='/'
          classes={{ root: classes.logoContainer }}
        >
          <Typography variant='h1' classes={{ root: classes.logo }}>
            <span className={classes.logoText}>VAR</span> X
          </Typography>
        </Button>
        {matchesMD ? drawer : tabs}
        {actions.map(
          action =>
            action.visible && (
              <IconButton
                key={action.alt}
                component={action.onClick ? undefined : Link}
                to={action.onClick ? undefined : action.link}
                onClick={action.onClick}
              >
                {action.alt === 'cart' ? (
                  <Badge
                    overlap='circular'
                    badgeContent={calculateNumberOfItemsCart(cart.cart)}
                    classes={{ badge: classes.badge }}
                  >
                    <img
                      src={action.icon}
                      alt={action.alt}
                      className={classes.icon}
                    />
                  </Badge>
                ) : (
                  <img
                    src={action.icon}
                    alt={action.alt}
                    className={classes.icon}
                  />
                )}
              </IconButton>
            )
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
