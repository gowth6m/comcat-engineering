import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconCart, IconMenu, IconSearch, IconUser } from "./CustomIcons";
import { motion } from "framer-motion";
import NavProfileMenu from "./NavProfileMenu";
import { Store } from "@/utils/Store";

export default function NavBar() {
  const [menuOpened, setMenuOpened] = useState(false);
  const [searchOpended, setSearchOpened] = useState(false);
  const [profileMenuOpened, setProfileMenuOpened] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const menuList = ["Home", "Categories", "My Account", "About", "Contact"];
  const currencyDropdown = ["GBP", "EUR", "USD", "CAD"];
  const { state, dispatchStore } = useContext(Store);

  useEffect(() => {
    setCartItemsCount(
      state.cart.cartItems.reduce((a: any, c: any) => a + c.qty, 0)
    );
  }, [cartItemsCount, state.cart.cartItems]);

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
                  className="ml-4 cursor-pointer"
                  onClick={() => setMenuOpened(!menuOpened)}
                />
              ) : (
                <IconMenu
                  open={false}
                  height="24px"
                  fill="white"
                  className="ml-4 cursor-pointer"
                  onClick={() => setMenuOpened(!menuOpened)}
                />
              )}
            </div>

            {/* MD:OPTIONS */}
            <div className="hidden flex-1 justify-start md:flex align-middle">
              {/* SELECT COUNTRY */}
              <select className="bg-[var(--black)] ml-2 text-[var(--orange)] cursor-pointer border-[var(--orange)] py-1 px-4 currency-dropdown">
                {currencyDropdown.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </select>
              {/* CONTACT NO */}
              <div className="align-middle flex h-full">
                <div className="text-white ml-2 hover:text-[var(--orange)] cursor-pointer h-full flex justify-center align-middle py-2">
                  +44 123 456 7890
                </div>
              </div>
            </div>

            {/* LOGO */}
            <Image
              src="/logo/logo_transparent.svg"
              alt="GCE Logo"
              className="flex-1-1 cursor-pointer"
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
                onClick={() => {
                  setSearchOpened(!searchOpended);
                }}
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
                    className="w-full rounded-lg text-white px-2 py-2 text-center mr-1 orange-border"
                  />
                  <button type="submit" className="w-auto mx-2 cursor-pointer">
                    <IconSearch fill="white" />
                  </button>
                </form>
              </div>

              {/* PROFILE ICON */}
              <div className="md:flex hidden">
                {/* DESKTOP: PROFILE MENU */}
                {profileMenuOpened && (
                  <motion.div
                    className="w-60 h-auto bg-[var(--orange)] z-50 absolute ml-[-11rem] mt-9 rounded-lg origin-top"
                    variants={variants}
                    animate={profileMenuOpened ? "transform" : "stop"}
                  >
                    <NavProfileMenu />
                  </motion.div>
                )}
                <IconUser
                  fill={"white"}
                  className="hidden md:flex cursor-pointer"
                  onClick={() => setProfileMenuOpened(!profileMenuOpened)}
                />
              </div>

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

        <div className="w-full h-14 mx-0 justify-center items-center bg-[var(--black)] md:flex hidden z-20">
          <div className="container flex flex-row flex-wrap align-middle justify-center space-x-4">
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
        </div>

        {/* SEARCH BAR MOBILE */}
        {searchOpended && (
          <motion.div
            className="w-full h-36 bg-[var(--black)] flex justify-center align-middle origin-top"
            variants={variants}
            animate={searchOpended ? "transform" : "stop"}
          >
            <form
              // onSubmit={searchSubmitHandler}
              className="w-full text-white flex flex-col justify-center align-middle first-line:text-center"
            >
              <input
                type="search"
                // onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products"
                className="mx-auto rounded-lg text-center orange-border w-5/6"
                autoFocus
              />
              <button
                type="submit"
                className="cursor-pointer h-12 pri-button mx-auto mt-2 w-5/6"
              >
                Search
              </button>
            </form>
          </motion.div>
        )}

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
                  className="p-4 hover:text-[var(--orange)] text-white"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* NAV PROFILE MENU */}
            <NavProfileMenu />
          </motion.div>
        )}
      </div>
    </>
  );
}

const variants = {
  transform: {
    scaleY: [0, 1.1, 1],
    scaleX: [1, 1, 1],
    transition: { duration: 0.5 },
  },
};
