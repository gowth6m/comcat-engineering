import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import {
  IconArrowDown,
  IconArrowUp,
  IconMenu,
} from "../components/CustomIcons";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import Product from "../models/Product";
import { customToast } from "../utils/customToast";
import db from "../utils/db";
import { CartProductDataType, Store } from "../utils/Store";

const PAGE_SIZE = 10;

const prices = [
  {
    name: "£1 to £50",
    value: "1-50",
  },
  {
    name: "£51 to £200",
    value: "51-200",
  },
  {
    name: "£201 to £1000",
    value: "201-1000",
  },
];

const ratings = [1, 2, 3, 4, 5];

export default function Search(props: any) {
  const router = useRouter();
  const { state, dispatchStore } = useContext(Store);
  const { cart } = state;
  const [addingItem, setAddingItem] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

  const {
    query = "all",
    category = "all",
    brand = "all",
    price = "all",
    rating = "all",
    sort = "featured",
    page = 1,
  } = router.query;

  const { products, countProducts, categories, brands, pages } = props;

  const filterSearch = ({
    page,
    category,
    brand,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }: any) => {
    const { query }: any = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: router.pathname,
      query: query,
    });
  };
  const categoryHandler = (e: any) => {
    filterSearch({ category: e.target.value });
  };
  const pageHandler = (page: any) => {
    filterSearch({ page });
  };
  const brandHandler = (e: any) => {
    filterSearch({ brand: e.target.value });
  };
  const sortHandler = (e: any) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e: any) => {
    filterSearch({ price: e.target.value });
  };
  const ratingHandler = (e: any) => {
    filterSearch({ rating: e.target.value });
  };

  // adding items to cart
  const addToCartHandler = async (product: any) => {
    setAddingItem(product.slug);
    const existItem = cart.cartItems.find(
      (x: CartProductDataType) => x.slug === product.slug
    );
    const qty = existItem ? existItem.qty + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (qty > data.countInStock) {
      customToast("Sorry. Product is out of stock");
      setAddingItem("");
      return;
    }
    dispatchStore({ type: "CART_ADD_ITEM", payload: { ...product, qty } });
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    setAddingItem("");
  };

  return (
    <Layout title="search">
      <div className="grid md:grid-cols-4 md:gap-5 text-black md:mt-6 md:mb-6">
        <div
          className="w-full bg-[var(--orange)] cursor-pointer md:hidden p-2 rounded-lg text-white font-semibold"
          onClick={() => {
            setOpenFilter(!openFilter);
          }}
        >
          <div className="flex flex-row">
            <div>Filter</div>
            <div className="ml-auto">
              {openFilter ? (
                <IconArrowUp fill="white" />
              ) : (
                <IconArrowDown fill="white" />
              )}
            </div>
          </div>
        </div>
        <div
          className={
            openFilter
              ? "initial"
              : "hidden md:block md:bg-[var(--black)] md:rounded-lg md:text-white"
          }
        >
          <div className="mx-4">
            <div className="my-3">
              <h2>Categories</h2>
              <select
                className="w-full"
                value={category}
                onChange={categoryHandler}
              >
                <option value="all">All</option>
                {categories &&
                  categories.map((category: any) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <h2>Brands</h2>
              <select className="w-full" value={brand} onChange={brandHandler}>
                <option value="all">All</option>
                {brands &&
                  brands.map((brand: any) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <h2>Prices</h2>
              <select className="w-full" value={price} onChange={priceHandler}>
                <option value="all">All</option>
                {prices &&
                  prices.map((price) => (
                    <option key={price.value} value={price.value}>
                      {price.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <h2>Ratings</h2>
              <select
                className="w-full"
                value={rating}
                onChange={ratingHandler}
              >
                <option value="all">All</option>
                {ratings &&
                  ratings.map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} star{rating > 1 && "s"} & up
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className="md:col-span-3 mt-2">
          <div className="mb-2 flex items-center justify-between border-b-[1px] pb-2 border-black">
            <div className="flex items-center">
              {products.length === 0 ? "No" : countProducts} Results
              {query !== "all" && query !== "" && " : " + query}
              {category !== "all" && " : " + category}
              {brand !== "all" && " : " + brand}
              {price !== "all" && " : Price " + price}
              {rating !== "all" && " : Rating " + rating + " & up"}
              &nbsp;
              {(query !== "all" && query !== "") ||
              category !== "all" ||
              brand !== "all" ||
              rating !== "all" ||
              price !== "all" ? (
                <button
                  onClick={() => router.push("/search")}
                  className="bg-[var(--orange)] rounded-full"
                >
                  <IconMenu
                    open={true}
                    className="p-1 rounded-full"
                    fill="white"
                  />
                </button>
              ) : null}
            </div>
            <div>
              Sort by{" "}
              <select value={sort} onChange={sortHandler}>
                <option value="featured">Featured</option>
                <option value="lowest">Price: Low to High</option>
                <option value="highest">Price: High to Low</option>
                <option value="toprated">Customer Reviews</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5  ">
              {products.map((product: any) => (
                <ProductItem
                  key={product._id}
                  product={product}
                  addToCartHandler={addToCartHandler}
                  currentAddingItem={addingItem}
                />
              ))}
            </div>
            <ul className="flex my-4">
              {products.length > 0 &&
                Array.from(Array(pages).keys()).map((pageNumber) => (
                  <li key={pageNumber}>
                    <button
                      className={`text-white m-2 bg-[var(--orange)] px-4 py-1 rounded-lg ${
                        page == pageNumber + 1 ? "font-bold bg-[black]" : ""
                      } `}
                      onClick={() => pageHandler(pageNumber + 1)}
                    >
                      {pageNumber + 1}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }: any) {
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || "";
  const brand = query.brand || "";
  const price = query.price || "";
  const rating = query.rating || "";
  const sort = query.sort || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter = category && category !== "all" ? { category } : {};
  const brandFilter = brand && brand !== "all" ? { brand } : {};
  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  // 10-50
  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};
  const order: any =
    sort === "featured"
      ? { isFeatured: -1 }
      : sort === "lowest"
      ? { price: 1 }
      : sort === "highest"
      ? { price: -1 }
      : sort === "toprated"
      ? { rating: -1 }
      : sort === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  await db.connect();
  const categories = await Product.find().distinct("category");
  const brands = await Product.find().distinct("brand");
  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...brandFilter,
      ...ratingFilter,
    },
    "-reviews"
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...brandFilter,
    ...ratingFilter,
  });

  await db.disconnect();
  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
      brands,
    },
  };
}
