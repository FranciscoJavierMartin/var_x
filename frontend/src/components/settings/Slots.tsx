import React from 'react';
import { Button, Typography, Grid, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles<Theme, { isCheckout?: boolean }>(theme => ({
  slot: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 25,
    width: '2.5rem',
    height: '2.5rem',
    minWidth: 0,
    border: `0.15rem solid ${theme.palette.secondary.main}`,
    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },
    [theme.breakpoints.down('xs')]: {
      width: ({ isCheckout }) => (isCheckout ? '2rem' : '2.5rem'),
      height: ({ isCheckout }) => (isCheckout ? '2rem' : '2.5rem'),
    },
  },
  slotWrapper: {
    marginLeft: '1rem',
    marginBottom: '1rem',
    '& > :not(:first-child)': {
      marginLeft: '-0.5rem',
    },
  },
  slotText: {
    color: theme.palette.secondary.main,
    marginLeft: '-0.25rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: ({ isCheckout }) => (isCheckout ? '1.5rem' : undefined),
    },
  },
  selected: {
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  selectedText: {
    color: theme.palette.common.white,
  },
  shipping: {
    color: theme.palette.common.white,
    fontWeight: 600,
    marginLeft: '0.5rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
      marginTop: '0.4rem',
    },
  },
}));

interface SlotsProps {
  slot: number;
  setSlot: React.Dispatch<React.SetStateAction<number>>;
  isCheckout?: boolean;
  noLabel?: boolean;
}

const Slots: React.FC<SlotsProps> = ({
  slot,
  setSlot,
  isCheckout,
  noLabel,
}) => {
  const classes = useStyles({ isCheckout });

  return (
    <Grid item container xs sm={noLabel ? 3 : isCheckout ? 5 : undefined}>
      <Grid item classes={{ root: classes.slotWrapper }}>
        {[1, 2, 3].map((n: number, index: number) => (
          <Button
            onClick={() => setSlot(index)}
            classes={{
              root: clsx(classes.slot, {
                [classes.selected]: slot === index,
              }),
            }}
            key={n}
          >
            <Typography
              variant='h5'
              classes={{
                root: clsx(classes.slotText, {
                  [classes.selectedText]: slot === index,
                }),
              }}
            >
              {n}
            </Typography>
          </Button>
        ))}
      </Grid>
      {isCheckout && (
        <Grid item>
          <Typography variant='body1' classes={{ root: classes.shipping }}>
            Shipping
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Slots;
