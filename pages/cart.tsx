import Link from "next/link";
import Image from "next/image";
import React, { useContext } from "react";
import Layout from "../components/Layout";
import { CartProductDataType, Store } from "../utils/Store";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";
import { customToast } from "../utils/customToast";
import { IconMenu, IconRemove } from "@/components/CustomIcons";

function CartScreen() {
  const router = useRouter();
  const { state, dispatchStore } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const removeFromCartHandler = (item: CartProductDataType) => {
    dispatchStore({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const updateCartHandler = async (item: CartProductDataType, qty: any) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      customToast("Sorry. Product is out of stock");
      return;
    }
    dispatchStore({
      type: "CART_ADD_ITEM",
      payload: { ...item, qty: quantity },
    });
    customToast("Product updated in cart");
  };

  return (
    <Layout title="Shopping Cart">
      <div className="container mx-auto flex align-middle justify-center flex-col mt-4">
        {cartItems.length !== 0 ? (
          <>
            <div className="mb-4 text-2xl text-center font-semibold text-black">
              Your cart total is £
              {cartItems
                .reduce((a: any, c: any) => a + c.price * c.qty, 0)
                .toLocaleString()}
            </div>
            <CartDivider />

            <div className="flex flex-col md:flex-row justify-between items-start my-4">
              <div className="flex flex-col w-full md:pr-8 ">
                {cartItems.map((item: CartProductDataType, count: number) => (
                  <div key={item.slug}>
                    <div className="flex flex-row justify-between items-center my-4 space-x-8">
                      <div className="flex">
                        <Image
                          className="img rounded-lg black-border"
                          src={item.image}
                          alt={item.slug}
                          width={150}
                          height={150}
                        ></Image>
                      </div>

                      <div className="flex flex-col justify-center items-center md:items-start w-full mt-6">
                        <div className="flex flex-col w-full flex-start align-top space-y-2">
                          <Link
                            className="text-black font-semibold"
                            href={`/product/${item.slug}`}
                          >
                            {item.name}
                          </Link>
                          <div className="text-black">
                            £{item.price.toFixed(2)}
                          </div>
                          <select
                            className="px-4 w-16"
                            value={item.qty}
                            onChange={(e) => {
                              updateCartHandler(item, e.target.value);
                            }}
                          >
                            {Array.from(Array(item.countInStock).keys()).map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>

                        <div className="flex flex-col items-end w-full">
                          <button
                            onClick={() => {
                              removeFromCartHandler(item);
                            }}
                            className="text-[var(--orange)] text-right flex flex-row"
                          >
                            Remove
                            <IconRemove fill="var(--orange)" className="ml-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {count === cartItems.length - 1 ? null : <CartDivider />}
                  </div>
                ))}
              </div>

              {/* DESKTOP TOTAL CONTAINER */}
              <div className="hidden md:flex flex-col justify-center items-center w-2/6 bg-[var(--black)] p-4 rounded-xl text-white">
                <div className="my-2 w-full">
                  <div className="flex flex-row items-center justify-between">
                    <div className="">
                      Shipping (
                      {cartItems.reduce((a: any, c: any) => a + c.qty, 0)})
                    </div>
                    <div className="">
                      £
                      {cartItems.reduce(
                        (a: any, c: any) => a + c.price * c.qty,
                        0
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div className="">Shipping</div>
                    <div className="">FREE</div>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between text-xl font-semibold my-1 w-full">
                  <div className="">Total</div>
                  <div className="">
                    £
                    {cartItems
                      .reduce((a: any, c: any) => a + c.price * c.qty, 0)
                      .toLocaleString()}
                  </div>
                </div>
                <div className="w-full flex">
                  <button
                    className="pri-button my-2 w-full text-xl"
                    onClick={() => router.push("/login" && "/shipping")}
                  >
                    Check Out
                  </button>
                </div>
              </div>
            </div>

            {/* MOBILE TOTAL CONTAINER */}
            <div className="md:hidden text-black">
              <CartDivider />
              <div className="my-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="">
                    Shipping (
                    {cartItems.reduce((a: any, c: any) => a + c.qty, 0)})
                  </div>
                  <div className="">
                    £
                    {cartItems
                      .reduce((a: any, c: any) => a + c.price * c.qty, 0)
                      .toLocaleString()}
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="">Shipping</div>
                  <div className="">FREE</div>
                </div>
              </div>
              <CartDivider />

              <div className="flex flex-row items-center justify-between text-xl font-semibold my-1">
                <div className="">Total</div>
                <div className="">
                  £
                  {cartItems
                    .reduce((a: any, c: any) => a + c.price * c.qty, 0)
                    .toLocaleString("en", options)}
                </div>
              </div>
              <div className="w-full flex justify-end mb-1">
                <button
                  className="pri-button my-2 w-full md:w-2/6 text-xl"
                  onClick={() =>
                    router.push("login?redirect=/shipping" && "/shipping")
                  }
                >
                  Check Out
                </button>
              </div>
            </div>
          </>
        ) : (
          // EMPTY CART
          <div className="mb-4 mt-2 text-2xl text-center font-semibold md:w-2/6 md:mx-auto text-[var(--orange)]">
            Your cart is empty.
            <br />
            <Link href="/">
              <div className="text-black pri-button my-4">
                Continue Shopping
              </div>
            </Link>
          </div>
        )}

        <div className="text-black text-center">
          <CartDivider />
          <br />
          Need more help?{" "}
          <Link
            href="/contact"
            className="text-[var(--orange)] hover:text-[var(--orange)]"
          >
            Contact us
          </Link>{" "}
          or call us on{" "}
          <a
            href="tel:01234567890"
            className="text-[var(--orange)] hover:text-[var(--orange)]"
          >
            01234 567890
          </a>
          .
          <br />
          <br />
        </div>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });

const options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

function CartDivider() {
  return <div className="h-[1px] w-full bg-[#00000050]"></div>;
}
