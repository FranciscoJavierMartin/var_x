import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Tabs,
  Tab,
  makeStyles,
  useMediaQuery,
  Theme,
  Hidden,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import search from '../../images/search.svg';
import cart from '../../images/cart.svg';
import account from '../../images/account-header.svg';
import menu from '../../images/menu.svg';

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
  logoText: {
    color: theme.palette.common.offBlack,
  },
  tabs: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  icon: {
    height: '3rem',
    width: '3rem',
  },
}));

const Header: React.FC<HeaderProps> = ({ categories }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const classes = useStyles();
  const matchesMD = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));

  const iOS: boolean = !!(
    typeof window !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  );

  const routes = [
    ...categories,
    { node: { name: 'Contact us', strapiId: 'contact' } },
  ];

  const tabs = (
    <Tabs
      value={0}
      classes={{ indicator: classes.coloredIndicator, root: classes.tabs }}
    >
      {routes.map(route => (
        <Tab key={route.node.strapiId} label={route.node.name} />
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
    >
      <List disablePadding>
        {routes.map(route => (
          <ListItem key={route.node.strapiId} divider button>
            <ListItemText primary={route.node.name} />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );

  return (
    <AppBar color='transparent' elevation={0}>
      <Toolbar>
        <Button>
          <Typography variant='h1'>
            <span className={classes.logoText}>VAR</span> X
          </Typography>
        </Button>
        {matchesMD ? drawer : tabs}
        <IconButton>
          <img src={search} alt='search' />
        </IconButton>
        <IconButton>
          <img src={cart} alt='cart' />
        </IconButton>
        <IconButton onClick={() => (matchesMD ? setIsDrawerOpen(true) : null)}>
          <img
            className={classes.icon}
            src={matchesMD ? menu : account}
            alt={matchesMD ? 'menu' : 'account'}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
