'use client';

import React, { useState } from "react";
import PaymentList from "./paymentList/PaymentList";
import PaymentPromo from "./paymentPromo/PaymentPromo";
import PricingPlan from "./pricingPlan/PricingPlan";
import { SafeMovie, SafePayment, SafePaymentCard, SafePaymentPlan, SafePaymentPromo } from "@/utils/types/safeData";
import PaymentMethod from "./paymentMethod/PaymentMethod";

function AdminPayment({ paymentPlan, paymentCard, paymentPromo, payment, movie }: { paymentPlan: SafePaymentPlan[], paymentCard: SafePaymentCard[], paymentPromo: SafePaymentPromo[], payment: SafePayment[], movie: SafeMovie[] }) {
    const [selectedMenu, setSelectedMenu] = useState('Payment List');

    const handleMenu = (menu: any) => {
        setSelectedMenu(menu);
    }

    return (
        <div className="z-10">
            <div className="flex flex-row w-full justify-between">
                <a
                    href="#"
                    onClick={() => handleMenu('Payment List')}
                    className={`w-full text-center text-sm py-3 duration-300 ${selectedMenu === 'Payment List' ? 'bg-blue-400' : 'bg-gray-500'}`}
                >
                    Histori
                </a>
                <a
                    href="#"
                    onClick={() => handleMenu('Add Code')}
                    className={`w-full text-center text-sm py-3 duration-300 ${selectedMenu === 'Add Code' ? 'bg-red-400' : 'bg-gray-500'}`}
                >
                    Tambah Kode
                </a>
                <a
                    href="#"
                    onClick={() => handleMenu('Add Pricing')}
                    className={`w-full text-center text-sm py-3 duration-300 ${selectedMenu === 'Add Pricing' ? 'bg-green-600' : 'bg-gray-500'}`}
                >
                    Tambah Pembayaran
                </a>
                <a
                    href="#"
                    onClick={() => handleMenu('Add Method')}
                    className={`w-full text-center text-sm py-3 duration-300 ${selectedMenu === 'Add Method' ? 'bg-green-600' : 'bg-gray-500'}`}
                >
                    Tambah Metode
                </a>
            </div>
            <div className="bg-[#333] w-full justify-center">
                {selectedMenu === 'Payment List' && <PaymentList payment={payment} movie={movie}/>}
                {selectedMenu === 'Add Code' && <PaymentPromo paymentPromo={paymentPromo} />}
                {selectedMenu === 'Add Pricing' && <PricingPlan paymentPlan={paymentPlan} />}
                {selectedMenu === 'Add Method' && <PaymentMethod paymentCard={paymentCard} />}
            </div>
        </div>
    );
}

export default AdminPayment;
