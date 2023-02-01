import {
  IconAbout,
  IconCart,
  IconEmail,
  IconLocation,
  IconMoney,
  IconUser,
} from "@/components/CustomIcons";
import Layout from "@/components/Layout";
import { Auth } from "@/utils/Auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
// import router from "next/router";
import React from "react";

export default function AccountScreen() {
  const { data: session }: any = useSession();

  return (
    <Auth>
      <Layout title="My Account">
        <div className="md:mt-4 mt-2 md:w-5/6 mx-auto mb-4">
          <div className="text-2xl text-white rounded-lg p-2 text-center bg-[var(--black)]">
            <span className=""> {session?.user.name}</span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 mt-4">
            <Link
              href="/order-history"
              className="hover:bg-[var(--orange)] border-2 border-[var(--orange)] rounded-lg w-full flex items-center justify-center gap-4"
            >
              <IconCart />
              <div className="text-lg text-black hover:text-white py-10">Your Orders</div>
            </Link>
            <Link
              href="/profile"
              className="hover:bg-[var(--orange)] border-2 border-[var(--orange)] rounded-lg w-full flex items-center justify-center gap-4"
            >
              <IconUser />
              <div className="text-lg text-black py-10">Edit Profile</div>
            </Link>
            <Link
              href="/"
              className="hover:bg-[var(--orange)] border-2 border-[var(--orange)] rounded-lg w-full flex items-center justify-center gap-4"
            >
              <IconMoney />
              <div className="text-lg text-black py-10">Your Payment</div>
            </Link>
            <Link
              href="/"
              className="hover:bg-[var(--orange)] border-2 border-[var(--orange)] rounded-lg w-full flex items-center justify-center gap-4"
            >
              <IconLocation />
              <div className="text-lg text-black py-10">Your Addresses</div>
            </Link>
            <Link
              href="/about"
              className="hover:bg-[var(--orange)] border-2 border-[var(--orange)] rounded-lg w-full flex items-center justify-center gap-4"
            >
              <IconAbout />
              <div className="text-lg text-black py-10">About Us</div>
            </Link>
            <Link
              href="/contact"
              className="hover:bg-[var(--orange)] border-2 border-[var(--orange)] rounded-lg w-full flex items-center justify-center gap-4"
            >
              <IconEmail />
              <div className="text-lg text-black py-10">Contact Us</div>
            </Link>
          </div>
        </div>
      </Layout>
    </Auth>
  );
}
