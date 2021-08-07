import React from 'react';

interface ProductListProps {
  pageContext: {
    id: string;
    name: string;
    description: string;
  };
}

const ProductList: React.FC<ProductListProps> = ({ pageContext }) => {
  return <div>{pageContext.name}</div>;
};

export default ProductList;
