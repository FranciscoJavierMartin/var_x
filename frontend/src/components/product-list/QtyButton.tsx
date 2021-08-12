import React, { useState } from 'react';
import {
  Grid,
  ButtonGroup,
  Button,
  Typography,
  Badge,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';

import Cart from '../../images/Cart';

const useStyles = makeStyles(theme => ({
  mainGroup: {
    height: '3rem',
  },
  qtyText: {
    color: theme.palette.common.white,
  },
  editButtons: {
    height: '1.525rem',
    borderRadius: 0,
    backgroundColor: theme.palette.secondary.main,
    borderLeft: `2px solid ${theme.palette.common.white}`,
    borderRight: `2px solid ${theme.palette.common.white}`,
    borderBottom: 'none',
    borderTop: 'none',
  },
  endButtons: {
    borderRadius: 50,
    backgroundColor: theme.palette.secondary.main,
    border: 'none',
  },
  cartButton: {
    marginLeft: '0 !important',
  },
  minusButton: {
    borderTop: `2px solid ${theme.palette.common.white}`,
  },
  minus: {
    marginTop: '-0.25rem',
  },
  qtyButton: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  badge: {
    color: theme.palette.common.white,
    fontSize: '1.5rem',
    backgroundColor: theme.palette.secondary.main,
    padding: 0,
  },
}));

interface QtyButtonProps {}

const QtyButton: React.FC<QtyButtonProps> = ({}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [qty, setQty] = useState<number>(1);

  return (
    <Grid item>
      <ButtonGroup classes={{ root: classes.mainGroup }}>
        <Button classes={{ root: clsx(classes.endButtons, classes.qtyButton) }}>
          <Typography variant='h3' classes={{ root: classes.qtyText }}>
            {qty}
          </Typography>
        </Button>
        <ButtonGroup orientation='vertical'>
          <Button
            onClick={() => setQty(prevState => prevState + 1)}
            classes={{ root: classes.editButtons }}
          >
            <Typography variant='h3' classes={{ root: classes.qtyText }}>
              +
            </Typography>
          </Button>
          <Button
            onClick={() => setQty(prevState => prevState - 1)}
            classes={{ root: clsx(classes.editButtons, classes.minusButton) }}
          >
            <Typography
              variant='h3'
              classes={{ root: clsx(classes.qtyText, classes.minus) }}
            >
              -
            </Typography>
          </Button>
        </ButtonGroup>
        <Button
          classes={{ root: clsx(classes.endButtons, classes.cartButton) }}
        >
          <Badge
            overlap='circular'
            badgeContent='+'
            classes={{ badge: classes.badge }}
          >
            <Cart color={theme.palette.common.white} />
          </Badge>
        </Button>
      </ButtonGroup>
    </Grid>
  );
};

export default QtyButton;
