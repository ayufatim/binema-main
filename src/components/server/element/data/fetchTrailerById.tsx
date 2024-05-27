import axios from 'axios';

export const fetchTrailerById = async (selectedTitle: string) => {
    try {
        const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${selectedTitle}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API}`
        );
        const data = res.data;
        if (data.results.length > 0) {
            return data.results[0];
        } else {
            return null;
        }
    } catch (error) {
        throw error
    }
};
