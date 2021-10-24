import React, { useState, useEffect, useContext } from 'react';
import { Grid, Chip, IconButton, makeStyles } from '@material-ui/core';
import { GridColumns, GridRowsProp, GridRowId } from '@material-ui/data-grid';
import axios from 'axios';
import OrderDetails from './OrderDetails';
import SettingsGrid from './SettingsGrid';
import { UserContext } from '../../contexts';
import { Order } from '../../interfaces/order';

import DetailsIcon from '../../images/details.svg';

const useStyles = makeStyles(theme => ({
  item: {
    height: '100%',
    width: '100%',
  },
  chipLabel: {
    fontWeight: 600,
  },
}));

interface OrderHistoryProps {
  setSelectedSetting: React.Dispatch<React.SetStateAction<string>>;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ setSelectedSetting }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [open, setOpen] = useState<GridRowId | null>(null);
  const { user } = useContext(UserContext);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`${process.env.GATSBY_STRAPI_URL}/orders/history`, {
        headers: { Authorization: `Bearer ${user.jwt}` },
      })
      .then(response => {
        setOrders(response.data.orders);
      })
      .catch(console.log);
  }, []);

  const columns: GridColumns = [
    { field: 'shipping', headerName: 'Shipping', width: 350, sortable: false },
    { field: 'order', headerName: 'Order', width: 250 },
    {
      field: 'status',
      headerName: 'Status',
      width: 250,
      renderCell: ({ value }) => (
        <Chip label={value} classes={{ label: classes.chipLabel }} />
      ),
    },
    { field: 'date', headerName: 'Date', width: 250, type: 'date' },
    {
      field: 'total',
      headerName: 'Total',
      width: 250,
      renderCell: ({ value }) => (
        <Chip label={`$${value}`} classes={{ label: classes.chipLabel }} />
      ),
    },
    {
      field: '',
      width: 350,
      sortable: false,
      disableColumnMenu: true,
      renderCell: () => (
        <IconButton>
          <img src={DetailsIcon} alt='order details' />
        </IconButton>
      ),
    },
  ];

  const rows: GridRowsProp = orders.map(item => ({
    shipping: `${item.shippingInfo.name}\n${item.shippingAddress.street}\n${item.shippingAddress.city}, ${item.shippingAddress.state} ${item.shippingAddress.zip}`,
    order: `#${item.id
      .toString()
      .slice(item.id.toString().length - 10, item.id.toString().length)
      .toUpperCase()}`,
    status: item.status,
    date: `${item.created_at.toString().split('-')[2].split('T')[0]}/${
      item.created_at.toString().split('-')[0]
    }`,
    total: item.total,
    id: item.id,
  }));

  return (
    <Grid item container classes={{ root: classes.item }}>
      <SettingsGrid
        setOpen={setOpen}
        setSelectedSetting={setSelectedSetting}
        rows={rows}
        columns={columns}
      />
      <OrderDetails orders={orders} open={open} setOpen={setOpen} />
    </Grid>
  );
};

export default OrderHistory;
