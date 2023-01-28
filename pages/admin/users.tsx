import AdminDashNav from "@/components/AdminDashNav";
import MiniLoading from "@/components/MiniLoading";
import { Auth } from "@/utils/Auth";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
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
                  <div className="flex md:hidden text-black flex-col space-y-2 mt-8">
                    {users.map((user: any) => (
                      <div key={user._id} className="w-full">
                        <div className="flex flex-row">
                          <div className="flex flex-col">
                            <div className="text-lg font-semibold">
                              user {user._id.substring(20, 24)}
                              <span className="ml-2">{user.name}</span>
                            </div>
                            <div className="">Email: {user.email}</div>
                            <div className="">
                              Admin: {user.isAdmin ? "Yes" : "No"}
                            </div>
                          </div>
                          <div className="flex flex-col ml-auto my-2 gap-2">
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

                  <div className="overflow-x-auto flex-auto w-full hidden md:inline">
                    <table className="min-w-full">
                      <thead className="buser-b">
                        <tr>
                          <th className="px-5 text-left">ID</th>
                          <th className="p-5 text-left">NAME</th>
                          <th className="p-5 text-left">EMAIL</th>
                          <th className="p-5 text-left">ADMIN</th>
                          <th className="p-5 text-left">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user: any) => (
                          <tr key={user._id} className="border-b">
                            <td className=" p-5 ">
                              {user._id.substring(20, 24)}
                            </td>
                            <td className=" p-5 ">{user.name}</td>
                            <td className=" p-5 ">{user.email}</td>
                            <td className=" p-5 ">
                              {user.isAdmin ? "YES" : "NO"}
                            </td>
                            <td className=" p-5 flex gap-2">
                              <Link
                                className="pri-button"
                                href={`/admin/user/${user._id}`}
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
