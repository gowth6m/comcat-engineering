import router from "next/router";
import React from "react";

export default function CheckoutLayout({ activeStep = 0 }) {
  var steps = [
    "User Login",
    "Shipping Address",
    "Payment Method",
    "Place Order",
  ];

  var mobileSteps = ["Login", "Shipping", "Payment", "Order"];

  return (
    <div className="mb-5 flex flex-wrap mt-4">
      {(window.innerWidth < 768 ? (steps = mobileSteps) : (steps = steps)).map(
        (step, index) => (
          <div
            key={step}
            onClick={() => {
              if (index <= activeStep) {
                switch (index) {
                  case 0:
                    break;
                  case 1:
                    router.push("/shipping");
                    break;
                  case 2:
                    router.push("/payment");
                    break;
                  case 3:
                    router.push("/placeorder");
                    break;
                }
              }
            }}
            className={
              index <= activeStep && step === "Login"
                ? "flex-1 border-b-4 text-center border-[var(--black)] font-semibold text-[var(--black)] hover:font-bold"
                : index <= activeStep
                ? "flex-1 border-b-4 text-center border-[var(--black)] font-semibold text-[var(--black)] hover:font-bold cursor-pointer "
                : "flex-1 border-b-4 text-center border-gray-300 text-[var(--grey)]"
            }
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
