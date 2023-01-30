/* eslint-disable @next/next/no-img-element */
import useWindowDimensions from "@/utils/window";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import React from "react";

export default function IntroGallery() {
  const { width } = useWindowDimensions() ?? { width: 0 };

  return (
    <Splide
      aria-label="Intro Slider"
      className="w-[100vw] left-0 md:top-24 absolute z-0 m-0 p-0 top-12 bg-[var(--black)]"
      options={
        Number(width) > 768
          ? {
              rewind: true,
              gap: "10rem",
              height: "20rem",
              arrows: false,
              autoplay: true,
            }
          : {
              rewind: true,
              gap: "10rem",
              height: "10rem",
              arrows: false,
              autoplay: true,
            }
      }
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
      <SplideSlide className="object-cover w-full h-full">
        <img
          src={"/assets/galleryImg_2.svg"}
          alt="Image 2"
          className="object-cover w-full h-full scale-150 md:scale-100"
        />
      </SplideSlide>
    </Splide>
  );
}
