import React, { useState } from 'react';
import {
  Grid,
  ButtonGroup,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core';

import cart from '../../images/cart.svg';

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
  },
}));

interface QtyButtonProps {}

const QtyButton: React.FC<QtyButtonProps> = ({}) => {
  const classes = useStyles();
  const [qty, setQty] = useState<number>(1);

  return (
    <Grid item>
      <ButtonGroup classes={{ root: classes.mainGroup }}>
        <Button>
          <Typography variant='h3' classes={{ root: classes.qtyText }}>
            {qty}
          </Typography>
        </Button>
        <ButtonGroup orientation='vertical'>
          <Button classes={{ root: classes.editButtons }}>
            <Typography variant='h3' classes={{ root: classes.qtyText }}>
              +
            </Typography>
          </Button>
          <Button classes={{ root: classes.editButtons }}>
            <Typography variant='h3' classes={{ root: classes.qtyText }}>
              -
            </Typography>
          </Button>
        </ButtonGroup>
        <Button>
          <img src={cart} alt='add to cart' />
        </Button>
      </ButtonGroup>
    </Grid>
  );
};

export default QtyButton;
