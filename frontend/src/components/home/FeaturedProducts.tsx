import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Grid, Typography, IconButton, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { GetFeatured } from '../../interfaces/featured';

import featuredAdornment from '../../images/featured-adornment.svg';
import frame from '../../images/product-frame-grid.svg';

const useStyles = makeStyles(theme => ({
  background: {
    backgroundImage: `url(${featuredAdornment})`,
    backgroundPosition: 'top',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '180rem',
    padding: '0 2.5rem',
  },
  featured: {
    height: '20rem',
    width: '20rem',
  },
  frame: {
    backgroundImage: `url(${frame})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: 0,
    height: '24.8rem',
    width: '25rem',
    boxSizing: 'border-box',
    boxShadow: theme.shadows[3],
    position: 'absolute',
    zIndex: 1,
  },
  slide: {
    backgroundColor: theme.palette.primary.main,
    height: '20rem',
    width: '24.5rem',
    zIndex: 0,
    transition: 'transform 0.5s ease',
  },
  slideLeft: {
    transform: 'translate(-24.5rem, 0px)',
  },
  slideRight: {
    transform: 'translate(24.5rem, 0px)',
  },
  productContainer: {
    margin: '5rem 0',
  },
}));

const FeaturedProducts: React.FC = () => {
  const [expanded, setExpanded] = useState<number>(-1);
  const classes = useStyles();

  const data = useStaticQuery<GetFeatured>(graphql`
    query GetFeatured {
      allStrapiProduct(filter: { featured: { eq: true } }) {
        edges {
          node {
            name
            strapiId
            variants {
              price
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
      justifyContent='center'
      classes={{ root: classes.background }}
    >
      {data.allStrapiProduct.edges.map(({ node }, i) => {
        const alignment =
          i === 0 || i === 3
            ? 'flex-start'
            : i === 1 || i === 4
            ? 'center'
            : 'flex-end';
        return (
          <Grid
            item
            container
            key={node.strapiId}
            justifyContent={alignment}
            classes={{ root: classes.productContainer }}
            alignItems='center'
          >
            <IconButton
              onClick={() =>
                expanded === i ? setExpanded(-1) : setExpanded(i)
              }
              classes={{ root: classes.frame }}
            >
              <img
                src={`${process.env.GATSBY_STRAPI_URL}${node.variants[0].images[0].url}`}
                alt={node.name}
                className={classes.featured}
              />
            </IconButton>
            <Grid
              container
              direction='column'
              classes={{
                root: clsx(classes.slide, {
                  [classes.slideLeft]:
                    expanded === i && alignment === 'flex-end',
                  [classes.slideRight]:
                    expanded === i &&
                    (alignment === 'flex-start' || alignment === 'center'),
                }),
              }}
            ></Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default FeaturedProducts;
