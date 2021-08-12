import React, { useState } from 'react';
import { Grid, makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import ProductFrameGrid from './ProductFrameGrid';
import ProductFrameList from './ProductFrameList';
import { Edge, Variant } from '../../interfaces/category-products';

const useStyles = makeStyles<Theme, { layout: 'grid' | 'list' }>(theme => ({
  productContainer: {
    width: '95%',
    [theme.breakpoints.only('xl')]: {
      '& > *': {
        marginRight: ({ layout }) =>
          layout === 'grid' ? 'calc((100% - (25rem * 4)) / 3)' : 0,
        marginBottom: '5rem',
      },
      '& > :nth-child(4n)': {
        marginRight: 0,
      },
    },
    [theme.breakpoints.only('lg')]: {
      '& > *': {
        marginRight: ({ layout }) =>
          layout === 'grid' ? 'calc((100% - (25rem * 3)) / 2)' : 0,
        marginBottom: '5rem',
      },
      '& > :nth-child(3n)': {
        marginRight: 0,
      },
    },
    [theme.breakpoints.only('md')]: {
      '& > *': {
        marginRight: ({ layout }) =>
          layout === 'grid' ? 'calc(100% - (25rem * 2))' : 0,
        marginBottom: '5rem',
      },
      '& > :nth-child(2n)': {
        marginRight: 0,
      },
    },
    [theme.breakpoints.only('sm')]: {
      '& > *': {
        marginBottom: '5rem',
      },
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
  const matchesSM = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));

  const content: { product: number; variant: Variant }[] = products.flatMap(
    (product: Edge, index: number) =>
      product.node.variants.map((variant: Variant) => ({
        product: index,
        variant,
      }))
  );

  return (
    <Grid
      item
      container
      direction={matchesSM ? 'column' : 'row'}
      alignItems={matchesSM ? 'center' : undefined}
      classes={{ root: classes.productContainer }}
    >
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
