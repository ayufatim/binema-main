'use client';

import axios from 'axios';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiEdit } from 'react-icons/fi';
import { MdDeleteForever, MdPlaylistAdd } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { SafeMovie, SafePayment } from '@/utils/types/safeData';
import { GrUpdate } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';

function PaymentList({ payment, movie }: { payment: SafePayment[], movie: SafeMovie[] }) {
    const router = useRouter();
    const [selectedStatus, setSelectedStatus] = useState<{ [key: string]: string }>({});

    const handleClickDelete = (id: string) => {
        onDeleted(id);
    };

    const onDeleted = useCallback(async (id: string) => {
        try {
            await Swal.fire({
                icon: 'warning',
                title: 'Warning',
                showDenyButton: true,
                text: 'Are you sure want to delete?',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire('Deleted successfully!', '', 'success');
                    await axios.delete(`/api/payment/paymentCard/${id}`);
                    router.refresh();
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info');
                }
            });
        } catch (error) {
            throw error;
        }
    }, [router]);

    const handleUpdateData = async () => {
        try {
            const updates = Object.entries(selectedStatus).map(([id, status]) => ({ id, status }));
            console.log('data = ', {updates})
            await axios.put('/api/payment/statusPayment', { updates });
            Swal.fire('Data updated successfully!', '', 'success');
            router.refresh();
        } catch (error) {
            throw error;
        }
    };

    const formatDateTime = (timestamp: number) => {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
        return `${formattedDate}, ${formattedTime}`;
    };

    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortOption, setSortOption] = useState('');
    const itemsPerPage = 3;

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterStatus(event.target.value);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(event.target.value);
    };

    const filteredPayments = payment.filter((pay) => {
        if (filterStatus && filterStatus !== '' && !pay.status.includes(filterStatus)) {
            return false;
        }
        if (searchQuery && !pay.userName.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }
        return true;
    });

    const sortedPayments = filteredPayments.sort((a, b) => {
        if (sortOption === 'username-asc') {
            return a.userName.localeCompare(b.userName);
        } else if (sortOption === 'username-desc') {
            return b.userName.localeCompare(a.userName);
        } else if (sortOption === 'status-asc') {
            return a.status.localeCompare(b.status);
        } else if (sortOption === 'status-desc') {
            return b.status.localeCompare(a.status);
        }
        return 0;
    });

    const displayedPayments = sortedPayments.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const totalDisplayedPayment = filteredPayments.length;

    return (
        <div className="pt-5 items-center justify-center justify-items-center pb-5">
            <div className="mx-auto mt-8 max-w-screen-lg px-2">
                <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
                    <p className="flex-1 text-base font-bold text-white">List Pembayaran</p>
                    <div className="mt-4 sm:mt-0">
                        <div className="flex items-center justify-start sm:justify-end gap-2">
                            <div className="flex items-center">
                                <label className="mr-2 flex-shrink-0 text-sm font-medium text-white">Sort by:</label>
                                <select
                                    className="block w-full whitespace-pre rounded-lg border p-1 pr-10 text-black outline-none focus:shadow sm:text-sm"
                                    value={sortOption}
                                    onChange={handleSortChange}
                                >
                                    <option value="">Recent</option>
                                    <option value="username-asc">Username (ASC)</option>
                                    <option value="username-desc">Username (DESC)</option>
                                    <option value="status-asc">Status (ASC)</option>
                                    <option value="status-desc">Status (DESC)</option>
                                </select>
                            </div>
                            <div className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-black shadow hover:bg-gray-700 hover:text-white duration-300 focus:shadow">
                                <button type="button" className="flex flex-row gap-1 items-center" onClick={handleUpdateData}>
                                    <GrUpdate className="w-4 h-4" />
                                    Update Data
                                </button>
                            </div>
                            <a
                                href="/admin/payment/paymentMethod/add"
                                className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-black shadow hover:bg-[#3B8AE5] hover:text-white duration-300 focus:shadow"
                            >
                                <button type="button" className="flex flex-row gap-1 items-center">
                                    <MdPlaylistAdd className="w-6 h-6" />
                                    Tambah Data
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-6 overflow-x-auto rounded-xl border shadow">
                    <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
                        <thead className="border-b lg:table-header-group">
                            <tr>
                                <td className="whitespace-normal py-4 text-sm font-medium text-white px-6">Nama</td>
                                <td className="whitespace-normal py-4 text-sm font-medium text-white px-6">Email</td>
                                <td className="whitespace-normal py-4 text-sm font-medium text-white px-6">Id Pembayaran</td>
                                <td className="whitespace-normal py-4 text-sm font-medium text-white px-6">Status</td>
                                <td className="whitespace-normal py-4 text-sm font-medium text-white px-6">Judul Film</td>
                                <td className="whitespace-normal py-4 text-sm font-medium text-white px-6">Waktu Mulai</td>
                                <td className="whitespace-normal py-4 text-sm font-medium text-white px-6">Waktu Selesai</td>
                                <td className="whitespace-normal py-4 text-sm font-medium text-white px-6">Harga Total</td>
                                <td className="whitespace-normal py-4 text-sm font-medium text-white px-6">Aksi</td>
                            </tr>
                        </thead>
                        <tbody className="lg:border-gray-300">
                            {displayedPayments.map((pay: any, index: any) => {
                                const matchedMovie = movie.find((mov: any) => mov.id === pay.movieId);
                                return (
                                    <tr key={index}>
                                        <td className="whitespace-no-wrap py-4 text-sm font-normal text-white table-cell">
                                            {pay.userName}
                                        </td>
                                        <td className="whitespace-no-wrap py-4 text-sm font-normal text-white px-6 table-cell">
                                            {pay.userEmail}
                                        </td>
                                        <td className="whitespace-no-wrap py-4 text-sm font-normal text-white px-6 table-cell">
                                            {pay.id}
                                        </td>
                                        <td className="whitespace-no-wrap py-4 text-sm font-normal text-white px-6 table-cell">
                                        <Select
                                                id="select-box"
                                                options={[
                                                    { value: 'pending', label: 'Pending' },
                                                    { value: 'success', label: 'Success' },
                                                    { value: 'canceled', label: 'Canceled' },
                                                ]}
                                                value={{
                                                    value: selectedStatus[pay.id] || pay.status,
                                                    label: selectedStatus[pay.id] || pay.status,
                                                }}
                                                onChange={(option: any) =>
                                                    setSelectedStatus((prev) => ({
                                                        ...prev,
                                                        [pay.id]: option?.value || '',
                                                    }))
                                                }
                                                formatOptionLabel={(option: any) => (
                                                    <div className="flex flex-row items-center gap-3 text-black duration-300">
                                                        <div>{option.label}</div>
                                                    </div>
                                                )}
                                                classNames={{
                                                    control: () => 'p-3 border-2',
                                                    input: () => 'text-lg w-[200px]',
                                                    option: () => 'text-lg',
                                                }}
                                                theme={(theme: any) => ({
                                                    ...theme,
                                                    borderRadius: 6,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary: '#ffe4e6',
                                                        primary25: '#ffe4e6',
                                                    },
                                                })}
                                            />
                                        </td>
                                        <td className="whitespace-no-wrap py-4 text-sm font-normal text-white px-6 table-cell">
                                            {matchedMovie?.title}
                                        </td>
                                        <td className="whitespace-no-wrap py-4 text-sm font-normal text-white px-2 table-cell">
                                            {formatDateTime(pay.startTime)}
                                        </td>
                                        <td className="whitespace-no-wrap py-4 text-sm font-normal text-white px-2 table-cell">
                                            {formatDateTime(pay.endTime)}
                                        </td>
                                        <td className="whitespace-no-wrap py-4 text-sm font-normal text-white table-cell">
                                            Rp {pay.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                        </td>
                                        <td className="whitespace-no-wrap py-4 text-sm font-normal text-white px-6 lg:table-cell flex flex-row gap-5">
                                            <Link className='bg-green-600 px-5 py-2 rounded-lg flex flex-row gap-2 items-center justify-center sm:mb-2' href={`/admin/payment/paymentMethod/${pay.id}/edit`}>
                                                <button className='flex flex-row gap-2 items-center justify-center'>
                                                    <FiEdit className='w-5 h-5' />Edit
                                                </button>
                                            </Link>
                                            <Link className='bg-red-600 px-5 py-2 rounded-lg flex flex-row gap-2 items-center justify-center' href='#'>
                                                <button className='flex flex-row gap-2 items-center justify-center' onClick={() => handleClickDelete(pay.id)}>
                                                    <MdDeleteForever className='w-6 h-6' />Delete
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <ReactPaginate
                        previousLabel={<FiChevronLeft />}
                        nextLabel={<FiChevronRight />}
                        breakLabel={'...'}
                        pageCount={Math.ceil(totalDisplayedPayment / itemsPerPage)}
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
        </div>
    );
}

export default PaymentList;
