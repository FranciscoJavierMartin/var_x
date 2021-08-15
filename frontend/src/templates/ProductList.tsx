import React, { useState, useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import { Grid, Fab, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Layout from '../components/ui/Layout';
import DynamicToolbar from '../components/product-list/DynamicToolbar';
import ListOfProducts from '../components/product-list/ListOfProducts';
import { Filters, Option } from '../interfaces/filters';
import {
  Edge,
  GetCategoryProducts,
  Variant,
} from '../interfaces/category-products';
import { alphabetic, time, price } from '../utils/sortFunctions';

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
  const [sortOptions, setSortOptions] = useState<
    { label: string; active: boolean; function: (data: Edge[]) => Edge[] }[]
  >([
    {
      label: 'A-Z',
      active: true,
      function: (data: Edge[]) => alphabetic(data, 'asc'),
    },
    {
      label: 'Z-A',
      active: false,
      function: (data: Edge[]) => alphabetic(data, 'desc'),
    },
    {
      label: 'NEWEST',
      active: false,
      function: (data: Edge[]) => time(data, 'asc'),
    },
    {
      label: 'OLDEST',
      active: false,
      function: (data: Edge[]) => time(data, 'desc'),
    },
    {
      label: 'PRICE ↑',
      active: false,
      function: (data: Edge[]) => price(data, 'asc'),
    },
    {
      label: 'PRICE ↓',
      active: false,
      function: (data: Edge[]) => price(data, 'desc'),
    },
    {
      label: 'REVIEWS',
      active: false,
      function: (data: Edge[]) => alphabetic(data, 'asc'),
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();
  const selectedSortOption = sortOptions.find(option => option.active);
  // TODO: Move sorted products to graphQL query
  const sortedProducts = selectedSortOption?.function(products) || [];
  let isFiltered = false;
  let filters: { [key: string]: Option[] } = {};
  let filteredProducts: { product: number; variant: Variant }[] = [];
  const activeFilters = Object.keys(filterOptions).filter(
    option => filterOptions[option]
  );

  let content: { product: number; variant: Variant }[] = sortedProducts.flatMap(
    (product: Edge, index: number) =>
      product.node.variants.map((variant: Variant) => ({
        product: index,
        variant,
      }))
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filterOptions, layout]);

  const scroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const productsPerPage = layout === 'grid' ? 16 : 6;

  // TODO: Use filters from GraphQL
  activeFilters.map(option => {
    filterOptions[option].forEach(value => {
      if (value.checked) {
        isFiltered = true;

        if (!filters[option]) {
          filters[option] = [];
        }

        if (!filters[option].includes(value)) {
          filters[option].push(value);
        }

        content.forEach(item => {
          if (option === 'Color') {
            if (
              item.variant.colorLabel === value.label &&
              !filteredProducts.includes(item)
            ) {
              filteredProducts.push(item);
            }
          } else if (
            (item.variant as any)[option.toLowerCase()] === value.label &&
            !filteredProducts.includes(item)
          ) {
            filteredProducts.push(item);
          }
        });
      }
    });
  });

  Object.keys(filters).forEach(filter => {
    filteredProducts = filteredProducts.filter(item => {
      let valid;

      filters[filter].some((value: Option) => {
        if (filter === 'Color') {
          if (item.variant.colorLabel === value.label) {
            valid = item;
          }
        } else if (
          (item.variant as any)[filter.toLowerCase()] === value.label
        ) {
          valid = item;
        }
      });

      return valid;
    });
  });

  if (isFiltered) {
    content = filteredProducts;
  }

  const numPages = Math.ceil(content.length / productsPerPage);

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
          sortOptions={sortOptions}
          setSortOptions={setSortOptions}
        />
        <ListOfProducts
          filterOptions={filterOptions}
          currentPage={currentPage}
          productsPerPage={productsPerPage}
          products={products}
          layout={layout}
          setLayout={setLayout}
          content={content}
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
          created_at
          category {
            name
          }
          variants {
            color
            id
            price
            size
            style
            colorLabel
            images {
              url
            }
          }
        }
      }
    }
  }
`;
