import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import { toast } from "react-hot-toast"

import { SafeUser } from "@/utils/types/safeData"
import Swal from "sweetalert2"

interface IUseFavorite {
    movieId: string
    currentUser?: SafeUser | null
}

const useFavorite = ({ movieId, currentUser }: IUseFavorite) => {
    const router = useRouter()

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteMovie || []

        return list.includes(movieId)
    }, [currentUser, movieId])

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()

        if (!currentUser) {
            return await Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'You must login!',
            });
        }

        try {
            let request

            if (hasFavorited) {
                request = axios.delete
                await Swal.fire({
                    icon: 'error',
                    title: 'Unfavorited',
                    text: 'Movie removed from favorit!',
                });
            } else {
                request = axios.post
                await Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Movie added in favorit!',
                });
            }

            await request(`/api/favorites/${movieId}`)
            router.refresh()
            toast.success(hasFavorited ? 'Removed from favorite' : 'Added to favorite')
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong.')
        }
    },
        [
            currentUser,
            hasFavorited,
            movieId,
            router
        ]);

    return {
        hasFavorited,
        toggleFavorite,
    }
}

export default useFavorite