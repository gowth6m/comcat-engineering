import Order from "@/models/Order";
import db from "@/utils/db";
import { getSession } from "next-auth/react";


const handler = async (req: any, res: any) => {
    const session: any = await getSession({ req });
    if (!session || (session && !session.user.isAdmin)) {
        return res.status(401).send("Admin login required");
    }
    if (req.method === "GET") {
        await db.connect();
        var orders: any;

        if (req.query.delivered === 'false') {
            orders = await Order.find({
                isDelivered: false
            });
        } else {
            orders = await Order.find({}).populate("user", "name");
        }

        await db.disconnect();
        res.send(orders);
    } else {
        return res.status(400).send({ message: "Method not allowed" });
    }
};

export default handler;
