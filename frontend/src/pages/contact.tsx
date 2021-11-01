import React, { useState, useContext } from 'react';
import { Link } from 'gatsby';
import {
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  makeStyles,
  useTheme,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import clsx from 'clsx';
import Layout from '../components/ui/Layout';
import Seo from '../components/ui/Seo';
import validate from '../utils/validate';
import { FeedbackContext } from '../contexts';
import { openSnackbar, SnackbarStatus } from '../contexts/feedback/actions';

import address from '../images/address.svg';
import PhoneAdornment from '../images/PhoneAdornment';
import Email from '../images/EmailAdornment';
import send from '../images/send.svg';
import nameAdornment from '../images/name-adornment.svg';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: '45rem',
    backgroundColor: theme.palette.primary.main,
    marginBottom: '10rem',
    [theme.breakpoints.down('md')]: {
      marginTop: '8rem',
      height: '90rem',
    },
  },
  formContainer: {
    height: '100%',
  },
  formWrapper: {
    height: '100%',
    [theme.breakpoints.down('md')]: {
      height: '50%',
      marginTop: '-8rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  blockContainer: {
    backgroundColor: theme.palette.secondary.main,
    height: '8rem',
    width: '40rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '30rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
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
    [theme.breakpoints.down('xs')]: {
      height: '15.25rem',
    },
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
    [theme.breakpoints.down('xs')]: {
      height: '5rem',
      width: '6rem',
    },
  },
  textField: {
    width: '30rem',
    [theme.breakpoints.down('sm')]: {
      width: '20rem',
    },
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
    width: 22,
    marginBottom: 10,
  },
  phoneAdornment: {
    width: 25.173,
    height: 25.122,
  },
  multiline: {
    border: `2px solid ${theme.palette.common.white}`,
    borderRadius: 10,
    padding: '1rem',
  },
  multilineError: {
    border: `2px solid ${theme.palette.error.main}`,
  },
  buttonDisabled: {
    backgroundColor: theme.palette.grey[500],
  },
  sendMessage: {
    [theme.breakpoints.down('xs')]: {
      height: '2.5rem',
    },
  },
  '@global': {
    '.MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before':
      {
        borderBottom: `2px solid ${theme.palette.common.white}`,
      },
    '.MuiInput-underline:after': {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
}));

const encode = (data: any) =>
  Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('/');

