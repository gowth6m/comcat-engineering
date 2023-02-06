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
      name: "Nisbets Essentials Single Tank Electric Fryer",
      slug: "m0",
      category: ["Fryers", "Single Tank"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/PFE800-N-1200x1200.jpg",
      price: 99.99,
      brand: "Featured",
      rating: 4,
      numReviews: 8,
      countInStock: 20,
      description: "Make deliciously crispy chips, chicken, doughnuts and onion rings with the Nisbets Essentials countertop fryer. Designed for everyday simplicity and reliability, the Essentials fryer givers you 3kW of cooking power and an impressive 5 litre tank - more than enough for a large batch of chips or bulky seafood.",
    },
    {
      name: "Buffalo Single Tank Single Basket 3Ltr Countertop Fryer 2kW",
      slug: "m1",
      category: ["Fryers"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/TO4502-1200x1200.jpg",
      price: 129.99,
      brand: "Featured",
      rating: 2.5,
      numReviews: 8,
      countInStock: 20,
      description: "Powerful yet highly compact, the three litre Buffalo countertop fryer is the perfect appliance for low demand sites or kitchens with limited space. Designed to be easy to use yet versatile, the fryer lets you produce deliciously crispy fried foods with ease, thanks to its powerful 2kW element and simple dial thermostat control.",
    },
    {
      name: "Buffalo Single Tank Single Basket 5Ltr Countertop Fryer with Timer 2.8kW",
      slug: "m2",
      category: ["Fryers"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/ST145BR-1200x1200.jpg",
      price: 159.99,
      brand: "Featured",
      rating: 1,
      numReviews: 8,
      countInStock: 20,
      description: "Whether you're frying fish or French fries, the Buffalo countertop fryer is the ideal solution for everyday use in the professional kitchen. With its powerful 2.8kW element and large 5 litre oil tank, the fryer offers a generous cooking capacity, making it a great for frying multiple portions at the same time.",
    },
    {
      name: "Polar G-Series Counter Fridge Single Door 88Ltr GN 1/1",
      slug: "m3",
      category: ["Counter Fridge", "Single Door"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/PFE800-N-1200x1200.jpg",
      price: 599.99,
      brand: "Featured",
      rating: 3,
      numReviews: 8,
      countInStock: 20,
      description: "Give your kitchen a space-saving upgrade with the 2-in-1 G-Series counter fridge from Polar. Designed to make the preparation of sandwiches, salads or smoothies easier, the refrigerator ensures you've got both storage and workspace in the same versatile unit, helping to improve kitchen efficiency and safety.",
    },
    {
      name: "Polar G-Series Countertop Ice Machine 20kg Output",
      slug: "m4",
      category: ["Ice Machine"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/TO4502-1200x1200.jpg",
      price: 449.99,
      brand: "Featured",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: "The Polar G-Series mains fill commercial ice machine is the perfect solution for delivering a reliable source of up to 20kg of bullet-shaped ice cubes a day. Whether you're using the ice for food display or cocktails, this mains-fill machine works tirelessly to keep up with demand.",
    },
    {
      name: "Williams Medi+ Double Door Pharmacy Freezer LWMP1295",
      slug: "m5",
      category: ["Freezer", "Double Door"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/ST145BR-1200x1200.jpg",
      price: 4299.99,
      brand: "Featured",
      rating: 1.5,
      numReviews: 8,
      countInStock: 20,
      description: "Combining proven professional refrigeration technology with the latest in advanced eco-friendly insulation, the LWMP1295 Williams Medi+ pharmacy freezer makes storing medicines and pharmaceuticals safe and simple.",
    },
    {
      name: "Gram 347Ltr Chest Freezer CF 35 S",
      slug: "m6",
      category: ["Freezer", "Chest Freezer"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/PFE800-N-1200x1200.jpg",
      price: 669.99,
      brand: "Featured",
      rating: 2.5,
      numReviews: 81,
      countInStock: 3,
      description: "Maximise your frozen food storage capacity with the CF 35 S Gram 347 litre chest freezer. Designed for performance, efficiency and reliability, the Gram ensures your stock is easily accessible and effectively kept at the perfect storage temperature, all whilst reducing running costs.",
    },
    {
      name: "Buffalo Undercounter Glasswasher with Drain Pump 400x400mm Baskets",
      slug: "m7",
      category: ["Glasswasher", "Undercounter"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/TO4502-1200x1200.jpg",
      price: 1229.99,
      brand: "Featured",
      rating: 2.5,
      numReviews: 8,
      countInStock: 30,
      description: "Why wash by hand when you can clean all your glassware quickly and effectively with the Buffalo commercial glasswasher? Ideal for washing tumblers, pint glasses, wine glasses and more, the Buffalo makes it easy to get glassware consistently sparkling clean in just two minutes.",
    },
    {
      name: "Buffalo Compact Glasswasher",
      slug: "m8",
      category: ["Glasswasher", "Freezer"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/PFE800-N-1200x1200.jpg",
      price: 969.99,
      brand: "Other",
      rating: 1.5,
      numReviews: 81,
      countInStock: 3,
      description: "Compact and easy to use, the Buffalo glasswasher is a great choice for sites with limited work space. Able to be mounted either on a countertop or under counter, the glasswasher fits into smaller areas and can wash up to 12 glasses at a time.",
    },
    {
      name: "Polar G-Series Countertop Ice Machine 20kg Output",
      slug: "m9",
      category: ["Ice Machine"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/TO4502-1200x1200.jpg",
      price: 449.99,
      brand: "Featured",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: "The Polar G-Series mains fill commercial ice machine is the perfect solution for delivering a reliable source of up to 20kg of bullet-shaped ice cubes a day. Whether you're using the ice for food display or cocktails, this mains-fill machine works tirelessly to keep up with demand.",
    },
    {
      name: "Williams Medi+ Double Door Pharmacy Freezer LWMP1295",
      slug: "m10",
      category: ["Freezer", "Double Door"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/ST145BR-1200x1200.jpg",
      price: 4299.99,
      brand: "Featured",
      rating: 1.5,
      numReviews: 8,
      countInStock: 20,
      description: "Combining proven professional refrigeration technology with the latest in advanced eco-friendly insulation, the LWMP1295 Williams Medi+ pharmacy freezer makes storing medicines and pharmaceuticals safe and simple.",
    },
    {
      name: "Buffalo Single Tank Single Basket 3Ltr Countertop Fryer 2kW",
      slug: "m11",
      category: ["Fryers"],
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/TO4502-1200x1200.jpg",
      price: 129.99,
      brand: "Featured",
      rating: 2.5,
      numReviews: 8,
      countInStock: 20,
      description: "Powerful yet highly compact, the three litre Buffalo countertop fryer is the perfect appliance for low demand sites or kitchens with limited space. Designed to be easy to use yet versatile, the fryer lets you produce deliciously crispy fried foods with ease, thanks to its powerful 2kW element and simple dial thermostat control.",
    },
  ],
};

export default data;
