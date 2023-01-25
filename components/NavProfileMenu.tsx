import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import {
  IconLogin,
  IconAddUser,
  IconUser,
  IconCart,
  IconLogout,
} from "./CustomIcons";

export default function NavProfileMenu() {
  const { data: session }: any = useSession();

  const logoutHandler = async () => {
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
          <div onClick={() => {}} className="navProfileMenuButtons mb-4">
            <IconUser fill={"white"} />
            <div className="ml-6">Profile</div>
          </div>
          <div onClick={() => {}} className="navProfileMenuButtons mb-4">
            <IconCart fill={"white"} />
            <div className="ml-6">Order History</div>
          </div>
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