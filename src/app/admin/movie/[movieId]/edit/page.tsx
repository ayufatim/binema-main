import EditMovie from "@/components/server/pages/movie/edit/EditMovie";
import getMovieById from "@/utils/actions/get-movie-byid";

interface IParams {
    movieId?: string
}

const page = async ({ params }: { params: IParams }) => {
    const movie = await getMovieById(params);

    if (!movie) {
        return <div>
            Loading...
        </div>
    }

    return (
        <div>
            <EditMovie movie={movie} />
        </div>
    );
}

export default page;
