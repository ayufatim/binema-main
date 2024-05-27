import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import getCurrentUser from "@/utils/actions/get-current-user"

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json()
    const {
        title,
        overview,
        poster_path,
        backdrop_path,
        genres,
        category,
        release_date,
        trailer,
        movieDuration
    } = body

    const movie = await prisma.movie.create({
        data: {
            title,
            overview,
            poster_path,
            backdrop_path,
            genres,
            category,
            release_date,
            trailer,
            movieDuration,
            userId: currentUser.id,
        },
    })

    return NextResponse.json(movie)
}