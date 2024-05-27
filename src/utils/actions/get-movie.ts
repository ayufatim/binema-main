import prisma from "@/lib/prisma"
import { SafeMovie } from "@/utils/types/safeData"

export interface IMovieParams {
    userId?: string
    title?: string
    overview?: string
    poster_path?: string
    backdrop_path?: string
    genres?: []
    category?: []
    release_date?: string
    trailer?: string
}

export default async function getMovie(
    params: IMovieParams
): Promise<SafeMovie[]> {
    try {
        const {
            userId,
            title,
            overview,
            poster_path,
            backdrop_path,
            genres,
            category,
            release_date,
            trailer
        } = params
        let query: any = {}

        if (userId) {
            query.userId = userId
        }

        if (title) {
            query.title = title
        }

        const listings = await prisma.movie.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })

        const safeListings: SafeMovie[] = listings.map((listing: any) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }))

        return safeListings
    } catch (error: any) {
        throw error
    }
}