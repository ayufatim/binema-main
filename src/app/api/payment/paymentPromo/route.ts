import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"

export async function POST(
    request: Request,
) {
    const body = await request.json()
    const {
        promoCode,
        priceDisc,
        usable,
        expired
    } = body

    const paymentPlan = await prisma.paymentPromo.create({
        data: {
            promoCode,
            priceDisc,
            usable,
            expired
        },
    })

    return NextResponse.json(paymentPlan)
}