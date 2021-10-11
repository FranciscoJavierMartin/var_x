export interface User {
  username: string;
}

export interface Review {
  created_at: Date;
  id: string;
  rating: number;
  text: string;
  user: User;
}

export interface Product {
  reviews: Review[];
}

export interface QueryReviews {
  product: Product;
}