const ContactPage: React.FC = () => {
  const [values, setValues] = useState<{ [key: string]: string }>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const { dispatchFeedback } = useContext(FeedbackContext);
  const classes = useStyles();
  const matchesMD = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
  const matchesXS = useMediaQuery<Theme>(theme => theme.breakpoints.down('xs'));
  const theme = useTheme();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        name: values.name,
        phone: values.phone,
        email: values.email,
        message: values.message,
      }),
    })
      .then(() => {
        setValues({ name: '', phone: '', email: '', message: '' });
        dispatchFeedback(
          openSnackbar(SnackbarStatus.Success, 'Message sent successfully')
        );
      })
      .catch(() => {
        dispatchFeedback(
          openSnackbar(
            SnackbarStatus.Error,
            'There was a problem sending your message. Please try again'
          )
        );
      });
  };

  const fields: {
    [key: string]: {
      helperText: string;
      placeholder: string;
      adornment?: JSX.Element;
      inputClasses?: { [key: string]: string };
    };
  } = {
    name: {
      helperText: 'You must enter a name',
      placeholder: 'Name',
      adornment: <img src={nameAdornment} alt='name icon' />,
    },
    email: {
      helperText: 'You must enter a email',
      placeholder: 'Email',
      adornment: (
        <div className={classes.emailAdornment}>
          <Email color={theme.palette.secondary.main} />
        </div>
      ),
    },
    phone: {
      helperText: 'You must enter a phone',
      placeholder: 'Phone',
      adornment: (
        <div className={classes.phoneAdornment}>
          <PhoneAdornment color={theme.palette.secondary.main} />
        </div>
      ),
    },
    message: {
      helperText: 'You must enter a message',
      placeholder: 'Message',
      inputClasses: {
        multiline: classes.multiline,
        error: classes.multilineError,
      },
    },
  };

  const info = [
    {
      label: (
        <span>
          1234 S Example St {matchesXS ? <br /> : null}Wichita, KS 67111
        </span>
      ),
      icon: <img src={address} alt='address' className={classes.contactIcon} />,
    },
    {
      label: '(555) 555-5555',
      icon: (
        <div className={classes.contactIcon}>
          <PhoneAdornment />
        </div>
      ),
    },
    {
      label: 'contact@var-x.com',
      icon: (
        <div className={classes.contactEmailIcon}>
          <Email color='#fff' />
        </div>
      ),
    },
  ];

  const disabled =
    Object.keys(errors).length !== 4 ||
    Object.keys(errors).some(error => errors[error]);

  return (
    <Layout>
      <Seo
        title='Contact Us'
        description='Send us a message and learn more about the high quality clothing standards at VAR-X'
      />
      <Grid
        container
        justifyContent='space-around'
        alignItems='center'
        classes={{ root: classes.mainContainer }}
        direction={matchesMD ? 'column' : 'row'}
      >
        <Grid
          item
          classes={{ root: classes.formWrapper }}
          component='form'
          name='contact'
          method='POST'
          data-netlify='true'
        >
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
                {Object.entries(fields).map(([field, value]) => {
                  const validateHelper = (
                    event: React.ChangeEvent<
                      HTMLInputElement | HTMLTextAreaElement
                    >
                  ) => {
                    return validate({ [field]: event.target.value });
                  };
                  return (
                    <Grid
                      key={field}
                      item
                      classes={{
                        root:
                          field === 'message'
                            ? classes.multilineContainer
                            : classes.fieldContainer,
                      }}
                    >
                      <TextField
                        name={field}
                        value={values[field]}
                        onChange={e => {
                          const valid = validateHelper(e);
                          if (errors[field] || valid[field]) {
                            setErrors(prevState => ({
                              ...prevState,
                              [field]: !valid[field],
                            }));
                          }
                          setValues(prevState => ({
                            ...prevState,
                            [field]: e.target.value,
                          }));
                        }}
                        onBlur={e => {
                          const valid = validateHelper(e);
                          setErrors(prevState => ({
                            ...prevState,
                            [field]: !valid[field],
                          }));
                        }}
                        error={errors[field]}
                        helperText={errors[field] && value.helperText}
                        placeholder={value.placeholder}
                        classes={{ root: classes.textField }}
                        multiline={field === 'message'}
                        rows={field === 'message' ? 8 : undefined}
                        InputProps={{
                          classes: {
                            input: classes.input,
                            ...fields[field].inputClasses,
                          },
                          disableUnderline: field === 'message',
                          startAdornment:
                            field !== 'message' ? (
                              <InputAdornment position='start'>
                                {fields[field].adornment}
                              </InputAdornment>
                            ) : null,
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid
              item
              type='submit'
              onClick={handleSubmit}
              component={Button}
              disabled={disabled}
              classes={{
                root: clsx(classes.buttonContainer, classes.blockContainer, {
                  [classes.buttonDisabled]: disabled,
                }),
              }}
            >
              <Typography variant='h4' classes={{ root: classes.sendMessage }}>
                Send message
              </Typography>
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
            {info.map((section, i) => (
              <Grid
                key={i}
                item
                container
                alignItems='center'
                classes={{ root: i === 1 ? classes.middleInfo : undefined }}
              >
                <Grid item classes={{ root: classes.iconContainer }}>
                  {section.icon}
                </Grid>
                <Grid item>
                  <Typography
                    variant='h2'
                    classes={{ root: classes.contactInfo }}
                  >
                    {section.label}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ContactPage;
