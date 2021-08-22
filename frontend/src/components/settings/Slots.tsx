import React from 'react';
import { Button, Typography, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
  },
  slotWrapper: {
    marginLeft: '2rem',
    '& > :not(:first-child)': {
      marginLeft: '-0.5rem',
    },
  },
  slotText: {
    color: theme.palette.secondary.main,
    marginLeft: '-0.25rem',
  },
}));

interface SlotsProps {}

const Slots: React.FC<SlotsProps> = ({}) => {
  const classes = useStyles();

  return (
    <Grid item classes={{ root: classes.slotWrapper }}>
      {[1, 2, 3].map(slot => (
        <Button classes={{ root: classes.slot }} key={slot}>
          <Typography variant='h5' classes={{ root: classes.slotText }}>
            {slot}
          </Typography>
        </Button>
      ))}
    </Grid>
  );
};

export default Slots;
