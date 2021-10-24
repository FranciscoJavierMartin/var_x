import React, { useEffect, useState, useContext } from 'react';
import {
  Grid,
  Button,
  Typography,
  Chip,
  makeStyles,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import clsx from 'clsx';
import Rating from '../shared/Rating';
import Sizes from '../shared/Sizes';
import Swatches from '../shared/Swatches';
import Favorite from '../shared/Favorite';
import QtyButton from '../shared/QtyButton';
import { UserContext, FeedbackContext } from '../../contexts';
import { openSnackbar, SnackbarStatus } from '../../contexts/feedback/actions';
import { getColorIndex } from '../../utils/imageByColor';
import { getStockDisplay } from '../../utils/getInfo';
import { Stock } from '../../interfaces/stock';
import { Variant } from '../../interfaces/product-details';

import subscription from '../../images/subscription.svg';

const useStyles = makeStyles(theme => ({
  background: {
    backgroundColor: theme.palette.secondary.main,
    height: '45rem',
    width: '35rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      height: '58rem',
    },
  },
  center: {
    backgroundColor: theme.palette.primary.main,
    height: '35rem',
    width: '45rem',
    position: 'absolute',
    [theme.breakpoints.down('lg')]: {
      width: '40rem',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      height: '48rem',
    },
  },
  icon: {
    height: '4rem',
    width: '4rem',
  },
  iconWrapper: {
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
    marginLeft: '-8px',
  },
  detailsContainer: {
    padding: '0.5rem 1rem',
  },
  chipContainer: {
    marginTop: '1rem',
    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
      marginBottom: '1rem',
    },
  },
  chipRoot: {
    height: '3rem',
    width: 'auto',
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
  stock: Stock;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  rating: number;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  description,
  variants,
  selectedVariant,
  setSelectedVariant,
  stock,
  setIsEdit,
  rating,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(
    variants[selectedVariant].size
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    variants[selectedVariant].color
  );

  const { user } = useContext(UserContext);
  const { dispatchFeedback } = useContext(FeedbackContext);
  const classes = useStyles();
  const matchesXS = useMediaQuery<Theme>(theme => theme.breakpoints.down('xs'));
  const imageIndex = getColorIndex(
    { node: { variants } },
    variants[selectedVariant],
    selectedColor
  );

  const sizes = variants.map(variant => variant.size);
  const colors = variants
    .map(variant => ({
      color: variant.color,
      size: variant.size,
      style: variant.style,
    }))
    .reduce(
      (
        acc: string[],
        { color, size, style }: { color: string; size: string; style: string }
      ) =>
        !acc.includes(color) &&
        size === selectedSize &&
        style === variants[selectedVariant].style
          ? acc.concat([color])
          : acc,
      []
    );

  const stockDisplay: string = getStockDisplay(stock, selectedVariant);

  const handleEdit = () => {
    if (user.username === 'Guest') {
      dispatchFeedback(
        openSnackbar(
          SnackbarStatus.Error,
          'You must be logged in to leave a review'
        )
      );
    } else {
      setIsEdit(true);
      const reviewRef = document.getElementById('reviews');
      reviewRef?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (imageIndex !== -1) {
      setSelectedVariant(imageIndex);
    }
  }, [imageIndex]);

  useEffect(() => {
    const newVariantIndex = variants.findIndex(
      variant =>
        variant.size === selectedSize &&
        variant.style === variants[selectedVariant].style &&
        variant.color === colors[0]
    );
    setSelectedVariant(newVariantIndex);
    setSelectedColor(variants[newVariantIndex].color);
  }, [selectedSize]);

  return (
    <Grid
      item
      container
      justifyContent='center'
      alignItems='flex-end'
      direction='column'
      lg={6}
    >
      <Grid
        item
        container
        justifyContent='flex-end'
        classes={{ root: classes.background }}
      >
        <Grid item classes={{ root: classes.iconWrapper }}>
          <Favorite variant={variants[selectedVariant].id} size={4} noPadding />
        </Grid>
        <Grid item classes={{ root: classes.iconWrapper }}>
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
          direction={matchesXS ? 'column' : 'row'}
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
                <Rating rate={rating} />
              </Grid>
              <Grid item>
                <Button onClick={handleEdit}>
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
          justifyContent={matchesXS ? 'space-around' : 'space-between'}
          direction={matchesXS ? 'column' : 'row'}
          alignItems={matchesXS ? 'flex-start' : 'center'}
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
                  {stockDisplay}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <QtyButton
              variants={variants}
              stock={stock}
              selectedVariant={selectedVariant}
              name={name}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductInfo;
