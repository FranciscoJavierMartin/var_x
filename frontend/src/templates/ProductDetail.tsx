import React from 'react';

interface ProductDetailProps {
  pageContext: {
    id: string;
    name: string;
    category: string;
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ pageContext }) => {
  return <div>{pageContext.name}</div>;
};

export default ProductDetail;
