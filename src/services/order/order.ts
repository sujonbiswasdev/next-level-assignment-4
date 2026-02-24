import { env } from "@/env"
import { ICreateOrderPayload } from "@/types/order/order"
import { cookies } from "next/headers"

const api_url = env.API_URL
export const OrderService = {
    getownorder: async () => {
        try {
            const cookiestore = await cookies()
            const response = await fetch(`${api_url}/orders`,
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
                throw new Error(`Error fetching provider meals: ${response.statusText}`);
            }
            return {
                data: body,
                error: null
            }

        } catch (error) {
            return {
                data: null,
                error: error instanceof Error ? error.message : "Unknown error"
            }
        }
    },

    updateOrderStatus: async (id: string, orderdata: any) => {
        try {
            const cookieStore = await cookies()
            const res = await fetch(`${api_url}/provider/orders/${id}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(orderdata),

            });
            const data = await res.json();
            if (!res.ok) {
                return { success: false, error: data.error.customMessage || "An error occurred while updating the meal" }
            }
            return { success: true, message: "order updated successfully", data };
        } catch (error: any) {
            console.error(error);
            return { success: false, error: error.message || "An error occurred while updating the meal" };
        }
    },
    createorder: async (orderData: ICreateOrderPayload) => {
        console.log(JSON.stringify(orderData), 'dlkjdksjfjsdatatata')
        const cookieStore = await cookies()
        try {
            const res = await fetch(`${api_url}/orders`, {
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
                return { data: null, error: data.result.data[0].message || "meals create failed" }
            }
            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: { message: `${error} Something Went Wrong` } };
        }
    },
    getorderbyid: async (id: string) => {
        try {
            const cookiestore = await cookies()
            const res = await fetch(`${api_url}/orders/${id}`, {
                headers: {
                    Cookie: cookiestore.toString(),
                },
                credentials: "include",
                next: { tags: ['orderupdate'] }
            })
            const body = await res.json()
            return {
                data: body,
                error: null
            }
        } catch (error: any) {
            return {
                data: null,
                error: error.message
            }
        }

    },


}