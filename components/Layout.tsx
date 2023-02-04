import Head from "next/head";
import React from "react";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import NavBar from "./NavBar";

type LayoutProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Layout({ title, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title ? title + " - Great Comcat Engineering" : "Great Comcat Engineering"}</title>
        <meta
          name="description"
          content="Great Comcat Engineering is a premier machinery supplier and repair service based in London, UK, offering top-notch services and the best quality machinery through certified engineers. Our goal is to meet and exceed client expectations with a commitment to quality and excellence in service."
        />
        <meta
          name="keywords"
          content="GCE, Great Comcat Engineering, Nocxa, Machine, Commercial machinery, London, United Kingdom"
        ></meta>
        <meta
          property="og:title"
          content="Great Comcat Engineering LTD - GCE"
        ></meta>
        <meta
          property="og:description"
          content="Great Comcat Engineering is a premier machinery supplier and repair service based in London, UK, offering top-notch services and the best quality machinery through certified engineers. Our goal is to meet and exceed client expectations with a commitment to quality and excellence in service."
        ></meta>
        <meta
          property="og:url"
          content="https://greatcomcatengineering.com/"
        ></meta>
        <meta property="og:site_name" content="Great Comcat Engineering"></meta>
        <meta name="author" content="Nocxa LTD - https://nocxa.com"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta name="robots" content="index, follow"></meta>
        <meta
          name="apple-mobile-web-app-title"
          content="Great Comcat Engineering"
        ></meta>
        <link rel="apple-touch-icon" href="/logo/logo.png"></link>
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
        <footer className="flex h-auto justify-center items-center bg-[var(--black)] text-white">
          <Footer />
        </footer>
      </div>
    </>
  );
}
