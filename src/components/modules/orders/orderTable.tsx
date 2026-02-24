"use client";
import Link from "next/link";
import { MouseEventHandler, useState } from "react";
import { Eye, Pen, Trash, X } from "lucide-react";
import { toast } from "react-toastify";
import { OrderStatsData } from "@/types/order/orderstats";
import { OrderType } from "@/types/order/orderTable";
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status";
import { updateorderstatus } from "@/actions/order.action";

const columns = [
    { key: "serialNumber", label: "SL" },
    { key: "providerId", label: "ProviderId" },
    { key: "mealId", label: "MealId" },
    { key: "status", label: "Order Status" },
    { key: "totalPrice", label: "Total ($)" },
    { key: "quantity", label: "Qty" },
    { key: "categoryName", label: "Category" },
    { key: "address", label: "Delivery Address" },
    { key: "createdAt", label: "createdAt" },
    { key: "actions", label: "Actions" },
];

const OrderTable = ({ initialorder }: { initialorder: any[] }) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [meals, setMeals] = useState(initialorder);
    const [status, setstatus] = useState({ status: "" })
    const handleUpdate = async (id: string, data: any) => {
        try {
            setEditingId(id)
            const res = await updateorderstatus(id, data)
            if (res.error) {
                toast.error(res.error || 'order status update failed')
                return
            }
            toast.success(`Meal deleted successfully.`);
            setMeals((prevMeals) =>
                prevMeals.map((meal) =>
                    meal.id === id
                        ? { ...meal, status: status.status }
                        : meal
                )
            );
            setstatus({ status: "" })
        } catch (error: any) {
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-2xl md:text-4xl font-bold mb-8 text-gray-800">
                🍽 Orders Management
            </h1>

            <div className="overflow-auto rounded-xl shadow-lg border border-gray-200 bg-white">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key} className="px-4 py-2 whitespace-nowrap">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-[12px]">
                        {meals.length > 0 ? (
                            meals.map((item: any, index: number) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 transition duration-200"
                                >
                                    <td className="px-4 py-2 font-medium text-gray-600">
                                        {index + 1}
                                    </td>

                                    <td className="px-4 py-2">
                                        <Link href={`/providers/${item.providerId}`}>{item.providerId.slice(0, 10) + '....'}</Link>
                                    </td>

                                    <td className="px-4 py-2">
                                        <Link href={`/meals/${item.orderitem[0].mealId}`}>{item.orderitem[0].mealId.slice(0, 10) + '....'}</Link>
                                    </td>
                                    <td className="px-4 py-0.5">
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-sm font-semibold ${item.status
                                                }`}
                                        >
                                            {item.status ? (<Status variant="success" className="bg-green-400 text-white">
                                                <StatusIndicator />
                                                <StatusLabel >{item.status}</StatusLabel>
                                            </Status>) : (<Status variant="error" className="bg-red-400 text-white">
                                                <StatusIndicator />
                                                <StatusLabel>{item.status}</StatusLabel>
                                            </Status>)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800">
                                        {item.totalPrice}
                                    </td>

                                    <td className="px-4 py-2 text-gray-600">
                                        {item.orderitem[0].quantity}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.orderitem[0].meal.category_name}
                                    </td>

                                    <td className="px-4 py-2 text-[12px] text-gray-600">
                                        {item.address}
                                    </td>





                                    <td className="px-4 py-2">
                                        {item.createdAt as any}
                                    </td>

                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-4">
                                            {item.id == editingId ? (
                                                <div className="flex flex-col items-center justify-center">
                                                    <input className=" border-2 max-w-[70px] shadow-sm px-2 py-1" type="text"
                                                        placeholder="status...."
                                                        value={status.status}
                                                        onChange={(e) =>
                                                            setstatus({ ...status, status: e.target.value })
                                                        }
                                                    />
                                                    <div className="flex flex-wrap items-center justify-center gap-1">
                                                        <button className="cursor-pointer shadow-sm p-1 rounded-sm" onClick={() => {
                                                            handleUpdate(item.id, status)
                                                            setEditingId('')
                                                        }
                                                        }>click</button>
                                                        <button className="mt-0.5" onClick={() => setEditingId('')}>< X className="w-[15px] cursor-pointer shadow-sm p-1 rounded-sm" /></button>
                                                    </div>
                                                </div>
                                            ) : <Pen className="cursor-pointer w-[15px] text-blue-600" onClick={() => setEditingId(item.id)} />}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center py-10 text-gray-500"
                                >
                                    No meals found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderTable;