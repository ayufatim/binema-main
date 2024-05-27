import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"

export async function POST(
    request: Request,
) {
    const body = await request.json()
    const {
        packageName,
        capacity,
        screenResolution,
        price,
    } = body

    const paymentPlan = await prisma.paymentPlan.create({
        data: {
            packageName,
            capacity,
            screenResolution,
            price,
        },
    })

    return NextResponse.json(paymentPlan)
}