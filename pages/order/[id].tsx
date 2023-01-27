import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import { Auth } from "../../utils/Auth";
import { getError } from "../../utils/error";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };

    default:
      state;
  }
}

function OrderScreen() {
  // const { data: session }: any = useSession();
  // const { query } = useRouter();
  // const orderId = query.id;

  // const [{ loading, error, order }, dispatch] = useReducer(reducer, {
  //   loading: true,
  //   order: {},
  //   error: "",
  // });

  // useEffect(() => {
  //   const fetchOrder = async () => {
  //     try {
  //       dispatch({ type: "FETCH_REQUEST" });
  //       const { data } = await axios.get(`/api/orders/${orderId}`);
  //       dispatch({ type: "FETCH_SUCCESS", payload: data });
  //     } catch (error) {
  //       dispatch({ type: "FETCH_FAIL", payload: getError(error) });
  //     }
  //   };
  //   if (!order._id || (order._id && order._id !== orderId)) {
  //     fetchOrder();
  //   }
  // }, [order, orderId]);

  const { data: session }: any = useSession();
  const { query } = useRouter();
  const orderId = query.id;

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data }: any = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err: any) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (!order._id || successDeliver || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
      if (successDeliver) {
        dispatch({ type: "DELIVER_RESET" });
      }
    }
    // } else {
    //   const loadPaypalScript = async () => {
    //     const { data: clientId } = await axios.get("/api/keys/paypal");
    //     paypalDispatch({
    //       type: "resetOptions",
    //       value: {
    //         "client-id": clientId,
    //         currency: "USD",
    //       },
    //     });
    //     paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    //   };
    //   loadPaypalScript();
    // }
  }, [order, orderId, successDeliver, successPay]);

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  async function deliverOrderHandler() {
    try {
      dispatch({ type: "DELIVER_REQUEST" });
      const { data } = await axios.put(
        `/api/admin/orders/${order._id}/deliver`,
        {}
      );
      dispatch({ type: "DELIVER_SUCCESS", payload: data });
      toast.success("Order is delivered");
    } catch (err) {
      dispatch({ type: "DELIVER_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  }

  return (
    <Auth>
      <Layout title={"Order " + orderId}>
        <div className="text-lg font-semibold text-center mb-4 text-[var(--orange)] mt-4">
          {"Order " + orderId}
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div className="flex flex-col md:flex-row w-full justify-center align-top gap-4 text-black">
              <div className="flex flex-col w-full md:w-2/6">
                {/* Address */}
                <div className="flex flex-col p-4 mb-4 md:mr-4 border-2 border-[var(--orange)] rounded-lg">
                  <div className="flex flex-col p-2">
                    {shippingAddress.fullName} <br />
                    {shippingAddress.address}, <br />
                    {shippingAddress.city}, {shippingAddress.country}
                    <br />
                    {shippingAddress.postcode}
                  </div>
                  <div className="flex flex-col bg-[var(--orange)] p-2 rounded-xl text-white text-center mt-4">
                    {isDelivered ? (
                      <div>Delivered</div>
                    ) : (
                      <div>Not Delivered</div>
                    )}
                  </div>
                </div>
                <hr />

                {/* Payment Method */}
                <div className="flex flex-col p-4 mb-4 md:mr-4 border-2 border-[var(--orange)] rounded-lg">
                  <div className="flex flex-col m-1 p-2">{paymentMethod}</div>
                </div>
                <hr />

                {/* Order Items */}
                <div className="flex flex-col p-4 md:mr-4 border-2 border-[var(--orange)] rounded-lg">
                  <div className="flex flex-col m-1 p-2">
                    {orderItems.map((item: any, index: number) => (
                      <div key={index}>
                        {item.name} ({item.qty}): £{item.price * item.qty}
                      </div>
                    ))}
                    <div className="font-semibold">
                      Subtotal: £{itemsPrice.toLocaleString("en", options)}
                    </div>
                  </div>
                </div>
                <hr />
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
                    <div>£{totalPrice}</div>
                  </div>

                  {session.user.isAdmin && !order.isDelivered && (
                    <div>
                      {loadingDeliver && <div>Loading...</div>}
                      <button
                        className="pri-button w-full my-2"
                        onClick={deliverOrderHandler}
                      >
                        Deliver Order
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <br />
            </div>
          </div>
        )}
      </Layout>
    </Auth>
  );
}

export default OrderScreen;

const options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};
