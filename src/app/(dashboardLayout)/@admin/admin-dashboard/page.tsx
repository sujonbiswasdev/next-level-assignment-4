import { getCategoryStats, getMealsStats, getOrdersStats, getRevenueStats, getUserStats } from "@/actions/user/adminstats"
import AdminStats from "@/components/modules/stats/Adminstats"
import { CategoryStats, MealStats, OrderStats, RevenueDashboardResponse, ReviewStats } from "@/types/user/adminstats"


const AdminPage = async() => {
  const userstats=await getUserStats()
  const mealsstats=await getMealsStats()
  const ordersStats=await getOrdersStats()
   const revenuestats=await getRevenueStats()
     const categoriesStats=await getCategoryStats()

   console.log(categoriesStats,'dd')
     if (!userstats) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
 
  return (
    <div>
     <AdminStats usersStats={userstats.result} mealsStats={mealsstats.data.result as MealStats} ordersStats={ordersStats.data.result as OrderStats} revenuestats={revenuestats.data.result as RevenueDashboardResponse} categoriesStats={categoriesStats.result as CategoryStats}/>
    </div>
  )
}

export default AdminPage
