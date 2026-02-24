'use client'
import React, { useState, useEffect } from 'react';
import {
  MapPin, Clock, Phone, Star, Truck, DollarSign, Heart, Share2,
  ShoppingCart, ChevronLeft, ChevronRight, Utensils, Award
} from 'lucide-react';
import { manageCartStore } from '@/store/CartStore';
import { toast } from 'react-toastify';
import Image from 'next/image';

const ProviderPage = ({ data }: { data: any }) => {
  const { cart, getSubtotal, getTotal, addToCart, removeFromCart, clearCart } =
    manageCartStore()
  console.log(data, 'datajdjjsdjfdsfdsf')
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <img src={data.result.user.image} alt={data.result.user.name} className="w-12 h-12 rounded-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {data.result.restaurantName}
                </h1>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {data.result.address}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600 hidden sm:block">25-35 mins • Free delivery</div>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                Call
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-32 lg:pb-24">
        {/* Provider Profile + Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Provider Profile - LEFT (1/4) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-10 sticky lg:top-24">
              {/* Stats */}
              <div className='flex flex-wrap px-2 md:px-6'>
                <div className="space-y-4 mb-2 ">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="font-bold text-lg">25-35 mins</p>
                        <p className="text-xs text-gray-600">Delivery</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-bold text-lg">Free</p>
                        <p className="text-xs text-gray-600">Delivery</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='space-y-4 '>
                  <div className='flex flex-wrap items-center gap-2'>
                    <h4 className="text-sm font-medium text-gray-700">Name :</h4>
                    <p className="text-lg font-semibold text-gray-600">{data.result.user.name}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-medium text-gray-700">email :</h4>
                    <p className="text-sm text-gray-600">{data.result.user.email}</p>
                  </div>
                  <div className='flex flex-wrap items-center gap-2'>
                    <h4 className="text-sm font-medium text-gray-700">Phone :</h4>
                    <p className="text-sm text-gray-600">{data.result.user.phone || "Not available"}</p>
                  </div>

                  <div className='flex flex-wrap items-center gap-2'>
                    <h4 className="text-sm font-medium text-gray-700">isActive :</h4>
                    <p className="text-sm text-gray-600">{data.result.user.isActive ? "Yes" : "No"}</p>
                  </div>
                  <div className='flex flex-wrap items-center gap-2'>
                    <h4 className="text-sm font-medium text-gray-700">role :</h4>
                    <p className="text-sm text-gray-600">{data.result.user.role}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mt-2">
                <button className="w-full bg-white border-2 border-gray-200 hover:border-orange-400 text-gray-900 py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Meals Section - RIGHT (3/4) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Meals Grid */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                Menu Items
                <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-bold">Recommended</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.result.meals.map((meal: any) => (
                  <MealCard key={meal.id} meal={meal} onAddToCart={addToCart} cartItems={cart} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 lg:p-16 mt-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">About Restaurant</h3>
          <p className="text-xl text-gray-700 leading-relaxed">
            {data.result.description}
          </p>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

const MealCard = ({ meal, onAddToCart, cartItems }: any) => {
  console.log(meal, 'mealdata')
  return (
    <div className="group bg-white border border-gray-200 hover:border-orange-300 rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
      {/* Meal Image */}
      <div className="relative w-full h-60 overflow-hidden rounded-lg">
        <img
          src={meal.image}
          alt={meal.meals_name}
          loading="lazy"
          className="object-cover transition-transform duration-700 hover:scale-110"
        />

        <div className={`absolute top-4 right-4  px-3 py-2 rounded-full text-xs font-bold shadow-lg ${!meal.isAvailable ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
          {meal.isAvailable ? "Available" : "Unavailable"}
        </div>

      </div>

      {/* Content */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="bg-orange-100 text-orange-800 px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wide">
            {meal.category_name}
          </span>
          <span className="text-green-600 font-bold text-sm bg-green-100 px-3 py-1 rounded-full">
            {meal.status}
          </span>
        </div>

        <h4 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">{meal.meals_name}</h4>
        <p className="text-gray-600 text-base line-clamp-2 leading-relaxed">{meal.description}</p>

        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="text-3xl font-black text-gray-900">৳{meal.price}</div>
          <button
            disabled={!meal.isAvailable}
            onClick={() =>
              onAddToCart({
                id: meal.id,
                name: meal.name,
                price: meal.price,
                image: meal.image,
                quantity: 1,
              })
            }
            className={`bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 ml-auto ${!meal.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ShoppingCart className="w-5 h-5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderPage;
