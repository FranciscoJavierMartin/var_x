import React, { useState, useEffect, useRef } from 'react';
import {
  Grid,
  FormControlLabel,
  Switch,
  makeStyles,
  useTheme,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import clsx from 'clsx';
import Fields from '../shared/Fields';
import Slots from './Slots';
import { EmailPassword } from '../../utils/fieldsData';
import { User } from '../../interfaces/user';

import fingerprint from '../../images/fingerprint.svg';
import NameAdornment from '../../images/NameAdornment';
import PhoneAdornment from '../../images/PhoneAdornment';

const useStyles = makeStyles<
  Theme,
  { isCheckout?: boolean; selectedStep: number; stepNumber: number }
>(theme => ({
  detailsContainer: {
    display: ({ isCheckout, selectedStep, stepNumber }) =>
      isCheckout && selectedStep !== stepNumber ? 'none' : 'flex',
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
    marginTop: ({ isCheckout }) => (isCheckout ? '-2rem' : undefined),
    marginBottom: ({ isCheckout }) => (isCheckout ? '1rem' : '3rem'),
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
  fieldContainerCart: {
    '& > *': {
      marginBottom: '1rem',
    },
  },
  slotsContainer: {
    position: 'absolute',
    bottom: ({ isCheckout }) => (isCheckout ? -8 : 0),
  },
  switchWrapper: {
    marginRight: 4,
  },
  switchLabel: {
    color: theme.palette.common.white,
    fontWeight: 600,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
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

interface DetailsProps {
  user: User;
  edit: boolean;
  setChangesMade: React.Dispatch<React.SetStateAction<boolean>>;
  values: { [key: string]: string };
  setValues: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  billing?: boolean | number;
  setBilling?: React.Dispatch<React.SetStateAction<boolean | number>>;
  slot: number;
  setSlot: React.Dispatch<React.SetStateAction<number>>;
  errors: { [key: string]: boolean };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  isCheckout?: boolean;
  noSlots?: boolean;
  billingValues?: { [key: string]: string };
  setBillingValues?: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
  stepNumber: number;
  selectedStep: number;
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
  billing,
  setBilling,
  noSlots,
  billingValues,
  setBillingValues,
  stepNumber,
  selectedStep,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const isMounted = useRef<boolean>(false);

  const classes = useStyles({ isCheckout, stepNumber, selectedStep });
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
    if (!noSlots || user.username !== 'Guest') {
      if (isCheckout) {
        setValues(user.contactInfo[slot]);
      } else {
        setValues({ ...user.contactInfo[slot], password: '********' });
      }
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

  useEffect(() => {
    if (!noSlots || user.username !== 'Guest') {
      if (!isMounted.current) {
        isMounted.current = true;
      } else {
        if (billing === false) {
          setValues(billingValues!);
        } else {
          setBillingValues && setBillingValues(values);
        }
      }
    } else {
      isMounted.current = false;
    }
  }, [billing]);

  return (
    <Grid
      item
      container
      direction='column'
      lg={isCheckout ? 12 : 6}
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
          alignItems={matchesXS || isCheckout ? 'center' : undefined}
          key={i}
          classes={{
            root: clsx({
              [classes.fieldContainer]: !isCheckout,
              [classes.fieldContainerCart]: isCheckout,
            }),
          }}
          direction={matchesXS || isCheckout ? 'column' : 'row'}
        >
          <Fields
            fields={pair}
            values={billing === slot && !noSlots ? billingValues! : values}
            setValues={
              billing === slot && !noSlots ? setBillingValues! : setValues
            }
            errors={errors}
            setErrors={setErrors}
            isWhite
            disabled={isCheckout ? false : !edit}
            settings={!isCheckout}
          />
        </Grid>
      ))}
      {noSlots ? null : (
        <Grid
          item
          container
          justifyContent={isCheckout ? 'space-between' : undefined}
          classes={{ root: classes.slotsContainer }}
        >
          <Slots slot={slot} setSlot={setSlot} isCheckout={isCheckout} />
          {isCheckout && (
            <Grid item>
              <FormControlLabel
                label='Billing'
                labelPlacement='start'
                control={
                  <Switch
                    checked={billing === slot}
                    onChange={() =>
                      setBilling &&
                      setBilling(prevState =>
                        prevState === slot ? false : slot
                      )
                    }
                    color='secondary'
                  />
                }
                classes={{
                  root: classes.switchWrapper,
                  label: classes.switchLabel,
                }}
              />
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default Details;
