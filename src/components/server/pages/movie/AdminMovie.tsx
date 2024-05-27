'use client'

import Image from 'next/image'
import { FiEdit } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import React from 'react';

interface AdminMovieProps {
    movies: { id: string; title: string; genres: string[]; category: string[]; backdrop_path: string; release_date: string }[];
}

const AdminMovie: React.FC<AdminMovieProps> = ({
    movies
}) => {
    const router = useRouter()

    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [sortOption, setSortOption] = useState("");
    const itemsPerPage = 3;

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterCategory(event.target.value);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(event.target.value);
    };

    const filteredMovies = movies.filter(movie => {
        if (filterCategory && filterCategory !== "" && !movie.category.includes(filterCategory)) {
            return false;
        }
        return true;
    });

    const sortedMovies = filteredMovies.sort((a, b) => {
        if (sortOption === "title-asc") {
            return a.title.localeCompare(b.title);
        } else if (sortOption === "title-desc") {
            return b.title.localeCompare(a.title);
        } else if (sortOption === "release_date-asc") {
            return a.release_date.localeCompare(b.release_date);
        } else if (sortOption === "release_date-desc") {
            return b.release_date.localeCompare(a.release_date);
        }
        return 0;
    });

    const displayedMovies = sortedMovies
        .filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const handleClickDelete = (id: string) => {
        onDeleted(id);
    };

    const totalDisplayedMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase())).length;

    const onDeleted = useCallback(async (id: string) => {
        try {
            await Swal.fire({
                icon: 'warning',
                title: 'Warning',
                showDenyButton: true,
                text: 'Are you sure want to delete?',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire('Deleted succesfully!', '', 'success');
                    await axios.delete(`/api/movie/${id}`);
                    router.refresh();
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info');
                }
            });
        } catch (error) {
            throw error
        }
    }, [router]);

    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-5">
                    <div className="flex w-screen justify-center lg:justify-start">
                        <div className="flex items-center text-black w-[80vw] lg:max-w-[10vw] lg:pl-5">
                            <input type="text" placeholder="Search..." className="flex-1 h-10 appearance-none b order border-gray-300 rounded-tl-lg rounded-bl-lg py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={handleSearchChange} />
                            <button className="bg-blue-500 hover:bg-blue-700 duration-300 text-white h-10 font-bold py-2 px-4 rounded-tr-lg rounded-br-lg"><FaSearch /></button>
                        </div>
                    </div>
                    <div className='flex flex-row sm:flex-row items-center gap-5'>
                        <div className="flex items-center text-black h-fit">
                            <select id="category" className="flex appearance-none w-[20vw] lg:w-fit border border-gray-300 rounded-lg py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={handleFilterChange}>
                                <option value="">Filter</option>
                                <option value="Popular Movies">Popular Movies</option>
                                <option value="Top Movies">Top Movies</option>
                                <option value="Now Playing">Now Playing</option>
                                <option value="Upcoming">Upcoming</option>
                            </select>
                        </div>
                        <div className="flex items-center h-fit">
                            <select id="sort" className="flex-1 text-black appearance-none w-[20vw] lg:w-fit border border-gray-300 rounded-lg py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={handleSortChange}>
                                <option value="">Sort By</option>
                                <option value="title-asc">Title (ASC)</option>
                                <option value="release_date-asc">Release Date (ASC)</option>
                                <option value="title-desc">Title (DESC)</option>
                                <option value="release_date-desc">Release Date (DESC)</option>
                            </select>
                        </div>
                        <div className='flex items-center'>
                            <Link
                                href={'/admin/movie/add'}
                                className="flex text-sm bg-[#1d7af2] font-bold py-3 px-4 sm:mr-5 rounded-lg hover:bg-neutral-100 hover:text-[#1d7af2] transition cursor-pointer items-center duration-300"
                            >
                                Tambah
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-5 gap-4">
                    {displayedMovies.map((movie: any, index: any) => (
                        <div key={index} className='flex flex-col md:flex-row justify-between bg-white w-full shadow-md p-5 lg:max-h-[400px] md:h-[190px] rounded-lg overflow-hidden'>
                            <div className="flex flex-col justify-center items-center md:flex-row">
                                <Image
                                    src={movie.backdrop_path}
                                    alt="Product Image"
                                    className="object-cover md:min-w-[300px] rounded-lg"
                                    width={300}
                                    height={100}
                                    loading="lazy"
                                />
                                <div className="flex flex-col pl-5 justify-center md:items-start items-center">
                                    <h2 className="text-lg text-black font-semibold mb-2">{movie.title}</h2>
                                    <p className="text-gray-600 mb-2 text-wrap break-words">Category : {movie.category.map((category: string, catIndex: number) => (
                                        <React.Fragment key={catIndex}>
                                            {category}
                                            {catIndex !== movie.category.length - 1 && movie.category.length > 1 && ', '}
                                        </React.Fragment>
                                    ))}</p>
                                    <p className="text-gray-600 mb-2 text-wrap break-words">Rilis : {movie.release_date}</p>
                                </div>
                            </div>
                            <div className='flex flex-col p-5 text-white gap-2 justify-center'>
                                <Link className='bg-green-600 px-5 py-2 rounded-lg flex flex-row gap-2 items-center justify-center' href={`/admin/movie/${movie.id}/edit`}>
                                    <button className='flex flex-row gap-2 items-center justify-center'>
                                        <FiEdit className='w-5 h-5' />Edit
                                    </button>
                                </Link>
                                <Link className='bg-gray-400 px-5 py-2 rounded-lg flex flex-row gap-2 items-center justify-center' href={`/movie/${movie.id}`}>
                                    <button className='flex flex-row gap-2 items-center justify-center'>
                                        <FaRegEye className='w-6 h-6' />Preview
                                    </button>
                                </Link>
                                <Link className='bg-red-600 px-5 py-2 rounded-lg flex flex-row gap-2 items-center justify-center' href={'#'}>
                                    <button className='flex flex-row gap-2 items-center justify-center' onClick={() => handleClickDelete(movie.id)}>
                                        <MdDeleteForever className='w-6 h-6' />Delete
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <ReactPaginate
                    previousLabel={<FiChevronLeft />}
                    nextLabel={<FiChevronRight />}
                    breakLabel={'...'}
                    pageCount={Math.ceil(totalDisplayedMovies / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={'flex items-center justify-center list-none p-0'}
                    previousClassName={'p-2 rounded-[7px] hover:bg-white hover:text-[#007bff] duration-300'}
                    nextClassName={'p-2 rounded-[7px] hover:bg-white hover:text-[#007bff] duration-300'}
                    pageClassName={'pagination-page flex mx-2'}
                    breakClassName={'pagination-break'}
                    disabledClassName={'pagination-disabled'}
                    activeClassName={'pagination-active'}
                />
            </div>
        </div>
    )
}

export default AdminMovie