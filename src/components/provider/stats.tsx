"use client"

import { OrderStatsApiResponse, OrderStatsResult } from "@/types/order/orderstats"
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid"

type RevenueAggregation = {
    totalPrice: number | null
}

type AvgRevenue = {
    _avg: RevenueAggregation
}

type SumRevenue = {
    _sum: RevenueAggregation
}

export type RevenueDashboardResponse = {
    avgrevenue: AvgRevenue
    monthlyRevenue: SumRevenue
    todaysRevenue: SumRevenue
    totalrevenue: SumRevenue
    topProvidersrevenue: any[]
    success: boolean
}

type StatCardProps = {
    title: string
    value: string
    percentage?: string
    positive?: boolean
}

export type MealStats = {
    totalmeals: number
    totalavailabemeals: number
    totalunavailabemeals: number
}

function StatCard({ title, value, percentage, positive = true }: StatCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-xl border border-gray-200/60 p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

            {/* Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5" />

            <div className="relative flex flex-col space-y-4">
                <div className="text-sm font-medium text-gray-500 tracking-wide">
                    {title}
                </div>

                <div className="flex items-end justify-between">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                        {value}
                    </h2>

                    <div
                        className={`flex items-center gap-1 text-sm font-semibold ${positive ? "text-emerald-600" : "text-red-500"
                            }`}
                    >
                        <ArrowTrendingUpIcon className="w-4 h-4" />
                        {percentage}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function RevenueStats({ stats, mealstats, ownorderstats }: { stats: RevenueDashboardResponse, mealstats: MealStats, ownorderstats: OrderStatsApiResponse }) {
    return (
        <section className="w-full py-10 px-4 sm:px-6 lg:px-10 bg-gray-50 min-h-screen">

            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                        Overview
                    </h1>
                </div>

                {/* Stats Grid */}
                <div className="space-y-3">
                    <h2 className="font-semibold text-lg">Earning overview</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        <StatCard
                            title="total earn"
                            value={Number(stats.totalrevenue._sum.totalPrice?.toFixed(2)) as any || 0}
                            percentage={Number(stats.totalrevenue._sum.totalPrice?.toFixed(2)) / 100 as any || 0.00}
                            positive
                        />
                        <StatCard
                            title="today earn"
                            value={Number(stats.todaysRevenue._sum.totalPrice?.toFixed(2)) as any || 0}
                            percentage={Number(stats.todaysRevenue._sum.totalPrice?.toFixed(2)) / 100 as any || 0.00}
                            positive
                        />
                        <StatCard
                            title="monthly earn"
                            value={Number(stats.monthlyRevenue._sum.totalPrice?.toFixed(2)) as any || 0}
                            percentage={Number(stats.monthlyRevenue._sum.totalPrice?.toFixed(2)) / 100 as any || 0.00}
                            positive
                        />
                        <StatCard
                            title="average earn"
                            value={Number(stats.avgrevenue._avg.totalPrice).toFixed(2) as any || 0}
                            percentage={Number(stats.avgrevenue._avg.totalPrice?.toFixed(2)) / 100 as any || 0.00}
                            positive
                        />

                    </div>
                </div>

                <div className="space-y-3">
                    <h2 className="font-semibold text-lg">mear overview</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        <StatCard
                            title="total meals"
                            value={Number(mealstats.totalmeals) as any}

                        />

                        <StatCard
                            title="available meals"
                            value={Number(mealstats.totalavailabemeals) as any}

                        />
                        <StatCard
                            title="un available meals"
                            value={mealstats.totalunavailabemeals as any}

                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <h2 className="font-semibold text-lg">order overview</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        <StatCard
                            title="total order"
                            value={Number(ownorderstats.data?.result.totalorders) as any || 0}
                            percentage={Number(ownorderstats.data?.result.totalorders) / 100 as any || 0.00}
                            positive
                        />

                        <StatCard
                            title="today order"
                            value={Number(ownorderstats.data?.result.todayorders) as any || 0}
                            percentage={Number(ownorderstats.data?.result.todayorders) / 100 as any || 0.00}
                            positive
                        />
                        <StatCard
                            title="monthly order"
                            value={Number(ownorderstats.data?.result.oneMonth) as any || 0}
                            percentage={Number(ownorderstats.data?.result.oneMonth) / 100 as any || 0.00}
                            positive
                        />

                        <StatCard
                            title="total cancelled order"
                            value={Number(ownorderstats.data?.result.totalcancelledmeals) as any || 0}
                            percentage={Number(ownorderstats.data?.result.totalcancelledmeals) / 100 as any || 0.00}
                            positive
                        />

                        <StatCard
                            title="total placed order"
                            value={Number(ownorderstats.data?.result.totalplacedmeals) as any || 0}
                            percentage={Number(ownorderstats.data?.result.totalplacedmeals) / 100 as any || 0.00}
                            positive
                        />
                        <StatCard
                            title="total preparing order"
                            value={Number(ownorderstats.data?.result.totalpreparingmeals) as any || 0}
                            percentage={Number(ownorderstats.data?.result.totalpreparingmeals) / 100 as any || 0.00}
                            positive
                        />

                        <StatCard
                            title="total ready order"
                            value={Number(ownorderstats.data?.result.totalreadymeals) as any || 0}
                            percentage={Number(ownorderstats.data?.result.totalreadymeals) / 100 as any || 0.00}
                            positive
                        />

                        <StatCard
                            title="total delivery order"
                            value={Number(ownorderstats.data?.result.totaldeliveredmeals) as any || 0}
                            percentage={Number(ownorderstats.data?.result.totaldeliveredmeals) / 100 as any || 0.00}
                            positive
                        />

                           <StatCard
                            title="total queantity"
                            value={Number(ownorderstats.data?.result.totalquantity._sum.quantity) as any || 0}
                            percentage={Number(ownorderstats.data?.result.totalquantity) / 100 as any || 0.00}
                            positive
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}