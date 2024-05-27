import { SafePayment } from '@/utils/types/safeData';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useState, useMemo, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import debounce from 'lodash.debounce';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Pemasukan',
            color: 'white'
        },
    },
    scales: {
        x: {
            ticks: {
                color: 'white',
            },
        },
        y: {
            ticks: {
                color: 'white',
            },
        },
    }
};

const formatDate = (date: Date, options: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

export function LineChart({ payment }: { payment: SafePayment[] }) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const debouncedSetStartDate = useCallback(debounce((date: Date | null) => setStartDate(date), 300), []);
    const debouncedSetEndDate = useCallback(debounce((date: Date | null) => setEndDate(date), 300), []);

    const filterPaymentsByDate = useCallback((payments: SafePayment[], startDate: Date, endDate: Date) => {
        return payments.filter(payment => {
            const paymentDate = new Date(payment.startTime);
            return paymentDate >= startDate && paymentDate <= endDate;
        });
    }, []);

    const aggregatePayments = useCallback((payments: SafePayment[], labels: string[], startDate: Date, endDate: Date) => {
        const aggregatedData = Array(labels.length).fill(0);
        const totalDuration = endDate.getTime() - startDate.getTime();
        const labelDuration = totalDuration / labels.length;

        payments.forEach(payment => {
            const paymentDate = new Date(payment.startTime);
            if (startDate && endDate) {
                const index = Math.floor((paymentDate.getTime() - startDate.getTime()) / labelDuration);
                if (index >= 0 && index < aggregatedData.length) {
                    aggregatedData[index] += payment.totalPrice;
                }
            }
        });

        return aggregatedData;
    }, []);

    const updateLabels = useMemo(() => {
        if (startDate && endDate) {
            const diffInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
            let labels = [];

            if (diffInDays < 7) {
                let currentDate = new Date(startDate);
                while (currentDate <= endDate) {
                    labels.push(formatDate(currentDate, { month: 'short', day: 'numeric' }));
                    currentDate.setDate(currentDate.getDate() + 1);
                }
            } else if (diffInDays < 30) {
                let currentDate = new Date(startDate);
                while (currentDate <= endDate) {
                    labels.push(`Week ${Math.ceil((currentDate.getDate() - 1) / 7 + 1)}`);
                    currentDate.setDate(currentDate.getDate() + 7);
                }
            } else if (diffInDays < 365) {
                let currentDate = new Date(startDate);
                while (currentDate <= endDate) {
                    labels.push(formatDate(currentDate, { month: 'long' }));
                    currentDate.setMonth(currentDate.getMonth() + 1);
                }
            } else {
                let currentDate = new Date(startDate);
                while (currentDate <= endDate) {
                    labels.push(formatDate(currentDate, { year: 'numeric' }));
                    currentDate.setFullYear(currentDate.getFullYear() + 1);
                }
            }

            return labels;
        }
        return [];
    }, [startDate, endDate]);

    const filteredPayments = useMemo(() => {
        if (startDate && endDate) {
            return filterPaymentsByDate(payment, startDate, endDate);
        }
        return [];
    }, [payment, startDate, endDate, filterPaymentsByDate]);

    const data = useMemo(() => {
        if (startDate && endDate) {
            return {
                labels: updateLabels,
                datasets: [
                    {
                        label: 'Total harga tiket terjual',
                        data: aggregatePayments(filteredPayments, updateLabels, startDate, endDate),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        color: 'white'
                    },
                ],
            };
        }
        return {
            labels: [],
            datasets: [],
        };
    }, [filteredPayments, updateLabels, startDate, endDate, aggregatePayments]);

    const resetDates = () => {
        setStartDate(null);
        setEndDate(null);
    };

    return (
        <>
            <div className='flex flex-col items-center'>
                <div className="flex flex-col sm:flex-row date-picker-container text-black mb-5 gap-2">
                    <DatePicker
                        selected={startDate}
                        onChange={(date: Date | null) => debouncedSetStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText={`Start Date`}
                        className='p-5 rounded-[20px]'
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={(date: Date | null) => debouncedSetEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        placeholderText="End Date"
                        className='p-5 text-end rounded-[20px]'
                    />
                    <button onClick={resetDates} className="ml-2 px-4 py-2 bg-red-500 text-white rounded-[20px]">
                        Clear Date
                    </button>
                </div>
                <div className='flex justify-center items-center bg-gray-800 p-10 rounded-[20px]'>
                    <div className='w-[80vw] h-fit sm:h-fit md:w-fit lg:w-[50vw] lg:h-fit'>
                        <Line options={options} data={data} />
                    </div>
                </div>
            </div>
        </>
    );
}
