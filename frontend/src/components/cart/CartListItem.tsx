import React, { useContext, useState } from 'react';
import {
  Grid,
  IconButton,
  Chip,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import clsx from 'clsx';
import QtyButton from '../shared/QtyButton';
import Favorite from '../shared/Favorite';
import SelectFrequency from '../shared/SelectFrequency';
import { CartItem } from '../../interfaces/cart';
import { CartContext } from '../../contexts';
import { removeFromCart, changeFrequency } from '../../contexts/cart/actions';

import SubscribeIcon from '../../images/SubscriptionIcon';
import DeleteIcon from '../../images/DeleteIcon';

const useStyles = makeStyles<Theme, { subscription?: string }>(theme => ({
  itemContainer: {
    margin: '2rem 0 2rem 2rem',
    [theme.breakpoints.down('md')]: {
      margin: '2rem 0',
    },
  },
  productImage: {
    width: '10rem',
    height: '10rem',
  },
  infoContainer: {
    width: '35rem',
    height: ({ subscription }) => (subscription ? '10rem' : '8rem'),
    position: 'relative',
    marginLeft: '1rem',
  },
  name: {
    color: theme.palette.secondary.main,
  },
  id: {
    color: theme.palette.secondary.main,
    fontSize: '1rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.75rem',
    },
  },
  chipWrapper: {
    position: 'absolute',
    top: ({ subscription }) => (subscription ? '4.25rem' : '3.5rem'),
  },
  chipRoot: {
    marginLeft: '1rem',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  actionContainer: {
    marginBottom: '-0.5rem',
  },
  favoriteIcon: {
    marginTop: 2,
  },
  chipLabel: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.25rem',
    },
  },
  actionWrapper: {
    height: '3rem',
    width: '3rem',

    [theme.breakpoints.down('xs')]: {
      height: '2rem',
      width: '2rem',
    },
  },
  actionButton: {
    [theme.breakpoints.down('xs')]: {
      padding: '12px 6px',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

interface CartItemProps {
  item: CartItem;
}

const CartListItem: React.FC<CartItemProps> = ({ item }) => {
  const [frequency, setFrequency] = useState<string | undefined>(
    item.subscription
  );
  const { dispatchCart } = useContext(CartContext);
  const theme = useTheme();
  const classes = useStyles({ subscription: item.subscription });
  const matchesXS = useMediaQuery<Theme>(theme => theme.breakpoints.down('xs'));

  const handleDelete = () => {
    dispatchCart(removeFromCart(item.variant, item.qty));
  };

  const handleChangeFrequency = (newFrequency: string) => {
    dispatchCart(changeFrequency(item.variant, newFrequency));
    setFrequency(newFrequency);
  };

  const actions = [
    {
      component: Favorite,
      props: {
        color: theme.palette.secondary.main,
        size: matchesXS ? 2 : 3,
        buttonClasses: clsx(classes.actionButton, classes.favoriteIcon),
        variant: item.variant.id,
      },
    },
    { icon: SubscribeIcon, color: theme.palette.secondary.main },
    {
      icon: DeleteIcon,
      color: theme.palette.error.main,
      size: matchesXS ? '1.75rem' : '2.5rem',
      onClick: handleDelete,
    },
  ];

  return (
    <Grid item container classes={{ root: classes.itemContainer }}>
      <Grid item>
        <img
          className={classes.productImage}
          src={`${process.env.GATSBY_STRAPI_URL}${item.variant.images[0].url}`}
          alt={item.variant.id.toString()}
        />
      </Grid>
      <Grid
        item
        container
        direction={matchesXS ? 'row' : 'column'}
        justifyContent='space-between'
        classes={{ root: classes.infoContainer }}
      >
        <Grid item container justifyContent='space-between'>
          <Grid item>
            <Typography variant='h5' classes={{ root: classes.name }}>
              {item.name}
            </Typography>
          </Grid>
          <Grid item>
            <QtyButton
              name={item.name}
              selectedVariant={0}
              variants={[item.variant]}
              stock={[{ qty: item.stock }]}
              isCart
              white
              hideCartButton
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          alignItems='center'
          classes={{ root: classes.chipWrapper }}
        >
          <Grid item>
            <Chip label={`$${item.variant.price}`} />
          </Grid>
          {item.subscription ? (
            <Grid item>
              <SelectFrequency
                chip={
                  <Chip
                    classes={{
                      root: classes.chipRoot,
                      label: classes.chipLabel,
                    }}
                    label={`Every ${item.subscription}`}
                  />
                }
                value={frequency!}
                setValue={
                  setFrequency as React.Dispatch<React.SetStateAction<string>>
                }
              />
            </Grid>
          ) : null}
        </Grid>
        <Grid
          item
          container
          justifyContent='space-between'
          alignItems='flex-end'
        >
          <Grid item xs={7} sm>
            <Typography variant='body1' classes={{ root: classes.id }}>
              ID: {item.variant.id}
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={5}
            sm
            justifyContent='flex-end'
            classes={{ root: classes.actionContainer }}
          >
            {actions.map((Action, i) => (
              <Grid item key={i}>
                {Action.component ? (
                  <Action.component {...Action.props} />
                ) : (
                  <IconButton
                    disableRipple
                    classes={{ root: classes.actionButton }}
                    onClick={() => Action.onClick && Action.onClick()}
                  >
                    <span
                      className={classes.actionWrapper}
                      style={{ height: Action.size, width: Action.size }}
                    >
                      <Action.icon color={Action.color} />
                    </span>
                  </IconButton>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartListItem;
