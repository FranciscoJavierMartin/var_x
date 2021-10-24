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
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
}

export interface Variant {
  id: number;
  size?: any;
  color: string;
  qty: number;
  price: number;
  style?: any;
  product: number;
  colorLabel: string;
  published_at: Date;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
  images: Image[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  featured: boolean;
  category: number;
  promo: boolean;
  rating?: any;
  published_at: Date;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
}

export interface Thumbnail2 {
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

export interface Medium2 {
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

export interface Small2 {
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

export interface Formats2 {
  thumbnail: Thumbnail2;
  medium: Medium2;
  small: Small2;
}

export interface Image2 {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats2;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata?: any;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
}

export interface Variant2 {
  id: number;
  size?: any;
  color: string;
  qty: number;
  price: number;
  style?: any;
  product: Product;
  colorLabel: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  images: Image2[];
}

export interface UserFavorite {
  id: number;
  variant: Variant;
  variants: Variant2[];
}
