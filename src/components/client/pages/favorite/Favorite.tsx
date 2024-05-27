'use client'

import BackButton from "@/components/global/property/BackButton"
import { SafeMovie, SafeUser } from "@/utils/types/safeData"
import MovieGridCard from "../../element/property/MovieGridCard";

interface MoviesProps {
  movies: SafeMovie[];
  currentUser?: SafeUser | null
}

const Favorite: React.FC<MoviesProps> = ({ movies, currentUser }) => {
  const customFavoritebtn = 'w-fit h-fit px-3 py-1 rounded-lg'

  return (
    <div className="flex w-full">
      <BackButton />
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-center">
          <h1 className="text-[30px] font-bold pt-12">Favorite Movie</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-10 mx-[5vw] mt-5">
          {movies.map((movie: any, index: any) => (
            (currentUser && currentUser.favoriteMovie && currentUser.favoriteMovie.includes(movie.id)) && (
              <MovieGridCard movie={movie} index={index} currentUser={currentUser} customFavoritebtn={customFavoritebtn} />
            )
          ))}
        </div>
      </div>
    </div>
  )
}

export default Favorite