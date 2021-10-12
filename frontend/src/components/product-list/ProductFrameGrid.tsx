import React, { useState } from 'react';
import { navigate } from 'gatsby';
import {
  Grid,
  Typography,
  makeStyles,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import clsx from 'clsx';
import QuickView from './QuickView';
import { Edge, Variant } from '../../interfaces/category-products';

import frame from '../../images/product-frame-grid.svg';
import { getImageByColor } from '../../utils/imageByColor';
import { Stock } from '../../interfaces/stock';

const useStyles = makeStyles<Theme, { small: boolean }>(theme => ({
  frameContainer: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  frame: {
    backgroundImage: `url(${frame})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    height: '25rem',
    width: '25rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      height: '20rem',
      width: '20rem',
    },
    [theme.breakpoints.up('xs')]: {
      height: ({ small }) => (small ? '15rem' : undefined),
      width: ({ small }) => (small ? '15rem' : undefined),
    },
  },
  product: {
    height: '20rem',
    width: '20rem',
    [theme.breakpoints.down('xs')]: {
      height: '15rem',
      width: '15rem',
    },
    [theme.breakpoints.up('xs')]: {
      height: ({ small }) => (small ? '12rem' : undefined),
      width: ({ small }) => (small ? '12rem' : undefined),
    },
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    height: '5rem',
    width: '25rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-0.1rem',
    [theme.breakpoints.down('xs')]: {
      width: '20rem',
    },
    [theme.breakpoints.up('xs')]: {
      width: ({ small }) => (small ? '15rem' : undefined),
    },
  },
  invisibility: {
    visibility: 'hidden',
  },
}));

interface ProductFrameGridProps {
  product: Edge;
  variant: Variant;
  selectedSize?: string;
  selectedColor?: string;
  setSelectedSize?: React.Dispatch<React.SetStateAction<string>>;
  setSelectedColor?: React.Dispatch<React.SetStateAction<string>>;
  sizes?: string[];
  colors?: string[];
  hasStyles: boolean;
  disableQuickView?: boolean;
  small?: boolean;
  stock: Stock;
  rating: number;
}

const ProductFrameGrid: React.FC<ProductFrameGridProps> = ({
  product,
  variant,
  selectedColor,
  setSelectedSize,
  setSelectedColor,
  selectedSize,
  sizes,
  colors,
  hasStyles,
  disableQuickView,
  small,
  stock,
  rating,
}) => {
  const classes = useStyles({ small: !!small });
  const [open, setOpen] = useState<boolean>(false);
  const matchesMD = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));

  if (matchesMD && open) {
    setOpen(false);
  }

  const imgURL = getImageByColor(
    product,
    variant,
    selectedColor || '',
    variant.images[0].url
  );
  const name = product.node.name.split(' ')[0];

  return (
    <Grid
      item
      classes={{
        root: clsx(classes.frameContainer, {
          [classes.invisibility]: open,
        }),
      }}
    >
      <Grid
        container
        direction='column'
        onClick={() =>
          matchesMD || disableQuickView
            ? navigate(
                `/${product.node.category.name.toLowerCase()}/${name.toLowerCase()}${
                  hasStyles ? `?style=${variant.style}` : ''
                }`
              )
            : setOpen(true)
        }
      >
        <Grid item classes={{ root: classes.frame }}>
          <img src={imgURL} alt={name} className={classes.product} />
        </Grid>
        <Grid item classes={{ root: classes.title }}>
          <Typography variant='h5'>{name}</Typography>
        </Grid>
      </Grid>
      {!disableQuickView && (
        <QuickView
          open={open}
          setOpen={setOpen}
          url={imgURL}
          name={name}
          price={variant.price}
          product={product}
          variant={variant}
          selectedColor={selectedColor!}
          setSelectedSize={setSelectedSize!}
          setSelectedColor={setSelectedColor!}
          selectedSize={selectedSize!}
          sizes={sizes || []}
          colors={colors || []}
          hasStyles={hasStyles}
          stock={stock}
          rating={rating}
        />
      )}
    </Grid>
  );
};

export default ProductFrameGrid;
