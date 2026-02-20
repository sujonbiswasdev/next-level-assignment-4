import { PaymentCard } from '@/components/billingsdk/payment-card'
import React from 'react'

const PaymentPage = () => {
  return (
    <div>
      <PaymentCard title={'payment'} description={'this is payment page'} price={''}/>
    </div>
  )
}

export default PaymentPage
