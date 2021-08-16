import React, { useState } from 'react';
import { Grid, Button, makeStyles } from '@material-ui/core';
import ProductFrameGrid from '../product-list/ProductFrameGrid';
import { Product } from '../../interfaces/product-details';

const useStyles = makeStyles(theme => ({
  recentContainer: {
    margin: '10rem 0',
    '& > :not(:last-child)': {
      marginRight: '5rem',
    },
  },
  arrow: {
    minWidth: 0,
    height: '4rem',
    width: '4rem',
    fontSize: '4rem',
    color: theme.palette.primary.main,
    borderRadius: 50,
  },
}));

interface RecentlyViewedProps {
  products: Product[];
}

const NUMBER_OF_SLIDES_TO_SHOW: number = 4;

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({ products }) => {
  const classes = useStyles();
  const [firstIndex, setFirstIndex] = useState<number>(0);

  const handleNavigation = (direction: 'forward' | 'backward') => {
    if (
      !(firstIndex === 0 && direction === 'backward') &&
      !(
        firstIndex + NUMBER_OF_SLIDES_TO_SHOW === products.length &&
        direction === 'forward'
      )
    ) {
      setFirstIndex(prevState =>
        direction === 'forward' ? prevState + 1 : prevState - 1
      );
    }
  };

  return (
    <Grid
      item
      container
      justifyContent='center'
      alignItems='center'
      classes={{ root: classes.recentContainer }}
    >
      <Grid item>
        <Button
          onClick={() => handleNavigation('backward')}
          classes={{ root: classes.arrow }}
        >
          {'<'}
        </Button>
      </Grid>
      {products
        .slice(firstIndex, firstIndex + NUMBER_OF_SLIDES_TO_SHOW)
        .map(product => {
          const hasStyles = product.node.variants.some(
            variant => variant.style
          );
          return (
            <ProductFrameGrid
              key={product.node.variants[product.node.selectedVariant!].id}
              product={{ node: { ...product.node, created_at: new Date() } }}
              variant={product.node.variants[product.node.selectedVariant!]}
              small
              disableQuickView
              hasStyles={hasStyles}
            />
          );
        })}
      <Grid item>
        <Button
          onClick={() => handleNavigation('forward')}
          classes={{ root: classes.arrow }}
        >
          {'>'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default RecentlyViewed;
