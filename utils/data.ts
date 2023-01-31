var bcrypt = require('bcryptjs');

export type ProductDataType = {
  name: string;
  slug: string;
  category: string[];
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

const data: SampleDataType = {
  users: [
    {
      name: "Admin",
      email: "admin@nocxa.com",
      password: bcrypt.hashSync("12345678", 8),
      isAdmin: true,
    },
    {
      name: "Gowthaman Ravindrathas",
      email: "contact@gowtham.co.uk",
      password: bcrypt.hashSync("12345678", 8),
      isAdmin: false,
    },
    {
      name: "Jathu Ravindrathas",
      email: "contact@jathugoban.com",
      password: bcrypt.hashSync("12345678", 8),
      isAdmin: false,
    },
    {
      name: "Manu Ravindrathas",
      email: "contact@manusha.dev",
      password: bcrypt.hashSync("12345678", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Machine 1: extra info here",
      slug: "machine-1",
      category: ["Chicken Machine", "Beef Machine", "Pork Machine"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/PFE800-N-1200x1200.jpg",
      price: 70,
      brand: "Nike",
      rating: 4,
      numReviews: 8,
      countInStock: 20,
      description: "A popular and expensive machine that makes chicken",
    },
    {
      name: "Machine 2",
      slug: "machine-2-the-sequel",
      category: ["Chicken Machine", "Beef Machine"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/TO4502-1200x1200.jpg",
      price: 170,
      brand: "Mango",
      rating: 2.5,
      numReviews: 8,
      countInStock: 20,
      description: "A popular and expensive machine",
    },
    {
      name: "Machine 3: extra info here",
      slug: "machine-3-the-return-of-the-sequel",
      category: ["Chicken Machine", "Beef Machine", "Pork Machine", "Lamb Machine"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/ST145BR-1200x1200.jpg",
      price: 90,
      brand: "Big",
      rating: 1,
      numReviews: 8,
      countInStock: 20,
      description: "A popular and expensive machine for making chicken",
    },
    {
      name: "Machine 4",
      slug: "machine-4-the-return-of-the-sequel-2",
      category: ["Chicken Machine", "Beef Machine"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/PFE800-N-1200x1200.jpg",
      price: 702,
      brand: "Big",
      rating: 3,
      numReviews: 8,
      countInStock: 20,
      description: "A popular chicken machine",
    },
    {
      name: "Machine 5",
      slug: "machine-5-the-return-of-the-sequel-3",
      category: ["Chicken Machine", "Beef Machine"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/TO4502-1200x1200.jpg",
      price: 170,
      brand: "Big Chicken",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: "A free chicken machine",
    },
    {
      name: "Machine 6: extra info here",
      slug: "machine-6-the-return-of-the-sequel-3",
      category: ["Chicken Machine", "Beef Machine"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/ST145BR-1200x1200.jpg",
      price: 990,
      brand: "Yige",
      rating: 1.5,
      numReviews: 8,
      countInStock: 20,
      description: "A popular and expensive machine for making big chicken",
    },
    {
      name: "Machine 7",
      slug: "machine-7-the-return-of-the-sequel-2",
      category: ["Chicken Machine", "Beef Machine"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/PFE800-N-1200x1200.jpg",
      price: 7202,
      brand: "Big",
      rating: 2.5,
      numReviews: 81,
      countInStock: 3,
      description: "A popular top chicken machine",
    },
    {
      name: "Machine 8",
      slug: "machine-8-the-sequel",
      category: ["Chicken Machine", "Beef Machine"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/TO4502-1200x1200.jpg",
      price: 1720,
      brand: "Mango",
      rating: 2.5,
      numReviews: 8,
      countInStock: 30,
      description: "A popular and expensive machine",
    },
    {
      name: "Machine 9",
      slug: "machine-9-the-return-of-the-sequel-2",
      category: ["Chicken Machine", "Beef Machine"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/PFE800-N-1200x1200.jpg",
      price: 202,
      brand: "Big",
      rating: 1.5,
      numReviews: 81,
      countInStock: 3,
      description: "A popular top chicken machine",
    },
    {
      name: "Machine 10: extra info here",
      slug: "machine-10-the-return-of-the-sequel-3",
      category: ["Chicken Machine", "Beef Machine"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/ST145BR-1200x1200.jpg",
      price: 90,
      brand: "Yige",
      rating: 1.5,
      numReviews: 8,
      countInStock: 20,
      description: "A popular and expensive machine for making big chicken",
    },
    {
      name: "Machine 11",
      slug: "machine-11-the-sequel",
      category: ["Chicken Machine", "Beef Machine"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/TO4502-1200x1200.jpg",
      price: 172,
      brand: "Mango",
      rating: 2.5,
      numReviews: 8,
      countInStock: 30,
      description: "A popular and expensive machine",
    },
    {
      name: "Machine 12",
      slug: "machine-12-the-return-of-the-sequel-2",
      category: ["Chicken Machine", "Beef Machine"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/PFE800-N-1200x1200.jpg",
      price: 402,
      brand: "Big",
      rating: 3.5,
      numReviews: 1,
      countInStock: 3,
      description: "A popular top chicken machine with a lot of chicken",
    },
  ],
};

export default data;
