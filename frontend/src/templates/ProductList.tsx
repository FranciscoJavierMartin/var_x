import React, { useState, useRef } from 'react';
import { graphql } from 'gatsby';
import { Grid, Fab, makeStyles } from '@material-ui/core';
import Layout from '../components/ui/Layout';
import DynamicToolbar from '../components/product-list/DynamicToolbar';
import { Filters } from '../interfaces/filters';
import { GetCategoryProducts } from '../interfaces/category-products';
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
  pageContext: { name, description, filterOptions },
  data: {
    allStrapiProduct: { edges: products },
  },
}) => {
  const [layout, setLayout] = useState<'grid' | 'list'>('list');
  const scrollRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();

  const scroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout>
      <Grid container direction='column' alignItems='center'>
        <div ref={scrollRef} />
        <DynamicToolbar
          filterOptions={filterOptions}
          name={name}
          description={description}
          layout={layout}
          setLayout={setLayout}
        />
        <ListOfProducts
          products={products}
          layout={layout}
          setLayout={setLayout}
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
