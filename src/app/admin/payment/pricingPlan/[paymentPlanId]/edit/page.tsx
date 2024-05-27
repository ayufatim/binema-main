import EditPricingPlan from '@/components/server/pages/payment/pricingPlan/edit/EditPricingPlan'
import getPaymentPlanById from '@/utils/actions/get-payment-plan-byId'

interface IParams {
  paymentPlanId?: string
}

const page = async ({ params }: { params: IParams }) => {
  const paymentPlan = await getPaymentPlanById(params)

  if (!paymentPlan) {
    return <div>
      Loading...
    </div>
  }

  return (
    <div>
      <EditPricingPlan paymentPlan={paymentPlan} />
    </div>
  )
}

export default page