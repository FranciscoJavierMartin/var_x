import React, { useState, useEffect, useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Details from './Details';
import Payments from './Payments';
import Location from './Location';
import Edit from './Edit';
import { CartContext, UserContext } from '../../contexts';

const useStyles = makeStyles(theme => ({
  sectionContainer: {
    height: '50%',
  },
  bottomRow: {
    borderTop: `4px solid ${theme.palette.common.white}`,
  },
}));

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PK!);

interface SettingsProps {
  setSelectedSetting: React.Dispatch<React.SetStateAction<string>>;
}

const Settings: React.FC<SettingsProps> = ({ setSelectedSetting }) => {
  const { user, dispatchUser } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [edit, setEdit] = useState<boolean>(false);
  const [changesMade, setChangesMade] = useState<boolean>(false);

  const [detailValues, setDetailValues] = useState<{ [key: string]: string }>({
    name: '',
    phone: '',
    email: '',
    password: '********',
  });
  const [detailErrors, setDetailErrors] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [detailSlot, setDetailSlot] = useState<number>(0);

  const [locationValues, setLocationValues] = useState<{
    [key: string]: string;
  }>({
    street: '',
    zip: '',
    city: '',
    state: '',
  });
  const [locationErrors, setLocationErrors] = useState<{
    [key: string]: boolean;
  }>({});
  const [locationSlot, setLocationSlot] = useState<number>(0);
  const [billingSlot, setBillingSlot] = useState<number>(0);

  const classes = useStyles();

  const allErrors = { ...detailErrors, ...locationErrors };
  const isError = Object.values(allErrors).some(error => error);
  const hasSubcriptionCart: boolean = cart.cart.some(item => item.subscription);
  const hasSubcriptionActive: boolean =
    !!user.subscriptions && user.subscriptions?.length > 0;

  useEffect(() => {
    setDetailErrors({});
  }, [detailSlot]);

  useEffect(() => {
    setLocationErrors({});
  }, [locationSlot]);

  return (
    <>
      <Grid container classes={{ root: classes.sectionContainer }}>
        <Details
          user={user}
          edit={edit}
          setChangesMade={setChangesMade}
          values={detailValues}
          setValues={setDetailValues}
          slot={detailSlot}
          setSlot={setDetailSlot}
          errors={detailErrors}
          setErrors={setDetailErrors}
        />
        <Elements stripe={stripePromise}>
          <Payments
            user={user}
            slot={billingSlot}
            setSlot={setBillingSlot}
            hasSubcriptionActive={hasSubcriptionActive}
            hasSubcriptionCart={hasSubcriptionCart}
          />
        </Elements>
      </Grid>
      <Grid
        container
        classes={{ root: clsx(classes.bottomRow, classes.sectionContainer) }}
      >
        <Location
          user={user}
          edit={edit}
          setChangesMade={setChangesMade}
          values={locationValues}
          setValues={setLocationValues}
          slot={locationSlot}
          setSlot={setLocationSlot}
          errors={locationErrors}
          setErrors={setLocationErrors}
        />
        <Edit
          user={user}
          dispatchUser={dispatchUser}
          edit={edit}
          setEdit={setEdit}
          changesMade={changesMade}
          setSelectedSetting={setSelectedSetting}
          details={detailValues}
          locations={locationValues}
          detailSlot={detailSlot}
          locationSlot={locationSlot}
          isError={isError}
        />
      </Grid>
    </>
  );
};

export default Settings;
