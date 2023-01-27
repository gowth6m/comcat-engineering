import MiniLoading from "@/components/MiniLoading";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import AdminDashNav from "../../components/AdminDashNav";
import Layout from "../../components/Layout";
import { Auth } from "../../utils/Auth";
import { getError } from "../../utils/error";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      state;
  }
}
export default function AdminProdcutsScreen() {
  const router = useRouter();

  const [
    { loading, error, products, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  const createHandler = async () => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(`/api/admin/products`);
      dispatch({ type: "CREATE_SUCCESS" });
      toast.success("Product created successfully");
      router.push(`/admin/product/${data.product._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/products`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (productId: any) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/products/${productId}`);
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("Product deleted successfully");
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
      toast.error(getError(err));
    }
  };
  return (
    <Auth adminOnly>
      <Layout title="Admin Dashboard">
        <div className="md:w-full mx-auto">
          <div className="flex flex-col md:flex-row text-black mt-4 md:mt-8">
            <AdminDashNav active={2} />
            <div className="flex-auto w-full">
              {loading ? (
                <div className="mt-[20%]">
                  <MiniLoading />
                </div>
              ) : error ? (
                <div className="alert-error">{error}</div>
              ) : (
                <>
                  <div className="flex md:hidden text-black flex-col space-y-2 mt-8">
                    {products.map((product: any) => (
                      <div key={product._id} className="w-full">
                        <div className="flex flex-row">
                          <div className="flex flex-col">
                            <div className="text-lg font-semibold">
                              product {product._id.substring(20, 24)}
                              <span className="ml-2">{product.name}</span>
                            </div>
                            <div className="">
                              £{product.price.toLocaleString("en", options)}
                            </div>
                            <div className="">{product.countInStock}</div>
                            <div className="">{product.rating}</div>
                          </div>
                          <div className="flex flex-col ml-auto my-2">
                            <Link
                              className="default-button"
                              href={`/admin/product/${product._id}`}
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => deleteHandler(product._id)}
                              className="default-button"
                              type="button"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        <CartDivider />
                      </div>
                    ))}
                  </div>

                  <div className="overflow-x-auto flex-auto w-full hidden md:inline">
                    <table className="min-w-full">
                      <thead className="bproduct-b">
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
                        {products.map((product: any) => (
                          <tr key={product._id} className="bproduct-b">
                            <td className="p-5">
                              {product._id.substring(20, 24)}
                            </td>
                            <td className="p-5">{product.name}</td>
                            <td className="p-5">
                              {product.createdAt.substring(0, 10)}
                            </td>
                            <td className="p-5">
                              £
                              {product.price.toLocaleString("en", options)}
                            </td>
                            <td className="p-5">
                              {product.isPaid
                                ? `${product.paidAt.substring(0, 10)}`
                                : "not paid"}
                            </td>
                            <td className="p-5">
                              {product.isDelivered
                                ? `${product.deliveredAt.substring(0, 10)}`
                                : "not delivered"}
                            </td>
                            <td className="p-5">
                              <Link
                                href={`/product/${product._id}`}
                                className="pri-button"
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
