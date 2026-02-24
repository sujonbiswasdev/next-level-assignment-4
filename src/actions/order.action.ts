'use server'
import { OrderService } from "@/services/order/order";
import { ICreateOrderPayload } from "@/types/order/order";
import { revalidateTag } from "next/cache";

export const getownorder = async () => {
  const res = await OrderService.getownorder();
  return res;
};

export const updateorderstatus = async (id:string,data:any) => {
  const res = await OrderService.updateOrderStatus(id,data);
  revalidateTag("orderupdate",'page');
  return res;
};

export const CreateOrder = async (payload:ICreateOrderPayload) => {
  const res = await OrderService.createorder(payload);
  revalidateTag("orderupdate",'page');
  return res;
};


export const getsingleorder=async(params?:any)=>{
  const res= await OrderService.getorderbyid(params)
  return res
  
}
