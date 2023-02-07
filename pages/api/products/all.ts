import Product from "@/models/Product";
import db from "@/utils/db";

const handler = async (req: any, res: any) => {
    await db.connect();
    const products = await Product.find().lean();

    const bestSellers = await Product.find({ brand: "Best Sellers" }).lean();
    const clearance = await Product.find({ brand: "Clearance" }).lean();
    const newArrivals = await Product.find({ brand: "New Arrivals" }).lean();

    await db.disconnect();
    res.send({ products, bestSellers, newArrivals, clearance });
};

export default handler;
