import { getSession } from "next-auth/react";
import Product from "../../../../models/Product";
import db from "../../../../utils/db";

const handler = async (req: any, res: any) => {
    const session: any = await getSession({ req });
    if (!session || !session.user.isAdmin) {
        return res.status(401).send("admin login required");
    }
    if (req.method === "GET") {
        return getHandler(req, res);
    } else if (req.method === "POST") {
        return postHandler(req, res);
    } else {
        return res.status(400).send({ message: "Method not allowed" });
    }
};

const postHandler = async (req: any, res: any) => {
    await db.connect();
    const newProduct = new Product({
        name: "sample name",
        slug: "sample-name-" + Math.random(),
        image: "/images/sample.jpg",
        price: 0,
        category: [],
        brand: "sample brand",
        countInStock: 0,
        description: "sample description",
        rating: 0,
        numReviews: 0,
    });

    const product = await newProduct.save();
    await db.disconnect();
    res.send({ message: "Product created successfully", product });
};

const getHandler = async (req: any, res: any) => {
    await db.connect();
    var products: any;

    if (req.query.search) {
        products = await Product.find({
            name: {
                $regex: req.query.search,
                $options: 'i',
            }
        });
    } else {
        products = await Product.find({});
    }

    await db.disconnect();
    res.send(products);
};
export default handler;
