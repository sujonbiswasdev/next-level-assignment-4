import { getProviderwithMeals } from "@/actions/provider.actions";
import ProviderPage from "@/components/modules/provider/singleprovider";
import { IGetAllmeals } from "@/types/meals.type";
import { TResponseproviderData } from "@/types/provider.type";
import { TUser } from "@/types/user.type";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import ErrorFallback from "@/components/shared/ErrorFallback";

const SingleProviderWithMenu = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await getProviderwithMeals(id);

  if (!res.success || res.error || !res.data?.result) {
    return (
      <ErrorFallback
        title="Provider Information Unavailable"
        message="We couldn't load the provider details at the moment. Please refresh the page, or contact support if this issue persists."
      />
    );
  }

  const providerData = res.data.result as TResponseproviderData<{
    user: TUser;
    meals: IGetAllmeals[];
  }>;

  return (
    <div className="mt-6 md:mt-10 lg:mt-14 xl:mt-18">
      <ErrorBoundary
        fallback={
          <ErrorFallback
            title="Error Displaying Provider"
            message="Something went wrong while displaying this provider's information. Please try again later."
          />
        }
      >
        <ProviderPage data={providerData} />
      </ErrorBoundary>
    </div>
  );
};

export default SingleProviderWithMenu;
