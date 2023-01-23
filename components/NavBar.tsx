import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconCart, IconMenu, IconSearch, IconUser } from "./CustomIcons";
import { motion } from "framer-motion";

export default function NavBar() {
  const [menuOpened, setMenuOpened] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(1);

  const menuList = ["Home", "Categories", "My Account", "About", "Contact"];
  const currencyDropdown = ["GBP", "EUR", "USD", "CAD"];

  return (
    <>
      <div className="z-50 fixed flex flex-col top-0 w-full">
        <nav className="w-full flex h-14  mx-0 justify-between items-center bg-[var(--black)]">
          <div className="z-50 flex h-14  mx-auto justify-between items-center bg-[var(--black)] container">
            {/* TOGGLE NAV BUTTON */}
            <div className="flex flex-1 justify-start md:hidden">
              {menuOpened ? (
                <IconMenu
                  open={true}
                  height="24px"
                  fill="white"
                  className="ml-4"
                  onClick={() => setMenuOpened(!menuOpened)}
                />
              ) : (
                <IconMenu
                  open={false}
                  height="24px"
                  fill="white"
                  className="ml-4"
                  onClick={() => setMenuOpened(!menuOpened)}
                />
              )}
            </div>

            {/* MD:OPTIONS */}
            <div className="hidden flex-1 justify-start md:flex">
              {/* SELECT COUNTRY */}
              <select className="bg-[var(--black)] ml-2 text-[var(--orange)] cursor-pointer">
                {currencyDropdown.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </select>
              {/* CONTACT NO */}
              <div>
                <p className="text-white ml-2 hover:text-[var(--orange)] cursor-pointer">
                  +44 123 456 7890
                </p>
              </div>
            </div>

            {/* LOGO */}
            <Image
              src="/logo/logo_transparent.svg"
              alt="GCE Logo"
              className="cursor-pointer flex-1-1"
              width={80}
              height={80}
            />

            {/* SEARCH AND CART */}
            <div className="flex items-center flex-1 justify-end">
              {/* SEARCH ICON */}
              <IconSearch
                open={true}
                fill={"white"}
                className="cursor-pointer md:hidden"
              />

              {/* SEARCH BAR */}
              <div className="hidden md:flex">
                <form
                  //   onSubmit={searchSubmitHandler}
                  className="w-full text-white flex flex-row justify-center align-middle first-line:text-center"
                >
                  <input
                    type="search"
                    // onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products"
                    className="w-full rounded-lg text-white px-2 py-1 text-center mr-1"
                  />
                  <button type="submit" className="w-auto mx-2 cursor-pointer">
                    <IconSearch fill="white" />
                  </button>
                </form>
              </div>

              {/* PROFILE ICON */}
              <IconUser
                fill={"white"}
                className="hidden md:flex cursor-pointer"
              />

              {/* CART ICON AND CART COUNT */}
              <Link
                className="flex flex-row justify-center items-center mx-2 mr-6 relative"
                href="/cart"
              >
                {cartItemsCount > 0 && (
                  <span className="bg-[var(--orange)] rounded-full text-white text-xs z-10 absolute w-[22px] h-[22px] flex justify-center align-middle top-[-35%] right-[-60%]">
                    <div className="my-auto">{cartItemsCount}</div>
                  </span>
                )}
                <IconCart open={false} fill={"white"} />
              </Link>
            </div>
          </div>
        </nav>

        <div className="z-50 w-full h-14  mx-0 justify-center items-center bg-[var(--black)] md:flex hidden">
          <div className="container flex flex-row flex-wrap align-middle justify-center space-x-4">
            {menuList.map((item, index) => (
              <Link
                key={index}
                href={`/${item.toLowerCase()}`}
                className="p-2 hover:text-[var(--orange)]"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* MOBILE NAV */}
        {menuOpened && (
          <motion.div
            className="fixed top-12 w-[100vw] h-[100dvh] bg-[var(--black)] origin-top flex align-middle justify-middle flex-col"
            variants={variants}
            animate={menuOpened ? "transform" : "stop"}
          >
            <div className="flex align-middle justify-middle flex-col m-4">
              {menuList.map((item, index) => (
                <Link
                  key={index}
                  href={`/${item.toLowerCase()}`}
                  className="p-2 hover:text-[var(--orange)] text-white"
                >
                  {item}
                </Link>
              ))}
            </div>

            <div className="flex align-middle justify-middle flex-col m-4">
              <Link
                href={""}
                className="border-white border-solid border-2 p-2 flex flex-row justify-between"
              >
                <IconUser fill={"white"} />
                <div>Login</div>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}

const variants = {
  transform: {
    scaleY: [0, 1.2, 1],
    scaleX: [1, 1, 1],
    transition: { duration: 0.5 },
  },
};
