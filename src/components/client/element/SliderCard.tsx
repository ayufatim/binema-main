import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from './property/MovieCard';
import { SafeMovie, SafeUser } from '@/utils/types/safeData';

interface MoviesProps {
    movies: SafeMovie[];
    currentUser?: SafeUser | null
}

const SliderCard: React.FC<MoviesProps> = ({ movies, currentUser }) => {
    const popularMovies = movies.filter((movie) => movie.category.includes('Popular Movies'));
    const topMovies = movies.filter((movie) => movie.category.includes('Top Movies'));
    const nowPlayingMovies = movies.filter((movie) => movie.category.includes('Now Playing'));
    const upcomingMovies = movies.filter((movie) => movie.category.includes('Upcoming'));

    return (
        <div>
            <div className='ml-5 mr-5'>
                <h1 className="mt-[50px] mb-[10px] text-[30px] font-bold">Popular Movies</h1>
                <Swiper
                    slidesPerView="auto"
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Navigation]}
                    navigation={true}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        480: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 25,
                        },
                    }}
                >
                    {popularMovies.map((movie: SafeMovie, index: number) => (
                        <SwiperSlide key={index}>
                            <MovieCard movie={movie} currentUser={currentUser} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className='ml-5 mr-5'>
                <h1 className="mt-[50px] mb-[10px] text-[30px] font-bold">Top Movies</h1>
                <Swiper
                    slidesPerView="auto"
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Navigation]}
                    navigation={true}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        480: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 25,
                        },
                    }}
                >
                    {topMovies.map((movie: SafeMovie, index: number) => (
                        <SwiperSlide key={index}>
                            <MovieCard movie={movie} currentUser={currentUser} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className='ml-5 mr-5'>
                <h1 className="mt-[50px] mb-[10px] text-[30px] font-bold">Now Playing</h1>
                <Swiper
                    slidesPerView="auto"
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Navigation]}
                    navigation={true}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        480: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 25,
                        },
                    }}
                >
                    {nowPlayingMovies.map((movie: SafeMovie, index: number) => (
                        <SwiperSlide key={index}>
                            <MovieCard movie={movie} currentUser={currentUser} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className='ml-5 mr-5'>
                <h1 className="mt-[50px] mb-[10px] text-[30px] font-bold">Upcoming</h1>
                <Swiper
                    slidesPerView="auto"
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Navigation]}
                    navigation={true}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        480: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 25,
                        },
                    }}
                >
                    {upcomingMovies.map((movie: SafeMovie, index: number) => (
                        <SwiperSlide key={index}>
                            <MovieCard movie={movie} currentUser={currentUser} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default SliderCard;
