import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/utils/actions/get-current-user";

interface IParams {
    paymentPromoId?: string;
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
    const { paymentPromoId } = params;

    if (!paymentPromoId || typeof paymentPromoId !== "string") {
        return NextResponse.error();
    }

    try {
        const updatedPaymentPromoData = await parseBody(request);

        const updatedMovie = await prisma.paymentPromo.update({
            where: { id: paymentPromoId },
            data: updatedPaymentPromoData,
        });

        return NextResponse.json(updatedMovie);
    } catch (error) {
        console.error("Error updating paymentPromo:", error);
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

    const { paymentPromoId } = params

    if (!paymentPromoId || typeof paymentPromoId !== 'string') {
        throw new Error('Invalid ID')
    }

    const paymentPromo = await prisma.paymentPromo.deleteMany({
        where: {
            id: paymentPromoId
        }
    })

    return NextResponse.json(paymentPromo)
}