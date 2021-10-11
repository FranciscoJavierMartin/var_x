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
import { UserContext, FeedbackContext } from '../../contexts';
import { openSnackbar, SnackbarStatus } from '../../contexts/feedback/actions';

const useStyles = makeStyles(theme => ({
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
}

const PoductReview: React.FC<PoductReviewProps> = ({ product }) => {
  const [values, setValues] = useState<{ [key: string]: string }>({
    message: '',
  });
  const [tempRating, setTempRating] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState<LoadingState>(LoadingState.Nothing);
  const { user } = useContext(UserContext);
  const { dispatchFeedback } = useContext(FeedbackContext);
  const ratingRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();

  const fields = {
    message: {
      helperText: '',
      placeholder: 'Write your review',
    },
  };

  const handleReview = () => {
    setLoading(LoadingState.LeaveReview);

    axios
      .post(
        `${process.env.GATSBY_STRAPI_URL}/reviews`,
        {
          text: values.message,
          product,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      )
      .then(() => {
        setLoading(LoadingState.Nothing);
        dispatchFeedback(
          openSnackbar(SnackbarStatus.Success, 'Product review added')
        );
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
    <Grid item container direction='column'>
      <Grid item container justifyContent='space-between'>
        <Grid item>
          <Typography variant='h4' classes={{ root: classes.light }}>
            {user.username}
          </Typography>
        </Grid>
        <Grid
          item
          classes={{ root: classes.rating }}
          ref={ratingRef}
          onClick={() => setRating(tempRating)}
          onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const hoverRating =
              (-5 *
                (ratingRef.current!.getBoundingClientRect().left - e.clientX)) /
              ratingRef.current!.getBoundingClientRect().width;
            setTempRating(Math.round(hoverRating * 2) / 2);
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
          {new Date().toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item>
        <Fields
          values={values}
          setValues={setValues}
          fields={fields}
          fullWidth
          noError
        />
      </Grid>
      <Grid item container classes={{ root: classes.buttonContainer }}>
        <Grid item>
          {loading === LoadingState.LeaveReview ? (
            <CircularProgress />
          ) : (
            <Button
              onClick={handleReview}
              disabled={!rating}
              variant='contained'
              color='primary'
            >
              <span className={classes.reviewButtonText}>Leave a review</span>
            </Button>
          )}
        </Grid>
        <Grid item>
          <Button>
            <span className={classes.cancelButtonText}>Cancel</span>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PoductReview;
