import React from 'react';
import { Grid, SwipeableDrawer, makeStyles } from '@material-ui/core';
import { GridRowId } from '@material-ui/data-grid';

const useStyles = makeStyles(theme => ({
  drawer: {
    height: '100%',
    width: '30rem',
    backgroundColor: theme.palette.primary.main,
  },
}));

interface OrderDetailsProps {
  open: GridRowId | null;
  setOpen: React.Dispatch<React.SetStateAction<GridRowId | null>>;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ open, setOpen }) => {
  const classes = useStyles();

  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <SwipeableDrawer
      open={!!open}
      onOpen={() => null}
      onClose={() => setOpen(null)}
      anchor='right'
      classes={{ paper: classes.drawer }}
      disableBackdropTransition={!iOS}
      disableDiscovery={!!iOS}
    ></SwipeableDrawer>
  );
};

export default OrderDetails;
