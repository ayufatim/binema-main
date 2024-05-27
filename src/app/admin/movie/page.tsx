import AdminNavbar from "@/components/server/element/AdminNav";
import AdminMovie from "@/components/server/pages/movie/AdminMovie";
import getMovie, { IMovieParams } from "@/utils/actions/get-movie";

interface AdminMovieProps {
    searchParams: IMovieParams;
    movie: IMovieParams[];
}

const Page = async ({ searchParams }: AdminMovieProps) => {
    const movie = await getMovie(searchParams);
    const formattedMovies = movie.map((safeMovie) => ({
        id: safeMovie.id,
        title: safeMovie.title,
        genres: safeMovie.genres, 
        category: safeMovie.category,
        backdrop_path: safeMovie.backdrop_path,
        release_date: safeMovie.release_date
    }));

    return (
        <div className="bg-[#333] min-h-screen">
            <AdminNavbar />
            <AdminMovie movies={formattedMovies} />
        </div>
    );
};

export default Page;
