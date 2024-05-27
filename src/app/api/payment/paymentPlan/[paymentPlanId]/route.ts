import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/utils/actions/get-current-user";

interface IParams {
    paymentPlanId?: string;
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
    const { paymentPlanId } = params;

    if (!paymentPlanId || typeof paymentPlanId !== "string") {
        return NextResponse.error();
    }

    try {
        const updatedPaymentPlanData = await parseBody(request);

        const updatedMovie = await prisma.paymentPlan.update({
            where: { id: paymentPlanId },
            data: updatedPaymentPlanData,
        });

        return NextResponse.json(updatedMovie);
    } catch (error) {
        console.error("Error updating paymentPlan:", error);
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

    const { paymentPlanId } = params

    if (!paymentPlanId || typeof paymentPlanId !== 'string') {
        throw new Error('Invalid ID')
    }

    const paymentPlan = await prisma.paymentPlan.deleteMany({
        where: {
            id: paymentPlanId
        }
    })

    return NextResponse.json(paymentPlan)
}