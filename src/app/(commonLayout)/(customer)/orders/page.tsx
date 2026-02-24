import { getownorder } from '@/actions/order.action';
import CustomerOrderTable from '@/components/modules/orders/customerordertable'
import React from 'react'

const MyOrders =async () => {
     const res = await getownorder();
          const orders = res.data.result.result || [];
  return (
    <div className=''>
     <CustomerOrderTable initialorder={orders}/>
    </div>
  )
}

export default MyOrders
