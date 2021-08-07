import React from 'react';
import { Grid } from '@material-ui/core';
import Layout from '../components/ui/Layout';
import DynamicToolbar from '../components/product-list/DynamicToolbar';
import { Filters } from '../interfaces/filters';

interface ProductListProps {
  pageContext: {
    id: string;
    name: string;
    description: string;
    filterOptions: Filters;
  };
}

const ProductList: React.FC<ProductListProps> = ({
  pageContext: { name, description, filterOptions },
}) => {
  return (
    <Layout>
      <Grid container direction='column' alignItems='center'>
        <DynamicToolbar
          filterOptions={filterOptions}
          name={name}
          description={description}
        />
      </Grid>
    </Layout>
  );
};

export default ProductList;
