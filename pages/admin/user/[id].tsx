import AdminDashNav from "@/components/AdminDashNav";
import MiniLoading from "@/components/MiniLoading";
import { Auth } from "@/utils/Auth";
import data from "@/utils/data";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Layout from "../../../components/Layout";
import { getError } from "../../../utils/error";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false, errorUpdate: "" };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}
export default function AdminUserEditScreen() {
  const { query } = useRouter();
  const userId = query.id;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/users/${userId}`);
        dispatch({ type: "FETCH_SUCCESS" });
        setValue("name", data.name);
        setValue("email", data.email);
        setValue("isAdmin", data.isAdmin);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, [userId, setValue]);

  const router = useRouter();

  const submitHandler = async ({ name, email, isAdmin }: any) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/admin/users/${userId}`, {
        name,
        email,
        isAdmin,
      });
      dispatch({ type: "UPDATE_SUCCESS" });
      toast.success("user updated successfully");
      router.push("/admin/users");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Auth adminOnly>
      <Layout title={`Edit user ${userId}`}>
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
                  <form
                    className="mx-auto max-w-screen-md"
                    onSubmit={handleSubmit(submitHandler)}
                  >
                    <div className="mb-4 mt-4 md:mt-0 text-xl text-[var(--orange)]">{`Edit user ${userId}`}</div>
                    <div className="mb-4">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="w-full"
                        id="name"
                        autoFocus
                        {...register("name", {
                          required: "Please enter name",
                        })}
                      />
                      {errors.name && (
                        <div className="text-red-500">
                          {errors.name.message?.toString()}
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="name">Email</label>
                      <input
                        type="text"
                        className="w-full"
                        id="email"
                        autoFocus
                        {...register("email", {
                          required: "Please enter email",
                        })}
                      />
                      {errors.email && (
                        <div className="text-red-500">
                          {errors.email.message?.toString()}
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="name">Admin</label>
                      <select
                        className="w-full"
                        id="isAdmin"
                        {...register("isAdmin", {
                          required: "Should be true or false",
                        })}
                      >
                        <option value="true">true</option>
                        <option value="false">false</option>
                      </select>

                      {errors.isAdmin && (
                        <div className="text-red-500">
                          {errors.isAdmin.message?.toString()}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-row align-middle gap-2 my-8">
                      <Link className="sec-button" href={`/admin/users`}>
                        Back
                      </Link>

                      <button disabled={loadingUpdate} className="pri-button">
                        {loadingUpdate ? "Loading" : "Update"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </Auth>
  );
}
