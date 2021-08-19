import React, { useReducer, createContext } from 'react';
import userReducer from '../reducers/user-reducer';
import { Roles, User, UserContextState } from '../../interfaces/user';

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

export function UserWrapper({ children }: any) {
  const [user, dispatchUser] = useReducer(userReducer, { user: defaultUser });

  return (
    <UserContext.Provider value={{ user, dispatchUser, defaultUser }}>
      {children}
    </UserContext.Provider>
  );
}
