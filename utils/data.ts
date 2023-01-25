var bcrypt = require('bcryptjs');

export type ProductDataType = {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
};

export type UserDataType = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

export type SampleDataType = {
  users: UserDataType[];
  products: ProductDataType[];
};