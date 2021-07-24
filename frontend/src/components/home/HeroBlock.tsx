import React from 'react';
import {
  Grid,
  Theme,
  Typography,
  useMediaQuery,
  makeStyles,
} from '@material-ui/core';
import Lottie from 'react-lottie';
import animationData from '../../images/data.json';

const useStyles = makeStyles(theme => ({
  textContainer: {
    padding: '2rem',
    [theme.breakpoints.down('xs')]: {
      padding: '1rem',
    },
  },
  heading: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '3.5rem',
    },
  },
}));

const HeroBlock: React.FC = () => {
  const matchesLG = useMediaQuery<Theme>(theme => theme.breakpoints.down('lg'));
  const matchesMD = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
  const matchesXS = useMediaQuery<Theme>(theme => theme.breakpoints.down('xs'));

  const classes = useStyles();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
  };

  return (
    <Grid container justifyContent='space-around' alignItems='center'>
      <Grid item classes={{ root: classes.textContainer }}>
        <Grid container direction='column'>
          <Grid item>
            <Typography
              align='center'
              variant='h1'
              classes={{ root: classes.heading }}
            >
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
      </Grid>
      <Grid item>
        <Lottie
          options={defaultOptions}
          width={
            matchesXS
              ? '20rem'
              : matchesMD
              ? '30rem'
              : matchesLG
              ? '40rem'
              : '50rem'
          }
        />
      </Grid>
    </Grid>
  );
};

export default HeroBlock;
