import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import ProductFrameGrid from '../product-list/ProductFrameGrid';
import { Product } from '../../interfaces/product-details';

const useStyles = makeStyles(theme => ({
  recentContainer: {
    margin: '10rem 0',
    '& > :not(:last-child)': {
      marginRight: '5rem',
    },
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
      classes={{ root: classes.recentContainer }}
    >
      {products.map(product => {
        const hasStyles = product.node.variants.some(variant => variant.style);
        return (
          <ProductFrameGrid
            key={product.node.variants[product.node.selectedVariant!].id}
            product={{ node: { ...product.node, created_at: new Date() } }}
            variant={product.node.variants[product.node.selectedVariant!]}
            disableQuickView
            hasStyles={hasStyles}
          />
        );
      })}
    </Grid>
  );
};

export default RecentlyViewed;
