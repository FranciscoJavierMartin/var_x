import React, { useState, useEffect } from 'react';
import {
  Grid,
  makeStyles,
  useTheme,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import Fields from '../shared/Fields';
import Slots from './Slots';
import { EmailPassword } from '../../utils/fieldsData';
import { User } from '../../interfaces/user';

import fingerprint from '../../images/fingerprint.svg';
import NameAdornment from '../../images/NameAdornment';
import PhoneAdornment from '../../images/PhoneAdornment';

const useStyles = makeStyles(theme => ({
  detailsContainer: {
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      borderBottom: `4px solid ${theme.palette.common.white}`,
      height: '30rem',
    },
  },
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
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1rem',
    },
  },
  fieldContainer: {
    marginBottom: '2rem',
    '& > :not(:first-child)': {
      marginLeft: '5rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1rem',
      '& > :not(:first-child)': {
        marginLeft: 0,
        marginTop: '1rem',
      },
    },
  },
  slotsContainer: {
    position: 'absolute',
    bottom: 0,
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

interface DetailsProps {
  user: User;
  edit: boolean;
  setChangesMade: React.Dispatch<React.SetStateAction<boolean>>;
  values: { [key: string]: string };
  setValues: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  slot: number;
  setSlot: React.Dispatch<React.SetStateAction<number>>;
  errors: { [key: string]: boolean };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  isCheckout?: boolean;
}

const Details: React.FC<DetailsProps> = ({
  user,
  edit,
  setChangesMade,
  values,
  setValues,
  slot,
  setSlot,
  errors,
  setErrors,
  isCheckout,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery<Theme>(theme => theme.breakpoints.down('xs'));

  const email_password = EmailPassword(
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

  const fields = isCheckout
    ? [
        {
          name: name_phone.name,
          email: email_password.email,
          phone: name_phone.phone,
        },
      ]
    : [name_phone, email_password];

  useEffect(() => {
    if (isCheckout) {
      setValues(user.contactInfo[slot]);
    } else {
      setValues({ ...user.contactInfo[slot], password: '********' });
    }
  }, [slot]);

  useEffect(() => {
    if (!isCheckout) {
      const changed = Object.keys(user.contactInfo[slot]).some(
        field => values[field] !== (user.contactInfo[slot] as any)[field]
      );

      if (changed) {
        setChangesMade(true);
      }
    }
  }, [values]);

  return (
    <Grid
      item
      container
      direction='column'
      lg={6}
      xs={12}
      justifyContent='center'
      alignItems='center'
      classes={{ root: classes.detailsContainer }}
    >
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
          alignItems={matchesXS ? 'center' : undefined}
          key={i}
          classes={{ root: classes.fieldContainer }}
          direction={matchesXS ? 'column' : 'row'}
        >
          <Fields
            fields={pair}
            values={values}
            setValues={setValues}
            errors={errors}
            setErrors={setErrors}
            isWhite
            disabled={isCheckout ? false : !edit}
            settings
          />
        </Grid>
      ))}
      <Grid item container classes={{ root: classes.slotsContainer }}>
        <Slots slot={slot} setSlot={setSlot} />
      </Grid>
    </Grid>
  );
};

export default Details;
