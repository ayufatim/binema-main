import AdminNavbar from "@/components/server/element/AdminNav"
import AdminPayment from "@/components/server/pages/payment/AdminPayment"
import { getAllMovies } from "@/utils/actions/get-all-movies"
import { getAllPayment } from "@/utils/actions/get-all-payment"
import { getAllPaymentCard } from "@/utils/actions/get-all-payment-card"
import { getAllPaymentPlan } from "@/utils/actions/get-all-payment-plan"
import { getAllPaymentPromo } from "@/utils/actions/get-all-payment-promo"

async function page() {
    const paymentPlan = await getAllPaymentPlan()
    const paymentCard = await getAllPaymentCard()
    const paymentPromo = await getAllPaymentPromo()
    const payment = await getAllPayment()
    const movie = await getAllMovies()

    if (!paymentPlan || !paymentCard || !paymentPromo || !payment || !movie) {
        return <div>
            Loading...
        </div>
    }

    return (
        <div className="bg-[#333] min-h-screen">
            <AdminNavbar />
            <AdminPayment paymentPlan={paymentPlan} paymentCard={paymentCard} paymentPromo={paymentPromo} payment={payment} movie={movie}/>
        </div>
    )
}

export default page