import { env } from "@/env";
import { IGetMealData } from "@/types/meals.type";
import { TResponseOrderData } from "@/types/order/order.type";
import { Ipagination } from "@/types/pagination.type";
import { TResponsePayment } from "@/types/payment.type";
import { TUser } from "@/types/user.type";
import { cookies } from "next/headers";
const API_BASE_URL = env.BACKEND_URL;
if (!API_BASE_URL) {
  throw new Error(
    "API_BASE_URL is not defined. Please check your environment variables.",
  );
}

export const PaymentService = {
  getAllPayments: async (params?: Record<string, any>) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_BASE_URL}/api/v1/payments?${params}`);
      if (params) {
        Object.keys(params).forEach((key) => {
          if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, String(params[key]));
          }
        });
      }

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
      });
      // Remove merge conflict markers and duplicate/console.log/data lines, use only the correct code:
      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Failed to fetch payments",
          data: null,
        };
      }

      return {
        success: true,
        data: data.data.payments as TResponsePayment<{
          meal: IGetMealData;
          order: TResponseOrderData;
          user: TUser;
        }>[],
        pagination: data.data.pagination as Ipagination,
        message: data.message || "Payments fetched successfully",
      };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || "Something went wrong while fetching payments",
        data: null,
      };
    }
  },
  updatePaymentStatus: async (paymentId: string, status: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_BASE_URL}/api/v1/payments/${paymentId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Failed to update payment status",
          data: null,
        };
      }

      return {
        success: true,
        data: data.data,
        message: data.message || "Payment status updated successfully",
      };
    } catch (err: any) {
      return {
        success: false,
        message:
          err?.message || "Something went wrong while updating payment status",
        data: null,
      };
    }
  },
  deletePayment: async (paymentId: string) => {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${API_BASE_URL}/api/v1/payments/${paymentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || "Failed to delete payment",
                data: null,
            };
        }

        return {
            success: true,
            data: data.data,
            message: data.message || "Payment deleted successfully",
        };
    } catch (err: any) {
        return {
            success: false,
            message: err?.message || "Something went wrong while deleting payment",
            data: null,
        };
    }
},
};
