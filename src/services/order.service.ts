import { IOrderUpdateStatus } from "@/components/modules/orders/customerordertable"
import { env } from "@/env"
import { ICreateorderData, IGetOrderData } from "@/types/order/order.type"
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
            const result = body as ApiResponse<IGetOrderData[]>
            if (!response.ok) {
                const error = body as ApiErrorResponse
                return {success:error.success,message:error.message || "retrieve own orders data failed"};
            }
            return result

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
            const result = data as ApiResponse<IGetOrderData>
            if (!res.ok) {
                const error=data as ApiErrorResponse
                return { success:error.success, message:error.message || "meals create failed" }
            }
            return { success:result.success,message:result.message,data:result }
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


}