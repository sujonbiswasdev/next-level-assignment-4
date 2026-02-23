'use server'
import { OrderService } from "@/services/order/order";
import next from "next";
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
