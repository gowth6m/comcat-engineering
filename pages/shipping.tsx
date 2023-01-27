import React, { useContext, useEffect } from "react";
import CheckoutLayout from "../components/CheckoutLayout";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { Auth } from "../utils/Auth";
import router from "next/router";

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatchStore } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postcode", shippingAddress.postcode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({
    fullName,
    address,
    city,
    postcode,
    country,
  }: any) => {
    console.log(fullName, address, city, postcode, country);

    dispatchStore({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postcode, country },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postcode,
          country,
        },
      })
    );
    router.push("/payment");
  };

  return (
    <Auth>
      <Layout title="Shipping">
        <CheckoutLayout activeStep={1} />
        <form
          className="mx-auto max-w-screen-sm text-black mb-10"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 heading1">Shipping Address</h1>

          {/* Full Name */}
          <label htmlFor="fullName">Full Name</label>
          <input
            className="w-full"
            id="fullName"
            autoFocus
            {...register("fullName", { required: "Please enter full name" })}
          ></input>
          {errors.fullName && (
            <div className="text-red-500">
              {errors.fullName.message as string}
            </div>
          )}

          {/* Address */}
          <label htmlFor="fullName">Address</label>
          <input
            className="w-full"
            id="address"
            autoFocus
            {...register("address", {
              required: "Please enter valid address",
              minLength: {
                value: 3,
                message: "Address must be at least 3 chars",
              },
            })}
          ></input>
          {errors.address && (
            <div className="text-red-500">
              {errors.address.message as string}
            </div>
          )}

          {/* City */}
          <label htmlFor="fullName">City</label>
          <input
            className="w-full"
            id="city"
            autoFocus
            {...register("city", {
              required: "Please enter valid city",
            })}
          ></input>
          {errors.city && (
            <div className="text-red-500">{errors.city.message as string}</div>
          )}

          {/* PostalCode */}
          <label htmlFor="fullName">Postcode</label>
          <input
            className="w-full"
            id="postcode"
            autoFocus
            {...register("postcode", {
              required: "Please enter valid postcode",
              minLength: {
                value: 5,
                message: "Postcode must be at least 5 chars",
              },
            })}
          ></input>
          {errors.postcode && (
            <div className="text-red-500">
              {errors.postcode.message as string}
            </div>
          )}

          {/* Country */}
          <label htmlFor="fullName">Country</label>
          <input
            className="w-full"
            id="country"
            autoFocus
            {...register("country", {
              required: "Please enter valid country",
            })}
          ></input>
          {errors.country && (
            <div className="text-red-500">
              {errors.country.message as string}
            </div>
          )}

          <div className="mb-4 mt-4 flex justify-between">
            <button className="pri-button-wide md:w-auto">Next</button>
          </div>
        </form>
      </Layout>
    </Auth>
  );
}
