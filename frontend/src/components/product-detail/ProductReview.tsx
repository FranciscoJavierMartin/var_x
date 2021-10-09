import React, { useState, useContext } from 'react';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import Rating from '../shared/Rating';
import Fields from '../shared/Fields';
import { UserContext } from '../../contexts';

const useStyles = makeStyles(theme => ({
  light: {
    color: theme.palette.primary.main,
  },
  date: {
    marginTop: '-0.5rem',
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

interface PoductReviewProps {}

const PoductReview: React.FC<PoductReviewProps> = ({}) => {
  const [values, setValues] = useState<{ [key: string]: string }>({
    message: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const { user } = useContext(UserContext);
  const classes = useStyles();

  const fields = {
    message: {
      helperText: '',
      placeholder: 'Write your review',
    },
  };

  return (
    <Grid item container direction='column'>
      <Grid item container justifyContent='space-between'>
        <Grid item>
          <Typography variant='h4' classes={{ root: classes.light }}>
            {user.username}
          </Typography>
        </Grid>
        <Grid item>
          <Rating rate={1} size={2.5} />
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
          errors={errors}
          setErrors={setErrors}
          fields={fields}
          fullWidth
          noError
        />
      </Grid>
      <Grid item container classes={{ root: classes.buttonContainer }}>
        <Grid item>
          <Button variant='contained' color='primary'>
            <span className={classes.reviewButtonText}>Leave a review</span>
          </Button>
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
