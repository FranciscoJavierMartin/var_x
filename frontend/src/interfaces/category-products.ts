export interface Image {
  url: string;
}

export interface Variant {
  color: string;
  id: number;
  price: number;
  size: string;
  style?: any;
  colorLabel: string;
  images: Image[];
}

export interface Category {
  name: string;
}

export interface Node {
  name: string;
  strapiId: number;
  created_at: Date;
  category: Category;
  variants: Variant[];
}

export interface Edge {
  node: Node;
}

export interface RootObject {
  edges: Edge[];
}

export interface GetCategoryProducts {
  allStrapiProduct: RootObject;
}
