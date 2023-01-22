import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect } from "react";
import { getUsers } from "@/utils/users";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Head>
        <title>Great Comcat Engineering</title>
        <meta
          name="description"
          content="Website for Great Comcat Engineering"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/logo.svg" />
      </Head>
      <main className={styles.main}>
        <h1 className="text-3xl text-red-300">HELLO WORLD</h1>
      </main>
    </>
  );
}
