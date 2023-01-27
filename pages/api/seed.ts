import Product from "@/models/Product";
import User from "@/models/User";
import data from "@/utils/data";
import db from "@/utils/db";


const handler = async (req: any, res: any) => {
    try {
        await db.connect();

        // inserting users
        // await User.deleteMany();
        // await User.insertMany(data.users);

        // inserting products
        await Product.deleteMany();
        await Product.insertMany(data.products);

        // disconnecting
        await db.disconnect();
        res.status(200).json({ message: "ok. seeded" });
    } catch (error) {
        res.status(500).json({ message: "error" });
    }
};

export default handler;