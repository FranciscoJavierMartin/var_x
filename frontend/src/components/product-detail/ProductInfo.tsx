import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { Variant } from '../../interfaces/category-products';

const useStyles = makeStyles(theme => ({
  background: {
    backgroundColor: theme.palette.secondary.main,
    height: '45rem',
    width: '35rem',
  },
  center: {
    backgroundColor: theme.palette.primary.main,
    height: '35rem',
    width: '45rem',
    position: 'absolute',
  },
}));

interface ProductInfoProps {
  name: string;
  description: string;
  variants: Variant[];
  selectedVariant: number;
  setSelectedVariant: React.Dispatch<React.SetStateAction<number>>;
}

const ProductInfo: React.FC<ProductInfoProps> = ({}) => {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      justifyContent='center'
      alignItems='flex-end'
      direction='column'
      xs={6}
    >
      <Grid
        item
        container
        direction='column'
        classes={{ root: classes.background }}
      ></Grid>
      <Grid
        item
        container
        direction='column'
        classes={{ root: classes.center }}
      ></Grid>
    </Grid>
  );
};

export default ProductInfo;
