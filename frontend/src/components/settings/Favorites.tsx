import React, { useContext, useEffect, useState } from 'react';
import {
  Grid,
  IconButton,
  Chip,
  CircularProgress,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { GridColumns, GridRowId, GridRowsProp } from '@material-ui/data-grid';
import axios from 'axios';
import SettingsGrid from './SettingsGrid';
import Sizes from '../shared/Sizes';
import Swatches from '../shared/Swatches';
import QtyButton from '../shared/QtyButton';
import { FeedbackContext, UserContext } from '../../contexts';
import { openSnackbar, SnackbarStatus } from '../../contexts/feedback/actions';
import { setUser } from '../../contexts/user/actions';
import { UserFavorite, Variant, Variant2 } from '../../interfaces/favorites';

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

interface FavoritesProps {
  setSelectedSetting: any;
}

const Favorites: React.FC<FavoritesProps> = ({ setSelectedSetting }) => {
  const [products, setProducts] = useState<UserFavorite[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<any>({});
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>(
    {}
  );
  const [selectedColors, setSelectedColors] = useState<{
    [key: number]: string;
  }>({});
  const [isLoading, setIsLoading] = useState<GridRowId | null>(null);
  const { user, dispatchUser } = useContext(UserContext);
  const { dispatchFeedback } = useContext(FeedbackContext);
  const classes = useStyles();

  const setSelectedHelper = (
    selectedFunction: React.Dispatch<
      React.SetStateAction<{
        [key: number]: string;
      }>
    >,
    values: { [key: number]: string },
    value: string,
    row: GridRowId
  ) => {
    selectedFunction({ ...values, [row]: value });

    const { variants } = products.find(favorite => favorite.id === row)!;
    const selectedVariant = selectedVariants[row];

    let newVariant: Variant2;

    if (value.includes('#')) {
      newVariant = variants.find(
        variant =>
          variant.size === selectedSizes[row as number] &&
          variant.style === variants[selectedVariants]?.style &&
          variant.color === value
      )!;
    } else {
      let newColors: string[] = [];

      variants.map(variant => {
        if (
          !newColors.includes(variant.color) &&
          variant.size === value &&
          variants[selectedVariant]?.style === variant.style
        ) {
          newColors.push(variant.color);
        }
      });

      newVariant = variants.find(
        variant =>
          variant.size === value &&
          variant.style === variants[selectedVariant].style &&
          variant.color === newColors[0]
      )!;
    }

    setSelectedVariants({
      ...selectedVariants,
      [row]: variants.indexOf(newVariant),
    });
  };

  const columns: GridColumns = [
    {
      field: 'item',
      headerName: 'Item',
      width: 250,
      renderCell: ({ value }: any) => (
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
      renderCell: ({ value, row }: any) => {
        let sizes: string[] = [];
        let colors: string[] = [];

        value.all.map((variant: Variant) => {
          sizes.push(variant.size);
          if (
            !colors.includes(variant.color) &&
            variant.size ===
              (selectedSizes[row.id] ? selectedSizes[row.id] : null) &&
            variant.style === value.current.style
          ) {
            colors.push(variant.color);
          }
        });

        return (
          <Grid container direction='column'>
            <Sizes
              sizes={sizes}
              selectedSize={selectedSizes[row.id]}
              setSelectedSize={size =>
                setSelectedHelper(setSelectedSizes, selectedSizes, size, row.id)
              }
            />
            <Swatches
              colors={colors}
              selectedColor={selectedColors[row.id]}
              setSelectedColor={color =>
                setSelectedHelper(
                  setSelectedColors,
                  selectedColors,
                  color,
                  row.id
                )
              }
            />
          </Grid>
        );
      },
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 250,
      sortable: false,
      renderCell: ({ value, row }: any) => {
        const selectedVariant = selectedVariants[row.id];
        const stock = value.map((variant: Variant2) => ({ qty: variant.qty }));
        return (
          <QtyButton
            variants={value}
            selectedVariant={selectedVariant}
            name={value[selectedVariant].product.name.split(' ')[0]}
            stock={stock}
          />
        );
      },
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 250,
      renderCell: ({ value }: any) => (
        <Chip classes={{ root: classes.chipRoot }} label={`$${value}`} />
      ),
    },
    {
      field: '',
      width: 500,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ value, row }) => (
        <IconButton onClick={() => handleDelete(row.id)} disabled={!!isLoading}>
          {isLoading === row.id ? (
            <CircularProgress size='2rem' color='secondary' />
          ) : (
            <span className={classes.deleteWrapper}>
              <DeleteIcon />
            </span>
          )}
        </IconButton>
      ),
    },
  ];

  const rows: GridRowsProp =
    Object.keys(selectedVariants).length === 0
      ? []
      : products.map((item: UserFavorite) => {
          const selectedVariant = selectedVariants[item.id];
          return {
            item: {
              name: item.variants[selectedVariant]?.product.name.split(' ')[0],
              image: item.variants[selectedVariant]?.images[0].url,
            },
            variant: { all: item.variants, current: item.variant },
            quantity: item.variants,
            price: item.variants[selectedVariant].price,
            id: item.id,
          };
        });

  const handleDelete = (rowId: GridRowId) => {
    setIsLoading(rowId);

    axios
      .delete(`${process.env.GATSBY_STRAPI_URL}/favorites/${rowId}`, {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      })
      .then(() => {
        setIsLoading(null);

        const newProducts = products.filter(product => product.id !== rowId);
        const newFavorites = user.favorites?.filter(
          favorite => favorite.id !== rowId
        );
        setProducts(newProducts);
        dispatchUser(setUser({ ...user, favorites: newFavorites }));
        dispatchFeedback(
          openSnackbar(SnackbarStatus.Success, 'Product removed from favorites')
        );
      })
      .catch(() => {
        setIsLoading(null);

        dispatchFeedback(
          openSnackbar(
            SnackbarStatus.Error,
            'There was a problem removing this product from your favorites. Please try again.'
          )
        );
      });
  };

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

        let newVariants = {};
        let newSizes = {};
        let newColors = {};

        response.data.forEach(favorite => {
          const index = favorite.variants.findIndex(
            variant => variant.id === favorite.variant.id
          );

          newVariants = { ...newVariants, [favorite.id]: index };
          newSizes = { ...newSizes, [favorite.id]: favorite.variant.size };
          newColors = { ...newColors, [favorite.id]: favorite.variant.color };
        });

        setSelectedVariants(newVariants);
        setSelectedSizes(newSizes);
        setSelectedColors(newColors);
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
      <SettingsGrid
        setSelectedSetting={setSelectedSetting}
        rows={rows}
        columns={columns}
        rowsPerPage={3}
      />
    </Grid>
  );
};

export default Favorites;
