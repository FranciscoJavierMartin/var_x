import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import background from '../../images/toolbar-background.svg';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    padding: '3rem',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  descriptionContainer: {
    backgroundColor: theme.palette.primary.main,
    height: '15rem',
    width: '60rem',
    borderRadius: 25,
    padding: '1rem',
  },
  description: {
    color: theme.palette.common.white,
  },
}));

interface DescriptionContainerProps {
  name: string;
  description: string;
}

const DescriptionContainer: React.FC<DescriptionContainerProps> = ({
  name,
  description,
}) => {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      classes={{ root: classes.mainContainer }}
      justifyContent='center'
    >
      <Grid item classes={{ root: classes.descriptionContainer }}>
        <Typography align='center' variant='h4' paragraph gutterBottom>
          {name}
        </Typography>
        <Typography
          align='center'
          variant='body1'
          classes={{ root: classes.description }}
        >
          {description}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DescriptionContainer;
