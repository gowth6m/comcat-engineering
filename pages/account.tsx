import Layout from "@/components/Layout";
import { Auth } from "@/utils/Auth";
import React from "react";

export default function AccountScreen() {
  return (
    <Auth>
      <Layout title="My Account">
        <div className="heading1">My Account</div>
      </Layout>
      ;
    </Auth>
  );
}
