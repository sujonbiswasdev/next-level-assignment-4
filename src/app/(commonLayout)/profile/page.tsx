import ProfileModal from "@/components/profilemodel";
import { getSession } from "@/services/auth.service";
import { TUser } from "@/types/user.type";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import ErrorFallback from "@/components/shared/ErrorFallback";

export default async function ProfilePage() {
  const session = await getSession();

  if (!session || !session.data || !session.success) {
    return (
      <ErrorFallback
        title="Profile Load Error"
        message="Sorry, we couldn't load your profile information at the moment. Please try refreshing the page or contact support if this issue persists."
      />
    );
  }

  const userinfo = session.data;

  return (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          title="Profile Error"
          message="Something went wrong while displaying your profile. Please refresh, or come back later."
        />
      }
    >
      <ProfileModal user={userinfo as TUser} />
    </ErrorBoundary>
  );
}