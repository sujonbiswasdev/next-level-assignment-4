import { DashboardData, ICounts, IMealsStatus, IOrderStatus, MonthlyRevenue } from "@/types/stats.type";
import { StatsCard } from "./DashbaordStatsCard";
import Earnings from "./chart/EarningChart";

const DashboardContent = ({
    data,
  role,
}: {
    data: DashboardData;
  role: string;
}) => {
  const sectionTitle =
    role === "Admin" ? "Admin Dashboard Overview" : "Your Dashboard Overview";
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="max-w-[1480px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-2">
        <div className="rounded-xl border border-cyan-100 bg-linear-to-r from-white via-cyan-50 to-emerald-50 p-4 sm:p-5 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
            {sectionTitle}
          </h2>
          <p className="mt-1 text-sm text-slate-700">
            A unique, responsive stats overview with a fresh color system.
          </p>
        </div>
        <StatsCounts statsCount={data.counts as ICounts} role={role} />
        <MealStatus mealStatus={data.mealStatus} role={role} />
        <OrderStats orderstats={data.order as unknown as IOrderStatus} role={role} />

        <Earnings
        stats={data.monthlyRevenue as MonthlyRevenue[]}
        earningRate={data.totalRevenue}
      />
   
   
      </div>
    </div>
  );
};

export default DashboardContent;

export const StatsCounts = ({
    statsCount,
    role,
  }: {
    statsCount: ICounts;
    role?: string;
  }) => {
    const isAdmin = role === "Admin";
    const providerTotal =
      (statsCount.mealsCount || 0) +
      (statsCount.orderCount || 0);

    const adminTotal =
      (statsCount.mealsCount || 0) +
      (statsCount.orderCount || 0) +
      (statsCount.reviewCount || 0) +
      (statsCount.userCount || 0);

    const providerCards = [
      {
        title: "Meals",
        value: statsCount.mealsCount?.toString() || "0",
        bgGradient: "from-cyan-500 to-teal-400",
        iconName: "Utensils",
        key: "meals",
        percentage: providerTotal
          ? (((statsCount.mealsCount || 0) / providerTotal) * 100).toFixed(0)
          : "0",
        trend: "up",
      },
      {
        title: "Orders",
        value: statsCount.orderCount?.toString() || "0",
        bgGradient: "from-emerald-500 to-teal-400",
        iconName: "ShoppingBag",
        key: "orders",
        percentage: providerTotal
          ? (((statsCount.orderCount || 0) / providerTotal) * 100).toFixed(0)
          : "0",
        trend: "up",
      },
    ];

    const adminCards = [
      ...providerCards,
      {
        title: "Reviews",
        value: statsCount.reviewCount?.toString() || "0",
        bgGradient: "from-cyan-600 to-emerald-400",
        iconName: "Star",
        key: "reviews",
        percentage: adminTotal
          ? (((statsCount.reviewCount || 0) / adminTotal) * 100).toFixed(0)
          : "0",
        trend: "up",
      },
      {
        title: "Users",
        value: statsCount.userCount?.toString() || "0",
        bgGradient: "from-teal-500 to-cyan-400",
        iconName: "Users",
        key: "users",
        percentage: adminTotal
          ? (((statsCount.userCount || 0) / adminTotal) * 100).toFixed(0)
          : "0",
        trend: "up",
      },
      {
        title: "Payments",
        value: statsCount.paymentCount?.toString() || "0",
        bgGradient: "from-indigo-500 to-purple-400",
        iconName: "CreditCard",
        key: "payments",
        percentage: adminTotal
          ? (((statsCount.paymentCount || 0) / adminTotal) * 100).toFixed(0)
          : "0",
        trend: "up",
      },
    ];

    const cardsToRender = isAdmin ? adminCards : providerCards;

    return (
      <div className="max-w-[1380px] mx-auto w-full px-4 sm:px-6  py-4">
        <div className={`grid grid-cols-1 md:grid-cols-2 ${isAdmin ? "lg:grid-cols-3" : "lg:grid-cols-3"} gap-6`}>
          {cardsToRender.map((card) => (
            <StatsCard
              key={card.key}
              title={card.title}
              value={card.value}
              bgGradient={card.bgGradient}
              iconName={card.iconName}
              percentage={card.percentage}
              trend={card.trend as "up" | "down"}
            />
          ))}
        </div>
      </div>
    );
  };

