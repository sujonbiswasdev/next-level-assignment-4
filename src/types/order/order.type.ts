import { CreateorderData } from "@/validations/order.validation";
import { IGetMealData} from "../meals.type";
import z from "zod";
import { IProviderInfo } from "../provider.type";

export interface IOrderItem {
  mealId: string;
  price: number;
  quantity: number;
}

// create orderdata type
export type ICreateorderData=z.infer<typeof CreateorderData>

// get own order data
export interface IGetOrderData {
  id: string;
  customerId: string;
  providerId: string;
  first_name: string;
  last_name: string;
  status: string;
  totalPrice: number;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  orderitem: {
    id:string,
    mealId:string,
    orderId:string,
    price:number,
    quantity:number,
    meal:IGetMealData,
    createdAt:string,
    updatedAt:string
  }[];
  provider?:IProviderInfo

}