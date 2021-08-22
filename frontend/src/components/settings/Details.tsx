import React, { useState } from 'react';
import { Grid, makeStyles, useTheme } from '@material-ui/core';
import Fields from '../shared/Fields';
import Slots from './Slots';
import { EmailPassword } from '../../utils/fieldsData';

import fingerprint from '../../images/fingerprint.svg';
import NameAdornment from '../../images/NameAdornment';
import PhoneAdornment from '../../images/PhoneAdornment';

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
    marginBottom: '3rem',
    '& > :not(:first-child)': {
      marginLeft: '5rem',
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
  const theme = useTheme();

  const email_password = EmailPassword(
    classes,
    false,
    false,
    isVisible,
    setIsVisible,
    true
  );

  const name_phone = {
    name: {
      helperText: 'You must enter a name',
      placeholder: 'Name',
      startAdornment: <NameAdornment color={theme.palette.common.white} />,
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
            isWhite
          />
        </Grid>
      ))}
      <Grid container>
        <Slots />
      </Grid>
    </Grid>
  );
};

export default Details;
