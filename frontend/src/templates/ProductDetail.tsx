import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Theme, useMediaQuery } from '@material-ui/core';
import ProductImages from '../components/product-detail/ProductImages';
import Layout from '../components/ui/Layout';
import ProductInfo from '../components/product-detail/ProductInfo';
import RecentlyViewed from '../components/product-detail/RecentlyViewed';
import ProductReviews from '../components/product-detail/ProductReviews';
import {
  Product,
  QueryProductQty,
  Variant,
} from '../interfaces/product-details';
import { RECENTLY_VIEWED } from '../constants/localStorage';
import { getRecentlyViewProducts } from '../utils/localStorage';
import { GET_DETAILS } from '../apollo/queries';
import { Stock } from '../interfaces/stock';

interface ProductDetailProps {
  pageContext: {
    id: string;
    name: string;
    category: string;
    description: string;
    variants: Variant[];
    product: Product;
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  pageContext: { name, id, category, description, variants, product },
}) => {
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [stock, setStock] = useState<Stock>(undefined);
  const matchesMD = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
  const params = new URLSearchParams(window.location.search);
  const paramStyle = params.get('style');
  let recentlyView: Product[] = getRecentlyViewProducts();

  const { loading, error, data } = useQuery<QueryProductQty, { id: string }>(
    GET_DETAILS,
    {
      variables: { id },
    }
  );

  useEffect(() => {
    if (error) {
      setStock(null);
    } else if (data) {
      setStock(data.product.variants);
    }
  }, [error, data]);

  useEffect(() => {
    // Get variant
    const styledVariantIndex = variants.findIndex(
      variant => variant.style === paramStyle
    );

    if (styledVariantIndex !== -1) {
      setSelectedVariant(styledVariantIndex);
    }

    // Get recently view products
    recentlyView = getRecentlyViewProducts();

    if (recentlyView.length > 0) {
      if (recentlyView.length === 10) {
        recentlyView.shift();
      }

      if (
        !recentlyView.some(
          product =>
            product.node.name === name &&
            product.node.selectedVariant === styledVariantIndex
        )
      ) {
        recentlyView.push({
          node: { ...product.node, selectedVariant: styledVariantIndex },
        });
      }
    } else {
      recentlyView.push({
        node: { ...product.node, selectedVariant: styledVariantIndex },
      });
    }

    localStorage.setItem(RECENTLY_VIEWED, JSON.stringify(recentlyView));
  }, [paramStyle]);

  return (
    <Layout>
      <Grid container direction='column'>
        <Grid item container direction={matchesMD ? 'column' : 'row'}>
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
            stock={stock}
          />
        </Grid>
        <RecentlyViewed products={recentlyView} />
        <ProductReviews product={id} />
      </Grid>
    </Layout>
  );
};

export default ProductDetail;
