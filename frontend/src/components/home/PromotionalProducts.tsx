import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Grid, Typography, Button, makeStyles } from '@material-ui/core';
import Carousel from 'react-spring-3d-carousel';
import PromotionalProductSlide from './PromotionalProductSlide';

import promoAdornment from '../../images/promo-adornment.svg';
import explore from '../../images/explore.svg';
import { GetPromo } from '../../interfaces/promoted';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    backgroundImage: `url(${promoAdornment})`,
    backgroundPosition: 'top',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '70rem',
    padding: '30rem 10rem',
  },
  carouselContainer: {
    marginLeft: '20rem',
  },
  explore: {
    textTransform: 'none',
    marginRight: '2rem',
  },
  descriptionContainer: {
    textAlign: 'right',
  },
}));

const PromotionalProducts: React.FC = () => {
  const [selectedSlide, setSelectedSlide] = useState<number>(0);
  const classes = useStyles();

  const data = useStaticQuery<GetPromo>(graphql`
    query GetPromo {
      allStrapiProduct(filter: { promo: { eq: true } }) {
        edges {
          node {
            description
            name
            strapiId
            variants {
              images {
                url
              }
            }
          }
        }
      }
    }
  `);

  console.log(process.env.GATSBY_STRAPI_URL);

  const slides = data.allStrapiProduct.edges.map(({ node }, index: number) => ({
    key: index,
    content: (
      <PromotionalProductSlide
        key={node.strapiId}
        imageUrl={`${process.env.GATSBY_STRAPI_URL}${node.variants[0].images[0].url}`}
        isSelectedSlide={selectedSlide === index}
        name={node.name}
        selectSlide={setSelectedSlide}
        index={index}
      />
    ),
  }));

  return (
    <Grid
      container
      justifyContent='space-between'
      alignItems='center'
      classes={{ root: classes.mainContainer }}
    >
      <Grid item classes={{ root: classes.carouselContainer }}>
        {/* TODO: Uncomment to avoid error on development
         {typeof window !== 'undefined' ? (
          <Carousel slides={slides} goToSlide={selectedSlide} showNavigation />
        ) : null} */}
      </Grid>
      <Grid item classes={{ root: classes.descriptionContainer }}>
        <Typography variant='h2' paragraph>
          {data.allStrapiProduct.edges[selectedSlide].node.description}
        </Typography>
        <Button>
          <Typography variant='h4' classes={{ root: classes.explore }}>
            Explore
          </Typography>
          <img src={explore} alt='Go to the product page' />
        </Button>
      </Grid>
    </Grid>
  );
};

export default PromotionalProducts;
