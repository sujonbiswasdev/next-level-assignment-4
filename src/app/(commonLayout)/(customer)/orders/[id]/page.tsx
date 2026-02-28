import OrderDetails from '@/components/modules/orders/orderdetails';
import NotFound from '@/components/Notfound';
import { OrderService } from '@/services/order/order';

export async function generateStaticParams() {
  const  data  = await OrderService.getownorder();
      if (!data.data || data.error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load own order
      </div>
    );
  }
  
  if(!Array.isArray(data)){
    return []
  }
   return data.data?.map((item:any) => ({ id: item.id })).splice(0, 3);
}
const OrderDetailsPage = async({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {

      const { id } = await params;
      const res = await OrderService.getorderbyid(id);
      if (!res?.data || res.error) return NotFound();
    
      const order = res.data;

    return (
        <div>
            <OrderDetails orderdetails={order}/>
        </div>
    )
}

export default OrderDetailsPage