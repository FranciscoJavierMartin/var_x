export interface Image {
  localFile: any;
}

export interface Variant {
  price: number;
  images: Image[];
  style?: string | null;
}

export interface Node {
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

export interface GetFeatured {
  allStrapiProduct: RootObject;
}
