import { SetUserType } from '../contexts/actions/actions-types';

export enum Roles {
  authenticated = 'authenticated',
  public = 'public',
}

export interface Role {
  id: number;
  name: string;
  description: string;
  type: Roles;
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked?: boolean;
  jwt?: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
}

export interface UserContextState {
  user: User;
  dispatchUser: React.Dispatch<SetUserType>;
  defaultUser: User;
}
