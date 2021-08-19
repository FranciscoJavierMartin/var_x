import React, { useContext } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import Layout from '../components/ui/Layout';
import AuthPortal from '../components/auth/AuthPortal';
import { UserContext } from '../contexts';
import { setUser } from '../contexts/user/actions';

const useStyles = makeStyles(theme => ({}));

interface AccountProps {}

const Account: React.FC<AccountProps> = ({}) => {
  const classes = useStyles();
  const { user, defaultUser, dispatchUser } = useContext(UserContext);

  const handleLogout = () => {
    dispatchUser(setUser(defaultUser));
  };

  return (
    <Layout>
      {user.jwt && user.onboarding ? (
        <Button variant='contained' onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <AuthPortal />
      )}
    </Layout>
  );
};

export default Account;
