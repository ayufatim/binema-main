import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import cron from 'node-cron';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    cron.schedule('*/5 * * * *', async () => {
        try {
            const result = await prisma.payment.updateMany({
                where: {
                    expiredPayment: {
                        lt: new Date(),
                    },
                    status: 'pending',
                },
                data: {
                    status: 'canceled',
                },
            });

            console.log('Expired payments updated successfully.');
        } catch (error) {
            console.error('Error updating expired payments:', error);
        }
    });

    return res.status(200).json({ message: 'Cron job scheduled successfully.' });
}
