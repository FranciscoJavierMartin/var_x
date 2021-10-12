import React from 'react';
import { Link } from 'gatsby';
import {
  Grid,
  Dialog,
  DialogContent,
  Typography,
  Button,
  Chip,
  makeStyles,
} from '@material-ui/core';
import Rating from '../shared/Rating';
import Sizes from '../shared/Sizes';
import Swatches from '../shared/Swatches';
import QtyButton from './QtyButton';

import frame from '../../images/selected-frame.svg';
import explore from '../../images/explore.svg';
import { Edge, Variant } from '../../interfaces/category-products';
import { getColorIndex } from '../../utils/imageByColor';
import { getStockDisplay } from '../../utils/getInfo';
import { Stock } from '../../interfaces/stock';

const useStyles = makeStyles(theme => ({
  dialog: {
    maxWidth: '100%',
  },
  selectedFrame: {
    backgroundImage: `url(${frame})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '60.4rem',
    width: '73.5rem',
    padding: '0 !important',
  },
  productImage: {
    height: '40rem',
    width: '40rem',
  },
  toolbar: {
    backgroundColor: theme.palette.primary.main,
    height: '13rem',
    marginTop: '2rem',
    padding: '0.5rem 1rem',
    position: 'relative',
  },
  stock: {
    color: theme.palette.common.white,
  },
  details: {
    color: theme.palette.common.white,
    textTransform: 'none',
    fontSize: '1.5rem',
  },
  exploreIcon: {
    height: '1.5rem',
    width: '2rem',
    marginLeft: '0.5rem',
  },
  detailButton: {
    padding: 0,
  },
  infoContainer: {
    height: '100%',
  },
  chipRoot: {
    transform: 'scale(1.5)',
  },
  chipContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  qtyContainer: {
    marginTop: '2.25rem',
  },
  infoItem: {
    position: 'absolute',
    left: '1rem',
    height: 'calc(100% - 1rem)',
  },
  actionsItems: {
    position: 'absolute',
    right: '1rem',
  },
}));

interface QuickViewProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  url: string;
  name: string;
  price: number;
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
  rating: number;
}

const QuickView: React.FC<QuickViewProps> = ({
  open,
  setOpen,
  url,
  name,
  price,
  product,
  variant,
  selectedColor,
  selectedSize,
  setSelectedColor,
  setSelectedSize,
  sizes,
  colors,
  hasStyles,
  stock,
  rating,
}) => {
  const classes = useStyles();
  const imageIndex = getColorIndex(product, variant, selectedColor);
  const selectedVariant =
    imageIndex === -1 ? product.node.variants.indexOf(variant) : imageIndex;
  const stockDisplay = getStockDisplay(stock, selectedVariant);

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogContent classes={{ root: classes.selectedFrame }}>
        <Grid container direction='column' alignItems='center'>
          <Grid
            item
            component={Link}
            to={`/${product.node.category.name.toLowerCase()}/${product.node.name
              .split(' ')[0]
              .toLowerCase()}${hasStyles ? `?style=${variant.style}` : ''}`}
          >
            <img
              src={url}
              alt='product image'
              className={classes.productImage}
            />
          </Grid>
          <Grid
            item
            justifyContent='center'
            container
            classes={{ root: classes.toolbar }}
          >
            <Grid item classes={{ root: classes.infoItem }}>
              <Grid
                container
                direction='column'
                justifyContent='space-between'
                classes={{ root: classes.infoContainer }}
                component={Link}
                to={`/${product.node.category.name.toLowerCase()}/${product.node.name
                  .split(' ')[0]
                  .toLowerCase()}${hasStyles ? `?style=${variant.style}` : ''}`}
              >
                <Grid item>
                  <Typography variant='h4'>{name}</Typography>
                  <Rating rate={rating} />
                </Grid>
                <Grid item>
                  <Typography variant='h3' classes={{ root: classes.stock }}>
                    {stockDisplay}
                  </Typography>
                  <Button classes={{ root: classes.detailButton }}>
                    <Typography
                      variant='h3'
                      classes={{ root: classes.details }}
                    >
                      Details
                    </Typography>
                    <img
                      src={explore}
                      className={classes.exploreIcon}
                      alt='go to product detail page'
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item classes={{ root: classes.chipContainer }}>
              <Chip label={`$${price}`} classes={{ root: classes.chipRoot }} />
            </Grid>
            <Grid item classes={{ root: classes.actionsItems }}>
              <Grid container direction='column'>
                <Sizes
                  sizes={sizes}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                />
                <Swatches
                  colors={colors}
                  setSelectedColor={setSelectedColor}
                  selectedColor={selectedColor}
                />
                <span className={classes.qtyContainer}>
                  <QtyButton
                    name={name}
                    stock={stock}
                    selectedVariant={selectedVariant}
                    variants={product.node.variants}
                  />
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default QuickView;
