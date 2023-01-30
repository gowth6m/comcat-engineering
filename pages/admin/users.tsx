import AdminDashNav from "@/components/AdminDashNav";
import MiniLoading from "@/components/MiniLoading";
import { Auth } from "@/utils/Auth";
import axios from "axios";
import Link from "next/link";
import router from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, users: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
}

function AdminUsersScreen() {
  const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      users: [],
      error: "",
    });
  const [searchQuery, setSearchQuery] = useState("");

  function searchSubmitHandler(e: any) {
    e.preventDefault();

    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/users`, {
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
        const { data } = await axios.get(`/api/admin/users`);
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

  const deleteHandler = async (userId: any) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/users/${userId}`);
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("User deleted successfully");
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
            <AdminDashNav active={3} />
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
                      {/* <button className="pri-button my-2 mx-2 cursor-pointer">
                        Create User
                      </button> */}
                      <form
                        onSubmit={searchSubmitHandler}
                        className="w-full text-white flex flex-row align-middle first-line:text-center my-2 mx-2"
                      >
                        <input
                          type="search"
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search for users"
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
                    {users.map((user: any) => (
                      <div key={user._id} className="w-full">
                        <div className="flex flex-row">
                          <div className="flex flex-col">
                            <div className="text-lg font-semibold">
                              {user.email}
                            </div>
                            <div className="">Name: {user.name}</div>
                            <div className="">
                              Admin: {user.isAdmin ? "Yes" : "No"}
                            </div>
                          </div>
                          <div className="flex flex-col ml-auto my-2 gap-2 mx-2">
                            <Link
                              className="pri-button"
                              href={`/admin/user/${user._id}`}
                              passHref
                            >
                              Edit
                            </Link>
                            <button
                              type="button"
                              className="pri-button"
                              onClick={() => deleteHandler(user._id)}
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
                      {/* <button className="pri-button ml-4 my-2 cursor-pointer">
                        Create
                      </button> */}
                      <form
                        onSubmit={searchSubmitHandler}
                        className="w-full text-white flex flex-row align-middle first-line:text-center my-2"
                      >
                        <input
                          type="search"
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search for users"
                          className="ml-auto rounded-lg text-center orange-border w-2/6"
                        />

                        <button
                          type="submit"
                          className="cursor-pointer pri-button ml-4 mr-4"
                        >
                          Search
                        </button>
                      </form>
                    </div>

                    <table className="min-w-full">
                      <thead className="buser-b">
                        <tr>
                          <th className="px-5 text-left">ID</th>
                          <th className="py-3 px-5 text-left">NAME</th>
                          <th className="py-3 px-5 text-left">EMAIL</th>
                          <th className="py-3 px-5 text-left">ADMIN</th>
                          <th className="py-3 px-5 text-left">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user: any) => (
                          <tr key={user._id} className="border-b">
                            <td className=" py-3 px-5 ">
                              {user._id.substring(20, 24)}
                            </td>
                            <td className=" py-3 px-5 ">{user.name}</td>
                            <td className=" py-3 px-5 ">{user.email}</td>
                            <td className=" py-3 px-5 ">
                              {user.isAdmin ? "YES" : "NO"}
                            </td>
                            <td className=" py-3 px-5 flex gap-2">
                              <Link
                                className="pri-button-wide"
                                href={`/admin/user/${user._id}`}
                              >
                                Edit
                              </Link>
                              <button
                                type="button"
                                className="pri-button-wide"
                                onClick={() => deleteHandler(user._id)}
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

export default AdminUsersScreen;

const options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const cssTH = "px-5 text-left pt-5 md:pt-0";

function CartDivider() {
  return <div className="h-[1px] w-full bg-[#00000050] mt-2"></div>;
}