export const MealStatus = ({
    mealStatus,
    role,
  }: {

    mealStatus: IMealsStatus;
    role?: string;
  }) => {

    const isAdmin = role === "Admin";
    const mealStatusTotal =
      ( mealStatus.approvedmeals|| 0) +
      (mealStatus.pendingmeals || 0) +
      (mealStatus.rejectedmeals || 0) 
    const mealsCards = [
      {
        title: "Approved Meals",
        value: mealStatus.approvedmeals.toString(),
        bgGradient: "from-emerald-400 to-cyan-400",
        iconName: "CheckCircle",
        key: "approvedmeals",
        percentage: mealStatusTotal
          ? (((mealStatus.approvedmeals || 0) / mealStatusTotal) * 100).toFixed(0)
          : "0",
        trend: "up",
      },
      {
        title: "Pending Meals",
        value: mealStatus.pendingmeals.toString(),
        bgGradient: "from-yellow-300 to-cyan-200",
        iconName: "PauseCircle",
        key: "pendingmeals",
        percentage: mealStatusTotal
        ? (((mealStatus.pendingmeals || 0) / mealStatusTotal) * 100).toFixed(0)
        : "0",
        trend: "up",
      },
      {
        title: "Rejected Meals",
        value: mealStatus.rejectedmeals.toString(),
        bgGradient: "from-rose-300 to-rose-400",
        iconName: "XCircle",
        key: "rejectedmeals",
        percentage: mealStatusTotal
        ? (((mealStatus.rejectedmeals || 0) / mealStatusTotal) * 100).toFixed(0)
        : "0",
        trend: "down",
      },
    ];


    return (
      <div className="max-w-[1380px] mx-auto w-full px-4 sm:px-6  py-4">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
          {mealsCards.map((card) => (
            <StatsCard
              key={card.key}
              title={card.title}
              value={card.value}
              bgGradient={card.bgGradient}
              iconName={card.iconName}
              percentage={card.percentage}
              trend={card.trend as "up" | "down"}
            />
          ))}
        </div>
      </div>
    );
  };

// Fixed typo: was 'orderStats', exported as 'OrderStats'
export const OrderStats = ({
    orderstats,
    role,
  }: {
    orderstats: IOrderStatus;
    role?: string;
  }) => {
    const isAdmin = role === "Admin";
    const orderTotal =
      (orderstats.cancelledorder || 0) +
      (orderstats.deliveredorder || 0) +
      (orderstats.placedorder || 0) +
      (orderstats.preparingorder || 0) +
      (orderstats.readyorder || 0);

    const orderCards = [
      {
        title: "Delivered Orders",
        value: orderstats.deliveredorder?.toString() || "0",
        bgGradient: "from-emerald-400 to-cyan-400",
        iconName: "CheckCircle",
        key: "deliveredorder",
        percentage: orderTotal
          ? (((orderstats.deliveredorder || 0) / orderTotal) * 100).toFixed(0)
          : "0",
        trend: "up",
      },
      {
        title: "Preparing Orders",
        value: orderstats.preparingorder?.toString() || "0",
        bgGradient: "from-yellow-300 to-cyan-200",
        iconName: "Cog",
        key: "preparingorder",
        percentage: orderTotal
          ? (((orderstats.preparingorder || 0) / orderTotal) * 100).toFixed(0)
          : "0",
        trend: "up",
      },
      {
        title: "Placed Orders",
        value: orderstats.placedorder?.toString() || "0",
        bgGradient: "from-blue-300 to-cyan-300",
        iconName: "ShoppingCart",
        key: "placedorder",
        percentage: orderTotal
          ? (((orderstats.placedorder || 0) / orderTotal) * 100).toFixed(0)
          : "0",
        trend: "neutral",
      },
      {
        title: "Ready Orders",
        value: orderstats.readyorder?.toString() || "0",
        bgGradient: "from-cyan-400 to-emerald-200",
        iconName: "ClipboardCheck",
        key: "readyorder",
        percentage: orderTotal
          ? (((orderstats.readyorder || 0) / orderTotal) * 100).toFixed(0)
          : "0",
        trend: "up",
      },
      {
        title: "Cancelled Orders",
        value: orderstats.cancelledorder?.toString() || "0",
        bgGradient: "from-rose-300 to-rose-400",
        iconName: "XCircle",
        key: "cancelledorder",
        percentage: orderTotal
          ? (((orderstats.cancelledorder || 0) / orderTotal) * 100).toFixed(0)
          : "0",
        trend: "down",
      },
    ];

    return (
      <div className="max-w-[1380px] mx-auto w-full px-4 sm:px-6  py-4">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
          {orderCards.map((card) => (
            <StatsCard
              key={card.key}
              title={card.title}
              value={card.value}
              bgGradient={card.bgGradient}
              iconName={card.iconName}
              percentage={card.percentage}
              trend={card.trend as "up" | "down"}
            />
          ))}
        </div>
      </div>
    );
  };
