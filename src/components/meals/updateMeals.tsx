"use client";

import { updateMeal } from "@/actions/blog.meals";

import React from "react";
import { toast } from "react-toastify";

import { z } from "zod";
import { Label } from "../ui/label";
import { cuisines, dietaryPreferences, UpdateMealsData } from "@/types/meals/mealstype";

const allowedDomains = [
  "res.cloudinary.com",
  "images.pexels.com",
];

export const updateMealSchema = z.object({
  meals_name: z.string().optional(),
  description: z.string().optional(),
  image: z.string().url("Invalid image URL").refine((url) => {
    try {
      const parsed = new URL(url as any);
      return allowedDomains.includes(parsed.hostname);
    } catch {
      return false;
    }
  }, {
    message: "Only Cloudinary and Pexels images allowed",
  }).optional(),
  price: z.number().positive('Price must be a positive number').optional(),
  isAvailable: z.boolean().optional(),
  category_name: z.string().optional(),
  dietaryPreference: z.enum(dietaryPreferences).optional(),
  cuisine: z.enum(cuisines).optional()
});


const UpdateMeal = ({ mealId }: { mealId: string }) => {
  const [mealData, setMealData] = React.useState<UpdateMealsData>({});
  const parsedata = updateMealSchema.safeParse(mealData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await updateMeal(mealId, parsedata.data!)
    console.log(data.error, 'kdljf')
    if (!data) {
      toast.error("Failed to update meal");
    } else {
      toast.success("Meal updated successfully");
      setMealData({})
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-50 to-blue-50 p-6">
      <form onSubmit={handleSubmit} className={` w-full max-w-4xl shadow-2xl rounded-3xl p-8 md:p-12 space-y-6`}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Update Meal
        </h2>

        {/* Name & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="mealName" className="font-medium ml-2 ">Meal name</label>
            <input
              type="text"
              placeholder="Meal Name"
              value={mealData?.meals_name ?? ""}
              onChange={(e) => setMealData({ ...mealData, meals_name: e.target.value })}
              className="w-full border-2 border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"

            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="price" className="font-medium ml-2 ">Price ($)</label>
            <input className="w-full border-2 border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              type={mealData.price === 0 ? "text" : "number"}
              min={0}
              placeholder="Price ($)"
              value={mealData.price ?? ""}
              onChange={(e) => setMealData({
                ...mealData,
                price: e.target.value === "" ? 0 : Math.max(0, Number(e.target.value))
              })}
            />

            <p className={`${parsedata.success ? "hidden" : "error"}`}>{parsedata.error?.issues[0]?.path == 'price' as any ? parsedata.error?.issues[0]?.message : null}</p>
          </div>

        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="image" className="font-medium ml-2 ">Image URL</Label>
          <input
            type="url"
            placeholder="Image URL"
            value={mealData.image ?? ""}
            onChange={(e) =>
              setMealData({ ...mealData, image: e.target.value })
            }

            className="w-full border-2 border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <p className={`${parsedata.success ? "hidden" : "error"}`}>{parsedata.error?.issues[1]?.path[0] === 'image' ? parsedata.error?.issues[1]?.message : null}</p>

        </div>

        {/* description */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="description" className="font-medium ml-2 ">Description</Label>
          <textarea
            placeholder="Description"
            value={mealData.description}
            onChange={(e) =>
              setMealData({ ...mealData, description: e.target.value })
            }
            className="w-full border-2 border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </div>



        <div className="flex flex-wrap justify-between">
          <div className="flex items-center space-x-2">
            <Label htmlFor="cuisines" className="font-medium ml-2 ">cuisines :</Label>
            <select
              className="border-amber-50 shadow-sm px-2 py-2.5"
              onChange={(e) =>
                setMealData({ ...mealData, cuisine: e.target.value as typeof cuisines[number] | undefined })
              }
            >
              <option value="">Select a cuisines</option>
              {cuisines?.map((item: any, index: number) => <option value={item} key={index}>{item}</option>)}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Label htmlFor="dietaryPreference" className="font-medium ml-2 ">dietaryPreference :</Label>
            <select
              className="border-amber-50 shadow-sm px-2 py-2.5"
              onChange={(e) =>
                setMealData({ ...mealData, dietaryPreference: e.target.value as typeof dietaryPreferences[number] | undefined })
              }
            >
              <option value="">Select a cuisines</option>
              {dietaryPreferences?.map((item: any, index: number) => <option value={item} key={index}>{item}</option>)}
            </select>
          </div>
        </div>



        <div className="flex items-center space-x-2">
          <Label htmlFor="isAvailable" className="font-medium ml-2 ">Available</Label>
          <input
            type="checkbox"
            checked={mealData.isAvailable}
            onChange={(e) =>
              setMealData({ ...mealData, isAvailable: e.target.checked })
            }
          />
        </div>


        <button

          type="submit"
          className={`bg-black text-white p-2 w-full`}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateMeal;