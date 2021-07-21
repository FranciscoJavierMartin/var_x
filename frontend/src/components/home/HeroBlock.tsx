import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Lottie from 'react-lottie';
import animationData from '../../images/data.json';

const HeroBlock: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
  };

  return (
    <Grid container justifyContent='space-around' alignItems='center'>
      <Grid item container direction='column'>
        <Grid item>
          <Typography align='center' variant='h1'>
            The Premier
            <br />
            Developer Clothing Line
          </Typography>
        </Grid>
        <Grid item>
          <Typography align='center' variant='h3'>
            high quality, custom-design shirts, hats and hoodies
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Lottie options={defaultOptions} width='50rem' />
      </Grid>
    </Grid>
  );
};

export default HeroBlock;
