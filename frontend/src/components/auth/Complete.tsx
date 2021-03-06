import React, { useEffect } from 'react';
import { Grid, Typography, makeStyles, Button } from '@material-ui/core';
import { setUser } from '../../contexts/user/actions';
import { AuthStepsProps } from '../../interfaces/auth-steps-props';

import checkmark from '../../images/checkmark-outline.svg';
import forward from '../../images/forward-outline.svg';

const useStyles = makeStyles(theme => ({
  iconText: {
    marginTop: '10rem',
  },
  text: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    textTransform: 'none',
  },
  shopContainer: {
    marginRight: '1rem',
    marginBottom: '1rem',
  },
  shop: {
    marginLeft: '1rem',
  },
}));

interface CompleteProps extends AuthStepsProps {}

const Complete: React.FC<CompleteProps> = ({ dispatchUser, user }) => {
  const classes = useStyles();

  useEffect(() => {
    return () => {
      dispatchUser(setUser({ ...user, onboarding: true }));
    };
  }, []);

  return (
    <>
      <Grid
        item
        container
        direction='column'
        alignItems='center'
        classes={{ root: classes.iconText }}
      >
        <Grid item>
          <img src={checkmark} alt='sign up finished' />
        </Grid>
        <Grid item>
          <Typography variant='h3' classes={{ root: classes.text }}>
            Account created
          </Typography>
        </Grid>
      </Grid>
      <Grid item container justifyContent='flex-end'>
        <Grid item classes={{ root: classes.shopContainer }}>
          <Button>
            <Typography variant='h3' classes={{ root: classes.text }}>
              Shop
            </Typography>
            <img src={forward} alt='browse product' className={classes.shop} />
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Complete;
