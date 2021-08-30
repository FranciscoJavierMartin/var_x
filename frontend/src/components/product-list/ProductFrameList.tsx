import React from 'react';
import { Link } from 'gatsby';
import { Grid, Typography, Chip, makeStyles } from '@material-ui/core';
import Rating from '../shared/Rating';
import Sizes from '../shared/Sizes';
import Swatches from '../shared/Swatches';
import QtyButton from './QtyButton';
import { Edge, Image, Variant } from '../../interfaces/category-products';

import frame from '../../images/product-frame-list.svg';
import { getColorIndex, getImagesByColor } from '../../utils/imageByColor';
import { getStockDisplay } from '../../utils/getInfo';
import { Stock } from '../../interfaces/stock';

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
    [theme.breakpoints.down('md')]: {
      height: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      height: '26rem',
    },
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
  chipLabel: {
    fontSize: '2rem',
    '&:hover': {
      cursor: 'pointer',
    },
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
  hasStyles: boolean;
  stock: Stock;
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
  hasStyles,
  stock,
}) => {
  const classes = useStyles();

  const images = getImagesByColor(
    product,
    variant,
    selectedColor,
    variant.images
  );

  const imageIndex = getColorIndex(product, variant, selectedColor);
  const selectedVariant =
    imageIndex === -1 ? product.node.variants.indexOf(variant) : imageIndex;
  const stockDisplay = getStockDisplay(stock, selectedVariant);

  return (
    <Grid item container>
      <Grid
        item
        lg={9}
        container
        alignItems='center'
        justifyContent='space-around'
        classes={{ root: classes.frame }}
      >
        {images.map((image: Image) => (
          <Grid
            item
            key={image.url}
            component={Link}
            to={`/${product.node.category.name.toLowerCase()}/${product.node.name
              .split(' ')[0]
              .toLowerCase()}${hasStyles ? `?style=${variant.style}` : ''}`}
          >
            <img
              src={`${process.env.GATSBY_STRAPI_URL}${image.url}`}
              alt={image.url}
              className={classes.productImage}
            />
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        lg={3}
        container
        direction='column'
        justifyContent='space-between'
        classes={{ root: classes.info }}
      >
        <Grid
          item
          container
          direction='column'
          component={Link}
          to={`/${product.node.category.name.toLowerCase()}/${product.node.name
            .split(' ')[0]
            .toLowerCase()}${hasStyles ? `?style=${variant.style}` : ''}`}
        >
          <Grid item>
            <Typography variant='h4'>
              {product.node.name.split(' ')[0]}
            </Typography>
          </Grid>
          <Grid item>
            <Rating rate={3.5} />
          </Grid>
          <Grid item>
            <Chip
              label={`$${variant.price}`}
              classes={{ label: classes.chipLabel }}
            />
          </Grid>
          <Grid item>
            <Typography variant='h3' classes={{ root: classes.stock }}>
              {stockDisplay}
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
        <QtyButton
          stock={stock}
          selectedVariant={selectedVariant}
          name={product.node.name.split(' ')[0]}
          variants={product.node.variants}
        />
      </Grid>
    </Grid>
  );
};

export default ProductFrameList;
