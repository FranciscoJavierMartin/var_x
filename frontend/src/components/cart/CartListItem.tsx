import React, { useContext } from 'react';
import {
  Grid,
  IconButton,
  Chip,
  Typography,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import QtyButton from '../product-list/QtyButton';
import { CartItem } from '../../interfaces/cart';
import { CartContext } from '../../contexts';
import { removeFromCart } from '../../contexts/cart/actions';

import FavoriteIcon from '../../images/FavoriteIcon';
import SubscribeIcon from '../../images/SubscriptionIcon';
import DeleteIcon from '../../images/DeleteIcon';

const useStyles = makeStyles(theme => ({
  itemContainer: {
    margin: '2rem 0 2rem 2rem',
  },
  productImage: {
    width: '10rem',
    height: '10rem',
  },
  infoContainer: {
    width: '35rem',
    height: '8rem',
    position: 'relative',
    marginLeft: '1rem',
  },
  name: {
    color: theme.palette.secondary.main,
  },
  id: {
    color: theme.palette.secondary.main,
    fontSize: '1rem',
  },
  chipWrapper: {
    position: 'absolute',
    top: '3.5rem',
  },
  actionWrapper: {
    height: '3rem',
    width: '3rem',
    marginBottom: -8,
  },
  actionButton: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

interface CartItemProps {
  item: CartItem;
}

const CartListItem: React.FC<CartItemProps> = ({ item }) => {
  const { dispatchCart } = useContext(CartContext);
  const theme = useTheme();
  const classes = useStyles();

  const handleDelete = () => {
    dispatchCart(removeFromCart(item.variant, item.qty));
  };

  const actions = [
    { icon: FavoriteIcon, color: theme.palette.secondary.main },
    { icon: SubscribeIcon, color: theme.palette.secondary.main },
    {
      icon: DeleteIcon,
      color: theme.palette.error.main,
      size: '2.5rem',
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
        direction='column'
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
            />
          </Grid>
        </Grid>
        <Grid item classes={{ root: classes.chipWrapper }}>
          <Chip label={`$${item.variant.price}`} />
        </Grid>
        <Grid
          item
          container
          justifyContent='space-between'
          alignItems='flex-end'
        >
          <Grid item xs>
            <Typography variant='body1' classes={{ root: classes.id }}>
              ID: {item.variant.id}
            </Typography>
          </Grid>
          <Grid item container xs justifyContent='flex-end'>
            {actions.map((Action, i) => (
              <Grid item key={i}>
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
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartListItem;
