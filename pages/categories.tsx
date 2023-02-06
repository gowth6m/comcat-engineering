import Layout from "@/components/Layout";
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        const { data } = await axios.get(`/api/categories`);
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 w-full mb-4">
              {Array.from({ length: 12 }).map((i: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="text-black text-lg rounded-lg h-[4.4rem] md:h-24 bg-[var(--lightergrey)] animate-pulse"
                  ></div>
                );
              })}
            </div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 w-full mb-4">
              {prod.map((category: any) => {
                return (
                  <Link
                    key={category}
                    href={"/category/" + category}
                    className="text-black text-lg orange-border rounded-lg hover:bg-[var(--orange)] hover:text-white"
                  >
                    <div className="text-center px-5 py-5 md:py-8">
                      {category}
                    </div>
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
