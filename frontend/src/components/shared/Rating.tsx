import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

import fullStar from '../../images/full-star.svg';
import halfStar from '../../images/half-star.svg';
import emptyStar from '../../images/empty-star.svg';

const useStyles = makeStyles<Theme, { size?: number }>(theme => ({
  size: {
    height: ({ size }) => `${size}rem`,
    width: ({ size }) => `${size}rem`,
  },
}));

interface RatingProps {
  rate: number;
  size?: number;
}

const Rating: React.FC<RatingProps> = ({ rate, size = 2 }) => {
  const classes = useStyles({ size });
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
