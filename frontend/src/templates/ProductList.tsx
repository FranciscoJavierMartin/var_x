import React from 'react';
import { Grid } from '@material-ui/core';
import Layout from '../components/ui/Layout';
import DynamicToolbar from '../components/product-list/DynamicToolbar';

interface ProductListProps {
  pageContext: {
    id: string;
    name: string;
    description: string;
  };
}

const ProductList: React.FC<ProductListProps> = ({ pageContext }) => {
  return (
    <Layout>
      <Grid container direction='column' alignItems='center'>
        <DynamicToolbar />
      </Grid>
    </Layout>
  );
};

export default ProductList;
