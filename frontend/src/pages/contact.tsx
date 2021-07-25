import React, { useState } from 'react';
import { Link } from 'gatsby';
import {
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import Layout from '../components/ui/Layout';

import address from '../images/address.svg';
import PhoneAdornment from '../images/PhoneAdornment';
import Email from '../images/EmailAdornment';
import send from '../images/send.svg';
import nameAdornment from '../images/name-adornment.svg';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: '40rem',
    backgroundColor: theme.palette.primary.main,
    marginBottom: '10rem',
  },
  formContainer: {
    height: '100%',
  },
  formWrapper: {
    height: '100%',
  },
  blockContainer: {
    backgroundColor: theme.palette.secondary.main,
    height: '8rem',
    width: '40rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: '-4rem',
  },
  buttonContainer: {
    marginBottom: '-4rem',
    textTransform: 'none',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  sendIcon: {
    marginLeft: '2rem',
  },
  contactInfo: {
    fontSize: '1.5rem',
    marginLeft: '1rem',
  },
  contactIcon: {
    height: '3rem',
    width: '3rem',
    marginRight: '2rem',
  },
  contactEmailIcon: {
    height: '2.5rem',
    width: '3rem',
    marginRight: '2rem',
  },
  infoContainer: {
    height: '21.25rem',
  },
  middleInfo: {
    borderTop: `2px solid ${theme.palette.common.white}`,
    borderBottom: `2px solid ${theme.palette.common.white}`,
  },
  iconContainer: {
    borderRight: `2px solid ${theme.palette.common.white}`,
    height: '7rem',
    width: '8rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: {
    width: '30rem',
  },
  input: {
    color: theme.palette.common.white,
  },
  fieldContainer: {
    marginBottom: '1rem',
  },
  multilineContainer: {
    marginTop: '1rem',
  },
  emailAdornment: {
    height: 17,
    width: 17,
    marginBottom: 10,
  },
  phoneAdornment: {
    width: 25.173,
    height: 25.122,
  },
  '@global': {
    '.MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before':
      {
        borderBottom: `2px solid ${theme.palette.common.white}`,
      },
    '.MuiInput-underline:after': {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
    '.MuiInput-multiline': {
      border: `2px solid ${theme.palette.common.white}`,
      borderRadius: 10,
      padding: '1rem',
    },
  },
}));

const ContactPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const classes = useStyles();
  const theme = useTheme();

  return (
    <Layout>
      <Grid
        container
        justifyContent='space-around'
        alignItems='center'
        classes={{ root: classes.mainContainer }}
      >
        <Grid item classes={{ root: classes.formWrapper }}>
          <Grid
            container
            direction='column'
            justifyContent='space-between'
            alignItems='center'
            classes={{ root: classes.formContainer }}
          >
            <Grid
              item
              classes={{
                root: clsx(classes.titleContainer, classes.blockContainer),
              }}
            >
              <Typography variant='h4'>Contact Us</Typography>
            </Grid>
            <Grid item>
              <Grid container direction='column'>
                <Grid item classes={{ root: classes.fieldContainer }}>
                  <TextField
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Name'
                    classes={{ root: classes.textField }}
                    InputProps={{
                      classes: { input: classes.input },
                      startAdornment: (
                        <InputAdornment position='start'>
                          <img src={nameAdornment} alt='name icon' />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item classes={{ root: classes.fieldContainer }}>
                  <TextField
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Email'
                    classes={{ root: classes.textField }}
                    InputProps={{
                      classes: { input: classes.input },
                      startAdornment: (
                        <InputAdornment position='start'>
                          <div className={classes.emailAdornment}>
                            <Email color={theme.palette.secondary.main} />
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item classes={{ root: classes.fieldContainer }}>
                  <TextField
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    placeholder='Phone'
                    classes={{ root: classes.textField }}
                    InputProps={{
                      classes: { input: classes.input },
                      startAdornment: (
                        <InputAdornment position='start'>
                          <div className={classes.phoneAdornment}>
                            <PhoneAdornment
                              color={theme.palette.secondary.main}
                            />
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item classes={{ root: classes.multilineContainer }}>
                  <TextField
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder='Message'
                    multiline
                    rows={8}
                    classes={{ root: classes.textField }}
                    InputProps={{
                      disableUnderline: true,
                      classes: { input: classes.input },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              component={Button}
              classes={{
                root: clsx(classes.buttonContainer, classes.blockContainer),
              }}
            >
              <Typography variant='h4'>Send message</Typography>
              <img src={send} alt='Send message' className={classes.sendIcon} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction='column'
            justifyContent='space-between'
            classes={{ root: classes.infoContainer }}
          >
            <Grid item container alignItems='center'>
              <Grid item classes={{ root: classes.iconContainer }}>
                <img
                  src={address}
                  alt='address'
                  className={classes.contactIcon}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant='h2'
                  classes={{ root: classes.contactInfo }}
                >
                  1234 S Example St Wichita, KS 67111
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              alignItems='center'
              classes={{ root: classes.middleInfo }}
            >
              <Grid item classes={{ root: classes.iconContainer }}>
                <div className={classes.contactIcon}>
                  <PhoneAdornment />
                </div>
              </Grid>
              <Grid item>
                <Typography
                  variant='h2'
                  classes={{ root: classes.contactInfo }}
                >
                  (555) 555-5555
                </Typography>
              </Grid>
            </Grid>
            <Grid item container alignItems='center'>
              <Grid item classes={{ root: classes.iconContainer }}>
                <div className={classes.contactEmailIcon}>
                  <Email color='#fff' />
                </div>
              </Grid>
              <Grid item>
                <Typography
                  variant='h2'
                  classes={{ root: classes.contactInfo }}
                >
                  contact@var-x.com
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ContactPage;
