import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { useQuery } from '@apollo/client';
import {
  Grid,
  Button,
  IconButton,
  Chip,
  Typography,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import Rating from '../shared/Rating';
import { Node } from '../../interfaces/featured';
import { QueryProductQty } from '../../interfaces/product-details';
import { GET_DETAILS } from '../../apollo/queries';

import explore from '../../images/explore.svg';
import frame from '../../images/product-frame-grid.svg';

const useStyles = makeStyles(theme => ({
  productContainer: {
    margin: '5rem 0',
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
    [theme.breakpoints.down('md')]: {
      height: '19.8rem',
      width: '20rem',
    },
  },
  featured: {
    height: '20rem',
    width: '20rem',
    [theme.breakpoints.down('md')]: {
      height: '15rem',
      width: '15rem',
    },
  },
  slide: {
    backgroundColor: theme.palette.primary.main,
    height: '20rem',
    width: '24.5rem',
    zIndex: 0,
    transition: 'transform 0.5s ease',
    padding: '1rem 2rem',
    [theme.breakpoints.down('md')]: {
      height: '15.2rem',
      width: '19.5rem',
    },
  },
  slideLeft: {
    transform: 'translate(-24.5rem, 0px)',
  },
  slideRight: {
    transform: 'translate(24.5rem, 0px)',
  },
  slideDown: {
    transform: 'translate(0px, 17rem)',
  },
  chipLabel: {
    ...theme.typography.h5,
  },
  chipRoot: {
    backgroundColor: theme.palette.secondary.main,
  },
  exploreContainer: {
    marginTop: 'auto',
  },
  exploreButton: {
    textTransform: 'none',
  },
  exploreIcon: {
    height: '1.5rem',
    marginLeft: '1rem',
  },
}));

interface FeaturedProductProps {
  node: Node;
  index: number;
  matchesMD: boolean;
  expanded: number;
  setExpanded: React.Dispatch<React.SetStateAction<number>>;
}

const FeaturedProduct: React.FC<FeaturedProductProps> = ({
  node,
  index,
  matchesMD,
  expanded,
  setExpanded,
}) => {
  const [rating, setRating] = useState<number>(0);
  const classes = useStyles();
  const alignment = matchesMD
    ? 'center'
    : index === 0 || index === 3
    ? 'flex-start'
    : index === 1 || index === 4
    ? 'center'
    : 'flex-end';

  const { data } = useQuery<QueryProductQty, { id: string }>(GET_DETAILS, {
    variables: { id: node.strapiId.toString() },
  });

  const hasStyles = node.variants.some(variant => variant.style !== null);

  useEffect(() => {
    if (data) {
      setRating(data.product.rating);
    }
  }, [data]);

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
          expanded === index ? setExpanded(-1) : setExpanded(index)
        }
        classes={{ root: classes.frame }}
      >
        <img
          src={node.variants[0].images[0].url}
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
              !matchesMD && expanded === index && alignment === 'flex-end',
            [classes.slideRight]:
              !matchesMD &&
              expanded === index &&
              (alignment === 'flex-start' || alignment === 'center'),
            [classes.slideDown]: matchesMD && expanded === index,
          }),
        }}
      >
        <Grid item>
          <Typography variant='h4'>{node.name.split(' ')[0]}</Typography>
        </Grid>
        <Grid item>
          <Rating rate={rating} />
        </Grid>
        <Grid item>
          <Chip
            classes={{ root: classes.chipRoot, label: classes.chipLabel }}
            label={`$${node.variants[0].price}`}
          />
        </Grid>
        <Grid item classes={{ root: classes.exploreContainer }}>
          <Button
            classes={{ root: classes.exploreButton }}
            component={Link}
            to={`/${node.category.name.toLowerCase()}/${node.name
              .split(' ')[0]
              .toLowerCase()}${
              hasStyles ? `?style=${node.variants[0].style}` : ''
            }`}
          >
            <Typography variant='h5'>Details</Typography>
            <img
              src={explore}
              alt='Go to product details'
              className={classes.exploreIcon}
            />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FeaturedProduct;
