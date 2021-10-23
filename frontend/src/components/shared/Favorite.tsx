import React, { useState, useContext } from 'react';
import {
  IconButton,
  CircularProgress,
  makeStyles,
  Theme,
} from '@material-ui/core';
import axios from 'axios';
import { FeedbackContext, UserContext } from '../../contexts';
import { openSnackbar, SnackbarStatus } from '../../contexts/feedback/actions';
import { setUser } from '../../contexts/user/actions';
import { Favorite as FavortiteProduct } from '../../interfaces/user';

import FavoriteIcon from '../../images/FavoriteIcon';

const useStyles = makeStyles<Theme, { size?: number }>(theme => ({
  icon: {
    height: ({ size }) => `${size || 2}rem`,
    width: ({ size }) => `${size || 2}rem`,
  },
  iconButton: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

interface FavoriteProps {
  product: string;
  color?: string;
  size?: number;
}

const Favorite: React.FC<FavoriteProps> = ({ product, color, size }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, dispatchUser } = useContext(UserContext);
  const { dispatchFeedback } = useContext(FeedbackContext);
  const classes = useStyles({ size });

  const existingFavorite: FavortiteProduct | undefined = user.favorites?.find(
    (favorite: FavortiteProduct) => favorite.product === +product
  );

  const handleFavorite = () => {
    if (user.username === 'Guest') {
      dispatchFeedback(
        openSnackbar(
          SnackbarStatus.Error,
          'You must be logged in to add an item to favorites'
        )
      );
    } else {
      setIsLoading(true);

      const axiosFunction = existingFavorite ? axios.delete : axios.post;
      const route = existingFavorite
        ? `/favorites/${existingFavorite.id}`
        : '/favorites';
      const auth = {
        Authorization: `Bearer ${user.jwt}`,
      };

      axiosFunction(
        `${process.env.GATSBY_STRAPI_URL}${route}`,
        {
          product,
          headers: existingFavorite ? auth : undefined,
        },
        {
          headers: auth,
        }
      )
        .then(response => {
          setIsLoading(false);
          dispatchFeedback(
            openSnackbar(
              SnackbarStatus.Success,
              existingFavorite
                ? 'Removed product from favorites'
                : 'Added product to favorites'
            )
          );

          const newFavorites: FavortiteProduct[] =
            (existingFavorite
              ? user.favorites?.filter(
                  favorite => favorite.id !== existingFavorite.id
                )
              : user.favorites?.concat({
                  id: response.data.id,
                  product: response.data.product.id,
                })) || [];

          dispatchUser(setUser({ ...user, favorites: newFavorites }));
        })
        .catch(() => {
          setIsLoading(false);
          dispatchFeedback(
            openSnackbar(
              SnackbarStatus.Error,
              existingFavorite
                ? 'There was a problem removing this item from favorites. Please try again'
                : 'There was a problem adding this item to favorites. Please try again'
            )
          );
        });
    }
  };

  return isLoading ? (
    <CircularProgress size={`${size || 2}rem`} />
  ) : (
    <IconButton onClick={handleFavorite} classes={{ root: classes.iconButton }}>
      <span className={classes.icon}>
        <FavoriteIcon color={color} filled={!!existingFavorite} />
      </span>
    </IconButton>
  );
};

export default Favorite;
