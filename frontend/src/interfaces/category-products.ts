export interface Image {
  url: string;
}

export interface Variant {
  color: string;
  id: number;
  price: number;
  size: string;
  style?: any;
  images: Image[];
}

export interface Node {
  name: string;
  strapiId: number;
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