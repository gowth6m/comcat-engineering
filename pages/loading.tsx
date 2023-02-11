import Layout from "@/components/Layout";
import MiniLoading from "@/components/MiniLoading";
import React from "react";

export default function loading() {
  return (
    <Layout title="Loading">
      <div className="flex flex-col items-center justify-center h-screen">
        <MiniLoading />
      </div>
    </Layout>
  );
}
