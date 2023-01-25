import Product from "@/models/Product";
import db from "@/utils/db";

const handler = async (req: any, res: any) => {
    await db.connect();
    const products = await Product.find().lean();
    await db.disconnect();
    res.send(products);
};

export default handler;
