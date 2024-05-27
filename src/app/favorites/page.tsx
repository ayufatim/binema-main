import Favorite from "@/components/client/pages/favorite/Favorite"
import { getAllMovies } from "@/utils/actions/get-all-movies"
import getCurrentUser from "@/utils/actions/get-current-user"

const page = async() => {
    const movies = await getAllMovies()
    const currentUser = await getCurrentUser()

    return (
        <div>
            <Favorite movies={movies} currentUser={currentUser}/>
        </div>
    )
}

export default page