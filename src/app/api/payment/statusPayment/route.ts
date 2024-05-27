import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
    try {
        const { updates } = await request.json();
        const now = new Date();

        const expiredPayments = await prisma.payment.findMany({
            where: {
                expiredPayment: {
                    lt: now
                },
                status: 'pending'
            }
        });

        const canceledPayments = await Promise.all(expiredPayments.map(async (payment) => {
            const updatedPayment = await prisma.payment.update({
                where: { id: payment.id },
                data: { status: 'canceled' }
            });
            return updatedPayment;
        }));

        const updatedPayments = await Promise.all(updates.map(async (update: any) => {
            const updatedPayment = await prisma.payment.update({
                where: { id: update.id },
                data: { status: update.status }
            });
            return updatedPayment;
        }));

        const allUpdatedPayments = [...canceledPayments, ...updatedPayments];

        return NextResponse.json(allUpdatedPayments);
    } catch (error) {
        console.error("Error updating payment statuses:", error);
        return NextResponse.error();
    }
}
