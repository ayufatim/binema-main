'use client'

import { useState, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Select from 'react-select';

import axios from 'axios';
import { toast } from 'react-hot-toast';

import { genres } from '../../../../global/data/Genres';
import { categories } from '../../../../global/data/Categories';
import AdminNavbar from '../../../element/AdminNav';
import ImageUpload from '../../../element/inputs/ImageUpload';
import Swal from 'sweetalert2';
import { SafeMovie, SafeUser } from '@/utils/types/safeData';

interface MovieProps {
    movie: SafeMovie & {
        user: SafeUser
    }
}

function EditMovie({ movie }: MovieProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<any[]>([]);

    const [movieName, setMovieName] = useState(movie.title);
    const [movieOverview, setMovieOverview] = useState(movie.overview);
    const [moviePosterPath, setMoviePosterPath] = useState(movie.poster_path);
    const [movieBackdropPath, setMovieBackdropPath] = useState(movie.backdrop_path);
    const [movieReleaseDate, setMovieReleaseDate] = useState(movie.release_date);
    let [trailerPath, setTrailerPath] = useState(movie.trailer);

    console.log('trialer = ', trailerPath, movie.trailer)

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMovieName(e.target.value);
    };

    const handleChangeOverview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMovieOverview(e.target.value);
    };

    const handleChangeReleaseDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMovieReleaseDate(e.target.value);
    };

    const handleChangeTrailer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTrailerPath(e.target.value);
    };    

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
            trailer: ''
        },
    });

    let poster_path = watch('poster_path')
    let backdrop_path = watch('backdrop_path')

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    useEffect(() => {
        const genreOptions = movie.genres.map((movies) => ({
            label: movies
        }));
        setSelectedGenres(genreOptions);

        const categoryOptions = movie.category.map((movies) => ({
            label: movies
        }));
        setSelectedCategories(categoryOptions);
        setMoviePosterPath(movie.poster_path)
        setMovieBackdropPath(movie.backdrop_path)
    }, []);


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
            }

            await axios.put(`/api/movie/${movie.id}`, formattedData);
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Movie updated successfully!',
            });
            router.push('/admin/movie');
            router.refresh()
        } catch (error) {
            toast.error('Something went wrong');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const categoryOptions = categories.length > 0
        ? categories.map((category) => ({ value: category.name, label: category.name }))
        : [{ value: '', label: 'No categories available' }];

    const genreOptions = genres.length > 0
        ? genres.map((genre) => ({ value: genre.name, label: genre.name }))
        : [{ value: '', label: 'No genres available' }];

    const handleChangeCategory = (selectedOptions: any) => {
        setSelectedCategories(selectedOptions);
    };

    const handleChangeGenre = (selectedOptions: any) => {
        setSelectedGenres(selectedOptions);
    };

    return (
        <div className="w-full">
            <AdminNavbar />
            <h1 className='flex justify-center text-[35px] pt-5'>Edit Data</h1>
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
                    />
                </div>
                <h1 className="flex justify-center text-lg">Tanggal Rilis:</h1>
                <input
                    type="date"
                    placeholder='pilih tanggal...'
                    className='px-3 py-2 rounded text-black max-w-[80vw] min-w-[50vw]'
                    value={movieReleaseDate}
                    onChange={handleChangeReleaseDate}
                />
                <div>
                    <h1 className="flex justify-center text-lg">Masukkan Link Trailer:</h1>
                    <input
                        type="text"
                        placeholder='https://'
                        className='px-3 py-2 rounded text-black max-w-[80vw] min-w-[50vw]'
                        value={trailerPath}
                        onChange={handleChangeTrailer}
                    />
                </div>
                <div>
                    <h1 className="flex justify-center text-lg">Gambar Poster:</h1>
                    <ImageUpload
                        value={poster_path === '' ? moviePosterPath : poster_path}
                        onChange={(value) => {
                            setMoviePosterPath(value);
                            setCustomValue('poster_path', value);
                        }}
                    />
                </div>
                <div>
                    <h1 className="flex justify-center text-lg">Gambar Backdrop:</h1>
                    <ImageUpload
                        value={backdrop_path === '' ? movieBackdropPath : backdrop_path}
                        onChange={(value) => {
                            setMovieBackdropPath(value);
                            setCustomValue('backdrop_path', value);
                        }}
                    />
                </div>
                <button
                    type='submit'
                    onClick={handleSubmit(onSubmit)}
                    className='flex text-black bg-white px-5 py-2 rounded hover:text-white hover:bg-[#333] duration-300'
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default EditMovie;
