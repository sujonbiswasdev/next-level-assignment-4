import { getownorder } from '@/actions/order.action';
import OrderTable from '@/components/modules/orders/orderTable';
import Notfounddata from '@/components/Notfounddata';
import { TResponseOrderData } from '@/types/order/order.type';
import { Ipagination } from '@/types/pagination.type';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import React from 'react'
import { getSession } from '@/services/auth.service';

const OrderHistory = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const userinfo=await getSession()
  if (!userinfo || !userinfo.data || !userinfo.data.role) {
    return (
      <ErrorBoundary>
        <Notfounddata content="You must be logged in to view your orders." btntext="dashboard" path="/provider/dashboard" emoji="📦" />
      </ErrorBoundary>
    );
  }
  const role = userinfo.data.role;
  const search=await searchParams
  const res = await getownorder(search);
  if (!res.data || !res.success) {
    return (
      <Notfounddata content='No orders found.' btntext='dashboard' path='/provider/dashboard' emoji="📦" />
    );
  }
  const orders = res.data as TResponseOrderData[];
  const pagination = res.pagination as Ipagination;

  return (
    <div>
      <React.Suspense fallback={<div>Loading orders...</div>}>
        <ErrorBoundary fallback={<div>Something went wrong loading your orders.</div>}>
          <OrderTable  role={role as string} pagination={pagination} initialorder={orders} />
        </ErrorBoundary>
      </React.Suspense>
    </div>
  );
};

export default OrderHistory
