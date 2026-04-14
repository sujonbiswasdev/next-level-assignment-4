export type Month = 
  | "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" 
  | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";

export interface ICounts {
    mealsCount: number;
    orderCount: number;
    reviewCount: number;
    userCount:number
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}
export interface IOrderStatus {
    cancelledorder: number;
    deliveredorder: number;
    placedorder: number;
    preparingorder: number;
    readyorder: number;
}


export interface IMealsStatus {
    approvedmeals: number;
    pendingmeals: number;
    rejectedmeals: number;
}

export interface DashboardData {
  counts: ICounts;
  mealStatus:IMealsStatus;
  order:IMealsStatus
}