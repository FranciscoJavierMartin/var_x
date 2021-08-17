import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Layout from '../components/ui/Layout';
import AuthPortal from '../components/auth/AuthPortal';

const useStyles = makeStyles(theme => ({}));

interface AccountProps {}

const Account: React.FC<AccountProps> = ({}) => {
  const classes = useStyles();

  return (
    <Layout>
      <AuthPortal />
    </Layout>
  );
};

export default Account;
