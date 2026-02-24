"use client";

import Link from "next/link";
import { useState } from "react";
import { Pen, X } from "lucide-react";
import { toast } from "react-toastify";
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status";
import { updateorderstatus } from "@/actions/order.action";

interface CustomerOrderTableProps {
  initialorder: any[];
}

const CustomerOrderTable = ({ initialorder }: CustomerOrderTableProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [orders, setOrders] = useState(initialorder);
  const [status, setStatus] = useState({ status: "" });
  console.log(orders, 'orddjfkldjfkldsjfdsjfdordrer')

  const handleUpdate = async (id: string, data: any) => {
    try {
      const res = await updateorderstatus(id, data);
      if (res?.error) {
        toast.error(res.error || "Order status update failed");
        return;
      }

      toast.success("Order status updated successfully");

      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: status.status } : order
        )
      );

      setEditingId(null);
      setStatus({ status: "" });
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="w-full px-4 md:px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Orders Management
        </h1>
        <div className="text-sm text-gray-500">
          Total Orders: {orders.length}
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white">
        <table className="min-w-[1100px] w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
            <tr>
              {[
                "SL",
                "orderid",
                "Providerid",
                "Status",
                "Total ($)",
                "Qty",
                "Category",
                "Address",
                "Created",
                "Actions",
              ].map((head) => (
                <th key={head} className="px-6 py-4 text-left whitespace-nowrap">
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-500">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">
                    <Link
                      href={`/orders/${item.id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {item.providerId.slice(0, 8)}...
                    </Link>
                  </td>

                  <td className="px-6 py-4">
                    <Link
                      href={`/providers/${item.providerId}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {item.providerId.slice(0, 8)}...
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <Status
                      variant={
                        item.status === "PLACED"
                          ? "success"
                          : item.status === "READY"
                            ? "warning"
                            : "error"
                      }
                      className="px-3 py-1 rounded-full"
                    >
                      <StatusIndicator />
                      <StatusLabel>{item.status}</StatusLabel>
                    </Status>
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-800">
                    ${item.totalPrice}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {item.orderitem.reduce((acc: number, meal: any) => acc + meal.quantity, 0)}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {item.orderitem[0]?.meal?.category_name}
                  </td>

                  <td className="px-6 py-4 text-gray-500 max-w-[200px] truncate">
                    {item.address}
                  </td>

                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    {editingId === item.id ? (
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          placeholder="Update status"
                          className="border rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                          value={status.status}
                          onChange={(e) =>
                            setStatus({ status: e.target.value })
                          }
                        />

                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleUpdate(item.id, status)
                            }
                            className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-700 transition"
                          >
                            Save
                          </button>

                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-200 p-1 rounded-lg hover:bg-gray-300 transition"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <Pen
                        size={16}
                        className="text-blue-600 cursor-pointer hover:scale-110 transition"
                        onClick={() => setEditingId(item.id)}
                      />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={10}
                  className="text-center py-12 text-gray-400 text-sm"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerOrderTable;