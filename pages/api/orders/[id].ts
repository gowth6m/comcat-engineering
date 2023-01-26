import { getSession } from "next-auth/react";
import Order from "../../../models/Order";
import db from "../../../utils/db";

const handler = async (req: any, res: any) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send({ message: "unauthorized" });
    }
    await db.connect();
    const orders = await Order.findById(req.query.id);
    await db.disconnect();
    res.send(orders);
};

export default handler;
