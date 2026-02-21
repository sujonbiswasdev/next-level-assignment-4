"use client";

import { updateMeal } from "@/actions/blog.meals";
import { UpdateMealsDate } from "@/types/mealsType";
import React from "react";
import { toast } from "react-toastify";

import { z } from "zod";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export const updateMealSchema = z.object({
  meals_name: z.string().min(3, "Meal name must be at least 3 characters long").optional(),
  description: z.string().min(15, "Description must be at least 15 characters long").optional(),
  image: z.string().url("Image must be a valid URL").optional(),
  price: z.number().positive("Price must be a positive number").optional(),
  isAvailable: z.boolean().optional(),
  dietaryPreference: z.enum(["HALAL", "VEGAN", "VEGETARIAN", "ANY"]).optional(),
  category_name: z.string().min(3, "Category name must be at least 3 characters long").optional(),
  cuisine: z.string().min(3, "Cuisine must be at least 3 characters long").optional(),
});

const UpdateMeal = ({ mealId }: { mealId: string }) => {
  const [mealData, setMealData] = React.useState<UpdateMealsDate>({
    meals_name: "",
    description: "",
    image: "",
    price: 0,
    isAvailable: true,
    dietaryPreference: "HALAL",
    category_name: "",
    cuisine: "",
  });
  const parsedate = updateMealSchema.safeParse(mealData);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await updateMeal(mealId, parsedate.data!)
    if (error) {
      toast.error(error);
    } else {
      toast.success("Meal updated successfully");
      setMealData({
        meals_name: "",
        description: ""
      });
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-50 to-blue-50 p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-8 md:p-12 space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6">
          Update Meal
        </h2>

        {/* Name & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="mealName" className="font-medium ml-2 ">Meal name <span className="text-red-500">*</span> </label>
            <input
              type="text"
              placeholder="Meal Name"
              value={mealData.meals_name}
              onChange={(e) => setMealData({ ...mealData, meals_name: e.target.value })}
              className="w-full border-2 border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="price" className="font-medium ml-2 ">Price ($)</label>
            <input
              type="number"
              placeholder="Price ($)"
              value={mealData.price}
              onChange={(e) => setMealData({ ...mealData, price: Number(e.target.value) })}
              className="w-full border-2 border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              required
            />
          </div>

        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="image" className="font-medium ml-2 ">Image URL</Label>
          <input
            type="text"
            placeholder="Image URL"
            value={mealData.image}
            onChange={(e) =>
              setMealData({ ...mealData, image: e.target.value })
            }
            className="w-full border-2 border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />

        </div>
        {/* Category & Cuisine */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="category" className="font-medium ml-2 ">Category</Label>
            <input
              type="text"
              placeholder="Category"
              value={mealData.category_name}
              onChange={(e) => setMealData({ ...mealData, category_name: e.target.value })}
              className="w-full border-2 border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="cuisine" className="font-medium ml-2 ">Cuisine</Label>
            <input
              type="text"
              placeholder="Cuisine"
              value={mealData.cuisine}
              onChange={(e) => setMealData({ ...mealData, cuisine: e.target.value })}
              className="w-full border-2 border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="dietaryPreference" className="font-medium ml-2 ">Dietary Preference</Label>
          <select
            value={mealData.dietaryPreference}
            onChange={(e) =>
              setMealData({ ...mealData, dietaryPreference: e.target.value as UpdateMealsDate["dietaryPreference"] })
            }
            className="w-full border-2 border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            <option value="HALAL">Halal</option>
            <option value="VEGAN">Vegan</option>
            <option value="VEGETARIAN">Vegetarian</option>
            <option value="ANY">Any</option>
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="isAvailable" className="font-medium ml-2 ">Availability</Label>
          <select
            value={mealData.isAvailable ? "available" : "unavailable"}
            onChange={(e) =>
              setMealData({ ...mealData, isAvailable: e.target.value === "available" })
            }
            className="w-full border-2 border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
        {/* description */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="description" className="font-medium ml-2 ">Description <span className="text-red-500">*</span></Label>
          <Textarea
            placeholder="Description"
            value={mealData.description}
            onChange={(e) =>
              setMealData({ ...mealData, description: e.target.value })
            }
            className="w-full border-2 border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </div>



        <button
          type="submit"
          className="bg-black text-white p-2 w-full"
        >
          Update
        </button>
      </form>
    </div>

  );
};

export default UpdateMeal;