/* eslint-disable @next/next/no-img-element */
import useWindowDimensions from "@/utils/window";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import React from "react";

export default function IntroSlidingAnimation() {
  const { width } = useWindowDimensions() ?? { width: 0 };

  return (
    <Splide
      options={{
        height: Number(width) > 768 ? "10rem" : "8rem",
        type: "loop",
        gap: "2px",
        drag: "free",
        arrows: false,
        pagination: false,
        perPage: Number(width) > 768 ? 5 : 3,
        autoScroll: {
          pauseOnHover: false,
          pauseOnFocus: false,
          rewind: false,
          speed: 0.5,
        },
      }}
      extensions={{ AutoScroll }}
    >
      <SplideSlide className="object-cover w-full h-full">
        <img
          src={"/assets/dallas_chicken.png"}
          alt="Image 2"
          className="object-fit w-auto h-full mx-auto grayscale"
        />
      </SplideSlide>

      <SplideSlide className="object-cover w-full h-full items-center align-middle">
        <img
          src={"/assets/kfc.png"}
          alt="Image 4"
          className="object-fit w-auto h-full mx-auto scale-75 grayscale"
        />
      </SplideSlide>
      <SplideSlide className="object-cover w-full h-full">
        <img
          src={"/assets/favorite_chicken.png"}
          alt="Image 1"
          className="object-fit w-auto h-full mx-auto scale-75 grayscale"
        />
      </SplideSlide>
      <SplideSlide className="object-cover w-full h-full items-center align-middle">
        <img
          src={"/assets/pizza_hut.png"}
          alt="Image 5"
          className="object-fit w-auto h-full mx-auto scale-75 grayscale"
        />
      </SplideSlide>

      <SplideSlide className="object-cover w-full h-full items-center align-middle">
        <img
          src={"/assets/papa_johns.png"}
          alt="Image 3"
          className="object-fit w-auto h-full mx-auto scale-y-50 md:scale-x-75 grayscale"
        />
      </SplideSlide>
      <SplideSlide className="object-cover w-full h-full items-center align-middle">
        <img
          src={"/assets/burger_king.png"}
          alt="Image 6"
          className="object-fit w-auto h-full mx-auto scale-75 grayscale"
        />
      </SplideSlide>
    </Splide>
  );
}
