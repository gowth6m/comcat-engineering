import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { IconCart, IconMenu, IconSearch, IconUser } from "./CustomIcons";
import { motion } from "framer-motion";
import NavProfileMenu from "./NavProfileMenu";
import { Store } from "@/utils/Store";
import GCELogo from "./GCELogo";
import router from "next/router";
import useWindowDimensions from "@/utils/window";

export default function NavBar() {
  const { state, dispatchStore } = useContext(Store);
  const { width } = useWindowDimensions() ?? { width: 0 };
  const [menuOpened, setMenuOpened] = useState(false);
  const [searchOpened, setSearchOpened] = useState(false);
  const [profileMenuOpened, setProfileMenuOpened] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMinSearch, setSearchMinSearch] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const menuList = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "My Account", href: "/account" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];
  const currencyDropdown = ["GBP", "EUR", "USD", "CAD"];

  useEffect(() => {
    setCartItemsCount(
      state.cart.cartItems.reduce((a: any, c: any) => a + c.qty, 0)
    );
  }, [cartItemsCount, state.cart.cartItems]);

  const handleScroll = () => {
    if (window.scrollY > 56) {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > prevScrollPos && width! > 768) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const searchSubmitHandler = (e: any) => {
    e.preventDefault();
    router.push(`/search?query=${searchQuery}`);
  };

  return (
    <>
      {visible ? (
        <div className="z-50 fixed flex flex-col top-0 w-full text-white origin-top">
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
              <div className="flex-1-1 pointer-events-none">
                <GCELogo className="w-[80px] h-[80]" />
              </div>

              {/* SEARCH AND CART */}
              <div className="flex items-center flex-1 justify-end">
                {/* SEARCH ICON */}
                <IconSearch
                  open={true}
                  fill={"white"}
                  className="cursor-pointer md:hidden"
                  onClick={() => {
                    setSearchOpened(!searchOpened);
                  }}
                />

                {/* SEARCH BAR */}
                <div className="hidden md:flex">
                  <form
                    onSubmit={searchSubmitHandler}
                    className="w-full text-white flex flex-row justify-center align-middle first-line:text-center"
                  >
                    <input
                      type="search"
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for products"
                      className="w-full rounded-lg text-white px-2 py-2 text-center mr-1 orange-border"
                    />
                    <button
                      type="submit"
                      className="w-auto mx-2 cursor-pointer"
                    >
                      <IconSearch fill="white" />
                    </button>
                  </form>
                </div>

                {/* PROFILE ICON */}
                <div className="md:flex hidden">
                  {/* DESKTOP: PROFILE MENU */}
                  {profileMenuOpened && (
                    <motion.div
                      className="w-[16rem] h-auto bg-[var(--orange)] z-50 absolute ml-[-12rem] mt-10 rounded-lg origin-top"
                      variants={variants_0}
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
              {menuList.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="p-2 hover:text-[var(--orange)] text-white"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* SEARCH BAR MOBILE */}
          {searchOpened && (
            <motion.div
              className="w-full h-36 bg-[var(--black)] flex justify-center align-middle origin-top"
              variants={variants_0}
              animate={searchOpened ? "transform" : "stop"}
            >
              <form
                onSubmit={searchSubmitHandler}
                className="w-full text-white flex flex-col justify-center align-middle first-line:text-center"
              >
                <input
                  type="search"
                  onChange={(e) => setSearchQuery(e.target.value)}
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
              variants={variants_0}
              animate={menuOpened ? "transform" : "stop"}
            >
              <div className="flex align-middle justify-middle flex-col mx-4 mt-2">
                {menuList.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="p-3 hover:text-[var(--orange)] text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* NAV PROFILE MENU */}
              <NavProfileMenu />
            </motion.div>
          )}
        </div>
      ) : (
        <div className="z-50 fixed md:flex flex-col top-0 w-full text-white origin-top hidden">
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

              {/* LOGO */}
              <div className="flex-1-1 pointer-events-none">
                <GCELogo className="w-[80px] h-[80]" />
              </div>

              {!searchMinSearch && (
                <div className="container flex flex-row flex-wrap align-middle justify-center space-x-4">
                  {menuList.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="p-2 hover:text-[var(--orange)] text-white"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* SEARCH AND CART */}
              <div className="flex items-center flex-1 justify-end">
                {/* SEARCH ICON */}
                <IconSearch
                  open={true}
                  fill={"white"}
                  className="cursor-pointer md:hidden"
                  onClick={() => {
                    setSearchOpened(!searchOpened);
                  }}
                />

                {/* SEARCH BAR */}
                {searchMinSearch && (
                  <div className="hidden md:flex">
                    <div
                      className="h-ful flex items-center mx-2 cursor-pointer"
                      onClick={() => setSearchMinSearch(!searchMinSearch)}
                    >
                      <IconMenu open={true} fill="white" />
                    </div>
                    <form
                      onSubmit={searchSubmitHandler}
                      className="w-full text-white flex flex-row justify-center align-middle first-line:text-center"
                    >
                      <input
                        type="search"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for products"
                        className="w-full rounded-lg text-white px-2 py-2 text-center mr-1 orange-border"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="w-auto mx-2 cursor-pointer"
                      >
                        <IconSearch fill="white" />
                      </button>
                    </form>
                  </div>
                )}

                {!searchMinSearch && (
                  <div
                    className="mx-2 cursor-pointer"
                    onClick={() => setSearchMinSearch(!searchMinSearch)}
                  >
                    <IconSearch fill="white" />
                  </div>
                )}

                {/* PROFILE ICON */}
                <div className="md:flex hidden">
                  {/* DESKTOP: PROFILE MENU */}
                  {profileMenuOpened && (
                    <motion.div
                      className="w-[16rem] h-auto bg-[var(--orange)] z-50 absolute ml-[-12rem] mt-10 rounded-lg origin-top"
                      variants={variants_0}
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

          {/* SEARCH BAR MOBILE */}
          {searchOpened && (
            <motion.div
              className="w-full h-36 bg-[var(--black)] flex justify-center align-middle origin-top"
              variants={variants_0}
              animate={searchOpened ? "transform" : "stop"}
            >
              <form
                onSubmit={searchSubmitHandler}
                className="w-full text-white flex flex-col justify-center align-middle first-line:text-center"
              >
                <input
                  type="search"
                  onChange={(e) => setSearchQuery(e.target.value)}
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
              variants={variants_0}
              animate={menuOpened ? "transform" : "stop"}
            >
              <div className="flex align-middle justify-middle flex-col mx-4 mt-2">
                {menuList.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="p-3 hover:text-[var(--orange)] text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* NAV PROFILE MENU */}
              <NavProfileMenu />
            </motion.div>
          )}
        </div>
      )}
    </>
  );
}

const variants_0 = {
  transform: {
    scaleY: [0, 1.1, 1],
    scaleX: [1, 1, 1],
    transition: { duration: 0.5 },
  },
};
