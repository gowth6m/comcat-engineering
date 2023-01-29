import { getSession } from 'next-auth/react';
import User from '../../../../models/User';
import db from '../../../../utils/db';

const handler = async (req: any, res: any) => {
    const session: any = await getSession({ req });
    if (!session || !session.user.isAdmin) {
        return res.status(401).send('admin login required');
    }
    await db.connect();
    var users: any;
    if (req.query.search) {
        users = await User.find({
            email: {
                $regex: req.query.search,
                $options: 'i',
            }
        });
    } else {
        users = await User.find({});
    }
    await db.disconnect();
    res.send(users);
};

export default handler;