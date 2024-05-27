'use client'

import { useState, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import { fetchPopularMovies } from '../../../element/data/fetchPopularMovie';
import fetchPopularMovieById from '../../../element/data/fetchPopularMovieById'

import axios from 'axios';
import { toast } from 'react-hot-toast';

import { genres } from '../../../../global/data/Genres';
import { categories } from '../../../../global/data/Categories';
import AdminNavbar from '../../../element/AdminNav';
import ImageUpload from '../../../element/inputs/ImageUpload';
import { fetchTrailerById } from '../../../element/data/fetchTrailerById';
import Swal from 'sweetalert2';

interface Movie {
    backdrop_path: any;
    poster_path?: string;
    title: string;
    overview: string;
    id: number;
}

interface TrailerData {
    key: string;
}

function AddMovie() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<any[]>([]);
    const [trailerData, setTrailerData] = useState<TrailerData | null>(null)
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            title: '',
            overview: '',
            poster_path: '',
            backdrop_path: '',
            genres: [],
            category: [],
            release_date: '',
            trailer: '',
            movieDuration: ''
        },
    });

    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [movieName, setMovieName] = useState('');
    const [movieOverview, setMovieOverview] = useState('')
    let [moviePosterPath, setMoviePosterPath] = useState('')
    let [movieBackdropPath, setMovieBackdropPath] = useState('')
    const [movieReleaseDate, setMovieReleaseDate] = useState('')
    const [movieDuration, setMovieDuration] = useState('')
    var [trailerPath, setTrailerPath] = useState('')

    let poster_path = watch('poster_path')
    let backdrop_path = watch('backdrop_path')

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const [numberPage, setNumberPage] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await fetchPopularMovies(numberPage);
            setPopularMovies(movies);
        };

        fetchMovies();
    }, [numberPage]);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (selectedTitle) {
                const details = await fetchPopularMovieById(selectedTitle);
                setMovieName(details.title);
                setMovieOverview(details.overview)
                setMoviePosterPath(`https://image.tmdb.org/t/p/w500${details.poster_path}`)
                setMovieBackdropPath(`https://image.tmdb.org/t/p/w1280${details.backdrop_path}`)
                setMovieReleaseDate(details.release_date)
                setMovieDuration(details.runtime.toString())
                const genreOptions = details.genres.map((genre: any) => ({ value: genre.id, label: genre.name }));
                setSelectedGenres(genreOptions);
            } else {
                setMovieName('');
                setMovieOverview('')
                setMoviePosterPath('')
                setMovieBackdropPath('')
                setMovieReleaseDate('')
                setSelectedGenres([])
                setTrailerPath('')
                setMovieDuration('')
            }
        }; fetchMovieDetails();
    }, [selectedTitle]);

    useEffect(() => {
        const fetchTrailerData = async () => {
            try {
                const trailerData = await fetchTrailerById(selectedTitle);
                if (trailerData) {
                    setTrailerData(trailerData);
                } else {
                    setError('No trailer found for this movie.');
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
                setError(errorMessage);
            }
        };
        fetchTrailerData();
    }, [selectedTitle]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        try {
            const genresToSend = selectedGenres.map((genre) => genre.label);
            const categoriesToSend = selectedCategories.map((category) => category.label);

            const formattedData = {
                ...data,
                genres: genresToSend,
                category: categoriesToSend,
                title: movieName,
                overview: movieOverview,
                poster_path: moviePosterPath,
                backdrop_path: movieBackdropPath,
                release_date: movieReleaseDate,
                trailer: trailerPath,
                movieDuration: movieDuration
            };

            await axios.post('/api/movie', formattedData);

            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Movie added successfully!',
            });
            router.push('/admin/movie');
            router.refresh()
            reset();
        } catch (error) {
            toast.error('Something went wrong');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };


    const categoryOptions = categories.length > 0
        ? categories.map((category) => ({ value: category.id, label: category.name }))
        : [{ value: '', label: 'No categories available' }];

    const genreOptions = genres.length > 0
        ? genres.map((genre: any) => ({ value: genre.id, label: genre.name }))
        : [{ value: '', label: 'No genres available' }];

    const handleChangeCategory = (selectedOptions: any) => {
        setSelectedCategories(selectedOptions);
    };

    const handleChangeGenre = (selectedOptions: any) => {
        setSelectedGenres(selectedOptions);
    };

    const handleChangeTitle = (e: any) => {
        setMovieName(e.target.value);
    };

    const handleChangeOverview = (e: any) => {
        setMovieOverview(e.target.value);
    };

    const handleChangeReleaseDate = (e: any) => {
        setMovieReleaseDate(e.target.value);
    };

    const handleChangeTrailer = (e: any) => {
        setTrailerPath(e.target.value);
    };

    const handleChangeDuration = (e: any) => {
        setMovieDuration(e.target.value);
    };

    return (
        <div className="w-full">
            <AdminNavbar />
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className='flex justify-center text-[35px] pt-5'>Tambah Data</h1>
                <div className="flex flex-col p-5 justify-center items-center gap-5 h-fit">
                    <div className='flex flex-col gap-5'>
                        <h1 className="flex justify-center text-lg">Judul:</h1>
                        <input
                            type="text"
                            placeholder='masukkan judul'
                            className='px-3 py-2 rounded text-black max-w-[80vw] min-w-[50vw]'
                            value={movieName}
                            onChange={handleChangeTitle}
                            required
                        />
                        <div className='flex flex-row text-black max-w-[80vw] min-w-[50vw] gap-5'>
                            <Select
                                placeholder="Pilih Title"
                                className='max-w-[80vw] min-w-[50vw]'
                                isClearable
                                id='select-box'
                                instanceId="select-box"
                                aria-label="title"
                                options={popularMovies.map((movie) => ({
                                    value: movie.id,
                                    label: movie.title,
                                }))}
                                value={
                                    selectedTitle
                                        ? { value: selectedTitle, label: movieName }
                                        : null
                                }
                                onChange={(option) => {
                                    setSelectedTitle(option?.value || '');
                                    setValue('title', option?.label || '');
                                }}
                                formatOptionLabel={(option: any) => (
                                    <div className='flex flex-row items-center gap-3 text-black duration-300'>
                                        <div>{option.label}</div>
                                    </div>
                                )}
                                classNames={{
                                    control: () => 'p-3 border-2',
                                    input: () => 'text-lg',
                                    option: () => 'text-lg',
                                }}
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 6,
                                    colors: {
                                        ...theme.colors,
                                        primary: '#ffe4e6',
                                        primary25: '#ffe4e6',
                                    },
                                })}
                            />
                            <input
                                className='px-3 py-2 rounded text-black max-w-[60px] text-black'
                                type="number"
                                value={numberPage}
                                onChange={(e: any) => setNumberPage(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className="flex justify-center text-lg">Pilih Genre:</h1>
                        <Select
                            {...register('genres')}
                            isMulti
                            value={selectedGenres}
                            onChange={handleChangeGenre}
                            id='select-box'
                            instanceId="select-box"
                            options={genreOptions}
                            placeholder="Select genres..."
                            styles={{
                                control: (provided: any) => ({ ...provided, width: '100%' }),
                            }}
                            className='text-black max-w-[80vw] min-w-[50vw]'
                        />
                    </div>
                    <div className='flex flex-col gap-5'>
                        <h1 className="flex justify-center text-lg">Deskripsi:</h1>
                        <textarea
                            name="overview"
                            id="overview"
                            className='flex p-5 text-black rounded w-[50vw] h-[20vh]'
                            value={movieOverview}
                            onChange={handleChangeOverview}
                            placeholder='deskripsi...'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <h1 className="flex justify-center text-lg">Pilih Kategori:</h1>
                        <Select
                            {...register('category')}
                            isMulti
                            id='select-box'
                            instanceId="select-box"
                            value={selectedCategories}
                            onChange={handleChangeCategory}
                            options={categoryOptions}
                            placeholder="Select categories..."
                            styles={{
                                control: (provided: any) => ({ ...provided, width: '100%' }),
                            }}
                            className='text-black max-w-[80vw] min-w-[50vw]'
                            required
                        />
                    </div>
                    <div>
                        <h1 className="flex justify-center text-lg">Tanggal Rilis:</h1>
                        <input
                            type="date"
                            placeholder='pilih tanggal...'
                            className='px-3 py-2 rounded text-black max-w-[80vw] min-w-[50vw]'
                            value={movieReleaseDate}
                            onChange={handleChangeReleaseDate}
                        />
                    </div>
                    <div>
                        <h1 className="flex justify-center text-lg">Durasi Film:</h1>
                        <input
                            type="text"
                            placeholder='input durasi (dalam menit)'
                            className='px-3 py-2 rounded text-black max-w-[80vw] min-w-[50vw]'
                            value={movieDuration}
                            onChange={handleChangeDuration}
                        />
                    </div>
                    <div>
                        <h1 className="flex justify-center text-lg">Masukkan Link Trailer:</h1>
                        <input
                            type="text"
                            placeholder='https://'
                            className='px-3 py-2 rounded text-black max-w-[80vw] min-w-[50vw]'
                            value={selectedTitle == '' && trailerData == null ? trailerPath : trailerPath = `https://www.youtube.com/embed/${(trailerData?.key)}`}
                            onChange={handleChangeTrailer}
                        />
                    </div>
                    <div>
                        <h1 className="flex justify-center text-lg">Gambar Poster:</h1>
                        <ImageUpload
                            value={(selectedTitle != '' && !poster_path) ?
                                moviePosterPath :
                                moviePosterPath = poster_path}
                            onChange={(value) => setCustomValue('poster_path', value)}
                        />
                    </div>
                    <div>
                        <h1 className="flex justify-center text-lg">Gambar Backdrop:</h1>
                        <ImageUpload
                            value={(selectedTitle != '' && !backdrop_path) ?
                                movieBackdropPath :
                                movieBackdropPath = backdrop_path}
                            onChange={(value) => setCustomValue('backdrop_path', value)}
                        />
                    </div>
                    <button
                        type='submit'
                        className='flex text-black bg-white px-5 py-2 rounded hover:text-white hover:bg-[#333] duration-300'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddMovie;
