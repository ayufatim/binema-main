'use client'

import { MdDateRange } from 'react-icons/md';
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';

interface DateTimeInputProps {
    dateValue: Date;
    dateOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({ dateValue, dateOnChange }) => {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const formatDateTime = (date: Date): string => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        };

        setFormattedDate(formatDateTime(dateValue));
    }, [dateValue]);

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDateTime = event.target.value;
        const currentDateTime = new Date();

        const selectedDateTimeMs = new Date(selectedDateTime).getTime();
        const currentDateTimeMs = currentDateTime.getTime();

        if (isNaN(selectedDateTimeMs)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Date!',
                text: 'Please select a valid date and time.',
                confirmButtonColor: '#3085d6',
            });
        } else if (selectedDateTimeMs < currentDateTimeMs) {
            Swal.fire({
                icon: 'error',
                title: 'Waktu telah terlewat!',
                text: 'Pilih waktu dengan benar!',
                confirmButtonColor: '#3085d6',
            });
        } else {
            dateOnChange(event);
        }
    };

    return (
        <div className="relative">
            <div className="absolute flex items-center pl-3 pt-3 pointer-events-none">
                <MdDateRange className="w-5 h-5 text-gray-600" />
            </div>
            <input
                type="datetime-local"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                value={formattedDate}
                onChange={handleTimeChange}
                required
            />
        </div>
    );
};

export default DateTimeInput;
