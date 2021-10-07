export interface Image {
  url: string;
}

export interface Variant {
  color: string;
  id: number;
  price: number;
  size?: any;
  style?: any;
  colorLabel: string;
  images: Image[];
}

export interface Item {
  variant: Variant;
  qty: number;
  name: string;
  stock: number;
}

export interface ShippingAddress {
  street: string;
  zip: string;
  city: string;
  state: string;
}

export interface BillingAddress {
  street: string;
  zip: string;
  city: string;
  state: string;
}

export interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
}

export interface BillingInfo {
  name: string;
  email: string;
  phone: string;
}

export interface ShippingOption {
  label: string;
  price: number;
}

export interface PaymentMethod {
  brand: string;
  last4: string;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

export interface Location {
  street: string;
  zip: string;
  city: string;
  state: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked?: any;
  role: number;
  paymentMethods: PaymentMethod[];
  contactInfo: ContactInfo[];
  locations: Location[];
  created_at: Date;
  updated_at: Date;
}

export interface Order {
  id: number;
  status?: any;
  items: Item[];
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  shippingInfo: ShippingInfo;
  billingInfo: BillingInfo;
  shippingOption: ShippingOption;
  subtotal: number;
  tax: number;
  total: number;
  user: User;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  paymentMethod: { brand: string; last4: string };
  transaction: string;
}
