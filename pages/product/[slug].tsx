import React, { useContext, useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Link from "next/link";
import Image from "next/image";
import { CartProductDataType, Store } from "../../utils/Store";
import axios from "axios";
import { customToast } from "../../utils/customToast";
import RatingDisplay from "@/components/RatingDisplay";
import { getError } from "@/utils/error";
import MiniLoading from "@/components/MiniLoading";
import Loading from "@/components/Loading";

export default function ProductScreen() {
  const { state, dispatchStore } = useContext(Store);
  var router = useRouter();
  var product = router.query["id"];

  const [addingItem, setAddingItem] = useState("");
  const { cart } = state;
  const [{ loading, error, prod }, dispatch] = useReducer(reducer, {
    loading: true,
    prod: [],
    error: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        // await new Promise((resolve) => setTimeout(resolve, 10000));
        const { data } = await axios.get(`/api/products/${product}`, {
          params: { prod: product! },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchProduct();
  }, [product]);

  // adding items to cart
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find(
      (x: CartProductDataType) => x.slug === prod.slug
    );
    const qty = existItem ? existItem.qty + 1 : 1;
    const { data } = await axios.get(`/api/products/${prod._id}`);

    if (qty > data.countInStock) {
      customToast("Sorry. Product is out of stock");
      return;
    }

    dispatchStore({ type: "CART_ADD_ITEM", payload: { ...prod, qty } });
    router.push("/cart");
  };

  return (
    <Layout title={prod.name}>
      <div className="py-4 md:py-8 mb-4">
        <Link
          href="/"
          className="bg-[var(--orange)] text-white font-bold py-3 px-8 rounded-lg hover:bg-[var(--darkerorange)] hover:text-text"
        >
          Back to products
        </Link>
      </div>
      {loading ? (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center">
          <div className="text-4xl text-[var(--orange)]">{error}</div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 md:gap-3 mb-8">
          {/* Image */}
          <div className="md:col-span-1 rounded-lg">
            <Image
              className="rounded-lg black-border"
              src={prod.image}
              alt={prod.name}
              width={640}
              height={640}
              layout="responsive"
            ></Image>
          </div>
          {/* List on the right of image */}
          <div className="text-black flex flex-col my-4 md:my-0 space-y-2 md:mx-4 mx-2">
            <div className="text-xl font-semibold">{prod.name}</div>
            <div className="text-lg">
              <RatingDisplay rating={prod.rating} />
            </div>
            <div className="text-lg">{prod.description}</div>
            <div className="flex flex-row space-x-2">
              {prod.category.map((x: any) => (
                <span
                  key={x}
                  className="bg-[var(--orange)] text-white rounded-lg px-2 py-1"
                >
                  {x}
                </span>
              ))}
            </div>
          </div>
          {/* Below the right text */}
          <div className="text-white">
            <div className="card p-5 bg-[var(--black)] rounded-lg">
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>£{prod.price}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status</div>
                <div>{prod.countInStock > 0 ? "In stock" : "Unavailable"}</div>
              </div>
              <button className="pri-button  w-full" onClick={addToCartHandler}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, prod: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// to fetch from database
// export async function getServerSideProps(context: any) {
//   const { params } = context;
//   const { slug } = params;

//   await db.connect();
//   const product = await Product.findOne({ slug }).lean();
//   await db.disconnect();

//   return {
//     props: {
//       product: product ? db.convertDocToObj(product) : null,
//     },
//   };
// }
