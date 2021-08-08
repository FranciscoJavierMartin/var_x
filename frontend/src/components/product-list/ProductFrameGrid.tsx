import React, { useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import QuickView from './QuickView';
import { Edge, Variant } from '../../interfaces/category-products';

import frame from '../../images/product-frame-grid.svg';

const useStyles = makeStyles(theme => ({
  frame: {
    backgroundImage: `url(${frame})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    height: '25rem',
    width: '25rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  product: {
    height: '20rem',
    width: '20rem',
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    height: '5rem',
    width: '25rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-0.1rem',
  },
}));

interface ProductFrameGridProps {
  product: Edge;
  variant: Variant;
}

const ProductFrameGrid: React.FC<ProductFrameGridProps> = ({
  product,
  variant,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const imgURL = `${process.env.GATSBY_STRAPI_URL}${variant.images[0].url}`;
  const name = product.node.name.split(' ')[0];

  return (
    <Grid item>
      <Grid container direction='column' onClick={() => setOpen(true)}>
        <Grid item classes={{ root: classes.frame }}>
          <img src={imgURL} alt={name} className={classes.product} />
        </Grid>
        <Grid item classes={{ root: classes.title }}>
          <Typography variant='h5'>{name}</Typography>
        </Grid>
      </Grid>
      <QuickView
        open={open}
        setOpen={setOpen}
        url={imgURL}
        name={name}
        price={variant.price}
      />
    </Grid>
  );
};

export default ProductFrameGrid;
