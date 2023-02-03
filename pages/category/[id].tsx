import Layout from "@/components/Layout";
import LoadingProductItem from "@/components/LoadingProductItem";
import ProductItem from "@/components/ProductItem";
import { customToast } from "@/utils/customToast";
import { getError } from "@/utils/error";
import { CartProductDataType, Store } from "@/utils/Store";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useReducer, useState } from "react";

export default function CategoryScreen(props: any) {
  var router = useRouter();
  const { state, dispatchStore } = useContext(Store);
  var category = router.query["id"];
  const [addingItem, setAddingItem] = useState("");
  const { cart } = state;
  const [{ loading, error, prod }, dispatch] = useReducer(reducer, {
    loading: true,
    prod: [],
    error: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        const { data } = await axios.get(`/api/categories/${category}`, {
          params: { category: category!.toString() },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchProducts();
  }, [category]);

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
    <Layout title={category?.toString()}>
      <div className="w-full h-auto mt-4 rounded-lg">
        <div className="heading1">{category}</div>
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
