import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"

export async function POST(
    request: Request,
) {
    const body = await request.json()
    const {
        numberCard,
        nameCard,
        categoryInstitue,
        imageCard,
        imageQR
    } = body

    const paymentCard = await prisma.paymentCard.create({
        data: {
            numberCard,
            nameCard,
            categoryInstitue,
            imageCard,
            imageQR
        },
    })

    return NextResponse.json(paymentCard)
}