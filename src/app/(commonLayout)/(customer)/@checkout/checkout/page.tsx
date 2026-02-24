import { PaymentCard } from "@/components/billingsdk/payment-card"


export default async function CheckoutPage() {
  return (
    <div className="min-h-screen p-10">
      <PaymentCard title={'payment'} description={'this is payment page'} price={''}/>
    </div>
  )
}