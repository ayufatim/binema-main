'use client'

import "react-datepicker/dist/react-datepicker.css";
import { SafePayment } from "@/utils/types/safeData";
import { LineChart } from "../element/chart/LineChart";
import AdminNavbar from "../element/AdminNav";
import { DoughnutChart } from "../element/chart/DoughnutChart";
import { FaChartLine, FaChartPie } from "react-icons/fa";
import { useState } from "react";

const AdminHome = ({ payment }: { payment: SafePayment[] }) => {
    const [selectedMenu, setSelectedMenu] = useState('Pemasukan')

    const handleMenuPemasukan = (e: any) => {
        setSelectedMenu(e)
    }

    const handleMenuPenjualan = (e: any) => {
        setSelectedMenu(e)
    }

    return (
        <>
            <AdminNavbar />
            <div className="flex w-full h-full mt-5 px-5">
                <div className="flex w-full h-full justify-center">
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-center w-full mb-10">
                            <button onClick={() => handleMenuPemasukan('Pemasukan')} className="ml-2 px-4 py-4 bg-green-600 text-white rounded-[20px]">
                                Grafik Pemasukan <FaChartLine />
                            </button>
                            <button onClick={() => handleMenuPenjualan('Penjualan')} className="ml-2 px-4 py-4 bg-blue-600 text-white rounded-[20px]">
                                Grafik Penjualan <FaChartPie />
                            </button>
                        </div>
                        {selectedMenu === 'Pemasukan' &&
                            <div className="flex w-full items-center">
                                <LineChart payment={payment} />
                            </div>
                        }
                        {selectedMenu === 'Penjualan' &&
                        <div>
                            <DoughnutChart payment={payment}/>
                        </div> 
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminHome;
