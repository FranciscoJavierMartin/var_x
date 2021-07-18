import React from 'react';
import { Link } from 'gatsby';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Tabs,
  Tab,
  makeStyles,
} from '@material-ui/core';
import search from '../../images/search.svg';
import cart from '../../images/cart.svg';
import account from '../../images/account-header.svg';

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
}));
const Header: React.FC<HeaderProps> = ({ categories }) => {
  const classes = useStyles();

  const routes = [
    ...categories,
    { node: { name: 'Contact us', strapiId: 'contact' } },
  ];

  return (
    <AppBar color='transparent' elevation={0}>
      <Toolbar>
        <Button>
          <Typography variant='h1'>
            <span className={classes.logoText}>VAR</span> X
          </Typography>
        </Button>
        <Tabs
          value={0}
          classes={{ indicator: classes.coloredIndicator, root: classes.tabs }}
        >
          {routes.map(route => (
            <Tab key={route.node.strapiId} label={route.node.name} />
          ))}
        </Tabs>
        <IconButton>
          <img src={search} alt='search' />
        </IconButton>
        <IconButton>
          <img src={cart} alt='cart' />
        </IconButton>
        <IconButton>
          <img src={account} alt='account' />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
