import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import {
  Grid,
  Typography,
  Button,
  makeStyles,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
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
    padding: '30rem 10rem 10rem 10rem',
    [theme.breakpoints.down('lg')]: {
      padding: '20rem 2rem 2rem 2rem',
    },
    [theme.breakpoints.down('xs')]: {
      overflow: 'hidden',
    },
  },
  carouselContainer: {
    marginLeft: '20rem',
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      height: '30rem',
    },
  },
  explore: {
    textTransform: 'none',
    marginRight: '2rem',
  },
  descriptionContainer: {
    textAlign: 'right',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
}));

const PromotionalProducts: React.FC = () => {
  const [selectedSlide, setSelectedSlide] = useState<number>(0);
  const matchesMD = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
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
      justifyContent={matchesMD ? 'space-around' : 'space-between'}
      alignItems='center'
      classes={{ root: classes.mainContainer }}
      direction={matchesMD ? 'column' : 'row'}
    >
      <Grid item classes={{ root: classes.carouselContainer }}>
        {
          /* TODO: Uncomment to avoid error on development*/
          typeof window !== 'undefined' ? (
            <Carousel
              slides={slides}
              goToSlide={selectedSlide}
              showNavigation={false}
            />
          ) : null
        }
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
