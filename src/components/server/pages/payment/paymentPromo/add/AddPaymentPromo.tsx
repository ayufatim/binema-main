'use client'

import AdminNavbar from "@/components/server/element/AdminNav"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";

function AddPaymentPromo() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const { handleSubmit, reset, register, formState: { errors } } = useForm<FieldValues>();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        const formattedUsableDate = moment(data.usable).format('YYYY-MM-DDTHH:mm:ssZ');
        const formattedExpiredDate = moment(data.expired).format('YYYY-MM-DDTHH:mm:ssZ');
        data.usable = formattedUsableDate;
        data.expired = formattedExpiredDate
        data.priceDisc = parseInt(data.priceDisc);

        try {
            await axios.post('/api/payment/paymentPromo', data);

            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Added successfully!',
            });
            router.push('/admin/payment');
            router.refresh();
            reset();
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something wrong!',
            });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <AdminNavbar />
            <h1 className='flex justify-center text-[35px] pt-5'>Tambah Data</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col p-5 justify-center items-center gap-5 h-fit">
                    <div>
                        <h1 className="flex justify-center text-lg">Masukkan Kode Promo:</h1>
                        <input
                            type="text"
                            placeholder='...'
                            className='px-3 py-2 rounded text-black max-w-[80vw] min-w-[50vw]'
                            {...register("promoCode")}
                        />
                    </div>
                    <div>
                        <h1 className="flex justify-center text-lg">Masukkan Harga Promo:</h1>
                        <input
                            type="number"
                            placeholder='...'
                            className='px-3 py-2 rounded text-black max-w-[80vw] min-w-[50vw]'
                            {...register("priceDisc")}
                        />
                    </div>
                    <div>
                        <h1 className="flex justify-center text-lg">Masukkan Tanggal Berlaku:</h1>
                        <input
                            type="datetime-local"
                            placeholder='...'
                            className='px-3 py-2 rounded text-black max-w-[80vw] min-w-[50vw]'
                            {...register("usable")}
                        />
                    </div>
                    <div>
                        <h1 className="flex justify-center text-lg">Masukkan Tanggal Kadaluarsa:</h1>
                        <input
                            type="datetime-local"
                            placeholder='...'
                            className='px-3 py-2 rounded text-black max-w-[80vw] min-w-[50vw]'
                            {...register("expired")}
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
    )
}

export default AddPaymentPromo