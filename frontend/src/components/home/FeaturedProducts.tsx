import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Grid, makeStyles, useMediaQuery, Theme } from '@material-ui/core';
import FeaturedProduct from './FeaturedProduct';
import { GetFeatured } from '../../interfaces/featured';

import featuredAdornment from '../../images/featured-adornment.svg';

const useStyles = makeStyles(theme => ({
  background: {
    backgroundImage: `url(${featuredAdornment})`,
    backgroundPosition: 'top',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '180rem',
    padding: '0 2.5rem',
    [theme.breakpoints.down('md')]: {
      height: '220rem',
    },
  },
}));

const FeaturedProducts: React.FC = () => {
  const [expanded, setExpanded] = useState<number>(-1);
  const matchesMD = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));

  const classes = useStyles();

  const data = useStaticQuery<GetFeatured>(graphql`
    query GetFeatured {
      allStrapiProduct(filter: { featured: { eq: true } }) {
        edges {
          node {
            name
            strapiId
            category {
              name
            }
            variants {
              price
              style
              images {
                url
              }
            }
          }
        }
      }
    }
  `);

  return (
    <Grid
      container
      direction='column'
      justifyContent={matchesMD ? 'space-between' : 'center'}
      classes={{ root: classes.background }}
    >
      {data.allStrapiProduct.edges.map(({ node }, i) => (
        <FeaturedProduct
          key={node.strapiId}
          node={node}
          index={i}
          matchesMD={matchesMD}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      ))}
    </Grid>
  );
};

export default FeaturedProducts;
