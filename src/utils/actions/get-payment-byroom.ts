import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPaymentByRoom(dateStart: any) {
    try {
        const dateStartObj = new Date(dateStart);

        const payments = await prisma.payment.findMany({
            where: {
                AND: [
                    { startTime: { lte: dateStartObj } },
                    { endTime: { gte: dateStartObj } }
                ]
            }
        });

        return payments;
    } catch (error) {
        console.error('Error fetching filtered payments:', error);
        return [];
    } finally {
        await prisma.$disconnect();
    }
}
