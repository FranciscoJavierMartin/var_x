import React, { useState, useEffect, useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { UserContext } from '../../contexts';

const useStyles = makeStyles(theme => ({}));

interface OrderHistoryProps {}

const OrderHistory: React.FC<OrderHistoryProps> = ({}) => {
  const [order, setOrder] = useState([]);
  const { user } = useContext(UserContext);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`${process.env.GATSBY_STRAPI_URL}/orders/history`, {
        headers: { Authorization: `Bearer ${user.jwt}` },
      })
      .then(response => {
        console.log(response);
      })
      .catch(console.log);
  }, []);

  return null;
};

export default OrderHistory;
