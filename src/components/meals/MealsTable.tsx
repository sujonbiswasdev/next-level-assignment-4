"use client";
import Link from "next/link";
import { Button } from "../ui/button copy";
import { useState } from "react";
import { Status, StatusIndicator, StatusLabel } from "../ui/status";
import { Eye, Pen, Trash } from "lucide-react";
import { toast } from "react-toastify";

const columns = [
    { key: "id", label: "ID" },
    { key: "image", label: "Image" },
    { key: "meals_name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "price", label: "Price" },
    { key: "category_name", label: "Category" },
    { key: "cuisine", label: "Cuisine" },
    { key: "isAvailable", label: "Available" },
    { key: "actions", label: "Actions" },
];

const MealTable = ({ initialmeals }: { initialmeals: any[] }) => {
    const [meals, setMeals] = useState(initialmeals);
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this meal?")) return;

        try {
            const res = await fetch(`http://localhost:5000/api/provider/meals/${id}`,
                { method: "DELETE", credentials: "include" });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || "Failed to delete meal.");
            }
            setMeals(meals.filter((meal: any) => meal.id !== id));
            toast.success(data.message || "Meal deleted successfully.");
        } catch (error: any) {
            toast.error(error.message || "An error occurred while deleting the meal.");
        }
    };
    return (
        <div className="p-6 w-auto">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                Meal Table
            </h1>

            {/* Filters */}
            {/* <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search meals..."
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={dietary}
          onChange={(e) => setDietary(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
        >
          <option value="">All Dietary</option>
          {dietaryOptions.map((diet) => (
            <option key={diet} value={diet}>{diet}</option>
          ))}
        </select>
        <select
          value={available}
          onChange={(e) => setAvailable(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
        >
          <option value="">All Availability</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
      </div> */}

            {/* Table */}
            <div className="overflow-auto">
                <table className="min-w-full border border-gray-200 shadow-lg rounded-lg">
                    <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        <tr >
                            {columns.map((col) => (
                                <th key={col.key} className="px-4 py-2 text-left text-black font-semibold">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="">
                        {meals.length > 0 ? (
                            meals.map((meal: any, index: number) => (
                                <tr key={meal.id} className="hover:bg-gray-400 transition border-2 border-gray-400 rounded-lg">
                                    <td className={`px-4 py-0.5 font-medium ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-0.5">
                                        <img
                                            src={meal.image ?? "/images/default-meal.jpg"}
                                            alt={meal.meals_name}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                    </td>
                                    <td className="px-4 py-0.5 font-semibold">{meal.meals_name}</td>
                                    <td className="px-4 py-0.5 text-gray-600">{meal.description}</td>
                                    <td className="px-4 py-0.5 font-medium">${meal.price.toFixed(2)}</td>
                                    <td className="px-4 py-0.5">{meal.category_name}</td>
                                    <td className="px-4 py-0.5">{meal.cuisine}</td>
                                    <td className="px-4 py-0.5">
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-sm font-semibold ${meal.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {meal.isAvailable ? (<Status variant="success" className="bg-green-500 text-white">
                                                <StatusIndicator />
                                                <StatusLabel >Available</StatusLabel>
                                            </Status>) : (<Status variant="error" className="bg-red-500 text-white">
                                                <StatusIndicator />
                                                <StatusLabel>Unavailable</StatusLabel>
                                            </Status>)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-0.5">
                                        <div className=" flex items-center pt-2 flex-wrap gap-2.5">
                                            <Link href={`/meals/${meal.id}`}>
                                                <Eye className="w-4 h-4 text-blue-500 hover:text-blue-700" />
                                            </Link>
                                            <button onClick={() => handleDelete(meal.id)} className="ml-2 cursor-pointer">
                                                <Trash className="w-4 h-4 text-red-500 hover:text-red-700" />
                                            </button>
                                            <Link href={`/provider-dashboard/update-meal/${meal.id}`} className="ml-2 cursor-pointer">
                                                <Pen className="w-4 h-4 text-green-500 hover:text-green-700" />
                                            </Link>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-6 text-gray-500">
                                    No meals found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {/* <div className="flex justify-center gap-3 mt-6 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              currentPage === i + 1
                ? "bg-gradient-to-r from-green-400 to-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div> */}
        </div>
    );
};

export default MealTable;