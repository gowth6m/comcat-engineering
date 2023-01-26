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
            className={
              index <= activeStep
                ? "flex-1 border-b-4 text-center border-[var(--black)] font-semibold text-[var(--black)]"
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
