'use client'

import { SafePayment } from "@/utils/types/safeData"
import { useState } from "react"
import { FaBell } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"

import { format } from 'date-fns';

export const formatDate = (dateString: any) => {
  const date = new Date(dateString);

  const formattedDate = format(date, 'HH:mm:ss dd MMM yyyy');

  return formattedDate;
};

function NotificationNav({ pay }: { pay: SafePayment[] }) {
  const [openNotif, setOpenNotif] = useState(false)

  const handleOpenNotif = () => {
    setOpenNotif(prevState => !prevState)
  }

  return (
    <div className="">
      <FaBell className="w-[30px] h-[30px] duration-300 hover:text-[#d4b60f]" onClick={() => handleOpenNotif()} />
      {openNotif && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10" onClick={handleOpenNotif}></div>
          <div className="absolute cursor-default top-[50vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50vw] h-auto p-5 rounded-[20px] bg-gray-900 z-20">
            <h1 className="text-lg text-center">Notification</h1>
            <IoMdClose
              className="absolute top-5 right-5 w-[30px] h-[30px] cursor-pointer"
              onClick={() => handleOpenNotif()}
            />
            <div className="flex flex-col gap-10 mt-10 items-center">
              {pay.map((payment: any, index: any) => (
                <div key={index} className="flex flex-col items-center">
                  <h1 className="text-lg mb-2">Pembayaran Berhasil!</h1>
                  <div className="flex flex-col text-sm items-center">
                    <span>Detail pembayaran anda telah dikirim ke email {payment.userEmail}</span>
                    <span>id transaksi = {payment.id}</span>
                    <span className="block">tanggal pemesanan = {formatDate(payment.createdAt.toString())}</span>
                    <span>Cek email anda untuk melihat slip pembayaran</span>
                    <a href="https://mail.google.com" target="blank">
                      <button className="flex border-2 border-white px-5 py-2 rounded-lg w-fit h-fit mt-2 duration-200 hover:bg-white hover:text-gray-900">
                        Cek Email
                      </button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default NotificationNav