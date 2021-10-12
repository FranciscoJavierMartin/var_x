import React, { useState, useEffect, useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../../apollo/queries';
import ProductReview from './ProductReview';
import { UserContext } from '../../contexts';
import { QueryReviews, Review } from '../../interfaces/reviews';

const useStyles = makeStyles(theme => ({
  reviews: {
    padding: '0 3rem',
  },
}));

interface ProductReviewsProps {
  product: string;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  product,
  isEdit,
  setIsEdit,
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { user } = useContext(UserContext);
  const classes = useStyles();

  const { data } = useQuery<QueryReviews, { id: string }>(GET_REVIEWS, {
    variables: { id: product },
  });

  useEffect(() => {
    if (data) {
      setReviews(data.product.reviews);
    }
  }, [data]);

  return (
    <Grid
      id='reviews'
      item
      container
      direction='column'
      classes={{ root: classes.reviews }}
    >
      {isEdit && (
        <ProductReview
          user={user}
          reviews={reviews}
          product={product}
          setIsEdit={setIsEdit}
          setReviews={setReviews}
        />
      )}
      {reviews
        .filter(review =>
          isEdit ? review.user.username !== user.username : !!review
        )
        .map(review => (
          <ProductReview
            key={review.id}
            product={product}
            review={review}
            reviews={reviews}
          />
        ))}
    </Grid>
  );
};

export default ProductReviews;
