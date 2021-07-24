import React from 'react';
import { Grid, IconButton, Typography, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  productName: {
    color: theme.palette.common.white,
  },
  iconButton: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  carouselImage: {
    height: '30rem',
    width: '25rem',
    backgroundColor: theme.palette.common.white,
    borderRadius: 20,
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down('sm')]: {
      height: '25rem',
      width: '20rem',
    },
    [theme.breakpoints.down('xs')]: {
      height: '20rem',
      width: '15rem',
    },
  },
  space: {
    margin: '0 15rem 10rem 15rem',
    [theme.breakpoints.down('sm')]: {
      margin: '0 8rem 8rem 8rem',
    },
    [theme.breakpoints.down("xs")]: {
      margin: "0 5rem 10rem 5rem",
    },
  },
}));

interface PromotionalProductSlideProps {
  imageUrl: string;
  isSelectedSlide: boolean;
  name: string;
  selectSlide: React.Dispatch<React.SetStateAction<number>>;
  index: number;
}

const PromotionalProductSlide: React.FC<PromotionalProductSlideProps> = ({
  imageUrl,
  isSelectedSlide,
  name,
  selectSlide,
  index,
}) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' alignItems='center'>
      <Grid item>
        <IconButton
          disableRipple
          onClick={() => selectSlide(index)}
          classes={{
            root: clsx(classes.iconButton, {
              [classes.space]: !isSelectedSlide,
            }),
          }}
        >
          <img src={imageUrl} alt={name} className={classes.carouselImage} />
        </IconButton>
      </Grid>
      <Grid item>
        {isSelectedSlide && (
          <Typography variant='h1' classes={{ root: classes.productName }}>
            {name.split(' ')[0]}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default PromotionalProductSlide;
