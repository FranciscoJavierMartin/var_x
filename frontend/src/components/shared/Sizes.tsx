import React from 'react';
import { Grid, Button, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

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
  selected: {
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

const possibleSizes = ['S', 'M', 'L'];

interface SizesProps {
  sizes: string[];
  selectedSize: string;
  setSelectedSize: React.Dispatch<string>;
}

const Sizes: React.FC<SizesProps> = ({
  sizes,
  selectedSize,
  setSelectedSize,
}) => {
  const classes = useStyles();

  let actualSizes: string[] = [];

  if (possibleSizes.every(size => sizes.includes(size))) {
    actualSizes = possibleSizes;
  }

  return (
    <Grid item container justifyContent='space-between'>
      {actualSizes.map(size => (
        <Grid item key={size}>
          <Button
            onClick={() => setSelectedSize(size)}
            classes={{
              root: clsx(classes.button, {
                [classes.selected]: selectedSize === size,
              }),
            }}
          >
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
