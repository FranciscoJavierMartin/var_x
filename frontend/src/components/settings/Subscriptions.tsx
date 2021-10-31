import React, { useState, useEffect, useContext } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { UserContext, FeedbackContext } from '../../contexts';
import { openSnackbar, SnackbarStatus } from '../../contexts/feedback/actions';
import { Subscription } from '../../interfaces/subscription';

const useStyles = makeStyles(theme => {});

interface SubscriptionsProps {}

const Subscriptions: React.FC<SubscriptionsProps> = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const { user } = useContext(UserContext);
  const { dispatchFeedback } = useContext(FeedbackContext);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`${process.env.GATSBY_STRAPI_URL}/subscriptions/me`, {
        headers: { Authorization: `Bearer ${user.jwt}` },
      })
      .then(reponse => setSubscriptions(reponse.data))
      .catch(error => {
        console.log(error);
        dispatchFeedback(
          openSnackbar(
            SnackbarStatus.Error,
            'There was a problem retrieving your subscriptions. Please try again.'
          )
        );
      });
  }, []);

  return <div></div>;
};

export default Subscriptions;
