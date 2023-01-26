import React, { useContext } from "react";
import router from "next/router";
import Layout from "../../components/Layout";
import Link from "next/link";
import Image from "next/image";
import { CartProductDataType, Store } from "../../utils/Store";
import db from "../../utils/db";
import Product from "../../models/Product";
import axios from "axios";
import { customToast } from "../../utils/customToast";
import RatingDisplay from "@/components/RatingDisplay";

export default function ProductScreen(props: any) {
  const { product } = props;
  const { state, dispatchStore } = useContext(Store);

  if (!product) {
    return <Layout title="Product not found">Product not found</Layout>;
  }

  // adding items to cart
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find(
      (x: CartProductDataType) => x.slug === product.slug
    );
    const qty = existItem ? existItem.qty + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (qty > data.countInStock) {
      customToast("Sorry. Product is out of stock");
      return;
    }

    dispatchStore({ type: "CART_ADD_ITEM", payload: { ...product, qty } });
    router.push("/cart");
  };

  return (
    <Layout title={product.name}>
      <div className="py-4 md:py-8 mb-4">
        <Link
          href="/"
          className="bg-[var(--orange)] text-white font-bold py-3 px-8 rounded-lg hover:bg-[var(--black)] hover:text-[var(--orange)]"
        >
          Back to products
        </Link>
      </div>
      <div className="grid md:grid-cols-3 md:gap-3 mb-8">
        {/* Image */}
        <div className="md:col-span-1 rounded-lg">
          <Image
            className="rounded-lg black-border"
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        {/* List on the right of image */}
        <div className="text-black flex flex-col my-4 md:my-0 space-y-2 md:mx-4 mx-2">
          <div className="text-xl font-semibold">{product.name}</div>
          <div className="text-lg">
            <RatingDisplay rating={product.rating} />
          </div>
          <div className="text-lg">{product.description}</div>
          <div className="flex flex-row space-x-2">
            {product.category.map((x: any) => (
              <span
                key={x}
                className="bg-[var(--orange)] text-white rounded-lg px-2 py-1"
              >
                {x}
              </span>
            ))}
          </div>
        </div>
        {/* Below the right text */}
        <div className="text-white">
          <div className="card p-5 bg-[var(--black)] rounded-lg">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>£{product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In stock" : "Unavailable"}</div>
            </div>
            <button className="pri-button  w-full" onClick={addToCartHandler}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// to fetch from database
export async function getServerSideProps(context: any) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
