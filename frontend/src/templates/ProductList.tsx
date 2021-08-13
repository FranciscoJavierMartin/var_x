import React, { useState, useRef } from 'react';
import { graphql } from 'gatsby';
import { Grid, Fab, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Layout from '../components/ui/Layout';
import DynamicToolbar from '../components/product-list/DynamicToolbar';
import { Filters } from '../interfaces/filters';
import { Edge, GetCategoryProducts } from '../interfaces/category-products';
import ListOfProducts from '../components/product-list/ListOfProducts';

const useStyles = makeStyles(theme => ({
  fab: {
    alignSelf: 'flex-end',
    marginRight: '2rem',
    marginBottom: '2rem',
    color: theme.palette.common.white,
    fontFamily: 'Montserrat',
    fontSize: '5rem',
    width: '5rem',
    height: '5rem',
  },
  pagination: {
    alignSelf: 'flex-end',
    marginRight: '2%',
    marginTop: '-3rem',
    marginBottom: '4rem',
    [theme.breakpoints.only('md')]: {
      marginTop: '1rem',
    },
  },
  '@global': {
    '.MuiPaginationItem-root': {
      fontFamily: 'Montserrat',
      fontSize: '2rem',
      color: theme.palette.primary.main,
      '&.Mui-selected': {
        color: theme.palette.common.white,
      },
    },
  },
}));

interface ProductListProps {
  pageContext: {
    id: string;
    name: string;
    description: string;
    filterOptions: Filters;
  };
  data: GetCategoryProducts;
}

const ProductList: React.FC<ProductListProps> = ({
  pageContext: { name, description, filterOptions: options },
  data: {
    allStrapiProduct: { edges: products },
  },
}) => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterOptions, setFilterOptions] = useState<Filters>(options);
  const scrollRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();

  const scroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const productsPerPage = layout === 'grid' ? 16 : 6;
  const numVariants: number = products.reduce<number>(
    (acc: number, product: Edge) => acc + product.node.variants.length,
    0
  );

  const numPages = Math.ceil(numVariants / productsPerPage);

  return (
    <Layout>
      <Grid container direction='column' alignItems='center'>
        <div ref={scrollRef} />
        <DynamicToolbar
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          name={name}
          description={description}
          layout={layout}
          setLayout={setLayout}
          setCurrentPage={setCurrentPage}
        />
        <ListOfProducts
          currentPage={currentPage}
          productsPerPage={productsPerPage}
          products={products}
          layout={layout}
          setLayout={setLayout}
        />
        <Pagination
          color='primary'
          count={numPages}
          page={currentPage}
          onChange={(e, newPage: number) => setCurrentPage(newPage)}
          classes={{ root: classes.pagination }}
        />
        <Fab onClick={scroll} color='primary' classes={{ root: classes.fab }}>
          ^
        </Fab>
      </Grid>
    </Layout>
  );
};

export default ProductList;

export const query = graphql`
  query GetCategoryProducts($id: Int!) {
    allStrapiProduct(filter: { category: { id: { eq: $id } } }) {
      edges {
        node {
          name
          strapiId
          category {
            name
          }
          variants {
            color
            id
            price
            size
            style
            images {
              url
            }
          }
        }
      }
    }
  }
`;
