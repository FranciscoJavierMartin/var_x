import React, { useState } from 'react';
import {
  Grid,
  Dialog,
  DialogContent,
  Typography,
  Button,
  Chip,
  makeStyles,
} from '@material-ui/core';
import Rating from '../home/Rating';
import Sizes from './Sizes';
import Swatches from './Swatches';
import QtyButton from './QtyButton';

import frame from '../../images/selected-frame.svg';
import explore from '../../images/explore.svg';
import { Edge } from '../../interfaces/category-products';

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
}));

interface QuickViewProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  url: string;
  name: string;
  price: number;
  product: Edge;
}

const QuickView: React.FC<QuickViewProps> = ({
  open,
  setOpen,
  url,
  name,
  price,
  product,
}) => {
  const classes = useStyles();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const sizes = product.node.variants.map(variant => variant.size);
  const colors = product.node.variants.map(variant => variant.color);

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogContent classes={{ root: classes.selectedFrame }}>
        <Grid container direction='column' alignItems='center'>
          <Grid item>
            <img
              src={url}
              alt='product image'
              className={classes.productImage}
            />
          </Grid>
          <Grid
            item
            justifyContent='space-between'
            container
            classes={{ root: classes.toolbar }}
          >
            <Grid item>
              <Grid
                container
                direction='column'
                justifyContent='space-between'
                classes={{ root: classes.infoContainer }}
              >
                <Grid item>
                  <Typography variant='h4'>{name}</Typography>
                  <Rating rate={4} />
                </Grid>
                <Grid item>
                  <Typography variant='h3' classes={{ root: classes.stock }}>
                    12 Currently In Stock
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
            <Grid item>
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
                <QtyButton />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default QuickView;
