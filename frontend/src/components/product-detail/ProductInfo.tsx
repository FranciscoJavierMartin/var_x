import React from 'react';
import { Grid, Button, Typography, Chip, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Rating from '../shared/Rating';
import { Variant } from '../../interfaces/category-products';

import favorite from '../../images/favorite.svg';
import subscription from '../../images/subscription.svg';

const useStyles = makeStyles(theme => ({
  background: {
    backgroundColor: theme.palette.secondary.main,
    height: '45rem',
    width: '35rem',
  },
  center: {
    backgroundColor: theme.palette.primary.main,
    height: '35rem',
    width: '45rem',
    position: 'absolute',
  },
  icon: {
    height: '4rem',
    width: '4rem',
    margin: '0.5rem 1rem',
  },
  sectionContainer: {
    height: 'calc(100% / 3)',
  },
  descriptionContainer: {
    backgroundColor: theme.palette.secondary.main,
    overflowY: 'auto',
    padding: '0.5rem 1rem',
  },
  name: {
    color: theme.palette.common.white,
  },
  reviewButton: {
    textTransform: 'none',
  },
  detailsContainer: {
    padding: '0.5rem 1rem',
  },
  chipContainer: {
    marginTop: '1rem',
  },
  chipRoot: {
    height: '3rem',
    width: '8rem',
    borderRadius: 50,
  },
  chipLabel: {
    fontSize: '2rem',
  },
}));

interface ProductInfoProps {
  name: string;
  description: string;
  variants: Variant[];
  selectedVariant: number;
  setSelectedVariant: React.Dispatch<React.SetStateAction<number>>;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  description,
  variants,
  selectedVariant,
  setSelectedVariant,
}) => {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      justifyContent='center'
      alignItems='flex-end'
      direction='column'
      xs={6}
    >
      <Grid
        item
        container
        justifyContent='flex-end'
        classes={{ root: classes.background }}
      >
        <Grid item>
          <img
            src={favorite}
            alt='add item to favorite'
            className={classes.icon}
          />
        </Grid>
        <Grid item>
          <img
            src={subscription}
            alt='add item to subscription'
            className={classes.icon}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction='column'
        classes={{ root: classes.center }}
      >
        <Grid
          item
          container
          justifyContent='space-between'
          classes={{
            root: clsx(classes.detailsContainer, classes.sectionContainer),
          }}
        >
          <Grid item>
            <Grid container direction='column'>
              <Grid item>
                <Typography variant='h1' classes={{ root: classes.name }}>
                  {name.split(' ')[0]}
                </Typography>
              </Grid>
              <Grid item>
                <Rating rate={4.5} />
              </Grid>
              <Grid item>
                <Button>
                  <Typography
                    variant='body2'
                    classes={{ root: classes.reviewButton }}
                  >
                    Leave a review {'>'}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item classes={{ root: classes.chipContainer }}>
            <Chip
              label={`$${variants[selectedVariant].price}`}
              classes={{ root: classes.chipRoot, label: classes.chipLabel }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          classes={{
            root: clsx(classes.descriptionContainer, classes.sectionContainer),
          }}
        >
          <Grid item>
            <Typography variant='h5'>Description</Typography>
            <Typography variant='body2'>{description}</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          classes={{ root: classes.sectionContainer }}
        ></Grid>
      </Grid>
    </Grid>
  );
};

export default ProductInfo;
