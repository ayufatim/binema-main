import CartDetail from "@/components/client/pages/cart/cartDetail/CartDetail"
import { getAllPaymentCard } from "@/utils/actions/get-all-payment-card"
import getPaymentById from "@/utils/actions/get-payment-byid"

interface IParams {
    paymentId: string
}

async function page({params}: {params: IParams}) {
    const payment = await getPaymentById(params)
    const paymentCard = await getAllPaymentCard()

    if(!payment) {
        return <div>
            Loading...
        </div>
    }

    return (
        <div>
            <CartDetail payment={payment} paymentCard={paymentCard}/>
        </div>
    )
}

export default page