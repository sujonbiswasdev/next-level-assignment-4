import { getownorder } from '@/actions/order.action';
import OrderTable from '@/components/modules/orders/orderTable';
import React from 'react'

const OrderHistory = async() => {

    const res = await getownorder();
      if (!res.data || res.error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
      const orders = res.data.result.result || [];
  return (
    <div>
      <OrderTable initialorder={orders}/>
    </div>
  )
}

export default OrderHistory
