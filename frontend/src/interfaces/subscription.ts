export interface Thumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: any;
  url: string;
}

export interface Medium {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: any;
  url: string;
}

export interface Small {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: any;
  url: string;
}

export interface Formats {
  thumbnail: Thumbnail;
  medium: Medium;
  small: Small;
}

export interface Image {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata?: any;
  created_at: Date;
  updated_at: Date;
}

export interface Variant {
  id: number;
  size: string;
  color: string;
  qty: number;
  price: number;
  style?: any;
  product: number;
  colorLabel?: any;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  images: Image[];
}

export interface PaymentMethod {
  brand: string;
  last4: string;
}

export interface ShippingAddress {
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

export interface BillingAddress {
  street: string;
  zip: string;
  city: string;
  state: string;
}

export interface BillingInfo {
  name: string;
  email: string;
  phone: string;
}

export interface Subscription {
  id: number;
  variant: Variant;
  frequency: string;
  last_delivery: string;
  next_delivery: string;
  quantity: number;
  paymentMethod: PaymentMethod;
  shippingAddress: ShippingAddress;
  shippingInfo: ShippingInfo;
  billingAddress: BillingAddress;
  billingInfo: BillingInfo;
  name: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  orders: any[];
}
