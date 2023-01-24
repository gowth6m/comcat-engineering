import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { getError } from "../utils/error";
import { useRouter } from "next/router";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

export default function LoginScreen() {
  const router = useRouter();
  const { data: session } = useSession();
  const { redirect } = router.query;
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    if (session?.user) {
      router.push("/" || redirect);
    }
  }),
    [router, session, redirect];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }: any) => {
    try {
      setLoggingIn(true);
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });
      setLoggingIn(false);

      if (result?.error) {
        toast.error(getError(result?.error) ?? "Invalid credentials");
      }
    } catch (error) {
      toast.error(getError(error) ?? "An error occurred");
    }
  };

  return (
    <Layout title="Login">
      {loggingIn ? <Loading /> : <div></div>}
      <form
        action=""
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
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
            className="w-full"
            id="email"
            autoFocus
          />
          {errors.email && (
            <span className="text-red-500">
              {errors.email.message?.toString()}
            </span>
          )}
        </div>
        <div className="mb-4">
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
            className="w-full"
            id="password"
            autoFocus
          />
          {errors.password && (
            <span className="text-red-500">
              {errors.password.message?.toString()}
            </span>
          )}
        </div>
        <div className="mb-4">
          <button onClick={() => {}} className="primary-button">
            Login
          </button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account?{" "}
          <Link
            className="text-[var(--blue)] hover:text-black"
            href={`/register?redirect=${redirect || "/"}`}
          >
            Register
          </Link>
        </div>
      </form>
    </Layout>
  );
}
