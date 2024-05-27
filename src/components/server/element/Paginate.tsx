'use client'

import { useState, useEffect } from 'react';
import Pagination from 'react-paginate';

const PaginationComponent = ({ itemsPerPage, totalItems, onPageChange }: {itemsPerPage: any, totalItems: any, onPageChange: any}) => {
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setCurrentPage(0);
    }, [itemsPerPage, totalItems]);

    const handlePageChange = (data: any) => {
        setCurrentPage(data.selected);
        onPageChange(data.selected);
    };

    const pageCount = Math.ceil(totalItems / itemsPerPage);

    return (
        <Pagination
            pageCount={pageCount}
            initialPage={currentPage}
            onPageChange={handlePageChange}
            containerClassName="pagination justify-center mt-5"
            pageClassName="px-3 py-2 rounded-md hover:bg-gray-200 text-gray-700 cursor-pointer"
            activeClassName="bg-blue-500 text-white font-bold"
        />
    );
};

export default PaginationComponent;
