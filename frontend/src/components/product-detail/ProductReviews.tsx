import React, { useState, useEffect, useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../../apollo/queries';
import ProductReview from './ProductReview';
import StyledPagination from '../shared/StyledPagination';
import { UserContext } from '../../contexts';
import { QueryReviews, Review } from '../../interfaces/reviews';

const useStyles = makeStyles(theme => ({
  reviews: {
    padding: '0 3rem',
  },
  pagination: {
    marginBottom: '3rem',
  },
  '@global': {
    '.MuiPaginationItem-root': {
      fontFamily: 'Montserrat',
      fontSize: '2rem',
      color: theme.palette.primary.main,
      '&.Mui-selected': {
        color: theme.palette.common.white,
      },
    },
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
  const [page, setPage] = useState<number>(1);
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const reviewsPerPage = 15;

  const { data } = useQuery<QueryReviews, { id: string }>(GET_REVIEWS, {
    variables: { id: product },
  });

  const numPages = Math.ceil(reviews.length / reviewsPerPage);

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
        .slice((page - 1) * reviewsPerPage, page * reviewsPerPage)
        .map(review => (
          <ProductReview
            key={review.id}
            product={product}
            review={review}
            reviews={reviews}
          />
        ))}
      <Grid item container justifyContent='flex-end'>
        <Grid item>
          <StyledPagination
            classes={{ root: classes.pagination }}
            count={numPages}
            page={page}
            onChange={(e, newPage) => {
              setPage(newPage);
            }}
            color='primary'
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductReviews;
