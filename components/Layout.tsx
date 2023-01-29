import Head from "next/head";
import React from "react";
import { Toaster } from "react-hot-toast";
import NavBar from "./NavBar";

type LayoutProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Layout({ title, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title ? title + " - GCE" : "Great Comcat Engineering"}</title>
        <meta name="description" content="Great Comcat Engineering LTD - GCE" />
        <meta
          name="keywords"
          content="GCE, Great Comcat Engineering, Nocxa, Machine"
        ></meta>
        <meta
          property="og:title"
          content="Great Comcat Engineering LTD - GCE"
        ></meta>
        <meta name="author" content="Nocxa LTD - https://nocxa.com"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta
          name="apple-mobile-web-app-title"
          content="Great Comcat Engineering"
        ></meta>
        <link rel="apple-touch-icon" href="/logo/logo.svg"></link>
        <link rel="icon" href="/logo/logo_circle.svg" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between bg-[var(--white)]">
        {/* NAV BAR */}
        <header className="w-full">
          <NavBar />
        </header>

        {/* BODY */}
        <main className="container m-auto mt-4 px-4">
          <div>
            <Toaster />
          </div>
          <div className="h-12 md:h-24"></div>
          {children}
        </main>

        {/* FOOTER */}
        <footer className="flex h-20 justify-center items-center bg-[var(--orange)] text-white">
          <p>Copyright &#169; 2022 Great Comcat Engineering</p>
        </footer>
      </div>
    </>
  );
}
