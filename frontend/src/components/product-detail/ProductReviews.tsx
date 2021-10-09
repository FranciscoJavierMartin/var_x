import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import ProductReview from './ProductReview';

const useStyles = makeStyles(theme => ({
  reviews: {
    padding: '0 3rem',
  },
}));

interface ProductReviewsProps {}

const ProductReviews: React.FC<ProductReviewsProps> = ({}) => {
  const classes = useStyles();

  return (
    <Grid item container direction='column' classes={{ root: classes.reviews }}>
      <ProductReview />
    </Grid>
  );
};

export default ProductReviews;
