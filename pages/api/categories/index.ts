import Product from "@/models/Product";
import db from "@/utils/db";

const handler = async (req: any, res: any) => {
    await db.connect();
    const products = await Product.find().lean();
    const categories = products.map((product: any) => product.category);

    // Return only unique categories
    const flatCategories = categories.flat();
    const uniqueCategories = Array.from(new Set(flatCategories));

    await db.disconnect();
    res.send(uniqueCategories);
}

export default handler;