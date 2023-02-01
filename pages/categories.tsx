import Layout from "@/components/Layout";
import MiniLoading from "@/components/MiniLoading";
import { getError } from "@/utils/error";
import { Store } from "@/utils/Store";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useReducer } from "react";

export default function CategoriesScreen() {
  const { state, dispatchStore } = useContext(Store);
  const { cart } = state;
  const [{ loading, error, prod }, dispatch] = useReducer(reducer, {
    loading: true,
    categories: [],
    error: "",
  });

  console.log(prod);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        // await new Promise((resolve) => setTimeout(resolve, 5000));
        const { data } = await axios.get(`/api/products/categories`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchProducts();
  }, []);

  return (
    <Layout title="Categories">
      <div className="md:w-5/6 mx-auto">
        <div className="heading1 mt-2 md:mt-4">Categories</div>

        <div>
          {loading ? (
            <div className="my-10">
              <MiniLoading />
            </div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-4 w-full mb-4">
              {prod.map((category: any) => {
                return (
                  <Link
                    key={category}
                    href={"/category/" + category}
                    className="text-black text-lg orange-border rounded-lg hover:bg-[var(--orange)] hover:text-white"
                  >
                    <div className="text-center px-4 py-4 md:py-8">{category}</div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
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
