import React from 'react';
import { Grid, Button, makeStyles } from '@material-ui/core';
import ProductFrameGrid from '../product-list/ProductFrameGrid';
import { Product } from '../../interfaces/product-details';

const useStyles = makeStyles(theme => ({
  recentContainer: {
    margin: '10rem 0',
    '& > :not(:last-child)': {
      marginRight: '5rem',
    },
  },
  arrow: {
    minWidth: 0,
    height: '4rem',
    width: '4rem',
    fontSize: '4rem',
    color: theme.palette.primary.main,
    borderRadius: 50,
  },
}));

interface RecentlyViewedProps {
  products: Product[];
}

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({ products }) => {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      justifyContent='center'
      alignItems='center'
      classes={{ root: classes.recentContainer }}
    >
      <Grid item>
        <Button classes={{ root: classes.arrow }}>{'<'}</Button>
      </Grid>
      {products.map(product => {
        const hasStyles = product.node.variants.some(variant => variant.style);
        return (
          <ProductFrameGrid
            key={product.node.variants[product.node.selectedVariant!].id}
            product={{ node: { ...product.node, created_at: new Date() } }}
            variant={product.node.variants[product.node.selectedVariant!]}
            small
            disableQuickView
            hasStyles={hasStyles}
          />
        );
      })}
      <Grid item>
        <Button classes={{ root: classes.arrow }}>{'>'}</Button>
      </Grid>
    </Grid>
  );
};

export default RecentlyViewed;
