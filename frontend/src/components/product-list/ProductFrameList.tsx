import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import frame from '../../images/product-frame-list.svg';

const useStyles = makeStyles(theme => ({
  frame: {
    backgroundImage: `url(${frame})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '25rem',
  },
  info: {
    backgroundColor: theme.palette.primary.main,
    height: '100%',
    width: '100%',
  },
}));

interface ProductFrameListProps {
  product: any;
  variant: any;
}

const ProductFrameList: React.FC<ProductFrameListProps> = ({
  product,
  variant,
}) => {
  const classes = useStyles();

  return (
    <Grid item container>
      <Grid item xs={10} container classes={{ root: classes.frame }}></Grid>
      <Grid
        item
        xs={2}
        container
        direction='column'
        classes={{ root: classes.info }}
      ></Grid>
    </Grid>
  );
};

export default ProductFrameList;
