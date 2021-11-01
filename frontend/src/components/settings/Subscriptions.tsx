import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Chip,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import axios from 'axios';
import { GridColumns } from '@material-ui/data-grid';
import SettingsGrid from './SettingsGrid';
import QtyButton from '../shared/QtyButton';
import { UserContext, FeedbackContext } from '../../contexts';
import { openSnackbar, SnackbarStatus } from '../../contexts/feedback/actions';
import { Subscription } from '../../interfaces/subscription';

import DeleteIcon from '../../images/DeleteIcon';
import pauseIcon from '../../images/pause.svg';

const useStyles = makeStyles(theme => ({
  bold: {
    fontWeight: 600,
  },
  productImage: {
    height: '10rem',
    width: '10rem',
  },
  method: {
    color: theme.palette.common.white,
    textTransform: 'uppercase',
    marginTop: '1rem',
  },
  lineHeight: {
    lineHeight: 1.1,
  },
  deleteWrapper: {
    height: '3rem',
    width: '2.5rem',
  },
  pause: {
    height: '3rem',
    width: '3rem',
  },
  iconButton: {
    '&:hover': {
      background: 'transparent',
    },
  },
}));

interface SubscriptionsProps {
  setSelectedSetting: any;
}

const Subscriptions: React.FC<SubscriptionsProps> = ({
  setSelectedSetting,
}) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const { user } = useContext(UserContext);
  const { dispatchFeedback } = useContext(FeedbackContext);
  const classes = useStyles();

  const columns: GridColumns = [
    {
      field: 'details',
      headerName: 'Details',
      width: 350,
      sortable: false,
      renderCell: ({ value }: any) => (
        <Grid container direction='column'>
          <Grid item>
            <Typography
              variant='body2'
              classes={{ root: clsx(classes.lineHeight, classes.bold) }}
            >
              {`${value.shippingInfo.name}`}
              <br />
              {`${value.shippingAddress.street}`}
              <br />
              {`${value.shippingAddress.city}, ${value.shippingAddress.state} ${value.shippingAddress.zip}`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='h3' classes={{ root: classes.method }}>
              {value.paymentMethod.brand} {value.paymentMethod.last4}
            </Typography>
          </Grid>
        </Grid>
      ),
    },
    {
      field: 'item',
      headerName: 'Item',
      width: 250,
      sortable: false,
      renderCell: ({ value }: any) => (
        <Grid container direction='column' alignItems='center'>
          <Grid item>
            <img
              src={value.variant.images[0].url}
              alt={value.name}
              className={classes.productImage}
            />
          </Grid>
          <Grid item>
            <Typography variant='body2' classes={{ root: classes.bold }}>
              {value.name}
            </Typography>
          </Grid>
        </Grid>
      ),
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 250,
      sortable: false,
      renderCell: ({ value }: any) => (
        <QtyButton
          stock={[{ qty: value.variant.qty }]}
          variants={value.variant}
          selectedVariant={0}
          name={value.name}
          white
          hideCartButton
          round
        />
      ),
    },
    {
      field: 'frequency',
      headerName: 'Frequency',
      width: 250,
      sortable: false,
      renderCell: ({ value }: any) => (
        <Chip
          label={value.split('_').join(' ')}
          classes={{ label: classes.bold }}
        />
      ),
    },
    {
      field: 'next_delivery',
      headerName: 'Next order',
      width: 250,
      renderCell: ({ value }: any) =>
        new Date(value).toLocaleDateString() as any,
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 250,
      renderCell: ({ value }: any) => (
        <Chip
          label={`$${value.toFixed(2)}`}
          classes={{ label: classes.bold }}
        />
      ),
    },
    {
      field: '',
      width: 250,
      sortable: false,
      renderCell: () => (
        <Grid container>
          <Grid item>
            <IconButton classes={{ root: classes.iconButton }}>
              <span className={classes.deleteWrapper}>
                <DeleteIcon />
              </span>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton classes={{ root: classes.iconButton }}>
              <img
                src={pauseIcon}
                alt='pause subscription'
                className={classes.pause}
              />
            </IconButton>
          </Grid>
        </Grid>
      ),
    },
  ];

  const rows = subscriptions.map(
    ({
      shippingInfo,
      shippingAddress,
      billingInfo,
      billingAddress,
      paymentMethod,
      name,
      variant,
      quantity,
      frequency,
      next_delivery,
      id,
    }) => ({
      details: {
        shippingInfo,
        shippingAddress,
        billingInfo,
        billingAddress,
        paymentMethod,
      },
      item: { name, variant },
      quantity: { quantity, variant, name },
      frequency,
      next_delivery,
      total: variant.price * 1.21,
      id,
    })
  );

  useEffect(() => {
    axios
      .get(`${process.env.GATSBY_STRAPI_URL}/subscriptions/me`, {
        headers: { Authorization: `Bearer ${user.jwt}` },
      })
      .then(reponse => setSubscriptions(reponse.data))
      .catch(error => {
        console.log(error);
        dispatchFeedback(
          openSnackbar(
            SnackbarStatus.Error,
            'There was a problem retrieving your subscriptions. Please try again.'
          )
        );
      });
  }, []);

  return (
    <SettingsGrid
      setSelectedSetting={setSelectedSetting}
      rows={rows}
      columns={columns}
      rowsPerPage={3}
    />
  );
};

export default Subscriptions;
