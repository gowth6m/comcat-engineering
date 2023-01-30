import AdminDashNav from "@/components/AdminDashNav";
import Loading from "@/components/Loading";
import MiniLoading from "@/components/MiniLoading";
import { Auth } from "@/utils/Auth";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useReducer, useState } from "react";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";
import { Switch } from "@headlessui/react";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminOrderScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (enabled) {
      const fetchData = async () => {
        try {
          dispatch({ type: "FETCH_REQUEST" });
          const { data } = await axios.get(`/api/admin/orders`, {
            params: { delivered: "false" },
          });
          dispatch({ type: "FETCH_SUCCESS", payload: data });
        } catch (err) {
          dispatch({ type: "FETCH_FAIL", payload: getError(err) });
        }
      };
      fetchData();
    } else {
      const fetchData = async () => {
        try {
          dispatch({ type: "FETCH_REQUEST" });
          const { data } = await axios.get(`/api/admin/orders`);
          dispatch({ type: "FETCH_SUCCESS", payload: data });
        } catch (err) {
          dispatch({ type: "FETCH_FAIL", payload: getError(err) });
        }
      };
      fetchData();
    }
  }, [enabled]);

  return (
    <Auth adminOnly>
      <Layout title="Admin Dashboard">
        <div className="md:w-full mx-auto">
          <div className="flex flex-col md:flex-row text-black mt-4 md:mt-8">
            <AdminDashNav active={1} />
            <div className="flex-auto w-full">
              {loading ? (
                <div className="mt-[20%]">
                  <MiniLoading />
                </div>
              ) : error ? (
                <div className="alert-error">{error}</div>
              ) : (
                <>
                  <div className="flex md:hidden text-black flex-col space-y-2 mt-6">
                    <div className="w-full bg-[var(--black)] mb-4 mx-auto flex flex-col rounded-lg">
                      <div className="flex flex-row text-white align-middle justify-between h-full w-[95%] gap-2 mx-auto">
                        <div className="text-lg font-semibold my-[0.4rem]">
                          Not Delivered
                        </div>
                        <Switch
                          type="submit"
                          checked={enabled}
                          onChange={() => {
                            setEnabled(!enabled);
                          }}
                          className={`${
                            enabled ? "bg-[var(--orange)]" : "bg-[var(--white)]"
                          } relative inline-flex h-8 w-12 items-center rounded-full my-1`}
                        >
                          <span className="sr-only">Show not delivered</span>
                          <span
                            className={`${
                              enabled
                                ? "translate-x-5 bg-[var(--white)]"
                                : "translate-x-1 bg-[var(--orange)]"
                            } inline-block h-6 w-6 transform rounded-full transition`}
                          />
                        </Switch>
                      </div>
                    </div>
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

                  <div className="overflow-x-auto flex-auto w-full hidden md:block md:mx-2">
                    <div className="w-[98%] bg-[var(--black)] mb-4 mx-auto flex flex-row rounded-lg">
                      <div className="flex flex-row text-white align-middle justify-center gap-2 ml-auto mr-4">
                        <div className="font-semibold my-[0.5rem]">
                          Not Delivered
                        </div>
                        <Switch
                          type="submit"
                          checked={enabled}
                          onChange={() => {
                            setEnabled(!enabled);
                          }}
                          className={`${
                            enabled ? "bg-[var(--orange)]" : "bg-[var(--white)]"
                          } relative inline-flex h-6 w-12 items-center rounded-full my-2`}
                        >
                          <span className="sr-only">Show not delivered</span>
                          <span
                            className={`${
                              enabled
                                ? "translate-x-6 bg-[var(--white)]"
                                : "translate-x-1 bg-[var(--orange)]"
                            } inline-block h-5 w-5 transform rounded-full transition`}
                          />
                        </Switch>
                      </div>
                    </div>
                    <table className="min-w-full">
                      <thead className="border-b w-full">
                        <tr>
                          <th className={cssTH}>ID</th>
                          <th className={cssTH}>USER</th>
                          <th className={cssTH}>DATE</th>
                          <th className={cssTH}>TOTAL</th>
                          <th className={cssTH}>PAID</th>
                          <th className={cssTH}>DELIVERED</th>
                          <th className={cssTH}>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order: any) => (
                          <tr key={order._id} className="border-b w-full">
                            <td className="p-5">
                              {order._id.substring(20, 24)}
                            </td>
                            <td className="p-5">
                              {order.user ? order.user.name : "DELETED USER"}
                            </td>
                            <td className="p-5">
                              {order.createdAt.substring(0, 10)}
                            </td>
                            <td className="p-5">
                              £{order.totalPrice.toLocaleString("en", options)}
                            </td>
                            <td className="p-5">
                              {order.isPaid
                                ? `${order.paidAt.substring(0, 10)}`
                                : "not paid"}
                            </td>
                            <td className="p-5">
                              {order.isDelivered
                                ? `${order.deliveredAt.substring(0, 10)}`
                                : "not delivered"}
                            </td>
                            <td className="p-5">
                              <Link
                                href={`/order/${order._id}`}
                                className="pri-button-wide"
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

const cssTH = "px-5 text-left pt-5 md:pt-0";

function CartDivider() {
  return <div className="h-[1px] w-full bg-[#00000050] mt-2"></div>;
}
