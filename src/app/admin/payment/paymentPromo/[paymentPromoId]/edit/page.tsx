import EditPaymentPromo from "@/components/server/pages/payment/paymentPromo/edit/EditPaymentPromo"
import getPaymentPromoById from "@/utils/actions/get-payment-promo-byid"

interface IParams {
    paymentPromoId: string
}

async function page({params}: {params: IParams}) {
    const paymentPromo = await getPaymentPromoById(params)

    if(!paymentPromo) {
        return <div>
            Loading...
        </div>
    }

    return (
        <div><EditPaymentPromo paymentPromo={paymentPromo}/></div>
    )
}

export default page