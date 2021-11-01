export interface Image {
  localFile: any;
}

export interface Variant {
  images: Image[];
}

export interface Node {
  description: string;
  name: string;
  strapiId: number;
  variants: Variant[];
  category: { name: string };
}

export interface Edge {
  node: Node;
}

export interface RootObject {
  edges: Edge[];
}

export interface GetPromo {
  allStrapiProduct: RootObject;
}
