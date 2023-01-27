import { getSession } from "next-auth/react";
import Order from "../../../../../models/Order";
import db from "../../../../../utils/db";

var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};

const handler = async (req: any, res: any) => {
    const session: any = await getSession({ req });

    if (!session || (session && !session.user.isAdmin)) {
        return res.status(401).send({ message: "signin required" });
    }

    await db.connect();

    const order = await Order.findById(req.query.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const deliveredOrder = await order.save();
        await db.disconnect();
        res.send({ message: "Order Delivered", order: deliveredOrder });
    } else {
        await db.disconnect();
        res.status(404).send({ message: "Order Not Found" });
    }
};

export default handler;
