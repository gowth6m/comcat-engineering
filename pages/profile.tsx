import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { getError } from "../utils/error";
import axios from "axios";
import Layout from "../components/Layout";
import { Auth } from "../utils/Auth";
import toast from "react-hot-toast";

export default function ProfileScreen() {
  const { data: session }: any = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", session?.user.name);
    setValue("email", session?.user.email);
  }, [session?.user, setValue]);

  const submitHandler = async ({ name, email, password }: any) => {
    try {
      await axios.put("/api/auth/update", {
        name,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      toast.success("Profile updated successfully");

      if (result!.error) {
        toast.error(result!.error ?? "Error occurred");
      }
    } catch (err) {
      toast.error(getError(err) ?? "Error occurred");
    }
  };

  return (
    <Auth>
      <Layout title="Profile">
        <form
          className="mx-auto max-w-screen-sm mt-8 text-black"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 heading1">Update Profile</h1>

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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="w-full"
              id="email"
              {...register("email", {
                required: "Please enter email",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "Please enter valid email",
                },
              })}
            />
            {errors.email && (
              <div className="text-red-500">
                {errors.email.message?.toString()}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              className="w-full"
              type="password"
              id="password"
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "password must be at least 8 chars",
                },
              })}
            />
            {errors.password && (
              <div className="text-red-500 ">
                {errors.password.message?.toString()}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="w-full"
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                validate: (value) => value === getValues("password"),
                minLength: {
                  value: 6,
                  message: "confirm password is more than 5 chars",
                },
              })}
            />
            {errors.confirmPassword && (
              <div className="text-red-500 ">
                {errors.confirmPassword.message?.toString()}
              </div>
            )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === "validate" && (
                <div className="text-red-500 ">Password do not match</div>
              )}
          </div>
          <div className="mb-4">
            <button className="pri-button-wide md:w-auto">
              Update Profile
            </button>
          </div>
        </form>
      </Layout>
    </Auth>
  );
}
