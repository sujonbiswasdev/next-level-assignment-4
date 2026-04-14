import { IOrderUpdateStatus } from "@/components/modules/orders/customerordertable"
import { env } from "@/env"
import { ICreateorderData, IGetOrderData, TResponseOrderData } from "@/types/order/order.type"
import { Ipagination } from "@/types/pagination.type"
import { ApiErrorResponse, ApiResponse } from "@/types/response.type"
import { cookies } from "next/headers"

const api_url = env.API_URL
export const OrderService = {
    getownorder: async () => {
        try {
            const cookiestore = await cookies()
            const response = await fetch(`${api_url}/api/v1/orders`,
                {
                    headers: {
                        Cookie: cookiestore.toString(),
                    },
                    credentials: "include",
                    next: { tags: ['orderupdate'] }
                },
            )
            const body = await response.json()
            if (!response.ok) {
                const error = body as ApiErrorResponse
                return {success:error.success,message:error.message || "retrieve own orders data failed"};
            }
            return {
                success:body.success,
                message:body.message,
                data:body.data.result as TResponseOrderData[],
                pagination:body.data.pagination as Ipagination
                
            }

        } catch (error) {
            return {
                data: null,
                error: error instanceof Error ? error.message : "Unknown error"
            }
        }
    },

    updateOrderStatus: async (id: string, orderdata: IOrderUpdateStatus) => {

        try {
            const cookieStore = await cookies()
            const res = await fetch(`${api_url}/api/v1/provider/orders/${id}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(orderdata),

            });
            const data = await res.json();
            const result = data as ApiResponse<IGetOrderData>
            if (!res.ok) {
                const error =data as ApiErrorResponse
                return { success: false, message: error.message|| "order status update failed" }
            }
            return { success: result.success, message:result.message|| "order updated successfully", data:result };
        } catch (error: any) {
            console.error(error);
            return { success: false, error: error.message || "An error occurred while updating the meal" };
        }
    },
    createorder: async (orderData: ICreateorderData) => {
        const cookieStore = await cookies()
        try {
            const res = await fetch(`${api_url}/api/v1/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                credentials: "include",
                body: JSON.stringify(orderData),
            });

            const data = await res.json();
        
            if (!res.ok) {
                const error=data as ApiErrorResponse
                return { success:error.success, message:error.message || "meals create failed" }
            }
            console.log(data.data.paymentUrl,'ss')
            return { success:data.success,message:data.message,data:data.data.order as TResponseOrderData,paymentUrl:data.data.paymentUrl }
        } catch (error) {
            return { data: null, error: { message: `${error} Something Went Wrong` } };
        }
    },
    getorderbyid: async (id: string) => {
        try {
            const cookiestore = await cookies()
            const res = await fetch(`${api_url}/api/v1/orders/${id}`, {
                headers: {
                    Cookie: cookiestore.toString(),
                },
                credentials: "include",
                next: { tags: ['orderupdate'] }
            })
            const body = await res.json()
            const result = body as ApiResponse<IGetOrderData>
            if(!res.ok){
                const error =body as ApiErrorResponse
                return {success:error.success,message:error.message || "retrieve order by order failed"}
            }
            return result
        } catch (error: any) {
            return {
                data: null,
                error: error.message
            }
        }

    },
    getOwnPayment: async (id:string) => {
        try {
          const cookieStore = await cookies();
          const res = await fetch(`${api_url}/api/v1/order/${id}/own-payment`, {
            method: "GET",
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
    
          if (!res.ok) {
            const error = await res.json();
            return {
              success: false,
              message: error.message || "Failed to fetch payment information",
            };
          }
    
          const data = await res.json();
          return {
            success: true,
            data: data.data,
            message: data.message || "Fetched payment information successfully",
          };
        } catch (err: any) {
          return {
            success: false,
            message: err?.message || "Something went wrong while fetching payment info",
          };
        }
      },


}