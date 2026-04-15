import ProfileModal from "@/components/profilemodel";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import ErrorFallback from "@/components/shared/ErrorFallback";
import { getSession } from "@/services/auth.service";
import { TUser } from "@/types/user.type";

export default async function ProfilePage() {
  const session = await getSession();

  if (!session?.data || session.error || !session || !session.success) {
    return (
      <ErrorFallback
        title="Profile Data Unavailable"
        message="Sorry, we couldn't load your profile information at the moment. Please refresh the page, or try again later. If this problem persists, contact support."
      />
    );
  }

  const userinfo = session.data as TUser;

  return (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          title="Error Displaying Profile"
          message="An unexpected error occurred while displaying your profile. Please try again, or contact support if the issue continues."
        />
      }
    >
      <ProfileModal user={userinfo} />
    </ErrorBoundary>
  );
}