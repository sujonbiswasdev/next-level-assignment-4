"use client";

import ImageCard from "@/components/shared/ImageCardSkeleton";
import { TResponseproviderData } from "@/types/provider.type";
import { TUser } from "@/types/user.type";
import { useRouter } from "next/navigation";
import React from "react";
import ProviderFilter from "./ProviderContent";

type Props = {
  data: TResponseproviderData<{user:TUser}>;
};

const ProviderCard: React.FC<Props> = ({ data }) => {
    const router=useRouter()
  const {
    restaurantName,
    address,
    description,
    image,
    user,
    rating,
  } = data;

  const avgRating = data?.avgRating ?? 0;
  const totalReview = data?.totalReviews ?? 0;

  return (
    <div className="w-full mt-7 max-w-sm mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden">
      {data.user.image ? (
          <ImageCard src={data.user.image} alt={data.user.name} />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-200 dark:bg-gray-800">
            <span className="text-sm text-gray-500">No Image</span>
          </div>
        )}

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md shadow text-sm font-medium flex items-center gap-1">
          ⭐ <span>{avgRating || "N/A"}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <img
            src={
              user?.image ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="owner"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-base font-semibold text-gray-800">
              {restaurantName}
            </h2>
            <p className="text-xs text-gray-500">
              by {user?.name}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-2 truncate">
          📍 {address}
        </p>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-gray-500">
            {totalReview} reviews
          </span>

          <button onClick={()=>router.push(`/providers/${data.id}`)} className="px-4 py-1.5 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;