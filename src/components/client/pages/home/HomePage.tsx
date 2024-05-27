'use client'

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CarouselItem from '@/components/client/element/Carousel';
import { SafeMovie, SafeUser } from '@/utils/types/safeData';
import { Autoplay, EffectFade, FreeMode } from 'swiper/modules';
import SliderCard from '../../element/SliderCard';

interface MoviesProps {
    movies: SafeMovie[];
    currentUser?: SafeUser | null
}

const HomePage: React.FC<MoviesProps> = ({ movies, currentUser }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const filteredMovies = movies.filter((movie) => movie.category.includes('Popular Movies'));

    const handleSlideChange = (swiper: any) => {
        setCurrentImageIndex(swiper.realIndex);
    };

    return (
        <div>
            <Swiper
                modules={[Autoplay, EffectFade, FreeMode]}
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                effect={'fade'}
                loop={true}
                onSlideChange={handleSlideChange}
                className="mySwiper2"
            >
                {filteredMovies.map((movie: any, index: number) => (
                    <SwiperSlide key={index}>
                        {index === currentImageIndex && (
                            <div key={index}>
                                <CarouselItem movie={movie} />
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            <SliderCard movies={movies} currentUser={currentUser}/>
        </div>
    );
};

export default HomePage;

