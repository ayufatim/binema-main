'use client'

import AdminNavbar from "@/components/server/element/AdminNav"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";
import ImageUpload from "@/components/server/element/inputs/ImageUpload";

function AddPaymentCard() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('')

    const { handleSubmit, reset, register, setValue, watch, formState: { errors } } = useForm<FieldValues>();

    let imageCard = watch('imageCard')
    let imageQR = watch('imageQR')

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        try {
            console.log(data)
            await axios.post('/api/payment/paymentCard', data);

            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Movie added successfully!',
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
                        <h1 className="flex justify-center text-lg">Masukkan Nama Kartu:</h1>
                        <input
                            type="text"
                            placeholder='ex : BRI'
                            className='px-3 py-2 rounded text-black max-w-[80vw] min-w-[50vw]'
                            {...register("nameCard")}
                        />
                    </div>
                    <div>
                        <h1 className="flex justify-center text-lg">Masukkan Nomor Kartu:</h1>
                        <input
                            type="text"
                            placeholder='...'
                            className='px-3 py-2 rounded text-black max-w-[80vw] min-w-[50vw]'
                            {...register("numberCard")}
                        />
                    </div>
                    <h1 className="flex justify-center text-lg">Pilih Jenis Kartu:</h1>
                    <Select
                        placeholder="Pilih Jenis Kartu"
                        isClearable
                        id='select-box'
                        instanceId="select-box"
                        aria-label="title"
                        options={[{ value: 'Bank', label: 'Bank' }, { value: 'E-Wallet', label: 'E-Wallet' }]}
                        value={selectedCategory}
                        onChange={(option) => {
                            setSelectedCategory(option)
                            setValue('categoryInstitue', option?.label || '');
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
                    <div>
                        <h1 className="flex justify-center text-lg">Gambar Kartu :</h1>
                        <ImageUpload
                            value={imageCard}
                            onChange={(value: any) => setCustomValue('imageCard', value)}
                        />
                    </div>
                    <div>
                        <h1 className="flex justify-center text-lg">Gambar QR Code (Opsional) :</h1>
                        <ImageUpload
                            value={imageQR}
                            onChange={(value: any) => setCustomValue('imageQR', value)}
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

export default AddPaymentCard