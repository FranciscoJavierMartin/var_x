import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import ProductFrameGrid from './ProductFrameGrid';
import ProductFrameList from './ProductFrameList';
import { Edge, Variant } from '../../interfaces/category-products';
import { Filters } from '../../interfaces/filters';
import { GET_DETAILS } from '../../apollo/queries';
import { QueryProductQty } from '../../interfaces/product-details';
import { Stock } from '../../interfaces/stock';

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
  const [selectedSize, setSelectedSize] = useState<string>(variant.size);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<Variant>();
  const [stock, setStock] = useState<Stock>(undefined);

  const sizes = product.node.variants.map(variant => variant.size);
  const colors = product.node.variants
    .map(item => ({
      color: item.color,
      size: item.size,
      style: item.style,
    }))
    .reduce(
      (
        acc: string[],
        { color, size, style }: { color: string; size: string; style: string }
      ) =>
        !acc.includes(color) &&
        size === (selectedSize || variant.size) &&
        style === variant.style
          ? acc.concat([color])
          : acc,
      []
    );

  const hasStyles: boolean = product.node.variants.some(
    variant => variant.style
  );

  const { loading, error, data } = useQuery<QueryProductQty, { id: string }>(
    GET_DETAILS,
    {
      variables: { id: `${product.node.strapiId}` },
    }
  );

  useEffect(() => {
    if (selectedSize) {
      const newVariant = product.node.variants.find(
        variant =>
          variant.size === selectedSize &&
          variant.style === variant.style &&
          variant.color === colors[0]
      );
      setSelectedVariant(newVariant);
      setSelectedColor(newVariant?.color || '');
    }
  }, [selectedSize]);

  useEffect(() => {
    if (error) {
      setStock(null);
    } else if (data) {
      setStock(data.product.variants);
    }
  }, [error, data]);

  return (
    <Frame
      variant={selectedVariant || variant}
      product={product}
      selectedColor={selectedColor || variant.color}
      selectedSize={selectedSize || variant.size}
      setSelectedColor={setSelectedColor}
      setSelectedSize={setSelectedSize}
      sizes={sizes}
      colors={colors}
      hasStyles={hasStyles}
      stock={stock}
    />
  );
};

interface ListOfProductsProps {
  products: Edge[];
  layout: 'grid' | 'list';
  setLayout: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
  currentPage: number;
  productsPerPage: number;
  filterOptions: Filters;
  content: { product: number; variant: Variant }[];
}

const ListOfProducts: React.FC<ListOfProductsProps> = ({
  products,
  layout,
  setLayout,
  currentPage,
  productsPerPage,
  filterOptions,
  content,
}) => {
  const classes = useStyles({ layout });
  const matchesSM = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));

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
