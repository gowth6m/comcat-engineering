import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext } from "react";
import {
  IconLogin,
  IconAddUser,
  IconUser,
  IconCart,
  IconLogout,
} from "./CustomIcons";

export default function NavProfileMenu() {
  const { data: session }: any = useSession();
  const { state, dispatchStore } = useContext(Store);

  const logoutHandler = async () => {
    Cookies.remove("cart");
    dispatchStore({ type: "CART_RESET" });
    signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <div className="flex align-middle justify-middle flex-col m-4">
      {!session?.user ? (
        <>
          <Link href={"/login"} className="navProfileMenuButtons mb-4">
            <IconLogin fill={"white"} />
            <div className="ml-6">Login</div>
          </Link>
          <Link href={"/register"} className="navProfileMenuButtons mb-4">
            <IconAddUser fill={"white"} />
            <div className="ml-6">Register</div>
          </Link>
        </>
      ) : (
        <>
          <Link href={"/profile"} className="navProfileMenuButtons mb-4">
            <IconUser fill={"white"} />
            <div className="ml-6">Profile</div>
          </Link>
          <Link href={"/order-history"} onClick={() => {}} className="navProfileMenuButtons mb-4">
            <IconCart fill={"white"} />
            <div className="ml-6">Order History</div>
          </Link>
          <div
            onClick={() => {
              logoutHandler();
            }}
            className="navProfileMenuButtons"
          >
            <IconLogout fill={"white"} />
            <div className="ml-6">Logout</div>
          </div>
        </>
      )}
    </div>
  );
}
