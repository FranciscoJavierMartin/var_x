export interface Image {
  url: string;
}

export interface Variant {
  images: Image[];
}

export interface Node {
  description: string;
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

export interface Query {
  allStrapiProduct: RootObject
}