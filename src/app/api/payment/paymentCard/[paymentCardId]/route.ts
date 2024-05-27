import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/utils/actions/get-current-user";

interface IParams {
    paymentCardId?: string;
}

async function parseBody(request: Request) {
    try {
        const contentType = request.headers.get("content-type");
        if (contentType?.includes("application/json")) {
            return await request.json();
        }
        throw new Error("Unsupported content type");
    } catch (error) {
        console.error("Error parsing request body:", error);
        return { error: "Invalid request body" };
    }
}

export async function PUT(request: Request, { params }: { params: IParams }) {
    const { paymentCardId } = params;

    if (!paymentCardId || typeof paymentCardId !== "string") {
        return NextResponse.error();
    }

    try {
        const updatedPaymentCardData = await parseBody(request);

        const updatePaymentCard = await prisma.paymentCard.update({
            where: { id: paymentCardId },
            data: updatedPaymentCardData,
        });

        return NextResponse.json(updatePaymentCard);
    } catch (error) {
        console.error("Error updating paymentCard:", error);
        return NextResponse.error();
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const { paymentCardId } = params

    if (!paymentCardId || typeof paymentCardId !== 'string') {
        throw new Error('Invalid ID')
    }

    const paymentCard = await prisma.paymentCard.deleteMany({
        where: {
            id: paymentCardId
        }
    })

    return NextResponse.json(paymentCard)
}