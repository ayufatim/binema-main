'use client'

import AdminNavbar from "@/components/server/element/AdminNav"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function AddPaymentList() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, reset, register, formState: { errors } } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      const newData = {
        ...data,
        capacity: +data.capacity,
        screenResolution: +data.screenResolution,
        price: +data.price
      };

      if (isNaN(newData.capacity) || isNaN(newData.screenResolution) || isNaN(newData.price)) {
        throw new Error("Invalid numeric values provided.");
      }

      await axios.post('/api/payment/paymentPlan', newData);

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
            <h1 className="flex justify-center text-lg">Masukkan Nama Paket:</h1>
            <input
              type="text"
              placeholder='...'
              className='px-3 py-2 rounded text-black max-w-[80vw] min-w-[50vw]'
              {...register("packageName")}
            />
          </div>
          <div>
            <h1 className="flex justify-center text-lg">Masukkan Kapasitas:</h1>
            <input
              type="number"
              placeholder='...'
              className='px-3 py-2 rounded text-black max-w-[80vw] min-w-[50vw]'
              {...register("capacity")}
            />
          </div>
          <div>
            <h1 className="flex justify-center text-lg">Masukkan Resolusi Layar (inch):</h1>
            <input
              type="number"
              placeholder='...'
              className='px-3 py-2 rounded text-black max-w-[80vw] min-w-[50vw]'
              {...register("screenResolution")}
            />
          </div>
          <div>
            <h1 className="flex justify-center text-lg">Masukkan harga:</h1>
            <input
              type="number"
              placeholder='...'
              className='px-3 py-2 rounded text-black max-w-[80vw] min-w-[50vw]'
              {...register("price")}
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

export default AddPaymentList