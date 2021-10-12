import React, { useState, useContext, useRef } from 'react';
import {
  Button,
  Grid,
  Typography,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import axios from 'axios';
import Rating from '../shared/Rating';
import Fields from '../shared/Fields';
import { FeedbackContext } from '../../contexts';
import { openSnackbar, SnackbarStatus } from '../../contexts/feedback/actions';
import { Review } from '../../interfaces/reviews';
import { User } from '../../interfaces/user';

const useStyles = makeStyles(theme => ({
  review: {
    marginBottom: '3rem',
  },
  light: {
    color: theme.palette.primary.main,
  },
  date: {
    marginTop: '-0.5rem',
  },
  rating: {
    cursor: 'pointer',
  },
  buttonContainer: {
    marginTop: '2rem',
  },
  reviewButtonText: {
    color: theme.palette.common.white,
    fontFamily: 'Montserrat',
    fontWeight: 600,
  },
  cancelButtonText: {
    color: theme.palette.primary.main,
    fontFamily: 'Montserrat',
    fontWeight: 600,
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  '@global': {
    '.MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before':
      {
        borderBottom: `2px solid ${theme.palette.primary.main}`,
      },
    '.MuiInput:underline:after': {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
}));

enum LoadingState {
  Nothing,
  LeaveReview,
}

interface PoductReviewProps {
  product: string;
  review?: Review;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  reviews: Review[];
  user?: User;
  setReviews?: React.Dispatch<React.SetStateAction<Review[]>>;
}

const PoductReview: React.FC<PoductReviewProps> = ({
  product,
  review,
  setIsEdit,
  reviews,
  user,
  setReviews,
}) => {
  const found = !review
    ? reviews.find(review => review.user.username === user?.username)
    : null;
  const [values, setValues] = useState<{ [key: string]: string }>({
    message: found ? found.text : '',
  });
  const [tempRating, setTempRating] = useState<number>(0);
  const [rating, setRating] = useState<number>(
    review ? review.rating : found ? found.rating : 0
  );
  const [loading, setLoading] = useState<LoadingState>(LoadingState.Nothing);

  const { dispatchFeedback } = useContext(FeedbackContext);
  const ratingRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();

  const fields = {
    message: {
      helperText: '',
      placeholder: 'Write your review',
    },
  };

  const buttonDisabled = found
    ? found.text === values.message && found.rating === rating
    : !rating;

  const handleReview = () => {
    setLoading(LoadingState.LeaveReview);

    const axiosFunction = found ? axios.put : axios.post;
    const route = found
      ? `${process.env.GATSBY_STRAPI_URL}/reviews/${found.id}`
      : `${process.env.GATSBY_STRAPI_URL}/reviews`;

    axiosFunction(
      route,
      {
        text: values.message,
        product,
        rating,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.jwt}`,
        },
      }
    )
      .then(response => {
        setLoading(LoadingState.Nothing);
        dispatchFeedback(
          openSnackbar(SnackbarStatus.Success, 'Product review added')
        );

        if (found) {
          setReviews &&
            setReviews(prevState => {
              prevState[prevState.findIndex(review => review.id === found.id)] =
                response.data;
              return prevState;
            });
          setIsEdit && setIsEdit(false);
        }
      })
      .catch(() => {
        setLoading(LoadingState.Nothing);
        dispatchFeedback(
          openSnackbar(
            SnackbarStatus.Error,
            'There was a problem leaving your review, please try again.'
          )
        );
      });
  };

  return (
    <Grid item container direction='column' classes={{ root: classes.review }}>
      <Grid item container justifyContent='space-between'>
        <Grid item>
          <Typography variant='h4' classes={{ root: classes.light }}>
            {review?.user.username || user?.username}
          </Typography>
        </Grid>
        <Grid
          item
          classes={{ root: clsx({ [classes.rating]: !review }) }}
          ref={ratingRef}
          onClick={() => !review && setRating(tempRating)}
          onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (!review) {
              const hoverRating =
                (-5 *
                  (ratingRef.current!.getBoundingClientRect().left -
                    e.clientX)) /
                ratingRef.current!.getBoundingClientRect().width;
              setTempRating(Math.round(hoverRating * 2) / 2);
            }
          }}
          onMouseLeave={() => {
            if (tempRating > rating) {
              setTempRating(rating);
            }
          }}
        >
          <Rating rate={rating > tempRating ? rating : tempRating} size={2.5} />
        </Grid>
      </Grid>
      <Grid item>
        <Typography
          variant='h5'
          classes={{ root: clsx(classes.date, classes.light) }}
        >
          {review
            ? new Date(review.created_at).toLocaleString([], {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              })
            : new Date().toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item>
        {review ? (
          <Typography variant='body1'>{review.text}</Typography>
        ) : (
          <Fields
            values={values}
            setValues={setValues}
            fields={fields}
            fullWidth
            noError
          />
        )}
      </Grid>
      {review ? null : (
        <Grid item container classes={{ root: classes.buttonContainer }}>
          <Grid item>
            {loading === LoadingState.LeaveReview ? (
              <CircularProgress />
            ) : (
              <Button
                onClick={handleReview}
                disabled={buttonDisabled}
                variant='contained'
                color='primary'
              >
                <span className={classes.reviewButtonText}>
                  {found ? 'Edit' : 'Leave'} review
                </span>
              </Button>
            )}
          </Grid>
          {found && (
            <Grid item>
              <Button
                variant='contained'
                classes={{ root: classes.deleteButton }}
              >
                <span className={classes.reviewButtonText}>Delete</span>
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button onClick={() => setIsEdit && setIsEdit(false)}>
              <span className={classes.cancelButtonText}>Cancel</span>
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default PoductReview;
