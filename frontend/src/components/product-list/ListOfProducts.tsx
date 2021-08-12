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
  const colors = product.node.variants
    .map(variant => variant.color)
    .reduce(
      (acc: string[], color: string) =>
        acc.includes(color) ? acc : acc.concat([color]),
      []
    );

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
  currentPage: number;
  productsPerPage: number;
}

const ListOfProducts: React.FC<ListOfProductsProps> = ({
  products,
  layout,
  setLayout,
  currentPage,
  productsPerPage,
}) => {
  const classes = useStyles({ layout });

  const content: { product: number; variant: Variant }[] = products.flatMap(
    (product: Edge, index: number) =>
      product.node.variants.map((variant: Variant) => ({
        product: index,
        variant,
      }))
  );
  return (
    <Grid item container classes={{ root: classes.productContainer }}>
      {content
        .slice(
          (currentPage - 1) * productsPerPage,
          currentPage * productsPerPage
        )
        .map(item => (
          <FrameHelper
            Frame={layout === 'grid' ? ProductFrameGrid : ProductFrameList}
            key={item.variant.id}
            variant={item.variant}
            product={products[item.product]}
          />
        ))}
    </Grid>
  );
};

export default ListOfProducts;
