import User from '@/models/User';
import db from '@/utils/db';
import { getSession } from 'next-auth/react';


const handler = async (req: any, res: any) => {
    const session: any = await getSession({ req });
    if (!session || !session.user.isAdmin) {
        return res.status(401).send('admin signin required');
    }
    await db.connect();
    const users = await User.find({});
    await db.disconnect();
    res.send(users);
};

export default handler;