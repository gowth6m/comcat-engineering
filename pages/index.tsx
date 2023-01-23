/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect } from "react";
import { getProducts, getUsers } from "@/utils/users";
import Layout from "@/components/Layout";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    // getUsers();
    // getProducts();
  }, []);

  return (
    <>
      {/* Image Gallery Showcase */}
      <Splide
        aria-label="Intro Slider"
        className="w-[100vw] left-0 md:top-24 absolute z-0 m-0 p-0 top-12 bg-[var(--black)]"
        options={{
          rewind: true,
          gap: "10rem",
          height: "20rem",
          arrows: false,
          autoplay: true,
        }}
      >
        <SplideSlide className="object-cover w-full h-full">
          <img
            src={"/assets/galleryImg_0.svg"}
            alt="Image 1"
            className="object-cover w-full h-full scale-125 md:scale-100"
          />
        </SplideSlide>
        <SplideSlide className="object-cover w-full h-full">
          <img
            src={"/assets/galleryImg_1.svg"}
            alt="Image 2"
            className="object-cover w-full h-full scale-150 md:scale-100"
          />
        </SplideSlide>
      </Splide>
      <Layout title="GCE: Home"></Layout>
    </>
  );
}
