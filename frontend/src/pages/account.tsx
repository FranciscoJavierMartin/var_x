import React, { useContext } from 'react';
import Layout from '../components/ui/Layout';
import AuthPortal from '../components/auth/AuthPortal';
import SettingsPortal from '../components/settings/SettingsPortal';
import { UserContext } from '../contexts';

interface AccountProps {}

const Account: React.FC<AccountProps> = ({}) => {
  const { user } = useContext(UserContext);

  return (
    <Layout>
      {user.jwt && user.onboarding ? <SettingsPortal /> : <AuthPortal />}
    </Layout>
  );
};

export default Account;
