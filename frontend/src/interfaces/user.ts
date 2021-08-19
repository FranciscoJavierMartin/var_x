import { SetUserType } from "../contexts/actions/actions-types";

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
  role: Role;
  created_at: Date;
  updated_at: Date;
}

export interface UserState {
  user: User;
}

export interface UserContextState {
  user: UserState;
  dispatchUser: React.Dispatch<SetUserType>;
  defaultUser: User;
}
