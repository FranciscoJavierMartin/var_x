import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Chip,
  IconButton,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import {
  DataGrid,
  GridColumns,
  GridRowsProp,
  GridRowParams,
  GridRowId,
} from '@material-ui/data-grid';
import axios from 'axios';
import OrderDetails from './OrderDetails';
import { UserContext } from '../../contexts';
import { Order } from '../../interfaces/order';

import BackwardsIcon from '../../images/BackwardsOutline';
import DetailsIcon from '../../images/details.svg';

const useStyles = makeStyles(theme => ({
  header: {
    height: '8rem',
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
  },
  item: {
    height: '100%',
    width: '100%',
  },
  chipLabel: {
    fontWeight: 600,
  },
  icon: {
    height: '4rem',
    width: '4rem',
  },
  '@global': {
    '.MuiDataGrid-root .MuiDataGrid-colCellTitle': {
      fontWeight: 600,
    },
    '.MuiDataGrid-root .MuiDataGrid-columnSeparator': {
      display: 'none',
    },
    '.MuiDataGrid-root .MuiDataGrid-colCellTitleContainer': {
      'justify-content': 'center',
    },
    '.MuiDataGrid-root .MuiDataGrid-colCellMoving': {
      'background-color': 'transparent',
    },
    '.MuiDataGrid-root .MuiDataGrid-cell': {
      'white-space': 'pre-wrap',
      'max-height': '100% !important',
      'line-height': 'initial !important',
      padding: '1rem',
      'padding-right': 'calc(1rem + 26px)',
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      'font-weight': 600,
      'border-bottom': `2px solid ${theme.palette.common.white}`,
    },
    '.MuiDataGrid-root .MuiDataGrid-row': {
      'max-height': '100% !important',
    },
    '.MuiDataGrid-root .MuiDataGrid-footer': {
      'margin-top': '-11rem',
    },
    '.MuiTablePagination-caption': {
      color: theme.palette.common.white,
    },
    '.MuiSvgIcon-root': {
      fill: theme.palette.common.white,
    },
    '.MuiDataGrid-root .MuiDataGrid-columnsContainer': {
      'background-color': theme.palette.secondary.main,
      border: 'none',
    },
    '.MuiDataGrid-root': {
      border: 'none',
    },
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
  const theme = useTheme();

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
    { field: 'shipping', headerName: 'Shipping', flex: 1, sortable: false },
    { field: 'order', headerName: 'Order', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: ({ value }) => (
        <Chip label={value} classes={{ label: classes.chipLabel }} />
      ),
    },
    { field: 'date', headerName: 'Date', flex: 1, type: 'date' },
    {
      field: 'total',
      headerName: 'Total',
      flex: 1,
      renderCell: ({ value }) => (
        <Chip label={`$${value}`} classes={{ label: classes.chipLabel }} />
      ),
    },
    {
      field: '',
      flex: 1.5,
      sortable: false,
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
      <Grid item classes={{ root: classes.header }}>
        <IconButton onClick={() => setSelectedSetting('')}>
          <div className={classes.icon}>
            <BackwardsIcon color={theme.palette.common.white} />
          </div>
        </IconButton>
      </Grid>
      <DataGrid
        onRowClick={(event: GridRowParams) => setOpen(event.row.id)}
        rows={rows}
        columns={columns}
        pageSize={5}
        hideFooterSelectedRowCount
      />
      <OrderDetails orders={orders} open={open} setOpen={setOpen} />
    </Grid>
  );
};

export default OrderHistory;
