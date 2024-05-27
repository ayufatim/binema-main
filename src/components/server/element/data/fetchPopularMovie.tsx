const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN

const baseUrl = 'https://api.themoviedb.org/3/movie/';

export const fetchPopularMovies = async (page: any) => {
    try {
        const res = await fetch(`${baseUrl}popular?language=en-US&page=${page}`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_TOKEN}`,
            },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        const data: { results: any[] } = await res.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
};
