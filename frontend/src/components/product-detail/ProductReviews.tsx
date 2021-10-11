import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import ProductReview from './ProductReview';

const useStyles = makeStyles(theme => ({
  reviews: {
    padding: '0 3rem',
  },
}));

interface ProductReviewsProps {
  product: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ product }) => {
  const classes = useStyles();

  return (
    <Grid item container direction='column' classes={{ root: classes.reviews }}>
      <ProductReview product={product} />
    </Grid>
  );
};

export default ProductReviews;
