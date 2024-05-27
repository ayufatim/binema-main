const CarouselItemImage = ({ movie }: { movie: any }) => {
    return (
        <img
            style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
            src={movie.backdrop_path}
            alt={movie.title}
            className="hover:"
            loading="lazy"
        />
    );
};

const CarouselItemContent = ({ movie }: { movie: any }) => {
    return (
        <div
            className='absolute bottom-[5vh] pl-[5vw] w-fit rounded-tr-[10px] rounded-br-[10px]'
            style={{
                backdropFilter: 'blur(4px)',
                backgroundColor: 'rgba(128, 128, 128, 0.3)',
                padding: '20px',
            }}
        >
            <h1 className='w-[60vw] lg:w-[30vw] text-[30px]'>{movie.title}</h1>
            <h1 className='w-[70vw] lg:w-[30vw] mb-5 line-clamp-2'>{movie.overview}</h1>
            <a className="flex w-fit rounded mb-5 p-3 bg-[#333333]" href={`/movie/${movie.id}`}>See Details</a>
        </div>
    );
};

const Carousel = ({ movie }: { movie: any }) => {
    return (
        <>
            <div>
                <CarouselItemImage movie={movie} />
                <CarouselItemContent movie={movie} />
            </div>
        </>
    );
};

export default Carousel