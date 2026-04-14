import { getStatsAction } from "@/actions/stats.actions";
import DashboardContent from "@/components/dashboard/DashboardContent";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import ErrorFallback from "@/components/shared/ErrorFallback";
import { getSession } from "@/services/auth.service";
import { DashboardData } from "@/types/stats.type";

const ProviderStats = async () => {
  const statsData=await getStatsAction()
  const userinfo=await getSession()
  const role=userinfo?.data.role

  return (
    <div className="w-full">
    <ErrorBoundary fallback={<ErrorFallback title="Dashboard Error" message="An error occurred while loading your dashboard. Please refresh the page or try again later." />}>
      {statsData ? (
        <div>
          <DashboardContent role={role as string}  data={statsData.data as DashboardData} />

        </div>
      ) : (
        <div className="text-red-600">Failed to load dashboard data. Please try again later.</div>
      )}
    </ErrorBoundary>
   </div>
  );
};
export default ProviderStats;
