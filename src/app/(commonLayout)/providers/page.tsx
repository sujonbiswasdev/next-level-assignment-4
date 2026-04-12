import { getAlluserProvider } from "@/actions/provider.actions";
import ProviderContent from "@/components/modules/provider/ProviderContent";
import Notfounddata from "@/components/Notfounddata";
import ErrorBoundary from "@/components/shared/ErrorBoundary";

const ProviderPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const search = await searchParams;
  const providerinfo = await getAlluserProvider(search);
  if (!providerinfo || !providerinfo.success) {
    return <Notfounddata content="Something went wrong loading providers" />;
  }
  return (
    <div>
      <h2>retrieve all provider info</h2>
      <div>
        {!providerinfo.data ? (
          <Notfounddata content="provider data not found" />
        ) : (
          <ErrorBoundary
            fallback={
              <Notfounddata
                content="Something went wrong displaying providers"
                emoji="⚠️"
              />
            }
          >
            <div>
              {!providerinfo.success || providerinfo.data.length === 0 ? (
                <Notfounddata btntext="providers" path="/providers" content="No provider data found." emoji="📦" />
              ) : (
                providerinfo.data.map((item, index) => (
                  <div key={index}>
                    <div className="">
                      <ProviderContent data={item} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
};

export default ProviderPage;
