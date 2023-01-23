import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect } from "react";
import { getProducts, getUsers } from "@/utils/users";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    // getUsers();
    // getProducts();
  }, []);

  return <Layout title="GCE: Home"></Layout>;
}
