import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { getError } from "../utils/error";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

export default function RegisterScreen() {
  const router = useRouter();
  const { data: session }: any = useSession();
  const { redirect } = router.query;
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    if (session?.user) {
      router.push("/" || redirect);
    }
  }),
    [router, session, redirect];

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }: any) => {
    try {
      setRegistering(true);
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });
      setRegistering(false);

      if (result?.error) {
        toast.error(getError(result?.error) ?? "An error occurred");
      }
    } catch (error) {
      toast.error(getError(error) ?? "An error occurred");
    }
    setRegistering(false);
  };

  return (
    <Layout title="Register">
      {registering ? <Loading /> : <div></div>}
      <form
        action=""
        className="mx-auto max-w-screen-sm mt-8"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="heading1">Register</h1>
        <div className="mb-4 text-black">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            {...register("name", {
              required: "Please enter name",
            })}
            id="name"
            autoFocus
          />
          {errors.name && (
            <div className="text-red-500">
              {errors.name.message?.toString()}
            </div>
          )}
        </div>
        <div className="mb-4 text-black">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter valid email",
              },
            })}
            id="email"
          />
          {errors.email && (
            <span className="text-red-500">
              {errors.email.message?.toString()}
            </span>
          )}
        </div>
        <div className="mb-4 text-black">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Please enter password",
              minLength: {
                value: 8,
                message: "Password must be at least 8 chars",
              },
            })}
            id="password"
          />
          {errors.password && (
            <span className="text-red-500">
              {errors.password.message?.toString()}
            </span>
          )}
        </div>
        <div className="mb-4 text-black">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please enter confirm password",
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

        <div className="mb-4 text-black">
          <button className="pri-button-wide md:w-auto">Register</button>
        </div>
        <div className="mb-4 text-black">
          Have an account?{" "}
          <Link className="text-[var(--orange)] hover:font-bold" href="/login">
            Login
          </Link>
        </div>
      </form>
    </Layout>
  );
}
