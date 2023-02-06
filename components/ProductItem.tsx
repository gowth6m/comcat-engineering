/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { IconAddCart, IconLoadingAnimation } from "./CustomIcons";
import Image from "next/image";

export type ProductItemProps = {
  product: any;
  addToCartHandler: (product: any) => void;
  currentAddingItem: string;
};

export default function ProductItem({
  product,
  addToCartHandler,
  currentAddingItem,
}: ProductItemProps) {
  return (
    <>
      {/* Mobile */}
      <div className="overflow-hidden rounded-lg md:hidden">
        <div className="flex flex-row align-middle m-2">
          <Link
            href={"/product/" + product.slug}
            className="w-2/6 h-[6rem] bg-[var(--lightgrey)] rounded-lg mr-2 object-cover overflow-hidden"
          >
            <Image
              className="w-full h-full object-cover"
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
            ></Image>
          </Link>

          <div className="flex flex-col w-full justify-between text-white">
            <Link
              className="bg-[var(--black)] w-full h-11 rounded-lg mx-auto pl-2 py-[8px] overflow-hidden"
              href={"/product/" + product.slug}
            >
              {product.name}
            </Link>
            <button
              className="flex flex-row align-middle rounded-lg justify-between w-full bg-[var(--orange)] h-11 hover:bg-[var(--black)]"
              type="button"
              onClick={() => {
                addToCartHandler(product);
              }}
            >
              <div className="flex flex-row w-full justify-center items-center h-full p-2">
                {currentAddingItem === product.slug ? (
                  <IconLoadingAnimation />
                ) : (
                  <div className="flex flex-row w-full justify-between items-center">
                    £{product.price.toFixed(2)}
                    <span>
                      <IconAddCart fill={"white"} className={"mx-auto"} />
                    </span>
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="overflow-hidden rounded-lg hidden md:flex h-58">
        <div className="flex flex-col w-full h-full m-2">
          <Link
            href={"/product/" + product.slug}
            className="w-full h-48 bg-[var(--lightgrey)] mb-2 rounded-lg object-cover overflow-hidden"
          >
            <Image
              className="w-full h-full object-cover"
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
            ></Image>
          </Link>

          <div className="flex flex-col items-center justify-center text-white rounded-lg overflow-hidden gap-2">
            <Link
              className="rounded-lg bg-[var(--black)] w-full pl-2 h-10 py-[7px] text-ellipsis overflow-hidden leading-7"
              href={"/product/" + product.slug}
            >
              {product.name.slice(0, 20) +
                (product.name.length > 20 ? "..." : "")}
            </Link>
            <button
              className="rounded-lg flex flex-row align-middle justify-between w-full bg-[var(--orange)] h-10 hover:bg-[var(--black)]"
              type="button"
              onClick={() => {
                addToCartHandler(product);
              }}
            >
              <div className="flex flex-row w-full justify-center items-center h-full p-2">
                {currentAddingItem === product.slug ? (
                  <IconLoadingAnimation />
                ) : (
                  <div className="flex flex-row w-full justify-between items-center">
                    £{product.price.toFixed(2)}
                    <span>
                      <IconAddCart fill={"white"} className={"mx-auto"} />
                    </span>
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// const itemVariants: Variants = {
//   offscreen: {
//     scale: 0,
//   },
//   onscreen: {
//     scale: 1,
//     transition: {
//       type: "spring",
//       bounce: 0.5,
//       duration: 1,
//     },
//   },
// };
