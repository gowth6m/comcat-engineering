import MiniLoading from "@/components/MiniLoading";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");

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

  function searchSubmitHandler(e: any) {
    e.preventDefault();

    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/products`, {
          params: { search: searchQuery },
        });
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
    setSearchQuery("");
  }

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
                  <div className="flex md:hidden text-black flex-col space-y-2 mt-6">
                    <div className="w-full bg-[var(--black)] mb-4 mx-auto flex flex-col rounded-lg">
                      <button
                        className="pri-button my-2 mx-2 cursor-pointer"
                        disabled={loadingCreate}
                        onClick={createHandler}
                      >
                        Create Product
                      </button>
                      <form
                        onSubmit={searchSubmitHandler}
                        className="w-full text-white flex flex-row align-middle first-line:text-center my-2 mx-2"
                      >
                        <input
                          type="search"
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search for products"
                          className="rounded-lg text-center orange-border w-full"
                        />
                        <button
                          type="submit"
                          className="cursor-pointer pri-button ml-4 mr-4"
                        >
                          Search
                        </button>
                      </form>
                    </div>
                    {products.map((product: any) => (
                      <div key={product._id} className="w-full">
                        <div className="flex flex-row">
                          <div className="flex flex-col">
                            <div className="text-lg font-semibold">
                              product {product._id.substring(20, 24)}
                              <span className="ml-2">{product.name}</span>
                            </div>
                            <div className="">
                              Price: £
                              {product.price.toLocaleString("en", options)}
                            </div>
                            <div className="">
                              Stock: {product.countInStock}
                            </div>
                            <div className="">Rating: {product.rating}</div>
                          </div>
                          <div className="flex flex-col ml-auto my-2 gap-2">
                            <Link
                              className="pri-button"
                              href={`/admin/product/${product._id}`}
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => deleteHandler(product._id)}
                              className="pri-button"
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

                  <div className="overflow-x-auto flex-auto w-full hidden md:block md:mx-2">
                    <div className="w-[98%] bg-[var(--black)] mb-4 mx-auto flex flex-row rounded-lg">
                      <button
                        className="ml-4 cursor-pointer bg-[var(--orange)] text-white rounded-lg px-4 py-0 my-1"
                        disabled={loadingCreate}
                        onClick={createHandler}
                      >
                        Create
                      </button>
                      <form
                        onSubmit={searchSubmitHandler}
                        className="w-full text-white flex flex-row align-middle first-line:text-center"
                      >
                        <input
                          type="search"
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search for products"
                          className="ml-auto rounded-lg text-center orange-border w-2/6 my-1 py-1"
                        />
                        <button
                          type="submit"
                          className="cursor-pointer bg-[var(--orange)] text-white rounded-lg ml-4 mr-4 my-1 py-0 px-4"
                        >
                          Search
                        </button>
                      </form>
                    </div>
                    <table className="min-w-full">
                      <thead className="bproduct-b">
                        <tr>
                          <th className={cssTH}>ID</th>
                          <th className={cssTH}>USER</th>
                          <th className={cssTH}>PRICE</th>
                          <th className={cssTH}>COUNT</th>
                          <th className={cssTH}>RATING</th>
                          <th className={cssTH}>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product: any) => (
                          <tr key={product._id} className="bproduct-b">
                            <td className="py-4 px-5">
                              {product._id.substring(20, 24)}
                            </td>
                            <td className="py-4 px-5">{product.name}</td>
                            <td className="py-4 px-5">
                              £{product.price.toLocaleString("en", options)}
                            </td>
                            <td className="py-4 px-5">
                              {product.countInStock}
                            </td>
                            <td className="py-4 px-5">{product.rating}</td>
                            <td className="py-4 px-5 flex gap-2 w-full">
                              <Link
                                className="pri-button-wide"
                                href={`/admin/product/${product._id}`}
                              >
                                Edit
                              </Link>

                              <button
                                onClick={() => deleteHandler(product._id)}
                                className="pri-button-wide"
                                type="button"
                              >
                                Delete
                              </button>
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
