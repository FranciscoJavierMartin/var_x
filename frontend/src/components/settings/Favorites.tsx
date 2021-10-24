import React, { useContext, useEffect, useState } from 'react';
import {
  Grid,
  IconButton,
  Chip,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { DataGrid, GridColumns, GridRowsProp } from '@material-ui/data-grid';
import axios from 'axios';
import Sizes from '../shared/Sizes';
import Swatches from '../shared/Swatches';
import QtyButton from '../shared/QtyButton';
import { FeedbackContext, UserContext } from '../../contexts';
import { openSnackbar, SnackbarStatus } from '../../contexts/feedback/actions';
import { UserFavorite } from '../../interfaces/favorites';

import DeleteIcon from '../../images/DeleteIcon';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    width: '100%',
  },
  image: {
    height: '10rem',
    width: '10rem',
  },
  name: {
    color: '#fff',
  },
  chipRoot: {
    height: '3rem',
    width: '10rem',
    borderRadius: 50,
  },
  deleteWrapper: {
    height: '2rem',
    width: '2rem',
  },
}));

interface FavoritesProps {}

const Favorites: React.FC<FavoritesProps> = ({}) => {
  const [products, setProducts] = useState<UserFavorite[]>([]);
  const { user } = useContext(UserContext);
  const { dispatchFeedback } = useContext(FeedbackContext);
  const classes = useStyles();

  const columns: GridColumns = [
    {
      field: 'item',
      headerName: 'Item',
      width: 250,
      renderCell: ({ value }) => (
        <Grid container direction='column'>
          <Grid item>
            <img
              src={`${process.env.GATSBY_STRAPI_URL}${value.image}`}
              alt={value.name}
              className={classes.image}
            />
          </Grid>
          <Grid item>
            <Typography variant='h3' classes={{ root: classes.name }}>
              {value.name}
            </Typography>
          </Grid>
        </Grid>
      ),
    },
    {
      field: 'variant',
      headerName: 'Variant',
      width: 275,
      sortable: false,
      renderCell: ({ value }) => (
        <Grid container direction='column'>
          {value.current.id}
        </Grid>
      ),
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 250,
      sortable: false,
      renderCell: ({ value }) => <div>{value.id}</div>,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 250,
      renderCell: ({ value }) => (
        <Chip classes={{ root: classes.chipRoot }} label={`$${value}`} />
      ),
    },
    {
      field: '',
      width: 500,
      sortable: false,
      renderCell: () => (
        <IconButton>
          <span className={classes.deleteWrapper}>
            <DeleteIcon />
          </span>
        </IconButton>
      ),
    },
  ];

  const rows: GridRowsProp = products.map((item: UserFavorite) => ({
    item: {
      name: item.variants[0].product.name.split(' ')[0],
      image: item.variants[0].images[0].url,
    },
    variant: { all: item.variants, current: item.variant },
    quantity: item.variants,
    price: item.variants[0].price,
    id: item.id,
  }));

  useEffect(() => {
    axios
      .get<UserFavorite[]>(
        `${process.env.GATSBY_STRAPI_URL}/favorites/userFavorites`,
        {
          headers: { Authorization: `Bearer ${user.jwt}` },
        }
      )
      .then(response => {
        setProducts(response.data);
      })
      .catch(() => {
        dispatchFeedback(
          openSnackbar(
            SnackbarStatus.Error,
            'There was a problem getting your favorite products. Please try again.'
          )
        );
      });
  }, []);

  return (
    <Grid item container classes={{ root: classes.container }}>
      <DataGrid
        hideFooterSelectedRowCount
        rows={rows}
        columns={columns}
        pageSize={5}
      />
    </Grid>
  );
};

export default Favorites;
