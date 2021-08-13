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

const useStyles = makeStyles(theme => ({
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
  },
  product: {
    height: '20rem',
    width: '20rem',
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    height: '5rem',
    width: '25rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-0.1rem',
  },
  invisibility: {
    visibility: 'hidden',
  },
}));

interface ProductFrameGridProps {
  product: Edge;
  variant: Variant;
  selectedSize: string;
  selectedColor: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  sizes: string[];
  colors: string[];
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
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const matchesMD = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));

  if (matchesMD && open) {
    setOpen(false);
  }

  const imgURL = getImageByColor(
    product,
    variant,
    selectedColor,
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
          matchesMD
            ? navigate(`/${product.node.category.name.toLowerCase()}/${name.toLowerCase()}`)
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
      <QuickView
        open={open}
        setOpen={setOpen}
        url={imgURL}
        name={name}
        price={variant.price}
        product={product}
        selectedColor={selectedColor}
        setSelectedSize={setSelectedSize}
        setSelectedColor={setSelectedColor}
        selectedSize={selectedSize}
        sizes={sizes}
        colors={colors}
      />
    </Grid>
  );
};

export default ProductFrameGrid;
