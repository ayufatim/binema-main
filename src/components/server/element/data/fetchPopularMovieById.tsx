const fetchPopularMovieById = async (movieId: string) => {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API}`
        );
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default fetchPopularMovieById