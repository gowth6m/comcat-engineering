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
        className="mx-auto max-w-screen-sm mt-8"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="heading1">Login</div>
        <div className="mb-4 text-[var(--black)]">
          <label htmlFor="email">Email</label>
          <input
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter valid email",
              },
            })}
            className="w-full p-2 rounded-lg"
            id="email"
            autoFocus
          />
          {errors.email && (
            <span className="text-red-500">
              {errors.email.message?.toString()}
            </span>
          )}
        </div>
        <div className="mb-4 text-[var(--black)]">
          <label htmlFor="password">Password</label>
          <input
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: "Please enter password",
              minLength: {
                value: 8,
                message: "Password must be at least 8 chars",
              },
            })}
            className="w-full p-2 rounded-lg"
            id="password"
          />
          {errors.password && (
            <span className="text-red-500">
              {errors.password.message?.toString()}
            </span>
          )}
        </div>
        <div className="mb-4">
          <button onClick={() => {}} className="pri-button-wide md:w-auto">
            Login
          </button>
        </div>
        <div className="mb-4 text-[var(--black)]">
          Don&apos;t have an account?{" "}
          <Link
            className="text-[var(--orange)] hover:font-bold"
            href={`/register?redirect=${redirect || "/"}`}
          >
            Register
          </Link>
        </div>
      </form>
    </Layout>
  );
}
