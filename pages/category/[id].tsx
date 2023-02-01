import Layout from "@/components/Layout";
import React from "react";

export default function CategoryScreen(props: any) {
  const { category } = props;

  if (!category) {
    return (
      <Layout title="Product not found">
        <div className="flex items-center justify-center">
          <div className="text-4xl text-[var(--orange)]">
            Category not found
          </div>
        </div>
      </Layout>
    );
  }

  return <Layout title={category}>[id]</Layout>;
}
