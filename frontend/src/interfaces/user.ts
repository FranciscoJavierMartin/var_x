import { UserActionsTypes } from '../contexts/user/actions';
import { Order } from './order';
import { Variant } from './product-details';

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

export interface Subscription {
  name: string;
  variant: Variant;
  orders: Order[];
  frequency: string;
  last_delivery: Date;
  next_delivery: Date;
  quantity: number;
  paymentMethod: PaymentMethod;
  shippingAddress: LocationInfo;
  shippingInfo: LocationInfo;
  billingInfo: any;
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
  subscriptions?: Subscription[];
}

export interface UserContextState {
  user: User;
  dispatchUser: React.Dispatch<UserActionsTypes>;
  defaultUser: User;
}
