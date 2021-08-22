import React, { useState } from 'react';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import Fields from '../shared/Fields';

import fingerprint from '../../images/fingerprint.svg';
import nameAdornment from '../../images/name-adornment.svg';
import PhoneAdornment from '../../images/PhoneAdornment';
import { EmailPassword } from '../../utils/fieldsData';

const useStyles = makeStyles(theme => ({
  phoneAdornment: {
    height: 25.122,
    width: 25.173,
  },
  visibleIcon: {
    padding: 0,
  },
  emailAdornment: {
    height: 17,
    width: 22,
    marginBottom: 10,
  },
  icon: {
    marginBottom: '3rem',
  },
  fieldContainer: {
    '& > :not(:first-child)': {
      marginLeft: '5rem',
    },
  },
  slot: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 25,
    width: '2.5rem',
    height: '2.5rem',
    minWidth: 0,
    border: `0.15rem solid ${theme.palette.secondary.main}`,
    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },
  },
  slotWrapper: {
    marginLeft: '2rem',
    '& > :not(:first-child)': {
      marginLeft: '-0.5rem',
    },
  },
  slotText: {
    color: theme.palette.secondary.main,
    marginLeft: '-0.25rem',
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

interface DetailsProps {}

const Details: React.FC<DetailsProps> = ({}) => {
  const [values, setValues] = useState<{ [key: string]: string }>({
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const classes = useStyles();

  const email_password = EmailPassword(
    classes,
    false,
    false,
    isVisible,
    setIsVisible
  );

  const name_phone = {
    name: {
      helperText: 'You must enter a name',
      placeholder: 'Name',
      startAdornment: <img src={nameAdornment} alt='name' />,
    },
    phone: {
      helperText: 'Invalid',
      placeholder: 'Phone',
      startAdornment: (
        <div className={classes.phoneAdornment}>
          <PhoneAdornment />
        </div>
      ),
    },
  };

  const fields = [name_phone, email_password];

  return (
    <Grid item container direction='column' xs={6} alignItems='center'>
      <Grid item>
        <img
          src={fingerprint}
          alt='details settings'
          className={classes.icon}
        />
      </Grid>
      {fields.map((pair, i) => (
        <Grid
          container
          justifyContent='center'
          key={i}
          classes={{ root: classes.fieldContainer }}
        >
          <Fields
            fields={pair}
            values={values}
            setValues={setValues}
            errors={errors}
            setErrors={setErrors}
          />
        </Grid>
      ))}
      <Grid container>
        <Grid item classes={{ root: classes.slotWrapper }}>
          {[1, 2, 3].map(slot => (
            <Button classes={{ root: classes.slot }} key={slot}>
              <Typography variant='h5' classes={{ root: classes.slotText }}>
                {slot}
              </Typography>
            </Button>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Details;
