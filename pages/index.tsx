/* eslint-disable @next/next/no-img-element */
import { Inter } from "@next/font/google";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import "@splidejs/react-splide/css";
import IntroGallery from "@/components/IntroGallery";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [introShowcaseCurrent, setIntroShowcaseCurrent] =
    React.useState("Best Sellers");

  const introShowcaseCategory = ["Best Sellers", "New Arrivals", "Clearance"];

  return (
    <>
      {/* Image Gallery Showcase */}
      <IntroGallery />
      <Layout title="GCE: Home">
        <div className="mt-[0rem] md:mt-[3rem] w-full">
          {/* Intro Products Showcase */}
          <div className="bg-[var(--white)] w-full flex flex-row gap-1 justify-center align-middle rounded-lg overflow-hidden">
            {introShowcaseCategory.map((category: any) => {
              return (
                <div
                  key={category}
                  className={
                    category === introShowcaseCurrent
                      ? "bg-[var(--orange)] p-2 flex-1 text-center cursor-pointer text-[var(--white)] font-semibold"
                      : "bg-[var(--black)] p-2 flex-1 text-center cursor-pointer text-[var(--white)]"
                  }
                  onClick={() => {
                    setIntroShowcaseCurrent(category);
                  }}
                >
                  {category}
                </div>
              );
            })}
          </div>

          {/* Intro Products Showcase */}
          <div className="w-full h-[40vh] bg-[var(--black)] mt-4 rounded-lg"></div>
        </div>
      </Layout>
    </>
  );
}
