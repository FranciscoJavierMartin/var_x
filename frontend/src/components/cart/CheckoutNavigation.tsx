import React, { useState, useContext } from 'react';
import {
  Button,
  IconButton,
  Typography,
  CircularProgress,
  Grid,
  makeStyles,
  Theme,
} from '@material-ui/core';
import axios from 'axios';
import { CartStep } from '../../interfaces/cart-steps';
import { FeedbackContext, UserContext } from '../../contexts';
import { setUser } from '../../contexts/user/actions';
import { openSnackbar, SnackbarStatus } from '../../contexts/feedback/actions';

import save from '../../images/save.svg';
import DeleteIcon from '../../images/DeleteIcon';

enum LoadingAction {
  NONE,
  SAVE,
  DELETE,
}

const useStyles = makeStyles<
  Theme,
  { selectedStep: number; finalStep: number }
>(theme => ({
  navbar: {
    backgroundColor: theme.palette.secondary.main,
    width: '40rem',
    height: '5rem',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  back: {
    visibility: ({ selectedStep, finalStep }) =>
      selectedStep === 0 || selectedStep === finalStep ? 'hidden' : 'visible',
  },
  forward: {
    visibility: ({ selectedStep, finalStep }) =>
      selectedStep === finalStep - 1 ? 'hidden' : 'visible',
  },
  disabled: {
    opacity: 0.5,
  },
  iconButton: {
    padding: 6,
  },
  icon: {
    height: '2.25rem',
    width: '2.25rem',
    [theme.breakpoints.down('xs')]: {
      height: '1.75rem',
      width: '1.75rem',
    },
  },
  delete: {
    height: '2rem',
    width: '2rem',
    [theme.breakpoints.down('xs')]: {
      height: '1.5rem',
      width: '1.5rem',
    },
  },
  actions: {
    position: 'absolute',
    right: 0,
  },
  text: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
  navButton: {
    width: '1.5rem',
    height: '1.5rem',
    minWidth: 0,
  },
}));

interface CheckoutNavigationProps {
  steps: CartStep[];
  selectedStep: number;
  setSelectedStep: React.Dispatch<React.SetStateAction<number>>;
  details: { [key: string]: string };
  setDetails: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  detailSlot: number;
  location: { [key: string]: string };
  locationSlot: number;
  setLocation: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
}

const CheckoutNavigation: React.FC<CheckoutNavigationProps> = ({
  steps,
  selectedStep,
  setSelectedStep,
  details,
  setDetails,
  detailSlot,
  location,
  setLocation,
  locationSlot,
  setErrors,
}) => {
  const [isLoading, setIsLoading] = useState<LoadingAction>(LoadingAction.NONE);
  const { user, dispatchUser } = useContext(UserContext);
  const { dispatchFeedback } = useContext(FeedbackContext);
  const classes = useStyles({ finalStep: steps.length - 1, selectedStep });

  const handleAction = (action: LoadingAction) => {
    if (steps[selectedStep].error && action !== LoadingAction.DELETE) {
      dispatchFeedback(
        openSnackbar(
          SnackbarStatus.Error,
          'All fields must be valid before saving'
        )
      );
    } else {
      setIsLoading(action);

      const isDetails = steps[selectedStep].title === 'Contact Info';
      const isLocation = steps[selectedStep].title === 'Address';

      axios
        .post(
          `${process.env.GATSBY_STRAPI_URL}/users-permissions/set-settings`,
          {
            details:
              isDetails && action !== LoadingAction.DELETE
                ? details
                : undefined,
            detailSlot: isDetails ? detailSlot : undefined,
            location:
              isLocation && action !== LoadingAction.DELETE
                ? location
                : undefined,
            locationSlot: isLocation ? locationSlot : undefined,
          },
          {
            headers: {
              Authorization: `Bearer ${user.jwt}`,
            },
          }
        )
        .then(response => {
          setIsLoading(LoadingAction.NONE);
          dispatchFeedback(
            openSnackbar(
              SnackbarStatus.Success,
              `Information ${
                action === LoadingAction.DELETE ? 'deleted' : 'saved'
              } succesfully`
            )
          );
          dispatchUser(
            setUser({ ...response.data, jwt: user.jwt, onboarding: true })
          );

          if (action === LoadingAction.DELETE) {
            setErrors({});
            if (isDetails) {
              setDetails({ name: '', email: '', phone: '' });
            } else if (isLocation) {
              setLocation({ street: '', city: '', zip: '', state: '' });
            }
          }
        })
        .catch(error => {
          setIsLoading(LoadingAction.NONE);
          dispatchFeedback(
            openSnackbar(
              SnackbarStatus.Error,
              `There was a problem ${
                action === LoadingAction.DELETE ? 'deleting' : 'saving'
              } your information, please try again.`
            )
          );
        });
    }
  };

  return (
    <Grid
      item
      container
      justifyContent='center'
      alignItems='center'
      classes={{ root: classes.navbar }}
    >
      <Grid item classes={{ root: classes.back }}>
        <Button
          classes={{ root: classes.navButtons }}
          onClick={() => setSelectedStep(prevState => prevState - 1)}
        >
          <Typography variant='h5' classes={{ root: classes.text }}>
            {'<'}
          </Typography>
        </Button>
      </Grid>
      <Grid item>
        <Typography variant='h5' classes={{ root: classes.text }}>
          {steps[selectedStep].title.toUpperCase()}
        </Typography>
      </Grid>
      <Grid item classes={{ root: classes.forward }}>
        <Button
          disabled={steps[selectedStep].error}
          classes={{ root: classes.navButtons, disabled: classes.disabled }}
          onClick={() => setSelectedStep(prevState => prevState + 1)}
        >
          <Typography variant='h5' classes={{ root: classes.text }}>
            {'>'}
          </Typography>
        </Button>
      </Grid>
      {steps[selectedStep].hasActions && user.username !== 'Guest' ? (
        <Grid item classes={{ root: classes.actions }}>
          <Grid container>
            <Grid item>
              {isLoading === LoadingAction.SAVE ? (
                <CircularProgress />
              ) : (
                <IconButton
                  classes={{ root: classes.iconButton }}
                  onClick={() => handleAction(LoadingAction.SAVE)}
                >
                  <img src={save} alt='save' className={classes.icon} />
                </IconButton>
              )}
            </Grid>
            <Grid item>
              {isLoading === LoadingAction.DELETE ? (
                <CircularProgress />
              ) : (
                <IconButton
                  classes={{ root: classes.iconButton }}
                  onClick={() => handleAction(LoadingAction.DELETE)}
                >
                  <span className={classes.delete}>
                    <DeleteIcon />
                  </span>
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default CheckoutNavigation;
