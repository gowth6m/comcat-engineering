import Layout from "@/components/Layout";
import { Auth } from "@/utils/Auth";
import { useSession } from "next-auth/react";
import router from "next/router";
import Router from "next/router";
import React from "react";

export default function AccountScreen() {
  const { data: session }: any = useSession();

  if (!session?.user) {
    router.push("/login");
  }

  return (
    <Auth>
      <Layout title="My Account">
        <div className="md:mt-4 mt-2">
          <div className="text-2xl text-black">
            Welcome back
            <span className="text-[var(--orange)]"> {session?.user.name}</span>
          </div>
        </div>
      </Layout>
      ;
    </Auth>
  );
}
