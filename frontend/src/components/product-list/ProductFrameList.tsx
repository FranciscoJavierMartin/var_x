import React from 'react';
import { Grid, Typography, Chip, makeStyles } from '@material-ui/core';
import Rating from '../shared/Rating';
import Sizes from './Sizes';
import Swatches from './Swatches';
import QtyButton from './QtyButton';
import { Edge, Image, Variant } from '../../interfaces/category-products';

import frame from '../../images/product-frame-list.svg';

const useStyles = makeStyles(theme => ({
  frame: {
    backgroundImage: `url(${frame})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '28rem',
  },
  info: {
    backgroundColor: theme.palette.primary.main,
    height: '100%',
    width: '100%',
    padding: '1rem',
  },
  productImage: {
    height: '20rem',
    width: '20rem',
  },
  stock: {
    color: theme.palette.common.white,
  },
  sizesAndSwatches: {
    maxWidth: '13rem',
    
  },
}));

interface ProductFrameListProps {
  product: Edge;
  variant: Variant;
  selectedSize: string;
  selectedColor: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  sizes: string[];
  colors: string[];
}

const ProductFrameList: React.FC<ProductFrameListProps> = ({
  product,
  variant,
  selectedSize,
  setSelectedColor,
  setSelectedSize,
  selectedColor,
  sizes,
  colors,
}) => {
  const classes = useStyles();

  return (
    <Grid item container>
      <Grid
        item
        xs={9}
        container
        alignItems='center'
        justifyContent='space-around'
        classes={{ root: classes.frame }}
      >
        {variant.images.map((image: Image) => (
          <>
            <Grid item key={image.url}>
              <img
                src={`${process.env.GATSBY_STRAPI_URL}${image.url}`}
                alt={image.url}
                className={classes.productImage}
              />
            </Grid>
          </>
        ))}
      </Grid>
      <Grid
        item
        xs={3}
        container
        direction='column'
        justifyContent='space-between'
        classes={{ root: classes.info }}
      >
        <Grid item container direction='column'>
          <Grid item>
            <Typography variant='h4'>
              {product.node.name.split(' ')[0]}
            </Typography>
          </Grid>
          <Grid item>
            <Rating rate={3.5} />
          </Grid>
          <Grid item>
            <Chip label={`$${variant.price}`} />
          </Grid>
          <Grid item>
            <Typography variant='h3' classes={{ root: classes.stock }}>
              12 Current In Stock
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction='column'
          classes={{ root: classes.sizesAndSwatches }}
        >
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
        <QtyButton />
      </Grid>
    </Grid>
  );
};

export default ProductFrameList;
