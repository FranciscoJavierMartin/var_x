import React, { useContext } from 'react';
import Layout from '../components/ui/Layout';
import AuthPortal from '../components/auth/AuthPortal';
import SettingsPortal from '../components/settings/SettingsPortal';
import { UserContext } from '../contexts';
import { useIsClient } from '../hooks';

interface AccountProps {}

const Account: React.FC<AccountProps> = ({}) => {
  const { user } = useContext(UserContext);
  const { isClient, key } = useIsClient();

  return isClient ? (
    <Layout key={key}>
      {user.jwt && user.onboarding ? <SettingsPortal /> : <AuthPortal />}
    </Layout>
  ) : null;
};

export default Account;
