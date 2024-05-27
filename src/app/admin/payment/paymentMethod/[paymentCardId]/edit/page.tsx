import EditPaymentCard from "@/components/server/pages/payment/paymentMethod/edit/EditPaymentCard"
import getPaymentCardById from "@/utils/actions/get-payment-card-byid"

interface IParams {
    paymentCardId: string
}

const page = async({params}: {params: IParams}) => {
    const paymentCard = await getPaymentCardById(params)

    if(!paymentCard) {
        return <div>
            loading...
        </div>
    }

    return (
        <div><EditPaymentCard paymentCard={paymentCard}/></div>
    )
}

export default page