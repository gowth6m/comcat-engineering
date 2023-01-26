import mongoose from "mongoose";
import { getSession } from "next-auth/react";
import Order from "../../../models/Order";
import db from "../../../utils/db";

const handler = async (req: any, res: any) => {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).send({ message: "unauthorized" });
    }

    const { user }: any = session;
    await db.connect();
    const newOrder = new Order({
        ...req.body,
        user: user._id,
    });

    const order = await newOrder.save();
    res.status(201).send(order);
};

export default handler;
