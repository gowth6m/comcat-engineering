import Loading from "@/components/Loading";
import MiniLoading from "@/components/MiniLoading";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import Layout from "../components/Layout";
import { Auth } from "../utils/Auth";
import { getError } from "../utils/error";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function OrderHistoryScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);
  
  return (
    <Auth>
      <Layout title="Order History">
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <>
            <h1 className="my-4 md:ml-4 heading1">Order History</h1>

            <div className="flex md:hidden text-black flex-col space-y-2">
              {orders.map((order: any) => (
                <div key={order._id} className="w-full">
                  <div className="flex flex-row">
                    <div className="flex flex-col">
                      <div className="text-lg font-semibold">
                        Order {order._id.substring(20, 24)}
                        <span className="ml-2">
                          {order.createdAt.substring(0, 10)}
                        </span>
                      </div>
                      <div className="">
                        £{order.totalPrice.toLocaleString("en", options)}
                      </div>
                      <div className="">
                        Paid status:{" "}
                        {order.isPaid
                          ? `${order.paidAt.substring(0, 10)}`
                          : "not paid"}
                      </div>
                      <div className="">
                        Delivery status:{" "}
                        {order.isDelivered
                          ? `${order.deliveredAt.substring(0, 10)}`
                          : "not delivered"}
                      </div>
                    </div>
                    <div className="flex flex-col ml-auto my-2">
                      <Link
                        className="pri-button"
                        href={`/order/${order._id}`}
                        passHref
                      >
                        Details
                      </Link>
                    </div>
                  </div>

                  <CartDivider />
                </div>
              ))}
            </div>

            <div className="overflow-x-auto text-black text-center hidden md:inline">
              <table className="min-w-full">
                <thead className="border-b text-black text-center">
                  <tr>
                    <th className="px-5">ID</th>
                    <th className="p-5">DATE</th>
                    <th className="p-5">TOTAL</th>
                    <th className="p-5">PAID</th>
                    <th className="p-5">DELIVERED</th>
                    <th className="p-5">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: any) => (
                    <tr key={order._id} className="border-b">
                      <td className=" p-5 ">{order._id.substring(20, 24)}</td>
                      <td className=" p-5 ">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className=" p-5 ">
                        £{order.totalPrice.toLocaleString("en", options)}
                      </td>
                      <td className=" p-5 ">
                        {order.isPaid
                          ? `${order.paidAt.substring(0, 10)}`
                          : "not paid"}
                      </td>
                      <td className=" p-5 ">
                        {order.isDelivered
                          ? `${order.deliveredAt.substring(0, 10)}`
                          : "not delivered"}
                      </td>
                      <td className=" p-5 ">
                        <Link
                          className="pri-button"
                          href={`/order/${order._id}`}
                          passHref
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Layout>
    </Auth>
  );
}

export default OrderHistoryScreen;

const options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

function CartDivider() {
  return <div className="h-[1px] w-full bg-[#00000050] mt-2"></div>;
}
