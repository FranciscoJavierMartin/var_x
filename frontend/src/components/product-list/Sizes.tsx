import React from 'react';
import { Grid, Button, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  size: {
    color: theme.palette.common.white,
  },
  button: {
    border: `3px solid ${theme.palette.common.white}`,
    borderRadius: 50,
    height: '3rem',
    width: '3rem',
    minWidth: 0,
  },
}));

const possibleSizes = ['S', 'M', 'L'];

interface SizesProps {
  sizes: string[];
}

const Sizes: React.FC<SizesProps> = ({ sizes }) => {
  const classes = useStyles();

  let actualSizes: string[] = [];

  if (possibleSizes.every(size => sizes.includes(size))) {
    actualSizes = possibleSizes;
  }

  return (
    <Grid item container justifyContent='space-between'>
      {actualSizes.map(size => (
        <Grid item key={size}>
          <Button classes={{ root: classes.button }}>
            <Typography variant='h3' classes={{ root: classes.size }}>
              {size}
            </Typography>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default Sizes;
