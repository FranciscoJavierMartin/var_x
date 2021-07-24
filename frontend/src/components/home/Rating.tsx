import React from 'react';
import { makeStyles } from '@material-ui/core';

import fullStar from '../../images/full-star.svg';
import halfStar from '../../images/half-star.svg';
import emptyStar from '../../images/empty-star.svg';

const useStyles = makeStyles(theme => ({
  size: {
    height: '2rem',
    width: '2rem',
  },
}));

interface RatingProps {
  rate: number;
}

const Rating: React.FC<RatingProps> = ({ rate }) => {
  const classes = useStyles();
  const diff = 5 - Math.ceil(rate);

  return (
    <>
      {[...Array(Math.floor(rate))].map((e, i) => (
        <img
          src={fullStar}
          alt='full start'
          key={`${i}-full-start`}
          className={classes.size}
        />
      ))}
      {rate % 1 !== 0 ? (
        <img src={halfStar} alt='half start' className={classes.size} />
      ) : null}
      {[...Array(diff)].map((e, i) => (
        <img
          src={emptyStar}
          alt='empty start'
          key={`${i}-empty-start`}
          className={classes.size}
        />
      ))}
    </>
  );
};

export default Rating;
