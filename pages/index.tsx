import { useContext, useEffect, useReducer, useState } from "react";
import Layout from "@/components/Layout";
import "@splidejs/react-splide/css";
import IntroGallery from "@/components/IntroGallery";
import React from "react";
import { CartProductDataType, Store } from "@/utils/Store";
import { getError } from "@/utils/error";
import axios from "axios";
import ProductItem from "@/components/ProductItem";
import { customToast } from "@/utils/customToast";
import LoadingProductItem from "@/components/LoadingProductItem";
import IntroSlidingAnimation from "@/components/IntroSlidingAnimation";

export default function Home() {
  const [introShowcaseCurrent, setIntroShowcaseCurrent] =
    React.useState("Best Sellers");
  const introShowcaseCategory = ["Best Sellers", "New Arrivals", "Clearance"];
  const { state, dispatchStore } = useContext(Store);
  const { cart } = state;
  const [{ loading, error, prod }, dispatch] = useReducer(reducer, {
    loading: true,
    prod: [],
    error: "",
  });
  const [addingItem, setAddingItem] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        // await new Promise((resolve) => setTimeout(resolve, 5000));
        const { data } = await axios.get(`/api/products/all`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchProducts();
  }, []);

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
    <>
      {/* Image Gallery Showcase */}
      <IntroGallery />
      <Layout title="Home">
        <div className="w-full">
          {/* Intro Products Showcase */}
          <div className="bg-[var(--white)] w-full flex flex-row gap-1 justify-center align-middle rounded-lg overflow-hidden">
            {introShowcaseCategory.map((category: any) => {
              return (
                <div
                  key={category}
                  className={
                    category === introShowcaseCurrent
                      ? "bg-[var(--orange)] p-2 flex-1 text-center cursor-pointer text-white font-semibold"
                      : "bg-[var(--black)] p-2 flex-1 text-center cursor-pointer text-white"
                  }
                  onClick={() => {
                    setIntroShowcaseCurrent(category);
                  }}
                >
                  {category}
                </div>
              );
            })}
          </div>

          {/* Intro Products Showcase */}
          <div className="w-full h-auto mt-4 rounded-lg">
            {loading ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6 w-full mb-4">
                {Array.from({ length: 12 }).map((i: any, index: any) => {
                  return <LoadingProductItem key={index} />;
                })}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6 w-full mb-4">
                  {prod.map((product: any) => {
                    return (
                      <ProductItem
                        key={product.slug}
                        product={product}
                        addToCartHandler={addToCartHandler}
                        currentAddingItem={addingItem}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Sliding Animation */}

          <div className="my-4 bg-[lightgrey] rounded-lg text-xl md:text-2xl">
            <div className="my-4">
              <div className="text-[var(--black)] font-bold text-center py-4">
                Trusted by 100s of brands and outlets
              </div>
              <IntroSlidingAnimation />
            </div>
          </div>
        </div>
      </Layout>
    </>
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
