import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import ProductImages from '../components/product-detail/ProductImages';
import Layout from '../components/ui/Layout';
import ProductInfo from '../components/product-detail/ProductInfo';
import { Variant } from '../interfaces/category-products';

interface ProductDetailProps {
  pageContext: {
    id: string;
    name: string;
    category: string;
    description: string;
    variants: Variant[];
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  pageContext: { name, id, category, description, variants },
}) => {
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  return (
    <Layout>
      <Grid container direction='column'>
        <Grid item container>
          <ProductImages
            images={variants[selectedVariant].images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          <ProductInfo
            variants={variants}
            description={description}
            name={name}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProductDetail;
