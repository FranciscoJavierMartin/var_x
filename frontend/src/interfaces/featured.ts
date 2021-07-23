export interface Image {
  url: string;
}

export interface Variant {
  price: number;
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

export interface GetFeatured {
  allStrapiProduct: RootObject;
}
