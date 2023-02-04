import Product from "@/models/Product";
import db from "@/utils/db";

const handler = async (req: any, res: any) => {
    await db.connect();
    const product = await Product.findOne(req.query.prod).lean();
    await db.disconnect();
    res.send(product);
}

export default handler;