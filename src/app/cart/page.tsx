import Cart from "@/components/client/pages/cart/Cart"
import { getAllMovies } from "@/utils/actions/get-all-movies"
import { getAllPayment } from "@/utils/actions/get-all-payment"
import { getAllPaymentCard } from "@/utils/actions/get-all-payment-card"
import { getAllPaymentPromo } from "@/utils/actions/get-all-payment-promo"

async function page() {
    const payment = await getAllPayment()
    const movie = await getAllMovies()
    const paymentPromo = await getAllPaymentPromo()
    const paymentCard = await getAllPaymentCard()

    if (!payment) {
        return <div>
            Loading...
        </div>
    }

    return (
        <div><Cart payment={payment} movie={movie} paymentPromo={paymentPromo} paymentCard={paymentCard} /></div>
    )
}

export default page