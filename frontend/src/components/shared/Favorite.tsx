import React, { useState, useContext } from 'react';
import {
  IconButton,
  CircularProgress,
  makeStyles,
  Theme,
} from '@material-ui/core';
import clsx from 'clsx';
import axios from 'axios';
import { FeedbackContext, UserContext } from '../../contexts';
import { openSnackbar, SnackbarStatus } from '../../contexts/feedback/actions';
import { setUser } from '../../contexts/user/actions';
import { Favorite as FavortiteProduct } from '../../interfaces/user';

import FavoriteIcon from '../../images/FavoriteIcon';

const useStyles = makeStyles<Theme, { size?: number; noPadding?: boolean }>(
  theme => ({
    icon: {
      height: ({ size }) => `${size || 2}rem`,
      width: ({ size }) => `${size || 2}rem`,
    },
    iconButton: {
      padding: ({ noPadding }) => (noPadding ? 0 : undefined),
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  })
);

interface FavoriteProps {
  variant: number;
  color?: string;
  size?: number;
  buttonClass?: string;
  noPadding?: boolean;
}

const Favorite: React.FC<FavoriteProps> = ({
  variant,
  color,
  size,
  buttonClass,
  noPadding,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, dispatchUser } = useContext(UserContext);
  const { dispatchFeedback } = useContext(FeedbackContext);
  const classes = useStyles({ size, noPadding });

  const existingFavorite: FavortiteProduct | undefined = user.favorites?.find(
    (favorite: FavortiteProduct) => favorite.variant === variant
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
          variant,
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
                  variant: response.data.variant.id,
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
    <IconButton
      onClick={handleFavorite}
      classes={{ root: clsx(classes.iconButton, buttonClass) }}
    >
      <span className={classes.icon}>
        <FavoriteIcon color={color} filled={!!existingFavorite} />
      </span>
    </IconButton>
  );
};

export default Favorite;
