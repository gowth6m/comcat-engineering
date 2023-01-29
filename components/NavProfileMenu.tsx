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
  IconBarChart,
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

  const currentUser = session?.user ? session?.user.name : "Guest";
  const currentUserInitials = currentUser.split(" ").map((n: any) => n[0]);

  return (
    <div className="flex align-middle justify-middle flex-col m-4">
      {!session?.user ? (
        <>
          <Link href={"/login"} className="navProfileMenuButtons mb-4">
            <IconLogin fill={"white"} />
            <div className="ml-6 mr-[4rem]">Login</div>
          </Link>
          <Link href={"/register"} className="navProfileMenuButtons">
            <IconAddUser fill={"white"} />
            <div className="ml-6">Register</div>
          </Link>
        </>
      ) : (
        <>
          <Link href={"/profile"} className="navProfileMenuButtons mb-4">
            <IconUser fill={"white"} />
            {session?.user ? (
              <div className="ml-6">Profile &#x2022; {currentUserInitials}</div>
            ) : (
              <div className="ml-6">Profile</div>
            )}
          </Link>

          <Link
            href={"/order-history"}
            onClick={() => {}}
            className="navProfileMenuButtons mb-4"
          >
            <IconCart fill={"white"} />
            <div className="ml-6">Order History</div>
          </Link>

          {session?.user.isAdmin && (
            <Link
              href={"/admin/dashboard"}
              onClick={() => {}}
              className="navProfileMenuButtons mb-4"
            >
              <IconBarChart fill={"white"} />
              <div className="ml-6">Admin Dashboard</div>
            </Link>
          )}

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
