import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography, Chip, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Rating from '../shared/Rating';
import Sizes from '../shared/Sizes';
import Swatches from '../shared/Swatches';
import QtyButton from '../product-list/QtyButton';
import { Variant } from '../../interfaces/product-details';
import { getColorIndex } from '../../utils/imageByColor';

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
  stock: {
    color: theme.palette.common.white,
  },
  sizesAndSwatches: {
    maxWidth: '13rem',
  },
  actionsContainer: {
    padding: '0 1rem',
  },
  '@global': {
    '.MuiButtonGroup-groupedOutlinedVertical:not(:first-child)': {
      marginTop: 0,
    },
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
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const imageIndex = getColorIndex(
    { node: { variants } },
    variants[selectedVariant],
    selectedColor
  );

  const sizes = variants.map(variant => variant.size);
  const colors = variants
    .map(variant => variant.color)
    .reduce(
      (acc: string[], color: string) =>
        acc.includes(color) ? acc : acc.concat([color]),
      []
    );

  useEffect(() => {
    if (imageIndex !== -1) {
      setSelectedVariant(imageIndex);
    }
  }, [imageIndex]);

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
          justifyContent='space-between'
          alignItems='center'
          classes={{
            root: clsx(classes.actionsContainer, classes.sectionContainer),
          }}
        >
          <Grid item>
            <Grid container direction='column'>
              <Grid item classes={{ root: classes.sizesAndSwatches }}>
                <Sizes
                  sizes={sizes}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                />
                <Swatches
                  colors={colors}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
              </Grid>
              <Grid item>
                <Typography variant='h3' classes={{ root: classes.stock }}>
                  12 Currently in stock
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <QtyButton />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductInfo;
