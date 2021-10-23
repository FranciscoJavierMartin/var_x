import { UserActionsTypes } from '../contexts/user/actions';

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

export interface PaymentMethod {
  brand: string;
  last4: string;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  [key: string]: string;
}

export interface LocationInfo {
  street: string;
  zip: string;
  city: string;
  state: string;
}

export interface Favorite {
  variant: number;
  id: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  paymentMethods: PaymentMethod[];
  contactInfo: ContactInfo[];
  locations: LocationInfo[];
  blocked?: boolean;
  jwt?: string;
  onboarding?: boolean;
  role: Role;
  created_at: Date;
  updated_at: Date;
  favorites?: Favorite[];
}

export interface UserContextState {
  user: User;
  dispatchUser: React.Dispatch<UserActionsTypes>;
  defaultUser: User;
}
