import Link from "next/link";
import React from "react";

type AdminDashNavType = {
  active: number;
};

export default function AdminDashNav({ active }: AdminDashNavType) {
  return (
    <div className="w-full max-w-[98vw] flex flex-row justify-center md:justify-start align-center md:flex-col text-white gap-2 md:flex-auto md:w-2/6 overflow-x-hidden">
      <Link
        className={active === 0 ? activeStepCss : StepCss}
        href="/admin/dashboard"
      >
        Dashboard
      </Link>
      <Link
        className={active === 1 ? activeStepCss : StepCss}
        href="/admin/orders"
      >
        Orders
      </Link>
      <Link
        className={active === 2 ? activeStepCss : StepCss}
        href="/admin/products"
      >
        Products
      </Link>
      <Link
        className={active === 3 ? activeStepCss : StepCss}
        href="/admin/users"
      >
        Users
      </Link>
    </div>
  );
}

const activeStepCss = "bg-[var(--black)] px-2 py-2 rounded-lg text-white";
const StepCss =
  "bg-[var(--orange)] hover:bg-[var(--black)] px-2 py-2 rounded-lg";
