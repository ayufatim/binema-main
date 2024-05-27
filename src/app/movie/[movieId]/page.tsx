import getMovieById from "@/utils/actions/get-movie-byid";
import { SafeUser, SafeMovie } from "@/utils/types/safeData"
import MovieDetails from "@/components/client/pages/movie/MovieDetails";

interface IParams {
    movieId?: string
}

const page = async ({ params }: { params: IParams }) => {
    const movie = await getMovieById(params) as SafeMovie & { user: SafeUser };
    
    if (!movie) {
        return (
            <div>
                <h1>Film tidak ada</h1>
            </div>
        )
    }
    return (
            <MovieDetails 
                movie = {movie}
            />
    )
}

export default page