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
        <meta
          name="description"
          content="Website of Great Comcat Engineering LTD"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
          <div className="h-12"></div>
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
