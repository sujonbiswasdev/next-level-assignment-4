import { getownorder } from '@/actions/order.action';
import OrderTable from '@/components/modules/orders/orderTable';
import React from 'react'

const OrderHistory = async() => {

    const res = await getownorder();
      const orders = res.data.result.result || [];
  return (
    <div>
      <OrderTable initialorder={orders}/>
    </div>
  )
}

export default OrderHistory
