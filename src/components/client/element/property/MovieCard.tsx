import React, { useState } from 'react';
import { SafeMovie, SafeUser } from '@/utils/types/safeData';
import FavoriteButton from '../FavoriteButton';

interface MovieCardProps {
    movie: SafeMovie;
    currentUser?: SafeUser | null;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, currentUser }) => {
    const [hovered, setHovered] = useState(false);

    const classNameCustom = 'absolute w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] top-0 left-0 rounded-br-[20px] bg-black p-3';

    return (
        <div className="px-2 relative">
            <a href={`/movie/${movie.id}`} className="block relative">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="w-full rounded"
                    loading="lazy"
                    alt={`Poster for ${movie.title}`}
                    style={{
                        transform: hovered ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                />
            </a>
            <FavoriteButton movieId={movie.id} currentUser={currentUser} classNameCustom={classNameCustom} />
        </div>
    );
};

export default MovieCard;
