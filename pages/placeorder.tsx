import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CheckoutWizard from "@/components/CheckoutLayout";
import Layout from "../components/Layout";
import { Auth } from "../utils/Auth";
import { getError } from "../utils/error";
import { Store } from "../utils/Store";
import toast from "react-hot-toast";

export default function PlaceOrderScreen() {
  const { state, dispatchStore } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod, cartItems } = cart;
  const [loading, setLoading] = useState(false);
  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a: any, c: any) => a + c.price * c.qty, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 10;
  const taxPrice = round2(0.2 * itemsPrice);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  const printTotalPrice = round2(
    itemsPrice + shippingPrice + taxPrice
  ).toLocaleString("en", options);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatchStore({ type: "CART_CLEAR_ITEMS" });
      Cookies.set("cart", JSON.stringify({ ...cart, cartItems: [] }));
      router.push(`/order/${data._id}`);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(getError(error));
    }
  };

  return (
    <Auth>
      <Layout title="Place Order">
        <CheckoutWizard activeStep={3} />

        {cartItems.length === 0 ? (
          // Empty Cart Component
          <EmptyCart />
        ) : (
          <div className="flex flex-col md:flex-row w-full justify-center align-middle text-black h-full">
            <div className="flex flex-col w-full md:w-2/6 h-full align-middle justify-center">
              {/* Address */}
              <div className="flex flex-col p-4 mb-4 md:mr-4 border-2 border-[var(--orange)] rounded-lg">
                <div className="flex flex-col p-2">
                  {shippingAddress.fullName} <br />
                  {shippingAddress.address}, <br />
                  {shippingAddress.city}, {shippingAddress.country}
                  <br />
                  {shippingAddress.postcode}
                </div>
                <div className="flex flex-col">
                  <Link className="pri-button-wide" href="/shipping">
                    Edit
                  </Link>
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex flex-col p-4 mb-4 md:mr-4 border-2 border-[var(--orange)] rounded-lg">
                <div className="flex flex-col mb-2 p-2">{paymentMethod}</div>
                <div className="flex flex-col">
                  <Link className="pri-button-wide" href="/payment">
                    Edit
                  </Link>
                </div>
              </div>

              {/* Order Items */}
              <div className="flex flex-col p-4 mb-4 md:mb-0 md:mr-4 border-2 border-[var(--orange)] rounded-lg">
                <div className="flex flex-col mb-2 p-2">
                  {cartItems.map((item: any) => (
                    <div key={item.slug}>
                      {item.name} ({item.qty}) £{item.price * item.qty}
                    </div>
                  ))}
                  <div className="font-semibold">Subtotal: £{itemsPrice}</div>
                </div>
                <div className="flex flex-col">
                  <Link className="pri-button" href="/cart">
                    Edit
                  </Link>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="flex flex-col py-4 bg-[var(--black)] p-4 rounded-xl md:w-2/6">
              <div className="flex flex-col mb-2">
                <div className="flex flex-row justify-between px-2 text-white">
                  <div>Items</div>
                  <div>£{itemsPrice}</div>
                </div>
                <div className="flex flex-row justify-between px-2 text-white">
                  <div>Tax</div>
                  <div>£{taxPrice}</div>
                </div>
                <div className="flex flex-row justify-between px-2 text-white">
                  <div>Shipping</div>
                  <div>
                    {shippingPrice === 0 ? "FREE" : "£" + shippingPrice}
                  </div>
                </div>
                <div className="flex flex-row justify-between px-2 text-white font-semibold">
                  <div>Total</div>
                  <div>£{printTotalPrice}</div>
                </div>
              </div>

              <div className="flex flex-col">
                <button
                  disabled={loading}
                  onClick={placeOrderHandler}
                  className="pri-button"
                >
                  {loading ? (
                    <svg
                      role="status"
                      className="inline mr-3 w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    ""
                  )}
                  {loading ? "Loading..." : "Place Order"}
                </button>
              </div>
            </div>
            <br />
          </div>
        )}
      </Layout>
    </Auth>
  );
}

const options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

function EmptyCart() {
  return (
    <>
      <div className="text-black flex flex-col gap-4">
        <div className="mb-4 mt-2 text-2xl text-center font-semibold md:w-2/6 md:mx-auto text-[var(--orange)]">
          Your cart is empty.
          <br />
          <Link href="/">
            <div className="text-black pri-button my-4">Continue Shopping</div>
          </Link>
        </div>

        <div className="text-black text-center">
          <div className="h-[1px] w-full bg-[#00000050]"></div>
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
            +44 123 456 7890
          </a>
          .
          <br />
          <br />
        </div>
      </div>
    </>
  );
}
