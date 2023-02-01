import Link from "next/link";
import React from "react";
import { IconPaypal } from "./CustomIcons";
import GCELogo from "./GCELogo";
import NocxaLogo from "./NocxaLogo";

export default function Footer() {
  return (
    <div className="container w-full grid grid-cols-1 gap-4 md:grid-cols-3 text-white mb-14 mt-8">
      {/* Logo & Copyright */}
      <div className="w-full h-auto flex flex-col items-center justify-center my-4">
        <div className="h-full my-[-10px] mt-[-25px]">
          <GCELogo className="w-[120px]" />
        </div>
        <div className="">
          {" "}
          2022 &#169;{" "}
          <span className="text-[var(--orange)]">
            Great Comcat Engineering LTD
          </span>
        </div>
      </div>

      {/* Middle Links */}
      <div className="w-full h-auto grid grid-cols-2 gap-4 md:grid-cols-3 my-4 text-center items-center">
        <Link href="/" className="hidden md:block hover:text-[var(--orange)]">
          Home
        </Link>
        <Link href="/about" className="hover:text-[var(--orange)]">
          About
        </Link>
        <Link href="/contact" className="hover:text-[var(--orange)]">
          Contact
        </Link>
        <Link href="/services" className="hover:text-[var(--orange)]">
          Services
        </Link>
        <Link href="/categories" className="hover:text-[var(--orange)]">
          Categories
        </Link>
        <Link href="/account" className="hover:text-[var(--orange)]">
          My Account
        </Link>
        <Link href="/order-history" className="hover:text-[var(--orange)]">
          My Orders
        </Link>
        <Link href="/cookies-policy" className="hover:text-[var(--orange)]">
          Cookies Policy
        </Link>
        <Link href="/privacy-policy" className="hover:text-[var(--orange)]">
          Privacy Policy
        </Link>
      </div>

      {/* Socials */}
      <div className="w-full h-auto flex flex-col my-4 text-center items-center justify-center gap-4">
        <div className="">
          Call us now on
          <Link href="/" className="text-[var(--orange)]">
            {" "}
            +44 123 456 789
          </Link>
        </div>

        <div>
          Website created by
          <Link
            href="https://nocxa.com"
            target="blank"
            className="text-[var(--orange)] my-[-10px] text-center"
          >
            <NocxaLogo
              className="w-[120px] my-[-5px] mx-auto"
              secondaryColor={"#FC814A"}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
