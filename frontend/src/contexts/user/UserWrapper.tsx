import React, { useEffect, useReducer, createContext } from 'react';
import axios from 'axios';
import userReducer from './reducer';
import { Roles, User, UserContextState } from '../../interfaces/user';
import { USER_STORAGED } from '../../constants/localStorage';
import { setUser } from './actions';

const defaultUser: User = {
  username: 'Guest',
  id: 0,
  updated_at: new Date(),
  created_at: new Date(),
  confirmed: false,
  email: '',
  provider: '',
  role: {
    description: '',
    id: 0,
    name: '',
    type: Roles.public,
  },
};

export const UserContext = createContext<UserContextState>(
  {} as UserContextState
);

export const UserWrapper: React.FC = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem(USER_STORAGED)!);
  const [user, dispatchUser] = useReducer(
    userReducer,
    storedUser || defaultUser
  );

  useEffect(() => {
    if (storedUser) {
      setTimeout(() => {
        axios
          .get(`${process.env.GATSBY_STRAPI_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${storedUser.jwt}`,
            },
          })
          .then(response => {
            dispatchUser(
              setUser({
                ...response.data,
                jwt: storedUser.jwt,
                onboarding: true,
              })
            );
          })
          .catch(() => {
            dispatchUser(setUser(defaultUser));
          });
      }, 3000);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, dispatchUser, defaultUser }}>
      {children}
    </UserContext.Provider>
  );
};
