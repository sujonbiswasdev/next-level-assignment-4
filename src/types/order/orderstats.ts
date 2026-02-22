// 🔹 Reusable Aggregate Type
type AggregateSum<T> = {
  _sum: T
}

// 🔹 Core Result Type
export interface OrderStatsResult {
  totalorders: number
  oneMonth: number
  totalcancelledmeals: number
  totalplacedmeals: number
  totalpreparingmeals: number
  totalreadymeals: number
  totaldeliveredmeals: number
  allearn: AggregateSum<{
    totalPrice: number | null
  }>
  totalquantity: AggregateSum<{
    quantity: number | null
  }>
  todayorders: number
}

export interface OrderStatsData {
  success: boolean
  message: string
  result: OrderStatsResult
}
export type OrderStatsApiResponse =
  | {
      data: OrderStatsData
      error: null
    }
  | {
      data: null
      error: string
    }