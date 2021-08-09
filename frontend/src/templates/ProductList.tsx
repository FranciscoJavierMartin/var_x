import React, { useState } from 'react';
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
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  return (
    <Layout>
      <Grid container direction='column' alignItems='center'>
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
