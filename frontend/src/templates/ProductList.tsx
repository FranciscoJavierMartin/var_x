import React from 'react';
import { graphql } from 'gatsby';
import { Grid } from '@material-ui/core';
import Layout from '../components/ui/Layout';
import DynamicToolbar from '../components/product-list/DynamicToolbar';
import { Filters } from '../interfaces/filters';
import { GetCategoryProducts } from '../interfaces/category-products';
import ListOfProducts from '../components/product-list/ListOfProducts';

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
  return (
    <Layout>
      <Grid container direction='column' alignItems='center'>
        <DynamicToolbar
          filterOptions={filterOptions}
          name={name}
          description={description}
        />
        <ListOfProducts products={products} />
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
