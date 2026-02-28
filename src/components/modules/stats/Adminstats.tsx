"use client"

import { useEffect, useState } from "react"
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from "@heroicons/react/24/solid"
import { CategoryStats, MealStats, OrderStats, RevenueDashboardResponse, UserStats } from "@/types/user/adminstats"


type StatCardProps = {
  title: string
  value: string | number
  percentage?: number
  positive?: boolean
}

function StatCard({ title, value, percentage, positive = true }: StatCardProps) {
  return (
    <div className="relative rounded-2xl bg-white border border-gray-200 p-6 shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-gray-500 font-medium text-sm">{title}</h3>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        {percentage !== undefined && (
          <div className={`flex items-center text-sm font-semibold ${positive ? "text-green-600" : "text-red-500"}`}>
            {positive ? <ArrowTrendingUpIcon className="w-4 h-4" /> : <ArrowTrendingDownIcon className="w-4 h-4" />}
            {percentage.toFixed(2)}%
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminStats({ usersStats ,mealsStats,ordersStats,revenuestats,categoriesStats}: { usersStats: UserStats,mealsStats:MealStats,ordersStats:OrderStats,revenuestats:RevenueDashboardResponse ,categoriesStats:CategoryStats}) {
  return (
    <section className="w-full py-10 px-4 sm:px-6 lg:px-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
        </div>

        {/* User Stats */}
        {usersStats && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Users Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <StatCard title="Total Users" value={usersStats.totalUsers} />
              <StatCard title="total Customer" value={usersStats.totalCustomer} />
              <StatCard title="total Provider" value={usersStats.totalprovider} />
              <StatCard title="Admins" value={usersStats.totalAdmin} />
              <StatCard title="total email varified" value={usersStats.totalemailvarified} />
              <StatCard title="Active Users" value={usersStats.totalactiveusers} />
              <StatCard title="inActive user" value={usersStats.totalunactiveuser} />
              <StatCard title="Suspended Users" value={usersStats.totalSuspendUser} positive={false} />
            </div>
          </div>
        )}

        {/* Meal Stats */}
        {mealsStats && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Meals Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <StatCard title="Total Meals" value={mealsStats.totalmeals} />
              <StatCard title="Available Meals" value={mealsStats.totalavailabemeals} />
              <StatCard title="Unavailable Meals" value={mealsStats.totalunavailabemeals} positive={false} />
              <StatCard title="Approved Meals" value={mealsStats.totalapprovedmeals} />
              <StatCard title="Pending Meals" value={mealsStats.totalpendingmeals} />
               <StatCard title="rejected Meals" value={mealsStats.totalrejectedmeals} />
            </div>
          </div>
        )}

        {/* Order Stats */}
        {ordersStats && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Orders Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <StatCard title="Total Orders" value={ordersStats.totalorders} />
              <StatCard title="Today Orders" value={ordersStats.todayorders} />
              <StatCard title="Monthly Orders" value={ordersStats.oneMonth} />
              <StatCard title="Cancelled Orders" value={ordersStats.totalcancelledmeals} positive={false} />

              <StatCard title="Placed Orders" value={ordersStats.totalplacedmeals} />
              <StatCard title="Preparing Orders" value={ordersStats.totalpreparingmeals} />
              <StatCard title="Ready Orders" value={ordersStats.totalreadymeals} />
              <StatCard title="Delivered Orders" value={ordersStats.totaldeliveredmeals} />

              <StatCard title="Total Quantity" value={ordersStats.totalquantity._sum.quantity || 0} />
            </div>
          </div>
        )}

        {/* Revenue Stats */}
        {revenuestats && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Revenue Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <StatCard title="Total Revenue" value={`$${revenuestats.totalrevenue._sum.totalPrice?.toFixed(2) || 0}`} />
              <StatCard title="Today Revenue" value={`$${revenuestats.todaysRevenue._sum.totalPrice?.toFixed(2) || 0}`} />
              <StatCard title="Monthly Revenue" value={`$${revenuestats.monthlyRevenue._sum.totalPrice?.toFixed(2) || 0}`} />
              <StatCard title="Average Revenue" value={`$${revenuestats.avgrevenue._avg.totalPrice?.toFixed(2) || 0}`} />
              
            </div>
          </div>
        )}

        {/* Review Stats */}
        {/* {reviewStats && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Reviews Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <StatCard title="Total Reviews" value={formatValue(reviewStats.totalreviews)} />
              <StatCard title="Today Reviews" value={formatValue(reviewStats.todayreviews)} />
            </div>
          </div>
        )} */}

        {/* Category Stats */}
        {categoriesStats && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Categories Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <StatCard title="Total Categories" value={categoriesStats.totalcategory || 0} />
                 {categoriesStats.mealsPerCategory.map((item,index)=>{
                  return <div key={index}>
                     
                  <StatCard title={`meals per category by ${item.category_name}`} value={item._count._all} />
                  </div>
                 })}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}