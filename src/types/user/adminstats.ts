
export type UserStats = {
  totalUsers: number
  totalSuspendUser: number
  totalActivateUser: number
  totalAdmin: number
  totalCustomer: number
  totalprovider: number
  todaystats: number
  oneMonthago: number
  totalemailvarified: number
  totalactiveusers: number
  totalunactiveuser: number
}

export type MealStats = {
  totalmeals: number
  totalavailabemeals: number
  totalunavailabemeals: number,
  totalapprovedmeals:number,
  totalpendingmeals:number,
  totalrejectedmeals:number
}

export type OrderStats = {
  totalorders: number
  oneMonth: number
  totalcancelledmeals: number
  totalplacedmeals: number
  totalpreparingmeals: number
  totalreadymeals: number
  totaldeliveredmeals: number
  allearn: {
    _sum: {
      totalPrice: number | null
    }
  }
  totalquantity: {
    _sum: {
      quantity: number | null
    }
  }
  todayorders: number
}

export type RevenueAggregation = {
  totalPrice: number | null
}

export type AvgRevenue = {
  _avg: RevenueAggregation
}

export type SumRevenue = {
  _sum: RevenueAggregation
}

export type RevenueDashboardResponse = {
  avgrevenue: AvgRevenue
  monthlyRevenue: SumRevenue
  todaysRevenue: SumRevenue
  totalrevenue: SumRevenue
  topProvidersrevenue: TopProviderRevenue[]
  success: boolean
}

export type TopProviderRevenue = {
  providerId: string
  _sum: {
    totalPrice: number | null
  }
}


export type ReviewStats = {
  totalreviews: number
  todayreviews: number
  topRatedMeals: TopRatedMeal[]
}

export type TopRatedMeal = {
  mealId: string
  _avg: {
    rating: number | null
  }
}

export type CategoryStats = {
  totalcategory: number
  totalcategory_name: { name: string }[]
  mealsPerCategory: {
    category_name: string
    _count: {
      _all: number
    }
  }[]
}


export type AdminStats = {
  userStats: UserStats
  mealStats: MealStats
  orderStats: OrderStats
  revenueStats: RevenueDashboardResponse
  reviewStats: ReviewStats
  categoryStats: CategoryStats
}