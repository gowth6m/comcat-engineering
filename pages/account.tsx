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
            <Link href="/order-history" className={cssLink}>
              <IconCart />
              <div className={cssLinkInner}>Your Orders</div>
            </Link>
            <Link href="/profile" className={cssLink}>
              <IconUser />
              <div className={cssLinkInner}>Edit Profile</div>
            </Link>
            <Link href="/" className={cssLink}>
              <IconMoney />
              <div className={cssLinkInner}>Your Payment</div>
            </Link>
            <Link href="/" className={cssLink}>
              <IconLocation />
              <div className={cssLinkInner}>Your Addresses</div>
            </Link>
            <Link href="/about" className={cssLink}>
              <IconAbout />
              <div className={cssLinkInner}>About Us</div>
            </Link>
            <Link href="/contact" className={cssLink}>
              <IconEmail />
              <div className={cssLinkInner}>Contact Us</div>
            </Link>
          </div>
        </div>
      </Layout>
    </Auth>
  );
}

const cssLink =
  "hover:bg-[var(--orange)] border-2 border-[var(--orange)] rounded-lg w-full flex items-center justify-center gap-4";
const cssLinkInner = "text-lg text-black py-4 md:py-12";
