import React, { useState } from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import ProductFrameGrid from './ProductFrameGrid';
import ProductFrameList from './ProductFrameList';
import { Edge, Variant } from '../../interfaces/category-products';

const useStyles = makeStyles<Theme, { layout: 'grid' | 'list' }>(theme => ({
  productContainer: {
    width: '95%',
    '& > *': {
      marginRight: ({ layout }) =>
        layout === 'grid' ? 'calc((100% - (25rem * 4)) / 3)' : 0,
      marginBottom: '5rem',
    },
    '& > :nth-child(4n)': {
      marginRight: 0,
    },
  },
}));

const FrameHelper = ({
  Frame,
  product,
  variant,
}: {
  Frame: typeof ProductFrameGrid | typeof ProductFrameList;
  product: Edge;
  variant: Variant;
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const sizes = product.node.variants.map(variant => variant.size);
  const colors = product.node.variants.map(variant => variant.color);

  return (
    <Frame
      variant={variant}
      product={product}
      selectedColor={selectedColor}
      selectedSize={selectedSize}
      setSelectedColor={setSelectedColor}
      setSelectedSize={setSelectedSize}
      sizes={sizes}
      colors={colors}
    />
  );
};

interface ListOfProductsProps {
  products: Edge[];
  layout: 'grid' | 'list';
  setLayout: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
}

const ListOfProducts: React.FC<ListOfProductsProps> = ({
  products,
  layout,
  setLayout,
}) => {
  const classes = useStyles({ layout });

  return (
    <Grid item container classes={{ root: classes.productContainer }}>
      {products.map(product =>
        product.node.variants.map(variant => (
          <FrameHelper
            Frame={layout === 'grid' ? ProductFrameGrid : ProductFrameList}
            key={variant.id}
            variant={variant}
            product={product}
          />
        ))
      )}
    </Grid>
  );
};

export default ListOfProducts;
