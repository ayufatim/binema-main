'use client'

import BackButton from "@/components/global/property/BackButton";
import { SafePayment, SafePaymentCard } from "@/utils/types/safeData"

function CartDetail({ payment, paymentCard }: { payment: SafePayment, paymentCard: SafePaymentCard[] }) {
    const matchedCard = paymentCard.find(card => card.nameCard === payment.methodPayment);

    return (
        <div className="flex w-full min-h-screen bg-gray-900">
            <BackButton/>
            <div className="flex w-full h-full mt-10 justify-center items-center">
                <div className="flex flex-col items-center border-2 border-white px-20 py-5 rounded-lg">
                    <h1 className="text-[30px]">Pembayaran</h1>
                    <div className="flex flex-col items-center pt-4">
                        <img
                            src={matchedCard?.imageCard || ''}
                            alt={matchedCard?.nameCard}
                            loading="lazy"
                            className="w-[100px] h-fit flex animate-bounce rounded-lg"
                        />
                    </div>
                    <div>
                        <div className="flex flex-col justify-center items-center px-3 pt-3 bg-[#20344c] rounded-[20px] w-fit h-fit">
                            <div className="flex p-10 bg-white w-fit h-fit rounded-[20px]">
                                <img
                                    src={matchedCard?.imageQR || ''}
                                    alt={matchedCard?.nameCard}
                                    loading="lazy"
                                    className="w-[150px] h-fit w-fit"
                                />
                            </div>
                            <span className="flex py-3 font-medium">Scan to pay</span>
                        </div>
                    </div>
                    <span className="flex my-5">atau</span>
                    <div className="flex flex-col items-center">
                        <h1 className="flex mb-2">Transfer rekening</h1>
                        <span className="flex bg-[#20344c] py-2 px-20 rounded-[20px]">{matchedCard?.numberCard}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartDetail