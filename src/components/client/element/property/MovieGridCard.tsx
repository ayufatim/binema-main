'use client'

import FavoriteButton from "../FavoriteButton";

const MovieGridCard = ({ movie, index, currentUser, customFavoritebtn }: { movie: any, index: any, currentUser: any, customFavoritebtn: any }) => {
    return (
        <>
            <div className="flex flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row max-w-[60vw] md:max-w-[40vw] lg:max-w-[30vw] border-gray-700 bg-gray-800 hover:bg-gray-700" key={index}>
                {movie.poster_path ? (
                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" loading="lazy" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                ) : (
                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" loading="lazy" src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMWyV35Ep8jqRdCdjfCFz7SFoS2N9wrwklFQuAwyDviA&s`} alt="Placeholder" />
                )}
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.title}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">{movie.overview}</p>
                    <div className="flex flex-row w-full justify-between">
                        <a className="flex w-fit rounded mb-5 px-5 py-3 bg-[#fff] text-[#333333]" href={`/movie/${movie.id}`}>See Details</a>
                        <FavoriteButton movieId={movie.id} currentUser={currentUser} classNameCustom={customFavoritebtn} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieGridCard;