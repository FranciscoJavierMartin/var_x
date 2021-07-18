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

const Header: React.FC = () => {
  const classes = useStyles();

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
          <Tab label='Hats' />
          <Tab label='Hoodies' />
          <Tab label='Shirts' />
          <Tab label='Contact us' />
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
