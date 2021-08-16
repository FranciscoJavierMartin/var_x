export interface Category {
  name: string;
}

export interface Image {
  url: string;
}

export interface Variant {
  id: number;
  color: string;
  size: string;
  style: string;
  price: number;
  images: Image[];
}

export interface Node {
  name: string;
  strapiId: number;
  description: string;
  category: Category;
  variants: Variant[];
  selectedVariant?: number;
}

export interface Product {
  node: Node;
}
