'use client'

import { MdOutlineLocalPlay } from "react-icons/md"
import useFavorite from "@/utils/hooks/useFavorite"
import { SafeUser } from "@/utils/types/safeData"
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

interface HeartButtonProps {
    movieId: string
    currentUser?: SafeUser | null
    classNameCustom?: string
}

const FavoriteButton: React.FC<HeartButtonProps> = ({
    movieId,
    currentUser,
    classNameCustom
}) => {
    const { hasFavorited, toggleFavorite } = useFavorite({
        movieId,
        currentUser
    })

    return (
        <div
            className={hasFavorited 
                ? `${classNameCustom} hover:bg-[#d4b60f] text-[#d4b60f] hover:text-[#fff] duration-300`
                : `${classNameCustom} hover:bg-[#fff] text-[#fff] hover:text-[#d4b60f] duration-300`
            }
            onClick={toggleFavorite}
        >
            {hasFavorited ?
            <FaBookmark className={'w-[25px] h-[25px] sm:w-[35px] sm:h-[35px] cursor-pointer'}/>
            :<FaRegBookmark className={'w-[25px] h-[25px] sm:w-[35px] sm:h-[35px] cursor-pointer'} />
}
        </div>
    )
}

export default FavoriteButton