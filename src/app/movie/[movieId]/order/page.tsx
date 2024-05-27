import Order from "@/components/client/pages/order/Order"
import { getAllPaymentCard } from "@/utils/actions/get-all-payment-card";
import { getAllPaymentPlan } from "@/utils/actions/get-all-payment-plan";
import { getAllPaymentPromo } from "@/utils/actions/get-all-payment-promo";
import getMovieById from "@/utils/actions/get-movie-byid";
import getPaymentPromoById from "@/utils/actions/get-payment-promo-byid";

interface IParams {
    movieId?: string
}

const page = async ({ params }: { params: IParams }) => {
    const movie = await getMovieById(params);
    const paymentPlan = await getAllPaymentPlan()
    const paymentCard = await getAllPaymentCard()
    const paymentPromo = await getAllPaymentPromo()

    if (!movie || !paymentPlan || !paymentCard || !paymentPromo) {
        return <div>
            Loading...
        </div>
    }

    return (
        <div><Order movie={movie} paymentPlan={paymentPlan}/></div>
    )
}

export default page