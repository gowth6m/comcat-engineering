import AdminDashNav from "@/components/AdminDashNav";
import MiniLoading from "@/components/MiniLoading";
import axios from "axios";
import error from "next/error";
import Link from "next/link";
import React, { Component, useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import { Auth } from "../../utils/Auth";
import data from "../../utils/data";
import { getError } from "../../utils/error";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        // await new Promise((resolve) => setTimeout(resolve, 10000));
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x: any) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: "Sales",
        backgroundColor: "rgba(162, 222, 208, 1)",
        data: summary.salesData.map((x: any) => x.totalSales),
      },
    ],
  };

  return (
    <Auth adminOnly>
      <Layout title="Admin Dashboard">
        <div className="md:w-full mx-auto">
          <div className="flex flex-col md:flex-row text-black mt-4 md:mt-8">
            <AdminDashNav active={0} />

            <div className="flex-auto w-full">
              {loading ? (
                <div className="mt-[20%]">
                  <MiniLoading />
                </div>
              ) : error ? (
                <div className="alert-error">{error}</div>
              ) : (
                <div className="flex flex-col mb-8">
                  <div className={cssCard}>
                    <p className="text-3xl">
                      £{summary.ordersPrice.toLocaleString("en", options)}{" "}
                    </p>
                    <p className="text-[var(--orange)]">Sales</p>
                    <Link className="text-black" href="/admin/orders">
                      View sales
                    </Link>
                  </div>
                  <div className={cssCard}>
                    <p className="text-3xl">{summary.ordersCount} </p>
                    <p className="text-[var(--orange)]">Orders</p>
                    <Link className="text-black" href="/admin/orders">
                      View orders
                    </Link>
                  </div>
                  <div className={cssCard}>
                    <p className="text-3xl">{summary.productsCount} </p>
                    <p className="text-[var(--orange)]">Products</p>
                    <Link className="text-black" href="/admin/products">
                      View products
                    </Link>
                  </div>
                  <div className={cssCard}>
                    <p className="text-3xl">{summary.usersCount} </p>
                    <p className="text-[var(--orange)]">Users</p>
                    <Link className="text-black" href="/admin/users">
                      View users
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </Auth>
  );
}

const options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const cssCard = "orange-border rounded-lg mx-5 mb-5 p-5 mt-5 md:mt-0";
