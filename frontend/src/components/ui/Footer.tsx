import React from 'react';
import { Link } from 'gatsby';
import { Grid, Typography, makeStyles, IconButton } from '@material-ui/core';

import facebook from '../../images/facebook.svg';
import twitter from '../../images/twitter.svg';
import instagram from '../../images/instagram.svg';

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    padding: '2rem',
  },
  link: {
    color: theme.palette.common.white,
    fontSize: '1.2rem',
  },
  linkColumn: {
    width: '20rem',
  },
  spacer: {
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  linkContainer: {
    [theme.breakpoints.down('md')]: {
      marginBottom: '3rem',
    },
  },
  icon: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  '@global': {
    body: {
      margin: 0,
    },
    a: {
      textDecoration: 'none',
    },
  },
}));

const socialMedia = [
  {
    icon: facebook,
    alt: 'facebook',
    link: 'https://facebook.com',
  },
  {
    icon: twitter,
    alt: 'twitter',
    link: 'https://twitter.com',
  },
  {
    icon: instagram,
    alt: 'instagram',
    link: 'https://instagram.com',
  },
];

const routes: {
  [key: string]: { label: string; href?: string; link?: string }[];
} = {
  'Contact Us': [
    { label: '(555) 555-5555', href: 'tel:(555) 555-5555' },
    { label: 'contact@var-x.com', href: 'mailto:contact@var-x.com' },
  ],
  'Customer Service': [
    { label: 'Contact Us', link: '/contact' },
    { label: 'My Account', link: '/account' },
  ],
  Information: [
    { label: 'Privacy Policy', link: '/privacy-policy' },
    { label: 'Terms and Conditions', link: '/terms-conditions' },
  ],
};

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid container justifyContent='space-between'>
        <Grid item classes={{ root: classes.linkContainer }}>
          <Grid container>
            {Object.entries(routes).map(([category, row]) => (
              <Grid
                key={category}
                item
                container
                direction='column'
                classes={{ root: classes.linkColumn }}
              >
                <Grid item>
                  <Typography variant='h5'>{category}</Typography>
                </Grid>
                {row.map(route => (
                  <Grid item key={route.label}>
                    <Typography
                      component={route['link'] ? Link : 'a'}
                      to={route.link}
                      href={route.href}
                      variant='body1'
                      classes={{ body1: classes.link }}
                    >
                      {route.label}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction='column' alignItems='center'>
            {socialMedia.map(social => (
              <Grid item key={social.alt}>
                <IconButton
                  classes={{ root: classes.icon }}
                  component={'a'}
                  disableRipple
                  href={social.link}
                >
                  <img src={social.icon} alt={social.alt} />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
