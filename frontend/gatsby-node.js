exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [{ test: /react-spring-3d-carousel/, use: loaders.null() }],
      },
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const results = await graphql(
    `
      {
        products: allStrapiProduct {
          edges {
            node {
              name
              strapiId
              category {
                name
              }
            }
          }
        }
        categories: allStrapiCategory {
          edges {
            node {
              name
              strapiId
              description
            }
          }
        }
      }
    `
  );

  if (results.errors) {
    throw results.errors;
  }

  const products = results.data.products.edges;
  const categories = results.data.categories.edges;

  products.forEach(product => {
    createPage({
      path: `${product.node.category.name.toLowerCase()}/${
        product.node.name.split(' ')[0]
      }`,
      component: require.resolve('./src/templates/ProductDetail.tsx'),
      context: {
        name: product.node.name,
        id: product.node.strapiId,
        category: product.node.category.name,
      },
    });
  });

  categories.forEach(category => {
    createPage({
      path: `/${category.node.name.toLowerCase()}`,
      component: require.resolve('./src/templates/ProductList.tsx'),
      context: {
        name: category.node.name,
        description: category.node.description,
        id: category.node.strapiId,
      },
    });
  });
};
