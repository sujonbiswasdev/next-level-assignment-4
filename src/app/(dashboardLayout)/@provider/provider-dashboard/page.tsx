import { getownorderstats, getprovidermealsStats, getrevenueStats } from "@/actions/provider/stats"
import RevenueStats from "@/components/provider/stats"
import { OrderStatsApiResponse, OrderStatsResult } from "@/types/order/orderstats"

const ProviderPage = async() => {
  const revenuedata=await getrevenueStats()
  const revenuestats=revenuedata.data.result
   const mealsdata=await getprovidermealsStats()
  const mealstats=mealsdata.data.result
  
     const ownorderdata=await getownorderstats()
  const ownorderstats=ownorderdata as OrderStatsApiResponse
  return (
    <div>
     <RevenueStats stats={revenuestats} mealstats={mealstats} ownorderstats={ownorderstats as OrderStatsApiResponse} />
    </div>
  )
}

export default ProviderPage
